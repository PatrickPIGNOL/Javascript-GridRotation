import {State} from "./State.js";
import {EGameStates} from "./GameMap.js"
export class GameMapWaitLaunchDiceState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapWaitLaunchDiceState.aInstance === null)
        {
            GameMapWaitLaunchDiceState.aInstance = new GameMapWaitLaunchDiceState();
        }
        return GameMapWaitLaunchDiceState.aInstance;
    }

	constructor()
	{
		super();		
	}

	get Type()
	{
		return EGameStates.WaitLaunchDice;
	}

	mReset()
	{
		
	}

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
		pObject.aButtonDice.Angle += pDeltaTime / 2000 % (2 * Math.PI);
		pObject.aButtonDice.Visible = true;
	}
}