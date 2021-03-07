import {GraphicComponent} from "./GraphicComponent.js";
import {DragDropEvent} from "./DragDropEvent.js";

export class MouseFocusable extends GraphicComponent
{
    constructor(pParent, pX, pY, pWidth, pHeight)
    {
        super();
        this.aComponents = new Array();
        this.aParent = pParent;
        if(this.aParent)
        {
            this.aParent.mAddComponent(this);
        }
        this.aX = pX;
        this.aY = pY;
        this.aWidth = pWidth;
        this.aHeight = pHeight;
        this.aDown = false;
        this.aDragable = false;
        this.aDraged = false;
        this.aDragDropEvent = null;
        this.aMouseFocusable = false;     
    }

    get DragDropEvent()
    {
        return this.aDragDropEvent;
    }

    get Dragable()
    {
        return this.aDragable;
    }

    set Dragable(pDragable)
    {
        this.aDragable = pDragable;
    }

    get Draged()
    {
        return this.aDraged;
    }

    set Draged(pDraged)
    {
        this.aDraged = pDraged;
    }

    get Components()
    {
        return this.aComponents;
    }
    
    mAddComponent(pComponent)
    {
        this.aComponents.push(pComponent);
        pComponent.mOnLoadEvent();
    }

    mRemoveComponent(pComponent)
    {
        let vIndex = this.aComponents.indexOf(pComponent);
        this.aComponents.splice(vIndex, 1);
    }

    get Parent()
    {
        return this.aParent;
    }

    set Parent(pParent)
    {
        this.aParent = pParent;
    }

    get AbsoluteX()
    {
        let vX = this.X;
        let vComponent = this;
        while(vComponent.Parent)
        {
            vComponent = vComponent.Parent;
            vX += vComponent.X;
        }
        return vX;
    }

    get AbsoluteY()
    {
        let vY = this.Y;
        let vComponent = this;
        while(vComponent.Parent)
        {
            vComponent = vComponent.Parent;
            vY += vComponent.Y;
        }
        return vY;
    }

    get X()
    {
        return this.aX;
    }

    set X(pX)
    {
        this.aX = pX;
    }

    get Y()
    {
        return this.aY;
    }

    set Y(pY)
    {
        this.aY = pY;
    }

    get Width()
    {
        return this.aWidth;
    }

    set Width(pWidth)
    {
        this.aWidth = pWidth;
    }

    get Height()
    {
        return this.aHeight;
    }

    set Height(pHeight)
    {
        this.aHeight = pHeight;
    }    

    get MouseFocus()
    {
        return this.aMouseFocus;
    }
    
    get MouseFocusable()
    {
        return this.aMouseFocusable;
    }

    set MouseFocusable(pMouseFocusable)
    {
        this.aMouseFocusable = pMouseFocusable;
    }

    mAllowDrop(pEvent)
    {
        false;
    }

    mDropZone(pEvent)
    {
		return null;
    }

    mOnClickEventHandler(pEvent)
    {
        this.aMouseFocus = this.mUpdateMouseFocus(pEvent);
        super.mOnClickEventHandler(pEvent);
        if(this.MouseFocus && (this.MouseFocus !== this))
        {
            this.aMouseFocus.mOnClickEvent(pEvent);
        }
    }

    mOnMouseDownEventHandler(pEvent)
    {
        this.aPreviousState = pEvent;
        if(this.MouseFocus && this.MouseFocus.Dragable && !this.aDragDropEvent )
        {
            this.aDragDropEvent = new DragDropEvent(this.MouseFocus, pEvent);
            this.MouseFocus.mOnDragEvent(this.aDragDropEvent);
        }
    }

    mOnMouseUpEventHandler(pEvent)
    {
        this.aPreviousState = pEvent;
        if(this.aDragDropEvent)
        {
            this.aDragDropEvent.mDrop(pEvent, this.MouseFocus);
            this.aDragDropEvent.MouseFocusable.mOnDragDropEvent(this.aDragDropEvent);
            this.aDragDropEvent = null;
        }
    }

    mOnMouseMoveEventHandler(pEvent)
    {
        super.mOnMouseMoveEventHandler(pEvent);
        this.aMouseFocus = this.mUpdateMouseFocus(pEvent);
        if 
        (
            this.aDragDropEvent 
        )
        {
            this.aDragDropEvent.mUpdate(pEvent, this.MouseFocus);
            this.aDragDropEvent.MouseFocusable.mOnDragMoveEventHandler(this.aDragDropEvent);
        }
        else if
        (
            this.MouseFocus 
            && 
            (this.MouseFocus !== this)
        )
        {
            this.MouseFocus.mOnMouseMoveEvent(pEvent);
        }
        this.aPreviousState = pEvent;
    }

    mUpdateMouseFocus(pMouse)
    {
        this.aMouseFocus = null;
        if
        (
            this.Visible
            &&
            (!this.Draged)
            &&
            (pMouse.clientX >= this.AbsoluteX)
            &&
            (pMouse.clientX <= this.AbsoluteX + this.Width)
            &&
            (pMouse.clientY >= this.AbsoluteY)
            &&
            (pMouse.clientY <= this.AbsoluteY + this.Height)
        )
        {
            for(let vIndex = 0; vIndex < this.aComponents.length; vIndex++)
            {
                const vComponentFound = this.aComponents[vIndex];
                if(this.aMouseFocus = vComponentFound.mUpdateMouseFocus(pMouse))
                {
                    return this.aMouseFocus;
                }
            }
            if(this.aMouseFocusable && this.aMouseFocus === null)
            {
                this.aMouseFocus = this;
            }
        }
        return this.aMouseFocus;
    }
}

export default {MouseFocusable};