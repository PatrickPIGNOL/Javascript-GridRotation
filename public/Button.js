import {GraphicComponent} from "./GraphicComponent.js";
import {Loader, EImage, EFonts} from "./Loader.js";
import {MouseFocusable} from "./MouseFocusable.js";

/*
const EButtonStates = Object.freeze
(
    {
        Object:t       
    }
)
*/

export class Button extends MouseFocusable
{
    constructor(pParent, pX, pY, pWidth, pHeight, pText)
    {
        super(pParent, pX, pY, pWidth, pHeight);
        if(this.Parent)
        {
            this.Parent.mAddOnUpdateEventListener(this);
            this.Parent.mAddOnDrawEventListener(this);
        }
        this.MouseFocusable = true;
        this.Visible = true;
        this.aText = pText;
        this.aTimer = 0;
        this.aTextSize = "14px";
        this.aFont = "sherif";
        this.aTextColor = "rgba(0, 0, 0, 1.0)";
    }

    get Font()
    {
        return this.aFont;
    }

    set Font(pFont)
    {
        this.aFont = pFont;
    }

    get Text()
    {
        return this.aText;
    }

    set Text(pText)
    {
        this.aText = pText;
    }   

    get TextColor()
    {
        return this.aTextColor;
    }

    set TextColor(pTextColor)
    {
        this.aTextColor = pTextColor;
    }

    get TextSize()
    {
        return this.aTextSize;
    }

    set TextSize(pTextSize)
    {
        this.aTextSize = pTextSize;
    }

    mOnLoadEventHandler()
    {
        this.aClicked = false;
    }

    mOnDrawEventHandler(pCanvas, pGraphicContext)
    {        
        if(this.Visible)
        {
            pGraphicContext.globalAlpha = this.GlobalAlpha;
            pGraphicContext.save();
            pGraphicContext.translate(this.AbsoluteX, this.AbsoluteY);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.ButtonBackGround.Index], "repeat");
            pGraphicContext.fillRect(0, 0, this.Width, this.Height);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.West.Index], "repeat");
            pGraphicContext.fillRect(0, 0, 8, this.Height);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.North.Index], "repeat");
            pGraphicContext.fillRect(0, 0, this.Width, 8);

            pGraphicContext.restore();

            //--------

            pGraphicContext.save();
            pGraphicContext.translate(this.AbsoluteX + this.Width - 7, this.AbsoluteY);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.East.Index], "repeat");
            pGraphicContext.fillRect(0, 0, 8, this.Height);
            
            pGraphicContext.restore();

            //--------

            pGraphicContext.save();
            pGraphicContext.translate(this.AbsoluteX, this.AbsoluteY + this.Height - 8);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.South.Index], "repeat");
            pGraphicContext.fillRect(0, 0, this.Width, 8);
            
            pGraphicContext.restore();
            
            //---------

            pGraphicContext.drawImage(Loader.Images[EImage.CornerNW.Index], this.AbsoluteX, this.AbsoluteY);
            pGraphicContext.drawImage(Loader.Images[EImage.CornerNE.Index], this.AbsoluteX + this.Width - 8, this.AbsoluteY);
            pGraphicContext.drawImage(Loader.Images[EImage.CornerSE.Index], this.AbsoluteX + this.Width - 8, this.AbsoluteY + this.Height - 8);
            pGraphicContext.drawImage(Loader.Images[EImage.CornerSW.Index], this.AbsoluteX, this.AbsoluteY + this.Height - 8);

            pGraphicContext.fillStyle = this.aTextColor;

            pGraphicContext.save();
            pGraphicContext.font = this.TextSize + ' ' + this.aFont.Name;
            pGraphicContext.beginPath();
            pGraphicContext.rect(this.AbsoluteX, this.AbsoluteY, this.Width, this.Height);
            pGraphicContext.clip();

            pGraphicContext.fillText(this.aText, this.AbsoluteX, this.AbsoluteY + this.Height-10);
            pGraphicContext.restore();

            pGraphicContext.globalAlpha = 1;
        }
    }
}


//export { EButtonStates };
export default { Button };