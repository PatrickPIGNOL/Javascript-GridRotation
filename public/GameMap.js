import {MouseFocusable} from "./MouseFocusable.js";
import {GameEngine} from "./GameEngine.js";
import {Loader} from "./Loader.js";
import {EImage} from "./Loader.js";
import {Player, EPlayerState, EPlayerDirrections} from "./Player.js";
import {Item} from "./Item.js";
import {EItemType} from "./Item.js";
import {ETileSheetIndex} from "./ETileSheetIndex.js";
import {GameMapButton} from "./GameMapButton.js";
import {Automaton} from "./Automaton.js";
import {GameMapFadeInState} from "./GameMapFadeInState.js";
import {GameMapLaunchDiceState} from "./GameMapLaunchDiceState.js"
import {GameMapWalkState} from "./GameMapWalkState.js"
import {PlayerWalkState} from "./PlayerWalkState.js"
export const EDirrections = Object.freeze
(
	{
		Up: 1,
		Down: 2,
		Left: 4,
		Right: 8
	}
);

export const EGameStates = Object.freeze(
	{
		FadeIn: 1,
		WaitLaunchDice: 2,
		LaunchDice: 3,
		FindPath:4,
		ChooseDirrection: 5,
		Walk: 6,
		Collect: 7,
		Finish: 8,
		KO: 9,
		FadeOut: 10
	}
);

