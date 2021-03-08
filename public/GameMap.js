import {KeyboardFocusable} from "./KeyboardFocusable.js";
import {GameEngine} from "./GameEngine.js";
import {Player} from "./Player.js";
import {ETileSheetIndex} from "./ETileSheetIndex.js";
import {Automaton} from "./Automaton.js";
import {EDirrections} from "./EDirrections.js"
import {GameMapNewMapState} from "./GameMapNewMapState.js"

export class GameMap extends KeyboardFocusable
{
	constructor(pParent, pWidth, pHeight, pSeed,  pStartPoint)
    {
		super
		(
			pParent, 
			0,
			0,
			pWidth * 32, 
			pHeight * 32
		);
		this.mAddOnAllEventListener(this);
		this.aMap = {
			Map: new Array(),
			Width: pWidth,
			Height: pHeight
		}
		this.aPercentages = 
		{
			Dig: 100
		};
		this.aAutomaton = new Automaton(GameMapNewMapState.Instance);
		this.Visible = false;
		this.aLaunchCount = 0;
		this.aAlpha;
		this.aRandom = null
		this.aDigCells = new Array();
		this.mOnResizeEvent();
		this.aCounts = 
		{
			Dig: 0,
		};
		this.aMaxCounts =
		{
			Dig: Math.floor((this.aMap.Width - 2) * (this.aMap.Height - 2) * this.aPercentages.Dig / 100)
		};
	}
	
	get Map()
	{
		return this.aMap;
	}

	get Percentages()
	{
		return this.aPercentages;
	}

	mOnResizeEventHandler()
	{
		this.X = (GameEngine.Instance.Canvas.width  - (this.aMap.Width * 32)) / 2;
		this.Y = (GameEngine.Instance.Canvas.height - (this.aMap.Height * 32)) / 2;
	}

	mNewLevel(pSeed, pStartPoint, pPercentages)
	{
		this.aPercentages = 
		{
			Dig: 100
		};
		if(pPercentages)
		{
			this.aPercentages = pPercentages;
		}
		
		this.aCounts = 
		{
			Dig: 0
		};

		this.aMaxCounts =
		{
			Dig: Math.floor((this.aMap.Width - 2) * (this.aMap.Height - 2) * this.aPercentages.Dig / 100)
		};

		this.aMap.Map = new Array();
		
		for(let vYIndex = 0; vYIndex < this.aMap.Height; vYIndex++)
		{
			let vRow = new Array();
			for(let vXIndex = 0; vXIndex < this.aMap.Width; vXIndex++)
			{
					vRow.push(ETileSheetIndex.Wall);
			}
			this.aMap.Map.push(vRow);
		}
		this.aSeed = window.performance.now();
		if(pSeed)
		{
			this.aSeed = pSeed;
		}
		this.aRandom = new Math.seedrandom(this.aSeed);
		this.aStartPoint = {
			X: Math.floor(this.aRandom() * this.aMap.Width - 2) + 1,
			Y: Math.floor(this.aRandom() * this.aMap.Height - 2) + 1
		}
		
		if(pStartPoint)
		{
			this.aStartPoint = pStartPoint;
		}
		this.mDigMap(this.aStartPoint, 0);
		if(!this.aPlayer)
		{
			this.aPlayer = new Player(this, this.aStartPoint.X, this.aStartPoint.Y);
			this.mAddOnAllEventListener(this.aPlayer);
		}
		else
		{
			this.mRemoveOnAllEventListener(this.aPlayer);
			this.mRemoveComponent(this.aPlayer);
			this.mAddComponent(this.aPlayer);
			this.mAddOnAllEventListener(this.aPlayer);
		}
	}

	mDigMap(pPoint)
	{
		let vPoint = this.aStartPoint;
		if(pPoint)
		{
			vPoint = pPoint;
		}
		this.mDigCell(vPoint);
		this.aCounts.Dig++;		
		let vAvailableDirrections = new Array();
		do
		{
			vAvailableDirrections = new Array();
			if(vPoint.Y > 1 && this.aMap.Map[vPoint.Y - 1][vPoint.X] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.North);
			}
			if(vPoint.X < this.aMapSize - 2 && this.aMap[vPoint.Y][vPoint.X + 1] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.East)
			}
			if(vPoint.Y < this.aMapSize - 2 && this.aMap[vPoint.Y + 1][vPoint.X] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.South);
			}
			if(vPoint.X > 1 && this.aMap.Map[vPoint.Y][vPoint.X - 1] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.West);
			}
			if(this.aCounts.Dig >= this.aMaxCounts.Dig)
			{
				break;
			}
			else
			{
				let vRandom = Math.floor(this.aRandom() * vAvailableDirrections.length);
				let vDirrection = vAvailableDirrections[vRandom];
				switch(vDirrection)
				{
					case EDirrections.North:
					{
						this.mDigMap({X: vPoint.X, Y: vPoint.Y - 1});
					}break;
					case EDirrections.East:
					{
						this.mDigMap({X: vPoint.X + 1, Y: vPoint.Y});
					}break;
					case EDirrections.South:
					{
						this.mDigMap({X: vPoint.X, Y: vPoint.Y + 1});
					}break;
					case EDirrections.West:
					{
						this.mDigMap({X: vPoint.X - 1, Y: vPoint.Y});
					}break;
				}
			}
		}while(vAvailableDirrections.length > 0);
	}

	mDigCell(pPoint)
	{
		this.aMap.Map[pPoint.Y][pPoint.X] = ETileSheetIndex.Floor;
	}

	mOnUpdateEventHandler(pCanvas, pDeltaTime)
	{
		this.aAutomaton.mUpdate(this, pCanvas, pDeltaTime);
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
	{
		super.mOnDrawEventHandler(pCanvas, pGraphicContext);
		pGraphicContext.globalAlpha = this.aAlpha;		
		this.aAutomaton.mDraw(this, pCanvas, pGraphicContext);
		pGraphicContext.globalAlpha = 1;
	}
};

export default {GameMap};