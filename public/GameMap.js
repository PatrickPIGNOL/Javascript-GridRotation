import {MouseFocusable} from "./MouseFocusable.js";
import {GameEngine} from "./GameEngine.js";
import {Loader} from "./Loader.js";
import {EImages} from "./EImages.js"
import {Player, EPlayerState} from "./Player.js";
import {EDirrections} from "./EDirrections.js"
import {ETileSheetIndex} from "./ETileSheetIndex.js";
import {GameMapNewMapState} from "./GameMapNewMapState.js"
import {Automaton} from "./Automaton.js";

export class GameMap extends MouseFocusable
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
		this.aSeed = pSeed;
        this.aMap = {
			Map: new Array(),
        	Width: pWidth,
        	Height: pHeight
        }
		this.aPercentages = 
		{
			Dig: 50			
		};
		this.aAutomaton = new Automaton(GameMapNewMapState.Instance);
		this.Visible = false;
		this.aChoosedDirrection = 0;
		this.aLaunchCount = 0;
		this.aPaths = null;
		this.aDiceClicked = false;
		this.aDiceValue = 6;
		this.aAlpha;
		this.aRandom;
		this.aCounts = 
		{
			Dig: 0
		};
		this.aMaxCounts =
		{
			Dig: Math.floor((this.aMap.Width-2) * (this.aMap.Height - 2) * this.aPercentages.Dig / 100)
		};
		this.aRandom = null;
		this.aPlayer = null;
		this.mOnResizeEventHandler();
	}

	get Percentages()
	{
		return this.aPercentages;
	}

	get Map()
	{
		return this.aMap;
	}

	get Player()
	{
		return this.aPlayer;
	}

	get Automaton()
	{
		return this.aAutomaton;
	}

	mOnResizeEventHandler()
	{
		this.X = (GameEngine.Instance.Canvas.width  - this.Width) / 2;
		this.Y = (GameEngine.Instance.Canvas.height - this.Height) / 2;
	}

	mNewLevel(pSeed, pStartPoint, pPercentages)
	{
		this.aPercentages = 
		{
			Dig: 50
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
			Dig: Math.floor((this.aMap.Width - 2) * (this.aMap.Height-2) * this.aPercentages.Dig / 100)
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
			X: Math.floor(this.aRandom() * (this.aMap.Width - 2)) + 1,
			Y: Math.floor(this.aRandom() * (this.aMap.Height - 2)) + 1
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
		if(this.aMap.Map[vPoint.Y][vPoint.X] === ETileSheetIndex.Floor || vPoint.X < 1 || vPoint.Y < 1 || vPoint.Y > this.aMap.Height - 1 || vPoint.X > this.aMap.Width - 1)
		{
			return;
		}
		this.aMap.Map[vPoint.Y][vPoint.X] = ETileSheetIndex.Floor;
		this.aCounts.Dig++;		

		let vAvailableDirrections;
		do
		{
			if(this.aCounts.Dig >= this.aMaxCounts.Dig)
			{
				break;
			}
			else
			{
				vAvailableDirrections = new Array();
				if(vPoint.Y > 1 && this.aMap.Map[vPoint.Y - 1][vPoint.X] === ETileSheetIndex.Wall)
				{
					vAvailableDirrections.push(EDirrections.North);
				}
				if(vPoint.X < this.aMap.Width - 2 && this.aMap.Map[vPoint.Y][vPoint.X + 1] === ETileSheetIndex.Wall)
				{
					vAvailableDirrections.push(EDirrections.East)
				}
				if(vPoint.Y < this.aMap.Height - 2 && this.aMap.Map[vPoint.Y + 1][vPoint.X] === ETileSheetIndex.Wall)
				{
					vAvailableDirrections.push(EDirrections.South);
				}
				if(vPoint.X > 1 && this.aMap.Map[vPoint.Y][vPoint.X - 1] === ETileSheetIndex.Wall)
				{
					vAvailableDirrections.push(EDirrections.West);
				}
				if(vAvailableDirrections.length)
				{
					let vRandom = Math.floor(this.aRandom() * vAvailableDirrections.length);
					let vDirrection = vAvailableDirrections[vRandom];
					let vNewPoint;
					switch(vDirrection)
					{
						case EDirrections.North:
						{
							vNewPoint = {X: vPoint.X, Y: vPoint.Y - 1};
						}break;
						case EDirrections.East:
						{
							vNewPoint = {X: vPoint.X + 1, Y: vPoint.Y};
						}break;
						case EDirrections.South:
						{
							vNewPoint = {X: vPoint.X, Y: vPoint.Y + 1};
						}break;
						case EDirrections.West:
						{
							vNewPoint = {X: vPoint.X - 1, Y: vPoint.Y};
						}break;
					}
                    this.mDigMap(vNewPoint);
					vAvailableDirrections.splice(vRandom, 1);
				}
			}
		}while(vAvailableDirrections.length > 0);
	}

	mOnUpdateEventHandler(pCanvas, pDeltaTime)
	{
		this.aAutomaton.mUpdate(this, pCanvas, pDeltaTime);
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
	{
		super.mOnDrawEventHandler(pCanvas, pGraphicContext);
		this.aAutomaton.mDraw(this, pCanvas, pGraphicContext);
	}
};

export default {GameMap};