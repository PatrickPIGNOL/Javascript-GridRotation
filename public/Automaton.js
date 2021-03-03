
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

	mHandle(pObject, pCanvas, pDeltaTime)
	{
		if(this.aState)
		{
			this.aState.mHandle(this, pObject, pCanvas, pDeltaTime);
		}
	}
	mChangeState(pState)
	{
		this.aState = pState;
		this.aState.mReset();
	}
}