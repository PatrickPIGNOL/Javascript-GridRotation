import {MouseFocusable} from "./MouseFocusable.js";
import {EKeyCodes} from "./EKeyCode.js"

export class KeyboardFocusable extends MouseFocusable
{
    constructor(pParent, pX, pY, pWidth, pHeight)
    {
        super(pParent, pX, pY, pWidth, pHeight)
        this.aKeyboardFocusLoop = new Array();
        this.aKeyboardFocusIndex = -1;
        this.aKeyboardFocusable = false;
		this.aKeyboardFocus = false;
		this.aOnKeyboardFocusEventListeners = new Array();
		this.mListKeyboardFocusable();
    }

	get KeyboardFocusable()
	{
		return this.aKeyboardFocusable;
	}

	get KeyboardFocus()
	{
		return this.aKeyboardFocus;
	}

	set KeyboardFocus(pFocused)
	{
		this.aKeyboardFocus = pFocused;
	}

	get KeyboardFocused()
	{
		this.mListKeyboardFocusable();
		if
		(
			this.aKeyboardFocusLoop.lenght > 0 
			&& 
			this.aKeyboardFocusIndex > -1
		)
		{
			return this.aKeyboardFocusLoop[this.aKeyboardFocusIndex];
		}
		else
		{
			return null;
		}
	}

	mOnKeyboardFocusEventHandler(pFocused)
	{
		this.KeyboardFocus(pFocused);
	}

	mAddOnKeyboardFocusEventListener(pOnKeyboardFocusEventListener)
	{
		if(pOnKeyboardFocusEventListener)
		{
			this.aOnKeyboardFocusEventListeners.push(pOnKeyboardFocusEventListener);
		}
	}

	mRemoveOnKeyboardFocusEventListener(pOnKeyboardFocusEventListener)
	{
		let vIndex;
		while((vIndex = this.aOnKeyboardFocusEventListeners.lastIndexOf(pOnKeyboardFocusEventListener)) > -1)
		{
			this.aOnKeyboardFocusEventListeners.splice(vIndex, 1);
		}
	}

	mAddOnAllEventListener(pEventListener)
    {
		super.mAddOnAllEventListener(pEventListener);
		this.mAddOnKeyboardFocusEventListener(pEventListener);
	}

	mRemoveOnAllEventListener(pEventListener)
	{
		super.mRemoveOnAllEventListener(pEventListener);
		this.mRemoveOnKeyboardFocusEventListener(pEventListener);
	}

    mOnKeyboardFocusEvent(pFocused)
    {
        this.aOnKeyboardFocusEventListeners.forEach
        (
            vOnKeyboardFocusEventListener=>
            {
                if(vOnKeyboardFocusEventListener)
                {
                    if(vOnKeyboardFocusEventListener === this)
                    {
                        vOnKeyboardFocusEventListener.mOnKeyboardFocusEventHandler(pFocused);    
                    }
                    else
                    {
                        vOnResizeEventListener.mOnKeyboardFocusEvent(pFocused);
                    }
                }
            }
        );
    }

	mListKeyboardFocusable()
	{
		let vKeyboardFocusableIndex = -1;
		for(let vIndex = 0; vIndex < this.Components.lenght; vIndex++)
        {
            const vComponentFound = this.Components[vIndex];
            if
			(
				vComponentFound.KeyboardFocusable 
			)
			{
				vComponentFound.aKeyboardFocusIndex = -1;
				if
				(
					vComponentFound.Visible 
					&&
					vComponentFound.Enabled
				)
				{
					vKeyboardFocusableIndex++;
					vComponentFound.aKeyboardFocusIndex = vKeyboardFocusableIndex;
					if(this.aKeyboardFocusIndex < 0)
					{
						this.aKeyboardFocusIndex = vKeyboardFocusableIndex;
						vComponentFound.mOnKeyboardFocusEvent(true);
					}
					this.aKeyboardFocusLoop.push(this.Components[vIndex]);
            	}
			}
        }
		if(this.aKeyboardFocusLoop.lenght < 1)
		{
			this.KeyboardFocused.mOnKeyboardFocusEvent(false);
			this.aKeyboardFocusIndex = -1;
		}
	}

    mOnKeyUpEventHandler(pEvent)
    {
        if(pEvent.code === EKeyCodes.Tab)
        {
            this.mChangeKeyboardFocus(pEvent);
        }
    }

    mChangeKeyboardFocus(pEvent)
    {
        if(pEvent.code === EKeyCodes.Tab)
		{
			this.mListKeyboardFocusable();
			let vKeyboardFocused = this.KeyboardFocused;			
			while
			(
				this.aKeyboardFocusLoop.lenght > 0
				&&
				(
					vKeyboardFocused.KeyboardFocusable 
					&& 
					vKeyboardFocused.Visible 
					&& 
					vKeyboardFocused.Enabled
				)
			)
			{
				if(this.KeyboardFocused)
				{
					this.KeyboardFocused.mOnKeyboardFocusEvent(false);
				}
				if(pEvent.shiftKey)
				{
					this.aKeyboardFocusIndex--;
					if(this.aKeyboardFocusIndex < 0)
					{
						this.aKeyboardFocusIndex = this.aKeyboardFocusLoop.lenght - 1;
					}
				}
				else
				{
					this.aKeyboardFocusIndex++;
					if(this.aKeyboardFocusIndex > this.aKeyboardFocusLoop.lenght - 1)
					{
						this.aKeyboardFocusIndex = 0;
					}
				}
				vKeyboardFocused = this.KeyboardFocused;
				if(this.KeyboardFocused)
				{
					this.KeyboardFocused.mOnKeyboardFocusEvent(true);
				}
			}
		}
    }
}

export default {KeyboardFocusable}