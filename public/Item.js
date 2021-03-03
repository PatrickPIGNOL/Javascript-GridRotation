import {MouseFocusable} from "./MouseFocusable.js"
import {Loader} from "./Loader.js"
import {EImage} from "./Loader.js"

export const EItemType = Object.freeze
(
	{
		Nothing:
		{
			ID: 63,
			X: 0,
			Y: 26,
			Width: 32,
			Height: 32
		},
		TopWall: 
		{
			ID: 421,
			X: 19,
			Y: 6,
			Width: 32,
			Height: 32
		},
		Wall: 
		{
			ID: 493,
			X: 13,
			Y: 21,
			Width: 32,
			Height: 32
		},
		Floor: 
		{
			ID: 192,
			X: 23,
			Y: 7,
			Width: 32,
			Height: 32
		},
		StartPoint:
		{
			ID: 13,
			X: 0,
			Y: 4,
			Width: 64,
			Height: 64
		},
		Stairs:
		{
			ID: 13,
			X: 0,
			Y: 0,
			Width: 64,
			Height: 64
		},
		Coin:
		{
			ID: 3,
			X: 16,
			Y: 2,
			Width: 32,
			Height: 32
		},
		Chest:
		{
			ID: 4,
			X: 4,
			Y: 0,
			Width: 64,
			Height: 64
		},
		Enemy:
		{
			ID: 2,
			X: 2,
			Y: 0,
			Width: 64,
			Height: 64
		},
		Tank:
		{
			ID: 2,
			X: 2,
			Y: 0,
			Width: 64,
			Height: 64
		},
		Web:
		{
			ID: 1,
			X: 1,
			Y: 0,
			Width: 64,
			Height: 64
		},
		Heart:
		{
			ID: 10,
			X: 10,
			Y: 0,
			Width: 64,
			Height: 64
		}
	}
);

export class Item extends MouseFocusable
{
	constructor(pParent, pX, pY, pType, pAmount)
	{
		super(pParent, pX, pY, 32, 32);
		this.aType = pType;
		this.aAmount = Math.floor(Math.random() * 6 + 1);
		if(pAmount)
		{
			this.aAmount = pAmount;
		}
	}

	get Type()
	{
		return this.aType;
	}

	get Amount()
	{
		return this.aAmount;
	}
	set Amount(pAmount)
	{
		this.aAmount = pAmount;
	}

	mCollect(pPlayer)
	{
		switch(this.aType)
		{
			case EItemType.Coin:
			{
				pPlayer.Coins(this.aAmount);
			}break;
			case EItemType.Enemy:
			{
				pPlayer.Life(-this.aAmount);
				pPlayer.Kills(this.aAmount)
			}break;
			case EItemType.Web:
			{
				pPlayer.Coins(-this.aAmount);
				pPlayer.mStop();
			}break;
			case EItemType.Heart:
			{
				pPlayer.Life(this.aAmount);
			}break;
			case EItemType.Stairs:
			{
				pPlayer.mFinishLevel();
			}break;
			default:
			{
				
			}break;
		}
		this.Parent.mRemoveComponent(this);
	}

	mOnUpdate(pCanvas, pDeltaTime)
	{
		
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
	{
		switch(this.aType)
		{
			case EItemType.Stairs:
			{
				pGraphicContext.drawImage(Loader.Images[EImage.SpriteSheet.Index], this.aType.X * this.aType.Width, this.aType.Y * this.aType.Height, this.aType.Width, this.aType.Height, this.aParent.AbsoluteX + this.X * 32, this.aParent.AbsoluteY + this.Y * 32, 32, 32);
			}break;
			default:
			{
				pGraphicContext.drawImage(Loader.Images[EImage.SpriteSheet.Index], this.aType.X * this.aType.Width, this.aType.Y * this.aType.Height, this.aType.Width, this.aType.Height, this.aParent.AbsoluteX + this.X * 32, this.aParent.AbsoluteY + this.Y * 32, 32, 32);
				pGraphicContext.fillStyle = "#FFFFFF";
				pGraphicContext.font = '16px serif';
				let vTextMetrics = pGraphicContext.measureText(this.aAmount);
  				pGraphicContext.fillText(this.aAmount, this.aParent.AbsoluteX + this.X * 32 + ((32 - vTextMetrics.width) / 2), this.aParent.AbsoluteY + this.Y * 32 + ((32 - (vTextMetrics.actualBoundingBoxDescent)) / 2)+4);
			}break;
		}
	}
}

export default {Item};