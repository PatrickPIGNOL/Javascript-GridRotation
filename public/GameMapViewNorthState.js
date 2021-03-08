import {EGameMapStateType} from "./EGameMapStateType.js"
import {State} from "./State.js"
import {Loader} from "./Loader.js"
import {EImages} from "./EImages.js"
export class GameMapViewNorthState extends State
{
	static aInstance = null;
    static get Instance()
    {
        if(GameMapViewNorthState.aInstance === null)
        {
            GameMapViewNorthState.aInstance = new GameMapViewNorthState();
        }
        return GameMapViewNorthState.aInstance;
    }
	constructor()
	{
		super();
	}

	get Type()
	{
		return EGameMapStateType.View;
	}

	mReset()
	{
		
	}	

	mUpdate(pAutomaton, pObject, pCanvas, pDeltaTime)
	{
	}

	mDraw(pAutomaton, pObject, pCanvas, pGraphicContext)
	{
		for(let vYIndex = 0; vYIndex < pObject.Map.Height; vYIndex++)
		{		
			for(let vXIndex = 0; vXIndex < pObject.Map.Width; vXIndex++)
			{
				pGraphicContext.drawImage
				(
					Loader.Images[EImages.SpriteSheet.Index],
					pObject.Map.Map[vYIndex][vXIndex].X * pObject.Map.Map[vYIndex][vXIndex].Width,
					pObject.Map.Map[vYIndex][vXIndex].Y * pObject.Map.Map[vYIndex][vXIndex].Height,
					pObject.Map.Map[vYIndex][vXIndex].Width,
					pObject.Map.Map[vYIndex][vXIndex].Height,
					Math.floor(pObject.AbsoluteX + vXIndex * 32),
					Math.floor(pObject.AbsoluteY + vYIndex * 32),
					32,
					32
				);
			}
		}
	}
}

export default {GameMapViewNorthState: GameMapViewState}