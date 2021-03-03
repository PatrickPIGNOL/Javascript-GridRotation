class Dimensions
{
    constructor(pX, pY)
    {
        this.aX = pX;
        this.aY = pY;
    }
    
    get X()
    {
        return this.aX;
    }
    
    get Y()
    {
        return this.aY;
    }
    
    mAdd(pValue)
    {
        return new Dimensions(this.X + pValue, this.Y + pValue);
    }
    
    mAdd(pDimensions)
    {
        return new Dimensions(this.X + pDimensions.X, this.Y + pDimensions.Y);
    }

    mSubValue(pValue)
    {
        return new Dimensions(this.X - pValue, this.Y - pValue);
    }

    mSub(pDimensions)
    {
        return new Dimensions(this.X - pDimensions.X, this.Y - pDimensions.Y);
    }

    mMultiplyValue(pValue)
    {
        return new Dimensions(this.X * pValue, this.Y * pValue);
    }

    mMultiply(pDimensions)
    {
        return new Dimensions(this.X * pDimensions.X, this.Y * pDimensions.Y);
    }

    mDivideValue(pValue)
    {
        return new Dimensions(this.X / pValue, this.Y / pValue);
    }

    mDivide(pDimensions)
    {
        return new Dimensions(this.X / pDimensions.X, this.Y / pDimensions.Y);
    }
}

export { Dimensions };
export default { Dimensions };