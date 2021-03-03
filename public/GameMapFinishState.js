import {EPlayerDirrections} from "./Player.js"
class GameMapFinishState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapFinishState.aInstance === null)
        {
            GameMapFinishState.aInstance = new GameMapFinishState();
        }
        return GameMapFinishState.aInstance;
    }
	
	constructor()
	{
		super();
		this.aTimer = 0;
	}

	get Type()
	{
		return EGameState.Finish;
	}

	mReset()
	{
		this.aTimer = 0;
	}	

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
		this.aTimer += pDeltaTime;
		pObject.aPlayer.Dirrection = EPlayerDirrections.Finish;
		if(this.aTimer > 1000/6)
		{
			pObject.aImageIndex++;
			this.aTimer = 0;
		}
	}
}