export class Rectangle
{
    constructor(pX, pY, pWidth, pHeight)
    {
        this.aX = pX;
        this.aY = pY;
        this.aWidth = pWidth;
        this.aHeight = pHeight;
    }

    get X()
    {
        return this.aX;
    }

    get Y()
    {
        return this.aY;
    }

    get Width()
    {
        return this.aWidth;
    }

    get Height()
    {
        return this.aHeight;
    }
}

export default {Rectangle}