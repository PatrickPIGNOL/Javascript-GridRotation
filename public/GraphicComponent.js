import {Component} from "./Component.js"

export class GraphicComponent extends Component
{
    constructor()
    {
        super();
		this.aEnabled = true;
        this.aGlobalAlpha = 1; 
        this.aVisible = true;
        this.aOnEnableEventListeners = new Array();
        this.aOnShowEventListeners = new Array();
    }

    get GlobalAlpha()
    {
        return this.aGlobalAlpha;
    }

    set GlobalAlpha(pGlobalAlpha)
    {
        this.aGlobalAlpha = pGlobalAlpha;
    }

    get Visible()
    {
        return this.aVisible;
    }

    set Visible(pVisible)
    {
        this.aVisible = pVisible;
        this.mOnShowEvent(this.aVisible);
    }

    get Enabled()
    {
        return this.aEnabled;
    }

    set Enabled(pEnabled)
    {
        this.aEnabled = pEnabled;
        this.mOnShowEvent(this.aEnabled);
    }

    mOnShowEventHandler(pEvent)
    {

    }

    mOnEnableEventHandler(pEvent)
    {

    }

    mOnEnableEvent(pEvent)
    {
        this.aOnEnableEventListeners.forEach
        (
            vOnEnableEventListener=>
            {
                if(vOnEnableEventListener)
                {
                    if(vOnEnableEventListener === this)
                    {
                        vOnEnableEventListener.mOnEnableEventHandler(pEvent);
                    }
                    else
                    {
                        vOnEnableEventListener.mOnEnableEvent(pEvent);
                    }
                }
            }
        );
    }
    
    mOnShowEvent        (pEvent)
    { 
        this.aOnShowEventListeners.forEach
        (
            vOnShowEventListener=>
            {
                if(vOnShowEventListener)
                {
                    if(vOnShowEventListener === this)
                    {
                        vOnShowEventListener.mOnShowEventHandler(pEvent);
                    }
                    else
                    {
                        vOnShowEventListener.mOnShowEvent(pEvent); 
                    }
                }
            }
        );
    }

    mAddOnEnableEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnEnableEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveEnableEventListener(pEventListener)
	{
		for(let vIndex = this.aOnEnableEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnEnableEventListeners[vIndex])
			{
				this.aOnEnableEventListeners.splice(vIndex, 1);
			}
		}
	}

    mAddOnShowEventListener(pEventListener)
    {
        if(pEventListener)
        {
            return this.aOnShowEventListeners.push(pEventListener);
        }
        else
        {
            throw new Error("Observer provided is null or undefined.");
        }
    }

	mRemoveShowEventListener(pEventListener)
	{
		for(let vIndex = this.aOnShowEventListeners.length - 1; vIndex >= 0; vIndex--)
		{
			if(pEventListener === this.aOnShowEventListeners[vIndex])
			{
				this.aOnShowEventListeners.splice(vIndex, 1);
			}
		}
	}
}
