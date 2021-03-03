import {State} from "./State.js";
import {ETileSheetIndex} from "./ETileSheetIndex.js"
import {GameMapFindPathState} from "./GameMapFindPathState.js"
import {EGameStates} from "./GameMap.js"
export class GameMapLaunchDiceState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapLaunchDiceState.aInstance === null)
        {
            GameMapLaunchDiceState.aInstance = new GameMapLaunchDiceState();
        }
        return GameMapLaunchDiceState.aInstance;
    }

	constructor()
	{
		super();
		this.aTimer = 0;
		this.aLaunchCount = 0;
	}

	get Type()
	{
		return EGameStates.LaunchDice;
	}

	mReset()
	{
		this.aTimer = 0;
		this.aLaunchCount = 0;
	}	

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
		this.aTimer += pDeltaTime;
		pObject.aButtonDice.Visible = false;
		if(pObject.aLaunchCount < 10 && this.aTimer > 50)
		{
			this.aLaunchCount++;
			this.aTimer = 0;
			pObject.aButtonDice.Angle += pObject.aRandom() * 2 * Math.PI;
			let vRandom = pObject.aDiceValue;
			do
			{
				vRandom = Math.floor(pObject.aRandom() * 6 + 1)
			}
			while(vRandom === pObject.aDiceValue)
			pObject.aDiceValue = vRandom;
			switch(pObject.aDiceValue)
			{
				case 1:
				{
					pObject.aButtonDice.TileSheetIndex = ETileSheetIndex.Dice1;
				}break;
				case 2:
				{
					pObject.aButtonDice.TileSheetIndex = ETileSheetIndex.Dice2;
				}break;
				case 3:
				{
					pObject.aButtonDice.TileSheetIndex = ETileSheetIndex.Dice3;
				}break;
				case 4:
				{
					pObject.aButtonDice.TileSheetIndex = ETileSheetIndex.Dice4;
				}break;
				case 5:
				{
					pObject.aButtonDice.TileSheetIndex = ETileSheetIndex.Dice5;
				}break;
				case 6:
				{
					pObject.aButtonDice.TileSheetIndex = ETileSheetIndex.Dice6;
				}break;
			}
		}
		else if(this.aLaunchCount >= 10)
		{
			pAutomaton.mChangeState(GameMapFindPathState.Instance);
		}
	}
}