export class GameMap extends MouseFocusable
{
	constructor(pParent, pMapSize, pSeed,  pStartPoint)
    {
		super
		(
			pParent, 
			0,
			0,
			pMapSize * 32 + 128, 
			pMapSize * 32
		);
		this.aPercentages = 
		{
			Dig: 100,
			Coin: 5,
			Enemy: 5,
			Web: 5,
			Heart: 1.5,
			Teleport: 1.5
		};
		this.aAutomaton = new Automaton(GameMapFadeInState.Instance);
		this.Visible = false;
		this.aChoosedDirrection = 0;
		this.aLaunchCount = 0;
		this.aPaths = null;
		this.aDiceClicked = false;
		this.aDiceValue = 6;
		this.aAlpha;
		this.aRandom;
		this.aDigCells = new Array();
		this.aItems = new Array();
		this.aMapSize = 15;
		this.aButtonUp = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 10 + 5 + 32, 
			5 + 96, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.Up,
			true
		);
		this.aButtonUp.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Up);
		};
		this.aButtonUpRight = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 15 + 5 + 64, 
			5 + 96, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.UpRight,
			true
		);
		this.aButtonUpRight.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Up + EDirrections.Right);
		};
		this.aButtonRight = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 15 + 5 + 64, 
			10 + 128, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.Right,
			true
		);
		this.aButtonRight.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Right);
		};
		this.aButtonDownRight = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 15 + 5 + 64, 
			15 + 160, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.DownRight,
			true
		);
		this.aButtonDownRight.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Right + EDirrections.Down);
		};
		this.aButtonDown = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 10 + 5 + 32, 
			15 + 160, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.Down,
			true
		);
		this.aButtonDown.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Down);
		};
		this.aButtonDownLeft = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 5 + 5, 
			15 + 160, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.DownLeft,
			true
		);
		this.aButtonDownLeft.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Down + EDirrections.Left);
		};
		this.aButtonLeft = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 5 + 5, 
			10 + 128, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.Left,
			true
		);
		this.aButtonLeft.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Left);
		};
		this.aButtonUpLeft = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 5 + 5, 
			5 + 96, 
			32, 
			32, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.UpLeft,
			true
		);
		this.aButtonUpLeft.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mChooseDirrection(EDirrections.Left + EDirrections.Up);
		};
		this.aButtonDice = new GameMapButton
		(
			this, 
			(this.aMapSize * 32) + 5 + 5, 
			20 + 224, 
			96, 
			96, 
			Loader.Images[EImage.SpriteSheet.Index], 
			ETileSheetIndex.Dice6,
			false
		);
		this.aButtonDice.mOnClickEventHandler = function(pEvent)
		{
			this.Parent.mPlayDice();
		};
		this.mOnResizeEvent();
		if(pMapSize)
		{
			this.aMapSize = pMapSize;
		}
		this.aCounts = 
		{
			Dig: 0,
			Coin: 0,
			Chest: 0,
			Enemy: 0,
			Tank: 0,
			Web: 0,
			Heart: 0,
			Hearts: 0,
			Teleport: 0
		};
		this.aMaxCounts =
		{
			Dig: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Dig / 100),
			Coin: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Coin / 100),
			Chest: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Chest / 100),
			Enemy: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Enemy / 100),
			Tank: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Tank / 100),
			Web: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Web / 100),
			Heart: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Heart / 100),
			Hearts: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Hearts / 100),
			Teleport: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Hearts / 100)
		};
		this.aMap = new Array();
		this.aRandom = null;
		this.mNewLevel(pSeed, pStartPoint);
	}

	get Percentages()
	{
		return this.aPercentages;
	}

	mOnResizeEventHandler()
	{
		this.X = (GameEngine.Instance.Canvas.width  - (this.aMapSize * 32)) / 2 - 64;
		this.Y = (GameEngine.Instance.Canvas.height - (this.aMapSize * 32)) / 2;
		this.aButtonUp.X = (this.aMapSize * 32) + 10 + 5 + 32;
		this.aButtonUp.Y = 5 + 96;
		this.aButtonUpRight.X = (this.aMapSize * 32) + 15 + 5 + 64;
		this.aButtonUpRight.Y = 5 + 96;
		this.aButtonRight.X = (this.aMapSize * 32) + 15 + 5 + 64;
		this.aButtonRight.Y = 10 + 128;
		this.aButtonDownRight.X = (this.aMapSize * 32) + 15 + 5 + 64;
		this.aButtonDownRight.Y = 15 + 160;
		this.aButtonDown.X = (this.aMapSize * 32) + 10 + 5 + 32;
		this.aButtonDown.Y = 15 + 160;
		this.aButtonDownLeft.X = (this.aMapSize * 32) + 5 + 5;
		this.aButtonDownLeft.Y = 15 + 160;
		this.aButtonLeft.X = (this.aMapSize * 32) + 5 + 5;
		this.aButtonLeft.Y = 10 + 128;
		this.aButtonUpLeft.X = (this.aMapSize * 32) + 5 + 5;
		this.aButtonUpLeft.Y = 5 + 96;
		this.aButtonDice.X = (this.aMapSize * 32) + 10 + 5;
		this.aButtonDice.Y = 20 + 224;
	}

	get Items()
	{
		return this.aItems;
	}

	mFindPath(pCount)
	{
		let vDirrections = 
		{
			Up: true,
			UpRight: true,
			Right: true,
			DownRight: true,
			Down: true,
			DownLeft: true,
			Left: true,
			UpLeft: true
		};
		let vResult = 
		{
			Max:0,
			Up: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			},
			UpRight: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			},
			Right: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			},
			DownRight: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			},
			Down: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			},
			DownLeft: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			},
			Left: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			},
			UpLeft: 
			{ 
				Count: 0,
				X: this.aPlayer.X, 
				Y: this.aPlayer.Y 
			}
		}
		let vTable = new Array();
		for(let vIndex = 0; vIndex <= pCount; vIndex++)
		{
			if
			(
				vDirrections.Up 
				&& 
				this.aPlayer.Y - vIndex >= 0 
				&& 
				this.aMap[this.aPlayer.Y - vIndex][this.aPlayer.X] !== ETileSheetIndex.Wall
			)
			{
				vResult.Up = 
				{ 
					Count: vIndex,
					X: this.aPlayer.X, 
					Y: this.aPlayer.Y - vIndex
				}
			}
			else if
			(
				vDirrections.Up 
				&& 
				this.aPlayer.Y - vIndex >= 0 
				&& 
				this.aMap[this.aPlayer.Y - vIndex][this.aPlayer.X] === ETileSheetIndex.Wall
			)
			{
				vDirrections.Up = false
			}
			if
			(
				vDirrections.UpRight 
				&& 
				this.aPlayer.X + vIndex < this.aMapSize 
				&& 
				this.aPlayer.Y - vIndex >= 0 
				&& 
				this.aMap[this.aPlayer.Y - vIndex][this.aPlayer.X + vIndex] !== ETileSheetIndex.Wall
			)
			{
				vResult.UpRight = 
				{ 
					Count: vIndex,
					X: this.aPlayer.X + vIndex,
					Y: this.aPlayer.Y - vIndex,
				}
			}
			else if
			(
				vDirrections.UpRight 
				&& 
				this.aPlayer.X + vIndex < this.aMapSize 
				&& 
				this.aPlayer.Y - vIndex >= 0 
				&& 
				this.aMap[this.aPlayer.Y - vIndex][this.aPlayer.X + vIndex] === ETileSheetIndex.Wall
			)
			{
				vDirrections.UpRight = false;
			}
			if
			(
				vDirrections.Right
				&&
				this.aPlayer.X + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y][this.aPlayer.X + vIndex] !== ETileSheetIndex.Wall
			)
			{
				vResult.Right = 
				{
					Count: vIndex,
					X: this.aPlayer.X + vIndex,
					Y: this.aPlayer.Y
				}
			}
			else if
			(
				vDirrections.Right
				&&
				this.aPlayer.X + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y][this.aPlayer.X + vIndex] === ETileSheetIndex.Wall
			)
			{
				vDirrections.Right = false;
			}
			if
			(
				vDirrections.DownRight
				&&
				this.aPlayer.X + vIndex < this.aMapSize
				&&
				this.aPlayer.Y + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y + vIndex][this.aPlayer.X + vIndex] !== ETileSheetIndex.Wall
			)
			{
				vResult.DownRight = 
				{
					Count: vIndex,
					X: this.aPlayer.X + vIndex,
					Y: this.aPlayer.Y + vIndex
				}
			}
			else if
			(
				vDirrections.DownRight
				&&
				this.aPlayer.X + vIndex < this.aMapSize
				&&
				this.aPlayer.Y + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y + vIndex][this.aPlayer.X + vIndex] === ETileSheetIndex.Wall
			)
			{
				vDirrections.DownRight = false;
			}
			if
			(
				vDirrections.Down
				&&
				this.aPlayer.Y + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y + vIndex][this.aPlayer.X] !== ETileSheetIndex.Wall
			)
			{
				vResult.Down = 
				{
					Count: vIndex,
					X: this.aPlayer.X,
					Y: this.aPlayer.Y + vIndex 
				}
			}
			else if
			(
				vDirrections.Down
				&&
				this.aPlayer.Y + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y + vIndex][this.aPlayer.X] === ETileSheetIndex.Wall
			)
			{
				vDirrections.Down = false;
			}
			if
			(
				vDirrections.DownLeft
				&&
				this.aPlayer.X - vIndex >= 0
				&&
				this.aPlayer.Y + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y + vIndex][this.aPlayer.X - vIndex] !== ETileSheetIndex.Wall
			)
			{
				vResult.DownLeft = 
				{
					Count: vIndex,
					X: this.aPlayer.X - vIndex,
					Y: this.aPlayer.Y + vIndex
				}
			}
			else if
			(
				vDirrections.DownLeft
				&&
				this.aPlayer.X - vIndex >= 0
				&&
				this.aPlayer.Y + vIndex < this.aMapSize
				&&
				this.aMap[this.aPlayer.Y + vIndex][this.aPlayer.X - vIndex] === ETileSheetIndex.Wall
			)
			{
				vDirrections.DownLeft = false;
			}
			if
			(
				vDirrections.Left
				&&
				this.aPlayer.X - vIndex >= 0
				&&
				this.aMap[this.aPlayer.Y][this.aPlayer.X - vIndex] !== ETileSheetIndex.Wall
			)
			{
				vResult.Left = 
				{
					Count: vIndex,
					X: this.aPlayer.X - vIndex,
					Y: this.aPlayer.Y
				}
			}
			else if
			(
				vDirrections.Left
				&&
				this.aPlayer.X - vIndex >= 0
				&&
				this.aMap[this.aPlayer.Y][this.aPlayer.X - vIndex] === ETileSheetIndex.Wall
			)
			{
				vDirrections.Left = false;
			}
			if
			(
				vDirrections.UpLeft
				&&
				this.aPlayer.X - vIndex >= 0
				&&
				this.aPlayer.Y - vIndex >= 0
				&&
				this.aMap[this.aPlayer.Y - vIndex][this.aPlayer.X - vIndex] !== ETileSheetIndex.Wall
			)
			{
				vResult.UpLeft = 
				{
					Count: vIndex,
					X: this.aPlayer.X - vIndex,
					Y: this.aPlayer.Y - vIndex
				}
			}
			else if
			(
				vDirrections.UpLeft
				&&
				this.aPlayer.X - vIndex >= 0
				&&
				this.aPlayer.Y - vIndex >= 0
				&&
				this.aMap[this.aPlayer.Y - vIndex][this.aPlayer.X - vIndex] === ETileSheetIndex.Wall
			)
			{
				vDirrections.UpLeft = false;
			}
		}
		vResult.Max = Math.max
		(
			vResult.Up.Count, 
			vResult.UpRight.Count, 
			vResult.Right.Count, 
			vResult.DownRight.Count, 
			vResult.Down.Count,
			vResult.DownLeft.Count,
			vResult.Left.Count,
			vResult.UpLeft.Count
		);

		return vResult;
	}

	mNewLevel(pSeed, pStartPoint, pPercentages)
	{
		this.aPercentages = 
		{
			Dig: 100,
			Coin: 5,
			Enemy: 5,
			Web: 5,
			Heart: 1.5,
			Teleport: 1.5
		};
		if(pPercentages)
		{
			this.aPercentages = pPercentages;
		}
		
		this.aCounts = 
		{
			Dig: 0,
			Coin: 0,
			Chest: 0,
			Enemy: 0,
			Tank: 0,
			Web: 0,
			Heart: 0,
			Hearts: 0,
			Teleport: 0
		};

		this.aMaxCounts =
		{
			Dig: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Dig / 100),
			Coin: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Coin / 100),
			Chest: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Chest / 100),
			Enemy: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Enemy / 100),
			Tank: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Tank / 100),
			Web: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Web / 100),
			Heart: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Heart / 100),
			Hearts: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Hearts / 100),
			Teleport: Math.floor((this.aMapSize-2) * (this.aMapSize-2) * this.aPercentages.Hearts / 100)
		};
		for(let vIndex = this.aItems.length - 1; vIndex >= 0; vIndex--)
		{
			const vItemFound = this.aItems[vIndex];
			this.mRemoveOnAllEventListener(vItemFound);
			this.aItems.splice(vIndex, 1);
		}

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

	mNewItems(pMaxCount, pItemType)
	{
		let vItems = 0;
		while(vItems < pMaxCount)
		{
			let vIndex = Math.floor(this.aRandom() * this.aDigCells.length);
			let vCell = this.aDigCells[vIndex];
			switch(pItemType)
			{
				default:
				{
					let vItem = new Item(this, vCell.X, vCell.Y, pItemType, Math.floor(this.aRandom() * 6 + 1));
					this.mAddOnAllEventListener(vItem);
					this.aItems.push(vItem);
				}break;
			}
			this.aDigCells.splice(vIndex, 1);
			vItems++;
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
		}
	}

	mDigCell(pPoint)
	{
		this.aMap[pPoint.Y][pPoint.X] = ETileSheetIndex.Floor;
	}

	mPlayDice()
	{
		this.aAutomaton.mChangeState(GameMapLaunchDiceState.Instance);		
		this.aButtonDice.Visible = false;
		this.aLaunchCount = 0;
	}

	mChooseDirrection(pDirrection)
	{
		this.aChoosedDirrection = pDirrection;
		this.aAutomaton.mChangeState(GameMapWalkState.Instance);
		this.aPlayer.aAutomaton.mChangeState(PlayerWalkState.Instance);
		this.aButtonUp.Visible = false;
		this.aButtonUpRight.Visible = false;
		this.aButtonRight.Visible = false;
		this.aButtonDownRight.Visible = false;
		this.aButtonDown.Visible = false;
		this.aButtonDownLeft.Visible = false;
		this.aButtonLeft.Visible = false;
		this.aButtonUpLeft.Visible = false;			
		switch(this.aChoosedDirrection)
		{
			case EDirrections.Up:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.N;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.Up.X,
						Y: this.aPaths.Up.Y
					},
					Steps: {
						X: 0,
						Y: -1
					},
					Dirrection: EDirrections.Up
				}
			}break;
			case EDirrections.Up + EDirrections.Right:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.N;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.UpRight.X,
						Y: this.aPaths.UpRight.Y
					},
					Steps: {
						X: +1,
						Y: -1
					},
					Dirrection: EDirrections.Up + EDirrections.Right
				}
			}break;
			case EDirrections.Right:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.E;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.Right.X,
						Y: this.aPaths.Right.Y
					},
					Steps: {
						X: +1,
						Y: 0
					},
					Dirrection: EDirrections.Right
				}
			}break;
			case EDirrections.Down + EDirrections.Right:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.E;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.DownRight.X,
						Y: this.aPaths.DownRight.Y,
					},
					Steps: {
						X: +1,
						Y: +1
					},
					Dirrection: EDirrections.Down + EDirrections.Right
				}
			}break;
			case EDirrections.Down:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.S;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.Down.X,
						Y: this.aPaths.Down.Y,
					},
					Steps: {
						X: 0,
						Y: +1
					},
					Dirrection: EDirrections.Down
				}
			}break;
			case EDirrections.Down + EDirrections.Left:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.W;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.DownLeft.X,
						Y: this.aPaths.DownLeft.Y,
					},
					Steps: {
						X: -1,
						Y: +1
					},
					Dirrection: EDirrections.Down + EDirrections.Left
				}
			}break;
			case EDirrections.Left:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.W;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.Left.X,
						Y: this.aPaths.Left.Y,
					},
					Steps: {
						X: -1,
						Y: 0
					},
					Dirrection: EDirrections.Left
				}
			}break;
			case EDirrections.Up + EDirrections.Left:
			{
				this.aPlayer.Dirrection = EPlayerDirrections.N;
				this.aPlayer.Path = {
					Start: {
						X: this.aPlayer.X,
						Y: this.aPlayer.Y
					},
					End: {
						X: this.aPaths.UpLeft.X,
						Y: this.aPaths.UpLeft.Y,
					},
					Steps: {
						X: -1,
						Y: -1
					},
					Dirrection: EDirrections.Up + EDirrections.Left
				}
			}break;
		}
	}

	mOnUpdateEventHandler(pCanvas, pDeltaTime)
	{
		this.aAutomaton.mHandle(this, pCanvas, pDeltaTime);
	}

	mOnDrawEventHandler(pCanvas, pGraphicContext)
	{
		super.mOnDrawEventHandler(pCanvas, pGraphicContext);
		pGraphicContext.globalAlpha = this.aAlpha;
		for(let vYIndex = 0; vYIndex < this.aMapSize; vYIndex++)
		{		
			for(let vXIndex = 0; vXIndex < this.aMapSize; vXIndex++)
			{
				pGraphicContext.drawImage
				(
					Loader.Images[EImage.SpriteSheet.Index],
					this.aMap[vYIndex][vXIndex].X * this.aMap[vYIndex][vXIndex].Width,
					this.aMap[vYIndex][vXIndex].Y * this.aMap[vYIndex][vXIndex].Height,
					this.aMap[vYIndex][vXIndex].Width,
					this.aMap[vYIndex][vXIndex].Height,
					Math.floor(this.AbsoluteX + vXIndex * 32),
					Math.floor(this.AbsoluteY + vYIndex * 32),
					32,
					32
				);
			}
		}

		pGraphicContext.fillStyle = pGraphicContext.createPattern(Loader.Images[EImage.WindowBackGround.Index], "repeat");

        pGraphicContext.fillRect
		(
			Math.floor(this.AbsoluteX + this.aMapSize * 32), 
			this.AbsoluteY, 
			128, 
			Math.floor(this.aMapSize * 32)
		);

		pGraphicContext.drawImage
		(
			Loader.Images[EImage.SpriteSheet.Index],
			ETileSheetIndex.Heart.X * ETileSheetIndex.Heart.Width,
			ETileSheetIndex.Heart.Y * ETileSheetIndex.Heart.Height,
			ETileSheetIndex.Heart.Width,
			ETileSheetIndex.Heart.Height,
			Math.floor(this.AbsoluteX + this.aMapSize * 32 + 5),
			this.AbsoluteY + 5,
			32,			
			32
		)

		pGraphicContext.font = '16px serif';
		pGraphicContext.fillStyle = "#FFFFFF";
		let vTextMetrics = pGraphicContext.measureText(this.aPlayer.Life);
		pGraphicContext.fillText
		(
			this.aPlayer.Life, 
			Math.floor(this.AbsoluteX + this.aMapSize * 32 + ((32 - vTextMetrics.width)/2) + 5), 
			this.AbsoluteY + 5 + 20
		);

		pGraphicContext.drawImage
		(
			Loader.Images[EImage.SpriteSheet.Index],
			ETileSheetIndex.Coin.X * ETileSheetIndex.Coin.Width,
			ETileSheetIndex.Coin.Y * ETileSheetIndex.Coin.Height,
			ETileSheetIndex.Coin.Width,
			ETileSheetIndex.Coin.Height,
		
			Math.floor(this.AbsoluteX + this.aMapSize * 32 + 5),
			this.AbsoluteY + 5 + 32,
			32,			
			32
		);

		pGraphicContext.font = '16px serif';
		pGraphicContext.fillStyle = "#FFFFFF";
		vTextMetrics = pGraphicContext.measureText(this.aPlayer.Coins);
		pGraphicContext.fillText
		(
			this.aPlayer.Coins, 
			Math.floor(this.AbsoluteX + this.aMapSize * 32 + ((32 - vTextMetrics.width)/2) + 5), 
			this.AbsoluteY + 5 + 20 + 32
		);
		
		if(this.aAutomaton.State.Type === EGameStates.ChooseDirrection)
		{
			for(let vIndex = 1; vIndex <= this.aPaths.Max; vIndex ++)
			{
				if(vIndex <= this.aPaths.Up.Count)
				{
					if(this.aPaths.Up.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + this.aPlayer.X * 32),
						Math.floor(this.AbsoluteY + (this.aPlayer.Y - vIndex) * 32),
						32, 
						32
					);
				}
				if(vIndex <= this.aPaths.UpRight.Count)
				{
					if(this.aPaths.UpRight.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + (this.aPlayer.X + vIndex) * 32), 
						Math.floor(this.AbsoluteY + (this.aPlayer.Y - vIndex) * 32), 
						32, 
						32
					);
				}
				if(vIndex <= this.aPaths.Right.Count)
				{
					if(this.aPaths.Right.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + (this.aPlayer.X + vIndex) * 32), 
						Math.floor(this.AbsoluteY + this.aPlayer.Y * 32), 
						32, 
						32
					)
				}
				if(vIndex <= this.aPaths.DownRight.Count)
				{
					if(this.aPaths.DownRight.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + (this.aPlayer.X + vIndex) * 32), 
						Math.floor(this.AbsoluteY + (this.aPlayer.Y + vIndex) * 32), 
						32, 
						32
					);
				}
				if(vIndex <= this.aPaths.Down.Count)
				{
					if(this.aPaths.Down.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + this.aPlayer.X * 32), 
						Math.floor(this.AbsoluteY + (this.aPlayer.Y + vIndex) * 32), 
						32, 
						32
					);
				}
				if(vIndex <= this.aPaths.DownLeft.Count)
				{
					if(this.aPaths.DownLeft.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + (this.aPlayer.X - vIndex) * 32), 
						Math.floor(this.AbsoluteY + (this.aPlayer.Y + vIndex) * 32), 
						32,
						32
					);
				}
				if(vIndex <= this.aPaths.Left.Count)
				{
					if(this.aPaths.Left.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + (this.aPlayer.X - vIndex) * 32), 
						Math.floor(this.AbsoluteY + this.aPlayer.Y * 32), 
						32, 
						32
					)
				}
				if(vIndex <= this.aPaths.UpLeft.Count)
				{
					if(this.aPaths.UpLeft.Count === this.aPaths.Max)
					{
						pGraphicContext.fillStyle = "rgba(0,255,0,0.25)";
					}
					else
					{
						pGraphicContext.fillStyle = "rgba(255,0,0,0.25)";
					}
					pGraphicContext.fillRect
					(
						Math.floor(this.AbsoluteX + (this.aPlayer.X - vIndex) * 32), 
						Math.floor(this.AbsoluteY + (this.aPlayer.Y - vIndex) * 32),
						32, 
						32
					)
				}
			}
		}
		pGraphicContext.globalAlpha = 1;
	}
};

export default {GameMap};