/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 354:
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ 414:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/tradeguys.eot";

/***/ }),

/***/ 417:
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ 428:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/tradeguys.ttf";

/***/ }),

/***/ 476:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/tradeguys.svg";

/***/ }),

/***/ 530:
/***/ ((module, __unused_webpack___webpack_exports__, __webpack_require__) => {

/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(825);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(659);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(540);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(113);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(917);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"], options);


if (true) {
  if (!_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals || module.hot.invalidate) {
    var isEqualLocals = function isEqualLocals(a, b, isNamedExport) {
  if (!a && b || a && !b) {
    return false;
  }
  var p;
  for (p in a) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (a[p] !== b[p]) {
      return false;
    }
  }
  for (p in b) {
    if (isNamedExport && p === "default") {
      // eslint-disable-next-line no-continue
      continue;
    }
    if (!a[p]) {
      return false;
    }
  }
  return true;
};
    var isNamedExport = !_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;
    var oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

    module.hot.accept(
      917,
      __WEBPACK_OUTDATED_DEPENDENCIES__ => { /* harmony import */ _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(917);
 return (function () {
        if (!isEqualLocals(oldLocals, isNamedExport ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals, isNamedExport)) {
                module.hot.invalidate();

                return;
              }

              oldLocals = isNamedExport ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__ : _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals;

              update(_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"]);
      })(__WEBPACK_OUTDATED_DEPENDENCIES__); }
    )
  }

  module.hot.dispose(function() {
    update();
  });
}



       /* unused harmony default export */ var __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_1_node_modules_postcss_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_ruleSet_1_rules_1_use_3_main_scss__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ 534:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/tradeguys.woff";

/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 758:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "assets/tradeguys.woff2";

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ 917:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(354);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(417);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(414), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(758), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_2___ = new URL(/* asset import */ __webpack_require__(534), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_3___ = new URL(/* asset import */ __webpack_require__(428), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_4___ = new URL(/* asset import */ __webpack_require__(476), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___, { hash: "#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_3___);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_4___, { hash: "#tradeguys" });
// Module
___CSS_LOADER_EXPORT___.push([module.id, `@font-face{font-family:tradeguys;font-style:normal;font-weight:400;src:url(${___CSS_LOADER_URL_REPLACEMENT_0___});src:url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("embedded-opentype"),url(${___CSS_LOADER_URL_REPLACEMENT_2___}) format("woff2"),url(${___CSS_LOADER_URL_REPLACEMENT_3___}) format("woff"),url(${___CSS_LOADER_URL_REPLACEMENT_4___}) format("truetype"),url(${___CSS_LOADER_URL_REPLACEMENT_5___}) format("svg")}[class*=" icon-"]:before,[class^=icon-]:before{font-family:tradeguys;font-style:normal;font-weight:400;speak:none;display:inline-block;font-variant:normal;line-height:1em;margin-left:.2em;margin-right:.2em;text-align:center;text-decoration:inherit;text-transform:none;width:1em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-email:before{content:""}.icon-print:before{content:""}.icon-link:before{content:""}.icon-icon_check:before{content:""}.icon-transcript:before{content:""}.icon-youtube:before{content:""}.icon-angle-left:before{content:""}.icon-angle-right:before{content:""}.icon-arrow-left:before{content:""}.icon-arrow-right:before{content:""}.icon-close-lg:before{content:""}.icon-plus-lg:before{content:""}.icon-rss:before{content:""}.icon-video:before{content:""}.icon-quote:before{content:""}.icon-menu:before{content:""}.icon-pause:before{content:""}.icon-play:before{content:""}.icon-linkedin:before{content:""}.icon-chart-line:before{content:""}.icon-facebook:before{content:""}.icon-google:before{content:""}.icon-twitter:before{content:""}.icon-plus:before{content:""}.icon-close:before{content:""}.icon-search:before{content:""}.icon-external:before{content:""}.icon-share:before{content:""}body{--breakpoint:"xsmall";color:#000;font-family:Source Sans Pro,sans-serif;font-size:16px;margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media screen and (min-width:35em){body{--breakpoint:"small"}}@media screen and (min-width:48em){body{--breakpoint:"medium"}}@media screen and (min-width:64em){body{--breakpoint:"large"}}p{margin:0 0 1.5rem}sup{position:relative;top:-.4em;vertical-align:baseline}.post-content ol a,.post-content ul a,p a{border-bottom:1px dashed #000}a{color:inherit;text-decoration:none;transition:all .3s ease-in-out}a:focus{outline:thin dotted}a:active,a:hover{outline:0}.post-content ol a,.post-content ul a,p a{background-image:linear-gradient(transparent 20%,#eae134 0);background-repeat:no-repeat;background-size:0 100%;transition:all .2s ease-in-out;width:100%}.post-content ol a:hover,.post-content ul a:hover,p a:hover{background-size:100% 100%}ul{list-style:none;margin:0;padding-inline-start:24px}ul li{font-family:Inconsolata,monospace}ul li:before{content:"█";display:inline-block;font-family:Source Sans Pro,sans-serif;font-weight:700;line-height:1;margin-left:-1.5rem;position:relative;top:-.1rem;width:1rem}ul li.china:before{color:#fe5000}ul li.eu:before{color:#0aa4cf}ul li.mexico:before{color:#f2af19}ul li.canada:before{color:#9eb040}.tooltip,.tooltip-info{background-color:#fff;border:1px solid #b3b3b3;border-radius:3px;display:block;font-size:14px;font-size:.875rem;height:auto;line-height:1.4;margin:0 15px;max-width:175px;opacity:0;padding:8px 8px 10px;pointer-events:none;position:absolute;visibility:hidden;width:-moz-fit-content;width:fit-content;z-index:20}.tooltip p,.tooltip-info p{margin:0}.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{border-bottom:1px solid #000;font-weight:700;line-height:1.4;margin-bottom:.5rem;text-align:center;text-transform:uppercase}@media screen and (min-width:35em){.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{line-height:1.4}}.tooltip .tooltip-heading .location,.tooltip-info .tooltip-heading .location{display:block;font-size:10px;font-size:.625rem;font-style:italic}.tooltip .tooltip-label,.tooltip-info .tooltip-label{text-transform:capitalize}.tooltip .tooltip-label.indented,.tooltip-info .tooltip-label.indented{padding-left:.75rem}.tooltip .tooltip-list li,.tooltip-info .tooltip-list li{font-size:14px;font-size:.875rem}.tooltip .tooltip-list li:before,.tooltip-info .tooltip-list li:before{font-size:9px;font-size:.5625rem}.tooltip .tooltip-list .active-category,.tooltip-info .tooltip-list .active-category{font-weight:700}.tooltip .tooltip-close,.tooltip-info .tooltip-close{display:block;font-weight:700;pointer-events:all;position:absolute;right:.5rem;text-align:right;top:.25rem;width:25%;z-index:25}@media screen and (min-width:35em){.tooltip .tooltip-close,.tooltip-info .tooltip-close{display:none}}.tooltip-info{max-width:100px}@media screen and (min-width:35em){.tooltip-info{max-width:300px}}.legend-label{font-family:Inconsolata,monospace}.legend-label:before{border:1px solid #000;content:"";display:inline-block;height:1rem;margin-right:.5rem;transition:.2s;vertical-align:-.2em;width:1rem}.legend-label.all:before{background-color:#eae134}.legend-label.china:before{background-color:#fe5000}.legend-label.canada:before{background-color:#9eb040}.legend-label.eu:before{background-color:#0aa4cf}.legend-label.mexico:before{background-color:#f2af19}input{box-sizing:border-box;font-size:18px;font-size:1.125rem;left:2px;line-height:1.78;margin:0;opacity:0;padding:0;position:absolute;top:1px}input:not(:checked){cursor:pointer}input:checked+label:after{color:#000;content:"";cursor:pointer;font-family:tradeguys;font-weight:700;left:1px;position:absolute;top:1px}@media screen and (max-width:35em){.chart{width:105%}.chart foreignObject div{transform:translateX(-4px)}}@media screen and (min-width:35em){.chart{margin-left:auto;margin-right:auto;max-width:700px}}.chart svg .stateModal{font-family:Inconsolata,monospace;font-size:12.5px;font-size:.78125rem;line-height:1.6}@media screen and (min-width:35em){.chart svg .stateModal{font-size:18px;font-size:1.125rem}}.chart svg .stateModal .modal-heading{font-family:Source Sans Pro,sans-serif;font-size:16px;font-size:1rem;font-weight:700;letter-spacing:1.4px}@media screen and (min-width:35em){.chart svg .stateModal .modal-heading{font-size:24px;font-size:1.5rem}}.chart svg .stateModal ul li:before{font-size:12px;font-size:.75rem}.chart svg .group{cursor:zoom-in}.chart svg .group .label{font-size:12px;font-size:.75rem;fill:#000;stroke:#fff;paint-order:stroke;stroke-width:3px;font-weight:800;text-transform:uppercase;transition:all .2s ease-in-out}@media screen and (min-width:35em){.chart svg .group .label{font-size:18px;font-size:1.125rem}}.chart svg .group .state{transition:all .2s ease-in-out}@media screen and (max-width:35em){.chart svg .group .state{stroke-width:2!important}.chart svg .group .percent{stroke-width:0!important}}.chart svg .group:hover .state{stroke:#eae134}.legend{margin:24px 12px 12px}@media screen and (min-width:35em){.legend{margin:24px 0 12px}}.legend .legend-title{flex-basis:100%;font-family:Inconsolata,monospace;font-size:14px;font-size:.875rem;font-weight:400;letter-spacing:1.2px;text-transform:uppercase}.legend>.direction{flex-basis:100%;font-size:12px;font-size:.75rem;font-style:italic;margin-top:6px}.legend .container{align-items:center;display:flex;flex-wrap:wrap}.legend .container .legend-bar{align-items:center;background-color:#fff;display:none;flex-wrap:wrap;font-family:Inconsolata,monospace;line-height:1.2;padding:6px;position:relative}@media screen and (min-width:35em){.legend .container .legend-bar{display:flex;flex:0 0 224px;margin-left:36px;width:100%}.legend .container .legend-bar:before{background-color:#000;content:"";display:block;height:120%;left:-24px;position:absolute;top:0;width:1px}}.legend .container .legend-bar>div{font-size:16px;font-size:1rem;padding-left:12px}.legend .container .legend-bar>div .min-max{font-size:14px;font-size:.875rem}.legend .container .countries{align-items:center;display:flex;flex-wrap:wrap}@media screen and (min-width:35em){.legend .container .countries{flex:0 0 calc(100% - 300px)}}.legend .container .countries .legend-item{box-sizing:border-box;display:flex;flex:1 0 47%;font-size:16px;font-size:1rem;margin:0 6px 6px 0;position:relative}@media screen and (min-width:35em){.legend .container .countries .legend-item{flex:1 0 auto;margin:0 6px 0 0}}body>:not(.tooltip):not(.chart){margin-left:12px;margin-right:12px;max-width:700px}@media screen and (min-width:35em){body>:not(.tooltip):not(.chart){margin-left:auto;margin-right:auto}}body .interactive__header{border-bottom:0;margin:1rem auto;padding-bottom:1.25rem}body .interactive__header .interactive__title{color:#000;font-family:Source Sans Pro,sans-serif;font-size:20px;font-size:1.25rem;font-weight:700;letter-spacing:1.4px;line-height:1.36;text-align:center}body .interactive__header p{font-size:16px;font-size:1rem;line-height:1.78}body .interactive__filters{margin:0 auto 1rem}body .interactive__filters .search__suggestions{margin-bottom:0;margin-top:3px}body .interactive__graphic{margin:0 auto;max-width:1250px;position:relative}body .interactive__source{border-top:1px solid #000;margin-left:auto;margin-right:auto;padding-bottom:2rem}body .interactive__source p{color:#4a4a4a;font-family:Source Sans Pro,sans-serif;font-size:14px;font-size:.875rem;margin:.5rem 0 0}body .instructions{border-top:1px solid #b3b3b3;color:#4a4a4a;font-size:.9rem;font-style:italic;margin-top:6px;padding:.5rem 0 0;text-align:center}body .instructions span{display:none}@media screen and (min-width:35em){body .instructions span{display:inline-block}}`, "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/base/_variables.scss","webpack://./src/scss/base/_base.scss","webpack://./src/scss/base/_mixins.scss","webpack://./src/scss/components/_tooltips.scss","webpack://./src/scss/components/_form-elements.scss","webpack://./src/scss/custom/_chart.scss","webpack://./src/scss/custom/_layout.scss"],"names":[],"mappings":"AAAA,WCgCA,qBACE,CAQA,iBACA,CAPA,eAMA,CARA,2CACA,CAAA,uSAQA,CAAA,+CAGF,qBAEE,CAAA,iBACA,CAAA,eACA,CAAA,UACA,CAAA,oBAEA,CAIA,mBAIA,CACA,eAGA,CAAA,gBAIA,CAdA,iBACA,CAAA,iBACA,CAJA,uBACA,CAOA,mBACA,CARA,SACA,CAcA,kCAMA,CAAA,iCACA,CAAA,mBAKF,WACE,CAAA,mBAEF,WACE,CAAA,kBAEF,WACE,CAAA,wBAEF,WACE,CAAA,wBAEF,WACE,CAAA,qBAEF,WACE,CAAA,wBAEF,WACE,CAAA,yBAEF,WACE,CAAA,wBAEF,WACE,CAAA,yBAEF,WACE,CAAA,sBAEF,WACE,CAAA,qBAEF,WACE,CAAA,iBAEF,WACE,CAAA,mBAEF,WACE,CAAA,mBAEF,WACE,CAAA,kBAEF,WACE,CAAA,mBAEF,WACE,CAAA,kBAEF,WACE,CAAA,sBAEF,WACE,CAAA,wBAEF,WACE,CAAA,sBAEF,WACE,CAAA,oBAEF,WACE,CAAA,qBAEF,WACE,CAAA,kBAEF,WACE,CAAA,mBAEF,WACE,CAAA,oBAEF,WACE,CAAA,sBAEF,WACE,CAAA,mBAEF,WACE,CAAA,KC/JF,qBACE,CAGA,UDPM,CCIN,sCDyBY,CAAA,cANI,CAAA,QChBhB,CDPM,kCCSN,CAAA,iCACA,CAAA,mCC2BE,KDlCJ,oBAUI,CAAA,CAAA,mCCoBA,KD9BJ,qBAcI,CAAA,CAAA,mCCYA,KD1BJ,oBAkBI,CAAA,CAAA,EAIJ,iBACE,CAAA,IAIA,iBACA,CAAA,SACA,CAHF,uBAGE,CAAA,0CAOF,6BACE,CAAA,EAgBF,aACE,CAAA,oBACA,CAAA,8BACA,CAAA,QAQA,mBACE,CAAA,iBAEF,SAEE,CAAA,0CCVkE,2DAEpE,CAAA,2BAIA,CAAA,sBACA,CAAA,8BACA,CDKA,UCLA,CAAA,4DAEA,yBACE,CAAA,GDcF,eACA,CAHF,QACE,CAAA,yBAEA,CAAA,MAEA,iCD9DiB,CAAA,aCwEb,WACA,CAJA,oBACA,CANF,sCD/DU,CAAA,eCiER,CAAA,aACA,CAIA,mBACA,CALA,iBACA,CAAA,UACA,CACA,UAGA,CAAA,mBAGF,aDlGE,CAAA,gBCqGF,aDnGG,CAAA,oBCsGH,aDrGK,CAAA,oBCwGL,aD1GI,CAAA,uBGeN,qBHrBM,CGmBN,wBACA,CAAA,iBACA,CAhBF,aAEE,CAAA,cACkB,CAAA,iBDKlB,CCCA,WACA,CDFA,eCJA,CAMA,aACA,CAHA,eACA,CAIA,SACA,CAHA,oBACA,CAAA,mBACA,CATA,iBACA,CACA,iBACA,CAAA,sBACA,CADA,iBACA,CAHA,UHVM,CAAA,2BGwBN,QACE,CAAA,yDAQA,4BACA,CAJA,eACA,CAFA,eACA,CACA,mBACA,CAAA,iBACA,CALF,wBAME,CAAA,mCDEA,yDCRF,eASI,CAAA,CAAA,6EAGF,aACE,CAAA,cACkB,CAAA,iBD7BtB,CAAA,iBC8BI,CAAA,qDAIJ,yBACE,CAAA,uEAEA,mBACE,CAAA,yDAKF,cACoB,CAAA,iBD5CtB,CAAA,uEC8CI,aACoB,CAAA,kBD/CxB,CAAA,qFCmDE,eACE,CAAA,qDASF,aACA,CANF,eACE,CAOA,kBACA,CARA,iBACA,CAEA,WACA,CAEA,gBACA,CALA,UACA,CAEA,SACA,CALA,UAOA,CAAA,mCD1CA,qDCiCF,YAYI,CAAA,CAAA,cAKN,eACE,CAAA,mCDnDE,cCkDJ,eAII,CAAA,CAAA,cCrFJ,iCJsBmB,CAAA,qBIbf,qBACA,CAJA,UACA,CALF,oBACE,CACA,WACA,CAAA,kBACA,CACA,cACA,CAAA,oBACA,CANA,UAOA,CAAA,yBAGF,wBJfO,CAAA,2BIkBP,wBJhBI,CAAA,4BImBJ,wBJlBM,CAAA,wBIqBN,wBJpBK,CAAA,4BIuBL,wBJtBO,CAAA,MIgCP,qBACA,CANF,cACoB,CAAA,kBFvBlB,CE0BA,QACA,CF3BA,gBEwBA,CAIA,QACA,CACA,SACA,CAFA,SACA,CANA,iBACA,CAAA,OAMA,CAAA,oBAEA,cACE,CAAA,0BAUA,UJ1DI,CIwDJ,WACA,CAAA,cACA,CAPF,qBACE,CAAA,eACA,CAEA,QACA,CAHA,iBACA,CAAA,OJtDI,CAAA,mCKSN,OADF,UAEI,CAAA,yBAEA,0BACE,CAAA,CAAA,mCHwBF,OFZa,gBKNb,CAAA,iBACA,CAZJ,eAYI,CAAA,CAAA,uBAIA,iCLIe,CKFb,gBACkB,CAAA,mBHbtB,CFciB,eEdjB,CAAA,mCAuBE,uBGbA,cAMsB,CAAA,kBHhBxB,CAAA,CAAA,sCGmBI,sCLJQ,CKON,cACkB,CAAA,cHvBxB,CFeY,eKMN,CAAA,oBHrBN,CAAA,mCAuBE,sCGJE,cAOsB,CAAA,gBH1B1B,CAAA,CAAA,oCGgCQ,cACoB,CAAA,gBHjC5B,CAAA,kBGuCE,cACE,CAAA,yBAEA,cACoB,CAAA,gBH3CxB,CAAA,SFdM,CAAA,WACA,CAAA,kBK2DA,CAAA,gBACA,CACA,eACA,CAFA,wBACA,CACA,8BACA,CAAA,mCH3BJ,yBGmBE,cAWsB,CAAA,kBHrD1B,CAAA,CAAA,yBGyDI,8BACE,CAAA,mCACA,yBAFF,wBAGI,CAKF,2BADF,wBAEI,CANA,CAMA,+BAIJ,cACE,CAAA,QAUR,qBACE,CAAA,mCH3DE,QG0DJ,kBAII,CAAA,CAAA,sBAIA,eACA,CAAA,iCL5Ee,CK+Ef,cACkB,CAAA,iBH9FpB,CFciB,eK8Ef,CH5FF,oBG+FE,CAHA,wBAGA,CAAA,mBAIA,eACA,CACA,cACkB,CAAA,gBHtGpB,CGoGE,iBACA,CHrGF,cGuGE,CAAA,mBAQA,kBACA,CALA,YACA,CACA,cAGA,CAAA,+BAWE,kBACA,CALA,qBLpIE,CKkIF,YACA,CAGA,cACA,CARF,iCLpGe,CAAA,eKsGb,CAEA,WACA,CAHA,iBAQA,CAAA,mCHrGF,+BGwGI,YACA,CAGA,cACA,CAJA,gBACA,CAAA,UAGA,CAAA,sCASE,qBL3JF,CKoJA,UACE,CAAA,aACA,CAIA,WACA,CAHA,UACA,CAHA,iBACA,CAAA,KACA,CACA,SLzJF,CAAA,CAAA,mCKiKA,cACkB,CAAA,cHpJxB,CGkJI,iBHlJJ,CAAA,4CGsJM,cACoB,CAAA,iBHvJ1B,CAAA,8BG+JI,kBACA,CAHA,YACA,CAGA,cACA,CAAA,mCH3IF,8BG8II,2BACA,CAAA,CAAA,2CAOA,qBACA,CAFA,YACA,CAGA,YACA,CARF,cACoB,CAAA,cH1KxB,CG8KM,kBACA,CH/KN,iBGiLM,CAAA,mCH1JJ,2CG6JM,aACA,CAAA,gBACA,CAAA,CAAA,gCL3KO,gBMhBb,CAAA,iBACA,CAHF,eAGE,CAAA,mCJ2BA,gCI9BF,gBAMI,CAAA,iBACA,CAAA,CAAA,0BAMF,eACA,CAHF,gBACE,CAAA,sBAEA,CAAA,8CAME,UN3BE,CMuBJ,sCNMU,CAAA,cMJU,CAAA,iBJXtB,CFdM,eM8BF,CAJA,oBACA,CJbJ,gBIYI,CAIA,iBACA,CAAA,4BAIA,cACkB,CAAA,cJtBtB,CIoBE,gBJpBF,CAAA,2BI0BA,kBACE,CAAA,gDAGE,eACA,CAFF,cAEE,CAAA,2BAMF,aACA,CAFA,gBACA,CAFF,iBAGE,CAAA,0BAMA,yBACA,CAJF,gBACE,CAAA,iBACA,CAAA,mBAEA,CAAA,4BN9BU,aAlBP,CEGL,sCFeY,CMiCR,cACkB,CAAA,iBJjDtB,CI+CE,gBNlDG,CAAA,mBM6DH,4BACA,CACA,aN/DG,CM2DH,eACA,CAFF,iBACE,CACA,cACA,CACA,iBACA,CN/DG,iBMiEH,CAAA,wBAEA,YACE,CAAA,mCJ1CF,wBIyCA,oBAGI,CAAA","sourcesContent":["@font-face{font-family:\"tradeguys\";src:url(\"../fonts/tradeguys.eot?48792507\");src:url(\"../fonts/tradeguys.eot?48792507#iefix\") format(\"embedded-opentype\"),url(\"../fonts/tradeguys.woff2?48792507\") format(\"woff2\"),url(\"../fonts/tradeguys.woff?48792507\") format(\"woff\"),url(\"../fonts/tradeguys.ttf?48792507\") format(\"truetype\"),url(\"../fonts/tradeguys.svg?48792507#tradeguys\") format(\"svg\");font-weight:normal;font-style:normal}[class^=icon-]:before,[class*=\" icon-\"]:before{font-family:\"tradeguys\";font-style:normal;font-weight:normal;speak:none;display:inline-block;text-decoration:inherit;width:1em;margin-right:.2em;text-align:center;font-variant:normal;text-transform:none;line-height:1em;margin-left:.2em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-email:before{content:\"\"}.icon-print:before{content:\"\"}.icon-link:before{content:\"\"}.icon-icon_check:before{content:\"\"}.icon-transcript:before{content:\"\"}.icon-youtube:before{content:\"\"}.icon-angle-left:before{content:\"\"}.icon-angle-right:before{content:\"\"}.icon-arrow-left:before{content:\"\"}.icon-arrow-right:before{content:\"\"}.icon-close-lg:before{content:\"\"}.icon-plus-lg:before{content:\"\"}.icon-rss:before{content:\"\"}.icon-video:before{content:\"\"}.icon-quote:before{content:\"\"}.icon-menu:before{content:\"\"}.icon-pause:before{content:\"\"}.icon-play:before{content:\"\"}.icon-linkedin:before{content:\"\"}.icon-chart-line:before{content:\"\"}.icon-facebook:before{content:\"\"}.icon-google:before{content:\"\"}.icon-twitter:before{content:\"\"}.icon-plus:before{content:\"\"}.icon-close:before{content:\"\"}.icon-search:before{content:\"\"}.icon-external:before{content:\"\"}.icon-share:before{content:\"\"}body{--breakpoint: \"xsmall\";font-family:\"Source Sans Pro\",sans-serif;font-size:16px;margin:0;color:#000;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media screen and (min-width: 35em){body{--breakpoint: \"small\"}}@media screen and (min-width: 48em){body{--breakpoint: \"medium\"}}@media screen and (min-width: 64em){body{--breakpoint: \"large\"}}p{margin:0 0 1.5rem}sup{vertical-align:baseline;position:relative;top:-0.4em}p a,.post-content ul a,.post-content ol a{border-bottom:1px dashed #000}a{color:inherit;text-decoration:none;transition:all .3s ease-in-out}a:focus{outline:thin dotted}a:hover,a:active{outline:0}p a,.post-content ul a,.post-content ol a{width:100%;background-image:linear-gradient(transparent 20%, #eae134 20%);background-repeat:no-repeat;background-size:0% 100%;transition:all .2s ease-in-out}p a:hover,.post-content ul a:hover,.post-content ol a:hover{background-size:100% 100%}ul{margin:0;padding-inline-start:24px;list-style:none}ul li{font-family:\"Inconsolata\",monospace}ul li:before{font-family:\"Source Sans Pro\",sans-serif;font-weight:bold;line-height:1;position:relative;top:-0.1rem;display:inline-block;width:1rem;margin-left:-1.5rem;content:\"█\"}ul li.china::before{color:#fe5000}ul li.eu::before{color:#0aa4cf}ul li.mexico::before{color:#f2af19}ul li.canada::before{color:#9eb040}.tooltip,.tooltip-info{display:block;font-size:14px;font-size:0.875rem;line-height:1.4;position:absolute;z-index:20;visibility:hidden;width:fit-content;max-width:175px;height:auto;margin:0 15px;padding:8px 8px 10px;pointer-events:none;opacity:0;border:1px solid #b3b3b3;border-radius:3px;background-color:#fff}.tooltip p,.tooltip-info p{margin:0}.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{text-transform:uppercase;line-height:1.4;font-weight:bold;margin-bottom:.5rem;text-align:center;border-bottom:1px solid #000}@media screen and (min-width: 35em){.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{line-height:1.4}}.tooltip .tooltip-heading .location,.tooltip-info .tooltip-heading .location{display:block;font-size:10px;font-size:0.625rem;font-style:italic}.tooltip .tooltip-label,.tooltip-info .tooltip-label{text-transform:capitalize}.tooltip .tooltip-label.indented,.tooltip-info .tooltip-label.indented{padding-left:.75rem}.tooltip .tooltip-list li,.tooltip-info .tooltip-list li{font-size:14px;font-size:0.875rem}.tooltip .tooltip-list li:before,.tooltip-info .tooltip-list li:before{font-size:9px;font-size:0.5625rem}.tooltip .tooltip-list .active-category,.tooltip-info .tooltip-list .active-category{font-weight:bold}.tooltip .tooltip-close,.tooltip-info .tooltip-close{font-weight:bold;position:absolute;z-index:25;top:.25rem;right:.5rem;display:block;width:25%;text-align:right;pointer-events:all}@media screen and (min-width: 35em){.tooltip .tooltip-close,.tooltip-info .tooltip-close{display:none}}.tooltip-info{max-width:100px}@media screen and (min-width: 35em){.tooltip-info{max-width:300px}}.legend-label{font-family:\"Inconsolata\",monospace}.legend-label:before{display:inline-block;width:1rem;height:1rem;margin-right:.5rem;content:\"\";transition:.2s;vertical-align:-0.2em;border:1px solid #000}.legend-label.all:before{background-color:#eae134}.legend-label.china:before{background-color:#fe5000}.legend-label.canada:before{background-color:#9eb040}.legend-label.eu:before{background-color:#0aa4cf}.legend-label.mexico:before{background-color:#f2af19}input{font-size:18px;font-size:1.125rem;line-height:1.78;position:absolute;top:1px;left:2px;box-sizing:border-box;margin:0;padding:0;opacity:0}input:not(:checked){cursor:pointer}input:checked+label::after{font-family:\"tradeguys\";font-weight:bold;position:absolute;top:1px;left:1px;content:\"\";cursor:pointer;color:#000}@media screen and (max-width: 35em){.chart{width:105%}.chart foreignObject div{transform:translateX(-4px)}}@media screen and (min-width: 35em){.chart{max-width:700px;margin-left:auto;margin-right:auto}}.chart svg .stateModal{font-family:\"Inconsolata\",monospace;line-height:1.6;font-size:12.5px;font-size:0.78125rem}@media screen and (min-width: 35em){.chart svg .stateModal{font-size:18px;font-size:1.125rem}}.chart svg .stateModal .modal-heading{font-family:\"Source Sans Pro\",sans-serif;font-weight:bold;letter-spacing:1.4px;font-size:16px;font-size:1rem}@media screen and (min-width: 35em){.chart svg .stateModal .modal-heading{font-size:24px;font-size:1.5rem}}.chart svg .stateModal ul li:before{font-size:12px;font-size:0.75rem}.chart svg .group{cursor:zoom-in}.chart svg .group .label{font-size:12px;font-size:0.75rem;fill:#000;stroke:#fff;paint-order:stroke;stroke-width:3px;text-transform:uppercase;font-weight:800;transition:all .2s ease-in-out}@media screen and (min-width: 35em){.chart svg .group .label{font-size:18px;font-size:1.125rem}}.chart svg .group .state{transition:all .2s ease-in-out}@media screen and (max-width: 35em){.chart svg .group .state{stroke-width:2 !important}}@media screen and (max-width: 35em){.chart svg .group .percent{stroke-width:0 !important}}.chart svg .group:hover .state{stroke:#eae134}.legend{margin:24px 12px 12px}@media screen and (min-width: 35em){.legend{margin:24px 0 12px}}.legend .legend-title{-ms-flex-preferred-size:100%;flex-basis:100%;font-family:\"Inconsolata\",monospace;font-weight:400;text-transform:uppercase;font-size:14px;font-size:0.875rem;letter-spacing:1.2px}.legend>.direction{-ms-flex-preferred-size:100%;flex-basis:100%;font-style:italic;font-size:12px;font-size:0.75rem;margin-top:6px}.legend .container{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}.legend .container .legend-bar{font-family:\"Inconsolata\",monospace;line-height:1.2;position:relative;display:none;padding:6px;background-color:#fff;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}@media screen and (min-width: 35em){.legend .container .legend-bar{display:-ms-flexbox;display:flex;margin-left:36px;width:100%;-ms-flex:0 0 224px;flex:0 0 224px}.legend .container .legend-bar:before{content:\"\";display:block;position:absolute;top:0;left:-24px;width:1px;height:120%;background-color:#000}}.legend .container .legend-bar>div{padding-left:12px;font-size:16px;font-size:1rem}.legend .container .legend-bar>div .min-max{font-size:14px;font-size:0.875rem}.legend .container .countries{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}@media screen and (min-width: 35em){.legend .container .countries{-ms-flex:0 0 calc(100% - 300px);flex:0 0 calc(100% - 300px)}}.legend .container .countries .legend-item{font-size:16px;font-size:1rem;position:relative;display:-ms-flexbox;display:flex;box-sizing:border-box;margin:0 6px 6px 0;-ms-flex:1 0 47%;flex:1 0 47%}@media screen and (min-width: 35em){.legend .container .countries .legend-item{-ms-flex:1 0 auto;flex:1 0 auto;margin:0 6px 0 0}}body>*:not(.tooltip):not(.chart){max-width:700px;margin-left:12px;margin-right:12px}@media screen and (min-width: 35em){body>*:not(.tooltip):not(.chart){margin-left:auto;margin-right:auto}}body .interactive__header{margin:1rem auto;padding-bottom:1.25rem;border-bottom:0}body .interactive__header .interactive__title{font-family:\"Source Sans Pro\",sans-serif;font-size:20px;font-size:1.25rem;line-height:1.36;letter-spacing:1.4px;color:#000;font-weight:bold;text-align:center}body .interactive__header p{line-height:1.78;font-size:16px;font-size:1rem}body .interactive__filters{margin:0 auto 1rem}body .interactive__filters .search__suggestions{margin-top:3px;margin-bottom:0}body .interactive__graphic{position:relative;max-width:1250px;margin:0 auto}body .interactive__source{margin-left:auto;margin-right:auto;padding-bottom:2rem;border-top:1px solid #000}body .interactive__source p{margin:.5rem 0 0;font-size:14px;font-size:0.875rem;font-family:\"Source Sans Pro\",sans-serif;color:#4a4a4a}body .instructions{font-style:italic;font-size:.9rem;margin-top:6px;border-top:1px solid #b3b3b3;padding:.5rem 0 0;color:#4a4a4a;text-align:center}body .instructions span{display:none}@media screen and (min-width: 35em){body .instructions span{display:inline-block}}","$black: #000;\n$white: #fff;\n$off-white: #f7f4f1;\n$off-white-dark: #eae6e1;\n$yellow: #eae134;\n$dark-yellow: #cfc83a;\n$red: #fe5000;\n$green: #9eb040;\n$blue: #0aa4cf;\n$orange: #f2af19;\n$purple: #a1689c;\n$gray: #4a4a4a;\n$dark-gray: #353535;\n$disabled-gray: #b3b3b3;\n\n$color_footer-contact-text: #e0e1e2;\n$color_footer-copyright-text: #090909;\n$color_post-list-border: $disabled-gray;\n$color_audio-player-progress-bar: $disabled-gray;\n$color_audio-player-transcript-box: $off-white-dark;\n$color_audio-player-transcript-box-shadow: rgba(0, 0, 0, 0.2);\n$color_home-trade-guy-title: #444;\n\n$browser-context: 16px;\n/*----------  Structural  ----------*/\n$size-max-width: 700px;\n\n/*----------  Fonts  ----------*/\n$font_inconsolata: 'Inconsolata', monospace;\n$font_source: 'Source Sans Pro', sans-serif;\n$fontello_url: '../fonts/';\n\n@font-face {\n  font-family: 'tradeguys';\n  src: url('#{$fontello_url}tradeguys.eot?48792507');\n  src: url('#{$fontello_url}tradeguys.eot?48792507#iefix')\n      format('embedded-opentype'),\n    url('#{$fontello_url}tradeguys.woff2?48792507') format('woff2'),\n    url('#{$fontello_url}tradeguys.woff?48792507') format('woff'),\n    url('#{$fontello_url}tradeguys.ttf?48792507') format('truetype'),\n    url('#{$fontello_url}tradeguys.svg?48792507#tradeguys') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^='icon-']:before,\n[class*=' icon-']:before {\n  font-family: 'tradeguys';\n  font-style: normal;\n  font-weight: normal;\n  speak: none;\n\n  display: inline-block;\n  text-decoration: inherit;\n  width: 1em;\n  margin-right: 0.2em;\n  text-align: center;\n  /* opacity: .8; */\n\n  /* For safety - reset parent styles, that can break glyph codes*/\n  font-variant: normal;\n  text-transform: none;\n\n  /* fix buttons height, for twitter bootstrap */\n  line-height: 1em;\n\n  /* Animation center compensation - margins should be symmetric */\n  /* remove if not needed */\n  margin-left: 0.2em;\n\n  /* you can be more comfortable with increased icons size */\n  /* font-size: 120%; */\n\n  /* Font smoothing. That was taken from TWBS */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n  /* Uncomment for 3D effect */\n  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */\n}\n.icon-email:before {\n  content: '\\e801';\n} /* '' */\n.icon-print:before {\n  content: '\\e804';\n} /* '' */\n.icon-link:before {\n  content: '\\e805';\n} /* '' */\n.icon-icon_check:before {\n  content: '\\e878';\n} /* '' */\n.icon-transcript:before {\n  content: '\\e89b';\n} /* '' */\n.icon-youtube:before {\n  content: '\\e983';\n} /* '' */\n.icon-angle-left:before {\n  content: '\\e992';\n} /* '' */\n.icon-angle-right:before {\n  content: '\\e993';\n} /* '' */\n.icon-arrow-left:before {\n  content: '\\e99d';\n} /* '' */\n.icon-arrow-right:before {\n  content: '\\e99e';\n} /* '' */\n.icon-close-lg:before {\n  content: '\\e9bd';\n} /* '' */\n.icon-plus-lg:before {\n  content: '\\ea81';\n} /* '' */\n.icon-rss:before {\n  content: '\\ebee';\n} /* '' */\n.icon-video:before {\n  content: '\\ebf0';\n} /* '' */\n.icon-quote:before {\n  content: '\\ebf1';\n} /* '' */\n.icon-menu:before {\n  content: '\\ebf2';\n} /* '' */\n.icon-pause:before {\n  content: '\\f00e';\n} /* '' */\n.icon-play:before {\n  content: '\\f00f';\n} /* '' */\n.icon-linkedin:before {\n  content: '\\f0e1';\n} /* '' */\n.icon-chart-line:before {\n  content: '\\f201';\n} /* '' */\n.icon-facebook:before {\n  content: '\\f231';\n} /* '' */\n.icon-google:before {\n  content: '\\f234';\n} /* '' */\n.icon-twitter:before {\n  content: '\\f243';\n} /* '' */\n.icon-plus:before {\n  content: '\\f2c7';\n} /* '' */\n.icon-close:before {\n  content: '\\f2d7';\n} /* '' */\n.icon-search:before {\n  content: '\\f2f5';\n} /* '' */\n.icon-external:before {\n  content: '\\f39c';\n} /* '' */\n.icon-share:before {\n  content: '\\f3ac';\n} /* '' */\n","@use 'variables' as *;\n@use 'mixins' as *;\n\nbody {\n  --breakpoint: 'xsmall';\n  font-family: $font-source;\n  font-size: $browser-context;\n  margin: 0;\n  color: $black;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n  @include breakpoint(small) {\n    --breakpoint: 'small';\n  }\n\n  @include breakpoint(medium) {\n    --breakpoint: 'medium';\n  }\n\n  @include breakpoint(large) {\n    --breakpoint: 'large';\n  }\n}\n\np {\n  margin: 0 0 1.5rem;\n}\n\nsup {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n}\n\n/*=============================\n=            Links            =\n=============================*/\n\n%dashed-underline {\n  border-bottom: 1px dashed $black;\n}\n\n%external-links {\n  a[href*=\"//\"]:not([href*=\"tradeguys.csis.org\"]) {\n    position: relative;\n    margin-left: 1.5rem;\n    &::before {\n      position: absolute;\n      left: -1.5rem;\n      content: '\\f39c';\n      font-family: 'tradeguys';\n    }\n  }\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  transition: all 0.3s ease-in-out;\n\n  &:visited {\n  }\n  &:hover,\n  &:focus,\n  &:active {\n  }\n  &:focus {\n    outline: thin dotted;\n  }\n  &:hover,\n  &:active {\n    outline: 0;\n  }\n\n  p &,\n  .post-content ul &,\n  .post-content ol & {\n    @extend %dashed-underline;\n    @include wipe-link-hover-background($yellow);\n  }\n}\n/*=============================\n=            Lists            =\n=============================*/\nul {\n  margin: 0;\n  padding-inline-start: 24px;\n  list-style: none;\n\n  li {\n    font-family: $font_inconsolata;\n    &:before {\n      font-family: $font_source;\n      font-weight: bold;\n      line-height: 1;\n      position: relative;\n      top: -0.1rem;\n      display: inline-block;\n      width: 1rem;\n      margin-left: -1.5rem;\n      content: '\\2588';\n    }\n\n    &.china::before {\n      color: $red;\n    }\n    &.eu::before {\n      color: $blue;\n    }\n    &.mexico::before {\n      color: $orange;\n    }\n    &.canada::before {\n      color: $green;\n    }\n  }\n}\n","/**\n * Mixins\n */\n@use 'sass:math';\n@use 'variables' as *;\n// Rem output with px fallback\n\n@function calculateRem($size) {\n  $remSize: math.div($size, $browser-context);\n  @return #{$remSize}rem;\n}\n\n@mixin fontSize($size) {\n  font-size: $size; //Fallback in px\n  font-size: calculateRem($size);\n}\n\n$breakpoint-xlarge: 90em;\n$breakpoint-large: 64em;\n$breakpoint-medium: 48em;\n$breakpoint-small: 35em;\n$breakpoint-xsmall: 25em;\n\n@mixin breakpoint($break) {\n  @if $break == xlarge {\n    @media screen and (min-width: $breakpoint-xlarge) {\n      @content;\n    }\n  } @else if $break == large {\n    @media screen and (min-width: $breakpoint-large) {\n      @content;\n    }\n  } @else if $break == medium {\n    @media screen and (min-width: $breakpoint-medium) {\n      @content;\n    }\n  } @else if $break == small {\n    @media screen and (min-width: $breakpoint-small) {\n      @content;\n    }\n  } @else if $break == xsmall {\n    @media screen and (max-width: $breakpoint-xsmall) {\n      @content;\n    }\n  } @else {\n    @media screen and (min-width: $break) {\n      @content;\n    }\n  }\n}\n\n@mixin wipe-link-background($background-color: $yellow) {\n  background-image: linear-gradient(\n    to top,\n    $background-color 75%,\n    transparent 0%\n  );\n  background-position: unset;\n  background-repeat: repeat-x;\n  background-size: 100% 100%;\n}\n\n@mixin wipe-link-hover-background($background-color: $yellow, $width: 100%) {\n  width: $width;\n  background-image: linear-gradient(\n    transparent calc(20%),\n    $background-color 20%\n  );\n  background-repeat: no-repeat;\n  background-size: 0% 100%;\n  transition: all 0.2s ease-in-out;\n\n  &:hover {\n    background-size: 100% 100%;\n  }\n}\n","/*================================\n=            Tooltips            =\n================================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\n.tooltip,\n.tooltip-info {\n  display: block;\n  @include fontSize(14px);\n  line-height: 1.4;\n  position: absolute;\n  z-index: 20;\n  visibility: hidden;\n  width: fit-content;\n  max-width: 175px;\n  height: auto;\n  margin: 0 15px;\n  padding: 8px 8px 10px;\n  pointer-events: none;\n  opacity: 0;\n  border: 1px solid $disabled-gray;\n  border-radius: 3px;\n  background-color: $white;\n\n  p {\n    margin: 0;\n  }\n\n  .tooltip-heading {\n    text-transform: uppercase;\n    line-height: 1.4;\n    font-weight: bold;\n    margin-bottom: 0.5rem;\n    text-align: center;\n    border-bottom: 1px solid $black;\n\n    @include breakpoint('small') {\n      line-height: 1.4;\n    }\n\n    .location {\n      display: block;\n      @include fontSize(10px);\n      font-style: italic;\n    }\n  }\n\n  .tooltip-label {\n    text-transform: capitalize;\n\n    &.indented {\n      padding-left: 0.75rem;\n    }\n  }\n\n  .tooltip-list {\n    li {\n      @include fontSize(14px);\n\n      &:before {\n        @include fontSize(9px);\n      }\n    }\n\n    .active-category {\n      font-weight: bold;\n    }\n  }\n\n  .tooltip-close {\n    font-weight: bold;\n    position: absolute;\n    z-index: 25;\n    top: 0.25rem;\n    right: 0.5rem;\n    display: block;\n    width: 25%;\n    text-align: right;\n    pointer-events: all;\n\n    @include breakpoint('small') {\n      display: none;\n    }\n  }\n}\n\n.tooltip-info {\n  max-width: 100px;\n\n  @include breakpoint('small') {\n    max-width: 300px;\n  }\n}\n","/*=====================================\n=            Form Elements            =\n=====================================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\n.legend-label {\n  font-family: $font_inconsolata;\n  &:before {\n    display: inline-block;\n    width: 1rem;\n    height: 1rem;\n    margin-right: 0.5rem;\n    content: '';\n    transition: 0.2s;\n    vertical-align: -0.2em;\n    border: 1px solid$black;\n  }\n\n  &.all:before {\n    background-color: $yellow;\n  }\n  &.china:before {\n    background-color: $red;\n  }\n  &.canada:before {\n    background-color: $green;\n  }\n  &.eu:before {\n    background-color: $blue;\n  }\n  &.mexico:before {\n    background-color: $orange;\n  }\n}\n\ninput {\n  @include fontSize(18px);\n  line-height: 1.78;\n  position: absolute;\n  top: 1px;\n  left: 2px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n\n  &:not(:checked) {\n    cursor: pointer;\n  }\n\n  &:checked + label::after {\n    font-family: 'tradeguys';\n    font-weight: bold;\n    position: absolute;\n    top: 1px;\n    left: 1px;\n    content: '\\e878';\n    cursor: pointer;\n    color: $black;\n  }\n}\n","/*============================\n=            Chart           =\n============================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\nsection {\n}\n.chart {\n  @media screen and (max-width: 35em) {\n    width: 105%;\n\n    foreignObject div {\n      transform: translateX(-4px);\n    }\n  }\n\n  @include breakpoint('small') {\n    max-width: $size-max-width;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  svg {\n    .stateModal {\n      font-family: $font_inconsolata;\n      line-height: 1.6;\n      @include fontSize(12.5px);\n\n      @include breakpoint('small') {\n        @include fontSize(18px);\n      }\n\n      .modal-heading {\n        font-family: $font_source;\n        font-weight: bold;\n        letter-spacing: 1.4px;\n        @include fontSize(16px);\n\n        @include breakpoint('small') {\n          @include fontSize(24px);\n        }\n      }\n\n      ul {\n        li {\n          &:before {\n            @include fontSize(12px);\n          }\n        }\n      }\n    }\n\n    .group {\n      cursor: zoom-in;\n\n      .label {\n        @include fontSize(12px);\n        fill: $black;\n        stroke: $white;\n        paint-order: stroke;\n        stroke-width: 3px;\n        text-transform: uppercase;\n        font-weight: 800;\n        transition: all 0.2s ease-in-out;\n\n        @include breakpoint('small') {\n          @include fontSize(18px);\n        }\n      }\n\n      .state {\n        transition: all 0.2s ease-in-out;\n        @media screen and (max-width: 35em) {\n          stroke-width: 2 !important;\n        }\n      }\n\n      .percent {\n        @media screen and (max-width: 35em) {\n          stroke-width: 0 !important;\n        }\n      }\n\n      &:hover .state {\n        stroke: #eae134;\n      }\n    }\n  }\n}\n\n/*============================\n=          Legend            =\n============================*/\n\n.legend {\n  margin: 24px 12px 12px;\n\n  @include breakpoint('small') {\n    margin: 24px 0 12px;\n  }\n\n  .legend-title {\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    font-family: $font_inconsolata;\n    font-weight: 400;\n    text-transform: uppercase;\n    @include fontSize(14px);\n    letter-spacing: 1.2px;\n  }\n\n  > .direction {\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    font-style: italic;\n    @include fontSize(12px);\n    margin-top: 6px;\n  }\n\n  .container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    -ms-flex-align: center;\n    align-items: center;\n\n    .legend-bar {\n      font-family: $font_inconsolata;\n      line-height: 1.2;\n      position: relative;\n      display: none;\n      padding: 6px;\n      background-color: $white;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n      -ms-flex-align: center;\n      align-items: center;\n\n      @include breakpoint('small') {\n        display: -ms-flexbox;\n        display: flex;\n        margin-left: 36px;\n        width: 100%;\n        -ms-flex: 0 0 224px;\n        flex: 0 0 224px;\n\n        &:before {\n          content: '';\n          display: block;\n          position: absolute;\n          top: 0;\n          left: -24px;\n          width: 1px;\n          height: 120%;\n          background-color: $black;\n        }\n      }\n\n      > div {\n        padding-left: 12px;\n        @include fontSize(16px);\n\n        .min-max {\n          @include fontSize(14px);\n        }\n      }\n    }\n\n    .countries {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n\n      @include breakpoint('small') {\n        -ms-flex: 0 0 calc(100% - 300px);\n        flex: 0 0 calc(100% - 300px);\n      }\n\n      .legend-item {\n        @include fontSize(16px);\n        position: relative;\n        display: -ms-flexbox;\n        display: flex;\n        box-sizing: border-box;\n        margin: 0 6px 6px 0;\n        -ms-flex: 1 0 47%;\n        flex: 1 0 47%;\n\n        @include breakpoint('small') {\n          -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n          margin: 0 6px 0 0;\n        }\n      }\n    }\n  }\n}\n","/*===================================\n=            Page Layout            =\n===================================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\nbody {\n  > *:not(.tooltip):not(.chart) {\n    max-width: $size-max-width;\n    margin-left: 12px;\n    margin-right: 12px;\n\n    @include breakpoint('small') {\n      margin-left: auto;\n      margin-right: auto;\n    }\n  }\n\n  .interactive__header {\n    margin: 1rem auto;\n    padding-bottom: 1.25rem;\n    border-bottom: 0;\n\n    .interactive__title {\n      font-family: $font_source;\n      @include fontSize(20px);\n      line-height: 1.36;\n      letter-spacing: 1.4px;\n      color: $black;\n\n      font-weight: bold;\n      text-align: center;\n    }\n\n    p {\n      line-height: 1.78;\n      @include fontSize(16px);\n    }\n  }\n\n  .interactive__filters {\n    margin: 0 auto 1rem;\n\n    .search__suggestions {\n      margin-top: 3px;\n      margin-bottom: 0;\n    }\n  }\n\n  .interactive__graphic {\n    position: relative;\n    max-width: 1250px;\n    margin: 0 auto;\n  }\n\n  .interactive__source {\n    margin-left: auto;\n    margin-right: auto;\n    padding-bottom: 2rem;\n    border-top: 1px solid $black;\n\n    p {\n      margin: 0.5rem 0 0;\n      @include fontSize(14px);\n      font-family: $font-source;\n      color: $gray;\n    }\n  }\n\n  .instructions {\n    font-style: italic;\n    font-size: 0.9rem;\n    margin-top: 6px;\n    border-top: 1px solid $disabled-gray;\n    padding: 0.5rem 0 0;\n    color: $gray;\n    text-align: center;\n\n    span {\n      display: none;\n      @include breakpoint('small') {\n        display: inline-block;\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 966:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./src/scss/main.scss
var main = __webpack_require__(530);
;// ./node_modules/d3-array/src/ascending.js
/* harmony default export */ function src_ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

;// ./node_modules/d3-array/src/bisector.js


/* harmony default export */ function bisector(compare) {
  if (compare.length === 1) compare = ascendingComparator(compare);
  return {
    left: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (lo == null) lo = 0;
      if (hi == null) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >>> 1;
        if (compare(a[mid], x) > 0) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
}

function ascendingComparator(f) {
  return function(d, x) {
    return src_ascending(f(d), x);
  };
}

;// ./node_modules/d3-array/src/bisect.js



var ascendingBisect = bisector(src_ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
/* harmony default export */ const src_bisect = ((/* unused pure expression or super */ null && (bisectRight)));

;// ./node_modules/d3-array/src/extent.js
/* harmony default export */ function src_extent(values, valueof) {
  var n = values.length,
      i = -1,
      value,
      min,
      max;

  if (valueof == null) {
    while (++i < n) { // Find the first comparable value.
      if ((value = values[i]) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = values[i]) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  else {
    while (++i < n) { // Find the first comparable value.
      if ((value = valueof(values[i], i, values)) != null && value >= value) {
        min = max = value;
        while (++i < n) { // Compare the remaining values.
          if ((value = valueof(values[i], i, values)) != null) {
            if (min > value) min = value;
            if (max < value) max = value;
          }
        }
      }
    }
  }

  return [min, max];
}

;// ./node_modules/d3-array/src/array.js
var array = Array.prototype;

var array_slice = array.slice;
var array_map = array.map;

;// ./node_modules/d3-array/src/ticks.js
var e10 = Math.sqrt(50),
    e5 = Math.sqrt(10),
    e2 = Math.sqrt(2);

/* harmony default export */ function ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

  if (step > 0) {
    start = Math.ceil(start / step);
    stop = Math.floor(stop / step);
    ticks = new Array(n = Math.ceil(stop - start + 1));
    while (++i < n) ticks[i] = (start + i) * step;
  } else {
    start = Math.floor(start * step);
    stop = Math.ceil(stop * step);
    ticks = new Array(n = Math.ceil(start - stop + 1));
    while (++i < n) ticks[i] = (start - i) / step;
  }

  if (reverse) ticks.reverse();

  return ticks;
}

function tickIncrement(start, stop, count) {
  var step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log(step) / Math.LN10),
      error = step / Math.pow(10, power);
  return power >= 0
      ? (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1) * Math.pow(10, power)
      : -Math.pow(10, -power) / (error >= e10 ? 10 : error >= e5 ? 5 : error >= e2 ? 2 : 1);
}

function ticks_tickStep(start, stop, count) {
  var step0 = Math.abs(stop - start) / Math.max(0, count),
      step1 = Math.pow(10, Math.floor(Math.log(step0) / Math.LN10)),
      error = step0 / step1;
  if (error >= e10) step1 *= 10;
  else if (error >= e5) step1 *= 5;
  else if (error >= e2) step1 *= 2;
  return stop < start ? -step1 : step1;
}

;// ./node_modules/d3-array/src/histogram.js









/* harmony default export */ function histogram() {
  var value = identity,
      domain = extent,
      threshold = sturges;

  function histogram(data) {
    var i,
        n = data.length,
        x,
        values = new Array(n);

    for (i = 0; i < n; ++i) {
      values[i] = value(data[i], i, data);
    }

    var xz = domain(values),
        x0 = xz[0],
        x1 = xz[1],
        tz = threshold(values, x0, x1);

    // Convert number of thresholds into uniform thresholds.
    if (!Array.isArray(tz)) {
      tz = tickStep(x0, x1, tz);
      tz = range(Math.ceil(x0 / tz) * tz, x1, tz); // exclusive
    }

    // Remove any thresholds outside the domain.
    var m = tz.length;
    while (tz[0] <= x0) tz.shift(), --m;
    while (tz[m - 1] > x1) tz.pop(), --m;

    var bins = new Array(m + 1),
        bin;

    // Initialize bins.
    for (i = 0; i <= m; ++i) {
      bin = bins[i] = [];
      bin.x0 = i > 0 ? tz[i - 1] : x0;
      bin.x1 = i < m ? tz[i] : x1;
    }

    // Assign data to bins by value, ignoring any outside the domain.
    for (i = 0; i < n; ++i) {
      x = values[i];
      if (x0 <= x && x <= x1) {
        bins[bisect(tz, x, 0, m)].push(data[i]);
      }
    }

    return bins;
  }

  histogram.value = function(_) {
    return arguments.length ? (value = typeof _ === "function" ? _ : constant(_), histogram) : value;
  };

  histogram.domain = function(_) {
    return arguments.length ? (domain = typeof _ === "function" ? _ : constant([_[0], _[1]]), histogram) : domain;
  };

  histogram.thresholds = function(_) {
    return arguments.length ? (threshold = typeof _ === "function" ? _ : Array.isArray(_) ? constant(slice.call(_)) : constant(_), histogram) : threshold;
  };

  return histogram;
}

;// ./node_modules/d3-array/src/threshold/freedmanDiaconis.js





/* harmony default export */ function freedmanDiaconis(values, min, max) {
  values = map.call(values, number).sort(ascending);
  return Math.ceil((max - min) / (2 * (quantile(values, 0.75) - quantile(values, 0.25)) * Math.pow(values.length, -1 / 3)));
}

;// ./node_modules/d3-array/src/index.js




























;// ./node_modules/d3-format/src/formatDecimal.js
/* harmony default export */ function formatDecimal(x) {
  return Math.abs(x = Math.round(x)) >= 1e21
      ? x.toLocaleString("en").replace(/,/g, "")
      : x.toString(10);
}

// Computes the decimal coefficient and exponent of the specified number x with
// significant digits p, where x is positive and p is in [1, 21] or undefined.
// For example, formatDecimalParts(1.23) returns ["123", 0].
function formatDecimalParts(x, p) {
  if ((i = (x = p ? x.toExponential(p - 1) : x.toExponential()).indexOf("e")) < 0) return null; // NaN, ±Infinity
  var i, coefficient = x.slice(0, i);

  // The string returned by toExponential either has the form \d\.\d+e[-+]\d+
  // (e.g., 1.2e+3) or the form \de[-+]\d+ (e.g., 1e+3).
  return [
    coefficient.length > 1 ? coefficient[0] + coefficient.slice(2) : coefficient,
    +x.slice(i + 1)
  ];
}

;// ./node_modules/d3-format/src/exponent.js


/* harmony default export */ function exponent(x) {
  return x = formatDecimalParts(Math.abs(x)), x ? x[1] : NaN;
}

;// ./node_modules/d3-format/src/formatGroup.js
/* harmony default export */ function formatGroup(grouping, thousands) {
  return function(value, width) {
    var i = value.length,
        t = [],
        j = 0,
        g = grouping[0],
        length = 0;

    while (i > 0 && g > 0) {
      if (length + g + 1 > width) g = Math.max(1, width - length);
      t.push(value.substring(i -= g, i + g));
      if ((length += g + 1) > width) break;
      g = grouping[j = (j + 1) % grouping.length];
    }

    return t.reverse().join(thousands);
  };
}

;// ./node_modules/d3-format/src/formatNumerals.js
/* harmony default export */ function formatNumerals(numerals) {
  return function(value) {
    return value.replace(/[0-9]/g, function(i) {
      return numerals[+i];
    });
  };
}

;// ./node_modules/d3-format/src/formatSpecifier.js
// [[fill]align][sign][symbol][0][width][,][.precision][~][type]
var re = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;

function formatSpecifier(specifier) {
  if (!(match = re.exec(specifier))) throw new Error("invalid format: " + specifier);
  var match;
  return new FormatSpecifier({
    fill: match[1],
    align: match[2],
    sign: match[3],
    symbol: match[4],
    zero: match[5],
    width: match[6],
    comma: match[7],
    precision: match[8] && match[8].slice(1),
    trim: match[9],
    type: match[10]
  });
}

formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

function FormatSpecifier(specifier) {
  this.fill = specifier.fill === undefined ? " " : specifier.fill + "";
  this.align = specifier.align === undefined ? ">" : specifier.align + "";
  this.sign = specifier.sign === undefined ? "-" : specifier.sign + "";
  this.symbol = specifier.symbol === undefined ? "" : specifier.symbol + "";
  this.zero = !!specifier.zero;
  this.width = specifier.width === undefined ? undefined : +specifier.width;
  this.comma = !!specifier.comma;
  this.precision = specifier.precision === undefined ? undefined : +specifier.precision;
  this.trim = !!specifier.trim;
  this.type = specifier.type === undefined ? "" : specifier.type + "";
}

FormatSpecifier.prototype.toString = function() {
  return this.fill
      + this.align
      + this.sign
      + this.symbol
      + (this.zero ? "0" : "")
      + (this.width === undefined ? "" : Math.max(1, this.width | 0))
      + (this.comma ? "," : "")
      + (this.precision === undefined ? "" : "." + Math.max(0, this.precision | 0))
      + (this.trim ? "~" : "")
      + this.type;
};

;// ./node_modules/d3-format/src/formatTrim.js
// Trims insignificant zeros, e.g., replaces 1.2000k with 1.2k.
/* harmony default export */ function formatTrim(s) {
  out: for (var n = s.length, i = 1, i0 = -1, i1; i < n; ++i) {
    switch (s[i]) {
      case ".": i0 = i1 = i; break;
      case "0": if (i0 === 0) i0 = i; i1 = i; break;
      default: if (!+s[i]) break out; if (i0 > 0) i0 = 0; break;
    }
  }
  return i0 > 0 ? s.slice(0, i0) + s.slice(i1 + 1) : s;
}

;// ./node_modules/d3-format/src/formatPrefixAuto.js


var prefixExponent;

/* harmony default export */ function formatPrefixAuto(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1],
      i = exponent - (prefixExponent = Math.max(-8, Math.min(8, Math.floor(exponent / 3))) * 3) + 1,
      n = coefficient.length;
  return i === n ? coefficient
      : i > n ? coefficient + new Array(i - n + 1).join("0")
      : i > 0 ? coefficient.slice(0, i) + "." + coefficient.slice(i)
      : "0." + new Array(1 - i).join("0") + formatDecimalParts(x, Math.max(0, p + i - 1))[0]; // less than 1y!
}

;// ./node_modules/d3-format/src/formatRounded.js


/* harmony default export */ function formatRounded(x, p) {
  var d = formatDecimalParts(x, p);
  if (!d) return x + "";
  var coefficient = d[0],
      exponent = d[1];
  return exponent < 0 ? "0." + new Array(-exponent).join("0") + coefficient
      : coefficient.length > exponent + 1 ? coefficient.slice(0, exponent + 1) + "." + coefficient.slice(exponent + 1)
      : coefficient + new Array(exponent - coefficient.length + 2).join("0");
}

;// ./node_modules/d3-format/src/formatTypes.js




/* harmony default export */ const formatTypes = ({
  "%": function(x, p) { return (x * 100).toFixed(p); },
  "b": function(x) { return Math.round(x).toString(2); },
  "c": function(x) { return x + ""; },
  "d": formatDecimal,
  "e": function(x, p) { return x.toExponential(p); },
  "f": function(x, p) { return x.toFixed(p); },
  "g": function(x, p) { return x.toPrecision(p); },
  "o": function(x) { return Math.round(x).toString(8); },
  "p": function(x, p) { return formatRounded(x * 100, p); },
  "r": formatRounded,
  "s": formatPrefixAuto,
  "X": function(x) { return Math.round(x).toString(16).toUpperCase(); },
  "x": function(x) { return Math.round(x).toString(16); }
});

;// ./node_modules/d3-format/src/identity.js
/* harmony default export */ function src_identity(x) {
  return x;
}

;// ./node_modules/d3-format/src/locale.js









var locale_map = Array.prototype.map,
    prefixes = ["y","z","a","f","p","n","µ","m","","k","M","G","T","P","E","Z","Y"];

/* harmony default export */ function locale(locale) {
  var group = locale.grouping === undefined || locale.thousands === undefined ? src_identity : formatGroup(locale_map.call(locale.grouping, Number), locale.thousands + ""),
      currencyPrefix = locale.currency === undefined ? "" : locale.currency[0] + "",
      currencySuffix = locale.currency === undefined ? "" : locale.currency[1] + "",
      decimal = locale.decimal === undefined ? "." : locale.decimal + "",
      numerals = locale.numerals === undefined ? src_identity : formatNumerals(locale_map.call(locale.numerals, String)),
      percent = locale.percent === undefined ? "%" : locale.percent + "",
      minus = locale.minus === undefined ? "-" : locale.minus + "",
      nan = locale.nan === undefined ? "NaN" : locale.nan + "";

  function newFormat(specifier) {
    specifier = formatSpecifier(specifier);

    var fill = specifier.fill,
        align = specifier.align,
        sign = specifier.sign,
        symbol = specifier.symbol,
        zero = specifier.zero,
        width = specifier.width,
        comma = specifier.comma,
        precision = specifier.precision,
        trim = specifier.trim,
        type = specifier.type;

    // The "n" type is an alias for ",g".
    if (type === "n") comma = true, type = "g";

    // The "" type, and any invalid type, is an alias for ".12~g".
    else if (!formatTypes[type]) precision === undefined && (precision = 12), trim = true, type = "g";

    // If zero fill is specified, padding goes after sign and before digits.
    if (zero || (fill === "0" && align === "=")) zero = true, fill = "0", align = "=";

    // Compute the prefix and suffix.
    // For SI-prefix, the suffix is lazily computed.
    var prefix = symbol === "$" ? currencyPrefix : symbol === "#" && /[boxX]/.test(type) ? "0" + type.toLowerCase() : "",
        suffix = symbol === "$" ? currencySuffix : /[%p]/.test(type) ? percent : "";

    // What format function should we use?
    // Is this an integer type?
    // Can this type generate exponential notation?
    var formatType = formatTypes[type],
        maybeSuffix = /[defgprs%]/.test(type);

    // Set the default precision if not specified,
    // or clamp the specified precision to the supported range.
    // For significant precision, it must be in [1, 21].
    // For fixed precision, it must be in [0, 20].
    precision = precision === undefined ? 6
        : /[gprs]/.test(type) ? Math.max(1, Math.min(21, precision))
        : Math.max(0, Math.min(20, precision));

    function format(value) {
      var valuePrefix = prefix,
          valueSuffix = suffix,
          i, n, c;

      if (type === "c") {
        valueSuffix = formatType(value) + valueSuffix;
        value = "";
      } else {
        value = +value;

        // Determine the sign. -0 is not less than 0, but 1 / -0 is!
        var valueNegative = value < 0 || 1 / value < 0;

        // Perform the initial formatting.
        value = isNaN(value) ? nan : formatType(Math.abs(value), precision);

        // Trim insignificant zeros.
        if (trim) value = formatTrim(value);

        // If a negative value rounds to zero after formatting, and no explicit positive sign is requested, hide the sign.
        if (valueNegative && +value === 0 && sign !== "+") valueNegative = false;

        // Compute the prefix and suffix.
        valuePrefix = (valueNegative ? (sign === "(" ? sign : minus) : sign === "-" || sign === "(" ? "" : sign) + valuePrefix;
        valueSuffix = (type === "s" ? prefixes[8 + prefixExponent / 3] : "") + valueSuffix + (valueNegative && sign === "(" ? ")" : "");

        // Break the formatted value into the integer “value” part that can be
        // grouped, and fractional or exponential “suffix” part that is not.
        if (maybeSuffix) {
          i = -1, n = value.length;
          while (++i < n) {
            if (c = value.charCodeAt(i), 48 > c || c > 57) {
              valueSuffix = (c === 46 ? decimal + value.slice(i + 1) : value.slice(i)) + valueSuffix;
              value = value.slice(0, i);
              break;
            }
          }
        }
      }

      // If the fill character is not "0", grouping is applied before padding.
      if (comma && !zero) value = group(value, Infinity);

      // Compute the padding.
      var length = valuePrefix.length + value.length + valueSuffix.length,
          padding = length < width ? new Array(width - length + 1).join(fill) : "";

      // If the fill character is "0", grouping is applied after padding.
      if (comma && zero) value = group(padding + value, padding.length ? width - valueSuffix.length : Infinity), padding = "";

      // Reconstruct the final output based on the desired alignment.
      switch (align) {
        case "<": value = valuePrefix + value + valueSuffix + padding; break;
        case "=": value = valuePrefix + padding + value + valueSuffix; break;
        case "^": value = padding.slice(0, length = padding.length >> 1) + valuePrefix + value + valueSuffix + padding.slice(length); break;
        default: value = padding + valuePrefix + value + valueSuffix; break;
      }

      return numerals(value);
    }

    format.toString = function() {
      return specifier + "";
    };

    return format;
  }

  function formatPrefix(specifier, value) {
    var f = newFormat((specifier = formatSpecifier(specifier), specifier.type = "f", specifier)),
        e = Math.max(-8, Math.min(8, Math.floor(exponent(value) / 3))) * 3,
        k = Math.pow(10, -e),
        prefix = prefixes[8 + e / 3];
    return function(value) {
      return f(k * value) + prefix;
    };
  }

  return {
    format: newFormat,
    formatPrefix: formatPrefix
  };
}

;// ./node_modules/d3-format/src/defaultLocale.js


var defaultLocale_locale;
var format;
var formatPrefix;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});

function defaultLocale(definition) {
  defaultLocale_locale = locale(definition);
  format = defaultLocale_locale.format;
  formatPrefix = defaultLocale_locale.formatPrefix;
  return defaultLocale_locale;
}

;// ./node_modules/d3-dsv/src/dsv.js
var EOL = {},
    EOF = {},
    QUOTE = 34,
    NEWLINE = 10,
    RETURN = 13;

function objectConverter(columns) {
  return new Function("d", "return {" + columns.map(function(name, i) {
    return JSON.stringify(name) + ": d[" + i + "] || \"\"";
  }).join(",") + "}");
}

function customConverter(columns, f) {
  var object = objectConverter(columns);
  return function(row, i) {
    return f(object(row), i, columns);
  };
}

// Compute unique columns in order of discovery.
function inferColumns(rows) {
  var columnSet = Object.create(null),
      columns = [];

  rows.forEach(function(row) {
    for (var column in row) {
      if (!(column in columnSet)) {
        columns.push(columnSet[column] = column);
      }
    }
  });

  return columns;
}

function pad(value, width) {
  var s = value + "", length = s.length;
  return length < width ? new Array(width - length + 1).join(0) + s : s;
}

function formatYear(year) {
  return year < 0 ? "-" + pad(-year, 6)
    : year > 9999 ? "+" + pad(year, 6)
    : pad(year, 4);
}

function formatDate(date) {
  var hours = date.getUTCHours(),
      minutes = date.getUTCMinutes(),
      seconds = date.getUTCSeconds(),
      milliseconds = date.getUTCMilliseconds();
  return isNaN(date) ? "Invalid Date"
      : formatYear(date.getUTCFullYear(), 4) + "-" + pad(date.getUTCMonth() + 1, 2) + "-" + pad(date.getUTCDate(), 2)
      + (milliseconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "." + pad(milliseconds, 3) + "Z"
      : seconds ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + ":" + pad(seconds, 2) + "Z"
      : minutes || hours ? "T" + pad(hours, 2) + ":" + pad(minutes, 2) + "Z"
      : "");
}

/* harmony default export */ function dsv(delimiter) {
  var reFormat = new RegExp("[\"" + delimiter + "\n\r]"),
      DELIMITER = delimiter.charCodeAt(0);

  function parse(text, f) {
    var convert, columns, rows = parseRows(text, function(row, i) {
      if (convert) return convert(row, i - 1);
      columns = row, convert = f ? customConverter(row, f) : objectConverter(row);
    });
    rows.columns = columns || [];
    return rows;
  }

  function parseRows(text, f) {
    var rows = [], // output rows
        N = text.length,
        I = 0, // current character index
        n = 0, // current line number
        t, // current token
        eof = N <= 0, // current token followed by EOF?
        eol = false; // current token followed by EOL?

    // Strip the trailing newline.
    if (text.charCodeAt(N - 1) === NEWLINE) --N;
    if (text.charCodeAt(N - 1) === RETURN) --N;

    function token() {
      if (eof) return EOF;
      if (eol) return eol = false, EOL;

      // Unescape quotes.
      var i, j = I, c;
      if (text.charCodeAt(j) === QUOTE) {
        while (I++ < N && text.charCodeAt(I) !== QUOTE || text.charCodeAt(++I) === QUOTE);
        if ((i = I) >= N) eof = true;
        else if ((c = text.charCodeAt(I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        return text.slice(j + 1, i - 1).replace(/""/g, "\"");
      }

      // Find next delimiter or newline.
      while (I < N) {
        if ((c = text.charCodeAt(i = I++)) === NEWLINE) eol = true;
        else if (c === RETURN) { eol = true; if (text.charCodeAt(I) === NEWLINE) ++I; }
        else if (c !== DELIMITER) continue;
        return text.slice(j, i);
      }

      // Return last token before EOF.
      return eof = true, text.slice(j, N);
    }

    while ((t = token()) !== EOF) {
      var row = [];
      while (t !== EOL && t !== EOF) row.push(t), t = token();
      if (f && (row = f(row, n++)) == null) continue;
      rows.push(row);
    }

    return rows;
  }

  function preformatBody(rows, columns) {
    return rows.map(function(row) {
      return columns.map(function(column) {
        return formatValue(row[column]);
      }).join(delimiter);
    });
  }

  function format(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return [columns.map(formatValue).join(delimiter)].concat(preformatBody(rows, columns)).join("\n");
  }

  function formatBody(rows, columns) {
    if (columns == null) columns = inferColumns(rows);
    return preformatBody(rows, columns).join("\n");
  }

  function formatRows(rows) {
    return rows.map(formatRow).join("\n");
  }

  function formatRow(row) {
    return row.map(formatValue).join(delimiter);
  }

  function formatValue(value) {
    return value == null ? ""
        : value instanceof Date ? formatDate(value)
        : reFormat.test(value += "") ? "\"" + value.replace(/"/g, "\"\"") + "\""
        : value;
  }

  return {
    parse: parse,
    parseRows: parseRows,
    format: format,
    formatBody: formatBody,
    formatRows: formatRows,
    formatRow: formatRow,
    formatValue: formatValue
  };
}

;// ./node_modules/d3-dsv/src/csv.js


var csv = dsv(",");

var csvParse = csv.parse;
var csvParseRows = csv.parseRows;
var csvFormat = csv.format;
var csvFormatBody = csv.formatBody;
var csvFormatRows = csv.formatRows;
var csvFormatRow = csv.formatRow;
var csvFormatValue = csv.formatValue;

;// ./node_modules/d3-dsv/src/tsv.js


var tsv = dsv("\t");

var tsvParse = tsv.parse;
var tsvParseRows = tsv.parseRows;
var tsvFormat = tsv.format;
var tsvFormatBody = tsv.formatBody;
var tsvFormatRows = tsv.formatRows;
var tsvFormatRow = tsv.formatRow;
var tsvFormatValue = tsv.formatValue;

;// ./node_modules/d3-fetch/src/text.js
function responseText(response) {
  if (!response.ok) throw new Error(response.status + " " + response.statusText);
  return response.text();
}

/* harmony default export */ function src_text(input, init) {
  return fetch(input, init).then(responseText);
}

;// ./node_modules/d3-fetch/src/dsv.js



function dsvParse(parse) {
  return function(input, init, row) {
    if (arguments.length === 2 && typeof init === "function") row = init, init = undefined;
    return src_text(input, init).then(function(response) {
      return parse(response, row);
    });
  };
}

function dsv_dsv(delimiter, input, init, row) {
  if (arguments.length === 3 && typeof init === "function") row = init, init = undefined;
  var format = dsvFormat(delimiter);
  return text(input, init).then(function(response) {
    return format.parse(response, row);
  });
}

var dsv_csv = dsvParse(csvParse);
var dsv_tsv = dsvParse(tsvParse);

;// ./node_modules/d3-selection/src/selector.js
function none() {}

/* harmony default export */ function selector(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}

;// ./node_modules/d3-selection/src/selection/select.js



/* harmony default export */ function selection_select(select) {
  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

;// ./node_modules/d3-selection/src/array.js
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array_array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}

;// ./node_modules/d3-selection/src/selectorAll.js
function empty() {
  return [];
}

/* harmony default export */ function selectorAll(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}

;// ./node_modules/d3-selection/src/selection/selectAll.js




function arrayAll(select) {
  return function() {
    return array_array(select.apply(this, arguments));
  };
}

/* harmony default export */ function selectAll(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new Selection(subgroups, parents);
}

;// ./node_modules/d3-selection/src/matcher.js
/* harmony default export */ function matcher(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}


;// ./node_modules/d3-selection/src/selection/selectChild.js


var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

/* harmony default export */ function selectChild(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : childMatcher(match)));
}

;// ./node_modules/d3-selection/src/selection/selectChildren.js


var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

/* harmony default export */ function selectChildren(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : childMatcher(match)));
}

;// ./node_modules/d3-selection/src/selection/filter.js



/* harmony default export */ function selection_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Selection(subgroups, this._parents);
}

;// ./node_modules/d3-selection/src/selection/sparse.js
/* harmony default export */ function sparse(update) {
  return new Array(update.length);
}

;// ./node_modules/d3-selection/src/selection/enter.js



/* harmony default export */ function enter() {
  return new Selection(this._enter || this._groups.map(sparse), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};

;// ./node_modules/d3-selection/src/constant.js
/* harmony default export */ function src_constant(x) {
  return function() {
    return x;
  };
}

;// ./node_modules/d3-selection/src/selection/data.js




function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

/* harmony default export */ function data(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = src_constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}

;// ./node_modules/d3-selection/src/selection/exit.js



/* harmony default export */ function exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

;// ./node_modules/d3-selection/src/selection/join.js
/* harmony default export */ function join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

;// ./node_modules/d3-selection/src/selection/merge.js


/* harmony default export */ function merge(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Selection(merges, this._parents);
}

;// ./node_modules/d3-selection/src/selection/order.js
/* harmony default export */ function order() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}

;// ./node_modules/d3-selection/src/selection/sort.js


/* harmony default export */ function sort(compare) {
  if (!compare) compare = sort_ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new Selection(sortgroups, this._parents).order();
}

function sort_ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

;// ./node_modules/d3-selection/src/selection/call.js
/* harmony default export */ function call() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}

;// ./node_modules/d3-selection/src/selection/nodes.js
/* harmony default export */ function nodes() {
  return Array.from(this);
}

;// ./node_modules/d3-selection/src/selection/node.js
/* harmony default export */ function node() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}

;// ./node_modules/d3-selection/src/selection/size.js
/* harmony default export */ function size() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}

;// ./node_modules/d3-selection/src/selection/empty.js
/* harmony default export */ function selection_empty() {
  return !this.node();
}

;// ./node_modules/d3-selection/src/selection/each.js
/* harmony default export */ function each(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}

;// ./node_modules/d3-selection/src/namespaces.js
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ const namespaces = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});

;// ./node_modules/d3-selection/src/namespace.js


/* harmony default export */ function namespace(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}

;// ./node_modules/d3-selection/src/selection/attr.js


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ function attr(name, value) {
  var fullname = namespace(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}

;// ./node_modules/d3-selection/src/window.js
/* harmony default export */ function src_window(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}

;// ./node_modules/d3-selection/src/selection/style.js


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ function style(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || src_window(node).getComputedStyle(node, null).getPropertyValue(name);
}

;// ./node_modules/d3-selection/src/selection/property.js
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ function property(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}

;// ./node_modules/d3-selection/src/selection/classed.js
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ function classed(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}

;// ./node_modules/d3-selection/src/selection/text.js
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ function selection_text(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}

;// ./node_modules/d3-selection/src/selection/html.js
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ function html(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}

;// ./node_modules/d3-selection/src/selection/raise.js
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ function selection_raise() {
  return this.each(raise);
}

;// ./node_modules/d3-selection/src/selection/lower.js
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ function selection_lower() {
  return this.each(lower);
}

;// ./node_modules/d3-selection/src/creator.js



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === xhtml && document.documentElement.namespaceURI === xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ function creator(name) {
  var fullname = namespace(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}

;// ./node_modules/d3-selection/src/selection/append.js


/* harmony default export */ function append(name) {
  var create = typeof name === "function" ? name : creator(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}

;// ./node_modules/d3-selection/src/selection/insert.js



function constantNull() {
  return null;
}

/* harmony default export */ function insert(name, before) {
  var create = typeof name === "function" ? name : creator(name),
      select = before == null ? constantNull : typeof before === "function" ? before : selector(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}

;// ./node_modules/d3-selection/src/selection/remove.js
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ function selection_remove() {
  return this.each(remove);
}

;// ./node_modules/d3-selection/src/selection/clone.js
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

/* harmony default export */ function clone(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}

;// ./node_modules/d3-selection/src/selection/datum.js
/* harmony default export */ function selection_datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

;// ./node_modules/d3-selection/src/selection/on.js
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ function on(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}

;// ./node_modules/d3-selection/src/selection/dispatch.js


function dispatchEvent(node, type, params) {
  var window = src_window(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ function dispatch(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}

;// ./node_modules/d3-selection/src/selection/iterator.js
/* harmony default export */ function* iterator() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}

;// ./node_modules/d3-selection/src/selection/index.js



































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selectAll,
  selectChild: selectChild,
  selectChildren: selectChildren,
  filter: selection_filter,
  data: data,
  enter: enter,
  exit: exit,
  join: join,
  merge: merge,
  selection: selection_selection,
  order: order,
  sort: sort,
  call: call,
  nodes: nodes,
  node: node,
  size: size,
  empty: selection_empty,
  each: each,
  attr: attr,
  style: style,
  property: property,
  classed: classed,
  text: selection_text,
  html: html,
  raise: selection_raise,
  lower: selection_lower,
  append: append,
  insert: insert,
  remove: selection_remove,
  clone: clone,
  datum: selection_datum,
  on: on,
  dispatch: dispatch,
  [Symbol.iterator]: iterator
};

/* harmony default export */ const src_selection = (selection);

;// ./node_modules/d3-selection/src/select.js


/* harmony default export */ function src_select(selector) {
  return typeof selector === "string"
      ? new Selection([[document.querySelector(selector)]], [document.documentElement])
      : new Selection([[selector]], root);
}

;// ./node_modules/d3-selection/src/selectAll.js



/* harmony default export */ function src_selectAll(selector) {
  return typeof selector === "string"
      ? new Selection([document.querySelectorAll(selector)], [document.documentElement])
      : new Selection([array_array(selector)], root);
}

;// ./node_modules/d3-scale/node_modules/d3-array/src/ticks.js
const ticks_e10 = Math.sqrt(50),
    ticks_e5 = Math.sqrt(10),
    ticks_e2 = Math.sqrt(2);

function tickSpec(start, stop, count) {
  const step = (stop - start) / Math.max(0, count),
      power = Math.floor(Math.log10(step)),
      error = step / Math.pow(10, power),
      factor = error >= ticks_e10 ? 10 : error >= ticks_e5 ? 5 : error >= ticks_e2 ? 2 : 1;
  let i1, i2, inc;
  if (power < 0) {
    inc = Math.pow(10, -power) / factor;
    i1 = Math.round(start * inc);
    i2 = Math.round(stop * inc);
    if (i1 / inc < start) ++i1;
    if (i2 / inc > stop) --i2;
    inc = -inc;
  } else {
    inc = Math.pow(10, power) * factor;
    i1 = Math.round(start / inc);
    i2 = Math.round(stop / inc);
    if (i1 * inc < start) ++i1;
    if (i2 * inc > stop) --i2;
  }
  if (i2 < i1 && 0.5 <= count && count < 2) return tickSpec(start, stop, count * 2);
  return [i1, i2, inc];
}

function ticks_ticks(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  if (!(count > 0)) return [];
  if (start === stop) return [start];
  const reverse = stop < start, [i1, i2, inc] = reverse ? tickSpec(stop, start, count) : tickSpec(start, stop, count);
  if (!(i2 >= i1)) return [];
  const n = i2 - i1 + 1, ticks = new Array(n);
  if (reverse) {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i2 - i) * inc;
  } else {
    if (inc < 0) for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) / -inc;
    else for (let i = 0; i < n; ++i) ticks[i] = (i1 + i) * inc;
  }
  return ticks;
}

function ticks_tickIncrement(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  return tickSpec(start, stop, count)[2];
}

function src_ticks_tickStep(start, stop, count) {
  stop = +stop, start = +start, count = +count;
  const reverse = stop < start, inc = reverse ? ticks_tickIncrement(stop, start, count) : ticks_tickIncrement(start, stop, count);
  return (reverse ? -1 : 1) * (inc < 0 ? 1 / -inc : inc);
}

;// ./node_modules/d3-scale/src/nice.js
function nice(domain, interval) {
  domain = domain.slice();

  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      t;

  if (x1 < x0) {
    t = i0, i0 = i1, i1 = t;
    t = x0, x0 = x1, x1 = t;
  }

  domain[i0] = interval.floor(x0);
  domain[i1] = interval.ceil(x1);
  return domain;
}

;// ./node_modules/d3-scale/node_modules/d3-array/src/ascending.js
function ascending_ascending(a, b) {
  return a == null || b == null ? NaN : a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

;// ./node_modules/d3-scale/node_modules/d3-array/src/descending.js
function descending(a, b) {
  return a == null || b == null ? NaN
    : b < a ? -1
    : b > a ? 1
    : b >= a ? 0
    : NaN;
}

;// ./node_modules/d3-scale/node_modules/d3-array/src/bisector.js



function bisector_bisector(f) {
  let compare1, compare2, delta;

  // If an accessor is specified, promote it to a comparator. In this case we
  // can test whether the search value is (self-) comparable. We can’t do this
  // for a comparator (except for specific, known comparators) because we can’t
  // tell if the comparator is symmetric, and an asymmetric comparator can’t be
  // used to test whether a single value is comparable.
  if (f.length !== 2) {
    compare1 = ascending_ascending;
    compare2 = (d, x) => ascending_ascending(f(d), x);
    delta = (d, x) => f(d) - x;
  } else {
    compare1 = f === ascending_ascending || f === descending ? f : zero;
    compare2 = f;
    delta = f;
  }

  function left(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) < 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function right(a, x, lo = 0, hi = a.length) {
    if (lo < hi) {
      if (compare1(x, x) !== 0) return hi;
      do {
        const mid = (lo + hi) >>> 1;
        if (compare2(a[mid], x) <= 0) lo = mid + 1;
        else hi = mid;
      } while (lo < hi);
    }
    return lo;
  }

  function center(a, x, lo = 0, hi = a.length) {
    const i = left(a, x, lo, hi - 1);
    return i > lo && delta(a[i - 1], x) > -delta(a[i], x) ? i - 1 : i;
  }

  return {left, center, right};
}

function zero() {
  return 0;
}

;// ./node_modules/d3-scale/node_modules/d3-array/src/number.js
function number_number(x) {
  return x === null ? NaN : +x;
}

function* numbers(values, valueof) {
  if (valueof === undefined) {
    for (let value of values) {
      if (value != null && (value = +value) >= value) {
        yield value;
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if ((value = valueof(value, ++index, values)) != null && (value = +value) >= value) {
        yield value;
      }
    }
  }
}

;// ./node_modules/d3-scale/node_modules/d3-array/src/bisect.js




const bisect_ascendingBisect = bisector_bisector(ascending_ascending);
const bisect_bisectRight = bisect_ascendingBisect.right;
const bisect_bisectLeft = bisect_ascendingBisect.left;
const bisectCenter = bisector_bisector(number_number).center;
/* harmony default export */ const d3_array_src_bisect = (bisect_bisectRight);

;// ./node_modules/d3-color/src/define.js
/* harmony default export */ function src_define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

;// ./node_modules/d3-color/src/color.js


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

src_define(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function color_rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

src_define(Rgb, color_rgb, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

src_define(Hsl, hsl, extend(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

;// ./node_modules/d3-interpolate/src/basis.js
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ function src_basis(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

;// ./node_modules/d3-interpolate/src/basisClosed.js


/* harmony default export */ function basisClosed(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}

;// ./node_modules/d3-interpolate/src/constant.js
/* harmony default export */ const d3_interpolate_src_constant = (x => () => x);

;// ./node_modules/d3-interpolate/src/color.js


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : constant(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : d3_interpolate_src_constant(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : d3_interpolate_src_constant(isNaN(a) ? b : a);
}

;// ./node_modules/d3-interpolate/src/rgb.js





/* harmony default export */ const rgb = ((function rgbGamma(y) {
  var color = gamma(y);

  function rgb(start, end) {
    var r = color((start = color_rgb(start)).r, (end = color_rgb(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = nogamma(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = color_rgb(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(src_basis);
var rgbBasisClosed = rgbSpline(basisClosed);

;// ./node_modules/d3-interpolate/src/array.js



/* harmony default export */ function src_array(a, b) {
  return (isNumberArray(b) ? numberArray : genericArray)(a, b);
}

function genericArray(a, b) {
  var nb = b ? b.length : 0,
      na = a ? Math.min(nb, a.length) : 0,
      x = new Array(na),
      c = new Array(nb),
      i;

  for (i = 0; i < na; ++i) x[i] = value(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

;// ./node_modules/d3-interpolate/src/date.js
/* harmony default export */ function date(a, b) {
  var d = new Date;
  return a = +a, b = +b, function(t) {
    return d.setTime(a * (1 - t) + b * t), d;
  };
}

;// ./node_modules/d3-interpolate/src/number.js
/* harmony default export */ function src_number(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}

;// ./node_modules/d3-interpolate/src/object.js


/* harmony default export */ function object(a, b) {
  var i = {},
      c = {},
      k;

  if (a === null || typeof a !== "object") a = {};
  if (b === null || typeof b !== "object") b = {};

  for (k in b) {
    if (k in a) {
      i[k] = value(a[k], b[k]);
    } else {
      c[k] = b[k];
    }
  }

  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

;// ./node_modules/d3-interpolate/src/string.js


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function string_zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ function string(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: src_number(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : string_zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}

;// ./node_modules/d3-interpolate/src/numberArray.js
/* harmony default export */ function src_numberArray(a, b) {
  if (!b) b = [];
  var n = a ? Math.min(b.length, a.length) : 0,
      c = b.slice(),
      i;
  return function(t) {
    for (i = 0; i < n; ++i) c[i] = a[i] * (1 - t) + b[i] * t;
    return c;
  };
}

function numberArray_isNumberArray(x) {
  return ArrayBuffer.isView(x) && !(x instanceof DataView);
}

;// ./node_modules/d3-interpolate/src/value.js










/* harmony default export */ function value(a, b) {
  var t = typeof b, c;
  return b == null || t === "boolean" ? d3_interpolate_src_constant(b)
      : (t === "number" ? src_number
      : t === "string" ? ((c = color(b)) ? (b = c, rgb) : string)
      : b instanceof color ? rgb
      : b instanceof Date ? date
      : numberArray_isNumberArray(b) ? src_numberArray
      : Array.isArray(b) ? genericArray
      : typeof b.valueOf !== "function" && typeof b.toString !== "function" || isNaN(b) ? object
      : src_number)(a, b);
}

;// ./node_modules/d3-interpolate/src/round.js
/* harmony default export */ function round(a, b) {
  return a = +a, b = +b, function(t) {
    return Math.round(a * (1 - t) + b * t);
  };
}

;// ./node_modules/d3-scale/src/constant.js
function constants(x) {
  return function() {
    return x;
  };
}

;// ./node_modules/d3-scale/src/number.js
function src_number_number(x) {
  return +x;
}

;// ./node_modules/d3-scale/src/continuous.js





var unit = [0, 1];

function continuous_identity(x) {
  return x;
}

function normalize(a, b) {
  return (b -= (a = +a))
      ? function(x) { return (x - a) / b; }
      : constants(isNaN(b) ? NaN : 0.5);
}

function clamper(a, b) {
  var t;
  if (a > b) t = a, a = b, b = t;
  return function(x) { return Math.max(a, Math.min(b, x)); };
}

// normalize(a, b)(x) takes a domain value x in [a,b] and returns the corresponding parameter t in [0,1].
// interpolate(a, b)(t) takes a parameter t in [0,1] and returns the corresponding range value x in [a,b].
function bimap(domain, range, interpolate) {
  var d0 = domain[0], d1 = domain[1], r0 = range[0], r1 = range[1];
  if (d1 < d0) d0 = normalize(d1, d0), r0 = interpolate(r1, r0);
  else d0 = normalize(d0, d1), r0 = interpolate(r0, r1);
  return function(x) { return r0(d0(x)); };
}

function polymap(domain, range, interpolate) {
  var j = Math.min(domain.length, range.length) - 1,
      d = new Array(j),
      r = new Array(j),
      i = -1;

  // Reverse descending domains.
  if (domain[j] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++i < j) {
    d[i] = normalize(domain[i], domain[i + 1]);
    r[i] = interpolate(range[i], range[i + 1]);
  }

  return function(x) {
    var i = d3_array_src_bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function transformer() {
  var domain = unit,
      range = unit,
      interpolate = value,
      transform,
      untransform,
      unknown,
      clamp = continuous_identity,
      piecewise,
      output,
      input;

  function rescale() {
    var n = Math.min(domain.length, range.length);
    if (clamp !== continuous_identity) clamp = clamper(domain[0], domain[n - 1]);
    piecewise = n > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return x == null || isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), src_number)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = Array.from(_, src_number_number), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = Array.from(_), interpolate = round, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? true : continuous_identity, rescale()) : clamp !== continuous_identity;
  };

  scale.interpolate = function(_) {
    return arguments.length ? (interpolate = _, rescale()) : interpolate;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t, u) {
    transform = t, untransform = u;
    return rescale();
  };
}

function continuous() {
  return transformer()(continuous_identity, continuous_identity);
}

;// ./node_modules/d3-scale/src/init.js
function initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: {
      if (typeof domain === "function") this.interpolator(domain);
      else this.range(domain);
      break;
    }
    default: {
      this.domain(domain);
      if (typeof interpolator === "function") this.interpolator(interpolator);
      else this.range(interpolator);
      break;
    }
  }
  return this;
}

;// ./node_modules/d3-scale/src/log.js






function transformLog(x) {
  return Math.log(x);
}

function transformExp(x) {
  return Math.exp(x);
}

function transformLogn(x) {
  return -Math.log(-x);
}

function transformExpn(x) {
  return -Math.exp(-x);
}

function pow10(x) {
  return isFinite(x) ? +("1e" + x) : x < 0 ? 0 : x;
}

function powp(base) {
  return base === 10 ? pow10
      : base === Math.E ? Math.exp
      : x => Math.pow(base, x);
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), x => Math.log(x) / base);
}

function reflect(f) {
  return (x, k) => -f(-x, k);
}

function loggish(transform) {
  const scale = transform(transformLog, transformExp);
  const domain = scale.domain;
  let base = 10;
  let logs;
  let pows;

  function rescale() {
    logs = logp(base), pows = powp(base);
    if (domain()[0] < 0) {
      logs = reflect(logs), pows = reflect(pows);
      transform(transformLogn, transformExpn);
    } else {
      transform(transformLog, transformExp);
    }
    return scale;
  }

  scale.base = function(_) {
    return arguments.length ? (base = +_, rescale()) : base;
  };

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.ticks = count => {
    const d = domain();
    let u = d[0];
    let v = d[d.length - 1];
    const r = v < u;

    if (r) ([u, v] = [v, u]);

    let i = logs(u);
    let j = logs(v);
    let k;
    let t;
    const n = count == null ? 10 : +count;
    let z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.floor(i), j = Math.ceil(j);
      if (u > 0) for (; i <= j; ++i) {
        for (k = 1; k < base; ++k) {
          t = i < 0 ? k / pows(-i) : k * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i <= j; ++i) {
        for (k = base - 1; k >= 1; --k) {
          t = i > 0 ? k / pows(-i) : k * pows(i);
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
      if (z.length * 2 < n) z = ticks_ticks(u, v, n);
    } else {
      z = ticks_ticks(i, j, Math.min(j - i, n)).map(pows);
    }
    return r ? z.reverse() : z;
  };

  scale.tickFormat = (count, specifier) => {
    if (count == null) count = 10;
    if (specifier == null) specifier = base === 10 ? "s" : ",";
    if (typeof specifier !== "function") {
      if (!(base % 1) && (specifier = formatSpecifier(specifier)).precision == null) specifier.trim = true;
      specifier = format(specifier);
    }
    if (count === Infinity) return specifier;
    const k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return d => {
      let i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = () => {
    return domain(nice(domain(), {
      floor: x => pows(Math.floor(logs(x))),
      ceil: x => pows(Math.ceil(logs(x)))
    }));
  };

  return scale;
}

function log() {
  const scale = loggish(transformer()).domain([1, 10]);
  scale.copy = () => copy(scale, log()).base(scale.base());
  initRange.apply(scale, arguments);
  return scale;
}

;// ./node_modules/internmap/src/index.js
class InternMap extends Map {
  constructor(entries, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (entries != null) for (const [key, value] of entries) this.set(key, value);
  }
  get(key) {
    return super.get(intern_get(this, key));
  }
  has(key) {
    return super.has(intern_get(this, key));
  }
  set(key, value) {
    return super.set(intern_set(this, key), value);
  }
  delete(key) {
    return super.delete(intern_delete(this, key));
  }
}

class InternSet extends Set {
  constructor(values, key = keyof) {
    super();
    Object.defineProperties(this, {_intern: {value: new Map()}, _key: {value: key}});
    if (values != null) for (const value of values) this.add(value);
  }
  has(value) {
    return super.has(intern_get(this, value));
  }
  add(value) {
    return super.add(intern_set(this, value));
  }
  delete(value) {
    return super.delete(intern_delete(this, value));
  }
}

function intern_get({_intern, _key}, value) {
  const key = _key(value);
  return _intern.has(key) ? _intern.get(key) : value;
}

function intern_set({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) return _intern.get(key);
  _intern.set(key, value);
  return value;
}

function intern_delete({_intern, _key}, value) {
  const key = _key(value);
  if (_intern.has(key)) {
    value = _intern.get(key);
    _intern.delete(key);
  }
  return value;
}

function keyof(value) {
  return value !== null && typeof value === "object" ? value.valueOf() : value;
}

;// ./node_modules/d3-scale/src/ordinal.js



const implicit = Symbol("implicit");

function ordinal() {
  var index = new InternMap(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    let i = index.get(d);
    if (i === undefined) {
      if (unknown !== implicit) return unknown;
      index.set(d, i = domain.push(d) - 1);
    }
    return range[i % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = new InternMap();
    for (const value of _) {
      if (index.has(value)) continue;
      index.set(value, domain.push(value) - 1);
    }
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = Array.from(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal(domain, range).unknown(unknown);
  };

  initRange.apply(scale, arguments);

  return scale;
}

;// ./node_modules/d3-dispatch/src/dispatch.js
var noop = {value: () => {}};

function dispatch_dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function dispatch_parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch_dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = dispatch_parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ const src_dispatch = (dispatch_dispatch);

;// ./node_modules/d3-timer/src/timer.js
var timer_frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++timer_frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --timer_frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  timer_frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    timer_frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (timer_frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    timer_frame = 1, setFrame(wake);
  }
}

;// ./node_modules/d3-timer/src/timeout.js


/* harmony default export */ function src_timeout(callback, delay, time) {
  var t = new Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

;// ./node_modules/d3-transition/src/transition/schedule.js



var emptyOn = src_dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ function schedule(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = schedule_get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function schedule_set(node, id) {
  var schedule = schedule_get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function schedule_get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = timer(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return src_timeout(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    src_timeout(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}

;// ./node_modules/d3-transition/src/interrupt.js


/* harmony default export */ function interrupt(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > STARTING && schedule.state < ENDING;
    schedule.state = ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}

;// ./node_modules/d3-transition/src/selection/interrupt.js


/* harmony default export */ function selection_interrupt(name) {
  return this.each(function() {
    interrupt(this, name);
  });
}

;// ./node_modules/d3-interpolate/src/transform/decompose.js
var degrees = 180 / Math.PI;

var decompose_identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ function decompose(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}

;// ./node_modules/d3-interpolate/src/transform/parse.js


var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? decompose_identity : decompose(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return decompose_identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return decompose_identity;
  value = value.matrix;
  return decompose(value.a, value.b, value.c, value.d, value.e, value.f);
}

;// ./node_modules/d3-interpolate/src/transform/index.js



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: src_number(xa, xb)}, {i: i - 2, x: src_number(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: src_number(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: src_number(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: src_number(xa, xb)}, {i: i - 2, x: src_number(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(parseSvg, ", ", ")", ")");

;// ./node_modules/d3-transition/src/transition/tween.js


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = schedule_set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = schedule_set(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

/* harmony default export */ function tween(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = schedule_get(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = schedule_set(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return schedule_get(node, id).value[name];
  };
}

;// ./node_modules/d3-transition/src/transition/interpolate.js



/* harmony default export */ function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? src_number
      : b instanceof color ? rgb
      : (c = color(b)) ? (b = c, rgb)
      : string)(a, b);
}

;// ./node_modules/d3-transition/src/transition/attr.js





function attr_attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attr_attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attr_attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attr_attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attr_attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attr_attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

/* harmony default export */ function transition_attr(name, value) {
  var fullname = namespace(name), i = fullname === "transform" ? interpolateTransformSvg : interpolate;
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attr_attrFunctionNS : attr_attrFunction)(fullname, i, tweenValue(this, "attr." + name, value))
      : value == null ? (fullname.local ? attr_attrRemoveNS : attr_attrRemove)(fullname)
      : (fullname.local ? attr_attrConstantNS : attr_attrConstant)(fullname, i, value));
}

;// ./node_modules/d3-transition/src/transition/attrTween.js


function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_attrTween(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = namespace(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}

;// ./node_modules/d3-transition/src/transition/delay.js


function delayFunction(id, value) {
  return function() {
    init(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    init(this, id).delay = value;
  };
}

/* harmony default export */ function delay(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : schedule_get(this.node(), id).delay;
}

;// ./node_modules/d3-transition/src/transition/duration.js


function durationFunction(id, value) {
  return function() {
    schedule_set(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    schedule_set(this, id).duration = value;
  };
}

/* harmony default export */ function duration(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : schedule_get(this.node(), id).duration;
}

;// ./node_modules/d3-transition/src/transition/ease.js


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    schedule_set(this, id).ease = value;
  };
}

/* harmony default export */ function ease(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : schedule_get(this.node(), id).ease;
}

;// ./node_modules/d3-transition/src/transition/easeVarying.js


function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    schedule_set(this, id).ease = v;
  };
}

/* harmony default export */ function transition_easeVarying(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}

;// ./node_modules/d3-transition/src/transition/filter.js



/* harmony default export */ function transition_filter(match) {
  if (typeof match !== "function") match = matcher(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new Transition(subgroups, this._parents, this._name, this._id);
}

;// ./node_modules/d3-transition/src/transition/merge.js


/* harmony default export */ function transition_merge(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new Transition(merges, this._parents, this._name, this._id);
}

;// ./node_modules/d3-transition/src/transition/on.js


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? init : schedule_set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function transition_on(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? schedule_get(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}

;// ./node_modules/d3-transition/src/transition/remove.js
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ function transition_remove() {
  return this.on("end.remove", removeFunction(this._id));
}

;// ./node_modules/d3-transition/src/transition/select.js




/* harmony default export */ function transition_select(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selector(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        schedule(subgroup[i], name, id, i, subgroup, schedule_get(node, id));
      }
    }
  }

  return new Transition(subgroups, this._parents, name, id);
}

;// ./node_modules/d3-transition/src/transition/selectAll.js




/* harmony default export */ function transition_selectAll(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = selectorAll(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = schedule_get(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            schedule(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new Transition(subgroups, parents, name, id);
}

;// ./node_modules/d3-transition/src/transition/selection.js


var selection_Selection = src_selection.prototype.constructor;

/* harmony default export */ function transition_selection() {
  return new selection_Selection(this._groups, this._parents);
}

;// ./node_modules/d3-transition/src/transition/style.js






function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        string1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function style_styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function style_styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = styleValue(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function style_styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = styleValue(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), styleValue(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = schedule_set(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = style_styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function transition_style(name, value, priority) {
  var i = (name += "") === "transform" ? interpolateTransformCss : interpolate;
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, style_styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, style_styleFunction(name, i, tweenValue(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, style_styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}

;// ./node_modules/d3-transition/src/transition/styleTween.js
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_styleTween(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}

;// ./node_modules/d3-transition/src/transition/text.js


function text_textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function text_textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ function transition_text(value) {
  return this.tween("text", typeof value === "function"
      ? text_textFunction(tweenValue(this, "text", value))
      : text_textConstant(value == null ? "" : value + ""));
}

;// ./node_modules/d3-transition/src/transition/textTween.js
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function transition_textTween(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}

;// ./node_modules/d3-transition/src/transition/transition.js



/* harmony default export */ function transition() {
  var name = this._name,
      id0 = this._id,
      id1 = newId();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = schedule_get(node, id0);
        schedule(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new Transition(groups, this._parents, name, id1);
}

;// ./node_modules/d3-transition/src/transition/end.js


/* harmony default export */ function end() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = schedule_set(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}

;// ./node_modules/d3-transition/src/transition/index.js






















var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition_transition(name) {
  return src_selection().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = src_selection.prototype;

Transition.prototype = transition_transition.prototype = {
  constructor: Transition,
  select: transition_select,
  selectAll: transition_selectAll,
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: transition_filter,
  merge: transition_merge,
  selection: transition_selection,
  transition: transition,
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: transition_on,
  attr: transition_attr,
  attrTween: transition_attrTween,
  style: transition_style,
  styleTween: transition_styleTween,
  text: transition_text,
  textTween: transition_textTween,
  remove: transition_remove,
  tween: tween,
  delay: delay,
  duration: duration,
  ease: ease,
  easeVarying: transition_easeVarying,
  end: end,
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};

;// ./node_modules/d3-ease/src/cubic.js
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}

;// ./node_modules/d3-transition/src/selection/transition.js





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

/* harmony default export */ function selection_transition(name) {
  var id,
      timing;

  if (name instanceof Transition) {
    id = name._id, name = name._name;
  } else {
    id = newId(), (timing = defaultTiming).time = now(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        schedule(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new Transition(groups, this._parents, name, id);
}

;// ./node_modules/d3-transition/src/selection/index.js




src_selection.prototype.interrupt = selection_interrupt;
src_selection.prototype.transition = selection_transition;

;// ./node_modules/d3-transition/src/index.js





;// ./src/js/tooltip.js
// tooltip.js

 // augments selections with .transition()

var tooltipEl = src_select('.tooltip');
var TOOLTIP_WIDTH = 215;
var PADDING = 10;

// robust coordinates (mouse, pointer, or touch)
function getPoint(evt) {
  var _evt$touches, _evt$changedTouches, _e$pageX, _e$pageY;
  // touch events (mobile)
  var t = (evt === null || evt === void 0 || (_evt$touches = evt.touches) === null || _evt$touches === void 0 ? void 0 : _evt$touches[0]) || (evt === null || evt === void 0 || (_evt$changedTouches = evt.changedTouches) === null || _evt$changedTouches === void 0 ? void 0 : _evt$changedTouches[0]);
  var e = t || evt;
  // fall back to clientX/Y if pageX/Y are missing
  var pageX = (_e$pageX = e === null || e === void 0 ? void 0 : e.pageX) !== null && _e$pageX !== void 0 ? _e$pageX : (e === null || e === void 0 ? void 0 : e.clientX) != null ? e.clientX + window.scrollX : 0;
  var pageY = (_e$pageY = e === null || e === void 0 ? void 0 : e.pageY) !== null && _e$pageY !== void 0 ? _e$pageY : (e === null || e === void 0 ? void 0 : e.clientY) != null ? e.clientY + window.scrollY : 0;
  return {
    x: pageX,
    y: pageY
  };
}
var api = {
  show: function show(content, evt) {
    var _getPoint = getPoint(evt),
      x = _getPoint.x,
      y = _getPoint.y;

    // keep tooltip inside the viewport’s right edge
    var maxLeft = document.body.clientWidth - TOOLTIP_WIDTH - PADDING;
    if (x + PADDING > maxLeft) x = maxLeft;

    // fade in
    tooltipEl.transition().duration(200).style('opacity', 0.9).on('end', function () {
      tooltipEl.classed('isActive', true);
      tooltipEl.on('click', api.hide); // don't use `this.hide` here
    });
    tooltipEl.html(content).style('visibility', 'visible').style('left', x + 'px').style('top', y + 'px');
  },
  hide: function hide() {
    tooltipEl.transition().duration(500).style('opacity', 0).on('end', function () {
      tooltipEl.classed('isActive', false).style('visibility', 'hidden');
    });
  },
  formatContent: function formatContent(component) {
    var content = '<ul class="tooltip-list">';
    component.forEach(function (item) {
      var cssClass = item["class"] || '';
      var label = Object.keys(item)[0];
      content += "<li class=\"".concat(cssClass, "\"><span class=\"tooltip-label\">").concat(label, ":</span> ").concat(item[label], "</li>");
    });
    content += '</ul>';
    return content;
  }
};
/* harmony default export */ const tooltip = (api);
;// ./src/js/chart.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }






var dollarFormatter = format('.3s');
var percentFormatter = format('.2f');
var countries = ['canada', 'china', 'eu', 'mexico'];
var colors = ['#9EB040', '#FE5000', '#0AA4CF', '#F2AF19', '#fff'];
var margin = {
  top: 10,
  right: 5,
  bottom: 10,
  left: 5
};
var container = src_select('.chart');
var rows = 8;
var columns = 11;
var padding = 12;
var modalPadding = 48;
var chart,
  width,
  height,
  cellSize,
  activeState,
  borderColorScale,
  borderWidthScale,
  fillScale,
  keyFilter = countries,
  diff = [];
function draw(data) {
  borderColorScale = log().domain(src_extent(data, function (d) {
    return +d.totaldollars;
  })).range(['#E5E5E5', '#5E5E5E']);
  borderWidthScale = log().domain(src_extent(data, function (d) {
    return +d.totaldollars;
  })).range(['1', '5']);
  fillScale = ordinal().domain([].concat(countries, ['other'])).range(colors);
  function drawPercents() {
    fillScale = ordinal().domain([].concat(countries, ['other'])).range(colors.map(function (color, i) {
      var indices = [];
      keyFilter.forEach(function (country) {
        indices.push([].concat(countries, ['other']).indexOf(country));
      });
      return !(indices.indexOf(i) > -1) ? '#fff' : color;
    }));
    var groups = src_selectAll('.group');
    groups.each(function (g, gi, nodes) {
      var percentObj = {};
      countries.forEach(function (country) {
        percentObj[country] = Array(Math.round(g[country] / 100 * 100)).fill({
          state: g.code,
          country: country
        });
      });
      var percent = [];
      diff = countries.filter(function (i) {
        return keyFilter.indexOf(i) < 0;
      });
      diff.forEach(function (c) {
        percent = percent.concat(percentObj[c]);
      });
      keyFilter.forEach(function (c) {
        percent = percent.concat(percentObj[c]);
      });
      percent = Array(100 - percent.length).fill({
        state: g.code,
        country: 'other'
      }).concat(percent);
      var parentX = src_select(nodes[gi]).attr('x');
      var parentY = src_select(nodes[gi]).attr('y');
      var percents = src_select(nodes[gi]).selectAll(".percent.".concat(g.code)).data(percent, function (d) {
        return d;
      });
      percents.exit().remove();
      percents.enter().append('rect').attr('width', (cellSize - padding / 2) / 10).attr('height', (cellSize - padding / 2) / 10).attr('stroke', '#fff').attr('stroke-width', '0.25px').merge(percents).attr('class', function (d) {
        return "percent ".concat(g.code, " ").concat(d.country);
      }).attr('x', function (d, di) {
        var switchIndex = percent.findIndex(function (p) {
          return !([].concat(_toConsumableArray(diff), ['other']).indexOf(p.country) > -1);
        });
        switchIndex = switchIndex >= 0 ? switchIndex : null;
        var reverse = Math.ceil((di + 1) / 10) * 10 <= Math.ceil(switchIndex / 10) * 10 ? Math.abs(99 - di) : di;
        var x = reverse % 10 * (cellSize - 2) / 10 + parseInt(parentX, 10);
        return x + 2;
      }).attr('y', function (d, di) {
        var y = Math.ceil((di + 1) / 10) * (cellSize - 2) / 10 + parseInt(parentY, 10) - cellSize / 10 + 1;
        return y + 2;
      }).transition().duration(600).attr('fill', function (d) {
        return fillScale(d.country);
      });
      var label = src_select(nodes[gi]).selectAll(".label.".concat(g.code));
      label.remove();
      label = src_select(nodes[gi]).selectAll(".label.".concat(g.code)).data([g]).enter().append('text').attr('class', 'label ' + g.code);
      label.attr('x', function (d) {
        return (d.col - 1) * cellSize + cellSize / 2 + padding * d.col;
      }).attr('y', function (d) {
        return (d.row - 1) * cellSize + (cellSize / 2 - 3) + padding * d.row;
      }).style('text-anchor', 'middle').text(g.code);
    });
    src_selectAll('.group').on('click', interactions.states.click);
  }
  function drawState(x, d) {
    src_select('.stateModal').remove();
    fillScale = ordinal().domain([].concat(countries, ['other'])).range(colors);
    var stateData = data.filter(function (state) {
      return state.code === d.code;
    });
    width = drawGridMap.width();
    height = drawGridMap.width();
    var stateSize = height * 0.3;
    var svg = container.selectAll('.map');
    container.selectAll('.gridmap');
    svg.append('g').attr('class', 'stateModal');
    src_select('.stateModal').append('rect').attr('width', width).attr('height', height).attr('fill', '#000').attr('opacity', '0.3');
    src_select('.stateModal').append('rect').attr('width', width * 0.75).attr('height', height * 0.45).attr('x', width / 7.5).attr('y', width / 7.5).attr('fill', '#fff').attr('stroke', '#000').attr('stroke-width', '1.5px').attr('paint-order', 'stroke');
    src_select('.stateModal').append('foreignObject').attr('cursor', 'pointer').attr('width', width / 10).attr('height', height / 20).attr('x', width - width / 7.5 - padding * 2).attr('y', width / 7.5 + padding).append('xhtml:div').attr('class', 'icon-close-lg').on('click', function () {
      src_select('.stateModal').remove();
    });
    src_select('.stateModal').selectAll('.stateBorder').data(stateData).enter().append('rect').attr('class', 'stateBorder').attr('fill', '#fff').attr('stroke', function (d) {
      return borderColorScale(d.totaldollars);
    }).attr('stroke-width', function (d) {
      return borderWidthScale(d.totaldollars);
    }).attr('x', width / 5).attr('y', width / 5 + padding).attr('width', stateSize - 3).attr('height', stateSize - 2);
    var percentObj = {};
    countries.forEach(function (country) {
      percentObj[country] = Array(Math.round(stateData[0][country] / 100 * 100)).fill({
        state: stateData[0].code,
        country: country
      });
    });
    var percent = [];
    diff = countries.filter(function (i) {
      return keyFilter.indexOf(i) < 0;
    });
    diff.forEach(function (c) {
      percent = percent.concat(percentObj[c]);
    });
    keyFilter.forEach(function (c) {
      percent = percent.concat(percentObj[c]);
    });
    percent = Array(100 - percent.length).fill({
      state: stateData[0].code,
      country: 'other'
    }).concat(percent);
    var parentX = src_select('.stateBorder').attr('x');
    var parentY = src_select('.stateBorder').attr('y');
    var percents = src_select('.stateModal').selectAll(".percentModal.".concat(stateData[0].code)).data(percent, function (d) {
      return d;
    }).enter().append('rect').attr('class', function (d) {
      return "percent ".concat(stateData[0].code, " ").concat(d.country);
    }).attr('fill', function (d) {
      return fillScale(d.country);
    }).attr('x', function (d, di) {
      var switchIndex = percent.findIndex(function (p) {
        return !([].concat(_toConsumableArray(diff), ['other']).indexOf(p.country) > -1);
      });
      switchIndex = switchIndex >= 0 ? switchIndex : null;
      var reverse = Math.ceil((di + 1) / 10) * 10 <= Math.ceil(switchIndex / 10) * 10 ? Math.abs(99 - di) : di;
      var x = reverse % 10 * (stateSize - 2) / 10 + parseInt(parentX, 10);
      return x + 2;
    }).attr('y', function (d, di) {
      var y = Math.ceil((di + 1) / 10) * (stateSize - 2) / 10 + parseInt(parentY, 10) - stateSize / 10 + 1;
      return y + 2;
    }).attr('height', 0).attr('width', (stateSize - modalPadding) / 10).attr('height', (stateSize - modalPadding) / 10);
    var column2 = parseInt(parentX, 10) + stateSize + padding;
    src_select('.stateModal').append('foreignObject').attr('x', column2).attr('y', parseInt(parentY, 10) - padding).attr('width', width - stateSize).attr('height', height).append('xhtml:div').html("<div class=\"modal-heading\">\n                ".concat(d.state, "\n              </div>\n              <div class=\"modal-body\">\n                $").concat(dollarFormatter(d.totaldollars).replace(/G/, 'B'), " Total Trade (2017)\n              </div>\n              <ul class=\"modal-list\">\n              ").concat(countries.map(function (c) {
      return "<li class=\"".concat(c, "\">").concat(c.charAt(0).toUpperCase() + c.slice(1), ": ").concat(stateData[0][c] ? percentFormatter(stateData[0][c]) : 0, "%</li> ");
    }).join(''), "\n\n              </ul> <div class=\"modal-footer\">\n                  ").concat(percentFormatter(d.grandtotal), "% of Total (2017)\n                </div>"));
  }
  function drawGridMap() {
    width = drawGridMap.width();
    height = drawGridMap.width() * 0.8;
    // calculate cellSize based on dimensions of svg
    cellSize = calcCellSize(width - columns * padding - margin.right - margin.left, height - columns * padding - margin.top - margin.bottom, columns, rows);

    // generate grid data with specified number of columns and rows
    var gridData = gridGraph(columns, rows, cellSize);
    var svgNodes = document.querySelectorAll('.map').length;
    var svg = svgNodes ? container.selectAll('.map') : src_select('.chart').append('svg');
    svg.attr('width', width + margin.left + margin.right).attr('height', height + margin.top + margin.bottom).attr('class', 'map').attr('viewBox', '0 0 ' + (width + margin.left + margin.right) + ' ' + (height + margin.top + margin.bottom));
    src_selectAll('input').on('click', interactions.key.click);
    var gridMapNodes = document.querySelectorAll('.gridmap').length;
    var gridMap = gridMapNodes ? container.selectAll('.gridmap') : svg.append('g').attr('class', 'gridmap');
    // .attr(
    //   'transform',
    //   'translate(' + margin.left + ',' + margin.top + ')'
    // )

    var groupNodes = document.querySelectorAll('.group').length;
    var groups = groupNodes ? gridMap.selectAll('.group') : gridMap.selectAll('.group').data(data).enter().append('g').attr('class', function (d) {
      return 'group ' + d.code;
    });
    groups.data(data).attr('x', function (d) {
      return (d.col - 1) * cellSize + padding * d.col;
    }).attr('y', function (d) {
      return (d.row - 1) * cellSize + padding * d.row;
    });
    var breakpoint = getComputedStyle(document.body).getPropertyValue('--breakpoint');
    if (breakpoint !== '"xsmall"') {
      gridMap.selectAll('.group').on('mouseover', interactions.states.mouseover).on('mouseleave', interactions.states.mouseleave);
    }
    groups.each(function (g, gi, nodes) {
      var stateNode = document.querySelector(".state.".concat(g.code));
      var state = stateNode ? src_select(nodes[gi]).selectAll(".state.".concat(g.code)) : src_select(nodes[gi]).selectAll('.state').data([g]).enter().append('rect').attr('class', function (d) {
        return 'state ' + d.code;
      });
      state.attr('fill', '#fff').attr('stroke', function (d) {
        return borderColorScale(d.totaldollars);
      }).attr('stroke-width', function (d) {
        return borderWidthScale(d.totaldollars);
      }).attr('x', function (d) {
        return (d.col - 1) * cellSize + padding * d.col;
      }).attr('y', function (d) {
        return (d.row - 1) * cellSize + padding * d.row;
      }).attr('width', cellSize + 2).attr('height', cellSize + 2);
    });
  }

  // function that generates a nested array for square grid
  function gridGraph(ncol, nrow, cellsize) {
    var gridData = [];
    var xpos = 1; // starting xpos and ypos at 1 so the stroke will show when we make the grid below
    var ypos = 1;

    // calculate width and height of the cell based on width and height of the canvas
    var cellSize = cellsize;

    // iterate for rows
    for (var row = 0; row < nrow; row++) {
      gridData.push([]);

      // iterate for cells/columns inside each row
      for (var col = 0; col < ncol; col++) {
        gridData[row].push({
          x: xpos,
          y: ypos,
          width: cellSize,
          height: cellSize
        });

        // increment x position (moving over by 50)
        xpos += cellSize;
      }

      // reset x position after a row is complete
      xpos = 1;
      // increment y position (moving down by 50)
      ypos += cellSize;
    }
    return gridData;
  }

  // function to calculate grid cell size based on width and height of svg
  function calcCellSize(w, h, ncol, nrow) {
    // leave tiny space in margins
    var gridWidth = w - 2;
    var gridHeight = h - 2;
    var cellSize;

    // calculate size of cells in columns across
    var colWidth = Math.floor(gridWidth / ncol);
    // calculate size of cells in rows down
    var rowWidth = Math.floor(gridHeight / nrow);

    // take the smaller of the calculated cell sizes
    if (colWidth <= rowWidth) {
      cellSize = colWidth;
    } else {
      cellSize = rowWidth;
    }
    return cellSize;
  }
  drawGridMap.width = function () {
    if (!arguments.length) return width;
    width = (arguments.length <= 0 ? undefined : arguments[0]) - margin.left - margin.right;
  };
  drawGridMap.height = function () {
    if (!arguments.length) return height;
    height = (arguments.length <= 0 ? undefined : arguments[0]) - margin.top - margin.bottom;
  };
  var interactions = {
    key: {
      click: function click(d) {
        src_select('.stateModal').remove();
        var excluded = ['legend-label', 'active', 'other', 'all'];
        var classList = this.classList;
        var isAll = classList.contains('all');
        var isActive = this.checked;
        var isAllSelected = src_select('input.all').node().checked;
        var country = _toConsumableArray(classList).find(function (c) {
          return !(excluded.indexOf(c) > -1);
        });
        var all = src_select('input.all').node();
        if (country && keyFilter.indexOf(country) > -1) {
          keyFilter = keyFilter.filter(function (c) {
            return c !== country;
          });
          all.checked = false;
        } else if (country) {
          keyFilter.unshift(country);
        }
        if (keyFilter.length !== 4) {
          all.checked = false;
        } else {
          src_select('input.all').node().checked = true;
        }
        if (isAll && isActive) {
          keyFilter = countries;
          src_selectAll('input').each(function (g, gi, nodes) {
            nodes[gi].checked = true;
          });
        } else if (isAll && !isActive) {
          keyFilter = [];
          src_selectAll('input').each(function (g, gi, nodes) {
            nodes[gi].checked = false;
          });
        }
        container.call(chart.drawPercents);
      }
    },
    states: {
      // use pointer events if you can; mouse* also works
      mouseover: function mouseover(event, d) {
        interactions.states.showTooltip(event, d);
      },
      mousemove: function mousemove(event, d) {
        // optional but nice for tracking
        interactions.states.showTooltip(event, d);
      },
      mouseleave: function mouseleave(event, d) {
        tooltip.hide();
      },
      click: function click(event, d) {
        tooltip.hide();
        activeState = d;
        container.call(chart.drawState, d);
      },
      showTooltip: function showTooltip(event, d) {
        var tooltipContent = "\n          <p class=\"tooltip-heading\">".concat(d.state, "</p>\n          <p class=\"tooltip-body\">\n            $").concat(dollarFormatter(d.totaldollars).replace(/G/, 'B'), " Total Trade (2017)\n          </p>\n          <ul class=\"tooltip-list\">\n            ").concat(countries.map(function (c) {
          return "<li class=\"".concat(c, "\">").concat(c.charAt(0).toUpperCase() + c.slice(1), ": ").concat(d[c] ? percentFormatter(d[c]) : 0, "%</li>");
        }).join(''), "\n          </ul>\n          <p class=\"tooltip-footer\">").concat(percentFormatter(d.grandtotal), "% of Total (2017)</p>\n        ");
        // pass the event through to the new tooltip.js
        tooltip.show(tooltipContent, event);
      }
    }
  };
  return {
    drawGridMap: drawGridMap,
    drawPercents: drawPercents,
    drawState: drawState,
    interactions: interactions
  };
}
function chart_init(data) {
  container.datum(data);
  chart = draw(data);
  resize();
}
function resize() {
  if (chart) {
    var parentWidth = container.node().offsetWidth;
    chart.drawGridMap.width(parentWidth);
    chart.drawGridMap.height(parentWidth) * 0.9;
    container.call(chart.drawGridMap);
    container.call(chart.drawPercents);
    if (src_select('.stateModal').size()) {
      src_select('.stateModal').remove();
      chart.interactions.states.click(activeState);
    }
  }
}
/* harmony default export */ const js_chart = ({
  init: chart_init,
  draw: draw,
  resize: resize
});
;// ./src/index.js
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || src_unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function src_unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return src_arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? src_arrayLikeToArray(r, a) : void 0; } }
function src_arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }





var dataSrc = './data/data.csv';
var src_data;
function loadData() {
  var dataPromise = dsv_csv(dataSrc);
  var result = Promise.all([dataPromise]).then(function (res) {
    var _res = _slicedToArray(res, 1),
      dataResponse = _res[0];
    src_data = dataResponse;
    return;
  }).then(function () {
    var minMax = src_extent(src_data, function (d) {
      return +d.totaldollars;
    });
    document.querySelector('.min').innerHTML = '$' + format(',.0f')(minMax[0]).replace(/G/, 'B');
    document.querySelector('.max').innerHTML = '$' + format(',.0f')(minMax[1]).replace(/G/, 'B');
    js_chart.init(src_data);
  });
}
loadData();
window.addEventListener('resize', js_chart.resize);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			if (cachedModule.error !== undefined) throw cachedModule.error;
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		try {
/******/ 			var execOptions = { id: moduleId, module: module, factory: __webpack_modules__[moduleId], require: __webpack_require__ };
/******/ 			__webpack_require__.i.forEach(function(handler) { handler(execOptions); });
/******/ 			module = execOptions.module;
/******/ 			execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
/******/ 		} catch(e) {
/******/ 			module.error = e;
/******/ 			throw e;
/******/ 		}
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = __webpack_module_cache__;
/******/ 	
/******/ 	// expose the module execution interceptor
/******/ 	__webpack_require__.i = [];
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
/******/ 	/* webpack/runtime/get javascript update chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.hu = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get mini-css chunk filename */
/******/ 	(() => {
/******/ 		// This function allow to reference all chunks
/******/ 		__webpack_require__.miniCssF = (chunkId) => {
/******/ 			// return url for filenames based on template
/******/ 			return undefined;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/get update manifest filename */
/******/ 	(() => {
/******/ 		__webpack_require__.hmrF = () => ("main." + __webpack_require__.h() + ".hot-update.json");
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/getFullHash */
/******/ 	(() => {
/******/ 		__webpack_require__.h = () => ("db4ce16c97e888a10010")
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/load script */
/******/ 	(() => {
/******/ 		var inProgress = {};
/******/ 		var dataWebpackPrefix = "tariff-impact-states:";
/******/ 		// loadScript function to load a script via script tag
/******/ 		__webpack_require__.l = (url, done, key, chunkId) => {
/******/ 			if(inProgress[url]) { inProgress[url].push(done); return; }
/******/ 			var script, needAttach;
/******/ 			if(key !== undefined) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				for(var i = 0; i < scripts.length; i++) {
/******/ 					var s = scripts[i];
/******/ 					if(s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) { script = s; break; }
/******/ 				}
/******/ 			}
/******/ 			if(!script) {
/******/ 				needAttach = true;
/******/ 				script = document.createElement('script');
/******/ 		
/******/ 				script.charset = 'utf-8';
/******/ 				script.timeout = 120;
/******/ 				if (__webpack_require__.nc) {
/******/ 					script.setAttribute("nonce", __webpack_require__.nc);
/******/ 				}
/******/ 				script.setAttribute("data-webpack", dataWebpackPrefix + key);
/******/ 		
/******/ 				script.src = url;
/******/ 			}
/******/ 			inProgress[url] = [done];
/******/ 			var onScriptComplete = (prev, event) => {
/******/ 				// avoid mem leaks in IE.
/******/ 				script.onerror = script.onload = null;
/******/ 				clearTimeout(timeout);
/******/ 				var doneFns = inProgress[url];
/******/ 				delete inProgress[url];
/******/ 				script.parentNode && script.parentNode.removeChild(script);
/******/ 				doneFns && doneFns.forEach((fn) => (fn(event)));
/******/ 				if(prev) return prev(event);
/******/ 			}
/******/ 			var timeout = setTimeout(onScriptComplete.bind(null, undefined, { type: 'timeout', target: script }), 120000);
/******/ 			script.onerror = onScriptComplete.bind(null, script.onerror);
/******/ 			script.onload = onScriptComplete.bind(null, script.onload);
/******/ 			needAttach && document.head.appendChild(script);
/******/ 		};
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
/******/ 	/* webpack/runtime/hot module replacement */
/******/ 	(() => {
/******/ 		var currentModuleData = {};
/******/ 		var installedModules = __webpack_require__.c;
/******/ 		
/******/ 		// module and require creation
/******/ 		var currentChildModule;
/******/ 		var currentParents = [];
/******/ 		
/******/ 		// status
/******/ 		var registeredStatusHandlers = [];
/******/ 		var currentStatus = "idle";
/******/ 		
/******/ 		// while downloading
/******/ 		var blockingPromises = 0;
/******/ 		var blockingPromisesWaiting = [];
/******/ 		
/******/ 		// The update info
/******/ 		var currentUpdateApplyHandlers;
/******/ 		var queuedInvalidatedModules;
/******/ 		
/******/ 		__webpack_require__.hmrD = currentModuleData;
/******/ 		
/******/ 		__webpack_require__.i.push(function (options) {
/******/ 			var module = options.module;
/******/ 			var require = createRequire(options.require, options.id);
/******/ 			module.hot = createModuleHotObject(options.id, module);
/******/ 			module.parents = currentParents;
/******/ 			module.children = [];
/******/ 			currentParents = [];
/******/ 			options.require = require;
/******/ 		});
/******/ 		
/******/ 		__webpack_require__.hmrC = {};
/******/ 		__webpack_require__.hmrI = {};
/******/ 		
/******/ 		function createRequire(require, moduleId) {
/******/ 			var me = installedModules[moduleId];
/******/ 			if (!me) return require;
/******/ 			var fn = function (request) {
/******/ 				if (me.hot.active) {
/******/ 					if (installedModules[request]) {
/******/ 						var parents = installedModules[request].parents;
/******/ 						if (parents.indexOf(moduleId) === -1) {
/******/ 							parents.push(moduleId);
/******/ 						}
/******/ 					} else {
/******/ 						currentParents = [moduleId];
/******/ 						currentChildModule = request;
/******/ 					}
/******/ 					if (me.children.indexOf(request) === -1) {
/******/ 						me.children.push(request);
/******/ 					}
/******/ 				} else {
/******/ 					console.warn(
/******/ 						"[HMR] unexpected require(" +
/******/ 							request +
/******/ 							") from disposed module " +
/******/ 							moduleId
/******/ 					);
/******/ 					currentParents = [];
/******/ 				}
/******/ 				return require(request);
/******/ 			};
/******/ 			var createPropertyDescriptor = function (name) {
/******/ 				return {
/******/ 					configurable: true,
/******/ 					enumerable: true,
/******/ 					get: function () {
/******/ 						return require[name];
/******/ 					},
/******/ 					set: function (value) {
/******/ 						require[name] = value;
/******/ 					}
/******/ 				};
/******/ 			};
/******/ 			for (var name in require) {
/******/ 				if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
/******/ 					Object.defineProperty(fn, name, createPropertyDescriptor(name));
/******/ 				}
/******/ 			}
/******/ 			fn.e = function (chunkId, fetchPriority) {
/******/ 				return trackBlockingPromise(require.e(chunkId, fetchPriority));
/******/ 			};
/******/ 			return fn;
/******/ 		}
/******/ 		
/******/ 		function createModuleHotObject(moduleId, me) {
/******/ 			var _main = currentChildModule !== moduleId;
/******/ 			var hot = {
/******/ 				// private stuff
/******/ 				_acceptedDependencies: {},
/******/ 				_acceptedErrorHandlers: {},
/******/ 				_declinedDependencies: {},
/******/ 				_selfAccepted: false,
/******/ 				_selfDeclined: false,
/******/ 				_selfInvalidated: false,
/******/ 				_disposeHandlers: [],
/******/ 				_main: _main,
/******/ 				_requireSelf: function () {
/******/ 					currentParents = me.parents.slice();
/******/ 					currentChildModule = _main ? undefined : moduleId;
/******/ 					__webpack_require__(moduleId);
/******/ 				},
/******/ 		
/******/ 				// Module API
/******/ 				active: true,
/******/ 				accept: function (dep, callback, errorHandler) {
/******/ 					if (dep === undefined) hot._selfAccepted = true;
/******/ 					else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 					else if (typeof dep === "object" && dep !== null) {
/******/ 						for (var i = 0; i < dep.length; i++) {
/******/ 							hot._acceptedDependencies[dep[i]] = callback || function () {};
/******/ 							hot._acceptedErrorHandlers[dep[i]] = errorHandler;
/******/ 						}
/******/ 					} else {
/******/ 						hot._acceptedDependencies[dep] = callback || function () {};
/******/ 						hot._acceptedErrorHandlers[dep] = errorHandler;
/******/ 					}
/******/ 				},
/******/ 				decline: function (dep) {
/******/ 					if (dep === undefined) hot._selfDeclined = true;
/******/ 					else if (typeof dep === "object" && dep !== null)
/******/ 						for (var i = 0; i < dep.length; i++)
/******/ 							hot._declinedDependencies[dep[i]] = true;
/******/ 					else hot._declinedDependencies[dep] = true;
/******/ 				},
/******/ 				dispose: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				addDisposeHandler: function (callback) {
/******/ 					hot._disposeHandlers.push(callback);
/******/ 				},
/******/ 				removeDisposeHandler: function (callback) {
/******/ 					var idx = hot._disposeHandlers.indexOf(callback);
/******/ 					if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 				},
/******/ 				invalidate: function () {
/******/ 					this._selfInvalidated = true;
/******/ 					switch (currentStatus) {
/******/ 						case "idle":
/******/ 							currentUpdateApplyHandlers = [];
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							setStatus("ready");
/******/ 							break;
/******/ 						case "ready":
/******/ 							Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 								__webpack_require__.hmrI[key](
/******/ 									moduleId,
/******/ 									currentUpdateApplyHandlers
/******/ 								);
/******/ 							});
/******/ 							break;
/******/ 						case "prepare":
/******/ 						case "check":
/******/ 						case "dispose":
/******/ 						case "apply":
/******/ 							(queuedInvalidatedModules = queuedInvalidatedModules || []).push(
/******/ 								moduleId
/******/ 							);
/******/ 							break;
/******/ 						default:
/******/ 							// ignore requests in error states
/******/ 							break;
/******/ 					}
/******/ 				},
/******/ 		
/******/ 				// Management API
/******/ 				check: hotCheck,
/******/ 				apply: hotApply,
/******/ 				status: function (l) {
/******/ 					if (!l) return currentStatus;
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				addStatusHandler: function (l) {
/******/ 					registeredStatusHandlers.push(l);
/******/ 				},
/******/ 				removeStatusHandler: function (l) {
/******/ 					var idx = registeredStatusHandlers.indexOf(l);
/******/ 					if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
/******/ 				},
/******/ 		
/******/ 				// inherit from previous dispose call
/******/ 				data: currentModuleData[moduleId]
/******/ 			};
/******/ 			currentChildModule = undefined;
/******/ 			return hot;
/******/ 		}
/******/ 		
/******/ 		function setStatus(newStatus) {
/******/ 			currentStatus = newStatus;
/******/ 			var results = [];
/******/ 		
/******/ 			for (var i = 0; i < registeredStatusHandlers.length; i++)
/******/ 				results[i] = registeredStatusHandlers[i].call(null, newStatus);
/******/ 		
/******/ 			return Promise.all(results).then(function () {});
/******/ 		}
/******/ 		
/******/ 		function unblock() {
/******/ 			if (--blockingPromises === 0) {
/******/ 				setStatus("ready").then(function () {
/******/ 					if (blockingPromises === 0) {
/******/ 						var list = blockingPromisesWaiting;
/******/ 						blockingPromisesWaiting = [];
/******/ 						for (var i = 0; i < list.length; i++) {
/******/ 							list[i]();
/******/ 						}
/******/ 					}
/******/ 				});
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function trackBlockingPromise(promise) {
/******/ 			switch (currentStatus) {
/******/ 				case "ready":
/******/ 					setStatus("prepare");
/******/ 				/* fallthrough */
/******/ 				case "prepare":
/******/ 					blockingPromises++;
/******/ 					promise.then(unblock, unblock);
/******/ 					return promise;
/******/ 				default:
/******/ 					return promise;
/******/ 			}
/******/ 		}
/******/ 		
/******/ 		function waitForBlockingPromises(fn) {
/******/ 			if (blockingPromises === 0) return fn();
/******/ 			return new Promise(function (resolve) {
/******/ 				blockingPromisesWaiting.push(function () {
/******/ 					resolve(fn());
/******/ 				});
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		function hotCheck(applyOnUpdate) {
/******/ 			if (currentStatus !== "idle") {
/******/ 				throw new Error("check() is only allowed in idle status");
/******/ 			}
/******/ 			return setStatus("check")
/******/ 				.then(__webpack_require__.hmrM)
/******/ 				.then(function (update) {
/******/ 					if (!update) {
/******/ 						return setStatus(applyInvalidatedModules() ? "ready" : "idle").then(
/******/ 							function () {
/******/ 								return null;
/******/ 							}
/******/ 						);
/******/ 					}
/******/ 		
/******/ 					return setStatus("prepare").then(function () {
/******/ 						var updatedModules = [];
/******/ 						currentUpdateApplyHandlers = [];
/******/ 		
/******/ 						return Promise.all(
/******/ 							Object.keys(__webpack_require__.hmrC).reduce(function (
/******/ 								promises,
/******/ 								key
/******/ 							) {
/******/ 								__webpack_require__.hmrC[key](
/******/ 									update.c,
/******/ 									update.r,
/******/ 									update.m,
/******/ 									promises,
/******/ 									currentUpdateApplyHandlers,
/******/ 									updatedModules
/******/ 								);
/******/ 								return promises;
/******/ 							}, [])
/******/ 						).then(function () {
/******/ 							return waitForBlockingPromises(function () {
/******/ 								if (applyOnUpdate) {
/******/ 									return internalApply(applyOnUpdate);
/******/ 								}
/******/ 								return setStatus("ready").then(function () {
/******/ 									return updatedModules;
/******/ 								});
/******/ 							});
/******/ 						});
/******/ 					});
/******/ 				});
/******/ 		}
/******/ 		
/******/ 		function hotApply(options) {
/******/ 			if (currentStatus !== "ready") {
/******/ 				return Promise.resolve().then(function () {
/******/ 					throw new Error(
/******/ 						"apply() is only allowed in ready status (state: " +
/******/ 							currentStatus +
/******/ 							")"
/******/ 					);
/******/ 				});
/******/ 			}
/******/ 			return internalApply(options);
/******/ 		}
/******/ 		
/******/ 		function internalApply(options) {
/******/ 			options = options || {};
/******/ 		
/******/ 			applyInvalidatedModules();
/******/ 		
/******/ 			var results = currentUpdateApplyHandlers.map(function (handler) {
/******/ 				return handler(options);
/******/ 			});
/******/ 			currentUpdateApplyHandlers = undefined;
/******/ 		
/******/ 			var errors = results
/******/ 				.map(function (r) {
/******/ 					return r.error;
/******/ 				})
/******/ 				.filter(Boolean);
/******/ 		
/******/ 			if (errors.length > 0) {
/******/ 				return setStatus("abort").then(function () {
/******/ 					throw errors[0];
/******/ 				});
/******/ 			}
/******/ 		
/******/ 			// Now in "dispose" phase
/******/ 			var disposePromise = setStatus("dispose");
/******/ 		
/******/ 			results.forEach(function (result) {
/******/ 				if (result.dispose) result.dispose();
/******/ 			});
/******/ 		
/******/ 			// Now in "apply" phase
/******/ 			var applyPromise = setStatus("apply");
/******/ 		
/******/ 			var error;
/******/ 			var reportError = function (err) {
/******/ 				if (!error) error = err;
/******/ 			};
/******/ 		
/******/ 			var outdatedModules = [];
/******/ 		
/******/ 			var onAccepted = function () {
/******/ 				return Promise.all([disposePromise, applyPromise]).then(function () {
/******/ 					// handle errors in accept handlers and self accepted module load
/******/ 					if (error) {
/******/ 						return setStatus("fail").then(function () {
/******/ 							throw error;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					if (queuedInvalidatedModules) {
/******/ 						return internalApply(options).then(function (list) {
/******/ 							outdatedModules.forEach(function (moduleId) {
/******/ 								if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 							});
/******/ 							return list;
/******/ 						});
/******/ 					}
/******/ 		
/******/ 					return setStatus("idle").then(function () {
/******/ 						return outdatedModules;
/******/ 					});
/******/ 				});
/******/ 			};
/******/ 		
/******/ 			return Promise.all(
/******/ 				results
/******/ 					.filter(function (result) {
/******/ 						return result.apply;
/******/ 					})
/******/ 					.map(function (result) {
/******/ 						return result.apply(reportError);
/******/ 					})
/******/ 			)
/******/ 				.then(function (applyResults) {
/******/ 					applyResults.forEach(function (modules) {
/******/ 						if (modules) {
/******/ 							for (var i = 0; i < modules.length; i++) {
/******/ 								outdatedModules.push(modules[i]);
/******/ 							}
/******/ 						}
/******/ 					});
/******/ 				})
/******/ 				.then(onAccepted);
/******/ 		}
/******/ 		
/******/ 		function applyInvalidatedModules() {
/******/ 			if (queuedInvalidatedModules) {
/******/ 				if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
/******/ 				Object.keys(__webpack_require__.hmrI).forEach(function (key) {
/******/ 					queuedInvalidatedModules.forEach(function (moduleId) {
/******/ 						__webpack_require__.hmrI[key](
/******/ 							moduleId,
/******/ 							currentUpdateApplyHandlers
/******/ 						);
/******/ 					});
/******/ 				});
/******/ 				queuedInvalidatedModules = undefined;
/******/ 				return true;
/******/ 			}
/******/ 		}
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript && document.currentScript.tagName.toUpperCase() === 'SCRIPT')
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && (!scriptUrl || !/^http(s?):/.test(scriptUrl))) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/^blob:/, "").replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/css loading */
/******/ 	(() => {
/******/ 		if (typeof document === "undefined") return;
/******/ 		var createStylesheet = (chunkId, fullhref, oldTag, resolve, reject) => {
/******/ 			var linkTag = document.createElement("link");
/******/ 		
/******/ 			linkTag.rel = "stylesheet";
/******/ 			linkTag.type = "text/css";
/******/ 			if (__webpack_require__.nc) {
/******/ 				linkTag.nonce = __webpack_require__.nc;
/******/ 			}
/******/ 			var onLinkComplete = (event) => {
/******/ 				// avoid mem leaks.
/******/ 				linkTag.onerror = linkTag.onload = null;
/******/ 				if (event.type === 'load') {
/******/ 					resolve();
/******/ 				} else {
/******/ 					var errorType = event && event.type;
/******/ 					var realHref = event && event.target && event.target.href || fullhref;
/******/ 					var err = new Error("Loading CSS chunk " + chunkId + " failed.\n(" + errorType + ": " + realHref + ")");
/******/ 					err.name = "ChunkLoadError";
/******/ 					err.code = "CSS_CHUNK_LOAD_FAILED";
/******/ 					err.type = errorType;
/******/ 					err.request = realHref;
/******/ 					if (linkTag.parentNode) linkTag.parentNode.removeChild(linkTag)
/******/ 					reject(err);
/******/ 				}
/******/ 			}
/******/ 			linkTag.onerror = linkTag.onload = onLinkComplete;
/******/ 			linkTag.href = fullhref;
/******/ 		
/******/ 		
/******/ 			if (oldTag) {
/******/ 				oldTag.parentNode.insertBefore(linkTag, oldTag.nextSibling);
/******/ 			} else {
/******/ 				document.head.appendChild(linkTag);
/******/ 			}
/******/ 			return linkTag;
/******/ 		};
/******/ 		var findStylesheet = (href, fullhref) => {
/******/ 			var existingLinkTags = document.getElementsByTagName("link");
/******/ 			for(var i = 0; i < existingLinkTags.length; i++) {
/******/ 				var tag = existingLinkTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href") || tag.getAttribute("href");
/******/ 				if(tag.rel === "stylesheet" && (dataHref === href || dataHref === fullhref)) return tag;
/******/ 			}
/******/ 			var existingStyleTags = document.getElementsByTagName("style");
/******/ 			for(var i = 0; i < existingStyleTags.length; i++) {
/******/ 				var tag = existingStyleTags[i];
/******/ 				var dataHref = tag.getAttribute("data-href");
/******/ 				if(dataHref === href || dataHref === fullhref) return tag;
/******/ 			}
/******/ 		};
/******/ 		var loadStylesheet = (chunkId) => {
/******/ 			return new Promise((resolve, reject) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				if(findStylesheet(href, fullhref)) return resolve();
/******/ 				createStylesheet(chunkId, fullhref, null, resolve, reject);
/******/ 			});
/******/ 		}
/******/ 		// no chunk loading
/******/ 		
/******/ 		var oldTags = [];
/******/ 		var newTags = [];
/******/ 		var applyHandler = (options) => {
/******/ 			return { dispose: () => {
/******/ 				for(var i = 0; i < oldTags.length; i++) {
/******/ 					var oldTag = oldTags[i];
/******/ 					if(oldTag.parentNode) oldTag.parentNode.removeChild(oldTag);
/******/ 				}
/******/ 				oldTags.length = 0;
/******/ 			}, apply: () => {
/******/ 				for(var i = 0; i < newTags.length; i++) newTags[i].rel = "stylesheet";
/******/ 				newTags.length = 0;
/******/ 			} };
/******/ 		}
/******/ 		__webpack_require__.hmrC.miniCss = (chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) => {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			chunkIds.forEach((chunkId) => {
/******/ 				var href = __webpack_require__.miniCssF(chunkId);
/******/ 				var fullhref = __webpack_require__.p + href;
/******/ 				var oldTag = findStylesheet(href, fullhref);
/******/ 				if(!oldTag) return;
/******/ 				promises.push(new Promise((resolve, reject) => {
/******/ 					var tag = createStylesheet(chunkId, fullhref, oldTag, () => {
/******/ 						tag.as = "style";
/******/ 						tag.rel = "preload";
/******/ 						resolve();
/******/ 					}, reject);
/******/ 					oldTags.push(oldTag);
/******/ 					newTags.push(tag);
/******/ 				}));
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
/******/ 			792: 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		var currentUpdatedModulesList;
/******/ 		var waitingUpdateResolves = {};
/******/ 		function loadUpdateChunk(chunkId, updatedModulesList) {
/******/ 			currentUpdatedModulesList = updatedModulesList;
/******/ 			return new Promise((resolve, reject) => {
/******/ 				waitingUpdateResolves[chunkId] = resolve;
/******/ 				// start update chunk loading
/******/ 				var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
/******/ 				// create error before stack unwound to get useful stacktrace later
/******/ 				var error = new Error();
/******/ 				var loadingEnded = (event) => {
/******/ 					if(waitingUpdateResolves[chunkId]) {
/******/ 						waitingUpdateResolves[chunkId] = undefined
/******/ 						var errorType = event && (event.type === 'load' ? 'missing' : event.type);
/******/ 						var realSrc = event && event.target && event.target.src;
/******/ 						error.message = 'Loading hot update chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')';
/******/ 						error.name = 'ChunkLoadError';
/******/ 						error.type = errorType;
/******/ 						error.request = realSrc;
/******/ 						reject(error);
/******/ 					}
/******/ 				};
/******/ 				__webpack_require__.l(url, loadingEnded);
/******/ 			});
/******/ 		}
/******/ 		
/******/ 		self["webpackHotUpdatetariff_impact_states"] = (chunkId, moreModules, runtime) => {
/******/ 			for(var moduleId in moreModules) {
/******/ 				if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 					currentUpdate[moduleId] = moreModules[moduleId];
/******/ 					if(currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
/******/ 				}
/******/ 			}
/******/ 			if(runtime) currentUpdateRuntime.push(runtime);
/******/ 			if(waitingUpdateResolves[chunkId]) {
/******/ 				waitingUpdateResolves[chunkId]();
/******/ 				waitingUpdateResolves[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		var currentUpdateChunks;
/******/ 		var currentUpdate;
/******/ 		var currentUpdateRemovedChunks;
/******/ 		var currentUpdateRuntime;
/******/ 		function applyHandler(options) {
/******/ 			if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
/******/ 			currentUpdateChunks = undefined;
/******/ 			function getAffectedModuleEffects(updateModuleId) {
/******/ 				var outdatedModules = [updateModuleId];
/******/ 				var outdatedDependencies = {};
/******/ 		
/******/ 				var queue = outdatedModules.map(function (id) {
/******/ 					return {
/******/ 						chain: [id],
/******/ 						id: id
/******/ 					};
/******/ 				});
/******/ 				while (queue.length > 0) {
/******/ 					var queueItem = queue.pop();
/******/ 					var moduleId = queueItem.id;
/******/ 					var chain = queueItem.chain;
/******/ 					var module = __webpack_require__.c[moduleId];
/******/ 					if (
/******/ 						!module ||
/******/ 						(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 					)
/******/ 						continue;
/******/ 					if (module.hot._selfDeclined) {
/******/ 						return {
/******/ 							type: "self-declined",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					if (module.hot._main) {
/******/ 						return {
/******/ 							type: "unaccepted",
/******/ 							chain: chain,
/******/ 							moduleId: moduleId
/******/ 						};
/******/ 					}
/******/ 					for (var i = 0; i < module.parents.length; i++) {
/******/ 						var parentId = module.parents[i];
/******/ 						var parent = __webpack_require__.c[parentId];
/******/ 						if (!parent) continue;
/******/ 						if (parent.hot._declinedDependencies[moduleId]) {
/******/ 							return {
/******/ 								type: "declined",
/******/ 								chain: chain.concat([parentId]),
/******/ 								moduleId: moduleId,
/******/ 								parentId: parentId
/******/ 							};
/******/ 						}
/******/ 						if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 						if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 							if (!outdatedDependencies[parentId])
/******/ 								outdatedDependencies[parentId] = [];
/******/ 							addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 							continue;
/******/ 						}
/******/ 						delete outdatedDependencies[parentId];
/******/ 						outdatedModules.push(parentId);
/******/ 						queue.push({
/******/ 							chain: chain.concat([parentId]),
/******/ 							id: parentId
/******/ 						});
/******/ 					}
/******/ 				}
/******/ 		
/******/ 				return {
/******/ 					type: "accepted",
/******/ 					moduleId: updateModuleId,
/******/ 					outdatedModules: outdatedModules,
/******/ 					outdatedDependencies: outdatedDependencies
/******/ 				};
/******/ 			}
/******/ 		
/******/ 			function addAllToSet(a, b) {
/******/ 				for (var i = 0; i < b.length; i++) {
/******/ 					var item = b[i];
/******/ 					if (a.indexOf(item) === -1) a.push(item);
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			// at begin all updates modules are outdated
/******/ 			// the "outdated" status can propagate to parents if they don't accept the children
/******/ 			var outdatedDependencies = {};
/******/ 			var outdatedModules = [];
/******/ 			var appliedUpdate = {};
/******/ 		
/******/ 			var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" + module.id + ") to disposed module"
/******/ 				);
/******/ 			};
/******/ 		
/******/ 			for (var moduleId in currentUpdate) {
/******/ 				if (__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 					var newModuleFactory = currentUpdate[moduleId];
/******/ 					var result = newModuleFactory
/******/ 						? getAffectedModuleEffects(moduleId)
/******/ 						: {
/******/ 								type: "disposed",
/******/ 								moduleId: moduleId
/******/ 							};
/******/ 					/** @type {Error|false} */
/******/ 					var abortError = false;
/******/ 					var doApply = false;
/******/ 					var doDispose = false;
/******/ 					var chainInfo = "";
/******/ 					if (result.chain) {
/******/ 						chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 					}
/******/ 					switch (result.type) {
/******/ 						case "self-declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of self decline: " +
/******/ 										result.moduleId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "declined":
/******/ 							if (options.onDeclined) options.onDeclined(result);
/******/ 							if (!options.ignoreDeclined)
/******/ 								abortError = new Error(
/******/ 									"Aborted because of declined dependency: " +
/******/ 										result.moduleId +
/******/ 										" in " +
/******/ 										result.parentId +
/******/ 										chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "unaccepted":
/******/ 							if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 							if (!options.ignoreUnaccepted)
/******/ 								abortError = new Error(
/******/ 									"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 								);
/******/ 							break;
/******/ 						case "accepted":
/******/ 							if (options.onAccepted) options.onAccepted(result);
/******/ 							doApply = true;
/******/ 							break;
/******/ 						case "disposed":
/******/ 							if (options.onDisposed) options.onDisposed(result);
/******/ 							doDispose = true;
/******/ 							break;
/******/ 						default:
/******/ 							throw new Error("Unexception type " + result.type);
/******/ 					}
/******/ 					if (abortError) {
/******/ 						return {
/******/ 							error: abortError
/******/ 						};
/******/ 					}
/******/ 					if (doApply) {
/******/ 						appliedUpdate[moduleId] = newModuleFactory;
/******/ 						addAllToSet(outdatedModules, result.outdatedModules);
/******/ 						for (moduleId in result.outdatedDependencies) {
/******/ 							if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
/******/ 								if (!outdatedDependencies[moduleId])
/******/ 									outdatedDependencies[moduleId] = [];
/******/ 								addAllToSet(
/******/ 									outdatedDependencies[moduleId],
/******/ 									result.outdatedDependencies[moduleId]
/******/ 								);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 					if (doDispose) {
/******/ 						addAllToSet(outdatedModules, [result.moduleId]);
/******/ 						appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 			currentUpdate = undefined;
/******/ 		
/******/ 			// Store self accepted outdated modules to require them later by the module system
/******/ 			var outdatedSelfAcceptedModules = [];
/******/ 			for (var j = 0; j < outdatedModules.length; j++) {
/******/ 				var outdatedModuleId = outdatedModules[j];
/******/ 				var module = __webpack_require__.c[outdatedModuleId];
/******/ 				if (
/******/ 					module &&
/******/ 					(module.hot._selfAccepted || module.hot._main) &&
/******/ 					// removed self-accepted modules should not be required
/******/ 					appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire &&
/******/ 					// when called invalidate self-accepting is not possible
/******/ 					!module.hot._selfInvalidated
/******/ 				) {
/******/ 					outdatedSelfAcceptedModules.push({
/******/ 						module: outdatedModuleId,
/******/ 						require: module.hot._requireSelf,
/******/ 						errorHandler: module.hot._selfAccepted
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 		
/******/ 			var moduleOutdatedDependencies;
/******/ 		
/******/ 			return {
/******/ 				dispose: function () {
/******/ 					currentUpdateRemovedChunks.forEach(function (chunkId) {
/******/ 						delete installedChunks[chunkId];
/******/ 					});
/******/ 					currentUpdateRemovedChunks = undefined;
/******/ 		
/******/ 					var idx;
/******/ 					var queue = outdatedModules.slice();
/******/ 					while (queue.length > 0) {
/******/ 						var moduleId = queue.pop();
/******/ 						var module = __webpack_require__.c[moduleId];
/******/ 						if (!module) continue;
/******/ 		
/******/ 						var data = {};
/******/ 		
/******/ 						// Call dispose handlers
/******/ 						var disposeHandlers = module.hot._disposeHandlers;
/******/ 						for (j = 0; j < disposeHandlers.length; j++) {
/******/ 							disposeHandlers[j].call(null, data);
/******/ 						}
/******/ 						__webpack_require__.hmrD[moduleId] = data;
/******/ 		
/******/ 						// disable module (this disables requires from this module)
/******/ 						module.hot.active = false;
/******/ 		
/******/ 						// remove module from cache
/******/ 						delete __webpack_require__.c[moduleId];
/******/ 		
/******/ 						// when disposing there is no need to call dispose handler
/******/ 						delete outdatedDependencies[moduleId];
/******/ 		
/******/ 						// remove "parents" references from all children
/******/ 						for (j = 0; j < module.children.length; j++) {
/******/ 							var child = __webpack_require__.c[module.children[j]];
/******/ 							if (!child) continue;
/******/ 							idx = child.parents.indexOf(moduleId);
/******/ 							if (idx >= 0) {
/******/ 								child.parents.splice(idx, 1);
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// remove outdated dependency from module children
/******/ 					var dependency;
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									dependency = moduleOutdatedDependencies[j];
/******/ 									idx = module.children.indexOf(dependency);
/******/ 									if (idx >= 0) module.children.splice(idx, 1);
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				},
/******/ 				apply: function (reportError) {
/******/ 					var acceptPromises = [];
/******/ 					// insert new code
/******/ 					for (var updateModuleId in appliedUpdate) {
/******/ 						if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
/******/ 							__webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					// run new runtime modules
/******/ 					for (var i = 0; i < currentUpdateRuntime.length; i++) {
/******/ 						currentUpdateRuntime[i](__webpack_require__);
/******/ 					}
/******/ 		
/******/ 					// call accept handlers
/******/ 					for (var outdatedModuleId in outdatedDependencies) {
/******/ 						if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
/******/ 							var module = __webpack_require__.c[outdatedModuleId];
/******/ 							if (module) {
/******/ 								moduleOutdatedDependencies =
/******/ 									outdatedDependencies[outdatedModuleId];
/******/ 								var callbacks = [];
/******/ 								var errorHandlers = [];
/******/ 								var dependenciesForCallbacks = [];
/******/ 								for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 									var dependency = moduleOutdatedDependencies[j];
/******/ 									var acceptCallback =
/******/ 										module.hot._acceptedDependencies[dependency];
/******/ 									var errorHandler =
/******/ 										module.hot._acceptedErrorHandlers[dependency];
/******/ 									if (acceptCallback) {
/******/ 										if (callbacks.indexOf(acceptCallback) !== -1) continue;
/******/ 										callbacks.push(acceptCallback);
/******/ 										errorHandlers.push(errorHandler);
/******/ 										dependenciesForCallbacks.push(dependency);
/******/ 									}
/******/ 								}
/******/ 								for (var k = 0; k < callbacks.length; k++) {
/******/ 									var result;
/******/ 									try {
/******/ 										result = callbacks[k].call(null, moduleOutdatedDependencies);
/******/ 									} catch (err) {
/******/ 										if (typeof errorHandlers[k] === "function") {
/******/ 											try {
/******/ 												errorHandlers[k](err, {
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k]
/******/ 												});
/******/ 											} catch (err2) {
/******/ 												if (options.onErrored) {
/******/ 													options.onErrored({
/******/ 														type: "accept-error-handler-errored",
/******/ 														moduleId: outdatedModuleId,
/******/ 														dependencyId: dependenciesForCallbacks[k],
/******/ 														error: err2,
/******/ 														originalError: err
/******/ 													});
/******/ 												}
/******/ 												if (!options.ignoreErrored) {
/******/ 													reportError(err2);
/******/ 													reportError(err);
/******/ 												}
/******/ 											}
/******/ 										} else {
/******/ 											if (options.onErrored) {
/******/ 												options.onErrored({
/******/ 													type: "accept-errored",
/******/ 													moduleId: outdatedModuleId,
/******/ 													dependencyId: dependenciesForCallbacks[k],
/******/ 													error: err
/******/ 												});
/******/ 											}
/******/ 											if (!options.ignoreErrored) {
/******/ 												reportError(err);
/******/ 											}
/******/ 										}
/******/ 									}
/******/ 									if (result && typeof result.then === "function") {
/******/ 										acceptPromises.push(result);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 		
/******/ 					var onAccepted = function () {
/******/ 						// Load self accepted modules
/******/ 						for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
/******/ 							var item = outdatedSelfAcceptedModules[o];
/******/ 							var moduleId = item.module;
/******/ 							try {
/******/ 								item.require(moduleId);
/******/ 							} catch (err) {
/******/ 								if (typeof item.errorHandler === "function") {
/******/ 									try {
/******/ 										item.errorHandler(err, {
/******/ 											moduleId: moduleId,
/******/ 											module: __webpack_require__.c[moduleId]
/******/ 										});
/******/ 									} catch (err1) {
/******/ 										if (options.onErrored) {
/******/ 											options.onErrored({
/******/ 												type: "self-accept-error-handler-errored",
/******/ 												moduleId: moduleId,
/******/ 												error: err1,
/******/ 												originalError: err
/******/ 											});
/******/ 										}
/******/ 										if (!options.ignoreErrored) {
/******/ 											reportError(err1);
/******/ 											reportError(err);
/******/ 										}
/******/ 									}
/******/ 								} else {
/******/ 									if (options.onErrored) {
/******/ 										options.onErrored({
/******/ 											type: "self-accept-errored",
/******/ 											moduleId: moduleId,
/******/ 											error: err
/******/ 										});
/******/ 									}
/******/ 									if (!options.ignoreErrored) {
/******/ 										reportError(err);
/******/ 									}
/******/ 								}
/******/ 							}
/******/ 						}
/******/ 					};
/******/ 		
/******/ 					return Promise.all(acceptPromises)
/******/ 						.then(onAccepted)
/******/ 						.then(function () {
/******/ 							return outdatedModules;
/******/ 						});
/******/ 				}
/******/ 			};
/******/ 		}
/******/ 		__webpack_require__.hmrI.jsonp = function (moduleId, applyHandlers) {
/******/ 			if (!currentUpdate) {
/******/ 				currentUpdate = {};
/******/ 				currentUpdateRuntime = [];
/******/ 				currentUpdateRemovedChunks = [];
/******/ 				applyHandlers.push(applyHandler);
/******/ 			}
/******/ 			if (!__webpack_require__.o(currentUpdate, moduleId)) {
/******/ 				currentUpdate[moduleId] = __webpack_require__.m[moduleId];
/******/ 			}
/******/ 		};
/******/ 		__webpack_require__.hmrC.jsonp = function (
/******/ 			chunkIds,
/******/ 			removedChunks,
/******/ 			removedModules,
/******/ 			promises,
/******/ 			applyHandlers,
/******/ 			updatedModulesList
/******/ 		) {
/******/ 			applyHandlers.push(applyHandler);
/******/ 			currentUpdateChunks = {};
/******/ 			currentUpdateRemovedChunks = removedChunks;
/******/ 			currentUpdate = removedModules.reduce(function (obj, key) {
/******/ 				obj[key] = false;
/******/ 				return obj;
/******/ 			}, {});
/******/ 			currentUpdateRuntime = [];
/******/ 			chunkIds.forEach(function (chunkId) {
/******/ 				if (
/******/ 					__webpack_require__.o(installedChunks, chunkId) &&
/******/ 					installedChunks[chunkId] !== undefined
/******/ 				) {
/******/ 					promises.push(loadUpdateChunk(chunkId, updatedModulesList));
/******/ 					currentUpdateChunks[chunkId] = true;
/******/ 				} else {
/******/ 					currentUpdateChunks[chunkId] = false;
/******/ 				}
/******/ 			});
/******/ 			if (__webpack_require__.f) {
/******/ 				__webpack_require__.f.jsonpHmr = function (chunkId, promises) {
/******/ 					if (
/******/ 						currentUpdateChunks &&
/******/ 						__webpack_require__.o(currentUpdateChunks, chunkId) &&
/******/ 						!currentUpdateChunks[chunkId]
/******/ 					) {
/******/ 						promises.push(loadUpdateChunk(chunkId));
/******/ 						currentUpdateChunks[chunkId] = true;
/******/ 					}
/******/ 				};
/******/ 			}
/******/ 		};
/******/ 		
/******/ 		__webpack_require__.hmrM = () => {
/******/ 			if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
/******/ 			return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response) => {
/******/ 				if(response.status === 404) return; // no update available
/******/ 				if(!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
/******/ 				return response.json();
/******/ 			});
/******/ 		};
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// module cache are used so entry inlining is disabled
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	var __webpack_exports__ = __webpack_require__(966);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXdDLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtBQUMxRCwwQ0FBMEMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtBQUNuRSwwQ0FBMEMsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSTtBQUNuRSx3Q0FBd0MsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJO0FBQzFELDBDQUEwQyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJOztBQUVuRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FB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V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsVUFBVTtXQUNWO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLFFBQVE7V0FDUjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsU0FBUztXQUNUO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQSxLQUFLO1dBQ0w7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxFQUFFLElBQUk7V0FDTjtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsSUFBSTtXQUNKO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBO1dBQ0Esc0NBQXNDO1dBQ3RDO1dBQ0E7V0FDQSxFQUFFO1dBQ0Y7O1dBRUE7O1dBRUEsb0I7Ozs7O1dDcmdCQSxtQzs7Ozs7VUVBQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vc3JjL3Njc3MvbWFpbi5zY3NzPzRiMjciLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9zcmMvc2Nzcy9tYWluLnNjc3MiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2FzY2VuZGluZy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvYmlzZWN0b3IuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2Jpc2VjdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvZXh0ZW50LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvdGlja3MuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2hpc3RvZ3JhbS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvdGhyZXNob2xkL2ZyZWVkbWFuRGlhY29uaXMuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0RGVjaW1hbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2V4cG9uZW50LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0R3JvdXAuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXROdW1lcmFscy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFNwZWNpZmllci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFRyaW0uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRQcmVmaXhBdXRvLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0Um91bmRlZC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFR5cGVzLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvaWRlbnRpdHkuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9sb2NhbGUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9kZWZhdWx0TG9jYWxlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWRzdi9zcmMvZHN2LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWRzdi9zcmMvY3N2LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWRzdi9zcmMvdHN2LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy90ZXh0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZldGNoL3NyYy9kc3YuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdG9yQWxsLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdEFsbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL21hdGNoZXIuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0Q2hpbGQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vc2VsZWN0Q2hpbGRyZW4uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZmlsdGVyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NwYXJzZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9lbnRlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL2NvbnN0YW50LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2RhdGEuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZXhpdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9qb2luLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL21lcmdlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL29yZGVyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NvcnQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vY2FsbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9ub2Rlcy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9ub2RlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NpemUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW1wdHkuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZWFjaC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL2NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXBwZW5kLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2luc2VydC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yZW1vdmUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vY2xvbmUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGF0dW0uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vb24uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGlzcGF0Y2guanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaXRlcmF0b3IuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RBbGwuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy90aWNrcy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvbmljZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2FzY2VuZGluZy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2Rlc2NlbmRpbmcuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9iaXNlY3Rvci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL251bWJlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2Jpc2VjdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvZGVmaW5lLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWNvbG9yL3NyYy9jb2xvci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvYmFzaXMuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2Jhc2lzQ2xvc2VkLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb25zdGFudC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvY29sb3IuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3JnYi5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvYXJyYXkuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2RhdGUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvb2JqZWN0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9zdHJpbmcuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL251bWJlckFycmF5LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy92YWx1ZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvcm91bmQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL2NvbnN0YW50LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9udW1iZXIuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL2NvbnRpbnVvdXMuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL2luaXQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL2xvZy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9pbnRlcm5tYXAvc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9vcmRpbmFsLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWRpc3BhdGNoL3NyYy9kaXNwYXRjaC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10aW1lci9zcmMvdGltZXIuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVvdXQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zY2hlZHVsZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9pbnRlcnJ1cHQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvc2VsZWN0aW9uL2ludGVycnVwdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2RlY29tcG9zZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL3BhcnNlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy90cmFuc2Zvcm0vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90d2Vlbi5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ludGVycG9sYXRlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vYXR0ci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2F0dHJUd2Vlbi5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2RlbGF5LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZHVyYXRpb24uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lYXNlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZWFzZVZhcnlpbmcuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9maWx0ZXIuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9tZXJnZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL29uLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vcmVtb3ZlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2VsZWN0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2VsZWN0QWxsLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2VsZWN0aW9uLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc3R5bGUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZVR3ZWVuLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3RleHRUd2Vlbi5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3RyYW5zaXRpb24uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9lbmQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1lYXNlL3NyYy9jdWJpYy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vdHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9zcmMvanMvdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL3NyYy9qcy9jaGFydC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2dldCBqYXZhc2NyaXB0IHVwZGF0ZSBjaHVuayBmaWxlbmFtZSIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvZ2V0IG1pbmktY3NzIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9nZXQgdXBkYXRlIG1hbmlmZXN0IGZpbGVuYW1lIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9nZXRGdWxsSGFzaCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvZ2xvYmFsIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2xvYWQgc2NyaXB0Iiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2hvdCBtb2R1bGUgcmVwbGFjZW1lbnQiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL3B1YmxpY1BhdGgiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2NzcyBsb2FkaW5nIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9ub25jZSIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svc3RhcnR1cCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG4gIGlmIChub25jZSkge1xuICAgIHN0eWxlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBub25jZSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlc0luRE9NLmxlbmd0aDsgaSsrKSB7XG4gICAgaWYgKHN0eWxlc0luRE9NW2ldLmlkZW50aWZpZXIgPT09IGlkZW50aWZpZXIpIHtcbiAgICAgIHJlc3VsdCA9IGk7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcbiAgICB2YXIgaXRlbSA9IGxpc3RbaV07XG4gICAgdmFyIGlkID0gb3B0aW9ucy5iYXNlID8gaXRlbVswXSArIG9wdGlvbnMuYmFzZSA6IGl0ZW1bMF07XG4gICAgdmFyIGNvdW50ID0gaWRDb3VudE1hcFtpZF0gfHwgMDtcbiAgICB2YXIgaWRlbnRpZmllciA9IFwiXCIuY29uY2F0KGlkLCBcIiBcIikuY29uY2F0KGNvdW50KTtcbiAgICBpZENvdW50TWFwW2lkXSA9IGNvdW50ICsgMTtcbiAgICB2YXIgaW5kZXhCeUlkZW50aWZpZXIgPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICB2YXIgb2JqID0ge1xuICAgICAgY3NzOiBpdGVtWzFdLFxuICAgICAgbWVkaWE6IGl0ZW1bMl0sXG4gICAgICBzb3VyY2VNYXA6IGl0ZW1bM10sXG4gICAgICBzdXBwb3J0czogaXRlbVs0XSxcbiAgICAgIGxheWVyOiBpdGVtWzVdXG4gICAgfTtcbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuICByZXR1cm4gaWRlbnRpZmllcnM7XG59XG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBhcGkudXBkYXRlKG9iaiA9IG5ld09iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZW1vdmUoKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiB1cGRhdGVyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICB2YXIgaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tpXTtcbiAgICAgIHZhciBpbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhdLnJlZmVyZW5jZXMtLTtcbiAgICB9XG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcbiAgICAgIHZhciBfaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihfaWRlbnRpZmllcik7XG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG4gICAgbGFzdElkZW50aWZpZXJzID0gbmV3TGFzdElkZW50aWZpZXJzO1xuICB9O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodXJsLCBvcHRpb25zKSB7XG4gIGlmICghb3B0aW9ucykge1xuICAgIG9wdGlvbnMgPSB7fTtcbiAgfVxuICBpZiAoIXVybCkge1xuICAgIHJldHVybiB1cmw7XG4gIH1cbiAgdXJsID0gU3RyaW5nKHVybC5fX2VzTW9kdWxlID8gdXJsLmRlZmF1bHQgOiB1cmwpO1xuXG4gIC8vIElmIHVybCBpcyBhbHJlYWR5IHdyYXBwZWQgaW4gcXVvdGVzLCByZW1vdmUgdGhlbVxuICBpZiAoL15bJ1wiXS4qWydcIl0kLy50ZXN0KHVybCkpIHtcbiAgICB1cmwgPSB1cmwuc2xpY2UoMSwgLTEpO1xuICB9XG4gIGlmIChvcHRpb25zLmhhc2gpIHtcbiAgICB1cmwgKz0gb3B0aW9ucy5oYXNoO1xuICB9XG5cbiAgLy8gU2hvdWxkIHVybCBiZSB3cmFwcGVkP1xuICAvLyBTZWUgaHR0cHM6Ly9kcmFmdHMuY3Nzd2cub3JnL2Nzcy12YWx1ZXMtMy8jdXJsc1xuICBpZiAoL1tcIicoKSBcXHRcXG5dfCglMjApLy50ZXN0KHVybCkgfHwgb3B0aW9ucy5uZWVkUXVvdGVzKSB7XG4gICAgcmV0dXJuIFwiXFxcIlwiLmNvbmNhdCh1cmwucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpLnJlcGxhY2UoL1xcbi9nLCBcIlxcXFxuXCIpLCBcIlxcXCJcIik7XG4gIH1cbiAgcmV0dXJuIHVybDtcbn07IiwiXG4gICAgICBpbXBvcnQgQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzXCI7XG4gICAgICBpbXBvcnQgZG9tQVBJIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRGbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydEJ5U2VsZWN0b3IuanNcIjtcbiAgICAgIGltcG9ydCBzZXRBdHRyaWJ1dGVzIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0U3R5bGVFbGVtZW50IGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzXCI7XG4gICAgICBpbXBvcnQgc3R5bGVUYWdUcmFuc2Zvcm1GbiBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzXCI7XG4gICAgICBpbXBvcnQgY29udGVudCwgKiBhcyBuYW1lZEV4cG9ydCBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbMV0hLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4uLy4uL25vZGVfbW9kdWxlcy9zYXNzLWxvYWRlci9kaXN0L2Nqcy5qcz8/cnVsZVNldFsxXS5ydWxlc1sxXS51c2VbM10hLi9tYWluLnNjc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgaWYgKCFjb250ZW50LmxvY2FscyB8fCBtb2R1bGUuaG90LmludmFsaWRhdGUpIHtcbiAgICB2YXIgaXNFcXVhbExvY2FscyA9IGZ1bmN0aW9uIGlzRXF1YWxMb2NhbHMoYSwgYiwgaXNOYW1lZEV4cG9ydCkge1xuICBpZiAoIWEgJiYgYiB8fCBhICYmICFiKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciBwO1xuICBmb3IgKHAgaW4gYSkge1xuICAgIGlmIChpc05hbWVkRXhwb3J0ICYmIHAgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoYVtwXSAhPT0gYltwXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICBmb3IgKHAgaW4gYikge1xuICAgIGlmIChpc05hbWVkRXhwb3J0ICYmIHAgPT09IFwiZGVmYXVsdFwiKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tY29udGludWVcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoIWFbcF0pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59O1xuICAgIHZhciBpc05hbWVkRXhwb3J0ID0gIWNvbnRlbnQubG9jYWxzO1xuICAgIHZhciBvbGRMb2NhbHMgPSBpc05hbWVkRXhwb3J0ID8gbmFtZWRFeHBvcnQgOiBjb250ZW50LmxvY2FscztcblxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFxuICAgICAgXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiLFxuICAgICAgZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIWlzRXF1YWxMb2NhbHMob2xkTG9jYWxzLCBpc05hbWVkRXhwb3J0ID8gbmFtZWRFeHBvcnQgOiBjb250ZW50LmxvY2FscywgaXNOYW1lZEV4cG9ydCkpIHtcbiAgICAgICAgICAgICAgICBtb2R1bGUuaG90LmludmFsaWRhdGUoKTtcblxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIG9sZExvY2FscyA9IGlzTmFtZWRFeHBvcnQgPyBuYW1lZEV4cG9ydCA6IGNvbnRlbnQubG9jYWxzO1xuXG4gICAgICAgICAgICAgIHVwZGF0ZShjb250ZW50KTtcbiAgICAgIH1cbiAgICApXG4gIH1cblxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7XG4gICAgdXBkYXRlKCk7XG4gIH0pO1xufVxuXG5cbmV4cG9ydCAqIGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG1lbW8gPSB7fTtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBnZXRUYXJnZXQodGFyZ2V0KSB7XG4gIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgdmFyIHN0eWxlVGFyZ2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuXG4gICAgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuICB9XG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcbiAgaWYgKCF0YXJnZXQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydCcgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuICB9XG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvZ2V0VXJsLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvdHJhZGVndXlzLmVvdD80ODc5MjUwN1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8xX19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL3RyYWRlZ3V5cy53b2ZmMj80ODc5MjUwN1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL3RyYWRlZ3V5cy53b2ZmPzQ4NzkyNTA3XCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzNfX18gPSBuZXcgVVJMKFwiLi4vZm9udHMvdHJhZGVndXlzLnR0Zj80ODc5MjUwN1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF80X19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL3RyYWRlZ3V5cy5zdmc/NDg3OTI1MDdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18sIHsgaGFzaDogXCIjaWVmaXhcIiB9KTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzJfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXywgeyBoYXNoOiBcIiN0cmFkZWd1eXNcIiB9KTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBgQGZvbnQtZmFjZXtmb250LWZhbWlseTp0cmFkZWd1eXM7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3NyYzp1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8wX19ffSk7c3JjOnVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX199KSBmb3JtYXQoXCJlbWJlZGRlZC1vcGVudHlwZVwiKSx1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8yX19ffSkgZm9ybWF0KFwid29mZjJcIiksdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfM19fX30pIGZvcm1hdChcIndvZmZcIiksdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNF9fX30pIGZvcm1hdChcInRydWV0eXBlXCIpLHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzVfX199KSBmb3JtYXQoXCJzdmdcIil9W2NsYXNzKj1cIiBpY29uLVwiXTpiZWZvcmUsW2NsYXNzXj1pY29uLV06YmVmb3Jle2ZvbnQtZmFtaWx5OnRyYWRlZ3V5cztmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDo0MDA7c3BlYWs6bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LXZhcmlhbnQ6bm9ybWFsO2xpbmUtaGVpZ2h0OjFlbTttYXJnaW4tbGVmdDouMmVtO21hcmdpbi1yaWdodDouMmVtO3RleHQtYWxpZ246Y2VudGVyO3RleHQtZGVjb3JhdGlvbjppbmhlcml0O3RleHQtdHJhbnNmb3JtOm5vbmU7d2lkdGg6MWVtOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlfS5pY29uLWVtYWlsOmJlZm9yZXtjb250ZW50Olwi7qCBXCJ9Lmljb24tcHJpbnQ6YmVmb3Jle2NvbnRlbnQ6XCLuoIRcIn0uaWNvbi1saW5rOmJlZm9yZXtjb250ZW50Olwi7qCFXCJ9Lmljb24taWNvbl9jaGVjazpiZWZvcmV7Y29udGVudDpcIu6huFwifS5pY29uLXRyYW5zY3JpcHQ6YmVmb3Jle2NvbnRlbnQ6XCLuoptcIn0uaWNvbi15b3V0dWJlOmJlZm9yZXtjb250ZW50Olwi7qaDXCJ9Lmljb24tYW5nbGUtbGVmdDpiZWZvcmV7Y29udGVudDpcIu6mklwifS5pY29uLWFuZ2xlLXJpZ2h0OmJlZm9yZXtjb250ZW50Olwi7qaTXCJ9Lmljb24tYXJyb3ctbGVmdDpiZWZvcmV7Y29udGVudDpcIu6mnVwifS5pY29uLWFycm93LXJpZ2h0OmJlZm9yZXtjb250ZW50Olwi7qaeXCJ9Lmljb24tY2xvc2UtbGc6YmVmb3Jle2NvbnRlbnQ6XCLupr1cIn0uaWNvbi1wbHVzLWxnOmJlZm9yZXtjb250ZW50Olwi7qqBXCJ9Lmljb24tcnNzOmJlZm9yZXtjb250ZW50Olwi7q+uXCJ9Lmljb24tdmlkZW86YmVmb3Jle2NvbnRlbnQ6XCLur7BcIn0uaWNvbi1xdW90ZTpiZWZvcmV7Y29udGVudDpcIu6vsVwifS5pY29uLW1lbnU6YmVmb3Jle2NvbnRlbnQ6XCLur7JcIn0uaWNvbi1wYXVzZTpiZWZvcmV7Y29udGVudDpcIu+AjlwifS5pY29uLXBsYXk6YmVmb3Jle2NvbnRlbnQ6XCLvgI9cIn0uaWNvbi1saW5rZWRpbjpiZWZvcmV7Y29udGVudDpcIu+DoVwifS5pY29uLWNoYXJ0LWxpbmU6YmVmb3Jle2NvbnRlbnQ6XCLviIFcIn0uaWNvbi1mYWNlYm9vazpiZWZvcmV7Y29udGVudDpcIu+IsVwifS5pY29uLWdvb2dsZTpiZWZvcmV7Y29udGVudDpcIu+ItFwifS5pY29uLXR3aXR0ZXI6YmVmb3Jle2NvbnRlbnQ6XCLviYNcIn0uaWNvbi1wbHVzOmJlZm9yZXtjb250ZW50Olwi74uHXCJ9Lmljb24tY2xvc2U6YmVmb3Jle2NvbnRlbnQ6XCLvi5dcIn0uaWNvbi1zZWFyY2g6YmVmb3Jle2NvbnRlbnQ6XCLvi7VcIn0uaWNvbi1leHRlcm5hbDpiZWZvcmV7Y29udGVudDpcIu+OnFwifS5pY29uLXNoYXJlOmJlZm9yZXtjb250ZW50Olwi746sXCJ9Ym9keXstLWJyZWFrcG9pbnQ6XCJ4c21hbGxcIjtjb2xvcjojMDAwO2ZvbnQtZmFtaWx5OlNvdXJjZSBTYW5zIFBybyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O21hcmdpbjowOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7Ym9keXstLWJyZWFrcG9pbnQ6XCJzbWFsbFwifX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjQ4ZW0pe2JvZHl7LS1icmVha3BvaW50OlwibWVkaXVtXCJ9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6NjRlbSl7Ym9keXstLWJyZWFrcG9pbnQ6XCJsYXJnZVwifX1we21hcmdpbjowIDAgMS41cmVtfXN1cHtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LS40ZW07dmVydGljYWwtYWxpZ246YmFzZWxpbmV9LnBvc3QtY29udGVudCBvbCBhLC5wb3N0LWNvbnRlbnQgdWwgYSxwIGF7Ym9yZGVyLWJvdHRvbToxcHggZGFzaGVkICMwMDB9YXtjb2xvcjppbmhlcml0O3RleHQtZGVjb3JhdGlvbjpub25lO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlLWluLW91dH1hOmZvY3Vze291dGxpbmU6dGhpbiBkb3R0ZWR9YTphY3RpdmUsYTpob3ZlcntvdXRsaW5lOjB9LnBvc3QtY29udGVudCBvbCBhLC5wb3N0LWNvbnRlbnQgdWwgYSxwIGF7YmFja2dyb3VuZC1pbWFnZTpsaW5lYXItZ3JhZGllbnQodHJhbnNwYXJlbnQgMjAlLCNlYWUxMzQgMCk7YmFja2dyb3VuZC1yZXBlYXQ6bm8tcmVwZWF0O2JhY2tncm91bmQtc2l6ZTowIDEwMCU7dHJhbnNpdGlvbjphbGwgLjJzIGVhc2UtaW4tb3V0O3dpZHRoOjEwMCV9LnBvc3QtY29udGVudCBvbCBhOmhvdmVyLC5wb3N0LWNvbnRlbnQgdWwgYTpob3ZlcixwIGE6aG92ZXJ7YmFja2dyb3VuZC1zaXplOjEwMCUgMTAwJX11bHtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luOjA7cGFkZGluZy1pbmxpbmUtc3RhcnQ6MjRweH11bCBsaXtmb250LWZhbWlseTpJbmNvbnNvbGF0YSxtb25vc3BhY2V9dWwgbGk6YmVmb3Jle2NvbnRlbnQ6XCLilohcIjtkaXNwbGF5OmlubGluZS1ibG9jaztmb250LWZhbWlseTpTb3VyY2UgU2FucyBQcm8sc2Fucy1zZXJpZjtmb250LXdlaWdodDo3MDA7bGluZS1oZWlnaHQ6MTttYXJnaW4tbGVmdDotMS41cmVtO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotLjFyZW07d2lkdGg6MXJlbX11bCBsaS5jaGluYTpiZWZvcmV7Y29sb3I6I2ZlNTAwMH11bCBsaS5ldTpiZWZvcmV7Y29sb3I6IzBhYTRjZn11bCBsaS5tZXhpY286YmVmb3Jle2NvbG9yOiNmMmFmMTl9dWwgbGkuY2FuYWRhOmJlZm9yZXtjb2xvcjojOWViMDQwfS50b29sdGlwLC50b29sdGlwLWluZm97YmFja2dyb3VuZC1jb2xvcjojZmZmO2JvcmRlcjoxcHggc29saWQgI2IzYjNiMztib3JkZXItcmFkaXVzOjNweDtkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTouODc1cmVtO2hlaWdodDphdXRvO2xpbmUtaGVpZ2h0OjEuNDttYXJnaW46MCAxNXB4O21heC13aWR0aDoxNzVweDtvcGFjaXR5OjA7cGFkZGluZzo4cHggOHB4IDEwcHg7cG9pbnRlci1ldmVudHM6bm9uZTtwb3NpdGlvbjphYnNvbHV0ZTt2aXNpYmlsaXR5OmhpZGRlbjt3aWR0aDotbW96LWZpdC1jb250ZW50O3dpZHRoOmZpdC1jb250ZW50O3otaW5kZXg6MjB9LnRvb2x0aXAgcCwudG9vbHRpcC1pbmZvIHB7bWFyZ2luOjB9LnRvb2x0aXAgLnRvb2x0aXAtaGVhZGluZywudG9vbHRpcC1pbmZvIC50b29sdGlwLWhlYWRpbmd7Ym9yZGVyLWJvdHRvbToxcHggc29saWQgIzAwMDtmb250LXdlaWdodDo3MDA7bGluZS1oZWlnaHQ6MS40O21hcmdpbi1ib3R0b206LjVyZW07dGV4dC1hbGlnbjpjZW50ZXI7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LnRvb2x0aXAgLnRvb2x0aXAtaGVhZGluZywudG9vbHRpcC1pbmZvIC50b29sdGlwLWhlYWRpbmd7bGluZS1oZWlnaHQ6MS40fX0udG9vbHRpcCAudG9vbHRpcC1oZWFkaW5nIC5sb2NhdGlvbiwudG9vbHRpcC1pbmZvIC50b29sdGlwLWhlYWRpbmcgLmxvY2F0aW9ue2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjEwcHg7Zm9udC1zaXplOi42MjVyZW07Zm9udC1zdHlsZTppdGFsaWN9LnRvb2x0aXAgLnRvb2x0aXAtbGFiZWwsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1sYWJlbHt0ZXh0LXRyYW5zZm9ybTpjYXBpdGFsaXplfS50b29sdGlwIC50b29sdGlwLWxhYmVsLmluZGVudGVkLC50b29sdGlwLWluZm8gLnRvb2x0aXAtbGFiZWwuaW5kZW50ZWR7cGFkZGluZy1sZWZ0Oi43NXJlbX0udG9vbHRpcCAudG9vbHRpcC1saXN0IGxpLC50b29sdGlwLWluZm8gLnRvb2x0aXAtbGlzdCBsaXtmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbX0udG9vbHRpcCAudG9vbHRpcC1saXN0IGxpOmJlZm9yZSwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxpc3QgbGk6YmVmb3Jle2ZvbnQtc2l6ZTo5cHg7Zm9udC1zaXplOi41NjI1cmVtfS50b29sdGlwIC50b29sdGlwLWxpc3QgLmFjdGl2ZS1jYXRlZ29yeSwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxpc3QgLmFjdGl2ZS1jYXRlZ29yeXtmb250LXdlaWdodDo3MDB9LnRvb2x0aXAgLnRvb2x0aXAtY2xvc2UsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1jbG9zZXtkaXNwbGF5OmJsb2NrO2ZvbnQtd2VpZ2h0OjcwMDtwb2ludGVyLWV2ZW50czphbGw7cG9zaXRpb246YWJzb2x1dGU7cmlnaHQ6LjVyZW07dGV4dC1hbGlnbjpyaWdodDt0b3A6LjI1cmVtO3dpZHRoOjI1JTt6LWluZGV4OjI1fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LnRvb2x0aXAgLnRvb2x0aXAtY2xvc2UsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1jbG9zZXtkaXNwbGF5Om5vbmV9fS50b29sdGlwLWluZm97bWF4LXdpZHRoOjEwMHB4fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LnRvb2x0aXAtaW5mb3ttYXgtd2lkdGg6MzAwcHh9fS5sZWdlbmQtbGFiZWx7Zm9udC1mYW1pbHk6SW5jb25zb2xhdGEsbW9ub3NwYWNlfS5sZWdlbmQtbGFiZWw6YmVmb3Jle2JvcmRlcjoxcHggc29saWQgIzAwMDtjb250ZW50OlwiXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7aGVpZ2h0OjFyZW07bWFyZ2luLXJpZ2h0Oi41cmVtO3RyYW5zaXRpb246LjJzO3ZlcnRpY2FsLWFsaWduOi0uMmVtO3dpZHRoOjFyZW19LmxlZ2VuZC1sYWJlbC5hbGw6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2VhZTEzNH0ubGVnZW5kLWxhYmVsLmNoaW5hOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZTUwMDB9LmxlZ2VuZC1sYWJlbC5jYW5hZGE6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6IzllYjA0MH0ubGVnZW5kLWxhYmVsLmV1OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiMwYWE0Y2Z9LmxlZ2VuZC1sYWJlbC5tZXhpY286YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2YyYWYxOX1pbnB1dHtib3gtc2l6aW5nOmJvcmRlci1ib3g7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtO2xlZnQ6MnB4O2xpbmUtaGVpZ2h0OjEuNzg7bWFyZ2luOjA7b3BhY2l0eTowO3BhZGRpbmc6MDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MXB4fWlucHV0Om5vdCg6Y2hlY2tlZCl7Y3Vyc29yOnBvaW50ZXJ9aW5wdXQ6Y2hlY2tlZCtsYWJlbDphZnRlcntjb2xvcjojMDAwO2NvbnRlbnQ6XCLuobhcIjtjdXJzb3I6cG9pbnRlcjtmb250LWZhbWlseTp0cmFkZWd1eXM7Zm9udC13ZWlnaHQ6NzAwO2xlZnQ6MXB4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxcHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDozNWVtKXsuY2hhcnR7d2lkdGg6MTA1JX0uY2hhcnQgZm9yZWlnbk9iamVjdCBkaXZ7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTRweCl9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LmNoYXJ0e21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG87bWF4LXdpZHRoOjcwMHB4fX0uY2hhcnQgc3ZnIC5zdGF0ZU1vZGFse2ZvbnQtZmFtaWx5OkluY29uc29sYXRhLG1vbm9zcGFjZTtmb250LXNpemU6MTIuNXB4O2ZvbnQtc2l6ZTouNzgxMjVyZW07bGluZS1oZWlnaHQ6MS42fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LmNoYXJ0IHN2ZyAuc3RhdGVNb2RhbHtmb250LXNpemU6MThweDtmb250LXNpemU6MS4xMjVyZW19fS5jaGFydCBzdmcgLnN0YXRlTW9kYWwgLm1vZGFsLWhlYWRpbmd7Zm9udC1mYW1pbHk6U291cmNlIFNhbnMgUHJvLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW07Zm9udC13ZWlnaHQ6NzAwO2xldHRlci1zcGFjaW5nOjEuNHB4fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LmNoYXJ0IHN2ZyAuc3RhdGVNb2RhbCAubW9kYWwtaGVhZGluZ3tmb250LXNpemU6MjRweDtmb250LXNpemU6MS41cmVtfX0uY2hhcnQgc3ZnIC5zdGF0ZU1vZGFsIHVsIGxpOmJlZm9yZXtmb250LXNpemU6MTJweDtmb250LXNpemU6Ljc1cmVtfS5jaGFydCBzdmcgLmdyb3Vwe2N1cnNvcjp6b29tLWlufS5jaGFydCBzdmcgLmdyb3VwIC5sYWJlbHtmb250LXNpemU6MTJweDtmb250LXNpemU6Ljc1cmVtO2ZpbGw6IzAwMDtzdHJva2U6I2ZmZjtwYWludC1vcmRlcjpzdHJva2U7c3Ryb2tlLXdpZHRoOjNweDtmb250LXdlaWdodDo4MDA7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO3RyYW5zaXRpb246YWxsIC4ycyBlYXNlLWluLW91dH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5jaGFydCBzdmcgLmdyb3VwIC5sYWJlbHtmb250LXNpemU6MThweDtmb250LXNpemU6MS4xMjVyZW19fS5jaGFydCBzdmcgLmdyb3VwIC5zdGF0ZXt0cmFuc2l0aW9uOmFsbCAuMnMgZWFzZS1pbi1vdXR9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDozNWVtKXsuY2hhcnQgc3ZnIC5ncm91cCAuc3RhdGV7c3Ryb2tlLXdpZHRoOjIhaW1wb3J0YW50fS5jaGFydCBzdmcgLmdyb3VwIC5wZXJjZW50e3N0cm9rZS13aWR0aDowIWltcG9ydGFudH19LmNoYXJ0IHN2ZyAuZ3JvdXA6aG92ZXIgLnN0YXRle3N0cm9rZTojZWFlMTM0fS5sZWdlbmR7bWFyZ2luOjI0cHggMTJweCAxMnB4fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LmxlZ2VuZHttYXJnaW46MjRweCAwIDEycHh9fS5sZWdlbmQgLmxlZ2VuZC10aXRsZXtmbGV4LWJhc2lzOjEwMCU7Zm9udC1mYW1pbHk6SW5jb25zb2xhdGEsbW9ub3NwYWNlO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTouODc1cmVtO2ZvbnQtd2VpZ2h0OjQwMDtsZXR0ZXItc3BhY2luZzoxLjJweDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2V9LmxlZ2VuZD4uZGlyZWN0aW9ue2ZsZXgtYmFzaXM6MTAwJTtmb250LXNpemU6MTJweDtmb250LXNpemU6Ljc1cmVtO2ZvbnQtc3R5bGU6aXRhbGljO21hcmdpbi10b3A6NnB4fS5sZWdlbmQgLmNvbnRhaW5lcnthbGlnbi1pdGVtczpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcnthbGlnbi1pdGVtczpjZW50ZXI7YmFja2dyb3VuZC1jb2xvcjojZmZmO2Rpc3BsYXk6bm9uZTtmbGV4LXdyYXA6d3JhcDtmb250LWZhbWlseTpJbmNvbnNvbGF0YSxtb25vc3BhY2U7bGluZS1oZWlnaHQ6MS4yO3BhZGRpbmc6NnB4O3Bvc2l0aW9uOnJlbGF0aXZlfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LmxlZ2VuZCAuY29udGFpbmVyIC5sZWdlbmQtYmFye2Rpc3BsYXk6ZmxleDtmbGV4OjAgMCAyMjRweDttYXJnaW4tbGVmdDozNnB4O3dpZHRoOjEwMCV9LmxlZ2VuZCAuY29udGFpbmVyIC5sZWdlbmQtYmFyOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiMwMDA7Y29udGVudDpcIlwiO2Rpc3BsYXk6YmxvY2s7aGVpZ2h0OjEyMCU7bGVmdDotMjRweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MDt3aWR0aDoxcHh9fS5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcj5kaXZ7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW07cGFkZGluZy1sZWZ0OjEycHh9LmxlZ2VuZCAuY29udGFpbmVyIC5sZWdlbmQtYmFyPmRpdiAubWluLW1heHtmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbX0ubGVnZW5kIC5jb250YWluZXIgLmNvdW50cmllc3thbGlnbi1pdGVtczpjZW50ZXI7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LmxlZ2VuZCAuY29udGFpbmVyIC5jb3VudHJpZXN7ZmxleDowIDAgY2FsYygxMDAlIC0gMzAwcHgpfX0ubGVnZW5kIC5jb250YWluZXIgLmNvdW50cmllcyAubGVnZW5kLWl0ZW17Ym94LXNpemluZzpib3JkZXItYm94O2Rpc3BsYXk6ZmxleDtmbGV4OjEgMCA0NyU7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW07bWFyZ2luOjAgNnB4IDZweCAwO3Bvc2l0aW9uOnJlbGF0aXZlfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7LmxlZ2VuZCAuY29udGFpbmVyIC5jb3VudHJpZXMgLmxlZ2VuZC1pdGVte2ZsZXg6MSAwIGF1dG87bWFyZ2luOjAgNnB4IDAgMH19Ym9keT46bm90KC50b29sdGlwKTpub3QoLmNoYXJ0KXttYXJnaW4tbGVmdDoxMnB4O21hcmdpbi1yaWdodDoxMnB4O21heC13aWR0aDo3MDBweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pe2JvZHk+Om5vdCgudG9vbHRpcCk6bm90KC5jaGFydCl7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b319Ym9keSAuaW50ZXJhY3RpdmVfX2hlYWRlcntib3JkZXItYm90dG9tOjA7bWFyZ2luOjFyZW0gYXV0bztwYWRkaW5nLWJvdHRvbToxLjI1cmVtfWJvZHkgLmludGVyYWN0aXZlX19oZWFkZXIgLmludGVyYWN0aXZlX190aXRsZXtjb2xvcjojMDAwO2ZvbnQtZmFtaWx5OlNvdXJjZSBTYW5zIFBybyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToyMHB4O2ZvbnQtc2l6ZToxLjI1cmVtO2ZvbnQtd2VpZ2h0OjcwMDtsZXR0ZXItc3BhY2luZzoxLjRweDtsaW5lLWhlaWdodDoxLjM2O3RleHQtYWxpZ246Y2VudGVyfWJvZHkgLmludGVyYWN0aXZlX19oZWFkZXIgcHtmb250LXNpemU6MTZweDtmb250LXNpemU6MXJlbTtsaW5lLWhlaWdodDoxLjc4fWJvZHkgLmludGVyYWN0aXZlX19maWx0ZXJze21hcmdpbjowIGF1dG8gMXJlbX1ib2R5IC5pbnRlcmFjdGl2ZV9fZmlsdGVycyAuc2VhcmNoX19zdWdnZXN0aW9uc3ttYXJnaW4tYm90dG9tOjA7bWFyZ2luLXRvcDozcHh9Ym9keSAuaW50ZXJhY3RpdmVfX2dyYXBoaWN7bWFyZ2luOjAgYXV0bzttYXgtd2lkdGg6MTI1MHB4O3Bvc2l0aW9uOnJlbGF0aXZlfWJvZHkgLmludGVyYWN0aXZlX19zb3VyY2V7Ym9yZGVyLXRvcDoxcHggc29saWQgIzAwMDttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvO3BhZGRpbmctYm90dG9tOjJyZW19Ym9keSAuaW50ZXJhY3RpdmVfX3NvdXJjZSBwe2NvbG9yOiM0YTRhNGE7Zm9udC1mYW1pbHk6U291cmNlIFNhbnMgUHJvLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOi44NzVyZW07bWFyZ2luOi41cmVtIDAgMH1ib2R5IC5pbnN0cnVjdGlvbnN7Ym9yZGVyLXRvcDoxcHggc29saWQgI2IzYjNiMztjb2xvcjojNGE0YTRhO2ZvbnQtc2l6ZTouOXJlbTtmb250LXN0eWxlOml0YWxpYzttYXJnaW4tdG9wOjZweDtwYWRkaW5nOi41cmVtIDAgMDt0ZXh0LWFsaWduOmNlbnRlcn1ib2R5IC5pbnN0cnVjdGlvbnMgc3BhbntkaXNwbGF5Om5vbmV9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDozNWVtKXtib2R5IC5pbnN0cnVjdGlvbnMgc3BhbntkaXNwbGF5OmlubGluZS1ibG9ja319YCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9tYWluLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2Jhc2UvX3ZhcmlhYmxlcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9iYXNlL19iYXNlLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2Jhc2UvX21peGlucy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL190b29sdGlwcy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jb21wb25lbnRzL19mb3JtLWVsZW1lbnRzLnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2N1c3RvbS9fY2hhcnQuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY3VzdG9tL19sYXlvdXQuc2Nzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQSxXQ2dDQSxxQkFDRSxDQVFBLGlCQUNBLENBUEEsZUFNQSxDQVJBLDJDQUNBLENBQUEsdVNBUUEsQ0FBQSwrQ0FHRixxQkFFRSxDQUFBLGlCQUNBLENBQUEsZUFDQSxDQUFBLFVBQ0EsQ0FBQSxvQkFFQSxDQUlBLG1CQUlBLENBQ0EsZUFHQSxDQUFBLGdCQUlBLENBZEEsaUJBQ0EsQ0FBQSxpQkFDQSxDQUpBLHVCQUNBLENBT0EsbUJBQ0EsQ0FSQSxTQUNBLENBY0Esa0NBTUEsQ0FBQSxpQ0FDQSxDQUFBLG1CQUtGLFdBQ0UsQ0FBQSxtQkFFRixXQUNFLENBQUEs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QSxvQkFDQSxDSmJKLGdCSVlJLENBSUEsaUJBQ0EsQ0FBQSw0QkFJQSxjQUNrQixDQUFBLGNKdEJ0QixDSW9CRSxnQkpwQkYsQ0FBQSwyQkkwQkEsa0JBQ0UsQ0FBQSxnREFHRSxlQUNBLENBRkYsY0FFRSxDQUFBLDJCQU1GLGFBQ0EsQ0FGQSxnQkFDQSxDQUZGLGlCQUdFLENBQUEsMEJBTUEseUJBQ0EsQ0FKRixnQkFDRSxDQUFBLGlCQUNBLENBQUEsbUJBRUEsQ0FBQSw0Qk45QlUsYUFsQlAsQ0VHTCxzQ0ZlWSxDTWlDUixjQUNrQixDQUFBLGlCSmpEdEIsQ0krQ0UsZ0JObERHLENBQUEsbUJNNkRILDRCQUNBLENBQ0EsYU4vREcsQ00yREgsZUFDQSxDQUZGLGlCQUNFLENBQ0EsY0FDQSxDQUNBLGlCQUNBLENOL0RHLGlCTWlFSCxDQUFBLHdCQUVBLFlBQ0UsQ0FBQSxtQ0oxQ0Ysd0JJeUNBLG9CQUdJLENBQUFcIixcInNvdXJjZXNDb250ZW50XCI6W1wiQGZvbnQtZmFjZXtmb250LWZhbWlseTpcXFwidHJhZGVndXlzXFxcIjtzcmM6dXJsKFxcXCIuLi9mb250cy90cmFkZWd1eXMuZW90PzQ4NzkyNTA3XFxcIik7c3JjOnVybChcXFwiLi4vZm9udHMvdHJhZGVndXlzLmVvdD80ODc5MjUwNyNpZWZpeFxcXCIpIGZvcm1hdChcXFwiZW1iZWRkZWQtb3BlbnR5cGVcXFwiKSx1cmwoXFxcIi4uL2ZvbnRzL3RyYWRlZ3V5cy53b2ZmMj80ODc5MjUwN1xcXCIpIGZvcm1hdChcXFwid29mZjJcXFwiKSx1cmwoXFxcIi4uL2ZvbnRzL3RyYWRlZ3V5cy53b2ZmPzQ4NzkyNTA3XFxcIikgZm9ybWF0KFxcXCJ3b2ZmXFxcIiksdXJsKFxcXCIuLi9mb250cy90cmFkZWd1eXMudHRmPzQ4NzkyNTA3XFxcIikgZm9ybWF0KFxcXCJ0cnVldHlwZVxcXCIpLHVybChcXFwiLi4vZm9udHMvdHJhZGVndXlzLnN2Zz80ODc5MjUwNyN0cmFkZWd1eXNcXFwiKSBmb3JtYXQoXFxcInN2Z1xcXCIpO2ZvbnQtd2VpZ2h0Om5vcm1hbDtmb250LXN0eWxlOm5vcm1hbH1bY2xhc3NePWljb24tXTpiZWZvcmUsW2NsYXNzKj1cXFwiIGljb24tXFxcIl06YmVmb3Jle2ZvbnQtZmFtaWx5OlxcXCJ0cmFkZWd1eXNcXFwiO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0Om5vcm1hbDtzcGVhazpub25lO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3RleHQtZGVjb3JhdGlvbjppbmhlcml0O3dpZHRoOjFlbTttYXJnaW4tcmlnaHQ6LjJlbTt0ZXh0LWFsaWduOmNlbnRlcjtmb250LXZhcmlhbnQ6bm9ybWFsO3RleHQtdHJhbnNmb3JtOm5vbmU7bGluZS1oZWlnaHQ6MWVtO21hcmdpbi1sZWZ0Oi4yZW07LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGV9Lmljb24tZW1haWw6YmVmb3Jle2NvbnRlbnQ6XFxcIu6ggVxcXCJ9Lmljb24tcHJpbnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIu6ghFxcXCJ9Lmljb24tbGluazpiZWZvcmV7Y29udGVudDpcXFwi7qCFXFxcIn0uaWNvbi1pY29uX2NoZWNrOmJlZm9yZXtjb250ZW50OlxcXCLuobhcXFwifS5pY29uLXRyYW5zY3JpcHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIu6im1xcXCJ9Lmljb24teW91dHViZTpiZWZvcmV7Y29udGVudDpcXFwi7qaDXFxcIn0uaWNvbi1hbmdsZS1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCLuppJcXFwifS5pY29uLWFuZ2xlLXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCLuppNcXFwifS5pY29uLWFycm93LWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XFxcIu6mnVxcXCJ9Lmljb24tYXJyb3ctcmlnaHQ6YmVmb3Jle2NvbnRlbnQ6XFxcIu6mnlxcXCJ9Lmljb24tY2xvc2UtbGc6YmVmb3Jle2NvbnRlbnQ6XFxcIu6mvVxcXCJ9Lmljb24tcGx1cy1sZzpiZWZvcmV7Y29udGVudDpcXFwi7qqBXFxcIn0uaWNvbi1yc3M6YmVmb3Jle2NvbnRlbnQ6XFxcIu6vrlxcXCJ9Lmljb24tdmlkZW86YmVmb3Jle2NvbnRlbnQ6XFxcIu6vsFxcXCJ9Lmljb24tcXVvdGU6YmVmb3Jle2NvbnRlbnQ6XFxcIu6vsVxcXCJ9Lmljb24tbWVudTpiZWZvcmV7Y29udGVudDpcXFwi7q+yXFxcIn0uaWNvbi1wYXVzZTpiZWZvcmV7Y29udGVudDpcXFwi74COXFxcIn0uaWNvbi1wbGF5OmJlZm9yZXtjb250ZW50OlxcXCLvgI9cXFwifS5pY29uLWxpbmtlZGluOmJlZm9yZXtjb250ZW50OlxcXCLvg6FcXFwifS5pY29uLWNoYXJ0LWxpbmU6YmVmb3Jle2NvbnRlbnQ6XFxcIu+IgVxcXCJ9Lmljb24tZmFjZWJvb2s6YmVmb3Jle2NvbnRlbnQ6XFxcIu+IsVxcXCJ9Lmljb24tZ29vZ2xlOmJlZm9yZXtjb250ZW50OlxcXCLviLRcXFwifS5pY29uLXR3aXR0ZXI6YmVmb3Jle2NvbnRlbnQ6XFxcIu+Jg1xcXCJ9Lmljb24tcGx1czpiZWZvcmV7Y29udGVudDpcXFwi74uHXFxcIn0uaWNvbi1jbG9zZTpiZWZvcmV7Y29udGVudDpcXFwi74uXXFxcIn0uaWNvbi1zZWFyY2g6YmVmb3Jle2NvbnRlbnQ6XFxcIu+LtVxcXCJ9Lmljb24tZXh0ZXJuYWw6YmVmb3Jle2NvbnRlbnQ6XFxcIu+OnFxcXCJ9Lmljb24tc2hhcmU6YmVmb3Jle2NvbnRlbnQ6XFxcIu+OrFxcXCJ9Ym9keXstLWJyZWFrcG9pbnQ6IFxcXCJ4c21hbGxcXFwiO2ZvbnQtZmFtaWx5OlxcXCJTb3VyY2UgU2FucyBQcm9cXFwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjE2cHg7bWFyZ2luOjA7Y29sb3I6IzAwMDstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXtib2R5ey0tYnJlYWtwb2ludDogXFxcInNtYWxsXFxcIn19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNDhlbSl7Ym9keXstLWJyZWFrcG9pbnQ6IFxcXCJtZWRpdW1cXFwifX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiA2NGVtKXtib2R5ey0tYnJlYWtwb2ludDogXFxcImxhcmdlXFxcIn19cHttYXJnaW46MCAwIDEuNXJlbX1zdXB7dmVydGljYWwtYWxpZ246YmFzZWxpbmU7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0wLjRlbX1wIGEsLnBvc3QtY29udGVudCB1bCBhLC5wb3N0LWNvbnRlbnQgb2wgYXtib3JkZXItYm90dG9tOjFweCBkYXNoZWQgIzAwMH1he2NvbG9yOmluaGVyaXQ7dGV4dC1kZWNvcmF0aW9uOm5vbmU7dHJhbnNpdGlvbjphbGwgLjNzIGVhc2UtaW4tb3V0fWE6Zm9jdXN7b3V0bGluZTp0aGluIGRvdHRlZH1hOmhvdmVyLGE6YWN0aXZle291dGxpbmU6MH1wIGEsLnBvc3QtY29udGVudCB1bCBhLC5wb3N0LWNvbnRlbnQgb2wgYXt3aWR0aDoxMDAlO2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDIwJSwgI2VhZTEzNCAyMCUpO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6MCUgMTAwJTt0cmFuc2l0aW9uOmFsbCAuMnMgZWFzZS1pbi1vdXR9cCBhOmhvdmVyLC5wb3N0LWNvbnRlbnQgdWwgYTpob3ZlciwucG9zdC1jb250ZW50IG9sIGE6aG92ZXJ7YmFja2dyb3VuZC1zaXplOjEwMCUgMTAwJX11bHttYXJnaW46MDtwYWRkaW5nLWlubGluZS1zdGFydDoyNHB4O2xpc3Qtc3R5bGU6bm9uZX11bCBsaXtmb250LWZhbWlseTpcXFwiSW5jb25zb2xhdGFcXFwiLG1vbm9zcGFjZX11bCBsaTpiZWZvcmV7Zm9udC1mYW1pbHk6XFxcIlNvdXJjZSBTYW5zIFByb1xcXCIsc2Fucy1zZXJpZjtmb250LXdlaWdodDpib2xkO2xpbmUtaGVpZ2h0OjE7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0wLjFyZW07ZGlzcGxheTppbmxpbmUtYmxvY2s7d2lkdGg6MXJlbTttYXJnaW4tbGVmdDotMS41cmVtO2NvbnRlbnQ6XFxcIuKWiFxcXCJ9dWwgbGkuY2hpbmE6OmJlZm9yZXtjb2xvcjojZmU1MDAwfXVsIGxpLmV1OjpiZWZvcmV7Y29sb3I6IzBhYTRjZn11bCBsaS5tZXhpY286OmJlZm9yZXtjb2xvcjojZjJhZjE5fXVsIGxpLmNhbmFkYTo6YmVmb3Jle2NvbG9yOiM5ZWIwNDB9LnRvb2x0aXAsLnRvb2x0aXAtaW5mb3tkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTowLjg3NXJlbTtsaW5lLWhlaWdodDoxLjQ7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoyMDt2aXNpYmlsaXR5OmhpZGRlbjt3aWR0aDpmaXQtY29udGVudDttYXgtd2lkdGg6MTc1cHg7aGVpZ2h0OmF1dG87bWFyZ2luOjAgMTVweDtwYWRkaW5nOjhweCA4cHggMTBweDtwb2ludGVyLWV2ZW50czpub25lO29wYWNpdHk6MDtib3JkZXI6MXB4IHNvbGlkICNiM2IzYjM7Ym9yZGVyLXJhZGl1czozcHg7YmFja2dyb3VuZC1jb2xvcjojZmZmfS50b29sdGlwIHAsLnRvb2x0aXAtaW5mbyBwe21hcmdpbjowfS50b29sdGlwIC50b29sdGlwLWhlYWRpbmcsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1oZWFkaW5ne3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtsaW5lLWhlaWdodDoxLjQ7Zm9udC13ZWlnaHQ6Ym9sZDttYXJnaW4tYm90dG9tOi41cmVtO3RleHQtYWxpZ246Y2VudGVyO2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMwMDB9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7LnRvb2x0aXAgLnRvb2x0aXAtaGVhZGluZywudG9vbHRpcC1pbmZvIC50b29sdGlwLWhlYWRpbmd7bGluZS1oZWlnaHQ6MS40fX0udG9vbHRpcCAudG9vbHRpcC1oZWFkaW5nIC5sb2NhdGlvbiwudG9vbHRpcC1pbmZvIC50b29sdGlwLWhlYWRpbmcgLmxvY2F0aW9ue2Rpc3BsYXk6YmxvY2s7Zm9udC1zaXplOjEwcHg7Zm9udC1zaXplOjAuNjI1cmVtO2ZvbnQtc3R5bGU6aXRhbGljfS50b29sdGlwIC50b29sdGlwLWxhYmVsLC50b29sdGlwLWluZm8gLnRvb2x0aXAtbGFiZWx7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZX0udG9vbHRpcCAudG9vbHRpcC1sYWJlbC5pbmRlbnRlZCwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxhYmVsLmluZGVudGVke3BhZGRpbmctbGVmdDouNzVyZW19LnRvb2x0aXAgLnRvb2x0aXAtbGlzdCBsaSwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxpc3QgbGl7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOjAuODc1cmVtfS50b29sdGlwIC50b29sdGlwLWxpc3QgbGk6YmVmb3JlLC50b29sdGlwLWluZm8gLnRvb2x0aXAtbGlzdCBsaTpiZWZvcmV7Zm9udC1zaXplOjlweDtmb250LXNpemU6MC41NjI1cmVtfS50b29sdGlwIC50b29sdGlwLWxpc3QgLmFjdGl2ZS1jYXRlZ29yeSwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxpc3QgLmFjdGl2ZS1jYXRlZ29yeXtmb250LXdlaWdodDpib2xkfS50b29sdGlwIC50b29sdGlwLWNsb3NlLC50b29sdGlwLWluZm8gLnRvb2x0aXAtY2xvc2V7Zm9udC13ZWlnaHQ6Ym9sZDtwb3NpdGlvbjphYnNvbHV0ZTt6LWluZGV4OjI1O3RvcDouMjVyZW07cmlnaHQ6LjVyZW07ZGlzcGxheTpibG9jazt3aWR0aDoyNSU7dGV4dC1hbGlnbjpyaWdodDtwb2ludGVyLWV2ZW50czphbGx9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7LnRvb2x0aXAgLnRvb2x0aXAtY2xvc2UsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1jbG9zZXtkaXNwbGF5Om5vbmV9fS50b29sdGlwLWluZm97bWF4LXdpZHRoOjEwMHB4fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey50b29sdGlwLWluZm97bWF4LXdpZHRoOjMwMHB4fX0ubGVnZW5kLWxhYmVse2ZvbnQtZmFtaWx5OlxcXCJJbmNvbnNvbGF0YVxcXCIsbW9ub3NwYWNlfS5sZWdlbmQtbGFiZWw6YmVmb3Jle2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjFyZW07aGVpZ2h0OjFyZW07bWFyZ2luLXJpZ2h0Oi41cmVtO2NvbnRlbnQ6XFxcIlxcXCI7dHJhbnNpdGlvbjouMnM7dmVydGljYWwtYWxpZ246LTAuMmVtO2JvcmRlcjoxcHggc29saWQgIzAwMH0ubGVnZW5kLWxhYmVsLmFsbDpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojZWFlMTM0fS5sZWdlbmQtbGFiZWwuY2hpbmE6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2ZlNTAwMH0ubGVnZW5kLWxhYmVsLmNhbmFkYTpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojOWViMDQwfS5sZWdlbmQtbGFiZWwuZXU6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6IzBhYTRjZn0ubGVnZW5kLWxhYmVsLm1leGljbzpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojZjJhZjE5fWlucHV0e2ZvbnQtc2l6ZToxOHB4O2ZvbnQtc2l6ZToxLjEyNXJlbTtsaW5lLWhlaWdodDoxLjc4O3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxcHg7bGVmdDoycHg7Ym94LXNpemluZzpib3JkZXItYm94O21hcmdpbjowO3BhZGRpbmc6MDtvcGFjaXR5OjB9aW5wdXQ6bm90KDpjaGVja2VkKXtjdXJzb3I6cG9pbnRlcn1pbnB1dDpjaGVja2VkK2xhYmVsOjphZnRlcntmb250LWZhbWlseTpcXFwidHJhZGVndXlzXFxcIjtmb250LXdlaWdodDpib2xkO3Bvc2l0aW9uOmFic29sdXRlO3RvcDoxcHg7bGVmdDoxcHg7Y29udGVudDpcXFwi7qG4XFxcIjtjdXJzb3I6cG9pbnRlcjtjb2xvcjojMDAwfUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM1ZW0pey5jaGFydHt3aWR0aDoxMDUlfS5jaGFydCBmb3JlaWduT2JqZWN0IGRpdnt0cmFuc2Zvcm06dHJhbnNsYXRlWCgtNHB4KX19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7LmNoYXJ0e21heC13aWR0aDo3MDBweDttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfX0uY2hhcnQgc3ZnIC5zdGF0ZU1vZGFse2ZvbnQtZmFtaWx5OlxcXCJJbmNvbnNvbGF0YVxcXCIsbW9ub3NwYWNlO2xpbmUtaGVpZ2h0OjEuNjtmb250LXNpemU6MTIuNXB4O2ZvbnQtc2l6ZTowLjc4MTI1cmVtfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey5jaGFydCBzdmcgLnN0YXRlTW9kYWx7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtfX0uY2hhcnQgc3ZnIC5zdGF0ZU1vZGFsIC5tb2RhbC1oZWFkaW5ne2ZvbnQtZmFtaWx5OlxcXCJTb3VyY2UgU2FucyBQcm9cXFwiLHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6Ym9sZDtsZXR0ZXItc3BhY2luZzoxLjRweDtmb250LXNpemU6MTZweDtmb250LXNpemU6MXJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXsuY2hhcnQgc3ZnIC5zdGF0ZU1vZGFsIC5tb2RhbC1oZWFkaW5ne2ZvbnQtc2l6ZToyNHB4O2ZvbnQtc2l6ZToxLjVyZW19fS5jaGFydCBzdmcgLnN0YXRlTW9kYWwgdWwgbGk6YmVmb3Jle2ZvbnQtc2l6ZToxMnB4O2ZvbnQtc2l6ZTowLjc1cmVtfS5jaGFydCBzdmcgLmdyb3Vwe2N1cnNvcjp6b29tLWlufS5jaGFydCBzdmcgLmdyb3VwIC5sYWJlbHtmb250LXNpemU6MTJweDtmb250LXNpemU6MC43NXJlbTtmaWxsOiMwMDA7c3Ryb2tlOiNmZmY7cGFpbnQtb3JkZXI6c3Ryb2tlO3N0cm9rZS13aWR0aDozcHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlO2ZvbnQtd2VpZ2h0OjgwMDt0cmFuc2l0aW9uOmFsbCAuMnMgZWFzZS1pbi1vdXR9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7LmNoYXJ0IHN2ZyAuZ3JvdXAgLmxhYmVse2ZvbnQtc2l6ZToxOHB4O2ZvbnQtc2l6ZToxLjEyNXJlbX19LmNoYXJ0IHN2ZyAuZ3JvdXAgLnN0YXRle3RyYW5zaXRpb246YWxsIC4ycyBlYXNlLWluLW91dH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNWVtKXsuY2hhcnQgc3ZnIC5ncm91cCAuc3RhdGV7c3Ryb2tlLXdpZHRoOjIgIWltcG9ydGFudH19QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzVlbSl7LmNoYXJ0IHN2ZyAuZ3JvdXAgLnBlcmNlbnR7c3Ryb2tlLXdpZHRoOjAgIWltcG9ydGFudH19LmNoYXJ0IHN2ZyAuZ3JvdXA6aG92ZXIgLnN0YXRle3N0cm9rZTojZWFlMTM0fS5sZWdlbmR7bWFyZ2luOjI0cHggMTJweCAxMnB4fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey5sZWdlbmR7bWFyZ2luOjI0cHggMCAxMnB4fX0ubGVnZW5kIC5sZWdlbmQtdGl0bGV7LW1zLWZsZXgtcHJlZmVycmVkLXNpemU6MTAwJTtmbGV4LWJhc2lzOjEwMCU7Zm9udC1mYW1pbHk6XFxcIkluY29uc29sYXRhXFxcIixtb25vc3BhY2U7Zm9udC13ZWlnaHQ6NDAwO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXNpemU6MTRweDtmb250LXNpemU6MC44NzVyZW07bGV0dGVyLXNwYWNpbmc6MS4ycHh9LmxlZ2VuZD4uZGlyZWN0aW9uey1tcy1mbGV4LXByZWZlcnJlZC1zaXplOjEwMCU7ZmxleC1iYXNpczoxMDAlO2ZvbnQtc3R5bGU6aXRhbGljO2ZvbnQtc2l6ZToxMnB4O2ZvbnQtc2l6ZTowLjc1cmVtO21hcmdpbi10b3A6NnB4fS5sZWdlbmQgLmNvbnRhaW5lcntkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC13cmFwOndyYXA7ZmxleC13cmFwOndyYXA7LW1zLWZsZXgtYWxpZ246Y2VudGVyO2FsaWduLWl0ZW1zOmNlbnRlcn0ubGVnZW5kIC5jb250YWluZXIgLmxlZ2VuZC1iYXJ7Zm9udC1mYW1pbHk6XFxcIkluY29uc29sYXRhXFxcIixtb25vc3BhY2U7bGluZS1oZWlnaHQ6MS4yO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6bm9uZTtwYWRkaW5nOjZweDtiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7LW1zLWZsZXgtd3JhcDp3cmFwO2ZsZXgtd3JhcDp3cmFwOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7LmxlZ2VuZCAuY29udGFpbmVyIC5sZWdlbmQtYmFye2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O21hcmdpbi1sZWZ0OjM2cHg7d2lkdGg6MTAwJTstbXMtZmxleDowIDAgMjI0cHg7ZmxleDowIDAgMjI0cHh9LmxlZ2VuZCAuY29udGFpbmVyIC5sZWdlbmQtYmFyOmJlZm9yZXtjb250ZW50OlxcXCJcXFwiO2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7bGVmdDotMjRweDt3aWR0aDoxcHg7aGVpZ2h0OjEyMCU7YmFja2dyb3VuZC1jb2xvcjojMDAwfX0ubGVnZW5kIC5jb250YWluZXIgLmxlZ2VuZC1iYXI+ZGl2e3BhZGRpbmctbGVmdDoxMnB4O2ZvbnQtc2l6ZToxNnB4O2ZvbnQtc2l6ZToxcmVtfS5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcj5kaXYgLm1pbi1tYXh7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOjAuODc1cmVtfS5sZWdlbmQgLmNvbnRhaW5lciAuY291bnRyaWVze2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4Oy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXI7LW1zLWZsZXgtd3JhcDp3cmFwO2ZsZXgtd3JhcDp3cmFwfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey5sZWdlbmQgLmNvbnRhaW5lciAuY291bnRyaWVzey1tcy1mbGV4OjAgMCBjYWxjKDEwMCUgLSAzMDBweCk7ZmxleDowIDAgY2FsYygxMDAlIC0gMzAwcHgpfX0ubGVnZW5kIC5jb250YWluZXIgLmNvdW50cmllcyAubGVnZW5kLWl0ZW17Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW07cG9zaXRpb246cmVsYXRpdmU7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7Ym94LXNpemluZzpib3JkZXItYm94O21hcmdpbjowIDZweCA2cHggMDstbXMtZmxleDoxIDAgNDclO2ZsZXg6MSAwIDQ3JX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXsubGVnZW5kIC5jb250YWluZXIgLmNvdW50cmllcyAubGVnZW5kLWl0ZW17LW1zLWZsZXg6MSAwIGF1dG87ZmxleDoxIDAgYXV0bzttYXJnaW46MCA2cHggMCAwfX1ib2R5Pio6bm90KC50b29sdGlwKTpub3QoLmNoYXJ0KXttYXgtd2lkdGg6NzAwcHg7bWFyZ2luLWxlZnQ6MTJweDttYXJnaW4tcmlnaHQ6MTJweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXtib2R5Pio6bm90KC50b29sdGlwKTpub3QoLmNoYXJ0KXttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvfX1ib2R5IC5pbnRlcmFjdGl2ZV9faGVhZGVye21hcmdpbjoxcmVtIGF1dG87cGFkZGluZy1ib3R0b206MS4yNXJlbTtib3JkZXItYm90dG9tOjB9Ym9keSAuaW50ZXJhY3RpdmVfX2hlYWRlciAuaW50ZXJhY3RpdmVfX3RpdGxle2ZvbnQtZmFtaWx5OlxcXCJTb3VyY2UgU2FucyBQcm9cXFwiLHNhbnMtc2VyaWY7Zm9udC1zaXplOjIwcHg7Zm9udC1zaXplOjEuMjVyZW07bGluZS1oZWlnaHQ6MS4zNjtsZXR0ZXItc3BhY2luZzoxLjRweDtjb2xvcjojMDAwO2ZvbnQtd2VpZ2h0OmJvbGQ7dGV4dC1hbGlnbjpjZW50ZXJ9Ym9keSAuaW50ZXJhY3RpdmVfX2hlYWRlciBwe2xpbmUtaGVpZ2h0OjEuNzg7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW19Ym9keSAuaW50ZXJhY3RpdmVfX2ZpbHRlcnN7bWFyZ2luOjAgYXV0byAxcmVtfWJvZHkgLmludGVyYWN0aXZlX19maWx0ZXJzIC5zZWFyY2hfX3N1Z2dlc3Rpb25ze21hcmdpbi10b3A6M3B4O21hcmdpbi1ib3R0b206MH1ib2R5IC5pbnRlcmFjdGl2ZV9fZ3JhcGhpY3twb3NpdGlvbjpyZWxhdGl2ZTttYXgtd2lkdGg6MTI1MHB4O21hcmdpbjowIGF1dG99Ym9keSAuaW50ZXJhY3RpdmVfX3NvdXJjZXttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvO3BhZGRpbmctYm90dG9tOjJyZW07Ym9yZGVyLXRvcDoxcHggc29saWQgIzAwMH1ib2R5IC5pbnRlcmFjdGl2ZV9fc291cmNlIHB7bWFyZ2luOi41cmVtIDAgMDtmb250LXNpemU6MTRweDtmb250LXNpemU6MC44NzVyZW07Zm9udC1mYW1pbHk6XFxcIlNvdXJjZSBTYW5zIFByb1xcXCIsc2Fucy1zZXJpZjtjb2xvcjojNGE0YTRhfWJvZHkgLmluc3RydWN0aW9uc3tmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6LjlyZW07bWFyZ2luLXRvcDo2cHg7Ym9yZGVyLXRvcDoxcHggc29saWQgI2IzYjNiMztwYWRkaW5nOi41cmVtIDAgMDtjb2xvcjojNGE0YTRhO3RleHQtYWxpZ246Y2VudGVyfWJvZHkgLmluc3RydWN0aW9ucyBzcGFue2Rpc3BsYXk6bm9uZX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXtib2R5IC5pbnN0cnVjdGlvbnMgc3BhbntkaXNwbGF5OmlubGluZS1ibG9ja319XCIsXCIkYmxhY2s6ICMwMDA7XFxuJHdoaXRlOiAjZmZmO1xcbiRvZmYtd2hpdGU6ICNmN2Y0ZjE7XFxuJG9mZi13aGl0ZS1kYXJrOiAjZWFlNmUxO1xcbiR5ZWxsb3c6ICNlYWUxMzQ7XFxuJGRhcmsteWVsbG93OiAjY2ZjODNhO1xcbiRyZWQ6ICNmZTUwMDA7XFxuJGdyZWVuOiAjOWViMDQwO1xcbiRibHVlOiAjMGFhNGNmO1xcbiRvcmFuZ2U6ICNmMmFmMTk7XFxuJHB1cnBsZTogI2ExNjg5YztcXG4kZ3JheTogIzRhNGE0YTtcXG4kZGFyay1ncmF5OiAjMzUzNTM1O1xcbiRkaXNhYmxlZC1ncmF5OiAjYjNiM2IzO1xcblxcbiRjb2xvcl9mb290ZXItY29udGFjdC10ZXh0OiAjZTBlMWUyO1xcbiRjb2xvcl9mb290ZXItY29weXJpZ2h0LXRleHQ6ICMwOTA5MDk7XFxuJGNvbG9yX3Bvc3QtbGlzdC1ib3JkZXI6ICRkaXNhYmxlZC1ncmF5O1xcbiRjb2xvcl9hdWRpby1wbGF5ZXItcHJvZ3Jlc3MtYmFyOiAkZGlzYWJsZWQtZ3JheTtcXG4kY29sb3JfYXVkaW8tcGxheWVyLXRyYW5zY3JpcHQtYm94OiAkb2ZmLXdoaXRlLWRhcms7XFxuJGNvbG9yX2F1ZGlvLXBsYXllci10cmFuc2NyaXB0LWJveC1zaGFkb3c6IHJnYmEoMCwgMCwgMCwgMC4yKTtcXG4kY29sb3JfaG9tZS10cmFkZS1ndXktdGl0bGU6ICM0NDQ7XFxuXFxuJGJyb3dzZXItY29udGV4dDogMTZweDtcXG4vKi0tLS0tLS0tLS0gIFN0cnVjdHVyYWwgIC0tLS0tLS0tLS0qL1xcbiRzaXplLW1heC13aWR0aDogNzAwcHg7XFxuXFxuLyotLS0tLS0tLS0tICBGb250cyAgLS0tLS0tLS0tLSovXFxuJGZvbnRfaW5jb25zb2xhdGE6ICdJbmNvbnNvbGF0YScsIG1vbm9zcGFjZTtcXG4kZm9udF9zb3VyY2U6ICdTb3VyY2UgU2FucyBQcm8nLCBzYW5zLXNlcmlmO1xcbiRmb250ZWxsb191cmw6ICcuLi9mb250cy8nO1xcblxcbkBmb250LWZhY2Uge1xcbiAgZm9udC1mYW1pbHk6ICd0cmFkZWd1eXMnO1xcbiAgc3JjOiB1cmwoJyN7JGZvbnRlbGxvX3VybH10cmFkZWd1eXMuZW90PzQ4NzkyNTA3Jyk7XFxuICBzcmM6IHVybCgnI3skZm9udGVsbG9fdXJsfXRyYWRlZ3V5cy5lb3Q/NDg3OTI1MDcjaWVmaXgnKVxcbiAgICAgIGZvcm1hdCgnZW1iZWRkZWQtb3BlbnR5cGUnKSxcXG4gICAgdXJsKCcjeyRmb250ZWxsb191cmx9dHJhZGVndXlzLndvZmYyPzQ4NzkyNTA3JykgZm9ybWF0KCd3b2ZmMicpLFxcbiAgICB1cmwoJyN7JGZvbnRlbGxvX3VybH10cmFkZWd1eXMud29mZj80ODc5MjUwNycpIGZvcm1hdCgnd29mZicpLFxcbiAgICB1cmwoJyN7JGZvbnRlbGxvX3VybH10cmFkZWd1eXMudHRmPzQ4NzkyNTA3JykgZm9ybWF0KCd0cnVldHlwZScpLFxcbiAgICB1cmwoJyN7JGZvbnRlbGxvX3VybH10cmFkZWd1eXMuc3ZnPzQ4NzkyNTA3I3RyYWRlZ3V5cycpIGZvcm1hdCgnc3ZnJyk7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbn1cXG5cXG5bY2xhc3NePSdpY29uLSddOmJlZm9yZSxcXG5bY2xhc3MqPScgaWNvbi0nXTpiZWZvcmUge1xcbiAgZm9udC1mYW1pbHk6ICd0cmFkZWd1eXMnO1xcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIHNwZWFrOiBub25lO1xcblxcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBpbmhlcml0O1xcbiAgd2lkdGg6IDFlbTtcXG4gIG1hcmdpbi1yaWdodDogMC4yZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAvKiBvcGFjaXR5OiAuODsgKi9cXG5cXG4gIC8qIEZvciBzYWZldHkgLSByZXNldCBwYXJlbnQgc3R5bGVzLCB0aGF0IGNhbiBicmVhayBnbHlwaCBjb2RlcyovXFxuICBmb250LXZhcmlhbnQ6IG5vcm1hbDtcXG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xcblxcbiAgLyogZml4IGJ1dHRvbnMgaGVpZ2h0LCBmb3IgdHdpdHRlciBib290c3RyYXAgKi9cXG4gIGxpbmUtaGVpZ2h0OiAxZW07XFxuXFxuICAvKiBBbmltYXRpb24gY2VudGVyIGNvbXBlbnNhdGlvbiAtIG1hcmdpbnMgc2hvdWxkIGJlIHN5bW1ldHJpYyAqL1xcbiAgLyogcmVtb3ZlIGlmIG5vdCBuZWVkZWQgKi9cXG4gIG1hcmdpbi1sZWZ0OiAwLjJlbTtcXG5cXG4gIC8qIHlvdSBjYW4gYmUgbW9yZSBjb21mb3J0YWJsZSB3aXRoIGluY3JlYXNlZCBpY29ucyBzaXplICovXFxuICAvKiBmb250LXNpemU6IDEyMCU7ICovXFxuXFxuICAvKiBGb250IHNtb290aGluZy4gVGhhdCB3YXMgdGFrZW4gZnJvbSBUV0JTICovXFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuXFxuICAvKiBVbmNvbW1lbnQgZm9yIDNEIGVmZmVjdCAqL1xcbiAgLyogdGV4dC1zaGFkb3c6IDFweCAxcHggMXB4IHJnYmEoMTI3LCAxMjcsIDEyNywgMC4zKTsgKi9cXG59XFxuLmljb24tZW1haWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZTgwMSc7XFxufSAvKiAn7qCBJyAqL1xcbi5pY29uLXByaW50OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU4MDQnO1xcbn0gLyogJ+6ghCcgKi9cXG4uaWNvbi1saW5rOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU4MDUnO1xcbn0gLyogJ+6ghScgKi9cXG4uaWNvbi1pY29uX2NoZWNrOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU4NzgnO1xcbn0gLyogJ+6huCcgKi9cXG4uaWNvbi10cmFuc2NyaXB0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU4OWInO1xcbn0gLyogJ+6imycgKi9cXG4uaWNvbi15b3V0dWJlOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU5ODMnO1xcbn0gLyogJ+6mgycgKi9cXG4uaWNvbi1hbmdsZS1sZWZ0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU5OTInO1xcbn0gLyogJ+6mkicgKi9cXG4uaWNvbi1hbmdsZS1yaWdodDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlOTkzJztcXG59IC8qICfuppMnICovXFxuLmljb24tYXJyb3ctbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlOTlkJztcXG59IC8qICfupp0nICovXFxuLmljb24tYXJyb3ctcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZTk5ZSc7XFxufSAvKiAn7qaeJyAqL1xcbi5pY29uLWNsb3NlLWxnOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU5YmQnO1xcbn0gLyogJ+6mvScgKi9cXG4uaWNvbi1wbHVzLWxnOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGVhODEnO1xcbn0gLyogJ+6qgScgKi9cXG4uaWNvbi1yc3M6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZWJlZSc7XFxufSAvKiAn7q+uJyAqL1xcbi5pY29uLXZpZGVvOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGViZjAnO1xcbn0gLyogJ+6vsCcgKi9cXG4uaWNvbi1xdW90ZTpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlYmYxJztcXG59IC8qICfur7EnICovXFxuLmljb24tbWVudTpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlYmYyJztcXG59IC8qICfur7InICovXFxuLmljb24tcGF1c2U6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZjAwZSc7XFxufSAvKiAn74COJyAqL1xcbi5pY29uLXBsYXk6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZjAwZic7XFxufSAvKiAn74CPJyAqL1xcbi5pY29uLWxpbmtlZGluOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYwZTEnO1xcbn0gLyogJ++DoScgKi9cXG4uaWNvbi1jaGFydC1saW5lOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYyMDEnO1xcbn0gLyogJ++IgScgKi9cXG4uaWNvbi1mYWNlYm9vazpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMjMxJztcXG59IC8qICfviLEnICovXFxuLmljb24tZ29vZ2xlOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYyMzQnO1xcbn0gLyogJ++ItCcgKi9cXG4uaWNvbi10d2l0dGVyOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYyNDMnO1xcbn0gLyogJ++JgycgKi9cXG4uaWNvbi1wbHVzOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYyYzcnO1xcbn0gLyogJ++LhycgKi9cXG4uaWNvbi1jbG9zZTpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMmQ3JztcXG59IC8qICfvi5cnICovXFxuLmljb24tc2VhcmNoOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYyZjUnO1xcbn0gLyogJ++LtScgKi9cXG4uaWNvbi1leHRlcm5hbDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMzljJztcXG59IC8qICfvjpwnICovXFxuLmljb24tc2hhcmU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZjNhYyc7XFxufSAvKiAn746sJyAqL1xcblwiLFwiQHVzZSAndmFyaWFibGVzJyBhcyAqO1xcbkB1c2UgJ21peGlucycgYXMgKjtcXG5cXG5ib2R5IHtcXG4gIC0tYnJlYWtwb2ludDogJ3hzbWFsbCc7XFxuICBmb250LWZhbWlseTogJGZvbnQtc291cmNlO1xcbiAgZm9udC1zaXplOiAkYnJvd3Nlci1jb250ZXh0O1xcbiAgbWFyZ2luOiAwO1xcbiAgY29sb3I6ICRibGFjaztcXG4gIC13ZWJraXQtZm9udC1zbW9vdGhpbmc6IGFudGlhbGlhc2VkO1xcbiAgLW1vei1vc3gtZm9udC1zbW9vdGhpbmc6IGdyYXlzY2FsZTtcXG5cXG4gIEBpbmNsdWRlIGJyZWFrcG9pbnQoc21hbGwpIHtcXG4gICAgLS1icmVha3BvaW50OiAnc21hbGwnO1xcbiAgfVxcblxcbiAgQGluY2x1ZGUgYnJlYWtwb2ludChtZWRpdW0pIHtcXG4gICAgLS1icmVha3BvaW50OiAnbWVkaXVtJztcXG4gIH1cXG5cXG4gIEBpbmNsdWRlIGJyZWFrcG9pbnQobGFyZ2UpIHtcXG4gICAgLS1icmVha3BvaW50OiAnbGFyZ2UnO1xcbiAgfVxcbn1cXG5cXG5wIHtcXG4gIG1hcmdpbjogMCAwIDEuNXJlbTtcXG59XFxuXFxuc3VwIHtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIHRvcDogLTAuNGVtO1xcbn1cXG5cXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuPSAgICAgICAgICAgIExpbmtzICAgICAgICAgICAgPVxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cXG5cXG4lZGFzaGVkLXVuZGVybGluZSB7XFxuICBib3JkZXItYm90dG9tOiAxcHggZGFzaGVkICRibGFjaztcXG59XFxuXFxuJWV4dGVybmFsLWxpbmtzIHtcXG4gIGFbaHJlZio9XFxcIi8vXFxcIl06bm90KFtocmVmKj1cXFwidHJhZGVndXlzLmNzaXMub3JnXFxcIl0pIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBtYXJnaW4tbGVmdDogMS41cmVtO1xcbiAgICAmOjpiZWZvcmUge1xcbiAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICBsZWZ0OiAtMS41cmVtO1xcbiAgICAgIGNvbnRlbnQ6ICdcXFxcZjM5Yyc7XFxuICAgICAgZm9udC1mYW1pbHk6ICd0cmFkZWd1eXMnO1xcbiAgICB9XFxuICB9XFxufVxcblxcbmEge1xcbiAgY29sb3I6IGluaGVyaXQ7XFxuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4zcyBlYXNlLWluLW91dDtcXG5cXG4gICY6dmlzaXRlZCB7XFxuICB9XFxuICAmOmhvdmVyLFxcbiAgJjpmb2N1cyxcXG4gICY6YWN0aXZlIHtcXG4gIH1cXG4gICY6Zm9jdXMge1xcbiAgICBvdXRsaW5lOiB0aGluIGRvdHRlZDtcXG4gIH1cXG4gICY6aG92ZXIsXFxuICAmOmFjdGl2ZSB7XFxuICAgIG91dGxpbmU6IDA7XFxuICB9XFxuXFxuICBwICYsXFxuICAucG9zdC1jb250ZW50IHVsICYsXFxuICAucG9zdC1jb250ZW50IG9sICYge1xcbiAgICBAZXh0ZW5kICVkYXNoZWQtdW5kZXJsaW5lO1xcbiAgICBAaW5jbHVkZSB3aXBlLWxpbmstaG92ZXItYmFja2dyb3VuZCgkeWVsbG93KTtcXG4gIH1cXG59XFxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbj0gICAgICAgICAgICBMaXN0cyAgICAgICAgICAgID1cXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXFxudWwge1xcbiAgbWFyZ2luOiAwO1xcbiAgcGFkZGluZy1pbmxpbmUtc3RhcnQ6IDI0cHg7XFxuICBsaXN0LXN0eWxlOiBub25lO1xcblxcbiAgbGkge1xcbiAgICBmb250LWZhbWlseTogJGZvbnRfaW5jb25zb2xhdGE7XFxuICAgICY6YmVmb3JlIHtcXG4gICAgICBmb250LWZhbWlseTogJGZvbnRfc291cmNlO1xcbiAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxO1xcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICB0b3A6IC0wLjFyZW07XFxuICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIHdpZHRoOiAxcmVtO1xcbiAgICAgIG1hcmdpbi1sZWZ0OiAtMS41cmVtO1xcbiAgICAgIGNvbnRlbnQ6ICdcXFxcMjU4OCc7XFxuICAgIH1cXG5cXG4gICAgJi5jaGluYTo6YmVmb3JlIHtcXG4gICAgICBjb2xvcjogJHJlZDtcXG4gICAgfVxcbiAgICAmLmV1OjpiZWZvcmUge1xcbiAgICAgIGNvbG9yOiAkYmx1ZTtcXG4gICAgfVxcbiAgICAmLm1leGljbzo6YmVmb3JlIHtcXG4gICAgICBjb2xvcjogJG9yYW5nZTtcXG4gICAgfVxcbiAgICAmLmNhbmFkYTo6YmVmb3JlIHtcXG4gICAgICBjb2xvcjogJGdyZWVuO1xcbiAgICB9XFxuICB9XFxufVxcblwiLFwiLyoqXFxuICogTWl4aW5zXFxuICovXFxuQHVzZSAnc2FzczptYXRoJztcXG5AdXNlICd2YXJpYWJsZXMnIGFzICo7XFxuLy8gUmVtIG91dHB1dCB3aXRoIHB4IGZhbGxiYWNrXFxuXFxuQGZ1bmN0aW9uIGNhbGN1bGF0ZVJlbSgkc2l6ZSkge1xcbiAgJHJlbVNpemU6IG1hdGguZGl2KCRzaXplLCAkYnJvd3Nlci1jb250ZXh0KTtcXG4gIEByZXR1cm4gI3skcmVtU2l6ZX1yZW07XFxufVxcblxcbkBtaXhpbiBmb250U2l6ZSgkc2l6ZSkge1xcbiAgZm9udC1zaXplOiAkc2l6ZTsgLy9GYWxsYmFjayBpbiBweFxcbiAgZm9udC1zaXplOiBjYWxjdWxhdGVSZW0oJHNpemUpO1xcbn1cXG5cXG4kYnJlYWtwb2ludC14bGFyZ2U6IDkwZW07XFxuJGJyZWFrcG9pbnQtbGFyZ2U6IDY0ZW07XFxuJGJyZWFrcG9pbnQtbWVkaXVtOiA0OGVtO1xcbiRicmVha3BvaW50LXNtYWxsOiAzNWVtO1xcbiRicmVha3BvaW50LXhzbWFsbDogMjVlbTtcXG5cXG5AbWl4aW4gYnJlYWtwb2ludCgkYnJlYWspIHtcXG4gIEBpZiAkYnJlYWsgPT0geGxhcmdlIHtcXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJGJyZWFrcG9pbnQteGxhcmdlKSB7XFxuICAgICAgQGNvbnRlbnQ7XFxuICAgIH1cXG4gIH0gQGVsc2UgaWYgJGJyZWFrID09IGxhcmdlIHtcXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJGJyZWFrcG9pbnQtbGFyZ2UpIHtcXG4gICAgICBAY29udGVudDtcXG4gICAgfVxcbiAgfSBAZWxzZSBpZiAkYnJlYWsgPT0gbWVkaXVtIHtcXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJGJyZWFrcG9pbnQtbWVkaXVtKSB7XFxuICAgICAgQGNvbnRlbnQ7XFxuICAgIH1cXG4gIH0gQGVsc2UgaWYgJGJyZWFrID09IHNtYWxsIHtcXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJGJyZWFrcG9pbnQtc21hbGwpIHtcXG4gICAgICBAY29udGVudDtcXG4gICAgfVxcbiAgfSBAZWxzZSBpZiAkYnJlYWsgPT0geHNtYWxsIHtcXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogJGJyZWFrcG9pbnQteHNtYWxsKSB7XFxuICAgICAgQGNvbnRlbnQ7XFxuICAgIH1cXG4gIH0gQGVsc2Uge1xcbiAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAkYnJlYWspIHtcXG4gICAgICBAY29udGVudDtcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG5AbWl4aW4gd2lwZS1saW5rLWJhY2tncm91bmQoJGJhY2tncm91bmQtY29sb3I6ICR5ZWxsb3cpIHtcXG4gIGJhY2tncm91bmQtaW1hZ2U6IGxpbmVhci1ncmFkaWVudChcXG4gICAgdG8gdG9wLFxcbiAgICAkYmFja2dyb3VuZC1jb2xvciA3NSUsXFxuICAgIHRyYW5zcGFyZW50IDAlXFxuICApO1xcbiAgYmFja2dyb3VuZC1wb3NpdGlvbjogdW5zZXQ7XFxuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXG59XFxuXFxuQG1peGluIHdpcGUtbGluay1ob3Zlci1iYWNrZ3JvdW5kKCRiYWNrZ3JvdW5kLWNvbG9yOiAkeWVsbG93LCAkd2lkdGg6IDEwMCUpIHtcXG4gIHdpZHRoOiAkd2lkdGg7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIHRyYW5zcGFyZW50IGNhbGMoMjAlKSxcXG4gICAgJGJhY2tncm91bmQtY29sb3IgMjAlXFxuICApO1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IG5vLXJlcGVhdDtcXG4gIGJhY2tncm91bmQtc2l6ZTogMCUgMTAwJTtcXG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcblxcbiAgJjpob3ZlciB7XFxuICAgIGJhY2tncm91bmQtc2l6ZTogMTAwJSAxMDAlO1xcbiAgfVxcbn1cXG5cIixcIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG49ICAgICAgICAgICAgVG9vbHRpcHMgICAgICAgICAgICA9XFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xcbkB1c2UgJ2Jhc2UvbWl4aW5zJyBhcyAqO1xcbkB1c2UgJ2Jhc2UvdmFyaWFibGVzJyBhcyAqO1xcblxcbi50b29sdGlwLFxcbi50b29sdGlwLWluZm8ge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBAaW5jbHVkZSBmb250U2l6ZSgxNHB4KTtcXG4gIGxpbmUtaGVpZ2h0OiAxLjQ7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB6LWluZGV4OiAyMDtcXG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcXG4gIHdpZHRoOiBmaXQtY29udGVudDtcXG4gIG1heC13aWR0aDogMTc1cHg7XFxuICBoZWlnaHQ6IGF1dG87XFxuICBtYXJnaW46IDAgMTVweDtcXG4gIHBhZGRpbmc6IDhweCA4cHggMTBweDtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbiAgb3BhY2l0eTogMDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkICRkaXNhYmxlZC1ncmF5O1xcbiAgYm9yZGVyLXJhZGl1czogM3B4O1xcbiAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcblxcbiAgcCB7XFxuICAgIG1hcmdpbjogMDtcXG4gIH1cXG5cXG4gIC50b29sdGlwLWhlYWRpbmcge1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBsaW5lLWhlaWdodDogMS40O1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgbWFyZ2luLWJvdHRvbTogMC41cmVtO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAkYmxhY2s7XFxuXFxuICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjQ7XFxuICAgIH1cXG5cXG4gICAgLmxvY2F0aW9uIHtcXG4gICAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgICBAaW5jbHVkZSBmb250U2l6ZSgxMHB4KTtcXG4gICAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC50b29sdGlwLWxhYmVsIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XFxuXFxuICAgICYuaW5kZW50ZWQge1xcbiAgICAgIHBhZGRpbmctbGVmdDogMC43NXJlbTtcXG4gICAgfVxcbiAgfVxcblxcbiAgLnRvb2x0aXAtbGlzdCB7XFxuICAgIGxpIHtcXG4gICAgICBAaW5jbHVkZSBmb250U2l6ZSgxNHB4KTtcXG5cXG4gICAgICAmOmJlZm9yZSB7XFxuICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSg5cHgpO1xcbiAgICAgIH1cXG4gICAgfVxcblxcbiAgICAuYWN0aXZlLWNhdGVnb3J5IHtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgfVxcbiAgfVxcblxcbiAgLnRvb2x0aXAtY2xvc2Uge1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB6LWluZGV4OiAyNTtcXG4gICAgdG9wOiAwLjI1cmVtO1xcbiAgICByaWdodDogMC41cmVtO1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG4gICAgd2lkdGg6IDI1JTtcXG4gICAgdGV4dC1hbGlnbjogcmlnaHQ7XFxuICAgIHBvaW50ZXItZXZlbnRzOiBhbGw7XFxuXFxuICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuLnRvb2x0aXAtaW5mbyB7XFxuICBtYXgtd2lkdGg6IDEwMHB4O1xcblxcbiAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgIG1heC13aWR0aDogMzAwcHg7XFxuICB9XFxufVxcblwiLFwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuPSAgICAgICAgICAgIEZvcm0gRWxlbWVudHMgICAgICAgICAgICA9XFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXFxuQHVzZSAnYmFzZS9taXhpbnMnIGFzICo7XFxuQHVzZSAnYmFzZS92YXJpYWJsZXMnIGFzICo7XFxuXFxuLmxlZ2VuZC1sYWJlbCB7XFxuICBmb250LWZhbWlseTogJGZvbnRfaW5jb25zb2xhdGE7XFxuICAmOmJlZm9yZSB7XFxuICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgd2lkdGg6IDFyZW07XFxuICAgIGhlaWdodDogMXJlbTtcXG4gICAgbWFyZ2luLXJpZ2h0OiAwLjVyZW07XFxuICAgIGNvbnRlbnQ6ICcnO1xcbiAgICB0cmFuc2l0aW9uOiAwLjJzO1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogLTAuMmVtO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCRibGFjaztcXG4gIH1cXG5cXG4gICYuYWxsOmJlZm9yZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICR5ZWxsb3c7XFxuICB9XFxuICAmLmNoaW5hOmJlZm9yZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRyZWQ7XFxuICB9XFxuICAmLmNhbmFkYTpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkZ3JlZW47XFxuICB9XFxuICAmLmV1OmJlZm9yZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRibHVlO1xcbiAgfVxcbiAgJi5tZXhpY286YmVmb3JlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJG9yYW5nZTtcXG4gIH1cXG59XFxuXFxuaW5wdXQge1xcbiAgQGluY2x1ZGUgZm9udFNpemUoMThweCk7XFxuICBsaW5lLWhlaWdodDogMS43ODtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvcDogMXB4O1xcbiAgbGVmdDogMnB4O1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxuICBvcGFjaXR5OiAwO1xcblxcbiAgJjpub3QoOmNoZWNrZWQpIHtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgfVxcblxcbiAgJjpjaGVja2VkICsgbGFiZWw6OmFmdGVyIHtcXG4gICAgZm9udC1mYW1pbHk6ICd0cmFkZWd1eXMnO1xcbiAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgICB0b3A6IDFweDtcXG4gICAgbGVmdDogMXB4O1xcbiAgICBjb250ZW50OiAnXFxcXGU4NzgnO1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIGNvbG9yOiAkYmxhY2s7XFxuICB9XFxufVxcblwiLFwiLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuPSAgICAgICAgICAgIENoYXJ0ICAgICAgICAgICA9XFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXFxuQHVzZSAnYmFzZS9taXhpbnMnIGFzICo7XFxuQHVzZSAnYmFzZS92YXJpYWJsZXMnIGFzICo7XFxuXFxuc2VjdGlvbiB7XFxufVxcbi5jaGFydCB7XFxuICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNWVtKSB7XFxuICAgIHdpZHRoOiAxMDUlO1xcblxcbiAgICBmb3JlaWduT2JqZWN0IGRpdiB7XFxuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVYKC00cHgpO1xcbiAgICB9XFxuICB9XFxuXFxuICBAaW5jbHVkZSBicmVha3BvaW50KCdzbWFsbCcpIHtcXG4gICAgbWF4LXdpZHRoOiAkc2l6ZS1tYXgtd2lkdGg7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICB9XFxuXFxuICBzdmcge1xcbiAgICAuc3RhdGVNb2RhbCB7XFxuICAgICAgZm9udC1mYW1pbHk6ICRmb250X2luY29uc29sYXRhO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjY7XFxuICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTIuNXB4KTtcXG5cXG4gICAgICBAaW5jbHVkZSBicmVha3BvaW50KCdzbWFsbCcpIHtcXG4gICAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDE4cHgpO1xcbiAgICAgIH1cXG5cXG4gICAgICAubW9kYWwtaGVhZGluZyB7XFxuICAgICAgICBmb250LWZhbWlseTogJGZvbnRfc291cmNlO1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgICBsZXR0ZXItc3BhY2luZzogMS40cHg7XFxuICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgxNnB4KTtcXG5cXG4gICAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgyNHB4KTtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgdWwge1xcbiAgICAgICAgbGkge1xcbiAgICAgICAgICAmOmJlZm9yZSB7XFxuICAgICAgICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTJweCk7XFxuICAgICAgICAgIH1cXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG5cXG4gICAgLmdyb3VwIHtcXG4gICAgICBjdXJzb3I6IHpvb20taW47XFxuXFxuICAgICAgLmxhYmVsIHtcXG4gICAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDEycHgpO1xcbiAgICAgICAgZmlsbDogJGJsYWNrO1xcbiAgICAgICAgc3Ryb2tlOiAkd2hpdGU7XFxuICAgICAgICBwYWludC1vcmRlcjogc3Ryb2tlO1xcbiAgICAgICAgc3Ryb2tlLXdpZHRoOiAzcHg7XFxuICAgICAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICAgICAgZm9udC13ZWlnaHQ6IDgwMDtcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcblxcbiAgICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgICAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDE4cHgpO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG4gICAgICAuc3RhdGUge1xcbiAgICAgICAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZS1pbi1vdXQ7XFxuICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNWVtKSB7XFxuICAgICAgICAgIHN0cm9rZS13aWR0aDogMiAhaW1wb3J0YW50O1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG4gICAgICAucGVyY2VudCB7XFxuICAgICAgICBAbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNWVtKSB7XFxuICAgICAgICAgIHN0cm9rZS13aWR0aDogMCAhaW1wb3J0YW50O1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG4gICAgICAmOmhvdmVyIC5zdGF0ZSB7XFxuICAgICAgICBzdHJva2U6ICNlYWUxMzQ7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxufVxcblxcbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbj0gICAgICAgICAgTGVnZW5kICAgICAgICAgICAgPVxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xcblxcbi5sZWdlbmQge1xcbiAgbWFyZ2luOiAyNHB4IDEycHggMTJweDtcXG5cXG4gIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICBtYXJnaW46IDI0cHggMCAxMnB4O1xcbiAgfVxcblxcbiAgLmxlZ2VuZC10aXRsZSB7XFxuICAgIC1tcy1mbGV4LXByZWZlcnJlZC1zaXplOiAxMDAlO1xcbiAgICBmbGV4LWJhc2lzOiAxMDAlO1xcbiAgICBmb250LWZhbWlseTogJGZvbnRfaW5jb25zb2xhdGE7XFxuICAgIGZvbnQtd2VpZ2h0OiA0MDA7XFxuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICAgIEBpbmNsdWRlIGZvbnRTaXplKDE0cHgpO1xcbiAgICBsZXR0ZXItc3BhY2luZzogMS4ycHg7XFxuICB9XFxuXFxuICA+IC5kaXJlY3Rpb24ge1xcbiAgICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogMTAwJTtcXG4gICAgZmxleC1iYXNpczogMTAwJTtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICBAaW5jbHVkZSBmb250U2l6ZSgxMnB4KTtcXG4gICAgbWFyZ2luLXRvcDogNnB4O1xcbiAgfVxcblxcbiAgLmNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICAtbXMtZmxleC13cmFwOiB3cmFwO1xcbiAgICBmbGV4LXdyYXA6IHdyYXA7XFxuICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAgIC5sZWdlbmQtYmFyIHtcXG4gICAgICBmb250LWZhbWlseTogJGZvbnRfaW5jb25zb2xhdGE7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuMjtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgZGlzcGxheTogbm9uZTtcXG4gICAgICBwYWRkaW5nOiA2cHg7XFxuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHdoaXRlO1xcbiAgICAgIC1tcy1mbGV4LXdyYXA6IHdyYXA7XFxuICAgICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICAgIC1tcy1mbGV4LWFsaWduOiBjZW50ZXI7XFxuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG5cXG4gICAgICBAaW5jbHVkZSBicmVha3BvaW50KCdzbWFsbCcpIHtcXG4gICAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIG1hcmdpbi1sZWZ0OiAzNnB4O1xcbiAgICAgICAgd2lkdGg6IDEwMCU7XFxuICAgICAgICAtbXMtZmxleDogMCAwIDIyNHB4O1xcbiAgICAgICAgZmxleDogMCAwIDIyNHB4O1xcblxcbiAgICAgICAgJjpiZWZvcmUge1xcbiAgICAgICAgICBjb250ZW50OiAnJztcXG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgICAgICAgdG9wOiAwO1xcbiAgICAgICAgICBsZWZ0OiAtMjRweDtcXG4gICAgICAgICAgd2lkdGg6IDFweDtcXG4gICAgICAgICAgaGVpZ2h0OiAxMjAlO1xcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmxhY2s7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcbiAgICAgID4gZGl2IHtcXG4gICAgICAgIHBhZGRpbmctbGVmdDogMTJweDtcXG4gICAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDE2cHgpO1xcblxcbiAgICAgICAgLm1pbi1tYXgge1xcbiAgICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgxNHB4KTtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG5cXG4gICAgLmNvdW50cmllcyB7XFxuICAgICAgZGlzcGxheTogLW1zLWZsZXhib3g7XFxuICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgICAgLW1zLWZsZXgtd3JhcDogd3JhcDtcXG4gICAgICBmbGV4LXdyYXA6IHdyYXA7XFxuXFxuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgICAgICAtbXMtZmxleDogMCAwIGNhbGMoMTAwJSAtIDMwMHB4KTtcXG4gICAgICAgIGZsZXg6IDAgMCBjYWxjKDEwMCUgLSAzMDBweCk7XFxuICAgICAgfVxcblxcbiAgICAgIC5sZWdlbmQtaXRlbSB7XFxuICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgxNnB4KTtcXG4gICAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgICAgZGlzcGxheTogZmxleDtcXG4gICAgICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgICAgICBtYXJnaW46IDAgNnB4IDZweCAwO1xcbiAgICAgICAgLW1zLWZsZXg6IDEgMCA0NyU7XFxuICAgICAgICBmbGV4OiAxIDAgNDclO1xcblxcbiAgICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgICAgICAgIC1tcy1mbGV4OiAxIDAgYXV0bztcXG4gICAgICAgICAgZmxleDogMSAwIGF1dG87XFxuICAgICAgICAgIG1hcmdpbjogMCA2cHggMCAwO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cIixcIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG49ICAgICAgICAgICAgUGFnZSBMYXlvdXQgICAgICAgICAgICA9XFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xcbkB1c2UgJ2Jhc2UvbWl4aW5zJyBhcyAqO1xcbkB1c2UgJ2Jhc2UvdmFyaWFibGVzJyBhcyAqO1xcblxcbmJvZHkge1xcbiAgPiAqOm5vdCgudG9vbHRpcCk6bm90KC5jaGFydCkge1xcbiAgICBtYXgtd2lkdGg6ICRzaXplLW1heC13aWR0aDtcXG4gICAgbWFyZ2luLWxlZnQ6IDEycHg7XFxuICAgIG1hcmdpbi1yaWdodDogMTJweDtcXG5cXG4gICAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgICAgbWFyZ2luLWxlZnQ6IGF1dG87XFxuICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICB9XFxuICB9XFxuXFxuICAuaW50ZXJhY3RpdmVfX2hlYWRlciB7XFxuICAgIG1hcmdpbjogMXJlbSBhdXRvO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMS4yNXJlbTtcXG4gICAgYm9yZGVyLWJvdHRvbTogMDtcXG5cXG4gICAgLmludGVyYWN0aXZlX190aXRsZSB7XFxuICAgICAgZm9udC1mYW1pbHk6ICRmb250X3NvdXJjZTtcXG4gICAgICBAaW5jbHVkZSBmb250U2l6ZSgyMHB4KTtcXG4gICAgICBsaW5lLWhlaWdodDogMS4zNjtcXG4gICAgICBsZXR0ZXItc3BhY2luZzogMS40cHg7XFxuICAgICAgY29sb3I6ICRibGFjaztcXG5cXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIH1cXG5cXG4gICAgcCB7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuNzg7XFxuICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTZweCk7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC5pbnRlcmFjdGl2ZV9fZmlsdGVycyB7XFxuICAgIG1hcmdpbjogMCBhdXRvIDFyZW07XFxuXFxuICAgIC5zZWFyY2hfX3N1Z2dlc3Rpb25zIHtcXG4gICAgICBtYXJnaW4tdG9wOiAzcHg7XFxuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcXG4gICAgfVxcbiAgfVxcblxcbiAgLmludGVyYWN0aXZlX19ncmFwaGljIHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBtYXgtd2lkdGg6IDEyNTBweDtcXG4gICAgbWFyZ2luOiAwIGF1dG87XFxuICB9XFxuXFxuICAuaW50ZXJhY3RpdmVfX3NvdXJjZSB7XFxuICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICBtYXJnaW4tcmlnaHQ6IGF1dG87XFxuICAgIHBhZGRpbmctYm90dG9tOiAycmVtO1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgJGJsYWNrO1xcblxcbiAgICBwIHtcXG4gICAgICBtYXJnaW46IDAuNXJlbSAwIDA7XFxuICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTRweCk7XFxuICAgICAgZm9udC1mYW1pbHk6ICRmb250LXNvdXJjZTtcXG4gICAgICBjb2xvcjogJGdyYXk7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC5pbnN0cnVjdGlvbnMge1xcbiAgICBmb250LXN0eWxlOiBpdGFsaWM7XFxuICAgIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgICBtYXJnaW4tdG9wOiA2cHg7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAkZGlzYWJsZWQtZ3JheTtcXG4gICAgcGFkZGluZzogMC41cmVtIDAgMDtcXG4gICAgY29sb3I6ICRncmF5O1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuXFxuICAgIHNwYW4ge1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgICAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgICAgfVxcbiAgICB9XFxuICB9XFxufVxcblwiXSxcInNvdXJjZVJvb3RcIjpcIlwifV0pO1xuLy8gRXhwb3J0c1xuZXhwb3J0IGRlZmF1bHQgX19fQ1NTX0xPQURFUl9FWFBPUlRfX187XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsImltcG9ydCBhc2NlbmRpbmcgZnJvbSBcIi4vYXNjZW5kaW5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbXBhcmUpIHtcbiAgaWYgKGNvbXBhcmUubGVuZ3RoID09PSAxKSBjb21wYXJlID0gYXNjZW5kaW5nQ29tcGFyYXRvcihjb21wYXJlKTtcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBmdW5jdGlvbihhLCB4LCBsbywgaGkpIHtcbiAgICAgIGlmIChsbyA9PSBudWxsKSBsbyA9IDA7XG4gICAgICBpZiAoaGkgPT0gbnVsbCkgaGkgPSBhLmxlbmd0aDtcbiAgICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgICAgICBpZiAoY29tcGFyZShhW21pZF0sIHgpIDwgMCkgbG8gPSBtaWQgKyAxO1xuICAgICAgICBlbHNlIGhpID0gbWlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxvO1xuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGEsIHgsIGxvLCBoaSkge1xuICAgICAgaWYgKGxvID09IG51bGwpIGxvID0gMDtcbiAgICAgIGlmIChoaSA9PSBudWxsKSBoaSA9IGEubGVuZ3RoO1xuICAgICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgICAgIGlmIChjb21wYXJlKGFbbWlkXSwgeCkgPiAwKSBoaSA9IG1pZDtcbiAgICAgICAgZWxzZSBsbyA9IG1pZCArIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG87XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBhc2NlbmRpbmdDb21wYXJhdG9yKGYpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGQsIHgpIHtcbiAgICByZXR1cm4gYXNjZW5kaW5nKGYoZCksIHgpO1xuICB9O1xufVxuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmdcIjtcbmltcG9ydCBiaXNlY3RvciBmcm9tIFwiLi9iaXNlY3RvclwiO1xuXG52YXIgYXNjZW5kaW5nQmlzZWN0ID0gYmlzZWN0b3IoYXNjZW5kaW5nKTtcbmV4cG9ydCB2YXIgYmlzZWN0UmlnaHQgPSBhc2NlbmRpbmdCaXNlY3QucmlnaHQ7XG5leHBvcnQgdmFyIGJpc2VjdExlZnQgPSBhc2NlbmRpbmdCaXNlY3QubGVmdDtcbmV4cG9ydCBkZWZhdWx0IGJpc2VjdFJpZ2h0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzLCB2YWx1ZW9mKSB7XG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIGkgPSAtMSxcbiAgICAgIHZhbHVlLFxuICAgICAgbWluLFxuICAgICAgbWF4O1xuXG4gIGlmICh2YWx1ZW9mID09IG51bGwpIHtcbiAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBGaW5kIHRoZSBmaXJzdCBjb21wYXJhYmxlIHZhbHVlLlxuICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlc1tpXSkgIT0gbnVsbCAmJiB2YWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBtaW4gPSBtYXggPSB2YWx1ZTtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHsgLy8gQ29tcGFyZSB0aGUgcmVtYWluaW5nIHZhbHVlcy5cbiAgICAgICAgICBpZiAoKHZhbHVlID0gdmFsdWVzW2ldKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobWluID4gdmFsdWUpIG1pbiA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKG1heCA8IHZhbHVlKSBtYXggPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbHNlIHtcbiAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBGaW5kIHRoZSBmaXJzdCBjb21wYXJhYmxlIHZhbHVlLlxuICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlb2YodmFsdWVzW2ldLCBpLCB2YWx1ZXMpKSAhPSBudWxsICYmIHZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIG1pbiA9IG1heCA9IHZhbHVlO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBDb21wYXJlIHRoZSByZW1haW5pbmcgdmFsdWVzLlxuICAgICAgICAgIGlmICgodmFsdWUgPSB2YWx1ZW9mKHZhbHVlc1tpXSwgaSwgdmFsdWVzKSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG1pbiA+IHZhbHVlKSBtaW4gPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChtYXggPCB2YWx1ZSkgbWF4ID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFttaW4sIG1heF07XG59XG4iLCJ2YXIgYXJyYXkgPSBBcnJheS5wcm90b3R5cGU7XG5cbmV4cG9ydCB2YXIgc2xpY2UgPSBhcnJheS5zbGljZTtcbmV4cG9ydCB2YXIgbWFwID0gYXJyYXkubWFwO1xuIiwidmFyIGUxMCA9IE1hdGguc3FydCg1MCksXG4gICAgZTUgPSBNYXRoLnNxcnQoMTApLFxuICAgIGUyID0gTWF0aC5zcXJ0KDIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgdmFyIHJldmVyc2UsXG4gICAgICBpID0gLTEsXG4gICAgICBuLFxuICAgICAgdGlja3MsXG4gICAgICBzdGVwO1xuXG4gIHN0b3AgPSArc3RvcCwgc3RhcnQgPSArc3RhcnQsIGNvdW50ID0gK2NvdW50O1xuICBpZiAoc3RhcnQgPT09IHN0b3AgJiYgY291bnQgPiAwKSByZXR1cm4gW3N0YXJ0XTtcbiAgaWYgKHJldmVyc2UgPSBzdG9wIDwgc3RhcnQpIG4gPSBzdGFydCwgc3RhcnQgPSBzdG9wLCBzdG9wID0gbjtcbiAgaWYgKChzdGVwID0gdGlja0luY3JlbWVudChzdGFydCwgc3RvcCwgY291bnQpKSA9PT0gMCB8fCAhaXNGaW5pdGUoc3RlcCkpIHJldHVybiBbXTtcblxuICBpZiAoc3RlcCA+IDApIHtcbiAgICBzdGFydCA9IE1hdGguY2VpbChzdGFydCAvIHN0ZXApO1xuICAgIHN0b3AgPSBNYXRoLmZsb29yKHN0b3AgLyBzdGVwKTtcbiAgICB0aWNrcyA9IG5ldyBBcnJheShuID0gTWF0aC5jZWlsKHN0b3AgLSBzdGFydCArIDEpKTtcbiAgICB3aGlsZSAoKytpIDwgbikgdGlja3NbaV0gPSAoc3RhcnQgKyBpKSAqIHN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgc3RhcnQgPSBNYXRoLmZsb29yKHN0YXJ0ICogc3RlcCk7XG4gICAgc3RvcCA9IE1hdGguY2VpbChzdG9wICogc3RlcCk7XG4gICAgdGlja3MgPSBuZXcgQXJyYXkobiA9IE1hdGguY2VpbChzdGFydCAtIHN0b3AgKyAxKSk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHRpY2tzW2ldID0gKHN0YXJ0IC0gaSkgLyBzdGVwO1xuICB9XG5cbiAgaWYgKHJldmVyc2UpIHRpY2tzLnJldmVyc2UoKTtcblxuICByZXR1cm4gdGlja3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcCA9IChzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgcG93ZXIgPSBNYXRoLmZsb29yKE1hdGgubG9nKHN0ZXApIC8gTWF0aC5MTjEwKSxcbiAgICAgIGVycm9yID0gc3RlcCAvIE1hdGgucG93KDEwLCBwb3dlcik7XG4gIHJldHVybiBwb3dlciA+PSAwXG4gICAgICA/IChlcnJvciA+PSBlMTAgPyAxMCA6IGVycm9yID49IGU1ID8gNSA6IGVycm9yID49IGUyID8gMiA6IDEpICogTWF0aC5wb3coMTAsIHBvd2VyKVxuICAgICAgOiAtTWF0aC5wb3coMTAsIC1wb3dlcikgLyAoZXJyb3IgPj0gZTEwID8gMTAgOiBlcnJvciA+PSBlNSA/IDUgOiBlcnJvciA+PSBlMiA/IDIgOiAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcDAgPSBNYXRoLmFicyhzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgc3RlcDEgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhzdGVwMCkgLyBNYXRoLkxOMTApKSxcbiAgICAgIGVycm9yID0gc3RlcDAgLyBzdGVwMTtcbiAgaWYgKGVycm9yID49IGUxMCkgc3RlcDEgKj0gMTA7XG4gIGVsc2UgaWYgKGVycm9yID49IGU1KSBzdGVwMSAqPSA1O1xuICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcDEgKj0gMjtcbiAgcmV0dXJuIHN0b3AgPCBzdGFydCA/IC1zdGVwMSA6IHN0ZXAxO1xufVxuIiwiaW1wb3J0IHtzbGljZX0gZnJvbSBcIi4vYXJyYXlcIjtcbmltcG9ydCBiaXNlY3QgZnJvbSBcIi4vYmlzZWN0XCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnRcIjtcbmltcG9ydCBleHRlbnQgZnJvbSBcIi4vZXh0ZW50XCI7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHlcIjtcbmltcG9ydCByYW5nZSBmcm9tIFwiLi9yYW5nZVwiO1xuaW1wb3J0IHt0aWNrU3RlcH0gZnJvbSBcIi4vdGlja3NcIjtcbmltcG9ydCBzdHVyZ2VzIGZyb20gXCIuL3RocmVzaG9sZC9zdHVyZ2VzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgdmFsdWUgPSBpZGVudGl0eSxcbiAgICAgIGRvbWFpbiA9IGV4dGVudCxcbiAgICAgIHRocmVzaG9sZCA9IHN0dXJnZXM7XG5cbiAgZnVuY3Rpb24gaGlzdG9ncmFtKGRhdGEpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbiA9IGRhdGEubGVuZ3RoLFxuICAgICAgICB4LFxuICAgICAgICB2YWx1ZXMgPSBuZXcgQXJyYXkobik7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICB2YWx1ZXNbaV0gPSB2YWx1ZShkYXRhW2ldLCBpLCBkYXRhKTtcbiAgICB9XG5cbiAgICB2YXIgeHogPSBkb21haW4odmFsdWVzKSxcbiAgICAgICAgeDAgPSB4elswXSxcbiAgICAgICAgeDEgPSB4elsxXSxcbiAgICAgICAgdHogPSB0aHJlc2hvbGQodmFsdWVzLCB4MCwgeDEpO1xuXG4gICAgLy8gQ29udmVydCBudW1iZXIgb2YgdGhyZXNob2xkcyBpbnRvIHVuaWZvcm0gdGhyZXNob2xkcy5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodHopKSB7XG4gICAgICB0eiA9IHRpY2tTdGVwKHgwLCB4MSwgdHopO1xuICAgICAgdHogPSByYW5nZShNYXRoLmNlaWwoeDAgLyB0eikgKiB0eiwgeDEsIHR6KTsgLy8gZXhjbHVzaXZlXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSB0aHJlc2hvbGRzIG91dHNpZGUgdGhlIGRvbWFpbi5cbiAgICB2YXIgbSA9IHR6Lmxlbmd0aDtcbiAgICB3aGlsZSAodHpbMF0gPD0geDApIHR6LnNoaWZ0KCksIC0tbTtcbiAgICB3aGlsZSAodHpbbSAtIDFdID4geDEpIHR6LnBvcCgpLCAtLW07XG5cbiAgICB2YXIgYmlucyA9IG5ldyBBcnJheShtICsgMSksXG4gICAgICAgIGJpbjtcblxuICAgIC8vIEluaXRpYWxpemUgYmlucy5cbiAgICBmb3IgKGkgPSAwOyBpIDw9IG07ICsraSkge1xuICAgICAgYmluID0gYmluc1tpXSA9IFtdO1xuICAgICAgYmluLngwID0gaSA+IDAgPyB0eltpIC0gMV0gOiB4MDtcbiAgICAgIGJpbi54MSA9IGkgPCBtID8gdHpbaV0gOiB4MTtcbiAgICB9XG5cbiAgICAvLyBBc3NpZ24gZGF0YSB0byBiaW5zIGJ5IHZhbHVlLCBpZ25vcmluZyBhbnkgb3V0c2lkZSB0aGUgZG9tYWluLlxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIHggPSB2YWx1ZXNbaV07XG4gICAgICBpZiAoeDAgPD0geCAmJiB4IDw9IHgxKSB7XG4gICAgICAgIGJpbnNbYmlzZWN0KHR6LCB4LCAwLCBtKV0ucHVzaChkYXRhW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYmlucztcbiAgfVxuXG4gIGhpc3RvZ3JhbS52YWx1ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh2YWx1ZSA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoXyksIGhpc3RvZ3JhbSkgOiB2YWx1ZTtcbiAgfTtcblxuICBoaXN0b2dyYW0uZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGRvbWFpbiA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoW19bMF0sIF9bMV1dKSwgaGlzdG9ncmFtKSA6IGRvbWFpbjtcbiAgfTtcblxuICBoaXN0b2dyYW0udGhyZXNob2xkcyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aHJlc2hvbGQgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IEFycmF5LmlzQXJyYXkoXykgPyBjb25zdGFudChzbGljZS5jYWxsKF8pKSA6IGNvbnN0YW50KF8pLCBoaXN0b2dyYW0pIDogdGhyZXNob2xkO1xuICB9O1xuXG4gIHJldHVybiBoaXN0b2dyYW07XG59XG4iLCJpbXBvcnQge21hcH0gZnJvbSBcIi4uL2FycmF5XCI7XG5pbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuLi9hc2NlbmRpbmdcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4uL251bWJlclwiO1xuaW1wb3J0IHF1YW50aWxlIGZyb20gXCIuLi9xdWFudGlsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMsIG1pbiwgbWF4KSB7XG4gIHZhbHVlcyA9IG1hcC5jYWxsKHZhbHVlcywgbnVtYmVyKS5zb3J0KGFzY2VuZGluZyk7XG4gIHJldHVybiBNYXRoLmNlaWwoKG1heCAtIG1pbikgLyAoMiAqIChxdWFudGlsZSh2YWx1ZXMsIDAuNzUpIC0gcXVhbnRpbGUodmFsdWVzLCAwLjI1KSkgKiBNYXRoLnBvdyh2YWx1ZXMubGVuZ3RoLCAtMSAvIDMpKSk7XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgYmlzZWN0LCBiaXNlY3RSaWdodCwgYmlzZWN0TGVmdH0gZnJvbSBcIi4vYmlzZWN0XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgYXNjZW5kaW5nfSBmcm9tIFwiLi9hc2NlbmRpbmdcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBiaXNlY3Rvcn0gZnJvbSBcIi4vYmlzZWN0b3JcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjcm9zc30gZnJvbSBcIi4vY3Jvc3NcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBkZXNjZW5kaW5nfSBmcm9tIFwiLi9kZXNjZW5kaW5nXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgZGV2aWF0aW9ufSBmcm9tIFwiLi9kZXZpYXRpb25cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBleHRlbnR9IGZyb20gXCIuL2V4dGVudFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGhpc3RvZ3JhbX0gZnJvbSBcIi4vaGlzdG9ncmFtXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdGhyZXNob2xkRnJlZWRtYW5EaWFjb25pc30gZnJvbSBcIi4vdGhyZXNob2xkL2ZyZWVkbWFuRGlhY29uaXNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0aHJlc2hvbGRTY290dH0gZnJvbSBcIi4vdGhyZXNob2xkL3Njb3R0XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdGhyZXNob2xkU3R1cmdlc30gZnJvbSBcIi4vdGhyZXNob2xkL3N0dXJnZXNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtYXh9IGZyb20gXCIuL21heFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1lYW59IGZyb20gXCIuL21lYW5cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtZWRpYW59IGZyb20gXCIuL21lZGlhblwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1lcmdlfSBmcm9tIFwiLi9tZXJnZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1pbn0gZnJvbSBcIi4vbWluXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcGFpcnN9IGZyb20gXCIuL3BhaXJzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcGVybXV0ZX0gZnJvbSBcIi4vcGVybXV0ZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHF1YW50aWxlfSBmcm9tIFwiLi9xdWFudGlsZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHJhbmdlfSBmcm9tIFwiLi9yYW5nZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNjYW59IGZyb20gXCIuL3NjYW5cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzaHVmZmxlfSBmcm9tIFwiLi9zaHVmZmxlXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc3VtfSBmcm9tIFwiLi9zdW1cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0aWNrcywgdGlja0luY3JlbWVudCwgdGlja1N0ZXB9IGZyb20gXCIuL3RpY2tzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdHJhbnNwb3NlfSBmcm9tIFwiLi90cmFuc3Bvc2VcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB2YXJpYW5jZX0gZnJvbSBcIi4vdmFyaWFuY2VcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB6aXB9IGZyb20gXCIuL3ppcFwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gTWF0aC5hYnMoeCA9IE1hdGgucm91bmQoeCkpID49IDFlMjFcbiAgICAgID8geC50b0xvY2FsZVN0cmluZyhcImVuXCIpLnJlcGxhY2UoLywvZywgXCJcIilcbiAgICAgIDogeC50b1N0cmluZygxMCk7XG59XG5cbi8vIENvbXB1dGVzIHRoZSBkZWNpbWFsIGNvZWZmaWNpZW50IGFuZCBleHBvbmVudCBvZiB0aGUgc3BlY2lmaWVkIG51bWJlciB4IHdpdGhcbi8vIHNpZ25pZmljYW50IGRpZ2l0cyBwLCB3aGVyZSB4IGlzIHBvc2l0aXZlIGFuZCBwIGlzIGluIFsxLCAyMV0gb3IgdW5kZWZpbmVkLlxuLy8gRm9yIGV4YW1wbGUsIGZvcm1hdERlY2ltYWxQYXJ0cygxLjIzKSByZXR1cm5zIFtcIjEyM1wiLCAwXS5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCkge1xuICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgdmFyIGksIGNvZWZmaWNpZW50ID0geC5zbGljZSgwLCBpKTtcblxuICAvLyBUaGUgc3RyaW5nIHJldHVybmVkIGJ5IHRvRXhwb25lbnRpYWwgZWl0aGVyIGhhcyB0aGUgZm9ybSBcXGRcXC5cXGQrZVstK11cXGQrXG4gIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gIHJldHVybiBbXG4gICAgY29lZmZpY2llbnQubGVuZ3RoID4gMSA/IGNvZWZmaWNpZW50WzBdICsgY29lZmZpY2llbnQuc2xpY2UoMikgOiBjb2VmZmljaWVudCxcbiAgICAreC5zbGljZShpICsgMSlcbiAgXTtcbn1cbiIsImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsUGFydHMoTWF0aC5hYnMoeCkpLCB4ID8geFsxXSA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGdyb3VwaW5nLCB0aG91c2FuZHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCB3aWR0aCkge1xuICAgIHZhciBpID0gdmFsdWUubGVuZ3RoLFxuICAgICAgICB0ID0gW10sXG4gICAgICAgIGogPSAwLFxuICAgICAgICBnID0gZ3JvdXBpbmdbMF0sXG4gICAgICAgIGxlbmd0aCA9IDA7XG5cbiAgICB3aGlsZSAoaSA+IDAgJiYgZyA+IDApIHtcbiAgICAgIGlmIChsZW5ndGggKyBnICsgMSA+IHdpZHRoKSBnID0gTWF0aC5tYXgoMSwgd2lkdGggLSBsZW5ndGgpO1xuICAgICAgdC5wdXNoKHZhbHVlLnN1YnN0cmluZyhpIC09IGcsIGkgKyBnKSk7XG4gICAgICBpZiAoKGxlbmd0aCArPSBnICsgMSkgPiB3aWR0aCkgYnJlYWs7XG4gICAgICBnID0gZ3JvdXBpbmdbaiA9IChqICsgMSkgJSBncm91cGluZy5sZW5ndGhdO1xuICAgIH1cblxuICAgIHJldHVybiB0LnJldmVyc2UoKS5qb2luKHRob3VzYW5kcyk7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihudW1lcmFscykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvWzAtOV0vZywgZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIG51bWVyYWxzWytpXTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsIi8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bfl1bdHlwZV1cbnZhciByZSA9IC9eKD86KC4pPyhbPD49Xl0pKT8oWytcXC0oIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuXFxkKyk/KH4pPyhbYS16JV0pPyQvaTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG4gIHZhciBtYXRjaDtcbiAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoe1xuICAgIGZpbGw6IG1hdGNoWzFdLFxuICAgIGFsaWduOiBtYXRjaFsyXSxcbiAgICBzaWduOiBtYXRjaFszXSxcbiAgICBzeW1ib2w6IG1hdGNoWzRdLFxuICAgIHplcm86IG1hdGNoWzVdLFxuICAgIHdpZHRoOiBtYXRjaFs2XSxcbiAgICBjb21tYTogbWF0Y2hbN10sXG4gICAgcHJlY2lzaW9uOiBtYXRjaFs4XSAmJiBtYXRjaFs4XS5zbGljZSgxKSxcbiAgICB0cmltOiBtYXRjaFs5XSxcbiAgICB0eXBlOiBtYXRjaFsxMF1cbiAgfSk7XG59XG5cbmZvcm1hdFNwZWNpZmllci5wcm90b3R5cGUgPSBGb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlOyAvLyBpbnN0YW5jZW9mXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIHRoaXMuZmlsbCA9IHNwZWNpZmllci5maWxsID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHNwZWNpZmllci5maWxsICsgXCJcIjtcbiAgdGhpcy5hbGlnbiA9IHNwZWNpZmllci5hbGlnbiA9PT0gdW5kZWZpbmVkID8gXCI+XCIgOiBzcGVjaWZpZXIuYWxpZ24gKyBcIlwiO1xuICB0aGlzLnNpZ24gPSBzcGVjaWZpZXIuc2lnbiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOiBzcGVjaWZpZXIuc2lnbiArIFwiXCI7XG4gIHRoaXMuc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IHNwZWNpZmllci5zeW1ib2wgKyBcIlwiO1xuICB0aGlzLnplcm8gPSAhIXNwZWNpZmllci56ZXJvO1xuICB0aGlzLndpZHRoID0gc3BlY2lmaWVyLndpZHRoID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiArc3BlY2lmaWVyLndpZHRoO1xuICB0aGlzLmNvbW1hID0gISFzcGVjaWZpZXIuY29tbWE7XG4gIHRoaXMucHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogK3NwZWNpZmllci5wcmVjaXNpb247XG4gIHRoaXMudHJpbSA9ICEhc3BlY2lmaWVyLnRyaW07XG4gIHRoaXMudHlwZSA9IHNwZWNpZmllci50eXBlID09PSB1bmRlZmluZWQgPyBcIlwiIDogc3BlY2lmaWVyLnR5cGUgKyBcIlwiO1xufVxuXG5Gb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICsgdGhpcy5hbGlnblxuICAgICAgKyB0aGlzLnNpZ25cbiAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICsgKHRoaXMuemVybyA/IFwiMFwiIDogXCJcIilcbiAgICAgICsgKHRoaXMud2lkdGggPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBNYXRoLm1heCgxLCB0aGlzLndpZHRoIHwgMCkpXG4gICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgKyAodGhpcy5wcmVjaXNpb24gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBcIi5cIiArIE1hdGgubWF4KDAsIHRoaXMucHJlY2lzaW9uIHwgMCkpXG4gICAgICArICh0aGlzLnRyaW0gPyBcIn5cIiA6IFwiXCIpXG4gICAgICArIHRoaXMudHlwZTtcbn07XG4iLCIvLyBUcmltcyBpbnNpZ25pZmljYW50IHplcm9zLCBlLmcuLCByZXBsYWNlcyAxLjIwMDBrIHdpdGggMS4yay5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpIHtcbiAgb3V0OiBmb3IgKHZhciBuID0gcy5sZW5ndGgsIGkgPSAxLCBpMCA9IC0xLCBpMTsgaSA8IG47ICsraSkge1xuICAgIHN3aXRjaCAoc1tpXSkge1xuICAgICAgY2FzZSBcIi5cIjogaTAgPSBpMSA9IGk7IGJyZWFrO1xuICAgICAgY2FzZSBcIjBcIjogaWYgKGkwID09PSAwKSBpMCA9IGk7IGkxID0gaTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiBpZiAoIStzW2ldKSBicmVhayBvdXQ7IGlmIChpMCA+IDApIGkwID0gMDsgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBpMCA+IDAgPyBzLnNsaWNlKDAsIGkwKSArIHMuc2xpY2UoaTEgKyAxKSA6IHM7XG59XG4iLCJpbXBvcnQge2Zvcm1hdERlY2ltYWxQYXJ0c30gZnJvbSBcIi4vZm9ybWF0RGVjaW1hbC5qc1wiO1xuXG5leHBvcnQgdmFyIHByZWZpeEV4cG9uZW50O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4LCBwKSB7XG4gIHZhciBkID0gZm9ybWF0RGVjaW1hbFBhcnRzKHgsIHApO1xuICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgdmFyIGNvZWZmaWNpZW50ID0gZFswXSxcbiAgICAgIGV4cG9uZW50ID0gZFsxXSxcbiAgICAgIGkgPSBleHBvbmVudCAtIChwcmVmaXhFeHBvbmVudCA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50IC8gMykpKSAqIDMpICsgMSxcbiAgICAgIG4gPSBjb2VmZmljaWVudC5sZW5ndGg7XG4gIHJldHVybiBpID09PSBuID8gY29lZmZpY2llbnRcbiAgICAgIDogaSA+IG4gPyBjb2VmZmljaWVudCArIG5ldyBBcnJheShpIC0gbiArIDEpLmpvaW4oXCIwXCIpXG4gICAgICA6IGkgPiAwID8gY29lZmZpY2llbnQuc2xpY2UoMCwgaSkgKyBcIi5cIiArIGNvZWZmaWNpZW50LnNsaWNlKGkpXG4gICAgICA6IFwiMC5cIiArIG5ldyBBcnJheSgxIC0gaSkuam9pbihcIjBcIikgKyBmb3JtYXREZWNpbWFsUGFydHMoeCwgTWF0aC5tYXgoMCwgcCArIGkgLSAxKSlbMF07IC8vIGxlc3MgdGhhbiAxeSFcbn1cbiIsImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdO1xuICByZXR1cm4gZXhwb25lbnQgPCAwID8gXCIwLlwiICsgbmV3IEFycmF5KC1leHBvbmVudCkuam9pbihcIjBcIikgKyBjb2VmZmljaWVudFxuICAgICAgOiBjb2VmZmljaWVudC5sZW5ndGggPiBleHBvbmVudCArIDEgPyBjb2VmZmljaWVudC5zbGljZSgwLCBleHBvbmVudCArIDEpICsgXCIuXCIgKyBjb2VmZmljaWVudC5zbGljZShleHBvbmVudCArIDEpXG4gICAgICA6IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGV4cG9uZW50IC0gY29lZmZpY2llbnQubGVuZ3RoICsgMikuam9pbihcIjBcIik7XG59XG4iLCJpbXBvcnQgZm9ybWF0RGVjaW1hbCBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5pbXBvcnQgZm9ybWF0UHJlZml4QXV0byBmcm9tIFwiLi9mb3JtYXRQcmVmaXhBdXRvLmpzXCI7XG5pbXBvcnQgZm9ybWF0Um91bmRlZCBmcm9tIFwiLi9mb3JtYXRSb3VuZGVkLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIlXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuICh4ICogMTAwKS50b0ZpeGVkKHApOyB9LFxuICBcImJcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygyKTsgfSxcbiAgXCJjXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggKyBcIlwiOyB9LFxuICBcImRcIjogZm9ybWF0RGVjaW1hbCxcbiAgXCJlXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9FeHBvbmVudGlhbChwKTsgfSxcbiAgXCJmXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9GaXhlZChwKTsgfSxcbiAgXCJnXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9QcmVjaXNpb24ocCk7IH0sXG4gIFwib1wiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDgpOyB9LFxuICBcInBcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4gZm9ybWF0Um91bmRlZCh4ICogMTAwLCBwKTsgfSxcbiAgXCJyXCI6IGZvcm1hdFJvdW5kZWQsXG4gIFwic1wiOiBmb3JtYXRQcmVmaXhBdXRvLFxuICBcIlhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTsgfSxcbiAgXCJ4XCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTYpOyB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geDtcbn1cbiIsImltcG9ydCBleHBvbmVudCBmcm9tIFwiLi9leHBvbmVudC5qc1wiO1xuaW1wb3J0IGZvcm1hdEdyb3VwIGZyb20gXCIuL2Zvcm1hdEdyb3VwLmpzXCI7XG5pbXBvcnQgZm9ybWF0TnVtZXJhbHMgZnJvbSBcIi4vZm9ybWF0TnVtZXJhbHMuanNcIjtcbmltcG9ydCBmb3JtYXRTcGVjaWZpZXIgZnJvbSBcIi4vZm9ybWF0U3BlY2lmaWVyLmpzXCI7XG5pbXBvcnQgZm9ybWF0VHJpbSBmcm9tIFwiLi9mb3JtYXRUcmltLmpzXCI7XG5pbXBvcnQgZm9ybWF0VHlwZXMgZnJvbSBcIi4vZm9ybWF0VHlwZXMuanNcIjtcbmltcG9ydCB7cHJlZml4RXhwb25lbnR9IGZyb20gXCIuL2Zvcm1hdFByZWZpeEF1dG8uanNcIjtcbmltcG9ydCBpZGVudGl0eSBmcm9tIFwiLi9pZGVudGl0eS5qc1wiO1xuXG52YXIgbWFwID0gQXJyYXkucHJvdG90eXBlLm1hcCxcbiAgICBwcmVmaXhlcyA9IFtcInlcIixcInpcIixcImFcIixcImZcIixcInBcIixcIm5cIixcIsK1XCIsXCJtXCIsXCJcIixcImtcIixcIk1cIixcIkdcIixcIlRcIixcIlBcIixcIkVcIixcIlpcIixcIllcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGxvY2FsZSkge1xuICB2YXIgZ3JvdXAgPSBsb2NhbGUuZ3JvdXBpbmcgPT09IHVuZGVmaW5lZCB8fCBsb2NhbGUudGhvdXNhbmRzID09PSB1bmRlZmluZWQgPyBpZGVudGl0eSA6IGZvcm1hdEdyb3VwKG1hcC5jYWxsKGxvY2FsZS5ncm91cGluZywgTnVtYmVyKSwgbG9jYWxlLnRob3VzYW5kcyArIFwiXCIpLFxuICAgICAgY3VycmVuY3lQcmVmaXggPSBsb2NhbGUuY3VycmVuY3kgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBsb2NhbGUuY3VycmVuY3lbMF0gKyBcIlwiLFxuICAgICAgY3VycmVuY3lTdWZmaXggPSBsb2NhbGUuY3VycmVuY3kgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBsb2NhbGUuY3VycmVuY3lbMV0gKyBcIlwiLFxuICAgICAgZGVjaW1hbCA9IGxvY2FsZS5kZWNpbWFsID09PSB1bmRlZmluZWQgPyBcIi5cIiA6IGxvY2FsZS5kZWNpbWFsICsgXCJcIixcbiAgICAgIG51bWVyYWxzID0gbG9jYWxlLm51bWVyYWxzID09PSB1bmRlZmluZWQgPyBpZGVudGl0eSA6IGZvcm1hdE51bWVyYWxzKG1hcC5jYWxsKGxvY2FsZS5udW1lcmFscywgU3RyaW5nKSksXG4gICAgICBwZXJjZW50ID0gbG9jYWxlLnBlcmNlbnQgPT09IHVuZGVmaW5lZCA/IFwiJVwiIDogbG9jYWxlLnBlcmNlbnQgKyBcIlwiLFxuICAgICAgbWludXMgPSBsb2NhbGUubWludXMgPT09IHVuZGVmaW5lZCA/IFwiLVwiIDogbG9jYWxlLm1pbnVzICsgXCJcIixcbiAgICAgIG5hbiA9IGxvY2FsZS5uYW4gPT09IHVuZGVmaW5lZCA/IFwiTmFOXCIgOiBsb2NhbGUubmFuICsgXCJcIjtcblxuICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyKSB7XG4gICAgc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcik7XG5cbiAgICB2YXIgZmlsbCA9IHNwZWNpZmllci5maWxsLFxuICAgICAgICBhbGlnbiA9IHNwZWNpZmllci5hbGlnbixcbiAgICAgICAgc2lnbiA9IHNwZWNpZmllci5zaWduLFxuICAgICAgICBzeW1ib2wgPSBzcGVjaWZpZXIuc3ltYm9sLFxuICAgICAgICB6ZXJvID0gc3BlY2lmaWVyLnplcm8sXG4gICAgICAgIHdpZHRoID0gc3BlY2lmaWVyLndpZHRoLFxuICAgICAgICBjb21tYSA9IHNwZWNpZmllci5jb21tYSxcbiAgICAgICAgcHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbixcbiAgICAgICAgdHJpbSA9IHNwZWNpZmllci50cmltLFxuICAgICAgICB0eXBlID0gc3BlY2lmaWVyLnR5cGU7XG5cbiAgICAvLyBUaGUgXCJuXCIgdHlwZSBpcyBhbiBhbGlhcyBmb3IgXCIsZ1wiLlxuICAgIGlmICh0eXBlID09PSBcIm5cIikgY29tbWEgPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBUaGUgXCJcIiB0eXBlLCBhbmQgYW55IGludmFsaWQgdHlwZSwgaXMgYW4gYWxpYXMgZm9yIFwiLjEyfmdcIi5cbiAgICBlbHNlIGlmICghZm9ybWF0VHlwZXNbdHlwZV0pIHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkICYmIChwcmVjaXNpb24gPSAxMiksIHRyaW0gPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBJZiB6ZXJvIGZpbGwgaXMgc3BlY2lmaWVkLCBwYWRkaW5nIGdvZXMgYWZ0ZXIgc2lnbiBhbmQgYmVmb3JlIGRpZ2l0cy5cbiAgICBpZiAoemVybyB8fCAoZmlsbCA9PT0gXCIwXCIgJiYgYWxpZ24gPT09IFwiPVwiKSkgemVybyA9IHRydWUsIGZpbGwgPSBcIjBcIiwgYWxpZ24gPSBcIj1cIjtcblxuICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgIC8vIEZvciBTSS1wcmVmaXgsIHRoZSBzdWZmaXggaXMgbGF6aWx5IGNvbXB1dGVkLlxuICAgIHZhciBwcmVmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lQcmVmaXggOiBzeW1ib2wgPT09IFwiI1wiICYmIC9bYm94WF0vLnRlc3QodHlwZSkgPyBcIjBcIiArIHR5cGUudG9Mb3dlckNhc2UoKSA6IFwiXCIsXG4gICAgICAgIHN1ZmZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVN1ZmZpeCA6IC9bJXBdLy50ZXN0KHR5cGUpID8gcGVyY2VudCA6IFwiXCI7XG5cbiAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgIC8vIElzIHRoaXMgYW4gaW50ZWdlciB0eXBlP1xuICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgbWF5YmVTdWZmaXggPSAvW2RlZmdwcnMlXS8udGVzdCh0eXBlKTtcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgIC8vIEZvciBzaWduaWZpY2FudCBwcmVjaXNpb24sIGl0IG11c3QgYmUgaW4gWzEsIDIxXS5cbiAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09PSB1bmRlZmluZWQgPyA2XG4gICAgICAgIDogL1tncHJzXS8udGVzdCh0eXBlKSA/IE1hdGgubWF4KDEsIE1hdGgubWluKDIxLCBwcmVjaXNpb24pKVxuICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKDIwLCBwcmVjaXNpb24pKTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdCh2YWx1ZSkge1xuICAgICAgdmFyIHZhbHVlUHJlZml4ID0gcHJlZml4LFxuICAgICAgICAgIHZhbHVlU3VmZml4ID0gc3VmZml4LFxuICAgICAgICAgIGksIG4sIGM7XG5cbiAgICAgIGlmICh0eXBlID09PSBcImNcIikge1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9IGZvcm1hdFR5cGUodmFsdWUpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgc2lnbi4gLTAgaXMgbm90IGxlc3MgdGhhbiAwLCBidXQgMSAvIC0wIGlzIVxuICAgICAgICB2YXIgdmFsdWVOZWdhdGl2ZSA9IHZhbHVlIDwgMCB8fCAxIC8gdmFsdWUgPCAwO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gdGhlIGluaXRpYWwgZm9ybWF0dGluZy5cbiAgICAgICAgdmFsdWUgPSBpc05hTih2YWx1ZSkgPyBuYW4gOiBmb3JtYXRUeXBlKE1hdGguYWJzKHZhbHVlKSwgcHJlY2lzaW9uKTtcblxuICAgICAgICAvLyBUcmltIGluc2lnbmlmaWNhbnQgemVyb3MuXG4gICAgICAgIGlmICh0cmltKSB2YWx1ZSA9IGZvcm1hdFRyaW0odmFsdWUpO1xuXG4gICAgICAgIC8vIElmIGEgbmVnYXRpdmUgdmFsdWUgcm91bmRzIHRvIHplcm8gYWZ0ZXIgZm9ybWF0dGluZywgYW5kIG5vIGV4cGxpY2l0IHBvc2l0aXZlIHNpZ24gaXMgcmVxdWVzdGVkLCBoaWRlIHRoZSBzaWduLlxuICAgICAgICBpZiAodmFsdWVOZWdhdGl2ZSAmJiArdmFsdWUgPT09IDAgJiYgc2lnbiAhPT0gXCIrXCIpIHZhbHVlTmVnYXRpdmUgPSBmYWxzZTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgICAgICAgdmFsdWVQcmVmaXggPSAodmFsdWVOZWdhdGl2ZSA/IChzaWduID09PSBcIihcIiA/IHNpZ24gOiBtaW51cykgOiBzaWduID09PSBcIi1cIiB8fCBzaWduID09PSBcIihcIiA/IFwiXCIgOiBzaWduKSArIHZhbHVlUHJlZml4O1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9ICh0eXBlID09PSBcInNcIiA/IHByZWZpeGVzWzggKyBwcmVmaXhFeHBvbmVudCAvIDNdIDogXCJcIikgKyB2YWx1ZVN1ZmZpeCArICh2YWx1ZU5lZ2F0aXZlICYmIHNpZ24gPT09IFwiKFwiID8gXCIpXCIgOiBcIlwiKTtcblxuICAgICAgICAvLyBCcmVhayB0aGUgZm9ybWF0dGVkIHZhbHVlIGludG8gdGhlIGludGVnZXIg4oCcdmFsdWXigJ0gcGFydCB0aGF0IGNhbiBiZVxuICAgICAgICAvLyBncm91cGVkLCBhbmQgZnJhY3Rpb25hbCBvciBleHBvbmVudGlhbCDigJxzdWZmaXjigJ0gcGFydCB0aGF0IGlzIG5vdC5cbiAgICAgICAgaWYgKG1heWJlU3VmZml4KSB7XG4gICAgICAgICAgaSA9IC0xLCBuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksIDQ4ID4gYyB8fCBjID4gNTcpIHtcbiAgICAgICAgICAgICAgdmFsdWVTdWZmaXggPSAoYyA9PT0gNDYgPyBkZWNpbWFsICsgdmFsdWUuc2xpY2UoaSArIDEpIDogdmFsdWUuc2xpY2UoaSkpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgbm90IFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGJlZm9yZSBwYWRkaW5nLlxuICAgICAgaWYgKGNvbW1hICYmICF6ZXJvKSB2YWx1ZSA9IGdyb3VwKHZhbHVlLCBJbmZpbml0eSk7XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhZGRpbmcuXG4gICAgICB2YXIgbGVuZ3RoID0gdmFsdWVQcmVmaXgubGVuZ3RoICsgdmFsdWUubGVuZ3RoICsgdmFsdWVTdWZmaXgubGVuZ3RoLFxuICAgICAgICAgIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgXCIwXCIsIGdyb3VwaW5nIGlzIGFwcGxpZWQgYWZ0ZXIgcGFkZGluZy5cbiAgICAgIGlmIChjb21tYSAmJiB6ZXJvKSB2YWx1ZSA9IGdyb3VwKHBhZGRpbmcgKyB2YWx1ZSwgcGFkZGluZy5sZW5ndGggPyB3aWR0aCAtIHZhbHVlU3VmZml4Lmxlbmd0aCA6IEluZmluaXR5KSwgcGFkZGluZyA9IFwiXCI7XG5cbiAgICAgIC8vIFJlY29uc3RydWN0IHRoZSBmaW5hbCBvdXRwdXQgYmFzZWQgb24gdGhlIGRlc2lyZWQgYWxpZ25tZW50LlxuICAgICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgICBjYXNlIFwiPFwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeCArIHBhZGRpbmc7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiPVwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgcGFkZGluZyArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiXlwiOiB2YWx1ZSA9IHBhZGRpbmcuc2xpY2UoMCwgbGVuZ3RoID0gcGFkZGluZy5sZW5ndGggPj4gMSkgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nLnNsaWNlKGxlbmd0aCk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiB2YWx1ZSA9IHBhZGRpbmcgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVtZXJhbHModmFsdWUpO1xuICAgIH1cblxuICAgIGZvcm1hdC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNwZWNpZmllciArIFwiXCI7XG4gICAgfTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRQcmVmaXgoc3BlY2lmaWVyLCB2YWx1ZSkge1xuICAgIHZhciBmID0gbmV3Rm9ybWF0KChzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSwgc3BlY2lmaWVyLnR5cGUgPSBcImZcIiwgc3BlY2lmaWVyKSksXG4gICAgICAgIGUgPSBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyxcbiAgICAgICAgayA9IE1hdGgucG93KDEwLCAtZSksXG4gICAgICAgIHByZWZpeCA9IHByZWZpeGVzWzggKyBlIC8gM107XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZihrICogdmFsdWUpICsgcHJlZml4O1xuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZvcm1hdDogbmV3Rm9ybWF0LFxuICAgIGZvcm1hdFByZWZpeDogZm9ybWF0UHJlZml4XG4gIH07XG59XG4iLCJpbXBvcnQgZm9ybWF0TG9jYWxlIGZyb20gXCIuL2xvY2FsZS5qc1wiO1xuXG52YXIgbG9jYWxlO1xuZXhwb3J0IHZhciBmb3JtYXQ7XG5leHBvcnQgdmFyIGZvcm1hdFByZWZpeDtcblxuZGVmYXVsdExvY2FsZSh7XG4gIGRlY2ltYWw6IFwiLlwiLFxuICB0aG91c2FuZHM6IFwiLFwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wiJFwiLCBcIlwiXSxcbiAgbWludXM6IFwiLVwiXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmYXVsdExvY2FsZShkZWZpbml0aW9uKSB7XG4gIGxvY2FsZSA9IGZvcm1hdExvY2FsZShkZWZpbml0aW9uKTtcbiAgZm9ybWF0ID0gbG9jYWxlLmZvcm1hdDtcbiAgZm9ybWF0UHJlZml4ID0gbG9jYWxlLmZvcm1hdFByZWZpeDtcbiAgcmV0dXJuIGxvY2FsZTtcbn1cbiIsInZhciBFT0wgPSB7fSxcbiAgICBFT0YgPSB7fSxcbiAgICBRVU9URSA9IDM0LFxuICAgIE5FV0xJTkUgPSAxMCxcbiAgICBSRVRVUk4gPSAxMztcblxuZnVuY3Rpb24gb2JqZWN0Q29udmVydGVyKGNvbHVtbnMpIHtcbiAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImRcIiwgXCJyZXR1cm4ge1wiICsgY29sdW1ucy5tYXAoZnVuY3Rpb24obmFtZSwgaSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShuYW1lKSArIFwiOiBkW1wiICsgaSArIFwiXSB8fCBcXFwiXFxcIlwiO1xuICB9KS5qb2luKFwiLFwiKSArIFwifVwiKTtcbn1cblxuZnVuY3Rpb24gY3VzdG9tQ29udmVydGVyKGNvbHVtbnMsIGYpIHtcbiAgdmFyIG9iamVjdCA9IG9iamVjdENvbnZlcnRlcihjb2x1bW5zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgIHJldHVybiBmKG9iamVjdChyb3cpLCBpLCBjb2x1bW5zKTtcbiAgfTtcbn1cblxuLy8gQ29tcHV0ZSB1bmlxdWUgY29sdW1ucyBpbiBvcmRlciBvZiBkaXNjb3ZlcnkuXG5mdW5jdGlvbiBpbmZlckNvbHVtbnMocm93cykge1xuICB2YXIgY29sdW1uU2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGNvbHVtbnMgPSBbXTtcblxuICByb3dzLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgZm9yICh2YXIgY29sdW1uIGluIHJvdykge1xuICAgICAgaWYgKCEoY29sdW1uIGluIGNvbHVtblNldCkpIHtcbiAgICAgICAgY29sdW1ucy5wdXNoKGNvbHVtblNldFtjb2x1bW5dID0gY29sdW1uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb2x1bW5zO1xufVxuXG5mdW5jdGlvbiBwYWQodmFsdWUsIHdpZHRoKSB7XG4gIHZhciBzID0gdmFsdWUgKyBcIlwiLCBsZW5ndGggPSBzLmxlbmd0aDtcbiAgcmV0dXJuIGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbigwKSArIHMgOiBzO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRZZWFyKHllYXIpIHtcbiAgcmV0dXJuIHllYXIgPCAwID8gXCItXCIgKyBwYWQoLXllYXIsIDYpXG4gICAgOiB5ZWFyID4gOTk5OSA/IFwiK1wiICsgcGFkKHllYXIsIDYpXG4gICAgOiBwYWQoeWVhciwgNCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xuICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCksXG4gICAgICBtaW51dGVzID0gZGF0ZS5nZXRVVENNaW51dGVzKCksXG4gICAgICBzZWNvbmRzID0gZGF0ZS5nZXRVVENTZWNvbmRzKCksXG4gICAgICBtaWxsaXNlY29uZHMgPSBkYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICByZXR1cm4gaXNOYU4oZGF0ZSkgPyBcIkludmFsaWQgRGF0ZVwiXG4gICAgICA6IGZvcm1hdFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpLCA0KSArIFwiLVwiICsgcGFkKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIDIpICsgXCItXCIgKyBwYWQoZGF0ZS5nZXRVVENEYXRlKCksIDIpXG4gICAgICArIChtaWxsaXNlY29uZHMgPyBcIlRcIiArIHBhZChob3VycywgMikgKyBcIjpcIiArIHBhZChtaW51dGVzLCAyKSArIFwiOlwiICsgcGFkKHNlY29uZHMsIDIpICsgXCIuXCIgKyBwYWQobWlsbGlzZWNvbmRzLCAzKSArIFwiWlwiXG4gICAgICA6IHNlY29uZHMgPyBcIlRcIiArIHBhZChob3VycywgMikgKyBcIjpcIiArIHBhZChtaW51dGVzLCAyKSArIFwiOlwiICsgcGFkKHNlY29uZHMsIDIpICsgXCJaXCJcbiAgICAgIDogbWludXRlcyB8fCBob3VycyA/IFwiVFwiICsgcGFkKGhvdXJzLCAyKSArIFwiOlwiICsgcGFkKG1pbnV0ZXMsIDIpICsgXCJaXCJcbiAgICAgIDogXCJcIik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRlbGltaXRlcikge1xuICB2YXIgcmVGb3JtYXQgPSBuZXcgUmVnRXhwKFwiW1xcXCJcIiArIGRlbGltaXRlciArIFwiXFxuXFxyXVwiKSxcbiAgICAgIERFTElNSVRFUiA9IGRlbGltaXRlci5jaGFyQ29kZUF0KDApO1xuXG4gIGZ1bmN0aW9uIHBhcnNlKHRleHQsIGYpIHtcbiAgICB2YXIgY29udmVydCwgY29sdW1ucywgcm93cyA9IHBhcnNlUm93cyh0ZXh0LCBmdW5jdGlvbihyb3csIGkpIHtcbiAgICAgIGlmIChjb252ZXJ0KSByZXR1cm4gY29udmVydChyb3csIGkgLSAxKTtcbiAgICAgIGNvbHVtbnMgPSByb3csIGNvbnZlcnQgPSBmID8gY3VzdG9tQ29udmVydGVyKHJvdywgZikgOiBvYmplY3RDb252ZXJ0ZXIocm93KTtcbiAgICB9KTtcbiAgICByb3dzLmNvbHVtbnMgPSBjb2x1bW5zIHx8IFtdO1xuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VSb3dzKHRleHQsIGYpIHtcbiAgICB2YXIgcm93cyA9IFtdLCAvLyBvdXRwdXQgcm93c1xuICAgICAgICBOID0gdGV4dC5sZW5ndGgsXG4gICAgICAgIEkgPSAwLCAvLyBjdXJyZW50IGNoYXJhY3RlciBpbmRleFxuICAgICAgICBuID0gMCwgLy8gY3VycmVudCBsaW5lIG51bWJlclxuICAgICAgICB0LCAvLyBjdXJyZW50IHRva2VuXG4gICAgICAgIGVvZiA9IE4gPD0gMCwgLy8gY3VycmVudCB0b2tlbiBmb2xsb3dlZCBieSBFT0Y/XG4gICAgICAgIGVvbCA9IGZhbHNlOyAvLyBjdXJyZW50IHRva2VuIGZvbGxvd2VkIGJ5IEVPTD9cblxuICAgIC8vIFN0cmlwIHRoZSB0cmFpbGluZyBuZXdsaW5lLlxuICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoTiAtIDEpID09PSBORVdMSU5FKSAtLU47XG4gICAgaWYgKHRleHQuY2hhckNvZGVBdChOIC0gMSkgPT09IFJFVFVSTikgLS1OO1xuXG4gICAgZnVuY3Rpb24gdG9rZW4oKSB7XG4gICAgICBpZiAoZW9mKSByZXR1cm4gRU9GO1xuICAgICAgaWYgKGVvbCkgcmV0dXJuIGVvbCA9IGZhbHNlLCBFT0w7XG5cbiAgICAgIC8vIFVuZXNjYXBlIHF1b3Rlcy5cbiAgICAgIHZhciBpLCBqID0gSSwgYztcbiAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaikgPT09IFFVT1RFKSB7XG4gICAgICAgIHdoaWxlIChJKysgPCBOICYmIHRleHQuY2hhckNvZGVBdChJKSAhPT0gUVVPVEUgfHwgdGV4dC5jaGFyQ29kZUF0KCsrSSkgPT09IFFVT1RFKTtcbiAgICAgICAgaWYgKChpID0gSSkgPj0gTikgZW9mID0gdHJ1ZTtcbiAgICAgICAgZWxzZSBpZiAoKGMgPSB0ZXh0LmNoYXJDb2RlQXQoSSsrKSkgPT09IE5FV0xJTkUpIGVvbCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGMgPT09IFJFVFVSTikgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSBORVdMSU5FKSArK0k7IH1cbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiArIDEsIGkgLSAxKS5yZXBsYWNlKC9cIlwiL2csIFwiXFxcIlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gRmluZCBuZXh0IGRlbGltaXRlciBvciBuZXdsaW5lLlxuICAgICAgd2hpbGUgKEkgPCBOKSB7XG4gICAgICAgIGlmICgoYyA9IHRleHQuY2hhckNvZGVBdChpID0gSSsrKSkgPT09IE5FV0xJTkUpIGVvbCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGMgPT09IFJFVFVSTikgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSBORVdMSU5FKSArK0k7IH1cbiAgICAgICAgZWxzZSBpZiAoYyAhPT0gREVMSU1JVEVSKSBjb250aW51ZTtcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiwgaSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiBsYXN0IHRva2VuIGJlZm9yZSBFT0YuXG4gICAgICByZXR1cm4gZW9mID0gdHJ1ZSwgdGV4dC5zbGljZShqLCBOKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoKHQgPSB0b2tlbigpKSAhPT0gRU9GKSB7XG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICB3aGlsZSAodCAhPT0gRU9MICYmIHQgIT09IEVPRikgcm93LnB1c2godCksIHQgPSB0b2tlbigpO1xuICAgICAgaWYgKGYgJiYgKHJvdyA9IGYocm93LCBuKyspKSA9PSBudWxsKSBjb250aW51ZTtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlZm9ybWF0Qm9keShyb3dzLCBjb2x1bW5zKSB7XG4gICAgcmV0dXJuIHJvd3MubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgICAgcmV0dXJuIGNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbikge1xuICAgICAgICByZXR1cm4gZm9ybWF0VmFsdWUocm93W2NvbHVtbl0pO1xuICAgICAgfSkuam9pbihkZWxpbWl0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0KHJvd3MsIGNvbHVtbnMpIHtcbiAgICBpZiAoY29sdW1ucyA9PSBudWxsKSBjb2x1bW5zID0gaW5mZXJDb2x1bW5zKHJvd3MpO1xuICAgIHJldHVybiBbY29sdW1ucy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKV0uY29uY2F0KHByZWZvcm1hdEJvZHkocm93cywgY29sdW1ucykpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpIHtcbiAgICBpZiAoY29sdW1ucyA9PSBudWxsKSBjb2x1bW5zID0gaW5mZXJDb2x1bW5zKHJvd3MpO1xuICAgIHJldHVybiBwcmVmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSb3dzKHJvd3MpIHtcbiAgICByZXR1cm4gcm93cy5tYXAoZm9ybWF0Um93KS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Um93KHJvdykge1xuICAgIHJldHVybiByb3cubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIlxuICAgICAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IGZvcm1hdERhdGUodmFsdWUpXG4gICAgICAgIDogcmVGb3JtYXQudGVzdCh2YWx1ZSArPSBcIlwiKSA/IFwiXFxcIlwiICsgdmFsdWUucmVwbGFjZSgvXCIvZywgXCJcXFwiXFxcIlwiKSArIFwiXFxcIlwiXG4gICAgICAgIDogdmFsdWU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBwYXJzZVJvd3M6IHBhcnNlUm93cyxcbiAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICBmb3JtYXRCb2R5OiBmb3JtYXRCb2R5LFxuICAgIGZvcm1hdFJvd3M6IGZvcm1hdFJvd3MsXG4gICAgZm9ybWF0Um93OiBmb3JtYXRSb3csXG4gICAgZm9ybWF0VmFsdWU6IGZvcm1hdFZhbHVlXG4gIH07XG59XG4iLCJpbXBvcnQgZHN2IGZyb20gXCIuL2Rzdi5qc1wiO1xuXG52YXIgY3N2ID0gZHN2KFwiLFwiKTtcblxuZXhwb3J0IHZhciBjc3ZQYXJzZSA9IGNzdi5wYXJzZTtcbmV4cG9ydCB2YXIgY3N2UGFyc2VSb3dzID0gY3N2LnBhcnNlUm93cztcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0ID0gY3N2LmZvcm1hdDtcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0Qm9keSA9IGNzdi5mb3JtYXRCb2R5O1xuZXhwb3J0IHZhciBjc3ZGb3JtYXRSb3dzID0gY3N2LmZvcm1hdFJvd3M7XG5leHBvcnQgdmFyIGNzdkZvcm1hdFJvdyA9IGNzdi5mb3JtYXRSb3c7XG5leHBvcnQgdmFyIGNzdkZvcm1hdFZhbHVlID0gY3N2LmZvcm1hdFZhbHVlO1xuIiwiaW1wb3J0IGRzdiBmcm9tIFwiLi9kc3YuanNcIjtcblxudmFyIHRzdiA9IGRzdihcIlxcdFwiKTtcblxuZXhwb3J0IHZhciB0c3ZQYXJzZSA9IHRzdi5wYXJzZTtcbmV4cG9ydCB2YXIgdHN2UGFyc2VSb3dzID0gdHN2LnBhcnNlUm93cztcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0ID0gdHN2LmZvcm1hdDtcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0Qm9keSA9IHRzdi5mb3JtYXRCb2R5O1xuZXhwb3J0IHZhciB0c3ZGb3JtYXRSb3dzID0gdHN2LmZvcm1hdFJvd3M7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFJvdyA9IHRzdi5mb3JtYXRSb3c7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFZhbHVlID0gdHN2LmZvcm1hdFZhbHVlO1xuIiwiZnVuY3Rpb24gcmVzcG9uc2VUZXh0KHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXMgKyBcIiBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICByZXR1cm4gZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4ocmVzcG9uc2VUZXh0KTtcbn1cbiIsImltcG9ydCB7Y3N2UGFyc2UsIGRzdkZvcm1hdCwgdHN2UGFyc2V9IGZyb20gXCJkMy1kc3ZcIjtcbmltcG9ydCB0ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcblxuZnVuY3Rpb24gZHN2UGFyc2UocGFyc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBpbml0LCByb3cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgaW5pdCA9PT0gXCJmdW5jdGlvblwiKSByb3cgPSBpbml0LCBpbml0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0ZXh0KGlucHV0LCBpbml0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcGFyc2UocmVzcG9uc2UsIHJvdyk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRzdihkZWxpbWl0ZXIsIGlucHV0LCBpbml0LCByb3cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIGluaXQgPT09IFwiZnVuY3Rpb25cIikgcm93ID0gaW5pdCwgaW5pdCA9IHVuZGVmaW5lZDtcbiAgdmFyIGZvcm1hdCA9IGRzdkZvcm1hdChkZWxpbWl0ZXIpO1xuICByZXR1cm4gdGV4dChpbnB1dCwgaW5pdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIHJldHVybiBmb3JtYXQucGFyc2UocmVzcG9uc2UsIHJvdyk7XG4gIH0pO1xufVxuXG5leHBvcnQgdmFyIGNzdiA9IGRzdlBhcnNlKGNzdlBhcnNlKTtcbmV4cG9ydCB2YXIgdHN2ID0gZHN2UGFyc2UodHN2UGFyc2UpO1xuIiwiZnVuY3Rpb24gbm9uZSgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gbm9uZSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4uL3NlbGVjdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiLy8gR2l2ZW4gc29tZXRoaW5nIGFycmF5IGxpa2UgKG9yIG51bGwpLCByZXR1cm5zIHNvbWV0aGluZyB0aGF0IGlzIHN0cmljdGx5IGFuXG4vLyBhcnJheS4gVGhpcyBpcyB1c2VkIHRvIGVuc3VyZSB0aGF0IGFycmF5LWxpa2Ugb2JqZWN0cyBwYXNzZWQgdG8gZDMuc2VsZWN0QWxsXG4vLyBvciBzZWxlY3Rpb24uc2VsZWN0QWxsIGFyZSBjb252ZXJ0ZWQgaW50byBwcm9wZXIgYXJyYXlzIHdoZW4gY3JlYXRpbmcgYVxuLy8gc2VsZWN0aW9uOyB3ZSBkb27igJl0IGV2ZXIgd2FudCB0byBjcmVhdGUgYSBzZWxlY3Rpb24gYmFja2VkIGJ5IGEgbGl2ZVxuLy8gSFRNTENvbGxlY3Rpb24gb3IgTm9kZUxpc3QuIEhvd2V2ZXIsIG5vdGUgdGhhdCBzZWxlY3Rpb24uc2VsZWN0QWxsIHdpbGwgdXNlIGFcbi8vIHN0YXRpYyBOb2RlTGlzdCBhcyBhIGdyb3VwLCBzaW5jZSBpdCBzYWZlbHkgZGVyaXZlZCBmcm9tIHF1ZXJ5U2VsZWN0b3JBbGwuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBhcnJheSh4KSB7XG4gIHJldHVybiB4ID09IG51bGwgPyBbXSA6IEFycmF5LmlzQXJyYXkoeCkgPyB4IDogQXJyYXkuZnJvbSh4KTtcbn1cbiIsImZ1bmN0aW9uIGVtcHR5KCkge1xuICByZXR1cm4gW107XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gZW1wdHkgOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IGFycmF5IGZyb20gXCIuLi9hcnJheS5qc1wiO1xuaW1wb3J0IHNlbGVjdG9yQWxsIGZyb20gXCIuLi9zZWxlY3RvckFsbC5qc1wiO1xuXG5mdW5jdGlvbiBhcnJheUFsbChzZWxlY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBhcnJheShzZWxlY3QuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCA9PT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBhcnJheUFsbChzZWxlY3QpO1xuICBlbHNlIHNlbGVjdCA9IHNlbGVjdG9yQWxsKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gW10sIHBhcmVudHMgPSBbXSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgc3ViZ3JvdXBzLnB1c2goc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKTtcbiAgICAgICAgcGFyZW50cy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rvcikge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMubWF0Y2hlcyhzZWxlY3Rvcik7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjaGlsZE1hdGNoZXIoc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS5tYXRjaGVzKHNlbGVjdG9yKTtcbiAgfTtcbn1cblxuIiwiaW1wb3J0IHtjaGlsZE1hdGNoZXJ9IGZyb20gXCIuLi9tYXRjaGVyLmpzXCI7XG5cbnZhciBmaW5kID0gQXJyYXkucHJvdG90eXBlLmZpbmQ7XG5cbmZ1bmN0aW9uIGNoaWxkRmluZChtYXRjaCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGZpbmQuY2FsbCh0aGlzLmNoaWxkcmVuLCBtYXRjaCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNoaWxkRmlyc3QoKSB7XG4gIHJldHVybiB0aGlzLmZpcnN0RWxlbWVudENoaWxkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QobWF0Y2ggPT0gbnVsbCA/IGNoaWxkRmlyc3RcbiAgICAgIDogY2hpbGRGaW5kKHR5cGVvZiBtYXRjaCA9PT0gXCJmdW5jdGlvblwiID8gbWF0Y2ggOiBjaGlsZE1hdGNoZXIobWF0Y2gpKSk7XG59XG4iLCJpbXBvcnQge2NoaWxkTWF0Y2hlcn0gZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxudmFyIGZpbHRlciA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXI7XG5cbmZ1bmN0aW9uIGNoaWxkcmVuKCkge1xuICByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLmNoaWxkcmVuKTtcbn1cblxuZnVuY3Rpb24gY2hpbGRyZW5GaWx0ZXIobWF0Y2gpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBmaWx0ZXIuY2FsbCh0aGlzLmNoaWxkcmVuLCBtYXRjaCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG1hdGNoKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdEFsbChtYXRjaCA9PSBudWxsID8gY2hpbGRyZW5cbiAgICAgIDogY2hpbGRyZW5GaWx0ZXIodHlwZW9mIG1hdGNoID09PSBcImZ1bmN0aW9uXCIgPyBtYXRjaCA6IGNoaWxkTWF0Y2hlcihtYXRjaCkpKTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IG1hdGNoZXIgZnJvbSBcIi4uL21hdGNoZXIuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih1cGRhdGUpIHtcbiAgcmV0dXJuIG5ldyBBcnJheSh1cGRhdGUubGVuZ3RoKTtcbn1cbiIsImltcG9ydCBzcGFyc2UgZnJvbSBcIi4vc3BhcnNlLmpzXCI7XG5pbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2VudGVyIHx8IHRoaXMuX2dyb3Vwcy5tYXAoc3BhcnNlKSwgdGhpcy5fcGFyZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBFbnRlck5vZGUocGFyZW50LCBkYXR1bSkge1xuICB0aGlzLm93bmVyRG9jdW1lbnQgPSBwYXJlbnQub3duZXJEb2N1bWVudDtcbiAgdGhpcy5uYW1lc3BhY2VVUkkgPSBwYXJlbnQubmFtZXNwYWNlVVJJO1xuICB0aGlzLl9uZXh0ID0gbnVsbDtcbiAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICB0aGlzLl9fZGF0YV9fID0gZGF0dW07XG59XG5cbkVudGVyTm9kZS5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBFbnRlck5vZGUsXG4gIGFwcGVuZENoaWxkOiBmdW5jdGlvbihjaGlsZCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgdGhpcy5fbmV4dCk7IH0sXG4gIGluc2VydEJlZm9yZTogZnVuY3Rpb24oY2hpbGQsIG5leHQpIHsgcmV0dXJuIHRoaXMuX3BhcmVudC5pbnNlcnRCZWZvcmUoY2hpbGQsIG5leHQpOyB9LFxuICBxdWVyeVNlbGVjdG9yOiBmdW5jdGlvbihzZWxlY3RvcikgeyByZXR1cm4gdGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpOyB9LFxuICBxdWVyeVNlbGVjdG9yQWxsOiBmdW5jdGlvbihzZWxlY3RvcikgeyByZXR1cm4gdGhpcy5fcGFyZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpOyB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCB7RW50ZXJOb2RlfSBmcm9tIFwiLi9lbnRlci5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuLi9jb25zdGFudC5qc1wiO1xuXG5mdW5jdGlvbiBiaW5kSW5kZXgocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSkge1xuICB2YXIgaSA9IDAsXG4gICAgICBub2RlLFxuICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICBkYXRhTGVuZ3RoID0gZGF0YS5sZW5ndGg7XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGZpdCBpbnRvIHVwZGF0ZS5cbiAgLy8gUHV0IGFueSBudWxsIG5vZGVzIGludG8gZW50ZXIuXG4gIC8vIFB1dCBhbnkgcmVtYWluaW5nIGRhdGEgaW50byBlbnRlci5cbiAgZm9yICg7IGkgPCBkYXRhTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICBub2RlLl9fZGF0YV9fID0gZGF0YVtpXTtcbiAgICAgIHVwZGF0ZVtpXSA9IG5vZGU7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVudGVyW2ldID0gbmV3IEVudGVyTm9kZShwYXJlbnQsIGRhdGFbaV0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFB1dCBhbnkgbm9uLW51bGwgbm9kZXMgdGhhdCBkb27igJl0IGZpdCBpbnRvIGV4aXQuXG4gIGZvciAoOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBiaW5kS2V5KHBhcmVudCwgZ3JvdXAsIGVudGVyLCB1cGRhdGUsIGV4aXQsIGRhdGEsIGtleSkge1xuICB2YXIgaSxcbiAgICAgIG5vZGUsXG4gICAgICBub2RlQnlLZXlWYWx1ZSA9IG5ldyBNYXAsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgIGtleVZhbHVlcyA9IG5ldyBBcnJheShncm91cExlbmd0aCksXG4gICAgICBrZXlWYWx1ZTtcblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggbm9kZS5cbiAgLy8gSWYgbXVsdGlwbGUgbm9kZXMgaGF2ZSB0aGUgc2FtZSBrZXksIHRoZSBkdXBsaWNhdGVzIGFyZSBhZGRlZCB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIGtleVZhbHVlc1tpXSA9IGtleVZhbHVlID0ga2V5LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApICsgXCJcIjtcbiAgICAgIGlmIChub2RlQnlLZXlWYWx1ZS5oYXMoa2V5VmFsdWUpKSB7XG4gICAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZUJ5S2V5VmFsdWUuc2V0KGtleVZhbHVlLCBub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggZGF0dW0uXG4gIC8vIElmIHRoZXJlIGEgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBrZXksIGpvaW4gYW5kIGFkZCBpdCB0byB1cGRhdGUuXG4gIC8vIElmIHRoZXJlIGlzIG5vdCAob3IgdGhlIGtleSBpcyBhIGR1cGxpY2F0ZSksIGFkZCBpdCB0byBlbnRlci5cbiAgZm9yIChpID0gMDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGtleVZhbHVlID0ga2V5LmNhbGwocGFyZW50LCBkYXRhW2ldLCBpLCBkYXRhKSArIFwiXCI7XG4gICAgaWYgKG5vZGUgPSBub2RlQnlLZXlWYWx1ZS5nZXQoa2V5VmFsdWUpKSB7XG4gICAgICB1cGRhdGVbaV0gPSBub2RlO1xuICAgICAgbm9kZS5fX2RhdGFfXyA9IGRhdGFbaV07XG4gICAgICBub2RlQnlLZXlWYWx1ZS5kZWxldGUoa2V5VmFsdWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbnRlcltpXSA9IG5ldyBFbnRlck5vZGUocGFyZW50LCBkYXRhW2ldKTtcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgYW55IHJlbWFpbmluZyBub2RlcyB0aGF0IHdlcmUgbm90IGJvdW5kIHRvIGRhdGEgdG8gZXhpdC5cbiAgZm9yIChpID0gMDsgaSA8IGdyb3VwTGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKG5vZGVCeUtleVZhbHVlLmdldChrZXlWYWx1ZXNbaV0pID09PSBub2RlKSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGRhdHVtKG5vZGUpIHtcbiAgcmV0dXJuIG5vZGUuX19kYXRhX187XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgaWYgKCFhcmd1bWVudHMubGVuZ3RoKSByZXR1cm4gQXJyYXkuZnJvbSh0aGlzLCBkYXR1bSk7XG5cbiAgdmFyIGJpbmQgPSBrZXkgPyBiaW5kS2V5IDogYmluZEluZGV4LFxuICAgICAgcGFyZW50cyA9IHRoaXMuX3BhcmVudHMsXG4gICAgICBncm91cHMgPSB0aGlzLl9ncm91cHM7XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB2YWx1ZSA9IGNvbnN0YW50KHZhbHVlKTtcblxuICBmb3IgKHZhciBtID0gZ3JvdXBzLmxlbmd0aCwgdXBkYXRlID0gbmV3IEFycmF5KG0pLCBlbnRlciA9IG5ldyBBcnJheShtKSwgZXhpdCA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICB2YXIgcGFyZW50ID0gcGFyZW50c1tqXSxcbiAgICAgICAgZ3JvdXAgPSBncm91cHNbal0sXG4gICAgICAgIGdyb3VwTGVuZ3RoID0gZ3JvdXAubGVuZ3RoLFxuICAgICAgICBkYXRhID0gYXJyYXlsaWtlKHZhbHVlLmNhbGwocGFyZW50LCBwYXJlbnQgJiYgcGFyZW50Ll9fZGF0YV9fLCBqLCBwYXJlbnRzKSksXG4gICAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgICAgZW50ZXJHcm91cCA9IGVudGVyW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICB1cGRhdGVHcm91cCA9IHVwZGF0ZVtqXSA9IG5ldyBBcnJheShkYXRhTGVuZ3RoKSxcbiAgICAgICAgZXhpdEdyb3VwID0gZXhpdFtqXSA9IG5ldyBBcnJheShncm91cExlbmd0aCk7XG5cbiAgICBiaW5kKHBhcmVudCwgZ3JvdXAsIGVudGVyR3JvdXAsIHVwZGF0ZUdyb3VwLCBleGl0R3JvdXAsIGRhdGEsIGtleSk7XG5cbiAgICAvLyBOb3cgY29ubmVjdCB0aGUgZW50ZXIgbm9kZXMgdG8gdGhlaXIgZm9sbG93aW5nIHVwZGF0ZSBub2RlLCBzdWNoIHRoYXRcbiAgICAvLyBhcHBlbmRDaGlsZCBjYW4gaW5zZXJ0IHRoZSBtYXRlcmlhbGl6ZWQgZW50ZXIgbm9kZSBiZWZvcmUgdGhpcyBub2RlLFxuICAgIC8vIHJhdGhlciB0aGFuIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmVudCBub2RlLlxuICAgIGZvciAodmFyIGkwID0gMCwgaTEgPSAwLCBwcmV2aW91cywgbmV4dDsgaTAgPCBkYXRhTGVuZ3RoOyArK2kwKSB7XG4gICAgICBpZiAocHJldmlvdXMgPSBlbnRlckdyb3VwW2kwXSkge1xuICAgICAgICBpZiAoaTAgPj0gaTEpIGkxID0gaTAgKyAxO1xuICAgICAgICB3aGlsZSAoIShuZXh0ID0gdXBkYXRlR3JvdXBbaTFdKSAmJiArK2kxIDwgZGF0YUxlbmd0aCk7XG4gICAgICAgIHByZXZpb3VzLl9uZXh0ID0gbmV4dCB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSA9IG5ldyBTZWxlY3Rpb24odXBkYXRlLCBwYXJlbnRzKTtcbiAgdXBkYXRlLl9lbnRlciA9IGVudGVyO1xuICB1cGRhdGUuX2V4aXQgPSBleGl0O1xuICByZXR1cm4gdXBkYXRlO1xufVxuXG4vLyBHaXZlbiBzb21lIGRhdGEsIHRoaXMgcmV0dXJucyBhbiBhcnJheS1saWtlIHZpZXcgb2YgaXQ6IGFuIG9iamVjdCB0aGF0XG4vLyBleHBvc2VzIGEgbGVuZ3RoIHByb3BlcnR5IGFuZCBhbGxvd3MgbnVtZXJpYyBpbmRleGluZy4gTm90ZSB0aGF0IHVubGlrZVxuLy8gc2VsZWN0QWxsLCB0aGlzIGlzbuKAmXQgd29ycmllZCBhYm91dCDigJxsaXZl4oCdIGNvbGxlY3Rpb25zIGJlY2F1c2UgdGhlIHJlc3VsdGluZ1xuLy8gYXJyYXkgd2lsbCBvbmx5IGJlIHVzZWQgYnJpZWZseSB3aGlsZSBkYXRhIGlzIGJlaW5nIGJvdW5kLiAoSXQgaXMgcG9zc2libGUgdG9cbi8vIGNhdXNlIHRoZSBkYXRhIHRvIGNoYW5nZSB3aGlsZSBpdGVyYXRpbmcgYnkgdXNpbmcgYSBrZXkgZnVuY3Rpb24sIGJ1dCBwbGVhc2Vcbi8vIGRvbuKAmXQ7IHdl4oCZZCByYXRoZXIgYXZvaWQgYSBncmF0dWl0b3VzIGNvcHkuKVxuZnVuY3Rpb24gYXJyYXlsaWtlKGRhdGEpIHtcbiAgcmV0dXJuIHR5cGVvZiBkYXRhID09PSBcIm9iamVjdFwiICYmIFwibGVuZ3RoXCIgaW4gZGF0YVxuICAgID8gZGF0YSAvLyBBcnJheSwgVHlwZWRBcnJheSwgTm9kZUxpc3QsIGFycmF5LWxpa2VcbiAgICA6IEFycmF5LmZyb20oZGF0YSk7IC8vIE1hcCwgU2V0LCBpdGVyYWJsZSwgc3RyaW5nLCBvciBhbnl0aGluZyBlbHNlXG59XG4iLCJpbXBvcnQgc3BhcnNlIGZyb20gXCIuL3NwYXJzZS5qc1wiO1xuaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gbmV3IFNlbGVjdGlvbih0aGlzLl9leGl0IHx8IHRoaXMuX2dyb3Vwcy5tYXAoc3BhcnNlKSwgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihvbmVudGVyLCBvbnVwZGF0ZSwgb25leGl0KSB7XG4gIHZhciBlbnRlciA9IHRoaXMuZW50ZXIoKSwgdXBkYXRlID0gdGhpcywgZXhpdCA9IHRoaXMuZXhpdCgpO1xuICBpZiAodHlwZW9mIG9uZW50ZXIgPT09IFwiZnVuY3Rpb25cIikge1xuICAgIGVudGVyID0gb25lbnRlcihlbnRlcik7XG4gICAgaWYgKGVudGVyKSBlbnRlciA9IGVudGVyLnNlbGVjdGlvbigpO1xuICB9IGVsc2Uge1xuICAgIGVudGVyID0gZW50ZXIuYXBwZW5kKG9uZW50ZXIgKyBcIlwiKTtcbiAgfVxuICBpZiAob251cGRhdGUgIT0gbnVsbCkge1xuICAgIHVwZGF0ZSA9IG9udXBkYXRlKHVwZGF0ZSk7XG4gICAgaWYgKHVwZGF0ZSkgdXBkYXRlID0gdXBkYXRlLnNlbGVjdGlvbigpO1xuICB9XG4gIGlmIChvbmV4aXQgPT0gbnVsbCkgZXhpdC5yZW1vdmUoKTsgZWxzZSBvbmV4aXQoZXhpdCk7XG4gIHJldHVybiBlbnRlciAmJiB1cGRhdGUgPyBlbnRlci5tZXJnZSh1cGRhdGUpLm9yZGVyKCkgOiB1cGRhdGU7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29udGV4dCkge1xuICB2YXIgc2VsZWN0aW9uID0gY29udGV4dC5zZWxlY3Rpb24gPyBjb250ZXh0LnNlbGVjdGlvbigpIDogY29udGV4dDtcblxuICBmb3IgKHZhciBncm91cHMwID0gdGhpcy5fZ3JvdXBzLCBncm91cHMxID0gc2VsZWN0aW9uLl9ncm91cHMsIG0wID0gZ3JvdXBzMC5sZW5ndGgsIG0xID0gZ3JvdXBzMS5sZW5ndGgsIG0gPSBNYXRoLm1pbihtMCwgbTEpLCBtZXJnZXMgPSBuZXcgQXJyYXkobTApLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwMCA9IGdyb3VwczBbal0sIGdyb3VwMSA9IGdyb3VwczFbal0sIG4gPSBncm91cDAubGVuZ3RoLCBtZXJnZSA9IG1lcmdlc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXAwW2ldIHx8IGdyb3VwMVtpXSkge1xuICAgICAgICBtZXJnZVtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IGogPCBtMDsgKytqKSB7XG4gICAgbWVyZ2VzW2pdID0gZ3JvdXBzMFtqXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAtMSwgbSA9IGdyb3Vwcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSBncm91cC5sZW5ndGggLSAxLCBuZXh0ID0gZ3JvdXBbaV0sIG5vZGU7IC0taSA+PSAwOykge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBpZiAobmV4dCAmJiBub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG5leHQpIF4gNCkgbmV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBuZXh0KTtcbiAgICAgICAgbmV4dCA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29tcGFyZSkge1xuICBpZiAoIWNvbXBhcmUpIGNvbXBhcmUgPSBhc2NlbmRpbmc7XG5cbiAgZnVuY3Rpb24gY29tcGFyZU5vZGUoYSwgYikge1xuICAgIHJldHVybiBhICYmIGIgPyBjb21wYXJlKGEuX19kYXRhX18sIGIuX19kYXRhX18pIDogIWEgLSAhYjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHNvcnRncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHNvcnRncm91cCA9IHNvcnRncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNvcnRncm91cFtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvcnRncm91cC5zb3J0KGNvbXBhcmVOb2RlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHNvcnRncm91cHMsIHRoaXMuX3BhcmVudHMpLm9yZGVyKCk7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMF07XG4gIGFyZ3VtZW50c1swXSA9IHRoaXM7XG4gIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBBcnJheS5mcm9tKHRoaXMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBqID0gMCwgbSA9IGdyb3Vwcy5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgaSA9IDAsIG4gPSBncm91cC5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgIHZhciBub2RlID0gZ3JvdXBbaV07XG4gICAgICBpZiAobm9kZSkgcmV0dXJuIG5vZGU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgbGV0IHNpemUgPSAwO1xuICBmb3IgKGNvbnN0IG5vZGUgb2YgdGhpcykgKytzaXplOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXVudXNlZC12YXJzXG4gIHJldHVybiBzaXplO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiAhdGhpcy5ub2RlKCk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaykge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSBjYWxsYmFjay5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gdGhpcztcbn1cbiIsImV4cG9ydCB2YXIgeGh0bWwgPSBcImh0dHA6Ly93d3cudzMub3JnLzE5OTkveGh0bWxcIjtcblxuZXhwb3J0IGRlZmF1bHQge1xuICBzdmc6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIixcbiAgeGh0bWw6IHhodG1sLFxuICB4bGluazogXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rXCIsXG4gIHhtbDogXCJodHRwOi8vd3d3LnczLm9yZy9YTUwvMTk5OC9uYW1lc3BhY2VcIixcbiAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC94bWxucy9cIlxufTtcbiIsImltcG9ydCBuYW1lc3BhY2VzIGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgcHJlZml4ID0gbmFtZSArPSBcIlwiLCBpID0gcHJlZml4LmluZGV4T2YoXCI6XCIpO1xuICBpZiAoaSA+PSAwICYmIChwcmVmaXggPSBuYW1lLnNsaWNlKDAsIGkpKSAhPT0gXCJ4bWxuc1wiKSBuYW1lID0gbmFtZS5zbGljZShpICsgMSk7XG4gIHJldHVybiBuYW1lc3BhY2VzLmhhc093blByb3BlcnR5KHByZWZpeCkgPyB7c3BhY2U6IG5hbWVzcGFjZXNbcHJlZml4XSwgbG9jYWw6IG5hbWV9IDogbmFtZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wcm90b3R5cGUtYnVpbHRpbnNcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4uL25hbWVzcGFjZS5qc1wiO1xuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlTlMoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudE5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHZhbHVlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgZWxzZSB0aGlzLnNldEF0dHJpYnV0ZShuYW1lLCB2KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoZnVsbG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHYgPT0gbnVsbCkgdGhpcy5yZW1vdmVBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIHYpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIG5vZGUgPSB0aGlzLm5vZGUoKTtcbiAgICByZXR1cm4gZnVsbG5hbWUubG9jYWxcbiAgICAgICAgPyBub2RlLmdldEF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbClcbiAgICAgICAgOiBub2RlLmdldEF0dHJpYnV0ZShmdWxsbmFtZSk7XG4gIH1cblxuICByZXR1cm4gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJSZW1vdmVOUyA6IGF0dHJSZW1vdmUpIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJGdW5jdGlvbk5TIDogYXR0ckZ1bmN0aW9uKVxuICAgICAgOiAoZnVsbG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudCkpKShmdWxsbmFtZSwgdmFsdWUpKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUpIHtcbiAgcmV0dXJuIChub2RlLm93bmVyRG9jdW1lbnQgJiYgbm9kZS5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3KSAvLyBub2RlIGlzIGEgTm9kZVxuICAgICAgfHwgKG5vZGUuZG9jdW1lbnQgJiYgbm9kZSkgLy8gbm9kZSBpcyBhIFdpbmRvd1xuICAgICAgfHwgbm9kZS5kZWZhdWx0VmlldzsgLy8gbm9kZSBpcyBhIERvY3VtZW50XG59XG4iLCJpbXBvcnQgZGVmYXVsdFZpZXcgZnJvbSBcIi4uL3dpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gICAgZWxzZSB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIHYsIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMVxuICAgICAgPyB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgICAgICAgID8gc3R5bGVSZW1vdmUgOiB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgICAgPyBzdHlsZUZ1bmN0aW9uXG4gICAgICAgICAgICA6IHN0eWxlQ29uc3RhbnQpKG5hbWUsIHZhbHVlLCBwcmlvcml0eSA9PSBudWxsID8gXCJcIiA6IHByaW9yaXR5KSlcbiAgICAgIDogc3R5bGVWYWx1ZSh0aGlzLm5vZGUoKSwgbmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHlsZVZhbHVlKG5vZGUsIG5hbWUpIHtcbiAgcmV0dXJuIG5vZGUuc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKVxuICAgICAgfHwgZGVmYXVsdFZpZXcobm9kZSkuZ2V0Q29tcHV0ZWRTdHlsZShub2RlLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKG5hbWUpO1xufVxuIiwiZnVuY3Rpb24gcHJvcGVydHlSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgZGVsZXRlIHRoaXNbbmFtZV07XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5Q29uc3RhbnQobmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXNbbmFtZV0gPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvcGVydHlGdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIGRlbGV0ZSB0aGlzW25hbWVdO1xuICAgIGVsc2UgdGhpc1tuYW1lXSA9IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID4gMVxuICAgICAgPyB0aGlzLmVhY2goKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IHByb3BlcnR5UmVtb3ZlIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IHByb3BlcnR5RnVuY3Rpb25cbiAgICAgICAgICA6IHByb3BlcnR5Q29uc3RhbnQpKG5hbWUsIHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKClbbmFtZV07XG59XG4iLCJmdW5jdGlvbiBjbGFzc0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnRyaW0oKS5zcGxpdCgvXnxcXHMrLyk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzTGlzdChub2RlKSB7XG4gIHJldHVybiBub2RlLmNsYXNzTGlzdCB8fCBuZXcgQ2xhc3NMaXN0KG5vZGUpO1xufVxuXG5mdW5jdGlvbiBDbGFzc0xpc3Qobm9kZSkge1xuICB0aGlzLl9ub2RlID0gbm9kZTtcbiAgdGhpcy5fbmFtZXMgPSBjbGFzc0FycmF5KG5vZGUuZ2V0QXR0cmlidXRlKFwiY2xhc3NcIikgfHwgXCJcIik7XG59XG5cbkNsYXNzTGlzdC5wcm90b3R5cGUgPSB7XG4gIGFkZDogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICBpZiAoaSA8IDApIHtcbiAgICAgIHRoaXMuX25hbWVzLnB1c2gobmFtZSk7XG4gICAgICB0aGlzLl9ub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMuX25hbWVzLmpvaW4oXCIgXCIpKTtcbiAgICB9XG4gIH0sXG4gIHJlbW92ZTogZnVuY3Rpb24obmFtZSkge1xuICAgIHZhciBpID0gdGhpcy5fbmFtZXMuaW5kZXhPZihuYW1lKTtcbiAgICBpZiAoaSA+PSAwKSB7XG4gICAgICB0aGlzLl9uYW1lcy5zcGxpY2UoaSwgMSk7XG4gICAgICB0aGlzLl9ub2RlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIHRoaXMuX25hbWVzLmpvaW4oXCIgXCIpKTtcbiAgICB9XG4gIH0sXG4gIGNvbnRhaW5zOiBmdW5jdGlvbihuYW1lKSB7XG4gICAgcmV0dXJuIHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSkgPj0gMDtcbiAgfVxufTtcblxuZnVuY3Rpb24gY2xhc3NlZEFkZChub2RlLCBuYW1lcykge1xuICB2YXIgbGlzdCA9IGNsYXNzTGlzdChub2RlKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbikgbGlzdC5hZGQobmFtZXNbaV0pO1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkUmVtb3ZlKG5vZGUsIG5hbWVzKSB7XG4gIHZhciBsaXN0ID0gY2xhc3NMaXN0KG5vZGUpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gIHdoaWxlICgrK2kgPCBuKSBsaXN0LnJlbW92ZShuYW1lc1tpXSk7XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRUcnVlKG5hbWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc2VkQWRkKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZEZhbHNlKG5hbWVzKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBjbGFzc2VkUmVtb3ZlKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZEZ1bmN0aW9uKG5hbWVzLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgKHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPyBjbGFzc2VkQWRkIDogY2xhc3NlZFJlbW92ZSkodGhpcywgbmFtZXMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgbmFtZXMgPSBjbGFzc0FycmF5KG5hbWUgKyBcIlwiKTtcblxuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB2YXIgbGlzdCA9IGNsYXNzTGlzdCh0aGlzLm5vZGUoKSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgICB3aGlsZSAoKytpIDwgbikgaWYgKCFsaXN0LmNvbnRhaW5zKG5hbWVzW2ldKSkgcmV0dXJuIGZhbHNlO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gY2xhc3NlZEZ1bmN0aW9uIDogdmFsdWVcbiAgICAgID8gY2xhc3NlZFRydWVcbiAgICAgIDogY2xhc3NlZEZhbHNlKShuYW1lcywgdmFsdWUpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRSZW1vdmUoKSB7XG4gIHRoaXMudGV4dENvbnRlbnQgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiB0ZXh0Q29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHYgPT0gbnVsbCA/IFwiXCIgOiB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2godmFsdWUgPT0gbnVsbFxuICAgICAgICAgID8gdGV4dFJlbW92ZSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgICAgID8gdGV4dEZ1bmN0aW9uXG4gICAgICAgICAgOiB0ZXh0Q29uc3RhbnQpKHZhbHVlKSlcbiAgICAgIDogdGhpcy5ub2RlKCkudGV4dENvbnRlbnQ7XG59XG4iLCJmdW5jdGlvbiBodG1sUmVtb3ZlKCkge1xuICB0aGlzLmlubmVySFRNTCA9IFwiXCI7XG59XG5cbmZ1bmN0aW9uIGh0bWxDb25zdGFudCh2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gaHRtbEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgdGhpcy5pbm5lckhUTUwgPSB2ID09IG51bGwgPyBcIlwiIDogdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IGh0bWxSZW1vdmUgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGh0bWxGdW5jdGlvblxuICAgICAgICAgIDogaHRtbENvbnN0YW50KSh2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpLmlubmVySFRNTDtcbn1cbiIsImZ1bmN0aW9uIHJhaXNlKCkge1xuICBpZiAodGhpcy5uZXh0U2libGluZykgdGhpcy5wYXJlbnROb2RlLmFwcGVuZENoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyYWlzZSk7XG59XG4iLCJmdW5jdGlvbiBsb3dlcigpIHtcbiAgaWYgKHRoaXMucHJldmlvdXNTaWJsaW5nKSB0aGlzLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKHRoaXMsIHRoaXMucGFyZW50Tm9kZS5maXJzdENoaWxkKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gobG93ZXIpO1xufVxuIiwiaW1wb3J0IG5hbWVzcGFjZSBmcm9tIFwiLi9uYW1lc3BhY2UuanNcIjtcbmltcG9ydCB7eGh0bWx9IGZyb20gXCIuL25hbWVzcGFjZXMuanNcIjtcblxuZnVuY3Rpb24gY3JlYXRvckluaGVyaXQobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGRvY3VtZW50ID0gdGhpcy5vd25lckRvY3VtZW50LFxuICAgICAgICB1cmkgPSB0aGlzLm5hbWVzcGFjZVVSSTtcbiAgICByZXR1cm4gdXJpID09PSB4aHRtbCAmJiBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQubmFtZXNwYWNlVVJJID09PSB4aHRtbFxuICAgICAgICA/IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQobmFtZSlcbiAgICAgICAgOiBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlModXJpLCBuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY3JlYXRvckZpeGVkKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5vd25lckRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBmdWxsbmFtZSA9IG5hbWVzcGFjZShuYW1lKTtcbiAgcmV0dXJuIChmdWxsbmFtZS5sb2NhbFxuICAgICAgPyBjcmVhdG9yRml4ZWRcbiAgICAgIDogY3JlYXRvckluaGVyaXQpKGZ1bGxuYW1lKTtcbn1cbiIsImltcG9ydCBjcmVhdG9yIGZyb20gXCIuLi9jcmVhdG9yLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGNyZWF0ZSA9IHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIgPyBuYW1lIDogY3JlYXRvcihuYW1lKTtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmFwcGVuZENoaWxkKGNyZWF0ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfSk7XG59XG4iLCJpbXBvcnQgY3JlYXRvciBmcm9tIFwiLi4vY3JlYXRvci5qc1wiO1xuaW1wb3J0IHNlbGVjdG9yIGZyb20gXCIuLi9zZWxlY3Rvci5qc1wiO1xuXG5mdW5jdGlvbiBjb25zdGFudE51bGwoKSB7XG4gIHJldHVybiBudWxsO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCBiZWZvcmUpIHtcbiAgdmFyIGNyZWF0ZSA9IHR5cGVvZiBuYW1lID09PSBcImZ1bmN0aW9uXCIgPyBuYW1lIDogY3JlYXRvcihuYW1lKSxcbiAgICAgIHNlbGVjdCA9IGJlZm9yZSA9PSBudWxsID8gY29uc3RhbnROdWxsIDogdHlwZW9mIGJlZm9yZSA9PT0gXCJmdW5jdGlvblwiID8gYmVmb3JlIDogc2VsZWN0b3IoYmVmb3JlKTtcbiAgcmV0dXJuIHRoaXMuc2VsZWN0KGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLmluc2VydEJlZm9yZShjcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSwgc2VsZWN0LmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgfHwgbnVsbCk7XG4gIH0pO1xufVxuIiwiZnVuY3Rpb24gcmVtb3ZlKCkge1xuICB2YXIgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICBpZiAocGFyZW50KSBwYXJlbnQucmVtb3ZlQ2hpbGQodGhpcyk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKHJlbW92ZSk7XG59XG4iLCJmdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZShmYWxzZSksIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgcmV0dXJuIHBhcmVudCA/IHBhcmVudC5pbnNlcnRCZWZvcmUoY2xvbmUsIHRoaXMubmV4dFNpYmxpbmcpIDogY2xvbmU7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbl9jbG9uZURlZXAoKSB7XG4gIHZhciBjbG9uZSA9IHRoaXMuY2xvbmVOb2RlKHRydWUpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihkZWVwKSB7XG4gIHJldHVybiB0aGlzLnNlbGVjdChkZWVwID8gc2VsZWN0aW9uX2Nsb25lRGVlcCA6IHNlbGVjdGlvbl9jbG9uZVNoYWxsb3cpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5wcm9wZXJ0eShcIl9fZGF0YV9fXCIsIHZhbHVlKVxuICAgICAgOiB0aGlzLm5vZGUoKS5fX2RhdGFfXztcbn1cbiIsImZ1bmN0aW9uIGNvbnRleHRMaXN0ZW5lcihsaXN0ZW5lcikge1xuICByZXR1cm4gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50LCB0aGlzLl9fZGF0YV9fKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VUeXBlbmFtZXModHlwZW5hbWVzKSB7XG4gIHJldHVybiB0eXBlbmFtZXMudHJpbSgpLnNwbGl0KC9efFxccysvKS5tYXAoZnVuY3Rpb24odCkge1xuICAgIHZhciBuYW1lID0gXCJcIiwgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgbmFtZSA9IHQuc2xpY2UoaSArIDEpLCB0ID0gdC5zbGljZSgwLCBpKTtcbiAgICByZXR1cm4ge3R5cGU6IHQsIG5hbWU6IG5hbWV9O1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb25SZW1vdmUodHlwZW5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBvbiA9IHRoaXMuX19vbjtcbiAgICBpZiAoIW9uKSByZXR1cm47XG4gICAgZm9yICh2YXIgaiA9IDAsIGkgPSAtMSwgbSA9IG9uLmxlbmd0aCwgbzsgaiA8IG07ICsraikge1xuICAgICAgaWYgKG8gPSBvbltqXSwgKCF0eXBlbmFtZS50eXBlIHx8IG8udHlwZSA9PT0gdHlwZW5hbWUudHlwZSkgJiYgby5uYW1lID09PSB0eXBlbmFtZS5uYW1lKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihvLnR5cGUsIG8ubGlzdGVuZXIsIG8ub3B0aW9ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvblsrK2ldID0gbztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKCsraSkgb24ubGVuZ3RoID0gaTtcbiAgICBlbHNlIGRlbGV0ZSB0aGlzLl9fb247XG4gIH07XG59XG5cbmZ1bmN0aW9uIG9uQWRkKHR5cGVuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uID0gdGhpcy5fX29uLCBvLCBsaXN0ZW5lciA9IGNvbnRleHRMaXN0ZW5lcih2YWx1ZSk7XG4gICAgaWYgKG9uKSBmb3IgKHZhciBqID0gMCwgbSA9IG9uLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgICAgaWYgKChvID0gb25bal0pLnR5cGUgPT09IHR5cGVuYW1lLnR5cGUgJiYgby5uYW1lID09PSB0eXBlbmFtZS5uYW1lKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRXZlbnRMaXN0ZW5lcihvLnR5cGUsIG8ubGlzdGVuZXIsIG8ub3B0aW9ucyk7XG4gICAgICAgIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihvLnR5cGUsIG8ubGlzdGVuZXIgPSBsaXN0ZW5lciwgby5vcHRpb25zID0gb3B0aW9ucyk7XG4gICAgICAgIG8udmFsdWUgPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIodHlwZW5hbWUudHlwZSwgbGlzdGVuZXIsIG9wdGlvbnMpO1xuICAgIG8gPSB7dHlwZTogdHlwZW5hbWUudHlwZSwgbmFtZTogdHlwZW5hbWUubmFtZSwgdmFsdWU6IHZhbHVlLCBsaXN0ZW5lcjogbGlzdGVuZXIsIG9wdGlvbnM6IG9wdGlvbnN9O1xuICAgIGlmICghb24pIHRoaXMuX19vbiA9IFtvXTtcbiAgICBlbHNlIG9uLnB1c2gobyk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHR5cGVuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgdHlwZW5hbWVzID0gcGFyc2VUeXBlbmFtZXModHlwZW5hbWUgKyBcIlwiKSwgaSwgbiA9IHR5cGVuYW1lcy5sZW5ndGgsIHQ7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIG9uID0gdGhpcy5ub2RlKCkuX19vbjtcbiAgICBpZiAob24pIGZvciAodmFyIGogPSAwLCBtID0gb24ubGVuZ3RoLCBvOyBqIDwgbTsgKytqKSB7XG4gICAgICBmb3IgKGkgPSAwLCBvID0gb25bal07IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKCh0ID0gdHlwZW5hbWVzW2ldKS50eXBlID09PSBvLnR5cGUgJiYgdC5uYW1lID09PSBvLm5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gby52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm47XG4gIH1cblxuICBvbiA9IHZhbHVlID8gb25BZGQgOiBvblJlbW92ZTtcbiAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgdGhpcy5lYWNoKG9uKHR5cGVuYW1lc1tpXSwgdmFsdWUsIG9wdGlvbnMpKTtcbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQgZGVmYXVsdFZpZXcgZnJvbSBcIi4uL3dpbmRvdy5qc1wiO1xuXG5mdW5jdGlvbiBkaXNwYXRjaEV2ZW50KG5vZGUsIHR5cGUsIHBhcmFtcykge1xuICB2YXIgd2luZG93ID0gZGVmYXVsdFZpZXcobm9kZSksXG4gICAgICBldmVudCA9IHdpbmRvdy5DdXN0b21FdmVudDtcblxuICBpZiAodHlwZW9mIGV2ZW50ID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICBldmVudCA9IG5ldyBldmVudCh0eXBlLCBwYXJhbXMpO1xuICB9IGVsc2Uge1xuICAgIGV2ZW50ID0gd2luZG93LmRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIik7XG4gICAgaWYgKHBhcmFtcykgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIHBhcmFtcy5idWJibGVzLCBwYXJhbXMuY2FuY2VsYWJsZSksIGV2ZW50LmRldGFpbCA9IHBhcmFtcy5kZXRhaWw7XG4gICAgZWxzZSBldmVudC5pbml0RXZlbnQodHlwZSwgZmFsc2UsIGZhbHNlKTtcbiAgfVxuXG4gIG5vZGUuZGlzcGF0Y2hFdmVudChldmVudCk7XG59XG5cbmZ1bmN0aW9uIGRpc3BhdGNoQ29uc3RhbnQodHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gZGlzcGF0Y2hFdmVudCh0aGlzLCB0eXBlLCBwYXJhbXMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaEZ1bmN0aW9uKHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaCgodHlwZW9mIHBhcmFtcyA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGRpc3BhdGNoRnVuY3Rpb25cbiAgICAgIDogZGlzcGF0Y2hDb25zdGFudCkodHlwZSwgcGFyYW1zKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiooKSB7XG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB5aWVsZCBub2RlO1xuICAgIH1cbiAgfVxufVxuIiwiaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3QgZnJvbSBcIi4vc2VsZWN0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdEFsbCBmcm9tIFwiLi9zZWxlY3RBbGwuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2VsZWN0Q2hpbGQgZnJvbSBcIi4vc2VsZWN0Q2hpbGQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fc2VsZWN0Q2hpbGRyZW4gZnJvbSBcIi4vc2VsZWN0Q2hpbGRyZW4uanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZmlsdGVyIGZyb20gXCIuL2ZpbHRlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9kYXRhIGZyb20gXCIuL2RhdGEuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZW50ZXIgZnJvbSBcIi4vZW50ZXIuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZXhpdCBmcm9tIFwiLi9leGl0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2pvaW4gZnJvbSBcIi4vam9pbi5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9tZXJnZSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9vcmRlciBmcm9tIFwiLi9vcmRlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zb3J0IGZyb20gXCIuL3NvcnQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2FsbCBmcm9tIFwiLi9jYWxsLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX25vZGVzIGZyb20gXCIuL25vZGVzLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX25vZGUgZnJvbSBcIi4vbm9kZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zaXplIGZyb20gXCIuL3NpemUuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZW1wdHkgZnJvbSBcIi4vZW1wdHkuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fZWFjaCBmcm9tIFwiLi9lYWNoLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2F0dHIgZnJvbSBcIi4vYXR0ci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9zdHlsZSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9wcm9wZXJ0eSBmcm9tIFwiLi9wcm9wZXJ0eS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9jbGFzc2VkIGZyb20gXCIuL2NsYXNzZWQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fdGV4dCBmcm9tIFwiLi90ZXh0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2h0bWwgZnJvbSBcIi4vaHRtbC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9yYWlzZSBmcm9tIFwiLi9yYWlzZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9sb3dlciBmcm9tIFwiLi9sb3dlci5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9hcHBlbmQgZnJvbSBcIi4vYXBwZW5kLmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2luc2VydCBmcm9tIFwiLi9pbnNlcnQuanNcIjtcbmltcG9ydCBzZWxlY3Rpb25fcmVtb3ZlIGZyb20gXCIuL3JlbW92ZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9jbG9uZSBmcm9tIFwiLi9jbG9uZS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9kYXR1bSBmcm9tIFwiLi9kYXR1bS5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9vbiBmcm9tIFwiLi9vbi5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9kaXNwYXRjaCBmcm9tIFwiLi9kaXNwYXRjaC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl9pdGVyYXRvciBmcm9tIFwiLi9pdGVyYXRvci5qc1wiO1xuXG5leHBvcnQgdmFyIHJvb3QgPSBbbnVsbF07XG5cbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3Rpb24oZ3JvdXBzLCBwYXJlbnRzKSB7XG4gIHRoaXMuX2dyb3VwcyA9IGdyb3VwcztcbiAgdGhpcy5fcGFyZW50cyA9IHBhcmVudHM7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oW1tkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdXSwgcm9vdCk7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbl9zZWxlY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzO1xufVxuXG5TZWxlY3Rpb24ucHJvdG90eXBlID0gc2VsZWN0aW9uLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFNlbGVjdGlvbixcbiAgc2VsZWN0OiBzZWxlY3Rpb25fc2VsZWN0LFxuICBzZWxlY3RBbGw6IHNlbGVjdGlvbl9zZWxlY3RBbGwsXG4gIHNlbGVjdENoaWxkOiBzZWxlY3Rpb25fc2VsZWN0Q2hpbGQsXG4gIHNlbGVjdENoaWxkcmVuOiBzZWxlY3Rpb25fc2VsZWN0Q2hpbGRyZW4sXG4gIGZpbHRlcjogc2VsZWN0aW9uX2ZpbHRlcixcbiAgZGF0YTogc2VsZWN0aW9uX2RhdGEsXG4gIGVudGVyOiBzZWxlY3Rpb25fZW50ZXIsXG4gIGV4aXQ6IHNlbGVjdGlvbl9leGl0LFxuICBqb2luOiBzZWxlY3Rpb25fam9pbixcbiAgbWVyZ2U6IHNlbGVjdGlvbl9tZXJnZSxcbiAgc2VsZWN0aW9uOiBzZWxlY3Rpb25fc2VsZWN0aW9uLFxuICBvcmRlcjogc2VsZWN0aW9uX29yZGVyLFxuICBzb3J0OiBzZWxlY3Rpb25fc29ydCxcbiAgY2FsbDogc2VsZWN0aW9uX2NhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fbm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9ub2RlLFxuICBzaXplOiBzZWxlY3Rpb25fc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX2VhY2gsXG4gIGF0dHI6IHNlbGVjdGlvbl9hdHRyLFxuICBzdHlsZTogc2VsZWN0aW9uX3N0eWxlLFxuICBwcm9wZXJ0eTogc2VsZWN0aW9uX3Byb3BlcnR5LFxuICBjbGFzc2VkOiBzZWxlY3Rpb25fY2xhc3NlZCxcbiAgdGV4dDogc2VsZWN0aW9uX3RleHQsXG4gIGh0bWw6IHNlbGVjdGlvbl9odG1sLFxuICByYWlzZTogc2VsZWN0aW9uX3JhaXNlLFxuICBsb3dlcjogc2VsZWN0aW9uX2xvd2VyLFxuICBhcHBlbmQ6IHNlbGVjdGlvbl9hcHBlbmQsXG4gIGluc2VydDogc2VsZWN0aW9uX2luc2VydCxcbiAgcmVtb3ZlOiBzZWxlY3Rpb25fcmVtb3ZlLFxuICBjbG9uZTogc2VsZWN0aW9uX2Nsb25lLFxuICBkYXR1bTogc2VsZWN0aW9uX2RhdHVtLFxuICBvbjogc2VsZWN0aW9uX29uLFxuICBkaXNwYXRjaDogc2VsZWN0aW9uX2Rpc3BhdGNoLFxuICBbU3ltYm9sLml0ZXJhdG9yXTogc2VsZWN0aW9uX2l0ZXJhdG9yXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzZWxlY3Rpb247XG4iLCJpbXBvcnQge1NlbGVjdGlvbiwgcm9vdH0gZnJvbSBcIi4vc2VsZWN0aW9uL2luZGV4LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCJcbiAgICAgID8gbmV3IFNlbGVjdGlvbihbW2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXV0sIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdKVxuICAgICAgOiBuZXcgU2VsZWN0aW9uKFtbc2VsZWN0b3JdXSwgcm9vdCk7XG59XG4iLCJpbXBvcnQgYXJyYXkgZnJvbSBcIi4vYXJyYXkuanNcIjtcbmltcG9ydCB7U2VsZWN0aW9uLCByb290fSBmcm9tIFwiLi9zZWxlY3Rpb24vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHR5cGVvZiBzZWxlY3RvciA9PT0gXCJzdHJpbmdcIlxuICAgICAgPyBuZXcgU2VsZWN0aW9uKFtkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKV0sIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdKVxuICAgICAgOiBuZXcgU2VsZWN0aW9uKFthcnJheShzZWxlY3RvcildLCByb290KTtcbn1cbiIsImNvbnN0IGUxMCA9IE1hdGguc3FydCg1MCksXG4gICAgZTUgPSBNYXRoLnNxcnQoMTApLFxuICAgIGUyID0gTWF0aC5zcXJ0KDIpO1xuXG5mdW5jdGlvbiB0aWNrU3BlYyhzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgY29uc3Qgc3RlcCA9IChzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgcG93ZXIgPSBNYXRoLmZsb29yKE1hdGgubG9nMTAoc3RlcCkpLFxuICAgICAgZXJyb3IgPSBzdGVwIC8gTWF0aC5wb3coMTAsIHBvd2VyKSxcbiAgICAgIGZhY3RvciA9IGVycm9yID49IGUxMCA/IDEwIDogZXJyb3IgPj0gZTUgPyA1IDogZXJyb3IgPj0gZTIgPyAyIDogMTtcbiAgbGV0IGkxLCBpMiwgaW5jO1xuICBpZiAocG93ZXIgPCAwKSB7XG4gICAgaW5jID0gTWF0aC5wb3coMTAsIC1wb3dlcikgLyBmYWN0b3I7XG4gICAgaTEgPSBNYXRoLnJvdW5kKHN0YXJ0ICogaW5jKTtcbiAgICBpMiA9IE1hdGgucm91bmQoc3RvcCAqIGluYyk7XG4gICAgaWYgKGkxIC8gaW5jIDwgc3RhcnQpICsraTE7XG4gICAgaWYgKGkyIC8gaW5jID4gc3RvcCkgLS1pMjtcbiAgICBpbmMgPSAtaW5jO1xuICB9IGVsc2Uge1xuICAgIGluYyA9IE1hdGgucG93KDEwLCBwb3dlcikgKiBmYWN0b3I7XG4gICAgaTEgPSBNYXRoLnJvdW5kKHN0YXJ0IC8gaW5jKTtcbiAgICBpMiA9IE1hdGgucm91bmQoc3RvcCAvIGluYyk7XG4gICAgaWYgKGkxICogaW5jIDwgc3RhcnQpICsraTE7XG4gICAgaWYgKGkyICogaW5jID4gc3RvcCkgLS1pMjtcbiAgfVxuICBpZiAoaTIgPCBpMSAmJiAwLjUgPD0gY291bnQgJiYgY291bnQgPCAyKSByZXR1cm4gdGlja1NwZWMoc3RhcnQsIHN0b3AsIGNvdW50ICogMik7XG4gIHJldHVybiBbaTEsIGkyLCBpbmNdO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aWNrcyhzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgc3RvcCA9ICtzdG9wLCBzdGFydCA9ICtzdGFydCwgY291bnQgPSArY291bnQ7XG4gIGlmICghKGNvdW50ID4gMCkpIHJldHVybiBbXTtcbiAgaWYgKHN0YXJ0ID09PSBzdG9wKSByZXR1cm4gW3N0YXJ0XTtcbiAgY29uc3QgcmV2ZXJzZSA9IHN0b3AgPCBzdGFydCwgW2kxLCBpMiwgaW5jXSA9IHJldmVyc2UgPyB0aWNrU3BlYyhzdG9wLCBzdGFydCwgY291bnQpIDogdGlja1NwZWMoc3RhcnQsIHN0b3AsIGNvdW50KTtcbiAgaWYgKCEoaTIgPj0gaTEpKSByZXR1cm4gW107XG4gIGNvbnN0IG4gPSBpMiAtIGkxICsgMSwgdGlja3MgPSBuZXcgQXJyYXkobik7XG4gIGlmIChyZXZlcnNlKSB7XG4gICAgaWYgKGluYyA8IDApIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB0aWNrc1tpXSA9IChpMiAtIGkpIC8gLWluYztcbiAgICBlbHNlIGZvciAobGV0IGkgPSAwOyBpIDwgbjsgKytpKSB0aWNrc1tpXSA9IChpMiAtIGkpICogaW5jO1xuICB9IGVsc2Uge1xuICAgIGlmIChpbmMgPCAwKSBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkgdGlja3NbaV0gPSAoaTEgKyBpKSAvIC1pbmM7XG4gICAgZWxzZSBmb3IgKGxldCBpID0gMDsgaSA8IG47ICsraSkgdGlja3NbaV0gPSAoaTEgKyBpKSAqIGluYztcbiAgfVxuICByZXR1cm4gdGlja3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICBzdG9wID0gK3N0b3AsIHN0YXJ0ID0gK3N0YXJ0LCBjb3VudCA9ICtjb3VudDtcbiAgcmV0dXJuIHRpY2tTcGVjKHN0YXJ0LCBzdG9wLCBjb3VudClbMl07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrU3RlcChzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgc3RvcCA9ICtzdG9wLCBzdGFydCA9ICtzdGFydCwgY291bnQgPSArY291bnQ7XG4gIGNvbnN0IHJldmVyc2UgPSBzdG9wIDwgc3RhcnQsIGluYyA9IHJldmVyc2UgPyB0aWNrSW5jcmVtZW50KHN0b3AsIHN0YXJ0LCBjb3VudCkgOiB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCk7XG4gIHJldHVybiAocmV2ZXJzZSA/IC0xIDogMSkgKiAoaW5jIDwgMCA/IDEgLyAtaW5jIDogaW5jKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIG5pY2UoZG9tYWluLCBpbnRlcnZhbCkge1xuICBkb21haW4gPSBkb21haW4uc2xpY2UoKTtcblxuICB2YXIgaTAgPSAwLFxuICAgICAgaTEgPSBkb21haW4ubGVuZ3RoIC0gMSxcbiAgICAgIHgwID0gZG9tYWluW2kwXSxcbiAgICAgIHgxID0gZG9tYWluW2kxXSxcbiAgICAgIHQ7XG5cbiAgaWYgKHgxIDwgeDApIHtcbiAgICB0ID0gaTAsIGkwID0gaTEsIGkxID0gdDtcbiAgICB0ID0geDAsIHgwID0geDEsIHgxID0gdDtcbiAgfVxuXG4gIGRvbWFpbltpMF0gPSBpbnRlcnZhbC5mbG9vcih4MCk7XG4gIGRvbWFpbltpMV0gPSBpbnRlcnZhbC5jZWlsKHgxKTtcbiAgcmV0dXJuIGRvbWFpbjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhID09IG51bGwgfHwgYiA9PSBudWxsID8gTmFOIDogYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IGEgPj0gYiA/IDAgOiBOYU47XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkZXNjZW5kaW5nKGEsIGIpIHtcbiAgcmV0dXJuIGEgPT0gbnVsbCB8fCBiID09IG51bGwgPyBOYU5cbiAgICA6IGIgPCBhID8gLTFcbiAgICA6IGIgPiBhID8gMVxuICAgIDogYiA+PSBhID8gMFxuICAgIDogTmFOO1xufVxuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmcuanNcIjtcbmltcG9ydCBkZXNjZW5kaW5nIGZyb20gXCIuL2Rlc2NlbmRpbmcuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmlzZWN0b3IoZikge1xuICBsZXQgY29tcGFyZTEsIGNvbXBhcmUyLCBkZWx0YTtcblxuICAvLyBJZiBhbiBhY2Nlc3NvciBpcyBzcGVjaWZpZWQsIHByb21vdGUgaXQgdG8gYSBjb21wYXJhdG9yLiBJbiB0aGlzIGNhc2Ugd2VcbiAgLy8gY2FuIHRlc3Qgd2hldGhlciB0aGUgc2VhcmNoIHZhbHVlIGlzIChzZWxmLSkgY29tcGFyYWJsZS4gV2UgY2Fu4oCZdCBkbyB0aGlzXG4gIC8vIGZvciBhIGNvbXBhcmF0b3IgKGV4Y2VwdCBmb3Igc3BlY2lmaWMsIGtub3duIGNvbXBhcmF0b3JzKSBiZWNhdXNlIHdlIGNhbuKAmXRcbiAgLy8gdGVsbCBpZiB0aGUgY29tcGFyYXRvciBpcyBzeW1tZXRyaWMsIGFuZCBhbiBhc3ltbWV0cmljIGNvbXBhcmF0b3IgY2Fu4oCZdCBiZVxuICAvLyB1c2VkIHRvIHRlc3Qgd2hldGhlciBhIHNpbmdsZSB2YWx1ZSBpcyBjb21wYXJhYmxlLlxuICBpZiAoZi5sZW5ndGggIT09IDIpIHtcbiAgICBjb21wYXJlMSA9IGFzY2VuZGluZztcbiAgICBjb21wYXJlMiA9IChkLCB4KSA9PiBhc2NlbmRpbmcoZihkKSwgeCk7XG4gICAgZGVsdGEgPSAoZCwgeCkgPT4gZihkKSAtIHg7XG4gIH0gZWxzZSB7XG4gICAgY29tcGFyZTEgPSBmID09PSBhc2NlbmRpbmcgfHwgZiA9PT0gZGVzY2VuZGluZyA/IGYgOiB6ZXJvO1xuICAgIGNvbXBhcmUyID0gZjtcbiAgICBkZWx0YSA9IGY7XG4gIH1cblxuICBmdW5jdGlvbiBsZWZ0KGEsIHgsIGxvID0gMCwgaGkgPSBhLmxlbmd0aCkge1xuICAgIGlmIChsbyA8IGhpKSB7XG4gICAgICBpZiAoY29tcGFyZTEoeCwgeCkgIT09IDApIHJldHVybiBoaTtcbiAgICAgIGRvIHtcbiAgICAgICAgY29uc3QgbWlkID0gKGxvICsgaGkpID4+PiAxO1xuICAgICAgICBpZiAoY29tcGFyZTIoYVttaWRdLCB4KSA8IDApIGxvID0gbWlkICsgMTtcbiAgICAgICAgZWxzZSBoaSA9IG1pZDtcbiAgICAgIH0gd2hpbGUgKGxvIDwgaGkpO1xuICAgIH1cbiAgICByZXR1cm4gbG87XG4gIH1cblxuICBmdW5jdGlvbiByaWdodChhLCB4LCBsbyA9IDAsIGhpID0gYS5sZW5ndGgpIHtcbiAgICBpZiAobG8gPCBoaSkge1xuICAgICAgaWYgKGNvbXBhcmUxKHgsIHgpICE9PSAwKSByZXR1cm4gaGk7XG4gICAgICBkbyB7XG4gICAgICAgIGNvbnN0IG1pZCA9IChsbyArIGhpKSA+Pj4gMTtcbiAgICAgICAgaWYgKGNvbXBhcmUyKGFbbWlkXSwgeCkgPD0gMCkgbG8gPSBtaWQgKyAxO1xuICAgICAgICBlbHNlIGhpID0gbWlkO1xuICAgICAgfSB3aGlsZSAobG8gPCBoaSk7XG4gICAgfVxuICAgIHJldHVybiBsbztcbiAgfVxuXG4gIGZ1bmN0aW9uIGNlbnRlcihhLCB4LCBsbyA9IDAsIGhpID0gYS5sZW5ndGgpIHtcbiAgICBjb25zdCBpID0gbGVmdChhLCB4LCBsbywgaGkgLSAxKTtcbiAgICByZXR1cm4gaSA+IGxvICYmIGRlbHRhKGFbaSAtIDFdLCB4KSA+IC1kZWx0YShhW2ldLCB4KSA/IGkgLSAxIDogaTtcbiAgfVxuXG4gIHJldHVybiB7bGVmdCwgY2VudGVyLCByaWdodH07XG59XG5cbmZ1bmN0aW9uIHplcm8oKSB7XG4gIHJldHVybiAwO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVtYmVyKHgpIHtcbiAgcmV0dXJuIHggPT09IG51bGwgPyBOYU4gOiAreDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uKiBudW1iZXJzKHZhbHVlcywgdmFsdWVvZikge1xuICBpZiAodmFsdWVvZiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZm9yIChsZXQgdmFsdWUgb2YgdmFsdWVzKSB7XG4gICAgICBpZiAodmFsdWUgIT0gbnVsbCAmJiAodmFsdWUgPSArdmFsdWUpID49IHZhbHVlKSB7XG4gICAgICAgIHlpZWxkIHZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBsZXQgaW5kZXggPSAtMTtcbiAgICBmb3IgKGxldCB2YWx1ZSBvZiB2YWx1ZXMpIHtcbiAgICAgIGlmICgodmFsdWUgPSB2YWx1ZW9mKHZhbHVlLCArK2luZGV4LCB2YWx1ZXMpKSAhPSBudWxsICYmICh2YWx1ZSA9ICt2YWx1ZSkgPj0gdmFsdWUpIHtcbiAgICAgICAgeWllbGQgdmFsdWU7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG4iLCJpbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuL2FzY2VuZGluZy5qc1wiO1xuaW1wb3J0IGJpc2VjdG9yIGZyb20gXCIuL2Jpc2VjdG9yLmpzXCI7XG5pbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuXG5jb25zdCBhc2NlbmRpbmdCaXNlY3QgPSBiaXNlY3Rvcihhc2NlbmRpbmcpO1xuZXhwb3J0IGNvbnN0IGJpc2VjdFJpZ2h0ID0gYXNjZW5kaW5nQmlzZWN0LnJpZ2h0O1xuZXhwb3J0IGNvbnN0IGJpc2VjdExlZnQgPSBhc2NlbmRpbmdCaXNlY3QubGVmdDtcbmV4cG9ydCBjb25zdCBiaXNlY3RDZW50ZXIgPSBiaXNlY3RvcihudW1iZXIpLmNlbnRlcjtcbmV4cG9ydCBkZWZhdWx0IGJpc2VjdFJpZ2h0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29uc3RydWN0b3IsIGZhY3RvcnksIHByb3RvdHlwZSkge1xuICBjb25zdHJ1Y3Rvci5wcm90b3R5cGUgPSBmYWN0b3J5LnByb3RvdHlwZSA9IHByb3RvdHlwZTtcbiAgcHJvdG90eXBlLmNvbnN0cnVjdG9yID0gY29uc3RydWN0b3I7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBleHRlbmQocGFyZW50LCBkZWZpbml0aW9uKSB7XG4gIHZhciBwcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHBhcmVudC5wcm90b3R5cGUpO1xuICBmb3IgKHZhciBrZXkgaW4gZGVmaW5pdGlvbikgcHJvdG90eXBlW2tleV0gPSBkZWZpbml0aW9uW2tleV07XG4gIHJldHVybiBwcm90b3R5cGU7XG59XG4iLCJpbXBvcnQgZGVmaW5lLCB7ZXh0ZW5kfSBmcm9tIFwiLi9kZWZpbmUuanNcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENvbG9yKCkge31cblxuZXhwb3J0IHZhciBkYXJrZXIgPSAwLjc7XG5leHBvcnQgdmFyIGJyaWdodGVyID0gMSAvIGRhcmtlcjtcblxudmFyIHJlSSA9IFwiXFxcXHMqKFsrLV0/XFxcXGQrKVxcXFxzKlwiLFxuICAgIHJlTiA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KVxcXFxzKlwiLFxuICAgIHJlUCA9IFwiXFxcXHMqKFsrLV0/KD86XFxcXGQqXFxcXC4pP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoYF5yZ2JcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9XFxcXCkkYCksXG4gICAgcmVSZ2JQZXJjZW50ID0gbmV3IFJlZ0V4cChgXnJnYlxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZVJnYmFJbnRlZ2VyID0gbmV3IFJlZ0V4cChgXnJnYmFcXFxcKCR7cmVJfSwke3JlSX0sJHtyZUl9LCR7cmVOfVxcXFwpJGApLFxuICAgIHJlUmdiYVBlcmNlbnQgPSBuZXcgUmVnRXhwKGBecmdiYVxcXFwoJHtyZVB9LCR7cmVQfSwke3JlUH0sJHtyZU59XFxcXCkkYCksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbFxcXFwoJHtyZU59LCR7cmVQfSwke3JlUH1cXFxcKSRgKSxcbiAgICByZUhzbGFQZXJjZW50ID0gbmV3IFJlZ0V4cChgXmhzbGFcXFxcKCR7cmVOfSwke3JlUH0sJHtyZVB9LCR7cmVOfVxcXFwpJGApO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5KGNoYW5uZWxzKSB7XG4gICAgcmV0dXJuIE9iamVjdC5hc3NpZ24obmV3IHRoaXMuY29uc3RydWN0b3IsIHRoaXMsIGNoYW5uZWxzKTtcbiAgfSxcbiAgZGlzcGxheWFibGUoKSB7XG4gICAgcmV0dXJuIHRoaXMucmdiKCkuZGlzcGxheWFibGUoKTtcbiAgfSxcbiAgaGV4OiBjb2xvcl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogY29sb3JfZm9ybWF0SGV4LFxuICBmb3JtYXRIZXg4OiBjb2xvcl9mb3JtYXRIZXg4LFxuICBmb3JtYXRIc2w6IGNvbG9yX2Zvcm1hdEhzbCxcbiAgZm9ybWF0UmdiOiBjb2xvcl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiBjb2xvcl9mb3JtYXRSZ2Jcbn0pO1xuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiB0aGlzLnJnYigpLmZvcm1hdEhleCgpO1xufVxuXG5mdW5jdGlvbiBjb2xvcl9mb3JtYXRIZXg4KCkge1xuICByZXR1cm4gdGhpcy5yZ2IoKS5mb3JtYXRIZXg4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgUmdiKHRoaXMuciAqIGssIHRoaXMuZyAqIGssIHRoaXMuYiAqIGssIHRoaXMub3BhY2l0eSk7XG4gIH0sXG4gIGRhcmtlcihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGRhcmtlciA6IE1hdGgucG93KGRhcmtlciwgayk7XG4gICAgcmV0dXJuIG5ldyBSZ2IodGhpcy5yICogaywgdGhpcy5nICogaywgdGhpcy5iICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBjbGFtcCgpIHtcbiAgICByZXR1cm4gbmV3IFJnYihjbGFtcGkodGhpcy5yKSwgY2xhbXBpKHRoaXMuZyksIGNsYW1waSh0aGlzLmIpLCBjbGFtcGEodGhpcy5vcGFjaXR5KSk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlKCkge1xuICAgIHJldHVybiAoLTAuNSA8PSB0aGlzLnIgJiYgdGhpcy5yIDwgMjU1LjUpXG4gICAgICAgICYmICgtMC41IDw9IHRoaXMuZyAmJiB0aGlzLmcgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5iICYmIHRoaXMuYiA8IDI1NS41KVxuICAgICAgICAmJiAoMCA8PSB0aGlzLm9wYWNpdHkgJiYgdGhpcy5vcGFjaXR5IDw9IDEpO1xuICB9LFxuICBoZXg6IHJnYl9mb3JtYXRIZXgsIC8vIERlcHJlY2F0ZWQhIFVzZSBjb2xvci5mb3JtYXRIZXguXG4gIGZvcm1hdEhleDogcmdiX2Zvcm1hdEhleCxcbiAgZm9ybWF0SGV4ODogcmdiX2Zvcm1hdEhleDgsXG4gIGZvcm1hdFJnYjogcmdiX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IHJnYl9mb3JtYXRSZ2Jcbn0pKTtcblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIGAjJHtoZXgodGhpcy5yKX0ke2hleCh0aGlzLmcpfSR7aGV4KHRoaXMuYil9YDtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdEhleDgoKSB7XG4gIHJldHVybiBgIyR7aGV4KHRoaXMucil9JHtoZXgodGhpcy5nKX0ke2hleCh0aGlzLmIpfSR7aGV4KChpc05hTih0aGlzLm9wYWNpdHkpID8gMSA6IHRoaXMub3BhY2l0eSkgKiAyNTUpfWA7XG59XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRSZ2IoKSB7XG4gIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgcmV0dXJuIGAke2EgPT09IDEgPyBcInJnYihcIiA6IFwicmdiYShcIn0ke2NsYW1waSh0aGlzLnIpfSwgJHtjbGFtcGkodGhpcy5nKX0sICR7Y2xhbXBpKHRoaXMuYil9JHthID09PSAxID8gXCIpXCIgOiBgLCAke2F9KWB9YDtcbn1cblxuZnVuY3Rpb24gY2xhbXBhKG9wYWNpdHkpIHtcbiAgcmV0dXJuIGlzTmFOKG9wYWNpdHkpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIG9wYWNpdHkpKTtcbn1cblxuZnVuY3Rpb24gY2xhbXBpKHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodmFsdWUpIHx8IDApKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gY2xhbXBpKHZhbHVlKTtcbiAgcmV0dXJuICh2YWx1ZSA8IDE2ID8gXCIwXCIgOiBcIlwiKSArIHZhbHVlLnRvU3RyaW5nKDE2KTtcbn1cblxuZnVuY3Rpb24gaHNsYShoLCBzLCBsLCBhKSB7XG4gIGlmIChhIDw9IDApIGggPSBzID0gbCA9IE5hTjtcbiAgZWxzZSBpZiAobCA8PSAwIHx8IGwgPj0gMSkgaCA9IHMgPSBOYU47XG4gIGVsc2UgaWYgKHMgPD0gMCkgaCA9IE5hTjtcbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgYSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2xDb252ZXJ0KG8pIHtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBuZXcgSHNsKG8uaCwgby5zLCBvLmwsIG8ub3BhY2l0eSk7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IEhzbDtcbiAgaWYgKG8gaW5zdGFuY2VvZiBIc2wpIHJldHVybiBvO1xuICBvID0gby5yZ2IoKTtcbiAgdmFyIHIgPSBvLnIgLyAyNTUsXG4gICAgICBnID0gby5nIC8gMjU1LFxuICAgICAgYiA9IG8uYiAvIDI1NSxcbiAgICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpLFxuICAgICAgbWF4ID0gTWF0aC5tYXgociwgZywgYiksXG4gICAgICBoID0gTmFOLFxuICAgICAgcyA9IG1heCAtIG1pbixcbiAgICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gIGlmIChzKSB7XG4gICAgaWYgKHIgPT09IG1heCkgaCA9IChnIC0gYikgLyBzICsgKGcgPCBiKSAqIDY7XG4gICAgZWxzZSBpZiAoZyA9PT0gbWF4KSBoID0gKGIgLSByKSAvIHMgKyAyO1xuICAgIGVsc2UgaCA9IChyIC0gZykgLyBzICsgNDtcbiAgICBzIC89IGwgPCAwLjUgPyBtYXggKyBtaW4gOiAyIC0gbWF4IC0gbWluO1xuICAgIGggKj0gNjA7XG4gIH0gZWxzZSB7XG4gICAgcyA9IGwgPiAwICYmIGwgPCAxID8gMCA6IGg7XG4gIH1cbiAgcmV0dXJuIG5ldyBIc2woaCwgcywgbCwgby5vcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGhzbChoLCBzLCBsLCBvcGFjaXR5KSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID09PSAxID8gaHNsQ29udmVydChoKSA6IG5ldyBIc2woaCwgcywgbCwgb3BhY2l0eSA9PSBudWxsID8gMSA6IG9wYWNpdHkpO1xufVxuXG5mdW5jdGlvbiBIc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICB0aGlzLmggPSAraDtcbiAgdGhpcy5zID0gK3M7XG4gIHRoaXMubCA9ICtsO1xuICB0aGlzLm9wYWNpdHkgPSArb3BhY2l0eTtcbn1cblxuZGVmaW5lKEhzbCwgaHNsLCBleHRlbmQoQ29sb3IsIHtcbiAgYnJpZ2h0ZXIoaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgZGFya2VyKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiKCkge1xuICAgIHZhciBoID0gdGhpcy5oICUgMzYwICsgKHRoaXMuaCA8IDApICogMzYwLFxuICAgICAgICBzID0gaXNOYU4oaCkgfHwgaXNOYU4odGhpcy5zKSA/IDAgOiB0aGlzLnMsXG4gICAgICAgIGwgPSB0aGlzLmwsXG4gICAgICAgIG0yID0gbCArIChsIDwgMC41ID8gbCA6IDEgLSBsKSAqIHMsXG4gICAgICAgIG0xID0gMiAqIGwgLSBtMjtcbiAgICByZXR1cm4gbmV3IFJnYihcbiAgICAgIGhzbDJyZ2IoaCA+PSAyNDAgPyBoIC0gMjQwIDogaCArIDEyMCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCwgbTEsIG0yKSxcbiAgICAgIGhzbDJyZ2IoaCA8IDEyMCA/IGggKyAyNDAgOiBoIC0gMTIwLCBtMSwgbTIpLFxuICAgICAgdGhpcy5vcGFjaXR5XG4gICAgKTtcbiAgfSxcbiAgY2xhbXAoKSB7XG4gICAgcmV0dXJuIG5ldyBIc2woY2xhbXBoKHRoaXMuaCksIGNsYW1wdCh0aGlzLnMpLCBjbGFtcHQodGhpcy5sKSwgY2xhbXBhKHRoaXMub3BhY2l0eSkpO1xuICB9LFxuICBkaXNwbGF5YWJsZSgpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsKCkge1xuICAgIGNvbnN0IGEgPSBjbGFtcGEodGhpcy5vcGFjaXR5KTtcbiAgICByZXR1cm4gYCR7YSA9PT0gMSA/IFwiaHNsKFwiIDogXCJoc2xhKFwifSR7Y2xhbXBoKHRoaXMuaCl9LCAke2NsYW1wdCh0aGlzLnMpICogMTAwfSUsICR7Y2xhbXB0KHRoaXMubCkgKiAxMDB9JSR7YSA9PT0gMSA/IFwiKVwiIDogYCwgJHthfSlgfWA7XG4gIH1cbn0pKTtcblxuZnVuY3Rpb24gY2xhbXBoKHZhbHVlKSB7XG4gIHZhbHVlID0gKHZhbHVlIHx8IDApICUgMzYwO1xuICByZXR1cm4gdmFsdWUgPCAwID8gdmFsdWUgKyAzNjAgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gY2xhbXB0KHZhbHVlKSB7XG4gIHJldHVybiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCB2YWx1ZSB8fCAwKSk7XG59XG5cbi8qIEZyb20gRnZEIDEzLjM3LCBDU1MgQ29sb3IgTW9kdWxlIExldmVsIDMgKi9cbmZ1bmN0aW9uIGhzbDJyZ2IoaCwgbTEsIG0yKSB7XG4gIHJldHVybiAoaCA8IDYwID8gbTEgKyAobTIgLSBtMSkgKiBoIC8gNjBcbiAgICAgIDogaCA8IDE4MCA/IG0yXG4gICAgICA6IGggPCAyNDAgPyBtMSArIChtMiAtIG0xKSAqICgyNDAgLSBoKSAvIDYwXG4gICAgICA6IG0xKSAqIDI1NTtcbn1cbiIsImV4cG9ydCBmdW5jdGlvbiBiYXNpcyh0MSwgdjAsIHYxLCB2MiwgdjMpIHtcbiAgdmFyIHQyID0gdDEgKiB0MSwgdDMgPSB0MiAqIHQxO1xuICByZXR1cm4gKCgxIC0gMyAqIHQxICsgMyAqIHQyIC0gdDMpICogdjBcbiAgICAgICsgKDQgLSA2ICogdDIgKyAzICogdDMpICogdjFcbiAgICAgICsgKDEgKyAzICogdDEgKyAzICogdDIgLSAzICogdDMpICogdjJcbiAgICAgICsgdDMgKiB2MykgLyA2O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoIC0gMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQgPD0gMCA/ICh0ID0gMCkgOiB0ID49IDEgPyAodCA9IDEsIG4gLSAxKSA6IE1hdGguZmxvb3IodCAqIG4pLFxuICAgICAgICB2MSA9IHZhbHVlc1tpXSxcbiAgICAgICAgdjIgPSB2YWx1ZXNbaSArIDFdLFxuICAgICAgICB2MCA9IGkgPiAwID8gdmFsdWVzW2kgLSAxXSA6IDIgKiB2MSAtIHYyLFxuICAgICAgICB2MyA9IGkgPCBuIC0gMSA/IHZhbHVlc1tpICsgMl0gOiAyICogdjIgLSB2MTtcbiAgICByZXR1cm4gYmFzaXMoKHQgLSBpIC8gbikgKiBuLCB2MCwgdjEsIHYyLCB2Myk7XG4gIH07XG59XG4iLCJpbXBvcnQge2Jhc2lzfSBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMpIHtcbiAgdmFyIG4gPSB2YWx1ZXMubGVuZ3RoO1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gTWF0aC5mbG9vcigoKHQgJT0gMSkgPCAwID8gKyt0IDogdCkgKiBuKSxcbiAgICAgICAgdjAgPSB2YWx1ZXNbKGkgKyBuIC0gMSkgJSBuXSxcbiAgICAgICAgdjEgPSB2YWx1ZXNbaSAlIG5dLFxuICAgICAgICB2MiA9IHZhbHVlc1soaSArIDEpICUgbl0sXG4gICAgICAgIHYzID0gdmFsdWVzWyhpICsgMikgJSBuXTtcbiAgICByZXR1cm4gYmFzaXMoKHQgLSBpIC8gbikgKiBuLCB2MCwgdjEsIHYyLCB2Myk7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCB4ID0+ICgpID0+IHg7XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsImltcG9ydCB7cmdiIGFzIGNvbG9yUmdifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBiYXNpcyBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuaW1wb3J0IGJhc2lzQ2xvc2VkIGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5pbXBvcnQgbm9nYW1tYSwge2dhbW1hfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gcmdiR2FtbWEoeSkge1xuICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICBmdW5jdGlvbiByZ2Ioc3RhcnQsIGVuZCkge1xuICAgIHZhciByID0gY29sb3IoKHN0YXJ0ID0gY29sb3JSZ2Ioc3RhcnQpKS5yLCAoZW5kID0gY29sb3JSZ2IoZW5kKSkuciksXG4gICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICBzdGFydC5nID0gZyh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICByZ2IuZ2FtbWEgPSByZ2JHYW1tYTtcblxuICByZXR1cm4gcmdiO1xufSkoMSk7XG5cbmZ1bmN0aW9uIHJnYlNwbGluZShzcGxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9ycykge1xuICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgciA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgZyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgaSwgY29sb3I7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29sb3IgPSBjb2xvclJnYihjb2xvcnNbaV0pO1xuICAgICAgcltpXSA9IGNvbG9yLnIgfHwgMDtcbiAgICAgIGdbaV0gPSBjb2xvci5nIHx8IDA7XG4gICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgIH1cbiAgICByID0gc3BsaW5lKHIpO1xuICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgYiA9IHNwbGluZShiKTtcbiAgICBjb2xvci5vcGFjaXR5ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgY29sb3IuciA9IHIodCk7XG4gICAgICBjb2xvci5nID0gZyh0KTtcbiAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgcmV0dXJuIGNvbG9yICsgXCJcIjtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzKTtcbmV4cG9ydCB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuIiwiaW1wb3J0IHZhbHVlIGZyb20gXCIuL3ZhbHVlLmpzXCI7XG5pbXBvcnQgbnVtYmVyQXJyYXksIHtpc051bWJlckFycmF5fSBmcm9tIFwiLi9udW1iZXJBcnJheS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiAoaXNOdW1iZXJBcnJheShiKSA/IG51bWJlckFycmF5IDogZ2VuZXJpY0FycmF5KShhLCBiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyaWNBcnJheShhLCBiKSB7XG4gIHZhciBuYiA9IGIgPyBiLmxlbmd0aCA6IDAsXG4gICAgICBuYSA9IGEgPyBNYXRoLm1pbihuYiwgYS5sZW5ndGgpIDogMCxcbiAgICAgIHggPSBuZXcgQXJyYXkobmEpLFxuICAgICAgYyA9IG5ldyBBcnJheShuYiksXG4gICAgICBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBuYTsgKytpKSB4W2ldID0gdmFsdWUoYVtpXSwgYltpXSk7XG4gIGZvciAoOyBpIDwgbmI7ICsraSkgY1tpXSA9IGJbaV07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbmE7ICsraSkgY1tpXSA9IHhbaV0odCk7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBkID0gbmV3IERhdGU7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBkLnNldFRpbWUoYSAqICgxIC0gdCkgKyBiICogdCksIGQ7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0O1xuICB9O1xufVxuIiwiaW1wb3J0IHZhbHVlIGZyb20gXCIuL3ZhbHVlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGkgPSB7fSxcbiAgICAgIGMgPSB7fSxcbiAgICAgIGs7XG5cbiAgaWYgKGEgPT09IG51bGwgfHwgdHlwZW9mIGEgIT09IFwib2JqZWN0XCIpIGEgPSB7fTtcbiAgaWYgKGIgPT09IG51bGwgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpIGIgPSB7fTtcblxuICBmb3IgKGsgaW4gYikge1xuICAgIGlmIChrIGluIGEpIHtcbiAgICAgIGlba10gPSB2YWx1ZShhW2tdLCBiW2tdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY1trXSA9IGJba107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGsgaW4gaSkgY1trXSA9IGlba10odCk7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG4iLCJpbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuXG52YXIgcmVBID0gL1stK10/KD86XFxkK1xcLj9cXGQqfFxcLj9cXGQrKSg/OltlRV1bLStdP1xcZCspPy9nLFxuICAgIHJlQiA9IG5ldyBSZWdFeHAocmVBLnNvdXJjZSwgXCJnXCIpO1xuXG5mdW5jdGlvbiB6ZXJvKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBiO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvbmUoYikge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBiKHQpICsgXCJcIjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgYmkgPSByZUEubGFzdEluZGV4ID0gcmVCLmxhc3RJbmRleCA9IDAsIC8vIHNjYW4gaW5kZXggZm9yIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGFtLCAvLyBjdXJyZW50IG1hdGNoIGluIGFcbiAgICAgIGJtLCAvLyBjdXJyZW50IG1hdGNoIGluIGJcbiAgICAgIGJzLCAvLyBzdHJpbmcgcHJlY2VkaW5nIGN1cnJlbnQgbnVtYmVyIGluIGIsIGlmIGFueVxuICAgICAgaSA9IC0xLCAvLyBpbmRleCBpbiBzXG4gICAgICBzID0gW10sIC8vIHN0cmluZyBjb25zdGFudHMgYW5kIHBsYWNlaG9sZGVyc1xuICAgICAgcSA9IFtdOyAvLyBudW1iZXIgaW50ZXJwb2xhdG9yc1xuXG4gIC8vIENvZXJjZSBpbnB1dHMgdG8gc3RyaW5ncy5cbiAgYSA9IGEgKyBcIlwiLCBiID0gYiArIFwiXCI7XG5cbiAgLy8gSW50ZXJwb2xhdGUgcGFpcnMgb2YgbnVtYmVycyBpbiBhICYgYi5cbiAgd2hpbGUgKChhbSA9IHJlQS5leGVjKGEpKVxuICAgICAgJiYgKGJtID0gcmVCLmV4ZWMoYikpKSB7XG4gICAgaWYgKChicyA9IGJtLmluZGV4KSA+IGJpKSB7IC8vIGEgc3RyaW5nIHByZWNlZGVzIHRoZSBuZXh0IG51bWJlciBpbiBiXG4gICAgICBicyA9IGIuc2xpY2UoYmksIGJzKTtcbiAgICAgIGlmIChzW2ldKSBzW2ldICs9IGJzOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgICAgZWxzZSBzWysraV0gPSBicztcbiAgICB9XG4gICAgaWYgKChhbSA9IGFtWzBdKSA9PT0gKGJtID0gYm1bMF0pKSB7IC8vIG51bWJlcnMgaW4gYSAmIGIgbWF0Y2hcbiAgICAgIGlmIChzW2ldKSBzW2ldICs9IGJtOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgICAgZWxzZSBzWysraV0gPSBibTtcbiAgICB9IGVsc2UgeyAvLyBpbnRlcnBvbGF0ZSBub24tbWF0Y2hpbmcgbnVtYmVyc1xuICAgICAgc1srK2ldID0gbnVsbDtcbiAgICAgIHEucHVzaCh7aTogaSwgeDogbnVtYmVyKGFtLCBibSl9KTtcbiAgICB9XG4gICAgYmkgPSByZUIubGFzdEluZGV4O1xuICB9XG5cbiAgLy8gQWRkIHJlbWFpbnMgb2YgYi5cbiAgaWYgKGJpIDwgYi5sZW5ndGgpIHtcbiAgICBicyA9IGIuc2xpY2UoYmkpO1xuICAgIGlmIChzW2ldKSBzW2ldICs9IGJzOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gIH1cblxuICAvLyBTcGVjaWFsIG9wdGltaXphdGlvbiBmb3Igb25seSBhIHNpbmdsZSBtYXRjaC5cbiAgLy8gT3RoZXJ3aXNlLCBpbnRlcnBvbGF0ZSBlYWNoIG9mIHRoZSBudW1iZXJzIGFuZCByZWpvaW4gdGhlIHN0cmluZy5cbiAgcmV0dXJuIHMubGVuZ3RoIDwgMiA/IChxWzBdXG4gICAgICA/IG9uZShxWzBdLngpXG4gICAgICA6IHplcm8oYikpXG4gICAgICA6IChiID0gcS5sZW5ndGgsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbzsgaSA8IGI7ICsraSkgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICBpZiAoIWIpIGIgPSBbXTtcbiAgdmFyIG4gPSBhID8gTWF0aC5taW4oYi5sZW5ndGgsIGEubGVuZ3RoKSA6IDAsXG4gICAgICBjID0gYi5zbGljZSgpLFxuICAgICAgaTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjW2ldID0gYVtpXSAqICgxIC0gdCkgKyBiW2ldICogdDtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyQXJyYXkoeCkge1xuICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHgpICYmICEoeCBpbnN0YW5jZW9mIERhdGFWaWV3KTtcbn1cbiIsImltcG9ydCB7Y29sb3J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHJnYiBmcm9tIFwiLi9yZ2IuanNcIjtcbmltcG9ydCB7Z2VuZXJpY0FycmF5fSBmcm9tIFwiLi9hcnJheS5qc1wiO1xuaW1wb3J0IGRhdGUgZnJvbSBcIi4vZGF0ZS5qc1wiO1xuaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmltcG9ydCBvYmplY3QgZnJvbSBcIi4vb2JqZWN0LmpzXCI7XG5pbXBvcnQgc3RyaW5nIGZyb20gXCIuL3N0cmluZy5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50LmpzXCI7XG5pbXBvcnQgbnVtYmVyQXJyYXksIHtpc051bWJlckFycmF5fSBmcm9tIFwiLi9udW1iZXJBcnJheS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciB0ID0gdHlwZW9mIGIsIGM7XG4gIHJldHVybiBiID09IG51bGwgfHwgdCA9PT0gXCJib29sZWFuXCIgPyBjb25zdGFudChiKVxuICAgICAgOiAodCA9PT0gXCJudW1iZXJcIiA/IG51bWJlclxuICAgICAgOiB0ID09PSBcInN0cmluZ1wiID8gKChjID0gY29sb3IoYikpID8gKGIgPSBjLCByZ2IpIDogc3RyaW5nKVxuICAgICAgOiBiIGluc3RhbmNlb2YgY29sb3IgPyByZ2JcbiAgICAgIDogYiBpbnN0YW5jZW9mIERhdGUgPyBkYXRlXG4gICAgICA6IGlzTnVtYmVyQXJyYXkoYikgPyBudW1iZXJBcnJheVxuICAgICAgOiBBcnJheS5pc0FycmF5KGIpID8gZ2VuZXJpY0FycmF5XG4gICAgICA6IHR5cGVvZiBiLnZhbHVlT2YgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgYi50b1N0cmluZyAhPT0gXCJmdW5jdGlvblwiIHx8IGlzTmFOKGIpID8gb2JqZWN0XG4gICAgICA6IG51bWJlcikoYSwgYik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGEgKiAoMSAtIHQpICsgYiAqIHQpO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29uc3RhbnRzKHgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB4O1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbnVtYmVyKHgpIHtcbiAgcmV0dXJuICt4O1xufVxuIiwiaW1wb3J0IHtiaXNlY3R9IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IHtpbnRlcnBvbGF0ZSBhcyBpbnRlcnBvbGF0ZVZhbHVlLCBpbnRlcnBvbGF0ZU51bWJlciwgaW50ZXJwb2xhdGVSb3VuZH0gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyLmpzXCI7XG5cbnZhciB1bml0ID0gWzAsIDFdO1xuXG5leHBvcnQgZnVuY3Rpb24gaWRlbnRpdHkoeCkge1xuICByZXR1cm4geDtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKGEsIGIpIHtcbiAgcmV0dXJuIChiIC09IChhID0gK2EpKVxuICAgICAgPyBmdW5jdGlvbih4KSB7IHJldHVybiAoeCAtIGEpIC8gYjsgfVxuICAgICAgOiBjb25zdGFudChpc05hTihiKSA/IE5hTiA6IDAuNSk7XG59XG5cbmZ1bmN0aW9uIGNsYW1wZXIoYSwgYikge1xuICB2YXIgdDtcbiAgaWYgKGEgPiBiKSB0ID0gYSwgYSA9IGIsIGIgPSB0O1xuICByZXR1cm4gZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5tYXgoYSwgTWF0aC5taW4oYiwgeCkpOyB9O1xufVxuXG4vLyBub3JtYWxpemUoYSwgYikoeCkgdGFrZXMgYSBkb21haW4gdmFsdWUgeCBpbiBbYSxiXSBhbmQgcmV0dXJucyB0aGUgY29ycmVzcG9uZGluZyBwYXJhbWV0ZXIgdCBpbiBbMCwxXS5cbi8vIGludGVycG9sYXRlKGEsIGIpKHQpIHRha2VzIGEgcGFyYW1ldGVyIHQgaW4gWzAsMV0gYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcmFuZ2UgdmFsdWUgeCBpbiBbYSxiXS5cbmZ1bmN0aW9uIGJpbWFwKGRvbWFpbiwgcmFuZ2UsIGludGVycG9sYXRlKSB7XG4gIHZhciBkMCA9IGRvbWFpblswXSwgZDEgPSBkb21haW5bMV0sIHIwID0gcmFuZ2VbMF0sIHIxID0gcmFuZ2VbMV07XG4gIGlmIChkMSA8IGQwKSBkMCA9IG5vcm1hbGl6ZShkMSwgZDApLCByMCA9IGludGVycG9sYXRlKHIxLCByMCk7XG4gIGVsc2UgZDAgPSBub3JtYWxpemUoZDAsIGQxKSwgcjAgPSBpbnRlcnBvbGF0ZShyMCwgcjEpO1xuICByZXR1cm4gZnVuY3Rpb24oeCkgeyByZXR1cm4gcjAoZDAoeCkpOyB9O1xufVxuXG5mdW5jdGlvbiBwb2x5bWFwKGRvbWFpbiwgcmFuZ2UsIGludGVycG9sYXRlKSB7XG4gIHZhciBqID0gTWF0aC5taW4oZG9tYWluLmxlbmd0aCwgcmFuZ2UubGVuZ3RoKSAtIDEsXG4gICAgICBkID0gbmV3IEFycmF5KGopLFxuICAgICAgciA9IG5ldyBBcnJheShqKSxcbiAgICAgIGkgPSAtMTtcblxuICAvLyBSZXZlcnNlIGRlc2NlbmRpbmcgZG9tYWlucy5cbiAgaWYgKGRvbWFpbltqXSA8IGRvbWFpblswXSkge1xuICAgIGRvbWFpbiA9IGRvbWFpbi5zbGljZSgpLnJldmVyc2UoKTtcbiAgICByYW5nZSA9IHJhbmdlLnNsaWNlKCkucmV2ZXJzZSgpO1xuICB9XG5cbiAgd2hpbGUgKCsraSA8IGopIHtcbiAgICBkW2ldID0gbm9ybWFsaXplKGRvbWFpbltpXSwgZG9tYWluW2kgKyAxXSk7XG4gICAgcltpXSA9IGludGVycG9sYXRlKHJhbmdlW2ldLCByYW5nZVtpICsgMV0pO1xuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHgpIHtcbiAgICB2YXIgaSA9IGJpc2VjdChkb21haW4sIHgsIDEsIGopIC0gMTtcbiAgICByZXR1cm4gcltpXShkW2ldKHgpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNvcHkoc291cmNlLCB0YXJnZXQpIHtcbiAgcmV0dXJuIHRhcmdldFxuICAgICAgLmRvbWFpbihzb3VyY2UuZG9tYWluKCkpXG4gICAgICAucmFuZ2Uoc291cmNlLnJhbmdlKCkpXG4gICAgICAuaW50ZXJwb2xhdGUoc291cmNlLmludGVycG9sYXRlKCkpXG4gICAgICAuY2xhbXAoc291cmNlLmNsYW1wKCkpXG4gICAgICAudW5rbm93bihzb3VyY2UudW5rbm93bigpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRyYW5zZm9ybWVyKCkge1xuICB2YXIgZG9tYWluID0gdW5pdCxcbiAgICAgIHJhbmdlID0gdW5pdCxcbiAgICAgIGludGVycG9sYXRlID0gaW50ZXJwb2xhdGVWYWx1ZSxcbiAgICAgIHRyYW5zZm9ybSxcbiAgICAgIHVudHJhbnNmb3JtLFxuICAgICAgdW5rbm93bixcbiAgICAgIGNsYW1wID0gaWRlbnRpdHksXG4gICAgICBwaWVjZXdpc2UsXG4gICAgICBvdXRwdXQsXG4gICAgICBpbnB1dDtcblxuICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgIHZhciBuID0gTWF0aC5taW4oZG9tYWluLmxlbmd0aCwgcmFuZ2UubGVuZ3RoKTtcbiAgICBpZiAoY2xhbXAgIT09IGlkZW50aXR5KSBjbGFtcCA9IGNsYW1wZXIoZG9tYWluWzBdLCBkb21haW5bbiAtIDFdKTtcbiAgICBwaWVjZXdpc2UgPSBuID4gMiA/IHBvbHltYXAgOiBiaW1hcDtcbiAgICBvdXRwdXQgPSBpbnB1dCA9IG51bGw7XG4gICAgcmV0dXJuIHNjYWxlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgIHJldHVybiB4ID09IG51bGwgfHwgaXNOYU4oeCA9ICt4KSA/IHVua25vd24gOiAob3V0cHV0IHx8IChvdXRwdXQgPSBwaWVjZXdpc2UoZG9tYWluLm1hcCh0cmFuc2Zvcm0pLCByYW5nZSwgaW50ZXJwb2xhdGUpKSkodHJhbnNmb3JtKGNsYW1wKHgpKSk7XG4gIH1cblxuICBzY2FsZS5pbnZlcnQgPSBmdW5jdGlvbih5KSB7XG4gICAgcmV0dXJuIGNsYW1wKHVudHJhbnNmb3JtKChpbnB1dCB8fCAoaW5wdXQgPSBwaWVjZXdpc2UocmFuZ2UsIGRvbWFpbi5tYXAodHJhbnNmb3JtKSwgaW50ZXJwb2xhdGVOdW1iZXIpKSkoeSkpKTtcbiAgfTtcblxuICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZG9tYWluID0gQXJyYXkuZnJvbShfLCBudW1iZXIpLCByZXNjYWxlKCkpIDogZG9tYWluLnNsaWNlKCk7XG4gIH07XG5cbiAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocmFuZ2UgPSBBcnJheS5mcm9tKF8pLCByZXNjYWxlKCkpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgfTtcblxuICBzY2FsZS5yYW5nZVJvdW5kID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiByYW5nZSA9IEFycmF5LmZyb20oXyksIGludGVycG9sYXRlID0gaW50ZXJwb2xhdGVSb3VuZCwgcmVzY2FsZSgpO1xuICB9O1xuXG4gIHNjYWxlLmNsYW1wID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGNsYW1wID0gXyA/IHRydWUgOiBpZGVudGl0eSwgcmVzY2FsZSgpKSA6IGNsYW1wICE9PSBpZGVudGl0eTtcbiAgfTtcblxuICBzY2FsZS5pbnRlcnBvbGF0ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChpbnRlcnBvbGF0ZSA9IF8sIHJlc2NhbGUoKSkgOiBpbnRlcnBvbGF0ZTtcbiAgfTtcblxuICBzY2FsZS51bmtub3duID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHVua25vd24gPSBfLCBzY2FsZSkgOiB1bmtub3duO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbih0LCB1KSB7XG4gICAgdHJhbnNmb3JtID0gdCwgdW50cmFuc2Zvcm0gPSB1O1xuICAgIHJldHVybiByZXNjYWxlKCk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbnRpbnVvdXMoKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1lcigpKGlkZW50aXR5LCBpZGVudGl0eSk7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gaW5pdFJhbmdlKGRvbWFpbiwgcmFuZ2UpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiBicmVhaztcbiAgICBjYXNlIDE6IHRoaXMucmFuZ2UoZG9tYWluKTsgYnJlYWs7XG4gICAgZGVmYXVsdDogdGhpcy5yYW5nZShyYW5nZSkuZG9tYWluKGRvbWFpbik7IGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdEludGVycG9sYXRvcihkb21haW4sIGludGVycG9sYXRvcikge1xuICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICBjYXNlIDA6IGJyZWFrO1xuICAgIGNhc2UgMToge1xuICAgICAgaWYgKHR5cGVvZiBkb21haW4gPT09IFwiZnVuY3Rpb25cIikgdGhpcy5pbnRlcnBvbGF0b3IoZG9tYWluKTtcbiAgICAgIGVsc2UgdGhpcy5yYW5nZShkb21haW4pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHRoaXMuZG9tYWluKGRvbWFpbik7XG4gICAgICBpZiAodHlwZW9mIGludGVycG9sYXRvciA9PT0gXCJmdW5jdGlvblwiKSB0aGlzLmludGVycG9sYXRvcihpbnRlcnBvbGF0b3IpO1xuICAgICAgZWxzZSB0aGlzLnJhbmdlKGludGVycG9sYXRvcik7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQge3RpY2tzfSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7Zm9ybWF0LCBmb3JtYXRTcGVjaWZpZXJ9IGZyb20gXCJkMy1mb3JtYXRcIjtcbmltcG9ydCBuaWNlIGZyb20gXCIuL25pY2UuanNcIjtcbmltcG9ydCB7Y29weSwgdHJhbnNmb3JtZXJ9IGZyb20gXCIuL2NvbnRpbnVvdXMuanNcIjtcbmltcG9ydCB7aW5pdFJhbmdlfSBmcm9tIFwiLi9pbml0LmpzXCI7XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybUxvZyh4KSB7XG4gIHJldHVybiBNYXRoLmxvZyh4KTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtRXhwKHgpIHtcbiAgcmV0dXJuIE1hdGguZXhwKHgpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1Mb2duKHgpIHtcbiAgcmV0dXJuIC1NYXRoLmxvZygteCk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybUV4cG4oeCkge1xuICByZXR1cm4gLU1hdGguZXhwKC14KTtcbn1cblxuZnVuY3Rpb24gcG93MTAoeCkge1xuICByZXR1cm4gaXNGaW5pdGUoeCkgPyArKFwiMWVcIiArIHgpIDogeCA8IDAgPyAwIDogeDtcbn1cblxuZnVuY3Rpb24gcG93cChiYXNlKSB7XG4gIHJldHVybiBiYXNlID09PSAxMCA/IHBvdzEwXG4gICAgICA6IGJhc2UgPT09IE1hdGguRSA/IE1hdGguZXhwXG4gICAgICA6IHggPT4gTWF0aC5wb3coYmFzZSwgeCk7XG59XG5cbmZ1bmN0aW9uIGxvZ3AoYmFzZSkge1xuICByZXR1cm4gYmFzZSA9PT0gTWF0aC5FID8gTWF0aC5sb2dcbiAgICAgIDogYmFzZSA9PT0gMTAgJiYgTWF0aC5sb2cxMFxuICAgICAgfHwgYmFzZSA9PT0gMiAmJiBNYXRoLmxvZzJcbiAgICAgIHx8IChiYXNlID0gTWF0aC5sb2coYmFzZSksIHggPT4gTWF0aC5sb2coeCkgLyBiYXNlKTtcbn1cblxuZnVuY3Rpb24gcmVmbGVjdChmKSB7XG4gIHJldHVybiAoeCwgaykgPT4gLWYoLXgsIGspO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9nZ2lzaCh0cmFuc2Zvcm0pIHtcbiAgY29uc3Qgc2NhbGUgPSB0cmFuc2Zvcm0odHJhbnNmb3JtTG9nLCB0cmFuc2Zvcm1FeHApO1xuICBjb25zdCBkb21haW4gPSBzY2FsZS5kb21haW47XG4gIGxldCBiYXNlID0gMTA7XG4gIGxldCBsb2dzO1xuICBsZXQgcG93cztcblxuICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgIGxvZ3MgPSBsb2dwKGJhc2UpLCBwb3dzID0gcG93cChiYXNlKTtcbiAgICBpZiAoZG9tYWluKClbMF0gPCAwKSB7XG4gICAgICBsb2dzID0gcmVmbGVjdChsb2dzKSwgcG93cyA9IHJlZmxlY3QocG93cyk7XG4gICAgICB0cmFuc2Zvcm0odHJhbnNmb3JtTG9nbiwgdHJhbnNmb3JtRXhwbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybSh0cmFuc2Zvcm1Mb2csIHRyYW5zZm9ybUV4cCk7XG4gICAgfVxuICAgIHJldHVybiBzY2FsZTtcbiAgfVxuXG4gIHNjYWxlLmJhc2UgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoYmFzZSA9ICtfLCByZXNjYWxlKCkpIDogYmFzZTtcbiAgfTtcblxuICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZG9tYWluKF8pLCByZXNjYWxlKCkpIDogZG9tYWluKCk7XG4gIH07XG5cbiAgc2NhbGUudGlja3MgPSBjb3VudCA9PiB7XG4gICAgY29uc3QgZCA9IGRvbWFpbigpO1xuICAgIGxldCB1ID0gZFswXTtcbiAgICBsZXQgdiA9IGRbZC5sZW5ndGggLSAxXTtcbiAgICBjb25zdCByID0gdiA8IHU7XG5cbiAgICBpZiAocikgKFt1LCB2XSA9IFt2LCB1XSk7XG5cbiAgICBsZXQgaSA9IGxvZ3ModSk7XG4gICAgbGV0IGogPSBsb2dzKHYpO1xuICAgIGxldCBrO1xuICAgIGxldCB0O1xuICAgIGNvbnN0IG4gPSBjb3VudCA9PSBudWxsID8gMTAgOiArY291bnQ7XG4gICAgbGV0IHogPSBbXTtcblxuICAgIGlmICghKGJhc2UgJSAxKSAmJiBqIC0gaSA8IG4pIHtcbiAgICAgIGkgPSBNYXRoLmZsb29yKGkpLCBqID0gTWF0aC5jZWlsKGopO1xuICAgICAgaWYgKHUgPiAwKSBmb3IgKDsgaSA8PSBqOyArK2kpIHtcbiAgICAgICAgZm9yIChrID0gMTsgayA8IGJhc2U7ICsraykge1xuICAgICAgICAgIHQgPSBpIDwgMCA/IGsgLyBwb3dzKC1pKSA6IGsgKiBwb3dzKGkpO1xuICAgICAgICAgIGlmICh0IDwgdSkgY29udGludWU7XG4gICAgICAgICAgaWYgKHQgPiB2KSBicmVhaztcbiAgICAgICAgICB6LnB1c2godCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBmb3IgKDsgaSA8PSBqOyArK2kpIHtcbiAgICAgICAgZm9yIChrID0gYmFzZSAtIDE7IGsgPj0gMTsgLS1rKSB7XG4gICAgICAgICAgdCA9IGkgPiAwID8gayAvIHBvd3MoLWkpIDogayAqIHBvd3MoaSk7XG4gICAgICAgICAgaWYgKHQgPCB1KSBjb250aW51ZTtcbiAgICAgICAgICBpZiAodCA+IHYpIGJyZWFrO1xuICAgICAgICAgIHoucHVzaCh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHoubGVuZ3RoICogMiA8IG4pIHogPSB0aWNrcyh1LCB2LCBuKTtcbiAgICB9IGVsc2Uge1xuICAgICAgeiA9IHRpY2tzKGksIGosIE1hdGgubWluKGogLSBpLCBuKSkubWFwKHBvd3MpO1xuICAgIH1cbiAgICByZXR1cm4gciA/IHoucmV2ZXJzZSgpIDogejtcbiAgfTtcblxuICBzY2FsZS50aWNrRm9ybWF0ID0gKGNvdW50LCBzcGVjaWZpZXIpID0+IHtcbiAgICBpZiAoY291bnQgPT0gbnVsbCkgY291bnQgPSAxMDtcbiAgICBpZiAoc3BlY2lmaWVyID09IG51bGwpIHNwZWNpZmllciA9IGJhc2UgPT09IDEwID8gXCJzXCIgOiBcIixcIjtcbiAgICBpZiAodHlwZW9mIHNwZWNpZmllciAhPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICBpZiAoIShiYXNlICUgMSkgJiYgKHNwZWNpZmllciA9IGZvcm1hdFNwZWNpZmllcihzcGVjaWZpZXIpKS5wcmVjaXNpb24gPT0gbnVsbCkgc3BlY2lmaWVyLnRyaW0gPSB0cnVlO1xuICAgICAgc3BlY2lmaWVyID0gZm9ybWF0KHNwZWNpZmllcik7XG4gICAgfVxuICAgIGlmIChjb3VudCA9PT0gSW5maW5pdHkpIHJldHVybiBzcGVjaWZpZXI7XG4gICAgY29uc3QgayA9IE1hdGgubWF4KDEsIGJhc2UgKiBjb3VudCAvIHNjYWxlLnRpY2tzKCkubGVuZ3RoKTsgLy8gVE9ETyBmYXN0IGVzdGltYXRlP1xuICAgIHJldHVybiBkID0+IHtcbiAgICAgIGxldCBpID0gZCAvIHBvd3MoTWF0aC5yb3VuZChsb2dzKGQpKSk7XG4gICAgICBpZiAoaSAqIGJhc2UgPCBiYXNlIC0gMC41KSBpICo9IGJhc2U7XG4gICAgICByZXR1cm4gaSA8PSBrID8gc3BlY2lmaWVyKGQpIDogXCJcIjtcbiAgICB9O1xuICB9O1xuXG4gIHNjYWxlLm5pY2UgPSAoKSA9PiB7XG4gICAgcmV0dXJuIGRvbWFpbihuaWNlKGRvbWFpbigpLCB7XG4gICAgICBmbG9vcjogeCA9PiBwb3dzKE1hdGguZmxvb3IobG9ncyh4KSkpLFxuICAgICAgY2VpbDogeCA9PiBwb3dzKE1hdGguY2VpbChsb2dzKHgpKSlcbiAgICB9KSk7XG4gIH07XG5cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsb2coKSB7XG4gIGNvbnN0IHNjYWxlID0gbG9nZ2lzaCh0cmFuc2Zvcm1lcigpKS5kb21haW4oWzEsIDEwXSk7XG4gIHNjYWxlLmNvcHkgPSAoKSA9PiBjb3B5KHNjYWxlLCBsb2coKSkuYmFzZShzY2FsZS5iYXNlKCkpO1xuICBpbml0UmFuZ2UuYXBwbHkoc2NhbGUsIGFyZ3VtZW50cyk7XG4gIHJldHVybiBzY2FsZTtcbn1cbiIsImV4cG9ydCBjbGFzcyBJbnRlcm5NYXAgZXh0ZW5kcyBNYXAge1xuICBjb25zdHJ1Y3RvcihlbnRyaWVzLCBrZXkgPSBrZXlvZikge1xuICAgIHN1cGVyKCk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnRpZXModGhpcywge19pbnRlcm46IHt2YWx1ZTogbmV3IE1hcCgpfSwgX2tleToge3ZhbHVlOiBrZXl9fSk7XG4gICAgaWYgKGVudHJpZXMgIT0gbnVsbCkgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgZW50cmllcykgdGhpcy5zZXQoa2V5LCB2YWx1ZSk7XG4gIH1cbiAgZ2V0KGtleSkge1xuICAgIHJldHVybiBzdXBlci5nZXQoaW50ZXJuX2dldCh0aGlzLCBrZXkpKTtcbiAgfVxuICBoYXMoa2V5KSB7XG4gICAgcmV0dXJuIHN1cGVyLmhhcyhpbnRlcm5fZ2V0KHRoaXMsIGtleSkpO1xuICB9XG4gIHNldChrZXksIHZhbHVlKSB7XG4gICAgcmV0dXJuIHN1cGVyLnNldChpbnRlcm5fc2V0KHRoaXMsIGtleSksIHZhbHVlKTtcbiAgfVxuICBkZWxldGUoa2V5KSB7XG4gICAgcmV0dXJuIHN1cGVyLmRlbGV0ZShpbnRlcm5fZGVsZXRlKHRoaXMsIGtleSkpO1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBJbnRlcm5TZXQgZXh0ZW5kcyBTZXQge1xuICBjb25zdHJ1Y3Rvcih2YWx1ZXMsIGtleSA9IGtleW9mKSB7XG4gICAgc3VwZXIoKTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydGllcyh0aGlzLCB7X2ludGVybjoge3ZhbHVlOiBuZXcgTWFwKCl9LCBfa2V5OiB7dmFsdWU6IGtleX19KTtcbiAgICBpZiAodmFsdWVzICE9IG51bGwpIGZvciAoY29uc3QgdmFsdWUgb2YgdmFsdWVzKSB0aGlzLmFkZCh2YWx1ZSk7XG4gIH1cbiAgaGFzKHZhbHVlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmhhcyhpbnRlcm5fZ2V0KHRoaXMsIHZhbHVlKSk7XG4gIH1cbiAgYWRkKHZhbHVlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmFkZChpbnRlcm5fc2V0KHRoaXMsIHZhbHVlKSk7XG4gIH1cbiAgZGVsZXRlKHZhbHVlKSB7XG4gICAgcmV0dXJuIHN1cGVyLmRlbGV0ZShpbnRlcm5fZGVsZXRlKHRoaXMsIHZhbHVlKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW50ZXJuX2dldCh7X2ludGVybiwgX2tleX0sIHZhbHVlKSB7XG4gIGNvbnN0IGtleSA9IF9rZXkodmFsdWUpO1xuICByZXR1cm4gX2ludGVybi5oYXMoa2V5KSA/IF9pbnRlcm4uZ2V0KGtleSkgOiB2YWx1ZTtcbn1cblxuZnVuY3Rpb24gaW50ZXJuX3NldCh7X2ludGVybiwgX2tleX0sIHZhbHVlKSB7XG4gIGNvbnN0IGtleSA9IF9rZXkodmFsdWUpO1xuICBpZiAoX2ludGVybi5oYXMoa2V5KSkgcmV0dXJuIF9pbnRlcm4uZ2V0KGtleSk7XG4gIF9pbnRlcm4uc2V0KGtleSwgdmFsdWUpO1xuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGludGVybl9kZWxldGUoe19pbnRlcm4sIF9rZXl9LCB2YWx1ZSkge1xuICBjb25zdCBrZXkgPSBfa2V5KHZhbHVlKTtcbiAgaWYgKF9pbnRlcm4uaGFzKGtleSkpIHtcbiAgICB2YWx1ZSA9IF9pbnRlcm4uZ2V0KGtleSk7XG4gICAgX2ludGVybi5kZWxldGUoa2V5KTtcbiAgfVxuICByZXR1cm4gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGtleW9mKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiB0eXBlb2YgdmFsdWUgPT09IFwib2JqZWN0XCIgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbn1cbiIsImltcG9ydCB7SW50ZXJuTWFwfSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7aW5pdFJhbmdlfSBmcm9tIFwiLi9pbml0LmpzXCI7XG5cbmV4cG9ydCBjb25zdCBpbXBsaWNpdCA9IFN5bWJvbChcImltcGxpY2l0XCIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmRpbmFsKCkge1xuICB2YXIgaW5kZXggPSBuZXcgSW50ZXJuTWFwKCksXG4gICAgICBkb21haW4gPSBbXSxcbiAgICAgIHJhbmdlID0gW10sXG4gICAgICB1bmtub3duID0gaW1wbGljaXQ7XG5cbiAgZnVuY3Rpb24gc2NhbGUoZCkge1xuICAgIGxldCBpID0gaW5kZXguZ2V0KGQpO1xuICAgIGlmIChpID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGlmICh1bmtub3duICE9PSBpbXBsaWNpdCkgcmV0dXJuIHVua25vd247XG4gICAgICBpbmRleC5zZXQoZCwgaSA9IGRvbWFpbi5wdXNoKGQpIC0gMSk7XG4gICAgfVxuICAgIHJldHVybiByYW5nZVtpICUgcmFuZ2UubGVuZ3RoXTtcbiAgfVxuXG4gIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICBpZiAoIWFyZ3VtZW50cy5sZW5ndGgpIHJldHVybiBkb21haW4uc2xpY2UoKTtcbiAgICBkb21haW4gPSBbXSwgaW5kZXggPSBuZXcgSW50ZXJuTWFwKCk7XG4gICAgZm9yIChjb25zdCB2YWx1ZSBvZiBfKSB7XG4gICAgICBpZiAoaW5kZXguaGFzKHZhbHVlKSkgY29udGludWU7XG4gICAgICBpbmRleC5zZXQodmFsdWUsIGRvbWFpbi5wdXNoKHZhbHVlKSAtIDEpO1xuICAgIH1cbiAgICByZXR1cm4gc2NhbGU7XG4gIH07XG5cbiAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocmFuZ2UgPSBBcnJheS5mcm9tKF8pLCBzY2FsZSkgOiByYW5nZS5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLnVua25vd24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodW5rbm93biA9IF8sIHNjYWxlKSA6IHVua25vd247XG4gIH07XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBvcmRpbmFsKGRvbWFpbiwgcmFuZ2UpLnVua25vd24odW5rbm93bik7XG4gIH07XG5cbiAgaW5pdFJhbmdlLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xuXG4gIHJldHVybiBzY2FsZTtcbn1cbiIsInZhciBub29wID0ge3ZhbHVlOiAoKSA9PiB7fX07XG5cbmZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IGFyZ3VtZW50cy5sZW5ndGgsIF8gPSB7fSwgdDsgaSA8IG47ICsraSkge1xuICAgIGlmICghKHQgPSBhcmd1bWVudHNbaV0gKyBcIlwiKSB8fCAodCBpbiBfKSB8fCAvW1xccy5dLy50ZXN0KHQpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIHR5cGU6IFwiICsgdCk7XG4gICAgX1t0XSA9IFtdO1xuICB9XG4gIHJldHVybiBuZXcgRGlzcGF0Y2goXyk7XG59XG5cbmZ1bmN0aW9uIERpc3BhdGNoKF8pIHtcbiAgdGhpcy5fID0gXztcbn1cblxuZnVuY3Rpb24gcGFyc2VUeXBlbmFtZXModHlwZW5hbWVzLCB0eXBlcykge1xuICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIsIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIG5hbWUgPSB0LnNsaWNlKGkgKyAxKSwgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgaWYgKHQgJiYgIXR5cGVzLmhhc093blByb3BlcnR5KHQpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdCk7XG4gICAgcmV0dXJuIHt0eXBlOiB0LCBuYW1lOiBuYW1lfTtcbiAgfSk7XG59XG5cbkRpc3BhdGNoLnByb3RvdHlwZSA9IGRpc3BhdGNoLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IERpc3BhdGNoLFxuICBvbjogZnVuY3Rpb24odHlwZW5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF8gPSB0aGlzLl8sXG4gICAgICAgIFQgPSBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZSArIFwiXCIsIF8pLFxuICAgICAgICB0LFxuICAgICAgICBpID0gLTEsXG4gICAgICAgIG4gPSBULmxlbmd0aDtcblxuICAgIC8vIElmIG5vIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJldHVybiB0aGUgY2FsbGJhY2sgb2YgdGhlIGdpdmVuIHR5cGUgYW5kIG5hbWUuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCh0ID0gKHR5cGVuYW1lID0gVFtpXSkudHlwZSkgJiYgKHQgPSBnZXQoX1t0XSwgdHlwZW5hbWUubmFtZSkpKSByZXR1cm4gdDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiBhIHR5cGUgd2FzIHNwZWNpZmllZCwgc2V0IHRoZSBjYWxsYmFjayBmb3IgdGhlIGdpdmVuIHR5cGUgYW5kIG5hbWUuXG4gICAgLy8gT3RoZXJ3aXNlLCBpZiBhIG51bGwgY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmVtb3ZlIGNhbGxiYWNrcyBvZiB0aGUgZ2l2ZW4gbmFtZS5cbiAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBjYWxsYmFjazogXCIgKyBjYWxsYmFjayk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGlmICh0ID0gKHR5cGVuYW1lID0gVFtpXSkudHlwZSkgX1t0XSA9IHNldChfW3RdLCB0eXBlbmFtZS5uYW1lLCBjYWxsYmFjayk7XG4gICAgICBlbHNlIGlmIChjYWxsYmFjayA9PSBudWxsKSBmb3IgKHQgaW4gXykgX1t0XSA9IHNldChfW3RdLCB0eXBlbmFtZS5uYW1lLCBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvcHkgPSB7fSwgXyA9IHRoaXMuXztcbiAgICBmb3IgKHZhciB0IGluIF8pIGNvcHlbdF0gPSBfW3RdLnNsaWNlKCk7XG4gICAgcmV0dXJuIG5ldyBEaXNwYXRjaChjb3B5KTtcbiAgfSxcbiAgY2FsbDogZnVuY3Rpb24odHlwZSwgdGhhdCkge1xuICAgIGlmICgobiA9IGFyZ3VtZW50cy5sZW5ndGggLSAyKSA+IDApIGZvciAodmFyIGFyZ3MgPSBuZXcgQXJyYXkobiksIGkgPSAwLCBuLCB0OyBpIDwgbjsgKytpKSBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICBpZiAoIXRoaXMuXy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgIGZvciAodCA9IHRoaXMuX1t0eXBlXSwgaSA9IDAsIG4gPSB0Lmxlbmd0aDsgaSA8IG47ICsraSkgdFtpXS52YWx1ZS5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfSxcbiAgYXBwbHk6IGZ1bmN0aW9uKHR5cGUsIHRoYXQsIGFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuXy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgIGZvciAodmFyIHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldCh0eXBlLCBuYW1lKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gdHlwZS5sZW5ndGgsIGM7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoKGMgPSB0eXBlW2ldKS5uYW1lID09PSBuYW1lKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0KHR5cGUsIG5hbWUsIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gdHlwZS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAodHlwZVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICB0eXBlW2ldID0gbm9vcCwgdHlwZSA9IHR5cGUuc2xpY2UoMCwgaSkuY29uY2F0KHR5cGUuc2xpY2UoaSArIDEpKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgdHlwZS5wdXNoKHtuYW1lOiBuYW1lLCB2YWx1ZTogY2FsbGJhY2t9KTtcbiAgcmV0dXJuIHR5cGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BhdGNoO1xuIiwidmFyIGZyYW1lID0gMCwgLy8gaXMgYW4gYW5pbWF0aW9uIGZyYW1lIHBlbmRpbmc/XG4gICAgdGltZW91dCA9IDAsIC8vIGlzIGEgdGltZW91dCBwZW5kaW5nP1xuICAgIGludGVydmFsID0gMCwgLy8gYXJlIGFueSB0aW1lcnMgYWN0aXZlP1xuICAgIHBva2VEZWxheSA9IDEwMDAsIC8vIGhvdyBmcmVxdWVudGx5IHdlIGNoZWNrIGZvciBjbG9jayBza2V3XG4gICAgdGFza0hlYWQsXG4gICAgdGFza1RhaWwsXG4gICAgY2xvY2tMYXN0ID0gMCxcbiAgICBjbG9ja05vdyA9IDAsXG4gICAgY2xvY2tTa2V3ID0gMCxcbiAgICBjbG9jayA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gXCJvYmplY3RcIiAmJiBwZXJmb3JtYW5jZS5ub3cgPyBwZXJmb3JtYW5jZSA6IERhdGUsXG4gICAgc2V0RnJhbWUgPSB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KSA6IGZ1bmN0aW9uKGYpIHsgc2V0VGltZW91dChmLCAxNyk7IH07XG5cbmV4cG9ydCBmdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBjbG9ja05vdyB8fCAoc2V0RnJhbWUoY2xlYXJOb3cpLCBjbG9ja05vdyA9IGNsb2NrLm5vdygpICsgY2xvY2tTa2V3KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJOb3coKSB7XG4gIGNsb2NrTm93ID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVyKCkge1xuICB0aGlzLl9jYWxsID1cbiAgdGhpcy5fdGltZSA9XG4gIHRoaXMuX25leHQgPSBudWxsO1xufVxuXG5UaW1lci5wcm90b3R5cGUgPSB0aW1lci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUaW1lcixcbiAgcmVzdGFydDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgdGltZSA9ICh0aW1lID09IG51bGwgPyBub3coKSA6ICt0aW1lKSArIChkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheSk7XG4gICAgaWYgKCF0aGlzLl9uZXh0ICYmIHRhc2tUYWlsICE9PSB0aGlzKSB7XG4gICAgICBpZiAodGFza1RhaWwpIHRhc2tUYWlsLl9uZXh0ID0gdGhpcztcbiAgICAgIGVsc2UgdGFza0hlYWQgPSB0aGlzO1xuICAgICAgdGFza1RhaWwgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsID0gY2FsbGJhY2s7XG4gICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgc2xlZXAoKTtcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NhbGwpIHtcbiAgICAgIHRoaXMuX2NhbGwgPSBudWxsO1xuICAgICAgdGhpcy5fdGltZSA9IEluZmluaXR5O1xuICAgICAgc2xlZXAoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lcihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIHQucmVzdGFydChjYWxsYmFjaywgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVyRmx1c2goKSB7XG4gIG5vdygpOyAvLyBHZXQgdGhlIGN1cnJlbnQgdGltZSwgaWYgbm90IGFscmVhZHkgc2V0LlxuICArK2ZyYW1lOyAvLyBQcmV0ZW5kIHdl4oCZdmUgc2V0IGFuIGFsYXJtLCBpZiB3ZSBoYXZlbuKAmXQgYWxyZWFkeS5cbiAgdmFyIHQgPSB0YXNrSGVhZCwgZTtcbiAgd2hpbGUgKHQpIHtcbiAgICBpZiAoKGUgPSBjbG9ja05vdyAtIHQuX3RpbWUpID49IDApIHQuX2NhbGwuY2FsbCh1bmRlZmluZWQsIGUpO1xuICAgIHQgPSB0Ll9uZXh0O1xuICB9XG4gIC0tZnJhbWU7XG59XG5cbmZ1bmN0aW9uIHdha2UoKSB7XG4gIGNsb2NrTm93ID0gKGNsb2NrTGFzdCA9IGNsb2NrLm5vdygpKSArIGNsb2NrU2tldztcbiAgZnJhbWUgPSB0aW1lb3V0ID0gMDtcbiAgdHJ5IHtcbiAgICB0aW1lckZsdXNoKCk7XG4gIH0gZmluYWxseSB7XG4gICAgZnJhbWUgPSAwO1xuICAgIG5hcCgpO1xuICAgIGNsb2NrTm93ID0gMDtcbiAgfVxufVxuXG5mdW5jdGlvbiBwb2tlKCkge1xuICB2YXIgbm93ID0gY2xvY2subm93KCksIGRlbGF5ID0gbm93IC0gY2xvY2tMYXN0O1xuICBpZiAoZGVsYXkgPiBwb2tlRGVsYXkpIGNsb2NrU2tldyAtPSBkZWxheSwgY2xvY2tMYXN0ID0gbm93O1xufVxuXG5mdW5jdGlvbiBuYXAoKSB7XG4gIHZhciB0MCwgdDEgPSB0YXNrSGVhZCwgdDIsIHRpbWUgPSBJbmZpbml0eTtcbiAgd2hpbGUgKHQxKSB7XG4gICAgaWYgKHQxLl9jYWxsKSB7XG4gICAgICBpZiAodGltZSA+IHQxLl90aW1lKSB0aW1lID0gdDEuX3RpbWU7XG4gICAgICB0MCA9IHQxLCB0MSA9IHQxLl9uZXh0O1xuICAgIH0gZWxzZSB7XG4gICAgICB0MiA9IHQxLl9uZXh0LCB0MS5fbmV4dCA9IG51bGw7XG4gICAgICB0MSA9IHQwID8gdDAuX25leHQgPSB0MiA6IHRhc2tIZWFkID0gdDI7XG4gICAgfVxuICB9XG4gIHRhc2tUYWlsID0gdDA7XG4gIHNsZWVwKHRpbWUpO1xufVxuXG5mdW5jdGlvbiBzbGVlcCh0aW1lKSB7XG4gIGlmIChmcmFtZSkgcmV0dXJuOyAvLyBTb29uZXN0IGFsYXJtIGFscmVhZHkgc2V0LCBvciB3aWxsIGJlLlxuICBpZiAodGltZW91dCkgdGltZW91dCA9IGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgdmFyIGRlbGF5ID0gdGltZSAtIGNsb2NrTm93OyAvLyBTdHJpY3RseSBsZXNzIHRoYW4gaWYgd2UgcmVjb21wdXRlZCBjbG9ja05vdy5cbiAgaWYgKGRlbGF5ID4gMjQpIHtcbiAgICBpZiAodGltZSA8IEluZmluaXR5KSB0aW1lb3V0ID0gc2V0VGltZW91dCh3YWtlLCB0aW1lIC0gY2xvY2subm93KCkgLSBjbG9ja1NrZXcpO1xuICAgIGlmIChpbnRlcnZhbCkgaW50ZXJ2YWwgPSBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgfSBlbHNlIHtcbiAgICBpZiAoIWludGVydmFsKSBjbG9ja0xhc3QgPSBjbG9jay5ub3coKSwgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChwb2tlLCBwb2tlRGVsYXkpO1xuICAgIGZyYW1lID0gMSwgc2V0RnJhbWUod2FrZSk7XG4gIH1cbn1cbiIsImltcG9ydCB7VGltZXJ9IGZyb20gXCIuL3RpbWVyLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNhbGxiYWNrLCBkZWxheSwgdGltZSkge1xuICB2YXIgdCA9IG5ldyBUaW1lcjtcbiAgZGVsYXkgPSBkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheTtcbiAgdC5yZXN0YXJ0KGVsYXBzZWQgPT4ge1xuICAgIHQuc3RvcCgpO1xuICAgIGNhbGxiYWNrKGVsYXBzZWQgKyBkZWxheSk7XG4gIH0sIGRlbGF5LCB0aW1lKTtcbiAgcmV0dXJuIHQ7XG59XG4iLCJpbXBvcnQge2Rpc3BhdGNofSBmcm9tIFwiZDMtZGlzcGF0Y2hcIjtcbmltcG9ydCB7dGltZXIsIHRpbWVvdXR9IGZyb20gXCJkMy10aW1lclwiO1xuXG52YXIgZW1wdHlPbiA9IGRpc3BhdGNoKFwic3RhcnRcIiwgXCJlbmRcIiwgXCJjYW5jZWxcIiwgXCJpbnRlcnJ1cHRcIik7XG52YXIgZW1wdHlUd2VlbiA9IFtdO1xuXG5leHBvcnQgdmFyIENSRUFURUQgPSAwO1xuZXhwb3J0IHZhciBTQ0hFRFVMRUQgPSAxO1xuZXhwb3J0IHZhciBTVEFSVElORyA9IDI7XG5leHBvcnQgdmFyIFNUQVJURUQgPSAzO1xuZXhwb3J0IHZhciBSVU5OSU5HID0gNDtcbmV4cG9ydCB2YXIgRU5ESU5HID0gNTtcbmV4cG9ydCB2YXIgRU5ERUQgPSA2O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlLCBuYW1lLCBpZCwgaW5kZXgsIGdyb3VwLCB0aW1pbmcpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uO1xuICBpZiAoIXNjaGVkdWxlcykgbm9kZS5fX3RyYW5zaXRpb24gPSB7fTtcbiAgZWxzZSBpZiAoaWQgaW4gc2NoZWR1bGVzKSByZXR1cm47XG4gIGNyZWF0ZShub2RlLCBpZCwge1xuICAgIG5hbWU6IG5hbWUsXG4gICAgaW5kZXg6IGluZGV4LCAvLyBGb3IgY29udGV4dCBkdXJpbmcgY2FsbGJhY2suXG4gICAgZ3JvdXA6IGdyb3VwLCAvLyBGb3IgY29udGV4dCBkdXJpbmcgY2FsbGJhY2suXG4gICAgb246IGVtcHR5T24sXG4gICAgdHdlZW46IGVtcHR5VHdlZW4sXG4gICAgdGltZTogdGltaW5nLnRpbWUsXG4gICAgZGVsYXk6IHRpbWluZy5kZWxheSxcbiAgICBkdXJhdGlvbjogdGltaW5nLmR1cmF0aW9uLFxuICAgIGVhc2U6IHRpbWluZy5lYXNlLFxuICAgIHRpbWVyOiBudWxsLFxuICAgIHN0YXRlOiBDUkVBVEVEXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5pdChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBnZXQobm9kZSwgaWQpO1xuICBpZiAoc2NoZWR1bGUuc3RhdGUgPiBDUkVBVEVEKSB0aHJvdyBuZXcgRXJyb3IoXCJ0b28gbGF0ZTsgYWxyZWFkeSBzY2hlZHVsZWRcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNldChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBnZXQobm9kZSwgaWQpO1xuICBpZiAoc2NoZWR1bGUuc3RhdGUgPiBTVEFSVEVEKSB0aHJvdyBuZXcgRXJyb3IoXCJ0b28gbGF0ZTsgYWxyZWFkeSBydW5uaW5nXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXQobm9kZSwgaWQpIHtcbiAgdmFyIHNjaGVkdWxlID0gbm9kZS5fX3RyYW5zaXRpb247XG4gIGlmICghc2NoZWR1bGUgfHwgIShzY2hlZHVsZSA9IHNjaGVkdWxlW2lkXSkpIHRocm93IG5ldyBFcnJvcihcInRyYW5zaXRpb24gbm90IGZvdW5kXCIpO1xuICByZXR1cm4gc2NoZWR1bGU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZShub2RlLCBpZCwgc2VsZikge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb24sXG4gICAgICB0d2VlbjtcblxuICAvLyBJbml0aWFsaXplIHRoZSBzZWxmIHRpbWVyIHdoZW4gdGhlIHRyYW5zaXRpb24gaXMgY3JlYXRlZC5cbiAgLy8gTm90ZSB0aGUgYWN0dWFsIGRlbGF5IGlzIG5vdCBrbm93biB1bnRpbCB0aGUgZmlyc3QgY2FsbGJhY2shXG4gIHNjaGVkdWxlc1tpZF0gPSBzZWxmO1xuICBzZWxmLnRpbWVyID0gdGltZXIoc2NoZWR1bGUsIDAsIHNlbGYudGltZSk7XG5cbiAgZnVuY3Rpb24gc2NoZWR1bGUoZWxhcHNlZCkge1xuICAgIHNlbGYuc3RhdGUgPSBTQ0hFRFVMRUQ7XG4gICAgc2VsZi50aW1lci5yZXN0YXJ0KHN0YXJ0LCBzZWxmLmRlbGF5LCBzZWxmLnRpbWUpO1xuXG4gICAgLy8gSWYgdGhlIGVsYXBzZWQgZGVsYXkgaXMgbGVzcyB0aGFuIG91ciBmaXJzdCBzbGVlcCwgc3RhcnQgaW1tZWRpYXRlbHkuXG4gICAgaWYgKHNlbGYuZGVsYXkgPD0gZWxhcHNlZCkgc3RhcnQoZWxhcHNlZCAtIHNlbGYuZGVsYXkpO1xuICB9XG5cbiAgZnVuY3Rpb24gc3RhcnQoZWxhcHNlZCkge1xuICAgIHZhciBpLCBqLCBuLCBvO1xuXG4gICAgLy8gSWYgdGhlIHN0YXRlIGlzIG5vdCBTQ0hFRFVMRUQsIHRoZW4gd2UgcHJldmlvdXNseSBlcnJvcmVkIG9uIHN0YXJ0LlxuICAgIGlmIChzZWxmLnN0YXRlICE9PSBTQ0hFRFVMRUQpIHJldHVybiBzdG9wKCk7XG5cbiAgICBmb3IgKGkgaW4gc2NoZWR1bGVzKSB7XG4gICAgICBvID0gc2NoZWR1bGVzW2ldO1xuICAgICAgaWYgKG8ubmFtZSAhPT0gc2VsZi5uYW1lKSBjb250aW51ZTtcblxuICAgICAgLy8gV2hpbGUgdGhpcyBlbGVtZW50IGFscmVhZHkgaGFzIGEgc3RhcnRpbmcgdHJhbnNpdGlvbiBkdXJpbmcgdGhpcyBmcmFtZSxcbiAgICAgIC8vIGRlZmVyIHN0YXJ0aW5nIGFuIGludGVycnVwdGluZyB0cmFuc2l0aW9uIHVudGlsIHRoYXQgdHJhbnNpdGlvbiBoYXMgYVxuICAgICAgLy8gY2hhbmNlIHRvIHRpY2sgKGFuZCBwb3NzaWJseSBlbmQpOyBzZWUgZDMvZDMtdHJhbnNpdGlvbiM1NCFcbiAgICAgIGlmIChvLnN0YXRlID09PSBTVEFSVEVEKSByZXR1cm4gdGltZW91dChzdGFydCk7XG5cbiAgICAgIC8vIEludGVycnVwdCB0aGUgYWN0aXZlIHRyYW5zaXRpb24sIGlmIGFueS5cbiAgICAgIGlmIChvLnN0YXRlID09PSBSVU5OSU5HKSB7XG4gICAgICAgIG8uc3RhdGUgPSBFTkRFRDtcbiAgICAgICAgby50aW1lci5zdG9wKCk7XG4gICAgICAgIG8ub24uY2FsbChcImludGVycnVwdFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBvLmluZGV4LCBvLmdyb3VwKTtcbiAgICAgICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2FuY2VsIGFueSBwcmUtZW1wdGVkIHRyYW5zaXRpb25zLlxuICAgICAgZWxzZSBpZiAoK2kgPCBpZCkge1xuICAgICAgICBvLnN0YXRlID0gRU5ERUQ7XG4gICAgICAgIG8udGltZXIuc3RvcCgpO1xuICAgICAgICBvLm9uLmNhbGwoXCJjYW5jZWxcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgby5pbmRleCwgby5ncm91cCk7XG4gICAgICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gRGVmZXIgdGhlIGZpcnN0IHRpY2sgdG8gZW5kIG9mIHRoZSBjdXJyZW50IGZyYW1lOyBzZWUgZDMvZDMjMTU3Ni5cbiAgICAvLyBOb3RlIHRoZSB0cmFuc2l0aW9uIG1heSBiZSBjYW5jZWxlZCBhZnRlciBzdGFydCBhbmQgYmVmb3JlIHRoZSBmaXJzdCB0aWNrIVxuICAgIC8vIE5vdGUgdGhpcyBtdXN0IGJlIHNjaGVkdWxlZCBiZWZvcmUgdGhlIHN0YXJ0IGV2ZW50OyBzZWUgZDMvZDMtdHJhbnNpdGlvbiMxNiFcbiAgICAvLyBBc3N1bWluZyB0aGlzIGlzIHN1Y2Nlc3NmdWwsIHN1YnNlcXVlbnQgY2FsbGJhY2tzIGdvIHN0cmFpZ2h0IHRvIHRpY2suXG4gICAgdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgIGlmIChzZWxmLnN0YXRlID09PSBTVEFSVEVEKSB7XG4gICAgICAgIHNlbGYuc3RhdGUgPSBSVU5OSU5HO1xuICAgICAgICBzZWxmLnRpbWVyLnJlc3RhcnQodGljaywgc2VsZi5kZWxheSwgc2VsZi50aW1lKTtcbiAgICAgICAgdGljayhlbGFwc2VkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIERpc3BhdGNoIHRoZSBzdGFydCBldmVudC5cbiAgICAvLyBOb3RlIHRoaXMgbXVzdCBiZSBkb25lIGJlZm9yZSB0aGUgdHdlZW4gYXJlIGluaXRpYWxpemVkLlxuICAgIHNlbGYuc3RhdGUgPSBTVEFSVElORztcbiAgICBzZWxmLm9uLmNhbGwoXCJzdGFydFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKTtcbiAgICBpZiAoc2VsZi5zdGF0ZSAhPT0gU1RBUlRJTkcpIHJldHVybjsgLy8gaW50ZXJydXB0ZWRcbiAgICBzZWxmLnN0YXRlID0gU1RBUlRFRDtcblxuICAgIC8vIEluaXRpYWxpemUgdGhlIHR3ZWVuLCBkZWxldGluZyBudWxsIHR3ZWVuLlxuICAgIHR3ZWVuID0gbmV3IEFycmF5KG4gPSBzZWxmLnR3ZWVuLmxlbmd0aCk7XG4gICAgZm9yIChpID0gMCwgaiA9IC0xOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobyA9IHNlbGYudHdlZW5baV0udmFsdWUuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBzZWxmLmluZGV4LCBzZWxmLmdyb3VwKSkge1xuICAgICAgICB0d2VlblsrK2pdID0gbztcbiAgICAgIH1cbiAgICB9XG4gICAgdHdlZW4ubGVuZ3RoID0gaiArIDE7XG4gIH1cblxuICBmdW5jdGlvbiB0aWNrKGVsYXBzZWQpIHtcbiAgICB2YXIgdCA9IGVsYXBzZWQgPCBzZWxmLmR1cmF0aW9uID8gc2VsZi5lYXNlLmNhbGwobnVsbCwgZWxhcHNlZCAvIHNlbGYuZHVyYXRpb24pIDogKHNlbGYudGltZXIucmVzdGFydChzdG9wKSwgc2VsZi5zdGF0ZSA9IEVORElORywgMSksXG4gICAgICAgIGkgPSAtMSxcbiAgICAgICAgbiA9IHR3ZWVuLmxlbmd0aDtcblxuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICB0d2VlbltpXS5jYWxsKG5vZGUsIHQpO1xuICAgIH1cblxuICAgIC8vIERpc3BhdGNoIHRoZSBlbmQgZXZlbnQuXG4gICAgaWYgKHNlbGYuc3RhdGUgPT09IEVORElORykge1xuICAgICAgc2VsZi5vbi5jYWxsKFwiZW5kXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApO1xuICAgICAgc3RvcCgpO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgc2VsZi5zdGF0ZSA9IEVOREVEO1xuICAgIHNlbGYudGltZXIuc3RvcCgpO1xuICAgIGRlbGV0ZSBzY2hlZHVsZXNbaWRdO1xuICAgIGZvciAodmFyIGkgaW4gc2NoZWR1bGVzKSByZXR1cm47IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgICBkZWxldGUgbm9kZS5fX3RyYW5zaXRpb247XG4gIH1cbn1cbiIsImltcG9ydCB7U1RBUlRJTkcsIEVORElORywgRU5ERUR9IGZyb20gXCIuL3RyYW5zaXRpb24vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obm9kZSwgbmFtZSkge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb24sXG4gICAgICBzY2hlZHVsZSxcbiAgICAgIGFjdGl2ZSxcbiAgICAgIGVtcHR5ID0gdHJ1ZSxcbiAgICAgIGk7XG5cbiAgaWYgKCFzY2hlZHVsZXMpIHJldHVybjtcblxuICBuYW1lID0gbmFtZSA9PSBudWxsID8gbnVsbCA6IG5hbWUgKyBcIlwiO1xuXG4gIGZvciAoaSBpbiBzY2hlZHVsZXMpIHtcbiAgICBpZiAoKHNjaGVkdWxlID0gc2NoZWR1bGVzW2ldKS5uYW1lICE9PSBuYW1lKSB7IGVtcHR5ID0gZmFsc2U7IGNvbnRpbnVlOyB9XG4gICAgYWN0aXZlID0gc2NoZWR1bGUuc3RhdGUgPiBTVEFSVElORyAmJiBzY2hlZHVsZS5zdGF0ZSA8IEVORElORztcbiAgICBzY2hlZHVsZS5zdGF0ZSA9IEVOREVEO1xuICAgIHNjaGVkdWxlLnRpbWVyLnN0b3AoKTtcbiAgICBzY2hlZHVsZS5vbi5jYWxsKGFjdGl2ZSA/IFwiaW50ZXJydXB0XCIgOiBcImNhbmNlbFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBzY2hlZHVsZS5pbmRleCwgc2NoZWR1bGUuZ3JvdXApO1xuICAgIGRlbGV0ZSBzY2hlZHVsZXNbaV07XG4gIH1cblxuICBpZiAoZW1wdHkpIGRlbGV0ZSBub2RlLl9fdHJhbnNpdGlvbjtcbn1cbiIsImltcG9ydCBpbnRlcnJ1cHQgZnJvbSBcIi4uL2ludGVycnVwdC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHJldHVybiB0aGlzLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgaW50ZXJydXB0KHRoaXMsIG5hbWUpO1xuICB9KTtcbn1cbiIsInZhciBkZWdyZWVzID0gMTgwIC8gTWF0aC5QSTtcblxuZXhwb3J0IHZhciBpZGVudGl0eSA9IHtcbiAgdHJhbnNsYXRlWDogMCxcbiAgdHJhbnNsYXRlWTogMCxcbiAgcm90YXRlOiAwLFxuICBza2V3WDogMCxcbiAgc2NhbGVYOiAxLFxuICBzY2FsZVk6IDFcbn07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIsIGMsIGQsIGUsIGYpIHtcbiAgdmFyIHNjYWxlWCwgc2NhbGVZLCBza2V3WDtcbiAgaWYgKHNjYWxlWCA9IE1hdGguc3FydChhICogYSArIGIgKiBiKSkgYSAvPSBzY2FsZVgsIGIgLz0gc2NhbGVYO1xuICBpZiAoc2tld1ggPSBhICogYyArIGIgKiBkKSBjIC09IGEgKiBza2V3WCwgZCAtPSBiICogc2tld1g7XG4gIGlmIChzY2FsZVkgPSBNYXRoLnNxcnQoYyAqIGMgKyBkICogZCkpIGMgLz0gc2NhbGVZLCBkIC89IHNjYWxlWSwgc2tld1ggLz0gc2NhbGVZO1xuICBpZiAoYSAqIGQgPCBiICogYykgYSA9IC1hLCBiID0gLWIsIHNrZXdYID0gLXNrZXdYLCBzY2FsZVggPSAtc2NhbGVYO1xuICByZXR1cm4ge1xuICAgIHRyYW5zbGF0ZVg6IGUsXG4gICAgdHJhbnNsYXRlWTogZixcbiAgICByb3RhdGU6IE1hdGguYXRhbjIoYiwgYSkgKiBkZWdyZWVzLFxuICAgIHNrZXdYOiBNYXRoLmF0YW4oc2tld1gpICogZGVncmVlcyxcbiAgICBzY2FsZVg6IHNjYWxlWCxcbiAgICBzY2FsZVk6IHNjYWxlWVxuICB9O1xufVxuIiwiaW1wb3J0IGRlY29tcG9zZSwge2lkZW50aXR5fSBmcm9tIFwiLi9kZWNvbXBvc2UuanNcIjtcblxudmFyIHN2Z05vZGU7XG5cbi8qIGVzbGludC1kaXNhYmxlIG5vLXVuZGVmICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VDc3ModmFsdWUpIHtcbiAgY29uc3QgbSA9IG5ldyAodHlwZW9mIERPTU1hdHJpeCA9PT0gXCJmdW5jdGlvblwiID8gRE9NTWF0cml4IDogV2ViS2l0Q1NTTWF0cml4KSh2YWx1ZSArIFwiXCIpO1xuICByZXR1cm4gbS5pc0lkZW50aXR5ID8gaWRlbnRpdHkgOiBkZWNvbXBvc2UobS5hLCBtLmIsIG0uYywgbS5kLCBtLmUsIG0uZik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQge3BhcnNlQ3NzLCBwYXJzZVN2Z30gZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2UsIHB4Q29tbWEsIHB4UGFyZW4sIGRlZ1BhcmVuKSB7XG5cbiAgZnVuY3Rpb24gcG9wKHMpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPyBzLnBvcCgpICsgXCIgXCIgOiBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKFwidHJhbnNsYXRlKFwiLCBudWxsLCBweENvbW1hLCBudWxsLCBweFBhcmVuKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgfHwgeWIpIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiArIHhiICsgcHhDb21tYSArIHliICsgcHhQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcm90YXRlKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgaWYgKGEgLSBiID4gMTgwKSBiICs9IDM2MDsgZWxzZSBpZiAoYiAtIGEgPiAxODApIGEgKz0gMzYwOyAvLyBzaG9ydGVzdCBwYXRoXG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNrZXdYKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgIT09IDEgfHwgeWIgIT09IDEpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiICsgeGIgKyBcIixcIiArIHliICsgXCIpXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcbiAgICBhID0gcGFyc2UoYSksIGIgPSBwYXJzZShiKTtcbiAgICB0cmFuc2xhdGUoYS50cmFuc2xhdGVYLCBhLnRyYW5zbGF0ZVksIGIudHJhbnNsYXRlWCwgYi50cmFuc2xhdGVZLCBzLCBxKTtcbiAgICByb3RhdGUoYS5yb3RhdGUsIGIucm90YXRlLCBzLCBxKTtcbiAgICBza2V3WChhLnNrZXdYLCBiLnNrZXdYLCBzLCBxKTtcbiAgICBzY2FsZShhLnNjYWxlWCwgYS5zY2FsZVksIGIuc2NhbGVYLCBiLnNjYWxlWSwgcywgcSk7XG4gICAgYSA9IGIgPSBudWxsOyAvLyBnY1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gcS5sZW5ndGgsIG87XG4gICAgICB3aGlsZSAoKytpIDwgbikgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtQ3NzID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VDc3MsIFwicHgsIFwiLCBcInB4KVwiLCBcImRlZylcIik7XG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VTdmcsIFwiLCBcIiwgXCIpXCIsIFwiKVwiKTtcbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIHR3ZWVuUmVtb3ZlKGlkLCBuYW1lKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIHR3ZWVuID0gc2NoZWR1bGUudHdlZW47XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIHR3ZWVuIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIHR3ZWVuIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmICh0d2VlbiAhPT0gdHdlZW4wKSB7XG4gICAgICB0d2VlbjEgPSB0d2VlbjAgPSB0d2VlbjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4xLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAodHdlZW4xW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICB0d2VlbjEgPSB0d2VlbjEuc2xpY2UoKTtcbiAgICAgICAgICB0d2VlbjEuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2NoZWR1bGUudHdlZW4gPSB0d2VlbjE7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHR3ZWVuRnVuY3Rpb24oaWQsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gKHR3ZWVuMCA9IHR3ZWVuKS5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgdCA9IHtuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWV9LCBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xW2ldID0gdDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGkgPT09IG4pIHR3ZWVuMS5wdXNoKHQpO1xuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICBuYW1lICs9IFwiXCI7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIHR3ZWVuID0gZ2V0KHRoaXMubm9kZSgpLCBpZCkudHdlZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0d2Vlbi5sZW5ndGgsIHQ7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgodCA9IHR3ZWVuW2ldKS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0LnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGwgPyB0d2VlblJlbW92ZSA6IHR3ZWVuRnVuY3Rpb24pKGlkLCBuYW1lLCB2YWx1ZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHdlZW5WYWx1ZSh0cmFuc2l0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0cmFuc2l0aW9uLl9pZDtcblxuICB0cmFuc2l0aW9uLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKTtcbiAgICAoc2NoZWR1bGUudmFsdWUgfHwgKHNjaGVkdWxlLnZhbHVlID0ge30pKVtuYW1lXSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIGdldChub2RlLCBpZCkudmFsdWVbbmFtZV07XG4gIH07XG59XG4iLCJpbXBvcnQge2NvbG9yfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7aW50ZXJwb2xhdGVOdW1iZXIsIGludGVycG9sYXRlUmdiLCBpbnRlcnBvbGF0ZVN0cmluZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGM7XG4gIHJldHVybiAodHlwZW9mIGIgPT09IFwibnVtYmVyXCIgPyBpbnRlcnBvbGF0ZU51bWJlclxuICAgICAgOiBiIGluc3RhbmNlb2YgY29sb3IgPyBpbnRlcnBvbGF0ZVJnYlxuICAgICAgOiAoYyA9IGNvbG9yKGIpKSA/IChiID0gYywgaW50ZXJwb2xhdGVSZ2IpXG4gICAgICA6IGludGVycG9sYXRlU3RyaW5nKShhLCBiKTtcbn1cbiIsImltcG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmcgYXMgaW50ZXJwb2xhdGVUcmFuc2Zvcm19IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCBpbnRlcnBvbGF0ZSBmcm9tIFwiLi9pbnRlcnBvbGF0ZS5qc1wiO1xuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlTlMoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnROUyhmdWxsbmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb24obmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAsIHZhbHVlMSA9IHZhbHVlKHRoaXMpLCBzdHJpbmcxO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgcmV0dXJuIHZvaWQgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoZnVsbG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwLCB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSwgc3RyaW5nMTtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHJldHVybiB2b2lkIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpLCBpID0gZnVsbG5hbWUgPT09IFwidHJhbnNmb3JtXCIgPyBpbnRlcnBvbGF0ZVRyYW5zZm9ybSA6IGludGVycG9sYXRlO1xuICByZXR1cm4gdGhpcy5hdHRyVHdlZW4obmFtZSwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pKGZ1bGxuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwiYXR0ci5cIiArIG5hbWUsIHZhbHVlKSlcbiAgICAgIDogdmFsdWUgPT0gbnVsbCA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJSZW1vdmVOUyA6IGF0dHJSZW1vdmUpKGZ1bGxuYW1lKVxuICAgICAgOiAoZnVsbG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudCkoZnVsbG5hbWUsIGksIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge25hbWVzcGFjZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGUobmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2Vlbk5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZnVuY3Rpb24gYXR0clR3ZWVuKG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgYXR0ckludGVycG9sYXRlKG5hbWUsIGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJhdHRyLlwiICsgbmFtZTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgKGZ1bGxuYW1lLmxvY2FsID8gYXR0clR3ZWVuTlMgOiBhdHRyVHdlZW4pKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtnZXQsIGluaXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGRlbGF5RnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9ICt2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkZWxheUNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPSArdmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgIGluaXQodGhpcywgaWQpLmRlbGF5ID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGRlbGF5RnVuY3Rpb25cbiAgICAgICAgICA6IGRlbGF5Q29uc3RhbnQpKGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmRlbGF5O1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZHVyYXRpb25GdW5jdGlvbihpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZHVyYXRpb24gPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZHVyYXRpb25Db25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmR1cmF0aW9uID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGR1cmF0aW9uRnVuY3Rpb25cbiAgICAgICAgICA6IGR1cmF0aW9uQ29uc3RhbnQpKGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmR1cmF0aW9uO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZWFzZSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmVhc2U7XG59XG4iLCJpbXBvcnQge3NldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZWFzZVZhcnlpbmcoaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdiA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKHR5cGVvZiB2ICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgICBzZXQodGhpcywgaWQpLmVhc2UgPSB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMuZWFjaChlYXNlVmFyeWluZyh0aGlzLl9pZCwgdmFsdWUpKTtcbn1cbiIsImltcG9ydCB7bWF0Y2hlcn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICBpZiAodHlwZW9mIG1hdGNoICE9PSBcImZ1bmN0aW9uXCIpIG1hdGNoID0gbWF0Y2hlcihtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cywgdGhpcy5fbmFtZSwgdGhpcy5faWQpO1xufVxuIiwiaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0cmFuc2l0aW9uKSB7XG4gIGlmICh0cmFuc2l0aW9uLl9pZCAhPT0gdGhpcy5faWQpIHRocm93IG5ldyBFcnJvcjtcblxuICBmb3IgKHZhciBncm91cHMwID0gdGhpcy5fZ3JvdXBzLCBncm91cHMxID0gdHJhbnNpdGlvbi5fZ3JvdXBzLCBtMCA9IGdyb3VwczAubGVuZ3RoLCBtMSA9IGdyb3VwczEubGVuZ3RoLCBtID0gTWF0aC5taW4obTAsIG0xKSwgbWVyZ2VzID0gbmV3IEFycmF5KG0wKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cDAgPSBncm91cHMwW2pdLCBncm91cDEgPSBncm91cHMxW2pdLCBuID0gZ3JvdXAwLmxlbmd0aCwgbWVyZ2UgPSBtZXJnZXNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwMFtpXSB8fCBncm91cDFbaV0pIHtcbiAgICAgICAgbWVyZ2VbaV0gPSBub2RlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoOyBqIDwgbTA7ICsraikge1xuICAgIG1lcmdlc1tqXSA9IGdyb3VwczBbal07XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24obWVyZ2VzLCB0aGlzLl9wYXJlbnRzLCB0aGlzLl9uYW1lLCB0aGlzLl9pZCk7XG59XG4iLCJpbXBvcnQge2dldCwgc2V0LCBpbml0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5mdW5jdGlvbiBzdGFydChuYW1lKSB7XG4gIHJldHVybiAobmFtZSArIFwiXCIpLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykuZXZlcnkoZnVuY3Rpb24odCkge1xuICAgIHZhciBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSB0ID0gdC5zbGljZSgwLCBpKTtcbiAgICByZXR1cm4gIXQgfHwgdCA9PT0gXCJzdGFydFwiO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb25GdW5jdGlvbihpZCwgbmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG9uMCwgb24xLCBzaXQgPSBzdGFydChuYW1lKSA/IGluaXQgOiBzZXQ7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzaXQodGhpcywgaWQpLFxuICAgICAgICBvbiA9IHNjaGVkdWxlLm9uO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCBhIGRpc3BhdGNoIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIGRpc3BhdGNoIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmIChvbiAhPT0gb24wKSAob24xID0gKG9uMCA9IG9uKS5jb3B5KCkpLm9uKG5hbWUsIGxpc3RlbmVyKTtcblxuICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCBsaXN0ZW5lcikge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA8IDJcbiAgICAgID8gZ2V0KHRoaXMubm9kZSgpLCBpZCkub24ub24obmFtZSlcbiAgICAgIDogdGhpcy5lYWNoKG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSk7XG59XG4iLCJmdW5jdGlvbiByZW1vdmVGdW5jdGlvbihpZCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgICBmb3IgKHZhciBpIGluIHRoaXMuX190cmFuc2l0aW9uKSBpZiAoK2kgIT09IGlkKSByZXR1cm47XG4gICAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMub24oXCJlbmQucmVtb3ZlXCIsIHJlbW92ZUZ1bmN0aW9uKHRoaXMuX2lkKSk7XG59XG4iLCJpbXBvcnQge3NlbGVjdG9yfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZCA9IHRoaXMuX2lkO1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgc3Vibm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiAoc3Vibm9kZSA9IHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkpIHtcbiAgICAgICAgaWYgKFwiX19kYXRhX19cIiBpbiBub2RlKSBzdWJub2RlLl9fZGF0YV9fID0gbm9kZS5fX2RhdGFfXztcbiAgICAgICAgc3ViZ3JvdXBbaV0gPSBzdWJub2RlO1xuICAgICAgICBzY2hlZHVsZShzdWJncm91cFtpXSwgbmFtZSwgaWQsIGksIHN1Ymdyb3VwLCBnZXQobm9kZSwgaWQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdG9yQWxsfSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQge1RyYW5zaXRpb259IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZCA9IHRoaXMuX2lkO1xuXG4gIGlmICh0eXBlb2Ygc2VsZWN0ICE9PSBcImZ1bmN0aW9uXCIpIHNlbGVjdCA9IHNlbGVjdG9yQWxsKHNlbGVjdCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gW10sIHBhcmVudHMgPSBbXSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgZm9yICh2YXIgY2hpbGRyZW4gPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCksIGNoaWxkLCBpbmhlcml0ID0gZ2V0KG5vZGUsIGlkKSwgayA9IDAsIGwgPSBjaGlsZHJlbi5sZW5ndGg7IGsgPCBsOyArK2spIHtcbiAgICAgICAgICBpZiAoY2hpbGQgPSBjaGlsZHJlbltrXSkge1xuICAgICAgICAgICAgc2NoZWR1bGUoY2hpbGQsIG5hbWUsIGlkLCBrLCBjaGlsZHJlbiwgaW5oZXJpdCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHN1Ymdyb3Vwcy5wdXNoKGNoaWxkcmVuKTtcbiAgICAgICAgcGFyZW50cy5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHBhcmVudHMsIG5hbWUsIGlkKTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5cbnZhciBTZWxlY3Rpb24gPSBzZWxlY3Rpb24ucHJvdG90eXBlLmNvbnN0cnVjdG9yO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImltcG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1Dc3MgYXMgaW50ZXJwb2xhdGVUcmFuc2Zvcm19IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtzdHlsZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5pbXBvcnQge3R3ZWVuVmFsdWV9IGZyb20gXCIuL3R3ZWVuLmpzXCI7XG5pbXBvcnQgaW50ZXJwb2xhdGUgZnJvbSBcIi4vaW50ZXJwb2xhdGUuanNcIjtcblxuZnVuY3Rpb24gc3R5bGVOdWxsKG5hbWUsIGludGVycG9sYXRlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKSxcbiAgICAgICAgc3RyaW5nMSA9ICh0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpLCBzdHlsZSh0aGlzLCBuYW1lKSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHN0cmluZzEwID0gc3RyaW5nMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUucmVtb3ZlUHJvcGVydHkobmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlQ29uc3RhbnQobmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlRnVuY3Rpb24obmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAgPSBzdHlsZSh0aGlzLCBuYW1lKSxcbiAgICAgICAgdmFsdWUxID0gdmFsdWUodGhpcyksXG4gICAgICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgc3RyaW5nMSA9IHZhbHVlMSA9ICh0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpLCBzdHlsZSh0aGlzLCBuYW1lKSk7XG4gICAgcmV0dXJuIHN0cmluZzAgPT09IHN0cmluZzEgPyBudWxsXG4gICAgICAgIDogc3RyaW5nMCA9PT0gc3RyaW5nMDAgJiYgc3RyaW5nMSA9PT0gc3RyaW5nMTAgPyBpbnRlcnBvbGF0ZTBcbiAgICAgICAgOiAoc3RyaW5nMTAgPSBzdHJpbmcxLCBpbnRlcnBvbGF0ZTAgPSBpbnRlcnBvbGF0ZShzdHJpbmcwMCA9IHN0cmluZzAsIHZhbHVlMSkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZU1heWJlUmVtb3ZlKGlkLCBuYW1lKSB7XG4gIHZhciBvbjAsIG9uMSwgbGlzdGVuZXIwLCBrZXkgPSBcInN0eWxlLlwiICsgbmFtZSwgZXZlbnQgPSBcImVuZC5cIiArIGtleSwgcmVtb3ZlO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbixcbiAgICAgICAgbGlzdGVuZXIgPSBzY2hlZHVsZS52YWx1ZVtrZXldID09IG51bGwgPyByZW1vdmUgfHwgKHJlbW92ZSA9IHN0eWxlUmVtb3ZlKG5hbWUpKSA6IHVuZGVmaW5lZDtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCB8fCBsaXN0ZW5lcjAgIT09IGxpc3RlbmVyKSAob24xID0gKG9uMCA9IG9uKS5jb3B5KCkpLm9uKGV2ZW50LCBsaXN0ZW5lcjAgPSBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHZhciBpID0gKG5hbWUgKz0gXCJcIikgPT09IFwidHJhbnNmb3JtXCIgPyBpbnRlcnBvbGF0ZVRyYW5zZm9ybSA6IGludGVycG9sYXRlO1xuICByZXR1cm4gdmFsdWUgPT0gbnVsbCA/IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlTnVsbChuYW1lLCBpKSlcbiAgICAgIC5vbihcImVuZC5zdHlsZS5cIiArIG5hbWUsIHN0eWxlUmVtb3ZlKG5hbWUpKVxuICAgIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCIgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUZ1bmN0aW9uKG5hbWUsIGksIHR3ZWVuVmFsdWUodGhpcywgXCJzdHlsZS5cIiArIG5hbWUsIHZhbHVlKSkpXG4gICAgICAuZWFjaChzdHlsZU1heWJlUmVtb3ZlKHRoaXMuX2lkLCBuYW1lKSlcbiAgICA6IHRoaXNcbiAgICAgIC5zdHlsZVR3ZWVuKG5hbWUsIHN0eWxlQ29uc3RhbnQobmFtZSwgaSwgdmFsdWUpLCBwcmlvcml0eSlcbiAgICAgIC5vbihcImVuZC5zdHlsZS5cIiArIG5hbWUsIG51bGwpO1xufVxuIiwiZnVuY3Rpb24gc3R5bGVJbnRlcnBvbGF0ZShuYW1lLCBpLCBwcmlvcml0eSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgaS5jYWxsKHRoaXMsIHQpLCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5KSB7XG4gIHZhciB0LCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdCA9IChpMCA9IGkpICYmIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpO1xuICAgIHJldHVybiB0O1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIga2V5ID0gXCJzdHlsZS5cIiArIChuYW1lICs9IFwiXCIpO1xuICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDIpIHJldHVybiAoa2V5ID0gdGhpcy50d2VlbihrZXkpKSAmJiBrZXkuX3ZhbHVlO1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCBudWxsKTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgc3R5bGVUd2VlbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkgPT0gbnVsbCA/IFwiXCIgOiBwcmlvcml0eSkpO1xufVxuIiwiaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuXG5mdW5jdGlvbiB0ZXh0Q29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dEZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgdmFsdWUxID0gdmFsdWUodGhpcyk7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IHZhbHVlMSA9PSBudWxsID8gXCJcIiA6IHZhbHVlMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIHRoaXMudHdlZW4oXCJ0ZXh0XCIsIHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IHRleHRGdW5jdGlvbih0d2VlblZhbHVlKHRoaXMsIFwidGV4dFwiLCB2YWx1ZSkpXG4gICAgICA6IHRleHRDb25zdGFudCh2YWx1ZSA9PSBudWxsID8gXCJcIiA6IHZhbHVlICsgXCJcIikpO1xufVxuIiwiZnVuY3Rpb24gdGV4dEludGVycG9sYXRlKGkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gaS5jYWxsKHRoaXMsIHQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0ZXh0VHdlZW4odmFsdWUpIHtcbiAgdmFyIHQwLCBpMDtcbiAgZnVuY3Rpb24gdHdlZW4oKSB7XG4gICAgdmFyIGkgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmIChpICE9PSBpMCkgdDAgPSAoaTAgPSBpKSAmJiB0ZXh0SW50ZXJwb2xhdGUoaSk7XG4gICAgcmV0dXJuIHQwO1xuICB9XG4gIHR3ZWVuLl92YWx1ZSA9IHZhbHVlO1xuICByZXR1cm4gdHdlZW47XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBrZXkgPSBcInRleHRcIjtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAxKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHRleHRUd2Vlbih2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtUcmFuc2l0aW9uLCBuZXdJZH0gZnJvbSBcIi4vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSwge2dldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBuYW1lID0gdGhpcy5fbmFtZSxcbiAgICAgIGlkMCA9IHRoaXMuX2lkLFxuICAgICAgaWQxID0gbmV3SWQoKTtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICB2YXIgaW5oZXJpdCA9IGdldChub2RlLCBpZDApO1xuICAgICAgICBzY2hlZHVsZShub2RlLCBuYW1lLCBpZDEsIGksIGdyb3VwLCB7XG4gICAgICAgICAgdGltZTogaW5oZXJpdC50aW1lICsgaW5oZXJpdC5kZWxheSArIGluaGVyaXQuZHVyYXRpb24sXG4gICAgICAgICAgZGVsYXk6IDAsXG4gICAgICAgICAgZHVyYXRpb246IGluaGVyaXQuZHVyYXRpb24sXG4gICAgICAgICAgZWFzZTogaW5oZXJpdC5lYXNlXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihncm91cHMsIHRoaXMuX3BhcmVudHMsIG5hbWUsIGlkMSk7XG59XG4iLCJpbXBvcnQge3NldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBvbjAsIG9uMSwgdGhhdCA9IHRoaXMsIGlkID0gdGhhdC5faWQsIHNpemUgPSB0aGF0LnNpemUoKTtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uKHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciBjYW5jZWwgPSB7dmFsdWU6IHJlamVjdH0sXG4gICAgICAgIGVuZCA9IHt2YWx1ZTogZnVuY3Rpb24oKSB7IGlmICgtLXNpemUgPT09IDApIHJlc29sdmUoKTsgfX07XG5cbiAgICB0aGF0LmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICAgIG9uID0gc2NoZWR1bGUub247XG5cbiAgICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIGRpc3BhdGNoIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgICBpZiAob24gIT09IG9uMCkge1xuICAgICAgICBvbjEgPSAob24wID0gb24pLmNvcHkoKTtcbiAgICAgICAgb24xLl8uY2FuY2VsLnB1c2goY2FuY2VsKTtcbiAgICAgICAgb24xLl8uaW50ZXJydXB0LnB1c2goY2FuY2VsKTtcbiAgICAgICAgb24xLl8uZW5kLnB1c2goZW5kKTtcbiAgICAgIH1cblxuICAgICAgc2NoZWR1bGUub24gPSBvbjE7XG4gICAgfSk7XG5cbiAgICAvLyBUaGUgc2VsZWN0aW9uIHdhcyBlbXB0eSwgcmVzb2x2ZSBlbmQgaW1tZWRpYXRlbHlcbiAgICBpZiAoc2l6ZSA9PT0gMCkgcmVzb2x2ZSgpO1xuICB9KTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2F0dHJUd2VlbiBmcm9tIFwiLi9hdHRyVHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2RlbGF5IGZyb20gXCIuL2RlbGF5LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kdXJhdGlvbiBmcm9tIFwiLi9kdXJhdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZSBmcm9tIFwiLi9lYXNlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9lYXNlVmFyeWluZyBmcm9tIFwiLi9lYXNlVmFyeWluZy5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZmlsdGVyIGZyb20gXCIuL2ZpbHRlci5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fbWVyZ2UgZnJvbSBcIi4vbWVyZ2UuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX29uIGZyb20gXCIuL29uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9yZW1vdmUgZnJvbSBcIi4vcmVtb3ZlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3QgZnJvbSBcIi4vc2VsZWN0LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3RBbGwgZnJvbSBcIi4vc2VsZWN0QWxsLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zZWxlY3Rpb24gZnJvbSBcIi4vc2VsZWN0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zdHlsZSBmcm9tIFwiLi9zdHlsZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fc3R5bGVUd2VlbiBmcm9tIFwiLi9zdHlsZVR3ZWVuLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RleHRUd2VlbiBmcm9tIFwiLi90ZXh0VHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RyYW5zaXRpb24gZnJvbSBcIi4vdHJhbnNpdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdHdlZW4gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2VuZCBmcm9tIFwiLi9lbmQuanNcIjtcblxudmFyIGlkID0gMDtcblxuZXhwb3J0IGZ1bmN0aW9uIFRyYW5zaXRpb24oZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCkge1xuICB0aGlzLl9ncm91cHMgPSBncm91cHM7XG4gIHRoaXMuX3BhcmVudHMgPSBwYXJlbnRzO1xuICB0aGlzLl9uYW1lID0gbmFtZTtcbiAgdGhpcy5faWQgPSBpZDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdHJhbnNpdGlvbihuYW1lKSB7XG4gIHJldHVybiBzZWxlY3Rpb24oKS50cmFuc2l0aW9uKG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmV3SWQoKSB7XG4gIHJldHVybiArK2lkO1xufVxuXG52YXIgc2VsZWN0aW9uX3Byb3RvdHlwZSA9IHNlbGVjdGlvbi5wcm90b3R5cGU7XG5cblRyYW5zaXRpb24ucHJvdG90eXBlID0gdHJhbnNpdGlvbi5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUcmFuc2l0aW9uLFxuICBzZWxlY3Q6IHRyYW5zaXRpb25fc2VsZWN0LFxuICBzZWxlY3RBbGw6IHRyYW5zaXRpb25fc2VsZWN0QWxsLFxuICBzZWxlY3RDaGlsZDogc2VsZWN0aW9uX3Byb3RvdHlwZS5zZWxlY3RDaGlsZCxcbiAgc2VsZWN0Q2hpbGRyZW46IHNlbGVjdGlvbl9wcm90b3R5cGUuc2VsZWN0Q2hpbGRyZW4sXG4gIGZpbHRlcjogdHJhbnNpdGlvbl9maWx0ZXIsXG4gIG1lcmdlOiB0cmFuc2l0aW9uX21lcmdlLFxuICBzZWxlY3Rpb246IHRyYW5zaXRpb25fc2VsZWN0aW9uLFxuICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uX3RyYW5zaXRpb24sXG4gIGNhbGw6IHNlbGVjdGlvbl9wcm90b3R5cGUuY2FsbCxcbiAgbm9kZXM6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3Byb3RvdHlwZS5zaXplLFxuICBlbXB0eTogc2VsZWN0aW9uX3Byb3RvdHlwZS5lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX3Byb3RvdHlwZS5lYWNoLFxuICBvbjogdHJhbnNpdGlvbl9vbixcbiAgYXR0cjogdHJhbnNpdGlvbl9hdHRyLFxuICBhdHRyVHdlZW46IHRyYW5zaXRpb25fYXR0clR3ZWVuLFxuICBzdHlsZTogdHJhbnNpdGlvbl9zdHlsZSxcbiAgc3R5bGVUd2VlbjogdHJhbnNpdGlvbl9zdHlsZVR3ZWVuLFxuICB0ZXh0OiB0cmFuc2l0aW9uX3RleHQsXG4gIHRleHRUd2VlbjogdHJhbnNpdGlvbl90ZXh0VHdlZW4sXG4gIHJlbW92ZTogdHJhbnNpdGlvbl9yZW1vdmUsXG4gIHR3ZWVuOiB0cmFuc2l0aW9uX3R3ZWVuLFxuICBkZWxheTogdHJhbnNpdGlvbl9kZWxheSxcbiAgZHVyYXRpb246IHRyYW5zaXRpb25fZHVyYXRpb24sXG4gIGVhc2U6IHRyYW5zaXRpb25fZWFzZSxcbiAgZWFzZVZhcnlpbmc6IHRyYW5zaXRpb25fZWFzZVZhcnlpbmcsXG4gIGVuZDogdHJhbnNpdGlvbl9lbmQsXG4gIFtTeW1ib2wuaXRlcmF0b3JdOiBzZWxlY3Rpb25fcHJvdG90eXBlW1N5bWJvbC5pdGVyYXRvcl1cbn07XG4iLCJleHBvcnQgZnVuY3Rpb24gY3ViaWNJbih0KSB7XG4gIHJldHVybiB0ICogdCAqIHQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY091dCh0KSB7XG4gIHJldHVybiAtLXQgKiB0ICogdCArIDE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdWJpY0luT3V0KHQpIHtcbiAgcmV0dXJuICgodCAqPSAyKSA8PSAxID8gdCAqIHQgKiB0IDogKHQgLT0gMikgKiB0ICogdCArIDIpIC8gMjtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuLi90cmFuc2l0aW9uL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUgZnJvbSBcIi4uL3RyYW5zaXRpb24vc2NoZWR1bGUuanNcIjtcbmltcG9ydCB7ZWFzZUN1YmljSW5PdXR9IGZyb20gXCJkMy1lYXNlXCI7XG5pbXBvcnQge25vd30gZnJvbSBcImQzLXRpbWVyXCI7XG5cbnZhciBkZWZhdWx0VGltaW5nID0ge1xuICB0aW1lOiBudWxsLCAvLyBTZXQgb24gdXNlLlxuICBkZWxheTogMCxcbiAgZHVyYXRpb246IDI1MCxcbiAgZWFzZTogZWFzZUN1YmljSW5PdXRcbn07XG5cbmZ1bmN0aW9uIGluaGVyaXQobm9kZSwgaWQpIHtcbiAgdmFyIHRpbWluZztcbiAgd2hpbGUgKCEodGltaW5nID0gbm9kZS5fX3RyYW5zaXRpb24pIHx8ICEodGltaW5nID0gdGltaW5nW2lkXSkpIHtcbiAgICBpZiAoIShub2RlID0gbm9kZS5wYXJlbnROb2RlKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGB0cmFuc2l0aW9uICR7aWR9IG5vdCBmb3VuZGApO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdGltaW5nO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBpZCxcbiAgICAgIHRpbWluZztcblxuICBpZiAobmFtZSBpbnN0YW5jZW9mIFRyYW5zaXRpb24pIHtcbiAgICBpZCA9IG5hbWUuX2lkLCBuYW1lID0gbmFtZS5fbmFtZTtcbiAgfSBlbHNlIHtcbiAgICBpZCA9IG5ld0lkKCksICh0aW1pbmcgPSBkZWZhdWx0VGltaW5nKS50aW1lID0gbm93KCksIG5hbWUgPSBuYW1lID09IG51bGwgPyBudWxsIDogbmFtZSArIFwiXCI7XG4gIH1cblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIG0gPSBncm91cHMubGVuZ3RoLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBzY2hlZHVsZShub2RlLCBuYW1lLCBpZCwgaSwgZ3JvdXAsIHRpbWluZyB8fCBpbmhlcml0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKGdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rpb259IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCBzZWxlY3Rpb25faW50ZXJydXB0IGZyb20gXCIuL2ludGVycnVwdC5qc1wiO1xuaW1wb3J0IHNlbGVjdGlvbl90cmFuc2l0aW9uIGZyb20gXCIuL3RyYW5zaXRpb24uanNcIjtcblxuc2VsZWN0aW9uLnByb3RvdHlwZS5pbnRlcnJ1cHQgPSBzZWxlY3Rpb25faW50ZXJydXB0O1xuc2VsZWN0aW9uLnByb3RvdHlwZS50cmFuc2l0aW9uID0gc2VsZWN0aW9uX3RyYW5zaXRpb247XG4iLCJpbXBvcnQgXCIuL3NlbGVjdGlvbi9pbmRleC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRyYW5zaXRpb259IGZyb20gXCIuL3RyYW5zaXRpb24vaW5kZXguanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBhY3RpdmV9IGZyb20gXCIuL2FjdGl2ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycnVwdH0gZnJvbSBcIi4vaW50ZXJydXB0LmpzXCI7XG4iLCIvLyB0b29sdGlwLmpzXG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdkMy1zZWxlY3Rpb24nXG5pbXBvcnQgJ2QzLXRyYW5zaXRpb24nIC8vIGF1Z21lbnRzIHNlbGVjdGlvbnMgd2l0aCAudHJhbnNpdGlvbigpXG5cbmNvbnN0IHRvb2x0aXBFbCA9IHNlbGVjdCgnLnRvb2x0aXAnKVxuY29uc3QgVE9PTFRJUF9XSURUSCA9IDIxNVxuY29uc3QgUEFERElORyA9IDEwXG5cbi8vIHJvYnVzdCBjb29yZGluYXRlcyAobW91c2UsIHBvaW50ZXIsIG9yIHRvdWNoKVxuZnVuY3Rpb24gZ2V0UG9pbnQoZXZ0KSB7XG4gIC8vIHRvdWNoIGV2ZW50cyAobW9iaWxlKVxuICBjb25zdCB0ID0gZXZ0Py50b3VjaGVzPy5bMF0gfHwgZXZ0Py5jaGFuZ2VkVG91Y2hlcz8uWzBdXG4gIGNvbnN0IGUgPSB0IHx8IGV2dFxuICAvLyBmYWxsIGJhY2sgdG8gY2xpZW50WC9ZIGlmIHBhZ2VYL1kgYXJlIG1pc3NpbmdcbiAgY29uc3QgcGFnZVggPSBlPy5wYWdlWCA/PyAoZT8uY2xpZW50WCAhPSBudWxsID8gZS5jbGllbnRYICsgd2luZG93LnNjcm9sbFggOiAwKVxuICBjb25zdCBwYWdlWSA9IGU/LnBhZ2VZID8/IChlPy5jbGllbnRZICE9IG51bGwgPyBlLmNsaWVudFkgKyB3aW5kb3cuc2Nyb2xsWSA6IDApXG4gIHJldHVybiB7IHg6IHBhZ2VYLCB5OiBwYWdlWSB9XG59XG5cbmNvbnN0IGFwaSA9IHtcbiAgc2hvdyhjb250ZW50LCBldnQpIHtcbiAgICBsZXQgeyB4LCB5IH0gPSBnZXRQb2ludChldnQpXG5cbiAgICAvLyBrZWVwIHRvb2x0aXAgaW5zaWRlIHRoZSB2aWV3cG9ydOKAmXMgcmlnaHQgZWRnZVxuICAgIGNvbnN0IG1heExlZnQgPSBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gVE9PTFRJUF9XSURUSCAtIFBBRERJTkdcbiAgICBpZiAoeCArIFBBRERJTkcgPiBtYXhMZWZ0KSB4ID0gbWF4TGVmdFxuXG4gICAgLy8gZmFkZSBpblxuICAgIHRvb2x0aXBFbFxuICAgICAgLnRyYW5zaXRpb24oKVxuICAgICAgLmR1cmF0aW9uKDIwMClcbiAgICAgIC5zdHlsZSgnb3BhY2l0eScsIDAuOSlcbiAgICAgIC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICB0b29sdGlwRWwuY2xhc3NlZCgnaXNBY3RpdmUnLCB0cnVlKVxuICAgICAgICB0b29sdGlwRWwub24oJ2NsaWNrJywgYXBpLmhpZGUpIC8vIGRvbid0IHVzZSBgdGhpcy5oaWRlYCBoZXJlXG4gICAgICB9KVxuXG4gICAgdG9vbHRpcEVsXG4gICAgICAuaHRtbChjb250ZW50KVxuICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuICAgICAgLnN0eWxlKCdsZWZ0JywgeCArICdweCcpXG4gICAgICAuc3R5bGUoJ3RvcCcsIHkgKyAncHgnKVxuICB9LFxuXG4gIGhpZGUoKSB7XG4gICAgdG9vbHRpcEVsXG4gICAgICAudHJhbnNpdGlvbigpXG4gICAgICAuZHVyYXRpb24oNTAwKVxuICAgICAgLnN0eWxlKCdvcGFjaXR5JywgMClcbiAgICAgIC5vbignZW5kJywgKCkgPT4ge1xuICAgICAgICB0b29sdGlwRWwuY2xhc3NlZCgnaXNBY3RpdmUnLCBmYWxzZSkuc3R5bGUoJ3Zpc2liaWxpdHknLCAnaGlkZGVuJylcbiAgICAgIH0pXG4gIH0sXG5cbiAgZm9ybWF0Q29udGVudChjb21wb25lbnQpIHtcbiAgICBsZXQgY29udGVudCA9ICc8dWwgY2xhc3M9XCJ0b29sdGlwLWxpc3RcIj4nXG4gICAgY29tcG9uZW50LmZvckVhY2goKGl0ZW0pID0+IHtcbiAgICAgIGNvbnN0IGNzc0NsYXNzID0gaXRlbS5jbGFzcyB8fCAnJ1xuICAgICAgY29uc3QgbGFiZWwgPSBPYmplY3Qua2V5cyhpdGVtKVswXVxuICAgICAgY29udGVudCArPSBgPGxpIGNsYXNzPVwiJHtjc3NDbGFzc31cIj48c3BhbiBjbGFzcz1cInRvb2x0aXAtbGFiZWxcIj4ke2xhYmVsfTo8L3NwYW4+ICR7aXRlbVtsYWJlbF19PC9saT5gXG4gICAgfSlcbiAgICBjb250ZW50ICs9ICc8L3VsPidcbiAgICByZXR1cm4gY29udGVudFxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGFwaVxuIiwiaW1wb3J0IHsgc2VsZWN0LCBzZWxlY3RBbGwgfSBmcm9tICdkMy1zZWxlY3Rpb24nXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkMy1mb3JtYXQnXG5pbXBvcnQgeyBzY2FsZVF1YW50aWxlLCBzY2FsZU9yZGluYWwsIHNjYWxlTG9nIH0gZnJvbSAnZDMtc2NhbGUnXG5pbXBvcnQgeyBvbiwgdHJhbnNpdGlvbiwgZHVyYXRpb24gfSBmcm9tICdkMy10cmFuc2l0aW9uJ1xuaW1wb3J0IHsgZXh0ZW50IH0gZnJvbSAnZDMtYXJyYXknXG5pbXBvcnQgdG9vbHRpcCBmcm9tICcuL3Rvb2x0aXAnXG5cbmNvbnN0IGRvbGxhckZvcm1hdHRlciA9IGZvcm1hdCgnLjNzJylcbmNvbnN0IHBlcmNlbnRGb3JtYXR0ZXIgPSBmb3JtYXQoJy4yZicpXG5jb25zdCBjb3VudHJpZXMgPSBbJ2NhbmFkYScsICdjaGluYScsICdldScsICdtZXhpY28nXVxuY29uc3QgY29sb3JzID0gWycjOUVCMDQwJywgJyNGRTUwMDAnLCAnIzBBQTRDRicsICcjRjJBRjE5JywgJyNmZmYnXVxuY29uc3QgbWFyZ2luID0geyB0b3A6IDEwLCByaWdodDogNSwgYm90dG9tOiAxMCwgbGVmdDogNSB9XG5cbmNvbnN0IGNvbnRhaW5lciA9IHNlbGVjdCgnLmNoYXJ0JylcbmNvbnN0IHJvd3MgPSA4XG5jb25zdCBjb2x1bW5zID0gMTFcbmNvbnN0IHBhZGRpbmcgPSAxMlxuY29uc3QgbW9kYWxQYWRkaW5nID0gNDhcblxubGV0IGNoYXJ0LFxuICB3aWR0aCxcbiAgaGVpZ2h0LFxuICBjZWxsU2l6ZSxcbiAgYWN0aXZlU3RhdGUsXG4gIGJvcmRlckNvbG9yU2NhbGUsXG4gIGJvcmRlcldpZHRoU2NhbGUsXG4gIGZpbGxTY2FsZSxcbiAga2V5RmlsdGVyID0gY291bnRyaWVzLFxuICBkaWZmID0gW11cblxuZnVuY3Rpb24gZHJhdyhkYXRhKSB7XG4gIGJvcmRlckNvbG9yU2NhbGUgPSBzY2FsZUxvZygpXG4gICAgLmRvbWFpbihcbiAgICAgIGV4dGVudChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiArZC50b3RhbGRvbGxhcnNcbiAgICAgIH0pXG4gICAgKVxuICAgIC5yYW5nZShbJyNFNUU1RTUnLCAnIzVFNUU1RSddKVxuXG4gIGJvcmRlcldpZHRoU2NhbGUgPSBzY2FsZUxvZygpXG4gICAgLmRvbWFpbihcbiAgICAgIGV4dGVudChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiArZC50b3RhbGRvbGxhcnNcbiAgICAgIH0pXG4gICAgKVxuICAgIC5yYW5nZShbJzEnLCAnNSddKVxuXG4gIGZpbGxTY2FsZSA9IHNjYWxlT3JkaW5hbCgpXG4gICAgLmRvbWFpbihbLi4uY291bnRyaWVzLCAnb3RoZXInXSlcbiAgICAucmFuZ2UoY29sb3JzKVxuXG4gIGZ1bmN0aW9uIGRyYXdQZXJjZW50cygpIHtcbiAgICBmaWxsU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxuICAgICAgLmRvbWFpbihbLi4uY291bnRyaWVzLCAnb3RoZXInXSlcbiAgICAgIC5yYW5nZShcbiAgICAgICAgY29sb3JzLm1hcCgoY29sb3IsIGkpID0+IHtcbiAgICAgICAgICBsZXQgaW5kaWNlcyA9IFtdXG4gICAgICAgICAga2V5RmlsdGVyLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goWy4uLmNvdW50cmllcywgJ290aGVyJ10uaW5kZXhPZihjb3VudHJ5KSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiAhKGluZGljZXMuaW5kZXhPZihpKSA+IC0xKSA/ICcjZmZmJyA6IGNvbG9yXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICBsZXQgZ3JvdXBzID0gc2VsZWN0QWxsKCcuZ3JvdXAnKVxuXG4gICAgZ3JvdXBzLmVhY2goKGcsIGdpLCBub2RlcykgPT4ge1xuICAgICAgbGV0IHBlcmNlbnRPYmogPSB7fVxuXG4gICAgICBjb3VudHJpZXMuZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgcGVyY2VudE9ialtjb3VudHJ5XSA9IEFycmF5KE1hdGgucm91bmQoKGdbY291bnRyeV0gLyAxMDApICogMTAwKSkuZmlsbCh7XG4gICAgICAgICAgc3RhdGU6IGcuY29kZSxcbiAgICAgICAgICBjb3VudHJ5OiBjb3VudHJ5XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBsZXQgcGVyY2VudCA9IFtdXG5cbiAgICAgIGRpZmYgPSBjb3VudHJpZXMuZmlsdGVyKGkgPT4ga2V5RmlsdGVyLmluZGV4T2YoaSkgPCAwKVxuXG4gICAgICBkaWZmLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHBlcmNlbnQgPSBwZXJjZW50LmNvbmNhdChwZXJjZW50T2JqW2NdKVxuICAgICAgfSlcblxuICAgICAga2V5RmlsdGVyLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHBlcmNlbnQgPSBwZXJjZW50LmNvbmNhdChwZXJjZW50T2JqW2NdKVxuICAgICAgfSlcblxuICAgICAgcGVyY2VudCA9IEFycmF5KDEwMCAtIHBlcmNlbnQubGVuZ3RoKVxuICAgICAgICAuZmlsbCh7XG4gICAgICAgICAgc3RhdGU6IGcuY29kZSxcbiAgICAgICAgICBjb3VudHJ5OiAnb3RoZXInXG4gICAgICAgIH0pXG4gICAgICAgIC5jb25jYXQocGVyY2VudClcblxuICAgICAgbGV0IHBhcmVudFggPSBzZWxlY3Qobm9kZXNbZ2ldKS5hdHRyKCd4JylcbiAgICAgIGxldCBwYXJlbnRZID0gc2VsZWN0KG5vZGVzW2dpXSkuYXR0cigneScpXG5cbiAgICAgIGxldCBwZXJjZW50cyA9IHNlbGVjdChub2Rlc1tnaV0pXG4gICAgICAgIC5zZWxlY3RBbGwoYC5wZXJjZW50LiR7Zy5jb2RlfWApXG4gICAgICAgIC5kYXRhKHBlcmNlbnQsIGQgPT4gZClcblxuICAgICAgcGVyY2VudHMuZXhpdCgpLnJlbW92ZSgpXG5cbiAgICAgIHBlcmNlbnRzXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCAoY2VsbFNpemUgLSBwYWRkaW5nIC8gMikgLyAxMClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIChjZWxsU2l6ZSAtIHBhZGRpbmcgLyAyKSAvIDEwKVxuICAgICAgICAuYXR0cignc3Ryb2tlJywgJyNmZmYnKVxuICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgJzAuMjVweCcpXG4gICAgICAgIC5tZXJnZShwZXJjZW50cylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBgcGVyY2VudCAke2cuY29kZX0gJHtkLmNvdW50cnl9YFxuICAgICAgICB9KVxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGRpKSB7XG4gICAgICAgICAgbGV0IHN3aXRjaEluZGV4ID0gcGVyY2VudC5maW5kSW5kZXgoXG4gICAgICAgICAgICBwID0+ICEoWy4uLmRpZmYsICdvdGhlciddLmluZGV4T2YocC5jb3VudHJ5KSA+IC0xKVxuICAgICAgICAgIClcblxuICAgICAgICAgIHN3aXRjaEluZGV4ID0gc3dpdGNoSW5kZXggPj0gMCA/IHN3aXRjaEluZGV4IDogbnVsbFxuXG4gICAgICAgICAgbGV0IHJldmVyc2UgPVxuICAgICAgICAgICAgTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogMTAgPD0gTWF0aC5jZWlsKHN3aXRjaEluZGV4IC8gMTApICogMTBcbiAgICAgICAgICAgICAgPyBNYXRoLmFicyg5OSAtIGRpKVxuICAgICAgICAgICAgICA6IGRpXG5cbiAgICAgICAgICBsZXQgeCA9ICgocmV2ZXJzZSAlIDEwKSAqIChjZWxsU2l6ZSAtIDIpKSAvIDEwICsgcGFyc2VJbnQocGFyZW50WCwgMTApXG4gICAgICAgICAgcmV0dXJuIHggKyAyXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCwgZGkpIHtcbiAgICAgICAgICBsZXQgeSA9XG4gICAgICAgICAgICAoTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogKGNlbGxTaXplIC0gMikpIC8gMTAgK1xuICAgICAgICAgICAgcGFyc2VJbnQocGFyZW50WSwgMTApIC1cbiAgICAgICAgICAgIGNlbGxTaXplIC8gMTAgK1xuICAgICAgICAgICAgMVxuICAgICAgICAgIHJldHVybiB5ICsgMlxuICAgICAgICB9KVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbig2MDApXG4gICAgICAgIC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBmaWxsU2NhbGUoZC5jb3VudHJ5KVxuICAgICAgICB9KVxuXG4gICAgICBsZXQgbGFiZWwgPSBzZWxlY3Qobm9kZXNbZ2ldKS5zZWxlY3RBbGwoYC5sYWJlbC4ke2cuY29kZX1gKVxuXG4gICAgICBsYWJlbC5yZW1vdmUoKVxuXG4gICAgICBsYWJlbCA9IHNlbGVjdChub2Rlc1tnaV0pXG4gICAgICAgIC5zZWxlY3RBbGwoYC5sYWJlbC4ke2cuY29kZX1gKVxuICAgICAgICAuZGF0YShbZ10pXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGFiZWwgJyArIGcuY29kZSlcblxuICAgICAgbGFiZWxcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIChkLmNvbCAtIDEpICogY2VsbFNpemUgKyBjZWxsU2l6ZSAvIDIgKyBwYWRkaW5nICogZC5jb2xcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIChkLnJvdyAtIDEpICogY2VsbFNpemUgKyAoY2VsbFNpemUgLyAyIC0gMykgKyBwYWRkaW5nICogZC5yb3dcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAudGV4dChnLmNvZGUpXG4gICAgfSlcblxuICAgIHNlbGVjdEFsbCgnLmdyb3VwJykub24oJ2NsaWNrJywgaW50ZXJhY3Rpb25zLnN0YXRlcy5jbGljaylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdTdGF0ZSh4LCBkKSB7XG4gICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpLnJlbW92ZSgpXG5cbiAgICBmaWxsU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxuICAgICAgLmRvbWFpbihbLi4uY291bnRyaWVzLCAnb3RoZXInXSlcbiAgICAgIC5yYW5nZShjb2xvcnMpXG5cbiAgICBsZXQgc3RhdGVEYXRhID0gZGF0YS5maWx0ZXIoc3RhdGUgPT4gc3RhdGUuY29kZSA9PT0gZC5jb2RlKVxuICAgIHdpZHRoID0gZHJhd0dyaWRNYXAud2lkdGgoKVxuICAgIGhlaWdodCA9IGRyYXdHcmlkTWFwLndpZHRoKClcbiAgICBsZXQgc3RhdGVTaXplID0gaGVpZ2h0ICogMC4zXG4gICAgbGV0IHN2ZyA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJy5tYXAnKVxuXG4gICAgY29udGFpbmVyLnNlbGVjdEFsbCgnLmdyaWRtYXAnKVxuXG4gICAgc3ZnLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3N0YXRlTW9kYWwnKVxuXG4gICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpXG4gICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgIC5hdHRyKCdmaWxsJywgJyMwMDAnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAnMC4zJylcblxuICAgIHNlbGVjdCgnLnN0YXRlTW9kYWwnKVxuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCAqIDAuNzUpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICogMC40NSlcbiAgICAgIC5hdHRyKCd4Jywgd2lkdGggLyA3LjUpXG4gICAgICAuYXR0cigneScsIHdpZHRoIC8gNy41KVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnI2ZmZicpXG4gICAgICAuYXR0cignc3Ryb2tlJywgJyMwMDAnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsICcxLjVweCcpXG4gICAgICAuYXR0cigncGFpbnQtb3JkZXInLCAnc3Ryb2tlJylcblxuICAgIHNlbGVjdCgnLnN0YXRlTW9kYWwnKVxuICAgICAgLmFwcGVuZCgnZm9yZWlnbk9iamVjdCcpXG4gICAgICAuYXR0cignY3Vyc29yJywgJ3BvaW50ZXInKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLyAxMClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgLyAyMClcbiAgICAgIC5hdHRyKCd4Jywgd2lkdGggLSB3aWR0aCAvIDcuNSAtIHBhZGRpbmcgKiAyKVxuICAgICAgLmF0dHIoJ3knLCB3aWR0aCAvIDcuNSArIHBhZGRpbmcpXG4gICAgICAuYXBwZW5kKCd4aHRtbDpkaXYnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ljb24tY2xvc2UtbGcnKVxuICAgICAgLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpLnJlbW92ZSgpXG4gICAgICB9KVxuXG4gICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpXG4gICAgICAuc2VsZWN0QWxsKCcuc3RhdGVCb3JkZXInKVxuICAgICAgLmRhdGEoc3RhdGVEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N0YXRlQm9yZGVyJylcbiAgICAgIC5hdHRyKCdmaWxsJywgJyNmZmYnKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGJvcmRlckNvbG9yU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGJvcmRlcldpZHRoU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3gnLCB3aWR0aCAvIDUpXG4gICAgICAuYXR0cigneScsIHdpZHRoIC8gNSArIHBhZGRpbmcpXG4gICAgICAuYXR0cignd2lkdGgnLCBzdGF0ZVNpemUgLSAzKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHN0YXRlU2l6ZSAtIDIpXG5cbiAgICBsZXQgcGVyY2VudE9iaiA9IHt9XG4gICAgY291bnRyaWVzLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICBwZXJjZW50T2JqW2NvdW50cnldID0gQXJyYXkoXG4gICAgICAgIE1hdGgucm91bmQoKHN0YXRlRGF0YVswXVtjb3VudHJ5XSAvIDEwMCkgKiAxMDApXG4gICAgICApLmZpbGwoe1xuICAgICAgICBzdGF0ZTogc3RhdGVEYXRhWzBdLmNvZGUsXG4gICAgICAgIGNvdW50cnk6IGNvdW50cnlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBwZXJjZW50ID0gW11cblxuICAgIGRpZmYgPSBjb3VudHJpZXMuZmlsdGVyKGkgPT4ga2V5RmlsdGVyLmluZGV4T2YoaSkgPCAwKVxuXG4gICAgZGlmZi5mb3JFYWNoKGMgPT4ge1xuICAgICAgcGVyY2VudCA9IHBlcmNlbnQuY29uY2F0KHBlcmNlbnRPYmpbY10pXG4gICAgfSlcblxuICAgIGtleUZpbHRlci5mb3JFYWNoKGMgPT4ge1xuICAgICAgcGVyY2VudCA9IHBlcmNlbnQuY29uY2F0KHBlcmNlbnRPYmpbY10pXG4gICAgfSlcblxuICAgIHBlcmNlbnQgPSBBcnJheSgxMDAgLSBwZXJjZW50Lmxlbmd0aClcbiAgICAgIC5maWxsKHtcbiAgICAgICAgc3RhdGU6IHN0YXRlRGF0YVswXS5jb2RlLFxuICAgICAgICBjb3VudHJ5OiAnb3RoZXInXG4gICAgICB9KVxuICAgICAgLmNvbmNhdChwZXJjZW50KVxuXG4gICAgbGV0IHBhcmVudFggPSBzZWxlY3QoJy5zdGF0ZUJvcmRlcicpLmF0dHIoJ3gnKVxuICAgIGxldCBwYXJlbnRZID0gc2VsZWN0KCcuc3RhdGVCb3JkZXInKS5hdHRyKCd5JylcblxuICAgIGxldCBwZXJjZW50cyA9IHNlbGVjdCgnLnN0YXRlTW9kYWwnKVxuICAgICAgLnNlbGVjdEFsbChgLnBlcmNlbnRNb2RhbC4ke3N0YXRlRGF0YVswXS5jb2RlfWApXG4gICAgICAuZGF0YShwZXJjZW50LCBkID0+IGQpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBgcGVyY2VudCAke3N0YXRlRGF0YVswXS5jb2RlfSAke2QuY291bnRyeX1gXG4gICAgICB9KVxuXG4gICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGZpbGxTY2FsZShkLmNvdW50cnkpXG4gICAgICB9KVxuXG4gICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGRpKSB7XG4gICAgICAgIGxldCBzd2l0Y2hJbmRleCA9IHBlcmNlbnQuZmluZEluZGV4KFxuICAgICAgICAgIHAgPT4gIShbLi4uZGlmZiwgJ290aGVyJ10uaW5kZXhPZihwLmNvdW50cnkpID4gLTEpXG4gICAgICAgIClcblxuICAgICAgICBzd2l0Y2hJbmRleCA9IHN3aXRjaEluZGV4ID49IDAgPyBzd2l0Y2hJbmRleCA6IG51bGxcblxuICAgICAgICBsZXQgcmV2ZXJzZSA9XG4gICAgICAgICAgTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogMTAgPD0gTWF0aC5jZWlsKHN3aXRjaEluZGV4IC8gMTApICogMTBcbiAgICAgICAgICAgID8gTWF0aC5hYnMoOTkgLSBkaSlcbiAgICAgICAgICAgIDogZGlcblxuICAgICAgICBsZXQgeCA9ICgocmV2ZXJzZSAlIDEwKSAqIChzdGF0ZVNpemUgLSAyKSkgLyAxMCArIHBhcnNlSW50KHBhcmVudFgsIDEwKVxuICAgICAgICByZXR1cm4geCArIDJcbiAgICAgIH0pXG4gICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQsIGRpKSB7XG4gICAgICAgIGxldCB5ID1cbiAgICAgICAgICAoTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogKHN0YXRlU2l6ZSAtIDIpKSAvIDEwICtcbiAgICAgICAgICBwYXJzZUludChwYXJlbnRZLCAxMCkgLVxuICAgICAgICAgIHN0YXRlU2l6ZSAvIDEwICtcbiAgICAgICAgICAxXG4gICAgICAgIHJldHVybiB5ICsgMlxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAwKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgKHN0YXRlU2l6ZSAtIG1vZGFsUGFkZGluZykgLyAxMClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAoc3RhdGVTaXplIC0gbW9kYWxQYWRkaW5nKSAvIDEwKVxuXG4gICAgbGV0IGNvbHVtbjIgPSBwYXJzZUludChwYXJlbnRYLCAxMCkgKyBzdGF0ZVNpemUgKyBwYWRkaW5nXG5cbiAgICBzZWxlY3QoJy5zdGF0ZU1vZGFsJylcbiAgICAgIC5hcHBlbmQoJ2ZvcmVpZ25PYmplY3QnKVxuICAgICAgLmF0dHIoJ3gnLCBjb2x1bW4yKVxuICAgICAgLmF0dHIoJ3knLCBwYXJzZUludChwYXJlbnRZLCAxMCkgLSBwYWRkaW5nKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLSBzdGF0ZVNpemUpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgLmFwcGVuZCgneGh0bWw6ZGl2JykuaHRtbChgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAke2Quc3RhdGV9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICQke2RvbGxhckZvcm1hdHRlcihkLnRvdGFsZG9sbGFycykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgIC9HLyxcbiAgICAgICAgICAgICAgICAgICdCJ1xuICAgICAgICAgICAgICAgICl9IFRvdGFsIFRyYWRlICgyMDE3KVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibW9kYWwtbGlzdFwiPlxuICAgICAgICAgICAgICAke2NvdW50cmllc1xuICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICBjID0+XG4gICAgICAgICAgICAgICAgICAgIGA8bGkgY2xhc3M9XCIke2N9XCI+JHtjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAgICAgICBjLnNsaWNlKDEpfTogJHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0ZURhdGFbMF1bY10gPyBwZXJjZW50Rm9ybWF0dGVyKHN0YXRlRGF0YVswXVtjXSkgOiAwXG4gICAgICAgICAgICAgICAgICAgIH0lPC9saT4gYFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuam9pbignJyl9XG5cbiAgICAgICAgICAgICAgPC91bD4gPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgJHtwZXJjZW50Rm9ybWF0dGVyKGQuZ3JhbmR0b3RhbCl9JSBvZiBUb3RhbCAoMjAxNylcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0dyaWRNYXAoKSB7XG4gICAgd2lkdGggPSBkcmF3R3JpZE1hcC53aWR0aCgpXG4gICAgaGVpZ2h0ID0gZHJhd0dyaWRNYXAud2lkdGgoKSAqIDAuOFxuICAgIC8vIGNhbGN1bGF0ZSBjZWxsU2l6ZSBiYXNlZCBvbiBkaW1lbnNpb25zIG9mIHN2Z1xuICAgIGNlbGxTaXplID0gY2FsY0NlbGxTaXplKFxuICAgICAgd2lkdGggLSBjb2x1bW5zICogcGFkZGluZyAtIG1hcmdpbi5yaWdodCAtIG1hcmdpbi5sZWZ0LFxuICAgICAgaGVpZ2h0IC0gY29sdW1ucyAqIHBhZGRpbmcgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgIGNvbHVtbnMsXG4gICAgICByb3dzXG4gICAgKVxuXG4gICAgLy8gZ2VuZXJhdGUgZ3JpZCBkYXRhIHdpdGggc3BlY2lmaWVkIG51bWJlciBvZiBjb2x1bW5zIGFuZCByb3dzXG4gICAgbGV0IGdyaWREYXRhID0gZ3JpZEdyYXBoKGNvbHVtbnMsIHJvd3MsIGNlbGxTaXplKVxuXG4gICAgbGV0IHN2Z05vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1hcCcpLmxlbmd0aFxuICAgIGxldCBzdmcgPSBzdmdOb2Rlc1xuICAgICAgPyBjb250YWluZXIuc2VsZWN0QWxsKCcubWFwJylcbiAgICAgIDogc2VsZWN0KCcuY2hhcnQnKS5hcHBlbmQoJ3N2ZycpXG5cbiAgICBzdmdcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXR0cignY2xhc3MnLCAnbWFwJylcbiAgICAgIC5hdHRyKFxuICAgICAgICAndmlld0JveCcsXG4gICAgICAgICcwIDAgJyArXG4gICAgICAgICAgKHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpICtcbiAgICAgICAgICAnICcgK1xuICAgICAgICAgIChoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIClcblxuICAgIHNlbGVjdEFsbCgnaW5wdXQnKS5vbignY2xpY2snLCBpbnRlcmFjdGlvbnMua2V5LmNsaWNrKVxuXG4gICAgbGV0IGdyaWRNYXBOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkbWFwJykubGVuZ3RoXG4gICAgbGV0IGdyaWRNYXAgPSBncmlkTWFwTm9kZXNcbiAgICAgID8gY29udGFpbmVyLnNlbGVjdEFsbCgnLmdyaWRtYXAnKVxuICAgICAgOiBzdmcuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnZ3JpZG1hcCcpXG4gICAgLy8gLmF0dHIoXG4gICAgLy8gICAndHJhbnNmb3JtJyxcbiAgICAvLyAgICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywnICsgbWFyZ2luLnRvcCArICcpJ1xuICAgIC8vIClcblxuICAgIGxldCBncm91cE5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyb3VwJykubGVuZ3RoXG4gICAgbGV0IGdyb3VwcyA9IGdyb3VwTm9kZXNcbiAgICAgID8gZ3JpZE1hcC5zZWxlY3RBbGwoJy5ncm91cCcpXG4gICAgICA6IGdyaWRNYXBcbiAgICAgICAgICAuc2VsZWN0QWxsKCcuZ3JvdXAnKVxuICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2dyb3VwICcgKyBkLmNvZGVcbiAgICAgICAgICB9KVxuXG4gICAgZ3JvdXBzXG4gICAgICAuZGF0YShkYXRhKVxuICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAoZC5jb2wgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQuY29sXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAoZC5yb3cgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQucm93XG4gICAgICB9KVxuXG4gICAgbGV0IGJyZWFrcG9pbnQgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoXG4gICAgICAnLS1icmVha3BvaW50J1xuICAgIClcblxuICAgIGlmIChicmVha3BvaW50ICE9PSAnXCJ4c21hbGxcIicpIHtcbiAgICAgIGdyaWRNYXBcbiAgICAgICAgLnNlbGVjdEFsbCgnLmdyb3VwJylcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBpbnRlcmFjdGlvbnMuc3RhdGVzLm1vdXNlb3ZlcilcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgaW50ZXJhY3Rpb25zLnN0YXRlcy5tb3VzZWxlYXZlKVxuICAgIH1cblxuICAgIGdyb3Vwcy5lYWNoKChnLCBnaSwgbm9kZXMpID0+IHtcbiAgICAgIGxldCBzdGF0ZU5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc3RhdGUuJHtnLmNvZGV9YClcbiAgICAgIGxldCBzdGF0ZSA9IHN0YXRlTm9kZVxuICAgICAgICA/IHNlbGVjdChub2Rlc1tnaV0pLnNlbGVjdEFsbChgLnN0YXRlLiR7Zy5jb2RlfWApXG4gICAgICAgIDogc2VsZWN0KG5vZGVzW2dpXSlcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5zdGF0ZScpXG4gICAgICAgICAgICAuZGF0YShbZ10pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnc3RhdGUgJyArIGQuY29kZVxuICAgICAgICAgICAgfSlcblxuICAgICAgc3RhdGVcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnI2ZmZicpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGJvcmRlckNvbG9yU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGJvcmRlcldpZHRoU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiAoZC5jb2wgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQuY29sXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiAoZC5yb3cgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQucm93XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGNlbGxTaXplICsgMilcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGNlbGxTaXplICsgMilcbiAgICB9KVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBuZXN0ZWQgYXJyYXkgZm9yIHNxdWFyZSBncmlkXG4gIGZ1bmN0aW9uIGdyaWRHcmFwaChuY29sLCBucm93LCBjZWxsc2l6ZSkge1xuICAgIGxldCBncmlkRGF0YSA9IFtdXG4gICAgbGV0IHhwb3MgPSAxIC8vIHN0YXJ0aW5nIHhwb3MgYW5kIHlwb3MgYXQgMSBzbyB0aGUgc3Ryb2tlIHdpbGwgc2hvdyB3aGVuIHdlIG1ha2UgdGhlIGdyaWQgYmVsb3dcbiAgICBsZXQgeXBvcyA9IDFcblxuICAgIC8vIGNhbGN1bGF0ZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjZWxsIGJhc2VkIG9uIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICAgIGxldCBjZWxsU2l6ZSA9IGNlbGxzaXplXG5cbiAgICAvLyBpdGVyYXRlIGZvciByb3dzXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbnJvdzsgcm93KyspIHtcbiAgICAgIGdyaWREYXRhLnB1c2goW10pXG5cbiAgICAgIC8vIGl0ZXJhdGUgZm9yIGNlbGxzL2NvbHVtbnMgaW5zaWRlIGVhY2ggcm93XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBuY29sOyBjb2wrKykge1xuICAgICAgICBncmlkRGF0YVtyb3ddLnB1c2goe1xuICAgICAgICAgIHg6IHhwb3MsXG4gICAgICAgICAgeTogeXBvcyxcbiAgICAgICAgICB3aWR0aDogY2VsbFNpemUsXG4gICAgICAgICAgaGVpZ2h0OiBjZWxsU2l6ZVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGluY3JlbWVudCB4IHBvc2l0aW9uIChtb3Zpbmcgb3ZlciBieSA1MClcbiAgICAgICAgeHBvcyArPSBjZWxsU2l6ZVxuICAgICAgfVxuXG4gICAgICAvLyByZXNldCB4IHBvc2l0aW9uIGFmdGVyIGEgcm93IGlzIGNvbXBsZXRlXG4gICAgICB4cG9zID0gMVxuICAgICAgLy8gaW5jcmVtZW50IHkgcG9zaXRpb24gKG1vdmluZyBkb3duIGJ5IDUwKVxuICAgICAgeXBvcyArPSBjZWxsU2l6ZVxuICAgIH1cbiAgICByZXR1cm4gZ3JpZERhdGFcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBncmlkIGNlbGwgc2l6ZSBiYXNlZCBvbiB3aWR0aCBhbmQgaGVpZ2h0IG9mIHN2Z1xuICBmdW5jdGlvbiBjYWxjQ2VsbFNpemUodywgaCwgbmNvbCwgbnJvdykge1xuICAgIC8vIGxlYXZlIHRpbnkgc3BhY2UgaW4gbWFyZ2luc1xuICAgIGxldCBncmlkV2lkdGggPSB3IC0gMlxuICAgIGxldCBncmlkSGVpZ2h0ID0gaCAtIDJcbiAgICBsZXQgY2VsbFNpemVcblxuICAgIC8vIGNhbGN1bGF0ZSBzaXplIG9mIGNlbGxzIGluIGNvbHVtbnMgYWNyb3NzXG4gICAgbGV0IGNvbFdpZHRoID0gTWF0aC5mbG9vcihncmlkV2lkdGggLyBuY29sKVxuICAgIC8vIGNhbGN1bGF0ZSBzaXplIG9mIGNlbGxzIGluIHJvd3MgZG93blxuICAgIGxldCByb3dXaWR0aCA9IE1hdGguZmxvb3IoZ3JpZEhlaWdodCAvIG5yb3cpXG5cbiAgICAvLyB0YWtlIHRoZSBzbWFsbGVyIG9mIHRoZSBjYWxjdWxhdGVkIGNlbGwgc2l6ZXNcbiAgICBpZiAoY29sV2lkdGggPD0gcm93V2lkdGgpIHtcbiAgICAgIGNlbGxTaXplID0gY29sV2lkdGhcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbFNpemUgPSByb3dXaWR0aFxuICAgIH1cbiAgICByZXR1cm4gY2VsbFNpemVcbiAgfVxuXG4gIGRyYXdHcmlkTWFwLndpZHRoID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGlmICghYXJncy5sZW5ndGgpIHJldHVybiB3aWR0aFxuICAgIHdpZHRoID0gYXJnc1swXSAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0XG4gIH1cblxuICBkcmF3R3JpZE1hcC5oZWlnaHQgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgaWYgKCFhcmdzLmxlbmd0aCkgcmV0dXJuIGhlaWdodFxuICAgIGhlaWdodCA9IGFyZ3NbMF0gLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbVxuICB9XG5cbiAgY29uc3QgaW50ZXJhY3Rpb25zID0ge1xuICAgIGtleToge1xuICAgICAgY2xpY2soZCkge1xuICAgICAgICBzZWxlY3QoJy5zdGF0ZU1vZGFsJykucmVtb3ZlKClcbiAgICAgICAgbGV0IGV4Y2x1ZGVkID0gWydsZWdlbmQtbGFiZWwnLCAnYWN0aXZlJywgJ290aGVyJywgJ2FsbCddXG5cbiAgICAgICAgbGV0IGNsYXNzTGlzdCA9IHRoaXMuY2xhc3NMaXN0XG5cbiAgICAgICAgbGV0IGlzQWxsID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdhbGwnKVxuICAgICAgICBsZXQgaXNBY3RpdmUgPSB0aGlzLmNoZWNrZWRcbiAgICAgICAgbGV0IGlzQWxsU2VsZWN0ZWQgPSBzZWxlY3QoJ2lucHV0LmFsbCcpLm5vZGUoKS5jaGVja2VkXG4gICAgICAgIGxldCBjb3VudHJ5ID0gWy4uLmNsYXNzTGlzdF0uZmluZChjID0+ICEoZXhjbHVkZWQuaW5kZXhPZihjKSA+IC0xKSlcbiAgICAgICAgbGV0IGFsbCA9IHNlbGVjdCgnaW5wdXQuYWxsJykubm9kZSgpXG5cbiAgICAgICAgaWYgKGNvdW50cnkgJiYga2V5RmlsdGVyLmluZGV4T2YoY291bnRyeSkgPiAtMSkge1xuICAgICAgICAgIGtleUZpbHRlciA9IGtleUZpbHRlci5maWx0ZXIoYyA9PiBjICE9PSBjb3VudHJ5KVxuICAgICAgICAgIGFsbC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmIChjb3VudHJ5KSB7XG4gICAgICAgICAga2V5RmlsdGVyLnVuc2hpZnQoY291bnRyeSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlGaWx0ZXIubGVuZ3RoICE9PSA0KSB7XG4gICAgICAgICAgYWxsLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdCgnaW5wdXQuYWxsJykubm9kZSgpLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBbGwgJiYgaXNBY3RpdmUpIHtcbiAgICAgICAgICBrZXlGaWx0ZXIgPSBjb3VudHJpZXNcbiAgICAgICAgICBzZWxlY3RBbGwoJ2lucHV0JykuZWFjaCgoZywgZ2ksIG5vZGVzKSA9PiB7XG4gICAgICAgICAgICBub2Rlc1tnaV0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGlzQWxsICYmICFpc0FjdGl2ZSkge1xuICAgICAgICAgIGtleUZpbHRlciA9IFtdXG4gICAgICAgICAgc2VsZWN0QWxsKCdpbnB1dCcpLmVhY2goKGcsIGdpLCBub2RlcykgPT4ge1xuICAgICAgICAgICAgbm9kZXNbZ2ldLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmNhbGwoY2hhcnQuZHJhd1BlcmNlbnRzKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0ZXM6IHtcbiAgICAgIC8vIHVzZSBwb2ludGVyIGV2ZW50cyBpZiB5b3UgY2FuOyBtb3VzZSogYWxzbyB3b3Jrc1xuICAgICAgbW91c2VvdmVyKGV2ZW50LCBkKSB7XG4gICAgICAgIGludGVyYWN0aW9ucy5zdGF0ZXMuc2hvd1Rvb2x0aXAoZXZlbnQsIGQpXG4gICAgICB9LFxuICAgICAgbW91c2Vtb3ZlKGV2ZW50LCBkKSB7XG4gICAgICAgIC8vIG9wdGlvbmFsIGJ1dCBuaWNlIGZvciB0cmFja2luZ1xuICAgICAgICBpbnRlcmFjdGlvbnMuc3RhdGVzLnNob3dUb29sdGlwKGV2ZW50LCBkKVxuICAgICAgfSxcbiAgICAgIG1vdXNlbGVhdmUoZXZlbnQsIGQpIHtcbiAgICAgICAgdG9vbHRpcC5oaWRlKClcbiAgICAgIH0sXG4gICAgICBjbGljayhldmVudCwgZCkge1xuICAgICAgICB0b29sdGlwLmhpZGUoKVxuICAgICAgICBhY3RpdmVTdGF0ZSA9IGRcbiAgICAgICAgY29udGFpbmVyLmNhbGwoY2hhcnQuZHJhd1N0YXRlLCBkKVxuICAgICAgfSxcbiAgICAgIHNob3dUb29sdGlwKGV2ZW50LCBkKSB7XG4gICAgICAgIGNvbnN0IHRvb2x0aXBDb250ZW50ID0gYFxuICAgICAgICAgIDxwIGNsYXNzPVwidG9vbHRpcC1oZWFkaW5nXCI+JHtkLnN0YXRlfTwvcD5cbiAgICAgICAgICA8cCBjbGFzcz1cInRvb2x0aXAtYm9keVwiPlxuICAgICAgICAgICAgJCR7ZG9sbGFyRm9ybWF0dGVyKGQudG90YWxkb2xsYXJzKS5yZXBsYWNlKFxuICAgICAgICAgICAgICAvRy8sXG4gICAgICAgICAgICAgICdCJ1xuICAgICAgICAgICAgKX0gVG90YWwgVHJhZGUgKDIwMTcpXG4gICAgICAgICAgPC9wPlxuICAgICAgICAgIDx1bCBjbGFzcz1cInRvb2x0aXAtbGlzdFwiPlxuICAgICAgICAgICAgJHtjb3VudHJpZXNcbiAgICAgICAgICAgICAgLm1hcChcbiAgICAgICAgICAgICAgICBjID0+XG4gICAgICAgICAgICAgICAgICBgPGxpIGNsYXNzPVwiJHtjfVwiPiR7Yy5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArXG4gICAgICAgICAgICAgICAgICAgIGMuc2xpY2UoMSl9OiAke2RbY10gPyBwZXJjZW50Rm9ybWF0dGVyKGRbY10pIDogMH0lPC9saT5gXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgLmpvaW4oJycpfVxuICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgPHAgY2xhc3M9XCJ0b29sdGlwLWZvb3RlclwiPiR7cGVyY2VudEZvcm1hdHRlcihcbiAgICAgICAgICAgIGQuZ3JhbmR0b3RhbFxuICAgICAgICAgICl9JSBvZiBUb3RhbCAoMjAxNyk8L3A+XG4gICAgICAgIGBcbiAgICAgICAgLy8gcGFzcyB0aGUgZXZlbnQgdGhyb3VnaCB0byB0aGUgbmV3IHRvb2x0aXAuanNcbiAgICAgICAgdG9vbHRpcC5zaG93KHRvb2x0aXBDb250ZW50LCBldmVudClcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4geyBkcmF3R3JpZE1hcCwgZHJhd1BlcmNlbnRzLCBkcmF3U3RhdGUsIGludGVyYWN0aW9ucyB9XG59XG5cbmZ1bmN0aW9uIGluaXQoZGF0YSkge1xuICBjb250YWluZXIuZGF0dW0oZGF0YSlcbiAgY2hhcnQgPSBkcmF3KGRhdGEpXG4gIHJlc2l6ZSgpXG59XG5cbmZ1bmN0aW9uIHJlc2l6ZSgpIHtcbiAgaWYgKGNoYXJ0KSB7XG4gICAgY29uc3QgcGFyZW50V2lkdGggPSBjb250YWluZXIubm9kZSgpLm9mZnNldFdpZHRoXG4gICAgY2hhcnQuZHJhd0dyaWRNYXAud2lkdGgocGFyZW50V2lkdGgpXG4gICAgY2hhcnQuZHJhd0dyaWRNYXAuaGVpZ2h0KHBhcmVudFdpZHRoKSAqIDAuOVxuICAgIGNvbnRhaW5lci5jYWxsKGNoYXJ0LmRyYXdHcmlkTWFwKVxuICAgIGNvbnRhaW5lci5jYWxsKGNoYXJ0LmRyYXdQZXJjZW50cylcblxuICAgIGlmIChzZWxlY3QoJy5zdGF0ZU1vZGFsJykuc2l6ZSgpKSB7XG4gICAgICBzZWxlY3QoJy5zdGF0ZU1vZGFsJykucmVtb3ZlKClcbiAgICAgIGNoYXJ0LmludGVyYWN0aW9ucy5zdGF0ZXMuY2xpY2soYWN0aXZlU3RhdGUpXG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgaW5pdCwgZHJhdywgcmVzaXplIH1cbiIsImltcG9ydCAnLi9zY3NzL21haW4uc2NzcydcbmltcG9ydCB7IGV4dGVudCB9IGZyb20gJ2QzLWFycmF5J1xuaW1wb3J0IHsgZm9ybWF0IH0gZnJvbSAnZDMtZm9ybWF0J1xuaW1wb3J0ICogYXMgZDNGZXRjaCBmcm9tICdkMy1mZXRjaCdcblxuaW1wb3J0IGNoYXJ0IGZyb20gJy4vanMvY2hhcnQnXG5jb25zdCBkYXRhU3JjID0gJy4vZGF0YS9kYXRhLmNzdidcblxubGV0IGRhdGFcblxuZnVuY3Rpb24gbG9hZERhdGEoKSB7XG4gIGNvbnN0IGRhdGFQcm9taXNlID0gZDNGZXRjaC5jc3YoZGF0YVNyYylcbiAgbGV0IHJlc3VsdCA9IFByb21pc2UuYWxsKFtkYXRhUHJvbWlzZV0pXG4gICAgLnRoZW4ocmVzID0+IHtcbiAgICAgIGNvbnN0IFtkYXRhUmVzcG9uc2VdID0gcmVzXG5cbiAgICAgIGRhdGEgPSBkYXRhUmVzcG9uc2VcbiAgICAgIHJldHVyblxuICAgIH0pXG4gICAgLnRoZW4oKCkgPT4ge1xuICAgICAgbGV0IG1pbk1heCA9IGV4dGVudChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiArZC50b3RhbGRvbGxhcnNcbiAgICAgIH0pXG5cbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5taW4nKS5pbm5lckhUTUwgPVxuICAgICAgICAnJCcgKyBmb3JtYXQoJywuMGYnKShtaW5NYXhbMF0pLnJlcGxhY2UoL0cvLCAnQicpXG4gICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWF4JykuaW5uZXJIVE1MID1cbiAgICAgICAgJyQnICsgZm9ybWF0KCcsLjBmJykobWluTWF4WzFdKS5yZXBsYWNlKC9HLywgJ0InKVxuICAgICAgY2hhcnQuaW5pdChkYXRhKVxuICAgIH0pXG59XG5cbmxvYWREYXRhKClcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBjaGFydC5yZXNpemUpXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0aWYgKGNhY2hlZE1vZHVsZS5lcnJvciAhPT0gdW5kZWZpbmVkKSB0aHJvdyBjYWNoZWRNb2R1bGUuZXJyb3I7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdHRyeSB7XG5cdFx0dmFyIGV4ZWNPcHRpb25zID0geyBpZDogbW9kdWxlSWQsIG1vZHVsZTogbW9kdWxlLCBmYWN0b3J5OiBfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXSwgcmVxdWlyZTogX193ZWJwYWNrX3JlcXVpcmVfXyB9O1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uaS5mb3JFYWNoKGZ1bmN0aW9uKGhhbmRsZXIpIHsgaGFuZGxlcihleGVjT3B0aW9ucyk7IH0pO1xuXHRcdG1vZHVsZSA9IGV4ZWNPcHRpb25zLm1vZHVsZTtcblx0XHRleGVjT3B0aW9ucy5mYWN0b3J5LmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIGV4ZWNPcHRpb25zLnJlcXVpcmUpO1xuXHR9IGNhdGNoKGUpIHtcblx0XHRtb2R1bGUuZXJyb3IgPSBlO1xuXHRcdHRocm93IGU7XG5cdH1cblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuX193ZWJwYWNrX3JlcXVpcmVfXy5jID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fO1xuXG4vLyBleHBvc2UgdGhlIG1vZHVsZSBleGVjdXRpb24gaW50ZXJjZXB0b3Jcbl9fd2VicGFja19yZXF1aXJlX18uaSA9IFtdO1xuXG4iLCIvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5uID0gKG1vZHVsZSkgPT4ge1xuXHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cblx0XHQoKSA9PiAobW9kdWxlWydkZWZhdWx0J10pIDpcblx0XHQoKSA9PiAobW9kdWxlKTtcblx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgeyBhOiBnZXR0ZXIgfSk7XG5cdHJldHVybiBnZXR0ZXI7XG59OyIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFsbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18uaHUgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIFwiXCIgKyBjaHVua0lkICsgXCIuXCIgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmgoKSArIFwiLmhvdC11cGRhdGUuanNcIjtcbn07IiwiLy8gVGhpcyBmdW5jdGlvbiBhbGxvdyB0byByZWZlcmVuY2UgYWxsIGNodW5rc1xuX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRiA9IChjaHVua0lkKSA9PiB7XG5cdC8vIHJldHVybiB1cmwgZm9yIGZpbGVuYW1lcyBiYXNlZCBvbiB0ZW1wbGF0ZVxuXHRyZXR1cm4gdW5kZWZpbmVkO1xufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYgPSAoKSA9PiAoXCJtYWluLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzb25cIik7IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5oID0gKCkgPT4gKFwiZGI0Y2UxNmM5N2U4ODhhMTAwMTBcIikiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCJ2YXIgaW5Qcm9ncmVzcyA9IHt9O1xudmFyIGRhdGFXZWJwYWNrUHJlZml4ID0gXCJ0YXJpZmYtaW1wYWN0LXN0YXRlczpcIjtcbi8vIGxvYWRTY3JpcHQgZnVuY3Rpb24gdG8gbG9hZCBhIHNjcmlwdCB2aWEgc2NyaXB0IHRhZ1xuX193ZWJwYWNrX3JlcXVpcmVfXy5sID0gKHVybCwgZG9uZSwga2V5LCBjaHVua0lkKSA9PiB7XG5cdGlmKGluUHJvZ3Jlc3NbdXJsXSkgeyBpblByb2dyZXNzW3VybF0ucHVzaChkb25lKTsgcmV0dXJuOyB9XG5cdHZhciBzY3JpcHQsIG5lZWRBdHRhY2g7XG5cdGlmKGtleSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgc2NyaXB0cy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIHMgPSBzY3JpcHRzW2ldO1xuXHRcdFx0aWYocy5nZXRBdHRyaWJ1dGUoXCJzcmNcIikgPT0gdXJsIHx8IHMuZ2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIpID09IGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KSB7IHNjcmlwdCA9IHM7IGJyZWFrOyB9XG5cdFx0fVxuXHR9XG5cdGlmKCFzY3JpcHQpIHtcblx0XHRuZWVkQXR0YWNoID0gdHJ1ZTtcblx0XHRzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdzY3JpcHQnKTtcblxuXHRcdHNjcmlwdC5jaGFyc2V0ID0gJ3V0Zi04Jztcblx0XHRzY3JpcHQudGltZW91dCA9IDEyMDtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIF9fd2VicGFja19yZXF1aXJlX18ubmMpO1xuXHRcdH1cblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiZGF0YS13ZWJwYWNrXCIsIGRhdGFXZWJwYWNrUHJlZml4ICsga2V5KTtcblxuXHRcdHNjcmlwdC5zcmMgPSB1cmw7XG5cdH1cblx0aW5Qcm9ncmVzc1t1cmxdID0gW2RvbmVdO1xuXHR2YXIgb25TY3JpcHRDb21wbGV0ZSA9IChwcmV2LCBldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcyBpbiBJRS5cblx0XHRzY3JpcHQub25lcnJvciA9IHNjcmlwdC5vbmxvYWQgPSBudWxsO1xuXHRcdGNsZWFyVGltZW91dCh0aW1lb3V0KTtcblx0XHR2YXIgZG9uZUZucyA9IGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRkZWxldGUgaW5Qcm9ncmVzc1t1cmxdO1xuXHRcdHNjcmlwdC5wYXJlbnROb2RlICYmIHNjcmlwdC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHNjcmlwdCk7XG5cdFx0ZG9uZUZucyAmJiBkb25lRm5zLmZvckVhY2goKGZuKSA9PiAoZm4oZXZlbnQpKSk7XG5cdFx0aWYocHJldikgcmV0dXJuIHByZXYoZXZlbnQpO1xuXHR9XG5cdHZhciB0aW1lb3V0ID0gc2V0VGltZW91dChvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgdW5kZWZpbmVkLCB7IHR5cGU6ICd0aW1lb3V0JywgdGFyZ2V0OiBzY3JpcHQgfSksIDEyMDAwMCk7XG5cdHNjcmlwdC5vbmVycm9yID0gb25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHNjcmlwdC5vbmVycm9yKTtcblx0c2NyaXB0Lm9ubG9hZCA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25sb2FkKTtcblx0bmVlZEF0dGFjaCAmJiBkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7XG59OyIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsInZhciBjdXJyZW50TW9kdWxlRGF0YSA9IHt9O1xudmFyIGluc3RhbGxlZE1vZHVsZXMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmM7XG5cbi8vIG1vZHVsZSBhbmQgcmVxdWlyZSBjcmVhdGlvblxudmFyIGN1cnJlbnRDaGlsZE1vZHVsZTtcbnZhciBjdXJyZW50UGFyZW50cyA9IFtdO1xuXG4vLyBzdGF0dXNcbnZhciByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMgPSBbXTtcbnZhciBjdXJyZW50U3RhdHVzID0gXCJpZGxlXCI7XG5cbi8vIHdoaWxlIGRvd25sb2FkaW5nXG52YXIgYmxvY2tpbmdQcm9taXNlcyA9IDA7XG52YXIgYmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblxuLy8gVGhlIHVwZGF0ZSBpbmZvXG52YXIgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnM7XG52YXIgcXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckQgPSBjdXJyZW50TW9kdWxlRGF0YTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5pLnB1c2goZnVuY3Rpb24gKG9wdGlvbnMpIHtcblx0dmFyIG1vZHVsZSA9IG9wdGlvbnMubW9kdWxlO1xuXHR2YXIgcmVxdWlyZSA9IGNyZWF0ZVJlcXVpcmUob3B0aW9ucy5yZXF1aXJlLCBvcHRpb25zLmlkKTtcblx0bW9kdWxlLmhvdCA9IGNyZWF0ZU1vZHVsZUhvdE9iamVjdChvcHRpb25zLmlkLCBtb2R1bGUpO1xuXHRtb2R1bGUucGFyZW50cyA9IGN1cnJlbnRQYXJlbnRzO1xuXHRtb2R1bGUuY2hpbGRyZW4gPSBbXTtcblx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0b3B0aW9ucy5yZXF1aXJlID0gcmVxdWlyZTtcbn0pO1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMgPSB7fTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1ySSA9IHt9O1xuXG5mdW5jdGlvbiBjcmVhdGVSZXF1aXJlKHJlcXVpcmUsIG1vZHVsZUlkKSB7XG5cdHZhciBtZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdO1xuXHRpZiAoIW1lKSByZXR1cm4gcmVxdWlyZTtcblx0dmFyIGZuID0gZnVuY3Rpb24gKHJlcXVlc3QpIHtcblx0XHRpZiAobWUuaG90LmFjdGl2ZSkge1xuXHRcdFx0aWYgKGluc3RhbGxlZE1vZHVsZXNbcmVxdWVzdF0pIHtcblx0XHRcdFx0dmFyIHBhcmVudHMgPSBpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdLnBhcmVudHM7XG5cdFx0XHRcdGlmIChwYXJlbnRzLmluZGV4T2YobW9kdWxlSWQpID09PSAtMSkge1xuXHRcdFx0XHRcdHBhcmVudHMucHVzaChtb2R1bGVJZCk7XG5cdFx0XHRcdH1cblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW21vZHVsZUlkXTtcblx0XHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gcmVxdWVzdDtcblx0XHRcdH1cblx0XHRcdGlmIChtZS5jaGlsZHJlbi5pbmRleE9mKHJlcXVlc3QpID09PSAtMSkge1xuXHRcdFx0XHRtZS5jaGlsZHJlbi5wdXNoKHJlcXVlc3QpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRjb25zb2xlLndhcm4oXG5cdFx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICtcblx0XHRcdFx0XHRyZXF1ZXN0ICtcblx0XHRcdFx0XHRcIikgZnJvbSBkaXNwb3NlZCBtb2R1bGUgXCIgK1xuXHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHQpO1xuXHRcdFx0Y3VycmVudFBhcmVudHMgPSBbXTtcblx0XHR9XG5cdFx0cmV0dXJuIHJlcXVpcmUocmVxdWVzdCk7XG5cdH07XG5cdHZhciBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IgPSBmdW5jdGlvbiAobmFtZSkge1xuXHRcdHJldHVybiB7XG5cdFx0XHRjb25maWd1cmFibGU6IHRydWUsXG5cdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuXHRcdFx0Z2V0OiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiByZXF1aXJlW25hbWVdO1xuXHRcdFx0fSxcblx0XHRcdHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG5cdFx0XHRcdHJlcXVpcmVbbmFtZV0gPSB2YWx1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9O1xuXHRmb3IgKHZhciBuYW1lIGluIHJlcXVpcmUpIHtcblx0XHRpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHJlcXVpcmUsIG5hbWUpICYmIG5hbWUgIT09IFwiZVwiKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZm4sIG5hbWUsIGNyZWF0ZVByb3BlcnR5RGVzY3JpcHRvcihuYW1lKSk7XG5cdFx0fVxuXHR9XG5cdGZuLmUgPSBmdW5jdGlvbiAoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkge1xuXHRcdHJldHVybiB0cmFja0Jsb2NraW5nUHJvbWlzZShyZXF1aXJlLmUoY2h1bmtJZCwgZmV0Y2hQcmlvcml0eSkpO1xuXHR9O1xuXHRyZXR1cm4gZm47XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1vZHVsZUhvdE9iamVjdChtb2R1bGVJZCwgbWUpIHtcblx0dmFyIF9tYWluID0gY3VycmVudENoaWxkTW9kdWxlICE9PSBtb2R1bGVJZDtcblx0dmFyIGhvdCA9IHtcblx0XHQvLyBwcml2YXRlIHN0dWZmXG5cdFx0X2FjY2VwdGVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfYWNjZXB0ZWRFcnJvckhhbmRsZXJzOiB7fSxcblx0XHRfZGVjbGluZWREZXBlbmRlbmNpZXM6IHt9LFxuXHRcdF9zZWxmQWNjZXB0ZWQ6IGZhbHNlLFxuXHRcdF9zZWxmRGVjbGluZWQ6IGZhbHNlLFxuXHRcdF9zZWxmSW52YWxpZGF0ZWQ6IGZhbHNlLFxuXHRcdF9kaXNwb3NlSGFuZGxlcnM6IFtdLFxuXHRcdF9tYWluOiBfbWFpbixcblx0XHRfcmVxdWlyZVNlbGY6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gbWUucGFyZW50cy5zbGljZSgpO1xuXHRcdFx0Y3VycmVudENoaWxkTW9kdWxlID0gX21haW4gPyB1bmRlZmluZWQgOiBtb2R1bGVJZDtcblx0XHRcdF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpO1xuXHRcdH0sXG5cblx0XHQvLyBNb2R1bGUgQVBJXG5cdFx0YWN0aXZlOiB0cnVlLFxuXHRcdGFjY2VwdDogZnVuY3Rpb24gKGRlcCwgY2FsbGJhY2ssIGVycm9ySGFuZGxlcikge1xuXHRcdFx0aWYgKGRlcCA9PT0gdW5kZWZpbmVkKSBob3QuX3NlbGZBY2NlcHRlZCA9IHRydWU7XG5cdFx0XHRlbHNlIGlmICh0eXBlb2YgZGVwID09PSBcImZ1bmN0aW9uXCIpIGhvdC5fc2VsZkFjY2VwdGVkID0gZGVwO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpIHtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZXAubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0XHRob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBbaV1dID0gZXJyb3JIYW5kbGVyO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcF0gPSBjYWxsYmFjayB8fCBmdW5jdGlvbiAoKSB7fTtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdH1cblx0XHR9LFxuXHRcdGRlY2xpbmU6IGZ1bmN0aW9uIChkZXApIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmRGVjbGluZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJvYmplY3RcIiAmJiBkZXAgIT09IG51bGwpXG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKVxuXHRcdFx0XHRcdGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwW2ldXSA9IHRydWU7XG5cdFx0XHRlbHNlIGhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbZGVwXSA9IHRydWU7XG5cdFx0fSxcblx0XHRkaXNwb3NlOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0YWRkRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0aG90Ll9kaXNwb3NlSGFuZGxlcnMucHVzaChjYWxsYmFjayk7XG5cdFx0fSxcblx0XHRyZW1vdmVEaXNwb3NlSGFuZGxlcjogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHR2YXIgaWR4ID0gaG90Ll9kaXNwb3NlSGFuZGxlcnMuaW5kZXhPZihjYWxsYmFjayk7XG5cdFx0XHRpZiAoaWR4ID49IDApIGhvdC5fZGlzcG9zZUhhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cdFx0aW52YWxpZGF0ZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhpcy5fc2VsZkludmFsaWRhdGVkID0gdHJ1ZTtcblx0XHRcdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdFx0XHRjYXNlIFwiaWRsZVwiOlxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnNcblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0c2V0U3RhdHVzKFwicmVhZHlcIik7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0XHRjYXNlIFwiY2hlY2tcIjpcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VcIjpcblx0XHRcdFx0Y2FzZSBcImFwcGx5XCI6XG5cdFx0XHRcdFx0KHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyA9IHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcyB8fCBbXSkucHVzaChcblx0XHRcdFx0XHRcdG1vZHVsZUlkXG5cdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHQvLyBpZ25vcmUgcmVxdWVzdHMgaW4gZXJyb3Igc3RhdGVzXG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHR9XG5cdFx0fSxcblxuXHRcdC8vIE1hbmFnZW1lbnQgQVBJXG5cdFx0Y2hlY2s6IGhvdENoZWNrLFxuXHRcdGFwcGx5OiBob3RBcHBseSxcblx0XHRzdGF0dXM6IGZ1bmN0aW9uIChsKSB7XG5cdFx0XHRpZiAoIWwpIHJldHVybiBjdXJyZW50U3RhdHVzO1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRhZGRTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0cmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnB1c2gobCk7XG5cdFx0fSxcblx0XHRyZW1vdmVTdGF0dXNIYW5kbGVyOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0dmFyIGlkeCA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5pbmRleE9mKGwpO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0fSxcblxuXHRcdC8vIGluaGVyaXQgZnJvbSBwcmV2aW91cyBkaXNwb3NlIGNhbGxcblx0XHRkYXRhOiBjdXJyZW50TW9kdWxlRGF0YVttb2R1bGVJZF1cblx0fTtcblx0Y3VycmVudENoaWxkTW9kdWxlID0gdW5kZWZpbmVkO1xuXHRyZXR1cm4gaG90O1xufVxuXG5mdW5jdGlvbiBzZXRTdGF0dXMobmV3U3RhdHVzKSB7XG5cdGN1cnJlbnRTdGF0dXMgPSBuZXdTdGF0dXM7XG5cdHZhciByZXN1bHRzID0gW107XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMubGVuZ3RoOyBpKyspXG5cdFx0cmVzdWx0c1tpXSA9IHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVyc1tpXS5jYWxsKG51bGwsIG5ld1N0YXR1cyk7XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKHJlc3VsdHMpLnRoZW4oZnVuY3Rpb24gKCkge30pO1xufVxuXG5mdW5jdGlvbiB1bmJsb2NrKCkge1xuXHRpZiAoLS1ibG9ja2luZ1Byb21pc2VzID09PSAwKSB7XG5cdFx0c2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRpZiAoYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdFx0XHR2YXIgbGlzdCA9IGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nO1xuXHRcdFx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZyA9IFtdO1xuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0XHRsaXN0W2ldKCk7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9KTtcblx0fVxufVxuXG5mdW5jdGlvbiB0cmFja0Jsb2NraW5nUHJvbWlzZShwcm9taXNlKSB7XG5cdHN3aXRjaCAoY3VycmVudFN0YXR1cykge1xuXHRcdGNhc2UgXCJyZWFkeVwiOlxuXHRcdFx0c2V0U3RhdHVzKFwicHJlcGFyZVwiKTtcblx0XHQvKiBmYWxsdGhyb3VnaCAqL1xuXHRcdGNhc2UgXCJwcmVwYXJlXCI6XG5cdFx0XHRibG9ja2luZ1Byb21pc2VzKys7XG5cdFx0XHRwcm9taXNlLnRoZW4odW5ibG9jaywgdW5ibG9jayk7XG5cdFx0XHRyZXR1cm4gcHJvbWlzZTtcblx0XHRkZWZhdWx0OlxuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdH1cbn1cblxuZnVuY3Rpb24gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZm4pIHtcblx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHJldHVybiBmbigpO1xuXHRyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gKHJlc29sdmUpIHtcblx0XHRibG9ja2luZ1Byb21pc2VzV2FpdGluZy5wdXNoKGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlc29sdmUoZm4oKSk7XG5cdFx0fSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBob3RDaGVjayhhcHBseU9uVXBkYXRlKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcImlkbGVcIikge1xuXHRcdHRocm93IG5ldyBFcnJvcihcImNoZWNrKCkgaXMgb25seSBhbGxvd2VkIGluIGlkbGUgc3RhdHVzXCIpO1xuXHR9XG5cdHJldHVybiBzZXRTdGF0dXMoXCJjaGVja1wiKVxuXHRcdC50aGVuKF9fd2VicGFja19yZXF1aXJlX18uaG1yTSlcblx0XHQudGhlbihmdW5jdGlvbiAodXBkYXRlKSB7XG5cdFx0XHRpZiAoIXVwZGF0ZSkge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkgPyBcInJlYWR5XCIgOiBcImlkbGVcIikudGhlbihcblx0XHRcdFx0XHRmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRyZXR1cm4gbnVsbDtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdCk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJwcmVwYXJlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHR2YXIgdXBkYXRlZE1vZHVsZXMgPSBbXTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblxuXHRcdFx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0XHRcdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDKS5yZWR1Y2UoZnVuY3Rpb24gKFxuXHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRrZXlcblx0XHRcdFx0XHQpIHtcblx0XHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yQ1trZXldKFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUuYyxcblx0XHRcdFx0XHRcdFx0dXBkYXRlLnIsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5tLFxuXHRcdFx0XHRcdFx0XHRwcm9taXNlcyxcblx0XHRcdFx0XHRcdFx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZWRNb2R1bGVzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdFx0cmV0dXJuIHByb21pc2VzO1xuXHRcdFx0XHRcdH0sIFtdKVxuXHRcdFx0XHQpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiB3YWl0Rm9yQmxvY2tpbmdQcm9taXNlcyhmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRpZiAoYXBwbHlPblVwZGF0ZSkge1xuXHRcdFx0XHRcdFx0XHRyZXR1cm4gaW50ZXJuYWxBcHBseShhcHBseU9uVXBkYXRlKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJyZWFkeVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIHVwZGF0ZWRNb2R1bGVzO1xuXHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0fSk7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG59XG5cbmZ1bmN0aW9uIGhvdEFwcGx5KG9wdGlvbnMpIHtcblx0aWYgKGN1cnJlbnRTdGF0dXMgIT09IFwicmVhZHlcIikge1xuXHRcdHJldHVybiBQcm9taXNlLnJlc29sdmUoKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdHRocm93IG5ldyBFcnJvcihcblx0XHRcdFx0XCJhcHBseSgpIGlzIG9ubHkgYWxsb3dlZCBpbiByZWFkeSBzdGF0dXMgKHN0YXRlOiBcIiArXG5cdFx0XHRcdFx0Y3VycmVudFN0YXR1cyArXG5cdFx0XHRcdFx0XCIpXCJcblx0XHRcdCk7XG5cdFx0fSk7XG5cdH1cblx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGludGVybmFsQXBwbHkob3B0aW9ucykge1xuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRhcHBseUludmFsaWRhdGVkTW9kdWxlcygpO1xuXG5cdHZhciByZXN1bHRzID0gY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMubWFwKGZ1bmN0aW9uIChoYW5kbGVyKSB7XG5cdFx0cmV0dXJuIGhhbmRsZXIob3B0aW9ucyk7XG5cdH0pO1xuXHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IHVuZGVmaW5lZDtcblxuXHR2YXIgZXJyb3JzID0gcmVzdWx0c1xuXHRcdC5tYXAoZnVuY3Rpb24gKHIpIHtcblx0XHRcdHJldHVybiByLmVycm9yO1xuXHRcdH0pXG5cdFx0LmZpbHRlcihCb29sZWFuKTtcblxuXHRpZiAoZXJyb3JzLmxlbmd0aCA+IDApIHtcblx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiYWJvcnRcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBlcnJvcnNbMF07XG5cdFx0fSk7XG5cdH1cblxuXHQvLyBOb3cgaW4gXCJkaXNwb3NlXCIgcGhhc2Vcblx0dmFyIGRpc3Bvc2VQcm9taXNlID0gc2V0U3RhdHVzKFwiZGlzcG9zZVwiKTtcblxuXHRyZXN1bHRzLmZvckVhY2goZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdGlmIChyZXN1bHQuZGlzcG9zZSkgcmVzdWx0LmRpc3Bvc2UoKTtcblx0fSk7XG5cblx0Ly8gTm93IGluIFwiYXBwbHlcIiBwaGFzZVxuXHR2YXIgYXBwbHlQcm9taXNlID0gc2V0U3RhdHVzKFwiYXBwbHlcIik7XG5cblx0dmFyIGVycm9yO1xuXHR2YXIgcmVwb3J0RXJyb3IgPSBmdW5jdGlvbiAoZXJyKSB7XG5cdFx0aWYgKCFlcnJvcikgZXJyb3IgPSBlcnI7XG5cdH07XG5cblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXG5cdHZhciBvbkFjY2VwdGVkID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBQcm9taXNlLmFsbChbZGlzcG9zZVByb21pc2UsIGFwcGx5UHJvbWlzZV0pLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0Ly8gaGFuZGxlIGVycm9ycyBpbiBhY2NlcHQgaGFuZGxlcnMgYW5kIHNlbGYgYWNjZXB0ZWQgbW9kdWxlIGxvYWRcblx0XHRcdGlmIChlcnJvcikge1xuXHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwiZmFpbFwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHR0aHJvdyBlcnJvcjtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMpIHtcblx0XHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkob3B0aW9ucykudGhlbihmdW5jdGlvbiAobGlzdCkge1xuXHRcdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRcdFx0aWYgKGxpc3QuaW5kZXhPZihtb2R1bGVJZCkgPCAwKSBsaXN0LnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHJldHVybiBsaXN0O1xuXHRcdFx0XHR9KTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcImlkbGVcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0fTtcblxuXHRyZXR1cm4gUHJvbWlzZS5hbGwoXG5cdFx0cmVzdWx0c1xuXHRcdFx0LmZpbHRlcihmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHQuYXBwbHk7XG5cdFx0XHR9KVxuXHRcdFx0Lm1hcChmdW5jdGlvbiAocmVzdWx0KSB7XG5cdFx0XHRcdHJldHVybiByZXN1bHQuYXBwbHkocmVwb3J0RXJyb3IpO1xuXHRcdFx0fSlcblx0KVxuXHRcdC50aGVuKGZ1bmN0aW9uIChhcHBseVJlc3VsdHMpIHtcblx0XHRcdGFwcGx5UmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVzKSB7XG5cdFx0XHRcdGlmIChtb2R1bGVzKSB7XG5cdFx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtb2R1bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChtb2R1bGVzW2ldKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH0pO1xuXHRcdH0pXG5cdFx0LnRoZW4ob25BY2NlcHRlZCk7XG59XG5cbmZ1bmN0aW9uIGFwcGx5SW52YWxpZGF0ZWRNb2R1bGVzKCkge1xuXHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0aWYgKCFjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycykgY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSBbXTtcblx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzLmZvckVhY2goZnVuY3Rpb24gKG1vZHVsZUlkKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1ySVtrZXldKFxuXHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdCk7XG5cdFx0XHR9KTtcblx0XHR9KTtcblx0XHRxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSB1bmRlZmluZWQ7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cbn0iLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQgJiYgZG9jdW1lbnQuY3VycmVudFNjcmlwdC50YWdOYW1lLnRvVXBwZXJDYXNlKCkgPT09ICdTQ1JJUFQnKVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjO1xuXHRpZiAoIXNjcmlwdFVybCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0aWYoc2NyaXB0cy5sZW5ndGgpIHtcblx0XHRcdHZhciBpID0gc2NyaXB0cy5sZW5ndGggLSAxO1xuXHRcdFx0d2hpbGUgKGkgPiAtMSAmJiAoIXNjcmlwdFVybCB8fCAhL15odHRwKHM/KTovLnRlc3Qoc2NyaXB0VXJsKSkpIHNjcmlwdFVybCA9IHNjcmlwdHNbaS0tXS5zcmM7XG5cdFx0fVxuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoL15ibG9iOi8sIFwiXCIpLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJpZiAodHlwZW9mIGRvY3VtZW50ID09PSBcInVuZGVmaW5lZFwiKSByZXR1cm47XG52YXIgY3JlYXRlU3R5bGVzaGVldCA9IChjaHVua0lkLCBmdWxsaHJlZiwgb2xkVGFnLCByZXNvbHZlLCByZWplY3QpID0+IHtcblx0dmFyIGxpbmtUYWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRsaW5rVGFnLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRsaW5rVGFnLnR5cGUgPSBcInRleHQvY3NzXCI7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKSB7XG5cdFx0bGlua1RhZy5ub25jZSA9IF9fd2VicGFja19yZXF1aXJlX18ubmM7XG5cdH1cblx0dmFyIG9uTGlua0NvbXBsZXRlID0gKGV2ZW50KSA9PiB7XG5cdFx0Ly8gYXZvaWQgbWVtIGxlYWtzLlxuXHRcdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gbnVsbDtcblx0XHRpZiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnKSB7XG5cdFx0XHRyZXNvbHZlKCk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiBldmVudC50eXBlO1xuXHRcdFx0dmFyIHJlYWxIcmVmID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5ocmVmIHx8IGZ1bGxocmVmO1xuXHRcdFx0dmFyIGVyciA9IG5ldyBFcnJvcihcIkxvYWRpbmcgQ1NTIGNodW5rIFwiICsgY2h1bmtJZCArIFwiIGZhaWxlZC5cXG4oXCIgKyBlcnJvclR5cGUgKyBcIjogXCIgKyByZWFsSHJlZiArIFwiKVwiKTtcblx0XHRcdGVyci5uYW1lID0gXCJDaHVua0xvYWRFcnJvclwiO1xuXHRcdFx0ZXJyLmNvZGUgPSBcIkNTU19DSFVOS19MT0FEX0ZBSUxFRFwiO1xuXHRcdFx0ZXJyLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRlcnIucmVxdWVzdCA9IHJlYWxIcmVmO1xuXHRcdFx0aWYgKGxpbmtUYWcucGFyZW50Tm9kZSkgbGlua1RhZy5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGxpbmtUYWcpXG5cdFx0XHRyZWplY3QoZXJyKTtcblx0XHR9XG5cdH1cblx0bGlua1RhZy5vbmVycm9yID0gbGlua1RhZy5vbmxvYWQgPSBvbkxpbmtDb21wbGV0ZTtcblx0bGlua1RhZy5ocmVmID0gZnVsbGhyZWY7XG5cblxuXHRpZiAob2xkVGFnKSB7XG5cdFx0b2xkVGFnLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGxpbmtUYWcsIG9sZFRhZy5uZXh0U2libGluZyk7XG5cdH0gZWxzZSB7XG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChsaW5rVGFnKTtcblx0fVxuXHRyZXR1cm4gbGlua1RhZztcbn07XG52YXIgZmluZFN0eWxlc2hlZXQgPSAoaHJlZiwgZnVsbGhyZWYpID0+IHtcblx0dmFyIGV4aXN0aW5nTGlua1RhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcImxpbmtcIik7XG5cdGZvcih2YXIgaSA9IDA7IGkgPCBleGlzdGluZ0xpbmtUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nTGlua1RhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKSB8fCB0YWcuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKTtcblx0XHRpZih0YWcucmVsID09PSBcInN0eWxlc2hlZXRcIiAmJiAoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSkgcmV0dXJuIHRhZztcblx0fVxuXHR2YXIgZXhpc3RpbmdTdHlsZVRhZ3MgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInN0eWxlXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdTdHlsZVRhZ3MubGVuZ3RoOyBpKyspIHtcblx0XHR2YXIgdGFnID0gZXhpc3RpbmdTdHlsZVRhZ3NbaV07XG5cdFx0dmFyIGRhdGFIcmVmID0gdGFnLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKTtcblx0XHRpZihkYXRhSHJlZiA9PT0gaHJlZiB8fCBkYXRhSHJlZiA9PT0gZnVsbGhyZWYpIHJldHVybiB0YWc7XG5cdH1cbn07XG52YXIgbG9hZFN0eWxlc2hlZXQgPSAoY2h1bmtJZCkgPT4ge1xuXHRyZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuXHRcdHZhciBocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5taW5pQ3NzRihjaHVua0lkKTtcblx0XHR2YXIgZnVsbGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBocmVmO1xuXHRcdGlmKGZpbmRTdHlsZXNoZWV0KGhyZWYsIGZ1bGxocmVmKSkgcmV0dXJuIHJlc29sdmUoKTtcblx0XHRjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBudWxsLCByZXNvbHZlLCByZWplY3QpO1xuXHR9KTtcbn1cbi8vIG5vIGNodW5rIGxvYWRpbmdcblxudmFyIG9sZFRhZ3MgPSBbXTtcbnZhciBuZXdUYWdzID0gW107XG52YXIgYXBwbHlIYW5kbGVyID0gKG9wdGlvbnMpID0+IHtcblx0cmV0dXJuIHsgZGlzcG9zZTogKCkgPT4ge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBvbGRUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgb2xkVGFnID0gb2xkVGFnc1tpXTtcblx0XHRcdGlmKG9sZFRhZy5wYXJlbnROb2RlKSBvbGRUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChvbGRUYWcpO1xuXHRcdH1cblx0XHRvbGRUYWdzLmxlbmd0aCA9IDA7XG5cdH0sIGFwcGx5OiAoKSA9PiB7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IG5ld1RhZ3MubGVuZ3RoOyBpKyspIG5ld1RhZ3NbaV0ucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cdFx0bmV3VGFncy5sZW5ndGggPSAwO1xuXHR9IH07XG59XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckMubWluaUNzcyA9IChjaHVua0lkcywgcmVtb3ZlZENodW5rcywgcmVtb3ZlZE1vZHVsZXMsIHByb21pc2VzLCBhcHBseUhhbmRsZXJzLCB1cGRhdGVkTW9kdWxlc0xpc3QpID0+IHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGNodW5rSWRzLmZvckVhY2goKGNodW5rSWQpID0+IHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHR2YXIgb2xkVGFnID0gZmluZFN0eWxlc2hlZXQoaHJlZiwgZnVsbGhyZWYpO1xuXHRcdGlmKCFvbGRUYWcpIHJldHVybjtcblx0XHRwcm9taXNlcy5wdXNoKG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHRcdHZhciB0YWcgPSBjcmVhdGVTdHlsZXNoZWV0KGNodW5rSWQsIGZ1bGxocmVmLCBvbGRUYWcsICgpID0+IHtcblx0XHRcdFx0dGFnLmFzID0gXCJzdHlsZVwiO1xuXHRcdFx0XHR0YWcucmVsID0gXCJwcmVsb2FkXCI7XG5cdFx0XHRcdHJlc29sdmUoKTtcblx0XHRcdH0sIHJlamVjdCk7XG5cdFx0XHRvbGRUYWdzLnB1c2gob2xkVGFnKTtcblx0XHRcdG5ld1RhZ3MucHVzaCh0YWcpO1xuXHRcdH0pKTtcblx0fSk7XG59XG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZCIsIl9fd2VicGFja19yZXF1aXJlX18uYiA9IGRvY3VtZW50LmJhc2VVUkkgfHwgc2VsZi5sb2NhdGlvbi5ocmVmO1xuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtclNfanNvbnAgfHwge1xuXHQ3OTI6IDBcbn07XG5cbi8vIG5vIGNodW5rIG9uIGRlbWFuZCBsb2FkaW5nXG5cbi8vIG5vIHByZWZldGNoaW5nXG5cbi8vIG5vIHByZWxvYWRlZFxuXG52YXIgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdDtcbnZhciB3YWl0aW5nVXBkYXRlUmVzb2x2ZXMgPSB7fTtcbmZ1bmN0aW9uIGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpIHtcblx0Y3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCA9IHVwZGF0ZWRNb2R1bGVzTGlzdDtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSByZXNvbHZlO1xuXHRcdC8vIHN0YXJ0IHVwZGF0ZSBjaHVuayBsb2FkaW5nXG5cdFx0dmFyIHVybCA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIF9fd2VicGFja19yZXF1aXJlX18uaHUoY2h1bmtJZCk7XG5cdFx0Ly8gY3JlYXRlIGVycm9yIGJlZm9yZSBzdGFjayB1bndvdW5kIHRvIGdldCB1c2VmdWwgc3RhY2t0cmFjZSBsYXRlclxuXHRcdHZhciBlcnJvciA9IG5ldyBFcnJvcigpO1xuXHRcdHZhciBsb2FkaW5nRW5kZWQgPSAoZXZlbnQpID0+IHtcblx0XHRcdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdFx0XHR3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0gPSB1bmRlZmluZWRcblx0XHRcdFx0dmFyIGVycm9yVHlwZSA9IGV2ZW50ICYmIChldmVudC50eXBlID09PSAnbG9hZCcgPyAnbWlzc2luZycgOiBldmVudC50eXBlKTtcblx0XHRcdFx0dmFyIHJlYWxTcmMgPSBldmVudCAmJiBldmVudC50YXJnZXQgJiYgZXZlbnQudGFyZ2V0LnNyYztcblx0XHRcdFx0ZXJyb3IubWVzc2FnZSA9ICdMb2FkaW5nIGhvdCB1cGRhdGUgY2h1bmsgJyArIGNodW5rSWQgKyAnIGZhaWxlZC5cXG4oJyArIGVycm9yVHlwZSArICc6ICcgKyByZWFsU3JjICsgJyknO1xuXHRcdFx0XHRlcnJvci5uYW1lID0gJ0NodW5rTG9hZEVycm9yJztcblx0XHRcdFx0ZXJyb3IudHlwZSA9IGVycm9yVHlwZTtcblx0XHRcdFx0ZXJyb3IucmVxdWVzdCA9IHJlYWxTcmM7XG5cdFx0XHRcdHJlamVjdChlcnJvcik7XG5cdFx0XHR9XG5cdFx0fTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmwodXJsLCBsb2FkaW5nRW5kZWQpO1xuXHR9KTtcbn1cblxuc2VsZltcIndlYnBhY2tIb3RVcGRhdGV0YXJpZmZfaW1wYWN0X3N0YXRlc1wiXSA9IChjaHVua0lkLCBtb3JlTW9kdWxlcywgcnVudGltZSkgPT4ge1xuXHRmb3IodmFyIG1vZHVsZUlkIGluIG1vcmVNb2R1bGVzKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gbW9yZU1vZHVsZXNbbW9kdWxlSWRdO1xuXHRcdFx0aWYoY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdCkgY3VycmVudFVwZGF0ZWRNb2R1bGVzTGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHR9XG5cdH1cblx0aWYocnVudGltZSkgY3VycmVudFVwZGF0ZVJ1bnRpbWUucHVzaChydW50aW1lKTtcblx0aWYod2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKSB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdKCk7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkO1xuXHR9XG59O1xuXG52YXIgY3VycmVudFVwZGF0ZUNodW5rcztcbnZhciBjdXJyZW50VXBkYXRlO1xudmFyIGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzO1xudmFyIGN1cnJlbnRVcGRhdGVSdW50aW1lO1xuZnVuY3Rpb24gYXBwbHlIYW5kbGVyKG9wdGlvbnMpIHtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikgZGVsZXRlIF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtcjtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHVuZGVmaW5lZDtcblx0ZnVuY3Rpb24gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKHVwZGF0ZU1vZHVsZUlkKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFt1cGRhdGVNb2R1bGVJZF07XG5cdFx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cblx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMubWFwKGZ1bmN0aW9uIChpZCkge1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0Y2hhaW46IFtpZF0sXG5cdFx0XHRcdGlkOiBpZFxuXHRcdFx0fTtcblx0XHR9KTtcblx0XHR3aGlsZSAocXVldWUubGVuZ3RoID4gMCkge1xuXHRcdFx0dmFyIHF1ZXVlSXRlbSA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWVJdGVtLmlkO1xuXHRcdFx0dmFyIGNoYWluID0gcXVldWVJdGVtLmNoYWluO1xuXHRcdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGVJZF07XG5cdFx0XHRpZiAoXG5cdFx0XHRcdCFtb2R1bGUgfHxcblx0XHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCAmJiAhbW9kdWxlLmhvdC5fc2VsZkludmFsaWRhdGVkKVxuXHRcdFx0KVxuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdGlmIChtb2R1bGUuaG90Ll9zZWxmRGVjbGluZWQpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInNlbGYtZGVjbGluZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fbWFpbikge1xuXHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdHR5cGU6IFwidW5hY2NlcHRlZFwiLFxuXHRcdFx0XHRcdGNoYWluOiBjaGFpbixcblx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlLnBhcmVudHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0dmFyIHBhcmVudElkID0gbW9kdWxlLnBhcmVudHNbaV07XG5cdFx0XHRcdHZhciBwYXJlbnQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbcGFyZW50SWRdO1xuXHRcdFx0XHRpZiAoIXBhcmVudCkgY29udGludWU7XG5cdFx0XHRcdGlmIChwYXJlbnQuaG90Ll9kZWNsaW5lZERlcGVuZGVuY2llc1ttb2R1bGVJZF0pIHtcblx0XHRcdFx0XHRyZXR1cm4ge1xuXHRcdFx0XHRcdFx0dHlwZTogXCJkZWNsaW5lZFwiLFxuXHRcdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdHBhcmVudElkOiBwYXJlbnRJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYgKG91dGRhdGVkTW9kdWxlcy5pbmRleE9mKHBhcmVudElkKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0aWYgKCFvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0pXG5cdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0gPSBbXTtcblx0XHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF0sIFttb2R1bGVJZF0pO1xuXHRcdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1twYXJlbnRJZF07XG5cdFx0XHRcdG91dGRhdGVkTW9kdWxlcy5wdXNoKHBhcmVudElkKTtcblx0XHRcdFx0cXVldWUucHVzaCh7XG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLmNvbmNhdChbcGFyZW50SWRdKSxcblx0XHRcdFx0XHRpZDogcGFyZW50SWRcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHtcblx0XHRcdHR5cGU6IFwiYWNjZXB0ZWRcIixcblx0XHRcdG1vZHVsZUlkOiB1cGRhdGVNb2R1bGVJZCxcblx0XHRcdG91dGRhdGVkTW9kdWxlczogb3V0ZGF0ZWRNb2R1bGVzLFxuXHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXM6IG91dGRhdGVkRGVwZW5kZW5jaWVzXG5cdFx0fTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZEFsbFRvU2V0KGEsIGIpIHtcblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGIubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gYltpXTtcblx0XHRcdGlmIChhLmluZGV4T2YoaXRlbSkgPT09IC0xKSBhLnB1c2goaXRlbSk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gYXQgYmVnaW4gYWxsIHVwZGF0ZXMgbW9kdWxlcyBhcmUgb3V0ZGF0ZWRcblx0Ly8gdGhlIFwib3V0ZGF0ZWRcIiBzdGF0dXMgY2FuIHByb3BhZ2F0ZSB0byBwYXJlbnRzIGlmIHRoZXkgZG9uJ3QgYWNjZXB0IHRoZSBjaGlsZHJlblxuXHR2YXIgb3V0ZGF0ZWREZXBlbmRlbmNpZXMgPSB7fTtcblx0dmFyIG91dGRhdGVkTW9kdWxlcyA9IFtdO1xuXHR2YXIgYXBwbGllZFVwZGF0ZSA9IHt9O1xuXG5cdHZhciB3YXJuVW5leHBlY3RlZFJlcXVpcmUgPSBmdW5jdGlvbiB3YXJuVW5leHBlY3RlZFJlcXVpcmUobW9kdWxlKSB7XG5cdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XCJbSE1SXSB1bmV4cGVjdGVkIHJlcXVpcmUoXCIgKyBtb2R1bGUuaWQgKyBcIikgdG8gZGlzcG9zZWQgbW9kdWxlXCJcblx0XHQpO1xuXHR9O1xuXG5cdGZvciAodmFyIG1vZHVsZUlkIGluIGN1cnJlbnRVcGRhdGUpIHtcblx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdFx0dmFyIG5ld01vZHVsZUZhY3RvcnkgPSBjdXJyZW50VXBkYXRlW21vZHVsZUlkXTtcblx0XHRcdHZhciByZXN1bHQgPSBuZXdNb2R1bGVGYWN0b3J5XG5cdFx0XHRcdD8gZ2V0QWZmZWN0ZWRNb2R1bGVFZmZlY3RzKG1vZHVsZUlkKVxuXHRcdFx0XHQ6IHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiZGlzcG9zZWRcIixcblx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHRcdH07XG5cdFx0XHQvKiogQHR5cGUge0Vycm9yfGZhbHNlfSAqL1xuXHRcdFx0dmFyIGFib3J0RXJyb3IgPSBmYWxzZTtcblx0XHRcdHZhciBkb0FwcGx5ID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9EaXNwb3NlID0gZmFsc2U7XG5cdFx0XHR2YXIgY2hhaW5JbmZvID0gXCJcIjtcblx0XHRcdGlmIChyZXN1bHQuY2hhaW4pIHtcblx0XHRcdFx0Y2hhaW5JbmZvID0gXCJcXG5VcGRhdGUgcHJvcGFnYXRpb246IFwiICsgcmVzdWx0LmNoYWluLmpvaW4oXCIgLT4gXCIpO1xuXHRcdFx0fVxuXHRcdFx0c3dpdGNoIChyZXN1bHQudHlwZSkge1xuXHRcdFx0XHRjYXNlIFwic2VsZi1kZWNsaW5lZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGVjbGluZWQpIG9wdGlvbnMub25EZWNsaW5lZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVEZWNsaW5lZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIG9mIHNlbGYgZGVjbGluZTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBkZWNsaW5lZCBkZXBlbmRlbmN5OiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0Lm1vZHVsZUlkICtcblx0XHRcdFx0XHRcdFx0XHRcIiBpbiBcIiArXG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0LnBhcmVudElkICtcblx0XHRcdFx0XHRcdFx0XHRjaGFpbkluZm9cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJ1bmFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25VbmFjY2VwdGVkKSBvcHRpb25zLm9uVW5hY2NlcHRlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVVbmFjY2VwdGVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2UgXCIgKyBtb2R1bGVJZCArIFwiIGlzIG5vdCBhY2NlcHRlZFwiICsgY2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwiYWNjZXB0ZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkFjY2VwdGVkKSBvcHRpb25zLm9uQWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRkb0FwcGx5ID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRpc3Bvc2VkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EaXNwb3NlZCkgb3B0aW9ucy5vbkRpc3Bvc2VkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9EaXNwb3NlID0gdHJ1ZTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0ZGVmYXVsdDpcblx0XHRcdFx0XHR0aHJvdyBuZXcgRXJyb3IoXCJVbmV4Y2VwdGlvbiB0eXBlIFwiICsgcmVzdWx0LnR5cGUpO1xuXHRcdFx0fVxuXHRcdFx0aWYgKGFib3J0RXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRlcnJvcjogYWJvcnRFcnJvclxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKGRvQXBwbHkpIHtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSBuZXdNb2R1bGVGYWN0b3J5O1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIHJlc3VsdC5vdXRkYXRlZE1vZHVsZXMpO1xuXHRcdFx0XHRmb3IgKG1vZHVsZUlkIGluIHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ocmVzdWx0Lm91dGRhdGVkRGVwZW5kZW5jaWVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0gPSBbXTtcblx0XHRcdFx0XHRcdGFkZEFsbFRvU2V0KFxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF0sXG5cdFx0XHRcdFx0XHRcdHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF1cblx0XHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoZG9EaXNwb3NlKSB7XG5cdFx0XHRcdGFkZEFsbFRvU2V0KG91dGRhdGVkTW9kdWxlcywgW3Jlc3VsdC5tb2R1bGVJZF0pO1xuXHRcdFx0XHRhcHBsaWVkVXBkYXRlW21vZHVsZUlkXSA9IHdhcm5VbmV4cGVjdGVkUmVxdWlyZTtcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0Y3VycmVudFVwZGF0ZSA9IHVuZGVmaW5lZDtcblxuXHQvLyBTdG9yZSBzZWxmIGFjY2VwdGVkIG91dGRhdGVkIG1vZHVsZXMgdG8gcmVxdWlyZSB0aGVtIGxhdGVyIGJ5IHRoZSBtb2R1bGUgc3lzdGVtXG5cdHZhciBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMgPSBbXTtcblx0Zm9yICh2YXIgaiA9IDA7IGogPCBvdXRkYXRlZE1vZHVsZXMubGVuZ3RoOyBqKyspIHtcblx0XHR2YXIgb3V0ZGF0ZWRNb2R1bGVJZCA9IG91dGRhdGVkTW9kdWxlc1tqXTtcblx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdGlmIChcblx0XHRcdG1vZHVsZSAmJlxuXHRcdFx0KG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZCB8fCBtb2R1bGUuaG90Ll9tYWluKSAmJlxuXHRcdFx0Ly8gcmVtb3ZlZCBzZWxmLWFjY2VwdGVkIG1vZHVsZXMgc2hvdWxkIG5vdCBiZSByZXF1aXJlZFxuXHRcdFx0YXBwbGllZFVwZGF0ZVtvdXRkYXRlZE1vZHVsZUlkXSAhPT0gd2FyblVuZXhwZWN0ZWRSZXF1aXJlICYmXG5cdFx0XHQvLyB3aGVuIGNhbGxlZCBpbnZhbGlkYXRlIHNlbGYtYWNjZXB0aW5nIGlzIG5vdCBwb3NzaWJsZVxuXHRcdFx0IW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZFxuXHRcdCkge1xuXHRcdFx0b3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLnB1c2goe1xuXHRcdFx0XHRtb2R1bGU6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdHJlcXVpcmU6IG1vZHVsZS5ob3QuX3JlcXVpcmVTZWxmLFxuXHRcdFx0XHRlcnJvckhhbmRsZXI6IG1vZHVsZS5ob3QuX3NlbGZBY2NlcHRlZFxuXHRcdFx0fSk7XG5cdFx0fVxuXHR9XG5cblx0dmFyIG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzO1xuXG5cdHJldHVybiB7XG5cdFx0ZGlzcG9zZTogZnVuY3Rpb24gKCkge1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MuZm9yRWFjaChmdW5jdGlvbiAoY2h1bmtJZCkge1xuXHRcdFx0XHRkZWxldGUgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdO1xuXHRcdFx0fSk7XG5cdFx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHVuZGVmaW5lZDtcblxuXHRcdFx0dmFyIGlkeDtcblx0XHRcdHZhciBxdWV1ZSA9IG91dGRhdGVkTW9kdWxlcy5zbGljZSgpO1xuXHRcdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdFx0dmFyIG1vZHVsZUlkID0gcXVldWUucG9wKCk7XG5cdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0XHRpZiAoIW1vZHVsZSkgY29udGludWU7XG5cblx0XHRcdFx0dmFyIGRhdGEgPSB7fTtcblxuXHRcdFx0XHQvLyBDYWxsIGRpc3Bvc2UgaGFuZGxlcnNcblx0XHRcdFx0dmFyIGRpc3Bvc2VIYW5kbGVycyA9IG1vZHVsZS5ob3QuX2Rpc3Bvc2VIYW5kbGVycztcblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IGRpc3Bvc2VIYW5kbGVycy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdGRpc3Bvc2VIYW5kbGVyc1tqXS5jYWxsKG51bGwsIGRhdGEpO1xuXHRcdFx0XHR9XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18uaG1yRFttb2R1bGVJZF0gPSBkYXRhO1xuXG5cdFx0XHRcdC8vIGRpc2FibGUgbW9kdWxlICh0aGlzIGRpc2FibGVzIHJlcXVpcmVzIGZyb20gdGhpcyBtb2R1bGUpXG5cdFx0XHRcdG1vZHVsZS5ob3QuYWN0aXZlID0gZmFsc2U7XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIG1vZHVsZSBmcm9tIGNhY2hlXG5cdFx0XHRcdGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXG5cdFx0XHRcdC8vIHdoZW4gZGlzcG9zaW5nIHRoZXJlIGlzIG5vIG5lZWQgdG8gY2FsbCBkaXNwb3NlIGhhbmRsZXJcblx0XHRcdFx0ZGVsZXRlIG91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyByZW1vdmUgXCJwYXJlbnRzXCIgcmVmZXJlbmNlcyBmcm9tIGFsbCBjaGlsZHJlblxuXHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlLmNoaWxkcmVuLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0dmFyIGNoaWxkID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZS5jaGlsZHJlbltqXV07XG5cdFx0XHRcdFx0aWYgKCFjaGlsZCkgY29udGludWU7XG5cdFx0XHRcdFx0aWR4ID0gY2hpbGQucGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKTtcblx0XHRcdFx0XHRpZiAoaWR4ID49IDApIHtcblx0XHRcdFx0XHRcdGNoaWxkLnBhcmVudHMuc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJlbW92ZSBvdXRkYXRlZCBkZXBlbmRlbmN5IGZyb20gbW9kdWxlIGNoaWxkcmVuXG5cdFx0XHR2YXIgZGVwZW5kZW5jeTtcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHRtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdGZvciAoaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdGlkeCA9IG1vZHVsZS5jaGlsZHJlbi5pbmRleE9mKGRlcGVuZGVuY3kpO1xuXHRcdFx0XHRcdFx0XHRpZiAoaWR4ID49IDApIG1vZHVsZS5jaGlsZHJlbi5zcGxpY2UoaWR4LCAxKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9LFxuXHRcdGFwcGx5OiBmdW5jdGlvbiAocmVwb3J0RXJyb3IpIHtcblx0XHRcdHZhciBhY2NlcHRQcm9taXNlcyA9IFtdO1xuXHRcdFx0Ly8gaW5zZXJ0IG5ldyBjb2RlXG5cdFx0XHRmb3IgKHZhciB1cGRhdGVNb2R1bGVJZCBpbiBhcHBsaWVkVXBkYXRlKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8oYXBwbGllZFVwZGF0ZSwgdXBkYXRlTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW3VwZGF0ZU1vZHVsZUlkXSA9IGFwcGxpZWRVcGRhdGVbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdC8vIHJ1biBuZXcgcnVudGltZSBtb2R1bGVzXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGN1cnJlbnRVcGRhdGVSdW50aW1lLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVSdW50aW1lW2ldKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBjYWxsIGFjY2VwdCBoYW5kbGVyc1xuXHRcdFx0Zm9yICh2YXIgb3V0ZGF0ZWRNb2R1bGVJZCBpbiBvdXRkYXRlZERlcGVuZGVuY2llcykge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG91dGRhdGVkRGVwZW5kZW5jaWVzLCBvdXRkYXRlZE1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0aWYgKG1vZHVsZSkge1xuXHRcdFx0XHRcdFx0bW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMgPVxuXHRcdFx0XHRcdFx0XHRvdXRkYXRlZERlcGVuZGVuY2llc1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRcdFx0XHRcdHZhciBjYWxsYmFja3MgPSBbXTtcblx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXJzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciBkZXBlbmRlbmN5ID0gbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXNbal07XG5cdFx0XHRcdFx0XHRcdHZhciBhY2NlcHRDYWxsYmFjayA9XG5cdFx0XHRcdFx0XHRcdFx0bW9kdWxlLmhvdC5fYWNjZXB0ZWREZXBlbmRlbmNpZXNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdHZhciBlcnJvckhhbmRsZXIgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRXJyb3JIYW5kbGVyc1tkZXBlbmRlbmN5XTtcblx0XHRcdFx0XHRcdFx0aWYgKGFjY2VwdENhbGxiYWNrKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKGNhbGxiYWNrcy5pbmRleE9mKGFjY2VwdENhbGxiYWNrKSAhPT0gLTEpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdFx0XHRcdGNhbGxiYWNrcy5wdXNoKGFjY2VwdENhbGxiYWNrKTtcblx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzLnB1c2goZXJyb3JIYW5kbGVyKTtcblx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3MucHVzaChkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yICh2YXIgayA9IDA7IGsgPCBjYWxsYmFja3MubGVuZ3RoOyBrKyspIHtcblx0XHRcdFx0XHRcdFx0dmFyIHJlc3VsdDtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQgPSBjYWxsYmFja3Nba10uY2FsbChudWxsLCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcyk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycikge1xuXHRcdFx0XHRcdFx0XHRcdGlmICh0eXBlb2YgZXJyb3JIYW5kbGVyc1trXSA9PT0gXCJmdW5jdGlvblwiKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvckhhbmRsZXJzW2tdKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fSBjYXRjaCAoZXJyMikge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyMik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwiYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0aWYgKHJlc3VsdCAmJiB0eXBlb2YgcmVzdWx0LnRoZW4gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdGFjY2VwdFByb21pc2VzLnB1c2gocmVzdWx0KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR2YXIgb25BY2NlcHRlZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0Ly8gTG9hZCBzZWxmIGFjY2VwdGVkIG1vZHVsZXNcblx0XHRcdFx0Zm9yICh2YXIgbyA9IDA7IG8gPCBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXMubGVuZ3RoOyBvKyspIHtcblx0XHRcdFx0XHR2YXIgaXRlbSA9IG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlc1tvXTtcblx0XHRcdFx0XHR2YXIgbW9kdWxlSWQgPSBpdGVtLm1vZHVsZTtcblx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0aXRlbS5yZXF1aXJlKG1vZHVsZUlkKTtcblx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdGlmICh0eXBlb2YgaXRlbS5lcnJvckhhbmRsZXIgPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdFx0XHRcdGl0ZW0uZXJyb3JIYW5kbGVyKGVyciwge1xuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlOiBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjEpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJzZWxmLWFjY2VwdC1lcnJvci1oYW5kbGVyLWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRlcnJvcjogZXJyMSxcblx0XHRcdFx0XHRcdFx0XHRcdFx0b3JpZ2luYWxFcnJvcjogZXJyXG5cdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZUVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjEpO1xuXHRcdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3JlZFwiLFxuXHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVwb3J0RXJyb3IoZXJyKTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fTtcblxuXHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKGFjY2VwdFByb21pc2VzKVxuXHRcdFx0XHQudGhlbihvbkFjY2VwdGVkKVxuXHRcdFx0XHQudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0cmV0dXJuIG91dGRhdGVkTW9kdWxlcztcblx0XHRcdFx0fSk7XG5cdFx0fVxuXHR9O1xufVxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJLmpzb25wID0gZnVuY3Rpb24gKG1vZHVsZUlkLCBhcHBseUhhbmRsZXJzKSB7XG5cdGlmICghY3VycmVudFVwZGF0ZSkge1xuXHRcdGN1cnJlbnRVcGRhdGUgPSB7fTtcblx0XHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzID0gW107XG5cdFx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdH1cblx0aWYgKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oY3VycmVudFVwZGF0ZSwgbW9kdWxlSWQpKSB7XG5cdFx0Y3VycmVudFVwZGF0ZVttb2R1bGVJZF0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1bbW9kdWxlSWRdO1xuXHR9XG59O1xuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDLmpzb25wID0gZnVuY3Rpb24gKFxuXHRjaHVua0lkcyxcblx0cmVtb3ZlZENodW5rcyxcblx0cmVtb3ZlZE1vZHVsZXMsXG5cdHByb21pc2VzLFxuXHRhcHBseUhhbmRsZXJzLFxuXHR1cGRhdGVkTW9kdWxlc0xpc3Rcbikge1xuXHRhcHBseUhhbmRsZXJzLnB1c2goYXBwbHlIYW5kbGVyKTtcblx0Y3VycmVudFVwZGF0ZUNodW5rcyA9IHt9O1xuXHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IHJlbW92ZWRDaHVua3M7XG5cdGN1cnJlbnRVcGRhdGUgPSByZW1vdmVkTW9kdWxlcy5yZWR1Y2UoZnVuY3Rpb24gKG9iaiwga2V5KSB7XG5cdFx0b2JqW2tleV0gPSBmYWxzZTtcblx0XHRyZXR1cm4gb2JqO1xuXHR9LCB7fSk7XG5cdGN1cnJlbnRVcGRhdGVSdW50aW1lID0gW107XG5cdGNodW5rSWRzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRpZiAoXG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdICE9PSB1bmRlZmluZWRcblx0XHQpIHtcblx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQsIHVwZGF0ZWRNb2R1bGVzTGlzdCkpO1xuXHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0fSBlbHNlIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSBmYWxzZTtcblx0XHR9XG5cdH0pO1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5mKSB7XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5mLmpzb25wSG1yID0gZnVuY3Rpb24gKGNodW5rSWQsIHByb21pc2VzKSB7XG5cdFx0XHRpZiAoXG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3MgJiZcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGVDaHVua3MsIGNodW5rSWQpICYmXG5cdFx0XHRcdCFjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdXG5cdFx0XHQpIHtcblx0XHRcdFx0cHJvbWlzZXMucHVzaChsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCkpO1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gdHJ1ZTtcblx0XHRcdH1cblx0XHR9O1xuXHR9XG59O1xuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0gPSAoKSA9PiB7XG5cdGlmICh0eXBlb2YgZmV0Y2ggPT09IFwidW5kZWZpbmVkXCIpIHRocm93IG5ldyBFcnJvcihcIk5vIGJyb3dzZXIgc3VwcG9ydDogbmVlZCBmZXRjaCBBUElcIik7XG5cdHJldHVybiBmZXRjaChfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckYoKSkudGhlbigocmVzcG9uc2UpID0+IHtcblx0XHRpZihyZXNwb25zZS5zdGF0dXMgPT09IDQwNCkgcmV0dXJuOyAvLyBubyB1cGRhdGUgYXZhaWxhYmxlXG5cdFx0aWYoIXJlc3BvbnNlLm9rKSB0aHJvdyBuZXcgRXJyb3IoXCJGYWlsZWQgdG8gZmV0Y2ggdXBkYXRlIG1hbmlmZXN0IFwiICsgcmVzcG9uc2Uuc3RhdHVzVGV4dCk7XG5cdFx0cmV0dXJuIHJlc3BvbnNlLmpzb24oKTtcblx0fSk7XG59O1xuXG4vLyBubyBvbiBjaHVua3MgbG9hZGVkXG5cbi8vIG5vIGpzb25wIGZ1bmN0aW9uIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5uYyA9IHVuZGVmaW5lZDsiLCIiLCIvLyBtb2R1bGUgY2FjaGUgYXJlIHVzZWQgc28gZW50cnkgaW5saW5pbmcgaXMgZGlzYWJsZWRcbi8vIHN0YXJ0dXBcbi8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDk2Nik7XG4iLCIiXSwibmFtZXMiOlsic2VsZWN0IiwidG9vbHRpcEVsIiwiVE9PTFRJUF9XSURUSCIsIlBBRERJTkciLCJnZXRQb2ludCIsImV2dCIsIl9ldnQkdG91Y2hlcyIsIl9ldnQkY2hhbmdlZFRvdWNoZXMiLCJfZSRwYWdlWCIsIl9lJHBhZ2VZIiwidCIsInRvdWNoZXMiLCJjaGFuZ2VkVG91Y2hlcyIsImUiLCJwYWdlWCIsImNsaWVudFgiLCJ3aW5kb3ciLCJzY3JvbGxYIiwicGFnZVkiLCJjbGllbnRZIiwic2Nyb2xsWSIsIngiLCJ5IiwiYXBpIiwic2hvdyIsImNvbnRlbnQiLCJfZ2V0UG9pbnQiLCJtYXhMZWZ0IiwiZG9jdW1lbnQiLCJib2R5IiwiY2xpZW50V2lkdGgiLCJ0cmFuc2l0aW9uIiwiZHVyYXRpb24iLCJzdHlsZSIsIm9uIiwiY2xhc3NlZCIsImhpZGUiLCJodG1sIiwiZm9ybWF0Q29udGVudCIsImNvbXBvbmVudCIsImZvckVhY2giLCJpdGVtIiwiY3NzQ2xhc3MiLCJsYWJlbCIsIk9iamVjdCIsImtleXMiLCJjb25jYXQiLCJzZWxlY3RBbGwiLCJmb3JtYXQiLCJzY2FsZVF1YW50aWxlIiwic2NhbGVPcmRpbmFsIiwic2NhbGVMb2ciLCJleHRlbnQiLCJ0b29sdGlwIiwiZG9sbGFyRm9ybWF0dGVyIiwicGVyY2VudEZvcm1hdHRlciIsImNvdW50cmllcyIsImNvbG9ycyIsIm1hcmdpbiIsInRvcCIsInJpZ2h0IiwiYm90dG9tIiwibGVmdCIsImNvbnRhaW5lciIsInJvd3MiLCJjb2x1bW5zIiwicGFkZGluZyIsIm1vZGFsUGFkZGluZyIsImNoYXJ0Iiwid2lkdGgiLCJoZWlnaHQiLCJjZWxsU2l6ZSIsImFjdGl2ZVN0YXRlIiwiYm9yZGVyQ29sb3JTY2FsZSIsImJvcmRlcldpZHRoU2NhbGUiLCJmaWxsU2NhbGUiLCJrZXlGaWx0ZXIiLCJkaWZmIiwiZHJhdyIsImRhdGEiLCJkb21haW4iLCJkIiwidG90YWxkb2xsYXJzIiwicmFuZ2UiLCJkcmF3UGVyY2VudHMiLCJtYXAiLCJjb2xvciIsImkiLCJpbmRpY2VzIiwiY291bnRyeSIsInB1c2giLCJpbmRleE9mIiwiZ3JvdXBzIiwiZWFjaCIsImciLCJnaSIsIm5vZGVzIiwicGVyY2VudE9iaiIsIkFycmF5IiwiTWF0aCIsInJvdW5kIiwiZmlsbCIsInN0YXRlIiwiY29kZSIsInBlcmNlbnQiLCJmaWx0ZXIiLCJjIiwibGVuZ3RoIiwicGFyZW50WCIsImF0dHIiLCJwYXJlbnRZIiwicGVyY2VudHMiLCJleGl0IiwicmVtb3ZlIiwiZW50ZXIiLCJhcHBlbmQiLCJtZXJnZSIsImRpIiwic3dpdGNoSW5kZXgiLCJmaW5kSW5kZXgiLCJwIiwiX3RvQ29uc3VtYWJsZUFycmF5IiwicmV2ZXJzZSIsImNlaWwiLCJhYnMiLCJwYXJzZUludCIsImNvbCIsInJvdyIsInRleHQiLCJpbnRlcmFjdGlvbnMiLCJzdGF0ZXMiLCJjbGljayIsImRyYXdTdGF0ZSIsInN0YXRlRGF0YSIsImRyYXdHcmlkTWFwIiwic3RhdGVTaXplIiwic3ZnIiwiY29sdW1uMiIsInJlcGxhY2UiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiam9pbiIsImdyYW5kdG90YWwiLCJjYWxjQ2VsbFNpemUiLCJncmlkRGF0YSIsImdyaWRHcmFwaCIsInN2Z05vZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImtleSIsImdyaWRNYXBOb2RlcyIsImdyaWRNYXAiLCJncm91cE5vZGVzIiwiYnJlYWtwb2ludCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwibW91c2VvdmVyIiwibW91c2VsZWF2ZSIsInN0YXRlTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJuY29sIiwibnJvdyIsImNlbGxzaXplIiwieHBvcyIsInlwb3MiLCJ3IiwiaCIsImdyaWRXaWR0aCIsImdyaWRIZWlnaHQiLCJjb2xXaWR0aCIsImZsb29yIiwicm93V2lkdGgiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJleGNsdWRlZCIsImNsYXNzTGlzdCIsImlzQWxsIiwiY29udGFpbnMiLCJpc0FjdGl2ZSIsImNoZWNrZWQiLCJpc0FsbFNlbGVjdGVkIiwibm9kZSIsImZpbmQiLCJhbGwiLCJ1bnNoaWZ0IiwiY2FsbCIsImV2ZW50Iiwic2hvd1Rvb2x0aXAiLCJtb3VzZW1vdmUiLCJ0b29sdGlwQ29udGVudCIsImluaXQiLCJkYXR1bSIsInJlc2l6ZSIsInBhcmVudFdpZHRoIiwib2Zmc2V0V2lkdGgiLCJzaXplIiwiZDNGZXRjaCIsImRhdGFTcmMiLCJsb2FkRGF0YSIsImRhdGFQcm9taXNlIiwiY3N2IiwicmVzdWx0IiwiUHJvbWlzZSIsInRoZW4iLCJyZXMiLCJfcmVzIiwiX3NsaWNlZFRvQXJyYXkiLCJkYXRhUmVzcG9uc2UiLCJtaW5NYXgiLCJpbm5lckhUTUwiLCJhZGRFdmVudExpc3RlbmVyIl0sInNvdXJjZVJvb3QiOiIifQ==