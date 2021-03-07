
export class Automaton
{
	constructor(pState)
	{
		this.aState = null;
		this.mChangeState(pState);
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
		if(this.aState)
		{
			this.aState.mReset();
		}
	}
}