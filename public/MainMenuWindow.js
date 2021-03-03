
import {WindowBase} from "./WindowBase.js";
import {Button} from "./Button.js";
import {MainMenuButton} from "./MainMenuButton.js";
import {Loader, EImage} from "./Loader.js";
import {Rectangle} from "./Rectangle.js";
import {GameEngine} from "./GameEngine.js";
import {LevelScene} from "./LevelScene.js";

const WindowState = Object.freeze
(
    {
        Opening: 
        {
            Width: 0,
            Height: 1,
            FadeIn: 2
        },
        Opened: 3,
        Closing: 
        {
            FadeOut: 4,
            Height: 5,
            Width: 6
        },
        Closed: 7
    }
);

class MainMenuWindow extends WindowBase
{
    constructor(pParent, pX, pY, pWidth, pHeight, pText)
    {
        super(pParent, pX, pY, pWidth, pHeight);
		this.aText = pText;
        this.aMaxWidth = this.Width;
        this.aMaxHeight = this.Height;
        this.aNewGameButton = new MainMenuButton(this, 10, 130, 180, 40,    " New Game ");
        this.aNewGameButton.mOnClickEventHandler = function (pEvent)
            {
       			this.Parent.mVisible(false);
                GameEngine.Instance.mChangeScene(LevelScene.Instance);
            };
        this.aOptionsButton = new MainMenuButton(this, 10, 180, 180, 40,       "   Scores ");
		this.aOptionsButton.mOnClickEventHandler = function (pEvent)
            {
                if(this.TextColor === "rgba(231, 212, 184, 1.0)")
                {
                    this.TextColor = "rgba(0, 255, 0, 1.0)";
                }
                else if(this.TextColor === "rgba(0, 255, 0, 1.0)")
                {
                    this.TextColor = "rgba(231, 212, 184, 1.0)";
                }
            };
        this.aCreditsButton = new MainMenuButton(this, 10, 230, 180, 40,       "   Crédits ");
		this.aCreditsButton.mOnClickEventHandler = function (pEvent)
            {
                if(this.TextColor === "rgba(231, 212, 184, 1.0)")
                {
                    this.TextColor = "rgba(0, 255, 0, 1.0)";
                }
                else if(this.TextColor === "rgba(0, 255, 0, 1.0)")
                {
                    this.TextColor = "rgba(231, 212, 184, 1.0)";
                }
            };
        this.aTimer = 0;
        this.Visible = false;
        this.aState = WindowState.Closed
    }
    
	mVisible(pVisible)
	{
		this.Visible = pVisible;
		this.Components.forEach
		(
			vComponentFound=>
			{
				vComponentFound.Visible = pVisible;
			}
		);
	}

    mOnDropEventHandler(pEvent)
    {
        pEvent.MouseFocusable.Parent.mRemoveComponent(pEvent.MouseFocusable);
        pEvent.MouseFocusable.Parent = this;
        pEvent.MouseFocusable.Parent.mAddComponent(pEvent.MouseFocusable);
        pEvent.MouseFocusable.X = this.mDropZone(pEvent).X;
        pEvent.MouseFocusable.Y = this.mDropZone(pEvent).Y;
        pEvent.MouseFocusable.Width = this.mDropZone(pEvent).Width;
        pEvent.MouseFocusable.Height = this.mDropZone(pEvent).Height;
    }

    mOpen()
    {
        if(this.aState != WindowState.Opening.Width)
        {
            this.aState = WindowState.Opening.Width;
        }
        this.Visible = true;
        this.aTimer = 0;
    }

    mClose()
    {
        if(this.aState != WindowState.Closing.FadeOut)
        {
            this.aState = WindowState.Closing.FadeOut;
        }
        this.aTimer = 0;
    }

    mOnLoadEventHandler()
    {
        this.aTimer = 0;
    }

    mOnUnLoadEventHandler()
    {
        this.aTimer = 0;
    }

