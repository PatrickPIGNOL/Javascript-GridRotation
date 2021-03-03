import {EBrowsers} from "./EBrowsers.js"

export class GameEngine
{
    static aInstance = null;
    static get Instance()
    {
        if(GameEngine.aInstance === null)
        {
            GameEngine.aInstance = new GameEngine();
        }
        return GameEngine.aInstance;
    }
    constructor()
    {
        this.aScene = null;
        this.aBrowser = null;
        this.aCanvas = null;       
        this.aOldTime = performance.now();
        this.aLoopTimeOut = -1;
    }

    mBrowser(pBrowser)
    {
        this.aBrowser = pBrowser;
    }

    mCanvas(pCanvas)
    {
        this.aCanvas = pCanvas;
        this.aCanvas.addEventListener
        (
            "click",
            pClickEvent =>
            {
                GameEngine.Instance.mOnClickEvent(pClickEvent);
            }
        );
        this.aCanvas.addEventListener
        (
            "dblclick",
            pDoubleClickEvent => 
            {
                GameEngine.Instance.mOnDoubleClickEvent(pDoubleClickEvent);
            }
        );

        this.aCanvas.addEventListener
        (
            "keydown",
            pKeyDownEvent =>
            {
                GameEngine.Instance.mOnKeyDownEvent(pKeyDownEvent);
            }
        );

        this.aCanvas.addEventListener
        (
            'keyup', 
            pKeyUpEvent =>
            {
                GameEngine.Instance.mOnKeyUpEvent(pKeyUpEvent);
            }
        );

        this.aCanvas.addEventListener
        (
            "mousedown",
            pMouseDownEvent =>
            {
                GameEngine.Instance.mOnMouseDownEvent(pMouseDownEvent);
            }
        );
        this.aCanvas.addEventListener
        (
            'mouseenter',
            pMouseEnterEvent => 
            {
                GameEngine.Instance.mOnMouseEnterEvent(pMouseEnterEvent);
            }
        );
        this.aCanvas.addEventListener
        (
            'mouseleave',
            pMouseLeaveEvent => 
            {
                GameEngine.Instance.mOnMouseLeaveEvent(pMouseLeaveEvent);
            }
        );
        this.aCanvas.addEventListener
        (
            "mousemove",
            pMouseMoveEvent =>
            {       
                GameEngine.Instance.mOnMouseMoveEvent(pMouseMoveEvent);
            }
        );
        this.aCanvas.addEventListener
        (
            "mouseout",
            pMouseOutEvent =>
            {       
                GameEngine.Instance.mOnMouseOutEvent(pMouseOutEvent);
            }
        );
        this.aCanvas.addEventListener
        (
            "mouseover",
            pMouseOverEvent =>
            {
                GameEngine.Instance.mOnMouseOverEvent(pMouseOverEvent);
            }
        );
        this.aCanvas.addEventListener
        (
            "mouseup",
            pMouseUpEvent =>
            {
                GameEngine.Instance.mOnMouseUpEvent(pMouseUpEvent)
            }
        );   
        this.aCanvas.addEventListener
        (
            "touchcancel",
            pTouchCancelEvent =>
            {
                GameEngine.Instance.mOnTouchCancelEvent(pTouchCancelEvent);
            },
            false
        );
        this.aCanvas.addEventListener
        (
            "touchend",
            pTouchEndEvent =>
            {
                GameEngine.Instance.mOnTouchEndEvent(pTouchEndEvent);
            },
            false
        );
        this.aCanvas.addEventListener
        (
            "touchleave",
            pTouchLeaveEvent =>
            {
                GameEngine.Instance.mOnTouchLeaveEvent(pTouchLeaveEvent);
            },
            false
        );
        this.aCanvas.addEventListener
        (
            "touchmove",
            pTouchMoveEvent =>
            {
                GameEngine.Instance.mOnTouchMoveEvent(pTouchMoveEvent);
            },
            false
        );
        this.aCanvas.addEventListener
        (
            "touchstart",
            pTouchStartEvent =>
            {
                GameEngine.Instance.mOnTouchStartEvent(pTouchStartEvent);
            },
            false
        );
        this.aContext = this.aCanvas.getContext('2d');
    }

    mStart(pFPS, pBrowser, pCanvas, pScene)
    {
        this.mBrowser(pBrowser);
        this.mCanvas(pCanvas);
        this.mChangeScene(pScene);
        window.onresize = ()=>
        {
            GameEngine.Instance.mOnResizeEvent(this.aCanvas);
        };
        window.setInterval
        (
            ()=>
            {
				window.requestAnimationFrame
				(
					()=>
					{
                		GameEngine.Instance.mLoop();
					}
				);
            }, 
            1000/pFPS
        );              
    }

