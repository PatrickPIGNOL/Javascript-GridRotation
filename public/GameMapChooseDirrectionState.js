import {State} from "./State.js";
import {EGameStates} from "./GameMap.js";
import {GameMapWaitLaunchDiceState} from "./GameMapWaitLaunchDiceState.js";

export class GameMapChooseDirrectionState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapChooseDirrectionState.aInstance === null)
        {
            GameMapChooseDirrectionState.aInstance = new GameMapChooseDirrectionState();
        }
        return GameMapChooseDirrectionState.aInstance;
    }

	constructor()
	{
		super();
	}

	get Type()
	{
		return EGameStates.ChooseDirrection;
	}

	mReset()
	{
	}

	mHandle(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
		if(pObject.aPaths.Up.Count === pObject.aPaths.Max)
		{
			pObject.aButtonUp.Visible = true;
		}
		else
		{
			pObject.aButtonUp.Visible = false;
		}
		if(pObject.aPaths.UpRight.Count === pObject.aPaths.Max)
		{
			pObject.aButtonUpRight.Visible = true;
		}
		else
		{
			pObject.aButtonUpRight.Visible = false;
		}
		if(pObject.aPaths.Right.Count === pObject.aPaths.Max)
		{
			pObject.aButtonRight.Visible = true;
		}
		else
		{
			pObject.aButtonRight.Visible = false;
		}
		if(pObject.aPaths.DownRight.Count === pObject.aPaths.Max)
		{
			pObject.aButtonDownRight.Visible = true;
		}
		else
		{
			pObject.aButtonDownRight.Visible = false;
		}
		if(pObject.aPaths.Down.Count === pObject.aPaths.Max)
		{
			pObject.aButtonDown.Visible = true;
		}
		else
		{
			pObject.aButtonDown.Visible = false;
		}
		if(pObject.aPaths.DownLeft.Count === pObject.aPaths.Max)
		{
			pObject.aButtonDownLeft.Visible = true;
		}
		else
		{
			pObject.aButtonDownLeft.Visible = false;
		}
		if(pObject.aPaths.Left.Count === pObject.aPaths.Max)
		{
			pObject.aButtonLeft.Visible = true;
		}
		else
		{
			pObject.aButtonLeft.Visible = false;
		}
		if(pObject.aPaths.UpLeft.Count === pObject.aPaths.Max)
		{
			pObject.aButtonUpLeft.Visible = true;
		}
		else
		{
			pObject.aButtonUpLeft.Visible = false;
		}		
	}
}