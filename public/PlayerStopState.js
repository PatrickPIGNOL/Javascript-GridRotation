import {State} from "./State.js"
import {EPlayerState, EPlayerDirrections} from "./Player.js"

export class PlayerStopState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(PlayerStopState.aInstance === null)
        {
            PlayerStopState.aInstance = new PlayerStopState();
        }
        return PlayerStopState.aInstance;
    }

	constructor()
	{
		super();
	}

	get Type()
	{
		return EPlayerState.Stop;
	}

	mReset()
	{
	}	

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{	
		pObject.aDirrection = EPlayerDirrections.S;
		pObject.aImageIndex = 0;
	}
}