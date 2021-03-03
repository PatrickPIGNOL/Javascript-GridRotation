
import {MouseFocusable} from "./MouseFocusable.js";
export class Scene extends MouseFocusable
{
    constructor()
    {
        super(null, 0, 0, 0, 0);
        this.Visible = true;
        this.MouseFocusable = true;
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