    mOnUpdateEventHandler(pCanvas, pDeltaTime)
    {
        const vSpeed = 500;
        const vMinSize = 16;
        const vTimerReset = 0;
        this.aTimer += pDeltaTime;
        this.Width = vMinSize;
        this.Height = vMinSize;
        switch(this.aState)
        {
            case WindowState.Opening.Width:
            {
                if(this.Visible)
                {
                    this.Width = this.aTimer * this.aMaxWidth / vSpeed;
                    if(this.Width > this.aMaxWidth)
                    {
                        this.Width = this.aMaxWidth;
                    }
                    if(this.aTimer >= vSpeed)
                    {
                        this.aTimer = vTimerReset;
                        this.aState = WindowState.Opening.Height;
                    }
                }                
            }break;
            case WindowState.Opening.Height:
            {
                this.Width = this.aMaxWidth;
                this.Height = this.aTimer * this.aMaxHeight / vSpeed;
                if(this.Height > this.aMaxHeight)
                {
                    this.Height = this.aMaxHeight;
                }
                if(this.aTimer >= vSpeed)
                {
                    this.aTimer = vTimerReset;
                    this.aState = WindowState.Opening.FadeIn;
                }                
            }break;
            case WindowState.Opening.FadeIn:
            {
                this.Width = this.aMaxWidth;
                this.Height = this.aMaxHeight;
                this.Components.forEach
                (
                    vComponentFound =>
                    {
                        vComponentFound.mShow();
                    }
                );
                if(this.aTimer >= vSpeed)
                {
                    this.aTimer = vTimerReset;
                    this.aState = WindowState.Opened;
                }
            }break;
            case WindowState.Opened:
            {
                this.Width = this.aMaxWidth;
                this.Height = this.aMaxHeight;
            }break;
            case WindowState.Closing.FadeOut:
            {                  
                this.Width = this.aMaxWidth;
                this.Height = this.aMaxHeight;                
                this.Components.forEach
                (
                    vComponentFound =>
                    {
                        vComponentFound.mHide();
                    }
                );
                if(this.aTimer >= vSpeed)
                {
                    this.aTimer = vTimerReset;
                    this.aState = WindowState.Closing.Height;
                }
            }break;
            case WindowState.Closing.Height:
            {                    
                this.Width = this.aMaxWidth;
                this.Height = this.aMaxHeight - (this.aTimer * this.aMaxHeight / vSpeed);
                if(this.Height < vMinSize)
                {
                    this.Height = vMinSize;
                }
                if(this.aTimer >= vSpeed)
                {
                    this.aTimer = 0;
                    this.aState = WindowState.Closing.Width;
                }
            }break;
            case WindowState.Closing.Width:
            {                    
                this.Width = this.aMaxWidth - (this.aTimer * this.aMaxWidth / vSpeed);
                this.Height = vMinSize;                 
                if(this.Width < vMinSize)
                {
                    this.Width = vMinSize;
                }
                if(this.aTimer >= vSpeed)
                {
                    this.aTimer = vTimerReset;
                    this.aState = WindowState.Closed;
                    this.Visible = false;
                }
            }break;
            case WindowState.Closed:
            {                    
                this.Width = vMinSize;
                this.Height = vMinSize;
                this.aComponentsAlpha = 0;
                this.Visible = false;
            }break;
        };
        this.X = (pCanvas.width - this.Width) / 2;
        this.Y = (pCanvas.height - this.Height) / 2;
    }

    mOnDrawEventHandler(pCanvas, pGraphicContext)
    {
        if(this.Visible)
        {
            pGraphicContext.globalAlpha = this.GlobalAlpha;

            pGraphicContext.save();
            pGraphicContext.translate(this.AbsoluteX, this.AbsoluteY);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.WindowBackGround.Index], "repeat"); 
            pGraphicContext.fillRect(0, 0, this.Width, this.Height);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.West.Index], "repeat");
            pGraphicContext.fillRect(0, 0, 7, this.Height);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.North.Index], "repeat");
            pGraphicContext.fillRect(0, 0, this.Width, 8);

            pGraphicContext.restore();

            //--------

            pGraphicContext.save();
            pGraphicContext.translate(this.AbsoluteX + this.Width - 16, this.AbsoluteY);

            pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.East.Index], "repeat");
            pGraphicContext.fillRect(9, 0, 7, this.Height);
            
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

			//----------
/*
			pGraphicContext.save();
            pGraphicContext.font = this.TextSize + ' ' + this.aFont.Name;
            pGraphicContext.beginPath();
            pGraphicContext.rect(this.AbsoluteX, this.AbsoluteY, this.Width, this.Height);
            pGraphicContext.clip();

            pGraphicContext.fillText(this.aText, this.AbsoluteX, this.AbsoluteY + this.Height-10);
            pGraphicContext.restore();
*/
            pGraphicContext.globalAlpha = 1;
        }
    }
}

export {MainMenuWindow};
export default {MainMenuWindow}; 