import {Button} from "./Button.js";
import {Loader, EImage} from "./Loader.js"

export class GameMapButton extends Button
{
	constructor(pParent, pX, pY, pWidth, pHeight, pImage, pTileSheetIndex, pBackGround)
	{
		super(pParent, pX, pY, pWidth, pHeight);
		this.aTileSheetIndex = pTileSheetIndex;
		this.aImage = pImage;
		this.aEnabled = false;
		this.aBackGround = pBackGround;
		this.aAngle = 0;
		this.Visible = false;
	}

	get Image()
	{
		return this.aImage();
	}

	set Image(pImage)
	{
		this.aImage = pImage;
	}

	get TileSheetIndex()
	{
		return this.aTileSheetIndex;
	}

	set TileSheetIndex(pTileSheetIndex)
	{
		this.aTileSheetIndex = pTileSheetIndex;
	}

	get Angle()
	{
		return this.aAngle;
	}

	set Angle(pAngle)
	{
		this.aAngle = pAngle;
	}

	mOnUpdateEventHandler(pCanvas, pDeltaTime)
	{
		this.aAngle = this.Angle % (2 * Math.PI);
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
    {
		if(this.aBackGround)
		{
			pGraphicContext.fillStyle = pGraphicContext.createPattern
			(
				Loader.Images[EImage.ButtonBackGround.Index],
				"repeat"
			);
			pGraphicContext.fillRect
			(
				this.AbsoluteX,
				this.AbsoluteY,
				this.Width,
				this.Height
			);
		}
		
		pGraphicContext.save();
		pGraphicContext.translate
		(
			this.AbsoluteX + this.Width / 2,
			this.AbsoluteY + this.Height / 2
		)
		pGraphicContext.rotate(this.aAngle);
		pGraphicContext.drawImage
		(
			this.aImage, 
			this.aTileSheetIndex.X * this.aTileSheetIndex.Width,
			this.aTileSheetIndex.Y * this.aTileSheetIndex.Height, 
			this.aTileSheetIndex.Width, 
			this.aTileSheetIndex.Height,
			-this.Width / 2,
			-this.Height / 2,
			this.Width, 
			this.Height
		);
		pGraphicContext.restore();
		if(this.Visible)
		{
			pGraphicContext.strokeStyle = "#00FF00";
		}
		else
		{
			pGraphicContext.strokeStyle = "#FF0000";		
		}
		pGraphicContext.strokeRect(this.AbsoluteX, this.AbsoluteY, this.Width, this.Height);
		/*
		pGraphicContext.strokeStyle = "#FF0000";
		pGraphicContext.strokeRect(this.X, this.Y, this.Width, this.Height);
		*/
		
		//*/
	}
}