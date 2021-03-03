import {State} from "./State.js"
import {EPlayerState, EPlayerDirrections} from "./Player.js"
import {GameMapFadeInState} from "./GameMapFadeInState.js"
import {PlayerStopState} from "./PlayerStopState.js"

export class PlayerFinishState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(PlayerFinishState.aInstance === null)
        {
            PlayerFinishState.aInstance = new PlayerFinishState();
        }
        return PlayerFinishState.aInstance;
    }

	constructor()
	{
		super();
		this.aAnimationTimer = 0;
		this.aTimer = 0;
	}

	get Type()
	{
		return EPlayerState.Finish;
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
		pObject.aDirrection = EPlayerDirrections.Finish;
		if(this.aAnimationTimer > 1000/6)
		{
			this.aAnimationTimer = 0;
			pObject.aImageIndex++;
			if(pObject.aImageIndex >= 5)
			{
				pObject.aImageIndex = 5;
			}
		}
		if(this.aTimer > 3000)
		{
			this.aTimer = 0;
			let vPercentages = pObject.Parent.Percentages;
			if(vPercentages.Dig > 50)
			{
				vPercentages.Dig -= 1;
				vPercentages.Enemy += 0.25;
				vPercentages.Web += 0.25;
				vPercentages.Coin += 0.25;
			}
			pObject.Parent.mNewLevel(window.performance.now(), {X: pObject.X, Y: pObject.Y}, vPercentages);
			pObject.Parent.aAutomaton.mChangeState(GameMapFadeInState.Instance);
			pAutomaton.mChangeState(PlayerStopState.Instance);
		}
	}
}