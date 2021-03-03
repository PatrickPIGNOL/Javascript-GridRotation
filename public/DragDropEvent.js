export class DragDropEvent
{
    constructor(pMouseFocusable, pMouseOrigin)
    {
        this.aMouseFocusable = pMouseFocusable;
        this.aMouseFocusable.Draged = true;
        this.aParent = this.aMouseFocusable.Parent;
        this.aX = this.aMouseFocusable.X;
        this.aY = this.aMouseFocusable.Y;
        this.aWidth = this.aMouseFocusable.Width;
        this.aHeight = this.aMouseFocusable.Height;
        this.aMouseOrigin = pMouseOrigin;
        this.aCurrentMouse = pMouseOrigin;
        this.aTarget = null;
    }

    get MouseFocusable()
    {
        return this.aMouseFocusable;
    }
    
    get MouseOrigin()
    {
        return this.aMouseOrigin;
    }

    get CurrentMouse()
    {
        return this.aCurrentMouse;
    }

    get Target()
    {
        return this.aTarget;
    }

    mUpdate(pCurrentMouse, pTarget)
    {
        this.aCurrentMouse = pCurrentMouse;
        this.aTarget = pTarget;
        if(this.aTarget && this.aTarget.mAllowDrop(this))
        {
			let vRectangle = this.aTarget.mDropZone(this);
			if(vRectangle)
			{
				this.aMouseFocusable.X = vRectangle.X/* + this.aTarget.AbsoluteX*/;
				this.aMouseFocusable.Y = vRectangle.Y/* + this.aTarget.AbsoluteY*/;
				this.aMouseFocusable.Width = vRectangle.Width;
				this.aMouseFocusable.Height = vRectangle.Height;
			}
        }
        else
        {
            this.aMouseFocusable.X = 
            (this.aX - (this.aMouseOrigin.clientX - this.aParent.AbsoluteX)) + 
            (pCurrentMouse.clientX - this.aParent.AbsoluteX);
            this.aMouseFocusable.Y = (this.aY - (this.aMouseOrigin.clientY - this.aParent.AbsoluteY)) + (pCurrentMouse.clientY - this.aParent.AbsoluteY);
            this.aMouseFocusable.Width = this.aWidth;
            this.aMouseFocusable.Height = this.aHeight;
        }
    }

    mDrop(pCurrentMouse, pTarget)
    {
        this.aCurrentMouse = pCurrentMouse;
        this.aTarget = pTarget;
        this.aMouseFocusable.Draged = false;
        if
        (
            this.aTarget 
            && 
            this.aTarget.mAllowDrop(this)
        )
        {
            pTarget.mOnDropEvent(this);
        }
        else
        {
            this.aMouseFocusable.X = this.aX;
            this.aMouseFocusable.Y = this.aY;
            this.aMouseFocusable.Width = this.aWidth;
            this.aMouseFocusable.Height = this.aHeight;
        }
    }
}

export default {DragDropEvent}