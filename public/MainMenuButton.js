import {Button} from "./Button.js";
import {EFonts} from "./Loader.js"

const EMainMenuBoutonStatus = Object.freeze
(
    {
        FadeIn:0,
        Wait:1,
        FadeOut:2,
        Hided:3
    }
);

class MainMenuButton extends Button
{
    constructor(pParent, pX, pY, pWidth, pHeight, pText)
    {
        super(pParent, pX, pY, pWidth, pHeight, pText);        
        this.TextSize = "30px";
        this.TextColor = "rgba(231, 212, 184, 1.0)";
        this.Font = EFonts.Celexa;
        this.Visible = false;
        this.aState = EMainMenuBoutonStatus.FadeIn;
        this.aTimer = 0;
        this.GlobalAlpha = 0;    
    }

    mShow()
    {
        if(this.aState !== EMainMenuBoutonStatus.FadeIn)
        {
            this.aState = EMainMenuBoutonStatus.FadeIn;
            this.aTimer = 0;
            this.Visible = true;
            this.GlobalAlpha = 0;
        }
    }

    mHide()
    {
        if(this.aState !== EMainMenuBoutonStatus.FadeOut)
        {
            this.aState = EMainMenuBoutonStatus.FadeOut;
            this.GlobalAlpha = 1;
            this.aTimer = 0;
        }
    }

    mOnUpdateEventHandler(pCanvas, pDeltaTime)
    {
        const vSpeed = 500;
        this.aTimer += pDeltaTime;
        this.GlobalAlpha = 0;
        switch(this.aState)
        {
            case EMainMenuBoutonStatus.FadeIn:
            {
                this.GlobalAlpha = this.aTimer / vSpeed;
                if(this.GlobalAlpha > 1)
                {
                    this.GlobalAlpha = 1;
                }
                if(this.aTimer > vSpeed)
                {
                    this.aState = EMainMenuBoutonStatus.Wait;
                    this.aTimer = 0;
                }
            }break;
            case EMainMenuBoutonStatus.Wait:
            {
                this.GlobalAlpha = 1;
            }break;
            case EMainMenuBoutonStatus.FadeOut:
            {
                this.GlobalAlpha = 1 - (this.aTimer / vSpeed);
                if(this.GlobalAlpha < 0)
                {
                    this.GlobalAlpha = 0;
                }
                if(this.aTimer > vSpeed)
                {
                    this.aState = EMainMenuBoutonStatus.Hided;
                    this.Visible = false;
                    this.aTimer = 0;
                }
            }break;
            case EMainMenuBoutonStatus.Hided:
            {
                this.GlobalAlpha = 0;
            }break;
        }
    }
}

export {MainMenuButton};
export default {MainMenuButton};