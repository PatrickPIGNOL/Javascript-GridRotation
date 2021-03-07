
export class Automaton
{
	constructor(pState)
	{
		this.aState = null;
		if(pState)
		{
			this.aState = pState;
		}
	}
	
	get State()
	{
		return this.aState;
	}

	mUpdate(pObject, pCanvas, pDeltaTime)
	{
		if(this.aState)
		{
			this.aState.mHandle(this, pObject, pCanvas, pDeltaTime);
		}
	}

	mDraw(pObject, pCanvas, pGraphicContext)
	{
		if(this.aState)
		{
			this.aState.mHandle(this, pObject, pCanvas, pGraphicContext);
		}
	}
	
	mChangeState(pState)
	{
		this.aState = pState;
		this.aState.mReset();
	}
}