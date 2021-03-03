import {State} from "./State.js"
import {EPlayerState, EPlayerDirrections} from "./Player.js"
import {PlayerWalkState} from "./PlayerWalkState.js"
import {PlayerStopState} from "./PlayerStopState.js"
import {PlayerKOState} from "./PlayerKOState.js"
import {EItemType} from "./Item.js"
export class PlayerCollectState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(PlayerCollectState.aInstance === null)
        {
            PlayerCollectState.aInstance = new PlayerCollectState();
        }
        return PlayerCollectState.aInstance;
    }

	constructor()
	{
		super();
		this.aAnimationTimer = 0;
		this.aTimer = 0;
	}

	get Type()
	{
		return EPlayerState.Collect;
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
		pObject.Dirrection = EPlayerDirrections.Collect;
		if(this.aAnimationTimer > 1000/3)
		{
			this.aAnimationTimer = 0;
			pObject.aImageIndex = (pObject.aImageIndex + 1) % 3;
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
						case EItemType.Heart:
						{
							vItemFound.Amount--;
							pObject.Life++;
							if(vItemFound.Amount <= 0)
							{
								pObject.Parent.mRemoveComponent(pObject.Parent.Items[vIndex]);
								pObject.Parent.mRemoveOnAllEventListener(pObject.Parent.Items[vIndex]);
								pObject.Parent.Items.splice(vIndex, 1);
								pAutomaton.mChangeState(PlayerWalkState.Instance);
								pObject.aImageIndex = 0;
								pObject.mCheckMap2();
							}
						}break;
						case EItemType.Coin:
						{
							vItemFound.Amount--;
							pObject.Coins++;
							if(vItemFound.Amount <= 0)
							{
								pObject.Parent.mRemoveComponent(pObject.Parent.Items[vIndex]);
								pObject.Parent.mRemoveOnAllEventListener(pObject.Parent.Items[vIndex]);
								pObject.Parent.Items.splice(vIndex, 1);
								pObject.aAutomaton.mChangeState(PlayerWalkState.Instance);
								pObject.aImageIndex = 0;
								pObject.mCheckMap2();
							}
						}break;
					}
				}
			}
		}
	}
}