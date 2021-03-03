"use strict";

import {GameEngine} from "./GameEngine.js";
import {IntroScene} from "./IntroScene.js";
import {LevelScene} from "./LevelScene.js";

export const EBrowsers = Object.freeze
(
    {
        None: 0,
        Opera: 1,
        Firefox: 2,
        Safari: 4,
        IE: 8,
        Edge: 16,
        Chrome: 32,
        Chromium: 64,
        Blink: 128
    }
);

export class Loader
{
    static aImages = new Array();
	static aSounds = new Array();
    static aFonts = new Array();
    constructor()
    {

    }

	static get Sounds()
	{
		return Loader.aSounds;
	}

    static get Fonts()
    {
        return Loader.aFonts;
    }

    static get Images()
    {
        return Loader.aImages;
    }

	static mLoadSounds(pSoundsFiles, pCallBack)
	{		
		if(pSoundsFiles && pSoundsFiles.length > 0)
		{
			this.Sounds.push(new Audio(pSoundsFiles.shift()));
			if(pSoundsFiles.length === 0)
			{
				myAudioElement.addEventListener
				(
					"canplaythrough", 
					event => 
					{
						if(pCallBack)
						{
							pCallBack
						}
					}
				);
			}
			else
			{
				myAudioElement.addEventListener
				(
					"canplaythrough", 
					event => 
					{
						mLoadSounds(pSoundsFiles, pCallBack);
					}
				);
			}
		}
	}
	

    static mFromImageEnum(pImagesFilesEnum)
    {
        const vImagesFiles = new Array();
        for (const [vKey, vValue] of Object.entries(pImagesFilesEnum)) 
        {
            vImagesFiles.push(vValue.FileName);
        }
        return vImagesFiles;
    }

    static mLoadImages(pImageFiles, pCallBack)
    {
        if(pImageFiles && pImageFiles.length > 0)
        {
            const vImageFile = pImageFiles.shift();
            const vImage = new Image();
            Loader.aImages.push(vImage);
            if(pImageFiles.length === 0)
            {
                if(pCallBack)
                {
                    vImage.onload = pCallBack;
                }
            }
            else
            {
                vImage.onload = Loader.mLoadImages(pImageFiles, pCallBack);
            }
            vImage.src = vImageFile;
        }      
    }

    static mFromFontsEnum(pFontFilesEnum)
    {
        const vFontsFiles = new Array();
        for (const [vKey, vValue] of Object.entries(pFontFilesEnum)) 
        {
            vFontsFiles.push(vValue);
        }
        return vFontsFiles;
    }

    static mLoadFonts(pFontFiles, pCallBack)
    {
        if(pFontFiles && pFontFiles.length > 0)
        {
            const vFontFile = pFontFiles.shift();
            const vFont = new FontFace(vFontFile.Name, `url(${vFontFile.FileName})`);
            Loader.aFonts.push(vFont);

            if(pFontFiles.length === 0)
            {
                if(pCallBack)
                {
                    vFont.load().then(pCallBack);
                }
            }
            else
            {
                vFont.load().then
                (
                    ()=>
                    {
                        Loader.mLoadFonts(pFontFiles, pCallBack);
                    }
                )
            }
        }
    }

    static mBrowser()
    {    
        let vBrowser = 0;
        if((!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0)
        {
            vBrowser += EBrowsers.Opera;
        }
        if(typeof InstallTrigger !== 'undefined')
        {
            vBrowser += EBrowsers.Firefox;
        }
        if(/constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && window['safari'].pushNotification)))
        {
            vBrowser += EBrowsers.Safari;
        }
        if(false || !!document.documentMode)
        {
            vBrowser += EBrowsers.IE;
        }
        if(! (vBrowser & EBrowsers.IE) && !!window.StyleMedia)
        {
            vBrowser += EBrowsers.Edge;
        }
        if(!!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime))
        {
            vBrowser += EBrowsers.Chrome;
        }
        if((vBrowser & EBrowsers.Chrome) && (navigator.userAgent.indexOf("Edg") != -1))
        {
            vBrowser += EBrowsers.Chromium;
        }
        if((vBrowser & EBrowsers.Chrome) || (vBrowser & EBrowsers.Opera) && !!window.CSS)
        {
            vBrowser += EBrowsers.Blink;
        }
        return vBrowser;
    }
}

