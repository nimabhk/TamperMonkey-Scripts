// ==UserScript==
// @name         بهبود فونت و راست‌چین کردن سایتهای مشخص
// @namespace    http://nimabehkar.ir
// @version      0.5
// @description  راست‌چین کردن و بهبود فونت برای چند سایت کاربردی و هوش مصنوعی با فونت‌های جدید
// @author       NimaBhk
// @match        *://gemini.google.com/*
// @match        *://chatgpt.com/*
// @match        *://app.todoist.com/*
// @match        *://grok.com/*
// @match        *://chat.deepseek.com/*
// @match        *://keep.google.com/*
// @match        *://claude.ai/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    // اعمال فونت و استایل‌های عمومی
    GM_addStyle(`
        /* Import all fonts in one go */
        @import url('https://fonts.googleapis.com/css2?family=Baloo+Bhaijaan+2:wght@700;800&family=Cairo+Play:wght@400;700&family=Handjet:wght@400&family=Lalezar&effect=3d-float&family=Noto+Nastaliq+Urdu:wght@500&family=Rubik:wght@300&display=swap');

        /* General font for all specified websites, with Rubik as fallbacks */
        body, p, div, span, h3, h4, h5, h6, li, td, th, button, input, textarea, select {
            font-family: 'Rubik', sans-serif !important;
        }
		/* General shadow for head titles /
		h1, h1 span, h1 strong, h1 b, h2, h2 span, h2 strong, h2 b {
			text-shadow: 0px 2px 6px rgba(0, 0, 0, 0.6);
		} */

        h1, h1 span {
            font-family: 'Lalezar', 'Rubik', cursive !important;
            font-weight: 400 !important;
            font-size: 30px !important;
        }

        h1 strong, h1 b {
            font-family: 'Noto Nastaliq Urdu', 'Rubik', serif !important;
            font-weight: 500 !important; /* Noto Nastaliq Urdu Medium 500 */
            font-size: 28px !important;
        }

        h2, h2 span {
            font-family: 'Baloo Bhaijaan 2', 'Rubik', cursive !important;
            font-weight: 700 !important; /* Baloo Bhaijaan 2 Bold 700 */
            font-size: 20px !important;
        }

        h2 strong, h2 b {
            font-family: 'Cairo Play', 'Rubik', serif !important;
            font-weight: 700 !important;
            font-size: 25px !important;
        }

        /* Styles for bold normal text (paragraphs, divs, spans, etc.) */
        p strong, p b,
        div:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) strong, /* Ensures it doesn't override heading's direct strong tags if structure is complex */
        div:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) b,
        span strong, span b,
        li strong, li b,
        td strong, td b,
        th strong, th b {
            font-family: 'Baloo Bhaijaan 2', 'Rubik', sans-serif !important;
            font-weight: 800 !important;
			font-size: small !important;
			//background-color: rgba(250, 211, 62, 0.4);
        }

        /* Styles for italic normal text (paragraphs, divs, spans, etc.) */
        p em, p i,
        div:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) em,
        div:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6) i,
        span em, span i,
        li em, li i,
        td em, td i,
        th em, th i {
            font-family: 'Handjet', 'Rubik', cursive !important;
            font-weight: 400 !important; /* Handjet Weight 400 */
            font-variation-settings: 'ELSH' 0.6 !important; /* Handjet Element Shape 0.6 */
        }

        /* Styles for code elements */
        pre, code, kbd, samp, tt { /* تگ‌های رایج برای نمایش کد */
            font-family: 'Cairo Play', 'Rubik', monospace !important; /* Cairo Play طبق درخواست، monospace به عنوان فونت پشتیبان نهایی برای کد */
            font-weight: 400 !important; /* وزن معمولی برای خوانایی کد */
            direction: ltr !important;   /* اطمینان از چینش چپ به راست برای کد */
            text-align: left !important;  /* اطمینان از تراز چپ برای کد */
            unicode-bidi: embed !important; /* کمک به ایزوله‌سازی بهتر جهت‌نمایی در محیط راست‌چین */
        }
        pre code {
            font-family: inherit !important; /* ارث‌بری فونت از تگ pre */
            font-weight: inherit !important; /* ارث‌بری وزن فونت از تگ pre */
            direction: inherit !important;   /* ارث‌بری جهت از تگ pre */
            text-align: inherit !important;  /* ارث‌بری تراز از تگ pre */
            background-color: transparent !important; /* جلوگیری از پس‌زمینه دوگانه */
            border: none !important;
            padding: 0 !important;
            unicode-bidi: inherit !important;
        }
    `);

    // بررسی آدرس سایت فعلی برای اعمال استایل‌های خاص
    const hostname = window.location.hostname;

    if (hostname === "gemini.google.com" || hostname === "chatgpt.com") {
        GM_addStyle(`
            p, div[class*="prose"] {
                direction: rtl !important;
                text-align: right !important;
            }
            textarea {
                direction: rtl !important;
                text-align: right !important;
            }
        `);
    } else if (hostname === "app.todoist.com") {
        GM_addStyle(`
            div, p, span {
                text-align: right !important;
                font-size: 15px !important; /* This might be overridden by new global styles for p, div, span if font-size is not specified there. Consider if this specific font-size is still needed or should be adapted. */
                font-weight: 900 !important; /* This will likely be overridden by new font rules if they target the same elements with !important */
                font-style: normal !important;
            }
            .task_content, .item_content {
                direction: rtl !important;
                text-align: right !important;
            }
            button.board_task__button {
                direction: rtl !important;
            }
            .public-DraftEditor-content, .ProseMirror, textarea, input[type="text"] {
                direction: rtl !important;
                text-align: right !important;
            }
        `);
    } else if (hostname === "grok.com") {
        GM_addStyle(`
            div, p {
                direction: rtl !important;
                text-align: right !important;
            }
            textarea[placeholder*="Message Grok"] {
                direction: rtl !important;
                text-align: right !important;
            }
        `);
    } else if (hostname === "chat.deepseek.com") {
        GM_addStyle(`
            #chat-input, textarea[placeholder*="Send a message"] {
                text-align: right !important;
                direction: rtl !important;
            }
            #root > div, div[class*="message_container"] {
                text-align: right !important;
                direction: rtl !important;
            }
            div[class*="message-content"], div[class*="prose"], div[class*="message-text"] {
                direction: rtl !important;
                text-align: right !important;
            }
            div[class*="message-content"] p, div[class*="prose"] p, div[class*="message-text"] p {
                direction: rtl !important;
                text-align: right !important;
            }
        `);
    } else if (hostname === "keep.google.comV1") { //this is for former google keep
        GM_addStyle(`
            .editable {
                direction: rtl !important;
                text-align: right !important;
            }
            .note-title-container .editable {
                direction: rtl !important;
                text-align: right !important;
            }
			p span[style*="font-style:italic"],			//italic p
            p span[style*="font-style: italic"]
            {
                font-family: 'Handjet', 'Rubik', cursive !important;
                font-weight: 400 !important;
                font-size: 14pt;
                font-style: italic !important;
            }
            p span[style*="font-weight:700"],			//bold p
            p span[style*="font-weight: 700"],
			p span
            {
                font-family: 'Baloo Bhaijaan 2', 'Rubik', sans-serif !important;
                font-weight: 800 !important;
                font-style: normal !important;
				font-size: small !important;
				background-color: rgba(250, 211, 62, 0.4) !important;
            }
			p span[style*="text-decoration:underline"][style*="font-weight:700"],			//underline p
			p span[style*="text-decoration:underline"][style*="font-weight: 700"],
			p span[style*="text-decoration: underline"][style*="font-weight:700"],
			p span[style*="text-decoration: underline"][style*="font-weight: 700"],
			p span
			{
				font-size: medium !important;
				text-decoration: none !important;
				background-color: rgba(255, 0, 0, 0.6) !important;
			}

			h1 span[style*="font-weight:700"],			//bold h1
			h1 span[style*="font-weight: 700"],
			h1 span
			{
				font-family: 'Noto Nastaliq Urdu', 'Rubik', serif !important;
				font-weight: 500 !important; /* Noto Nastaliq Urdu Medium 500 */
				font-size: 30px !important;
			}
			h2 span[style*="font-weight:700"],			//bold h2
			h2 span[style*="font-weight: 700"]
			{
				font-family: 'Cairo Play', 'Rubik', serif !important;
				font-weight: 400 !important;
				font-size: larger !important;
			}
			h1 span[style*="text-decoration:underline"],			//underline h1
			h1 span[style*="text-decoration: underline"]
			{
				text-shadow:
				 0px 0px 0 rgb(173,173,173),
				 1px 1px 0 rgb(134,134,134),
				 2px 2px 0 rgb(95,95,95),
				 3px 3px 0 rgb(56,56,56),
				 4px 4px 0 rgb(17,17,17),
				 5px 5px 0 rgb(-22,-22,-22),
				 6px 6px 5px rgba(0,0,0,0.5),
				 6px 6px 1px rgba(0,0,0,0.5),
				 0px 0px 5px rgba(0,0,0,.2) !important;
				text-decoration: none !important;
			}

			h2 span[style*="text-decoration:underline"],			//underline h2
			h2 span[style*="text-decoration: underline"]
			{
				text-shadow:
				-1px -1px 0 #D82C2A, 1px -1px 0 #D82C2A, -1px 1px 0 #D82C2A, 1px 1px 0 #D82C2A,
				 2px  2px 0 #D82C2A,
				 3px  3px 0 #D82C2A,
				 4px  4px 0 #D82C2A,
				 6px  6px 8px rgba(0,0,0,0.35) !important;
				text-decoration: none !important;
			}
		} `);
    } else if (hostname === "keep.google.com") {
		GM_addStyle(`
			.editable {
				direction: rtl !important;
				text-align: right !important;
			}
			.note-title-container .editable {
				direction: rtl !important;
				text-align: right !important;
			}

			/* Italic Paragraph Text */
			p span[class*="-O807Gb"] {
				font-family: 'Rubik', cursive !important;
				font-weight: 400 !important;
				font-size: small;
				font-style: italic !important;
			}

			/* Bold Paragraph Text */
			p span[class*="-c8csvc"] {
				font-family: 'Baloo Bhaijaan 2', sans-serif !important;
				font-weight: 400 !important;
				font-style: normal !important;
				font-size: medium !important;
				// background-color: rgba(250, 211, 62, 0.4) !important;
			}

			/* Underlined AND Bold Paragraph Text */
			p span[class*="-c8csvc"][class*="-NowJzb"] {
				font-size: medium !important;
				text-decoration: none !important;
				background-color: rgba(255, 0, 0, 0.6) !important;
			}

			/* Bold H1 Text */
			h1 span[class*="-c8csvc"] {
				font-family: 'Noto Nastaliq Urdu', 'Rubik', serif !important;
				font-weight: 500 !important; /* Noto Nastaliq Urdu Medium 500 */
				font-size: 30px !important;
			}

			/* Bold H2 Text */
			h2 span[class*="-c8csvc"] {
				font-family: 'Cairo Play', 'Rubik', serif !important;
				font-weight: 400 !important;
				font-size: larger !important;
			}

			/* Underlined H1 Text */
			h1 span[class*="-NowJzb"] {
				text-shadow:
				 0px 0px 0 rgb(173,173,173),
				 1px 1px 0 rgb(134,134,134),
				 2px 2px 0 rgb(95,95,95),
				 3px 3px 0 rgb(56,56,56),
				 4px 4px 0 rgb(17,17,17),
				 5px 5px 0 rgb(-22,-22,-22),
				 6px 6px 5px rgba(0,0,0,0.5),
				 6px 6px 1px rgba(0,0,0,0.5),
				 0px 0px 5px rgba(0,0,0,.2) !important;
				text-decoration: none !important;
			}

			/* Underlined H2 Text */
			h2 span[class*="-NowJzb"] {
				text-shadow:
				-1px -1px 0 #D82C2A, 1px -1px 0 #D82C2A, -1px 1px 0 #D82C2A, 1px 1px 0 #D82C2A,
				 2px  2px 0 #D82C2A,
				 3px  3px 0 #D82C2A,
				 4px  4px 0 #D82C2A,
				 6px  6px 8px rgba(0,0,0,0.35) !important;
				text-decoration: none !important;
			}
	`);
    } else if (hostname === "claude.ai") {
        GM_addStyle(`
            div.flex > div:first-child.h-screen p,
			div.flex > div:first-child.h-screen div {
                direction: rtl !important;
                text-align: right !important;
            }
            pre, code {
                direction: ltr !important;
                text-align: left !important;
            }

        `);
    }

})();
