import {MouseFocusable} from "./MouseFocusable.js"
import {Loader, EImage} from "./Loader.js"
import {Automaton} from "./Automaton.js"

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

export const EPlayerDirrections = Object.freeze
(
	{
		N: {
			X: 0,
			Y: 2,
			Width: 64,
			Height: 64
		},
		E: {
			X:0,
			Y:5,
			Width: 64,
			Height: 64
		},
		S: {
			X: 0,
			Y: 4,
			Width: 64,
			Height: 64
		},
		W: {
			X: 0,
			Y: 3,
			Width: 64,
			Height: 64
		},
		FightN: {
			X: 0,
			Y: 6,
			Width: 64,
			Height: 64			
		},
		FightE: {
			X: 0,
			Y: 9,
			Width: 64,
			Height: 64			
		},
		FightS: {
			X: 0,
			Y: 8,
			Width: 64,
			Height: 64			
		},
		FightW: {
			X: 0,
			Y: 7,
			Width: 64,
			Height: 64			
		},
		Collect: {
			X: 0,
			Y: 1,
			Width: 64,
			Height: 64			
		},
		Finish: {
			X: 0,
			Y: 1,
			Width: 64,
			Height: 64
		},
		KO: {
			X: 0,
			Y: 10,
			Width: 64,
			Height: 64
		}
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
		this.aDirrection = EPlayerDirrections.S;
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
		this.aTimer += pDeltaTime;
		this.aAnimationTimer += pDeltaTime;
		this.aAutomaton.mHandle(this, pCanvas, pDeltaTime);
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
	{
		pGraphicContext.drawImage
		(
			Loader.Images[EImage.SpriteSheet.Index],
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