export const EImage = Object.freeze
(
    {
        Logo: 
        {
            Index: 0,
            FileName: "./Images/Logo.png"
        },
        Mouse: 
        {
            Index: 1,
            FileName: "./Images/Mouse.png"
        },
        MenuBackGround: 
        {
            Index: 2,
            FileName: "./Images/MenuBackGround.png"
        },
        WindowBackGround: 
        {
            Index: 3,
            FileName: "./Images/WindowBackGround.png"
        },
        North:
        { 
            Index: 4,
            FileName: "./Images/North.png"
        },
        East: 
        { 
            Index: 5,
            FileName: "./Images/East.png"
        },
        CornerNE: 
        { 
            Index: 6,
            FileName: "./Images/CornerNE.png"
        },
        South: 
        { 
            Index: 7,
            FileName: "./Images/South.png"
        },
        CenterVertical:  
        { 
            Index: 8,
            FileName: "./Images/CenterVertical.png"
        },
        CornerSE: 
        { 
            Index: 9,
            FileName: "./Images/CornerSE.png"
        },
        TEast: 
        { 
            Index: 10,
            FileName: "./Images/TEast.png"
        },
        West: 
        { 
            Index: 11,
            FileName: "./Images/West.png"
        },
        CornerNW: 
        { 
            Index: 12,
            FileName: "./Images/CornerNW.png"
        },
        CenterHorizontal: 
        { 
            Index: 13,
            FileName: "./Images/CenterHorizontal.png"
        },
        TNorth: 
        { 
            Index: 14,
            FileName: "./Images/TNorth.png"
        },
        CornerSW: 
        { 
            Index: 15,
            FileName: "./Images/CornerSW.png"
        },
        TWest: 
        { 
            Index: 16,
            FileName: "./Images/TWest.png"
        },
        TSouth: 
        { 
            Index: 17,
            FileName: "./Images/TSouth.png"
        },
        CenterX: 
        { 
            Index: 18,
            FileName: "./Images/CenterX.png"
        },
        ButtonBackGround:
        {
            Index: 19,
            FileName: "./Images/ButtonBackGround.png"
        },
        SpriteSheet:
        {
            Index: 20,
            FileName: "./Images/SpriteSheet.png"
        }
    }
);

export const EFonts = Object.freeze
(
    {
        Buffied: 
        {
            Index: 0,
            Name: "Buffied",
            FileName: "./Fonts/Buffied.ttf"
        },
        Celexa:
        {
            Index: 1,
            Name: "Celexa",
            FileName: "./Fonts/Celexa.ttf"
        }
    }
)


window.onload = OnWindowLoad;

function OnWindowLoad()
{
    const vHTML = document.getElementById("html");
    vHTML.style.margin = 0;
    vHTML.style.padding = 0;  
    document.body.style.backgroundColor = "#000000";
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.overflow = 'hidden';
    
    Loader.mLoadImages
    (
        Loader.mFromImageEnum(EImage),
        ()=>
        {
            Loader.mLoadFonts
            (
                Loader.mFromFontsEnum(EFonts),
                ()=>
                {
                    const vBrowser = Loader.mBrowser();
                    const vFPS = 30;
                    const vCanvas = document.getElementById("canvas");
                    vCanvas.style.margin = 0;
                    vCanvas.style.padding = 0;
                    vCanvas.style.cursor = "none";
                    GameEngine.Instance.mStart(vFPS, vBrowser, vCanvas, IntroScene.Instance);
                }
            )
        }      
    );
}

export default {Loader};