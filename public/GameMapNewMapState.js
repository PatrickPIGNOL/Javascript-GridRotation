import {EGameMapStateType} from "./EGameMapStateType.js"
import {State} from "./State.js"
import {GameMapViewState} from "./GameMapViewState.js"

export class GameMapNewMapState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapNewMapState.aInstance === null)
        {
            GameMapNewMapState.aInstance = new GameMapNewMapState();
        }
        return GameMapNewMapState.aInstance;
    }
	constructor()
	{
		super();
	}

	get Type()
	{
		return EGameMapStateType.NewMap;
	}

	mReset()
	{
		
	}

	mUpdate(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
		pObject.mNewLevel();
		pAutomaton.mChangeState(GameMapViewState.Instance);
	}

	mDraw(pAutomaton, pObject, pCanvas, pGraphicContext)
	{	
		
	}
}

export default {GameMapNewMapState}