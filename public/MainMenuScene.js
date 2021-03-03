import {Scene} from "./Scene.js";
import {MainMenuWindow} from "./MainMenuWindow.js";
import {Mouse} from "./Mouse.js"
import {GameEngine} from "./GameEngine.js"
import {Loader, EImage} from "./Loader.js"
import {IntroScene} from "./IntroScene.js";
import {WindowBase} from "./WindowBase.js"

const EMainMenuStatus = Object.freeze
(
    {
        FadeIn:0,
        Wait:1,
        FadeOut:2,
        Closed:3
    }
);

class MainMenuScene extends Scene
{
    static aInstance = null;
    static get Instance()
    {
        if(MainMenuScene.aInstance === null)
        {
            MainMenuScene.aInstance = new MainMenuScene();
        }
        return MainMenuScene.aInstance;
    }

    constructor()
    {
        super();
        this.aAlpha = 0;
        this.aDown = false; 
        this.aMouse = null;
        this.aTimer = 0;
        this.aStatus = EMainMenuStatus.Closed;
        this.aMainMenuWindow = new MainMenuWindow(this, 0, 0, 200, 280);
        this.mAddOnUpdateEventListener(this.aMainMenuWindow);
        this.mAddOnDrawEventListener(this.aMainMenuWindow);
        this.aMouse = Mouse.Instance;
        this.mAddOnUpdateEventListener(this.aMouse);
        this.mAddOnDrawEventListener(this.aMouse);
        this.mAddOnMouseMoveEventListener(this.aMouse);
    }

    mOnLoadEventHandler()
    {
        const vCanvas = GameEngine.Instance.Canvas;
        this.aMouse = null;
        this.aAlpha = 0;
        this.aStatus = EMainMenuStatus.FadeIn;
        this.aTimer = 0;
        this.Visible = true;
    }

    mOnUnLoadEventHandler()
    {
        this.aTimer = 0;
    }

    mOnUpdateEventHandler(pCanvas, pDeltaTime)
    {
        super.mOnUpdateEventHandler(pCanvas, pDeltaTime);
        this.aTimer += pDeltaTime;
        switch(this.aStatus)
        {
            case EMainMenuStatus.FadeIn:
            {
                this.aAlpha = this.aTimer / 3000;
                if(this.aTimer > 3000)
                {
                    this.aTimer = 0;
                    this.aStatus = EMainMenuStatus.Wait;
                    this.aMainMenuWindow.mOpen(); 
                }   
            }break;
            case EMainMenuStatus.Wait:
            {   
                if(this.aTimer > 58000)
                {
                    this.aMainMenuWindow.mClose();
                }
                this.aAlpha = 1;
                if(this.aTimer > 60000)
                {
                    this.aTimer = 0;                 
                    this.aStatus = EMainMenuStatus.FadeOut;
                }
            }break;
            case EMainMenuStatus.FadeOut:
            {
                this.aAlpha = 1 - this.aTimer / 3000;
                if(this.aTimer > 3000)
                {
                    this.aTimer = 0;
                    this.aStatus = EMainMenuStatus.Closed;
                    GameEngine.Instance.mChangeScene(IntroScene.Instance);
                }
            }break;
            case EMainMenuStatus.Closed:
            {
                this.Visible = false;
            }break;
        }    
    }

    mOnDrawEventHandler(pCanvas, pGraphicContext)
    {
        pGraphicContext.globalAlpha = this.aAlpha;

        pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.MenuBackGround.Index], "repeat");
        pGraphicContext.fillRect(0, 0, pCanvas.width, pCanvas.height);
        
        pGraphicContext.globalAlpha = 1;
    }
}

export {EMainMenuStatus};
export {MainMenuScene};
export default {MainMenuScene};