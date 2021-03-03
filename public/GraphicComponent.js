
import {EventProvider} from "./EventProvider.js";
class GraphicComponent extends EventProvider
{
    constructor()
    {
        super();
        this.aVisible = false;
        this.aMouse = null;   
        this.aGlobalAlpha = 1;
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
        this.aVisible = pVisible
    }
}

export {GraphicComponent};
export default {GraphicComponent};