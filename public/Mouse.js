import {GraphicComponent} from "./GraphicComponent.js";
import {Loader, EImage} from "./Loader.js";

class Mouse extends GraphicComponent
{
    static aInstance = null;
    static get Instance()
    {
        if(Mouse.aInstance === null)
        {
            Mouse.aInstance = new Mouse();
        }
        return Mouse.aInstance;
    }

    constructor()
    {
        super();
        this.aMouse = null;
    }

    mOnDrawEventHandler(pCanvas, pGraphicContext)
    {
        if(this.aMouse)
        {
            pGraphicContext.drawImage(Loader.Images[EImage.Mouse.Index], this.aMouse.clientX, this.aMouse.clientY);
        }
    }
    
    mOnMouseMoveEventHandler(pEvent)
    {
        this.aMouse = pEvent;
    }
}
export {Mouse};
export default {Mouse};