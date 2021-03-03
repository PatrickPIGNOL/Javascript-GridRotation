import {State} from "./State.js"
import {EPlayerState} from "./Player.js"
import {EGameStates} from "./GameMap.js"
import {GameMapWaitLaunchDiceState} from "./GameMapWaitLaunchDiceState.js"
export class GameMapWalkState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapWalkState.aInstance === null)
        {
            GameMapWalkState.aInstance = new GameMapWalkState();
        }
        return GameMapWalkState.aInstance;
    }
	constructor()
	{
		super();
	}

	get Type()
	{
		return EGameStates.Walk
	}

	mReset()
	{
	}	

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{	
		if(pObject.aPlayer.aAutomaton.State.Type === EPlayerState.Stop)
		{
			pAutomaton.mChangeState(GameMapWaitLaunchDiceState.Instance)
		}
	}
}