    mUpdate(pDeltaTime)
    {
        if
        (
            (this.aBrowser & EBrowsers.Chromium)
            ||
            (this.aBrowser & EBrowsers.Chrome)
        )
        {
            this.Canvas.width = window.innerWidth - 1;
            this.Canvas.height = window.innerHeight - 1;
        }
        else
        {
            this.Canvas.width = window.innerWidth;
            this.Canvas.height = window.innerHeight;
        }
        this.aScene.mOnUpdateEvent(this.Canvas, pDeltaTime);
    }
    
    mDraw(pGraphicContext)
    {
        if(pGraphicContext)
        {
            pGraphicContext.clearRect(0, 0, this.Canvas.width, this.Canvas.height);
            this.aScene.mOnDrawEvent(this.Canvas, pGraphicContext);
        }
        else
        {
            document.write("Canvas are not supported");
        }        
    }
    
    mLoop()
    {
        const vNewTime = performance.now();
        const vDeltaTime = vNewTime - this.aOldTime;
        this.aOldTime = vNewTime;
        this.mUpdate(vDeltaTime);
        this.mDraw(this.aCanvas.getContext('2d'));
    }

    mOnClickEventHandler(pClickEvent)
    {
        this.aScene.mOnClickEvent(pClickEvent);
    }

    mOnDoubleClickEventHandler(pDoubleClickEvent)
    {
        this.aScene.mOnDoubleClickEvent(pDoubleClickEvent);
    }

    mOnKeyDownEventHandler(pKeyDownEvent)
    {
        this.aScene.mOnKeyDownEvent(pKeyDownEvent);
    }

    mOnKeyUpEventHandler(pKeyUpEvent)
    {
        this.aScene.mOnKeyUpEvent(pKeyUpEvent);
    }

    mOnMouseDownEventHandler(pMouseDownEvent)
    {
        this.aScene.mOnMouseDownEvent(pMouseDownEvent);
    }

    mOnMouseEnterEventHandler(pMouseEnterEvent)
    {
        this.aScene.mOnMouseEnterEvent(pMouseEnterEvent);
    }

    mOnMouseLeaveEventHandler(pMouseLeaveEvent)
    {
        this.aScene.mOnMouseLeaveEvent(pMouseLeaveEvent);
    }
    
    mOnMouseMoveEventHandler(pMouseMoveEvent)
    {
        this.aScene.mOnMouseMoveEvent(pMouseMoveEvent);
    }

    mOnMouseOutEventHandler(pMouseOutEvent)
    {
        this.aScene.mOnMouseMoveEvent(pMouseOutEvent);
    }

    mOnMouseOverEventHandler(pMouseOverEvent)
    {
        this.aScene.mOnMouseOverEvent(pMouseOverEvent);
    }

    mOnMouseUpEventHandler(pMouseUpEvent)
    {
        this.aScene.mOnMouseUpEvent(pMouseUpEvent);
    }
    
    mOnResizeEventHandler()
    {
        this.aScene.mOnResizeEvent()
    }
    
    mOnTouchCancelEventHandler(pTouchCancelEvent)
    {
        this.aScene.mOnTouchCancelEvent(pTouchCancelEvent);
    }

    mOnTouchEndEventHandler(pTouchEndEvent)
    {
        this.aScene.mOnTouchEndEvent(pTouchEndEvent);
    }
    
    mOnTouchLeaveEventHandler(pTouchLeaveEvent)
    {
        this.aScene.mOnTouchLeaveEvent(pTouchLeaveEvent);
    }

    mOnTouchMoveEventHandler(pTouchMoveEvent)
    {
        this.aScene.mOnTouchMoveEvent(pTouchMoveEvent);
    }

    mOnTouchStartEventHandler(pTouchStartEvent)
    {
        this.aScene.mOnTouchMoveEvent(pTouchMoveEvent);
    }
    
    mChangeScene(pScene)
    {
        if(this.aScene)
        {
            this.aScene.mOnUnLoadEvent();
        }
        this.aScene = pScene;
        this.aScene.mOnLoadEvent();
    }

    get Canvas()
    {
        return this.aCanvas;
    }
    get LoopTimeOut()
    {
        return this.aLoopTimeOut;
    }
    set LoopTimeOut(pLoopTimeout)
    {
        this.aLoopTimeOut = pLoopTimeout;
    }
}