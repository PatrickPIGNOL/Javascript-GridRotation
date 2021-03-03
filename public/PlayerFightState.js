import {State} from "./State.js"
import {EPlayerState, EPlayerDirrections} from "./Player.js"
import {PlayerWalkState} from "./PlayerWalkState.js"
import {PlayerStopState} from "./PlayerStopState.js"
import {PlayerKOState} from "./PlayerKOState.js"
import {EDirrections} from "./GameMap.js"
import {EItemType} from "./Item.js"
export class PlayerFightState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(PlayerFightState.aInstance === null)
        {
            PlayerFightState.aInstance = new PlayerFightState();
        }
        return PlayerFightState.aInstance;
    }

	constructor()
	{
		super();
		this.aAnimationTimer = 0;
		this.aTimer = 0;
	}

	get Type()
	{
		return EPlayerState.Fight;
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
		switch(pObject.aPath.Dirrection)
		{
			case EDirrections.Up:
			case EDirrections.Up + EDirrections.Left:
			case EDirrections.Up + EDirrections.Right:
			{
				pObject.Dirrection = EPlayerDirrections.FightN;
			}break;
			case EDirrections.Right:
			case EDirrections.Down + EDirrections.Right:
			{
				pObject.Dirrection = EPlayerDirrections.FightE;
			}break;
			case EDirrections.Down:
			{
				pObject.Dirrection = EPlayerDirrections.FightS;
			}break;
			case EDirrections.Left:
			case EDirrections.Down + EDirrections.Left:
			{
				pObject.Dirrection = EPlayerDirrections.FightW;
			}break;
		}
		if(this.aAnimationTimer > 1000/6)
		{
			this.aAnimationTimer = 0;
			pObject.aImageIndex = (pObject.aImageIndex + 1) % 6;
		}
		if(this.aTimer > 1000)
		{					
			this.aTimer = 0;
			for(let vIndex = pObject.Parent.Items.length - 1; vIndex >= 0; vIndex--)
			{
				const vItemFound = pObject.Parent.Items[vIndex];
				if
				(
					pObject.X === vItemFound.X
					&&
					pObject.Y === vItemFound.Y
				)
				{
					switch(vItemFound.Type)
					{
						case EItemType.Enemy:
						{
							pObject.aLife--;
							vItemFound.Amount--;
							if(pObject.aLife <= 0)
							{
								pAutomaton.mChangeState(PlayerKOState.Instance);
								pObject.aState = EPlayerState.KO;
								pObject.aImageIndex = 0;
								return;
							}
							if(vItemFound.Amount === 0)
							{
								pObject.Parent.mRemoveComponent(pObject.Parent.Items[vIndex]);
								pObject.Parent.mRemoveOnAllEventListener(pObject.Parent.Items[vIndex]);
								pObject.Parent.Items.splice(vIndex, 1);
								pAutomaton.mChangeState(PlayerWalkState.Instance);
								pObject.aState = EPlayerState.Walk;
								pObject.aImageIndex = 0;
								pObject.mCheckMap2();
							}
						}break;
						case EItemType.Web:
						{
							pObject.aCoins--;
							vItemFound.Amount--;
							if(vItemFound.Amount === 0)
							{
								pObject.Parent.mRemoveComponent(pObject.Parent.Items[vIndex]);
								pObject.Parent.mRemoveOnAllEventListener(pObject.Parent.Items[vIndex]);
								pObject.Parent.Items.splice(vIndex, 1);
								pAutomaton.mChangeState(PlayerStopState.Instance);
								pObject.aState = EPlayerState.Stop;
								pObject.aImageIndex = 0;
							}
						}break;
					}
					break;
				}
			}
		}
	}
}