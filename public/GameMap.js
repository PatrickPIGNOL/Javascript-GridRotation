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
		this.aMap = new Array();
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
			Dig: Math.floor((this.aMapSize - 2) * (this.aMapSize - 2) * this.aPercentages.Dig / 100)
		};

		this.aMap = new Array();
		
		for(let vYIndex = 0; vYIndex < this.aMapSize; vYIndex++)
		{
			let vRow = new Array();
			for(let vXIndex = 0; vXIndex < this.aMapSize; vXIndex++)
			{
					vRow.push(ETileSheetIndex.Wall);
			}
			this.aMap.push(vRow);
		}
		this.aSeed = window.performance.now();
		if(pSeed)
		{
			this.aSeed = pSeed;
		}
		this.aRandom = new Math.seedrandom(this.aSeed);
		this.aStartPoint = {
			X: Math.floor(this.aRandom() * this.aMapSize - 2) + 1,
			Y: Math.floor(this.aRandom() * this.aMapSize - 2) + 1
		}
		
		if(pStartPoint)
		{
			this.aStartPoint = pStartPoint;
		}
		this.aDigCells = new Array();
		this.mDigMap(this.aStartPoint, 0);
		this.mNewItems(this.aMaxCounts.Coin, EItemType.Coin);
		this.mNewItems(this.aMaxCounts.Enemy, EItemType.Enemy);
		this.mNewItems(this.aMaxCounts.Web, EItemType.Web);
		this.mNewItems(this.aMaxCounts.Heart, EItemType.Heart);
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
		let vAvailableDirrections = new Array();
		if(vPoint.Y > 1 && this.aMap[vPoint.Y - 1][vPoint.X] === ETileSheetIndex.Wall)
		{
			vAvailableDirrections.push(EDirrections.Up);
		}
		if(vPoint.X < this.aMapSize - 2 && this.aMap[vPoint.Y][vPoint.X + 1] === ETileSheetIndex.Wall)
		{
			vAvailableDirrections.push(EDirrections.Right)
		}
		if(vPoint.Y < this.aMapSize - 2 && this.aMap[vPoint.Y + 1][vPoint.X] === ETileSheetIndex.Wall)
		{
			vAvailableDirrections.push(EDirrections.Down);
		}
		if(vPoint.X > 1 && this.aMap[vPoint.Y][vPoint.X - 1] === ETileSheetIndex.Wall)
		{
			vAvailableDirrections.push(EDirrections.Left);
		}
		this.mDigCell(vPoint);
		this.aCounts.Dig++;
		
		if(this.aCounts.Dig >= this.aMaxCounts.Dig)
		{
			let vItem = new Item(this, vPoint.X, vPoint.Y, EItemType.Stairs, 0);
			this.mAddOnAllEventListener(vItem);
			this.aItems.push(vItem);
		}
		else if(vPoint !== this.aStartPoint)
		{
			this.aDigCells.push(vPoint);
		}

		while(vAvailableDirrections.length > 0)
		{
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
					case EDirrections.Up:
					{
						this.mDigMap({X: vPoint.X, Y: vPoint.Y - 1});
					}break;
					case EDirrections.Right:
					{
						this.mDigMap({X: vPoint.X + 1, Y: vPoint.Y});
					}break;
					case EDirrections.Down:
					{
						this.mDigMap({X: vPoint.X, Y: vPoint.Y + 1});
					}break;
					case EDirrections.Left:
					{
						this.mDigMap({X: vPoint.X - 1, Y: vPoint.Y});
					}break;
				}
			}
			vAvailableDirrections = new Array();
			if(vPoint.Y > 1 && this.aMap.Map[vPoint.Y - 1][vPoint.X] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.Up);
			}
			if(vPoint.X < this.aMapSize - 2 && this.aMap[vPoint.Y][vPoint.X + 1] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.Right)
			}
			if(vPoint.Y < this.aMapSize - 2 && this.aMap[vPoint.Y + 1][vPoint.X] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.Down);
			}
			if(vPoint.X > 1 && this.aMap.Map[vPoint.Y][vPoint.X - 1] === ETileSheetIndex.Wall)
			{
				vAvailableDirrections.push(EDirrections.Left);
			}
		}
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