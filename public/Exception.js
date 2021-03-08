class Exception extends Error
{
	constructor(pMessage = "", pFileName = null, pLineNumber = null, pPrevious = null)
	{
		super(pMessage, pFileName, pLineNumber);
		this.aPrevious = pPrevious;
	}

	get Previous()
	{
		return this.aPrevious;
	}
}