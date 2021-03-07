export class Component
{
    constructor()
    {
        this.aOnClickEventListeners = new Array();
        this.aOnDoubleClickEventListeners = new Array();
        this.aOnDragEventListeners = new Array();
        this.aOnDragMoveEventListeners = new Array();
        this.aOnDragDropEventListeners = new Array();
        this.aOnDrawEventListeners = new Array();
        this.aOnLoadEventListeners = new Array();
        this.aOnKeyDownEventListeners = new Array();
        this.aOnKeyUpEventListeners = new Array();
        this.aOnMouseDownEventListeners = new Array();
        this.aOnMouseEnterEventListeners = new Array();
        this.aOnMouseLeaveEventListeners = new Array();
        this.aOnMouseMoveEventListeners = new Array();
        this.aOnMouseOutEventListeners = new Array();
        this.aOnMouseOverEventListeners = new Array();
        this.aOnMouseUpEventListeners = new Array();
        this.aOnTouchCancelEventListeners = new Array();
        this.aOnTouchEndEventListeners = new Array();
        this.aOnTouchLeaveEventListeners = new Array();
        this.aOnTouchMoveEventListeners = new Array();
        this.aOnTouchStartEventListeners = new Array(); 
        this.aOnResizeEventListeners = new Array();
        this.aOnUnLoadEventListeners = new Array();
        this.aOnUpdateEventListeners = new Array();
    }

    mOnClickEventHandler(pEvent)
    {
    }

    mOnDoubleClickEventHandler(pEvent)
    {
    }

    mOnDragEventHandler(pEvent)
    {
    }

    mOnDragMoveEventHandler(pEvent)
    {
    }

    mOnDragDropEventHandler(pEvent)
    {
    }

    mOnKeyDownEventHandler(pEvent)
    {
    }

    mOnKeyUpEventHandler(pEvent)
    {
    }

    mOnMouseDownEventHandler(pEvent)
    {
    }

    mOnMouseEnterEventHandler(pEvent)
    {
        pEvent.preventDefault();
        return false;
    }
    
    mOnMouseLeaveEventHandler(pEvent)
    {
        pEvent.preventDefault();
        return false;
    }
    
    mOnMouseMoveEventHandler(pEvent)
    {        
        pEvent.preventDefault();
        return false;
    }

    mOnMouseOutEventHandler(pEvent)
    {
        pEvent.preventDefault();
        return false;
    }

    mOnMouseOverEventHandler(pEvent)
    {
        pEvent.preventDefault();
        return false;
    }

    mOnMouseUpEventHandler(pEvent)
    {
    }
    
    mOnTouchCancelEventHandler(pEvent)
    {
    }

    mOnTouchEndEventHandler(pEvent)
    {
    }
    
    mOnTouchLeaveEventHandler(pEvent)
    {
    }

    mOnTouchMoveEventHandler(pEvent)
    {
    }

    mOnTouchStartEventHandler(pEvent)
    {
    }

    mOnLoadEventHandler()
    {

    }
    
    mOnUnLoadEventHandler()
    {
        
    }

    mOnUpdateEventHandler(pCanvas, pDeltaTime)
    {   
        
    }

    mOnDrawEventHandler(pCanvas, pGraphicContext)
    {

    }

    mOnResizeEventHandler()
    {

    }

    mOnClickEvent          (pEvent)
    { 
        this.aOnClickEventListeners.forEach
        (
            vOnClickEventListener=>
            {
                if(vOnClickEventListener)
                {
                    if(vOnClickEventListener === this)
                    {
                        vOnClickEventListener.mOnClickEventHandler(pEvent);
                    }
                    else
                    {
                        vOnClickEventListener.mOnClickEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnDoubleClickEvent    (pEvent)
    { 
        this.aOnDoubleClickEventListeners.forEach
        (
            vOnDoubleClickEventListener=>
            {
                if(vOnDoubleClickEventListener)
                {
                    if(vOnDoubleClickEventListener === this)
                    {
                        vOnDoubleClickEventListener.mOnDoubleClickEventHandler(pEvent);
                    }
                    else
                    {
                        vOnDoubleClickEventListener.mOnDoubleClickEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnDragEvent(pEvent)
    {
        this.aOnDragEventListeners.forEach
        (
            vOnDragEventListener=>
            {
                if(vOnDragEventListener)
                {
                    if(vOnDragEventListener === this)
                    {
                        vOnDragEventListener.mOnDragEventHandler(pEvent);
                    }
                    else
                    {
                        vOnDragEventListener.mOnDragEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnDragEvent(pEvent)
    {
        this.aOnDragEventListeners.forEach
        (
            vOnDragEventListener=>
            {
                if(vOnDragEventListener)
                {
                    if(vOnDragEventListener === this)
                    {
                        vOnDragEventListener.mOnDragEventHandler(pEvent);
                    }
                    else
                    {
                        vOnDragEventListener.mOnDragEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnDragMoveEvent(pEvent)
    {
        this.aOnDragMoveEventListeners.forEach
        (
            vOnDragMoveEventListener=>
            {
                if(vOnDragMoveEventListener)
                {
                    if(vOnDragMoveEventListener === this)
                    {
                        vOnDragMoveEventListener.mOnDragMoveEventHandler(pEvent);
                    }
                    else
                    {
                        vOnDragMoveEventListener.mOnDragMoveEvent(pEpEvent);
                    }
                }
            }
        );
    }

    mOnDragDropEvent(pEvent)
    {
        this.aOnDragDropEventListeners.forEach
        (
            vOnDragDropEventListener=>
            {
                if(vOnDragDropEventListener)
                {
                    if(vOnDragDropEventListener === this)
                    {
                        vOnDragDropEventListener.mOnDragDropEventHandler(pEvent);
                    }
                    else
                    {
                        vOnDragDropEventListener.mOnDragDropEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnDropEvent(pEvent)
    {
        this.aOnDropEventListeners.forEach
        (
            vOnDropEventListener=>
            {
                if(vOnDropEventListener)
                {
                    if(vOnDropEventListener === this)
                    {
                        vOnDropEventListener.mOnDropEventHandler(pEvent);
                    }
                    else
                    {
                        vOnDropEventListener.mOnDropEvent(pEvent);
                    }
                }
            }
        );
    }
    
    mOnKeyDownEvent        (pEvent)
    { 
        this.aOnKeyDownEventListeners.forEach
        (
            vOnKeyDownEventListener=>
            {
                if(vOnKeyDownEventListener)
                {
                    if(vOnKeyDownEventListener === this)
                    {
                        vOnKeyDownEventListener.mOnKeyDownEventHandler(pEvent);
                    }
                    else
                    {
                        vOnKeyDownEventListener.mOnKeyDownEvent(pEvent);
                    }
                }
            }
        );
    }
    
    mOnKeyUpEvent          (pEvent)
    { 
        this.aOnKeyUpEventListeners.forEach
        (
            vOnKeyUpEventListener=>
            {
                if(vOnKeyUpEventListener)
                {
                    if(vOnKeyUpEventListener === this)
                    {
                        vOnKeyUpEventListener.mOnKeyUpEventHandler(pEvent);
                    }
                    else
                    {
                        vOnKeyUpEventListener.mOnKeyUpEvent(pEvent);
                    }
                }
            }
        );
    }
    
    mOnMouseDownEvent      (pEvent)
    { 
        this.aOnMouseDownEventListeners.forEach
        (
            vOnMouseDownEventListener=>
            {
                if(vOnMouseDownEventListener)
                {
                    if(vOnMouseDownEventListener === this)
                    {
                        vOnMouseDownEventListener.mOnMouseDownEventHandler(pEvent);
                    }
                    else
                    {
                        vOnMouseDownEventListener.mOnMouseDownEvent(pEvent);
                    }
                }
            }
        );
    }
    
    mOnMouseEnterEvent     (pEvent)
    { 
        this.aOnMouseEnterEventListeners.forEach
        (
            vOnMouseEnterEventListener=>
            {
                if(vOnMouseEnterEventListener)
                {
                    if(vOnMouseEnterEventListener === this)
                    {
                        vOnMouseEnterEventListener.mOnMouseEnterEventHandler(pEvent);
                    }
                    else
                    {
                        vOnMouseEnterEventListener.mOnMouseEnterEvent(pEvent);
                    }
                }
            }
        );
    }
    
    mOnMouseLeaveEvent     (pEvent)
    { 
        this.aOnMouseLeaveEventListeners.forEach
        (
            vOnMouseLeaveEventListener=>
            {
                if(vOnMouseLeaveEventListener)
                {
                    if(vOnMouseLeaveEventListener === this)
                    {
                        vOnMouseLeaveEventListener.mOnMouseLeaveEventHandler(pEvent);
                    }
                    else
                    {
                        vOnMouseLeaveEventListener.mOnMouseLeaveEvent(pEvent);                        
                    }
                }
            }
        );
    }
    
    mOnMouseMoveEvent      (pEvent)
    { 
        this.aOnMouseMoveEventListeners.forEach
        (
            vOnMouseMoveEventListener=>
            {
                if(vOnMouseMoveEventListener)
                {
                    if(vOnMouseMoveEventListener === this)
                    {
                        vOnMouseMoveEventListener.mOnMouseMoveEventHandler(pEvent);
                    }
                    else
                    {
                        vOnMouseMoveEventListener.mOnMouseMoveEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnMouseOutEvent       (pEvent)
    { 
        this.aOnMouseOutEventListeners.forEach
        (
            vOnMouseOutEventListener=>
            {
                if(vOnMouseOutEventListener)
                {
                    if(vOnMouseOutEventListener === this)
                    {
                        vOnMouseOutEventListener.mOnMouseOutEventHandler(pEvent);
                    }
                    else
                    {
                        vOnMouseOutEventListener.mOnMouseOutEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnMouseOverEvent      (pEvent)
    { 
        this.aOnMouseOverEventListeners.forEach
        (
            vOnMouseOverEventListener=>
            {
                if(vOnMouseOverEventListener)
                {
                    if(vOnMouseOverEventListener === this)
                    {
                        vOnMouseOverEventListener.mOnMouseOverEventHandler(pEvent);
                    }
                    else
                    {
                        vOnMouseOverEventListener.mOnMouseOverEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnMouseUpEvent        (pEvent)
    { 
        this.aOnMouseUpEventListeners.forEach
        (
            vOnMouseUpEventListener=>
            {
                if(vOnMouseUpEventListener)
                {
                    if(vOnMouseUpEventListener === this)
                    {
                        vOnMouseUpEventListener.mOnMouseUpEventHandler(pEvent);
                    }
                    else
                    {
                        vOnMouseUpEventListener.mOnMouseUpEvent(pEvent); 
                    }
                }
            }
        );
    }    

    mOnTouchCancelEvent    (pEvent)
    { 
        this.aOnTouchCancelEventListeners.forEach
        (
            vOnTouchCancelEventListener=>
            {
                if(vOnTouchCancelEventListener)
                {
                    if(vOnTouchCancelEventListener === this)
                    {
                        vOnTouchCancelEventListener.mOnTouchCancelEventHandler(pEvent);
                    }
                    else
                    {
                        vOnTouchCancelEventListener.mOnTouchCancelEvent(pEvent);                        
                    }
                }
            }
        );
    }

    mOnTouchEndEvent       (pEvent)
    { 
        this.aOnTouchEndEventListeners.forEach
        (
            vOnTouchEndEventListener=>
            {
                if(vOnTouchEndEventListener)
                {
                    if(vOnTouchEndEventListener === this)
                    {
                        vOnTouchEndEventListener.mOnTouchEndEventHandler(pEvent);
                    }
                    else
                    {
                        vOnTouchEndEventListener.mOnTouchEndEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnTouchLeaveEvent     (pEvent)
    { 
        this.aOnTouchLeaveEventListeners.forEach
        (
            vOnTouchLeaveEventListener=>
            {
                if(vOnTouchLeaveEventListener)
                {
                    if(vOnTouchLeaveEventListener === this)
                    {
                        vOnTouchLeaveEventListener.mOnTouchLeaveEventHandler(pEvent);
                    }
                    else
                    {
                        vOnTouchLeaveEventListener.mOnTouchLeaveEventHandler(pEvent);
                    }
                }
            }
        );
    }

    mOnTouchMoveEvent      (pEvent)
    { 
        this.aOnTouchMoveEventListeners.forEach
        (
            vOnTouchMoveEventListener=>
            {
                if(vOnTouchMoveEventListener)
                {
                    if(vOnTouchMoveEventListener === this)
                    {
                        vOnTouchMoveEventListener.mOnTouchMoveEventHandler(pEvent);
                    }
                    else
                    {
                        vOnTouchMoveEventListener.mOnTouchMoveEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnTouchStartEvent     (pEvent)
    { 
        this.aOnTouchStartEventListeners.forEach
        (
            vOnTouchStartEventListener=>
            {
                if(vOnTouchStartEventListener)
                {
                    if(vOnTouchStartEventListener === this)
                    {
                        vOnTouchStartEventListener.mOnTouchStartEventHandler(pEvent);
                    }
                    else
                    {
                        vOnTouchStartEventListener.mOnTouchStartEvent(pEvent);
                    }
                }
            }
        );
    }

    mOnLoadEvent          ()
    { 
        this.aOnLoadEventListeners.forEach
        (
            vOnLoadEventListener=>
            {
                if(vOnLoadEventListener)
                {
                    if(vOnLoadEventListener === this)
                    {
                        vOnLoadEventListener.mOnLoadEventHandler();
                    }
                    else
                    {
                        vOnLoadEventListener.mOnLoadEvent();                        
                    }
                }
            }
        );
    }

    mOnUnLoadEvent          ()
    {
        this.aOnUnLoadEventListeners.forEach
        (
            vOnUnLoadEventListener=>
            {
                if(vOnUnLoadEventListener)
                {
                    if(vOnUnLoadEventListener === this)
                    {
                        vOnUnLoadEventListener.mOnUnLoadEventHandler();
                    }
                    else
                    {
                        vOnUnLoadEventListener.mOnUnLoadEvent();
                    }
                }
            }
        );
    }

    mOnUpdateEvent(pCanvas, pDeltaTime)
    {
        this.aOnUpdateEventListeners.forEach
        (
            vOnUpdateEventListener=>
            {
                if(vOnUpdateEventListener)
                {
                    if(vOnUpdateEventListener === this)
                    {
                        vOnUpdateEventListener.mOnUpdateEventHandler(pCanvas, pDeltaTime);
                    }
                    else
                    {
                        vOnUpdateEventListener.mOnUpdateEvent(pCanvas, pDeltaTime);
                    }
                }
            }
        );
    }

    mOnDrawEvent(pCanvas, pGraphicContext)
    {
        this.aOnDrawEventListeners.forEach
        (
            vOnDrawEventListener=>
            {
                if(vOnDrawEventListener)
                {
                    if(vOnDrawEventListener === this)
                    {
                        vOnDrawEventListener.mOnDrawEventHandler(pCanvas, pGraphicContext);
                    }
                    else
                    {
                        vOnDrawEventListener.mOnDrawEvent(pCanvas, pGraphicContext);
                    }
                }
            }
        );
    }

    mOnResizeEvent(pCanvas)
    {
        this.aOnResizeEventListeners.forEach
        (
            vOnResizeEventListener=>
            {
                if(vOnResizeEventListener)
                {
                    if(vOnResizeEventListener === this)
                    {
                        vOnResizeEventListener.mOnResizeEventHandler(pCanvas);    
                    }
                    else
                    {
                        vOnResizeEventListener.mOnResizeEvent(pCanvas);
                    }
                }
            }
        );
    }

    mAddOnAllEventListener(pEventListener)
    {
        if(pEventListener)
        {
            this.mAddOnClickEventListener       (pEventListener);
            this.mAddOnDoubleClickEventListener (pEventListener);
            this.mAddOnDragEventListener        (pEventListener);
            this.mAddOnDragMoveEventListener    (pEventListener);
            this.mAddOnDragDropEventListener    (pEventListener);
            this.mAddOnKeyDownEventListener     (pEventListener);
            this.mAddOnKeyUpEventListener       (pEventListener);
            this.mAddOnMouseDownEventListener   (pEventListener);
            this.mAddOnMouseEnterEventListener  (pEventListener);
            this.mAddOnMouseLeaveEventListener  (pEventListener);
            this.mAddOnMouseMoveEventListener   (pEventListener);
            this.mAddOnMouseOutEventListener    (pEventListener);
            this.mAddOnMouseOverEventListener   (pEventListener);
            this.mAddOnMouseUpEventListener     (pEventListener);
            this.mAddOnTouchCancelEventListener (pEventListener);
            this.mAddOnTouchEndEventListener    (pEventListener);
            this.mAddOnTouchLeaveEventListener  (pEventListener);
            this.mAddOnTouchMoveEventListener   (pEventListener);
            this.mAddOnTouchStartEventListener  (pEventListener);
            this.mAddOnLoadEventListener        (pEventListener);
            this.mAddOnUnLoadEventListener      (pEventListener);
            this.mAddOnUpdateEventListener      (pEventListener);
            this.mAddOnDrawEventListener        (pEventListener);
            this.mAddOnResizeEventListener      (pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnAllEventListener(pEventListener)
	{
		if(pEventListener)
        {
            this.mRemoveOnClickEventListener       (pEventListener);
            this.mRemoveOnDoubleClickEventListener (pEventListener);
            this.mRemoveOnDragEventListener        (pEventListener);
            this.mRemoveOnDragMoveEventListener    (pEventListener);
            this.mRemoveOnDragDropEventListener    (pEventListener);
            this.mRemoveOnKeyDownEventListener     (pEventListener);
            this.mRemoveOnKeyUpEventListener       (pEventListener);
            this.mRemoveOnMouseDownEventListener   (pEventListener);
            this.mRemoveOnMouseEnterEventListener  (pEventListener);
            this.mRemoveOnMouseLeaveEventListener  (pEventListener);
            this.mRemoveOnMouseMoveEventListener   (pEventListener);
            this.mRemoveOnMouseOutEventListener    (pEventListener);
            this.mRemoveOnMouseOverEventListener   (pEventListener);
            this.mRemoveOnMouseUpEventListener     (pEventListener);
            this.mRemoveOnTouchCancelEventListener (pEventListener);
            this.mRemoveOnTouchEndEventListener    (pEventListener);
            this.mRemoveOnTouchLeaveEventListener  (pEventListener);
            this.mRemoveOnTouchMoveEventListener   (pEventListener);
            this.mRemoveOnTouchStartEventListener  (pEventListener);
            this.mRemoveOnLoadEventListener        (pEventListener);
            this.mRemoveOnUnLoadEventListener      (pEventListener);
            this.mRemoveOnUpdateEventListener      (pEventListener);
            this.mRemoveOnDrawEventListener        (pEventListener);
            this.mRemoveOnResizeEventListener      (pEventListener);
        }
	}

    mAddOnClickEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnClickEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnClickEventListener(pEventListener)
	{
		for(let vIndex = this.aOnClickEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnClickEventListeners[vIndex])
			{
				this.aOnClickEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnDoubleClickEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnDoubleClickEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnDoubleClickEventListener(pEventListener)
	{
		for(let vIndex = this.aOnDoubleClickEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnDoubleClickEventListeners[vIndex])
			{
				this.aOnDoubleClickEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnDragEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnDragEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnDragEventListener(pEventListener)
	{
		for(let vIndex = this.aOnDragEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnDragEventListeners[vIndex])
			{
				this.aOnDragEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnDragMoveEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnDragMoveEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnDragMoveEventListener(pEventListener)
	{
		for(let vIndex = this.aOnDragMoveEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnDragMoveEventListeners[vIndex])
			{
				this.aOnDragMoveEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnDragDropEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnDragDropEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnDragDropEventListener(pEventListener)
	{
		for(let vIndex = this.aOnDragDropEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnDragDropEventListeners[vIndex])
			{
				this.aOnDragDropEventListeners.splice(vIndex, 1);
			}
		}
	}

	mRemoveOnKeyDownEventListener(pEventListener)
	{
		for(let vIndex = this.aOnKeyDownEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnKeyDownEventListeners[vIndex])
			{
				this.aOnKeyDownEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnKeyDownEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnKeyDownEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnKeyDownEventListener(pEventListener)
	{
		for(let vIndex = this.aOnKeyDownEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnKeyDownEventListeners[vIndex])
			{
				this.aOnKeyDownEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnKeyUpEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnKeyUpEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnKeyUpEventListener(pEventListener)
	{
		for(let vIndex = this.aOnKeyUpEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnKeyUpEventListeners[vIndex])
			{
				this.aOnKeyUpEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnMouseDownEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnMouseDownEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnMouseDownEventListener(pEventListener)
	{
		for(let vIndex = this.aOnMouseDownEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnMouseDownEventListeners[vIndex])
			{
				this.aOnMouseDownEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnMouseEnterEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnMouseEnterEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnMouseEnterEventListener(pEventListener)
	{
		for(let vIndex = this.aOnMouseEnterEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnMouseEnterEventListeners[vIndex])
			{
				this.aOnMouseEnterEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnMouseLeaveEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnMouseLeaveEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnMouseLeaveEventListener(pEventListener)
	{
		for(let vIndex = this.aOnMouseLeaveEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnMouseLeaveEventListeners[vIndex])
			{
				this.aOnMouseLeaveEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnMouseMoveEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnMouseMoveEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnMouseMoveEventListener(pEventListener)
	{
		for(let vIndex = this.aOnMouseMoveEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnMouseMoveEventListeners[vIndex])
			{
				this.aOnMouseMoveEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnMouseOutEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnMouseOutEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnMouseOutEventListener(pEventListener)
	{
		for(let vIndex = this.aOnMouseOutEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnMouseOutEventListeners[vIndex])
			{
				this.aOnMouseOutEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnMouseOverEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnMouseOverEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnMouseOverEventListener(pEventListener)
	{
		for(let vIndex = this.aOnMouseOverEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnMouseOverEventListeners[vIndex])
			{
				this.aOnMouseOverEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnMouseUpEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnMouseUpEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnMouseUpEventListener(pEventListener)
	{
		for(let vIndex = this.aOnMouseUpEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnMouseUpEventListeners[vIndex])
			{
				this.aOnMouseUpEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnTouchCancelEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnTouchCancelEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnTouchCancelEventListener(pEventListener)
	{
		for(let vIndex = this.aOnTouchCancelEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnTouchCancelEventListeners[vIndex])
			{
				this.aOnTouchCancelEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnTouchEndEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnTouchEndEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnTouchEndEventListener(pEventListener)
	{
		for(let vIndex = this.aOnTouchEndEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnTouchEndEventListeners[vIndex])
			{
				this.aOnTouchEndEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnTouchLeaveEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnTouchLeaveEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnTouchLeaveEventListener(pEventListener)
	{
		for(let vIndex = this.aOnTouchLeaveEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnTouchLeaveEventListeners[vIndex])
			{
				this.aOnTouchLeaveEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnTouchMoveEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnTouchMoveEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnTouchMoveEventListener(pEventListener)
	{
		for(let vIndex = this.aOnTouchMoveEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnTouchMoveEventListeners[vIndex])
			{
				this.aOnTouchMoveEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnTouchStartEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnTouchStartEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnTouchStartEventListener(pEventListener)
	{
		for(let vIndex = this.aOnTouchStartEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnTouchStartEventListeners[vIndex])
			{
				this.aOnTouchStartEventListeners.splice(vIndex, 1);
			}
		}
	}
    
    mAddOnLoadEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnLoadEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnLoadEventListener(pEventListener)
	{
		for(let vIndex = this.aOnLoadEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnLoadEventListeners[vIndex])
			{
				this.aOnLoadEventListeners.splice(vIndex, 1);
			}
		}
	}
    
    mAddOnUnLoadEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnUnLoadEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnUnLoadEventListener(pEventListener)
	{
		for(let vIndex = this.aOnUnLoadEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnUnLoadEventListeners[vIndex])
			{
				this.aOnUnLoadEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnUpdateEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnUpdateEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnUpdateEventListener(pEventListener)
	{
		for(let vIndex = this.aOnUpdateEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnUpdateEventListeners[vIndex])
			{
				this.aOnUpdateEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnDrawEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnDrawEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnDrawEventListener(pEventListener)
	{
		for(let vIndex = this.aOnDrawEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnDrawEventListeners[vIndex])
			{
				this.aOnDrawEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnResizeEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnResizeEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveOnResizeEventListener(pEventListener)
	{
		for(let vIndex = this.aOnResizeEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnResizeEventListeners[vIndex])
			{
				this.aOnResizeEventListeners.splice(vIndex, 1);
			}
		}
	}
}

export default {Component};