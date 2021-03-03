import {State} from "./State.js";
import {EGameStates} from "./GameMap.js"
import {GameMapWaitLaunchDiceState} from "./GameMapWaitLaunchDiceState.js"

export class GameMapFadeInState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapFadeInState.aInstance === null)
        {
            GameMapFadeInState.aInstance = new GameMapFadeInState();
        }
        return GameMapFadeInState.aInstance;
    }

	constructor()
	{
		super();
		this.aTimer = 0;
	}

	get Type()
	{
		return EGameStates.FadeIn;
	}

	mReset()
	{
		this.aTimer = 0;
	}

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
		this.aTimer += pDeltaTime;
		pObject.aAlpha = 0 + this.aTimer / 2000;
		if(this.aTimer > 2000)
		{
			this.aTimer = 0;
			pObject.aAlpha = 1;
			pObject.Visible = true;
			pObject.aButtonDice.Visible = true;
			pAutomaton.mChangeState(GameMapWaitLaunchDiceState.Instance);
		}			
	}
}