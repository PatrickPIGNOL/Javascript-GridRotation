import {MouseFocusable} from "./MouseFocusable.js"
import {Loader} from "./Loader.js"
import {EImages} from "./EImages.js"
import {GameMap} from "./GameMap.js";
import {GameEngine} from "./GameEngine.js"
import {Automaton} from "./Automaton.js"
import {EDirrections} from "./EDirrections.js"
export const EPlayerState = Object.freeze
(
	{
		Stop: 1,
		Walk: 2,
		Fight: 3,
		Collect: 4,
		Finish: 5,
		KO: 6
	}
);

export class Player extends MouseFocusable
{
	constructor(pParent, pX, pY)
	{
		super(pParent, pX, pY, 32, 32)
		this.aAutomaton = new Automaton(null);
		this.aLife = 8;
		this.aCoins = 0;
		this.aKills = 0;
		this.aSteps = 0;		
		this.aPoints = 0;
		this.aDirrection = EDirrections.North;
		this.aTimer = 0;
		this.aAnimationTimer = 0;
		this.aAutomaton.mChangeState(null);
		this.aImageIndex = 0;
		this.aPath = null;
	}

	get Dirrection()
	{
		return this.aDirrection;
	}

	set Dirrection(pDirrection)
	{
		this.aDirrection = pDirrection;
	}

	get Points()
	{
		return this.aPoints;
	}

	set Points(pPoints)
	{
		this.aPoints += pPoints;
	}

	get Level()
	{
		if(this.Points === 0)
		{
			return 0;
		}
		else
		{
			return Math.floor(Math.log2(this.aLevel + 1));
		}
	}

	LifeReset()
	{
		this.aLife = 8;
	}

	get Life()
	{
		return this.aLife;
	}
	
	set Life(pLife)
	{
		this.aLife = pLife;
	}

	CoinReset()
	{
		this.aCoins = 0;
	}

	get Coins()
	{
		return this.aCoins;
	}
	
	set Coins(pCoins)
	{
		this.aCoins = pCoins;
	}

	get Kills()
	{
		return this.aKills;
	}

	set Kills(pKills)
	{
		this.aKills = pKills;
	}

	get Steps()
	{
		return this.aSteps;
	}

	set Steps(pSteps)
	{
		this.aSteps = pSteps;
	}

	mFinishLevel()
	{
		
	}

	get Path()
	{
		return this.aPath;
	}

	set Path(pPath)
	{
		this.aPath = pPath;
	}

	mOnUpdateEventHandler(pCanvas, pDeltaTime)
	{
		this.aAutomaton.mUpdate(this, pCanvas, pDeltaTime);
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
	{
		pGraphicContext.drawImage
		(
			Loader.Images[EImages.SpriteSheet.Index],
			(this.aDirrection.X + this.aImageIndex) * this.aDirrection.Width, 
			this.aDirrection.Y * this.aDirrection.Height,
			this.aDirrection.Width, 
			this.aDirrection.Height, 
			this.Parent.AbsoluteX + this.X * 32, 
			this.Parent.AbsoluteY + this.Y * 32, 
			32, 
			32
		);
	}
}

export default {Player};