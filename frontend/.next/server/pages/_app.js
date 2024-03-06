/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./components/authLogin.jsx":
/*!**********************************!*\
  !*** ./components/authLogin.jsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"next/router\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n// components/authLogin.js\n\n\n\nconst Auth = ()=>{\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        const hasToken = document.cookie.includes(\"token=\");\n        if (!hasToken && router.pathname !== \"/\") {\n            setLoading(true);\n            setTimeout(()=>{\n                router.push(\"/\");\n                setTimeout(()=>{\n                    setLoading(false);\n                }, 10);\n            }, 100);\n        } else if (router.pathname === \"/\") {\n            setLoading(false);\n        }\n    }, [\n        router\n    ]);\n    // Renderiza un indicador de carga si es necesario\n    if (loading) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            children: \"Cargando...\"\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\matias\\\\Desktop\\\\TallerD2023\\\\frontend\\\\components\\\\authLogin.jsx\",\n            lineNumber: 28,\n            columnNumber: 12\n        }, undefined);\n    }\n    return null; // No renderiza nada si no hay carga\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Auth);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2F1dGhMb2dpbi5qc3guanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLDBCQUEwQjs7QUFDa0I7QUFDSjtBQUV4QyxNQUFNRyxPQUFPLElBQU07SUFDakIsTUFBTUMsU0FBU0Ysc0RBQVNBO0lBQ3hCLE1BQU0sQ0FBQ0csU0FBU0MsV0FBVyxHQUFHTCwrQ0FBUUEsQ0FBQyxLQUFLO0lBRTVDRCxnREFBU0EsQ0FBQyxJQUFNO1FBQ2QsTUFBTU8sV0FBV0MsU0FBU0MsTUFBTSxDQUFDQyxRQUFRLENBQUM7UUFFMUMsSUFBSSxDQUFDSCxZQUFZSCxPQUFPTyxRQUFRLEtBQUssS0FBSztZQUN4Q0wsV0FBVyxJQUFJO1lBRWZNLFdBQVcsSUFBTTtnQkFDZlIsT0FBT1MsSUFBSSxDQUFDO2dCQUNaRCxXQUFXLElBQU07b0JBQ2ZOLFdBQVcsS0FBSztnQkFDbEIsR0FBSTtZQUNOLEdBQUk7UUFDTixPQUFPLElBQUlGLE9BQU9PLFFBQVEsS0FBSyxLQUFLO1lBQ2xDTCxXQUFXLEtBQUs7UUFDbEIsQ0FBQztJQUNILEdBQUc7UUFBQ0Y7S0FBTztJQUVYLGtEQUFrRDtJQUNsRCxJQUFJQyxTQUFTO1FBQ1gscUJBQU8sOERBQUNTO3NCQUFJOzs7Ozs7SUFDZCxDQUFDO0lBRUQsT0FBTyxJQUFJLEVBQUUsb0NBQW9DO0FBQ25EO0FBRUEsaUVBQWVYLElBQUlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9mcm9udGVuZC8uL2NvbXBvbmVudHMvYXV0aExvZ2luLmpzeD84MTIxIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIGNvbXBvbmVudHMvYXV0aExvZ2luLmpzXHJcbmltcG9ydCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7IHVzZVJvdXRlciB9IGZyb20gJ25leHQvcm91dGVyJztcclxuXHJcbmNvbnN0IEF1dGggPSAoKSA9PiB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKCk7XHJcbiAgY29uc3QgW2xvYWRpbmcsIHNldExvYWRpbmddID0gdXNlU3RhdGUoZmFsc2UpO1xyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgY29uc3QgaGFzVG9rZW4gPSBkb2N1bWVudC5jb29raWUuaW5jbHVkZXMoJ3Rva2VuPScpO1xyXG5cclxuICAgIGlmICghaGFzVG9rZW4gJiYgcm91dGVyLnBhdGhuYW1lICE9PSAnLycpIHtcclxuICAgICAgc2V0TG9hZGluZyh0cnVlKTtcclxuXHJcbiAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgIHJvdXRlci5wdXNoKCcvJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICBzZXRMb2FkaW5nKGZhbHNlKTtcclxuICAgICAgICB9LCAgMTApO1xyXG4gICAgICB9LCAgMTAwKTtcclxuICAgIH0gZWxzZSBpZiAocm91dGVyLnBhdGhuYW1lID09PSAnLycpIHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfSwgW3JvdXRlcl0pO1xyXG5cclxuICAvLyBSZW5kZXJpemEgdW4gaW5kaWNhZG9yIGRlIGNhcmdhIHNpIGVzIG5lY2VzYXJpb1xyXG4gIGlmIChsb2FkaW5nKSB7XHJcbiAgICByZXR1cm4gPGRpdj5DYXJnYW5kby4uLjwvZGl2PjtcclxuICB9XHJcblxyXG4gIHJldHVybiBudWxsOyAvLyBObyByZW5kZXJpemEgbmFkYSBzaSBubyBoYXkgY2FyZ2FcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IEF1dGg7XHJcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VTdGF0ZSIsInVzZVJvdXRlciIsIkF1dGgiLCJyb3V0ZXIiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImhhc1Rva2VuIiwiZG9jdW1lbnQiLCJjb29raWUiLCJpbmNsdWRlcyIsInBhdGhuYW1lIiwic2V0VGltZW91dCIsInB1c2giLCJkaXYiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/authLogin.jsx\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @chakra-ui/react */ \"@chakra-ui/react\");\n/* harmony import */ var _components_authLogin__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/authLogin */ \"./components/authLogin.jsx\");\n/* harmony import */ var _CSS_sweetalert_overlay_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../CSS/sweetalert-overlay.css */ \"./CSS/sweetalert-overlay.css\");\n/* harmony import */ var _CSS_sweetalert_overlay_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_CSS_sweetalert_overlay_css__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_4__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__]);\n_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\n\nconst theme = (0,_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.extendTheme)({\n    styles: {\n        global: {\n            html: {\n                height: \"100%\"\n            },\n            body: {\n                height: \"100%\",\n                margin: 0,\n                padding: 0,\n                bgGradient: \"linear(to-r, #007bff, #8a2be2)\"\n            }\n        }\n    }\n});\nfunction MyApp({ Component , pageProps  }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_chakra_ui_react__WEBPACK_IMPORTED_MODULE_1__.ChakraProvider, {\n        theme: theme,\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_authLogin__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\matias\\\\Desktop\\\\TallerD2023\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 25,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\matias\\\\Desktop\\\\TallerD2023\\\\frontend\\\\pages\\\\_app.js\",\n                lineNumber: 26,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\matias\\\\Desktop\\\\TallerD2023\\\\frontend\\\\pages\\\\_app.js\",\n        lineNumber: 24,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNkQ7QUFDbEI7QUFDSjtBQUNSO0FBRS9CLE1BQU1HLFFBQVFGLDZEQUFXQSxDQUFDO0lBQ3hCRyxRQUFRO1FBQ0xDLFFBQVE7WUFDTkMsTUFBTTtnQkFDSkMsUUFBUTtZQUNWO1lBQ0FDLE1BQU07Z0JBQ0pELFFBQVE7Z0JBQ1JFLFFBQVE7Z0JBQ1JDLFNBQVM7Z0JBQ1RDLFlBQVk7WUFDZDtRQUNGO0lBQ0g7QUFDRDtBQUVELFNBQVNDLE1BQU0sRUFBRUMsVUFBUyxFQUFFQyxVQUFTLEVBQUUsRUFBRTtJQUN2QyxxQkFDRSw4REFBQ2QsNERBQWNBO1FBQUNHLE9BQU9BOzswQkFDckIsOERBQUNELDZEQUFJQTs7Ozs7MEJBQ0wsOERBQUNXO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7OztBQUk5QjtBQUVBLGlFQUFlRixLQUFLQSxFQUFBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZnJvbnRlbmQvLi9wYWdlcy9fYXBwLmpzP2UwYWQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ2hha3JhUHJvdmlkZXIsZXh0ZW5kVGhlbWUgfSBmcm9tICdAY2hha3JhLXVpL3JlYWN0J1xyXG5pbXBvcnQgQXV0aCBmcm9tICcuLi9jb21wb25lbnRzL2F1dGhMb2dpbic7XHJcbmltcG9ydCAnLi4vQ1NTL3N3ZWV0YWxlcnQtb3ZlcmxheS5jc3MnO1xyXG5pbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcyc7XHJcblxyXG5jb25zdCB0aGVtZSA9IGV4dGVuZFRoZW1lKHtcclxuICBzdHlsZXM6IHtcclxuICAgICBnbG9iYWw6IHtcclxuICAgICAgIGh0bWw6IHtcclxuICAgICAgICAgaGVpZ2h0OiBcIjEwMCVcIixcclxuICAgICAgIH0sXHJcbiAgICAgICBib2R5OiB7XHJcbiAgICAgICAgIGhlaWdodDogXCIxMDAlXCIsXHJcbiAgICAgICAgIG1hcmdpbjogMCxcclxuICAgICAgICAgcGFkZGluZzogMCxcclxuICAgICAgICAgYmdHcmFkaWVudDogXCJsaW5lYXIodG8tciwgIzAwN2JmZiwgIzhhMmJlMilcIixcclxuICAgICAgIH0sXHJcbiAgICAgfSxcclxuICB9LFxyXG4gfSk7XHJcblxyXG5mdW5jdGlvbiBNeUFwcCh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPENoYWtyYVByb3ZpZGVyIHRoZW1lPXt0aGVtZX0+XHJcbiAgICAgIDxBdXRoLz5cclxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxyXG4gICAgPC9DaGFrcmFQcm92aWRlcj5cclxuICAgIFxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHAiXSwibmFtZXMiOlsiQ2hha3JhUHJvdmlkZXIiLCJleHRlbmRUaGVtZSIsIkF1dGgiLCJ0aGVtZSIsInN0eWxlcyIsImdsb2JhbCIsImh0bWwiLCJoZWlnaHQiLCJib2R5IiwibWFyZ2luIiwicGFkZGluZyIsImJnR3JhZGllbnQiLCJNeUFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./CSS/sweetalert-overlay.css":
/*!************************************!*\
  !*** ./CSS/sweetalert-overlay.css ***!
  \************************************/
/***/ (() => {



/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "@chakra-ui/react":
/*!***********************************!*\
  !*** external "@chakra-ui/react" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = import("@chakra-ui/react");;

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();