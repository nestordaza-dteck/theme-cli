/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @description global default data validation.
 */
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (function () {
    var defaultFont = {
        id: 1,
        name: "Poppins",
        href: "https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;400;600;900&display=swap",
        cssRule: 'font-family: "Poppins", sans-serif !important;',
    };
    return {
        website: {
            orgId: "",
            themeId: process.env.THEME_ID || "",
            general: {
                favicon: "",
                name: "Business name",
            },
            font: defaultFont,
            colors: {
                accent: "#03a57b",
                text: "#333333",
                background: "#ffffff",
            },
            nav: {
                data: {
                    items: [{ id: 2, name: "About" }],
                    button: "Book now",
                },
            },
            footer: {
                data: {},
            },
        },
        validation: {
            general: {
                favicon: "url|file|mimes:ico,jpeg,png,jpg",
                name: "required|string",
                email: "email",
                telephone: "phone",
                address: "string",
                facebook: "url",
                twitter: "url",
                instagram: "url",
            },
            nav: {
                data: {
                    items: [{ name: "string|max:20" }],
                    button: "string|max:30",
                },
            },
            footer: {
                data: {},
            },
        },
        configuration: {
            fonts: [defaultFont],
        },
    };
});

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;