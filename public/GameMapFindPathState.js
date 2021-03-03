import {State} from "./State.js";
import {EGameStates} from "./GameMap.js"
import {GameMapChooseDirrectionState} from "./GameMapChooseDirrectionState.js"
export class GameMapFindPathState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapFindPathState.aInstance === null)
        {
            GameMapFindPathState.aInstance = new GameMapFindPathState();
        }
        return GameMapFindPathState.aInstance;
    }

	constructor()
	{
		super();
	}

	get Type()
	{
		return EGameStates.FindPath;
	}

	mReset()
	{
	}	

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
		pObject.aPaths = pObject.mFindPath(pObject.aDiceValue);
		pAutomaton.mChangeState(GameMapChooseDirrectionState.Instance);		
	}
}