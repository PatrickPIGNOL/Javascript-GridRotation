import {Scene} from "./Scene.js";
import {GameMap} from "./GameMap.js";
import {Loader} from "./Loader.js";
import {EImage} from "./Loader.js";
import {Mouse} from "./Mouse.js";

export class LevelScene extends Scene
{
	static aInstance = null;
    static get Instance()
    {
        if(LevelScene.aInstance === null)
        {
            LevelScene.aInstance = new LevelScene();
        }
        return LevelScene.aInstance;
    }

    constructor()
    {
        super();
		this.aSeed = window.performance.now();
		this.aGameMap = null;
		this.aMouse = null;
    }

	mOnLoadEventHandler()
    {
		let vRandom = new Math.seedrandom(this.aSeed);
		let vStartPoint = {
			X: (Math.floor(vRandom() * 13) + 1),
			Y: (Math.floor(vRandom() * 13) + 1)
		} 
		if(!this.aGameMap)
		{
			this.aGameMap = new GameMap
			(
				this, 
				15, 
				this.aSeed, 
				vStartPoint
			);
			this.mAddOnUpdateEventListener(this.aGameMap);
			this.mAddOnDrawEventListener(this.aGameMap);
			this.mAddOnResizeEventListener(this.aGameMap);
			this.aMouse = Mouse.Instance;
			this.mAddOnAllEventListener(this.aMouse);
		}
	}

	mAddOnResizeEventHandler()
	{
		this.X = 0;
		this.Y = 0;
		this.Width = GameEngine.Instance.Canvas.width;
		this.Height = GameEngine.Instance.Canvas.height;
	}

	mOnUnLoadEventHandler()
    {
        this.aTimer = 0;
    }

    mOnUpdateEventHandler(pCanvas, pDeltaTime)
    {
        super.mOnUpdateEventHandler(pCanvas, pDeltaTime);
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
    {
		super.mOnDrawEventHandler(pCanvas, pGraphicContext);

		pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.MenuBackGround.Index], "repeat");
        pGraphicContext.fillRect(0, 0, pCanvas.width, pCanvas.height);
	}
}

export default {LevelScene}