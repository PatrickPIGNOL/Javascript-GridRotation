import {State} from "./State.js"
import {EPlayerState, EPlayerDirrections} from "./Player.js"
import {EDirrections} from "./GameMap.js"
import {PlayerCollectState} from "./PlayerCollectState.js"

export class PlayerWalkState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(PlayerWalkState.aInstance === null)
        {
            PlayerWalkState.aInstance = new PlayerWalkState();
        }
        return PlayerWalkState.aInstance;
    }

	constructor()
	{
		super();
		this.aTimer = 0;
	}

	get Type()
	{
		return EPlayerState.Walk;
	}

	mReset()
	{
		this.aTimer = 0;
	}	

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{	
		this.aTimer += pDeltaTime;
		switch(pObject.aPath.Dirrection)
		{
			case EDirrections.Up + EDirrections.Left:
			case EDirrections.Up:
			case EDirrections.Up + EDirrections.Right:
			{
				pObject.aDirrection = EPlayerDirrections.N;
			}break;
			case EDirrections.Right:
			case EDirrections.Down + EDirrections.Right:
			{
				pObject.aDirrection = EPlayerDirrections.E;
			}break;
			case EDirrections.Down:
			{
				pObject.aDirrection = EPlayerDirrections.S;
			}break;
			case EDirrections.Left:
			case EDirrections.Down + EDirrections.Left:
			{
				pObject.aDirrection = EPlayerDirrections.W;
			}break;
		}
		if(this.aTimer > 1000/9)
		{
			this.aTimer = 0;
			pObject.aImageIndex = ((pObject.aImageIndex) % 8) + 1;
		}
		pObject.X = pObject.X + pObject.aPath.Steps.X * (pDeltaTime / 1000);
		pObject.Y = pObject.Y + pObject.aPath.Steps.Y * (pDeltaTime / 1000);
		switch(pObject.aPath.Dirrection)
		{
			case EDirrections.Up:
			{
				if
				(
					pObject.X === pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y <= pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
			}break;
			case EDirrections.Up + EDirrections.Right:
			{
				if
				(
					pObject.X >= pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y <= pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
			}break;
			case EDirrections.Right:
			{
				if
				(
					pObject.X >= pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y === pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
				
			}break;
			case EDirrections.Down + EDirrections.Right:
			{
				if
				(
					pObject.X >= pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y >= pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
			}break;
			case EDirrections.Down:
			{
				if
				(
					pObject.X === pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y >= pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
			}break;
			case EDirrections.Down + EDirrections.Left:
			{
				if
				(
					pObject.X <= pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y >= pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
			}break;
			case EDirrections.Left:
			{
				if
				(
					pObject.X <= pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y === pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
			}break;
			case EDirrections.Up + EDirrections.Left:
			{
				if
				(
					pObject.X <= pObject.aPath.Start.X + pObject.aPath.Steps.X
					&&
					pObject.Y <= pObject.aPath.Start.Y + pObject.aPath.Steps.Y
				)
				{
					pObject.mCheckMap();
				}
			}break;
		}
	}
}