import {State} from "./State.js"
import {EPlayerState, EPlayerDirrections} from "./Player.js"
import {IntroScene} from "./IntroScene.js"
import {PlayerStopState} from "./PlayerStopState.js"
import {GameEngine} from "./GameEngine.js"
export class PlayerKOState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(PlayerKOState.aInstance === null)
        {
            PlayerKOState.aInstance = new PlayerKOState();
        }
        return PlayerKOState.aInstance;
    }

	constructor()
	{
		super();
		this.aAnimationTimer = 0;
		this.aTimer = 0;
	}

	get Type()
	{
		return EPlayerState.KO;
	}

	mReset()
	{
		this.aAnimationTimer = 0;
		this.aTimer = 0;
	}	

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{	
		this.aAnimationTimer += pDeltaTime;
		this.aTimer += pDeltaTime;
		pObject.aDirrection = EPlayerDirrections.KO;
		if(this.aAnimationTimer > 1000/6)
		{
			this.aAnimationTimer = 0;
			pObject.aImageIndex++;
			if(pObject.aImageIndex >= 5)
			{
				pObject.aImageIndex = 5;
			}
		}
		if(this.aTimer > 5000)
		{
			this.aTimer = 0;
			GameEngine.Instance.mChangeScene(IntroScene.Instance);
			pObject.Parent.mNewLevel(window.performance.now(), {X: pObject.X, Y: pObject.Y});
			pObject.LifeReset();
			pObject.aCoins = 0;
			pObject.aAutomaton.mChangeState(PlayerStopState.Instance);
		}
	}
}