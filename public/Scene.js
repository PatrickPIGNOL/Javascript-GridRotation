
import {KeyboardFocusable} from "./KeyboardFocusable.js";
export class Scene extends KeyboardFocusable
{
    constructor()
    {
        super(null, 0, 0, 0, 0);
        this.Visible = true;
        this.MouseFocusable = true;
        this.mAddOnAllEventListener(this);
    }
    mOnUpdateEventHandler(pCanvas, pDeltaTime)
    {
		this.X = 0;
		this.Y = 0;
		this.Width = pCanvas.width;
        this.Height = pCanvas.height;
    }
}

export default {Scene};