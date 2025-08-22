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

/***/ 668:
/***/ ((__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {


// EXTERNAL MODULE: ./src/scss/main.scss
var main = __webpack_require__(530);
;// ./node_modules/d3-array/src/ascending.js
/* harmony default export */ function src_ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}

;// ./node_modules/d3-array/src/bisector.js


/* harmony default export */ function src_bisector(compare) {
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



var ascendingBisect = src_bisector(src_ascending);
var bisectRight = ascendingBisect.right;
var bisectLeft = ascendingBisect.left;
/* harmony default export */ const src_bisect = (bisectRight);

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

/* harmony default export */ function src_ticks(start, stop, count) {
  var reverse,
      i = -1,
      n,
      ticks,
      step;

  stop = +stop, start = +start, count = +count;
  if (start === stop && count > 0) return [start];
  if (reverse = stop < start) n = start, start = stop, stop = n;
  if ((step = ticks_tickIncrement(start, stop, count)) === 0 || !isFinite(step)) return [];

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

function ticks_tickIncrement(start, stop, count) {
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

function formatSpecifier_formatSpecifier(specifier) {
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

formatSpecifier_formatSpecifier.prototype = FormatSpecifier.prototype; // instanceof

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
    specifier = formatSpecifier_formatSpecifier(specifier);

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
    var f = newFormat((specifier = formatSpecifier_formatSpecifier(specifier), specifier.type = "f", specifier)),
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
var defaultLocale_format;
var defaultLocale_formatPrefix;

defaultLocale({
  decimal: ".",
  thousands: ",",
  grouping: [3],
  currency: ["$", ""],
  minus: "-"
});

function defaultLocale(definition) {
  defaultLocale_locale = locale(definition);
  defaultLocale_format = defaultLocale_locale.format;
  defaultLocale_formatPrefix = defaultLocale_locale.formatPrefix;
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



/* harmony default export */ function selectAll(select) {
  if (typeof select !== "function") select = selectorAll(select);

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

;// ./node_modules/d3-selection/src/selection/filter.js



/* harmony default export */ function filter(match) {
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




var keyPrefix = "$"; // Protect against keys like “__proto__”.

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
      nodeByKeyValue = {},
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = keyPrefix + key.call(node, node.__data__, i, group);
      if (keyValue in nodeByKeyValue) {
        exit[i] = node;
      } else {
        nodeByKeyValue[keyValue] = node;
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = keyPrefix + key.call(parent, data[i], i, data);
    if (node = nodeByKeyValue[keyValue]) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue[keyValue] = null;
    } else {
      enter[i] = new EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue[keyValues[i]] === node)) {
      exit[i] = node;
    }
  }
}

/* harmony default export */ function data(value, key) {
  if (!value) {
    data = new Array(this.size()), j = -1;
    this.each(function(d) { data[++j] = d; });
    return data;
  }

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = src_constant(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = value.call(parent, parent && parent.__data__, j, parents),
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

;// ./node_modules/d3-selection/src/selection/exit.js



/* harmony default export */ function exit() {
  return new Selection(this._exit || this._groups.map(sparse), this._parents);
}

;// ./node_modules/d3-selection/src/selection/join.js
/* harmony default export */ function join(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  enter = typeof onenter === "function" ? onenter(enter) : enter.append(onenter + "");
  if (onupdate != null) update = onupdate(update);
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}

;// ./node_modules/d3-selection/src/selection/merge.js


/* harmony default export */ function merge(selection) {

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
  var nodes = new Array(this.size()), i = -1;
  this.each(function() { nodes[++i] = this; });
  return nodes;
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
  var size = 0;
  this.each(function() { ++size; });
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
  return namespaces.hasOwnProperty(prefix) ? {space: namespaces[prefix], local: name} : name;
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
/* harmony default export */ function datum(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}

;// ./node_modules/d3-selection/src/selection/on.js
var filterEvents = {};

var on_event = null;

if (typeof document !== "undefined") {
  var on_element = document.documentElement;
  if (!("onmouseenter" in on_element)) {
    filterEvents = {mouseenter: "mouseover", mouseleave: "mouseout"};
  }
}

function filterContextListener(listener, index, group) {
  listener = contextListener(listener, index, group);
  return function(event) {
    var related = event.relatedTarget;
    if (!related || (related !== this && !(related.compareDocumentPosition(this) & 8))) {
      listener.call(this, event);
    }
  };
}

function contextListener(listener, index, group) {
  return function(event1) {
    var event0 = on_event; // Events can be reentrant (e.g., focus).
    on_event = event1;
    try {
      listener.call(this, this.__data__, index, group);
    } finally {
      on_event = event0;
    }
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
        this.removeEventListener(o.type, o.listener, o.capture);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, capture) {
  var wrap = filterEvents.hasOwnProperty(typename.type) ? filterContextListener : contextListener;
  return function(d, i, group) {
    var on = this.__on, o, listener = wrap(value, i, group);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.capture);
        this.addEventListener(o.type, o.listener = listener, o.capture = capture);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, capture);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, capture: capture};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ function on(typename, value, capture) {
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
  if (capture == null) capture = false;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, capture));
  return this;
}

function customEvent(event1, listener, that, args) {
  var event0 = on_event;
  event1.sourceEvent = on_event;
  on_event = event1;
  try {
    return listener.apply(that, args);
  } finally {
    on_event = event0;
  }
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

;// ./node_modules/d3-selection/src/selection/index.js
































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: selection_select,
  selectAll: selectAll,
  filter: filter,
  data: data,
  enter: enter,
  exit: exit,
  join: join,
  merge: merge,
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
  datum: datum,
  on: on,
  dispatch: dispatch
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
      : new Selection([selector == null ? [] : selector], root);
}

;// ./node_modules/d3-collection/src/map.js
var prefix = "$";

function Map() {}

Map.prototype = map_map.prototype = {
  constructor: Map,
  has: function(key) {
    return (prefix + key) in this;
  },
  get: function(key) {
    return this[prefix + key];
  },
  set: function(key, value) {
    this[prefix + key] = value;
    return this;
  },
  remove: function(key) {
    var property = prefix + key;
    return property in this && delete this[property];
  },
  clear: function() {
    for (var property in this) if (property[0] === prefix) delete this[property];
  },
  keys: function() {
    var keys = [];
    for (var property in this) if (property[0] === prefix) keys.push(property.slice(1));
    return keys;
  },
  values: function() {
    var values = [];
    for (var property in this) if (property[0] === prefix) values.push(this[property]);
    return values;
  },
  entries: function() {
    var entries = [];
    for (var property in this) if (property[0] === prefix) entries.push({key: property.slice(1), value: this[property]});
    return entries;
  },
  size: function() {
    var size = 0;
    for (var property in this) if (property[0] === prefix) ++size;
    return size;
  },
  empty: function() {
    for (var property in this) if (property[0] === prefix) return false;
    return true;
  },
  each: function(f) {
    for (var property in this) if (property[0] === prefix) f(this[property], property.slice(1), this);
  }
};

function map_map(object, f) {
  var map = new Map;

  // Copy constructor.
  if (object instanceof Map) object.each(function(value, key) { map.set(key, value); });

  // Index array by numeric index or specified key function.
  else if (Array.isArray(object)) {
    var i = -1,
        n = object.length,
        o;

    if (f == null) while (++i < n) map.set(i, object[i]);
    else while (++i < n) map.set(f(o = object[i], i, object), o);
  }

  // Convert object to map.
  else if (object) for (var key in object) map.set(key, object[key]);

  return map;
}

/* harmony default export */ const src_map = (map_map);

;// ./node_modules/d3-collection/src/nest.js


/* harmony default export */ function nest() {
  var keys = [],
      sortKeys = [],
      sortValues,
      rollup,
      nest;

  function apply(array, depth, createResult, setResult) {
    if (depth >= keys.length) {
      if (sortValues != null) array.sort(sortValues);
      return rollup != null ? rollup(array) : array;
    }

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        value,
        valuesByKey = map(),
        values,
        result = createResult();

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(value = array[i]) + "")) {
        values.push(value);
      } else {
        valuesByKey.set(keyValue, [value]);
      }
    }

    valuesByKey.each(function(values, key) {
      setResult(result, key, apply(values, depth, createResult, setResult));
    });

    return result;
  }

  function entries(map, depth) {
    if (++depth > keys.length) return map;
    var array, sortKey = sortKeys[depth - 1];
    if (rollup != null && depth >= keys.length) array = map.entries();
    else array = [], map.each(function(v, k) { array.push({key: k, values: entries(v, depth)}); });
    return sortKey != null ? array.sort(function(a, b) { return sortKey(a.key, b.key); }) : array;
  }

  return nest = {
    object: function(array) { return apply(array, 0, createObject, setObject); },
    map: function(array) { return apply(array, 0, createMap, setMap); },
    entries: function(array) { return entries(apply(array, 0, createMap, setMap), 0); },
    key: function(d) { keys.push(d); return nest; },
    sortKeys: function(order) { sortKeys[keys.length - 1] = order; return nest; },
    sortValues: function(order) { sortValues = order; return nest; },
    rollup: function(f) { rollup = f; return nest; }
  };
}

function createObject() {
  return {};
}

function setObject(object, key, value) {
  object[key] = value;
}

function createMap() {
  return map();
}

function setMap(map, key, value) {
  map.set(key, value);
}

;// ./node_modules/d3-collection/src/set.js


function Set() {}

var proto = src_map.prototype;

Set.prototype = set.prototype = {
  constructor: Set,
  has: proto.has,
  add: function(value) {
    value += "";
    this[prefix + value] = value;
    return this;
  },
  remove: proto.remove,
  clear: proto.clear,
  values: proto.keys,
  size: proto.size,
  empty: proto.empty,
  each: proto.each
};

function set(object, f) {
  var set = new Set;

  // Copy constructor.
  if (object instanceof Set) object.each(function(value) { set.add(value); });

  // Otherwise, assume it’s an array.
  else if (object) {
    var i = -1, n = object.length;
    if (f == null) while (++i < n) set.add(object[i]);
    else while (++i < n) set.add(f(object[i], i, object));
  }

  return set;
}

/* harmony default export */ const src_set = ((/* unused pure expression or super */ null && (set)));

;// ./node_modules/d3-collection/src/index.js







;// ./node_modules/d3-scale/src/array.js
var array_array = Array.prototype;

var src_array_map = array_array.map;
var src_array_slice = array_array.slice;

;// ./node_modules/d3-scale/src/init.js
function init_initRange(domain, range) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.range(domain); break;
    default: this.range(range).domain(domain); break;
  }
  return this;
}

function init_initInterpolator(domain, interpolator) {
  switch (arguments.length) {
    case 0: break;
    case 1: this.interpolator(domain); break;
    default: this.interpolator(interpolator).domain(domain); break;
  }
  return this;
}

;// ./node_modules/d3-scale/src/ordinal.js




var implicit = {name: "implicit"};

function ordinal_ordinal() {
  var index = src_map(),
      domain = [],
      range = [],
      unknown = implicit;

  function scale(d) {
    var key = d + "", i = index.get(key);
    if (!i) {
      if (unknown !== implicit) return unknown;
      index.set(key, i = domain.push(d));
    }
    return range[(i - 1) % range.length];
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [], index = src_map();
    var i = -1, n = _.length, d, key;
    while (++i < n) if (!index.has(key = (d = _[i]) + "")) index.set(key, domain.push(d));
    return scale;
  };

  scale.range = function(_) {
    return arguments.length ? (range = src_array_slice.call(_), scale) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return ordinal_ordinal(domain, range).unknown(unknown);
  };

  init_initRange.apply(scale, arguments);

  return scale;
}

;// ./node_modules/d3-scale/src/band.js




function band() {
  var scale = ordinal().unknown(undefined),
      domain = scale.domain,
      ordinalRange = scale.range,
      range = [0, 1],
      step,
      bandwidth,
      round = false,
      paddingInner = 0,
      paddingOuter = 0,
      align = 0.5;

  delete scale.unknown;

  function rescale() {
    var n = domain().length,
        reverse = range[1] < range[0],
        start = range[reverse - 0],
        stop = range[1 - reverse];
    step = (stop - start) / Math.max(1, n - paddingInner + paddingOuter * 2);
    if (round) step = Math.floor(step);
    start += (stop - start - step * (n - paddingInner)) * align;
    bandwidth = step * (1 - paddingInner);
    if (round) start = Math.round(start), bandwidth = Math.round(bandwidth);
    var values = sequence(n).map(function(i) { return start + step * i; });
    return ordinalRange(reverse ? values.reverse() : values);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain(_), rescale()) : domain();
  };

  scale.range = function(_) {
    return arguments.length ? (range = [+_[0], +_[1]], rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = [+_[0], +_[1]], round = true, rescale();
  };

  scale.bandwidth = function() {
    return bandwidth;
  };

  scale.step = function() {
    return step;
  };

  scale.round = function(_) {
    return arguments.length ? (round = !!_, rescale()) : round;
  };

  scale.padding = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, paddingOuter = +_), rescale()) : paddingInner;
  };

  scale.paddingInner = function(_) {
    return arguments.length ? (paddingInner = Math.min(1, _), rescale()) : paddingInner;
  };

  scale.paddingOuter = function(_) {
    return arguments.length ? (paddingOuter = +_, rescale()) : paddingOuter;
  };

  scale.align = function(_) {
    return arguments.length ? (align = Math.max(0, Math.min(1, _)), rescale()) : align;
  };

  scale.copy = function() {
    return band(domain(), range)
        .round(round)
        .paddingInner(paddingInner)
        .paddingOuter(paddingOuter)
        .align(align);
  };

  return initRange.apply(rescale(), arguments);
}

function pointish(scale) {
  var copy = scale.copy;

  scale.padding = scale.paddingOuter;
  delete scale.paddingInner;
  delete scale.paddingOuter;

  scale.copy = function() {
    return pointish(copy());
  };

  return scale;
}

function point() {
  return pointish(band.apply(null, arguments).paddingInner(1));
}

;// ./node_modules/d3-interpolate/node_modules/d3-color/src/define.js
/* harmony default export */ function src_define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

;// ./node_modules/d3-interpolate/node_modules/d3-color/src/color.js


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp("^rgb\\(" + [reI, reI, reI] + "\\)$"),
    reRgbPercent = new RegExp("^rgb\\(" + [reP, reP, reP] + "\\)$"),
    reRgbaInteger = new RegExp("^rgba\\(" + [reI, reI, reI, reN] + "\\)$"),
    reRgbaPercent = new RegExp("^rgba\\(" + [reP, reP, reP, reN] + "\\)$"),
    reHslPercent = new RegExp("^hsl\\(" + [reN, reP, reP] + "\\)$"),
    reHslaPercent = new RegExp("^hsla\\(" + [reN, reP, reP, reN] + "\\)$");

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
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
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
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return "#" + hex(this.r) + hex(this.g) + hex(this.b);
}

function rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
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
  brighter: function(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
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
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

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
/* harmony default export */ function d3_interpolate_src_constant(x) {
  return function() {
    return x;
  };
}

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

function zero(b) {
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
      : zero(b))
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
/* harmony default export */ function d3_scale_src_constant(x) {
  return function() {
    return x;
  };
}

;// ./node_modules/d3-scale/src/number.js
/* harmony default export */ function d3_scale_src_number(x) {
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
      : d3_scale_src_constant(isNaN(b) ? NaN : 0.5);
}

function clamper(domain) {
  var a = domain[0], b = domain[domain.length - 1], t;
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
    var i = src_bisect(domain, x, 1, j) - 1;
    return r[i](d[i](x));
  };
}

function continuous_copy(source, target) {
  return target
      .domain(source.domain())
      .range(source.range())
      .interpolate(source.interpolate())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function continuous_transformer() {
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
    piecewise = Math.min(domain.length, range.length) > 2 ? polymap : bimap;
    output = input = null;
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : (output || (output = piecewise(domain.map(transform), range, interpolate)))(transform(clamp(x)));
  }

  scale.invert = function(y) {
    return clamp(untransform((input || (input = piecewise(range, domain.map(transform), src_number)))(y)));
  };

  scale.domain = function(_) {
    return arguments.length ? (domain = src_array_map.call(_, d3_scale_src_number), clamp === continuous_identity || (clamp = clamper(domain)), rescale()) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = src_array_slice.call(_), rescale()) : range.slice();
  };

  scale.rangeRound = function(_) {
    return range = src_array_slice.call(_), interpolate = round, rescale();
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = _ ? clamper(domain) : continuous_identity, scale) : clamp !== continuous_identity;
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

function continuous_continuous(transform, untransform) {
  return continuous_transformer()(transform, untransform);
}

;// ./node_modules/d3-scale/src/tickFormat.js



/* harmony default export */ function src_tickFormat(start, stop, count, specifier) {
  var step = tickStep(start, stop, count),
      precision;
  specifier = formatSpecifier(specifier == null ? ",f" : specifier);
  switch (specifier.type) {
    case "s": {
      var value = Math.max(Math.abs(start), Math.abs(stop));
      if (specifier.precision == null && !isNaN(precision = precisionPrefix(step, value))) specifier.precision = precision;
      return formatPrefix(specifier, value);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      if (specifier.precision == null && !isNaN(precision = precisionRound(step, Math.max(Math.abs(start), Math.abs(stop))))) specifier.precision = precision - (specifier.type === "e");
      break;
    }
    case "f":
    case "%": {
      if (specifier.precision == null && !isNaN(precision = precisionFixed(step))) specifier.precision = precision - (specifier.type === "%") * 2;
      break;
    }
  }
  return format(specifier);
}

;// ./node_modules/d3-scale/src/linear.js





function linear_linearish(scale) {
  var domain = scale.domain;

  scale.ticks = function(count) {
    var d = domain();
    return ticks(d[0], d[d.length - 1], count == null ? 10 : count);
  };

  scale.tickFormat = function(count, specifier) {
    var d = domain();
    return tickFormat(d[0], d[d.length - 1], count == null ? 10 : count, specifier);
  };

  scale.nice = function(count) {
    if (count == null) count = 10;

    var d = domain(),
        i0 = 0,
        i1 = d.length - 1,
        start = d[i0],
        stop = d[i1],
        step;

    if (stop < start) {
      step = start, start = stop, stop = step;
      step = i0, i0 = i1, i1 = step;
    }

    step = tickIncrement(start, stop, count);

    if (step > 0) {
      start = Math.floor(start / step) * step;
      stop = Math.ceil(stop / step) * step;
      step = tickIncrement(start, stop, count);
    } else if (step < 0) {
      start = Math.ceil(start * step) / step;
      stop = Math.floor(stop * step) / step;
      step = tickIncrement(start, stop, count);
    }

    if (step > 0) {
      d[i0] = Math.floor(start / step) * step;
      d[i1] = Math.ceil(stop / step) * step;
      domain(d);
    } else if (step < 0) {
      d[i0] = Math.ceil(start * step) / step;
      d[i1] = Math.floor(stop * step) / step;
      domain(d);
    }

    return scale;
  };

  return scale;
}

function linear_linear() {
  var scale = continuous(identity, identity);

  scale.copy = function() {
    return copy(scale, linear_linear());
  };

  initRange.apply(scale, arguments);

  return linear_linearish(scale);
}

;// ./node_modules/d3-scale/src/identity.js




function identity_identity(domain) {
  var unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : x;
  }

  scale.invert = scale;

  scale.domain = scale.range = function(_) {
    return arguments.length ? (domain = map.call(_, number), scale) : domain.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return identity_identity(domain).unknown(unknown);
  };

  domain = arguments.length ? map.call(domain, number) : [0, 1];

  return linearish(scale);
}

;// ./node_modules/d3-scale/src/nice.js
/* harmony default export */ function src_nice(domain, interval) {
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
      : function(x) { return Math.pow(base, x); };
}

function logp(base) {
  return base === Math.E ? Math.log
      : base === 10 && Math.log10
      || base === 2 && Math.log2
      || (base = Math.log(base), function(x) { return Math.log(x) / base; });
}

function reflect(f) {
  return function(x) {
    return -f(-x);
  };
}

function log_loggish(transform) {
  var scale = transform(transformLog, transformExp),
      domain = scale.domain,
      base = 10,
      logs,
      pows;

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

  scale.ticks = function(count) {
    var d = domain(),
        u = d[0],
        v = d[d.length - 1],
        r;

    if (r = v < u) i = u, u = v, v = i;

    var i = logs(u),
        j = logs(v),
        p,
        k,
        t,
        n = count == null ? 10 : +count,
        z = [];

    if (!(base % 1) && j - i < n) {
      i = Math.round(i) - 1, j = Math.round(j) + 1;
      if (u > 0) for (; i < j; ++i) {
        for (k = 1, p = pows(i); k < base; ++k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      } else for (; i < j; ++i) {
        for (k = base - 1, p = pows(i); k >= 1; --k) {
          t = p * k;
          if (t < u) continue;
          if (t > v) break;
          z.push(t);
        }
      }
    } else {
      z = src_ticks(i, j, Math.min(j - i, n)).map(pows);
    }

    return r ? z.reverse() : z;
  };

  scale.tickFormat = function(count, specifier) {
    if (specifier == null) specifier = base === 10 ? ".0e" : ",";
    if (typeof specifier !== "function") specifier = defaultLocale_format(specifier);
    if (count === Infinity) return specifier;
    if (count == null) count = 10;
    var k = Math.max(1, base * count / scale.ticks().length); // TODO fast estimate?
    return function(d) {
      var i = d / pows(Math.round(logs(d)));
      if (i * base < base - 0.5) i *= base;
      return i <= k ? specifier(d) : "";
    };
  };

  scale.nice = function() {
    return domain(src_nice(domain(), {
      floor: function(x) { return pows(Math.floor(logs(x))); },
      ceil: function(x) { return pows(Math.ceil(logs(x))); }
    }));
  };

  return scale;
}

function log() {
  var scale = log_loggish(continuous_transformer()).domain([1, 10]);

  scale.copy = function() {
    return continuous_copy(scale, log()).base(scale.base());
  };

  init_initRange.apply(scale, arguments);

  return scale;
}

;// ./node_modules/d3-scale/src/symlog.js




function transformSymlog(c) {
  return function(x) {
    return Math.sign(x) * Math.log1p(Math.abs(x / c));
  };
}

function transformSymexp(c) {
  return function(x) {
    return Math.sign(x) * Math.expm1(Math.abs(x)) * c;
  };
}

function symlog_symlogish(transform) {
  var c = 1, scale = transform(transformSymlog(c), transformSymexp(c));

  scale.constant = function(_) {
    return arguments.length ? transform(transformSymlog(c = +_), transformSymexp(c)) : c;
  };

  return linearish(scale);
}

function symlog() {
  var scale = symlog_symlogish(transformer());

  scale.copy = function() {
    return copy(scale, symlog()).constant(scale.constant());
  };

  return initRange.apply(scale, arguments);
}

;// ./node_modules/d3-scale/src/pow.js




function transformPow(exponent) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, exponent) : Math.pow(x, exponent);
  };
}

function transformSqrt(x) {
  return x < 0 ? -Math.sqrt(-x) : Math.sqrt(x);
}

function transformSquare(x) {
  return x < 0 ? -x * x : x * x;
}

function pow_powish(transform) {
  var scale = transform(identity, identity),
      exponent = 1;

  function rescale() {
    return exponent === 1 ? transform(identity, identity)
        : exponent === 0.5 ? transform(transformSqrt, transformSquare)
        : transform(transformPow(exponent), transformPow(1 / exponent));
  }

  scale.exponent = function(_) {
    return arguments.length ? (exponent = +_, rescale()) : exponent;
  };

  return linearish(scale);
}

function pow() {
  var scale = pow_powish(transformer());

  scale.copy = function() {
    return copy(scale, pow()).exponent(scale.exponent());
  };

  initRange.apply(scale, arguments);

  return scale;
}

function sqrt() {
  return pow.apply(null, arguments).exponent(0.5);
}

;// ./node_modules/d3-scale/src/quantile.js




function quantile_quantile() {
  var domain = [],
      range = [],
      thresholds = [],
      unknown;

  function rescale() {
    var i = 0, n = Math.max(1, range.length);
    thresholds = new Array(n - 1);
    while (++i < n) thresholds[i - 1] = threshold(domain, i / n);
    return scale;
  }

  function scale(x) {
    return isNaN(x = +x) ? unknown : range[bisect(thresholds, x)];
  }

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN] : [
      i > 0 ? thresholds[i - 1] : domain[0],
      i < thresholds.length ? thresholds[i] : domain[domain.length - 1]
    ];
  };

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return rescale();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), rescale()) : range.slice();
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.quantiles = function() {
    return thresholds.slice();
  };

  scale.copy = function() {
    return quantile_quantile()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

;// ./node_modules/d3-scale/src/quantize.js





function quantize() {
  var x0 = 0,
      x1 = 1,
      n = 1,
      domain = [0.5],
      range = [0, 1],
      unknown;

  function scale(x) {
    return x <= x ? range[bisect(domain, x, 0, n)] : unknown;
  }

  function rescale() {
    var i = -1;
    domain = new Array(n);
    while (++i < n) domain[i] = ((i + 1) * x1 - (i - n) * x0) / (n + 1);
    return scale;
  }

  scale.domain = function(_) {
    return arguments.length ? (x0 = +_[0], x1 = +_[1], rescale()) : [x0, x1];
  };

  scale.range = function(_) {
    return arguments.length ? (n = (range = slice.call(_)).length - 1, rescale()) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return i < 0 ? [NaN, NaN]
        : i < 1 ? [x0, domain[0]]
        : i >= n ? [domain[n - 1], x1]
        : [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : scale;
  };

  scale.thresholds = function() {
    return domain.slice();
  };

  scale.copy = function() {
    return quantize()
        .domain([x0, x1])
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(linearish(scale), arguments);
}

;// ./node_modules/d3-scale/src/threshold.js




function threshold_threshold() {
  var domain = [0.5],
      range = [0, 1],
      unknown,
      n = 1;

  function scale(x) {
    return x <= x ? range[bisect(domain, x, 0, n)] : unknown;
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = slice.call(_), n = Math.min(domain.length, range.length - 1), scale) : range.slice();
  };

  scale.invertExtent = function(y) {
    var i = range.indexOf(y);
    return [domain[i - 1], domain[i]];
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  scale.copy = function() {
    return threshold_threshold()
        .domain(domain)
        .range(range)
        .unknown(unknown);
  };

  return initRange.apply(scale, arguments);
}

;// ./node_modules/d3-scale/src/time.js








var durationSecond = 1000,
    durationMinute = durationSecond * 60,
    durationHour = durationMinute * 60,
    durationDay = durationHour * 24,
    durationWeek = durationDay * 7,
    durationMonth = durationDay * 30,
    durationYear = durationDay * 365;

function time_date(t) {
  return new Date(t);
}

function time_number(t) {
  return t instanceof Date ? +t : +new Date(+t);
}

function time_calendar(year, month, week, day, hour, minute, second, millisecond, format) {
  var scale = continuous(identity, identity),
      invert = scale.invert,
      domain = scale.domain;

  var formatMillisecond = format(".%L"),
      formatSecond = format(":%S"),
      formatMinute = format("%I:%M"),
      formatHour = format("%I %p"),
      formatDay = format("%a %d"),
      formatWeek = format("%b %d"),
      formatMonth = format("%B"),
      formatYear = format("%Y");

  var tickIntervals = [
    [second,  1,      durationSecond],
    [second,  5,  5 * durationSecond],
    [second, 15, 15 * durationSecond],
    [second, 30, 30 * durationSecond],
    [minute,  1,      durationMinute],
    [minute,  5,  5 * durationMinute],
    [minute, 15, 15 * durationMinute],
    [minute, 30, 30 * durationMinute],
    [  hour,  1,      durationHour  ],
    [  hour,  3,  3 * durationHour  ],
    [  hour,  6,  6 * durationHour  ],
    [  hour, 12, 12 * durationHour  ],
    [   day,  1,      durationDay   ],
    [   day,  2,  2 * durationDay   ],
    [  week,  1,      durationWeek  ],
    [ month,  1,      durationMonth ],
    [ month,  3,  3 * durationMonth ],
    [  year,  1,      durationYear  ]
  ];

  function tickFormat(date) {
    return (second(date) < date ? formatMillisecond
        : minute(date) < date ? formatSecond
        : hour(date) < date ? formatMinute
        : day(date) < date ? formatHour
        : month(date) < date ? (week(date) < date ? formatDay : formatWeek)
        : year(date) < date ? formatMonth
        : formatYear)(date);
  }

  function tickInterval(interval, start, stop, step) {
    if (interval == null) interval = 10;

    // If a desired tick count is specified, pick a reasonable tick interval
    // based on the extent of the domain and a rough estimate of tick size.
    // Otherwise, assume interval is already a time interval and use it.
    if (typeof interval === "number") {
      var target = Math.abs(stop - start) / interval,
          i = bisector(function(i) { return i[2]; }).right(tickIntervals, target);
      if (i === tickIntervals.length) {
        step = tickStep(start / durationYear, stop / durationYear, interval);
        interval = year;
      } else if (i) {
        i = tickIntervals[target / tickIntervals[i - 1][2] < tickIntervals[i][2] / target ? i - 1 : i];
        step = i[1];
        interval = i[0];
      } else {
        step = Math.max(tickStep(start, stop, interval), 1);
        interval = millisecond;
      }
    }

    return step == null ? interval : interval.every(step);
  }

  scale.invert = function(y) {
    return new Date(invert(y));
  };

  scale.domain = function(_) {
    return arguments.length ? domain(map.call(_, time_number)) : domain().map(time_date);
  };

  scale.ticks = function(interval, step) {
    var d = domain(),
        t0 = d[0],
        t1 = d[d.length - 1],
        r = t1 < t0,
        t;
    if (r) t = t0, t0 = t1, t1 = t;
    t = tickInterval(interval, t0, t1, step);
    t = t ? t.range(t0, t1 + 1) : []; // inclusive stop
    return r ? t.reverse() : t;
  };

  scale.tickFormat = function(count, specifier) {
    return specifier == null ? tickFormat : format(specifier);
  };

  scale.nice = function(interval, step) {
    var d = domain();
    return (interval = tickInterval(interval, d[0], d[d.length - 1], step))
        ? domain(nice(d, interval))
        : scale;
  };

  scale.copy = function() {
    return copy(scale, time_calendar(year, month, week, day, hour, minute, second, millisecond, format));
  };

  return scale;
}

/* harmony default export */ function time() {
  return initRange.apply(time_calendar(timeYear, timeMonth, timeWeek, timeDay, timeHour, timeMinute, timeSecond, timeMillisecond, timeFormat).domain([new Date(2000, 0, 1), new Date(2000, 0, 2)]), arguments);
}

;// ./node_modules/d3-scale/src/utcTime.js





/* harmony default export */ function utcTime() {
  return initRange.apply(calendar(utcYear, utcMonth, utcWeek, utcDay, utcHour, utcMinute, utcSecond, utcMillisecond, utcFormat).domain([Date.UTC(2000, 0, 1), Date.UTC(2000, 0, 2)]), arguments);
}

;// ./node_modules/d3-scale/src/sequential.js







function sequential_transformer() {
  var x0 = 0,
      x1 = 1,
      t0,
      t1,
      k10,
      transform,
      interpolator = identity,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : interpolator(k10 === 0 ? 0.5 : (x = (transform(x) - t0) * k10, clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), k10 = t0 === t1 ? 0 : 1 / (t1 - t0), scale) : [x0, x1];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), k10 = t0 === t1 ? 0 : 1 / (t1 - t0);
    return scale;
  };
}

function sequential_copy(source, target) {
  return target
      .domain(source.domain())
      .interpolator(source.interpolator())
      .clamp(source.clamp())
      .unknown(source.unknown());
}

function sequential() {
  var scale = linearish(sequential_transformer()(identity));

  scale.copy = function() {
    return sequential_copy(scale, sequential());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialLog() {
  var scale = loggish(sequential_transformer()).domain([1, 10]);

  scale.copy = function() {
    return sequential_copy(scale, sequentialLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSymlog() {
  var scale = symlogish(sequential_transformer());

  scale.copy = function() {
    return sequential_copy(scale, sequentialSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialPow() {
  var scale = powish(sequential_transformer());

  scale.copy = function() {
    return sequential_copy(scale, sequentialPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function sequentialSqrt() {
  return sequentialPow.apply(null, arguments).exponent(0.5);
}

;// ./node_modules/d3-scale/src/sequentialQuantile.js




function sequentialQuantile() {
  var domain = [],
      interpolator = identity;

  function scale(x) {
    if (!isNaN(x = +x)) return interpolator((bisect(domain, x) - 1) / (domain.length - 1));
  }

  scale.domain = function(_) {
    if (!arguments.length) return domain.slice();
    domain = [];
    for (var i = 0, n = _.length, d; i < n; ++i) if (d = _[i], d != null && !isNaN(d = +d)) domain.push(d);
    domain.sort(ascending);
    return scale;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.copy = function() {
    return sequentialQuantile(interpolator).domain(domain);
  };

  return initInterpolator.apply(scale, arguments);
}

;// ./node_modules/d3-scale/src/diverging.js








function diverging_transformer() {
  var x0 = 0,
      x1 = 0.5,
      x2 = 1,
      t0,
      t1,
      t2,
      k10,
      k21,
      interpolator = identity,
      transform,
      clamp = false,
      unknown;

  function scale(x) {
    return isNaN(x = +x) ? unknown : (x = 0.5 + ((x = +transform(x)) - t1) * (x < t1 ? k10 : k21), interpolator(clamp ? Math.max(0, Math.min(1, x)) : x));
  }

  scale.domain = function(_) {
    return arguments.length ? (t0 = transform(x0 = +_[0]), t1 = transform(x1 = +_[1]), t2 = transform(x2 = +_[2]), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1), scale) : [x0, x1, x2];
  };

  scale.clamp = function(_) {
    return arguments.length ? (clamp = !!_, scale) : clamp;
  };

  scale.interpolator = function(_) {
    return arguments.length ? (interpolator = _, scale) : interpolator;
  };

  scale.unknown = function(_) {
    return arguments.length ? (unknown = _, scale) : unknown;
  };

  return function(t) {
    transform = t, t0 = t(x0), t1 = t(x1), t2 = t(x2), k10 = t0 === t1 ? 0 : 0.5 / (t1 - t0), k21 = t1 === t2 ? 0 : 0.5 / (t2 - t1);
    return scale;
  };
}

function diverging() {
  var scale = linearish(diverging_transformer()(identity));

  scale.copy = function() {
    return copy(scale, diverging());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingLog() {
  var scale = loggish(diverging_transformer()).domain([0.1, 1, 10]);

  scale.copy = function() {
    return copy(scale, divergingLog()).base(scale.base());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSymlog() {
  var scale = symlogish(diverging_transformer());

  scale.copy = function() {
    return copy(scale, divergingSymlog()).constant(scale.constant());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingPow() {
  var scale = powish(diverging_transformer());

  scale.copy = function() {
    return copy(scale, divergingPow()).exponent(scale.exponent());
  };

  return initInterpolator.apply(scale, arguments);
}

function divergingSqrt() {
  return divergingPow.apply(null, arguments).exponent(0.5);
}

;// ./node_modules/d3-scale/src/index.js
































;// ./node_modules/d3-dispatch/src/dispatch.js
var noop = {value: function() {}};

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
      if (t = (typename = T[i]).type) _[t] = dispatch_set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = dispatch_set(_[t], typename.name, null);
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

function dispatch_set(type, name, callback) {
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
    if ((e = clockNow - t._time) >= 0) t._call.call(null, e);
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
  t.restart(function(elapsed) {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}

;// ./node_modules/d3-transition/src/transition/schedule.js



var emptyOn = src_dispatch("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var schedule_SCHEDULED = 1;
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
    self.state = schedule_SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== schedule_SCHEDULED) return stop();

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


var cssNode,
    cssRoot,
    cssView,
    svgNode;

function parseCss(value) {
  if (value === "none") return decompose_identity;
  if (!cssNode) cssNode = document.createElement("DIV"), cssRoot = document.documentElement, cssView = document.defaultView;
  cssNode.style.transform = value;
  value = cssView.getComputedStyle(cssRoot.appendChild(cssNode), null).getPropertyValue("transform");
  cssRoot.removeChild(cssNode);
  value = value.slice(7, -1).split(",");
  return decompose(+value[0], +value[1], +value[2], +value[3], +value[4], +value[5]);
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

;// ./node_modules/d3-transition/node_modules/d3-color/src/define.js
/* harmony default export */ function d3_color_src_define(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function define_extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}

;// ./node_modules/d3-transition/node_modules/d3-color/src/color.js


function color_Color() {}

var color_darker = 0.7;
var color_brighter = 1 / color_darker;

var color_reI = "\\s*([+-]?\\d+)\\s*",
    color_reN = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    color_reP = "\\s*([+-]?\\d*\\.?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    color_reHex = /^#([0-9a-f]{3,8})$/,
    color_reRgbInteger = new RegExp("^rgb\\(" + [color_reI, color_reI, color_reI] + "\\)$"),
    color_reRgbPercent = new RegExp("^rgb\\(" + [color_reP, color_reP, color_reP] + "\\)$"),
    color_reRgbaInteger = new RegExp("^rgba\\(" + [color_reI, color_reI, color_reI, color_reN] + "\\)$"),
    color_reRgbaPercent = new RegExp("^rgba\\(" + [color_reP, color_reP, color_reP, color_reN] + "\\)$"),
    color_reHslPercent = new RegExp("^hsl\\(" + [color_reN, color_reP, color_reP] + "\\)$"),
    color_reHslaPercent = new RegExp("^hsla\\(" + [color_reN, color_reP, color_reP, color_reN] + "\\)$");

var color_named = {
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

d3_color_src_define(color_Color, color_color, {
  copy: function(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable: function() {
    return this.rgb().displayable();
  },
  hex: color_color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_color_formatHex,
  formatHsl: color_color_formatHsl,
  formatRgb: color_color_formatRgb,
  toString: color_color_formatRgb
});

function color_color_formatHex() {
  return this.rgb().formatHex();
}

function color_color_formatHsl() {
  return color_hslConvert(this).formatHsl();
}

function color_color_formatRgb() {
  return this.rgb().formatRgb();
}

function color_color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = color_reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? color_rgbn(m) // #ff0000
      : l === 3 ? new color_Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? color_rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? color_rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = color_reRgbInteger.exec(format)) ? new color_Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = color_reRgbPercent.exec(format)) ? new color_Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = color_reRgbaInteger.exec(format)) ? color_rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = color_reRgbaPercent.exec(format)) ? color_rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = color_reHslPercent.exec(format)) ? color_hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = color_reHslaPercent.exec(format)) ? color_hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : color_named.hasOwnProperty(format) ? color_rgbn(color_named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new color_Rgb(NaN, NaN, NaN, 0)
      : null;
}

function color_rgbn(n) {
  return new color_Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function color_rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new color_Rgb(r, g, b, a);
}

function color_rgbConvert(o) {
  if (!(o instanceof color_Color)) o = color_color(o);
  if (!o) return new color_Rgb;
  o = o.rgb();
  return new color_Rgb(o.r, o.g, o.b, o.opacity);
}

function src_color_rgb(r, g, b, opacity) {
  return arguments.length === 1 ? color_rgbConvert(r) : new color_Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function color_Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

d3_color_src_define(color_Rgb, src_color_rgb, define_extend(color_Color, {
  brighter: function(k) {
    k = k == null ? color_brighter : Math.pow(color_brighter, k);
    return new color_Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? color_darker : Math.pow(color_darker, k);
    return new color_Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb: function() {
    return this;
  },
  displayable: function() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: color_rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_rgb_formatHex,
  formatRgb: color_rgb_formatRgb,
  toString: color_rgb_formatRgb
}));

function color_rgb_formatHex() {
  return "#" + color_hex(this.r) + color_hex(this.g) + color_hex(this.b);
}

function color_rgb_formatRgb() {
  var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
  return (a === 1 ? "rgb(" : "rgba(")
      + Math.max(0, Math.min(255, Math.round(this.r) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.g) || 0)) + ", "
      + Math.max(0, Math.min(255, Math.round(this.b) || 0))
      + (a === 1 ? ")" : ", " + a + ")");
}

function color_hex(value) {
  value = Math.max(0, Math.min(255, Math.round(value) || 0));
  return (value < 16 ? "0" : "") + value.toString(16);
}

function color_hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new color_Hsl(h, s, l, a);
}

function color_hslConvert(o) {
  if (o instanceof color_Hsl) return new color_Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof color_Color)) o = color_color(o);
  if (!o) return new color_Hsl;
  if (o instanceof color_Hsl) return o;
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
  return new color_Hsl(h, s, l, o.opacity);
}

function color_hsl(h, s, l, opacity) {
  return arguments.length === 1 ? color_hslConvert(h) : new color_Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function color_Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

d3_color_src_define(color_Hsl, color_hsl, define_extend(color_Color, {
  brighter: function(k) {
    k = k == null ? color_brighter : Math.pow(color_brighter, k);
    return new color_Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker: function(k) {
    k = k == null ? color_darker : Math.pow(color_darker, k);
    return new color_Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb: function() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new color_Rgb(
      color_hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      color_hsl2rgb(h, m1, m2),
      color_hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  displayable: function() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl: function() {
    var a = this.opacity; a = isNaN(a) ? 1 : Math.max(0, Math.min(1, a));
    return (a === 1 ? "hsl(" : "hsla(")
        + (this.h || 0) + ", "
        + (this.s || 0) * 100 + "%, "
        + (this.l || 0) * 100 + "%"
        + (a === 1 ? ")" : ", " + a + ")");
  }
}));

/* From FvD 13.37, CSS Color Module Level 3 */
function color_hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}

;// ./node_modules/d3-transition/src/transition/interpolate.js



/* harmony default export */ function interpolate(a, b) {
  var c;
  return (typeof b === "number" ? src_number
      : b instanceof color_color ? rgb
      : (c = color_color(b)) ? (b = c, rgb)
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

  return new transition_Transition(subgroups, this._parents, this._name, this._id);
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

  return new transition_Transition(merges, this._parents, this._name, this._id);
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

  return new transition_Transition(subgroups, this._parents, name, id);
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

  return new transition_Transition(subgroups, parents, name, id);
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

  return new transition_Transition(groups, this._parents, name, id1);
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
  });
}

;// ./node_modules/d3-transition/src/transition/index.js





















var id = 0;

function transition_Transition(groups, parents, name, id) {
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

transition_Transition.prototype = transition_transition.prototype = {
  constructor: transition_Transition,
  select: transition_select,
  selectAll: transition_selectAll,
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
  end: end
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
      return defaultTiming.time = now(), defaultTiming;
    }
  }
  return timing;
}

/* harmony default export */ function selection_transition(name) {
  var id,
      timing;

  if (name instanceof transition_Transition) {
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

  return new transition_Transition(groups, this._parents, name, id);
}

;// ./node_modules/d3-transition/src/selection/index.js




src_selection.prototype.interrupt = selection_interrupt;
src_selection.prototype.transition = selection_transition;

;// ./node_modules/d3-transition/src/active.js



var active_root = (/* unused pure expression or super */ null && ([null]));

/* harmony default export */ function active(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > SCHEDULED && schedule.name === name) {
        return new Transition([[node]], active_root, name, +i);
      }
    }
  }

  return null;
}

;// ./node_modules/d3-transition/src/index.js





;// ./src/js/tooltip.js


var tooltipEl = src_select('.tooltip');
/* harmony default export */ const tooltip = ({
  show: function show(content) {
    var yPos = on_event.pageY;
    var xPos = on_event.pageX;
    if (xPos + 10 > document.body.clientWidth - 215) {
      xPos = document.body.clientWidth + 5 - 215;
    }
    tooltipEl.transition().duration(200).style('opacity', 0.9).on('end', function () {
      tooltipEl.classed('isActive', true);
      // tooltipEl.select('.tooltip-close').on('click', this.hide)
      tooltipEl.on('click', this.hide);
    });
    tooltipEl.html(content).style('visibility', 'visible').style('left', xPos + 'px').style('top', yPos + 'px');
  },
  hide: function hide() {
    tooltipEl.transition().duration(500).style('opacity', 0);
  },
  formatContent: function formatContent(component) {
    var content = '<ul class="tooltip-list">';
    component.forEach(function (item, index) {
      var cssClass = null;
      if (item["class"]) {
        cssClass = item["class"];
      }
      var label = Object.keys(item)[0];
      content += "<li class=\"".concat(cssClass, "\"><span class=\"tooltip-label\">").concat(label, ":</span> ").concat(item[label], "</li>");
    });
    content += '</ul>';
    return content;
  }
});
;// ./src/js/chart.js
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }






var dollarFormatter = defaultLocale_format('.3s');
var percentFormatter = defaultLocale_format('.2f');
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
  fillScale = ordinal_ordinal().domain([].concat(countries, ['other'])).range(colors);
  function drawPercents() {
    fillScale = ordinal_ordinal().domain([].concat(countries, ['other'])).range(colors.map(function (color, i) {
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
    fillScale = ordinal_ordinal().domain([].concat(countries, ['other'])).range(colors);
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
      mouseover: function mouseover(d) {
        interactions.states.showTooltip(d);
      },
      mouseleave: function mouseleave(d) {
        tooltip.hide();
      },
      click: function click(d) {
        tooltip.hide();
        activeState = d;
        container.call(chart.drawState, d);
      },
      showTooltip: function showTooltip(d) {
        var tooltipContent = "\n        <p class=\"tooltip-heading\">\n          ".concat(d.state, "\n        </p>\n        <p class=\"tooltip-body\">\n          $").concat(dollarFormatter(d.totaldollars).replace(/G/, 'B'), " Total Trade (2017)\n        </p>\n        <ul class=\"tooltip-list\">\n        ").concat(countries.map(function (c) {
          return "<li class=\"".concat(c, "\">").concat(c.charAt(0).toUpperCase() + c.slice(1), ": ").concat(d[c] ? percentFormatter(d[c]) : 0, "%</li>");
        }).join(''), "\n\n        </ul>\n        <p class=\"tooltip-footer\">\n          ").concat(percentFormatter(d.grandtotal), "% of Total (2017)\n        </p>\n        ");
        tooltip.show(tooltipContent);
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
    document.querySelector('.min').innerHTML = '$' + defaultLocale_format(',.0f')(minMax[0]).replace(/G/, 'B');
    document.querySelector('.max').innerHTML = '$' + defaultLocale_format(',.0f')(minMax[1]).replace(/G/, 'B');
    js_chart.init(src_data);
  });
}
loadData();
window.addEventListener('resize', js_chart.resize);

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
___CSS_LOADER_EXPORT___.push([module.id, `@font-face{font-family:tradeguys;font-style:normal;font-weight:400;src:url(${___CSS_LOADER_URL_REPLACEMENT_0___});src:url(${___CSS_LOADER_URL_REPLACEMENT_1___}) format("embedded-opentype"),url(${___CSS_LOADER_URL_REPLACEMENT_2___}) format("woff2"),url(${___CSS_LOADER_URL_REPLACEMENT_3___}) format("woff"),url(${___CSS_LOADER_URL_REPLACEMENT_4___}) format("truetype"),url(${___CSS_LOADER_URL_REPLACEMENT_5___}) format("svg")}[class*=" icon-"]:before,[class^=icon-]:before{font-family:tradeguys;font-style:normal;font-weight:400;speak:none;display:inline-block;font-variant:normal;line-height:1em;margin-left:.2em;margin-right:.2em;text-align:center;text-decoration:inherit;text-transform:none;width:1em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-email:before{content:""}.icon-print:before{content:""}.icon-link:before{content:""}.icon-icon_check:before{content:""}.icon-transcript:before{content:""}.icon-youtube:before{content:""}.icon-angle-left:before{content:""}.icon-angle-right:before{content:""}.icon-arrow-left:before{content:""}.icon-arrow-right:before{content:""}.icon-close-lg:before{content:""}.icon-plus-lg:before{content:""}.icon-rss:before{content:""}.icon-video:before{content:""}.icon-quote:before{content:""}.icon-menu:before{content:""}.icon-pause:before{content:""}.icon-play:before{content:""}.icon-linkedin:before{content:""}.icon-chart-line:before{content:""}.icon-facebook:before{content:""}.icon-google:before{content:""}.icon-twitter:before{content:""}.icon-plus:before{content:""}.icon-close:before{content:""}.icon-search:before{content:""}.icon-external:before{content:""}.icon-share:before{content:""}body{--breakpoint:"xsmall";color:#000;font-family:Source Sans Pro,sans-serif;font-size:16px;margin:0;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media screen and (min-width:35em){body{--breakpoint:"small"}}@media screen and (min-width:48em){body{--breakpoint:"medium"}}@media screen and (min-width:64em){body{--breakpoint:"large"}}p{margin:0 0 1.5rem}sup{position:relative;top:-.4em;vertical-align:baseline}.post-content ol a,.post-content ul a,p a{border-bottom:1px dashed #000}a{color:inherit;text-decoration:none;transition:all .3s ease-in-out}a:focus{outline:thin dotted}a:active,a:hover{outline:0}.post-content ol a,.post-content ul a,p a{background-image:linear-gradient(transparent 20%,#eae134 0);background-repeat:no-repeat;background-size:0 100%;transition:all .2s ease-in-out;width:100%}.post-content ol a:hover,.post-content ul a:hover,p a:hover{background-size:100% 100%}ul{list-style:none;margin:0;padding-inline-start:24px}ul li{font-family:Inconsolata,monospace}ul li:before{content:"█";display:inline-block;font-family:Source Sans Pro,sans-serif;font-weight:700;line-height:1;margin-left:-1.5rem;position:relative;top:-.1rem;width:1rem}ul li.china:before{color:#fe5000}ul li.eu:before{color:#0aa4cf}ul li.mexico:before{color:#f2af19}ul li.canada:before{color:#9eb040}.tooltip,.tooltip-info{background-color:#fff;border:1px solid #b3b3b3;border-radius:3px;display:block;font-size:14px;font-size:.875rem;height:auto;line-height:1.4;margin:0 15px;max-width:175px;opacity:0;padding:8px 8px 10px;pointer-events:none;position:absolute;visibility:hidden;width:-moz-fit-content;width:fit-content;z-index:20}.tooltip p,.tooltip-info p{margin:0}.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{border-bottom:1px solid #000;font-weight:700;line-height:1.4;margin-bottom:.5rem;text-align:center;text-transform:uppercase}@media screen and (min-width:35em){.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{line-height:1.4}}.tooltip .tooltip-heading .location,.tooltip-info .tooltip-heading .location{display:block;font-size:10px;font-size:.625rem;font-style:italic}.tooltip .tooltip-label,.tooltip-info .tooltip-label{text-transform:capitalize}.tooltip .tooltip-label.indented,.tooltip-info .tooltip-label.indented{padding-left:.75rem}.tooltip .tooltip-list li,.tooltip-info .tooltip-list li{font-size:14px;font-size:.875rem}.tooltip .tooltip-list li:before,.tooltip-info .tooltip-list li:before{font-size:9px;font-size:.5625rem}.tooltip .tooltip-list .active-category,.tooltip-info .tooltip-list .active-category{font-weight:700}.tooltip .tooltip-close,.tooltip-info .tooltip-close{display:block;font-weight:700;pointer-events:all;position:absolute;right:.5rem;text-align:right;top:.25rem;width:25%;z-index:25}@media screen and (min-width:35em){.tooltip .tooltip-close,.tooltip-info .tooltip-close{display:none}}.tooltip-info{max-width:100px}@media screen and (min-width:35em){.tooltip-info{max-width:300px}}.legend-label{font-family:Inconsolata,monospace}.legend-label:before{border:1px solid #000;content:"";display:inline-block;height:1rem;margin-right:.5rem;transition:.2s;vertical-align:-.2em;width:1rem}.legend-label.all:before{background-color:#eae134}.legend-label.china:before{background-color:#fe5000}.legend-label.canada:before{background-color:#9eb040}.legend-label.eu:before{background-color:#0aa4cf}.legend-label.mexico:before{background-color:#f2af19}input{box-sizing:border-box;font-size:18px;font-size:1.125rem;left:2px;line-height:1.78;margin:0;opacity:0;padding:0;position:absolute;top:1px}input:not(:checked){cursor:pointer}input:checked+label:after{color:#000;content:"";cursor:pointer;font-family:tradeguys;font-weight:700;left:1px;position:absolute;top:1px}@media screen and (max-width:35em){.chart{width:105%}.chart foreignObject div{transform:translateX(-4px)}}@media screen and (min-width:35em){.chart{margin-left:auto;margin-right:auto;max-width:700px}}.chart svg .stateModal{font-family:Inconsolata,monospace;font-size:12.5px;font-size:.78125rem;line-height:1.6}@media screen and (min-width:35em){.chart svg .stateModal{font-size:18px;font-size:1.125rem}}.chart svg .stateModal .modal-heading{font-family:Source Sans Pro,sans-serif;font-size:16px;font-size:1rem;font-weight:700;letter-spacing:1.4px}@media screen and (min-width:35em){.chart svg .stateModal .modal-heading{font-size:24px;font-size:1.5rem}}.chart svg .stateModal ul li:before{font-size:12px;font-size:.75rem}.chart svg .group{cursor:zoom-in}.chart svg .group .label{font-size:12px;font-size:.75rem;fill:#000;stroke:#fff;paint-order:stroke;stroke-width:3px;font-weight:800;text-transform:uppercase;transition:all .2s ease-in-out}@media screen and (min-width:35em){.chart svg .group .label{font-size:18px;font-size:1.125rem}}.chart svg .group .state{transition:all .2s ease-in-out}@media screen and (max-width:35em){.chart svg .group .state{stroke-width:2!important}.chart svg .group .percent{stroke-width:0!important}}.chart svg .group:hover .state{stroke:#eae134}.legend{margin:24px 12px 12px}@media screen and (min-width:35em){.legend{margin:24px 0 12px}}.legend .legend-title{flex-basis:100%;font-family:Inconsolata,monospace;font-size:14px;font-size:.875rem;font-weight:400;letter-spacing:1.2px;text-transform:uppercase}.legend>.direction{flex-basis:100%;font-size:12px;font-size:.75rem;font-style:italic;margin-top:6px}.legend .container{align-items:center;display:flex;flex-wrap:wrap}.legend .container .legend-bar{align-items:center;background-color:#fff;display:none;flex-wrap:wrap;font-family:Inconsolata,monospace;line-height:1.2;padding:6px;position:relative}@media screen and (min-width:35em){.legend .container .legend-bar{display:flex;flex:0 0 224px;margin-left:36px;width:100%}.legend .container .legend-bar:before{background-color:#000;content:"";display:block;height:120%;left:-24px;position:absolute;top:0;width:1px}}.legend .container .legend-bar>div{font-size:16px;font-size:1rem;padding-left:12px}.legend .container .legend-bar>div .min-max{font-size:14px;font-size:.875rem}.legend .container .countries{align-items:center;display:flex;flex-wrap:wrap}@media screen and (min-width:35em){.legend .container .countries{flex:0 0 calc(100% - 300px)}}.legend .container .countries .legend-item{box-sizing:border-box;display:flex;flex:1 0 47%;font-size:16px;font-size:1rem;margin:0 6px 6px 0;position:relative}@media screen and (min-width:35em){.legend .container .countries .legend-item{flex:1 0 auto;margin:0 6px 0 0}}body>:not(.tooltip):not(.chart){margin-left:12px;margin-right:12px;max-width:700px}@media screen and (min-width:35em){body>:not(.tooltip):not(.chart){margin-left:auto;margin-right:auto}}body .interactive__header{border-bottom:0;margin:1rem auto;padding-bottom:1.25rem}body .interactive__header .interactive__title{color:#000;font-family:Source Sans Pro,sans-serif;font-size:20px;font-size:1.25rem;font-weight:700;letter-spacing:1.4px;line-height:1.36;text-align:center}body .interactive__header p{font-size:16px;font-size:1rem;line-height:1.78}body .interactive__filters{margin:0 auto 1rem}body .interactive__filters .search__suggestions{margin-bottom:0;margin-top:3px}body .interactive__graphic{margin:0 auto;max-width:1250px;position:relative}body .interactive__source{border-top:1px solid #000;margin-left:auto;margin-right:auto;padding-bottom:2rem}body .interactive__source p{color:#4a4a4a;font-family:Source Sans Pro,sans-serif;font-size:14px;font-size:.875rem;margin:.5rem 0 0}body .instructions{border-top:1px solid #b3b3b3;color:#4a4a4a;font-size:.9rem;font-style:italic;margin-top:6px;padding:.5rem 0 0;text-align:center}body .instructions span{display:none}@media screen and (min-width:35em){body .instructions span{display:inline-block}}`, "",{"version":3,"sources":["webpack://./src/scss/main.scss","webpack://./src/scss/base/_variables.scss","webpack://./src/scss/base/_base.scss","webpack://./src/scss/base/_mixins.scss","webpack://./src/scss/components/_tooltips.scss","webpack://./src/scss/components/_form-elements.scss","webpack://./src/scss/custom/_chart.scss","webpack://./src/scss/custom/_layout.scss"],"names":[],"mappings":"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","sourcesContent":["@font-face{font-family:\"tradeguys\";src:url(\"../fonts/tradeguys.eot?48792507\");src:url(\"../fonts/tradeguys.eot?48792507#iefix\") format(\"embedded-opentype\"),url(\"../fonts/tradeguys.woff2?48792507\") format(\"woff2\"),url(\"../fonts/tradeguys.woff?48792507\") format(\"woff\"),url(\"../fonts/tradeguys.ttf?48792507\") format(\"truetype\"),url(\"../fonts/tradeguys.svg?48792507#tradeguys\") format(\"svg\");font-weight:normal;font-style:normal}[class^=icon-]:before,[class*=\" icon-\"]:before{font-family:\"tradeguys\";font-style:normal;font-weight:normal;speak:none;display:inline-block;text-decoration:inherit;width:1em;margin-right:.2em;text-align:center;font-variant:normal;text-transform:none;line-height:1em;margin-left:.2em;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.icon-email:before{content:\"\"}.icon-print:before{content:\"\"}.icon-link:before{content:\"\"}.icon-icon_check:before{content:\"\"}.icon-transcript:before{content:\"\"}.icon-youtube:before{content:\"\"}.icon-angle-left:before{content:\"\"}.icon-angle-right:before{content:\"\"}.icon-arrow-left:before{content:\"\"}.icon-arrow-right:before{content:\"\"}.icon-close-lg:before{content:\"\"}.icon-plus-lg:before{content:\"\"}.icon-rss:before{content:\"\"}.icon-video:before{content:\"\"}.icon-quote:before{content:\"\"}.icon-menu:before{content:\"\"}.icon-pause:before{content:\"\"}.icon-play:before{content:\"\"}.icon-linkedin:before{content:\"\"}.icon-chart-line:before{content:\"\"}.icon-facebook:before{content:\"\"}.icon-google:before{content:\"\"}.icon-twitter:before{content:\"\"}.icon-plus:before{content:\"\"}.icon-close:before{content:\"\"}.icon-search:before{content:\"\"}.icon-external:before{content:\"\"}.icon-share:before{content:\"\"}body{--breakpoint: \"xsmall\";font-family:\"Source Sans Pro\",sans-serif;font-size:16px;margin:0;color:#000;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}@media screen and (min-width: 35em){body{--breakpoint: \"small\"}}@media screen and (min-width: 48em){body{--breakpoint: \"medium\"}}@media screen and (min-width: 64em){body{--breakpoint: \"large\"}}p{margin:0 0 1.5rem}sup{vertical-align:baseline;position:relative;top:-0.4em}p a,.post-content ul a,.post-content ol a{border-bottom:1px dashed #000}a{color:inherit;text-decoration:none;transition:all .3s ease-in-out}a:focus{outline:thin dotted}a:hover,a:active{outline:0}p a,.post-content ul a,.post-content ol a{width:100%;background-image:linear-gradient(transparent 20%, #eae134 20%);background-repeat:no-repeat;background-size:0% 100%;transition:all .2s ease-in-out}p a:hover,.post-content ul a:hover,.post-content ol a:hover{background-size:100% 100%}ul{margin:0;padding-inline-start:24px;list-style:none}ul li{font-family:\"Inconsolata\",monospace}ul li:before{font-family:\"Source Sans Pro\",sans-serif;font-weight:bold;line-height:1;position:relative;top:-0.1rem;display:inline-block;width:1rem;margin-left:-1.5rem;content:\"█\"}ul li.china::before{color:#fe5000}ul li.eu::before{color:#0aa4cf}ul li.mexico::before{color:#f2af19}ul li.canada::before{color:#9eb040}.tooltip,.tooltip-info{display:block;font-size:14px;font-size:0.875rem;line-height:1.4;position:absolute;z-index:20;visibility:hidden;width:fit-content;max-width:175px;height:auto;margin:0 15px;padding:8px 8px 10px;pointer-events:none;opacity:0;border:1px solid #b3b3b3;border-radius:3px;background-color:#fff}.tooltip p,.tooltip-info p{margin:0}.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{text-transform:uppercase;line-height:1.4;font-weight:bold;margin-bottom:.5rem;text-align:center;border-bottom:1px solid #000}@media screen and (min-width: 35em){.tooltip .tooltip-heading,.tooltip-info .tooltip-heading{line-height:1.4}}.tooltip .tooltip-heading .location,.tooltip-info .tooltip-heading .location{display:block;font-size:10px;font-size:0.625rem;font-style:italic}.tooltip .tooltip-label,.tooltip-info .tooltip-label{text-transform:capitalize}.tooltip .tooltip-label.indented,.tooltip-info .tooltip-label.indented{padding-left:.75rem}.tooltip .tooltip-list li,.tooltip-info .tooltip-list li{font-size:14px;font-size:0.875rem}.tooltip .tooltip-list li:before,.tooltip-info .tooltip-list li:before{font-size:9px;font-size:0.5625rem}.tooltip .tooltip-list .active-category,.tooltip-info .tooltip-list .active-category{font-weight:bold}.tooltip .tooltip-close,.tooltip-info .tooltip-close{font-weight:bold;position:absolute;z-index:25;top:.25rem;right:.5rem;display:block;width:25%;text-align:right;pointer-events:all}@media screen and (min-width: 35em){.tooltip .tooltip-close,.tooltip-info .tooltip-close{display:none}}.tooltip-info{max-width:100px}@media screen and (min-width: 35em){.tooltip-info{max-width:300px}}.legend-label{font-family:\"Inconsolata\",monospace}.legend-label:before{display:inline-block;width:1rem;height:1rem;margin-right:.5rem;content:\"\";transition:.2s;vertical-align:-0.2em;border:1px solid #000}.legend-label.all:before{background-color:#eae134}.legend-label.china:before{background-color:#fe5000}.legend-label.canada:before{background-color:#9eb040}.legend-label.eu:before{background-color:#0aa4cf}.legend-label.mexico:before{background-color:#f2af19}input{font-size:18px;font-size:1.125rem;line-height:1.78;position:absolute;top:1px;left:2px;box-sizing:border-box;margin:0;padding:0;opacity:0}input:not(:checked){cursor:pointer}input:checked+label::after{font-family:\"tradeguys\";font-weight:bold;position:absolute;top:1px;left:1px;content:\"\";cursor:pointer;color:#000}@media screen and (max-width: 35em){.chart{width:105%}.chart foreignObject div{transform:translateX(-4px)}}@media screen and (min-width: 35em){.chart{max-width:700px;margin-left:auto;margin-right:auto}}.chart svg .stateModal{font-family:\"Inconsolata\",monospace;line-height:1.6;font-size:12.5px;font-size:0.78125rem}@media screen and (min-width: 35em){.chart svg .stateModal{font-size:18px;font-size:1.125rem}}.chart svg .stateModal .modal-heading{font-family:\"Source Sans Pro\",sans-serif;font-weight:bold;letter-spacing:1.4px;font-size:16px;font-size:1rem}@media screen and (min-width: 35em){.chart svg .stateModal .modal-heading{font-size:24px;font-size:1.5rem}}.chart svg .stateModal ul li:before{font-size:12px;font-size:0.75rem}.chart svg .group{cursor:zoom-in}.chart svg .group .label{font-size:12px;font-size:0.75rem;fill:#000;stroke:#fff;paint-order:stroke;stroke-width:3px;text-transform:uppercase;font-weight:800;transition:all .2s ease-in-out}@media screen and (min-width: 35em){.chart svg .group .label{font-size:18px;font-size:1.125rem}}.chart svg .group .state{transition:all .2s ease-in-out}@media screen and (max-width: 35em){.chart svg .group .state{stroke-width:2 !important}}@media screen and (max-width: 35em){.chart svg .group .percent{stroke-width:0 !important}}.chart svg .group:hover .state{stroke:#eae134}.legend{margin:24px 12px 12px}@media screen and (min-width: 35em){.legend{margin:24px 0 12px}}.legend .legend-title{-ms-flex-preferred-size:100%;flex-basis:100%;font-family:\"Inconsolata\",monospace;font-weight:400;text-transform:uppercase;font-size:14px;font-size:0.875rem;letter-spacing:1.2px}.legend>.direction{-ms-flex-preferred-size:100%;flex-basis:100%;font-style:italic;font-size:12px;font-size:0.75rem;margin-top:6px}.legend .container{display:-ms-flexbox;display:flex;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}.legend .container .legend-bar{font-family:\"Inconsolata\",monospace;line-height:1.2;position:relative;display:none;padding:6px;background-color:#fff;-ms-flex-wrap:wrap;flex-wrap:wrap;-ms-flex-align:center;align-items:center}@media screen and (min-width: 35em){.legend .container .legend-bar{display:-ms-flexbox;display:flex;margin-left:36px;width:100%;-ms-flex:0 0 224px;flex:0 0 224px}.legend .container .legend-bar:before{content:\"\";display:block;position:absolute;top:0;left:-24px;width:1px;height:120%;background-color:#000}}.legend .container .legend-bar>div{padding-left:12px;font-size:16px;font-size:1rem}.legend .container .legend-bar>div .min-max{font-size:14px;font-size:0.875rem}.legend .container .countries{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-wrap:wrap;flex-wrap:wrap}@media screen and (min-width: 35em){.legend .container .countries{-ms-flex:0 0 calc(100% - 300px);flex:0 0 calc(100% - 300px)}}.legend .container .countries .legend-item{font-size:16px;font-size:1rem;position:relative;display:-ms-flexbox;display:flex;box-sizing:border-box;margin:0 6px 6px 0;-ms-flex:1 0 47%;flex:1 0 47%}@media screen and (min-width: 35em){.legend .container .countries .legend-item{-ms-flex:1 0 auto;flex:1 0 auto;margin:0 6px 0 0}}body>*:not(.tooltip):not(.chart){max-width:700px;margin-left:12px;margin-right:12px}@media screen and (min-width: 35em){body>*:not(.tooltip):not(.chart){margin-left:auto;margin-right:auto}}body .interactive__header{margin:1rem auto;padding-bottom:1.25rem;border-bottom:0}body .interactive__header .interactive__title{font-family:\"Source Sans Pro\",sans-serif;font-size:20px;font-size:1.25rem;line-height:1.36;letter-spacing:1.4px;color:#000;font-weight:bold;text-align:center}body .interactive__header p{line-height:1.78;font-size:16px;font-size:1rem}body .interactive__filters{margin:0 auto 1rem}body .interactive__filters .search__suggestions{margin-top:3px;margin-bottom:0}body .interactive__graphic{position:relative;max-width:1250px;margin:0 auto}body .interactive__source{margin-left:auto;margin-right:auto;padding-bottom:2rem;border-top:1px solid #000}body .interactive__source p{margin:.5rem 0 0;font-size:14px;font-size:0.875rem;font-family:\"Source Sans Pro\",sans-serif;color:#4a4a4a}body .instructions{font-style:italic;font-size:.9rem;margin-top:6px;border-top:1px solid #b3b3b3;padding:.5rem 0 0;color:#4a4a4a;text-align:center}body .instructions span{display:none}@media screen and (min-width: 35em){body .instructions span{display:inline-block}}","$black: #000;\n$white: #fff;\n$off-white: #f7f4f1;\n$off-white-dark: #eae6e1;\n$yellow: #eae134;\n$dark-yellow: #cfc83a;\n$red: #fe5000;\n$green: #9eb040;\n$blue: #0aa4cf;\n$orange: #f2af19;\n$purple: #a1689c;\n$gray: #4a4a4a;\n$dark-gray: #353535;\n$disabled-gray: #b3b3b3;\n\n$color_footer-contact-text: #e0e1e2;\n$color_footer-copyright-text: #090909;\n$color_post-list-border: $disabled-gray;\n$color_audio-player-progress-bar: $disabled-gray;\n$color_audio-player-transcript-box: $off-white-dark;\n$color_audio-player-transcript-box-shadow: rgba(0, 0, 0, 0.2);\n$color_home-trade-guy-title: #444;\n\n$browser-context: 16px;\n/*----------  Structural  ----------*/\n$size-max-width: 700px;\n\n/*----------  Fonts  ----------*/\n$font_inconsolata: 'Inconsolata', monospace;\n$font_source: 'Source Sans Pro', sans-serif;\n$fontello_url: '../fonts/';\n\n@font-face {\n  font-family: 'tradeguys';\n  src: url('#{$fontello_url}tradeguys.eot?48792507');\n  src: url('#{$fontello_url}tradeguys.eot?48792507#iefix')\n      format('embedded-opentype'),\n    url('#{$fontello_url}tradeguys.woff2?48792507') format('woff2'),\n    url('#{$fontello_url}tradeguys.woff?48792507') format('woff'),\n    url('#{$fontello_url}tradeguys.ttf?48792507') format('truetype'),\n    url('#{$fontello_url}tradeguys.svg?48792507#tradeguys') format('svg');\n  font-weight: normal;\n  font-style: normal;\n}\n\n[class^='icon-']:before,\n[class*=' icon-']:before {\n  font-family: 'tradeguys';\n  font-style: normal;\n  font-weight: normal;\n  speak: none;\n\n  display: inline-block;\n  text-decoration: inherit;\n  width: 1em;\n  margin-right: 0.2em;\n  text-align: center;\n  /* opacity: .8; */\n\n  /* For safety - reset parent styles, that can break glyph codes*/\n  font-variant: normal;\n  text-transform: none;\n\n  /* fix buttons height, for twitter bootstrap */\n  line-height: 1em;\n\n  /* Animation center compensation - margins should be symmetric */\n  /* remove if not needed */\n  margin-left: 0.2em;\n\n  /* you can be more comfortable with increased icons size */\n  /* font-size: 120%; */\n\n  /* Font smoothing. That was taken from TWBS */\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n  /* Uncomment for 3D effect */\n  /* text-shadow: 1px 1px 1px rgba(127, 127, 127, 0.3); */\n}\n.icon-email:before {\n  content: '\\e801';\n} /* '' */\n.icon-print:before {\n  content: '\\e804';\n} /* '' */\n.icon-link:before {\n  content: '\\e805';\n} /* '' */\n.icon-icon_check:before {\n  content: '\\e878';\n} /* '' */\n.icon-transcript:before {\n  content: '\\e89b';\n} /* '' */\n.icon-youtube:before {\n  content: '\\e983';\n} /* '' */\n.icon-angle-left:before {\n  content: '\\e992';\n} /* '' */\n.icon-angle-right:before {\n  content: '\\e993';\n} /* '' */\n.icon-arrow-left:before {\n  content: '\\e99d';\n} /* '' */\n.icon-arrow-right:before {\n  content: '\\e99e';\n} /* '' */\n.icon-close-lg:before {\n  content: '\\e9bd';\n} /* '' */\n.icon-plus-lg:before {\n  content: '\\ea81';\n} /* '' */\n.icon-rss:before {\n  content: '\\ebee';\n} /* '' */\n.icon-video:before {\n  content: '\\ebf0';\n} /* '' */\n.icon-quote:before {\n  content: '\\ebf1';\n} /* '' */\n.icon-menu:before {\n  content: '\\ebf2';\n} /* '' */\n.icon-pause:before {\n  content: '\\f00e';\n} /* '' */\n.icon-play:before {\n  content: '\\f00f';\n} /* '' */\n.icon-linkedin:before {\n  content: '\\f0e1';\n} /* '' */\n.icon-chart-line:before {\n  content: '\\f201';\n} /* '' */\n.icon-facebook:before {\n  content: '\\f231';\n} /* '' */\n.icon-google:before {\n  content: '\\f234';\n} /* '' */\n.icon-twitter:before {\n  content: '\\f243';\n} /* '' */\n.icon-plus:before {\n  content: '\\f2c7';\n} /* '' */\n.icon-close:before {\n  content: '\\f2d7';\n} /* '' */\n.icon-search:before {\n  content: '\\f2f5';\n} /* '' */\n.icon-external:before {\n  content: '\\f39c';\n} /* '' */\n.icon-share:before {\n  content: '\\f3ac';\n} /* '' */\n","@use 'variables' as *;\n@use 'mixins' as *;\n\nbody {\n  --breakpoint: 'xsmall';\n  font-family: $font-source;\n  font-size: $browser-context;\n  margin: 0;\n  color: $black;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n\n  @include breakpoint(small) {\n    --breakpoint: 'small';\n  }\n\n  @include breakpoint(medium) {\n    --breakpoint: 'medium';\n  }\n\n  @include breakpoint(large) {\n    --breakpoint: 'large';\n  }\n}\n\np {\n  margin: 0 0 1.5rem;\n}\n\nsup {\n  vertical-align: baseline;\n  position: relative;\n  top: -0.4em;\n}\n\n/*=============================\n=            Links            =\n=============================*/\n\n%dashed-underline {\n  border-bottom: 1px dashed $black;\n}\n\n%external-links {\n  a[href*=\"//\"]:not([href*=\"tradeguys.csis.org\"]) {\n    position: relative;\n    margin-left: 1.5rem;\n    &::before {\n      position: absolute;\n      left: -1.5rem;\n      content: '\\f39c';\n      font-family: 'tradeguys';\n    }\n  }\n}\n\na {\n  color: inherit;\n  text-decoration: none;\n  transition: all 0.3s ease-in-out;\n\n  &:visited {\n  }\n  &:hover,\n  &:focus,\n  &:active {\n  }\n  &:focus {\n    outline: thin dotted;\n  }\n  &:hover,\n  &:active {\n    outline: 0;\n  }\n\n  p &,\n  .post-content ul &,\n  .post-content ol & {\n    @extend %dashed-underline;\n    @include wipe-link-hover-background($yellow);\n  }\n}\n/*=============================\n=            Lists            =\n=============================*/\nul {\n  margin: 0;\n  padding-inline-start: 24px;\n  list-style: none;\n\n  li {\n    font-family: $font_inconsolata;\n    &:before {\n      font-family: $font_source;\n      font-weight: bold;\n      line-height: 1;\n      position: relative;\n      top: -0.1rem;\n      display: inline-block;\n      width: 1rem;\n      margin-left: -1.5rem;\n      content: '\\2588';\n    }\n\n    &.china::before {\n      color: $red;\n    }\n    &.eu::before {\n      color: $blue;\n    }\n    &.mexico::before {\n      color: $orange;\n    }\n    &.canada::before {\n      color: $green;\n    }\n  }\n}\n","/**\n * Mixins\n */\n@use 'sass:math';\n@use 'variables' as *;\n// Rem output with px fallback\n\n@function calculateRem($size) {\n  $remSize: math.div($size, $browser-context);\n  @return #{$remSize}rem;\n}\n\n@mixin fontSize($size) {\n  font-size: $size; //Fallback in px\n  font-size: calculateRem($size);\n}\n\n$breakpoint-xlarge: 90em;\n$breakpoint-large: 64em;\n$breakpoint-medium: 48em;\n$breakpoint-small: 35em;\n$breakpoint-xsmall: 25em;\n\n@mixin breakpoint($break) {\n  @if $break == xlarge {\n    @media screen and (min-width: $breakpoint-xlarge) {\n      @content;\n    }\n  } @else if $break == large {\n    @media screen and (min-width: $breakpoint-large) {\n      @content;\n    }\n  } @else if $break == medium {\n    @media screen and (min-width: $breakpoint-medium) {\n      @content;\n    }\n  } @else if $break == small {\n    @media screen and (min-width: $breakpoint-small) {\n      @content;\n    }\n  } @else if $break == xsmall {\n    @media screen and (max-width: $breakpoint-xsmall) {\n      @content;\n    }\n  } @else {\n    @media screen and (min-width: $break) {\n      @content;\n    }\n  }\n}\n\n@mixin wipe-link-background($background-color: $yellow) {\n  background-image: linear-gradient(\n    to top,\n    $background-color 75%,\n    transparent 0%\n  );\n  background-position: unset;\n  background-repeat: repeat-x;\n  background-size: 100% 100%;\n}\n\n@mixin wipe-link-hover-background($background-color: $yellow, $width: 100%) {\n  width: $width;\n  background-image: linear-gradient(\n    transparent calc(20%),\n    $background-color 20%\n  );\n  background-repeat: no-repeat;\n  background-size: 0% 100%;\n  transition: all 0.2s ease-in-out;\n\n  &:hover {\n    background-size: 100% 100%;\n  }\n}\n","/*================================\n=            Tooltips            =\n================================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\n.tooltip,\n.tooltip-info {\n  display: block;\n  @include fontSize(14px);\n  line-height: 1.4;\n  position: absolute;\n  z-index: 20;\n  visibility: hidden;\n  width: fit-content;\n  max-width: 175px;\n  height: auto;\n  margin: 0 15px;\n  padding: 8px 8px 10px;\n  pointer-events: none;\n  opacity: 0;\n  border: 1px solid $disabled-gray;\n  border-radius: 3px;\n  background-color: $white;\n\n  p {\n    margin: 0;\n  }\n\n  .tooltip-heading {\n    text-transform: uppercase;\n    line-height: 1.4;\n    font-weight: bold;\n    margin-bottom: 0.5rem;\n    text-align: center;\n    border-bottom: 1px solid $black;\n\n    @include breakpoint('small') {\n      line-height: 1.4;\n    }\n\n    .location {\n      display: block;\n      @include fontSize(10px);\n      font-style: italic;\n    }\n  }\n\n  .tooltip-label {\n    text-transform: capitalize;\n\n    &.indented {\n      padding-left: 0.75rem;\n    }\n  }\n\n  .tooltip-list {\n    li {\n      @include fontSize(14px);\n\n      &:before {\n        @include fontSize(9px);\n      }\n    }\n\n    .active-category {\n      font-weight: bold;\n    }\n  }\n\n  .tooltip-close {\n    font-weight: bold;\n    position: absolute;\n    z-index: 25;\n    top: 0.25rem;\n    right: 0.5rem;\n    display: block;\n    width: 25%;\n    text-align: right;\n    pointer-events: all;\n\n    @include breakpoint('small') {\n      display: none;\n    }\n  }\n}\n\n.tooltip-info {\n  max-width: 100px;\n\n  @include breakpoint('small') {\n    max-width: 300px;\n  }\n}\n","/*=====================================\n=            Form Elements            =\n=====================================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\n.legend-label {\n  font-family: $font_inconsolata;\n  &:before {\n    display: inline-block;\n    width: 1rem;\n    height: 1rem;\n    margin-right: 0.5rem;\n    content: '';\n    transition: 0.2s;\n    vertical-align: -0.2em;\n    border: 1px solid$black;\n  }\n\n  &.all:before {\n    background-color: $yellow;\n  }\n  &.china:before {\n    background-color: $red;\n  }\n  &.canada:before {\n    background-color: $green;\n  }\n  &.eu:before {\n    background-color: $blue;\n  }\n  &.mexico:before {\n    background-color: $orange;\n  }\n}\n\ninput {\n  @include fontSize(18px);\n  line-height: 1.78;\n  position: absolute;\n  top: 1px;\n  left: 2px;\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  opacity: 0;\n\n  &:not(:checked) {\n    cursor: pointer;\n  }\n\n  &:checked + label::after {\n    font-family: 'tradeguys';\n    font-weight: bold;\n    position: absolute;\n    top: 1px;\n    left: 1px;\n    content: '\\e878';\n    cursor: pointer;\n    color: $black;\n  }\n}\n","/*============================\n=            Chart           =\n============================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\nsection {\n}\n.chart {\n  @media screen and (max-width: 35em) {\n    width: 105%;\n\n    foreignObject div {\n      transform: translateX(-4px);\n    }\n  }\n\n  @include breakpoint('small') {\n    max-width: $size-max-width;\n    margin-left: auto;\n    margin-right: auto;\n  }\n\n  svg {\n    .stateModal {\n      font-family: $font_inconsolata;\n      line-height: 1.6;\n      @include fontSize(12.5px);\n\n      @include breakpoint('small') {\n        @include fontSize(18px);\n      }\n\n      .modal-heading {\n        font-family: $font_source;\n        font-weight: bold;\n        letter-spacing: 1.4px;\n        @include fontSize(16px);\n\n        @include breakpoint('small') {\n          @include fontSize(24px);\n        }\n      }\n\n      ul {\n        li {\n          &:before {\n            @include fontSize(12px);\n          }\n        }\n      }\n    }\n\n    .group {\n      cursor: zoom-in;\n\n      .label {\n        @include fontSize(12px);\n        fill: $black;\n        stroke: $white;\n        paint-order: stroke;\n        stroke-width: 3px;\n        text-transform: uppercase;\n        font-weight: 800;\n        transition: all 0.2s ease-in-out;\n\n        @include breakpoint('small') {\n          @include fontSize(18px);\n        }\n      }\n\n      .state {\n        transition: all 0.2s ease-in-out;\n        @media screen and (max-width: 35em) {\n          stroke-width: 2 !important;\n        }\n      }\n\n      .percent {\n        @media screen and (max-width: 35em) {\n          stroke-width: 0 !important;\n        }\n      }\n\n      &:hover .state {\n        stroke: #eae134;\n      }\n    }\n  }\n}\n\n/*============================\n=          Legend            =\n============================*/\n\n.legend {\n  margin: 24px 12px 12px;\n\n  @include breakpoint('small') {\n    margin: 24px 0 12px;\n  }\n\n  .legend-title {\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    font-family: $font_inconsolata;\n    font-weight: 400;\n    text-transform: uppercase;\n    @include fontSize(14px);\n    letter-spacing: 1.2px;\n  }\n\n  > .direction {\n    -ms-flex-preferred-size: 100%;\n    flex-basis: 100%;\n    font-style: italic;\n    @include fontSize(12px);\n    margin-top: 6px;\n  }\n\n  .container {\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap;\n    -ms-flex-align: center;\n    align-items: center;\n\n    .legend-bar {\n      font-family: $font_inconsolata;\n      line-height: 1.2;\n      position: relative;\n      display: none;\n      padding: 6px;\n      background-color: $white;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n      -ms-flex-align: center;\n      align-items: center;\n\n      @include breakpoint('small') {\n        display: -ms-flexbox;\n        display: flex;\n        margin-left: 36px;\n        width: 100%;\n        -ms-flex: 0 0 224px;\n        flex: 0 0 224px;\n\n        &:before {\n          content: '';\n          display: block;\n          position: absolute;\n          top: 0;\n          left: -24px;\n          width: 1px;\n          height: 120%;\n          background-color: $black;\n        }\n      }\n\n      > div {\n        padding-left: 12px;\n        @include fontSize(16px);\n\n        .min-max {\n          @include fontSize(14px);\n        }\n      }\n    }\n\n    .countries {\n      display: -ms-flexbox;\n      display: flex;\n      -ms-flex-align: center;\n      align-items: center;\n      -ms-flex-wrap: wrap;\n      flex-wrap: wrap;\n\n      @include breakpoint('small') {\n        -ms-flex: 0 0 calc(100% - 300px);\n        flex: 0 0 calc(100% - 300px);\n      }\n\n      .legend-item {\n        @include fontSize(16px);\n        position: relative;\n        display: -ms-flexbox;\n        display: flex;\n        box-sizing: border-box;\n        margin: 0 6px 6px 0;\n        -ms-flex: 1 0 47%;\n        flex: 1 0 47%;\n\n        @include breakpoint('small') {\n          -ms-flex: 1 0 auto;\n          flex: 1 0 auto;\n          margin: 0 6px 0 0;\n        }\n      }\n    }\n  }\n}\n","/*===================================\n=            Page Layout            =\n===================================*/\n@use 'base/mixins' as *;\n@use 'base/variables' as *;\n\nbody {\n  > *:not(.tooltip):not(.chart) {\n    max-width: $size-max-width;\n    margin-left: 12px;\n    margin-right: 12px;\n\n    @include breakpoint('small') {\n      margin-left: auto;\n      margin-right: auto;\n    }\n  }\n\n  .interactive__header {\n    margin: 1rem auto;\n    padding-bottom: 1.25rem;\n    border-bottom: 0;\n\n    .interactive__title {\n      font-family: $font_source;\n      @include fontSize(20px);\n      line-height: 1.36;\n      letter-spacing: 1.4px;\n      color: $black;\n\n      font-weight: bold;\n      text-align: center;\n    }\n\n    p {\n      line-height: 1.78;\n      @include fontSize(16px);\n    }\n  }\n\n  .interactive__filters {\n    margin: 0 auto 1rem;\n\n    .search__suggestions {\n      margin-top: 3px;\n      margin-bottom: 0;\n    }\n  }\n\n  .interactive__graphic {\n    position: relative;\n    max-width: 1250px;\n    margin: 0 auto;\n  }\n\n  .interactive__source {\n    margin-left: auto;\n    margin-right: auto;\n    padding-bottom: 2rem;\n    border-top: 1px solid $black;\n\n    p {\n      margin: 0.5rem 0 0;\n      @include fontSize(14px);\n      font-family: $font-source;\n      color: $gray;\n    }\n  }\n\n  .instructions {\n    font-style: italic;\n    font-size: 0.9rem;\n    margin-top: 6px;\n    border-top: 1px solid $disabled-gray;\n    padding: 0.5rem 0 0;\n    color: $gray;\n    text-align: center;\n\n    span {\n      display: none;\n      @include breakpoint('small') {\n        display: inline-block;\n      }\n    }\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


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
/******/ 		__webpack_require__.h = () => ("794f43427a61f662f4d3")
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
/******/ 	var __webpack_exports__ = __webpack_require__(668);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBTTtBQUNOO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFZTtBQUNmO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFTyxTQUFTLFNBQUc7QUFDbkI7QUFDQTs7QUFFTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsVUFBTSxNQUFNLFNBQUcsRUFBRSxNQUFN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RSxTQUFHLEVBQUUsU0FBRzs7QUFFL0QsSUFBSSxXQUFLO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxtQkFBTSxDQUFDLFdBQUssRUFBRSxXQUFLO0FBQ25CO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLEdBQUc7QUFDSCxPQUFPLHFCQUFlO0FBQ3RCLGFBQWEscUJBQWU7QUFDNUIsYUFBYSxxQkFB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O1VFQUE7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL3NyYy9zY3NzL21haW4uc2Nzcz80YjI3Iiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvYXNjZW5kaW5nLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9iaXNlY3Rvci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvYmlzZWN0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy9leHRlbnQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtYXJyYXkvc3JjL2FycmF5LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy90aWNrcy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvaGlzdG9ncmFtLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWFycmF5L3NyYy90aHJlc2hvbGQvZnJlZWRtYW5EaWFjb25pcy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1hcnJheS9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXREZWNpbWFsLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZXhwb25lbnQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRHcm91cC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdE51bWVyYWxzLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0U3BlY2lmaWVyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHJpbS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2Zvcm1hdFByZWZpeEF1dG8uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9mb3JtYXRSb3VuZGVkLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWZvcm1hdC9zcmMvZm9ybWF0VHlwZXMuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZm9ybWF0L3NyYy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2xvY2FsZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1mb3JtYXQvc3JjL2RlZmF1bHRMb2NhbGUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZHN2L3NyYy9kc3YuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZHN2L3NyYy9jc3YuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZHN2L3NyYy90c3YuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL3RleHQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtZmV0Y2gvc3JjL2Rzdi5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdG9yLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdG9yQWxsLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NlbGVjdEFsbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL21hdGNoZXIuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZmlsdGVyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NwYXJzZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9lbnRlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL2NvbnN0YW50LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2RhdGEuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZXhpdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9qb2luLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL21lcmdlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL29yZGVyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NvcnQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vY2FsbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9ub2Rlcy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9ub2RlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3NpemUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZW1wdHkuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZWFjaC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL25hbWVzcGFjZXMuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9uYW1lc3BhY2UuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXR0ci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3dpbmRvdy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9zdHlsZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9wcm9wZXJ0eS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9jbGFzc2VkLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL3RleHQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaHRtbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yYWlzZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9sb3dlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL2NyZWF0b3IuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vYXBwZW5kLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNlbGVjdGlvbi9zcmMvc2VsZWN0aW9uL2luc2VydC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zZWxlY3Rpb24vc3JjL3NlbGVjdGlvbi9yZW1vdmUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vY2xvbmUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGF0dW0uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vb24uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vZGlzcGF0Y2guanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3Rpb24vaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2VsZWN0aW9uL3NyYy9zZWxlY3RBbGwuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtY29sbGVjdGlvbi9zcmMvbWFwLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWNvbGxlY3Rpb24vc3JjL25lc3QuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtY29sbGVjdGlvbi9zcmMvc2V0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWNvbGxlY3Rpb24vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvaW5pdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvb3JkaW5hbC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvYmFuZC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL2RlZmluZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL2NvbG9yLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9iYXNpcy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvYmFzaXNDbG9zZWQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL2NvbnN0YW50LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9jb2xvci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvcmdiLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9hcnJheS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvZGF0ZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvbnVtYmVyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9vYmplY3QuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3N0cmluZy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvbnVtYmVyQXJyYXkuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3ZhbHVlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWludGVycG9sYXRlL3NyYy9yb3VuZC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvY29uc3RhbnQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL251bWJlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvY29udGludW91cy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvdGlja0Zvcm1hdC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvbGluZWFyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9pZGVudGl0eS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvbmljZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvbG9nLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9zeW1sb2cuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3Bvdy5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvcXVhbnRpbGUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3F1YW50aXplLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy90aHJlc2hvbGQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3RpbWUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3V0Y1RpbWUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3NlcXVlbnRpYWwuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtc2NhbGUvc3JjL3NlcXVlbnRpYWxRdWFudGlsZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1zY2FsZS9zcmMvZGl2ZXJnaW5nLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXNjYWxlL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1kaXNwYXRjaC9zcmMvZGlzcGF0Y2guanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdGltZXIvc3JjL3RpbWVyLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRpbWVyL3NyYy90aW1lb3V0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vc2NoZWR1bGUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvaW50ZXJydXB0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3NlbGVjdGlvbi9pbnRlcnJ1cHQuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9kZWNvbXBvc2UuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtaW50ZXJwb2xhdGUvc3JjL3RyYW5zZm9ybS9wYXJzZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy1pbnRlcnBvbGF0ZS9zcmMvdHJhbnNmb3JtL2luZGV4LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHdlZW4uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9ub2RlX21vZHVsZXMvZDMtY29sb3Ivc3JjL2RlZmluZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL25vZGVfbW9kdWxlcy9kMy1jb2xvci9zcmMvY29sb3IuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9pbnRlcnBvbGF0ZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2F0dHIuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9hdHRyVHdlZW4uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9kZWxheS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2R1cmF0aW9uLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vZWFzZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2ZpbHRlci5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL21lcmdlLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vb24uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9yZW1vdmUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3QuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3RBbGwuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zZWxlY3Rpb24uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi9zdHlsZS5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL3N0eWxlVHdlZW4uanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvdHJhbnNpdGlvbi90ZXh0LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdGV4dFR3ZWVuLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3RyYW5zaXRpb24vdHJhbnNpdGlvbi5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2VuZC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy90cmFuc2l0aW9uL2luZGV4LmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLWVhc2Uvc3JjL2N1YmljLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3NlbGVjdGlvbi90cmFuc2l0aW9uLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vbm9kZV9tb2R1bGVzL2QzLXRyYW5zaXRpb24vc3JjL3NlbGVjdGlvbi9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9kMy10cmFuc2l0aW9uL3NyYy9hY3RpdmUuanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9ub2RlX21vZHVsZXMvZDMtdHJhbnNpdGlvbi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvLi9zcmMvanMvdG9vbHRpcC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL3NyYy9qcy9jaGFydC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL3NyYy9pbmRleC5qcyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzLy4vc3JjL3Njc3MvbWFpbi5zY3NzIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvZ2V0IGphdmFzY3JpcHQgdXBkYXRlIGNodW5rIGZpbGVuYW1lIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9nZXQgbWluaS1jc3MgY2h1bmsgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2dldCB1cGRhdGUgbWFuaWZlc3QgZmlsZW5hbWUiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2dldEZ1bGxIYXNoIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvbG9hZCBzY3JpcHQiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvaG90IG1vZHVsZSByZXBsYWNlbWVudCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvcHVibGljUGF0aCIsIndlYnBhY2s6Ly90YXJpZmYtaW1wYWN0LXN0YXRlcy93ZWJwYWNrL3J1bnRpbWUvY3NzIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL2pzb25wIGNodW5rIGxvYWRpbmciLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svYmVmb3JlLXN0YXJ0dXAiLCJ3ZWJwYWNrOi8vdGFyaWZmLWltcGFjdC1zdGF0ZXMvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL3RhcmlmZi1pbXBhY3Qtc3RhdGVzL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBzdHlsZXNJbkRPTSA9IFtdO1xuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuICAgIGlmIChpbmRleEJ5SWRlbnRpZmllciAhPT0gLTEpIHtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS5yZWZlcmVuY2VzKys7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0udXBkYXRlcihvYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgdXBkYXRlciA9IGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5ieUluZGV4ID0gaTtcbiAgICAgIHN0eWxlc0luRE9NLnNwbGljZShpLCAwLCB7XG4gICAgICAgIGlkZW50aWZpZXI6IGlkZW50aWZpZXIsXG4gICAgICAgIHVwZGF0ZXI6IHVwZGF0ZXIsXG4gICAgICAgIHJlZmVyZW5jZXM6IDFcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cbmZ1bmN0aW9uIGFkZEVsZW1lbnRTdHlsZShvYmosIG9wdGlvbnMpIHtcbiAgdmFyIGFwaSA9IG9wdGlvbnMuZG9tQVBJKG9wdGlvbnMpO1xuICBhcGkudXBkYXRlKG9iaik7XG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIHVwZGF0ZXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cbiAgICB2YXIgbmV3TGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKG5ld0xpc3QsIG9wdGlvbnMpO1xuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcbiAgICAgIGlmIChzdHlsZXNJbkRPTVtfaW5kZXhdLnJlZmVyZW5jZXMgPT09IDApIHtcbiAgICAgICAgc3R5bGVzSW5ET01bX2luZGV4XS51cGRhdGVyKCk7XG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIHN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50KSB7XG4gIGlmIChzdHlsZUVsZW1lbnQuc3R5bGVTaGVldCkge1xuICAgIHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG4gIH0gZWxzZSB7XG4gICAgd2hpbGUgKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKSB7XG4gICAgICBzdHlsZUVsZW1lbnQucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgaWYgKCFvcHRpb25zKSB7XG4gICAgb3B0aW9ucyA9IHt9O1xuICB9XG4gIGlmICghdXJsKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuICB1cmwgPSBTdHJpbmcodXJsLl9fZXNNb2R1bGUgPyB1cmwuZGVmYXVsdCA6IHVybCk7XG5cbiAgLy8gSWYgdXJsIGlzIGFscmVhZHkgd3JhcHBlZCBpbiBxdW90ZXMsIHJlbW92ZSB0aGVtXG4gIGlmICgvXlsnXCJdLipbJ1wiXSQvLnRlc3QodXJsKSkge1xuICAgIHVybCA9IHVybC5zbGljZSgxLCAtMSk7XG4gIH1cbiAgaWYgKG9wdGlvbnMuaGFzaCkge1xuICAgIHVybCArPSBvcHRpb25zLmhhc2g7XG4gIH1cblxuICAvLyBTaG91bGQgdXJsIGJlIHdyYXBwZWQ/XG4gIC8vIFNlZSBodHRwczovL2RyYWZ0cy5jc3N3Zy5vcmcvY3NzLXZhbHVlcy0zLyN1cmxzXG4gIGlmICgvW1wiJygpIFxcdFxcbl18KCUyMCkvLnRlc3QodXJsKSB8fCBvcHRpb25zLm5lZWRRdW90ZXMpIHtcbiAgICByZXR1cm4gXCJcXFwiXCIuY29uY2F0KHVybC5yZXBsYWNlKC9cIi9nLCAnXFxcXFwiJykucmVwbGFjZSgvXFxuL2csIFwiXFxcXG5cIiksIFwiXFxcIlwiKTtcbiAgfVxuICByZXR1cm4gdXJsO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVsxXSEuLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvZGlzdC9janMuanMhLi4vLi4vbm9kZV9tb2R1bGVzL3Nhc3MtbG9hZGVyL2Rpc3QvY2pzLmpzPz9ydWxlU2V0WzFdLnJ1bGVzWzFdLnVzZVszXSEuL21haW4uc2Nzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xuXG4gICAgICBvcHRpb25zLmluc2VydCA9IGluc2VydEZuLmJpbmQobnVsbCwgXCJoZWFkXCIpO1xuICAgIFxub3B0aW9ucy5kb21BUEkgPSBkb21BUEk7XG5vcHRpb25zLmluc2VydFN0eWxlRWxlbWVudCA9IGluc2VydFN0eWxlRWxlbWVudDtcblxudmFyIHVwZGF0ZSA9IEFQSShjb250ZW50LCBvcHRpb25zKTtcblxuXG5pZiAobW9kdWxlLmhvdCkge1xuICBpZiAoIWNvbnRlbnQubG9jYWxzIHx8IG1vZHVsZS5ob3QuaW52YWxpZGF0ZSkge1xuICAgIHZhciBpc0VxdWFsTG9jYWxzID0gZnVuY3Rpb24gaXNFcXVhbExvY2FscyhhLCBiLCBpc05hbWVkRXhwb3J0KSB7XG4gIGlmICghYSAmJiBiIHx8IGEgJiYgIWIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgdmFyIHA7XG4gIGZvciAocCBpbiBhKSB7XG4gICAgaWYgKGlzTmFtZWRFeHBvcnQgJiYgcCA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChhW3BdICE9PSBiW3BdKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG4gIGZvciAocCBpbiBiKSB7XG4gICAgaWYgKGlzTmFtZWRFeHBvcnQgJiYgcCA9PT0gXCJkZWZhdWx0XCIpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb250aW51ZVxuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmICghYVtwXSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4gdHJ1ZTtcbn07XG4gICAgdmFyIGlzTmFtZWRFeHBvcnQgPSAhY29udGVudC5sb2NhbHM7XG4gICAgdmFyIG9sZExvY2FscyA9IGlzTmFtZWRFeHBvcnQgPyBuYW1lZEV4cG9ydCA6IGNvbnRlbnQubG9jYWxzO1xuXG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXG4gICAgICBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCIsXG4gICAgICBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghaXNFcXVhbExvY2FscyhvbGRMb2NhbHMsIGlzTmFtZWRFeHBvcnQgPyBuYW1lZEV4cG9ydCA6IGNvbnRlbnQubG9jYWxzLCBpc05hbWVkRXhwb3J0KSkge1xuICAgICAgICAgICAgICAgIG1vZHVsZS5ob3QuaW52YWxpZGF0ZSgpO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgb2xkTG9jYWxzID0gaXNOYW1lZEV4cG9ydCA/IG5hbWVkRXhwb3J0IDogY29udGVudC5sb2NhbHM7XG5cbiAgICAgICAgICAgICAgdXBkYXRlKGNvbnRlbnQpO1xuICAgICAgfVxuICAgIClcbiAgfVxuXG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHtcbiAgICB1cGRhdGUoKTtcbiAgfSk7XG59XG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzFdIS4uLy4uL25vZGVfbW9kdWxlcy9wb3N0Y3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuLi8uLi9ub2RlX21vZHVsZXMvc2Fzcy1sb2FkZXIvZGlzdC9janMuanM/P3J1bGVTZXRbMV0ucnVsZXNbMV0udXNlWzNdIS4vbWFpbi5zY3NzXCI7XG4gICAgICAgZXhwb3J0IGRlZmF1bHQgY29udGVudCAmJiBjb250ZW50LmxvY2FscyA/IGNvbnRlbnQubG9jYWxzIDogdW5kZWZpbmVkO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0U3R5bGVFbGVtZW50OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG5cbiAgICAvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cbiAgcmV0dXJuIG1lbW9bdGFyZ2V0XTtcbn1cblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cbiAgdGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcbn1cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsImltcG9ydCBhc2NlbmRpbmcgZnJvbSBcIi4vYXNjZW5kaW5nXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGNvbXBhcmUpIHtcbiAgaWYgKGNvbXBhcmUubGVuZ3RoID09PSAxKSBjb21wYXJlID0gYXNjZW5kaW5nQ29tcGFyYXRvcihjb21wYXJlKTtcbiAgcmV0dXJuIHtcbiAgICBsZWZ0OiBmdW5jdGlvbihhLCB4LCBsbywgaGkpIHtcbiAgICAgIGlmIChsbyA9PSBudWxsKSBsbyA9IDA7XG4gICAgICBpZiAoaGkgPT0gbnVsbCkgaGkgPSBhLmxlbmd0aDtcbiAgICAgIHdoaWxlIChsbyA8IGhpKSB7XG4gICAgICAgIHZhciBtaWQgPSBsbyArIGhpID4+PiAxO1xuICAgICAgICBpZiAoY29tcGFyZShhW21pZF0sIHgpIDwgMCkgbG8gPSBtaWQgKyAxO1xuICAgICAgICBlbHNlIGhpID0gbWlkO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGxvO1xuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGEsIHgsIGxvLCBoaSkge1xuICAgICAgaWYgKGxvID09IG51bGwpIGxvID0gMDtcbiAgICAgIGlmIChoaSA9PSBudWxsKSBoaSA9IGEubGVuZ3RoO1xuICAgICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgICAgdmFyIG1pZCA9IGxvICsgaGkgPj4+IDE7XG4gICAgICAgIGlmIChjb21wYXJlKGFbbWlkXSwgeCkgPiAwKSBoaSA9IG1pZDtcbiAgICAgICAgZWxzZSBsbyA9IG1pZCArIDE7XG4gICAgICB9XG4gICAgICByZXR1cm4gbG87XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBhc2NlbmRpbmdDb21wYXJhdG9yKGYpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGQsIHgpIHtcbiAgICByZXR1cm4gYXNjZW5kaW5nKGYoZCksIHgpO1xuICB9O1xufVxuIiwiaW1wb3J0IGFzY2VuZGluZyBmcm9tIFwiLi9hc2NlbmRpbmdcIjtcbmltcG9ydCBiaXNlY3RvciBmcm9tIFwiLi9iaXNlY3RvclwiO1xuXG52YXIgYXNjZW5kaW5nQmlzZWN0ID0gYmlzZWN0b3IoYXNjZW5kaW5nKTtcbmV4cG9ydCB2YXIgYmlzZWN0UmlnaHQgPSBhc2NlbmRpbmdCaXNlY3QucmlnaHQ7XG5leHBvcnQgdmFyIGJpc2VjdExlZnQgPSBhc2NlbmRpbmdCaXNlY3QubGVmdDtcbmV4cG9ydCBkZWZhdWx0IGJpc2VjdFJpZ2h0O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzLCB2YWx1ZW9mKSB7XG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aCxcbiAgICAgIGkgPSAtMSxcbiAgICAgIHZhbHVlLFxuICAgICAgbWluLFxuICAgICAgbWF4O1xuXG4gIGlmICh2YWx1ZW9mID09IG51bGwpIHtcbiAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBGaW5kIHRoZSBmaXJzdCBjb21wYXJhYmxlIHZhbHVlLlxuICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlc1tpXSkgIT0gbnVsbCAmJiB2YWx1ZSA+PSB2YWx1ZSkge1xuICAgICAgICBtaW4gPSBtYXggPSB2YWx1ZTtcbiAgICAgICAgd2hpbGUgKCsraSA8IG4pIHsgLy8gQ29tcGFyZSB0aGUgcmVtYWluaW5nIHZhbHVlcy5cbiAgICAgICAgICBpZiAoKHZhbHVlID0gdmFsdWVzW2ldKSAhPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobWluID4gdmFsdWUpIG1pbiA9IHZhbHVlO1xuICAgICAgICAgICAgaWYgKG1heCA8IHZhbHVlKSBtYXggPSB2YWx1ZTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBlbHNlIHtcbiAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBGaW5kIHRoZSBmaXJzdCBjb21wYXJhYmxlIHZhbHVlLlxuICAgICAgaWYgKCh2YWx1ZSA9IHZhbHVlb2YodmFsdWVzW2ldLCBpLCB2YWx1ZXMpKSAhPSBudWxsICYmIHZhbHVlID49IHZhbHVlKSB7XG4gICAgICAgIG1pbiA9IG1heCA9IHZhbHVlO1xuICAgICAgICB3aGlsZSAoKytpIDwgbikgeyAvLyBDb21wYXJlIHRoZSByZW1haW5pbmcgdmFsdWVzLlxuICAgICAgICAgIGlmICgodmFsdWUgPSB2YWx1ZW9mKHZhbHVlc1tpXSwgaSwgdmFsdWVzKSkgIT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKG1pbiA+IHZhbHVlKSBtaW4gPSB2YWx1ZTtcbiAgICAgICAgICAgIGlmIChtYXggPCB2YWx1ZSkgbWF4ID0gdmFsdWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIFttaW4sIG1heF07XG59XG4iLCJ2YXIgYXJyYXkgPSBBcnJheS5wcm90b3R5cGU7XG5cbmV4cG9ydCB2YXIgc2xpY2UgPSBhcnJheS5zbGljZTtcbmV4cG9ydCB2YXIgbWFwID0gYXJyYXkubWFwO1xuIiwidmFyIGUxMCA9IE1hdGguc3FydCg1MCksXG4gICAgZTUgPSBNYXRoLnNxcnQoMTApLFxuICAgIGUyID0gTWF0aC5zcXJ0KDIpO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGFydCwgc3RvcCwgY291bnQpIHtcbiAgdmFyIHJldmVyc2UsXG4gICAgICBpID0gLTEsXG4gICAgICBuLFxuICAgICAgdGlja3MsXG4gICAgICBzdGVwO1xuXG4gIHN0b3AgPSArc3RvcCwgc3RhcnQgPSArc3RhcnQsIGNvdW50ID0gK2NvdW50O1xuICBpZiAoc3RhcnQgPT09IHN0b3AgJiYgY291bnQgPiAwKSByZXR1cm4gW3N0YXJ0XTtcbiAgaWYgKHJldmVyc2UgPSBzdG9wIDwgc3RhcnQpIG4gPSBzdGFydCwgc3RhcnQgPSBzdG9wLCBzdG9wID0gbjtcbiAgaWYgKChzdGVwID0gdGlja0luY3JlbWVudChzdGFydCwgc3RvcCwgY291bnQpKSA9PT0gMCB8fCAhaXNGaW5pdGUoc3RlcCkpIHJldHVybiBbXTtcblxuICBpZiAoc3RlcCA+IDApIHtcbiAgICBzdGFydCA9IE1hdGguY2VpbChzdGFydCAvIHN0ZXApO1xuICAgIHN0b3AgPSBNYXRoLmZsb29yKHN0b3AgLyBzdGVwKTtcbiAgICB0aWNrcyA9IG5ldyBBcnJheShuID0gTWF0aC5jZWlsKHN0b3AgLSBzdGFydCArIDEpKTtcbiAgICB3aGlsZSAoKytpIDwgbikgdGlja3NbaV0gPSAoc3RhcnQgKyBpKSAqIHN0ZXA7XG4gIH0gZWxzZSB7XG4gICAgc3RhcnQgPSBNYXRoLmZsb29yKHN0YXJ0ICogc3RlcCk7XG4gICAgc3RvcCA9IE1hdGguY2VpbChzdG9wICogc3RlcCk7XG4gICAgdGlja3MgPSBuZXcgQXJyYXkobiA9IE1hdGguY2VpbChzdGFydCAtIHN0b3AgKyAxKSk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHRpY2tzW2ldID0gKHN0YXJ0IC0gaSkgLyBzdGVwO1xuICB9XG5cbiAgaWYgKHJldmVyc2UpIHRpY2tzLnJldmVyc2UoKTtcblxuICByZXR1cm4gdGlja3M7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcCA9IChzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgcG93ZXIgPSBNYXRoLmZsb29yKE1hdGgubG9nKHN0ZXApIC8gTWF0aC5MTjEwKSxcbiAgICAgIGVycm9yID0gc3RlcCAvIE1hdGgucG93KDEwLCBwb3dlcik7XG4gIHJldHVybiBwb3dlciA+PSAwXG4gICAgICA/IChlcnJvciA+PSBlMTAgPyAxMCA6IGVycm9yID49IGU1ID8gNSA6IGVycm9yID49IGUyID8gMiA6IDEpICogTWF0aC5wb3coMTAsIHBvd2VyKVxuICAgICAgOiAtTWF0aC5wb3coMTAsIC1wb3dlcikgLyAoZXJyb3IgPj0gZTEwID8gMTAgOiBlcnJvciA+PSBlNSA/IDUgOiBlcnJvciA+PSBlMiA/IDIgOiAxKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpY2tTdGVwKHN0YXJ0LCBzdG9wLCBjb3VudCkge1xuICB2YXIgc3RlcDAgPSBNYXRoLmFicyhzdG9wIC0gc3RhcnQpIC8gTWF0aC5tYXgoMCwgY291bnQpLFxuICAgICAgc3RlcDEgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihNYXRoLmxvZyhzdGVwMCkgLyBNYXRoLkxOMTApKSxcbiAgICAgIGVycm9yID0gc3RlcDAgLyBzdGVwMTtcbiAgaWYgKGVycm9yID49IGUxMCkgc3RlcDEgKj0gMTA7XG4gIGVsc2UgaWYgKGVycm9yID49IGU1KSBzdGVwMSAqPSA1O1xuICBlbHNlIGlmIChlcnJvciA+PSBlMikgc3RlcDEgKj0gMjtcbiAgcmV0dXJuIHN0b3AgPCBzdGFydCA/IC1zdGVwMSA6IHN0ZXAxO1xufVxuIiwiaW1wb3J0IHtzbGljZX0gZnJvbSBcIi4vYXJyYXlcIjtcbmltcG9ydCBiaXNlY3QgZnJvbSBcIi4vYmlzZWN0XCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnRcIjtcbmltcG9ydCBleHRlbnQgZnJvbSBcIi4vZXh0ZW50XCI7XG5pbXBvcnQgaWRlbnRpdHkgZnJvbSBcIi4vaWRlbnRpdHlcIjtcbmltcG9ydCByYW5nZSBmcm9tIFwiLi9yYW5nZVwiO1xuaW1wb3J0IHt0aWNrU3RlcH0gZnJvbSBcIi4vdGlja3NcIjtcbmltcG9ydCBzdHVyZ2VzIGZyb20gXCIuL3RocmVzaG9sZC9zdHVyZ2VzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgdmFsdWUgPSBpZGVudGl0eSxcbiAgICAgIGRvbWFpbiA9IGV4dGVudCxcbiAgICAgIHRocmVzaG9sZCA9IHN0dXJnZXM7XG5cbiAgZnVuY3Rpb24gaGlzdG9ncmFtKGRhdGEpIHtcbiAgICB2YXIgaSxcbiAgICAgICAgbiA9IGRhdGEubGVuZ3RoLFxuICAgICAgICB4LFxuICAgICAgICB2YWx1ZXMgPSBuZXcgQXJyYXkobik7XG5cbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICB2YWx1ZXNbaV0gPSB2YWx1ZShkYXRhW2ldLCBpLCBkYXRhKTtcbiAgICB9XG5cbiAgICB2YXIgeHogPSBkb21haW4odmFsdWVzKSxcbiAgICAgICAgeDAgPSB4elswXSxcbiAgICAgICAgeDEgPSB4elsxXSxcbiAgICAgICAgdHogPSB0aHJlc2hvbGQodmFsdWVzLCB4MCwgeDEpO1xuXG4gICAgLy8gQ29udmVydCBudW1iZXIgb2YgdGhyZXNob2xkcyBpbnRvIHVuaWZvcm0gdGhyZXNob2xkcy5cbiAgICBpZiAoIUFycmF5LmlzQXJyYXkodHopKSB7XG4gICAgICB0eiA9IHRpY2tTdGVwKHgwLCB4MSwgdHopO1xuICAgICAgdHogPSByYW5nZShNYXRoLmNlaWwoeDAgLyB0eikgKiB0eiwgeDEsIHR6KTsgLy8gZXhjbHVzaXZlXG4gICAgfVxuXG4gICAgLy8gUmVtb3ZlIGFueSB0aHJlc2hvbGRzIG91dHNpZGUgdGhlIGRvbWFpbi5cbiAgICB2YXIgbSA9IHR6Lmxlbmd0aDtcbiAgICB3aGlsZSAodHpbMF0gPD0geDApIHR6LnNoaWZ0KCksIC0tbTtcbiAgICB3aGlsZSAodHpbbSAtIDFdID4geDEpIHR6LnBvcCgpLCAtLW07XG5cbiAgICB2YXIgYmlucyA9IG5ldyBBcnJheShtICsgMSksXG4gICAgICAgIGJpbjtcblxuICAgIC8vIEluaXRpYWxpemUgYmlucy5cbiAgICBmb3IgKGkgPSAwOyBpIDw9IG07ICsraSkge1xuICAgICAgYmluID0gYmluc1tpXSA9IFtdO1xuICAgICAgYmluLngwID0gaSA+IDAgPyB0eltpIC0gMV0gOiB4MDtcbiAgICAgIGJpbi54MSA9IGkgPCBtID8gdHpbaV0gOiB4MTtcbiAgICB9XG5cbiAgICAvLyBBc3NpZ24gZGF0YSB0byBiaW5zIGJ5IHZhbHVlLCBpZ25vcmluZyBhbnkgb3V0c2lkZSB0aGUgZG9tYWluLlxuICAgIGZvciAoaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIHggPSB2YWx1ZXNbaV07XG4gICAgICBpZiAoeDAgPD0geCAmJiB4IDw9IHgxKSB7XG4gICAgICAgIGJpbnNbYmlzZWN0KHR6LCB4LCAwLCBtKV0ucHVzaChkYXRhW2ldKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gYmlucztcbiAgfVxuXG4gIGhpc3RvZ3JhbS52YWx1ZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh2YWx1ZSA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoXyksIGhpc3RvZ3JhbSkgOiB2YWx1ZTtcbiAgfTtcblxuICBoaXN0b2dyYW0uZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGRvbWFpbiA9IHR5cGVvZiBfID09PSBcImZ1bmN0aW9uXCIgPyBfIDogY29uc3RhbnQoW19bMF0sIF9bMV1dKSwgaGlzdG9ncmFtKSA6IGRvbWFpbjtcbiAgfTtcblxuICBoaXN0b2dyYW0udGhyZXNob2xkcyA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0aHJlc2hvbGQgPSB0eXBlb2YgXyA9PT0gXCJmdW5jdGlvblwiID8gXyA6IEFycmF5LmlzQXJyYXkoXykgPyBjb25zdGFudChzbGljZS5jYWxsKF8pKSA6IGNvbnN0YW50KF8pLCBoaXN0b2dyYW0pIDogdGhyZXNob2xkO1xuICB9O1xuXG4gIHJldHVybiBoaXN0b2dyYW07XG59XG4iLCJpbXBvcnQge21hcH0gZnJvbSBcIi4uL2FycmF5XCI7XG5pbXBvcnQgYXNjZW5kaW5nIGZyb20gXCIuLi9hc2NlbmRpbmdcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4uL251bWJlclwiO1xuaW1wb3J0IHF1YW50aWxlIGZyb20gXCIuLi9xdWFudGlsZVwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZXMsIG1pbiwgbWF4KSB7XG4gIHZhbHVlcyA9IG1hcC5jYWxsKHZhbHVlcywgbnVtYmVyKS5zb3J0KGFzY2VuZGluZyk7XG4gIHJldHVybiBNYXRoLmNlaWwoKG1heCAtIG1pbikgLyAoMiAqIChxdWFudGlsZSh2YWx1ZXMsIDAuNzUpIC0gcXVhbnRpbGUodmFsdWVzLCAwLjI1KSkgKiBNYXRoLnBvdyh2YWx1ZXMubGVuZ3RoLCAtMSAvIDMpKSk7XG59XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgYmlzZWN0LCBiaXNlY3RSaWdodCwgYmlzZWN0TGVmdH0gZnJvbSBcIi4vYmlzZWN0XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgYXNjZW5kaW5nfSBmcm9tIFwiLi9hc2NlbmRpbmdcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBiaXNlY3Rvcn0gZnJvbSBcIi4vYmlzZWN0b3JcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBjcm9zc30gZnJvbSBcIi4vY3Jvc3NcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBkZXNjZW5kaW5nfSBmcm9tIFwiLi9kZXNjZW5kaW5nXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgZGV2aWF0aW9ufSBmcm9tIFwiLi9kZXZpYXRpb25cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBleHRlbnR9IGZyb20gXCIuL2V4dGVudFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGhpc3RvZ3JhbX0gZnJvbSBcIi4vaGlzdG9ncmFtXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdGhyZXNob2xkRnJlZWRtYW5EaWFjb25pc30gZnJvbSBcIi4vdGhyZXNob2xkL2ZyZWVkbWFuRGlhY29uaXNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0aHJlc2hvbGRTY290dH0gZnJvbSBcIi4vdGhyZXNob2xkL3Njb3R0XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdGhyZXNob2xkU3R1cmdlc30gZnJvbSBcIi4vdGhyZXNob2xkL3N0dXJnZXNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtYXh9IGZyb20gXCIuL21heFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1lYW59IGZyb20gXCIuL21lYW5cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBtZWRpYW59IGZyb20gXCIuL21lZGlhblwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1lcmdlfSBmcm9tIFwiLi9tZXJnZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIG1pbn0gZnJvbSBcIi4vbWluXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcGFpcnN9IGZyb20gXCIuL3BhaXJzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgcGVybXV0ZX0gZnJvbSBcIi4vcGVybXV0ZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHF1YW50aWxlfSBmcm9tIFwiLi9xdWFudGlsZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHJhbmdlfSBmcm9tIFwiLi9yYW5nZVwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNjYW59IGZyb20gXCIuL3NjYW5cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBzaHVmZmxlfSBmcm9tIFwiLi9zaHVmZmxlXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgc3VtfSBmcm9tIFwiLi9zdW1cIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB0aWNrcywgdGlja0luY3JlbWVudCwgdGlja1N0ZXB9IGZyb20gXCIuL3RpY2tzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdHJhbnNwb3NlfSBmcm9tIFwiLi90cmFuc3Bvc2VcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB2YXJpYW5jZX0gZnJvbSBcIi4vdmFyaWFuY2VcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyB6aXB9IGZyb20gXCIuL3ppcFwiO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gTWF0aC5hYnMoeCA9IE1hdGgucm91bmQoeCkpID49IDFlMjFcbiAgICAgID8geC50b0xvY2FsZVN0cmluZyhcImVuXCIpLnJlcGxhY2UoLywvZywgXCJcIilcbiAgICAgIDogeC50b1N0cmluZygxMCk7XG59XG5cbi8vIENvbXB1dGVzIHRoZSBkZWNpbWFsIGNvZWZmaWNpZW50IGFuZCBleHBvbmVudCBvZiB0aGUgc3BlY2lmaWVkIG51bWJlciB4IHdpdGhcbi8vIHNpZ25pZmljYW50IGRpZ2l0cyBwLCB3aGVyZSB4IGlzIHBvc2l0aXZlIGFuZCBwIGlzIGluIFsxLCAyMV0gb3IgdW5kZWZpbmVkLlxuLy8gRm9yIGV4YW1wbGUsIGZvcm1hdERlY2ltYWxQYXJ0cygxLjIzKSByZXR1cm5zIFtcIjEyM1wiLCAwXS5cbmV4cG9ydCBmdW5jdGlvbiBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCkge1xuICBpZiAoKGkgPSAoeCA9IHAgPyB4LnRvRXhwb25lbnRpYWwocCAtIDEpIDogeC50b0V4cG9uZW50aWFsKCkpLmluZGV4T2YoXCJlXCIpKSA8IDApIHJldHVybiBudWxsOyAvLyBOYU4sIMKxSW5maW5pdHlcbiAgdmFyIGksIGNvZWZmaWNpZW50ID0geC5zbGljZSgwLCBpKTtcblxuICAvLyBUaGUgc3RyaW5nIHJldHVybmVkIGJ5IHRvRXhwb25lbnRpYWwgZWl0aGVyIGhhcyB0aGUgZm9ybSBcXGRcXC5cXGQrZVstK11cXGQrXG4gIC8vIChlLmcuLCAxLjJlKzMpIG9yIHRoZSBmb3JtIFxcZGVbLStdXFxkKyAoZS5nLiwgMWUrMykuXG4gIHJldHVybiBbXG4gICAgY29lZmZpY2llbnQubGVuZ3RoID4gMSA/IGNvZWZmaWNpZW50WzBdICsgY29lZmZpY2llbnQuc2xpY2UoMikgOiBjb2VmZmljaWVudCxcbiAgICAreC5zbGljZShpICsgMSlcbiAgXTtcbn1cbiIsImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgpIHtcbiAgcmV0dXJuIHggPSBmb3JtYXREZWNpbWFsUGFydHMoTWF0aC5hYnMoeCkpLCB4ID8geFsxXSA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGdyb3VwaW5nLCB0aG91c2FuZHMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlLCB3aWR0aCkge1xuICAgIHZhciBpID0gdmFsdWUubGVuZ3RoLFxuICAgICAgICB0ID0gW10sXG4gICAgICAgIGogPSAwLFxuICAgICAgICBnID0gZ3JvdXBpbmdbMF0sXG4gICAgICAgIGxlbmd0aCA9IDA7XG5cbiAgICB3aGlsZSAoaSA+IDAgJiYgZyA+IDApIHtcbiAgICAgIGlmIChsZW5ndGggKyBnICsgMSA+IHdpZHRoKSBnID0gTWF0aC5tYXgoMSwgd2lkdGggLSBsZW5ndGgpO1xuICAgICAgdC5wdXNoKHZhbHVlLnN1YnN0cmluZyhpIC09IGcsIGkgKyBnKSk7XG4gICAgICBpZiAoKGxlbmd0aCArPSBnICsgMSkgPiB3aWR0aCkgYnJlYWs7XG4gICAgICBnID0gZ3JvdXBpbmdbaiA9IChqICsgMSkgJSBncm91cGluZy5sZW5ndGhdO1xuICAgIH1cblxuICAgIHJldHVybiB0LnJldmVyc2UoKS5qb2luKHRob3VzYW5kcyk7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihudW1lcmFscykge1xuICByZXR1cm4gZnVuY3Rpb24odmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvWzAtOV0vZywgZnVuY3Rpb24oaSkge1xuICAgICAgcmV0dXJuIG51bWVyYWxzWytpXTtcbiAgICB9KTtcbiAgfTtcbn1cbiIsIi8vIFtbZmlsbF1hbGlnbl1bc2lnbl1bc3ltYm9sXVswXVt3aWR0aF1bLF1bLnByZWNpc2lvbl1bfl1bdHlwZV1cbnZhciByZSA9IC9eKD86KC4pPyhbPD49Xl0pKT8oWytcXC0oIF0pPyhbJCNdKT8oMCk/KFxcZCspPygsKT8oXFwuXFxkKyk/KH4pPyhbYS16JV0pPyQvaTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcikge1xuICBpZiAoIShtYXRjaCA9IHJlLmV4ZWMoc3BlY2lmaWVyKSkpIHRocm93IG5ldyBFcnJvcihcImludmFsaWQgZm9ybWF0OiBcIiArIHNwZWNpZmllcik7XG4gIHZhciBtYXRjaDtcbiAgcmV0dXJuIG5ldyBGb3JtYXRTcGVjaWZpZXIoe1xuICAgIGZpbGw6IG1hdGNoWzFdLFxuICAgIGFsaWduOiBtYXRjaFsyXSxcbiAgICBzaWduOiBtYXRjaFszXSxcbiAgICBzeW1ib2w6IG1hdGNoWzRdLFxuICAgIHplcm86IG1hdGNoWzVdLFxuICAgIHdpZHRoOiBtYXRjaFs2XSxcbiAgICBjb21tYTogbWF0Y2hbN10sXG4gICAgcHJlY2lzaW9uOiBtYXRjaFs4XSAmJiBtYXRjaFs4XS5zbGljZSgxKSxcbiAgICB0cmltOiBtYXRjaFs5XSxcbiAgICB0eXBlOiBtYXRjaFsxMF1cbiAgfSk7XG59XG5cbmZvcm1hdFNwZWNpZmllci5wcm90b3R5cGUgPSBGb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlOyAvLyBpbnN0YW5jZW9mXG5cbmV4cG9ydCBmdW5jdGlvbiBGb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSB7XG4gIHRoaXMuZmlsbCA9IHNwZWNpZmllci5maWxsID09PSB1bmRlZmluZWQgPyBcIiBcIiA6IHNwZWNpZmllci5maWxsICsgXCJcIjtcbiAgdGhpcy5hbGlnbiA9IHNwZWNpZmllci5hbGlnbiA9PT0gdW5kZWZpbmVkID8gXCI+XCIgOiBzcGVjaWZpZXIuYWxpZ24gKyBcIlwiO1xuICB0aGlzLnNpZ24gPSBzcGVjaWZpZXIuc2lnbiA9PT0gdW5kZWZpbmVkID8gXCItXCIgOiBzcGVjaWZpZXIuc2lnbiArIFwiXCI7XG4gIHRoaXMuc3ltYm9sID0gc3BlY2lmaWVyLnN5bWJvbCA9PT0gdW5kZWZpbmVkID8gXCJcIiA6IHNwZWNpZmllci5zeW1ib2wgKyBcIlwiO1xuICB0aGlzLnplcm8gPSAhIXNwZWNpZmllci56ZXJvO1xuICB0aGlzLndpZHRoID0gc3BlY2lmaWVyLndpZHRoID09PSB1bmRlZmluZWQgPyB1bmRlZmluZWQgOiArc3BlY2lmaWVyLndpZHRoO1xuICB0aGlzLmNvbW1hID0gISFzcGVjaWZpZXIuY29tbWE7XG4gIHRoaXMucHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbiA9PT0gdW5kZWZpbmVkID8gdW5kZWZpbmVkIDogK3NwZWNpZmllci5wcmVjaXNpb247XG4gIHRoaXMudHJpbSA9ICEhc3BlY2lmaWVyLnRyaW07XG4gIHRoaXMudHlwZSA9IHNwZWNpZmllci50eXBlID09PSB1bmRlZmluZWQgPyBcIlwiIDogc3BlY2lmaWVyLnR5cGUgKyBcIlwiO1xufVxuXG5Gb3JtYXRTcGVjaWZpZXIucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmZpbGxcbiAgICAgICsgdGhpcy5hbGlnblxuICAgICAgKyB0aGlzLnNpZ25cbiAgICAgICsgdGhpcy5zeW1ib2xcbiAgICAgICsgKHRoaXMuemVybyA/IFwiMFwiIDogXCJcIilcbiAgICAgICsgKHRoaXMud2lkdGggPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBNYXRoLm1heCgxLCB0aGlzLndpZHRoIHwgMCkpXG4gICAgICArICh0aGlzLmNvbW1hID8gXCIsXCIgOiBcIlwiKVxuICAgICAgKyAodGhpcy5wcmVjaXNpb24gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBcIi5cIiArIE1hdGgubWF4KDAsIHRoaXMucHJlY2lzaW9uIHwgMCkpXG4gICAgICArICh0aGlzLnRyaW0gPyBcIn5cIiA6IFwiXCIpXG4gICAgICArIHRoaXMudHlwZTtcbn07XG4iLCIvLyBUcmltcyBpbnNpZ25pZmljYW50IHplcm9zLCBlLmcuLCByZXBsYWNlcyAxLjIwMDBrIHdpdGggMS4yay5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHMpIHtcbiAgb3V0OiBmb3IgKHZhciBuID0gcy5sZW5ndGgsIGkgPSAxLCBpMCA9IC0xLCBpMTsgaSA8IG47ICsraSkge1xuICAgIHN3aXRjaCAoc1tpXSkge1xuICAgICAgY2FzZSBcIi5cIjogaTAgPSBpMSA9IGk7IGJyZWFrO1xuICAgICAgY2FzZSBcIjBcIjogaWYgKGkwID09PSAwKSBpMCA9IGk7IGkxID0gaTsgYnJlYWs7XG4gICAgICBkZWZhdWx0OiBpZiAoIStzW2ldKSBicmVhayBvdXQ7IGlmIChpMCA+IDApIGkwID0gMDsgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBpMCA+IDAgPyBzLnNsaWNlKDAsIGkwKSArIHMuc2xpY2UoaTEgKyAxKSA6IHM7XG59XG4iLCJpbXBvcnQge2Zvcm1hdERlY2ltYWxQYXJ0c30gZnJvbSBcIi4vZm9ybWF0RGVjaW1hbC5qc1wiO1xuXG5leHBvcnQgdmFyIHByZWZpeEV4cG9uZW50O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4LCBwKSB7XG4gIHZhciBkID0gZm9ybWF0RGVjaW1hbFBhcnRzKHgsIHApO1xuICBpZiAoIWQpIHJldHVybiB4ICsgXCJcIjtcbiAgdmFyIGNvZWZmaWNpZW50ID0gZFswXSxcbiAgICAgIGV4cG9uZW50ID0gZFsxXSxcbiAgICAgIGkgPSBleHBvbmVudCAtIChwcmVmaXhFeHBvbmVudCA9IE1hdGgubWF4KC04LCBNYXRoLm1pbig4LCBNYXRoLmZsb29yKGV4cG9uZW50IC8gMykpKSAqIDMpICsgMSxcbiAgICAgIG4gPSBjb2VmZmljaWVudC5sZW5ndGg7XG4gIHJldHVybiBpID09PSBuID8gY29lZmZpY2llbnRcbiAgICAgIDogaSA+IG4gPyBjb2VmZmljaWVudCArIG5ldyBBcnJheShpIC0gbiArIDEpLmpvaW4oXCIwXCIpXG4gICAgICA6IGkgPiAwID8gY29lZmZpY2llbnQuc2xpY2UoMCwgaSkgKyBcIi5cIiArIGNvZWZmaWNpZW50LnNsaWNlKGkpXG4gICAgICA6IFwiMC5cIiArIG5ldyBBcnJheSgxIC0gaSkuam9pbihcIjBcIikgKyBmb3JtYXREZWNpbWFsUGFydHMoeCwgTWF0aC5tYXgoMCwgcCArIGkgLSAxKSlbMF07IC8vIGxlc3MgdGhhbiAxeSFcbn1cbiIsImltcG9ydCB7Zm9ybWF0RGVjaW1hbFBhcnRzfSBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHgsIHApIHtcbiAgdmFyIGQgPSBmb3JtYXREZWNpbWFsUGFydHMoeCwgcCk7XG4gIGlmICghZCkgcmV0dXJuIHggKyBcIlwiO1xuICB2YXIgY29lZmZpY2llbnQgPSBkWzBdLFxuICAgICAgZXhwb25lbnQgPSBkWzFdO1xuICByZXR1cm4gZXhwb25lbnQgPCAwID8gXCIwLlwiICsgbmV3IEFycmF5KC1leHBvbmVudCkuam9pbihcIjBcIikgKyBjb2VmZmljaWVudFxuICAgICAgOiBjb2VmZmljaWVudC5sZW5ndGggPiBleHBvbmVudCArIDEgPyBjb2VmZmljaWVudC5zbGljZSgwLCBleHBvbmVudCArIDEpICsgXCIuXCIgKyBjb2VmZmljaWVudC5zbGljZShleHBvbmVudCArIDEpXG4gICAgICA6IGNvZWZmaWNpZW50ICsgbmV3IEFycmF5KGV4cG9uZW50IC0gY29lZmZpY2llbnQubGVuZ3RoICsgMikuam9pbihcIjBcIik7XG59XG4iLCJpbXBvcnQgZm9ybWF0RGVjaW1hbCBmcm9tIFwiLi9mb3JtYXREZWNpbWFsLmpzXCI7XG5pbXBvcnQgZm9ybWF0UHJlZml4QXV0byBmcm9tIFwiLi9mb3JtYXRQcmVmaXhBdXRvLmpzXCI7XG5pbXBvcnQgZm9ybWF0Um91bmRlZCBmcm9tIFwiLi9mb3JtYXRSb3VuZGVkLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgXCIlXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuICh4ICogMTAwKS50b0ZpeGVkKHApOyB9LFxuICBcImJcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygyKTsgfSxcbiAgXCJjXCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHggKyBcIlwiOyB9LFxuICBcImRcIjogZm9ybWF0RGVjaW1hbCxcbiAgXCJlXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9FeHBvbmVudGlhbChwKTsgfSxcbiAgXCJmXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9GaXhlZChwKTsgfSxcbiAgXCJnXCI6IGZ1bmN0aW9uKHgsIHApIHsgcmV0dXJuIHgudG9QcmVjaXNpb24ocCk7IH0sXG4gIFwib1wiOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnJvdW5kKHgpLnRvU3RyaW5nKDgpOyB9LFxuICBcInBcIjogZnVuY3Rpb24oeCwgcCkgeyByZXR1cm4gZm9ybWF0Um91bmRlZCh4ICogMTAwLCBwKTsgfSxcbiAgXCJyXCI6IGZvcm1hdFJvdW5kZWQsXG4gIFwic1wiOiBmb3JtYXRQcmVmaXhBdXRvLFxuICBcIlhcIjogZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5yb3VuZCh4KS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKTsgfSxcbiAgXCJ4XCI6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgucm91bmQoeCkudG9TdHJpbmcoMTYpOyB9XG59O1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4geDtcbn1cbiIsImltcG9ydCBleHBvbmVudCBmcm9tIFwiLi9leHBvbmVudC5qc1wiO1xuaW1wb3J0IGZvcm1hdEdyb3VwIGZyb20gXCIuL2Zvcm1hdEdyb3VwLmpzXCI7XG5pbXBvcnQgZm9ybWF0TnVtZXJhbHMgZnJvbSBcIi4vZm9ybWF0TnVtZXJhbHMuanNcIjtcbmltcG9ydCBmb3JtYXRTcGVjaWZpZXIgZnJvbSBcIi4vZm9ybWF0U3BlY2lmaWVyLmpzXCI7XG5pbXBvcnQgZm9ybWF0VHJpbSBmcm9tIFwiLi9mb3JtYXRUcmltLmpzXCI7XG5pbXBvcnQgZm9ybWF0VHlwZXMgZnJvbSBcIi4vZm9ybWF0VHlwZXMuanNcIjtcbmltcG9ydCB7cHJlZml4RXhwb25lbnR9IGZyb20gXCIuL2Zvcm1hdFByZWZpeEF1dG8uanNcIjtcbmltcG9ydCBpZGVudGl0eSBmcm9tIFwiLi9pZGVudGl0eS5qc1wiO1xuXG52YXIgbWFwID0gQXJyYXkucHJvdG90eXBlLm1hcCxcbiAgICBwcmVmaXhlcyA9IFtcInlcIixcInpcIixcImFcIixcImZcIixcInBcIixcIm5cIixcIsK1XCIsXCJtXCIsXCJcIixcImtcIixcIk1cIixcIkdcIixcIlRcIixcIlBcIixcIkVcIixcIlpcIixcIllcIl07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGxvY2FsZSkge1xuICB2YXIgZ3JvdXAgPSBsb2NhbGUuZ3JvdXBpbmcgPT09IHVuZGVmaW5lZCB8fCBsb2NhbGUudGhvdXNhbmRzID09PSB1bmRlZmluZWQgPyBpZGVudGl0eSA6IGZvcm1hdEdyb3VwKG1hcC5jYWxsKGxvY2FsZS5ncm91cGluZywgTnVtYmVyKSwgbG9jYWxlLnRob3VzYW5kcyArIFwiXCIpLFxuICAgICAgY3VycmVuY3lQcmVmaXggPSBsb2NhbGUuY3VycmVuY3kgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBsb2NhbGUuY3VycmVuY3lbMF0gKyBcIlwiLFxuICAgICAgY3VycmVuY3lTdWZmaXggPSBsb2NhbGUuY3VycmVuY3kgPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBsb2NhbGUuY3VycmVuY3lbMV0gKyBcIlwiLFxuICAgICAgZGVjaW1hbCA9IGxvY2FsZS5kZWNpbWFsID09PSB1bmRlZmluZWQgPyBcIi5cIiA6IGxvY2FsZS5kZWNpbWFsICsgXCJcIixcbiAgICAgIG51bWVyYWxzID0gbG9jYWxlLm51bWVyYWxzID09PSB1bmRlZmluZWQgPyBpZGVudGl0eSA6IGZvcm1hdE51bWVyYWxzKG1hcC5jYWxsKGxvY2FsZS5udW1lcmFscywgU3RyaW5nKSksXG4gICAgICBwZXJjZW50ID0gbG9jYWxlLnBlcmNlbnQgPT09IHVuZGVmaW5lZCA/IFwiJVwiIDogbG9jYWxlLnBlcmNlbnQgKyBcIlwiLFxuICAgICAgbWludXMgPSBsb2NhbGUubWludXMgPT09IHVuZGVmaW5lZCA/IFwiLVwiIDogbG9jYWxlLm1pbnVzICsgXCJcIixcbiAgICAgIG5hbiA9IGxvY2FsZS5uYW4gPT09IHVuZGVmaW5lZCA/IFwiTmFOXCIgOiBsb2NhbGUubmFuICsgXCJcIjtcblxuICBmdW5jdGlvbiBuZXdGb3JtYXQoc3BlY2lmaWVyKSB7XG4gICAgc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllcik7XG5cbiAgICB2YXIgZmlsbCA9IHNwZWNpZmllci5maWxsLFxuICAgICAgICBhbGlnbiA9IHNwZWNpZmllci5hbGlnbixcbiAgICAgICAgc2lnbiA9IHNwZWNpZmllci5zaWduLFxuICAgICAgICBzeW1ib2wgPSBzcGVjaWZpZXIuc3ltYm9sLFxuICAgICAgICB6ZXJvID0gc3BlY2lmaWVyLnplcm8sXG4gICAgICAgIHdpZHRoID0gc3BlY2lmaWVyLndpZHRoLFxuICAgICAgICBjb21tYSA9IHNwZWNpZmllci5jb21tYSxcbiAgICAgICAgcHJlY2lzaW9uID0gc3BlY2lmaWVyLnByZWNpc2lvbixcbiAgICAgICAgdHJpbSA9IHNwZWNpZmllci50cmltLFxuICAgICAgICB0eXBlID0gc3BlY2lmaWVyLnR5cGU7XG5cbiAgICAvLyBUaGUgXCJuXCIgdHlwZSBpcyBhbiBhbGlhcyBmb3IgXCIsZ1wiLlxuICAgIGlmICh0eXBlID09PSBcIm5cIikgY29tbWEgPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBUaGUgXCJcIiB0eXBlLCBhbmQgYW55IGludmFsaWQgdHlwZSwgaXMgYW4gYWxpYXMgZm9yIFwiLjEyfmdcIi5cbiAgICBlbHNlIGlmICghZm9ybWF0VHlwZXNbdHlwZV0pIHByZWNpc2lvbiA9PT0gdW5kZWZpbmVkICYmIChwcmVjaXNpb24gPSAxMiksIHRyaW0gPSB0cnVlLCB0eXBlID0gXCJnXCI7XG5cbiAgICAvLyBJZiB6ZXJvIGZpbGwgaXMgc3BlY2lmaWVkLCBwYWRkaW5nIGdvZXMgYWZ0ZXIgc2lnbiBhbmQgYmVmb3JlIGRpZ2l0cy5cbiAgICBpZiAoemVybyB8fCAoZmlsbCA9PT0gXCIwXCIgJiYgYWxpZ24gPT09IFwiPVwiKSkgemVybyA9IHRydWUsIGZpbGwgPSBcIjBcIiwgYWxpZ24gPSBcIj1cIjtcblxuICAgIC8vIENvbXB1dGUgdGhlIHByZWZpeCBhbmQgc3VmZml4LlxuICAgIC8vIEZvciBTSS1wcmVmaXgsIHRoZSBzdWZmaXggaXMgbGF6aWx5IGNvbXB1dGVkLlxuICAgIHZhciBwcmVmaXggPSBzeW1ib2wgPT09IFwiJFwiID8gY3VycmVuY3lQcmVmaXggOiBzeW1ib2wgPT09IFwiI1wiICYmIC9bYm94WF0vLnRlc3QodHlwZSkgPyBcIjBcIiArIHR5cGUudG9Mb3dlckNhc2UoKSA6IFwiXCIsXG4gICAgICAgIHN1ZmZpeCA9IHN5bWJvbCA9PT0gXCIkXCIgPyBjdXJyZW5jeVN1ZmZpeCA6IC9bJXBdLy50ZXN0KHR5cGUpID8gcGVyY2VudCA6IFwiXCI7XG5cbiAgICAvLyBXaGF0IGZvcm1hdCBmdW5jdGlvbiBzaG91bGQgd2UgdXNlP1xuICAgIC8vIElzIHRoaXMgYW4gaW50ZWdlciB0eXBlP1xuICAgIC8vIENhbiB0aGlzIHR5cGUgZ2VuZXJhdGUgZXhwb25lbnRpYWwgbm90YXRpb24/XG4gICAgdmFyIGZvcm1hdFR5cGUgPSBmb3JtYXRUeXBlc1t0eXBlXSxcbiAgICAgICAgbWF5YmVTdWZmaXggPSAvW2RlZmdwcnMlXS8udGVzdCh0eXBlKTtcblxuICAgIC8vIFNldCB0aGUgZGVmYXVsdCBwcmVjaXNpb24gaWYgbm90IHNwZWNpZmllZCxcbiAgICAvLyBvciBjbGFtcCB0aGUgc3BlY2lmaWVkIHByZWNpc2lvbiB0byB0aGUgc3VwcG9ydGVkIHJhbmdlLlxuICAgIC8vIEZvciBzaWduaWZpY2FudCBwcmVjaXNpb24sIGl0IG11c3QgYmUgaW4gWzEsIDIxXS5cbiAgICAvLyBGb3IgZml4ZWQgcHJlY2lzaW9uLCBpdCBtdXN0IGJlIGluIFswLCAyMF0uXG4gICAgcHJlY2lzaW9uID0gcHJlY2lzaW9uID09PSB1bmRlZmluZWQgPyA2XG4gICAgICAgIDogL1tncHJzXS8udGVzdCh0eXBlKSA/IE1hdGgubWF4KDEsIE1hdGgubWluKDIxLCBwcmVjaXNpb24pKVxuICAgICAgICA6IE1hdGgubWF4KDAsIE1hdGgubWluKDIwLCBwcmVjaXNpb24pKTtcblxuICAgIGZ1bmN0aW9uIGZvcm1hdCh2YWx1ZSkge1xuICAgICAgdmFyIHZhbHVlUHJlZml4ID0gcHJlZml4LFxuICAgICAgICAgIHZhbHVlU3VmZml4ID0gc3VmZml4LFxuICAgICAgICAgIGksIG4sIGM7XG5cbiAgICAgIGlmICh0eXBlID09PSBcImNcIikge1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9IGZvcm1hdFR5cGUodmFsdWUpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgIHZhbHVlID0gXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhbHVlID0gK3ZhbHVlO1xuXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgc2lnbi4gLTAgaXMgbm90IGxlc3MgdGhhbiAwLCBidXQgMSAvIC0wIGlzIVxuICAgICAgICB2YXIgdmFsdWVOZWdhdGl2ZSA9IHZhbHVlIDwgMCB8fCAxIC8gdmFsdWUgPCAwO1xuXG4gICAgICAgIC8vIFBlcmZvcm0gdGhlIGluaXRpYWwgZm9ybWF0dGluZy5cbiAgICAgICAgdmFsdWUgPSBpc05hTih2YWx1ZSkgPyBuYW4gOiBmb3JtYXRUeXBlKE1hdGguYWJzKHZhbHVlKSwgcHJlY2lzaW9uKTtcblxuICAgICAgICAvLyBUcmltIGluc2lnbmlmaWNhbnQgemVyb3MuXG4gICAgICAgIGlmICh0cmltKSB2YWx1ZSA9IGZvcm1hdFRyaW0odmFsdWUpO1xuXG4gICAgICAgIC8vIElmIGEgbmVnYXRpdmUgdmFsdWUgcm91bmRzIHRvIHplcm8gYWZ0ZXIgZm9ybWF0dGluZywgYW5kIG5vIGV4cGxpY2l0IHBvc2l0aXZlIHNpZ24gaXMgcmVxdWVzdGVkLCBoaWRlIHRoZSBzaWduLlxuICAgICAgICBpZiAodmFsdWVOZWdhdGl2ZSAmJiArdmFsdWUgPT09IDAgJiYgc2lnbiAhPT0gXCIrXCIpIHZhbHVlTmVnYXRpdmUgPSBmYWxzZTtcblxuICAgICAgICAvLyBDb21wdXRlIHRoZSBwcmVmaXggYW5kIHN1ZmZpeC5cbiAgICAgICAgdmFsdWVQcmVmaXggPSAodmFsdWVOZWdhdGl2ZSA/IChzaWduID09PSBcIihcIiA/IHNpZ24gOiBtaW51cykgOiBzaWduID09PSBcIi1cIiB8fCBzaWduID09PSBcIihcIiA/IFwiXCIgOiBzaWduKSArIHZhbHVlUHJlZml4O1xuICAgICAgICB2YWx1ZVN1ZmZpeCA9ICh0eXBlID09PSBcInNcIiA/IHByZWZpeGVzWzggKyBwcmVmaXhFeHBvbmVudCAvIDNdIDogXCJcIikgKyB2YWx1ZVN1ZmZpeCArICh2YWx1ZU5lZ2F0aXZlICYmIHNpZ24gPT09IFwiKFwiID8gXCIpXCIgOiBcIlwiKTtcblxuICAgICAgICAvLyBCcmVhayB0aGUgZm9ybWF0dGVkIHZhbHVlIGludG8gdGhlIGludGVnZXIg4oCcdmFsdWXigJ0gcGFydCB0aGF0IGNhbiBiZVxuICAgICAgICAvLyBncm91cGVkLCBhbmQgZnJhY3Rpb25hbCBvciBleHBvbmVudGlhbCDigJxzdWZmaXjigJ0gcGFydCB0aGF0IGlzIG5vdC5cbiAgICAgICAgaWYgKG1heWJlU3VmZml4KSB7XG4gICAgICAgICAgaSA9IC0xLCBuID0gdmFsdWUubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICAgICAgICBpZiAoYyA9IHZhbHVlLmNoYXJDb2RlQXQoaSksIDQ4ID4gYyB8fCBjID4gNTcpIHtcbiAgICAgICAgICAgICAgdmFsdWVTdWZmaXggPSAoYyA9PT0gNDYgPyBkZWNpbWFsICsgdmFsdWUuc2xpY2UoaSArIDEpIDogdmFsdWUuc2xpY2UoaSkpICsgdmFsdWVTdWZmaXg7XG4gICAgICAgICAgICAgIHZhbHVlID0gdmFsdWUuc2xpY2UoMCwgaSk7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgbm90IFwiMFwiLCBncm91cGluZyBpcyBhcHBsaWVkIGJlZm9yZSBwYWRkaW5nLlxuICAgICAgaWYgKGNvbW1hICYmICF6ZXJvKSB2YWx1ZSA9IGdyb3VwKHZhbHVlLCBJbmZpbml0eSk7XG5cbiAgICAgIC8vIENvbXB1dGUgdGhlIHBhZGRpbmcuXG4gICAgICB2YXIgbGVuZ3RoID0gdmFsdWVQcmVmaXgubGVuZ3RoICsgdmFsdWUubGVuZ3RoICsgdmFsdWVTdWZmaXgubGVuZ3RoLFxuICAgICAgICAgIHBhZGRpbmcgPSBsZW5ndGggPCB3aWR0aCA/IG5ldyBBcnJheSh3aWR0aCAtIGxlbmd0aCArIDEpLmpvaW4oZmlsbCkgOiBcIlwiO1xuXG4gICAgICAvLyBJZiB0aGUgZmlsbCBjaGFyYWN0ZXIgaXMgXCIwXCIsIGdyb3VwaW5nIGlzIGFwcGxpZWQgYWZ0ZXIgcGFkZGluZy5cbiAgICAgIGlmIChjb21tYSAmJiB6ZXJvKSB2YWx1ZSA9IGdyb3VwKHBhZGRpbmcgKyB2YWx1ZSwgcGFkZGluZy5sZW5ndGggPyB3aWR0aCAtIHZhbHVlU3VmZml4Lmxlbmd0aCA6IEluZmluaXR5KSwgcGFkZGluZyA9IFwiXCI7XG5cbiAgICAgIC8vIFJlY29uc3RydWN0IHRoZSBmaW5hbCBvdXRwdXQgYmFzZWQgb24gdGhlIGRlc2lyZWQgYWxpZ25tZW50LlxuICAgICAgc3dpdGNoIChhbGlnbikge1xuICAgICAgICBjYXNlIFwiPFwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgdmFsdWUgKyB2YWx1ZVN1ZmZpeCArIHBhZGRpbmc7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiPVwiOiB2YWx1ZSA9IHZhbHVlUHJlZml4ICsgcGFkZGluZyArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgICBjYXNlIFwiXlwiOiB2YWx1ZSA9IHBhZGRpbmcuc2xpY2UoMCwgbGVuZ3RoID0gcGFkZGluZy5sZW5ndGggPj4gMSkgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXggKyBwYWRkaW5nLnNsaWNlKGxlbmd0aCk7IGJyZWFrO1xuICAgICAgICBkZWZhdWx0OiB2YWx1ZSA9IHBhZGRpbmcgKyB2YWx1ZVByZWZpeCArIHZhbHVlICsgdmFsdWVTdWZmaXg7IGJyZWFrO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVtZXJhbHModmFsdWUpO1xuICAgIH1cblxuICAgIGZvcm1hdC50b1N0cmluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHNwZWNpZmllciArIFwiXCI7XG4gICAgfTtcblxuICAgIHJldHVybiBmb3JtYXQ7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRQcmVmaXgoc3BlY2lmaWVyLCB2YWx1ZSkge1xuICAgIHZhciBmID0gbmV3Rm9ybWF0KChzcGVjaWZpZXIgPSBmb3JtYXRTcGVjaWZpZXIoc3BlY2lmaWVyKSwgc3BlY2lmaWVyLnR5cGUgPSBcImZcIiwgc3BlY2lmaWVyKSksXG4gICAgICAgIGUgPSBNYXRoLm1heCgtOCwgTWF0aC5taW4oOCwgTWF0aC5mbG9vcihleHBvbmVudCh2YWx1ZSkgLyAzKSkpICogMyxcbiAgICAgICAgayA9IE1hdGgucG93KDEwLCAtZSksXG4gICAgICAgIHByZWZpeCA9IHByZWZpeGVzWzggKyBlIC8gM107XG4gICAgcmV0dXJuIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICByZXR1cm4gZihrICogdmFsdWUpICsgcHJlZml4O1xuICAgIH07XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGZvcm1hdDogbmV3Rm9ybWF0LFxuICAgIGZvcm1hdFByZWZpeDogZm9ybWF0UHJlZml4XG4gIH07XG59XG4iLCJpbXBvcnQgZm9ybWF0TG9jYWxlIGZyb20gXCIuL2xvY2FsZS5qc1wiO1xuXG52YXIgbG9jYWxlO1xuZXhwb3J0IHZhciBmb3JtYXQ7XG5leHBvcnQgdmFyIGZvcm1hdFByZWZpeDtcblxuZGVmYXVsdExvY2FsZSh7XG4gIGRlY2ltYWw6IFwiLlwiLFxuICB0aG91c2FuZHM6IFwiLFwiLFxuICBncm91cGluZzogWzNdLFxuICBjdXJyZW5jeTogW1wiJFwiLCBcIlwiXSxcbiAgbWludXM6IFwiLVwiXG59KTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZGVmYXVsdExvY2FsZShkZWZpbml0aW9uKSB7XG4gIGxvY2FsZSA9IGZvcm1hdExvY2FsZShkZWZpbml0aW9uKTtcbiAgZm9ybWF0ID0gbG9jYWxlLmZvcm1hdDtcbiAgZm9ybWF0UHJlZml4ID0gbG9jYWxlLmZvcm1hdFByZWZpeDtcbiAgcmV0dXJuIGxvY2FsZTtcbn1cbiIsInZhciBFT0wgPSB7fSxcbiAgICBFT0YgPSB7fSxcbiAgICBRVU9URSA9IDM0LFxuICAgIE5FV0xJTkUgPSAxMCxcbiAgICBSRVRVUk4gPSAxMztcblxuZnVuY3Rpb24gb2JqZWN0Q29udmVydGVyKGNvbHVtbnMpIHtcbiAgcmV0dXJuIG5ldyBGdW5jdGlvbihcImRcIiwgXCJyZXR1cm4ge1wiICsgY29sdW1ucy5tYXAoZnVuY3Rpb24obmFtZSwgaSkge1xuICAgIHJldHVybiBKU09OLnN0cmluZ2lmeShuYW1lKSArIFwiOiBkW1wiICsgaSArIFwiXSB8fCBcXFwiXFxcIlwiO1xuICB9KS5qb2luKFwiLFwiKSArIFwifVwiKTtcbn1cblxuZnVuY3Rpb24gY3VzdG9tQ29udmVydGVyKGNvbHVtbnMsIGYpIHtcbiAgdmFyIG9iamVjdCA9IG9iamVjdENvbnZlcnRlcihjb2x1bW5zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJvdywgaSkge1xuICAgIHJldHVybiBmKG9iamVjdChyb3cpLCBpLCBjb2x1bW5zKTtcbiAgfTtcbn1cblxuLy8gQ29tcHV0ZSB1bmlxdWUgY29sdW1ucyBpbiBvcmRlciBvZiBkaXNjb3ZlcnkuXG5mdW5jdGlvbiBpbmZlckNvbHVtbnMocm93cykge1xuICB2YXIgY29sdW1uU2V0ID0gT2JqZWN0LmNyZWF0ZShudWxsKSxcbiAgICAgIGNvbHVtbnMgPSBbXTtcblxuICByb3dzLmZvckVhY2goZnVuY3Rpb24ocm93KSB7XG4gICAgZm9yICh2YXIgY29sdW1uIGluIHJvdykge1xuICAgICAgaWYgKCEoY29sdW1uIGluIGNvbHVtblNldCkpIHtcbiAgICAgICAgY29sdW1ucy5wdXNoKGNvbHVtblNldFtjb2x1bW5dID0gY29sdW1uKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjb2x1bW5zO1xufVxuXG5mdW5jdGlvbiBwYWQodmFsdWUsIHdpZHRoKSB7XG4gIHZhciBzID0gdmFsdWUgKyBcIlwiLCBsZW5ndGggPSBzLmxlbmd0aDtcbiAgcmV0dXJuIGxlbmd0aCA8IHdpZHRoID8gbmV3IEFycmF5KHdpZHRoIC0gbGVuZ3RoICsgMSkuam9pbigwKSArIHMgOiBzO1xufVxuXG5mdW5jdGlvbiBmb3JtYXRZZWFyKHllYXIpIHtcbiAgcmV0dXJuIHllYXIgPCAwID8gXCItXCIgKyBwYWQoLXllYXIsIDYpXG4gICAgOiB5ZWFyID4gOTk5OSA/IFwiK1wiICsgcGFkKHllYXIsIDYpXG4gICAgOiBwYWQoeWVhciwgNCk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdERhdGUoZGF0ZSkge1xuICB2YXIgaG91cnMgPSBkYXRlLmdldFVUQ0hvdXJzKCksXG4gICAgICBtaW51dGVzID0gZGF0ZS5nZXRVVENNaW51dGVzKCksXG4gICAgICBzZWNvbmRzID0gZGF0ZS5nZXRVVENTZWNvbmRzKCksXG4gICAgICBtaWxsaXNlY29uZHMgPSBkYXRlLmdldFVUQ01pbGxpc2Vjb25kcygpO1xuICByZXR1cm4gaXNOYU4oZGF0ZSkgPyBcIkludmFsaWQgRGF0ZVwiXG4gICAgICA6IGZvcm1hdFllYXIoZGF0ZS5nZXRVVENGdWxsWWVhcigpLCA0KSArIFwiLVwiICsgcGFkKGRhdGUuZ2V0VVRDTW9udGgoKSArIDEsIDIpICsgXCItXCIgKyBwYWQoZGF0ZS5nZXRVVENEYXRlKCksIDIpXG4gICAgICArIChtaWxsaXNlY29uZHMgPyBcIlRcIiArIHBhZChob3VycywgMikgKyBcIjpcIiArIHBhZChtaW51dGVzLCAyKSArIFwiOlwiICsgcGFkKHNlY29uZHMsIDIpICsgXCIuXCIgKyBwYWQobWlsbGlzZWNvbmRzLCAzKSArIFwiWlwiXG4gICAgICA6IHNlY29uZHMgPyBcIlRcIiArIHBhZChob3VycywgMikgKyBcIjpcIiArIHBhZChtaW51dGVzLCAyKSArIFwiOlwiICsgcGFkKHNlY29uZHMsIDIpICsgXCJaXCJcbiAgICAgIDogbWludXRlcyB8fCBob3VycyA/IFwiVFwiICsgcGFkKGhvdXJzLCAyKSArIFwiOlwiICsgcGFkKG1pbnV0ZXMsIDIpICsgXCJaXCJcbiAgICAgIDogXCJcIik7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRlbGltaXRlcikge1xuICB2YXIgcmVGb3JtYXQgPSBuZXcgUmVnRXhwKFwiW1xcXCJcIiArIGRlbGltaXRlciArIFwiXFxuXFxyXVwiKSxcbiAgICAgIERFTElNSVRFUiA9IGRlbGltaXRlci5jaGFyQ29kZUF0KDApO1xuXG4gIGZ1bmN0aW9uIHBhcnNlKHRleHQsIGYpIHtcbiAgICB2YXIgY29udmVydCwgY29sdW1ucywgcm93cyA9IHBhcnNlUm93cyh0ZXh0LCBmdW5jdGlvbihyb3csIGkpIHtcbiAgICAgIGlmIChjb252ZXJ0KSByZXR1cm4gY29udmVydChyb3csIGkgLSAxKTtcbiAgICAgIGNvbHVtbnMgPSByb3csIGNvbnZlcnQgPSBmID8gY3VzdG9tQ29udmVydGVyKHJvdywgZikgOiBvYmplY3RDb252ZXJ0ZXIocm93KTtcbiAgICB9KTtcbiAgICByb3dzLmNvbHVtbnMgPSBjb2x1bW5zIHx8IFtdO1xuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgZnVuY3Rpb24gcGFyc2VSb3dzKHRleHQsIGYpIHtcbiAgICB2YXIgcm93cyA9IFtdLCAvLyBvdXRwdXQgcm93c1xuICAgICAgICBOID0gdGV4dC5sZW5ndGgsXG4gICAgICAgIEkgPSAwLCAvLyBjdXJyZW50IGNoYXJhY3RlciBpbmRleFxuICAgICAgICBuID0gMCwgLy8gY3VycmVudCBsaW5lIG51bWJlclxuICAgICAgICB0LCAvLyBjdXJyZW50IHRva2VuXG4gICAgICAgIGVvZiA9IE4gPD0gMCwgLy8gY3VycmVudCB0b2tlbiBmb2xsb3dlZCBieSBFT0Y/XG4gICAgICAgIGVvbCA9IGZhbHNlOyAvLyBjdXJyZW50IHRva2VuIGZvbGxvd2VkIGJ5IEVPTD9cblxuICAgIC8vIFN0cmlwIHRoZSB0cmFpbGluZyBuZXdsaW5lLlxuICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoTiAtIDEpID09PSBORVdMSU5FKSAtLU47XG4gICAgaWYgKHRleHQuY2hhckNvZGVBdChOIC0gMSkgPT09IFJFVFVSTikgLS1OO1xuXG4gICAgZnVuY3Rpb24gdG9rZW4oKSB7XG4gICAgICBpZiAoZW9mKSByZXR1cm4gRU9GO1xuICAgICAgaWYgKGVvbCkgcmV0dXJuIGVvbCA9IGZhbHNlLCBFT0w7XG5cbiAgICAgIC8vIFVuZXNjYXBlIHF1b3Rlcy5cbiAgICAgIHZhciBpLCBqID0gSSwgYztcbiAgICAgIGlmICh0ZXh0LmNoYXJDb2RlQXQoaikgPT09IFFVT1RFKSB7XG4gICAgICAgIHdoaWxlIChJKysgPCBOICYmIHRleHQuY2hhckNvZGVBdChJKSAhPT0gUVVPVEUgfHwgdGV4dC5jaGFyQ29kZUF0KCsrSSkgPT09IFFVT1RFKTtcbiAgICAgICAgaWYgKChpID0gSSkgPj0gTikgZW9mID0gdHJ1ZTtcbiAgICAgICAgZWxzZSBpZiAoKGMgPSB0ZXh0LmNoYXJDb2RlQXQoSSsrKSkgPT09IE5FV0xJTkUpIGVvbCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGMgPT09IFJFVFVSTikgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSBORVdMSU5FKSArK0k7IH1cbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiArIDEsIGkgLSAxKS5yZXBsYWNlKC9cIlwiL2csIFwiXFxcIlwiKTtcbiAgICAgIH1cblxuICAgICAgLy8gRmluZCBuZXh0IGRlbGltaXRlciBvciBuZXdsaW5lLlxuICAgICAgd2hpbGUgKEkgPCBOKSB7XG4gICAgICAgIGlmICgoYyA9IHRleHQuY2hhckNvZGVBdChpID0gSSsrKSkgPT09IE5FV0xJTkUpIGVvbCA9IHRydWU7XG4gICAgICAgIGVsc2UgaWYgKGMgPT09IFJFVFVSTikgeyBlb2wgPSB0cnVlOyBpZiAodGV4dC5jaGFyQ29kZUF0KEkpID09PSBORVdMSU5FKSArK0k7IH1cbiAgICAgICAgZWxzZSBpZiAoYyAhPT0gREVMSU1JVEVSKSBjb250aW51ZTtcbiAgICAgICAgcmV0dXJuIHRleHQuc2xpY2UoaiwgaSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFJldHVybiBsYXN0IHRva2VuIGJlZm9yZSBFT0YuXG4gICAgICByZXR1cm4gZW9mID0gdHJ1ZSwgdGV4dC5zbGljZShqLCBOKTtcbiAgICB9XG5cbiAgICB3aGlsZSAoKHQgPSB0b2tlbigpKSAhPT0gRU9GKSB7XG4gICAgICB2YXIgcm93ID0gW107XG4gICAgICB3aGlsZSAodCAhPT0gRU9MICYmIHQgIT09IEVPRikgcm93LnB1c2godCksIHQgPSB0b2tlbigpO1xuICAgICAgaWYgKGYgJiYgKHJvdyA9IGYocm93LCBuKyspKSA9PSBudWxsKSBjb250aW51ZTtcbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgZnVuY3Rpb24gcHJlZm9ybWF0Qm9keShyb3dzLCBjb2x1bW5zKSB7XG4gICAgcmV0dXJuIHJvd3MubWFwKGZ1bmN0aW9uKHJvdykge1xuICAgICAgcmV0dXJuIGNvbHVtbnMubWFwKGZ1bmN0aW9uKGNvbHVtbikge1xuICAgICAgICByZXR1cm4gZm9ybWF0VmFsdWUocm93W2NvbHVtbl0pO1xuICAgICAgfSkuam9pbihkZWxpbWl0ZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0KHJvd3MsIGNvbHVtbnMpIHtcbiAgICBpZiAoY29sdW1ucyA9PSBudWxsKSBjb2x1bW5zID0gaW5mZXJDb2x1bW5zKHJvd3MpO1xuICAgIHJldHVybiBbY29sdW1ucy5tYXAoZm9ybWF0VmFsdWUpLmpvaW4oZGVsaW1pdGVyKV0uY29uY2F0KHByZWZvcm1hdEJvZHkocm93cywgY29sdW1ucykpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpIHtcbiAgICBpZiAoY29sdW1ucyA9PSBudWxsKSBjb2x1bW5zID0gaW5mZXJDb2x1bW5zKHJvd3MpO1xuICAgIHJldHVybiBwcmVmb3JtYXRCb2R5KHJvd3MsIGNvbHVtbnMpLmpvaW4oXCJcXG5cIik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRSb3dzKHJvd3MpIHtcbiAgICByZXR1cm4gcm93cy5tYXAoZm9ybWF0Um93KS5qb2luKFwiXFxuXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gZm9ybWF0Um93KHJvdykge1xuICAgIHJldHVybiByb3cubWFwKGZvcm1hdFZhbHVlKS5qb2luKGRlbGltaXRlcik7XG4gIH1cblxuICBmdW5jdGlvbiBmb3JtYXRWYWx1ZSh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PSBudWxsID8gXCJcIlxuICAgICAgICA6IHZhbHVlIGluc3RhbmNlb2YgRGF0ZSA/IGZvcm1hdERhdGUodmFsdWUpXG4gICAgICAgIDogcmVGb3JtYXQudGVzdCh2YWx1ZSArPSBcIlwiKSA/IFwiXFxcIlwiICsgdmFsdWUucmVwbGFjZSgvXCIvZywgXCJcXFwiXFxcIlwiKSArIFwiXFxcIlwiXG4gICAgICAgIDogdmFsdWU7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBwYXJzZVJvd3M6IHBhcnNlUm93cyxcbiAgICBmb3JtYXQ6IGZvcm1hdCxcbiAgICBmb3JtYXRCb2R5OiBmb3JtYXRCb2R5LFxuICAgIGZvcm1hdFJvd3M6IGZvcm1hdFJvd3MsXG4gICAgZm9ybWF0Um93OiBmb3JtYXRSb3csXG4gICAgZm9ybWF0VmFsdWU6IGZvcm1hdFZhbHVlXG4gIH07XG59XG4iLCJpbXBvcnQgZHN2IGZyb20gXCIuL2Rzdi5qc1wiO1xuXG52YXIgY3N2ID0gZHN2KFwiLFwiKTtcblxuZXhwb3J0IHZhciBjc3ZQYXJzZSA9IGNzdi5wYXJzZTtcbmV4cG9ydCB2YXIgY3N2UGFyc2VSb3dzID0gY3N2LnBhcnNlUm93cztcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0ID0gY3N2LmZvcm1hdDtcbmV4cG9ydCB2YXIgY3N2Rm9ybWF0Qm9keSA9IGNzdi5mb3JtYXRCb2R5O1xuZXhwb3J0IHZhciBjc3ZGb3JtYXRSb3dzID0gY3N2LmZvcm1hdFJvd3M7XG5leHBvcnQgdmFyIGNzdkZvcm1hdFJvdyA9IGNzdi5mb3JtYXRSb3c7XG5leHBvcnQgdmFyIGNzdkZvcm1hdFZhbHVlID0gY3N2LmZvcm1hdFZhbHVlO1xuIiwiaW1wb3J0IGRzdiBmcm9tIFwiLi9kc3YuanNcIjtcblxudmFyIHRzdiA9IGRzdihcIlxcdFwiKTtcblxuZXhwb3J0IHZhciB0c3ZQYXJzZSA9IHRzdi5wYXJzZTtcbmV4cG9ydCB2YXIgdHN2UGFyc2VSb3dzID0gdHN2LnBhcnNlUm93cztcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0ID0gdHN2LmZvcm1hdDtcbmV4cG9ydCB2YXIgdHN2Rm9ybWF0Qm9keSA9IHRzdi5mb3JtYXRCb2R5O1xuZXhwb3J0IHZhciB0c3ZGb3JtYXRSb3dzID0gdHN2LmZvcm1hdFJvd3M7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFJvdyA9IHRzdi5mb3JtYXRSb3c7XG5leHBvcnQgdmFyIHRzdkZvcm1hdFZhbHVlID0gdHN2LmZvcm1hdFZhbHVlO1xuIiwiZnVuY3Rpb24gcmVzcG9uc2VUZXh0KHJlc3BvbnNlKSB7XG4gIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihyZXNwb25zZS5zdGF0dXMgKyBcIiBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuICByZXR1cm4gcmVzcG9uc2UudGV4dCgpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihpbnB1dCwgaW5pdCkge1xuICByZXR1cm4gZmV0Y2goaW5wdXQsIGluaXQpLnRoZW4ocmVzcG9uc2VUZXh0KTtcbn1cbiIsImltcG9ydCB7Y3N2UGFyc2UsIGRzdkZvcm1hdCwgdHN2UGFyc2V9IGZyb20gXCJkMy1kc3ZcIjtcbmltcG9ydCB0ZXh0IGZyb20gXCIuL3RleHQuanNcIjtcblxuZnVuY3Rpb24gZHN2UGFyc2UocGFyc2UpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0LCBpbml0LCByb3cpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMiAmJiB0eXBlb2YgaW5pdCA9PT0gXCJmdW5jdGlvblwiKSByb3cgPSBpbml0LCBpbml0ID0gdW5kZWZpbmVkO1xuICAgIHJldHVybiB0ZXh0KGlucHV0LCBpbml0KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICByZXR1cm4gcGFyc2UocmVzcG9uc2UsIHJvdyk7XG4gICAgfSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRzdihkZWxpbWl0ZXIsIGlucHV0LCBpbml0LCByb3cpIHtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDMgJiYgdHlwZW9mIGluaXQgPT09IFwiZnVuY3Rpb25cIikgcm93ID0gaW5pdCwgaW5pdCA9IHVuZGVmaW5lZDtcbiAgdmFyIGZvcm1hdCA9IGRzdkZvcm1hdChkZWxpbWl0ZXIpO1xuICByZXR1cm4gdGV4dChpbnB1dCwgaW5pdCkudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgIHJldHVybiBmb3JtYXQucGFyc2UocmVzcG9uc2UsIHJvdyk7XG4gIH0pO1xufVxuXG5leHBvcnQgdmFyIGNzdiA9IGRzdlBhcnNlKGNzdlBhcnNlKTtcbmV4cG9ydCB2YXIgdHN2ID0gZHN2UGFyc2UodHN2UGFyc2UpO1xuIiwiZnVuY3Rpb24gbm9uZSgpIHt9XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiBzZWxlY3RvciA9PSBudWxsID8gbm9uZSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgc2VsZWN0b3IgZnJvbSBcIi4uL3NlbGVjdG9yXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiZnVuY3Rpb24gZW1wdHkoKSB7XG4gIHJldHVybiBbXTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIHNlbGVjdG9yID09IG51bGwgPyBlbXB0eSA6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgc2VsZWN0b3JBbGwgZnJvbSBcIi4uL3NlbGVjdG9yQWxsXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdCkge1xuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHN1Ymdyb3Vwcy5wdXNoKHNlbGVjdC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSk7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFNlbGVjdGlvbihzdWJncm91cHMsIHBhcmVudHMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oc2VsZWN0b3IpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLm1hdGNoZXMoc2VsZWN0b3IpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtTZWxlY3Rpb259IGZyb20gXCIuL2luZGV4XCI7XG5pbXBvcnQgbWF0Y2hlciBmcm9tIFwiLi4vbWF0Y2hlclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihtYXRjaCkge1xuICBpZiAodHlwZW9mIG1hdGNoICE9PSBcImZ1bmN0aW9uXCIpIG1hdGNoID0gbWF0Y2hlcihtYXRjaCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgc3ViZ3JvdXBzID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBuID0gZ3JvdXAubGVuZ3RoLCBzdWJncm91cCA9IHN1Ymdyb3Vwc1tqXSA9IFtdLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIG1hdGNoLmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApKSB7XG4gICAgICAgIHN1Ymdyb3VwLnB1c2gobm9kZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oc3ViZ3JvdXBzLCB0aGlzLl9wYXJlbnRzKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHVwZGF0ZSkge1xuICByZXR1cm4gbmV3IEFycmF5KHVwZGF0ZS5sZW5ndGgpO1xufVxuIiwiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2VcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZW50ZXIgfHwgdGhpcy5fZ3JvdXBzLm1hcChzcGFyc2UpLCB0aGlzLl9wYXJlbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIEVudGVyTm9kZShwYXJlbnQsIGRhdHVtKSB7XG4gIHRoaXMub3duZXJEb2N1bWVudCA9IHBhcmVudC5vd25lckRvY3VtZW50O1xuICB0aGlzLm5hbWVzcGFjZVVSSSA9IHBhcmVudC5uYW1lc3BhY2VVUkk7XG4gIHRoaXMuX25leHQgPSBudWxsO1xuICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gIHRoaXMuX19kYXRhX18gPSBkYXR1bTtcbn1cblxuRW50ZXJOb2RlLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IEVudGVyTm9kZSxcbiAgYXBwZW5kQ2hpbGQ6IGZ1bmN0aW9uKGNoaWxkKSB7IHJldHVybiB0aGlzLl9wYXJlbnQuaW5zZXJ0QmVmb3JlKGNoaWxkLCB0aGlzLl9uZXh0KTsgfSxcbiAgaW5zZXJ0QmVmb3JlOiBmdW5jdGlvbihjaGlsZCwgbmV4dCkgeyByZXR1cm4gdGhpcy5fcGFyZW50Lmluc2VydEJlZm9yZShjaGlsZCwgbmV4dCk7IH0sXG4gIHF1ZXJ5U2VsZWN0b3I6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7IH0sXG4gIHF1ZXJ5U2VsZWN0b3JBbGw6IGZ1bmN0aW9uKHNlbGVjdG9yKSB7IHJldHVybiB0aGlzLl9wYXJlbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7IH1cbn07XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4geDtcbiAgfTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleFwiO1xuaW1wb3J0IHtFbnRlck5vZGV9IGZyb20gXCIuL2VudGVyXCI7XG5pbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4uL2NvbnN0YW50XCI7XG5cbnZhciBrZXlQcmVmaXggPSBcIiRcIjsgLy8gUHJvdGVjdCBhZ2FpbnN0IGtleXMgbGlrZSDigJxfX3Byb3RvX1/igJ0uXG5cbmZ1bmN0aW9uIGJpbmRJbmRleChwYXJlbnQsIGdyb3VwLCBlbnRlciwgdXBkYXRlLCBleGl0LCBkYXRhKSB7XG4gIHZhciBpID0gMCxcbiAgICAgIG5vZGUsXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aDtcblxuICAvLyBQdXQgYW55IG5vbi1udWxsIG5vZGVzIHRoYXQgZml0IGludG8gdXBkYXRlLlxuICAvLyBQdXQgYW55IG51bGwgbm9kZXMgaW50byBlbnRlci5cbiAgLy8gUHV0IGFueSByZW1haW5pbmcgZGF0YSBpbnRvIGVudGVyLlxuICBmb3IgKDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHV0IGFueSBub24tbnVsbCBub2RlcyB0aGF0IGRvbuKAmXQgZml0IGludG8gZXhpdC5cbiAgZm9yICg7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIGJpbmRLZXkocGFyZW50LCBncm91cCwgZW50ZXIsIHVwZGF0ZSwgZXhpdCwgZGF0YSwga2V5KSB7XG4gIHZhciBpLFxuICAgICAgbm9kZSxcbiAgICAgIG5vZGVCeUtleVZhbHVlID0ge30sXG4gICAgICBncm91cExlbmd0aCA9IGdyb3VwLmxlbmd0aCxcbiAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgIGtleVZhbHVlcyA9IG5ldyBBcnJheShncm91cExlbmd0aCksXG4gICAgICBrZXlWYWx1ZTtcblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggbm9kZS5cbiAgLy8gSWYgbXVsdGlwbGUgbm9kZXMgaGF2ZSB0aGUgc2FtZSBrZXksIHRoZSBkdXBsaWNhdGVzIGFyZSBhZGRlZCB0byBleGl0LlxuICBmb3IgKGkgPSAwOyBpIDwgZ3JvdXBMZW5ndGg7ICsraSkge1xuICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgIGtleVZhbHVlc1tpXSA9IGtleVZhbHVlID0ga2V5UHJlZml4ICsga2V5LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApO1xuICAgICAgaWYgKGtleVZhbHVlIGluIG5vZGVCeUtleVZhbHVlKSB7XG4gICAgICAgIGV4aXRbaV0gPSBub2RlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbm9kZUJ5S2V5VmFsdWVba2V5VmFsdWVdID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBDb21wdXRlIHRoZSBrZXkgZm9yIGVhY2ggZGF0dW0uXG4gIC8vIElmIHRoZXJlIGEgbm9kZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBrZXksIGpvaW4gYW5kIGFkZCBpdCB0byB1cGRhdGUuXG4gIC8vIElmIHRoZXJlIGlzIG5vdCAob3IgdGhlIGtleSBpcyBhIGR1cGxpY2F0ZSksIGFkZCBpdCB0byBlbnRlci5cbiAgZm9yIChpID0gMDsgaSA8IGRhdGFMZW5ndGg7ICsraSkge1xuICAgIGtleVZhbHVlID0ga2V5UHJlZml4ICsga2V5LmNhbGwocGFyZW50LCBkYXRhW2ldLCBpLCBkYXRhKTtcbiAgICBpZiAobm9kZSA9IG5vZGVCeUtleVZhbHVlW2tleVZhbHVlXSkge1xuICAgICAgdXBkYXRlW2ldID0gbm9kZTtcbiAgICAgIG5vZGUuX19kYXRhX18gPSBkYXRhW2ldO1xuICAgICAgbm9kZUJ5S2V5VmFsdWVba2V5VmFsdWVdID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgZW50ZXJbaV0gPSBuZXcgRW50ZXJOb2RlKHBhcmVudCwgZGF0YVtpXSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIGFueSByZW1haW5pbmcgbm9kZXMgdGhhdCB3ZXJlIG5vdCBib3VuZCB0byBkYXRhIHRvIGV4aXQuXG4gIGZvciAoaSA9IDA7IGkgPCBncm91cExlbmd0aDsgKytpKSB7XG4gICAgaWYgKChub2RlID0gZ3JvdXBbaV0pICYmIChub2RlQnlLZXlWYWx1ZVtrZXlWYWx1ZXNbaV1dID09PSBub2RlKSkge1xuICAgICAgZXhpdFtpXSA9IG5vZGU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlLCBrZXkpIHtcbiAgaWYgKCF2YWx1ZSkge1xuICAgIGRhdGEgPSBuZXcgQXJyYXkodGhpcy5zaXplKCkpLCBqID0gLTE7XG4gICAgdGhpcy5lYWNoKGZ1bmN0aW9uKGQpIHsgZGF0YVsrK2pdID0gZDsgfSk7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICB2YXIgYmluZCA9IGtleSA/IGJpbmRLZXkgOiBiaW5kSW5kZXgsXG4gICAgICBwYXJlbnRzID0gdGhpcy5fcGFyZW50cyxcbiAgICAgIGdyb3VwcyA9IHRoaXMuX2dyb3VwcztcblxuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHZhbHVlID0gY29uc3RhbnQodmFsdWUpO1xuXG4gIGZvciAodmFyIG0gPSBncm91cHMubGVuZ3RoLCB1cGRhdGUgPSBuZXcgQXJyYXkobSksIGVudGVyID0gbmV3IEFycmF5KG0pLCBleGl0ID0gbmV3IEFycmF5KG0pLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIHZhciBwYXJlbnQgPSBwYXJlbnRzW2pdLFxuICAgICAgICBncm91cCA9IGdyb3Vwc1tqXSxcbiAgICAgICAgZ3JvdXBMZW5ndGggPSBncm91cC5sZW5ndGgsXG4gICAgICAgIGRhdGEgPSB2YWx1ZS5jYWxsKHBhcmVudCwgcGFyZW50ICYmIHBhcmVudC5fX2RhdGFfXywgaiwgcGFyZW50cyksXG4gICAgICAgIGRhdGFMZW5ndGggPSBkYXRhLmxlbmd0aCxcbiAgICAgICAgZW50ZXJHcm91cCA9IGVudGVyW2pdID0gbmV3IEFycmF5KGRhdGFMZW5ndGgpLFxuICAgICAgICB1cGRhdGVHcm91cCA9IHVwZGF0ZVtqXSA9IG5ldyBBcnJheShkYXRhTGVuZ3RoKSxcbiAgICAgICAgZXhpdEdyb3VwID0gZXhpdFtqXSA9IG5ldyBBcnJheShncm91cExlbmd0aCk7XG5cbiAgICBiaW5kKHBhcmVudCwgZ3JvdXAsIGVudGVyR3JvdXAsIHVwZGF0ZUdyb3VwLCBleGl0R3JvdXAsIGRhdGEsIGtleSk7XG5cbiAgICAvLyBOb3cgY29ubmVjdCB0aGUgZW50ZXIgbm9kZXMgdG8gdGhlaXIgZm9sbG93aW5nIHVwZGF0ZSBub2RlLCBzdWNoIHRoYXRcbiAgICAvLyBhcHBlbmRDaGlsZCBjYW4gaW5zZXJ0IHRoZSBtYXRlcmlhbGl6ZWQgZW50ZXIgbm9kZSBiZWZvcmUgdGhpcyBub2RlLFxuICAgIC8vIHJhdGhlciB0aGFuIGF0IHRoZSBlbmQgb2YgdGhlIHBhcmVudCBub2RlLlxuICAgIGZvciAodmFyIGkwID0gMCwgaTEgPSAwLCBwcmV2aW91cywgbmV4dDsgaTAgPCBkYXRhTGVuZ3RoOyArK2kwKSB7XG4gICAgICBpZiAocHJldmlvdXMgPSBlbnRlckdyb3VwW2kwXSkge1xuICAgICAgICBpZiAoaTAgPj0gaTEpIGkxID0gaTAgKyAxO1xuICAgICAgICB3aGlsZSAoIShuZXh0ID0gdXBkYXRlR3JvdXBbaTFdKSAmJiArK2kxIDwgZGF0YUxlbmd0aCk7XG4gICAgICAgIHByZXZpb3VzLl9uZXh0ID0gbmV4dCB8fCBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZSA9IG5ldyBTZWxlY3Rpb24odXBkYXRlLCBwYXJlbnRzKTtcbiAgdXBkYXRlLl9lbnRlciA9IGVudGVyO1xuICB1cGRhdGUuX2V4aXQgPSBleGl0O1xuICByZXR1cm4gdXBkYXRlO1xufVxuIiwiaW1wb3J0IHNwYXJzZSBmcm9tIFwiLi9zcGFyc2VcIjtcbmltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24odGhpcy5fZXhpdCB8fCB0aGlzLl9ncm91cHMubWFwKHNwYXJzZSksIHRoaXMuX3BhcmVudHMpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24ob25lbnRlciwgb251cGRhdGUsIG9uZXhpdCkge1xuICB2YXIgZW50ZXIgPSB0aGlzLmVudGVyKCksIHVwZGF0ZSA9IHRoaXMsIGV4aXQgPSB0aGlzLmV4aXQoKTtcbiAgZW50ZXIgPSB0eXBlb2Ygb25lbnRlciA9PT0gXCJmdW5jdGlvblwiID8gb25lbnRlcihlbnRlcikgOiBlbnRlci5hcHBlbmQob25lbnRlciArIFwiXCIpO1xuICBpZiAob251cGRhdGUgIT0gbnVsbCkgdXBkYXRlID0gb251cGRhdGUodXBkYXRlKTtcbiAgaWYgKG9uZXhpdCA9PSBudWxsKSBleGl0LnJlbW92ZSgpOyBlbHNlIG9uZXhpdChleGl0KTtcbiAgcmV0dXJuIGVudGVyICYmIHVwZGF0ZSA/IGVudGVyLm1lcmdlKHVwZGF0ZSkub3JkZXIoKSA6IHVwZGF0ZTtcbn1cbiIsImltcG9ydCB7U2VsZWN0aW9ufSBmcm9tIFwiLi9pbmRleFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3Rpb24pIHtcblxuICBmb3IgKHZhciBncm91cHMwID0gdGhpcy5fZ3JvdXBzLCBncm91cHMxID0gc2VsZWN0aW9uLl9ncm91cHMsIG0wID0gZ3JvdXBzMC5sZW5ndGgsIG0xID0gZ3JvdXBzMS5sZW5ndGgsIG0gPSBNYXRoLm1pbihtMCwgbTEpLCBtZXJnZXMgPSBuZXcgQXJyYXkobTApLCBqID0gMDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwMCA9IGdyb3VwczBbal0sIGdyb3VwMSA9IGdyb3VwczFbal0sIG4gPSBncm91cDAubGVuZ3RoLCBtZXJnZSA9IG1lcmdlc1tqXSA9IG5ldyBBcnJheShuKSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXAwW2ldIHx8IGdyb3VwMVtpXSkge1xuICAgICAgICBtZXJnZVtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZm9yICg7IGogPCBtMDsgKytqKSB7XG4gICAgbWVyZ2VzW2pdID0gZ3JvdXBzMFtqXTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAtMSwgbSA9IGdyb3Vwcy5sZW5ndGg7ICsraiA8IG07KSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSBncm91cC5sZW5ndGggLSAxLCBuZXh0ID0gZ3JvdXBbaV0sIG5vZGU7IC0taSA+PSAwOykge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkge1xuICAgICAgICBpZiAobmV4dCAmJiBub2RlLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKG5leHQpIF4gNCkgbmV4dC5wYXJlbnROb2RlLmluc2VydEJlZm9yZShub2RlLCBuZXh0KTtcbiAgICAgICAgbmV4dCA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbn0gZnJvbSBcIi4vaW5kZXhcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY29tcGFyZSkge1xuICBpZiAoIWNvbXBhcmUpIGNvbXBhcmUgPSBhc2NlbmRpbmc7XG5cbiAgZnVuY3Rpb24gY29tcGFyZU5vZGUoYSwgYikge1xuICAgIHJldHVybiBhICYmIGIgPyBjb21wYXJlKGEuX19kYXRhX18sIGIuX19kYXRhX18pIDogIWEgLSAhYjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHNvcnRncm91cHMgPSBuZXcgQXJyYXkobSksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIHNvcnRncm91cCA9IHNvcnRncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNvcnRncm91cFtpXSA9IG5vZGU7XG4gICAgICB9XG4gICAgfVxuICAgIHNvcnRncm91cC5zb3J0KGNvbXBhcmVOb2RlKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHNvcnRncm91cHMsIHRoaXMuX3BhcmVudHMpLm9yZGVyKCk7XG59XG5cbmZ1bmN0aW9uIGFzY2VuZGluZyhhLCBiKSB7XG4gIHJldHVybiBhIDwgYiA/IC0xIDogYSA+IGIgPyAxIDogYSA+PSBiID8gMCA6IE5hTjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgY2FsbGJhY2sgPSBhcmd1bWVudHNbMF07XG4gIGFyZ3VtZW50c1swXSA9IHRoaXM7XG4gIGNhbGxiYWNrLmFwcGx5KG51bGwsIGFyZ3VtZW50cyk7XG4gIHJldHVybiB0aGlzO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBub2RlcyA9IG5ldyBBcnJheSh0aGlzLnNpemUoKSksIGkgPSAtMTtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkgeyBub2Rlc1srK2ldID0gdGhpczsgfSk7XG4gIHJldHVybiBub2Rlcztcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgaiA9IDAsIG0gPSBncm91cHMubGVuZ3RoOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIGkgPSAwLCBuID0gZ3JvdXAubGVuZ3RoOyBpIDwgbjsgKytpKSB7XG4gICAgICB2YXIgbm9kZSA9IGdyb3VwW2ldO1xuICAgICAgaWYgKG5vZGUpIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHZhciBzaXplID0gMDtcbiAgdGhpcy5lYWNoKGZ1bmN0aW9uKCkgeyArK3NpemU7IH0pO1xuICByZXR1cm4gc2l6ZTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gIXRoaXMubm9kZSgpO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oY2FsbGJhY2spIHtcblxuICBmb3IgKHZhciBncm91cHMgPSB0aGlzLl9ncm91cHMsIGogPSAwLCBtID0gZ3JvdXBzLmxlbmd0aDsgaiA8IG07ICsraikge1xuICAgIGZvciAodmFyIGdyb3VwID0gZ3JvdXBzW2pdLCBpID0gMCwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZTsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cFtpXSkgY2FsbGJhY2suY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59XG4iLCJleHBvcnQgdmFyIHhodG1sID0gXCJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hodG1sXCI7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgc3ZnOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIsXG4gIHhodG1sOiB4aHRtbCxcbiAgeGxpbms6IFwiaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGlua1wiLFxuICB4bWw6IFwiaHR0cDovL3d3dy53My5vcmcvWE1MLzE5OTgvbmFtZXNwYWNlXCIsXG4gIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAveG1sbnMvXCJcbn07XG4iLCJpbXBvcnQgbmFtZXNwYWNlcyBmcm9tIFwiLi9uYW1lc3BhY2VzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIHByZWZpeCA9IG5hbWUgKz0gXCJcIiwgaSA9IHByZWZpeC5pbmRleE9mKFwiOlwiKTtcbiAgaWYgKGkgPj0gMCAmJiAocHJlZml4ID0gbmFtZS5zbGljZSgwLCBpKSkgIT09IFwieG1sbnNcIikgbmFtZSA9IG5hbWUuc2xpY2UoaSArIDEpO1xuICByZXR1cm4gbmFtZXNwYWNlcy5oYXNPd25Qcm9wZXJ0eShwcmVmaXgpID8ge3NwYWNlOiBuYW1lc3BhY2VzW3ByZWZpeF0sIGxvY2FsOiBuYW1lfSA6IG5hbWU7XG59XG4iLCJpbXBvcnQgbmFtZXNwYWNlIGZyb20gXCIuLi9uYW1lc3BhY2VcIjtcblxuZnVuY3Rpb24gYXR0clJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0clJlbW92ZU5TKGZ1bGxuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnJlbW92ZUF0dHJpYnV0ZU5TKGZ1bGxuYW1lLnNwYWNlLCBmdWxsbmFtZS5sb2NhbCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJDb25zdGFudChuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnROUyhmdWxsbmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCB2YWx1ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICAgIGVsc2UgdGhpcy5zZXRBdHRyaWJ1dGUobmFtZSwgdik7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJGdW5jdGlvbk5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIGlmICh2ID09IG51bGwpIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBlbHNlIHRoaXMuc2V0QXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsLCB2KTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpO1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBub2RlID0gdGhpcy5ub2RlKCk7XG4gICAgcmV0dXJuIGZ1bGxuYW1lLmxvY2FsXG4gICAgICAgID8gbm9kZS5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpXG4gICAgICAgIDogbm9kZS5nZXRBdHRyaWJ1dGUoZnVsbG5hbWUpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXMuZWFjaCgodmFsdWUgPT0gbnVsbFxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyUmVtb3ZlTlMgOiBhdHRyUmVtb3ZlKSA6ICh0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyAoZnVsbG5hbWUubG9jYWwgPyBhdHRyRnVuY3Rpb25OUyA6IGF0dHJGdW5jdGlvbilcbiAgICAgIDogKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckNvbnN0YW50TlMgOiBhdHRyQ29uc3RhbnQpKSkoZnVsbG5hbWUsIHZhbHVlKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlKSB7XG4gIHJldHVybiAobm9kZS5vd25lckRvY3VtZW50ICYmIG5vZGUub3duZXJEb2N1bWVudC5kZWZhdWx0VmlldykgLy8gbm9kZSBpcyBhIE5vZGVcbiAgICAgIHx8IChub2RlLmRvY3VtZW50ICYmIG5vZGUpIC8vIG5vZGUgaXMgYSBXaW5kb3dcbiAgICAgIHx8IG5vZGUuZGVmYXVsdFZpZXc7IC8vIG5vZGUgaXMgYSBEb2N1bWVudFxufVxuIiwiaW1wb3J0IGRlZmF1bHRWaWV3IGZyb20gXCIuLi93aW5kb3dcIjtcblxuZnVuY3Rpb24gc3R5bGVSZW1vdmUobmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVDb25zdGFudChuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuc3R5bGUuc2V0UHJvcGVydHkobmFtZSwgdmFsdWUsIHByaW9yaXR5KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVGdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICAgIGVsc2UgdGhpcy5zdHlsZS5zZXRQcm9wZXJ0eShuYW1lLCB2LCBwcmlvcml0eSk7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDFcbiAgICAgID8gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgICA/IHN0eWxlUmVtb3ZlIDogdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICAgID8gc3R5bGVGdW5jdGlvblxuICAgICAgICAgICAgOiBzdHlsZUNvbnN0YW50KShuYW1lLCB2YWx1ZSwgcHJpb3JpdHkgPT0gbnVsbCA/IFwiXCIgOiBwcmlvcml0eSkpXG4gICAgICA6IHN0eWxlVmFsdWUodGhpcy5ub2RlKCksIG5hbWUpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc3R5bGVWYWx1ZShub2RlLCBuYW1lKSB7XG4gIHJldHVybiBub2RlLnN0eWxlLmdldFByb3BlcnR5VmFsdWUobmFtZSlcbiAgICAgIHx8IGRlZmF1bHRWaWV3KG5vZGUpLmdldENvbXB1dGVkU3R5bGUobm9kZSwgbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShuYW1lKTtcbn1cbiIsImZ1bmN0aW9uIHByb3BlcnR5UmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIGRlbGV0ZSB0aGlzW25hbWVdO1xuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9wZXJ0eUNvbnN0YW50KG5hbWUsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzW25hbWVdID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHByb3BlcnR5RnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciB2ID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAodiA9PSBudWxsKSBkZWxldGUgdGhpc1tuYW1lXTtcbiAgICBlbHNlIHRoaXNbbmFtZV0gPSB2O1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA+IDFcbiAgICAgID8gdGhpcy5lYWNoKCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyBwcm9wZXJ0eVJlbW92ZSA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBwcm9wZXJ0eUZ1bmN0aW9uXG4gICAgICAgICAgOiBwcm9wZXJ0eUNvbnN0YW50KShuYW1lLCB2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpW25hbWVdO1xufVxuIiwiZnVuY3Rpb24gY2xhc3NBcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy50cmltKCkuc3BsaXQoL158XFxzKy8pO1xufVxuXG5mdW5jdGlvbiBjbGFzc0xpc3Qobm9kZSkge1xuICByZXR1cm4gbm9kZS5jbGFzc0xpc3QgfHwgbmV3IENsYXNzTGlzdChub2RlKTtcbn1cblxuZnVuY3Rpb24gQ2xhc3NMaXN0KG5vZGUpIHtcbiAgdGhpcy5fbm9kZSA9IG5vZGU7XG4gIHRoaXMuX25hbWVzID0gY2xhc3NBcnJheShub2RlLmdldEF0dHJpYnV0ZShcImNsYXNzXCIpIHx8IFwiXCIpO1xufVxuXG5DbGFzc0xpc3QucHJvdG90eXBlID0ge1xuICBhZGQ6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgaWYgKGkgPCAwKSB7XG4gICAgICB0aGlzLl9uYW1lcy5wdXNoKG5hbWUpO1xuICAgICAgdGhpcy5fbm9kZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLl9uYW1lcy5qb2luKFwiIFwiKSk7XG4gICAgfVxuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICB2YXIgaSA9IHRoaXMuX25hbWVzLmluZGV4T2YobmFtZSk7XG4gICAgaWYgKGkgPj0gMCkge1xuICAgICAgdGhpcy5fbmFtZXMuc3BsaWNlKGksIDEpO1xuICAgICAgdGhpcy5fbm9kZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCB0aGlzLl9uYW1lcy5qb2luKFwiIFwiKSk7XG4gICAgfVxuICB9LFxuICBjb250YWluczogZnVuY3Rpb24obmFtZSkge1xuICAgIHJldHVybiB0aGlzLl9uYW1lcy5pbmRleE9mKG5hbWUpID49IDA7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGNsYXNzZWRBZGQobm9kZSwgbmFtZXMpIHtcbiAgdmFyIGxpc3QgPSBjbGFzc0xpc3Qobm9kZSksIGkgPSAtMSwgbiA9IG5hbWVzLmxlbmd0aDtcbiAgd2hpbGUgKCsraSA8IG4pIGxpc3QuYWRkKG5hbWVzW2ldKTtcbn1cblxuZnVuY3Rpb24gY2xhc3NlZFJlbW92ZShub2RlLCBuYW1lcykge1xuICB2YXIgbGlzdCA9IGNsYXNzTGlzdChub2RlKSwgaSA9IC0xLCBuID0gbmFtZXMubGVuZ3RoO1xuICB3aGlsZSAoKytpIDwgbikgbGlzdC5yZW1vdmUobmFtZXNbaV0pO1xufVxuXG5mdW5jdGlvbiBjbGFzc2VkVHJ1ZShuYW1lcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY2xhc3NlZEFkZCh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRGYWxzZShuYW1lcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY2xhc3NlZFJlbW92ZSh0aGlzLCBuYW1lcyk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsYXNzZWRGdW5jdGlvbihuYW1lcywgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgICh2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpID8gY2xhc3NlZEFkZCA6IGNsYXNzZWRSZW1vdmUpKHRoaXMsIG5hbWVzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIG5hbWVzID0gY2xhc3NBcnJheShuYW1lICsgXCJcIik7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIGxpc3QgPSBjbGFzc0xpc3QodGhpcy5ub2RlKCkpLCBpID0gLTEsIG4gPSBuYW1lcy5sZW5ndGg7XG4gICAgd2hpbGUgKCsraSA8IG4pIGlmICghbGlzdC5jb250YWlucyhuYW1lc1tpXSkpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICA/IGNsYXNzZWRGdW5jdGlvbiA6IHZhbHVlXG4gICAgICA/IGNsYXNzZWRUcnVlXG4gICAgICA6IGNsYXNzZWRGYWxzZSkobmFtZXMsIHZhbHVlKSk7XG59XG4iLCJmdW5jdGlvbiB0ZXh0UmVtb3ZlKCkge1xuICB0aGlzLnRleHRDb250ZW50ID0gXCJcIjtcbn1cblxuZnVuY3Rpb24gdGV4dENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2ID09IG51bGwgPyBcIlwiIDogdjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWUpIHtcbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGhcbiAgICAgID8gdGhpcy5lYWNoKHZhbHVlID09IG51bGxcbiAgICAgICAgICA/IHRleHRSZW1vdmUgOiAodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IHRleHRGdW5jdGlvblxuICAgICAgICAgIDogdGV4dENvbnN0YW50KSh2YWx1ZSkpXG4gICAgICA6IHRoaXMubm9kZSgpLnRleHRDb250ZW50O1xufVxuIiwiZnVuY3Rpb24gaHRtbFJlbW92ZSgpIHtcbiAgdGhpcy5pbm5lckhUTUwgPSBcIlwiO1xufVxuXG5mdW5jdGlvbiBodG1sQ29uc3RhbnQodmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGh0bWxGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHYgPSB2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIHRoaXMuaW5uZXJIVE1MID0gdiA9PSBudWxsID8gXCJcIiA6IHY7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCh2YWx1ZSA9PSBudWxsXG4gICAgICAgICAgPyBodG1sUmVtb3ZlIDogKHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiXG4gICAgICAgICAgPyBodG1sRnVuY3Rpb25cbiAgICAgICAgICA6IGh0bWxDb25zdGFudCkodmFsdWUpKVxuICAgICAgOiB0aGlzLm5vZGUoKS5pbm5lckhUTUw7XG59XG4iLCJmdW5jdGlvbiByYWlzZSgpIHtcbiAgaWYgKHRoaXMubmV4dFNpYmxpbmcpIHRoaXMucGFyZW50Tm9kZS5hcHBlbmRDaGlsZCh0aGlzKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLmVhY2gocmFpc2UpO1xufVxuIiwiZnVuY3Rpb24gbG93ZXIoKSB7XG4gIGlmICh0aGlzLnByZXZpb3VzU2libGluZykgdGhpcy5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0aGlzLCB0aGlzLnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gdGhpcy5lYWNoKGxvd2VyKTtcbn1cbiIsImltcG9ydCBuYW1lc3BhY2UgZnJvbSBcIi4vbmFtZXNwYWNlXCI7XG5pbXBvcnQge3hodG1sfSBmcm9tIFwiLi9uYW1lc3BhY2VzXCI7XG5cbmZ1bmN0aW9uIGNyZWF0b3JJbmhlcml0KG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBkb2N1bWVudCA9IHRoaXMub3duZXJEb2N1bWVudCxcbiAgICAgICAgdXJpID0gdGhpcy5uYW1lc3BhY2VVUkk7XG4gICAgcmV0dXJuIHVyaSA9PT0geGh0bWwgJiYgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm5hbWVzcGFjZVVSSSA9PT0geGh0bWxcbiAgICAgICAgPyBkb2N1bWVudC5jcmVhdGVFbGVtZW50KG5hbWUpXG4gICAgICAgIDogZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKHVyaSwgbmFtZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0b3JGaXhlZChmdWxsbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMub3duZXJEb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSkge1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiAoZnVsbG5hbWUubG9jYWxcbiAgICAgID8gY3JlYXRvckZpeGVkXG4gICAgICA6IGNyZWF0b3JJbmhlcml0KShmdWxsbmFtZSk7XG59XG4iLCJpbXBvcnQgY3JlYXRvciBmcm9tIFwiLi4vY3JlYXRvclwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5hcHBlbmRDaGlsZChjcmVhdGUuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH0pO1xufVxuIiwiaW1wb3J0IGNyZWF0b3IgZnJvbSBcIi4uL2NyZWF0b3JcIjtcbmltcG9ydCBzZWxlY3RvciBmcm9tIFwiLi4vc2VsZWN0b3JcIjtcblxuZnVuY3Rpb24gY29uc3RhbnROdWxsKCkge1xuICByZXR1cm4gbnVsbDtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgYmVmb3JlKSB7XG4gIHZhciBjcmVhdGUgPSB0eXBlb2YgbmFtZSA9PT0gXCJmdW5jdGlvblwiID8gbmFtZSA6IGNyZWF0b3IobmFtZSksXG4gICAgICBzZWxlY3QgPSBiZWZvcmUgPT0gbnVsbCA/IGNvbnN0YW50TnVsbCA6IHR5cGVvZiBiZWZvcmUgPT09IFwiZnVuY3Rpb25cIiA/IGJlZm9yZSA6IHNlbGVjdG9yKGJlZm9yZSk7XG4gIHJldHVybiB0aGlzLnNlbGVjdChmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5pbnNlcnRCZWZvcmUoY3JlYXRlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyksIHNlbGVjdC5hcHBseSh0aGlzLCBhcmd1bWVudHMpIHx8IG51bGwpO1xuICB9KTtcbn1cbiIsImZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgdmFyIHBhcmVudCA9IHRoaXMucGFyZW50Tm9kZTtcbiAgaWYgKHBhcmVudCkgcGFyZW50LnJlbW92ZUNoaWxkKHRoaXMpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChyZW1vdmUpO1xufVxuIiwiZnVuY3Rpb24gc2VsZWN0aW9uX2Nsb25lU2hhbGxvdygpIHtcbiAgdmFyIGNsb25lID0gdGhpcy5jbG9uZU5vZGUoZmFsc2UpLCBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gIHJldHVybiBwYXJlbnQgPyBwYXJlbnQuaW5zZXJ0QmVmb3JlKGNsb25lLCB0aGlzLm5leHRTaWJsaW5nKSA6IGNsb25lO1xufVxuXG5mdW5jdGlvbiBzZWxlY3Rpb25fY2xvbmVEZWVwKCkge1xuICB2YXIgY2xvbmUgPSB0aGlzLmNsb25lTm9kZSh0cnVlKSwgcGFyZW50ID0gdGhpcy5wYXJlbnROb2RlO1xuICByZXR1cm4gcGFyZW50ID8gcGFyZW50Lmluc2VydEJlZm9yZShjbG9uZSwgdGhpcy5uZXh0U2libGluZykgOiBjbG9uZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVlcCkge1xuICByZXR1cm4gdGhpcy5zZWxlY3QoZGVlcCA/IHNlbGVjdGlvbl9jbG9uZURlZXAgOiBzZWxlY3Rpb25fY2xvbmVTaGFsbG93KTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMucHJvcGVydHkoXCJfX2RhdGFfX1wiLCB2YWx1ZSlcbiAgICAgIDogdGhpcy5ub2RlKCkuX19kYXRhX187XG59XG4iLCJ2YXIgZmlsdGVyRXZlbnRzID0ge307XG5cbmV4cG9ydCB2YXIgZXZlbnQgPSBudWxsO1xuXG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50O1xuICBpZiAoIShcIm9ubW91c2VlbnRlclwiIGluIGVsZW1lbnQpKSB7XG4gICAgZmlsdGVyRXZlbnRzID0ge21vdXNlZW50ZXI6IFwibW91c2VvdmVyXCIsIG1vdXNlbGVhdmU6IFwibW91c2VvdXRcIn07XG4gIH1cbn1cblxuZnVuY3Rpb24gZmlsdGVyQ29udGV4dExpc3RlbmVyKGxpc3RlbmVyLCBpbmRleCwgZ3JvdXApIHtcbiAgbGlzdGVuZXIgPSBjb250ZXh0TGlzdGVuZXIobGlzdGVuZXIsIGluZGV4LCBncm91cCk7XG4gIHJldHVybiBmdW5jdGlvbihldmVudCkge1xuICAgIHZhciByZWxhdGVkID0gZXZlbnQucmVsYXRlZFRhcmdldDtcbiAgICBpZiAoIXJlbGF0ZWQgfHwgKHJlbGF0ZWQgIT09IHRoaXMgJiYgIShyZWxhdGVkLmNvbXBhcmVEb2N1bWVudFBvc2l0aW9uKHRoaXMpICYgOCkpKSB7XG4gICAgICBsaXN0ZW5lci5jYWxsKHRoaXMsIGV2ZW50KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbnRleHRMaXN0ZW5lcihsaXN0ZW5lciwgaW5kZXgsIGdyb3VwKSB7XG4gIHJldHVybiBmdW5jdGlvbihldmVudDEpIHtcbiAgICB2YXIgZXZlbnQwID0gZXZlbnQ7IC8vIEV2ZW50cyBjYW4gYmUgcmVlbnRyYW50IChlLmcuLCBmb2N1cykuXG4gICAgZXZlbnQgPSBldmVudDE7XG4gICAgdHJ5IHtcbiAgICAgIGxpc3RlbmVyLmNhbGwodGhpcywgdGhpcy5fX2RhdGFfXywgaW5kZXgsIGdyb3VwKTtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZXZlbnQgPSBldmVudDA7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZXMpIHtcbiAgcmV0dXJuIHR5cGVuYW1lcy50cmltKCkuc3BsaXQoL158XFxzKy8pLm1hcChmdW5jdGlvbih0KSB7XG4gICAgdmFyIG5hbWUgPSBcIlwiLCBpID0gdC5pbmRleE9mKFwiLlwiKTtcbiAgICBpZiAoaSA+PSAwKSBuYW1lID0gdC5zbGljZShpICsgMSksIHQgPSB0LnNsaWNlKDAsIGkpO1xuICAgIHJldHVybiB7dHlwZTogdCwgbmFtZTogbmFtZX07XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvblJlbW92ZSh0eXBlbmFtZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIG9uID0gdGhpcy5fX29uO1xuICAgIGlmICghb24pIHJldHVybjtcbiAgICBmb3IgKHZhciBqID0gMCwgaSA9IC0xLCBtID0gb24ubGVuZ3RoLCBvOyBqIDwgbTsgKytqKSB7XG4gICAgICBpZiAobyA9IG9uW2pdLCAoIXR5cGVuYW1lLnR5cGUgfHwgby50eXBlID09PSB0eXBlbmFtZS50eXBlKSAmJiBvLm5hbWUgPT09IHR5cGVuYW1lLm5hbWUpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVFdmVudExpc3RlbmVyKG8udHlwZSwgby5saXN0ZW5lciwgby5jYXB0dXJlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9uWysraV0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoKytpKSBvbi5sZW5ndGggPSBpO1xuICAgIGVsc2UgZGVsZXRlIHRoaXMuX19vbjtcbiAgfTtcbn1cblxuZnVuY3Rpb24gb25BZGQodHlwZW5hbWUsIHZhbHVlLCBjYXB0dXJlKSB7XG4gIHZhciB3cmFwID0gZmlsdGVyRXZlbnRzLmhhc093blByb3BlcnR5KHR5cGVuYW1lLnR5cGUpID8gZmlsdGVyQ29udGV4dExpc3RlbmVyIDogY29udGV4dExpc3RlbmVyO1xuICByZXR1cm4gZnVuY3Rpb24oZCwgaSwgZ3JvdXApIHtcbiAgICB2YXIgb24gPSB0aGlzLl9fb24sIG8sIGxpc3RlbmVyID0gd3JhcCh2YWx1ZSwgaSwgZ3JvdXApO1xuICAgIGlmIChvbikgZm9yICh2YXIgaiA9IDAsIG0gPSBvbi5sZW5ndGg7IGogPCBtOyArK2opIHtcbiAgICAgIGlmICgobyA9IG9uW2pdKS50eXBlID09PSB0eXBlbmFtZS50eXBlICYmIG8ubmFtZSA9PT0gdHlwZW5hbWUubmFtZSkge1xuICAgICAgICB0aGlzLnJlbW92ZUV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyLCBvLmNhcHR1cmUpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIoby50eXBlLCBvLmxpc3RlbmVyID0gbGlzdGVuZXIsIG8uY2FwdHVyZSA9IGNhcHR1cmUpO1xuICAgICAgICBvLnZhbHVlID0gdmFsdWU7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5hZGRFdmVudExpc3RlbmVyKHR5cGVuYW1lLnR5cGUsIGxpc3RlbmVyLCBjYXB0dXJlKTtcbiAgICBvID0ge3R5cGU6IHR5cGVuYW1lLnR5cGUsIG5hbWU6IHR5cGVuYW1lLm5hbWUsIHZhbHVlOiB2YWx1ZSwgbGlzdGVuZXI6IGxpc3RlbmVyLCBjYXB0dXJlOiBjYXB0dXJlfTtcbiAgICBpZiAoIW9uKSB0aGlzLl9fb24gPSBbb107XG4gICAgZWxzZSBvbi5wdXNoKG8pO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih0eXBlbmFtZSwgdmFsdWUsIGNhcHR1cmUpIHtcbiAgdmFyIHR5cGVuYW1lcyA9IHBhcnNlVHlwZW5hbWVzKHR5cGVuYW1lICsgXCJcIiksIGksIG4gPSB0eXBlbmFtZXMubGVuZ3RoLCB0O1xuXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMikge1xuICAgIHZhciBvbiA9IHRoaXMubm9kZSgpLl9fb247XG4gICAgaWYgKG9uKSBmb3IgKHZhciBqID0gMCwgbSA9IG9uLmxlbmd0aCwgbzsgaiA8IG07ICsraikge1xuICAgICAgZm9yIChpID0gMCwgbyA9IG9uW2pdOyBpIDwgbjsgKytpKSB7XG4gICAgICAgIGlmICgodCA9IHR5cGVuYW1lc1tpXSkudHlwZSA9PT0gby50eXBlICYmIHQubmFtZSA9PT0gby5uYW1lKSB7XG4gICAgICAgICAgcmV0dXJuIG8udmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgb24gPSB2YWx1ZSA/IG9uQWRkIDogb25SZW1vdmU7XG4gIGlmIChjYXB0dXJlID09IG51bGwpIGNhcHR1cmUgPSBmYWxzZTtcbiAgZm9yIChpID0gMDsgaSA8IG47ICsraSkgdGhpcy5lYWNoKG9uKHR5cGVuYW1lc1tpXSwgdmFsdWUsIGNhcHR1cmUpKTtcbiAgcmV0dXJuIHRoaXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjdXN0b21FdmVudChldmVudDEsIGxpc3RlbmVyLCB0aGF0LCBhcmdzKSB7XG4gIHZhciBldmVudDAgPSBldmVudDtcbiAgZXZlbnQxLnNvdXJjZUV2ZW50ID0gZXZlbnQ7XG4gIGV2ZW50ID0gZXZlbnQxO1xuICB0cnkge1xuICAgIHJldHVybiBsaXN0ZW5lci5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfSBmaW5hbGx5IHtcbiAgICBldmVudCA9IGV2ZW50MDtcbiAgfVxufVxuIiwiaW1wb3J0IGRlZmF1bHRWaWV3IGZyb20gXCIuLi93aW5kb3dcIjtcblxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChub2RlLCB0eXBlLCBwYXJhbXMpIHtcbiAgdmFyIHdpbmRvdyA9IGRlZmF1bHRWaWV3KG5vZGUpLFxuICAgICAgZXZlbnQgPSB3aW5kb3cuQ3VzdG9tRXZlbnQ7XG5cbiAgaWYgKHR5cGVvZiBldmVudCA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgZXZlbnQgPSBuZXcgZXZlbnQodHlwZSwgcGFyYW1zKTtcbiAgfSBlbHNlIHtcbiAgICBldmVudCA9IHdpbmRvdy5kb2N1bWVudC5jcmVhdGVFdmVudChcIkV2ZW50XCIpO1xuICAgIGlmIChwYXJhbXMpIGV2ZW50LmluaXRFdmVudCh0eXBlLCBwYXJhbXMuYnViYmxlcywgcGFyYW1zLmNhbmNlbGFibGUpLCBldmVudC5kZXRhaWwgPSBwYXJhbXMuZGV0YWlsO1xuICAgIGVsc2UgZXZlbnQuaW5pdEV2ZW50KHR5cGUsIGZhbHNlLCBmYWxzZSk7XG4gIH1cblxuICBub2RlLmRpc3BhdGNoRXZlbnQoZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBkaXNwYXRjaENvbnN0YW50KHR5cGUsIHBhcmFtcykge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRpc3BhdGNoRXZlbnQodGhpcywgdHlwZSwgcGFyYW1zKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hGdW5jdGlvbih0eXBlLCBwYXJhbXMpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBkaXNwYXRjaEV2ZW50KHRoaXMsIHR5cGUsIHBhcmFtcy5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHlwZSwgcGFyYW1zKSB7XG4gIHJldHVybiB0aGlzLmVhY2goKHR5cGVvZiBwYXJhbXMgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyBkaXNwYXRjaEZ1bmN0aW9uXG4gICAgICA6IGRpc3BhdGNoQ29uc3RhbnQpKHR5cGUsIHBhcmFtcykpO1xufVxuIiwiaW1wb3J0IHNlbGVjdGlvbl9zZWxlY3QgZnJvbSBcIi4vc2VsZWN0XCI7XG5pbXBvcnQgc2VsZWN0aW9uX3NlbGVjdEFsbCBmcm9tIFwiLi9zZWxlY3RBbGxcIjtcbmltcG9ydCBzZWxlY3Rpb25fZmlsdGVyIGZyb20gXCIuL2ZpbHRlclwiO1xuaW1wb3J0IHNlbGVjdGlvbl9kYXRhIGZyb20gXCIuL2RhdGFcIjtcbmltcG9ydCBzZWxlY3Rpb25fZW50ZXIgZnJvbSBcIi4vZW50ZXJcIjtcbmltcG9ydCBzZWxlY3Rpb25fZXhpdCBmcm9tIFwiLi9leGl0XCI7XG5pbXBvcnQgc2VsZWN0aW9uX2pvaW4gZnJvbSBcIi4vam9pblwiO1xuaW1wb3J0IHNlbGVjdGlvbl9tZXJnZSBmcm9tIFwiLi9tZXJnZVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9vcmRlciBmcm9tIFwiLi9vcmRlclwiO1xuaW1wb3J0IHNlbGVjdGlvbl9zb3J0IGZyb20gXCIuL3NvcnRcIjtcbmltcG9ydCBzZWxlY3Rpb25fY2FsbCBmcm9tIFwiLi9jYWxsXCI7XG5pbXBvcnQgc2VsZWN0aW9uX25vZGVzIGZyb20gXCIuL25vZGVzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX25vZGUgZnJvbSBcIi4vbm9kZVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9zaXplIGZyb20gXCIuL3NpemVcIjtcbmltcG9ydCBzZWxlY3Rpb25fZW1wdHkgZnJvbSBcIi4vZW1wdHlcIjtcbmltcG9ydCBzZWxlY3Rpb25fZWFjaCBmcm9tIFwiLi9lYWNoXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2F0dHIgZnJvbSBcIi4vYXR0clwiO1xuaW1wb3J0IHNlbGVjdGlvbl9zdHlsZSBmcm9tIFwiLi9zdHlsZVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9wcm9wZXJ0eSBmcm9tIFwiLi9wcm9wZXJ0eVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9jbGFzc2VkIGZyb20gXCIuL2NsYXNzZWRcIjtcbmltcG9ydCBzZWxlY3Rpb25fdGV4dCBmcm9tIFwiLi90ZXh0XCI7XG5pbXBvcnQgc2VsZWN0aW9uX2h0bWwgZnJvbSBcIi4vaHRtbFwiO1xuaW1wb3J0IHNlbGVjdGlvbl9yYWlzZSBmcm9tIFwiLi9yYWlzZVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9sb3dlciBmcm9tIFwiLi9sb3dlclwiO1xuaW1wb3J0IHNlbGVjdGlvbl9hcHBlbmQgZnJvbSBcIi4vYXBwZW5kXCI7XG5pbXBvcnQgc2VsZWN0aW9uX2luc2VydCBmcm9tIFwiLi9pbnNlcnRcIjtcbmltcG9ydCBzZWxlY3Rpb25fcmVtb3ZlIGZyb20gXCIuL3JlbW92ZVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9jbG9uZSBmcm9tIFwiLi9jbG9uZVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9kYXR1bSBmcm9tIFwiLi9kYXR1bVwiO1xuaW1wb3J0IHNlbGVjdGlvbl9vbiBmcm9tIFwiLi9vblwiO1xuaW1wb3J0IHNlbGVjdGlvbl9kaXNwYXRjaCBmcm9tIFwiLi9kaXNwYXRjaFwiO1xuXG5leHBvcnQgdmFyIHJvb3QgPSBbbnVsbF07XG5cbmV4cG9ydCBmdW5jdGlvbiBTZWxlY3Rpb24oZ3JvdXBzLCBwYXJlbnRzKSB7XG4gIHRoaXMuX2dyb3VwcyA9IGdyb3VwcztcbiAgdGhpcy5fcGFyZW50cyA9IHBhcmVudHM7XG59XG5cbmZ1bmN0aW9uIHNlbGVjdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBTZWxlY3Rpb24oW1tkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdXSwgcm9vdCk7XG59XG5cblNlbGVjdGlvbi5wcm90b3R5cGUgPSBzZWxlY3Rpb24ucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogU2VsZWN0aW9uLFxuICBzZWxlY3Q6IHNlbGVjdGlvbl9zZWxlY3QsXG4gIHNlbGVjdEFsbDogc2VsZWN0aW9uX3NlbGVjdEFsbCxcbiAgZmlsdGVyOiBzZWxlY3Rpb25fZmlsdGVyLFxuICBkYXRhOiBzZWxlY3Rpb25fZGF0YSxcbiAgZW50ZXI6IHNlbGVjdGlvbl9lbnRlcixcbiAgZXhpdDogc2VsZWN0aW9uX2V4aXQsXG4gIGpvaW46IHNlbGVjdGlvbl9qb2luLFxuICBtZXJnZTogc2VsZWN0aW9uX21lcmdlLFxuICBvcmRlcjogc2VsZWN0aW9uX29yZGVyLFxuICBzb3J0OiBzZWxlY3Rpb25fc29ydCxcbiAgY2FsbDogc2VsZWN0aW9uX2NhbGwsXG4gIG5vZGVzOiBzZWxlY3Rpb25fbm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9ub2RlLFxuICBzaXplOiBzZWxlY3Rpb25fc2l6ZSxcbiAgZW1wdHk6IHNlbGVjdGlvbl9lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX2VhY2gsXG4gIGF0dHI6IHNlbGVjdGlvbl9hdHRyLFxuICBzdHlsZTogc2VsZWN0aW9uX3N0eWxlLFxuICBwcm9wZXJ0eTogc2VsZWN0aW9uX3Byb3BlcnR5LFxuICBjbGFzc2VkOiBzZWxlY3Rpb25fY2xhc3NlZCxcbiAgdGV4dDogc2VsZWN0aW9uX3RleHQsXG4gIGh0bWw6IHNlbGVjdGlvbl9odG1sLFxuICByYWlzZTogc2VsZWN0aW9uX3JhaXNlLFxuICBsb3dlcjogc2VsZWN0aW9uX2xvd2VyLFxuICBhcHBlbmQ6IHNlbGVjdGlvbl9hcHBlbmQsXG4gIGluc2VydDogc2VsZWN0aW9uX2luc2VydCxcbiAgcmVtb3ZlOiBzZWxlY3Rpb25fcmVtb3ZlLFxuICBjbG9uZTogc2VsZWN0aW9uX2Nsb25lLFxuICBkYXR1bTogc2VsZWN0aW9uX2RhdHVtLFxuICBvbjogc2VsZWN0aW9uX29uLFxuICBkaXNwYXRjaDogc2VsZWN0aW9uX2Rpc3BhdGNoXG59O1xuXG5leHBvcnQgZGVmYXVsdCBzZWxlY3Rpb247XG4iLCJpbXBvcnQge1NlbGVjdGlvbiwgcm9vdH0gZnJvbSBcIi4vc2VsZWN0aW9uL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCJcbiAgICAgID8gbmV3IFNlbGVjdGlvbihbW2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXV0sIFtkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRdKVxuICAgICAgOiBuZXcgU2VsZWN0aW9uKFtbc2VsZWN0b3JdXSwgcm9vdCk7XG59XG4iLCJpbXBvcnQge1NlbGVjdGlvbiwgcm9vdH0gZnJvbSBcIi4vc2VsZWN0aW9uL2luZGV4XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHNlbGVjdG9yKSB7XG4gIHJldHVybiB0eXBlb2Ygc2VsZWN0b3IgPT09IFwic3RyaW5nXCJcbiAgICAgID8gbmV3IFNlbGVjdGlvbihbZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3RvcildLCBbZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XSlcbiAgICAgIDogbmV3IFNlbGVjdGlvbihbc2VsZWN0b3IgPT0gbnVsbCA/IFtdIDogc2VsZWN0b3JdLCByb290KTtcbn1cbiIsImV4cG9ydCB2YXIgcHJlZml4ID0gXCIkXCI7XG5cbmZ1bmN0aW9uIE1hcCgpIHt9XG5cbk1hcC5wcm90b3R5cGUgPSBtYXAucHJvdG90eXBlID0ge1xuICBjb25zdHJ1Y3RvcjogTWFwLFxuICBoYXM6IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiAocHJlZml4ICsga2V5KSBpbiB0aGlzO1xuICB9LFxuICBnZXQ6IGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiB0aGlzW3ByZWZpeCArIGtleV07XG4gIH0sXG4gIHNldDogZnVuY3Rpb24oa2V5LCB2YWx1ZSkge1xuICAgIHRoaXNbcHJlZml4ICsga2V5XSA9IHZhbHVlO1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICByZW1vdmU6IGZ1bmN0aW9uKGtleSkge1xuICAgIHZhciBwcm9wZXJ0eSA9IHByZWZpeCArIGtleTtcbiAgICByZXR1cm4gcHJvcGVydHkgaW4gdGhpcyAmJiBkZWxldGUgdGhpc1twcm9wZXJ0eV07XG4gIH0sXG4gIGNsZWFyOiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgZGVsZXRlIHRoaXNbcHJvcGVydHldO1xuICB9LFxuICBrZXlzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSBrZXlzLnB1c2gocHJvcGVydHkuc2xpY2UoMSkpO1xuICAgIHJldHVybiBrZXlzO1xuICB9LFxuICB2YWx1ZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciB2YWx1ZXMgPSBbXTtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgdmFsdWVzLnB1c2godGhpc1twcm9wZXJ0eV0pO1xuICAgIHJldHVybiB2YWx1ZXM7XG4gIH0sXG4gIGVudHJpZXM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlbnRyaWVzID0gW107XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIGVudHJpZXMucHVzaCh7a2V5OiBwcm9wZXJ0eS5zbGljZSgxKSwgdmFsdWU6IHRoaXNbcHJvcGVydHldfSk7XG4gICAgcmV0dXJuIGVudHJpZXM7XG4gIH0sXG4gIHNpemU6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBzaXplID0gMDtcbiAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzKSBpZiAocHJvcGVydHlbMF0gPT09IHByZWZpeCkgKytzaXplO1xuICAgIHJldHVybiBzaXplO1xuICB9LFxuICBlbXB0eTogZnVuY3Rpb24oKSB7XG4gICAgZm9yICh2YXIgcHJvcGVydHkgaW4gdGhpcykgaWYgKHByb3BlcnR5WzBdID09PSBwcmVmaXgpIHJldHVybiBmYWxzZTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcbiAgZWFjaDogZnVuY3Rpb24oZikge1xuICAgIGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMpIGlmIChwcm9wZXJ0eVswXSA9PT0gcHJlZml4KSBmKHRoaXNbcHJvcGVydHldLCBwcm9wZXJ0eS5zbGljZSgxKSwgdGhpcyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIG1hcChvYmplY3QsIGYpIHtcbiAgdmFyIG1hcCA9IG5ldyBNYXA7XG5cbiAgLy8gQ29weSBjb25zdHJ1Y3Rvci5cbiAgaWYgKG9iamVjdCBpbnN0YW5jZW9mIE1hcCkgb2JqZWN0LmVhY2goZnVuY3Rpb24odmFsdWUsIGtleSkgeyBtYXAuc2V0KGtleSwgdmFsdWUpOyB9KTtcblxuICAvLyBJbmRleCBhcnJheSBieSBudW1lcmljIGluZGV4IG9yIHNwZWNpZmllZCBrZXkgZnVuY3Rpb24uXG4gIGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgIHZhciBpID0gLTEsXG4gICAgICAgIG4gPSBvYmplY3QubGVuZ3RoLFxuICAgICAgICBvO1xuXG4gICAgaWYgKGYgPT0gbnVsbCkgd2hpbGUgKCsraSA8IG4pIG1hcC5zZXQoaSwgb2JqZWN0W2ldKTtcbiAgICBlbHNlIHdoaWxlICgrK2kgPCBuKSBtYXAuc2V0KGYobyA9IG9iamVjdFtpXSwgaSwgb2JqZWN0KSwgbyk7XG4gIH1cblxuICAvLyBDb252ZXJ0IG9iamVjdCB0byBtYXAuXG4gIGVsc2UgaWYgKG9iamVjdCkgZm9yICh2YXIga2V5IGluIG9iamVjdCkgbWFwLnNldChrZXksIG9iamVjdFtrZXldKTtcblxuICByZXR1cm4gbWFwO1xufVxuXG5leHBvcnQgZGVmYXVsdCBtYXA7XG4iLCJpbXBvcnQgbWFwIGZyb20gXCIuL21hcFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbigpIHtcbiAgdmFyIGtleXMgPSBbXSxcbiAgICAgIHNvcnRLZXlzID0gW10sXG4gICAgICBzb3J0VmFsdWVzLFxuICAgICAgcm9sbHVwLFxuICAgICAgbmVzdDtcblxuICBmdW5jdGlvbiBhcHBseShhcnJheSwgZGVwdGgsIGNyZWF0ZVJlc3VsdCwgc2V0UmVzdWx0KSB7XG4gICAgaWYgKGRlcHRoID49IGtleXMubGVuZ3RoKSB7XG4gICAgICBpZiAoc29ydFZhbHVlcyAhPSBudWxsKSBhcnJheS5zb3J0KHNvcnRWYWx1ZXMpO1xuICAgICAgcmV0dXJuIHJvbGx1cCAhPSBudWxsID8gcm9sbHVwKGFycmF5KSA6IGFycmF5O1xuICAgIH1cblxuICAgIHZhciBpID0gLTEsXG4gICAgICAgIG4gPSBhcnJheS5sZW5ndGgsXG4gICAgICAgIGtleSA9IGtleXNbZGVwdGgrK10sXG4gICAgICAgIGtleVZhbHVlLFxuICAgICAgICB2YWx1ZSxcbiAgICAgICAgdmFsdWVzQnlLZXkgPSBtYXAoKSxcbiAgICAgICAgdmFsdWVzLFxuICAgICAgICByZXN1bHQgPSBjcmVhdGVSZXN1bHQoKTtcblxuICAgIHdoaWxlICgrK2kgPCBuKSB7XG4gICAgICBpZiAodmFsdWVzID0gdmFsdWVzQnlLZXkuZ2V0KGtleVZhbHVlID0ga2V5KHZhbHVlID0gYXJyYXlbaV0pICsgXCJcIikpIHtcbiAgICAgICAgdmFsdWVzLnB1c2godmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVzQnlLZXkuc2V0KGtleVZhbHVlLCBbdmFsdWVdKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB2YWx1ZXNCeUtleS5lYWNoKGZ1bmN0aW9uKHZhbHVlcywga2V5KSB7XG4gICAgICBzZXRSZXN1bHQocmVzdWx0LCBrZXksIGFwcGx5KHZhbHVlcywgZGVwdGgsIGNyZWF0ZVJlc3VsdCwgc2V0UmVzdWx0KSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZnVuY3Rpb24gZW50cmllcyhtYXAsIGRlcHRoKSB7XG4gICAgaWYgKCsrZGVwdGggPiBrZXlzLmxlbmd0aCkgcmV0dXJuIG1hcDtcbiAgICB2YXIgYXJyYXksIHNvcnRLZXkgPSBzb3J0S2V5c1tkZXB0aCAtIDFdO1xuICAgIGlmIChyb2xsdXAgIT0gbnVsbCAmJiBkZXB0aCA+PSBrZXlzLmxlbmd0aCkgYXJyYXkgPSBtYXAuZW50cmllcygpO1xuICAgIGVsc2UgYXJyYXkgPSBbXSwgbWFwLmVhY2goZnVuY3Rpb24odiwgaykgeyBhcnJheS5wdXNoKHtrZXk6IGssIHZhbHVlczogZW50cmllcyh2LCBkZXB0aCl9KTsgfSk7XG4gICAgcmV0dXJuIHNvcnRLZXkgIT0gbnVsbCA/IGFycmF5LnNvcnQoZnVuY3Rpb24oYSwgYikgeyByZXR1cm4gc29ydEtleShhLmtleSwgYi5rZXkpOyB9KSA6IGFycmF5O1xuICB9XG5cbiAgcmV0dXJuIG5lc3QgPSB7XG4gICAgb2JqZWN0OiBmdW5jdGlvbihhcnJheSkgeyByZXR1cm4gYXBwbHkoYXJyYXksIDAsIGNyZWF0ZU9iamVjdCwgc2V0T2JqZWN0KTsgfSxcbiAgICBtYXA6IGZ1bmN0aW9uKGFycmF5KSB7IHJldHVybiBhcHBseShhcnJheSwgMCwgY3JlYXRlTWFwLCBzZXRNYXApOyB9LFxuICAgIGVudHJpZXM6IGZ1bmN0aW9uKGFycmF5KSB7IHJldHVybiBlbnRyaWVzKGFwcGx5KGFycmF5LCAwLCBjcmVhdGVNYXAsIHNldE1hcCksIDApOyB9LFxuICAgIGtleTogZnVuY3Rpb24oZCkgeyBrZXlzLnB1c2goZCk7IHJldHVybiBuZXN0OyB9LFxuICAgIHNvcnRLZXlzOiBmdW5jdGlvbihvcmRlcikgeyBzb3J0S2V5c1trZXlzLmxlbmd0aCAtIDFdID0gb3JkZXI7IHJldHVybiBuZXN0OyB9LFxuICAgIHNvcnRWYWx1ZXM6IGZ1bmN0aW9uKG9yZGVyKSB7IHNvcnRWYWx1ZXMgPSBvcmRlcjsgcmV0dXJuIG5lc3Q7IH0sXG4gICAgcm9sbHVwOiBmdW5jdGlvbihmKSB7IHJvbGx1cCA9IGY7IHJldHVybiBuZXN0OyB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU9iamVjdCgpIHtcbiAgcmV0dXJuIHt9O1xufVxuXG5mdW5jdGlvbiBzZXRPYmplY3Qob2JqZWN0LCBrZXksIHZhbHVlKSB7XG4gIG9iamVjdFtrZXldID0gdmFsdWU7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZU1hcCgpIHtcbiAgcmV0dXJuIG1hcCgpO1xufVxuXG5mdW5jdGlvbiBzZXRNYXAobWFwLCBrZXksIHZhbHVlKSB7XG4gIG1hcC5zZXQoa2V5LCB2YWx1ZSk7XG59XG4iLCJpbXBvcnQge2RlZmF1bHQgYXMgbWFwLCBwcmVmaXh9IGZyb20gXCIuL21hcFwiO1xuXG5mdW5jdGlvbiBTZXQoKSB7fVxuXG52YXIgcHJvdG8gPSBtYXAucHJvdG90eXBlO1xuXG5TZXQucHJvdG90eXBlID0gc2V0LnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFNldCxcbiAgaGFzOiBwcm90by5oYXMsXG4gIGFkZDogZnVuY3Rpb24odmFsdWUpIHtcbiAgICB2YWx1ZSArPSBcIlwiO1xuICAgIHRoaXNbcHJlZml4ICsgdmFsdWVdID0gdmFsdWU7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHJlbW92ZTogcHJvdG8ucmVtb3ZlLFxuICBjbGVhcjogcHJvdG8uY2xlYXIsXG4gIHZhbHVlczogcHJvdG8ua2V5cyxcbiAgc2l6ZTogcHJvdG8uc2l6ZSxcbiAgZW1wdHk6IHByb3RvLmVtcHR5LFxuICBlYWNoOiBwcm90by5lYWNoXG59O1xuXG5mdW5jdGlvbiBzZXQob2JqZWN0LCBmKSB7XG4gIHZhciBzZXQgPSBuZXcgU2V0O1xuXG4gIC8vIENvcHkgY29uc3RydWN0b3IuXG4gIGlmIChvYmplY3QgaW5zdGFuY2VvZiBTZXQpIG9iamVjdC5lYWNoKGZ1bmN0aW9uKHZhbHVlKSB7IHNldC5hZGQodmFsdWUpOyB9KTtcblxuICAvLyBPdGhlcndpc2UsIGFzc3VtZSBpdOKAmXMgYW4gYXJyYXkuXG4gIGVsc2UgaWYgKG9iamVjdCkge1xuICAgIHZhciBpID0gLTEsIG4gPSBvYmplY3QubGVuZ3RoO1xuICAgIGlmIChmID09IG51bGwpIHdoaWxlICgrK2kgPCBuKSBzZXQuYWRkKG9iamVjdFtpXSk7XG4gICAgZWxzZSB3aGlsZSAoKytpIDwgbikgc2V0LmFkZChmKG9iamVjdFtpXSwgaSwgb2JqZWN0KSk7XG4gIH1cblxuICByZXR1cm4gc2V0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBzZXQ7XG4iLCJleHBvcnQge2RlZmF1bHQgYXMgbmVzdH0gZnJvbSBcIi4vbmVzdFwiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHNldH0gZnJvbSBcIi4vc2V0XCI7XG5leHBvcnQge2RlZmF1bHQgYXMgbWFwfSBmcm9tIFwiLi9tYXBcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBrZXlzfSBmcm9tIFwiLi9rZXlzXCI7XG5leHBvcnQge2RlZmF1bHQgYXMgdmFsdWVzfSBmcm9tIFwiLi92YWx1ZXNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBlbnRyaWVzfSBmcm9tIFwiLi9lbnRyaWVzXCI7XG4iLCJ2YXIgYXJyYXkgPSBBcnJheS5wcm90b3R5cGU7XG5cbmV4cG9ydCB2YXIgbWFwID0gYXJyYXkubWFwO1xuZXhwb3J0IHZhciBzbGljZSA9IGFycmF5LnNsaWNlO1xuIiwiZXhwb3J0IGZ1bmN0aW9uIGluaXRSYW5nZShkb21haW4sIHJhbmdlKSB7XG4gIHN3aXRjaCAoYXJndW1lbnRzLmxlbmd0aCkge1xuICAgIGNhc2UgMDogYnJlYWs7XG4gICAgY2FzZSAxOiB0aGlzLnJhbmdlKGRvbWFpbik7IGJyZWFrO1xuICAgIGRlZmF1bHQ6IHRoaXMucmFuZ2UocmFuZ2UpLmRvbWFpbihkb21haW4pOyBicmVhaztcbiAgfVxuICByZXR1cm4gdGhpcztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRJbnRlcnBvbGF0b3IoZG9tYWluLCBpbnRlcnBvbGF0b3IpIHtcbiAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgY2FzZSAwOiBicmVhaztcbiAgICBjYXNlIDE6IHRoaXMuaW50ZXJwb2xhdG9yKGRvbWFpbik7IGJyZWFrO1xuICAgIGRlZmF1bHQ6IHRoaXMuaW50ZXJwb2xhdG9yKGludGVycG9sYXRvcikuZG9tYWluKGRvbWFpbik7IGJyZWFrO1xuICB9XG4gIHJldHVybiB0aGlzO1xufVxuIiwiaW1wb3J0IHttYXB9IGZyb20gXCJkMy1jb2xsZWN0aW9uXCI7XG5pbXBvcnQge3NsaWNlfSBmcm9tIFwiLi9hcnJheVwiO1xuaW1wb3J0IHtpbml0UmFuZ2V9IGZyb20gXCIuL2luaXRcIjtcblxuZXhwb3J0IHZhciBpbXBsaWNpdCA9IHtuYW1lOiBcImltcGxpY2l0XCJ9O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBvcmRpbmFsKCkge1xuICB2YXIgaW5kZXggPSBtYXAoKSxcbiAgICAgIGRvbWFpbiA9IFtdLFxuICAgICAgcmFuZ2UgPSBbXSxcbiAgICAgIHVua25vd24gPSBpbXBsaWNpdDtcblxuICBmdW5jdGlvbiBzY2FsZShkKSB7XG4gICAgdmFyIGtleSA9IGQgKyBcIlwiLCBpID0gaW5kZXguZ2V0KGtleSk7XG4gICAgaWYgKCFpKSB7XG4gICAgICBpZiAodW5rbm93biAhPT0gaW1wbGljaXQpIHJldHVybiB1bmtub3duO1xuICAgICAgaW5kZXguc2V0KGtleSwgaSA9IGRvbWFpbi5wdXNoKGQpKTtcbiAgICB9XG4gICAgcmV0dXJuIHJhbmdlWyhpIC0gMSkgJSByYW5nZS5sZW5ndGhdO1xuICB9XG5cbiAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbi5zbGljZSgpO1xuICAgIGRvbWFpbiA9IFtdLCBpbmRleCA9IG1hcCgpO1xuICAgIHZhciBpID0gLTEsIG4gPSBfLmxlbmd0aCwgZCwga2V5O1xuICAgIHdoaWxlICgrK2kgPCBuKSBpZiAoIWluZGV4LmhhcyhrZXkgPSAoZCA9IF9baV0pICsgXCJcIikpIGluZGV4LnNldChrZXksIGRvbWFpbi5wdXNoKGQpKTtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH07XG5cbiAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocmFuZ2UgPSBzbGljZS5jYWxsKF8pLCBzY2FsZSkgOiByYW5nZS5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLnVua25vd24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodW5rbm93biA9IF8sIHNjYWxlKSA6IHVua25vd247XG4gIH07XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBvcmRpbmFsKGRvbWFpbiwgcmFuZ2UpLnVua25vd24odW5rbm93bik7XG4gIH07XG5cbiAgaW5pdFJhbmdlLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xuXG4gIHJldHVybiBzY2FsZTtcbn1cbiIsImltcG9ydCB7cmFuZ2UgYXMgc2VxdWVuY2V9IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IHtpbml0UmFuZ2V9IGZyb20gXCIuL2luaXRcIjtcbmltcG9ydCBvcmRpbmFsIGZyb20gXCIuL29yZGluYWxcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gYmFuZCgpIHtcbiAgdmFyIHNjYWxlID0gb3JkaW5hbCgpLnVua25vd24odW5kZWZpbmVkKSxcbiAgICAgIGRvbWFpbiA9IHNjYWxlLmRvbWFpbixcbiAgICAgIG9yZGluYWxSYW5nZSA9IHNjYWxlLnJhbmdlLFxuICAgICAgcmFuZ2UgPSBbMCwgMV0sXG4gICAgICBzdGVwLFxuICAgICAgYmFuZHdpZHRoLFxuICAgICAgcm91bmQgPSBmYWxzZSxcbiAgICAgIHBhZGRpbmdJbm5lciA9IDAsXG4gICAgICBwYWRkaW5nT3V0ZXIgPSAwLFxuICAgICAgYWxpZ24gPSAwLjU7XG5cbiAgZGVsZXRlIHNjYWxlLnVua25vd247XG5cbiAgZnVuY3Rpb24gcmVzY2FsZSgpIHtcbiAgICB2YXIgbiA9IGRvbWFpbigpLmxlbmd0aCxcbiAgICAgICAgcmV2ZXJzZSA9IHJhbmdlWzFdIDwgcmFuZ2VbMF0sXG4gICAgICAgIHN0YXJ0ID0gcmFuZ2VbcmV2ZXJzZSAtIDBdLFxuICAgICAgICBzdG9wID0gcmFuZ2VbMSAtIHJldmVyc2VdO1xuICAgIHN0ZXAgPSAoc3RvcCAtIHN0YXJ0KSAvIE1hdGgubWF4KDEsIG4gLSBwYWRkaW5nSW5uZXIgKyBwYWRkaW5nT3V0ZXIgKiAyKTtcbiAgICBpZiAocm91bmQpIHN0ZXAgPSBNYXRoLmZsb29yKHN0ZXApO1xuICAgIHN0YXJ0ICs9IChzdG9wIC0gc3RhcnQgLSBzdGVwICogKG4gLSBwYWRkaW5nSW5uZXIpKSAqIGFsaWduO1xuICAgIGJhbmR3aWR0aCA9IHN0ZXAgKiAoMSAtIHBhZGRpbmdJbm5lcik7XG4gICAgaWYgKHJvdW5kKSBzdGFydCA9IE1hdGgucm91bmQoc3RhcnQpLCBiYW5kd2lkdGggPSBNYXRoLnJvdW5kKGJhbmR3aWR0aCk7XG4gICAgdmFyIHZhbHVlcyA9IHNlcXVlbmNlKG4pLm1hcChmdW5jdGlvbihpKSB7IHJldHVybiBzdGFydCArIHN0ZXAgKiBpOyB9KTtcbiAgICByZXR1cm4gb3JkaW5hbFJhbmdlKHJldmVyc2UgPyB2YWx1ZXMucmV2ZXJzZSgpIDogdmFsdWVzKTtcbiAgfVxuXG4gIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChkb21haW4oXyksIHJlc2NhbGUoKSkgOiBkb21haW4oKTtcbiAgfTtcblxuICBzY2FsZS5yYW5nZSA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChyYW5nZSA9IFsrX1swXSwgK19bMV1dLCByZXNjYWxlKCkpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgfTtcblxuICBzY2FsZS5yYW5nZVJvdW5kID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiByYW5nZSA9IFsrX1swXSwgK19bMV1dLCByb3VuZCA9IHRydWUsIHJlc2NhbGUoKTtcbiAgfTtcblxuICBzY2FsZS5iYW5kd2lkdGggPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gYmFuZHdpZHRoO1xuICB9O1xuXG4gIHNjYWxlLnN0ZXAgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc3RlcDtcbiAgfTtcblxuICBzY2FsZS5yb3VuZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChyb3VuZCA9ICEhXywgcmVzY2FsZSgpKSA6IHJvdW5kO1xuICB9O1xuXG4gIHNjYWxlLnBhZGRpbmcgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZ0lubmVyID0gTWF0aC5taW4oMSwgcGFkZGluZ091dGVyID0gK18pLCByZXNjYWxlKCkpIDogcGFkZGluZ0lubmVyO1xuICB9O1xuXG4gIHNjYWxlLnBhZGRpbmdJbm5lciA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChwYWRkaW5nSW5uZXIgPSBNYXRoLm1pbigxLCBfKSwgcmVzY2FsZSgpKSA6IHBhZGRpbmdJbm5lcjtcbiAgfTtcblxuICBzY2FsZS5wYWRkaW5nT3V0ZXIgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocGFkZGluZ091dGVyID0gK18sIHJlc2NhbGUoKSkgOiBwYWRkaW5nT3V0ZXI7XG4gIH07XG5cbiAgc2NhbGUuYWxpZ24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoYWxpZ24gPSBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBfKSksIHJlc2NhbGUoKSkgOiBhbGlnbjtcbiAgfTtcblxuICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGJhbmQoZG9tYWluKCksIHJhbmdlKVxuICAgICAgICAucm91bmQocm91bmQpXG4gICAgICAgIC5wYWRkaW5nSW5uZXIocGFkZGluZ0lubmVyKVxuICAgICAgICAucGFkZGluZ091dGVyKHBhZGRpbmdPdXRlcilcbiAgICAgICAgLmFsaWduKGFsaWduKTtcbiAgfTtcblxuICByZXR1cm4gaW5pdFJhbmdlLmFwcGx5KHJlc2NhbGUoKSwgYXJndW1lbnRzKTtcbn1cblxuZnVuY3Rpb24gcG9pbnRpc2goc2NhbGUpIHtcbiAgdmFyIGNvcHkgPSBzY2FsZS5jb3B5O1xuXG4gIHNjYWxlLnBhZGRpbmcgPSBzY2FsZS5wYWRkaW5nT3V0ZXI7XG4gIGRlbGV0ZSBzY2FsZS5wYWRkaW5nSW5uZXI7XG4gIGRlbGV0ZSBzY2FsZS5wYWRkaW5nT3V0ZXI7XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBwb2ludGlzaChjb3B5KCkpO1xuICB9O1xuXG4gIHJldHVybiBzY2FsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBvaW50KCkge1xuICByZXR1cm4gcG9pbnRpc2goYmFuZC5hcHBseShudWxsLCBhcmd1bWVudHMpLnBhZGRpbmdJbm5lcigxKSk7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb25zdHJ1Y3RvciwgZmFjdG9yeSwgcHJvdG90eXBlKSB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGZhY3RvcnkucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIGRlZmluaXRpb24pIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG4gIGZvciAodmFyIGtleSBpbiBkZWZpbml0aW9uKSBwcm90b3R5cGVba2V5XSA9IGRlZmluaXRpb25ba2V5XTtcbiAgcmV0dXJuIHByb3RvdHlwZTtcbn1cbiIsImltcG9ydCBkZWZpbmUsIHtleHRlbmR9IGZyb20gXCIuL2RlZmluZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29sb3IoKSB7fVxuXG5leHBvcnQgdmFyIGRhcmtlciA9IDAuNztcbmV4cG9ydCB2YXIgYnJpZ2h0ZXIgPSAxIC8gZGFya2VyO1xuXG52YXIgcmVJID0gXCJcXFxccyooWystXT9cXFxcZCspXFxcXHMqXCIsXG4gICAgcmVOID0gXCJcXFxccyooWystXT9cXFxcZCpcXFxcLj9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPylcXFxccypcIixcbiAgICByZVAgPSBcIlxcXFxzKihbKy1dP1xcXFxkKlxcXFwuP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZUksIHJlSSwgcmVJXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiYUludGVnZXIgPSBuZXcgUmVnRXhwKFwiXnJnYmFcXFxcKFwiICsgW3JlSSwgcmVJLCByZUksIHJlTl0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYmFQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5yZ2JhXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQLCByZU5dICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5oc2xcXFxcKFwiICsgW3JlTiwgcmVQLCByZVBdICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xhUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJeaHNsYVxcXFwoXCIgKyBbcmVOLCByZVAsIHJlUCwgcmVOXSArIFwiXFxcXCkkXCIpO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5OiBmdW5jdGlvbihjaGFubmVscykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyB0aGlzLmNvbnN0cnVjdG9yLCB0aGlzLCBjaGFubmVscyk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZ2IoKS5kaXNwbGF5YWJsZSgpO1xuICB9LFxuICBoZXg6IGNvbG9yX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiBjb2xvcl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhzbDogY29sb3JfZm9ybWF0SHNsLFxuICBmb3JtYXRSZ2I6IGNvbG9yX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IGNvbG9yX2Zvcm1hdFJnYlxufSk7XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICByZ2I6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICgtMC41IDw9IHRoaXMuciAmJiB0aGlzLnIgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5nICYmIHRoaXMuZyA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmIgJiYgdGhpcy5iIDwgMjU1LjUpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGhleDogcmdiX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiByZ2JfZm9ybWF0SGV4LFxuICBmb3JtYXRSZ2I6IHJnYl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiByZ2JfZm9ybWF0UmdiXG59KSk7XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiBcIiNcIiArIGhleCh0aGlzLnIpICsgaGV4KHRoaXMuZykgKyBoZXgodGhpcy5iKTtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdFJnYigpIHtcbiAgdmFyIGEgPSB0aGlzLm9wYWNpdHk7IGEgPSBpc05hTihhKSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBhKSk7XG4gIHJldHVybiAoYSA9PT0gMSA/IFwicmdiKFwiIDogXCJyZ2JhKFwiKVxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodGhpcy5yKSB8fCAwKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHRoaXMuZykgfHwgMCkpICsgXCIsIFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh0aGlzLmIpIHx8IDApKVxuICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHZhbHVlKSB8fCAwKSk7XG4gIHJldHVybiAodmFsdWUgPCAxNiA/IFwiMFwiIDogXCJcIikgKyB2YWx1ZS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICBpZiAoYSA8PSAwKSBoID0gcyA9IGwgPSBOYU47XG4gIGVsc2UgaWYgKGwgPD0gMCB8fCBsID49IDEpIGggPSBzID0gTmFOO1xuICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbmV3IEhzbChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBIc2w7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbztcbiAgbyA9IG8ucmdiKCk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgaCA9IE5hTixcbiAgICAgIHMgPSBtYXggLSBtaW4sXG4gICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICBpZiAocykge1xuICAgIGlmIChyID09PSBtYXgpIGggPSAoZyAtIGIpIC8gcyArIChnIDwgYikgKiA2O1xuICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaCA9IChiIC0gcikgLyBzICsgMjtcbiAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgcyAvPSBsIDwgMC41ID8gbWF4ICsgbWluIDogMiAtIG1heCAtIG1pbjtcbiAgICBoICo9IDYwO1xuICB9IGVsc2Uge1xuICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICB9XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhzbENvbnZlcnQoaCkgOiBuZXcgSHNsKGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaCA9IHRoaXMuaCAlIDM2MCArICh0aGlzLmggPCAwKSAqIDM2MCxcbiAgICAgICAgcyA9IGlzTmFOKGgpIHx8IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zLFxuICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICBtMiA9IGwgKyAobCA8IDAuNSA/IGwgOiAxIC0gbCkgKiBzLFxuICAgICAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBoc2wycmdiKGggPj0gMjQwID8gaCAtIDI0MCA6IGggKyAxMjAsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGgsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSA9IHRoaXMub3BhY2l0eTsgYSA9IGlzTmFOKGEpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIGEpKTtcbiAgICByZXR1cm4gKGEgPT09IDEgPyBcImhzbChcIiA6IFwiaHNsYShcIilcbiAgICAgICAgKyAodGhpcy5oIHx8IDApICsgXCIsIFwiXG4gICAgICAgICsgKHRoaXMucyB8fCAwKSAqIDEwMCArIFwiJSwgXCJcbiAgICAgICAgKyAodGhpcy5sIHx8IDApICogMTAwICsgXCIlXCJcbiAgICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbiAgfVxufSkpO1xuXG4vKiBGcm9tIEZ2RCAxMy4zNywgQ1NTIENvbG9yIE1vZHVsZSBMZXZlbCAzICovXG5mdW5jdGlvbiBoc2wycmdiKGgsIG0xLCBtMikge1xuICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICA6IGggPCAxODAgPyBtMlxuICAgICAgOiBoIDwgMjQwID8gbTEgKyAobTIgLSBtMSkgKiAoMjQwIC0gaCkgLyA2MFxuICAgICAgOiBtMSkgKiAyNTU7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gYmFzaXModDEsIHYwLCB2MSwgdjIsIHYzKSB7XG4gIHZhciB0MiA9IHQxICogdDEsIHQzID0gdDIgKiB0MTtcbiAgcmV0dXJuICgoMSAtIDMgKiB0MSArIDMgKiB0MiAtIHQzKSAqIHYwXG4gICAgICArICg0IC0gNiAqIHQyICsgMyAqIHQzKSAqIHYxXG4gICAgICArICgxICsgMyAqIHQxICsgMyAqIHQyIC0gMyAqIHQzKSAqIHYyXG4gICAgICArIHQzICogdjMpIC8gNjtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzKSB7XG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aCAtIDE7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdmFyIGkgPSB0IDw9IDAgPyAodCA9IDApIDogdCA+PSAxID8gKHQgPSAxLCBuIC0gMSkgOiBNYXRoLmZsb29yKHQgKiBuKSxcbiAgICAgICAgdjEgPSB2YWx1ZXNbaV0sXG4gICAgICAgIHYyID0gdmFsdWVzW2kgKyAxXSxcbiAgICAgICAgdjAgPSBpID4gMCA/IHZhbHVlc1tpIC0gMV0gOiAyICogdjEgLSB2MixcbiAgICAgICAgdjMgPSBpIDwgbiAtIDEgPyB2YWx1ZXNbaSArIDJdIDogMiAqIHYyIC0gdjE7XG4gICAgcmV0dXJuIGJhc2lzKCh0IC0gaSAvIG4pICogbiwgdjAsIHYxLCB2MiwgdjMpO1xuICB9O1xufVxuIiwiaW1wb3J0IHtiYXNpc30gZnJvbSBcIi4vYmFzaXMuanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odmFsdWVzKSB7XG4gIHZhciBuID0gdmFsdWVzLmxlbmd0aDtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IE1hdGguZmxvb3IoKCh0ICU9IDEpIDwgMCA/ICsrdCA6IHQpICogbiksXG4gICAgICAgIHYwID0gdmFsdWVzWyhpICsgbiAtIDEpICUgbl0sXG4gICAgICAgIHYxID0gdmFsdWVzW2kgJSBuXSxcbiAgICAgICAgdjIgPSB2YWx1ZXNbKGkgKyAxKSAlIG5dLFxuICAgICAgICB2MyA9IHZhbHVlc1soaSArIDIpICUgbl07XG4gICAgcmV0dXJuIGJhc2lzKCh0IC0gaSAvIG4pICogbiwgdjAsIHYxLCB2MiwgdjMpO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJpbXBvcnQgY29uc3RhbnQgZnJvbSBcIi4vY29uc3RhbnQuanNcIjtcblxuZnVuY3Rpb24gbGluZWFyKGEsIGQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICByZXR1cm4gYSArIHQgKiBkO1xuICB9O1xufVxuXG5mdW5jdGlvbiBleHBvbmVudGlhbChhLCBiLCB5KSB7XG4gIHJldHVybiBhID0gTWF0aC5wb3coYSwgeSksIGIgPSBNYXRoLnBvdyhiLCB5KSAtIGEsIHkgPSAxIC8geSwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnBvdyhhICsgdCAqIGIsIHkpO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHVlKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCA+IDE4MCB8fCBkIDwgLTE4MCA/IGQgLSAzNjAgKiBNYXRoLnJvdW5kKGQgLyAzNjApIDogZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdhbW1hKHkpIHtcbiAgcmV0dXJuICh5ID0gK3kpID09PSAxID8gbm9nYW1tYSA6IGZ1bmN0aW9uKGEsIGIpIHtcbiAgICByZXR1cm4gYiAtIGEgPyBleHBvbmVudGlhbChhLCBiLCB5KSA6IGNvbnN0YW50KGlzTmFOKGEpID8gYiA6IGEpO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBub2dhbW1hKGEsIGIpIHtcbiAgdmFyIGQgPSBiIC0gYTtcbiAgcmV0dXJuIGQgPyBsaW5lYXIoYSwgZCkgOiBjb25zdGFudChpc05hTihhKSA/IGIgOiBhKTtcbn1cbiIsImltcG9ydCB7cmdiIGFzIGNvbG9yUmdifSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCBiYXNpcyBmcm9tIFwiLi9iYXNpcy5qc1wiO1xuaW1wb3J0IGJhc2lzQ2xvc2VkIGZyb20gXCIuL2Jhc2lzQ2xvc2VkLmpzXCI7XG5pbXBvcnQgbm9nYW1tYSwge2dhbW1hfSBmcm9tIFwiLi9jb2xvci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCAoZnVuY3Rpb24gcmdiR2FtbWEoeSkge1xuICB2YXIgY29sb3IgPSBnYW1tYSh5KTtcblxuICBmdW5jdGlvbiByZ2Ioc3RhcnQsIGVuZCkge1xuICAgIHZhciByID0gY29sb3IoKHN0YXJ0ID0gY29sb3JSZ2Ioc3RhcnQpKS5yLCAoZW5kID0gY29sb3JSZ2IoZW5kKSkuciksXG4gICAgICAgIGcgPSBjb2xvcihzdGFydC5nLCBlbmQuZyksXG4gICAgICAgIGIgPSBjb2xvcihzdGFydC5iLCBlbmQuYiksXG4gICAgICAgIG9wYWNpdHkgPSBub2dhbW1hKHN0YXJ0Lm9wYWNpdHksIGVuZC5vcGFjaXR5KTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgc3RhcnQuciA9IHIodCk7XG4gICAgICBzdGFydC5nID0gZyh0KTtcbiAgICAgIHN0YXJ0LmIgPSBiKHQpO1xuICAgICAgc3RhcnQub3BhY2l0eSA9IG9wYWNpdHkodCk7XG4gICAgICByZXR1cm4gc3RhcnQgKyBcIlwiO1xuICAgIH07XG4gIH1cblxuICByZ2IuZ2FtbWEgPSByZ2JHYW1tYTtcblxuICByZXR1cm4gcmdiO1xufSkoMSk7XG5cbmZ1bmN0aW9uIHJnYlNwbGluZShzcGxpbmUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbG9ycykge1xuICAgIHZhciBuID0gY29sb3JzLmxlbmd0aCxcbiAgICAgICAgciA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgZyA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgYiA9IG5ldyBBcnJheShuKSxcbiAgICAgICAgaSwgY29sb3I7XG4gICAgZm9yIChpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgY29sb3IgPSBjb2xvclJnYihjb2xvcnNbaV0pO1xuICAgICAgcltpXSA9IGNvbG9yLnIgfHwgMDtcbiAgICAgIGdbaV0gPSBjb2xvci5nIHx8IDA7XG4gICAgICBiW2ldID0gY29sb3IuYiB8fCAwO1xuICAgIH1cbiAgICByID0gc3BsaW5lKHIpO1xuICAgIGcgPSBzcGxpbmUoZyk7XG4gICAgYiA9IHNwbGluZShiKTtcbiAgICBjb2xvci5vcGFjaXR5ID0gMTtcbiAgICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgICAgY29sb3IuciA9IHIodCk7XG4gICAgICBjb2xvci5nID0gZyh0KTtcbiAgICAgIGNvbG9yLmIgPSBiKHQpO1xuICAgICAgcmV0dXJuIGNvbG9yICsgXCJcIjtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIHJnYkJhc2lzID0gcmdiU3BsaW5lKGJhc2lzKTtcbmV4cG9ydCB2YXIgcmdiQmFzaXNDbG9zZWQgPSByZ2JTcGxpbmUoYmFzaXNDbG9zZWQpO1xuIiwiaW1wb3J0IHZhbHVlIGZyb20gXCIuL3ZhbHVlLmpzXCI7XG5pbXBvcnQgbnVtYmVyQXJyYXksIHtpc051bWJlckFycmF5fSBmcm9tIFwiLi9udW1iZXJBcnJheS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiAoaXNOdW1iZXJBcnJheShiKSA/IG51bWJlckFycmF5IDogZ2VuZXJpY0FycmF5KShhLCBiKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdlbmVyaWNBcnJheShhLCBiKSB7XG4gIHZhciBuYiA9IGIgPyBiLmxlbmd0aCA6IDAsXG4gICAgICBuYSA9IGEgPyBNYXRoLm1pbihuYiwgYS5sZW5ndGgpIDogMCxcbiAgICAgIHggPSBuZXcgQXJyYXkobmEpLFxuICAgICAgYyA9IG5ldyBBcnJheShuYiksXG4gICAgICBpO1xuXG4gIGZvciAoaSA9IDA7IGkgPCBuYTsgKytpKSB4W2ldID0gdmFsdWUoYVtpXSwgYltpXSk7XG4gIGZvciAoOyBpIDwgbmI7ICsraSkgY1tpXSA9IGJbaV07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbmE7ICsraSkgY1tpXSA9IHhbaV0odCk7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciBkID0gbmV3IERhdGU7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBkLnNldFRpbWUoYSAqICgxIC0gdCkgKyBiICogdCksIGQ7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBhICogKDEgLSB0KSArIGIgKiB0O1xuICB9O1xufVxuIiwiaW1wb3J0IHZhbHVlIGZyb20gXCIuL3ZhbHVlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGkgPSB7fSxcbiAgICAgIGMgPSB7fSxcbiAgICAgIGs7XG5cbiAgaWYgKGEgPT09IG51bGwgfHwgdHlwZW9mIGEgIT09IFwib2JqZWN0XCIpIGEgPSB7fTtcbiAgaWYgKGIgPT09IG51bGwgfHwgdHlwZW9mIGIgIT09IFwib2JqZWN0XCIpIGIgPSB7fTtcblxuICBmb3IgKGsgaW4gYikge1xuICAgIGlmIChrIGluIGEpIHtcbiAgICAgIGlba10gPSB2YWx1ZShhW2tdLCBiW2tdKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY1trXSA9IGJba107XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGsgaW4gaSkgY1trXSA9IGlba10odCk7XG4gICAgcmV0dXJuIGM7XG4gIH07XG59XG4iLCJpbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlci5qc1wiO1xuXG52YXIgcmVBID0gL1stK10/KD86XFxkK1xcLj9cXGQqfFxcLj9cXGQrKSg/OltlRV1bLStdP1xcZCspPy9nLFxuICAgIHJlQiA9IG5ldyBSZWdFeHAocmVBLnNvdXJjZSwgXCJnXCIpO1xuXG5mdW5jdGlvbiB6ZXJvKGIpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBiO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvbmUoYikge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBiKHQpICsgXCJcIjtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICB2YXIgYmkgPSByZUEubGFzdEluZGV4ID0gcmVCLmxhc3RJbmRleCA9IDAsIC8vIHNjYW4gaW5kZXggZm9yIG5leHQgbnVtYmVyIGluIGJcbiAgICAgIGFtLCAvLyBjdXJyZW50IG1hdGNoIGluIGFcbiAgICAgIGJtLCAvLyBjdXJyZW50IG1hdGNoIGluIGJcbiAgICAgIGJzLCAvLyBzdHJpbmcgcHJlY2VkaW5nIGN1cnJlbnQgbnVtYmVyIGluIGIsIGlmIGFueVxuICAgICAgaSA9IC0xLCAvLyBpbmRleCBpbiBzXG4gICAgICBzID0gW10sIC8vIHN0cmluZyBjb25zdGFudHMgYW5kIHBsYWNlaG9sZGVyc1xuICAgICAgcSA9IFtdOyAvLyBudW1iZXIgaW50ZXJwb2xhdG9yc1xuXG4gIC8vIENvZXJjZSBpbnB1dHMgdG8gc3RyaW5ncy5cbiAgYSA9IGEgKyBcIlwiLCBiID0gYiArIFwiXCI7XG5cbiAgLy8gSW50ZXJwb2xhdGUgcGFpcnMgb2YgbnVtYmVycyBpbiBhICYgYi5cbiAgd2hpbGUgKChhbSA9IHJlQS5leGVjKGEpKVxuICAgICAgJiYgKGJtID0gcmVCLmV4ZWMoYikpKSB7XG4gICAgaWYgKChicyA9IGJtLmluZGV4KSA+IGJpKSB7IC8vIGEgc3RyaW5nIHByZWNlZGVzIHRoZSBuZXh0IG51bWJlciBpbiBiXG4gICAgICBicyA9IGIuc2xpY2UoYmksIGJzKTtcbiAgICAgIGlmIChzW2ldKSBzW2ldICs9IGJzOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgICAgZWxzZSBzWysraV0gPSBicztcbiAgICB9XG4gICAgaWYgKChhbSA9IGFtWzBdKSA9PT0gKGJtID0gYm1bMF0pKSB7IC8vIG51bWJlcnMgaW4gYSAmIGIgbWF0Y2hcbiAgICAgIGlmIChzW2ldKSBzW2ldICs9IGJtOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgICAgZWxzZSBzWysraV0gPSBibTtcbiAgICB9IGVsc2UgeyAvLyBpbnRlcnBvbGF0ZSBub24tbWF0Y2hpbmcgbnVtYmVyc1xuICAgICAgc1srK2ldID0gbnVsbDtcbiAgICAgIHEucHVzaCh7aTogaSwgeDogbnVtYmVyKGFtLCBibSl9KTtcbiAgICB9XG4gICAgYmkgPSByZUIubGFzdEluZGV4O1xuICB9XG5cbiAgLy8gQWRkIHJlbWFpbnMgb2YgYi5cbiAgaWYgKGJpIDwgYi5sZW5ndGgpIHtcbiAgICBicyA9IGIuc2xpY2UoYmkpO1xuICAgIGlmIChzW2ldKSBzW2ldICs9IGJzOyAvLyBjb2FsZXNjZSB3aXRoIHByZXZpb3VzIHN0cmluZ1xuICAgIGVsc2Ugc1srK2ldID0gYnM7XG4gIH1cblxuICAvLyBTcGVjaWFsIG9wdGltaXphdGlvbiBmb3Igb25seSBhIHNpbmdsZSBtYXRjaC5cbiAgLy8gT3RoZXJ3aXNlLCBpbnRlcnBvbGF0ZSBlYWNoIG9mIHRoZSBudW1iZXJzIGFuZCByZWpvaW4gdGhlIHN0cmluZy5cbiAgcmV0dXJuIHMubGVuZ3RoIDwgMiA/IChxWzBdXG4gICAgICA/IG9uZShxWzBdLngpXG4gICAgICA6IHplcm8oYikpXG4gICAgICA6IChiID0gcS5sZW5ndGgsIGZ1bmN0aW9uKHQpIHtcbiAgICAgICAgICBmb3IgKHZhciBpID0gMCwgbzsgaSA8IGI7ICsraSkgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgICAgIHJldHVybiBzLmpvaW4oXCJcIik7XG4gICAgICAgIH0pO1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYikge1xuICBpZiAoIWIpIGIgPSBbXTtcbiAgdmFyIG4gPSBhID8gTWF0aC5taW4oYi5sZW5ndGgsIGEubGVuZ3RoKSA6IDAsXG4gICAgICBjID0gYi5zbGljZSgpLFxuICAgICAgaTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKGkgPSAwOyBpIDwgbjsgKytpKSBjW2ldID0gYVtpXSAqICgxIC0gdCkgKyBiW2ldICogdDtcbiAgICByZXR1cm4gYztcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzTnVtYmVyQXJyYXkoeCkge1xuICByZXR1cm4gQXJyYXlCdWZmZXIuaXNWaWV3KHgpICYmICEoeCBpbnN0YW5jZW9mIERhdGFWaWV3KTtcbn1cbiIsImltcG9ydCB7Y29sb3J9IGZyb20gXCJkMy1jb2xvclwiO1xuaW1wb3J0IHJnYiBmcm9tIFwiLi9yZ2IuanNcIjtcbmltcG9ydCB7Z2VuZXJpY0FycmF5fSBmcm9tIFwiLi9hcnJheS5qc1wiO1xuaW1wb3J0IGRhdGUgZnJvbSBcIi4vZGF0ZS5qc1wiO1xuaW1wb3J0IG51bWJlciBmcm9tIFwiLi9udW1iZXIuanNcIjtcbmltcG9ydCBvYmplY3QgZnJvbSBcIi4vb2JqZWN0LmpzXCI7XG5pbXBvcnQgc3RyaW5nIGZyb20gXCIuL3N0cmluZy5qc1wiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50LmpzXCI7XG5pbXBvcnQgbnVtYmVyQXJyYXksIHtpc051bWJlckFycmF5fSBmcm9tIFwiLi9udW1iZXJBcnJheS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHZhciB0ID0gdHlwZW9mIGIsIGM7XG4gIHJldHVybiBiID09IG51bGwgfHwgdCA9PT0gXCJib29sZWFuXCIgPyBjb25zdGFudChiKVxuICAgICAgOiAodCA9PT0gXCJudW1iZXJcIiA/IG51bWJlclxuICAgICAgOiB0ID09PSBcInN0cmluZ1wiID8gKChjID0gY29sb3IoYikpID8gKGIgPSBjLCByZ2IpIDogc3RyaW5nKVxuICAgICAgOiBiIGluc3RhbmNlb2YgY29sb3IgPyByZ2JcbiAgICAgIDogYiBpbnN0YW5jZW9mIERhdGUgPyBkYXRlXG4gICAgICA6IGlzTnVtYmVyQXJyYXkoYikgPyBudW1iZXJBcnJheVxuICAgICAgOiBBcnJheS5pc0FycmF5KGIpID8gZ2VuZXJpY0FycmF5XG4gICAgICA6IHR5cGVvZiBiLnZhbHVlT2YgIT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgYi50b1N0cmluZyAhPT0gXCJmdW5jdGlvblwiIHx8IGlzTmFOKGIpID8gb2JqZWN0XG4gICAgICA6IG51bWJlcikoYSwgYik7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihhLCBiKSB7XG4gIHJldHVybiBhID0gK2EsIGIgPSArYiwgZnVuY3Rpb24odCkge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKGEgKiAoMSAtIHQpICsgYiAqIHQpO1xuICB9O1xufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oeCkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHg7XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbih4KSB7XG4gIHJldHVybiAreDtcbn1cbiIsImltcG9ydCB7YmlzZWN0fSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7aW50ZXJwb2xhdGUgYXMgaW50ZXJwb2xhdGVWYWx1ZSwgaW50ZXJwb2xhdGVOdW1iZXIsIGludGVycG9sYXRlUm91bmR9IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHttYXAsIHNsaWNlfSBmcm9tIFwiLi9hcnJheVwiO1xuaW1wb3J0IGNvbnN0YW50IGZyb20gXCIuL2NvbnN0YW50XCI7XG5pbXBvcnQgbnVtYmVyIGZyb20gXCIuL251bWJlclwiO1xuXG52YXIgdW5pdCA9IFswLCAxXTtcblxuZXhwb3J0IGZ1bmN0aW9uIGlkZW50aXR5KHgpIHtcbiAgcmV0dXJuIHg7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZShhLCBiKSB7XG4gIHJldHVybiAoYiAtPSAoYSA9ICthKSlcbiAgICAgID8gZnVuY3Rpb24oeCkgeyByZXR1cm4gKHggLSBhKSAvIGI7IH1cbiAgICAgIDogY29uc3RhbnQoaXNOYU4oYikgPyBOYU4gOiAwLjUpO1xufVxuXG5mdW5jdGlvbiBjbGFtcGVyKGRvbWFpbikge1xuICB2YXIgYSA9IGRvbWFpblswXSwgYiA9IGRvbWFpbltkb21haW4ubGVuZ3RoIC0gMV0sIHQ7XG4gIGlmIChhID4gYikgdCA9IGEsIGEgPSBiLCBiID0gdDtcbiAgcmV0dXJuIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIE1hdGgubWF4KGEsIE1hdGgubWluKGIsIHgpKTsgfTtcbn1cblxuLy8gbm9ybWFsaXplKGEsIGIpKHgpIHRha2VzIGEgZG9tYWluIHZhbHVlIHggaW4gW2EsYl0gYW5kIHJldHVybnMgdGhlIGNvcnJlc3BvbmRpbmcgcGFyYW1ldGVyIHQgaW4gWzAsMV0uXG4vLyBpbnRlcnBvbGF0ZShhLCBiKSh0KSB0YWtlcyBhIHBhcmFtZXRlciB0IGluIFswLDFdIGFuZCByZXR1cm5zIHRoZSBjb3JyZXNwb25kaW5nIHJhbmdlIHZhbHVlIHggaW4gW2EsYl0uXG5mdW5jdGlvbiBiaW1hcChkb21haW4sIHJhbmdlLCBpbnRlcnBvbGF0ZSkge1xuICB2YXIgZDAgPSBkb21haW5bMF0sIGQxID0gZG9tYWluWzFdLCByMCA9IHJhbmdlWzBdLCByMSA9IHJhbmdlWzFdO1xuICBpZiAoZDEgPCBkMCkgZDAgPSBub3JtYWxpemUoZDEsIGQwKSwgcjAgPSBpbnRlcnBvbGF0ZShyMSwgcjApO1xuICBlbHNlIGQwID0gbm9ybWFsaXplKGQwLCBkMSksIHIwID0gaW50ZXJwb2xhdGUocjAsIHIxKTtcbiAgcmV0dXJuIGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHIwKGQwKHgpKTsgfTtcbn1cblxuZnVuY3Rpb24gcG9seW1hcChkb21haW4sIHJhbmdlLCBpbnRlcnBvbGF0ZSkge1xuICB2YXIgaiA9IE1hdGgubWluKGRvbWFpbi5sZW5ndGgsIHJhbmdlLmxlbmd0aCkgLSAxLFxuICAgICAgZCA9IG5ldyBBcnJheShqKSxcbiAgICAgIHIgPSBuZXcgQXJyYXkoaiksXG4gICAgICBpID0gLTE7XG5cbiAgLy8gUmV2ZXJzZSBkZXNjZW5kaW5nIGRvbWFpbnMuXG4gIGlmIChkb21haW5bal0gPCBkb21haW5bMF0pIHtcbiAgICBkb21haW4gPSBkb21haW4uc2xpY2UoKS5yZXZlcnNlKCk7XG4gICAgcmFuZ2UgPSByYW5nZS5zbGljZSgpLnJldmVyc2UoKTtcbiAgfVxuXG4gIHdoaWxlICgrK2kgPCBqKSB7XG4gICAgZFtpXSA9IG5vcm1hbGl6ZShkb21haW5baV0sIGRvbWFpbltpICsgMV0pO1xuICAgIHJbaV0gPSBpbnRlcnBvbGF0ZShyYW5nZVtpXSwgcmFuZ2VbaSArIDFdKTtcbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgdmFyIGkgPSBiaXNlY3QoZG9tYWluLCB4LCAxLCBqKSAtIDE7XG4gICAgcmV0dXJuIHJbaV0oZFtpXSh4KSk7XG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3B5KHNvdXJjZSwgdGFyZ2V0KSB7XG4gIHJldHVybiB0YXJnZXRcbiAgICAgIC5kb21haW4oc291cmNlLmRvbWFpbigpKVxuICAgICAgLnJhbmdlKHNvdXJjZS5yYW5nZSgpKVxuICAgICAgLmludGVycG9sYXRlKHNvdXJjZS5pbnRlcnBvbGF0ZSgpKVxuICAgICAgLmNsYW1wKHNvdXJjZS5jbGFtcCgpKVxuICAgICAgLnVua25vd24oc291cmNlLnVua25vd24oKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0cmFuc2Zvcm1lcigpIHtcbiAgdmFyIGRvbWFpbiA9IHVuaXQsXG4gICAgICByYW5nZSA9IHVuaXQsXG4gICAgICBpbnRlcnBvbGF0ZSA9IGludGVycG9sYXRlVmFsdWUsXG4gICAgICB0cmFuc2Zvcm0sXG4gICAgICB1bnRyYW5zZm9ybSxcbiAgICAgIHVua25vd24sXG4gICAgICBjbGFtcCA9IGlkZW50aXR5LFxuICAgICAgcGllY2V3aXNlLFxuICAgICAgb3V0cHV0LFxuICAgICAgaW5wdXQ7XG5cbiAgZnVuY3Rpb24gcmVzY2FsZSgpIHtcbiAgICBwaWVjZXdpc2UgPSBNYXRoLm1pbihkb21haW4ubGVuZ3RoLCByYW5nZS5sZW5ndGgpID4gMiA/IHBvbHltYXAgOiBiaW1hcDtcbiAgICBvdXRwdXQgPSBpbnB1dCA9IG51bGw7XG4gICAgcmV0dXJuIHNjYWxlO1xuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgIHJldHVybiBpc05hTih4ID0gK3gpID8gdW5rbm93biA6IChvdXRwdXQgfHwgKG91dHB1dCA9IHBpZWNld2lzZShkb21haW4ubWFwKHRyYW5zZm9ybSksIHJhbmdlLCBpbnRlcnBvbGF0ZSkpKSh0cmFuc2Zvcm0oY2xhbXAoeCkpKTtcbiAgfVxuXG4gIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gY2xhbXAodW50cmFuc2Zvcm0oKGlucHV0IHx8IChpbnB1dCA9IHBpZWNld2lzZShyYW5nZSwgZG9tYWluLm1hcCh0cmFuc2Zvcm0pLCBpbnRlcnBvbGF0ZU51bWJlcikpKSh5KSkpO1xuICB9O1xuXG4gIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChkb21haW4gPSBtYXAuY2FsbChfLCBudW1iZXIpLCBjbGFtcCA9PT0gaWRlbnRpdHkgfHwgKGNsYW1wID0gY2xhbXBlcihkb21haW4pKSwgcmVzY2FsZSgpKSA6IGRvbWFpbi5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJhbmdlID0gc2xpY2UuY2FsbChfKSwgcmVzY2FsZSgpKSA6IHJhbmdlLnNsaWNlKCk7XG4gIH07XG5cbiAgc2NhbGUucmFuZ2VSb3VuZCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gcmFuZ2UgPSBzbGljZS5jYWxsKF8pLCBpbnRlcnBvbGF0ZSA9IGludGVycG9sYXRlUm91bmQsIHJlc2NhbGUoKTtcbiAgfTtcblxuICBzY2FsZS5jbGFtcCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChjbGFtcCA9IF8gPyBjbGFtcGVyKGRvbWFpbikgOiBpZGVudGl0eSwgc2NhbGUpIDogY2xhbXAgIT09IGlkZW50aXR5O1xuICB9O1xuXG4gIHNjYWxlLmludGVycG9sYXRlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGludGVycG9sYXRlID0gXywgcmVzY2FsZSgpKSA6IGludGVycG9sYXRlO1xuICB9O1xuXG4gIHNjYWxlLnVua25vd24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodW5rbm93biA9IF8sIHNjYWxlKSA6IHVua25vd247XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKHQsIHUpIHtcbiAgICB0cmFuc2Zvcm0gPSB0LCB1bnRyYW5zZm9ybSA9IHU7XG4gICAgcmV0dXJuIHJlc2NhbGUoKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY29udGludW91cyh0cmFuc2Zvcm0sIHVudHJhbnNmb3JtKSB7XG4gIHJldHVybiB0cmFuc2Zvcm1lcigpKHRyYW5zZm9ybSwgdW50cmFuc2Zvcm0pO1xufVxuIiwiaW1wb3J0IHt0aWNrU3RlcH0gZnJvbSBcImQzLWFycmF5XCI7XG5pbXBvcnQge2Zvcm1hdCwgZm9ybWF0UHJlZml4LCBmb3JtYXRTcGVjaWZpZXIsIHByZWNpc2lvbkZpeGVkLCBwcmVjaXNpb25QcmVmaXgsIHByZWNpc2lvblJvdW5kfSBmcm9tIFwiZDMtZm9ybWF0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHN0YXJ0LCBzdG9wLCBjb3VudCwgc3BlY2lmaWVyKSB7XG4gIHZhciBzdGVwID0gdGlja1N0ZXAoc3RhcnQsIHN0b3AsIGNvdW50KSxcbiAgICAgIHByZWNpc2lvbjtcbiAgc3BlY2lmaWVyID0gZm9ybWF0U3BlY2lmaWVyKHNwZWNpZmllciA9PSBudWxsID8gXCIsZlwiIDogc3BlY2lmaWVyKTtcbiAgc3dpdGNoIChzcGVjaWZpZXIudHlwZSkge1xuICAgIGNhc2UgXCJzXCI6IHtcbiAgICAgIHZhciB2YWx1ZSA9IE1hdGgubWF4KE1hdGguYWJzKHN0YXJ0KSwgTWF0aC5hYnMoc3RvcCkpO1xuICAgICAgaWYgKHNwZWNpZmllci5wcmVjaXNpb24gPT0gbnVsbCAmJiAhaXNOYU4ocHJlY2lzaW9uID0gcHJlY2lzaW9uUHJlZml4KHN0ZXAsIHZhbHVlKSkpIHNwZWNpZmllci5wcmVjaXNpb24gPSBwcmVjaXNpb247XG4gICAgICByZXR1cm4gZm9ybWF0UHJlZml4KHNwZWNpZmllciwgdmFsdWUpO1xuICAgIH1cbiAgICBjYXNlIFwiXCI6XG4gICAgY2FzZSBcImVcIjpcbiAgICBjYXNlIFwiZ1wiOlxuICAgIGNhc2UgXCJwXCI6XG4gICAgY2FzZSBcInJcIjoge1xuICAgICAgaWYgKHNwZWNpZmllci5wcmVjaXNpb24gPT0gbnVsbCAmJiAhaXNOYU4ocHJlY2lzaW9uID0gcHJlY2lzaW9uUm91bmQoc3RlcCwgTWF0aC5tYXgoTWF0aC5hYnMoc3RhcnQpLCBNYXRoLmFicyhzdG9wKSkpKSkgc3BlY2lmaWVyLnByZWNpc2lvbiA9IHByZWNpc2lvbiAtIChzcGVjaWZpZXIudHlwZSA9PT0gXCJlXCIpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgXCJmXCI6XG4gICAgY2FzZSBcIiVcIjoge1xuICAgICAgaWYgKHNwZWNpZmllci5wcmVjaXNpb24gPT0gbnVsbCAmJiAhaXNOYU4ocHJlY2lzaW9uID0gcHJlY2lzaW9uRml4ZWQoc3RlcCkpKSBzcGVjaWZpZXIucHJlY2lzaW9uID0gcHJlY2lzaW9uIC0gKHNwZWNpZmllci50eXBlID09PSBcIiVcIikgKiAyO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiBmb3JtYXQoc3BlY2lmaWVyKTtcbn1cbiIsImltcG9ydCB7dGlja3MsIHRpY2tJbmNyZW1lbnR9IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IGNvbnRpbnVvdXMsIHtjb3B5LCBpZGVudGl0eX0gZnJvbSBcIi4vY29udGludW91c1wiO1xuaW1wb3J0IHtpbml0UmFuZ2V9IGZyb20gXCIuL2luaXRcIjtcbmltcG9ydCB0aWNrRm9ybWF0IGZyb20gXCIuL3RpY2tGb3JtYXRcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIGxpbmVhcmlzaChzY2FsZSkge1xuICB2YXIgZG9tYWluID0gc2NhbGUuZG9tYWluO1xuXG4gIHNjYWxlLnRpY2tzID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICB2YXIgZCA9IGRvbWFpbigpO1xuICAgIHJldHVybiB0aWNrcyhkWzBdLCBkW2QubGVuZ3RoIC0gMV0sIGNvdW50ID09IG51bGwgPyAxMCA6IGNvdW50KTtcbiAgfTtcblxuICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24oY291bnQsIHNwZWNpZmllcikge1xuICAgIHZhciBkID0gZG9tYWluKCk7XG4gICAgcmV0dXJuIHRpY2tGb3JtYXQoZFswXSwgZFtkLmxlbmd0aCAtIDFdLCBjb3VudCA9PSBudWxsID8gMTAgOiBjb3VudCwgc3BlY2lmaWVyKTtcbiAgfTtcblxuICBzY2FsZS5uaWNlID0gZnVuY3Rpb24oY291bnQpIHtcbiAgICBpZiAoY291bnQgPT0gbnVsbCkgY291bnQgPSAxMDtcblxuICAgIHZhciBkID0gZG9tYWluKCksXG4gICAgICAgIGkwID0gMCxcbiAgICAgICAgaTEgPSBkLmxlbmd0aCAtIDEsXG4gICAgICAgIHN0YXJ0ID0gZFtpMF0sXG4gICAgICAgIHN0b3AgPSBkW2kxXSxcbiAgICAgICAgc3RlcDtcblxuICAgIGlmIChzdG9wIDwgc3RhcnQpIHtcbiAgICAgIHN0ZXAgPSBzdGFydCwgc3RhcnQgPSBzdG9wLCBzdG9wID0gc3RlcDtcbiAgICAgIHN0ZXAgPSBpMCwgaTAgPSBpMSwgaTEgPSBzdGVwO1xuICAgIH1cblxuICAgIHN0ZXAgPSB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCk7XG5cbiAgICBpZiAoc3RlcCA+IDApIHtcbiAgICAgIHN0YXJ0ID0gTWF0aC5mbG9vcihzdGFydCAvIHN0ZXApICogc3RlcDtcbiAgICAgIHN0b3AgPSBNYXRoLmNlaWwoc3RvcCAvIHN0ZXApICogc3RlcDtcbiAgICAgIHN0ZXAgPSB0aWNrSW5jcmVtZW50KHN0YXJ0LCBzdG9wLCBjb3VudCk7XG4gICAgfSBlbHNlIGlmIChzdGVwIDwgMCkge1xuICAgICAgc3RhcnQgPSBNYXRoLmNlaWwoc3RhcnQgKiBzdGVwKSAvIHN0ZXA7XG4gICAgICBzdG9wID0gTWF0aC5mbG9vcihzdG9wICogc3RlcCkgLyBzdGVwO1xuICAgICAgc3RlcCA9IHRpY2tJbmNyZW1lbnQoc3RhcnQsIHN0b3AsIGNvdW50KTtcbiAgICB9XG5cbiAgICBpZiAoc3RlcCA+IDApIHtcbiAgICAgIGRbaTBdID0gTWF0aC5mbG9vcihzdGFydCAvIHN0ZXApICogc3RlcDtcbiAgICAgIGRbaTFdID0gTWF0aC5jZWlsKHN0b3AgLyBzdGVwKSAqIHN0ZXA7XG4gICAgICBkb21haW4oZCk7XG4gICAgfSBlbHNlIGlmIChzdGVwIDwgMCkge1xuICAgICAgZFtpMF0gPSBNYXRoLmNlaWwoc3RhcnQgKiBzdGVwKSAvIHN0ZXA7XG4gICAgICBkW2kxXSA9IE1hdGguZmxvb3Ioc3RvcCAqIHN0ZXApIC8gc3RlcDtcbiAgICAgIGRvbWFpbihkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gc2NhbGU7XG4gIH07XG5cbiAgcmV0dXJuIHNjYWxlO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBsaW5lYXIoKSB7XG4gIHZhciBzY2FsZSA9IGNvbnRpbnVvdXMoaWRlbnRpdHksIGlkZW50aXR5KTtcblxuICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvcHkoc2NhbGUsIGxpbmVhcigpKTtcbiAgfTtcblxuICBpbml0UmFuZ2UuYXBwbHkoc2NhbGUsIGFyZ3VtZW50cyk7XG5cbiAgcmV0dXJuIGxpbmVhcmlzaChzY2FsZSk7XG59XG4iLCJpbXBvcnQge21hcH0gZnJvbSBcIi4vYXJyYXlcIjtcbmltcG9ydCB7bGluZWFyaXNofSBmcm9tIFwiLi9saW5lYXJcIjtcbmltcG9ydCBudW1iZXIgZnJvbSBcIi4vbnVtYmVyXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGlkZW50aXR5KGRvbWFpbikge1xuICB2YXIgdW5rbm93bjtcblxuICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgcmV0dXJuIGlzTmFOKHggPSAreCkgPyB1bmtub3duIDogeDtcbiAgfVxuXG4gIHNjYWxlLmludmVydCA9IHNjYWxlO1xuXG4gIHNjYWxlLmRvbWFpbiA9IHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGRvbWFpbiA9IG1hcC5jYWxsKF8sIG51bWJlciksIHNjYWxlKSA6IGRvbWFpbi5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLnVua25vd24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodW5rbm93biA9IF8sIHNjYWxlKSA6IHVua25vd247XG4gIH07XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBpZGVudGl0eShkb21haW4pLnVua25vd24odW5rbm93bik7XG4gIH07XG5cbiAgZG9tYWluID0gYXJndW1lbnRzLmxlbmd0aCA/IG1hcC5jYWxsKGRvbWFpbiwgbnVtYmVyKSA6IFswLCAxXTtcblxuICByZXR1cm4gbGluZWFyaXNoKHNjYWxlKTtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRvbWFpbiwgaW50ZXJ2YWwpIHtcbiAgZG9tYWluID0gZG9tYWluLnNsaWNlKCk7XG5cbiAgdmFyIGkwID0gMCxcbiAgICAgIGkxID0gZG9tYWluLmxlbmd0aCAtIDEsXG4gICAgICB4MCA9IGRvbWFpbltpMF0sXG4gICAgICB4MSA9IGRvbWFpbltpMV0sXG4gICAgICB0O1xuXG4gIGlmICh4MSA8IHgwKSB7XG4gICAgdCA9IGkwLCBpMCA9IGkxLCBpMSA9IHQ7XG4gICAgdCA9IHgwLCB4MCA9IHgxLCB4MSA9IHQ7XG4gIH1cblxuICBkb21haW5baTBdID0gaW50ZXJ2YWwuZmxvb3IoeDApO1xuICBkb21haW5baTFdID0gaW50ZXJ2YWwuY2VpbCh4MSk7XG4gIHJldHVybiBkb21haW47XG59XG4iLCJpbXBvcnQge3RpY2tzfSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7Zm9ybWF0fSBmcm9tIFwiZDMtZm9ybWF0XCI7XG5pbXBvcnQgbmljZSBmcm9tIFwiLi9uaWNlXCI7XG5pbXBvcnQge2NvcHksIHRyYW5zZm9ybWVyfSBmcm9tIFwiLi9jb250aW51b3VzXCI7XG5pbXBvcnQge2luaXRSYW5nZX0gZnJvbSBcIi4vaW5pdFwiO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm1Mb2coeCkge1xuICByZXR1cm4gTWF0aC5sb2coeCk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybUV4cCh4KSB7XG4gIHJldHVybiBNYXRoLmV4cCh4KTtcbn1cblxuZnVuY3Rpb24gdHJhbnNmb3JtTG9nbih4KSB7XG4gIHJldHVybiAtTWF0aC5sb2coLXgpO1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1FeHBuKHgpIHtcbiAgcmV0dXJuIC1NYXRoLmV4cCgteCk7XG59XG5cbmZ1bmN0aW9uIHBvdzEwKHgpIHtcbiAgcmV0dXJuIGlzRmluaXRlKHgpID8gKyhcIjFlXCIgKyB4KSA6IHggPCAwID8gMCA6IHg7XG59XG5cbmZ1bmN0aW9uIHBvd3AoYmFzZSkge1xuICByZXR1cm4gYmFzZSA9PT0gMTAgPyBwb3cxMFxuICAgICAgOiBiYXNlID09PSBNYXRoLkUgPyBNYXRoLmV4cFxuICAgICAgOiBmdW5jdGlvbih4KSB7IHJldHVybiBNYXRoLnBvdyhiYXNlLCB4KTsgfTtcbn1cblxuZnVuY3Rpb24gbG9ncChiYXNlKSB7XG4gIHJldHVybiBiYXNlID09PSBNYXRoLkUgPyBNYXRoLmxvZ1xuICAgICAgOiBiYXNlID09PSAxMCAmJiBNYXRoLmxvZzEwXG4gICAgICB8fCBiYXNlID09PSAyICYmIE1hdGgubG9nMlxuICAgICAgfHwgKGJhc2UgPSBNYXRoLmxvZyhiYXNlKSwgZnVuY3Rpb24oeCkgeyByZXR1cm4gTWF0aC5sb2coeCkgLyBiYXNlOyB9KTtcbn1cblxuZnVuY3Rpb24gcmVmbGVjdChmKSB7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIC1mKC14KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvZ2dpc2godHJhbnNmb3JtKSB7XG4gIHZhciBzY2FsZSA9IHRyYW5zZm9ybSh0cmFuc2Zvcm1Mb2csIHRyYW5zZm9ybUV4cCksXG4gICAgICBkb21haW4gPSBzY2FsZS5kb21haW4sXG4gICAgICBiYXNlID0gMTAsXG4gICAgICBsb2dzLFxuICAgICAgcG93cztcblxuICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgIGxvZ3MgPSBsb2dwKGJhc2UpLCBwb3dzID0gcG93cChiYXNlKTtcbiAgICBpZiAoZG9tYWluKClbMF0gPCAwKSB7XG4gICAgICBsb2dzID0gcmVmbGVjdChsb2dzKSwgcG93cyA9IHJlZmxlY3QocG93cyk7XG4gICAgICB0cmFuc2Zvcm0odHJhbnNmb3JtTG9nbiwgdHJhbnNmb3JtRXhwbik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRyYW5zZm9ybSh0cmFuc2Zvcm1Mb2csIHRyYW5zZm9ybUV4cCk7XG4gICAgfVxuICAgIHJldHVybiBzY2FsZTtcbiAgfVxuXG4gIHNjYWxlLmJhc2UgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoYmFzZSA9ICtfLCByZXNjYWxlKCkpIDogYmFzZTtcbiAgfTtcblxuICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoZG9tYWluKF8pLCByZXNjYWxlKCkpIDogZG9tYWluKCk7XG4gIH07XG5cbiAgc2NhbGUudGlja3MgPSBmdW5jdGlvbihjb3VudCkge1xuICAgIHZhciBkID0gZG9tYWluKCksXG4gICAgICAgIHUgPSBkWzBdLFxuICAgICAgICB2ID0gZFtkLmxlbmd0aCAtIDFdLFxuICAgICAgICByO1xuXG4gICAgaWYgKHIgPSB2IDwgdSkgaSA9IHUsIHUgPSB2LCB2ID0gaTtcblxuICAgIHZhciBpID0gbG9ncyh1KSxcbiAgICAgICAgaiA9IGxvZ3ModiksXG4gICAgICAgIHAsXG4gICAgICAgIGssXG4gICAgICAgIHQsXG4gICAgICAgIG4gPSBjb3VudCA9PSBudWxsID8gMTAgOiArY291bnQsXG4gICAgICAgIHogPSBbXTtcblxuICAgIGlmICghKGJhc2UgJSAxKSAmJiBqIC0gaSA8IG4pIHtcbiAgICAgIGkgPSBNYXRoLnJvdW5kKGkpIC0gMSwgaiA9IE1hdGgucm91bmQoaikgKyAxO1xuICAgICAgaWYgKHUgPiAwKSBmb3IgKDsgaSA8IGo7ICsraSkge1xuICAgICAgICBmb3IgKGsgPSAxLCBwID0gcG93cyhpKTsgayA8IGJhc2U7ICsraykge1xuICAgICAgICAgIHQgPSBwICogaztcbiAgICAgICAgICBpZiAodCA8IHUpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmICh0ID4gdikgYnJlYWs7XG4gICAgICAgICAgei5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgZm9yICg7IGkgPCBqOyArK2kpIHtcbiAgICAgICAgZm9yIChrID0gYmFzZSAtIDEsIHAgPSBwb3dzKGkpOyBrID49IDE7IC0taykge1xuICAgICAgICAgIHQgPSBwICogaztcbiAgICAgICAgICBpZiAodCA8IHUpIGNvbnRpbnVlO1xuICAgICAgICAgIGlmICh0ID4gdikgYnJlYWs7XG4gICAgICAgICAgei5wdXNoKHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHogPSB0aWNrcyhpLCBqLCBNYXRoLm1pbihqIC0gaSwgbikpLm1hcChwb3dzKTtcbiAgICB9XG5cbiAgICByZXR1cm4gciA/IHoucmV2ZXJzZSgpIDogejtcbiAgfTtcblxuICBzY2FsZS50aWNrRm9ybWF0ID0gZnVuY3Rpb24oY291bnQsIHNwZWNpZmllcikge1xuICAgIGlmIChzcGVjaWZpZXIgPT0gbnVsbCkgc3BlY2lmaWVyID0gYmFzZSA9PT0gMTAgPyBcIi4wZVwiIDogXCIsXCI7XG4gICAgaWYgKHR5cGVvZiBzcGVjaWZpZXIgIT09IFwiZnVuY3Rpb25cIikgc3BlY2lmaWVyID0gZm9ybWF0KHNwZWNpZmllcik7XG4gICAgaWYgKGNvdW50ID09PSBJbmZpbml0eSkgcmV0dXJuIHNwZWNpZmllcjtcbiAgICBpZiAoY291bnQgPT0gbnVsbCkgY291bnQgPSAxMDtcbiAgICB2YXIgayA9IE1hdGgubWF4KDEsIGJhc2UgKiBjb3VudCAvIHNjYWxlLnRpY2tzKCkubGVuZ3RoKTsgLy8gVE9ETyBmYXN0IGVzdGltYXRlP1xuICAgIHJldHVybiBmdW5jdGlvbihkKSB7XG4gICAgICB2YXIgaSA9IGQgLyBwb3dzKE1hdGgucm91bmQobG9ncyhkKSkpO1xuICAgICAgaWYgKGkgKiBiYXNlIDwgYmFzZSAtIDAuNSkgaSAqPSBiYXNlO1xuICAgICAgcmV0dXJuIGkgPD0gayA/IHNwZWNpZmllcihkKSA6IFwiXCI7XG4gICAgfTtcbiAgfTtcblxuICBzY2FsZS5uaWNlID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvbWFpbihuaWNlKGRvbWFpbigpLCB7XG4gICAgICBmbG9vcjogZnVuY3Rpb24oeCkgeyByZXR1cm4gcG93cyhNYXRoLmZsb29yKGxvZ3MoeCkpKTsgfSxcbiAgICAgIGNlaWw6IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHBvd3MoTWF0aC5jZWlsKGxvZ3MoeCkpKTsgfVxuICAgIH0pKTtcbiAgfTtcblxuICByZXR1cm4gc2NhbGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGxvZygpIHtcbiAgdmFyIHNjYWxlID0gbG9nZ2lzaCh0cmFuc2Zvcm1lcigpKS5kb21haW4oWzEsIDEwXSk7XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb3B5KHNjYWxlLCBsb2coKSkuYmFzZShzY2FsZS5iYXNlKCkpO1xuICB9O1xuXG4gIGluaXRSYW5nZS5hcHBseShzY2FsZSwgYXJndW1lbnRzKTtcblxuICByZXR1cm4gc2NhbGU7XG59XG4iLCJpbXBvcnQge2xpbmVhcmlzaH0gZnJvbSBcIi4vbGluZWFyXCI7XG5pbXBvcnQge2NvcHksIHRyYW5zZm9ybWVyfSBmcm9tIFwiLi9jb250aW51b3VzXCI7XG5pbXBvcnQge2luaXRSYW5nZX0gZnJvbSBcIi4vaW5pdFwiO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm1TeW1sb2coYykge1xuICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiBNYXRoLnNpZ24oeCkgKiBNYXRoLmxvZzFwKE1hdGguYWJzKHggLyBjKSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVN5bWV4cChjKSB7XG4gIHJldHVybiBmdW5jdGlvbih4KSB7XG4gICAgcmV0dXJuIE1hdGguc2lnbih4KSAqIE1hdGguZXhwbTEoTWF0aC5hYnMoeCkpICogYztcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHN5bWxvZ2lzaCh0cmFuc2Zvcm0pIHtcbiAgdmFyIGMgPSAxLCBzY2FsZSA9IHRyYW5zZm9ybSh0cmFuc2Zvcm1TeW1sb2coYyksIHRyYW5zZm9ybVN5bWV4cChjKSk7XG5cbiAgc2NhbGUuY29uc3RhbnQgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyB0cmFuc2Zvcm0odHJhbnNmb3JtU3ltbG9nKGMgPSArXyksIHRyYW5zZm9ybVN5bWV4cChjKSkgOiBjO1xuICB9O1xuXG4gIHJldHVybiBsaW5lYXJpc2goc2NhbGUpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBzeW1sb2coKSB7XG4gIHZhciBzY2FsZSA9IHN5bWxvZ2lzaCh0cmFuc2Zvcm1lcigpKTtcblxuICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvcHkoc2NhbGUsIHN5bWxvZygpKS5jb25zdGFudChzY2FsZS5jb25zdGFudCgpKTtcbiAgfTtcblxuICByZXR1cm4gaW5pdFJhbmdlLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xufVxuIiwiaW1wb3J0IHtsaW5lYXJpc2h9IGZyb20gXCIuL2xpbmVhclwiO1xuaW1wb3J0IHtjb3B5LCBpZGVudGl0eSwgdHJhbnNmb3JtZXJ9IGZyb20gXCIuL2NvbnRpbnVvdXNcIjtcbmltcG9ydCB7aW5pdFJhbmdlfSBmcm9tIFwiLi9pbml0XCI7XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVBvdyhleHBvbmVudCkge1xuICByZXR1cm4gZnVuY3Rpb24oeCkge1xuICAgIHJldHVybiB4IDwgMCA/IC1NYXRoLnBvdygteCwgZXhwb25lbnQpIDogTWF0aC5wb3coeCwgZXhwb25lbnQpO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0cmFuc2Zvcm1TcXJ0KHgpIHtcbiAgcmV0dXJuIHggPCAwID8gLU1hdGguc3FydCgteCkgOiBNYXRoLnNxcnQoeCk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zZm9ybVNxdWFyZSh4KSB7XG4gIHJldHVybiB4IDwgMCA/IC14ICogeCA6IHggKiB4O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcG93aXNoKHRyYW5zZm9ybSkge1xuICB2YXIgc2NhbGUgPSB0cmFuc2Zvcm0oaWRlbnRpdHksIGlkZW50aXR5KSxcbiAgICAgIGV4cG9uZW50ID0gMTtcblxuICBmdW5jdGlvbiByZXNjYWxlKCkge1xuICAgIHJldHVybiBleHBvbmVudCA9PT0gMSA/IHRyYW5zZm9ybShpZGVudGl0eSwgaWRlbnRpdHkpXG4gICAgICAgIDogZXhwb25lbnQgPT09IDAuNSA/IHRyYW5zZm9ybSh0cmFuc2Zvcm1TcXJ0LCB0cmFuc2Zvcm1TcXVhcmUpXG4gICAgICAgIDogdHJhbnNmb3JtKHRyYW5zZm9ybVBvdyhleHBvbmVudCksIHRyYW5zZm9ybVBvdygxIC8gZXhwb25lbnQpKTtcbiAgfVxuXG4gIHNjYWxlLmV4cG9uZW50ID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGV4cG9uZW50ID0gK18sIHJlc2NhbGUoKSkgOiBleHBvbmVudDtcbiAgfTtcblxuICByZXR1cm4gbGluZWFyaXNoKHNjYWxlKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcG93KCkge1xuICB2YXIgc2NhbGUgPSBwb3dpc2godHJhbnNmb3JtZXIoKSk7XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb3B5KHNjYWxlLCBwb3coKSkuZXhwb25lbnQoc2NhbGUuZXhwb25lbnQoKSk7XG4gIH07XG5cbiAgaW5pdFJhbmdlLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xuXG4gIHJldHVybiBzY2FsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNxcnQoKSB7XG4gIHJldHVybiBwb3cuYXBwbHkobnVsbCwgYXJndW1lbnRzKS5leHBvbmVudCgwLjUpO1xufVxuIiwiaW1wb3J0IHthc2NlbmRpbmcsIGJpc2VjdCwgcXVhbnRpbGUgYXMgdGhyZXNob2xkfSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7c2xpY2V9IGZyb20gXCIuL2FycmF5XCI7XG5pbXBvcnQge2luaXRSYW5nZX0gZnJvbSBcIi4vaW5pdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBxdWFudGlsZSgpIHtcbiAgdmFyIGRvbWFpbiA9IFtdLFxuICAgICAgcmFuZ2UgPSBbXSxcbiAgICAgIHRocmVzaG9sZHMgPSBbXSxcbiAgICAgIHVua25vd247XG5cbiAgZnVuY3Rpb24gcmVzY2FsZSgpIHtcbiAgICB2YXIgaSA9IDAsIG4gPSBNYXRoLm1heCgxLCByYW5nZS5sZW5ndGgpO1xuICAgIHRocmVzaG9sZHMgPSBuZXcgQXJyYXkobiAtIDEpO1xuICAgIHdoaWxlICgrK2kgPCBuKSB0aHJlc2hvbGRzW2kgLSAxXSA9IHRocmVzaG9sZChkb21haW4sIGkgLyBuKTtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBmdW5jdGlvbiBzY2FsZSh4KSB7XG4gICAgcmV0dXJuIGlzTmFOKHggPSAreCkgPyB1bmtub3duIDogcmFuZ2VbYmlzZWN0KHRocmVzaG9sZHMsIHgpXTtcbiAgfVxuXG4gIHNjYWxlLmludmVydEV4dGVudCA9IGZ1bmN0aW9uKHkpIHtcbiAgICB2YXIgaSA9IHJhbmdlLmluZGV4T2YoeSk7XG4gICAgcmV0dXJuIGkgPCAwID8gW05hTiwgTmFOXSA6IFtcbiAgICAgIGkgPiAwID8gdGhyZXNob2xkc1tpIC0gMV0gOiBkb21haW5bMF0sXG4gICAgICBpIDwgdGhyZXNob2xkcy5sZW5ndGggPyB0aHJlc2hvbGRzW2ldIDogZG9tYWluW2RvbWFpbi5sZW5ndGggLSAxXVxuICAgIF07XG4gIH07XG5cbiAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbi5zbGljZSgpO1xuICAgIGRvbWFpbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gXy5sZW5ndGgsIGQ7IGkgPCBuOyArK2kpIGlmIChkID0gX1tpXSwgZCAhPSBudWxsICYmICFpc05hTihkID0gK2QpKSBkb21haW4ucHVzaChkKTtcbiAgICBkb21haW4uc29ydChhc2NlbmRpbmcpO1xuICAgIHJldHVybiByZXNjYWxlKCk7XG4gIH07XG5cbiAgc2NhbGUucmFuZ2UgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAocmFuZ2UgPSBzbGljZS5jYWxsKF8pLCByZXNjYWxlKCkpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgfTtcblxuICBzY2FsZS51bmtub3duID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHVua25vd24gPSBfLCBzY2FsZSkgOiB1bmtub3duO1xuICB9O1xuXG4gIHNjYWxlLnF1YW50aWxlcyA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aHJlc2hvbGRzLnNsaWNlKCk7XG4gIH07XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBxdWFudGlsZSgpXG4gICAgICAgIC5kb21haW4oZG9tYWluKVxuICAgICAgICAucmFuZ2UocmFuZ2UpXG4gICAgICAgIC51bmtub3duKHVua25vd24pO1xuICB9O1xuXG4gIHJldHVybiBpbml0UmFuZ2UuYXBwbHkoc2NhbGUsIGFyZ3VtZW50cyk7XG59XG4iLCJpbXBvcnQge2Jpc2VjdH0gZnJvbSBcImQzLWFycmF5XCI7XG5pbXBvcnQge3NsaWNlfSBmcm9tIFwiLi9hcnJheVwiO1xuaW1wb3J0IHtsaW5lYXJpc2h9IGZyb20gXCIuL2xpbmVhclwiO1xuaW1wb3J0IHtpbml0UmFuZ2V9IGZyb20gXCIuL2luaXRcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gcXVhbnRpemUoKSB7XG4gIHZhciB4MCA9IDAsXG4gICAgICB4MSA9IDEsXG4gICAgICBuID0gMSxcbiAgICAgIGRvbWFpbiA9IFswLjVdLFxuICAgICAgcmFuZ2UgPSBbMCwgMV0sXG4gICAgICB1bmtub3duO1xuXG4gIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICByZXR1cm4geCA8PSB4ID8gcmFuZ2VbYmlzZWN0KGRvbWFpbiwgeCwgMCwgbildIDogdW5rbm93bjtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2NhbGUoKSB7XG4gICAgdmFyIGkgPSAtMTtcbiAgICBkb21haW4gPSBuZXcgQXJyYXkobik7XG4gICAgd2hpbGUgKCsraSA8IG4pIGRvbWFpbltpXSA9ICgoaSArIDEpICogeDEgLSAoaSAtIG4pICogeDApIC8gKG4gKyAxKTtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH1cblxuICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoeDAgPSArX1swXSwgeDEgPSArX1sxXSwgcmVzY2FsZSgpKSA6IFt4MCwgeDFdO1xuICB9O1xuXG4gIHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKG4gPSAocmFuZ2UgPSBzbGljZS5jYWxsKF8pKS5sZW5ndGggLSAxLCByZXNjYWxlKCkpIDogcmFuZ2Uuc2xpY2UoKTtcbiAgfTtcblxuICBzY2FsZS5pbnZlcnRFeHRlbnQgPSBmdW5jdGlvbih5KSB7XG4gICAgdmFyIGkgPSByYW5nZS5pbmRleE9mKHkpO1xuICAgIHJldHVybiBpIDwgMCA/IFtOYU4sIE5hTl1cbiAgICAgICAgOiBpIDwgMSA/IFt4MCwgZG9tYWluWzBdXVxuICAgICAgICA6IGkgPj0gbiA/IFtkb21haW5bbiAtIDFdLCB4MV1cbiAgICAgICAgOiBbZG9tYWluW2kgLSAxXSwgZG9tYWluW2ldXTtcbiAgfTtcblxuICBzY2FsZS51bmtub3duID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHVua25vd24gPSBfLCBzY2FsZSkgOiBzY2FsZTtcbiAgfTtcblxuICBzY2FsZS50aHJlc2hvbGRzID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGRvbWFpbi5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gcXVhbnRpemUoKVxuICAgICAgICAuZG9tYWluKFt4MCwgeDFdKVxuICAgICAgICAucmFuZ2UocmFuZ2UpXG4gICAgICAgIC51bmtub3duKHVua25vd24pO1xuICB9O1xuXG4gIHJldHVybiBpbml0UmFuZ2UuYXBwbHkobGluZWFyaXNoKHNjYWxlKSwgYXJndW1lbnRzKTtcbn1cbiIsImltcG9ydCB7YmlzZWN0fSBmcm9tIFwiZDMtYXJyYXlcIjtcbmltcG9ydCB7c2xpY2V9IGZyb20gXCIuL2FycmF5XCI7XG5pbXBvcnQge2luaXRSYW5nZX0gZnJvbSBcIi4vaW5pdFwiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0aHJlc2hvbGQoKSB7XG4gIHZhciBkb21haW4gPSBbMC41XSxcbiAgICAgIHJhbmdlID0gWzAsIDFdLFxuICAgICAgdW5rbm93bixcbiAgICAgIG4gPSAxO1xuXG4gIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICByZXR1cm4geCA8PSB4ID8gcmFuZ2VbYmlzZWN0KGRvbWFpbiwgeCwgMCwgbildIDogdW5rbm93bjtcbiAgfVxuXG4gIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChkb21haW4gPSBzbGljZS5jYWxsKF8pLCBuID0gTWF0aC5taW4oZG9tYWluLmxlbmd0aCwgcmFuZ2UubGVuZ3RoIC0gMSksIHNjYWxlKSA6IGRvbWFpbi5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLnJhbmdlID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHJhbmdlID0gc2xpY2UuY2FsbChfKSwgbiA9IE1hdGgubWluKGRvbWFpbi5sZW5ndGgsIHJhbmdlLmxlbmd0aCAtIDEpLCBzY2FsZSkgOiByYW5nZS5zbGljZSgpO1xuICB9O1xuXG4gIHNjYWxlLmludmVydEV4dGVudCA9IGZ1bmN0aW9uKHkpIHtcbiAgICB2YXIgaSA9IHJhbmdlLmluZGV4T2YoeSk7XG4gICAgcmV0dXJuIFtkb21haW5baSAtIDFdLCBkb21haW5baV1dO1xuICB9O1xuXG4gIHNjYWxlLnVua25vd24gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAodW5rbm93biA9IF8sIHNjYWxlKSA6IHVua25vd247XG4gIH07XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aHJlc2hvbGQoKVxuICAgICAgICAuZG9tYWluKGRvbWFpbilcbiAgICAgICAgLnJhbmdlKHJhbmdlKVxuICAgICAgICAudW5rbm93bih1bmtub3duKTtcbiAgfTtcblxuICByZXR1cm4gaW5pdFJhbmdlLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xufVxuIiwiaW1wb3J0IHtiaXNlY3RvciwgdGlja1N0ZXB9IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IHt0aW1lWWVhciwgdGltZU1vbnRoLCB0aW1lV2VlaywgdGltZURheSwgdGltZUhvdXIsIHRpbWVNaW51dGUsIHRpbWVTZWNvbmQsIHRpbWVNaWxsaXNlY29uZH0gZnJvbSBcImQzLXRpbWVcIjtcbmltcG9ydCB7dGltZUZvcm1hdH0gZnJvbSBcImQzLXRpbWUtZm9ybWF0XCI7XG5pbXBvcnQge21hcH0gZnJvbSBcIi4vYXJyYXlcIjtcbmltcG9ydCBjb250aW51b3VzLCB7Y29weSwgaWRlbnRpdHl9IGZyb20gXCIuL2NvbnRpbnVvdXNcIjtcbmltcG9ydCB7aW5pdFJhbmdlfSBmcm9tIFwiLi9pbml0XCI7XG5pbXBvcnQgbmljZSBmcm9tIFwiLi9uaWNlXCI7XG5cbnZhciBkdXJhdGlvblNlY29uZCA9IDEwMDAsXG4gICAgZHVyYXRpb25NaW51dGUgPSBkdXJhdGlvblNlY29uZCAqIDYwLFxuICAgIGR1cmF0aW9uSG91ciA9IGR1cmF0aW9uTWludXRlICogNjAsXG4gICAgZHVyYXRpb25EYXkgPSBkdXJhdGlvbkhvdXIgKiAyNCxcbiAgICBkdXJhdGlvbldlZWsgPSBkdXJhdGlvbkRheSAqIDcsXG4gICAgZHVyYXRpb25Nb250aCA9IGR1cmF0aW9uRGF5ICogMzAsXG4gICAgZHVyYXRpb25ZZWFyID0gZHVyYXRpb25EYXkgKiAzNjU7XG5cbmZ1bmN0aW9uIGRhdGUodCkge1xuICByZXR1cm4gbmV3IERhdGUodCk7XG59XG5cbmZ1bmN0aW9uIG51bWJlcih0KSB7XG4gIHJldHVybiB0IGluc3RhbmNlb2YgRGF0ZSA/ICt0IDogK25ldyBEYXRlKCt0KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGVuZGFyKHllYXIsIG1vbnRoLCB3ZWVrLCBkYXksIGhvdXIsIG1pbnV0ZSwgc2Vjb25kLCBtaWxsaXNlY29uZCwgZm9ybWF0KSB7XG4gIHZhciBzY2FsZSA9IGNvbnRpbnVvdXMoaWRlbnRpdHksIGlkZW50aXR5KSxcbiAgICAgIGludmVydCA9IHNjYWxlLmludmVydCxcbiAgICAgIGRvbWFpbiA9IHNjYWxlLmRvbWFpbjtcblxuICB2YXIgZm9ybWF0TWlsbGlzZWNvbmQgPSBmb3JtYXQoXCIuJUxcIiksXG4gICAgICBmb3JtYXRTZWNvbmQgPSBmb3JtYXQoXCI6JVNcIiksXG4gICAgICBmb3JtYXRNaW51dGUgPSBmb3JtYXQoXCIlSTolTVwiKSxcbiAgICAgIGZvcm1hdEhvdXIgPSBmb3JtYXQoXCIlSSAlcFwiKSxcbiAgICAgIGZvcm1hdERheSA9IGZvcm1hdChcIiVhICVkXCIpLFxuICAgICAgZm9ybWF0V2VlayA9IGZvcm1hdChcIiViICVkXCIpLFxuICAgICAgZm9ybWF0TW9udGggPSBmb3JtYXQoXCIlQlwiKSxcbiAgICAgIGZvcm1hdFllYXIgPSBmb3JtYXQoXCIlWVwiKTtcblxuICB2YXIgdGlja0ludGVydmFscyA9IFtcbiAgICBbc2Vjb25kLCAgMSwgICAgICBkdXJhdGlvblNlY29uZF0sXG4gICAgW3NlY29uZCwgIDUsICA1ICogZHVyYXRpb25TZWNvbmRdLFxuICAgIFtzZWNvbmQsIDE1LCAxNSAqIGR1cmF0aW9uU2Vjb25kXSxcbiAgICBbc2Vjb25kLCAzMCwgMzAgKiBkdXJhdGlvblNlY29uZF0sXG4gICAgW21pbnV0ZSwgIDEsICAgICAgZHVyYXRpb25NaW51dGVdLFxuICAgIFttaW51dGUsICA1LCAgNSAqIGR1cmF0aW9uTWludXRlXSxcbiAgICBbbWludXRlLCAxNSwgMTUgKiBkdXJhdGlvbk1pbnV0ZV0sXG4gICAgW21pbnV0ZSwgMzAsIDMwICogZHVyYXRpb25NaW51dGVdLFxuICAgIFsgIGhvdXIsICAxLCAgICAgIGR1cmF0aW9uSG91ciAgXSxcbiAgICBbICBob3VyLCAgMywgIDMgKiBkdXJhdGlvbkhvdXIgIF0sXG4gICAgWyAgaG91ciwgIDYsICA2ICogZHVyYXRpb25Ib3VyICBdLFxuICAgIFsgIGhvdXIsIDEyLCAxMiAqIGR1cmF0aW9uSG91ciAgXSxcbiAgICBbICAgZGF5LCAgMSwgICAgICBkdXJhdGlvbkRheSAgIF0sXG4gICAgWyAgIGRheSwgIDIsICAyICogZHVyYXRpb25EYXkgICBdLFxuICAgIFsgIHdlZWssICAxLCAgICAgIGR1cmF0aW9uV2VlayAgXSxcbiAgICBbIG1vbnRoLCAgMSwgICAgICBkdXJhdGlvbk1vbnRoIF0sXG4gICAgWyBtb250aCwgIDMsICAzICogZHVyYXRpb25Nb250aCBdLFxuICAgIFsgIHllYXIsICAxLCAgICAgIGR1cmF0aW9uWWVhciAgXVxuICBdO1xuXG4gIGZ1bmN0aW9uIHRpY2tGb3JtYXQoZGF0ZSkge1xuICAgIHJldHVybiAoc2Vjb25kKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdE1pbGxpc2Vjb25kXG4gICAgICAgIDogbWludXRlKGRhdGUpIDwgZGF0ZSA/IGZvcm1hdFNlY29uZFxuICAgICAgICA6IGhvdXIoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TWludXRlXG4gICAgICAgIDogZGF5KGRhdGUpIDwgZGF0ZSA/IGZvcm1hdEhvdXJcbiAgICAgICAgOiBtb250aChkYXRlKSA8IGRhdGUgPyAod2VlayhkYXRlKSA8IGRhdGUgPyBmb3JtYXREYXkgOiBmb3JtYXRXZWVrKVxuICAgICAgICA6IHllYXIoZGF0ZSkgPCBkYXRlID8gZm9ybWF0TW9udGhcbiAgICAgICAgOiBmb3JtYXRZZWFyKShkYXRlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2tJbnRlcnZhbChpbnRlcnZhbCwgc3RhcnQsIHN0b3AsIHN0ZXApIHtcbiAgICBpZiAoaW50ZXJ2YWwgPT0gbnVsbCkgaW50ZXJ2YWwgPSAxMDtcblxuICAgIC8vIElmIGEgZGVzaXJlZCB0aWNrIGNvdW50IGlzIHNwZWNpZmllZCwgcGljayBhIHJlYXNvbmFibGUgdGljayBpbnRlcnZhbFxuICAgIC8vIGJhc2VkIG9uIHRoZSBleHRlbnQgb2YgdGhlIGRvbWFpbiBhbmQgYSByb3VnaCBlc3RpbWF0ZSBvZiB0aWNrIHNpemUuXG4gICAgLy8gT3RoZXJ3aXNlLCBhc3N1bWUgaW50ZXJ2YWwgaXMgYWxyZWFkeSBhIHRpbWUgaW50ZXJ2YWwgYW5kIHVzZSBpdC5cbiAgICBpZiAodHlwZW9mIGludGVydmFsID09PSBcIm51bWJlclwiKSB7XG4gICAgICB2YXIgdGFyZ2V0ID0gTWF0aC5hYnMoc3RvcCAtIHN0YXJ0KSAvIGludGVydmFsLFxuICAgICAgICAgIGkgPSBiaXNlY3RvcihmdW5jdGlvbihpKSB7IHJldHVybiBpWzJdOyB9KS5yaWdodCh0aWNrSW50ZXJ2YWxzLCB0YXJnZXQpO1xuICAgICAgaWYgKGkgPT09IHRpY2tJbnRlcnZhbHMubGVuZ3RoKSB7XG4gICAgICAgIHN0ZXAgPSB0aWNrU3RlcChzdGFydCAvIGR1cmF0aW9uWWVhciwgc3RvcCAvIGR1cmF0aW9uWWVhciwgaW50ZXJ2YWwpO1xuICAgICAgICBpbnRlcnZhbCA9IHllYXI7XG4gICAgICB9IGVsc2UgaWYgKGkpIHtcbiAgICAgICAgaSA9IHRpY2tJbnRlcnZhbHNbdGFyZ2V0IC8gdGlja0ludGVydmFsc1tpIC0gMV1bMl0gPCB0aWNrSW50ZXJ2YWxzW2ldWzJdIC8gdGFyZ2V0ID8gaSAtIDEgOiBpXTtcbiAgICAgICAgc3RlcCA9IGlbMV07XG4gICAgICAgIGludGVydmFsID0gaVswXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0ZXAgPSBNYXRoLm1heCh0aWNrU3RlcChzdGFydCwgc3RvcCwgaW50ZXJ2YWwpLCAxKTtcbiAgICAgICAgaW50ZXJ2YWwgPSBtaWxsaXNlY29uZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gc3RlcCA9PSBudWxsID8gaW50ZXJ2YWwgOiBpbnRlcnZhbC5ldmVyeShzdGVwKTtcbiAgfVxuXG4gIHNjYWxlLmludmVydCA9IGZ1bmN0aW9uKHkpIHtcbiAgICByZXR1cm4gbmV3IERhdGUoaW52ZXJ0KHkpKTtcbiAgfTtcblxuICBzY2FsZS5kb21haW4gPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyBkb21haW4obWFwLmNhbGwoXywgbnVtYmVyKSkgOiBkb21haW4oKS5tYXAoZGF0ZSk7XG4gIH07XG5cbiAgc2NhbGUudGlja3MgPSBmdW5jdGlvbihpbnRlcnZhbCwgc3RlcCkge1xuICAgIHZhciBkID0gZG9tYWluKCksXG4gICAgICAgIHQwID0gZFswXSxcbiAgICAgICAgdDEgPSBkW2QubGVuZ3RoIC0gMV0sXG4gICAgICAgIHIgPSB0MSA8IHQwLFxuICAgICAgICB0O1xuICAgIGlmIChyKSB0ID0gdDAsIHQwID0gdDEsIHQxID0gdDtcbiAgICB0ID0gdGlja0ludGVydmFsKGludGVydmFsLCB0MCwgdDEsIHN0ZXApO1xuICAgIHQgPSB0ID8gdC5yYW5nZSh0MCwgdDEgKyAxKSA6IFtdOyAvLyBpbmNsdXNpdmUgc3RvcFxuICAgIHJldHVybiByID8gdC5yZXZlcnNlKCkgOiB0O1xuICB9O1xuXG4gIHNjYWxlLnRpY2tGb3JtYXQgPSBmdW5jdGlvbihjb3VudCwgc3BlY2lmaWVyKSB7XG4gICAgcmV0dXJuIHNwZWNpZmllciA9PSBudWxsID8gdGlja0Zvcm1hdCA6IGZvcm1hdChzcGVjaWZpZXIpO1xuICB9O1xuXG4gIHNjYWxlLm5pY2UgPSBmdW5jdGlvbihpbnRlcnZhbCwgc3RlcCkge1xuICAgIHZhciBkID0gZG9tYWluKCk7XG4gICAgcmV0dXJuIChpbnRlcnZhbCA9IHRpY2tJbnRlcnZhbChpbnRlcnZhbCwgZFswXSwgZFtkLmxlbmd0aCAtIDFdLCBzdGVwKSlcbiAgICAgICAgPyBkb21haW4obmljZShkLCBpbnRlcnZhbCkpXG4gICAgICAgIDogc2NhbGU7XG4gIH07XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb3B5KHNjYWxlLCBjYWxlbmRhcih5ZWFyLCBtb250aCwgd2VlaywgZGF5LCBob3VyLCBtaW51dGUsIHNlY29uZCwgbWlsbGlzZWNvbmQsIGZvcm1hdCkpO1xuICB9O1xuXG4gIHJldHVybiBzY2FsZTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBpbml0UmFuZ2UuYXBwbHkoY2FsZW5kYXIodGltZVllYXIsIHRpbWVNb250aCwgdGltZVdlZWssIHRpbWVEYXksIHRpbWVIb3VyLCB0aW1lTWludXRlLCB0aW1lU2Vjb25kLCB0aW1lTWlsbGlzZWNvbmQsIHRpbWVGb3JtYXQpLmRvbWFpbihbbmV3IERhdGUoMjAwMCwgMCwgMSksIG5ldyBEYXRlKDIwMDAsIDAsIDIpXSksIGFyZ3VtZW50cyk7XG59XG4iLCJpbXBvcnQge2NhbGVuZGFyfSBmcm9tIFwiLi90aW1lXCI7XG5pbXBvcnQge3V0Y0Zvcm1hdH0gZnJvbSBcImQzLXRpbWUtZm9ybWF0XCI7XG5pbXBvcnQge3V0Y1llYXIsIHV0Y01vbnRoLCB1dGNXZWVrLCB1dGNEYXksIHV0Y0hvdXIsIHV0Y01pbnV0ZSwgdXRjU2Vjb25kLCB1dGNNaWxsaXNlY29uZH0gZnJvbSBcImQzLXRpbWVcIjtcbmltcG9ydCB7aW5pdFJhbmdlfSBmcm9tIFwiLi9pbml0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICByZXR1cm4gaW5pdFJhbmdlLmFwcGx5KGNhbGVuZGFyKHV0Y1llYXIsIHV0Y01vbnRoLCB1dGNXZWVrLCB1dGNEYXksIHV0Y0hvdXIsIHV0Y01pbnV0ZSwgdXRjU2Vjb25kLCB1dGNNaWxsaXNlY29uZCwgdXRjRm9ybWF0KS5kb21haW4oW0RhdGUuVVRDKDIwMDAsIDAsIDEpLCBEYXRlLlVUQygyMDAwLCAwLCAyKV0pLCBhcmd1bWVudHMpO1xufVxuIiwiaW1wb3J0IHtpZGVudGl0eX0gZnJvbSBcIi4vY29udGludW91c1wiO1xuaW1wb3J0IHtpbml0SW50ZXJwb2xhdG9yfSBmcm9tIFwiLi9pbml0XCI7XG5pbXBvcnQge2xpbmVhcmlzaH0gZnJvbSBcIi4vbGluZWFyXCI7XG5pbXBvcnQge2xvZ2dpc2h9IGZyb20gXCIuL2xvZ1wiO1xuaW1wb3J0IHtzeW1sb2dpc2h9IGZyb20gXCIuL3N5bWxvZ1wiO1xuaW1wb3J0IHtwb3dpc2h9IGZyb20gXCIuL3Bvd1wiO1xuXG5mdW5jdGlvbiB0cmFuc2Zvcm1lcigpIHtcbiAgdmFyIHgwID0gMCxcbiAgICAgIHgxID0gMSxcbiAgICAgIHQwLFxuICAgICAgdDEsXG4gICAgICBrMTAsXG4gICAgICB0cmFuc2Zvcm0sXG4gICAgICBpbnRlcnBvbGF0b3IgPSBpZGVudGl0eSxcbiAgICAgIGNsYW1wID0gZmFsc2UsXG4gICAgICB1bmtub3duO1xuXG4gIGZ1bmN0aW9uIHNjYWxlKHgpIHtcbiAgICByZXR1cm4gaXNOYU4oeCA9ICt4KSA/IHVua25vd24gOiBpbnRlcnBvbGF0b3IoazEwID09PSAwID8gMC41IDogKHggPSAodHJhbnNmb3JtKHgpIC0gdDApICogazEwLCBjbGFtcCA/IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIHgpKSA6IHgpKTtcbiAgfVxuXG4gIHNjYWxlLmRvbWFpbiA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/ICh0MCA9IHRyYW5zZm9ybSh4MCA9ICtfWzBdKSwgdDEgPSB0cmFuc2Zvcm0oeDEgPSArX1sxXSksIGsxMCA9IHQwID09PSB0MSA/IDAgOiAxIC8gKHQxIC0gdDApLCBzY2FsZSkgOiBbeDAsIHgxXTtcbiAgfTtcblxuICBzY2FsZS5jbGFtcCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChjbGFtcCA9ICEhXywgc2NhbGUpIDogY2xhbXA7XG4gIH07XG5cbiAgc2NhbGUuaW50ZXJwb2xhdG9yID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGludGVycG9sYXRvciA9IF8sIHNjYWxlKSA6IGludGVycG9sYXRvcjtcbiAgfTtcblxuICBzY2FsZS51bmtub3duID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHVua25vd24gPSBfLCBzY2FsZSkgOiB1bmtub3duO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdHJhbnNmb3JtID0gdCwgdDAgPSB0KHgwKSwgdDEgPSB0KHgxKSwgazEwID0gdDAgPT09IHQxID8gMCA6IDEgLyAodDEgLSB0MCk7XG4gICAgcmV0dXJuIHNjYWxlO1xuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY29weShzb3VyY2UsIHRhcmdldCkge1xuICByZXR1cm4gdGFyZ2V0XG4gICAgICAuZG9tYWluKHNvdXJjZS5kb21haW4oKSlcbiAgICAgIC5pbnRlcnBvbGF0b3Ioc291cmNlLmludGVycG9sYXRvcigpKVxuICAgICAgLmNsYW1wKHNvdXJjZS5jbGFtcCgpKVxuICAgICAgLnVua25vd24oc291cmNlLnVua25vd24oKSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlcXVlbnRpYWwoKSB7XG4gIHZhciBzY2FsZSA9IGxpbmVhcmlzaCh0cmFuc2Zvcm1lcigpKGlkZW50aXR5KSk7XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb3B5KHNjYWxlLCBzZXF1ZW50aWFsKCkpO1xuICB9O1xuXG4gIHJldHVybiBpbml0SW50ZXJwb2xhdG9yLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVudGlhbExvZygpIHtcbiAgdmFyIHNjYWxlID0gbG9nZ2lzaCh0cmFuc2Zvcm1lcigpKS5kb21haW4oWzEsIDEwXSk7XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb3B5KHNjYWxlLCBzZXF1ZW50aWFsTG9nKCkpLmJhc2Uoc2NhbGUuYmFzZSgpKTtcbiAgfTtcblxuICByZXR1cm4gaW5pdEludGVycG9sYXRvci5hcHBseShzY2FsZSwgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHNlcXVlbnRpYWxTeW1sb2coKSB7XG4gIHZhciBzY2FsZSA9IHN5bWxvZ2lzaCh0cmFuc2Zvcm1lcigpKTtcblxuICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvcHkoc2NhbGUsIHNlcXVlbnRpYWxTeW1sb2coKSkuY29uc3RhbnQoc2NhbGUuY29uc3RhbnQoKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluaXRJbnRlcnBvbGF0b3IuYXBwbHkoc2NhbGUsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW50aWFsUG93KCkge1xuICB2YXIgc2NhbGUgPSBwb3dpc2godHJhbnNmb3JtZXIoKSk7XG5cbiAgc2NhbGUuY29weSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBjb3B5KHNjYWxlLCBzZXF1ZW50aWFsUG93KCkpLmV4cG9uZW50KHNjYWxlLmV4cG9uZW50KCkpO1xuICB9O1xuXG4gIHJldHVybiBpbml0SW50ZXJwb2xhdG9yLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2VxdWVudGlhbFNxcnQoKSB7XG4gIHJldHVybiBzZXF1ZW50aWFsUG93LmFwcGx5KG51bGwsIGFyZ3VtZW50cykuZXhwb25lbnQoMC41KTtcbn1cbiIsImltcG9ydCB7YXNjZW5kaW5nLCBiaXNlY3R9IGZyb20gXCJkMy1hcnJheVwiO1xuaW1wb3J0IHtpZGVudGl0eX0gZnJvbSBcIi4vY29udGludW91c1wiO1xuaW1wb3J0IHtpbml0SW50ZXJwb2xhdG9yfSBmcm9tIFwiLi9pbml0XCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHNlcXVlbnRpYWxRdWFudGlsZSgpIHtcbiAgdmFyIGRvbWFpbiA9IFtdLFxuICAgICAgaW50ZXJwb2xhdG9yID0gaWRlbnRpdHk7XG5cbiAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgIGlmICghaXNOYU4oeCA9ICt4KSkgcmV0dXJuIGludGVycG9sYXRvcigoYmlzZWN0KGRvbWFpbiwgeCkgLSAxKSAvIChkb21haW4ubGVuZ3RoIC0gMSkpO1xuICB9XG5cbiAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgIGlmICghYXJndW1lbnRzLmxlbmd0aCkgcmV0dXJuIGRvbWFpbi5zbGljZSgpO1xuICAgIGRvbWFpbiA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBuID0gXy5sZW5ndGgsIGQ7IGkgPCBuOyArK2kpIGlmIChkID0gX1tpXSwgZCAhPSBudWxsICYmICFpc05hTihkID0gK2QpKSBkb21haW4ucHVzaChkKTtcbiAgICBkb21haW4uc29ydChhc2NlbmRpbmcpO1xuICAgIHJldHVybiBzY2FsZTtcbiAgfTtcblxuICBzY2FsZS5pbnRlcnBvbGF0b3IgPSBmdW5jdGlvbihfKSB7XG4gICAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPyAoaW50ZXJwb2xhdG9yID0gXywgc2NhbGUpIDogaW50ZXJwb2xhdG9yO1xuICB9O1xuXG4gIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gc2VxdWVudGlhbFF1YW50aWxlKGludGVycG9sYXRvcikuZG9tYWluKGRvbWFpbik7XG4gIH07XG5cbiAgcmV0dXJuIGluaXRJbnRlcnBvbGF0b3IuYXBwbHkoc2NhbGUsIGFyZ3VtZW50cyk7XG59XG4iLCJpbXBvcnQge2lkZW50aXR5fSBmcm9tIFwiLi9jb250aW51b3VzXCI7XG5pbXBvcnQge2luaXRJbnRlcnBvbGF0b3J9IGZyb20gXCIuL2luaXRcIjtcbmltcG9ydCB7bGluZWFyaXNofSBmcm9tIFwiLi9saW5lYXJcIjtcbmltcG9ydCB7bG9nZ2lzaH0gZnJvbSBcIi4vbG9nXCI7XG5pbXBvcnQge2NvcHl9IGZyb20gXCIuL3NlcXVlbnRpYWxcIjtcbmltcG9ydCB7c3ltbG9naXNofSBmcm9tIFwiLi9zeW1sb2dcIjtcbmltcG9ydCB7cG93aXNofSBmcm9tIFwiLi9wb3dcIjtcblxuZnVuY3Rpb24gdHJhbnNmb3JtZXIoKSB7XG4gIHZhciB4MCA9IDAsXG4gICAgICB4MSA9IDAuNSxcbiAgICAgIHgyID0gMSxcbiAgICAgIHQwLFxuICAgICAgdDEsXG4gICAgICB0MixcbiAgICAgIGsxMCxcbiAgICAgIGsyMSxcbiAgICAgIGludGVycG9sYXRvciA9IGlkZW50aXR5LFxuICAgICAgdHJhbnNmb3JtLFxuICAgICAgY2xhbXAgPSBmYWxzZSxcbiAgICAgIHVua25vd247XG5cbiAgZnVuY3Rpb24gc2NhbGUoeCkge1xuICAgIHJldHVybiBpc05hTih4ID0gK3gpID8gdW5rbm93biA6ICh4ID0gMC41ICsgKCh4ID0gK3RyYW5zZm9ybSh4KSkgLSB0MSkgKiAoeCA8IHQxID8gazEwIDogazIxKSwgaW50ZXJwb2xhdG9yKGNsYW1wID8gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgeCkpIDogeCkpO1xuICB9XG5cbiAgc2NhbGUuZG9tYWluID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHQwID0gdHJhbnNmb3JtKHgwID0gK19bMF0pLCB0MSA9IHRyYW5zZm9ybSh4MSA9ICtfWzFdKSwgdDIgPSB0cmFuc2Zvcm0oeDIgPSArX1syXSksIGsxMCA9IHQwID09PSB0MSA/IDAgOiAwLjUgLyAodDEgLSB0MCksIGsyMSA9IHQxID09PSB0MiA/IDAgOiAwLjUgLyAodDIgLSB0MSksIHNjYWxlKSA6IFt4MCwgeDEsIHgyXTtcbiAgfTtcblxuICBzY2FsZS5jbGFtcCA9IGZ1bmN0aW9uKF8pIHtcbiAgICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA/IChjbGFtcCA9ICEhXywgc2NhbGUpIDogY2xhbXA7XG4gIH07XG5cbiAgc2NhbGUuaW50ZXJwb2xhdG9yID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKGludGVycG9sYXRvciA9IF8sIHNjYWxlKSA6IGludGVycG9sYXRvcjtcbiAgfTtcblxuICBzY2FsZS51bmtub3duID0gZnVuY3Rpb24oXykge1xuICAgIHJldHVybiBhcmd1bWVudHMubGVuZ3RoID8gKHVua25vd24gPSBfLCBzY2FsZSkgOiB1bmtub3duO1xuICB9O1xuXG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdHJhbnNmb3JtID0gdCwgdDAgPSB0KHgwKSwgdDEgPSB0KHgxKSwgdDIgPSB0KHgyKSwgazEwID0gdDAgPT09IHQxID8gMCA6IDAuNSAvICh0MSAtIHQwKSwgazIxID0gdDEgPT09IHQyID8gMCA6IDAuNSAvICh0MiAtIHQxKTtcbiAgICByZXR1cm4gc2NhbGU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGRpdmVyZ2luZygpIHtcbiAgdmFyIHNjYWxlID0gbGluZWFyaXNoKHRyYW5zZm9ybWVyKCkoaWRlbnRpdHkpKTtcblxuICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvcHkoc2NhbGUsIGRpdmVyZ2luZygpKTtcbiAgfTtcblxuICByZXR1cm4gaW5pdEludGVycG9sYXRvci5hcHBseShzY2FsZSwgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdmVyZ2luZ0xvZygpIHtcbiAgdmFyIHNjYWxlID0gbG9nZ2lzaCh0cmFuc2Zvcm1lcigpKS5kb21haW4oWzAuMSwgMSwgMTBdKTtcblxuICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvcHkoc2NhbGUsIGRpdmVyZ2luZ0xvZygpKS5iYXNlKHNjYWxlLmJhc2UoKSk7XG4gIH07XG5cbiAgcmV0dXJuIGluaXRJbnRlcnBvbGF0b3IuYXBwbHkoc2NhbGUsIGFyZ3VtZW50cyk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkaXZlcmdpbmdTeW1sb2coKSB7XG4gIHZhciBzY2FsZSA9IHN5bWxvZ2lzaCh0cmFuc2Zvcm1lcigpKTtcblxuICBzY2FsZS5jb3B5ID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIGNvcHkoc2NhbGUsIGRpdmVyZ2luZ1N5bWxvZygpKS5jb25zdGFudChzY2FsZS5jb25zdGFudCgpKTtcbiAgfTtcblxuICByZXR1cm4gaW5pdEludGVycG9sYXRvci5hcHBseShzY2FsZSwgYXJndW1lbnRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRpdmVyZ2luZ1BvdygpIHtcbiAgdmFyIHNjYWxlID0gcG93aXNoKHRyYW5zZm9ybWVyKCkpO1xuXG4gIHNjYWxlLmNvcHkgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gY29weShzY2FsZSwgZGl2ZXJnaW5nUG93KCkpLmV4cG9uZW50KHNjYWxlLmV4cG9uZW50KCkpO1xuICB9O1xuXG4gIHJldHVybiBpbml0SW50ZXJwb2xhdG9yLmFwcGx5KHNjYWxlLCBhcmd1bWVudHMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGl2ZXJnaW5nU3FydCgpIHtcbiAgcmV0dXJuIGRpdmVyZ2luZ1Bvdy5hcHBseShudWxsLCBhcmd1bWVudHMpLmV4cG9uZW50KDAuNSk7XG59XG4iLCJleHBvcnQge1xuICBkZWZhdWx0IGFzIHNjYWxlQmFuZCxcbiAgcG9pbnQgYXMgc2NhbGVQb2ludFxufSBmcm9tIFwiLi9iYW5kXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgc2NhbGVJZGVudGl0eVxufSBmcm9tIFwiLi9pZGVudGl0eVwiO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIHNjYWxlTGluZWFyXG59IGZyb20gXCIuL2xpbmVhclwiO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIHNjYWxlTG9nXG59IGZyb20gXCIuL2xvZ1wiO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIHNjYWxlU3ltbG9nXG59IGZyb20gXCIuL3N5bWxvZ1wiO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIHNjYWxlT3JkaW5hbCxcbiAgaW1wbGljaXQgYXMgc2NhbGVJbXBsaWNpdFxufSBmcm9tIFwiLi9vcmRpbmFsXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgc2NhbGVQb3csXG4gIHNxcnQgYXMgc2NhbGVTcXJ0XG59IGZyb20gXCIuL3Bvd1wiO1xuXG5leHBvcnQge1xuICBkZWZhdWx0IGFzIHNjYWxlUXVhbnRpbGVcbn0gZnJvbSBcIi4vcXVhbnRpbGVcIjtcblxuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBzY2FsZVF1YW50aXplXG59IGZyb20gXCIuL3F1YW50aXplXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgc2NhbGVUaHJlc2hvbGRcbn0gZnJvbSBcIi4vdGhyZXNob2xkXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgc2NhbGVUaW1lXG59IGZyb20gXCIuL3RpbWVcIjtcblxuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBzY2FsZVV0Y1xufSBmcm9tIFwiLi91dGNUaW1lXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgc2NhbGVTZXF1ZW50aWFsLFxuICBzZXF1ZW50aWFsTG9nIGFzIHNjYWxlU2VxdWVudGlhbExvZyxcbiAgc2VxdWVudGlhbFBvdyBhcyBzY2FsZVNlcXVlbnRpYWxQb3csXG4gIHNlcXVlbnRpYWxTcXJ0IGFzIHNjYWxlU2VxdWVudGlhbFNxcnQsXG4gIHNlcXVlbnRpYWxTeW1sb2cgYXMgc2NhbGVTZXF1ZW50aWFsU3ltbG9nXG59IGZyb20gXCIuL3NlcXVlbnRpYWxcIjtcblxuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBzY2FsZVNlcXVlbnRpYWxRdWFudGlsZVxufSBmcm9tIFwiLi9zZXF1ZW50aWFsUXVhbnRpbGVcIjtcblxuZXhwb3J0IHtcbiAgZGVmYXVsdCBhcyBzY2FsZURpdmVyZ2luZyxcbiAgZGl2ZXJnaW5nTG9nIGFzIHNjYWxlRGl2ZXJnaW5nTG9nLFxuICBkaXZlcmdpbmdQb3cgYXMgc2NhbGVEaXZlcmdpbmdQb3csXG4gIGRpdmVyZ2luZ1NxcnQgYXMgc2NhbGVEaXZlcmdpbmdTcXJ0LFxuICBkaXZlcmdpbmdTeW1sb2cgYXMgc2NhbGVEaXZlcmdpbmdTeW1sb2dcbn0gZnJvbSBcIi4vZGl2ZXJnaW5nXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQgYXMgdGlja0Zvcm1hdFxufSBmcm9tIFwiLi90aWNrRm9ybWF0XCI7XG4iLCJ2YXIgbm9vcCA9IHt2YWx1ZTogZnVuY3Rpb24oKSB7fX07XG5cbmZ1bmN0aW9uIGRpc3BhdGNoKCkge1xuICBmb3IgKHZhciBpID0gMCwgbiA9IGFyZ3VtZW50cy5sZW5ndGgsIF8gPSB7fSwgdDsgaSA8IG47ICsraSkge1xuICAgIGlmICghKHQgPSBhcmd1bWVudHNbaV0gKyBcIlwiKSB8fCAodCBpbiBfKSB8fCAvW1xccy5dLy50ZXN0KHQpKSB0aHJvdyBuZXcgRXJyb3IoXCJpbGxlZ2FsIHR5cGU6IFwiICsgdCk7XG4gICAgX1t0XSA9IFtdO1xuICB9XG4gIHJldHVybiBuZXcgRGlzcGF0Y2goXyk7XG59XG5cbmZ1bmN0aW9uIERpc3BhdGNoKF8pIHtcbiAgdGhpcy5fID0gXztcbn1cblxuZnVuY3Rpb24gcGFyc2VUeXBlbmFtZXModHlwZW5hbWVzLCB0eXBlcykge1xuICByZXR1cm4gdHlwZW5hbWVzLnRyaW0oKS5zcGxpdCgvXnxcXHMrLykubWFwKGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgbmFtZSA9IFwiXCIsIGkgPSB0LmluZGV4T2YoXCIuXCIpO1xuICAgIGlmIChpID49IDApIG5hbWUgPSB0LnNsaWNlKGkgKyAxKSwgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgaWYgKHQgJiYgIXR5cGVzLmhhc093blByb3BlcnR5KHQpKSB0aHJvdyBuZXcgRXJyb3IoXCJ1bmtub3duIHR5cGU6IFwiICsgdCk7XG4gICAgcmV0dXJuIHt0eXBlOiB0LCBuYW1lOiBuYW1lfTtcbiAgfSk7XG59XG5cbkRpc3BhdGNoLnByb3RvdHlwZSA9IGRpc3BhdGNoLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IERpc3BhdGNoLFxuICBvbjogZnVuY3Rpb24odHlwZW5hbWUsIGNhbGxiYWNrKSB7XG4gICAgdmFyIF8gPSB0aGlzLl8sXG4gICAgICAgIFQgPSBwYXJzZVR5cGVuYW1lcyh0eXBlbmFtZSArIFwiXCIsIF8pLFxuICAgICAgICB0LFxuICAgICAgICBpID0gLTEsXG4gICAgICAgIG4gPSBULmxlbmd0aDtcblxuICAgIC8vIElmIG5vIGNhbGxiYWNrIHdhcyBzcGVjaWZpZWQsIHJldHVybiB0aGUgY2FsbGJhY2sgb2YgdGhlIGdpdmVuIHR5cGUgYW5kIG5hbWUuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgICB3aGlsZSAoKytpIDwgbikgaWYgKCh0ID0gKHR5cGVuYW1lID0gVFtpXSkudHlwZSkgJiYgKHQgPSBnZXQoX1t0XSwgdHlwZW5hbWUubmFtZSkpKSByZXR1cm4gdDtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiBhIHR5cGUgd2FzIHNwZWNpZmllZCwgc2V0IHRoZSBjYWxsYmFjayBmb3IgdGhlIGdpdmVuIHR5cGUgYW5kIG5hbWUuXG4gICAgLy8gT3RoZXJ3aXNlLCBpZiBhIG51bGwgY2FsbGJhY2sgd2FzIHNwZWNpZmllZCwgcmVtb3ZlIGNhbGxiYWNrcyBvZiB0aGUgZ2l2ZW4gbmFtZS5cbiAgICBpZiAoY2FsbGJhY2sgIT0gbnVsbCAmJiB0eXBlb2YgY2FsbGJhY2sgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yKFwiaW52YWxpZCBjYWxsYmFjazogXCIgKyBjYWxsYmFjayk7XG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIGlmICh0ID0gKHR5cGVuYW1lID0gVFtpXSkudHlwZSkgX1t0XSA9IHNldChfW3RdLCB0eXBlbmFtZS5uYW1lLCBjYWxsYmFjayk7XG4gICAgICBlbHNlIGlmIChjYWxsYmFjayA9PSBudWxsKSBmb3IgKHQgaW4gXykgX1t0XSA9IHNldChfW3RdLCB0eXBlbmFtZS5uYW1lLCBudWxsKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfSxcbiAgY29weTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGNvcHkgPSB7fSwgXyA9IHRoaXMuXztcbiAgICBmb3IgKHZhciB0IGluIF8pIGNvcHlbdF0gPSBfW3RdLnNsaWNlKCk7XG4gICAgcmV0dXJuIG5ldyBEaXNwYXRjaChjb3B5KTtcbiAgfSxcbiAgY2FsbDogZnVuY3Rpb24odHlwZSwgdGhhdCkge1xuICAgIGlmICgobiA9IGFyZ3VtZW50cy5sZW5ndGggLSAyKSA+IDApIGZvciAodmFyIGFyZ3MgPSBuZXcgQXJyYXkobiksIGkgPSAwLCBuLCB0OyBpIDwgbjsgKytpKSBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAyXTtcbiAgICBpZiAoIXRoaXMuXy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgIGZvciAodCA9IHRoaXMuX1t0eXBlXSwgaSA9IDAsIG4gPSB0Lmxlbmd0aDsgaSA8IG47ICsraSkgdFtpXS52YWx1ZS5hcHBseSh0aGF0LCBhcmdzKTtcbiAgfSxcbiAgYXBwbHk6IGZ1bmN0aW9uKHR5cGUsIHRoYXQsIGFyZ3MpIHtcbiAgICBpZiAoIXRoaXMuXy5oYXNPd25Qcm9wZXJ0eSh0eXBlKSkgdGhyb3cgbmV3IEVycm9yKFwidW5rbm93biB0eXBlOiBcIiArIHR5cGUpO1xuICAgIGZvciAodmFyIHQgPSB0aGlzLl9bdHlwZV0sIGkgPSAwLCBuID0gdC5sZW5ndGg7IGkgPCBuOyArK2kpIHRbaV0udmFsdWUuYXBwbHkodGhhdCwgYXJncyk7XG4gIH1cbn07XG5cbmZ1bmN0aW9uIGdldCh0eXBlLCBuYW1lKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gdHlwZS5sZW5ndGgsIGM7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAoKGMgPSB0eXBlW2ldKS5uYW1lID09PSBuYW1lKSB7XG4gICAgICByZXR1cm4gYy52YWx1ZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gc2V0KHR5cGUsIG5hbWUsIGNhbGxiYWNrKSB7XG4gIGZvciAodmFyIGkgPSAwLCBuID0gdHlwZS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICBpZiAodHlwZVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICB0eXBlW2ldID0gbm9vcCwgdHlwZSA9IHR5cGUuc2xpY2UoMCwgaSkuY29uY2F0KHR5cGUuc2xpY2UoaSArIDEpKTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoY2FsbGJhY2sgIT0gbnVsbCkgdHlwZS5wdXNoKHtuYW1lOiBuYW1lLCB2YWx1ZTogY2FsbGJhY2t9KTtcbiAgcmV0dXJuIHR5cGU7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGRpc3BhdGNoO1xuIiwidmFyIGZyYW1lID0gMCwgLy8gaXMgYW4gYW5pbWF0aW9uIGZyYW1lIHBlbmRpbmc/XG4gICAgdGltZW91dCA9IDAsIC8vIGlzIGEgdGltZW91dCBwZW5kaW5nP1xuICAgIGludGVydmFsID0gMCwgLy8gYXJlIGFueSB0aW1lcnMgYWN0aXZlP1xuICAgIHBva2VEZWxheSA9IDEwMDAsIC8vIGhvdyBmcmVxdWVudGx5IHdlIGNoZWNrIGZvciBjbG9jayBza2V3XG4gICAgdGFza0hlYWQsXG4gICAgdGFza1RhaWwsXG4gICAgY2xvY2tMYXN0ID0gMCxcbiAgICBjbG9ja05vdyA9IDAsXG4gICAgY2xvY2tTa2V3ID0gMCxcbiAgICBjbG9jayA9IHR5cGVvZiBwZXJmb3JtYW5jZSA9PT0gXCJvYmplY3RcIiAmJiBwZXJmb3JtYW5jZS5ub3cgPyBwZXJmb3JtYW5jZSA6IERhdGUsXG4gICAgc2V0RnJhbWUgPSB0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiICYmIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPyB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lLmJpbmQod2luZG93KSA6IGZ1bmN0aW9uKGYpIHsgc2V0VGltZW91dChmLCAxNyk7IH07XG5cbmV4cG9ydCBmdW5jdGlvbiBub3coKSB7XG4gIHJldHVybiBjbG9ja05vdyB8fCAoc2V0RnJhbWUoY2xlYXJOb3cpLCBjbG9ja05vdyA9IGNsb2NrLm5vdygpICsgY2xvY2tTa2V3KTtcbn1cblxuZnVuY3Rpb24gY2xlYXJOb3coKSB7XG4gIGNsb2NrTm93ID0gMDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFRpbWVyKCkge1xuICB0aGlzLl9jYWxsID1cbiAgdGhpcy5fdGltZSA9XG4gIHRoaXMuX25leHQgPSBudWxsO1xufVxuXG5UaW1lci5wcm90b3R5cGUgPSB0aW1lci5wcm90b3R5cGUgPSB7XG4gIGNvbnN0cnVjdG9yOiBUaW1lcixcbiAgcmVzdGFydDogZnVuY3Rpb24oY2FsbGJhY2ssIGRlbGF5LCB0aW1lKSB7XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgVHlwZUVycm9yKFwiY2FsbGJhY2sgaXMgbm90IGEgZnVuY3Rpb25cIik7XG4gICAgdGltZSA9ICh0aW1lID09IG51bGwgPyBub3coKSA6ICt0aW1lKSArIChkZWxheSA9PSBudWxsID8gMCA6ICtkZWxheSk7XG4gICAgaWYgKCF0aGlzLl9uZXh0ICYmIHRhc2tUYWlsICE9PSB0aGlzKSB7XG4gICAgICBpZiAodGFza1RhaWwpIHRhc2tUYWlsLl9uZXh0ID0gdGhpcztcbiAgICAgIGVsc2UgdGFza0hlYWQgPSB0aGlzO1xuICAgICAgdGFza1RhaWwgPSB0aGlzO1xuICAgIH1cbiAgICB0aGlzLl9jYWxsID0gY2FsbGJhY2s7XG4gICAgdGhpcy5fdGltZSA9IHRpbWU7XG4gICAgc2xlZXAoKTtcbiAgfSxcbiAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMuX2NhbGwpIHtcbiAgICAgIHRoaXMuX2NhbGwgPSBudWxsO1xuICAgICAgdGhpcy5fdGltZSA9IEluZmluaXR5O1xuICAgICAgc2xlZXAoKTtcbiAgICB9XG4gIH1cbn07XG5cbmV4cG9ydCBmdW5jdGlvbiB0aW1lcihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIHQucmVzdGFydChjYWxsYmFjaywgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRpbWVyRmx1c2goKSB7XG4gIG5vdygpOyAvLyBHZXQgdGhlIGN1cnJlbnQgdGltZSwgaWYgbm90IGFscmVhZHkgc2V0LlxuICArK2ZyYW1lOyAvLyBQcmV0ZW5kIHdl4oCZdmUgc2V0IGFuIGFsYXJtLCBpZiB3ZSBoYXZlbuKAmXQgYWxyZWFkeS5cbiAgdmFyIHQgPSB0YXNrSGVhZCwgZTtcbiAgd2hpbGUgKHQpIHtcbiAgICBpZiAoKGUgPSBjbG9ja05vdyAtIHQuX3RpbWUpID49IDApIHQuX2NhbGwuY2FsbChudWxsLCBlKTtcbiAgICB0ID0gdC5fbmV4dDtcbiAgfVxuICAtLWZyYW1lO1xufVxuXG5mdW5jdGlvbiB3YWtlKCkge1xuICBjbG9ja05vdyA9IChjbG9ja0xhc3QgPSBjbG9jay5ub3coKSkgKyBjbG9ja1NrZXc7XG4gIGZyYW1lID0gdGltZW91dCA9IDA7XG4gIHRyeSB7XG4gICAgdGltZXJGbHVzaCgpO1xuICB9IGZpbmFsbHkge1xuICAgIGZyYW1lID0gMDtcbiAgICBuYXAoKTtcbiAgICBjbG9ja05vdyA9IDA7XG4gIH1cbn1cblxuZnVuY3Rpb24gcG9rZSgpIHtcbiAgdmFyIG5vdyA9IGNsb2NrLm5vdygpLCBkZWxheSA9IG5vdyAtIGNsb2NrTGFzdDtcbiAgaWYgKGRlbGF5ID4gcG9rZURlbGF5KSBjbG9ja1NrZXcgLT0gZGVsYXksIGNsb2NrTGFzdCA9IG5vdztcbn1cblxuZnVuY3Rpb24gbmFwKCkge1xuICB2YXIgdDAsIHQxID0gdGFza0hlYWQsIHQyLCB0aW1lID0gSW5maW5pdHk7XG4gIHdoaWxlICh0MSkge1xuICAgIGlmICh0MS5fY2FsbCkge1xuICAgICAgaWYgKHRpbWUgPiB0MS5fdGltZSkgdGltZSA9IHQxLl90aW1lO1xuICAgICAgdDAgPSB0MSwgdDEgPSB0MS5fbmV4dDtcbiAgICB9IGVsc2Uge1xuICAgICAgdDIgPSB0MS5fbmV4dCwgdDEuX25leHQgPSBudWxsO1xuICAgICAgdDEgPSB0MCA/IHQwLl9uZXh0ID0gdDIgOiB0YXNrSGVhZCA9IHQyO1xuICAgIH1cbiAgfVxuICB0YXNrVGFpbCA9IHQwO1xuICBzbGVlcCh0aW1lKTtcbn1cblxuZnVuY3Rpb24gc2xlZXAodGltZSkge1xuICBpZiAoZnJhbWUpIHJldHVybjsgLy8gU29vbmVzdCBhbGFybSBhbHJlYWR5IHNldCwgb3Igd2lsbCBiZS5cbiAgaWYgKHRpbWVvdXQpIHRpbWVvdXQgPSBjbGVhclRpbWVvdXQodGltZW91dCk7XG4gIHZhciBkZWxheSA9IHRpbWUgLSBjbG9ja05vdzsgLy8gU3RyaWN0bHkgbGVzcyB0aGFuIGlmIHdlIHJlY29tcHV0ZWQgY2xvY2tOb3cuXG4gIGlmIChkZWxheSA+IDI0KSB7XG4gICAgaWYgKHRpbWUgPCBJbmZpbml0eSkgdGltZW91dCA9IHNldFRpbWVvdXQod2FrZSwgdGltZSAtIGNsb2NrLm5vdygpIC0gY2xvY2tTa2V3KTtcbiAgICBpZiAoaW50ZXJ2YWwpIGludGVydmFsID0gY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gIH0gZWxzZSB7XG4gICAgaWYgKCFpbnRlcnZhbCkgY2xvY2tMYXN0ID0gY2xvY2subm93KCksIGludGVydmFsID0gc2V0SW50ZXJ2YWwocG9rZSwgcG9rZURlbGF5KTtcbiAgICBmcmFtZSA9IDEsIHNldEZyYW1lKHdha2UpO1xuICB9XG59XG4iLCJpbXBvcnQge1RpbWVyfSBmcm9tIFwiLi90aW1lci5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjYWxsYmFjaywgZGVsYXksIHRpbWUpIHtcbiAgdmFyIHQgPSBuZXcgVGltZXI7XG4gIGRlbGF5ID0gZGVsYXkgPT0gbnVsbCA/IDAgOiArZGVsYXk7XG4gIHQucmVzdGFydChmdW5jdGlvbihlbGFwc2VkKSB7XG4gICAgdC5zdG9wKCk7XG4gICAgY2FsbGJhY2soZWxhcHNlZCArIGRlbGF5KTtcbiAgfSwgZGVsYXksIHRpbWUpO1xuICByZXR1cm4gdDtcbn1cbiIsImltcG9ydCB7ZGlzcGF0Y2h9IGZyb20gXCJkMy1kaXNwYXRjaFwiO1xuaW1wb3J0IHt0aW1lciwgdGltZW91dH0gZnJvbSBcImQzLXRpbWVyXCI7XG5cbnZhciBlbXB0eU9uID0gZGlzcGF0Y2goXCJzdGFydFwiLCBcImVuZFwiLCBcImNhbmNlbFwiLCBcImludGVycnVwdFwiKTtcbnZhciBlbXB0eVR3ZWVuID0gW107XG5cbmV4cG9ydCB2YXIgQ1JFQVRFRCA9IDA7XG5leHBvcnQgdmFyIFNDSEVEVUxFRCA9IDE7XG5leHBvcnQgdmFyIFNUQVJUSU5HID0gMjtcbmV4cG9ydCB2YXIgU1RBUlRFRCA9IDM7XG5leHBvcnQgdmFyIFJVTk5JTkcgPSA0O1xuZXhwb3J0IHZhciBFTkRJTkcgPSA1O1xuZXhwb3J0IHZhciBFTkRFRCA9IDY7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUsIGlkLCBpbmRleCwgZ3JvdXAsIHRpbWluZykge1xuICB2YXIgc2NoZWR1bGVzID0gbm9kZS5fX3RyYW5zaXRpb247XG4gIGlmICghc2NoZWR1bGVzKSBub2RlLl9fdHJhbnNpdGlvbiA9IHt9O1xuICBlbHNlIGlmIChpZCBpbiBzY2hlZHVsZXMpIHJldHVybjtcbiAgY3JlYXRlKG5vZGUsIGlkLCB7XG4gICAgbmFtZTogbmFtZSxcbiAgICBpbmRleDogaW5kZXgsIC8vIEZvciBjb250ZXh0IGR1cmluZyBjYWxsYmFjay5cbiAgICBncm91cDogZ3JvdXAsIC8vIEZvciBjb250ZXh0IGR1cmluZyBjYWxsYmFjay5cbiAgICBvbjogZW1wdHlPbixcbiAgICB0d2VlbjogZW1wdHlUd2VlbixcbiAgICB0aW1lOiB0aW1pbmcudGltZSxcbiAgICBkZWxheTogdGltaW5nLmRlbGF5LFxuICAgIGR1cmF0aW9uOiB0aW1pbmcuZHVyYXRpb24sXG4gICAgZWFzZTogdGltaW5nLmVhc2UsXG4gICAgdGltZXI6IG51bGwsXG4gICAgc3RhdGU6IENSRUFURURcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IGdldChub2RlLCBpZCk7XG4gIGlmIChzY2hlZHVsZS5zdGF0ZSA+IENSRUFURUQpIHRocm93IG5ldyBFcnJvcihcInRvbyBsYXRlOyBhbHJlYWR5IHNjaGVkdWxlZFwiKTtcbiAgcmV0dXJuIHNjaGVkdWxlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0KG5vZGUsIGlkKSB7XG4gIHZhciBzY2hlZHVsZSA9IGdldChub2RlLCBpZCk7XG4gIGlmIChzY2hlZHVsZS5zdGF0ZSA+IFNUQVJURUQpIHRocm93IG5ldyBFcnJvcihcInRvbyBsYXRlOyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldChub2RlLCBpZCkge1xuICB2YXIgc2NoZWR1bGUgPSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgaWYgKCFzY2hlZHVsZSB8fCAhKHNjaGVkdWxlID0gc2NoZWR1bGVbaWRdKSkgdGhyb3cgbmV3IEVycm9yKFwidHJhbnNpdGlvbiBub3QgZm91bmRcIik7XG4gIHJldHVybiBzY2hlZHVsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlKG5vZGUsIGlkLCBzZWxmKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbixcbiAgICAgIHR3ZWVuO1xuXG4gIC8vIEluaXRpYWxpemUgdGhlIHNlbGYgdGltZXIgd2hlbiB0aGUgdHJhbnNpdGlvbiBpcyBjcmVhdGVkLlxuICAvLyBOb3RlIHRoZSBhY3R1YWwgZGVsYXkgaXMgbm90IGtub3duIHVudGlsIHRoZSBmaXJzdCBjYWxsYmFjayFcbiAgc2NoZWR1bGVzW2lkXSA9IHNlbGY7XG4gIHNlbGYudGltZXIgPSB0aW1lcihzY2hlZHVsZSwgMCwgc2VsZi50aW1lKTtcblxuICBmdW5jdGlvbiBzY2hlZHVsZShlbGFwc2VkKSB7XG4gICAgc2VsZi5zdGF0ZSA9IFNDSEVEVUxFRDtcbiAgICBzZWxmLnRpbWVyLnJlc3RhcnQoc3RhcnQsIHNlbGYuZGVsYXksIHNlbGYudGltZSk7XG5cbiAgICAvLyBJZiB0aGUgZWxhcHNlZCBkZWxheSBpcyBsZXNzIHRoYW4gb3VyIGZpcnN0IHNsZWVwLCBzdGFydCBpbW1lZGlhdGVseS5cbiAgICBpZiAoc2VsZi5kZWxheSA8PSBlbGFwc2VkKSBzdGFydChlbGFwc2VkIC0gc2VsZi5kZWxheSk7XG4gIH1cblxuICBmdW5jdGlvbiBzdGFydChlbGFwc2VkKSB7XG4gICAgdmFyIGksIGosIG4sIG87XG5cbiAgICAvLyBJZiB0aGUgc3RhdGUgaXMgbm90IFNDSEVEVUxFRCwgdGhlbiB3ZSBwcmV2aW91c2x5IGVycm9yZWQgb24gc3RhcnQuXG4gICAgaWYgKHNlbGYuc3RhdGUgIT09IFNDSEVEVUxFRCkgcmV0dXJuIHN0b3AoKTtcblxuICAgIGZvciAoaSBpbiBzY2hlZHVsZXMpIHtcbiAgICAgIG8gPSBzY2hlZHVsZXNbaV07XG4gICAgICBpZiAoby5uYW1lICE9PSBzZWxmLm5hbWUpIGNvbnRpbnVlO1xuXG4gICAgICAvLyBXaGlsZSB0aGlzIGVsZW1lbnQgYWxyZWFkeSBoYXMgYSBzdGFydGluZyB0cmFuc2l0aW9uIGR1cmluZyB0aGlzIGZyYW1lLFxuICAgICAgLy8gZGVmZXIgc3RhcnRpbmcgYW4gaW50ZXJydXB0aW5nIHRyYW5zaXRpb24gdW50aWwgdGhhdCB0cmFuc2l0aW9uIGhhcyBhXG4gICAgICAvLyBjaGFuY2UgdG8gdGljayAoYW5kIHBvc3NpYmx5IGVuZCk7IHNlZSBkMy9kMy10cmFuc2l0aW9uIzU0IVxuICAgICAgaWYgKG8uc3RhdGUgPT09IFNUQVJURUQpIHJldHVybiB0aW1lb3V0KHN0YXJ0KTtcblxuICAgICAgLy8gSW50ZXJydXB0IHRoZSBhY3RpdmUgdHJhbnNpdGlvbiwgaWYgYW55LlxuICAgICAgaWYgKG8uc3RhdGUgPT09IFJVTk5JTkcpIHtcbiAgICAgICAgby5zdGF0ZSA9IEVOREVEO1xuICAgICAgICBvLnRpbWVyLnN0b3AoKTtcbiAgICAgICAgby5vbi5jYWxsKFwiaW50ZXJydXB0XCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIG8uaW5kZXgsIG8uZ3JvdXApO1xuICAgICAgICBkZWxldGUgc2NoZWR1bGVzW2ldO1xuICAgICAgfVxuXG4gICAgICAvLyBDYW5jZWwgYW55IHByZS1lbXB0ZWQgdHJhbnNpdGlvbnMuXG4gICAgICBlbHNlIGlmICgraSA8IGlkKSB7XG4gICAgICAgIG8uc3RhdGUgPSBFTkRFRDtcbiAgICAgICAgby50aW1lci5zdG9wKCk7XG4gICAgICAgIG8ub24uY2FsbChcImNhbmNlbFwiLCBub2RlLCBub2RlLl9fZGF0YV9fLCBvLmluZGV4LCBvLmdyb3VwKTtcbiAgICAgICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBEZWZlciB0aGUgZmlyc3QgdGljayB0byBlbmQgb2YgdGhlIGN1cnJlbnQgZnJhbWU7IHNlZSBkMy9kMyMxNTc2LlxuICAgIC8vIE5vdGUgdGhlIHRyYW5zaXRpb24gbWF5IGJlIGNhbmNlbGVkIGFmdGVyIHN0YXJ0IGFuZCBiZWZvcmUgdGhlIGZpcnN0IHRpY2shXG4gICAgLy8gTm90ZSB0aGlzIG11c3QgYmUgc2NoZWR1bGVkIGJlZm9yZSB0aGUgc3RhcnQgZXZlbnQ7IHNlZSBkMy9kMy10cmFuc2l0aW9uIzE2IVxuICAgIC8vIEFzc3VtaW5nIHRoaXMgaXMgc3VjY2Vzc2Z1bCwgc3Vic2VxdWVudCBjYWxsYmFja3MgZ28gc3RyYWlnaHQgdG8gdGljay5cbiAgICB0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHNlbGYuc3RhdGUgPT09IFNUQVJURUQpIHtcbiAgICAgICAgc2VsZi5zdGF0ZSA9IFJVTk5JTkc7XG4gICAgICAgIHNlbGYudGltZXIucmVzdGFydCh0aWNrLCBzZWxmLmRlbGF5LCBzZWxmLnRpbWUpO1xuICAgICAgICB0aWNrKGVsYXBzZWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIHN0YXJ0IGV2ZW50LlxuICAgIC8vIE5vdGUgdGhpcyBtdXN0IGJlIGRvbmUgYmVmb3JlIHRoZSB0d2VlbiBhcmUgaW5pdGlhbGl6ZWQuXG4gICAgc2VsZi5zdGF0ZSA9IFNUQVJUSU5HO1xuICAgIHNlbGYub24uY2FsbChcInN0YXJ0XCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApO1xuICAgIGlmIChzZWxmLnN0YXRlICE9PSBTVEFSVElORykgcmV0dXJuOyAvLyBpbnRlcnJ1cHRlZFxuICAgIHNlbGYuc3RhdGUgPSBTVEFSVEVEO1xuXG4gICAgLy8gSW5pdGlhbGl6ZSB0aGUgdHdlZW4sIGRlbGV0aW5nIG51bGwgdHdlZW4uXG4gICAgdHdlZW4gPSBuZXcgQXJyYXkobiA9IHNlbGYudHdlZW4ubGVuZ3RoKTtcbiAgICBmb3IgKGkgPSAwLCBqID0gLTE7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChvID0gc2VsZi50d2VlbltpXS52YWx1ZS5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIHNlbGYuaW5kZXgsIHNlbGYuZ3JvdXApKSB7XG4gICAgICAgIHR3ZWVuWysral0gPSBvO1xuICAgICAgfVxuICAgIH1cbiAgICB0d2Vlbi5sZW5ndGggPSBqICsgMTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHRpY2soZWxhcHNlZCkge1xuICAgIHZhciB0ID0gZWxhcHNlZCA8IHNlbGYuZHVyYXRpb24gPyBzZWxmLmVhc2UuY2FsbChudWxsLCBlbGFwc2VkIC8gc2VsZi5kdXJhdGlvbikgOiAoc2VsZi50aW1lci5yZXN0YXJ0KHN0b3ApLCBzZWxmLnN0YXRlID0gRU5ESU5HLCAxKSxcbiAgICAgICAgaSA9IC0xLFxuICAgICAgICBuID0gdHdlZW4ubGVuZ3RoO1xuXG4gICAgd2hpbGUgKCsraSA8IG4pIHtcbiAgICAgIHR3ZWVuW2ldLmNhbGwobm9kZSwgdCk7XG4gICAgfVxuXG4gICAgLy8gRGlzcGF0Y2ggdGhlIGVuZCBldmVudC5cbiAgICBpZiAoc2VsZi5zdGF0ZSA9PT0gRU5ESU5HKSB7XG4gICAgICBzZWxmLm9uLmNhbGwoXCJlbmRcIiwgbm9kZSwgbm9kZS5fX2RhdGFfXywgc2VsZi5pbmRleCwgc2VsZi5ncm91cCk7XG4gICAgICBzdG9wKCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc3RvcCgpIHtcbiAgICBzZWxmLnN0YXRlID0gRU5ERUQ7XG4gICAgc2VsZi50aW1lci5zdG9wKCk7XG4gICAgZGVsZXRlIHNjaGVkdWxlc1tpZF07XG4gICAgZm9yICh2YXIgaSBpbiBzY2hlZHVsZXMpIHJldHVybjsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby11bnVzZWQtdmFyc1xuICAgIGRlbGV0ZSBub2RlLl9fdHJhbnNpdGlvbjtcbiAgfVxufVxuIiwiaW1wb3J0IHtTVEFSVElORywgRU5ESU5HLCBFTkRFRH0gZnJvbSBcIi4vdHJhbnNpdGlvbi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihub2RlLCBuYW1lKSB7XG4gIHZhciBzY2hlZHVsZXMgPSBub2RlLl9fdHJhbnNpdGlvbixcbiAgICAgIHNjaGVkdWxlLFxuICAgICAgYWN0aXZlLFxuICAgICAgZW1wdHkgPSB0cnVlLFxuICAgICAgaTtcblxuICBpZiAoIXNjaGVkdWxlcykgcmV0dXJuO1xuXG4gIG5hbWUgPSBuYW1lID09IG51bGwgPyBudWxsIDogbmFtZSArIFwiXCI7XG5cbiAgZm9yIChpIGluIHNjaGVkdWxlcykge1xuICAgIGlmICgoc2NoZWR1bGUgPSBzY2hlZHVsZXNbaV0pLm5hbWUgIT09IG5hbWUpIHsgZW1wdHkgPSBmYWxzZTsgY29udGludWU7IH1cbiAgICBhY3RpdmUgPSBzY2hlZHVsZS5zdGF0ZSA+IFNUQVJUSU5HICYmIHNjaGVkdWxlLnN0YXRlIDwgRU5ESU5HO1xuICAgIHNjaGVkdWxlLnN0YXRlID0gRU5ERUQ7XG4gICAgc2NoZWR1bGUudGltZXIuc3RvcCgpO1xuICAgIHNjaGVkdWxlLm9uLmNhbGwoYWN0aXZlID8gXCJpbnRlcnJ1cHRcIiA6IFwiY2FuY2VsXCIsIG5vZGUsIG5vZGUuX19kYXRhX18sIHNjaGVkdWxlLmluZGV4LCBzY2hlZHVsZS5ncm91cCk7XG4gICAgZGVsZXRlIHNjaGVkdWxlc1tpXTtcbiAgfVxuXG4gIGlmIChlbXB0eSkgZGVsZXRlIG5vZGUuX190cmFuc2l0aW9uO1xufVxuIiwiaW1wb3J0IGludGVycnVwdCBmcm9tIFwiLi4vaW50ZXJydXB0LmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHRoaXMuZWFjaChmdW5jdGlvbigpIHtcbiAgICBpbnRlcnJ1cHQodGhpcywgbmFtZSk7XG4gIH0pO1xufVxuIiwidmFyIGRlZ3JlZXMgPSAxODAgLyBNYXRoLlBJO1xuXG5leHBvcnQgdmFyIGlkZW50aXR5ID0ge1xuICB0cmFuc2xhdGVYOiAwLFxuICB0cmFuc2xhdGVZOiAwLFxuICByb3RhdGU6IDAsXG4gIHNrZXdYOiAwLFxuICBzY2FsZVg6IDEsXG4gIHNjYWxlWTogMVxufTtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oYSwgYiwgYywgZCwgZSwgZikge1xuICB2YXIgc2NhbGVYLCBzY2FsZVksIHNrZXdYO1xuICBpZiAoc2NhbGVYID0gTWF0aC5zcXJ0KGEgKiBhICsgYiAqIGIpKSBhIC89IHNjYWxlWCwgYiAvPSBzY2FsZVg7XG4gIGlmIChza2V3WCA9IGEgKiBjICsgYiAqIGQpIGMgLT0gYSAqIHNrZXdYLCBkIC09IGIgKiBza2V3WDtcbiAgaWYgKHNjYWxlWSA9IE1hdGguc3FydChjICogYyArIGQgKiBkKSkgYyAvPSBzY2FsZVksIGQgLz0gc2NhbGVZLCBza2V3WCAvPSBzY2FsZVk7XG4gIGlmIChhICogZCA8IGIgKiBjKSBhID0gLWEsIGIgPSAtYiwgc2tld1ggPSAtc2tld1gsIHNjYWxlWCA9IC1zY2FsZVg7XG4gIHJldHVybiB7XG4gICAgdHJhbnNsYXRlWDogZSxcbiAgICB0cmFuc2xhdGVZOiBmLFxuICAgIHJvdGF0ZTogTWF0aC5hdGFuMihiLCBhKSAqIGRlZ3JlZXMsXG4gICAgc2tld1g6IE1hdGguYXRhbihza2V3WCkgKiBkZWdyZWVzLFxuICAgIHNjYWxlWDogc2NhbGVYLFxuICAgIHNjYWxlWTogc2NhbGVZXG4gIH07XG59XG4iLCJpbXBvcnQgZGVjb21wb3NlLCB7aWRlbnRpdHl9IGZyb20gXCIuL2RlY29tcG9zZS5qc1wiO1xuXG52YXIgY3NzTm9kZSxcbiAgICBjc3NSb290LFxuICAgIGNzc1ZpZXcsXG4gICAgc3ZnTm9kZTtcblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQ3NzKHZhbHVlKSB7XG4gIGlmICh2YWx1ZSA9PT0gXCJub25lXCIpIHJldHVybiBpZGVudGl0eTtcbiAgaWYgKCFjc3NOb2RlKSBjc3NOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcIkRJVlwiKSwgY3NzUm9vdCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgY3NzVmlldyA9IGRvY3VtZW50LmRlZmF1bHRWaWV3O1xuICBjc3NOb2RlLnN0eWxlLnRyYW5zZm9ybSA9IHZhbHVlO1xuICB2YWx1ZSA9IGNzc1ZpZXcuZ2V0Q29tcHV0ZWRTdHlsZShjc3NSb290LmFwcGVuZENoaWxkKGNzc05vZGUpLCBudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKFwidHJhbnNmb3JtXCIpO1xuICBjc3NSb290LnJlbW92ZUNoaWxkKGNzc05vZGUpO1xuICB2YWx1ZSA9IHZhbHVlLnNsaWNlKDcsIC0xKS5zcGxpdChcIixcIik7XG4gIHJldHVybiBkZWNvbXBvc2UoK3ZhbHVlWzBdLCArdmFsdWVbMV0sICt2YWx1ZVsyXSwgK3ZhbHVlWzNdLCArdmFsdWVbNF0sICt2YWx1ZVs1XSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVN2Zyh2YWx1ZSkge1xuICBpZiAodmFsdWUgPT0gbnVsbCkgcmV0dXJuIGlkZW50aXR5O1xuICBpZiAoIXN2Z05vZGUpIHN2Z05vZGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiLCBcImdcIik7XG4gIHN2Z05vZGUuc2V0QXR0cmlidXRlKFwidHJhbnNmb3JtXCIsIHZhbHVlKTtcbiAgaWYgKCEodmFsdWUgPSBzdmdOb2RlLnRyYW5zZm9ybS5iYXNlVmFsLmNvbnNvbGlkYXRlKCkpKSByZXR1cm4gaWRlbnRpdHk7XG4gIHZhbHVlID0gdmFsdWUubWF0cml4O1xuICByZXR1cm4gZGVjb21wb3NlKHZhbHVlLmEsIHZhbHVlLmIsIHZhbHVlLmMsIHZhbHVlLmQsIHZhbHVlLmUsIHZhbHVlLmYpO1xufVxuIiwiaW1wb3J0IG51bWJlciBmcm9tIFwiLi4vbnVtYmVyLmpzXCI7XG5pbXBvcnQge3BhcnNlQ3NzLCBwYXJzZVN2Z30gZnJvbSBcIi4vcGFyc2UuanNcIjtcblxuZnVuY3Rpb24gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2UsIHB4Q29tbWEsIHB4UGFyZW4sIGRlZ1BhcmVuKSB7XG5cbiAgZnVuY3Rpb24gcG9wKHMpIHtcbiAgICByZXR1cm4gcy5sZW5ndGggPyBzLnBvcCgpICsgXCIgXCIgOiBcIlwiO1xuICB9XG5cbiAgZnVuY3Rpb24gdHJhbnNsYXRlKHhhLCB5YSwgeGIsIHliLCBzLCBxKSB7XG4gICAgaWYgKHhhICE9PSB4YiB8fCB5YSAhPT0geWIpIHtcbiAgICAgIHZhciBpID0gcy5wdXNoKFwidHJhbnNsYXRlKFwiLCBudWxsLCBweENvbW1hLCBudWxsLCBweFBhcmVuKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgfHwgeWIpIHtcbiAgICAgIHMucHVzaChcInRyYW5zbGF0ZShcIiArIHhiICsgcHhDb21tYSArIHliICsgcHhQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcm90YXRlKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgaWYgKGEgLSBiID4gMTgwKSBiICs9IDM2MDsgZWxzZSBpZiAoYiAtIGEgPiAxODApIGEgKz0gMzYwOyAvLyBzaG9ydGVzdCBwYXRoXG4gICAgICBxLnB1c2goe2k6IHMucHVzaChwb3AocykgKyBcInJvdGF0ZShcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJyb3RhdGUoXCIgKyBiICsgZGVnUGFyZW4pO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNrZXdYKGEsIGIsIHMsIHEpIHtcbiAgICBpZiAoYSAhPT0gYikge1xuICAgICAgcS5wdXNoKHtpOiBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiwgbnVsbCwgZGVnUGFyZW4pIC0gMiwgeDogbnVtYmVyKGEsIGIpfSk7XG4gICAgfSBlbHNlIGlmIChiKSB7XG4gICAgICBzLnB1c2gocG9wKHMpICsgXCJza2V3WChcIiArIGIgKyBkZWdQYXJlbik7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gc2NhbGUoeGEsIHlhLCB4YiwgeWIsIHMsIHEpIHtcbiAgICBpZiAoeGEgIT09IHhiIHx8IHlhICE9PSB5Yikge1xuICAgICAgdmFyIGkgPSBzLnB1c2gocG9wKHMpICsgXCJzY2FsZShcIiwgbnVsbCwgXCIsXCIsIG51bGwsIFwiKVwiKTtcbiAgICAgIHEucHVzaCh7aTogaSAtIDQsIHg6IG51bWJlcih4YSwgeGIpfSwge2k6IGkgLSAyLCB4OiBudW1iZXIoeWEsIHliKX0pO1xuICAgIH0gZWxzZSBpZiAoeGIgIT09IDEgfHwgeWIgIT09IDEpIHtcbiAgICAgIHMucHVzaChwb3AocykgKyBcInNjYWxlKFwiICsgeGIgKyBcIixcIiArIHliICsgXCIpXCIpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmdW5jdGlvbihhLCBiKSB7XG4gICAgdmFyIHMgPSBbXSwgLy8gc3RyaW5nIGNvbnN0YW50cyBhbmQgcGxhY2Vob2xkZXJzXG4gICAgICAgIHEgPSBbXTsgLy8gbnVtYmVyIGludGVycG9sYXRvcnNcbiAgICBhID0gcGFyc2UoYSksIGIgPSBwYXJzZShiKTtcbiAgICB0cmFuc2xhdGUoYS50cmFuc2xhdGVYLCBhLnRyYW5zbGF0ZVksIGIudHJhbnNsYXRlWCwgYi50cmFuc2xhdGVZLCBzLCBxKTtcbiAgICByb3RhdGUoYS5yb3RhdGUsIGIucm90YXRlLCBzLCBxKTtcbiAgICBza2V3WChhLnNrZXdYLCBiLnNrZXdYLCBzLCBxKTtcbiAgICBzY2FsZShhLnNjYWxlWCwgYS5zY2FsZVksIGIuc2NhbGVYLCBiLnNjYWxlWSwgcywgcSk7XG4gICAgYSA9IGIgPSBudWxsOyAvLyBnY1xuICAgIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgICB2YXIgaSA9IC0xLCBuID0gcS5sZW5ndGgsIG87XG4gICAgICB3aGlsZSAoKytpIDwgbikgc1sobyA9IHFbaV0pLmldID0gby54KHQpO1xuICAgICAgcmV0dXJuIHMuam9pbihcIlwiKTtcbiAgICB9O1xuICB9O1xufVxuXG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtQ3NzID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VDc3MsIFwicHgsIFwiLCBcInB4KVwiLCBcImRlZylcIik7XG5leHBvcnQgdmFyIGludGVycG9sYXRlVHJhbnNmb3JtU3ZnID0gaW50ZXJwb2xhdGVUcmFuc2Zvcm0ocGFyc2VTdmcsIFwiLCBcIiwgXCIpXCIsIFwiKVwiKTtcbiIsImltcG9ydCB7Z2V0LCBzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIHR3ZWVuUmVtb3ZlKGlkLCBuYW1lKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIHR3ZWVuID0gc2NoZWR1bGUudHdlZW47XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIHR3ZWVuIHdpdGggdGhlIHByZXZpb3VzIG5vZGUsXG4gICAgLy8ganVzdCBhc3NpZ24gdGhlIHVwZGF0ZWQgc2hhcmVkIHR3ZWVuIGFuZCB3ZeKAmXJlIGRvbmUhXG4gICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgIGlmICh0d2VlbiAhPT0gdHdlZW4wKSB7XG4gICAgICB0d2VlbjEgPSB0d2VlbjAgPSB0d2VlbjtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBuID0gdHdlZW4xLmxlbmd0aDsgaSA8IG47ICsraSkge1xuICAgICAgICBpZiAodHdlZW4xW2ldLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgICB0d2VlbjEgPSB0d2VlbjEuc2xpY2UoKTtcbiAgICAgICAgICB0d2VlbjEuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgc2NoZWR1bGUudHdlZW4gPSB0d2VlbjE7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHR3ZWVuRnVuY3Rpb24oaWQsIG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0d2VlbjAsIHR3ZWVuMTtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gXCJmdW5jdGlvblwiKSB0aHJvdyBuZXcgRXJyb3I7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc2NoZWR1bGUgPSBzZXQodGhpcywgaWQpLFxuICAgICAgICB0d2VlbiA9IHNjaGVkdWxlLnR3ZWVuO1xuXG4gICAgLy8gSWYgdGhpcyBub2RlIHNoYXJlZCB0d2VlbiB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCB0d2VlbiBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAodHdlZW4gIT09IHR3ZWVuMCkge1xuICAgICAgdHdlZW4xID0gKHR3ZWVuMCA9IHR3ZWVuKS5zbGljZSgpO1xuICAgICAgZm9yICh2YXIgdCA9IHtuYW1lOiBuYW1lLCB2YWx1ZTogdmFsdWV9LCBpID0gMCwgbiA9IHR3ZWVuMS5sZW5ndGg7IGkgPCBuOyArK2kpIHtcbiAgICAgICAgaWYgKHR3ZWVuMVtpXS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgICAgdHdlZW4xW2ldID0gdDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGkgPT09IG4pIHR3ZWVuMS5wdXNoKHQpO1xuICAgIH1cblxuICAgIHNjaGVkdWxlLnR3ZWVuID0gdHdlZW4xO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICBuYW1lICs9IFwiXCI7XG5cbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSB7XG4gICAgdmFyIHR3ZWVuID0gZ2V0KHRoaXMubm9kZSgpLCBpZCkudHdlZW47XG4gICAgZm9yICh2YXIgaSA9IDAsIG4gPSB0d2Vlbi5sZW5ndGgsIHQ7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgodCA9IHR3ZWVuW2ldKS5uYW1lID09PSBuYW1lKSB7XG4gICAgICAgIHJldHVybiB0LnZhbHVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiB0aGlzLmVhY2goKHZhbHVlID09IG51bGwgPyB0d2VlblJlbW92ZSA6IHR3ZWVuRnVuY3Rpb24pKGlkLCBuYW1lLCB2YWx1ZSkpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdHdlZW5WYWx1ZSh0cmFuc2l0aW9uLCBuYW1lLCB2YWx1ZSkge1xuICB2YXIgaWQgPSB0cmFuc2l0aW9uLl9pZDtcblxuICB0cmFuc2l0aW9uLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKTtcbiAgICAoc2NoZWR1bGUudmFsdWUgfHwgKHNjaGVkdWxlLnZhbHVlID0ge30pKVtuYW1lXSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihub2RlKSB7XG4gICAgcmV0dXJuIGdldChub2RlLCBpZCkudmFsdWVbbmFtZV07XG4gIH07XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbihjb25zdHJ1Y3RvciwgZmFjdG9yeSwgcHJvdG90eXBlKSB7XG4gIGNvbnN0cnVjdG9yLnByb3RvdHlwZSA9IGZhY3RvcnkucHJvdG90eXBlID0gcHJvdG90eXBlO1xuICBwcm90b3R5cGUuY29uc3RydWN0b3IgPSBjb25zdHJ1Y3Rvcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGV4dGVuZChwYXJlbnQsIGRlZmluaXRpb24pIHtcbiAgdmFyIHByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUocGFyZW50LnByb3RvdHlwZSk7XG4gIGZvciAodmFyIGtleSBpbiBkZWZpbml0aW9uKSBwcm90b3R5cGVba2V5XSA9IGRlZmluaXRpb25ba2V5XTtcbiAgcmV0dXJuIHByb3RvdHlwZTtcbn1cbiIsImltcG9ydCBkZWZpbmUsIHtleHRlbmR9IGZyb20gXCIuL2RlZmluZS5qc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ29sb3IoKSB7fVxuXG5leHBvcnQgdmFyIGRhcmtlciA9IDAuNztcbmV4cG9ydCB2YXIgYnJpZ2h0ZXIgPSAxIC8gZGFya2VyO1xuXG52YXIgcmVJID0gXCJcXFxccyooWystXT9cXFxcZCspXFxcXHMqXCIsXG4gICAgcmVOID0gXCJcXFxccyooWystXT9cXFxcZCpcXFxcLj9cXFxcZCsoPzpbZUVdWystXT9cXFxcZCspPylcXFxccypcIixcbiAgICByZVAgPSBcIlxcXFxzKihbKy1dP1xcXFxkKlxcXFwuP1xcXFxkKyg/OltlRV1bKy1dP1xcXFxkKyk/KSVcXFxccypcIixcbiAgICByZUhleCA9IC9eIyhbMC05YS1mXXszLDh9KSQvLFxuICAgIHJlUmdiSW50ZWdlciA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZUksIHJlSSwgcmVJXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJecmdiXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQXSArIFwiXFxcXCkkXCIpLFxuICAgIHJlUmdiYUludGVnZXIgPSBuZXcgUmVnRXhwKFwiXnJnYmFcXFxcKFwiICsgW3JlSSwgcmVJLCByZUksIHJlTl0gKyBcIlxcXFwpJFwiKSxcbiAgICByZVJnYmFQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5yZ2JhXFxcXChcIiArIFtyZVAsIHJlUCwgcmVQLCByZU5dICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xQZXJjZW50ID0gbmV3IFJlZ0V4cChcIl5oc2xcXFxcKFwiICsgW3JlTiwgcmVQLCByZVBdICsgXCJcXFxcKSRcIiksXG4gICAgcmVIc2xhUGVyY2VudCA9IG5ldyBSZWdFeHAoXCJeaHNsYVxcXFwoXCIgKyBbcmVOLCByZVAsIHJlUCwgcmVOXSArIFwiXFxcXCkkXCIpO1xuXG52YXIgbmFtZWQgPSB7XG4gIGFsaWNlYmx1ZTogMHhmMGY4ZmYsXG4gIGFudGlxdWV3aGl0ZTogMHhmYWViZDcsXG4gIGFxdWE6IDB4MDBmZmZmLFxuICBhcXVhbWFyaW5lOiAweDdmZmZkNCxcbiAgYXp1cmU6IDB4ZjBmZmZmLFxuICBiZWlnZTogMHhmNWY1ZGMsXG4gIGJpc3F1ZTogMHhmZmU0YzQsXG4gIGJsYWNrOiAweDAwMDAwMCxcbiAgYmxhbmNoZWRhbG1vbmQ6IDB4ZmZlYmNkLFxuICBibHVlOiAweDAwMDBmZixcbiAgYmx1ZXZpb2xldDogMHg4YTJiZTIsXG4gIGJyb3duOiAweGE1MmEyYSxcbiAgYnVybHl3b29kOiAweGRlYjg4NyxcbiAgY2FkZXRibHVlOiAweDVmOWVhMCxcbiAgY2hhcnRyZXVzZTogMHg3ZmZmMDAsXG4gIGNob2NvbGF0ZTogMHhkMjY5MWUsXG4gIGNvcmFsOiAweGZmN2Y1MCxcbiAgY29ybmZsb3dlcmJsdWU6IDB4NjQ5NWVkLFxuICBjb3Juc2lsazogMHhmZmY4ZGMsXG4gIGNyaW1zb246IDB4ZGMxNDNjLFxuICBjeWFuOiAweDAwZmZmZixcbiAgZGFya2JsdWU6IDB4MDAwMDhiLFxuICBkYXJrY3lhbjogMHgwMDhiOGIsXG4gIGRhcmtnb2xkZW5yb2Q6IDB4Yjg4NjBiLFxuICBkYXJrZ3JheTogMHhhOWE5YTksXG4gIGRhcmtncmVlbjogMHgwMDY0MDAsXG4gIGRhcmtncmV5OiAweGE5YTlhOSxcbiAgZGFya2toYWtpOiAweGJkYjc2YixcbiAgZGFya21hZ2VudGE6IDB4OGIwMDhiLFxuICBkYXJrb2xpdmVncmVlbjogMHg1NTZiMmYsXG4gIGRhcmtvcmFuZ2U6IDB4ZmY4YzAwLFxuICBkYXJrb3JjaGlkOiAweDk5MzJjYyxcbiAgZGFya3JlZDogMHg4YjAwMDAsXG4gIGRhcmtzYWxtb246IDB4ZTk5NjdhLFxuICBkYXJrc2VhZ3JlZW46IDB4OGZiYzhmLFxuICBkYXJrc2xhdGVibHVlOiAweDQ4M2Q4YixcbiAgZGFya3NsYXRlZ3JheTogMHgyZjRmNGYsXG4gIGRhcmtzbGF0ZWdyZXk6IDB4MmY0ZjRmLFxuICBkYXJrdHVycXVvaXNlOiAweDAwY2VkMSxcbiAgZGFya3Zpb2xldDogMHg5NDAwZDMsXG4gIGRlZXBwaW5rOiAweGZmMTQ5MyxcbiAgZGVlcHNreWJsdWU6IDB4MDBiZmZmLFxuICBkaW1ncmF5OiAweDY5Njk2OSxcbiAgZGltZ3JleTogMHg2OTY5NjksXG4gIGRvZGdlcmJsdWU6IDB4MWU5MGZmLFxuICBmaXJlYnJpY2s6IDB4YjIyMjIyLFxuICBmbG9yYWx3aGl0ZTogMHhmZmZhZjAsXG4gIGZvcmVzdGdyZWVuOiAweDIyOGIyMixcbiAgZnVjaHNpYTogMHhmZjAwZmYsXG4gIGdhaW5zYm9ybzogMHhkY2RjZGMsXG4gIGdob3N0d2hpdGU6IDB4ZjhmOGZmLFxuICBnb2xkOiAweGZmZDcwMCxcbiAgZ29sZGVucm9kOiAweGRhYTUyMCxcbiAgZ3JheTogMHg4MDgwODAsXG4gIGdyZWVuOiAweDAwODAwMCxcbiAgZ3JlZW55ZWxsb3c6IDB4YWRmZjJmLFxuICBncmV5OiAweDgwODA4MCxcbiAgaG9uZXlkZXc6IDB4ZjBmZmYwLFxuICBob3RwaW5rOiAweGZmNjliNCxcbiAgaW5kaWFucmVkOiAweGNkNWM1YyxcbiAgaW5kaWdvOiAweDRiMDA4MixcbiAgaXZvcnk6IDB4ZmZmZmYwLFxuICBraGFraTogMHhmMGU2OGMsXG4gIGxhdmVuZGVyOiAweGU2ZTZmYSxcbiAgbGF2ZW5kZXJibHVzaDogMHhmZmYwZjUsXG4gIGxhd25ncmVlbjogMHg3Y2ZjMDAsXG4gIGxlbW9uY2hpZmZvbjogMHhmZmZhY2QsXG4gIGxpZ2h0Ymx1ZTogMHhhZGQ4ZTYsXG4gIGxpZ2h0Y29yYWw6IDB4ZjA4MDgwLFxuICBsaWdodGN5YW46IDB4ZTBmZmZmLFxuICBsaWdodGdvbGRlbnJvZHllbGxvdzogMHhmYWZhZDIsXG4gIGxpZ2h0Z3JheTogMHhkM2QzZDMsXG4gIGxpZ2h0Z3JlZW46IDB4OTBlZTkwLFxuICBsaWdodGdyZXk6IDB4ZDNkM2QzLFxuICBsaWdodHBpbms6IDB4ZmZiNmMxLFxuICBsaWdodHNhbG1vbjogMHhmZmEwN2EsXG4gIGxpZ2h0c2VhZ3JlZW46IDB4MjBiMmFhLFxuICBsaWdodHNreWJsdWU6IDB4ODdjZWZhLFxuICBsaWdodHNsYXRlZ3JheTogMHg3Nzg4OTksXG4gIGxpZ2h0c2xhdGVncmV5OiAweDc3ODg5OSxcbiAgbGlnaHRzdGVlbGJsdWU6IDB4YjBjNGRlLFxuICBsaWdodHllbGxvdzogMHhmZmZmZTAsXG4gIGxpbWU6IDB4MDBmZjAwLFxuICBsaW1lZ3JlZW46IDB4MzJjZDMyLFxuICBsaW5lbjogMHhmYWYwZTYsXG4gIG1hZ2VudGE6IDB4ZmYwMGZmLFxuICBtYXJvb246IDB4ODAwMDAwLFxuICBtZWRpdW1hcXVhbWFyaW5lOiAweDY2Y2RhYSxcbiAgbWVkaXVtYmx1ZTogMHgwMDAwY2QsXG4gIG1lZGl1bW9yY2hpZDogMHhiYTU1ZDMsXG4gIG1lZGl1bXB1cnBsZTogMHg5MzcwZGIsXG4gIG1lZGl1bXNlYWdyZWVuOiAweDNjYjM3MSxcbiAgbWVkaXVtc2xhdGVibHVlOiAweDdiNjhlZSxcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IDB4MDBmYTlhLFxuICBtZWRpdW10dXJxdW9pc2U6IDB4NDhkMWNjLFxuICBtZWRpdW12aW9sZXRyZWQ6IDB4YzcxNTg1LFxuICBtaWRuaWdodGJsdWU6IDB4MTkxOTcwLFxuICBtaW50Y3JlYW06IDB4ZjVmZmZhLFxuICBtaXN0eXJvc2U6IDB4ZmZlNGUxLFxuICBtb2NjYXNpbjogMHhmZmU0YjUsXG4gIG5hdmFqb3doaXRlOiAweGZmZGVhZCxcbiAgbmF2eTogMHgwMDAwODAsXG4gIG9sZGxhY2U6IDB4ZmRmNWU2LFxuICBvbGl2ZTogMHg4MDgwMDAsXG4gIG9saXZlZHJhYjogMHg2YjhlMjMsXG4gIG9yYW5nZTogMHhmZmE1MDAsXG4gIG9yYW5nZXJlZDogMHhmZjQ1MDAsXG4gIG9yY2hpZDogMHhkYTcwZDYsXG4gIHBhbGVnb2xkZW5yb2Q6IDB4ZWVlOGFhLFxuICBwYWxlZ3JlZW46IDB4OThmYjk4LFxuICBwYWxldHVycXVvaXNlOiAweGFmZWVlZSxcbiAgcGFsZXZpb2xldHJlZDogMHhkYjcwOTMsXG4gIHBhcGF5YXdoaXA6IDB4ZmZlZmQ1LFxuICBwZWFjaHB1ZmY6IDB4ZmZkYWI5LFxuICBwZXJ1OiAweGNkODUzZixcbiAgcGluazogMHhmZmMwY2IsXG4gIHBsdW06IDB4ZGRhMGRkLFxuICBwb3dkZXJibHVlOiAweGIwZTBlNixcbiAgcHVycGxlOiAweDgwMDA4MCxcbiAgcmViZWNjYXB1cnBsZTogMHg2NjMzOTksXG4gIHJlZDogMHhmZjAwMDAsXG4gIHJvc3licm93bjogMHhiYzhmOGYsXG4gIHJveWFsYmx1ZTogMHg0MTY5ZTEsXG4gIHNhZGRsZWJyb3duOiAweDhiNDUxMyxcbiAgc2FsbW9uOiAweGZhODA3MixcbiAgc2FuZHlicm93bjogMHhmNGE0NjAsXG4gIHNlYWdyZWVuOiAweDJlOGI1NyxcbiAgc2Vhc2hlbGw6IDB4ZmZmNWVlLFxuICBzaWVubmE6IDB4YTA1MjJkLFxuICBzaWx2ZXI6IDB4YzBjMGMwLFxuICBza3libHVlOiAweDg3Y2VlYixcbiAgc2xhdGVibHVlOiAweDZhNWFjZCxcbiAgc2xhdGVncmF5OiAweDcwODA5MCxcbiAgc2xhdGVncmV5OiAweDcwODA5MCxcbiAgc25vdzogMHhmZmZhZmEsXG4gIHNwcmluZ2dyZWVuOiAweDAwZmY3ZixcbiAgc3RlZWxibHVlOiAweDQ2ODJiNCxcbiAgdGFuOiAweGQyYjQ4YyxcbiAgdGVhbDogMHgwMDgwODAsXG4gIHRoaXN0bGU6IDB4ZDhiZmQ4LFxuICB0b21hdG86IDB4ZmY2MzQ3LFxuICB0dXJxdW9pc2U6IDB4NDBlMGQwLFxuICB2aW9sZXQ6IDB4ZWU4MmVlLFxuICB3aGVhdDogMHhmNWRlYjMsXG4gIHdoaXRlOiAweGZmZmZmZixcbiAgd2hpdGVzbW9rZTogMHhmNWY1ZjUsXG4gIHllbGxvdzogMHhmZmZmMDAsXG4gIHllbGxvd2dyZWVuOiAweDlhY2QzMlxufTtcblxuZGVmaW5lKENvbG9yLCBjb2xvciwge1xuICBjb3B5OiBmdW5jdGlvbihjaGFubmVscykge1xuICAgIHJldHVybiBPYmplY3QuYXNzaWduKG5ldyB0aGlzLmNvbnN0cnVjdG9yLCB0aGlzLCBjaGFubmVscyk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5yZ2IoKS5kaXNwbGF5YWJsZSgpO1xuICB9LFxuICBoZXg6IGNvbG9yX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiBjb2xvcl9mb3JtYXRIZXgsXG4gIGZvcm1hdEhzbDogY29sb3JfZm9ybWF0SHNsLFxuICBmb3JtYXRSZ2I6IGNvbG9yX2Zvcm1hdFJnYixcbiAgdG9TdHJpbmc6IGNvbG9yX2Zvcm1hdFJnYlxufSk7XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhleCgpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0SGV4KCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdEhzbCgpIHtcbiAgcmV0dXJuIGhzbENvbnZlcnQodGhpcykuZm9ybWF0SHNsKCk7XG59XG5cbmZ1bmN0aW9uIGNvbG9yX2Zvcm1hdFJnYigpIHtcbiAgcmV0dXJuIHRoaXMucmdiKCkuZm9ybWF0UmdiKCk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNvbG9yKGZvcm1hdCkge1xuICB2YXIgbSwgbDtcbiAgZm9ybWF0ID0gKGZvcm1hdCArIFwiXCIpLnRyaW0oKS50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gKG0gPSByZUhleC5leGVjKGZvcm1hdCkpID8gKGwgPSBtWzFdLmxlbmd0aCwgbSA9IHBhcnNlSW50KG1bMV0sIDE2KSwgbCA9PT0gNiA/IHJnYm4obSkgLy8gI2ZmMDAwMFxuICAgICAgOiBsID09PSAzID8gbmV3IFJnYigobSA+PiA4ICYgMHhmKSB8IChtID4+IDQgJiAweGYwKSwgKG0gPj4gNCAmIDB4ZikgfCAobSAmIDB4ZjApLCAoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpLCAxKSAvLyAjZjAwXG4gICAgICA6IGwgPT09IDggPyByZ2JhKG0gPj4gMjQgJiAweGZmLCBtID4+IDE2ICYgMHhmZiwgbSA+PiA4ICYgMHhmZiwgKG0gJiAweGZmKSAvIDB4ZmYpIC8vICNmZjAwMDAwMFxuICAgICAgOiBsID09PSA0ID8gcmdiYSgobSA+PiAxMiAmIDB4ZikgfCAobSA+PiA4ICYgMHhmMCksIChtID4+IDggJiAweGYpIHwgKG0gPj4gNCAmIDB4ZjApLCAobSA+PiA0ICYgMHhmKSB8IChtICYgMHhmMCksICgoKG0gJiAweGYpIDw8IDQpIHwgKG0gJiAweGYpKSAvIDB4ZmYpIC8vICNmMDAwXG4gICAgICA6IG51bGwpIC8vIGludmFsaWQgaGV4XG4gICAgICA6IChtID0gcmVSZ2JJbnRlZ2VyLmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0sIG1bMl0sIG1bM10sIDEpIC8vIHJnYigyNTUsIDAsIDApXG4gICAgICA6IChtID0gcmVSZ2JQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBuZXcgUmdiKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIDEpIC8vIHJnYigxMDAlLCAwJSwgMCUpXG4gICAgICA6IChtID0gcmVSZ2JhSW50ZWdlci5leGVjKGZvcm1hdCkpID8gcmdiYShtWzFdLCBtWzJdLCBtWzNdLCBtWzRdKSAvLyByZ2JhKDI1NSwgMCwgMCwgMSlcbiAgICAgIDogKG0gPSByZVJnYmFQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyByZ2JhKG1bMV0gKiAyNTUgLyAxMDAsIG1bMl0gKiAyNTUgLyAxMDAsIG1bM10gKiAyNTUgLyAxMDAsIG1bNF0pIC8vIHJnYigxMDAlLCAwJSwgMCUsIDEpXG4gICAgICA6IChtID0gcmVIc2xQZXJjZW50LmV4ZWMoZm9ybWF0KSkgPyBoc2xhKG1bMV0sIG1bMl0gLyAxMDAsIG1bM10gLyAxMDAsIDEpIC8vIGhzbCgxMjAsIDUwJSwgNTAlKVxuICAgICAgOiAobSA9IHJlSHNsYVBlcmNlbnQuZXhlYyhmb3JtYXQpKSA/IGhzbGEobVsxXSwgbVsyXSAvIDEwMCwgbVszXSAvIDEwMCwgbVs0XSkgLy8gaHNsYSgxMjAsIDUwJSwgNTAlLCAxKVxuICAgICAgOiBuYW1lZC5oYXNPd25Qcm9wZXJ0eShmb3JtYXQpID8gcmdibihuYW1lZFtmb3JtYXRdKSAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXByb3RvdHlwZS1idWlsdGluc1xuICAgICAgOiBmb3JtYXQgPT09IFwidHJhbnNwYXJlbnRcIiA/IG5ldyBSZ2IoTmFOLCBOYU4sIE5hTiwgMClcbiAgICAgIDogbnVsbDtcbn1cblxuZnVuY3Rpb24gcmdibihuKSB7XG4gIHJldHVybiBuZXcgUmdiKG4gPj4gMTYgJiAweGZmLCBuID4+IDggJiAweGZmLCBuICYgMHhmZiwgMSk7XG59XG5cbmZ1bmN0aW9uIHJnYmEociwgZywgYiwgYSkge1xuICBpZiAoYSA8PSAwKSByID0gZyA9IGIgPSBOYU47XG4gIHJldHVybiBuZXcgUmdiKHIsIGcsIGIsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcmdiQ29udmVydChvKSB7XG4gIGlmICghKG8gaW5zdGFuY2VvZiBDb2xvcikpIG8gPSBjb2xvcihvKTtcbiAgaWYgKCFvKSByZXR1cm4gbmV3IFJnYjtcbiAgbyA9IG8ucmdiKCk7XG4gIHJldHVybiBuZXcgUmdiKG8uciwgby5nLCBvLmIsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZ2IociwgZywgYiwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IHJnYkNvbnZlcnQocikgOiBuZXcgUmdiKHIsIGcsIGIsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJnYihyLCBnLCBiLCBvcGFjaXR5KSB7XG4gIHRoaXMuciA9ICtyO1xuICB0aGlzLmcgPSArZztcbiAgdGhpcy5iID0gK2I7XG4gIHRoaXMub3BhY2l0eSA9ICtvcGFjaXR5O1xufVxuXG5kZWZpbmUoUmdiLCByZ2IsIGV4dGVuZChDb2xvciwge1xuICBicmlnaHRlcjogZnVuY3Rpb24oaykge1xuICAgIGsgPSBrID09IG51bGwgPyBicmlnaHRlciA6IE1hdGgucG93KGJyaWdodGVyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IFJnYih0aGlzLnIgKiBrLCB0aGlzLmcgKiBrLCB0aGlzLmIgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICByZ2I6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9LFxuICBkaXNwbGF5YWJsZTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuICgtMC41IDw9IHRoaXMuciAmJiB0aGlzLnIgPCAyNTUuNSlcbiAgICAgICAgJiYgKC0wLjUgPD0gdGhpcy5nICYmIHRoaXMuZyA8IDI1NS41KVxuICAgICAgICAmJiAoLTAuNSA8PSB0aGlzLmIgJiYgdGhpcy5iIDwgMjU1LjUpXG4gICAgICAgICYmICgwIDw9IHRoaXMub3BhY2l0eSAmJiB0aGlzLm9wYWNpdHkgPD0gMSk7XG4gIH0sXG4gIGhleDogcmdiX2Zvcm1hdEhleCwgLy8gRGVwcmVjYXRlZCEgVXNlIGNvbG9yLmZvcm1hdEhleC5cbiAgZm9ybWF0SGV4OiByZ2JfZm9ybWF0SGV4LFxuICBmb3JtYXRSZ2I6IHJnYl9mb3JtYXRSZ2IsXG4gIHRvU3RyaW5nOiByZ2JfZm9ybWF0UmdiXG59KSk7XG5cbmZ1bmN0aW9uIHJnYl9mb3JtYXRIZXgoKSB7XG4gIHJldHVybiBcIiNcIiArIGhleCh0aGlzLnIpICsgaGV4KHRoaXMuZykgKyBoZXgodGhpcy5iKTtcbn1cblxuZnVuY3Rpb24gcmdiX2Zvcm1hdFJnYigpIHtcbiAgdmFyIGEgPSB0aGlzLm9wYWNpdHk7IGEgPSBpc05hTihhKSA/IDEgOiBNYXRoLm1heCgwLCBNYXRoLm1pbigxLCBhKSk7XG4gIHJldHVybiAoYSA9PT0gMSA/IFwicmdiKFwiIDogXCJyZ2JhKFwiKVxuICAgICAgKyBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIE1hdGgucm91bmQodGhpcy5yKSB8fCAwKSkgKyBcIiwgXCJcbiAgICAgICsgTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHRoaXMuZykgfHwgMCkpICsgXCIsIFwiXG4gICAgICArIE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgTWF0aC5yb3VuZCh0aGlzLmIpIHx8IDApKVxuICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbn1cblxuZnVuY3Rpb24gaGV4KHZhbHVlKSB7XG4gIHZhbHVlID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCBNYXRoLnJvdW5kKHZhbHVlKSB8fCAwKSk7XG4gIHJldHVybiAodmFsdWUgPCAxNiA/IFwiMFwiIDogXCJcIikgKyB2YWx1ZS50b1N0cmluZygxNik7XG59XG5cbmZ1bmN0aW9uIGhzbGEoaCwgcywgbCwgYSkge1xuICBpZiAoYSA8PSAwKSBoID0gcyA9IGwgPSBOYU47XG4gIGVsc2UgaWYgKGwgPD0gMCB8fCBsID49IDEpIGggPSBzID0gTmFOO1xuICBlbHNlIGlmIChzIDw9IDApIGggPSBOYU47XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIGEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaHNsQ29udmVydChvKSB7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbmV3IEhzbChvLmgsIG8ucywgby5sLCBvLm9wYWNpdHkpO1xuICBpZiAoIShvIGluc3RhbmNlb2YgQ29sb3IpKSBvID0gY29sb3Iobyk7XG4gIGlmICghbykgcmV0dXJuIG5ldyBIc2w7XG4gIGlmIChvIGluc3RhbmNlb2YgSHNsKSByZXR1cm4gbztcbiAgbyA9IG8ucmdiKCk7XG4gIHZhciByID0gby5yIC8gMjU1LFxuICAgICAgZyA9IG8uZyAvIDI1NSxcbiAgICAgIGIgPSBvLmIgLyAyNTUsXG4gICAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKSxcbiAgICAgIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgICAgaCA9IE5hTixcbiAgICAgIHMgPSBtYXggLSBtaW4sXG4gICAgICBsID0gKG1heCArIG1pbikgLyAyO1xuICBpZiAocykge1xuICAgIGlmIChyID09PSBtYXgpIGggPSAoZyAtIGIpIC8gcyArIChnIDwgYikgKiA2O1xuICAgIGVsc2UgaWYgKGcgPT09IG1heCkgaCA9IChiIC0gcikgLyBzICsgMjtcbiAgICBlbHNlIGggPSAociAtIGcpIC8gcyArIDQ7XG4gICAgcyAvPSBsIDwgMC41ID8gbWF4ICsgbWluIDogMiAtIG1heCAtIG1pbjtcbiAgICBoICo9IDYwO1xuICB9IGVsc2Uge1xuICAgIHMgPSBsID4gMCAmJiBsIDwgMSA/IDAgOiBoO1xuICB9XG4gIHJldHVybiBuZXcgSHNsKGgsIHMsIGwsIG8ub3BhY2l0eSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoc2woaCwgcywgbCwgb3BhY2l0eSkge1xuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aCA9PT0gMSA/IGhzbENvbnZlcnQoaCkgOiBuZXcgSHNsKGgsIHMsIGwsIG9wYWNpdHkgPT0gbnVsbCA/IDEgOiBvcGFjaXR5KTtcbn1cblxuZnVuY3Rpb24gSHNsKGgsIHMsIGwsIG9wYWNpdHkpIHtcbiAgdGhpcy5oID0gK2g7XG4gIHRoaXMucyA9ICtzO1xuICB0aGlzLmwgPSArbDtcbiAgdGhpcy5vcGFjaXR5ID0gK29wYWNpdHk7XG59XG5cbmRlZmluZShIc2wsIGhzbCwgZXh0ZW5kKENvbG9yLCB7XG4gIGJyaWdodGVyOiBmdW5jdGlvbihrKSB7XG4gICAgayA9IGsgPT0gbnVsbCA/IGJyaWdodGVyIDogTWF0aC5wb3coYnJpZ2h0ZXIsIGspO1xuICAgIHJldHVybiBuZXcgSHNsKHRoaXMuaCwgdGhpcy5zLCB0aGlzLmwgKiBrLCB0aGlzLm9wYWNpdHkpO1xuICB9LFxuICBkYXJrZXI6IGZ1bmN0aW9uKGspIHtcbiAgICBrID0gayA9PSBudWxsID8gZGFya2VyIDogTWF0aC5wb3coZGFya2VyLCBrKTtcbiAgICByZXR1cm4gbmV3IEhzbCh0aGlzLmgsIHRoaXMucywgdGhpcy5sICogaywgdGhpcy5vcGFjaXR5KTtcbiAgfSxcbiAgcmdiOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaCA9IHRoaXMuaCAlIDM2MCArICh0aGlzLmggPCAwKSAqIDM2MCxcbiAgICAgICAgcyA9IGlzTmFOKGgpIHx8IGlzTmFOKHRoaXMucykgPyAwIDogdGhpcy5zLFxuICAgICAgICBsID0gdGhpcy5sLFxuICAgICAgICBtMiA9IGwgKyAobCA8IDAuNSA/IGwgOiAxIC0gbCkgKiBzLFxuICAgICAgICBtMSA9IDIgKiBsIC0gbTI7XG4gICAgcmV0dXJuIG5ldyBSZ2IoXG4gICAgICBoc2wycmdiKGggPj0gMjQwID8gaCAtIDI0MCA6IGggKyAxMjAsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGgsIG0xLCBtMiksXG4gICAgICBoc2wycmdiKGggPCAxMjAgPyBoICsgMjQwIDogaCAtIDEyMCwgbTEsIG0yKSxcbiAgICAgIHRoaXMub3BhY2l0eVxuICAgICk7XG4gIH0sXG4gIGRpc3BsYXlhYmxlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKDAgPD0gdGhpcy5zICYmIHRoaXMucyA8PSAxIHx8IGlzTmFOKHRoaXMucykpXG4gICAgICAgICYmICgwIDw9IHRoaXMubCAmJiB0aGlzLmwgPD0gMSlcbiAgICAgICAgJiYgKDAgPD0gdGhpcy5vcGFjaXR5ICYmIHRoaXMub3BhY2l0eSA8PSAxKTtcbiAgfSxcbiAgZm9ybWF0SHNsOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgYSA9IHRoaXMub3BhY2l0eTsgYSA9IGlzTmFOKGEpID8gMSA6IE1hdGgubWF4KDAsIE1hdGgubWluKDEsIGEpKTtcbiAgICByZXR1cm4gKGEgPT09IDEgPyBcImhzbChcIiA6IFwiaHNsYShcIilcbiAgICAgICAgKyAodGhpcy5oIHx8IDApICsgXCIsIFwiXG4gICAgICAgICsgKHRoaXMucyB8fCAwKSAqIDEwMCArIFwiJSwgXCJcbiAgICAgICAgKyAodGhpcy5sIHx8IDApICogMTAwICsgXCIlXCJcbiAgICAgICAgKyAoYSA9PT0gMSA/IFwiKVwiIDogXCIsIFwiICsgYSArIFwiKVwiKTtcbiAgfVxufSkpO1xuXG4vKiBGcm9tIEZ2RCAxMy4zNywgQ1NTIENvbG9yIE1vZHVsZSBMZXZlbCAzICovXG5mdW5jdGlvbiBoc2wycmdiKGgsIG0xLCBtMikge1xuICByZXR1cm4gKGggPCA2MCA/IG0xICsgKG0yIC0gbTEpICogaCAvIDYwXG4gICAgICA6IGggPCAxODAgPyBtMlxuICAgICAgOiBoIDwgMjQwID8gbTEgKyAobTIgLSBtMSkgKiAoMjQwIC0gaCkgLyA2MFxuICAgICAgOiBtMSkgKiAyNTU7XG59XG4iLCJpbXBvcnQge2NvbG9yfSBmcm9tIFwiZDMtY29sb3JcIjtcbmltcG9ydCB7aW50ZXJwb2xhdGVOdW1iZXIsIGludGVycG9sYXRlUmdiLCBpbnRlcnBvbGF0ZVN0cmluZ30gZnJvbSBcImQzLWludGVycG9sYXRlXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGEsIGIpIHtcbiAgdmFyIGM7XG4gIHJldHVybiAodHlwZW9mIGIgPT09IFwibnVtYmVyXCIgPyBpbnRlcnBvbGF0ZU51bWJlclxuICAgICAgOiBiIGluc3RhbmNlb2YgY29sb3IgPyBpbnRlcnBvbGF0ZVJnYlxuICAgICAgOiAoYyA9IGNvbG9yKGIpKSA/IChiID0gYywgaW50ZXJwb2xhdGVSZ2IpXG4gICAgICA6IGludGVycG9sYXRlU3RyaW5nKShhLCBiKTtcbn1cbiIsImltcG9ydCB7aW50ZXJwb2xhdGVUcmFuc2Zvcm1TdmcgYXMgaW50ZXJwb2xhdGVUcmFuc2Zvcm19IGZyb20gXCJkMy1pbnRlcnBvbGF0ZVwiO1xuaW1wb3J0IHtuYW1lc3BhY2V9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcbmltcG9ydCBpbnRlcnBvbGF0ZSBmcm9tIFwiLi9pbnRlcnBvbGF0ZS5qc1wiO1xuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlKG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlKG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyUmVtb3ZlTlMoZnVsbG5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyQ29uc3RhbnROUyhmdWxsbmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlMSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIixcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBhdHRyRnVuY3Rpb24obmFtZSwgaW50ZXJwb2xhdGUsIHZhbHVlKSB7XG4gIHZhciBzdHJpbmcwMCxcbiAgICAgIHN0cmluZzEwLFxuICAgICAgaW50ZXJwb2xhdGUwO1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHN0cmluZzAsIHZhbHVlMSA9IHZhbHVlKHRoaXMpLCBzdHJpbmcxO1xuICAgIGlmICh2YWx1ZTEgPT0gbnVsbCkgcmV0dXJuIHZvaWQgdGhpcy5yZW1vdmVBdHRyaWJ1dGUobmFtZSk7XG4gICAgc3RyaW5nMCA9IHRoaXMuZ2V0QXR0cmlidXRlKG5hbWUpO1xuICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gYXR0ckZ1bmN0aW9uTlMoZnVsbG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwLCB2YWx1ZTEgPSB2YWx1ZSh0aGlzKSwgc3RyaW5nMTtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHJldHVybiB2b2lkIHRoaXMucmVtb3ZlQXR0cmlidXRlTlMoZnVsbG5hbWUuc3BhY2UsIGZ1bGxuYW1lLmxvY2FsKTtcbiAgICBzdHJpbmcwID0gdGhpcy5nZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwpO1xuICAgIHN0cmluZzEgPSB2YWx1ZTEgKyBcIlwiO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgdmFsdWUpIHtcbiAgdmFyIGZ1bGxuYW1lID0gbmFtZXNwYWNlKG5hbWUpLCBpID0gZnVsbG5hbWUgPT09IFwidHJhbnNmb3JtXCIgPyBpbnRlcnBvbGF0ZVRyYW5zZm9ybSA6IGludGVycG9sYXRlO1xuICByZXR1cm4gdGhpcy5hdHRyVHdlZW4obmFtZSwgdHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgID8gKGZ1bGxuYW1lLmxvY2FsID8gYXR0ckZ1bmN0aW9uTlMgOiBhdHRyRnVuY3Rpb24pKGZ1bGxuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwiYXR0ci5cIiArIG5hbWUsIHZhbHVlKSlcbiAgICAgIDogdmFsdWUgPT0gbnVsbCA/IChmdWxsbmFtZS5sb2NhbCA/IGF0dHJSZW1vdmVOUyA6IGF0dHJSZW1vdmUpKGZ1bGxuYW1lKVxuICAgICAgOiAoZnVsbG5hbWUubG9jYWwgPyBhdHRyQ29uc3RhbnROUyA6IGF0dHJDb25zdGFudCkoZnVsbG5hbWUsIGksIHZhbHVlKSk7XG59XG4iLCJpbXBvcnQge25hbWVzcGFjZX0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG5mdW5jdGlvbiBhdHRySW50ZXJwb2xhdGUobmFtZSwgaSkge1xuICByZXR1cm4gZnVuY3Rpb24odCkge1xuICAgIHRoaXMuc2V0QXR0cmlidXRlKG5hbWUsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy5zZXRBdHRyaWJ1dGVOUyhmdWxsbmFtZS5zcGFjZSwgZnVsbG5hbWUubG9jYWwsIGkuY2FsbCh0aGlzLCB0KSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGF0dHJUd2Vlbk5TKGZ1bGxuYW1lLCB2YWx1ZSkge1xuICB2YXIgdDAsIGkwO1xuICBmdW5jdGlvbiB0d2VlbigpIHtcbiAgICB2YXIgaSA9IHZhbHVlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgaWYgKGkgIT09IGkwKSB0MCA9IChpMCA9IGkpICYmIGF0dHJJbnRlcnBvbGF0ZU5TKGZ1bGxuYW1lLCBpKTtcbiAgICByZXR1cm4gdDA7XG4gIH1cbiAgdHdlZW4uX3ZhbHVlID0gdmFsdWU7XG4gIHJldHVybiB0d2Vlbjtcbn1cblxuZnVuY3Rpb24gYXR0clR3ZWVuKG5hbWUsIHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgYXR0ckludGVycG9sYXRlKG5hbWUsIGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJhdHRyLlwiICsgbmFtZTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICB2YXIgZnVsbG5hbWUgPSBuYW1lc3BhY2UobmFtZSk7XG4gIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgKGZ1bGxuYW1lLmxvY2FsID8gYXR0clR3ZWVuTlMgOiBhdHRyVHdlZW4pKGZ1bGxuYW1lLCB2YWx1ZSkpO1xufVxuIiwiaW1wb3J0IHtnZXQsIGluaXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmZ1bmN0aW9uIGRlbGF5RnVuY3Rpb24oaWQsIHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpbml0KHRoaXMsIGlkKS5kZWxheSA9ICt2YWx1ZS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkZWxheUNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICByZXR1cm4gdmFsdWUgPSArdmFsdWUsIGZ1bmN0aW9uKCkge1xuICAgIGluaXQodGhpcywgaWQpLmRlbGF5ID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGRlbGF5RnVuY3Rpb25cbiAgICAgICAgICA6IGRlbGF5Q29uc3RhbnQpKGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmRlbGF5O1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZHVyYXRpb25GdW5jdGlvbihpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZHVyYXRpb24gPSArdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZHVyYXRpb25Db25zdGFudChpZCwgdmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID0gK3ZhbHVlLCBmdW5jdGlvbigpIHtcbiAgICBzZXQodGhpcywgaWQpLmR1cmF0aW9uID0gdmFsdWU7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHZhciBpZCA9IHRoaXMuX2lkO1xuXG4gIHJldHVybiBhcmd1bWVudHMubGVuZ3RoXG4gICAgICA/IHRoaXMuZWFjaCgodHlwZW9mIHZhbHVlID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgICA/IGR1cmF0aW9uRnVuY3Rpb25cbiAgICAgICAgICA6IGR1cmF0aW9uQ29uc3RhbnQpKGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmR1cmF0aW9uO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHNldCh0aGlzLCBpZCkuZWFzZSA9IHZhbHVlO1xuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIgaWQgPSB0aGlzLl9pZDtcblxuICByZXR1cm4gYXJndW1lbnRzLmxlbmd0aFxuICAgICAgPyB0aGlzLmVhY2goZWFzZUNvbnN0YW50KGlkLCB2YWx1ZSkpXG4gICAgICA6IGdldCh0aGlzLm5vZGUoKSwgaWQpLmVhc2U7XG59XG4iLCJpbXBvcnQge21hdGNoZXJ9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obWF0Y2gpIHtcbiAgaWYgKHR5cGVvZiBtYXRjaCAhPT0gXCJmdW5jdGlvblwiKSBtYXRjaCA9IG1hdGNoZXIobWF0Y2gpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBbXSwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmICgobm9kZSA9IGdyb3VwW2ldKSAmJiBtYXRjaC5jYWxsKG5vZGUsIG5vZGUuX19kYXRhX18sIGksIGdyb3VwKSkge1xuICAgICAgICBzdWJncm91cC5wdXNoKG5vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBuZXcgVHJhbnNpdGlvbihzdWJncm91cHMsIHRoaXMuX3BhcmVudHMsIHRoaXMuX25hbWUsIHRoaXMuX2lkKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vaW5kZXguanNcIjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24odHJhbnNpdGlvbikge1xuICBpZiAodHJhbnNpdGlvbi5faWQgIT09IHRoaXMuX2lkKSB0aHJvdyBuZXcgRXJyb3I7XG5cbiAgZm9yICh2YXIgZ3JvdXBzMCA9IHRoaXMuX2dyb3VwcywgZ3JvdXBzMSA9IHRyYW5zaXRpb24uX2dyb3VwcywgbTAgPSBncm91cHMwLmxlbmd0aCwgbTEgPSBncm91cHMxLmxlbmd0aCwgbSA9IE1hdGgubWluKG0wLCBtMSksIG1lcmdlcyA9IG5ldyBBcnJheShtMCksIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAwID0gZ3JvdXBzMFtqXSwgZ3JvdXAxID0gZ3JvdXBzMVtqXSwgbiA9IGdyb3VwMC5sZW5ndGgsIG1lcmdlID0gbWVyZ2VzW2pdID0gbmV3IEFycmF5KG4pLCBub2RlLCBpID0gMDsgaSA8IG47ICsraSkge1xuICAgICAgaWYgKG5vZGUgPSBncm91cDBbaV0gfHwgZ3JvdXAxW2ldKSB7XG4gICAgICAgIG1lcmdlW2ldID0gbm9kZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKDsgaiA8IG0wOyArK2opIHtcbiAgICBtZXJnZXNbal0gPSBncm91cHMwW2pdO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKG1lcmdlcywgdGhpcy5fcGFyZW50cywgdGhpcy5fbmFtZSwgdGhpcy5faWQpO1xufVxuIiwiaW1wb3J0IHtnZXQsIHNldCwgaW5pdH0gZnJvbSBcIi4vc2NoZWR1bGUuanNcIjtcblxuZnVuY3Rpb24gc3RhcnQobmFtZSkge1xuICByZXR1cm4gKG5hbWUgKyBcIlwiKS50cmltKCkuc3BsaXQoL158XFxzKy8pLmV2ZXJ5KGZ1bmN0aW9uKHQpIHtcbiAgICB2YXIgaSA9IHQuaW5kZXhPZihcIi5cIik7XG4gICAgaWYgKGkgPj0gMCkgdCA9IHQuc2xpY2UoMCwgaSk7XG4gICAgcmV0dXJuICF0IHx8IHQgPT09IFwic3RhcnRcIjtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uRnVuY3Rpb24oaWQsIG5hbWUsIGxpc3RlbmVyKSB7XG4gIHZhciBvbjAsIG9uMSwgc2l0ID0gc3RhcnQobmFtZSkgPyBpbml0IDogc2V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHNjaGVkdWxlID0gc2l0KHRoaXMsIGlkKSxcbiAgICAgICAgb24gPSBzY2hlZHVsZS5vbjtcblxuICAgIC8vIElmIHRoaXMgbm9kZSBzaGFyZWQgYSBkaXNwYXRjaCB3aXRoIHRoZSBwcmV2aW91cyBub2RlLFxuICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgIC8vIE90aGVyd2lzZSwgY29weS1vbi13cml0ZS5cbiAgICBpZiAob24gIT09IG9uMCkgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihuYW1lLCBsaXN0ZW5lcik7XG5cbiAgICBzY2hlZHVsZS5vbiA9IG9uMTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obmFtZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGlkID0gdGhpcy5faWQ7XG5cbiAgcmV0dXJuIGFyZ3VtZW50cy5sZW5ndGggPCAyXG4gICAgICA/IGdldCh0aGlzLm5vZGUoKSwgaWQpLm9uLm9uKG5hbWUpXG4gICAgICA6IHRoaXMuZWFjaChvbkZ1bmN0aW9uKGlkLCBuYW1lLCBsaXN0ZW5lcikpO1xufVxuIiwiZnVuY3Rpb24gcmVtb3ZlRnVuY3Rpb24oaWQpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBwYXJlbnQgPSB0aGlzLnBhcmVudE5vZGU7XG4gICAgZm9yICh2YXIgaSBpbiB0aGlzLl9fdHJhbnNpdGlvbikgaWYgKCtpICE9PSBpZCkgcmV0dXJuO1xuICAgIGlmIChwYXJlbnQpIHBhcmVudC5yZW1vdmVDaGlsZCh0aGlzKTtcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiB0aGlzLm9uKFwiZW5kLnJlbW92ZVwiLCByZW1vdmVGdW5jdGlvbih0aGlzLl9pZCkpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3Rvcn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvcihzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IG5ldyBBcnJheShtKSwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgc3ViZ3JvdXAgPSBzdWJncm91cHNbal0gPSBuZXcgQXJyYXkobiksIG5vZGUsIHN1Ym5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAoKG5vZGUgPSBncm91cFtpXSkgJiYgKHN1Ym5vZGUgPSBzZWxlY3QuY2FsbChub2RlLCBub2RlLl9fZGF0YV9fLCBpLCBncm91cCkpKSB7XG4gICAgICAgIGlmIChcIl9fZGF0YV9fXCIgaW4gbm9kZSkgc3Vibm9kZS5fX2RhdGFfXyA9IG5vZGUuX19kYXRhX187XG4gICAgICAgIHN1Ymdyb3VwW2ldID0gc3Vibm9kZTtcbiAgICAgICAgc2NoZWR1bGUoc3ViZ3JvdXBbaV0sIG5hbWUsIGlkLCBpLCBzdWJncm91cCwgZ2V0KG5vZGUsIGlkKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKHN1Ymdyb3VwcywgdGhpcy5fcGFyZW50cywgbmFtZSwgaWQpO1xufVxuIiwiaW1wb3J0IHtzZWxlY3RvckFsbH0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHtUcmFuc2l0aW9ufSBmcm9tIFwiLi9pbmRleC5qc1wiO1xuaW1wb3J0IHNjaGVkdWxlLCB7Z2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzZWxlY3QpIHtcbiAgdmFyIG5hbWUgPSB0aGlzLl9uYW1lLFxuICAgICAgaWQgPSB0aGlzLl9pZDtcblxuICBpZiAodHlwZW9mIHNlbGVjdCAhPT0gXCJmdW5jdGlvblwiKSBzZWxlY3QgPSBzZWxlY3RvckFsbChzZWxlY3QpO1xuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIHN1Ymdyb3VwcyA9IFtdLCBwYXJlbnRzID0gW10sIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIGZvciAodmFyIGNoaWxkcmVuID0gc2VsZWN0LmNhbGwobm9kZSwgbm9kZS5fX2RhdGFfXywgaSwgZ3JvdXApLCBjaGlsZCwgaW5oZXJpdCA9IGdldChub2RlLCBpZCksIGsgPSAwLCBsID0gY2hpbGRyZW4ubGVuZ3RoOyBrIDwgbDsgKytrKSB7XG4gICAgICAgICAgaWYgKGNoaWxkID0gY2hpbGRyZW5ba10pIHtcbiAgICAgICAgICAgIHNjaGVkdWxlKGNoaWxkLCBuYW1lLCBpZCwgaywgY2hpbGRyZW4sIGluaGVyaXQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBzdWJncm91cHMucHVzaChjaGlsZHJlbik7XG4gICAgICAgIHBhcmVudHMucHVzaChub2RlKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oc3ViZ3JvdXBzLCBwYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuXG52YXIgU2VsZWN0aW9uID0gc2VsZWN0aW9uLnByb3RvdHlwZS5jb25zdHJ1Y3RvcjtcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgU2VsZWN0aW9uKHRoaXMuX2dyb3VwcywgdGhpcy5fcGFyZW50cyk7XG59XG4iLCJpbXBvcnQge2ludGVycG9sYXRlVHJhbnNmb3JtQ3NzIGFzIGludGVycG9sYXRlVHJhbnNmb3JtfSBmcm9tIFwiZDMtaW50ZXJwb2xhdGVcIjtcbmltcG9ydCB7c3R5bGV9IGZyb20gXCJkMy1zZWxlY3Rpb25cIjtcbmltcG9ydCB7c2V0fSBmcm9tIFwiLi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHt0d2VlblZhbHVlfSBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IGludGVycG9sYXRlIGZyb20gXCIuL2ludGVycG9sYXRlLmpzXCI7XG5cbmZ1bmN0aW9uIHN0eWxlTnVsbChuYW1lLCBpbnRlcnBvbGF0ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHN0cmluZzEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCBzdHJpbmcxMCA9IHN0cmluZzEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVJlbW92ZShuYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnN0eWxlLnJlbW92ZVByb3BlcnR5KG5hbWUpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUNvbnN0YW50KG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZTEpIHtcbiAgdmFyIHN0cmluZzAwLFxuICAgICAgc3RyaW5nMSA9IHZhbHVlMSArIFwiXCIsXG4gICAgICBpbnRlcnBvbGF0ZTA7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB2YXIgc3RyaW5nMCA9IHN0eWxlKHRoaXMsIG5hbWUpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZUZ1bmN0aW9uKG5hbWUsIGludGVycG9sYXRlLCB2YWx1ZSkge1xuICB2YXIgc3RyaW5nMDAsXG4gICAgICBzdHJpbmcxMCxcbiAgICAgIGludGVycG9sYXRlMDtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzdHJpbmcwID0gc3R5bGUodGhpcywgbmFtZSksXG4gICAgICAgIHZhbHVlMSA9IHZhbHVlKHRoaXMpLFxuICAgICAgICBzdHJpbmcxID0gdmFsdWUxICsgXCJcIjtcbiAgICBpZiAodmFsdWUxID09IG51bGwpIHN0cmluZzEgPSB2YWx1ZTEgPSAodGhpcy5zdHlsZS5yZW1vdmVQcm9wZXJ0eShuYW1lKSwgc3R5bGUodGhpcywgbmFtZSkpO1xuICAgIHJldHVybiBzdHJpbmcwID09PSBzdHJpbmcxID8gbnVsbFxuICAgICAgICA6IHN0cmluZzAgPT09IHN0cmluZzAwICYmIHN0cmluZzEgPT09IHN0cmluZzEwID8gaW50ZXJwb2xhdGUwXG4gICAgICAgIDogKHN0cmluZzEwID0gc3RyaW5nMSwgaW50ZXJwb2xhdGUwID0gaW50ZXJwb2xhdGUoc3RyaW5nMDAgPSBzdHJpbmcwLCB2YWx1ZTEpKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3R5bGVNYXliZVJlbW92ZShpZCwgbmFtZSkge1xuICB2YXIgb24wLCBvbjEsIGxpc3RlbmVyMCwga2V5ID0gXCJzdHlsZS5cIiArIG5hbWUsIGV2ZW50ID0gXCJlbmQuXCIgKyBrZXksIHJlbW92ZTtcbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBzY2hlZHVsZSA9IHNldCh0aGlzLCBpZCksXG4gICAgICAgIG9uID0gc2NoZWR1bGUub24sXG4gICAgICAgIGxpc3RlbmVyID0gc2NoZWR1bGUudmFsdWVba2V5XSA9PSBudWxsID8gcmVtb3ZlIHx8IChyZW1vdmUgPSBzdHlsZVJlbW92ZShuYW1lKSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAvLyBqdXN0IGFzc2lnbiB0aGUgdXBkYXRlZCBzaGFyZWQgZGlzcGF0Y2ggYW5kIHdl4oCZcmUgZG9uZSFcbiAgICAvLyBPdGhlcndpc2UsIGNvcHktb24td3JpdGUuXG4gICAgaWYgKG9uICE9PSBvbjAgfHwgbGlzdGVuZXIwICE9PSBsaXN0ZW5lcikgKG9uMSA9IChvbjAgPSBvbikuY29weSgpKS5vbihldmVudCwgbGlzdGVuZXIwID0gbGlzdGVuZXIpO1xuXG4gICAgc2NoZWR1bGUub24gPSBvbjE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgaSA9IChuYW1lICs9IFwiXCIpID09PSBcInRyYW5zZm9ybVwiID8gaW50ZXJwb2xhdGVUcmFuc2Zvcm0gOiBpbnRlcnBvbGF0ZTtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZU51bGwobmFtZSwgaSkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBzdHlsZVJlbW92ZShuYW1lKSlcbiAgICA6IHR5cGVvZiB2YWx1ZSA9PT0gXCJmdW5jdGlvblwiID8gdGhpc1xuICAgICAgLnN0eWxlVHdlZW4obmFtZSwgc3R5bGVGdW5jdGlvbihuYW1lLCBpLCB0d2VlblZhbHVlKHRoaXMsIFwic3R5bGUuXCIgKyBuYW1lLCB2YWx1ZSkpKVxuICAgICAgLmVhY2goc3R5bGVNYXliZVJlbW92ZSh0aGlzLl9pZCwgbmFtZSkpXG4gICAgOiB0aGlzXG4gICAgICAuc3R5bGVUd2VlbihuYW1lLCBzdHlsZUNvbnN0YW50KG5hbWUsIGksIHZhbHVlKSwgcHJpb3JpdHkpXG4gICAgICAub24oXCJlbmQuc3R5bGUuXCIgKyBuYW1lLCBudWxsKTtcbn1cbiIsImZ1bmN0aW9uIHN0eWxlSW50ZXJwb2xhdGUobmFtZSwgaSwgcHJpb3JpdHkpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHQpIHtcbiAgICB0aGlzLnN0eWxlLnNldFByb3BlcnR5KG5hbWUsIGkuY2FsbCh0aGlzLCB0KSwgcHJpb3JpdHkpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzdHlsZVR3ZWVuKG5hbWUsIHZhbHVlLCBwcmlvcml0eSkge1xuICB2YXIgdCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQgPSAoaTAgPSBpKSAmJiBzdHlsZUludGVycG9sYXRlKG5hbWUsIGksIHByaW9yaXR5KTtcbiAgICByZXR1cm4gdDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihuYW1lLCB2YWx1ZSwgcHJpb3JpdHkpIHtcbiAgdmFyIGtleSA9IFwic3R5bGUuXCIgKyAobmFtZSArPSBcIlwiKTtcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAyKSByZXR1cm4gKGtleSA9IHRoaXMudHdlZW4oa2V5KSkgJiYga2V5Ll92YWx1ZTtcbiAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybiB0aGlzLnR3ZWVuKGtleSwgbnVsbCk7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09IFwiZnVuY3Rpb25cIikgdGhyb3cgbmV3IEVycm9yO1xuICByZXR1cm4gdGhpcy50d2VlbihrZXksIHN0eWxlVHdlZW4obmFtZSwgdmFsdWUsIHByaW9yaXR5ID09IG51bGwgPyBcIlwiIDogcHJpb3JpdHkpKTtcbn1cbiIsImltcG9ydCB7dHdlZW5WYWx1ZX0gZnJvbSBcIi4vdHdlZW4uanNcIjtcblxuZnVuY3Rpb24gdGV4dENvbnN0YW50KHZhbHVlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICB0aGlzLnRleHRDb250ZW50ID0gdmFsdWU7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRleHRGdW5jdGlvbih2YWx1ZSkge1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgdmFyIHZhbHVlMSA9IHZhbHVlKHRoaXMpO1xuICAgIHRoaXMudGV4dENvbnRlbnQgPSB2YWx1ZTEgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZTE7XG4gIH07XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKHZhbHVlKSB7XG4gIHJldHVybiB0aGlzLnR3ZWVuKFwidGV4dFwiLCB0eXBlb2YgdmFsdWUgPT09IFwiZnVuY3Rpb25cIlxuICAgICAgPyB0ZXh0RnVuY3Rpb24odHdlZW5WYWx1ZSh0aGlzLCBcInRleHRcIiwgdmFsdWUpKVxuICAgICAgOiB0ZXh0Q29uc3RhbnQodmFsdWUgPT0gbnVsbCA/IFwiXCIgOiB2YWx1ZSArIFwiXCIpKTtcbn1cbiIsImZ1bmN0aW9uIHRleHRJbnRlcnBvbGF0ZShpKSB7XG4gIHJldHVybiBmdW5jdGlvbih0KSB7XG4gICAgdGhpcy50ZXh0Q29udGVudCA9IGkuY2FsbCh0aGlzLCB0KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdGV4dFR3ZWVuKHZhbHVlKSB7XG4gIHZhciB0MCwgaTA7XG4gIGZ1bmN0aW9uIHR3ZWVuKCkge1xuICAgIHZhciBpID0gdmFsdWUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICBpZiAoaSAhPT0gaTApIHQwID0gKGkwID0gaSkgJiYgdGV4dEludGVycG9sYXRlKGkpO1xuICAgIHJldHVybiB0MDtcbiAgfVxuICB0d2Vlbi5fdmFsdWUgPSB2YWx1ZTtcbiAgcmV0dXJuIHR3ZWVuO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbih2YWx1ZSkge1xuICB2YXIga2V5ID0gXCJ0ZXh0XCI7XG4gIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMSkgcmV0dXJuIChrZXkgPSB0aGlzLnR3ZWVuKGtleSkpICYmIGtleS5fdmFsdWU7XG4gIGlmICh2YWx1ZSA9PSBudWxsKSByZXR1cm4gdGhpcy50d2VlbihrZXksIG51bGwpO1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSBcImZ1bmN0aW9uXCIpIHRocm93IG5ldyBFcnJvcjtcbiAgcmV0dXJuIHRoaXMudHdlZW4oa2V5LCB0ZXh0VHdlZW4odmFsdWUpKTtcbn1cbiIsImltcG9ydCB7VHJhbnNpdGlvbiwgbmV3SWR9IGZyb20gXCIuL2luZGV4LmpzXCI7XG5pbXBvcnQgc2NoZWR1bGUsIHtnZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgbmFtZSA9IHRoaXMuX25hbWUsXG4gICAgICBpZDAgPSB0aGlzLl9pZCxcbiAgICAgIGlkMSA9IG5ld0lkKCk7XG5cbiAgZm9yICh2YXIgZ3JvdXBzID0gdGhpcy5fZ3JvdXBzLCBtID0gZ3JvdXBzLmxlbmd0aCwgaiA9IDA7IGogPCBtOyArK2opIHtcbiAgICBmb3IgKHZhciBncm91cCA9IGdyb3Vwc1tqXSwgbiA9IGdyb3VwLmxlbmd0aCwgbm9kZSwgaSA9IDA7IGkgPCBuOyArK2kpIHtcbiAgICAgIGlmIChub2RlID0gZ3JvdXBbaV0pIHtcbiAgICAgICAgdmFyIGluaGVyaXQgPSBnZXQobm9kZSwgaWQwKTtcbiAgICAgICAgc2NoZWR1bGUobm9kZSwgbmFtZSwgaWQxLCBpLCBncm91cCwge1xuICAgICAgICAgIHRpbWU6IGluaGVyaXQudGltZSArIGluaGVyaXQuZGVsYXkgKyBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGRlbGF5OiAwLFxuICAgICAgICAgIGR1cmF0aW9uOiBpbmhlcml0LmR1cmF0aW9uLFxuICAgICAgICAgIGVhc2U6IGluaGVyaXQuZWFzZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZDEpO1xufVxuIiwiaW1wb3J0IHtzZXR9IGZyb20gXCIuL3NjaGVkdWxlLmpzXCI7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKCkge1xuICB2YXIgb24wLCBvbjEsIHRoYXQgPSB0aGlzLCBpZCA9IHRoYXQuX2lkLCBzaXplID0gdGhhdC5zaXplKCk7XG4gIHJldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbihyZXNvbHZlLCByZWplY3QpIHtcbiAgICB2YXIgY2FuY2VsID0ge3ZhbHVlOiByZWplY3R9LFxuICAgICAgICBlbmQgPSB7dmFsdWU6IGZ1bmN0aW9uKCkgeyBpZiAoLS1zaXplID09PSAwKSByZXNvbHZlKCk7IH19O1xuXG4gICAgdGhhdC5lYWNoKGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIHNjaGVkdWxlID0gc2V0KHRoaXMsIGlkKSxcbiAgICAgICAgICBvbiA9IHNjaGVkdWxlLm9uO1xuXG4gICAgICAvLyBJZiB0aGlzIG5vZGUgc2hhcmVkIGEgZGlzcGF0Y2ggd2l0aCB0aGUgcHJldmlvdXMgbm9kZSxcbiAgICAgIC8vIGp1c3QgYXNzaWduIHRoZSB1cGRhdGVkIHNoYXJlZCBkaXNwYXRjaCBhbmQgd2XigJlyZSBkb25lIVxuICAgICAgLy8gT3RoZXJ3aXNlLCBjb3B5LW9uLXdyaXRlLlxuICAgICAgaWYgKG9uICE9PSBvbjApIHtcbiAgICAgICAgb24xID0gKG9uMCA9IG9uKS5jb3B5KCk7XG4gICAgICAgIG9uMS5fLmNhbmNlbC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmludGVycnVwdC5wdXNoKGNhbmNlbCk7XG4gICAgICAgIG9uMS5fLmVuZC5wdXNoKGVuZCk7XG4gICAgICB9XG5cbiAgICAgIHNjaGVkdWxlLm9uID0gb24xO1xuICAgIH0pO1xuICB9KTtcbn1cbiIsImltcG9ydCB7c2VsZWN0aW9ufSBmcm9tIFwiZDMtc2VsZWN0aW9uXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9hdHRyIGZyb20gXCIuL2F0dHIuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2F0dHJUd2VlbiBmcm9tIFwiLi9hdHRyVHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX2RlbGF5IGZyb20gXCIuL2RlbGF5LmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9kdXJhdGlvbiBmcm9tIFwiLi9kdXJhdGlvbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZWFzZSBmcm9tIFwiLi9lYXNlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9maWx0ZXIgZnJvbSBcIi4vZmlsdGVyLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9tZXJnZSBmcm9tIFwiLi9tZXJnZS5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fb24gZnJvbSBcIi4vb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3JlbW92ZSBmcm9tIFwiLi9yZW1vdmUuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdCBmcm9tIFwiLi9zZWxlY3QuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdEFsbCBmcm9tIFwiLi9zZWxlY3RBbGwuanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3NlbGVjdGlvbiBmcm9tIFwiLi9zZWxlY3Rpb24uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3N0eWxlIGZyb20gXCIuL3N0eWxlLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl9zdHlsZVR3ZWVuIGZyb20gXCIuL3N0eWxlVHdlZW4uanNcIjtcbmltcG9ydCB0cmFuc2l0aW9uX3RleHQgZnJvbSBcIi4vdGV4dC5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdGV4dFR3ZWVuIGZyb20gXCIuL3RleHRUd2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fdHJhbnNpdGlvbiBmcm9tIFwiLi90cmFuc2l0aW9uLmpzXCI7XG5pbXBvcnQgdHJhbnNpdGlvbl90d2VlbiBmcm9tIFwiLi90d2Vlbi5qc1wiO1xuaW1wb3J0IHRyYW5zaXRpb25fZW5kIGZyb20gXCIuL2VuZC5qc1wiO1xuXG52YXIgaWQgPSAwO1xuXG5leHBvcnQgZnVuY3Rpb24gVHJhbnNpdGlvbihncm91cHMsIHBhcmVudHMsIG5hbWUsIGlkKSB7XG4gIHRoaXMuX2dyb3VwcyA9IGdyb3VwcztcbiAgdGhpcy5fcGFyZW50cyA9IHBhcmVudHM7XG4gIHRoaXMuX25hbWUgPSBuYW1lO1xuICB0aGlzLl9pZCA9IGlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB0cmFuc2l0aW9uKG5hbWUpIHtcbiAgcmV0dXJuIHNlbGVjdGlvbigpLnRyYW5zaXRpb24obmFtZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdJZCgpIHtcbiAgcmV0dXJuICsraWQ7XG59XG5cbnZhciBzZWxlY3Rpb25fcHJvdG90eXBlID0gc2VsZWN0aW9uLnByb3RvdHlwZTtcblxuVHJhbnNpdGlvbi5wcm90b3R5cGUgPSB0cmFuc2l0aW9uLnByb3RvdHlwZSA9IHtcbiAgY29uc3RydWN0b3I6IFRyYW5zaXRpb24sXG4gIHNlbGVjdDogdHJhbnNpdGlvbl9zZWxlY3QsXG4gIHNlbGVjdEFsbDogdHJhbnNpdGlvbl9zZWxlY3RBbGwsXG4gIGZpbHRlcjogdHJhbnNpdGlvbl9maWx0ZXIsXG4gIG1lcmdlOiB0cmFuc2l0aW9uX21lcmdlLFxuICBzZWxlY3Rpb246IHRyYW5zaXRpb25fc2VsZWN0aW9uLFxuICB0cmFuc2l0aW9uOiB0cmFuc2l0aW9uX3RyYW5zaXRpb24sXG4gIGNhbGw6IHNlbGVjdGlvbl9wcm90b3R5cGUuY2FsbCxcbiAgbm9kZXM6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZXMsXG4gIG5vZGU6IHNlbGVjdGlvbl9wcm90b3R5cGUubm9kZSxcbiAgc2l6ZTogc2VsZWN0aW9uX3Byb3RvdHlwZS5zaXplLFxuICBlbXB0eTogc2VsZWN0aW9uX3Byb3RvdHlwZS5lbXB0eSxcbiAgZWFjaDogc2VsZWN0aW9uX3Byb3RvdHlwZS5lYWNoLFxuICBvbjogdHJhbnNpdGlvbl9vbixcbiAgYXR0cjogdHJhbnNpdGlvbl9hdHRyLFxuICBhdHRyVHdlZW46IHRyYW5zaXRpb25fYXR0clR3ZWVuLFxuICBzdHlsZTogdHJhbnNpdGlvbl9zdHlsZSxcbiAgc3R5bGVUd2VlbjogdHJhbnNpdGlvbl9zdHlsZVR3ZWVuLFxuICB0ZXh0OiB0cmFuc2l0aW9uX3RleHQsXG4gIHRleHRUd2VlbjogdHJhbnNpdGlvbl90ZXh0VHdlZW4sXG4gIHJlbW92ZTogdHJhbnNpdGlvbl9yZW1vdmUsXG4gIHR3ZWVuOiB0cmFuc2l0aW9uX3R3ZWVuLFxuICBkZWxheTogdHJhbnNpdGlvbl9kZWxheSxcbiAgZHVyYXRpb246IHRyYW5zaXRpb25fZHVyYXRpb24sXG4gIGVhc2U6IHRyYW5zaXRpb25fZWFzZSxcbiAgZW5kOiB0cmFuc2l0aW9uX2VuZFxufTtcbiIsImV4cG9ydCBmdW5jdGlvbiBjdWJpY0luKHQpIHtcbiAgcmV0dXJuIHQgKiB0ICogdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1YmljT3V0KHQpIHtcbiAgcmV0dXJuIC0tdCAqIHQgKiB0ICsgMTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGN1YmljSW5PdXQodCkge1xuICByZXR1cm4gKCh0ICo9IDIpIDw9IDEgPyB0ICogdCAqIHQgOiAodCAtPSAyKSAqIHQgKiB0ICsgMikgLyAyO1xufVxuIiwiaW1wb3J0IHtUcmFuc2l0aW9uLCBuZXdJZH0gZnJvbSBcIi4uL3RyYW5zaXRpb24vaW5kZXguanNcIjtcbmltcG9ydCBzY2hlZHVsZSBmcm9tIFwiLi4vdHJhbnNpdGlvbi9zY2hlZHVsZS5qc1wiO1xuaW1wb3J0IHtlYXNlQ3ViaWNJbk91dH0gZnJvbSBcImQzLWVhc2VcIjtcbmltcG9ydCB7bm93fSBmcm9tIFwiZDMtdGltZXJcIjtcblxudmFyIGRlZmF1bHRUaW1pbmcgPSB7XG4gIHRpbWU6IG51bGwsIC8vIFNldCBvbiB1c2UuXG4gIGRlbGF5OiAwLFxuICBkdXJhdGlvbjogMjUwLFxuICBlYXNlOiBlYXNlQ3ViaWNJbk91dFxufTtcblxuZnVuY3Rpb24gaW5oZXJpdChub2RlLCBpZCkge1xuICB2YXIgdGltaW5nO1xuICB3aGlsZSAoISh0aW1pbmcgPSBub2RlLl9fdHJhbnNpdGlvbikgfHwgISh0aW1pbmcgPSB0aW1pbmdbaWRdKSkge1xuICAgIGlmICghKG5vZGUgPSBub2RlLnBhcmVudE5vZGUpKSB7XG4gICAgICByZXR1cm4gZGVmYXVsdFRpbWluZy50aW1lID0gbm93KCksIGRlZmF1bHRUaW1pbmc7XG4gICAgfVxuICB9XG4gIHJldHVybiB0aW1pbmc7XG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5hbWUpIHtcbiAgdmFyIGlkLFxuICAgICAgdGltaW5nO1xuXG4gIGlmIChuYW1lIGluc3RhbmNlb2YgVHJhbnNpdGlvbikge1xuICAgIGlkID0gbmFtZS5faWQsIG5hbWUgPSBuYW1lLl9uYW1lO1xuICB9IGVsc2Uge1xuICAgIGlkID0gbmV3SWQoKSwgKHRpbWluZyA9IGRlZmF1bHRUaW1pbmcpLnRpbWUgPSBub3coKSwgbmFtZSA9IG5hbWUgPT0gbnVsbCA/IG51bGwgOiBuYW1lICsgXCJcIjtcbiAgfVxuXG4gIGZvciAodmFyIGdyb3VwcyA9IHRoaXMuX2dyb3VwcywgbSA9IGdyb3Vwcy5sZW5ndGgsIGogPSAwOyBqIDwgbTsgKytqKSB7XG4gICAgZm9yICh2YXIgZ3JvdXAgPSBncm91cHNbal0sIG4gPSBncm91cC5sZW5ndGgsIG5vZGUsIGkgPSAwOyBpIDwgbjsgKytpKSB7XG4gICAgICBpZiAobm9kZSA9IGdyb3VwW2ldKSB7XG4gICAgICAgIHNjaGVkdWxlKG5vZGUsIG5hbWUsIGlkLCBpLCBncm91cCwgdGltaW5nIHx8IGluaGVyaXQobm9kZSwgaWQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3IFRyYW5zaXRpb24oZ3JvdXBzLCB0aGlzLl9wYXJlbnRzLCBuYW1lLCBpZCk7XG59XG4iLCJpbXBvcnQge3NlbGVjdGlvbn0gZnJvbSBcImQzLXNlbGVjdGlvblwiO1xuaW1wb3J0IHNlbGVjdGlvbl9pbnRlcnJ1cHQgZnJvbSBcIi4vaW50ZXJydXB0LmpzXCI7XG5pbXBvcnQgc2VsZWN0aW9uX3RyYW5zaXRpb24gZnJvbSBcIi4vdHJhbnNpdGlvbi5qc1wiO1xuXG5zZWxlY3Rpb24ucHJvdG90eXBlLmludGVycnVwdCA9IHNlbGVjdGlvbl9pbnRlcnJ1cHQ7XG5zZWxlY3Rpb24ucHJvdG90eXBlLnRyYW5zaXRpb24gPSBzZWxlY3Rpb25fdHJhbnNpdGlvbjtcbiIsImltcG9ydCB7VHJhbnNpdGlvbn0gZnJvbSBcIi4vdHJhbnNpdGlvbi9pbmRleC5qc1wiO1xuaW1wb3J0IHtTQ0hFRFVMRUR9IGZyb20gXCIuL3RyYW5zaXRpb24vc2NoZWR1bGUuanNcIjtcblxudmFyIHJvb3QgPSBbbnVsbF07XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKG5vZGUsIG5hbWUpIHtcbiAgdmFyIHNjaGVkdWxlcyA9IG5vZGUuX190cmFuc2l0aW9uLFxuICAgICAgc2NoZWR1bGUsXG4gICAgICBpO1xuXG4gIGlmIChzY2hlZHVsZXMpIHtcbiAgICBuYW1lID0gbmFtZSA9PSBudWxsID8gbnVsbCA6IG5hbWUgKyBcIlwiO1xuICAgIGZvciAoaSBpbiBzY2hlZHVsZXMpIHtcbiAgICAgIGlmICgoc2NoZWR1bGUgPSBzY2hlZHVsZXNbaV0pLnN0YXRlID4gU0NIRURVTEVEICYmIHNjaGVkdWxlLm5hbWUgPT09IG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIG5ldyBUcmFuc2l0aW9uKFtbbm9kZV1dLCByb290LCBuYW1lLCAraSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG4iLCJpbXBvcnQgXCIuL3NlbGVjdGlvbi9pbmRleC5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIHRyYW5zaXRpb259IGZyb20gXCIuL3RyYW5zaXRpb24vaW5kZXguanNcIjtcbmV4cG9ydCB7ZGVmYXVsdCBhcyBhY3RpdmV9IGZyb20gXCIuL2FjdGl2ZS5qc1wiO1xuZXhwb3J0IHtkZWZhdWx0IGFzIGludGVycnVwdH0gZnJvbSBcIi4vaW50ZXJydXB0LmpzXCI7XG4iLCJpbXBvcnQgeyBzZWxlY3QsIGV2ZW50IH0gZnJvbSAnZDMtc2VsZWN0aW9uJ1xuaW1wb3J0IHsgdHJhbnNpdGlvbiwgZHVyYXRpb24sIG9uIH0gZnJvbSAnZDMtdHJhbnNpdGlvbidcbmNvbnN0IHRvb2x0aXBFbCA9IHNlbGVjdCgnLnRvb2x0aXAnKVxuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHNob3c6IGZ1bmN0aW9uKGNvbnRlbnQpIHtcbiAgICBsZXQgeVBvcyA9IGV2ZW50LnBhZ2VZXG4gICAgbGV0IHhQb3MgPSBldmVudC5wYWdlWFxuICAgIGlmICh4UG9zICsgMTAgPiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoIC0gMjE1KSB7XG4gICAgICB4UG9zID0gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCArIDUgLSAyMTVcbiAgICB9XG5cbiAgICB0b29sdGlwRWxcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbigyMDApXG4gICAgICAuc3R5bGUoJ29wYWNpdHknLCAwLjkpXG4gICAgICAub24oJ2VuZCcsIGZ1bmN0aW9uKCkge1xuICAgICAgICB0b29sdGlwRWwuY2xhc3NlZCgnaXNBY3RpdmUnLCB0cnVlKVxuICAgICAgICAvLyB0b29sdGlwRWwuc2VsZWN0KCcudG9vbHRpcC1jbG9zZScpLm9uKCdjbGljaycsIHRoaXMuaGlkZSlcbiAgICAgICAgdG9vbHRpcEVsLm9uKCdjbGljaycsIHRoaXMuaGlkZSlcbiAgICAgIH0pXG4gICAgdG9vbHRpcEVsXG4gICAgICAuaHRtbChjb250ZW50KVxuICAgICAgLnN0eWxlKCd2aXNpYmlsaXR5JywgJ3Zpc2libGUnKVxuICAgICAgLnN0eWxlKCdsZWZ0JywgeFBvcyArICdweCcpXG4gICAgICAuc3R5bGUoJ3RvcCcsIHlQb3MgKyAncHgnKVxuICB9LFxuICBoaWRlOiBmdW5jdGlvbigpIHtcbiAgICB0b29sdGlwRWxcbiAgICAgIC50cmFuc2l0aW9uKClcbiAgICAgIC5kdXJhdGlvbig1MDApXG4gICAgICAuc3R5bGUoJ29wYWNpdHknLCAwKVxuICB9LFxuICBmb3JtYXRDb250ZW50OiBmdW5jdGlvbihjb21wb25lbnQpIHtcbiAgICBsZXQgY29udGVudCA9ICc8dWwgY2xhc3M9XCJ0b29sdGlwLWxpc3RcIj4nXG4gICAgY29tcG9uZW50LmZvckVhY2goZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgIGxldCBjc3NDbGFzcyA9IG51bGxcbiAgICAgIGlmIChpdGVtLmNsYXNzKSB7XG4gICAgICAgIGNzc0NsYXNzID0gaXRlbS5jbGFzc1xuICAgICAgfVxuICAgICAgbGV0IGxhYmVsID0gT2JqZWN0LmtleXMoaXRlbSlbMF1cbiAgICAgIGNvbnRlbnQgKz0gYDxsaSBjbGFzcz1cIiR7Y3NzQ2xhc3N9XCI+PHNwYW4gY2xhc3M9XCJ0b29sdGlwLWxhYmVsXCI+JHtsYWJlbH06PC9zcGFuPiAke1xuICAgICAgICBpdGVtW2xhYmVsXVxuICAgICAgfTwvbGk+YFxuICAgIH0pXG4gICAgY29udGVudCArPSAnPC91bD4nXG4gICAgcmV0dXJuIGNvbnRlbnRcbiAgfVxufVxuIiwiaW1wb3J0IHsgc2VsZWN0LCBzZWxlY3RBbGwgfSBmcm9tICdkMy1zZWxlY3Rpb24nXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkMy1mb3JtYXQnXG5pbXBvcnQgeyBzY2FsZVF1YW50aWxlLCBzY2FsZU9yZGluYWwsIHNjYWxlTG9nIH0gZnJvbSAnZDMtc2NhbGUnXG5pbXBvcnQgeyBvbiwgdHJhbnNpdGlvbiwgZHVyYXRpb24gfSBmcm9tICdkMy10cmFuc2l0aW9uJ1xuaW1wb3J0IHsgZXh0ZW50IH0gZnJvbSAnZDMtYXJyYXknXG5pbXBvcnQgdG9vbHRpcCBmcm9tICcuL3Rvb2x0aXAnXG5cbmNvbnN0IGRvbGxhckZvcm1hdHRlciA9IGZvcm1hdCgnLjNzJylcbmNvbnN0IHBlcmNlbnRGb3JtYXR0ZXIgPSBmb3JtYXQoJy4yZicpXG5jb25zdCBjb3VudHJpZXMgPSBbJ2NhbmFkYScsICdjaGluYScsICdldScsICdtZXhpY28nXVxuY29uc3QgY29sb3JzID0gWycjOUVCMDQwJywgJyNGRTUwMDAnLCAnIzBBQTRDRicsICcjRjJBRjE5JywgJyNmZmYnXVxuY29uc3QgbWFyZ2luID0geyB0b3A6IDEwLCByaWdodDogNSwgYm90dG9tOiAxMCwgbGVmdDogNSB9XG5cbmNvbnN0IGNvbnRhaW5lciA9IHNlbGVjdCgnLmNoYXJ0JylcbmNvbnN0IHJvd3MgPSA4XG5jb25zdCBjb2x1bW5zID0gMTFcbmNvbnN0IHBhZGRpbmcgPSAxMlxuY29uc3QgbW9kYWxQYWRkaW5nID0gNDhcblxubGV0IGNoYXJ0LFxuICB3aWR0aCxcbiAgaGVpZ2h0LFxuICBjZWxsU2l6ZSxcbiAgYWN0aXZlU3RhdGUsXG4gIGJvcmRlckNvbG9yU2NhbGUsXG4gIGJvcmRlcldpZHRoU2NhbGUsXG4gIGZpbGxTY2FsZSxcbiAga2V5RmlsdGVyID0gY291bnRyaWVzLFxuICBkaWZmID0gW11cblxuZnVuY3Rpb24gZHJhdyhkYXRhKSB7XG4gIGJvcmRlckNvbG9yU2NhbGUgPSBzY2FsZUxvZygpXG4gICAgLmRvbWFpbihcbiAgICAgIGV4dGVudChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiArZC50b3RhbGRvbGxhcnNcbiAgICAgIH0pXG4gICAgKVxuICAgIC5yYW5nZShbJyNFNUU1RTUnLCAnIzVFNUU1RSddKVxuXG4gIGJvcmRlcldpZHRoU2NhbGUgPSBzY2FsZUxvZygpXG4gICAgLmRvbWFpbihcbiAgICAgIGV4dGVudChkYXRhLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiArZC50b3RhbGRvbGxhcnNcbiAgICAgIH0pXG4gICAgKVxuICAgIC5yYW5nZShbJzEnLCAnNSddKVxuXG4gIGZpbGxTY2FsZSA9IHNjYWxlT3JkaW5hbCgpXG4gICAgLmRvbWFpbihbLi4uY291bnRyaWVzLCAnb3RoZXInXSlcbiAgICAucmFuZ2UoY29sb3JzKVxuXG4gIGZ1bmN0aW9uIGRyYXdQZXJjZW50cygpIHtcbiAgICBmaWxsU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxuICAgICAgLmRvbWFpbihbLi4uY291bnRyaWVzLCAnb3RoZXInXSlcbiAgICAgIC5yYW5nZShcbiAgICAgICAgY29sb3JzLm1hcCgoY29sb3IsIGkpID0+IHtcbiAgICAgICAgICBsZXQgaW5kaWNlcyA9IFtdXG4gICAgICAgICAga2V5RmlsdGVyLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICAgICAgICBpbmRpY2VzLnB1c2goWy4uLmNvdW50cmllcywgJ290aGVyJ10uaW5kZXhPZihjb3VudHJ5KSlcbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiAhKGluZGljZXMuaW5kZXhPZihpKSA+IC0xKSA/ICcjZmZmJyA6IGNvbG9yXG4gICAgICAgIH0pXG4gICAgICApXG5cbiAgICBsZXQgZ3JvdXBzID0gc2VsZWN0QWxsKCcuZ3JvdXAnKVxuXG4gICAgZ3JvdXBzLmVhY2goKGcsIGdpLCBub2RlcykgPT4ge1xuICAgICAgbGV0IHBlcmNlbnRPYmogPSB7fVxuXG4gICAgICBjb3VudHJpZXMuZm9yRWFjaChjb3VudHJ5ID0+IHtcbiAgICAgICAgcGVyY2VudE9ialtjb3VudHJ5XSA9IEFycmF5KE1hdGgucm91bmQoKGdbY291bnRyeV0gLyAxMDApICogMTAwKSkuZmlsbCh7XG4gICAgICAgICAgc3RhdGU6IGcuY29kZSxcbiAgICAgICAgICBjb3VudHJ5OiBjb3VudHJ5XG4gICAgICAgIH0pXG4gICAgICB9KVxuXG4gICAgICBsZXQgcGVyY2VudCA9IFtdXG5cbiAgICAgIGRpZmYgPSBjb3VudHJpZXMuZmlsdGVyKGkgPT4ga2V5RmlsdGVyLmluZGV4T2YoaSkgPCAwKVxuXG4gICAgICBkaWZmLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHBlcmNlbnQgPSBwZXJjZW50LmNvbmNhdChwZXJjZW50T2JqW2NdKVxuICAgICAgfSlcblxuICAgICAga2V5RmlsdGVyLmZvckVhY2goYyA9PiB7XG4gICAgICAgIHBlcmNlbnQgPSBwZXJjZW50LmNvbmNhdChwZXJjZW50T2JqW2NdKVxuICAgICAgfSlcblxuICAgICAgcGVyY2VudCA9IEFycmF5KDEwMCAtIHBlcmNlbnQubGVuZ3RoKVxuICAgICAgICAuZmlsbCh7XG4gICAgICAgICAgc3RhdGU6IGcuY29kZSxcbiAgICAgICAgICBjb3VudHJ5OiAnb3RoZXInXG4gICAgICAgIH0pXG4gICAgICAgIC5jb25jYXQocGVyY2VudClcblxuICAgICAgbGV0IHBhcmVudFggPSBzZWxlY3Qobm9kZXNbZ2ldKS5hdHRyKCd4JylcbiAgICAgIGxldCBwYXJlbnRZID0gc2VsZWN0KG5vZGVzW2dpXSkuYXR0cigneScpXG5cbiAgICAgIGxldCBwZXJjZW50cyA9IHNlbGVjdChub2Rlc1tnaV0pXG4gICAgICAgIC5zZWxlY3RBbGwoYC5wZXJjZW50LiR7Zy5jb2RlfWApXG4gICAgICAgIC5kYXRhKHBlcmNlbnQsIGQgPT4gZClcblxuICAgICAgcGVyY2VudHMuZXhpdCgpLnJlbW92ZSgpXG5cbiAgICAgIHBlcmNlbnRzXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgICAuYXR0cignd2lkdGgnLCAoY2VsbFNpemUgLSBwYWRkaW5nIC8gMikgLyAxMClcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIChjZWxsU2l6ZSAtIHBhZGRpbmcgLyAyKSAvIDEwKVxuICAgICAgICAuYXR0cignc3Ryb2tlJywgJyNmZmYnKVxuICAgICAgICAuYXR0cignc3Ryb2tlLXdpZHRoJywgJzAuMjVweCcpXG4gICAgICAgIC5tZXJnZShwZXJjZW50cylcbiAgICAgICAgLmF0dHIoJ2NsYXNzJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBgcGVyY2VudCAke2cuY29kZX0gJHtkLmNvdW50cnl9YFxuICAgICAgICB9KVxuICAgICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGRpKSB7XG4gICAgICAgICAgbGV0IHN3aXRjaEluZGV4ID0gcGVyY2VudC5maW5kSW5kZXgoXG4gICAgICAgICAgICBwID0+ICEoWy4uLmRpZmYsICdvdGhlciddLmluZGV4T2YocC5jb3VudHJ5KSA+IC0xKVxuICAgICAgICAgIClcblxuICAgICAgICAgIHN3aXRjaEluZGV4ID0gc3dpdGNoSW5kZXggPj0gMCA/IHN3aXRjaEluZGV4IDogbnVsbFxuXG4gICAgICAgICAgbGV0IHJldmVyc2UgPVxuICAgICAgICAgICAgTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogMTAgPD0gTWF0aC5jZWlsKHN3aXRjaEluZGV4IC8gMTApICogMTBcbiAgICAgICAgICAgICAgPyBNYXRoLmFicyg5OSAtIGRpKVxuICAgICAgICAgICAgICA6IGRpXG5cbiAgICAgICAgICBsZXQgeCA9ICgocmV2ZXJzZSAlIDEwKSAqIChjZWxsU2l6ZSAtIDIpKSAvIDEwICsgcGFyc2VJbnQocGFyZW50WCwgMTApXG4gICAgICAgICAgcmV0dXJuIHggKyAyXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCwgZGkpIHtcbiAgICAgICAgICBsZXQgeSA9XG4gICAgICAgICAgICAoTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogKGNlbGxTaXplIC0gMikpIC8gMTAgK1xuICAgICAgICAgICAgcGFyc2VJbnQocGFyZW50WSwgMTApIC1cbiAgICAgICAgICAgIGNlbGxTaXplIC8gMTAgK1xuICAgICAgICAgICAgMVxuICAgICAgICAgIHJldHVybiB5ICsgMlxuICAgICAgICB9KVxuICAgICAgICAudHJhbnNpdGlvbigpXG4gICAgICAgIC5kdXJhdGlvbig2MDApXG4gICAgICAgIC5hdHRyKCdmaWxsJywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiBmaWxsU2NhbGUoZC5jb3VudHJ5KVxuICAgICAgICB9KVxuXG4gICAgICBsZXQgbGFiZWwgPSBzZWxlY3Qobm9kZXNbZ2ldKS5zZWxlY3RBbGwoYC5sYWJlbC4ke2cuY29kZX1gKVxuXG4gICAgICBsYWJlbC5yZW1vdmUoKVxuXG4gICAgICBsYWJlbCA9IHNlbGVjdChub2Rlc1tnaV0pXG4gICAgICAgIC5zZWxlY3RBbGwoYC5sYWJlbC4ke2cuY29kZX1gKVxuICAgICAgICAuZGF0YShbZ10pXG4gICAgICAgIC5lbnRlcigpXG4gICAgICAgIC5hcHBlbmQoJ3RleHQnKVxuICAgICAgICAuYXR0cignY2xhc3MnLCAnbGFiZWwgJyArIGcuY29kZSlcblxuICAgICAgbGFiZWxcbiAgICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIChkLmNvbCAtIDEpICogY2VsbFNpemUgKyBjZWxsU2l6ZSAvIDIgKyBwYWRkaW5nICogZC5jb2xcbiAgICAgICAgfSlcbiAgICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIChkLnJvdyAtIDEpICogY2VsbFNpemUgKyAoY2VsbFNpemUgLyAyIC0gMykgKyBwYWRkaW5nICogZC5yb3dcbiAgICAgICAgfSlcbiAgICAgICAgLnN0eWxlKCd0ZXh0LWFuY2hvcicsICdtaWRkbGUnKVxuICAgICAgICAudGV4dChnLmNvZGUpXG4gICAgfSlcblxuICAgIHNlbGVjdEFsbCgnLmdyb3VwJykub24oJ2NsaWNrJywgaW50ZXJhY3Rpb25zLnN0YXRlcy5jbGljaylcbiAgfVxuXG4gIGZ1bmN0aW9uIGRyYXdTdGF0ZSh4LCBkKSB7XG4gICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpLnJlbW92ZSgpXG5cbiAgICBmaWxsU2NhbGUgPSBzY2FsZU9yZGluYWwoKVxuICAgICAgLmRvbWFpbihbLi4uY291bnRyaWVzLCAnb3RoZXInXSlcbiAgICAgIC5yYW5nZShjb2xvcnMpXG5cbiAgICBsZXQgc3RhdGVEYXRhID0gZGF0YS5maWx0ZXIoc3RhdGUgPT4gc3RhdGUuY29kZSA9PT0gZC5jb2RlKVxuICAgIHdpZHRoID0gZHJhd0dyaWRNYXAud2lkdGgoKVxuICAgIGhlaWdodCA9IGRyYXdHcmlkTWFwLndpZHRoKClcbiAgICBsZXQgc3RhdGVTaXplID0gaGVpZ2h0ICogMC4zXG4gICAgbGV0IHN2ZyA9IGNvbnRhaW5lci5zZWxlY3RBbGwoJy5tYXAnKVxuXG4gICAgY29udGFpbmVyLnNlbGVjdEFsbCgnLmdyaWRtYXAnKVxuXG4gICAgc3ZnLmFwcGVuZCgnZycpLmF0dHIoJ2NsYXNzJywgJ3N0YXRlTW9kYWwnKVxuXG4gICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpXG4gICAgICAuYXBwZW5kKCdyZWN0JylcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIGhlaWdodClcbiAgICAgIC5hdHRyKCdmaWxsJywgJyMwMDAnKVxuICAgICAgLmF0dHIoJ29wYWNpdHknLCAnMC4zJylcblxuICAgIHNlbGVjdCgnLnN0YXRlTW9kYWwnKVxuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cignd2lkdGgnLCB3aWR0aCAqIDAuNzUpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICogMC40NSlcbiAgICAgIC5hdHRyKCd4Jywgd2lkdGggLyA3LjUpXG4gICAgICAuYXR0cigneScsIHdpZHRoIC8gNy41KVxuICAgICAgLmF0dHIoJ2ZpbGwnLCAnI2ZmZicpXG4gICAgICAuYXR0cignc3Ryb2tlJywgJyMwMDAnKVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsICcxLjVweCcpXG4gICAgICAuYXR0cigncGFpbnQtb3JkZXInLCAnc3Ryb2tlJylcblxuICAgIHNlbGVjdCgnLnN0YXRlTW9kYWwnKVxuICAgICAgLmFwcGVuZCgnZm9yZWlnbk9iamVjdCcpXG4gICAgICAuYXR0cignY3Vyc29yJywgJ3BvaW50ZXInKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLyAxMClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCBoZWlnaHQgLyAyMClcbiAgICAgIC5hdHRyKCd4Jywgd2lkdGggLSB3aWR0aCAvIDcuNSAtIHBhZGRpbmcgKiAyKVxuICAgICAgLmF0dHIoJ3knLCB3aWR0aCAvIDcuNSArIHBhZGRpbmcpXG4gICAgICAuYXBwZW5kKCd4aHRtbDpkaXYnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ2ljb24tY2xvc2UtbGcnKVxuICAgICAgLm9uKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpLnJlbW92ZSgpXG4gICAgICB9KVxuXG4gICAgc2VsZWN0KCcuc3RhdGVNb2RhbCcpXG4gICAgICAuc2VsZWN0QWxsKCcuc3RhdGVCb3JkZXInKVxuICAgICAgLmRhdGEoc3RhdGVEYXRhKVxuICAgICAgLmVudGVyKClcbiAgICAgIC5hcHBlbmQoJ3JlY3QnKVxuICAgICAgLmF0dHIoJ2NsYXNzJywgJ3N0YXRlQm9yZGVyJylcbiAgICAgIC5hdHRyKCdmaWxsJywgJyNmZmYnKVxuICAgICAgLmF0dHIoJ3N0cm9rZScsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGJvcmRlckNvbG9yU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3N0cm9rZS13aWR0aCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGJvcmRlcldpZHRoU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3gnLCB3aWR0aCAvIDUpXG4gICAgICAuYXR0cigneScsIHdpZHRoIC8gNSArIHBhZGRpbmcpXG4gICAgICAuYXR0cignd2lkdGgnLCBzdGF0ZVNpemUgLSAzKVxuICAgICAgLmF0dHIoJ2hlaWdodCcsIHN0YXRlU2l6ZSAtIDIpXG5cbiAgICBsZXQgcGVyY2VudE9iaiA9IHt9XG4gICAgY291bnRyaWVzLmZvckVhY2goY291bnRyeSA9PiB7XG4gICAgICBwZXJjZW50T2JqW2NvdW50cnldID0gQXJyYXkoXG4gICAgICAgIE1hdGgucm91bmQoKHN0YXRlRGF0YVswXVtjb3VudHJ5XSAvIDEwMCkgKiAxMDApXG4gICAgICApLmZpbGwoe1xuICAgICAgICBzdGF0ZTogc3RhdGVEYXRhWzBdLmNvZGUsXG4gICAgICAgIGNvdW50cnk6IGNvdW50cnlcbiAgICAgIH0pXG4gICAgfSlcblxuICAgIGxldCBwZXJjZW50ID0gW11cblxuICAgIGRpZmYgPSBjb3VudHJpZXMuZmlsdGVyKGkgPT4ga2V5RmlsdGVyLmluZGV4T2YoaSkgPCAwKVxuXG4gICAgZGlmZi5mb3JFYWNoKGMgPT4ge1xuICAgICAgcGVyY2VudCA9IHBlcmNlbnQuY29uY2F0KHBlcmNlbnRPYmpbY10pXG4gICAgfSlcblxuICAgIGtleUZpbHRlci5mb3JFYWNoKGMgPT4ge1xuICAgICAgcGVyY2VudCA9IHBlcmNlbnQuY29uY2F0KHBlcmNlbnRPYmpbY10pXG4gICAgfSlcblxuICAgIHBlcmNlbnQgPSBBcnJheSgxMDAgLSBwZXJjZW50Lmxlbmd0aClcbiAgICAgIC5maWxsKHtcbiAgICAgICAgc3RhdGU6IHN0YXRlRGF0YVswXS5jb2RlLFxuICAgICAgICBjb3VudHJ5OiAnb3RoZXInXG4gICAgICB9KVxuICAgICAgLmNvbmNhdChwZXJjZW50KVxuXG4gICAgbGV0IHBhcmVudFggPSBzZWxlY3QoJy5zdGF0ZUJvcmRlcicpLmF0dHIoJ3gnKVxuICAgIGxldCBwYXJlbnRZID0gc2VsZWN0KCcuc3RhdGVCb3JkZXInKS5hdHRyKCd5JylcblxuICAgIGxldCBwZXJjZW50cyA9IHNlbGVjdCgnLnN0YXRlTW9kYWwnKVxuICAgICAgLnNlbGVjdEFsbChgLnBlcmNlbnRNb2RhbC4ke3N0YXRlRGF0YVswXS5jb2RlfWApXG4gICAgICAuZGF0YShwZXJjZW50LCBkID0+IGQpXG4gICAgICAuZW50ZXIoKVxuICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiBgcGVyY2VudCAke3N0YXRlRGF0YVswXS5jb2RlfSAke2QuY291bnRyeX1gXG4gICAgICB9KVxuXG4gICAgICAuYXR0cignZmlsbCcsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuIGZpbGxTY2FsZShkLmNvdW50cnkpXG4gICAgICB9KVxuXG4gICAgICAuYXR0cigneCcsIGZ1bmN0aW9uKGQsIGRpKSB7XG4gICAgICAgIGxldCBzd2l0Y2hJbmRleCA9IHBlcmNlbnQuZmluZEluZGV4KFxuICAgICAgICAgIHAgPT4gIShbLi4uZGlmZiwgJ290aGVyJ10uaW5kZXhPZihwLmNvdW50cnkpID4gLTEpXG4gICAgICAgIClcblxuICAgICAgICBzd2l0Y2hJbmRleCA9IHN3aXRjaEluZGV4ID49IDAgPyBzd2l0Y2hJbmRleCA6IG51bGxcblxuICAgICAgICBsZXQgcmV2ZXJzZSA9XG4gICAgICAgICAgTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogMTAgPD0gTWF0aC5jZWlsKHN3aXRjaEluZGV4IC8gMTApICogMTBcbiAgICAgICAgICAgID8gTWF0aC5hYnMoOTkgLSBkaSlcbiAgICAgICAgICAgIDogZGlcblxuICAgICAgICBsZXQgeCA9ICgocmV2ZXJzZSAlIDEwKSAqIChzdGF0ZVNpemUgLSAyKSkgLyAxMCArIHBhcnNlSW50KHBhcmVudFgsIDEwKVxuICAgICAgICByZXR1cm4geCArIDJcbiAgICAgIH0pXG4gICAgICAuYXR0cigneScsIGZ1bmN0aW9uKGQsIGRpKSB7XG4gICAgICAgIGxldCB5ID1cbiAgICAgICAgICAoTWF0aC5jZWlsKChkaSArIDEpIC8gMTApICogKHN0YXRlU2l6ZSAtIDIpKSAvIDEwICtcbiAgICAgICAgICBwYXJzZUludChwYXJlbnRZLCAxMCkgLVxuICAgICAgICAgIHN0YXRlU2l6ZSAvIDEwICtcbiAgICAgICAgICAxXG4gICAgICAgIHJldHVybiB5ICsgMlxuICAgICAgfSlcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAwKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgKHN0YXRlU2l6ZSAtIG1vZGFsUGFkZGluZykgLyAxMClcbiAgICAgIC5hdHRyKCdoZWlnaHQnLCAoc3RhdGVTaXplIC0gbW9kYWxQYWRkaW5nKSAvIDEwKVxuXG4gICAgbGV0IGNvbHVtbjIgPSBwYXJzZUludChwYXJlbnRYLCAxMCkgKyBzdGF0ZVNpemUgKyBwYWRkaW5nXG5cbiAgICBzZWxlY3QoJy5zdGF0ZU1vZGFsJylcbiAgICAgIC5hcHBlbmQoJ2ZvcmVpZ25PYmplY3QnKVxuICAgICAgLmF0dHIoJ3gnLCBjb2x1bW4yKVxuICAgICAgLmF0dHIoJ3knLCBwYXJzZUludChwYXJlbnRZLCAxMCkgLSBwYWRkaW5nKVxuICAgICAgLmF0dHIoJ3dpZHRoJywgd2lkdGggLSBzdGF0ZVNpemUpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0KVxuICAgICAgLmFwcGVuZCgneGh0bWw6ZGl2JykuaHRtbChgPGRpdiBjbGFzcz1cIm1vZGFsLWhlYWRpbmdcIj5cbiAgICAgICAgICAgICAgICAke2Quc3RhdGV9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibW9kYWwtYm9keVwiPlxuICAgICAgICAgICAgICAgICQke2RvbGxhckZvcm1hdHRlcihkLnRvdGFsZG9sbGFycykucmVwbGFjZShcbiAgICAgICAgICAgICAgICAgIC9HLyxcbiAgICAgICAgICAgICAgICAgICdCJ1xuICAgICAgICAgICAgICAgICl9IFRvdGFsIFRyYWRlICgyMDE3KVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPHVsIGNsYXNzPVwibW9kYWwtbGlzdFwiPlxuICAgICAgICAgICAgICAke2NvdW50cmllc1xuICAgICAgICAgICAgICAgIC5tYXAoXG4gICAgICAgICAgICAgICAgICBjID0+XG4gICAgICAgICAgICAgICAgICAgIGA8bGkgY2xhc3M9XCIke2N9XCI+JHtjLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICtcbiAgICAgICAgICAgICAgICAgICAgICBjLnNsaWNlKDEpfTogJHtcbiAgICAgICAgICAgICAgICAgICAgICBzdGF0ZURhdGFbMF1bY10gPyBwZXJjZW50Rm9ybWF0dGVyKHN0YXRlRGF0YVswXVtjXSkgOiAwXG4gICAgICAgICAgICAgICAgICAgIH0lPC9saT4gYFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuam9pbignJyl9XG5cbiAgICAgICAgICAgICAgPC91bD4gPGRpdiBjbGFzcz1cIm1vZGFsLWZvb3RlclwiPlxuICAgICAgICAgICAgICAgICAgJHtwZXJjZW50Rm9ybWF0dGVyKGQuZ3JhbmR0b3RhbCl9JSBvZiBUb3RhbCAoMjAxNylcbiAgICAgICAgICAgICAgICA8L2Rpdj5gKVxuICB9XG5cbiAgZnVuY3Rpb24gZHJhd0dyaWRNYXAoKSB7XG4gICAgd2lkdGggPSBkcmF3R3JpZE1hcC53aWR0aCgpXG4gICAgaGVpZ2h0ID0gZHJhd0dyaWRNYXAud2lkdGgoKSAqIDAuOFxuICAgIC8vIGNhbGN1bGF0ZSBjZWxsU2l6ZSBiYXNlZCBvbiBkaW1lbnNpb25zIG9mIHN2Z1xuICAgIGNlbGxTaXplID0gY2FsY0NlbGxTaXplKFxuICAgICAgd2lkdGggLSBjb2x1bW5zICogcGFkZGluZyAtIG1hcmdpbi5yaWdodCAtIG1hcmdpbi5sZWZ0LFxuICAgICAgaGVpZ2h0IC0gY29sdW1ucyAqIHBhZGRpbmcgLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbSxcbiAgICAgIGNvbHVtbnMsXG4gICAgICByb3dzXG4gICAgKVxuXG4gICAgLy8gZ2VuZXJhdGUgZ3JpZCBkYXRhIHdpdGggc3BlY2lmaWVkIG51bWJlciBvZiBjb2x1bW5zIGFuZCByb3dzXG4gICAgbGV0IGdyaWREYXRhID0gZ3JpZEdyYXBoKGNvbHVtbnMsIHJvd3MsIGNlbGxTaXplKVxuXG4gICAgbGV0IHN2Z05vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm1hcCcpLmxlbmd0aFxuICAgIGxldCBzdmcgPSBzdmdOb2Rlc1xuICAgICAgPyBjb250YWluZXIuc2VsZWN0QWxsKCcubWFwJylcbiAgICAgIDogc2VsZWN0KCcuY2hhcnQnKS5hcHBlbmQoJ3N2ZycpXG5cbiAgICBzdmdcbiAgICAgIC5hdHRyKCd3aWR0aCcsIHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpXG4gICAgICAuYXR0cignaGVpZ2h0JywgaGVpZ2h0ICsgbWFyZ2luLnRvcCArIG1hcmdpbi5ib3R0b20pXG4gICAgICAuYXR0cignY2xhc3MnLCAnbWFwJylcbiAgICAgIC5hdHRyKFxuICAgICAgICAndmlld0JveCcsXG4gICAgICAgICcwIDAgJyArXG4gICAgICAgICAgKHdpZHRoICsgbWFyZ2luLmxlZnQgKyBtYXJnaW4ucmlnaHQpICtcbiAgICAgICAgICAnICcgK1xuICAgICAgICAgIChoZWlnaHQgKyBtYXJnaW4udG9wICsgbWFyZ2luLmJvdHRvbSlcbiAgICAgIClcblxuICAgIHNlbGVjdEFsbCgnaW5wdXQnKS5vbignY2xpY2snLCBpbnRlcmFjdGlvbnMua2V5LmNsaWNrKVxuXG4gICAgbGV0IGdyaWRNYXBOb2RlcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5ncmlkbWFwJykubGVuZ3RoXG4gICAgbGV0IGdyaWRNYXAgPSBncmlkTWFwTm9kZXNcbiAgICAgID8gY29udGFpbmVyLnNlbGVjdEFsbCgnLmdyaWRtYXAnKVxuICAgICAgOiBzdmcuYXBwZW5kKCdnJykuYXR0cignY2xhc3MnLCAnZ3JpZG1hcCcpXG4gICAgLy8gLmF0dHIoXG4gICAgLy8gICAndHJhbnNmb3JtJyxcbiAgICAvLyAgICd0cmFuc2xhdGUoJyArIG1hcmdpbi5sZWZ0ICsgJywnICsgbWFyZ2luLnRvcCArICcpJ1xuICAgIC8vIClcblxuICAgIGxldCBncm91cE5vZGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmdyb3VwJykubGVuZ3RoXG4gICAgbGV0IGdyb3VwcyA9IGdyb3VwTm9kZXNcbiAgICAgID8gZ3JpZE1hcC5zZWxlY3RBbGwoJy5ncm91cCcpXG4gICAgICA6IGdyaWRNYXBcbiAgICAgICAgICAuc2VsZWN0QWxsKCcuZ3JvdXAnKVxuICAgICAgICAgIC5kYXRhKGRhdGEpXG4gICAgICAgICAgLmVudGVyKClcbiAgICAgICAgICAuYXBwZW5kKCdnJylcbiAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2dyb3VwICcgKyBkLmNvZGVcbiAgICAgICAgICB9KVxuXG4gICAgZ3JvdXBzXG4gICAgICAuZGF0YShkYXRhKVxuICAgICAgLmF0dHIoJ3gnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAoZC5jb2wgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQuY29sXG4gICAgICB9KVxuICAgICAgLmF0dHIoJ3knLCBmdW5jdGlvbihkKSB7XG4gICAgICAgIHJldHVybiAoZC5yb3cgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQucm93XG4gICAgICB9KVxuXG4gICAgbGV0IGJyZWFrcG9pbnQgPSBnZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmJvZHkpLmdldFByb3BlcnR5VmFsdWUoXG4gICAgICAnLS1icmVha3BvaW50J1xuICAgIClcblxuICAgIGlmIChicmVha3BvaW50ICE9PSAnXCJ4c21hbGxcIicpIHtcbiAgICAgIGdyaWRNYXBcbiAgICAgICAgLnNlbGVjdEFsbCgnLmdyb3VwJylcbiAgICAgICAgLm9uKCdtb3VzZW92ZXInLCBpbnRlcmFjdGlvbnMuc3RhdGVzLm1vdXNlb3ZlcilcbiAgICAgICAgLm9uKCdtb3VzZWxlYXZlJywgaW50ZXJhY3Rpb25zLnN0YXRlcy5tb3VzZWxlYXZlKVxuICAgIH1cblxuICAgIGdyb3Vwcy5lYWNoKChnLCBnaSwgbm9kZXMpID0+IHtcbiAgICAgIGxldCBzdGF0ZU5vZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc3RhdGUuJHtnLmNvZGV9YClcbiAgICAgIGxldCBzdGF0ZSA9IHN0YXRlTm9kZVxuICAgICAgICA/IHNlbGVjdChub2Rlc1tnaV0pLnNlbGVjdEFsbChgLnN0YXRlLiR7Zy5jb2RlfWApXG4gICAgICAgIDogc2VsZWN0KG5vZGVzW2dpXSlcbiAgICAgICAgICAgIC5zZWxlY3RBbGwoJy5zdGF0ZScpXG4gICAgICAgICAgICAuZGF0YShbZ10pXG4gICAgICAgICAgICAuZW50ZXIoKVxuICAgICAgICAgICAgLmFwcGVuZCgncmVjdCcpXG4gICAgICAgICAgICAuYXR0cignY2xhc3MnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgICAgIHJldHVybiAnc3RhdGUgJyArIGQuY29kZVxuICAgICAgICAgICAgfSlcblxuICAgICAgc3RhdGVcbiAgICAgICAgLmF0dHIoJ2ZpbGwnLCAnI2ZmZicpXG4gICAgICAgIC5hdHRyKCdzdHJva2UnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGJvcmRlckNvbG9yU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCdzdHJva2Utd2lkdGgnLCBmdW5jdGlvbihkKSB7XG4gICAgICAgICAgcmV0dXJuIGJvcmRlcldpZHRoU2NhbGUoZC50b3RhbGRvbGxhcnMpXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd4JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiAoZC5jb2wgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQuY29sXG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd5JywgZnVuY3Rpb24oZCkge1xuICAgICAgICAgIHJldHVybiAoZC5yb3cgLSAxKSAqIGNlbGxTaXplICsgcGFkZGluZyAqIGQucm93XG4gICAgICAgIH0pXG4gICAgICAgIC5hdHRyKCd3aWR0aCcsIGNlbGxTaXplICsgMilcbiAgICAgICAgLmF0dHIoJ2hlaWdodCcsIGNlbGxTaXplICsgMilcbiAgICB9KVxuICB9XG5cbiAgLy8gZnVuY3Rpb24gdGhhdCBnZW5lcmF0ZXMgYSBuZXN0ZWQgYXJyYXkgZm9yIHNxdWFyZSBncmlkXG4gIGZ1bmN0aW9uIGdyaWRHcmFwaChuY29sLCBucm93LCBjZWxsc2l6ZSkge1xuICAgIGxldCBncmlkRGF0YSA9IFtdXG4gICAgbGV0IHhwb3MgPSAxIC8vIHN0YXJ0aW5nIHhwb3MgYW5kIHlwb3MgYXQgMSBzbyB0aGUgc3Ryb2tlIHdpbGwgc2hvdyB3aGVuIHdlIG1ha2UgdGhlIGdyaWQgYmVsb3dcbiAgICBsZXQgeXBvcyA9IDFcblxuICAgIC8vIGNhbGN1bGF0ZSB3aWR0aCBhbmQgaGVpZ2h0IG9mIHRoZSBjZWxsIGJhc2VkIG9uIHdpZHRoIGFuZCBoZWlnaHQgb2YgdGhlIGNhbnZhc1xuICAgIGxldCBjZWxsU2l6ZSA9IGNlbGxzaXplXG5cbiAgICAvLyBpdGVyYXRlIGZvciByb3dzXG4gICAgZm9yIChsZXQgcm93ID0gMDsgcm93IDwgbnJvdzsgcm93KyspIHtcbiAgICAgIGdyaWREYXRhLnB1c2goW10pXG5cbiAgICAgIC8vIGl0ZXJhdGUgZm9yIGNlbGxzL2NvbHVtbnMgaW5zaWRlIGVhY2ggcm93XG4gICAgICBmb3IgKGxldCBjb2wgPSAwOyBjb2wgPCBuY29sOyBjb2wrKykge1xuICAgICAgICBncmlkRGF0YVtyb3ddLnB1c2goe1xuICAgICAgICAgIHg6IHhwb3MsXG4gICAgICAgICAgeTogeXBvcyxcbiAgICAgICAgICB3aWR0aDogY2VsbFNpemUsXG4gICAgICAgICAgaGVpZ2h0OiBjZWxsU2l6ZVxuICAgICAgICB9KVxuXG4gICAgICAgIC8vIGluY3JlbWVudCB4IHBvc2l0aW9uIChtb3Zpbmcgb3ZlciBieSA1MClcbiAgICAgICAgeHBvcyArPSBjZWxsU2l6ZVxuICAgICAgfVxuXG4gICAgICAvLyByZXNldCB4IHBvc2l0aW9uIGFmdGVyIGEgcm93IGlzIGNvbXBsZXRlXG4gICAgICB4cG9zID0gMVxuICAgICAgLy8gaW5jcmVtZW50IHkgcG9zaXRpb24gKG1vdmluZyBkb3duIGJ5IDUwKVxuICAgICAgeXBvcyArPSBjZWxsU2l6ZVxuICAgIH1cbiAgICByZXR1cm4gZ3JpZERhdGFcbiAgfVxuXG4gIC8vIGZ1bmN0aW9uIHRvIGNhbGN1bGF0ZSBncmlkIGNlbGwgc2l6ZSBiYXNlZCBvbiB3aWR0aCBhbmQgaGVpZ2h0IG9mIHN2Z1xuICBmdW5jdGlvbiBjYWxjQ2VsbFNpemUodywgaCwgbmNvbCwgbnJvdykge1xuICAgIC8vIGxlYXZlIHRpbnkgc3BhY2UgaW4gbWFyZ2luc1xuICAgIGxldCBncmlkV2lkdGggPSB3IC0gMlxuICAgIGxldCBncmlkSGVpZ2h0ID0gaCAtIDJcbiAgICBsZXQgY2VsbFNpemVcblxuICAgIC8vIGNhbGN1bGF0ZSBzaXplIG9mIGNlbGxzIGluIGNvbHVtbnMgYWNyb3NzXG4gICAgbGV0IGNvbFdpZHRoID0gTWF0aC5mbG9vcihncmlkV2lkdGggLyBuY29sKVxuICAgIC8vIGNhbGN1bGF0ZSBzaXplIG9mIGNlbGxzIGluIHJvd3MgZG93blxuICAgIGxldCByb3dXaWR0aCA9IE1hdGguZmxvb3IoZ3JpZEhlaWdodCAvIG5yb3cpXG5cbiAgICAvLyB0YWtlIHRoZSBzbWFsbGVyIG9mIHRoZSBjYWxjdWxhdGVkIGNlbGwgc2l6ZXNcbiAgICBpZiAoY29sV2lkdGggPD0gcm93V2lkdGgpIHtcbiAgICAgIGNlbGxTaXplID0gY29sV2lkdGhcbiAgICB9IGVsc2Uge1xuICAgICAgY2VsbFNpemUgPSByb3dXaWR0aFxuICAgIH1cbiAgICByZXR1cm4gY2VsbFNpemVcbiAgfVxuXG4gIGRyYXdHcmlkTWFwLndpZHRoID0gZnVuY3Rpb24oLi4uYXJncykge1xuICAgIGlmICghYXJncy5sZW5ndGgpIHJldHVybiB3aWR0aFxuICAgIHdpZHRoID0gYXJnc1swXSAtIG1hcmdpbi5sZWZ0IC0gbWFyZ2luLnJpZ2h0XG4gIH1cblxuICBkcmF3R3JpZE1hcC5oZWlnaHQgPSBmdW5jdGlvbiguLi5hcmdzKSB7XG4gICAgaWYgKCFhcmdzLmxlbmd0aCkgcmV0dXJuIGhlaWdodFxuICAgIGhlaWdodCA9IGFyZ3NbMF0gLSBtYXJnaW4udG9wIC0gbWFyZ2luLmJvdHRvbVxuICB9XG5cbiAgY29uc3QgaW50ZXJhY3Rpb25zID0ge1xuICAgIGtleToge1xuICAgICAgY2xpY2soZCkge1xuICAgICAgICBzZWxlY3QoJy5zdGF0ZU1vZGFsJykucmVtb3ZlKClcbiAgICAgICAgbGV0IGV4Y2x1ZGVkID0gWydsZWdlbmQtbGFiZWwnLCAnYWN0aXZlJywgJ290aGVyJywgJ2FsbCddXG5cbiAgICAgICAgbGV0IGNsYXNzTGlzdCA9IHRoaXMuY2xhc3NMaXN0XG5cbiAgICAgICAgbGV0IGlzQWxsID0gY2xhc3NMaXN0LmNvbnRhaW5zKCdhbGwnKVxuICAgICAgICBsZXQgaXNBY3RpdmUgPSB0aGlzLmNoZWNrZWRcbiAgICAgICAgbGV0IGlzQWxsU2VsZWN0ZWQgPSBzZWxlY3QoJ2lucHV0LmFsbCcpLm5vZGUoKS5jaGVja2VkXG4gICAgICAgIGxldCBjb3VudHJ5ID0gWy4uLmNsYXNzTGlzdF0uZmluZChjID0+ICEoZXhjbHVkZWQuaW5kZXhPZihjKSA+IC0xKSlcbiAgICAgICAgbGV0IGFsbCA9IHNlbGVjdCgnaW5wdXQuYWxsJykubm9kZSgpXG5cbiAgICAgICAgaWYgKGNvdW50cnkgJiYga2V5RmlsdGVyLmluZGV4T2YoY291bnRyeSkgPiAtMSkge1xuICAgICAgICAgIGtleUZpbHRlciA9IGtleUZpbHRlci5maWx0ZXIoYyA9PiBjICE9PSBjb3VudHJ5KVxuICAgICAgICAgIGFsbC5jaGVja2VkID0gZmFsc2VcbiAgICAgICAgfSBlbHNlIGlmIChjb3VudHJ5KSB7XG4gICAgICAgICAga2V5RmlsdGVyLnVuc2hpZnQoY291bnRyeSlcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChrZXlGaWx0ZXIubGVuZ3RoICE9PSA0KSB7XG4gICAgICAgICAgYWxsLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNlbGVjdCgnaW5wdXQuYWxsJykubm9kZSgpLmNoZWNrZWQgPSB0cnVlXG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNBbGwgJiYgaXNBY3RpdmUpIHtcbiAgICAgICAgICBrZXlGaWx0ZXIgPSBjb3VudHJpZXNcbiAgICAgICAgICBzZWxlY3RBbGwoJ2lucHV0JykuZWFjaCgoZywgZ2ksIG5vZGVzKSA9PiB7XG4gICAgICAgICAgICBub2Rlc1tnaV0uY2hlY2tlZCA9IHRydWVcbiAgICAgICAgICB9KVxuICAgICAgICB9IGVsc2UgaWYgKGlzQWxsICYmICFpc0FjdGl2ZSkge1xuICAgICAgICAgIGtleUZpbHRlciA9IFtdXG4gICAgICAgICAgc2VsZWN0QWxsKCdpbnB1dCcpLmVhY2goKGcsIGdpLCBub2RlcykgPT4ge1xuICAgICAgICAgICAgbm9kZXNbZ2ldLmNoZWNrZWQgPSBmYWxzZVxuICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICAgICAgY29udGFpbmVyLmNhbGwoY2hhcnQuZHJhd1BlcmNlbnRzKVxuICAgICAgfVxuICAgIH0sXG5cbiAgICBzdGF0ZXM6IHtcbiAgICAgIG1vdXNlb3ZlcihkKSB7XG4gICAgICAgIGludGVyYWN0aW9ucy5zdGF0ZXMuc2hvd1Rvb2x0aXAoZClcbiAgICAgIH0sXG4gICAgICBtb3VzZWxlYXZlKGQpIHtcbiAgICAgICAgdG9vbHRpcC5oaWRlKClcbiAgICAgIH0sXG4gICAgICBjbGljayhkKSB7XG4gICAgICAgIHRvb2x0aXAuaGlkZSgpXG4gICAgICAgIGFjdGl2ZVN0YXRlID0gZFxuICAgICAgICBjb250YWluZXIuY2FsbChjaGFydC5kcmF3U3RhdGUsIGQpXG4gICAgICB9LFxuICAgICAgc2hvd1Rvb2x0aXAoZCkge1xuICAgICAgICBsZXQgdG9vbHRpcENvbnRlbnQgPSBgXG4gICAgICAgIDxwIGNsYXNzPVwidG9vbHRpcC1oZWFkaW5nXCI+XG4gICAgICAgICAgJHtkLnN0YXRlfVxuICAgICAgICA8L3A+XG4gICAgICAgIDxwIGNsYXNzPVwidG9vbHRpcC1ib2R5XCI+XG4gICAgICAgICAgJCR7ZG9sbGFyRm9ybWF0dGVyKGQudG90YWxkb2xsYXJzKS5yZXBsYWNlKFxuICAgICAgICAgICAgL0cvLFxuICAgICAgICAgICAgJ0InXG4gICAgICAgICAgKX0gVG90YWwgVHJhZGUgKDIwMTcpXG4gICAgICAgIDwvcD5cbiAgICAgICAgPHVsIGNsYXNzPVwidG9vbHRpcC1saXN0XCI+XG4gICAgICAgICR7Y291bnRyaWVzXG4gICAgICAgICAgLm1hcChcbiAgICAgICAgICAgIGMgPT5cbiAgICAgICAgICAgICAgYDxsaSBjbGFzcz1cIiR7Y31cIj4ke2MuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBjLnNsaWNlKDEpfTogJHtcbiAgICAgICAgICAgICAgICBkW2NdID8gcGVyY2VudEZvcm1hdHRlcihkW2NdKSA6IDBcbiAgICAgICAgICAgICAgfSU8L2xpPmBcbiAgICAgICAgICApXG4gICAgICAgICAgLmpvaW4oJycpfVxuXG4gICAgICAgIDwvdWw+XG4gICAgICAgIDxwIGNsYXNzPVwidG9vbHRpcC1mb290ZXJcIj5cbiAgICAgICAgICAke3BlcmNlbnRGb3JtYXR0ZXIoZC5ncmFuZHRvdGFsKX0lIG9mIFRvdGFsICgyMDE3KVxuICAgICAgICA8L3A+XG4gICAgICAgIGBcbiAgICAgICAgdG9vbHRpcC5zaG93KHRvb2x0aXBDb250ZW50KVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IGRyYXdHcmlkTWFwLCBkcmF3UGVyY2VudHMsIGRyYXdTdGF0ZSwgaW50ZXJhY3Rpb25zIH1cbn1cblxuZnVuY3Rpb24gaW5pdChkYXRhKSB7XG4gIGNvbnRhaW5lci5kYXR1bShkYXRhKVxuICBjaGFydCA9IGRyYXcoZGF0YSlcbiAgcmVzaXplKClcbn1cblxuZnVuY3Rpb24gcmVzaXplKCkge1xuICBpZiAoY2hhcnQpIHtcbiAgICBjb25zdCBwYXJlbnRXaWR0aCA9IGNvbnRhaW5lci5ub2RlKCkub2Zmc2V0V2lkdGhcbiAgICBjaGFydC5kcmF3R3JpZE1hcC53aWR0aChwYXJlbnRXaWR0aClcbiAgICBjaGFydC5kcmF3R3JpZE1hcC5oZWlnaHQocGFyZW50V2lkdGgpICogMC45XG4gICAgY29udGFpbmVyLmNhbGwoY2hhcnQuZHJhd0dyaWRNYXApXG4gICAgY29udGFpbmVyLmNhbGwoY2hhcnQuZHJhd1BlcmNlbnRzKVxuXG4gICAgaWYgKHNlbGVjdCgnLnN0YXRlTW9kYWwnKS5zaXplKCkpIHtcbiAgICAgIHNlbGVjdCgnLnN0YXRlTW9kYWwnKS5yZW1vdmUoKVxuICAgICAgY2hhcnQuaW50ZXJhY3Rpb25zLnN0YXRlcy5jbGljayhhY3RpdmVTdGF0ZSlcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgeyBpbml0LCBkcmF3LCByZXNpemUgfVxuIiwiaW1wb3J0ICcuL3Njc3MvbWFpbi5zY3NzJ1xuaW1wb3J0IHsgZXh0ZW50IH0gZnJvbSAnZDMtYXJyYXknXG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICdkMy1mb3JtYXQnXG5pbXBvcnQgKiBhcyBkM0ZldGNoIGZyb20gJ2QzLWZldGNoJ1xuXG5pbXBvcnQgY2hhcnQgZnJvbSAnLi9qcy9jaGFydCdcbmNvbnN0IGRhdGFTcmMgPSAnLi9kYXRhL2RhdGEuY3N2J1xuXG5sZXQgZGF0YVxuXG5mdW5jdGlvbiBsb2FkRGF0YSgpIHtcbiAgY29uc3QgZGF0YVByb21pc2UgPSBkM0ZldGNoLmNzdihkYXRhU3JjKVxuICBsZXQgcmVzdWx0ID0gUHJvbWlzZS5hbGwoW2RhdGFQcm9taXNlXSlcbiAgICAudGhlbihyZXMgPT4ge1xuICAgICAgY29uc3QgW2RhdGFSZXNwb25zZV0gPSByZXNcblxuICAgICAgZGF0YSA9IGRhdGFSZXNwb25zZVxuICAgICAgcmV0dXJuXG4gICAgfSlcbiAgICAudGhlbigoKSA9PiB7XG4gICAgICBsZXQgbWluTWF4ID0gZXh0ZW50KGRhdGEsIGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgcmV0dXJuICtkLnRvdGFsZG9sbGFyc1xuICAgICAgfSlcblxuICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1pbicpLmlubmVySFRNTCA9XG4gICAgICAgICckJyArIGZvcm1hdCgnLC4wZicpKG1pbk1heFswXSkucmVwbGFjZSgvRy8sICdCJylcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tYXgnKS5pbm5lckhUTUwgPVxuICAgICAgICAnJCcgKyBmb3JtYXQoJywuMGYnKShtaW5NYXhbMV0pLnJlcGxhY2UoL0cvLCAnQicpXG4gICAgICBjaGFydC5pbml0KGRhdGEpXG4gICAgfSlcbn1cblxubG9hZERhdGEoKVxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGNoYXJ0LnJlc2l6ZSlcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwiQG1lZGlhIFwiLmNvbmNhdChvYmoubWVkaWEsIFwiIHtcIik7XG4gIH1cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cbiAgY3NzICs9IG9iai5jc3M7XG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH1cblxuICAvLyBGb3Igb2xkIElFXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBzdHlsZUVsZW1lbnQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQpO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIGlmICh0eXBlb2YgZG9jdW1lbnQgPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUoKSB7fSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2dldFVybC5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL3RyYWRlZ3V5cy5lb3Q/NDg3OTI1MDdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMV9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy90cmFkZWd1eXMud29mZjI/NDg3OTI1MDdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfMl9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy90cmFkZWd1eXMud29mZj80ODc5MjUwN1wiLCBpbXBvcnQubWV0YS51cmwpO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8zX19fID0gbmV3IFVSTChcIi4uL2ZvbnRzL3RyYWRlZ3V5cy50dGY/NDg3OTI1MDdcIiwgaW1wb3J0Lm1ldGEudXJsKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfNF9fXyA9IG5ldyBVUkwoXCIuLi9mb250cy90cmFkZWd1eXMuc3ZnPzQ4NzkyNTA3XCIsIGltcG9ydC5tZXRhLnVybCk7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzBfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzFfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8wX19fLCB7IGhhc2g6IFwiI2llZml4XCIgfSk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzFfX18pO1xudmFyIF9fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX18gPSBfX19DU1NfTE9BREVSX0dFVF9VUkxfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfVVJMX0lNUE9SVF8yX19fKTtcbnZhciBfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF80X19fID0gX19fQ1NTX0xPQURFUl9HRVRfVVJMX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX1VSTF9JTVBPUlRfM19fXyk7XG52YXIgX19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfNV9fXyA9IF9fX0NTU19MT0FERVJfR0VUX1VSTF9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9VUkxfSU1QT1JUXzRfX18sIHsgaGFzaDogXCIjdHJhZGVndXlzXCIgfSk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYEBmb250LWZhY2V7Zm9udC1mYW1pbHk6dHJhZGVndXlzO2ZvbnQtc3R5bGU6bm9ybWFsO2ZvbnQtd2VpZ2h0OjQwMDtzcmM6dXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMF9fX30pO3NyYzp1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF8xX19ffSkgZm9ybWF0KFwiZW1iZWRkZWQtb3BlbnR5cGVcIiksdXJsKCR7X19fQ1NTX0xPQURFUl9VUkxfUkVQTEFDRU1FTlRfMl9fX30pIGZvcm1hdChcIndvZmYyXCIpLHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzNfX199KSBmb3JtYXQoXCJ3b2ZmXCIpLHVybCgke19fX0NTU19MT0FERVJfVVJMX1JFUExBQ0VNRU5UXzRfX199KSBmb3JtYXQoXCJ0cnVldHlwZVwiKSx1cmwoJHtfX19DU1NfTE9BREVSX1VSTF9SRVBMQUNFTUVOVF81X19ffSkgZm9ybWF0KFwic3ZnXCIpfVtjbGFzcyo9XCIgaWNvbi1cIl06YmVmb3JlLFtjbGFzc149aWNvbi1dOmJlZm9yZXtmb250LWZhbWlseTp0cmFkZWd1eXM7Zm9udC1zdHlsZTpub3JtYWw7Zm9udC13ZWlnaHQ6NDAwO3NwZWFrOm5vbmU7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC12YXJpYW50Om5vcm1hbDtsaW5lLWhlaWdodDoxZW07bWFyZ2luLWxlZnQ6LjJlbTttYXJnaW4tcmlnaHQ6LjJlbTt0ZXh0LWFsaWduOmNlbnRlcjt0ZXh0LWRlY29yYXRpb246aW5oZXJpdDt0ZXh0LXRyYW5zZm9ybTpub25lO3dpZHRoOjFlbTstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZX0uaWNvbi1lbWFpbDpiZWZvcmV7Y29udGVudDpcIu6ggVwifS5pY29uLXByaW50OmJlZm9yZXtjb250ZW50Olwi7qCEXCJ9Lmljb24tbGluazpiZWZvcmV7Y29udGVudDpcIu6ghVwifS5pY29uLWljb25fY2hlY2s6YmVmb3Jle2NvbnRlbnQ6XCLuobhcIn0uaWNvbi10cmFuc2NyaXB0OmJlZm9yZXtjb250ZW50Olwi7qKbXCJ9Lmljb24teW91dHViZTpiZWZvcmV7Y29udGVudDpcIu6mg1wifS5pY29uLWFuZ2xlLWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XCLuppJcIn0uaWNvbi1hbmdsZS1yaWdodDpiZWZvcmV7Y29udGVudDpcIu6mk1wifS5pY29uLWFycm93LWxlZnQ6YmVmb3Jle2NvbnRlbnQ6XCLupp1cIn0uaWNvbi1hcnJvdy1yaWdodDpiZWZvcmV7Y29udGVudDpcIu6mnlwifS5pY29uLWNsb3NlLWxnOmJlZm9yZXtjb250ZW50Olwi7qa9XCJ9Lmljb24tcGx1cy1sZzpiZWZvcmV7Y29udGVudDpcIu6qgVwifS5pY29uLXJzczpiZWZvcmV7Y29udGVudDpcIu6vrlwifS5pY29uLXZpZGVvOmJlZm9yZXtjb250ZW50Olwi7q+wXCJ9Lmljb24tcXVvdGU6YmVmb3Jle2NvbnRlbnQ6XCLur7FcIn0uaWNvbi1tZW51OmJlZm9yZXtjb250ZW50Olwi7q+yXCJ9Lmljb24tcGF1c2U6YmVmb3Jle2NvbnRlbnQ6XCLvgI5cIn0uaWNvbi1wbGF5OmJlZm9yZXtjb250ZW50Olwi74CPXCJ9Lmljb24tbGlua2VkaW46YmVmb3Jle2NvbnRlbnQ6XCLvg6FcIn0uaWNvbi1jaGFydC1saW5lOmJlZm9yZXtjb250ZW50Olwi74iBXCJ9Lmljb24tZmFjZWJvb2s6YmVmb3Jle2NvbnRlbnQ6XCLviLFcIn0uaWNvbi1nb29nbGU6YmVmb3Jle2NvbnRlbnQ6XCLviLRcIn0uaWNvbi10d2l0dGVyOmJlZm9yZXtjb250ZW50Olwi74mDXCJ9Lmljb24tcGx1czpiZWZvcmV7Y29udGVudDpcIu+Lh1wifS5pY29uLWNsb3NlOmJlZm9yZXtjb250ZW50Olwi74uXXCJ9Lmljb24tc2VhcmNoOmJlZm9yZXtjb250ZW50Olwi74u1XCJ9Lmljb24tZXh0ZXJuYWw6YmVmb3Jle2NvbnRlbnQ6XCLvjpxcIn0uaWNvbi1zaGFyZTpiZWZvcmV7Y29udGVudDpcIu+OrFwifWJvZHl7LS1icmVha3BvaW50OlwieHNtYWxsXCI7Y29sb3I6IzAwMDtmb250LWZhbWlseTpTb3VyY2UgU2FucyBQcm8sc2Fucy1zZXJpZjtmb250LXNpemU6MTZweDttYXJnaW46MDstd2Via2l0LWZvbnQtc21vb3RoaW5nOmFudGlhbGlhc2VkOy1tb3otb3N4LWZvbnQtc21vb3RoaW5nOmdyYXlzY2FsZX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pe2JvZHl7LS1icmVha3BvaW50Olwic21hbGxcIn19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDo0OGVtKXtib2R5ey0tYnJlYWtwb2ludDpcIm1lZGl1bVwifX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjY0ZW0pe2JvZHl7LS1icmVha3BvaW50OlwibGFyZ2VcIn19cHttYXJnaW46MCAwIDEuNXJlbX1zdXB7cG9zaXRpb246cmVsYXRpdmU7dG9wOi0uNGVtO3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lfS5wb3N0LWNvbnRlbnQgb2wgYSwucG9zdC1jb250ZW50IHVsIGEscCBhe2JvcmRlci1ib3R0b206MXB4IGRhc2hlZCAjMDAwfWF7Y29sb3I6aW5oZXJpdDt0ZXh0LWRlY29yYXRpb246bm9uZTt0cmFuc2l0aW9uOmFsbCAuM3MgZWFzZS1pbi1vdXR9YTpmb2N1c3tvdXRsaW5lOnRoaW4gZG90dGVkfWE6YWN0aXZlLGE6aG92ZXJ7b3V0bGluZTowfS5wb3N0LWNvbnRlbnQgb2wgYSwucG9zdC1jb250ZW50IHVsIGEscCBhe2JhY2tncm91bmQtaW1hZ2U6bGluZWFyLWdyYWRpZW50KHRyYW5zcGFyZW50IDIwJSwjZWFlMTM0IDApO2JhY2tncm91bmQtcmVwZWF0Om5vLXJlcGVhdDtiYWNrZ3JvdW5kLXNpemU6MCAxMDAlO3RyYW5zaXRpb246YWxsIC4ycyBlYXNlLWluLW91dDt3aWR0aDoxMDAlfS5wb3N0LWNvbnRlbnQgb2wgYTpob3ZlciwucG9zdC1jb250ZW50IHVsIGE6aG92ZXIscCBhOmhvdmVye2JhY2tncm91bmQtc2l6ZToxMDAlIDEwMCV9dWx7bGlzdC1zdHlsZTpub25lO21hcmdpbjowO3BhZGRpbmctaW5saW5lLXN0YXJ0OjI0cHh9dWwgbGl7Zm9udC1mYW1pbHk6SW5jb25zb2xhdGEsbW9ub3NwYWNlfXVsIGxpOmJlZm9yZXtjb250ZW50Olwi4paIXCI7ZGlzcGxheTppbmxpbmUtYmxvY2s7Zm9udC1mYW1pbHk6U291cmNlIFNhbnMgUHJvLHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6NzAwO2xpbmUtaGVpZ2h0OjE7bWFyZ2luLWxlZnQ6LTEuNXJlbTtwb3NpdGlvbjpyZWxhdGl2ZTt0b3A6LS4xcmVtO3dpZHRoOjFyZW19dWwgbGkuY2hpbmE6YmVmb3Jle2NvbG9yOiNmZTUwMDB9dWwgbGkuZXU6YmVmb3Jle2NvbG9yOiMwYWE0Y2Z9dWwgbGkubWV4aWNvOmJlZm9yZXtjb2xvcjojZjJhZjE5fXVsIGxpLmNhbmFkYTpiZWZvcmV7Y29sb3I6IzllYjA0MH0udG9vbHRpcCwudG9vbHRpcC1pbmZve2JhY2tncm91bmQtY29sb3I6I2ZmZjtib3JkZXI6MXB4IHNvbGlkICNiM2IzYjM7Ym9yZGVyLXJhZGl1czozcHg7ZGlzcGxheTpibG9jaztmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbTtoZWlnaHQ6YXV0bztsaW5lLWhlaWdodDoxLjQ7bWFyZ2luOjAgMTVweDttYXgtd2lkdGg6MTc1cHg7b3BhY2l0eTowO3BhZGRpbmc6OHB4IDhweCAxMHB4O3BvaW50ZXItZXZlbnRzOm5vbmU7cG9zaXRpb246YWJzb2x1dGU7dmlzaWJpbGl0eTpoaWRkZW47d2lkdGg6LW1vei1maXQtY29udGVudDt3aWR0aDpmaXQtY29udGVudDt6LWluZGV4OjIwfS50b29sdGlwIHAsLnRvb2x0aXAtaW5mbyBwe21hcmdpbjowfS50b29sdGlwIC50b29sdGlwLWhlYWRpbmcsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1oZWFkaW5ne2JvcmRlci1ib3R0b206MXB4IHNvbGlkICMwMDA7Zm9udC13ZWlnaHQ6NzAwO2xpbmUtaGVpZ2h0OjEuNDttYXJnaW4tYm90dG9tOi41cmVtO3RleHQtYWxpZ246Y2VudGVyO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey50b29sdGlwIC50b29sdGlwLWhlYWRpbmcsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1oZWFkaW5ne2xpbmUtaGVpZ2h0OjEuNH19LnRvb2x0aXAgLnRvb2x0aXAtaGVhZGluZyAubG9jYXRpb24sLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1oZWFkaW5nIC5sb2NhdGlvbntkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToxMHB4O2ZvbnQtc2l6ZTouNjI1cmVtO2ZvbnQtc3R5bGU6aXRhbGljfS50b29sdGlwIC50b29sdGlwLWxhYmVsLC50b29sdGlwLWluZm8gLnRvb2x0aXAtbGFiZWx7dGV4dC10cmFuc2Zvcm06Y2FwaXRhbGl6ZX0udG9vbHRpcCAudG9vbHRpcC1sYWJlbC5pbmRlbnRlZCwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxhYmVsLmluZGVudGVke3BhZGRpbmctbGVmdDouNzVyZW19LnRvb2x0aXAgLnRvb2x0aXAtbGlzdCBsaSwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxpc3QgbGl7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOi44NzVyZW19LnRvb2x0aXAgLnRvb2x0aXAtbGlzdCBsaTpiZWZvcmUsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1saXN0IGxpOmJlZm9yZXtmb250LXNpemU6OXB4O2ZvbnQtc2l6ZTouNTYyNXJlbX0udG9vbHRpcCAudG9vbHRpcC1saXN0IC5hY3RpdmUtY2F0ZWdvcnksLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1saXN0IC5hY3RpdmUtY2F0ZWdvcnl7Zm9udC13ZWlnaHQ6NzAwfS50b29sdGlwIC50b29sdGlwLWNsb3NlLC50b29sdGlwLWluZm8gLnRvb2x0aXAtY2xvc2V7ZGlzcGxheTpibG9jaztmb250LXdlaWdodDo3MDA7cG9pbnRlci1ldmVudHM6YWxsO3Bvc2l0aW9uOmFic29sdXRlO3JpZ2h0Oi41cmVtO3RleHQtYWxpZ246cmlnaHQ7dG9wOi4yNXJlbTt3aWR0aDoyNSU7ei1pbmRleDoyNX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey50b29sdGlwIC50b29sdGlwLWNsb3NlLC50b29sdGlwLWluZm8gLnRvb2x0aXAtY2xvc2V7ZGlzcGxheTpub25lfX0udG9vbHRpcC1pbmZve21heC13aWR0aDoxMDBweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey50b29sdGlwLWluZm97bWF4LXdpZHRoOjMwMHB4fX0ubGVnZW5kLWxhYmVse2ZvbnQtZmFtaWx5OkluY29uc29sYXRhLG1vbm9zcGFjZX0ubGVnZW5kLWxhYmVsOmJlZm9yZXtib3JkZXI6MXB4IHNvbGlkICMwMDA7Y29udGVudDpcIlwiO2Rpc3BsYXk6aW5saW5lLWJsb2NrO2hlaWdodDoxcmVtO21hcmdpbi1yaWdodDouNXJlbTt0cmFuc2l0aW9uOi4yczt2ZXJ0aWNhbC1hbGlnbjotLjJlbTt3aWR0aDoxcmVtfS5sZWdlbmQtbGFiZWwuYWxsOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNlYWUxMzR9LmxlZ2VuZC1sYWJlbC5jaGluYTpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojZmU1MDAwfS5sZWdlbmQtbGFiZWwuY2FuYWRhOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiM5ZWIwNDB9LmxlZ2VuZC1sYWJlbC5ldTpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojMGFhNGNmfS5sZWdlbmQtbGFiZWwubWV4aWNvOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmMmFmMTl9aW5wdXR7Ym94LXNpemluZzpib3JkZXItYm94O2ZvbnQtc2l6ZToxOHB4O2ZvbnQtc2l6ZToxLjEyNXJlbTtsZWZ0OjJweDtsaW5lLWhlaWdodDoxLjc4O21hcmdpbjowO29wYWNpdHk6MDtwYWRkaW5nOjA7cG9zaXRpb246YWJzb2x1dGU7dG9wOjFweH1pbnB1dDpub3QoOmNoZWNrZWQpe2N1cnNvcjpwb2ludGVyfWlucHV0OmNoZWNrZWQrbGFiZWw6YWZ0ZXJ7Y29sb3I6IzAwMDtjb250ZW50Olwi7qG4XCI7Y3Vyc29yOnBvaW50ZXI7Zm9udC1mYW1pbHk6dHJhZGVndXlzO2ZvbnQtd2VpZ2h0OjcwMDtsZWZ0OjFweDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MXB4fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MzVlbSl7LmNoYXJ0e3dpZHRoOjEwNSV9LmNoYXJ0IGZvcmVpZ25PYmplY3QgZGl2e3RyYW5zZm9ybTp0cmFuc2xhdGVYKC00cHgpfX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5jaGFydHttYXJnaW4tbGVmdDphdXRvO21hcmdpbi1yaWdodDphdXRvO21heC13aWR0aDo3MDBweH19LmNoYXJ0IHN2ZyAuc3RhdGVNb2RhbHtmb250LWZhbWlseTpJbmNvbnNvbGF0YSxtb25vc3BhY2U7Zm9udC1zaXplOjEyLjVweDtmb250LXNpemU6Ljc4MTI1cmVtO2xpbmUtaGVpZ2h0OjEuNn1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5jaGFydCBzdmcgLnN0YXRlTW9kYWx7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtfX0uY2hhcnQgc3ZnIC5zdGF0ZU1vZGFsIC5tb2RhbC1oZWFkaW5ne2ZvbnQtZmFtaWx5OlNvdXJjZSBTYW5zIFBybyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtc2l6ZToxcmVtO2ZvbnQtd2VpZ2h0OjcwMDtsZXR0ZXItc3BhY2luZzoxLjRweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5jaGFydCBzdmcgLnN0YXRlTW9kYWwgLm1vZGFsLWhlYWRpbmd7Zm9udC1zaXplOjI0cHg7Zm9udC1zaXplOjEuNXJlbX19LmNoYXJ0IHN2ZyAuc3RhdGVNb2RhbCB1bCBsaTpiZWZvcmV7Zm9udC1zaXplOjEycHg7Zm9udC1zaXplOi43NXJlbX0uY2hhcnQgc3ZnIC5ncm91cHtjdXJzb3I6em9vbS1pbn0uY2hhcnQgc3ZnIC5ncm91cCAubGFiZWx7Zm9udC1zaXplOjEycHg7Zm9udC1zaXplOi43NXJlbTtmaWxsOiMwMDA7c3Ryb2tlOiNmZmY7cGFpbnQtb3JkZXI6c3Ryb2tlO3N0cm9rZS13aWR0aDozcHg7Zm9udC13ZWlnaHQ6ODAwO3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTt0cmFuc2l0aW9uOmFsbCAuMnMgZWFzZS1pbi1vdXR9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDozNWVtKXsuY2hhcnQgc3ZnIC5ncm91cCAubGFiZWx7Zm9udC1zaXplOjE4cHg7Zm9udC1zaXplOjEuMTI1cmVtfX0uY2hhcnQgc3ZnIC5ncm91cCAuc3RhdGV7dHJhbnNpdGlvbjphbGwgLjJzIGVhc2UtaW4tb3V0fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6MzVlbSl7LmNoYXJ0IHN2ZyAuZ3JvdXAgLnN0YXRle3N0cm9rZS13aWR0aDoyIWltcG9ydGFudH0uY2hhcnQgc3ZnIC5ncm91cCAucGVyY2VudHtzdHJva2Utd2lkdGg6MCFpbXBvcnRhbnR9fS5jaGFydCBzdmcgLmdyb3VwOmhvdmVyIC5zdGF0ZXtzdHJva2U6I2VhZTEzNH0ubGVnZW5ke21hcmdpbjoyNHB4IDEycHggMTJweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5sZWdlbmR7bWFyZ2luOjI0cHggMCAxMnB4fX0ubGVnZW5kIC5sZWdlbmQtdGl0bGV7ZmxleC1iYXNpczoxMDAlO2ZvbnQtZmFtaWx5OkluY29uc29sYXRhLG1vbm9zcGFjZTtmb250LXNpemU6MTRweDtmb250LXNpemU6Ljg3NXJlbTtmb250LXdlaWdodDo0MDA7bGV0dGVyLXNwYWNpbmc6MS4ycHg7dGV4dC10cmFuc2Zvcm06dXBwZXJjYXNlfS5sZWdlbmQ+LmRpcmVjdGlvbntmbGV4LWJhc2lzOjEwMCU7Zm9udC1zaXplOjEycHg7Zm9udC1zaXplOi43NXJlbTtmb250LXN0eWxlOml0YWxpYzttYXJnaW4tdG9wOjZweH0ubGVnZW5kIC5jb250YWluZXJ7YWxpZ24taXRlbXM6Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0ubGVnZW5kIC5jb250YWluZXIgLmxlZ2VuZC1iYXJ7YWxpZ24taXRlbXM6Y2VudGVyO2JhY2tncm91bmQtY29sb3I6I2ZmZjtkaXNwbGF5Om5vbmU7ZmxleC13cmFwOndyYXA7Zm9udC1mYW1pbHk6SW5jb25zb2xhdGEsbW9ub3NwYWNlO2xpbmUtaGVpZ2h0OjEuMjtwYWRkaW5nOjZweDtwb3NpdGlvbjpyZWxhdGl2ZX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcntkaXNwbGF5OmZsZXg7ZmxleDowIDAgMjI0cHg7bWFyZ2luLWxlZnQ6MzZweDt3aWR0aDoxMDAlfS5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcjpiZWZvcmV7YmFja2dyb3VuZC1jb2xvcjojMDAwO2NvbnRlbnQ6XCJcIjtkaXNwbGF5OmJsb2NrO2hlaWdodDoxMjAlO2xlZnQ6LTI0cHg7cG9zaXRpb246YWJzb2x1dGU7dG9wOjA7d2lkdGg6MXB4fX0ubGVnZW5kIC5jb250YWluZXIgLmxlZ2VuZC1iYXI+ZGl2e2ZvbnQtc2l6ZToxNnB4O2ZvbnQtc2l6ZToxcmVtO3BhZGRpbmctbGVmdDoxMnB4fS5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcj5kaXYgLm1pbi1tYXh7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOi44NzVyZW19LmxlZ2VuZCAuY29udGFpbmVyIC5jb3VudHJpZXN7YWxpZ24taXRlbXM6Y2VudGVyO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5sZWdlbmQgLmNvbnRhaW5lciAuY291bnRyaWVze2ZsZXg6MCAwIGNhbGMoMTAwJSAtIDMwMHB4KX19LmxlZ2VuZCAuY29udGFpbmVyIC5jb3VudHJpZXMgLmxlZ2VuZC1pdGVte2JveC1zaXppbmc6Ym9yZGVyLWJveDtkaXNwbGF5OmZsZXg7ZmxleDoxIDAgNDclO2ZvbnQtc2l6ZToxNnB4O2ZvbnQtc2l6ZToxcmVtO21hcmdpbjowIDZweCA2cHggMDtwb3NpdGlvbjpyZWxhdGl2ZX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOjM1ZW0pey5sZWdlbmQgLmNvbnRhaW5lciAuY291bnRyaWVzIC5sZWdlbmQtaXRlbXtmbGV4OjEgMCBhdXRvO21hcmdpbjowIDZweCAwIDB9fWJvZHk+Om5vdCgudG9vbHRpcCk6bm90KC5jaGFydCl7bWFyZ2luLWxlZnQ6MTJweDttYXJnaW4tcmlnaHQ6MTJweDttYXgtd2lkdGg6NzAwcHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDozNWVtKXtib2R5Pjpub3QoLnRvb2x0aXApOm5vdCguY2hhcnQpe21hcmdpbi1sZWZ0OmF1dG87bWFyZ2luLXJpZ2h0OmF1dG99fWJvZHkgLmludGVyYWN0aXZlX19oZWFkZXJ7Ym9yZGVyLWJvdHRvbTowO21hcmdpbjoxcmVtIGF1dG87cGFkZGluZy1ib3R0b206MS4yNXJlbX1ib2R5IC5pbnRlcmFjdGl2ZV9faGVhZGVyIC5pbnRlcmFjdGl2ZV9fdGl0bGV7Y29sb3I6IzAwMDtmb250LWZhbWlseTpTb3VyY2UgU2FucyBQcm8sc2Fucy1zZXJpZjtmb250LXNpemU6MjBweDtmb250LXNpemU6MS4yNXJlbTtmb250LXdlaWdodDo3MDA7bGV0dGVyLXNwYWNpbmc6MS40cHg7bGluZS1oZWlnaHQ6MS4zNjt0ZXh0LWFsaWduOmNlbnRlcn1ib2R5IC5pbnRlcmFjdGl2ZV9faGVhZGVyIHB7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW07bGluZS1oZWlnaHQ6MS43OH1ib2R5IC5pbnRlcmFjdGl2ZV9fZmlsdGVyc3ttYXJnaW46MCBhdXRvIDFyZW19Ym9keSAuaW50ZXJhY3RpdmVfX2ZpbHRlcnMgLnNlYXJjaF9fc3VnZ2VzdGlvbnN7bWFyZ2luLWJvdHRvbTowO21hcmdpbi10b3A6M3B4fWJvZHkgLmludGVyYWN0aXZlX19ncmFwaGlje21hcmdpbjowIGF1dG87bWF4LXdpZHRoOjEyNTBweDtwb3NpdGlvbjpyZWxhdGl2ZX1ib2R5IC5pbnRlcmFjdGl2ZV9fc291cmNle2JvcmRlci10b3A6MXB4IHNvbGlkICMwMDA7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0bztwYWRkaW5nLWJvdHRvbToycmVtfWJvZHkgLmludGVyYWN0aXZlX19zb3VyY2UgcHtjb2xvcjojNGE0YTRhO2ZvbnQtZmFtaWx5OlNvdXJjZSBTYW5zIFBybyxzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTouODc1cmVtO21hcmdpbjouNXJlbSAwIDB9Ym9keSAuaW5zdHJ1Y3Rpb25ze2JvcmRlci10b3A6MXB4IHNvbGlkICNiM2IzYjM7Y29sb3I6IzRhNGE0YTtmb250LXNpemU6LjlyZW07Zm9udC1zdHlsZTppdGFsaWM7bWFyZ2luLXRvcDo2cHg7cGFkZGluZzouNXJlbSAwIDA7dGV4dC1hbGlnbjpjZW50ZXJ9Ym9keSAuaW5zdHJ1Y3Rpb25zIHNwYW57ZGlzcGxheTpub25lfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6MzVlbSl7Ym9keSAuaW5zdHJ1Y3Rpb25zIHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2t9fWAsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3Njc3MvbWFpbi5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9iYXNlL192YXJpYWJsZXMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvYmFzZS9fYmFzZS5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9iYXNlL19taXhpbnMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fdG9vbHRpcHMuc2Nzc1wiLFwid2VicGFjazovLy4vc3JjL3Njc3MvY29tcG9uZW50cy9fZm9ybS1lbGVtZW50cy5zY3NzXCIsXCJ3ZWJwYWNrOi8vLi9zcmMvc2Nzcy9jdXN0b20vX2NoYXJ0LnNjc3NcIixcIndlYnBhY2s6Ly8uL3NyYy9zY3NzL2N1c3RvbS9fbGF5b3V0LnNjc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUEsV0NnQ0EscUJBQ0UsQ0FRQSxpQkFDQSxDQVBBLGVBTUEsQ0FSQSwyQ0FDQSxDQUFBLHVTQVFBLENBQUEsK0NBR0YscUJBRUUsQ0FBQSxpQkFDQSxDQUFBLGVBQ0EsQ0FBQSxVQUNBLENBQUEsb0JBRUEsQ0FJQSxtQkFJQSxDQUNBLGVBR0EsQ0FBQSxnQkFJQSxDQWRBLGlCQUNBLENBQUEsaUJBQ0EsQ0FKQSx1QkFDQSxDQU9BLG1CQUNBLENBUkEsU0FDQSxDQWNBLGtDQU1BLENBQUEsaUNBQ0EsQ0FBQSxtQkFLRixXQUNFLENBQUEsbUJBRUYsV0FDRSxDQUFBLGtCQUVGLFdBQ0UsQ0FBQSx3QkFFRixXQUNFLENBQUEsd0JBRUYsV0FDRSxDQUFBLHFCQUVGLFdBQ0UsQ0FBQSx3QkFFRixXQUNFLENBQUEseUJBRUYsV0FDRSxDQUFBLHdCQUVGLFdBQ0UsQ0FBQSx5QkFFRixXQUNFLENBQUEsc0JBRUYsV0FDRSxDQUFBLHFCQUVGLFdBQ0UsQ0FBQSxpQkFFRixXQUNFLENBQUEsbUJBRUYsV0FDRSxDQUFBLG1CQUVGLFdBQ0UsQ0FBQSxrQkFFRixXQUNFLENBQUEsbUJBRUYsV0FDRSxDQUFBLGtCQUVGLFdBQ0UsQ0FBQSxzQkFFRixXQUNFLENBQUEsd0JBRUYsV0FDRSxDQUFBLHNCQUVGLFdBQ0UsQ0FBQSxvQkFFRixXQUNFLENBQUEscUJBRUYsV0FDRSxDQUFBLGtCQUVGLFdBQ0UsQ0FBQSxtQkFFRixXQUNFLENBQUEsb0JBRUYsV0FDRSxDQUFBLHNCQUVGLFdBQ0UsQ0FBQSxtQkFFRixXQUNFLENBQUEsS0MvSkYscUJBQ0UsQ0FHQSxVRFBNLENDSU4sc0NEeUJZLENBQUEsY0FOSSxDQUFBLFFDaEJoQixDRFBNLGtDQ1NOLENBQUEsaUNBQ0EsQ0FBQSxtQ0MyQkUsS0RsQ0osb0JBVUksQ0FBQSxDQUFBLG1DQ29CQSxLRDlCSixxQkFjSSxDQUFBLENBQUEsbUND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LENBQUEsbUNIM0lGLDhCRzhJSSwyQkFDQSxDQUFBLENBQUEsMkNBT0EscUJBQ0EsQ0FGQSxZQUNBLENBR0EsWUFDQSxDQVJGLGNBQ29CLENBQUEsY0gxS3hCLENHOEtNLGtCQUNBLENIL0tOLGlCR2lMTSxDQUFBLG1DSDFKSiwyQ0c2Sk0sYUFDQSxDQUFBLGdCQUNBLENBQUEsQ0FBQSxnQ0wzS08sZ0JNaEJiLENBQUEsaUJBQ0EsQ0FIRixlQUdFLENBQUEsbUNKMkJBLGdDSTlCRixnQkFNSSxDQUFBLGlCQUNBLENBQUEsQ0FBQSwwQkFNRixlQUNBLENBSEYsZ0JBQ0UsQ0FBQSxzQkFFQSxDQUFBLDhDQU1FLFVOM0JFLENNdUJKLHNDTk1VLENBQUEsY01KVSxDQUFBLGlCSlh0QixDRmRNLGVNOEJGLENBSkEsb0JBQ0EsQ0piSixnQklZSSxDQUlBLGlCQUNBLENBQUEsNEJBSUEsY0FDa0IsQ0FBQSxjSnRCdEIsQ0lvQkUsZ0JKcEJGLENBQUEsMkJJMEJBLGtCQUNFLENBQUEsZ0RBR0UsZUFDQSxDQUZGLGNBRUUsQ0FBQSwyQkFNRixhQUNBLENBRkEsZ0JBQ0EsQ0FGRixpQkFHRSxDQUFBLDBCQU1BLHlCQUNBLENBSkYsZ0JBQ0UsQ0FBQSxpQkFDQSxDQUFBLG1CQUVBLENBQUEsNEJOOUJVLGFBbEJQLENFR0wsc0NGZVksQ01pQ1IsY0FDa0IsQ0FBQSxpQkpqRHRCLENJK0NFLGdCTmxERyxDQUFBLG1CTTZESCw0QkFDQSxDQUNBLGFOL0RHLENNMkRILGVBQ0EsQ0FGRixpQkFDRSxDQUNBLGNBQ0EsQ0FDQSxpQkFDQSxDTi9ERyxpQk1pRUgsQ0FBQSx3QkFFQSxZQUNFLENBQUEsbUNKMUNGLHdCSXlDQSxvQkFHSSxDQUFBXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIkBmb250LWZhY2V7Zm9udC1mYW1pbHk6XFxcInRyYWRlZ3V5c1xcXCI7c3JjOnVybChcXFwiLi4vZm9udHMvdHJhZGVndXlzLmVvdD80ODc5MjUwN1xcXCIpO3NyYzp1cmwoXFxcIi4uL2ZvbnRzL3RyYWRlZ3V5cy5lb3Q/NDg3OTI1MDcjaWVmaXhcXFwiKSBmb3JtYXQoXFxcImVtYmVkZGVkLW9wZW50eXBlXFxcIiksdXJsKFxcXCIuLi9mb250cy90cmFkZWd1eXMud29mZjI/NDg3OTI1MDdcXFwiKSBmb3JtYXQoXFxcIndvZmYyXFxcIiksdXJsKFxcXCIuLi9mb250cy90cmFkZWd1eXMud29mZj80ODc5MjUwN1xcXCIpIGZvcm1hdChcXFwid29mZlxcXCIpLHVybChcXFwiLi4vZm9udHMvdHJhZGVndXlzLnR0Zj80ODc5MjUwN1xcXCIpIGZvcm1hdChcXFwidHJ1ZXR5cGVcXFwiKSx1cmwoXFxcIi4uL2ZvbnRzL3RyYWRlZ3V5cy5zdmc/NDg3OTI1MDcjdHJhZGVndXlzXFxcIikgZm9ybWF0KFxcXCJzdmdcXFwiKTtmb250LXdlaWdodDpub3JtYWw7Zm9udC1zdHlsZTpub3JtYWx9W2NsYXNzXj1pY29uLV06YmVmb3JlLFtjbGFzcyo9XFxcIiBpY29uLVxcXCJdOmJlZm9yZXtmb250LWZhbWlseTpcXFwidHJhZGVndXlzXFxcIjtmb250LXN0eWxlOm5vcm1hbDtmb250LXdlaWdodDpub3JtYWw7c3BlYWs6bm9uZTtkaXNwbGF5OmlubGluZS1ibG9jazt0ZXh0LWRlY29yYXRpb246aW5oZXJpdDt3aWR0aDoxZW07bWFyZ2luLXJpZ2h0Oi4yZW07dGV4dC1hbGlnbjpjZW50ZXI7Zm9udC12YXJpYW50Om5vcm1hbDt0ZXh0LXRyYW5zZm9ybTpub25lO2xpbmUtaGVpZ2h0OjFlbTttYXJnaW4tbGVmdDouMmVtOy13ZWJraXQtZm9udC1zbW9vdGhpbmc6YW50aWFsaWFzZWQ7LW1vei1vc3gtZm9udC1zbW9vdGhpbmc6Z3JheXNjYWxlfS5pY29uLWVtYWlsOmJlZm9yZXtjb250ZW50OlxcXCLuoIFcXFwifS5pY29uLXByaW50OmJlZm9yZXtjb250ZW50OlxcXCLuoIRcXFwifS5pY29uLWxpbms6YmVmb3Jle2NvbnRlbnQ6XFxcIu6ghVxcXCJ9Lmljb24taWNvbl9jaGVjazpiZWZvcmV7Y29udGVudDpcXFwi7qG4XFxcIn0uaWNvbi10cmFuc2NyaXB0OmJlZm9yZXtjb250ZW50OlxcXCLuoptcXFwifS5pY29uLXlvdXR1YmU6YmVmb3Jle2NvbnRlbnQ6XFxcIu6mg1xcXCJ9Lmljb24tYW5nbGUtbGVmdDpiZWZvcmV7Y29udGVudDpcXFwi7qaSXFxcIn0uaWNvbi1hbmdsZS1yaWdodDpiZWZvcmV7Y29udGVudDpcXFwi7qaTXFxcIn0uaWNvbi1hcnJvdy1sZWZ0OmJlZm9yZXtjb250ZW50OlxcXCLupp1cXFwifS5pY29uLWFycm93LXJpZ2h0OmJlZm9yZXtjb250ZW50OlxcXCLupp5cXFwifS5pY29uLWNsb3NlLWxnOmJlZm9yZXtjb250ZW50OlxcXCLupr1cXFwifS5pY29uLXBsdXMtbGc6YmVmb3Jle2NvbnRlbnQ6XFxcIu6qgVxcXCJ9Lmljb24tcnNzOmJlZm9yZXtjb250ZW50OlxcXCLur65cXFwifS5pY29uLXZpZGVvOmJlZm9yZXtjb250ZW50OlxcXCLur7BcXFwifS5pY29uLXF1b3RlOmJlZm9yZXtjb250ZW50OlxcXCLur7FcXFwifS5pY29uLW1lbnU6YmVmb3Jle2NvbnRlbnQ6XFxcIu6vslxcXCJ9Lmljb24tcGF1c2U6YmVmb3Jle2NvbnRlbnQ6XFxcIu+AjlxcXCJ9Lmljb24tcGxheTpiZWZvcmV7Y29udGVudDpcXFwi74CPXFxcIn0uaWNvbi1saW5rZWRpbjpiZWZvcmV7Y29udGVudDpcXFwi74OhXFxcIn0uaWNvbi1jaGFydC1saW5lOmJlZm9yZXtjb250ZW50OlxcXCLviIFcXFwifS5pY29uLWZhY2Vib29rOmJlZm9yZXtjb250ZW50OlxcXCLviLFcXFwifS5pY29uLWdvb2dsZTpiZWZvcmV7Y29udGVudDpcXFwi74i0XFxcIn0uaWNvbi10d2l0dGVyOmJlZm9yZXtjb250ZW50OlxcXCLviYNcXFwifS5pY29uLXBsdXM6YmVmb3Jle2NvbnRlbnQ6XFxcIu+Lh1xcXCJ9Lmljb24tY2xvc2U6YmVmb3Jle2NvbnRlbnQ6XFxcIu+Ll1xcXCJ9Lmljb24tc2VhcmNoOmJlZm9yZXtjb250ZW50OlxcXCLvi7VcXFwifS5pY29uLWV4dGVybmFsOmJlZm9yZXtjb250ZW50OlxcXCLvjpxcXFwifS5pY29uLXNoYXJlOmJlZm9yZXtjb250ZW50OlxcXCLvjqxcXFwifWJvZHl7LS1icmVha3BvaW50OiBcXFwieHNtYWxsXFxcIjtmb250LWZhbWlseTpcXFwiU291cmNlIFNhbnMgUHJvXFxcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToxNnB4O21hcmdpbjowO2NvbG9yOiMwMDA7LXdlYmtpdC1mb250LXNtb290aGluZzphbnRpYWxpYXNlZDstbW96LW9zeC1mb250LXNtb290aGluZzpncmF5c2NhbGV9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7Ym9keXstLWJyZWFrcG9pbnQ6IFxcXCJzbWFsbFxcXCJ9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDQ4ZW0pe2JvZHl7LS1icmVha3BvaW50OiBcXFwibWVkaXVtXFxcIn19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogNjRlbSl7Ym9keXstLWJyZWFrcG9pbnQ6IFxcXCJsYXJnZVxcXCJ9fXB7bWFyZ2luOjAgMCAxLjVyZW19c3Vwe3ZlcnRpY2FsLWFsaWduOmJhc2VsaW5lO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMC40ZW19cCBhLC5wb3N0LWNvbnRlbnQgdWwgYSwucG9zdC1jb250ZW50IG9sIGF7Ym9yZGVyLWJvdHRvbToxcHggZGFzaGVkICMwMDB9YXtjb2xvcjppbmhlcml0O3RleHQtZGVjb3JhdGlvbjpub25lO3RyYW5zaXRpb246YWxsIC4zcyBlYXNlLWluLW91dH1hOmZvY3Vze291dGxpbmU6dGhpbiBkb3R0ZWR9YTpob3ZlcixhOmFjdGl2ZXtvdXRsaW5lOjB9cCBhLC5wb3N0LWNvbnRlbnQgdWwgYSwucG9zdC1jb250ZW50IG9sIGF7d2lkdGg6MTAwJTtiYWNrZ3JvdW5kLWltYWdlOmxpbmVhci1ncmFkaWVudCh0cmFuc3BhcmVudCAyMCUsICNlYWUxMzQgMjAlKTtiYWNrZ3JvdW5kLXJlcGVhdDpuby1yZXBlYXQ7YmFja2dyb3VuZC1zaXplOjAlIDEwMCU7dHJhbnNpdGlvbjphbGwgLjJzIGVhc2UtaW4tb3V0fXAgYTpob3ZlciwucG9zdC1jb250ZW50IHVsIGE6aG92ZXIsLnBvc3QtY29udGVudCBvbCBhOmhvdmVye2JhY2tncm91bmQtc2l6ZToxMDAlIDEwMCV9dWx7bWFyZ2luOjA7cGFkZGluZy1pbmxpbmUtc3RhcnQ6MjRweDtsaXN0LXN0eWxlOm5vbmV9dWwgbGl7Zm9udC1mYW1pbHk6XFxcIkluY29uc29sYXRhXFxcIixtb25vc3BhY2V9dWwgbGk6YmVmb3Jle2ZvbnQtZmFtaWx5OlxcXCJTb3VyY2UgU2FucyBQcm9cXFwiLHNhbnMtc2VyaWY7Zm9udC13ZWlnaHQ6Ym9sZDtsaW5lLWhlaWdodDoxO3Bvc2l0aW9uOnJlbGF0aXZlO3RvcDotMC4xcmVtO2Rpc3BsYXk6aW5saW5lLWJsb2NrO3dpZHRoOjFyZW07bWFyZ2luLWxlZnQ6LTEuNXJlbTtjb250ZW50OlxcXCLilohcXFwifXVsIGxpLmNoaW5hOjpiZWZvcmV7Y29sb3I6I2ZlNTAwMH11bCBsaS5ldTo6YmVmb3Jle2NvbG9yOiMwYWE0Y2Z9dWwgbGkubWV4aWNvOjpiZWZvcmV7Y29sb3I6I2YyYWYxOX11bCBsaS5jYW5hZGE6OmJlZm9yZXtjb2xvcjojOWViMDQwfS50b29sdGlwLC50b29sdGlwLWluZm97ZGlzcGxheTpibG9jaztmb250LXNpemU6MTRweDtmb250LXNpemU6MC44NzVyZW07bGluZS1oZWlnaHQ6MS40O3Bvc2l0aW9uOmFic29sdXRlO3otaW5kZXg6MjA7dmlzaWJpbGl0eTpoaWRkZW47d2lkdGg6Zml0LWNvbnRlbnQ7bWF4LXdpZHRoOjE3NXB4O2hlaWdodDphdXRvO21hcmdpbjowIDE1cHg7cGFkZGluZzo4cHggOHB4IDEwcHg7cG9pbnRlci1ldmVudHM6bm9uZTtvcGFjaXR5OjA7Ym9yZGVyOjFweCBzb2xpZCAjYjNiM2IzO2JvcmRlci1yYWRpdXM6M3B4O2JhY2tncm91bmQtY29sb3I6I2ZmZn0udG9vbHRpcCBwLC50b29sdGlwLWluZm8gcHttYXJnaW46MH0udG9vbHRpcCAudG9vbHRpcC1oZWFkaW5nLC50b29sdGlwLWluZm8gLnRvb2x0aXAtaGVhZGluZ3t0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7bGluZS1oZWlnaHQ6MS40O2ZvbnQtd2VpZ2h0OmJvbGQ7bWFyZ2luLWJvdHRvbTouNXJlbTt0ZXh0LWFsaWduOmNlbnRlcjtib3JkZXItYm90dG9tOjFweCBzb2xpZCAjMDAwfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey50b29sdGlwIC50b29sdGlwLWhlYWRpbmcsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1oZWFkaW5ne2xpbmUtaGVpZ2h0OjEuNH19LnRvb2x0aXAgLnRvb2x0aXAtaGVhZGluZyAubG9jYXRpb24sLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1oZWFkaW5nIC5sb2NhdGlvbntkaXNwbGF5OmJsb2NrO2ZvbnQtc2l6ZToxMHB4O2ZvbnQtc2l6ZTowLjYyNXJlbTtmb250LXN0eWxlOml0YWxpY30udG9vbHRpcCAudG9vbHRpcC1sYWJlbCwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxhYmVse3RleHQtdHJhbnNmb3JtOmNhcGl0YWxpemV9LnRvb2x0aXAgLnRvb2x0aXAtbGFiZWwuaW5kZW50ZWQsLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1sYWJlbC5pbmRlbnRlZHtwYWRkaW5nLWxlZnQ6Ljc1cmVtfS50b29sdGlwIC50b29sdGlwLWxpc3QgbGksLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1saXN0IGxpe2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTowLjg3NXJlbX0udG9vbHRpcCAudG9vbHRpcC1saXN0IGxpOmJlZm9yZSwudG9vbHRpcC1pbmZvIC50b29sdGlwLWxpc3QgbGk6YmVmb3Jle2ZvbnQtc2l6ZTo5cHg7Zm9udC1zaXplOjAuNTYyNXJlbX0udG9vbHRpcCAudG9vbHRpcC1saXN0IC5hY3RpdmUtY2F0ZWdvcnksLnRvb2x0aXAtaW5mbyAudG9vbHRpcC1saXN0IC5hY3RpdmUtY2F0ZWdvcnl7Zm9udC13ZWlnaHQ6Ym9sZH0udG9vbHRpcCAudG9vbHRpcC1jbG9zZSwudG9vbHRpcC1pbmZvIC50b29sdGlwLWNsb3Nle2ZvbnQtd2VpZ2h0OmJvbGQ7cG9zaXRpb246YWJzb2x1dGU7ei1pbmRleDoyNTt0b3A6LjI1cmVtO3JpZ2h0Oi41cmVtO2Rpc3BsYXk6YmxvY2s7d2lkdGg6MjUlO3RleHQtYWxpZ246cmlnaHQ7cG9pbnRlci1ldmVudHM6YWxsfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey50b29sdGlwIC50b29sdGlwLWNsb3NlLC50b29sdGlwLWluZm8gLnRvb2x0aXAtY2xvc2V7ZGlzcGxheTpub25lfX0udG9vbHRpcC1pbmZve21heC13aWR0aDoxMDBweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXsudG9vbHRpcC1pbmZve21heC13aWR0aDozMDBweH19LmxlZ2VuZC1sYWJlbHtmb250LWZhbWlseTpcXFwiSW5jb25zb2xhdGFcXFwiLG1vbm9zcGFjZX0ubGVnZW5kLWxhYmVsOmJlZm9yZXtkaXNwbGF5OmlubGluZS1ibG9jazt3aWR0aDoxcmVtO2hlaWdodDoxcmVtO21hcmdpbi1yaWdodDouNXJlbTtjb250ZW50OlxcXCJcXFwiO3RyYW5zaXRpb246LjJzO3ZlcnRpY2FsLWFsaWduOi0wLjJlbTtib3JkZXI6MXB4IHNvbGlkICMwMDB9LmxlZ2VuZC1sYWJlbC5hbGw6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2VhZTEzNH0ubGVnZW5kLWxhYmVsLmNoaW5hOmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiNmZTUwMDB9LmxlZ2VuZC1sYWJlbC5jYW5hZGE6YmVmb3Jle2JhY2tncm91bmQtY29sb3I6IzllYjA0MH0ubGVnZW5kLWxhYmVsLmV1OmJlZm9yZXtiYWNrZ3JvdW5kLWNvbG9yOiMwYWE0Y2Z9LmxlZ2VuZC1sYWJlbC5tZXhpY286YmVmb3Jle2JhY2tncm91bmQtY29sb3I6I2YyYWYxOX1pbnB1dHtmb250LXNpemU6MThweDtmb250LXNpemU6MS4xMjVyZW07bGluZS1oZWlnaHQ6MS43ODtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MXB4O2xlZnQ6MnB4O2JveC1zaXppbmc6Ym9yZGVyLWJveDttYXJnaW46MDtwYWRkaW5nOjA7b3BhY2l0eTowfWlucHV0Om5vdCg6Y2hlY2tlZCl7Y3Vyc29yOnBvaW50ZXJ9aW5wdXQ6Y2hlY2tlZCtsYWJlbDo6YWZ0ZXJ7Zm9udC1mYW1pbHk6XFxcInRyYWRlZ3V5c1xcXCI7Zm9udC13ZWlnaHQ6Ym9sZDtwb3NpdGlvbjphYnNvbHV0ZTt0b3A6MXB4O2xlZnQ6MXB4O2NvbnRlbnQ6XFxcIu6huFxcXCI7Y3Vyc29yOnBvaW50ZXI7Y29sb3I6IzAwMH1AbWVkaWEgc2NyZWVuIGFuZCAobWF4LXdpZHRoOiAzNWVtKXsuY2hhcnR7d2lkdGg6MTA1JX0uY2hhcnQgZm9yZWlnbk9iamVjdCBkaXZ7dHJhbnNmb3JtOnRyYW5zbGF0ZVgoLTRweCl9fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey5jaGFydHttYXgtd2lkdGg6NzAwcHg7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b319LmNoYXJ0IHN2ZyAuc3RhdGVNb2RhbHtmb250LWZhbWlseTpcXFwiSW5jb25zb2xhdGFcXFwiLG1vbm9zcGFjZTtsaW5lLWhlaWdodDoxLjY7Zm9udC1zaXplOjEyLjVweDtmb250LXNpemU6MC43ODEyNXJlbX1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXsuY2hhcnQgc3ZnIC5zdGF0ZU1vZGFse2ZvbnQtc2l6ZToxOHB4O2ZvbnQtc2l6ZToxLjEyNXJlbX19LmNoYXJ0IHN2ZyAuc3RhdGVNb2RhbCAubW9kYWwtaGVhZGluZ3tmb250LWZhbWlseTpcXFwiU291cmNlIFNhbnMgUHJvXFxcIixzYW5zLXNlcmlmO2ZvbnQtd2VpZ2h0OmJvbGQ7bGV0dGVyLXNwYWNpbmc6MS40cHg7Zm9udC1zaXplOjE2cHg7Zm9udC1zaXplOjFyZW19QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7LmNoYXJ0IHN2ZyAuc3RhdGVNb2RhbCAubW9kYWwtaGVhZGluZ3tmb250LXNpemU6MjRweDtmb250LXNpemU6MS41cmVtfX0uY2hhcnQgc3ZnIC5zdGF0ZU1vZGFsIHVsIGxpOmJlZm9yZXtmb250LXNpemU6MTJweDtmb250LXNpemU6MC43NXJlbX0uY2hhcnQgc3ZnIC5ncm91cHtjdXJzb3I6em9vbS1pbn0uY2hhcnQgc3ZnIC5ncm91cCAubGFiZWx7Zm9udC1zaXplOjEycHg7Zm9udC1zaXplOjAuNzVyZW07ZmlsbDojMDAwO3N0cm9rZTojZmZmO3BhaW50LW9yZGVyOnN0cm9rZTtzdHJva2Utd2lkdGg6M3B4O3RleHQtdHJhbnNmb3JtOnVwcGVyY2FzZTtmb250LXdlaWdodDo4MDA7dHJhbnNpdGlvbjphbGwgLjJzIGVhc2UtaW4tb3V0fUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey5jaGFydCBzdmcgLmdyb3VwIC5sYWJlbHtmb250LXNpemU6MThweDtmb250LXNpemU6MS4xMjVyZW19fS5jaGFydCBzdmcgLmdyb3VwIC5zdGF0ZXt0cmFuc2l0aW9uOmFsbCAuMnMgZWFzZS1pbi1vdXR9QG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzVlbSl7LmNoYXJ0IHN2ZyAuZ3JvdXAgLnN0YXRle3N0cm9rZS13aWR0aDoyICFpbXBvcnRhbnR9fUBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDM1ZW0pey5jaGFydCBzdmcgLmdyb3VwIC5wZXJjZW50e3N0cm9rZS13aWR0aDowICFpbXBvcnRhbnR9fS5jaGFydCBzdmcgLmdyb3VwOmhvdmVyIC5zdGF0ZXtzdHJva2U6I2VhZTEzNH0ubGVnZW5ke21hcmdpbjoyNHB4IDEycHggMTJweH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXsubGVnZW5ke21hcmdpbjoyNHB4IDAgMTJweH19LmxlZ2VuZCAubGVnZW5kLXRpdGxley1tcy1mbGV4LXByZWZlcnJlZC1zaXplOjEwMCU7ZmxleC1iYXNpczoxMDAlO2ZvbnQtZmFtaWx5OlxcXCJJbmNvbnNvbGF0YVxcXCIsbW9ub3NwYWNlO2ZvbnQtd2VpZ2h0OjQwMDt0ZXh0LXRyYW5zZm9ybTp1cHBlcmNhc2U7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOjAuODc1cmVtO2xldHRlci1zcGFjaW5nOjEuMnB4fS5sZWdlbmQ+LmRpcmVjdGlvbnstbXMtZmxleC1wcmVmZXJyZWQtc2l6ZToxMDAlO2ZsZXgtYmFzaXM6MTAwJTtmb250LXN0eWxlOml0YWxpYztmb250LXNpemU6MTJweDtmb250LXNpemU6MC43NXJlbTttYXJnaW4tdG9wOjZweH0ubGVnZW5kIC5jb250YWluZXJ7ZGlzcGxheTotbXMtZmxleGJveDtkaXNwbGF5OmZsZXg7LW1zLWZsZXgtd3JhcDp3cmFwO2ZsZXgtd3JhcDp3cmFwOy1tcy1mbGV4LWFsaWduOmNlbnRlcjthbGlnbi1pdGVtczpjZW50ZXJ9LmxlZ2VuZCAuY29udGFpbmVyIC5sZWdlbmQtYmFye2ZvbnQtZmFtaWx5OlxcXCJJbmNvbnNvbGF0YVxcXCIsbW9ub3NwYWNlO2xpbmUtaGVpZ2h0OjEuMjtwb3NpdGlvbjpyZWxhdGl2ZTtkaXNwbGF5Om5vbmU7cGFkZGluZzo2cHg7YmFja2dyb3VuZC1jb2xvcjojZmZmOy1tcy1mbGV4LXdyYXA6d3JhcDtmbGV4LXdyYXA6d3JhcDstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyfUBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6IDM1ZW0pey5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcntkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDttYXJnaW4tbGVmdDozNnB4O3dpZHRoOjEwMCU7LW1zLWZsZXg6MCAwIDIyNHB4O2ZsZXg6MCAwIDIyNHB4fS5sZWdlbmQgLmNvbnRhaW5lciAubGVnZW5kLWJhcjpiZWZvcmV7Y29udGVudDpcXFwiXFxcIjtkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO3RvcDowO2xlZnQ6LTI0cHg7d2lkdGg6MXB4O2hlaWdodDoxMjAlO2JhY2tncm91bmQtY29sb3I6IzAwMH19LmxlZ2VuZCAuY29udGFpbmVyIC5sZWdlbmQtYmFyPmRpdntwYWRkaW5nLWxlZnQ6MTJweDtmb250LXNpemU6MTZweDtmb250LXNpemU6MXJlbX0ubGVnZW5kIC5jb250YWluZXIgLmxlZ2VuZC1iYXI+ZGl2IC5taW4tbWF4e2ZvbnQtc2l6ZToxNHB4O2ZvbnQtc2l6ZTowLjg3NXJlbX0ubGVnZW5kIC5jb250YWluZXIgLmNvdW50cmllc3tkaXNwbGF5Oi1tcy1mbGV4Ym94O2Rpc3BsYXk6ZmxleDstbXMtZmxleC1hbGlnbjpjZW50ZXI7YWxpZ24taXRlbXM6Y2VudGVyOy1tcy1mbGV4LXdyYXA6d3JhcDtmbGV4LXdyYXA6d3JhcH1AbWVkaWEgc2NyZWVuIGFuZCAobWluLXdpZHRoOiAzNWVtKXsubGVnZW5kIC5jb250YWluZXIgLmNvdW50cmllc3stbXMtZmxleDowIDAgY2FsYygxMDAlIC0gMzAwcHgpO2ZsZXg6MCAwIGNhbGMoMTAwJSAtIDMwMHB4KX19LmxlZ2VuZCAuY29udGFpbmVyIC5jb3VudHJpZXMgLmxlZ2VuZC1pdGVte2ZvbnQtc2l6ZToxNnB4O2ZvbnQtc2l6ZToxcmVtO3Bvc2l0aW9uOnJlbGF0aXZlO2Rpc3BsYXk6LW1zLWZsZXhib3g7ZGlzcGxheTpmbGV4O2JveC1zaXppbmc6Ym9yZGVyLWJveDttYXJnaW46MCA2cHggNnB4IDA7LW1zLWZsZXg6MSAwIDQ3JTtmbGV4OjEgMCA0NyV9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7LmxlZ2VuZCAuY29udGFpbmVyIC5jb3VudHJpZXMgLmxlZ2VuZC1pdGVtey1tcy1mbGV4OjEgMCBhdXRvO2ZsZXg6MSAwIGF1dG87bWFyZ2luOjAgNnB4IDAgMH19Ym9keT4qOm5vdCgudG9vbHRpcCk6bm90KC5jaGFydCl7bWF4LXdpZHRoOjcwMHB4O21hcmdpbi1sZWZ0OjEycHg7bWFyZ2luLXJpZ2h0OjEycHh9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7Ym9keT4qOm5vdCgudG9vbHRpcCk6bm90KC5jaGFydCl7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0b319Ym9keSAuaW50ZXJhY3RpdmVfX2hlYWRlcnttYXJnaW46MXJlbSBhdXRvO3BhZGRpbmctYm90dG9tOjEuMjVyZW07Ym9yZGVyLWJvdHRvbTowfWJvZHkgLmludGVyYWN0aXZlX19oZWFkZXIgLmludGVyYWN0aXZlX190aXRsZXtmb250LWZhbWlseTpcXFwiU291cmNlIFNhbnMgUHJvXFxcIixzYW5zLXNlcmlmO2ZvbnQtc2l6ZToyMHB4O2ZvbnQtc2l6ZToxLjI1cmVtO2xpbmUtaGVpZ2h0OjEuMzY7bGV0dGVyLXNwYWNpbmc6MS40cHg7Y29sb3I6IzAwMDtmb250LXdlaWdodDpib2xkO3RleHQtYWxpZ246Y2VudGVyfWJvZHkgLmludGVyYWN0aXZlX19oZWFkZXIgcHtsaW5lLWhlaWdodDoxLjc4O2ZvbnQtc2l6ZToxNnB4O2ZvbnQtc2l6ZToxcmVtfWJvZHkgLmludGVyYWN0aXZlX19maWx0ZXJze21hcmdpbjowIGF1dG8gMXJlbX1ib2R5IC5pbnRlcmFjdGl2ZV9fZmlsdGVycyAuc2VhcmNoX19zdWdnZXN0aW9uc3ttYXJnaW4tdG9wOjNweDttYXJnaW4tYm90dG9tOjB9Ym9keSAuaW50ZXJhY3RpdmVfX2dyYXBoaWN7cG9zaXRpb246cmVsYXRpdmU7bWF4LXdpZHRoOjEyNTBweDttYXJnaW46MCBhdXRvfWJvZHkgLmludGVyYWN0aXZlX19zb3VyY2V7bWFyZ2luLWxlZnQ6YXV0bzttYXJnaW4tcmlnaHQ6YXV0bztwYWRkaW5nLWJvdHRvbToycmVtO2JvcmRlci10b3A6MXB4IHNvbGlkICMwMDB9Ym9keSAuaW50ZXJhY3RpdmVfX3NvdXJjZSBwe21hcmdpbjouNXJlbSAwIDA7Zm9udC1zaXplOjE0cHg7Zm9udC1zaXplOjAuODc1cmVtO2ZvbnQtZmFtaWx5OlxcXCJTb3VyY2UgU2FucyBQcm9cXFwiLHNhbnMtc2VyaWY7Y29sb3I6IzRhNGE0YX1ib2R5IC5pbnN0cnVjdGlvbnN7Zm9udC1zdHlsZTppdGFsaWM7Zm9udC1zaXplOi45cmVtO21hcmdpbi10b3A6NnB4O2JvcmRlci10b3A6MXB4IHNvbGlkICNiM2IzYjM7cGFkZGluZzouNXJlbSAwIDA7Y29sb3I6IzRhNGE0YTt0ZXh0LWFsaWduOmNlbnRlcn1ib2R5IC5pbnN0cnVjdGlvbnMgc3BhbntkaXNwbGF5Om5vbmV9QG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogMzVlbSl7Ym9keSAuaW5zdHJ1Y3Rpb25zIHNwYW57ZGlzcGxheTppbmxpbmUtYmxvY2t9fVwiLFwiJGJsYWNrOiAjMDAwO1xcbiR3aGl0ZTogI2ZmZjtcXG4kb2ZmLXdoaXRlOiAjZjdmNGYxO1xcbiRvZmYtd2hpdGUtZGFyazogI2VhZTZlMTtcXG4keWVsbG93OiAjZWFlMTM0O1xcbiRkYXJrLXllbGxvdzogI2NmYzgzYTtcXG4kcmVkOiAjZmU1MDAwO1xcbiRncmVlbjogIzllYjA0MDtcXG4kYmx1ZTogIzBhYTRjZjtcXG4kb3JhbmdlOiAjZjJhZjE5O1xcbiRwdXJwbGU6ICNhMTY4OWM7XFxuJGdyYXk6ICM0YTRhNGE7XFxuJGRhcmstZ3JheTogIzM1MzUzNTtcXG4kZGlzYWJsZWQtZ3JheTogI2IzYjNiMztcXG5cXG4kY29sb3JfZm9vdGVyLWNvbnRhY3QtdGV4dDogI2UwZTFlMjtcXG4kY29sb3JfZm9vdGVyLWNvcHlyaWdodC10ZXh0OiAjMDkwOTA5O1xcbiRjb2xvcl9wb3N0LWxpc3QtYm9yZGVyOiAkZGlzYWJsZWQtZ3JheTtcXG4kY29sb3JfYXVkaW8tcGxheWVyLXByb2dyZXNzLWJhcjogJGRpc2FibGVkLWdyYXk7XFxuJGNvbG9yX2F1ZGlvLXBsYXllci10cmFuc2NyaXB0LWJveDogJG9mZi13aGl0ZS1kYXJrO1xcbiRjb2xvcl9hdWRpby1wbGF5ZXItdHJhbnNjcmlwdC1ib3gtc2hhZG93OiByZ2JhKDAsIDAsIDAsIDAuMik7XFxuJGNvbG9yX2hvbWUtdHJhZGUtZ3V5LXRpdGxlOiAjNDQ0O1xcblxcbiRicm93c2VyLWNvbnRleHQ6IDE2cHg7XFxuLyotLS0tLS0tLS0tICBTdHJ1Y3R1cmFsICAtLS0tLS0tLS0tKi9cXG4kc2l6ZS1tYXgtd2lkdGg6IDcwMHB4O1xcblxcbi8qLS0tLS0tLS0tLSAgRm9udHMgIC0tLS0tLS0tLS0qL1xcbiRmb250X2luY29uc29sYXRhOiAnSW5jb25zb2xhdGEnLCBtb25vc3BhY2U7XFxuJGZvbnRfc291cmNlOiAnU291cmNlIFNhbnMgUHJvJywgc2Fucy1zZXJpZjtcXG4kZm9udGVsbG9fdXJsOiAnLi4vZm9udHMvJztcXG5cXG5AZm9udC1mYWNlIHtcXG4gIGZvbnQtZmFtaWx5OiAndHJhZGVndXlzJztcXG4gIHNyYzogdXJsKCcjeyRmb250ZWxsb191cmx9dHJhZGVndXlzLmVvdD80ODc5MjUwNycpO1xcbiAgc3JjOiB1cmwoJyN7JGZvbnRlbGxvX3VybH10cmFkZWd1eXMuZW90PzQ4NzkyNTA3I2llZml4JylcXG4gICAgICBmb3JtYXQoJ2VtYmVkZGVkLW9wZW50eXBlJyksXFxuICAgIHVybCgnI3skZm9udGVsbG9fdXJsfXRyYWRlZ3V5cy53b2ZmMj80ODc5MjUwNycpIGZvcm1hdCgnd29mZjInKSxcXG4gICAgdXJsKCcjeyRmb250ZWxsb191cmx9dHJhZGVndXlzLndvZmY/NDg3OTI1MDcnKSBmb3JtYXQoJ3dvZmYnKSxcXG4gICAgdXJsKCcjeyRmb250ZWxsb191cmx9dHJhZGVndXlzLnR0Zj80ODc5MjUwNycpIGZvcm1hdCgndHJ1ZXR5cGUnKSxcXG4gICAgdXJsKCcjeyRmb250ZWxsb191cmx9dHJhZGVndXlzLnN2Zz80ODc5MjUwNyN0cmFkZWd1eXMnKSBmb3JtYXQoJ3N2ZycpO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG59XFxuXFxuW2NsYXNzXj0naWNvbi0nXTpiZWZvcmUsXFxuW2NsYXNzKj0nIGljb24tJ106YmVmb3JlIHtcXG4gIGZvbnQtZmFtaWx5OiAndHJhZGVndXlzJztcXG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcXG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICBzcGVhazogbm9uZTtcXG5cXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gIHRleHQtZGVjb3JhdGlvbjogaW5oZXJpdDtcXG4gIHdpZHRoOiAxZW07XFxuICBtYXJnaW4tcmlnaHQ6IDAuMmVtO1xcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgLyogb3BhY2l0eTogLjg7ICovXFxuXFxuICAvKiBGb3Igc2FmZXR5IC0gcmVzZXQgcGFyZW50IHN0eWxlcywgdGhhdCBjYW4gYnJlYWsgZ2x5cGggY29kZXMqL1xcbiAgZm9udC12YXJpYW50OiBub3JtYWw7XFxuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcXG5cXG4gIC8qIGZpeCBidXR0b25zIGhlaWdodCwgZm9yIHR3aXR0ZXIgYm9vdHN0cmFwICovXFxuICBsaW5lLWhlaWdodDogMWVtO1xcblxcbiAgLyogQW5pbWF0aW9uIGNlbnRlciBjb21wZW5zYXRpb24gLSBtYXJnaW5zIHNob3VsZCBiZSBzeW1tZXRyaWMgKi9cXG4gIC8qIHJlbW92ZSBpZiBub3QgbmVlZGVkICovXFxuICBtYXJnaW4tbGVmdDogMC4yZW07XFxuXFxuICAvKiB5b3UgY2FuIGJlIG1vcmUgY29tZm9ydGFibGUgd2l0aCBpbmNyZWFzZWQgaWNvbnMgc2l6ZSAqL1xcbiAgLyogZm9udC1zaXplOiAxMjAlOyAqL1xcblxcbiAgLyogRm9udCBzbW9vdGhpbmcuIFRoYXQgd2FzIHRha2VuIGZyb20gVFdCUyAqL1xcbiAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7XFxuICAtbW96LW9zeC1mb250LXNtb290aGluZzogZ3JheXNjYWxlO1xcblxcbiAgLyogVW5jb21tZW50IGZvciAzRCBlZmZlY3QgKi9cXG4gIC8qIHRleHQtc2hhZG93OiAxcHggMXB4IDFweCByZ2JhKDEyNywgMTI3LCAxMjcsIDAuMyk7ICovXFxufVxcbi5pY29uLWVtYWlsOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU4MDEnO1xcbn0gLyogJ+6ggScgKi9cXG4uaWNvbi1wcmludDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlODA0JztcXG59IC8qICfuoIQnICovXFxuLmljb24tbGluazpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlODA1JztcXG59IC8qICfuoIUnICovXFxuLmljb24taWNvbl9jaGVjazpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlODc4JztcXG59IC8qICfuobgnICovXFxuLmljb24tdHJhbnNjcmlwdDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlODliJztcXG59IC8qICfuopsnICovXFxuLmljb24teW91dHViZTpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlOTgzJztcXG59IC8qICfupoMnICovXFxuLmljb24tYW5nbGUtbGVmdDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlOTkyJztcXG59IC8qICfuppInICovXFxuLmljb24tYW5nbGUtcmlnaHQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZTk5Myc7XFxufSAvKiAn7qaTJyAqL1xcbi5pY29uLWFycm93LWxlZnQ6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZTk5ZCc7XFxufSAvKiAn7qadJyAqL1xcbi5pY29uLWFycm93LXJpZ2h0OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGU5OWUnO1xcbn0gLyogJ+6mnicgKi9cXG4uaWNvbi1jbG9zZS1sZzpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlOWJkJztcXG59IC8qICfupr0nICovXFxuLmljb24tcGx1cy1sZzpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlYTgxJztcXG59IC8qICfuqoEnICovXFxuLmljb24tcnNzOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGViZWUnO1xcbn0gLyogJ+6vricgKi9cXG4uaWNvbi12aWRlbzpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxlYmYwJztcXG59IC8qICfur7AnICovXFxuLmljb24tcXVvdGU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZWJmMSc7XFxufSAvKiAn7q+xJyAqL1xcbi5pY29uLW1lbnU6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZWJmMic7XFxufSAvKiAn7q+yJyAqL1xcbi5pY29uLXBhdXNlOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYwMGUnO1xcbn0gLyogJ++AjicgKi9cXG4uaWNvbi1wbGF5OmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYwMGYnO1xcbn0gLyogJ++AjycgKi9cXG4uaWNvbi1saW5rZWRpbjpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMGUxJztcXG59IC8qICfvg6EnICovXFxuLmljb24tY2hhcnQtbGluZTpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMjAxJztcXG59IC8qICfviIEnICovXFxuLmljb24tZmFjZWJvb2s6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZjIzMSc7XFxufSAvKiAn74ixJyAqL1xcbi5pY29uLWdvb2dsZTpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMjM0JztcXG59IC8qICfviLQnICovXFxuLmljb24tdHdpdHRlcjpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMjQzJztcXG59IC8qICfviYMnICovXFxuLmljb24tcGx1czpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMmM3JztcXG59IC8qICfvi4cnICovXFxuLmljb24tY2xvc2U6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZjJkNyc7XFxufSAvKiAn74uXJyAqL1xcbi5pY29uLXNlYXJjaDpiZWZvcmUge1xcbiAgY29udGVudDogJ1xcXFxmMmY1JztcXG59IC8qICfvi7UnICovXFxuLmljb24tZXh0ZXJuYWw6YmVmb3JlIHtcXG4gIGNvbnRlbnQ6ICdcXFxcZjM5Yyc7XFxufSAvKiAn746cJyAqL1xcbi5pY29uLXNoYXJlOmJlZm9yZSB7XFxuICBjb250ZW50OiAnXFxcXGYzYWMnO1xcbn0gLyogJ++OrCcgKi9cXG5cIixcIkB1c2UgJ3ZhcmlhYmxlcycgYXMgKjtcXG5AdXNlICdtaXhpbnMnIGFzICo7XFxuXFxuYm9keSB7XFxuICAtLWJyZWFrcG9pbnQ6ICd4c21hbGwnO1xcbiAgZm9udC1mYW1pbHk6ICRmb250LXNvdXJjZTtcXG4gIGZvbnQtc2l6ZTogJGJyb3dzZXItY29udGV4dDtcXG4gIG1hcmdpbjogMDtcXG4gIGNvbG9yOiAkYmxhY2s7XFxuICAtd2Via2l0LWZvbnQtc21vb3RoaW5nOiBhbnRpYWxpYXNlZDtcXG4gIC1tb3otb3N4LWZvbnQtc21vb3RoaW5nOiBncmF5c2NhbGU7XFxuXFxuICBAaW5jbHVkZSBicmVha3BvaW50KHNtYWxsKSB7XFxuICAgIC0tYnJlYWtwb2ludDogJ3NtYWxsJztcXG4gIH1cXG5cXG4gIEBpbmNsdWRlIGJyZWFrcG9pbnQobWVkaXVtKSB7XFxuICAgIC0tYnJlYWtwb2ludDogJ21lZGl1bSc7XFxuICB9XFxuXFxuICBAaW5jbHVkZSBicmVha3BvaW50KGxhcmdlKSB7XFxuICAgIC0tYnJlYWtwb2ludDogJ2xhcmdlJztcXG4gIH1cXG59XFxuXFxucCB7XFxuICBtYXJnaW46IDAgMCAxLjVyZW07XFxufVxcblxcbnN1cCB7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICB0b3A6IC0wLjRlbTtcXG59XFxuXFxuLyo9PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbj0gICAgICAgICAgICBMaW5rcyAgICAgICAgICAgID1cXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PSovXFxuXFxuJWRhc2hlZC11bmRlcmxpbmUge1xcbiAgYm9yZGVyLWJvdHRvbTogMXB4IGRhc2hlZCAkYmxhY2s7XFxufVxcblxcbiVleHRlcm5hbC1saW5rcyB7XFxuICBhW2hyZWYqPVxcXCIvL1xcXCJdOm5vdChbaHJlZio9XFxcInRyYWRlZ3V5cy5jc2lzLm9yZ1xcXCJdKSB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWFyZ2luLWxlZnQ6IDEuNXJlbTtcXG4gICAgJjo6YmVmb3JlIHtcXG4gICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgbGVmdDogLTEuNXJlbTtcXG4gICAgICBjb250ZW50OiAnXFxcXGYzOWMnO1xcbiAgICAgIGZvbnQtZmFtaWx5OiAndHJhZGVndXlzJztcXG4gICAgfVxcbiAgfVxcbn1cXG5cXG5hIHtcXG4gIGNvbG9yOiBpbmhlcml0O1xcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZS1pbi1vdXQ7XFxuXFxuICAmOnZpc2l0ZWQge1xcbiAgfVxcbiAgJjpob3ZlcixcXG4gICY6Zm9jdXMsXFxuICAmOmFjdGl2ZSB7XFxuICB9XFxuICAmOmZvY3VzIHtcXG4gICAgb3V0bGluZTogdGhpbiBkb3R0ZWQ7XFxuICB9XFxuICAmOmhvdmVyLFxcbiAgJjphY3RpdmUge1xcbiAgICBvdXRsaW5lOiAwO1xcbiAgfVxcblxcbiAgcCAmLFxcbiAgLnBvc3QtY29udGVudCB1bCAmLFxcbiAgLnBvc3QtY29udGVudCBvbCAmIHtcXG4gICAgQGV4dGVuZCAlZGFzaGVkLXVuZGVybGluZTtcXG4gICAgQGluY2x1ZGUgd2lwZS1saW5rLWhvdmVyLWJhY2tncm91bmQoJHllbGxvdyk7XFxuICB9XFxufVxcbi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG49ICAgICAgICAgICAgTGlzdHMgICAgICAgICAgICA9XFxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xcbnVsIHtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmctaW5saW5lLXN0YXJ0OiAyNHB4O1xcbiAgbGlzdC1zdHlsZTogbm9uZTtcXG5cXG4gIGxpIHtcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2luY29uc29sYXRhO1xcbiAgICAmOmJlZm9yZSB7XFxuICAgICAgZm9udC1mYW1pbHk6ICRmb250X3NvdXJjZTtcXG4gICAgICBmb250LXdlaWdodDogYm9sZDtcXG4gICAgICBsaW5lLWhlaWdodDogMTtcXG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgdG9wOiAtMC4xcmVtO1xcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG4gICAgICB3aWR0aDogMXJlbTtcXG4gICAgICBtYXJnaW4tbGVmdDogLTEuNXJlbTtcXG4gICAgICBjb250ZW50OiAnXFxcXDI1ODgnO1xcbiAgICB9XFxuXFxuICAgICYuY2hpbmE6OmJlZm9yZSB7XFxuICAgICAgY29sb3I6ICRyZWQ7XFxuICAgIH1cXG4gICAgJi5ldTo6YmVmb3JlIHtcXG4gICAgICBjb2xvcjogJGJsdWU7XFxuICAgIH1cXG4gICAgJi5tZXhpY286OmJlZm9yZSB7XFxuICAgICAgY29sb3I6ICRvcmFuZ2U7XFxuICAgIH1cXG4gICAgJi5jYW5hZGE6OmJlZm9yZSB7XFxuICAgICAgY29sb3I6ICRncmVlbjtcXG4gICAgfVxcbiAgfVxcbn1cXG5cIixcIi8qKlxcbiAqIE1peGluc1xcbiAqL1xcbkB1c2UgJ3Nhc3M6bWF0aCc7XFxuQHVzZSAndmFyaWFibGVzJyBhcyAqO1xcbi8vIFJlbSBvdXRwdXQgd2l0aCBweCBmYWxsYmFja1xcblxcbkBmdW5jdGlvbiBjYWxjdWxhdGVSZW0oJHNpemUpIHtcXG4gICRyZW1TaXplOiBtYXRoLmRpdigkc2l6ZSwgJGJyb3dzZXItY29udGV4dCk7XFxuICBAcmV0dXJuICN7JHJlbVNpemV9cmVtO1xcbn1cXG5cXG5AbWl4aW4gZm9udFNpemUoJHNpemUpIHtcXG4gIGZvbnQtc2l6ZTogJHNpemU7IC8vRmFsbGJhY2sgaW4gcHhcXG4gIGZvbnQtc2l6ZTogY2FsY3VsYXRlUmVtKCRzaXplKTtcXG59XFxuXFxuJGJyZWFrcG9pbnQteGxhcmdlOiA5MGVtO1xcbiRicmVha3BvaW50LWxhcmdlOiA2NGVtO1xcbiRicmVha3BvaW50LW1lZGl1bTogNDhlbTtcXG4kYnJlYWtwb2ludC1zbWFsbDogMzVlbTtcXG4kYnJlYWtwb2ludC14c21hbGw6IDI1ZW07XFxuXFxuQG1peGluIGJyZWFrcG9pbnQoJGJyZWFrKSB7XFxuICBAaWYgJGJyZWFrID09IHhsYXJnZSB7XFxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRicmVha3BvaW50LXhsYXJnZSkge1xcbiAgICAgIEBjb250ZW50O1xcbiAgICB9XFxuICB9IEBlbHNlIGlmICRicmVhayA9PSBsYXJnZSB7XFxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRicmVha3BvaW50LWxhcmdlKSB7XFxuICAgICAgQGNvbnRlbnQ7XFxuICAgIH1cXG4gIH0gQGVsc2UgaWYgJGJyZWFrID09IG1lZGl1bSB7XFxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRicmVha3BvaW50LW1lZGl1bSkge1xcbiAgICAgIEBjb250ZW50O1xcbiAgICB9XFxuICB9IEBlbHNlIGlmICRicmVhayA9PSBzbWFsbCB7XFxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtaW4td2lkdGg6ICRicmVha3BvaW50LXNtYWxsKSB7XFxuICAgICAgQGNvbnRlbnQ7XFxuICAgIH1cXG4gIH0gQGVsc2UgaWYgJGJyZWFrID09IHhzbWFsbCB7XFxuICAgIEBtZWRpYSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6ICRicmVha3BvaW50LXhzbWFsbCkge1xcbiAgICAgIEBjb250ZW50O1xcbiAgICB9XFxuICB9IEBlbHNlIHtcXG4gICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1pbi13aWR0aDogJGJyZWFrKSB7XFxuICAgICAgQGNvbnRlbnQ7XFxuICAgIH1cXG4gIH1cXG59XFxuXFxuQG1peGluIHdpcGUtbGluay1iYWNrZ3JvdW5kKCRiYWNrZ3JvdW5kLWNvbG9yOiAkeWVsbG93KSB7XFxuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQoXFxuICAgIHRvIHRvcCxcXG4gICAgJGJhY2tncm91bmQtY29sb3IgNzUlLFxcbiAgICB0cmFuc3BhcmVudCAwJVxcbiAgKTtcXG4gIGJhY2tncm91bmQtcG9zaXRpb246IHVuc2V0O1xcbiAgYmFja2dyb3VuZC1yZXBlYXQ6IHJlcGVhdC14O1xcbiAgYmFja2dyb3VuZC1zaXplOiAxMDAlIDEwMCU7XFxufVxcblxcbkBtaXhpbiB3aXBlLWxpbmstaG92ZXItYmFja2dyb3VuZCgkYmFja2dyb3VuZC1jb2xvcjogJHllbGxvdywgJHdpZHRoOiAxMDAlKSB7XFxuICB3aWR0aDogJHdpZHRoO1xcbiAgYmFja2dyb3VuZC1pbWFnZTogbGluZWFyLWdyYWRpZW50KFxcbiAgICB0cmFuc3BhcmVudCBjYWxjKDIwJSksXFxuICAgICRiYWNrZ3JvdW5kLWNvbG9yIDIwJVxcbiAgKTtcXG4gIGJhY2tncm91bmQtcmVwZWF0OiBuby1yZXBlYXQ7XFxuICBiYWNrZ3JvdW5kLXNpemU6IDAlIDEwMCU7XFxuICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcXG5cXG4gICY6aG92ZXIge1xcbiAgICBiYWNrZ3JvdW5kLXNpemU6IDEwMCUgMTAwJTtcXG4gIH1cXG59XFxuXCIsXCIvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuPSAgICAgICAgICAgIFRvb2x0aXBzICAgICAgICAgICAgPVxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cXG5AdXNlICdiYXNlL21peGlucycgYXMgKjtcXG5AdXNlICdiYXNlL3ZhcmlhYmxlcycgYXMgKjtcXG5cXG4udG9vbHRpcCxcXG4udG9vbHRpcC1pbmZvIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgQGluY2x1ZGUgZm9udFNpemUoMTRweCk7XFxuICBsaW5lLWhlaWdodDogMS40O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgei1pbmRleDogMjA7XFxuICB2aXNpYmlsaXR5OiBoaWRkZW47XFxuICB3aWR0aDogZml0LWNvbnRlbnQ7XFxuICBtYXgtd2lkdGg6IDE3NXB4O1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbWFyZ2luOiAwIDE1cHg7XFxuICBwYWRkaW5nOiA4cHggOHB4IDEwcHg7XFxuICBwb2ludGVyLWV2ZW50czogbm9uZTtcXG4gIG9wYWNpdHk6IDA7XFxuICBib3JkZXI6IDFweCBzb2xpZCAkZGlzYWJsZWQtZ3JheTtcXG4gIGJvcmRlci1yYWRpdXM6IDNweDtcXG4gIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG5cXG4gIHAge1xcbiAgICBtYXJnaW46IDA7XFxuICB9XFxuXFxuICAudG9vbHRpcC1oZWFkaW5nIHtcXG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNDtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIG1hcmdpbi1ib3R0b206IDAuNXJlbTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgJGJsYWNrO1xcblxcbiAgICBAaW5jbHVkZSBicmVha3BvaW50KCdzbWFsbCcpIHtcXG4gICAgICBsaW5lLWhlaWdodDogMS40O1xcbiAgICB9XFxuXFxuICAgIC5sb2NhdGlvbiB7XFxuICAgICAgZGlzcGxheTogYmxvY2s7XFxuICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTBweCk7XFxuICAgICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICB9XFxuICB9XFxuXFxuICAudG9vbHRpcC1sYWJlbCB7XFxuICAgIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xcblxcbiAgICAmLmluZGVudGVkIHtcXG4gICAgICBwYWRkaW5nLWxlZnQ6IDAuNzVyZW07XFxuICAgIH1cXG4gIH1cXG5cXG4gIC50b29sdGlwLWxpc3Qge1xcbiAgICBsaSB7XFxuICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTRweCk7XFxuXFxuICAgICAgJjpiZWZvcmUge1xcbiAgICAgICAgQGluY2x1ZGUgZm9udFNpemUoOXB4KTtcXG4gICAgICB9XFxuICAgIH1cXG5cXG4gICAgLmFjdGl2ZS1jYXRlZ29yeSB7XFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC50b29sdGlwLWNsb3NlIHtcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgei1pbmRleDogMjU7XFxuICAgIHRvcDogMC4yNXJlbTtcXG4gICAgcmlnaHQ6IDAuNXJlbTtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxuICAgIHdpZHRoOiAyNSU7XFxuICAgIHRleHQtYWxpZ246IHJpZ2h0O1xcbiAgICBwb2ludGVyLWV2ZW50czogYWxsO1xcblxcbiAgICBAaW5jbHVkZSBicmVha3BvaW50KCdzbWFsbCcpIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICB9XFxuICB9XFxufVxcblxcbi50b29sdGlwLWluZm8ge1xcbiAgbWF4LXdpZHRoOiAxMDBweDtcXG5cXG4gIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICBtYXgtd2lkdGg6IDMwMHB4O1xcbiAgfVxcbn1cXG5cIixcIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbj0gICAgICAgICAgICBGb3JtIEVsZW1lbnRzICAgICAgICAgICAgPVxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xcbkB1c2UgJ2Jhc2UvbWl4aW5zJyBhcyAqO1xcbkB1c2UgJ2Jhc2UvdmFyaWFibGVzJyBhcyAqO1xcblxcbi5sZWdlbmQtbGFiZWwge1xcbiAgZm9udC1mYW1pbHk6ICRmb250X2luY29uc29sYXRhO1xcbiAgJjpiZWZvcmUge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIHdpZHRoOiAxcmVtO1xcbiAgICBoZWlnaHQ6IDFyZW07XFxuICAgIG1hcmdpbi1yaWdodDogMC41cmVtO1xcbiAgICBjb250ZW50OiAnJztcXG4gICAgdHJhbnNpdGlvbjogMC4ycztcXG4gICAgdmVydGljYWwtYWxpZ246IC0wLjJlbTtcXG4gICAgYm9yZGVyOiAxcHggc29saWQkYmxhY2s7XFxuICB9XFxuXFxuICAmLmFsbDpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkeWVsbG93O1xcbiAgfVxcbiAgJi5jaGluYTpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkcmVkO1xcbiAgfVxcbiAgJi5jYW5hZGE6YmVmb3JlIHtcXG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGdyZWVuO1xcbiAgfVxcbiAgJi5ldTpiZWZvcmUge1xcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmx1ZTtcXG4gIH1cXG4gICYubWV4aWNvOmJlZm9yZSB7XFxuICAgIGJhY2tncm91bmQtY29sb3I6ICRvcmFuZ2U7XFxuICB9XFxufVxcblxcbmlucHV0IHtcXG4gIEBpbmNsdWRlIGZvbnRTaXplKDE4cHgpO1xcbiAgbGluZS1oZWlnaHQ6IDEuNzg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDFweDtcXG4gIGxlZnQ6IDJweDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBtYXJnaW46IDA7XFxuICBwYWRkaW5nOiAwO1xcbiAgb3BhY2l0eTogMDtcXG5cXG4gICY6bm90KDpjaGVja2VkKSB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gIH1cXG5cXG4gICY6Y2hlY2tlZCArIGxhYmVsOjphZnRlciB7XFxuICAgIGZvbnQtZmFtaWx5OiAndHJhZGVndXlzJztcXG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gICAgdG9wOiAxcHg7XFxuICAgIGxlZnQ6IDFweDtcXG4gICAgY29udGVudDogJ1xcXFxlODc4JztcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbiAgICBjb2xvcjogJGJsYWNrO1xcbiAgfVxcbn1cXG5cIixcIi8qPT09PT09PT09PT09PT09PT09PT09PT09PT09PVxcbj0gICAgICAgICAgICBDaGFydCAgICAgICAgICAgPVxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT0qL1xcbkB1c2UgJ2Jhc2UvbWl4aW5zJyBhcyAqO1xcbkB1c2UgJ2Jhc2UvdmFyaWFibGVzJyBhcyAqO1xcblxcbnNlY3Rpb24ge1xcbn1cXG4uY2hhcnQge1xcbiAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzVlbSkge1xcbiAgICB3aWR0aDogMTA1JTtcXG5cXG4gICAgZm9yZWlnbk9iamVjdCBkaXYge1xcbiAgICAgIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNHB4KTtcXG4gICAgfVxcbiAgfVxcblxcbiAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgIG1heC13aWR0aDogJHNpemUtbWF4LXdpZHRoO1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgfVxcblxcbiAgc3ZnIHtcXG4gICAgLnN0YXRlTW9kYWwge1xcbiAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9pbmNvbnNvbGF0YTtcXG4gICAgICBsaW5lLWhlaWdodDogMS42O1xcbiAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDEyLjVweCk7XFxuXFxuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgxOHB4KTtcXG4gICAgICB9XFxuXFxuICAgICAgLm1vZGFsLWhlYWRpbmcge1xcbiAgICAgICAgZm9udC1mYW1pbHk6ICRmb250X3NvdXJjZTtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xcbiAgICAgICAgbGV0dGVyLXNwYWNpbmc6IDEuNHB4O1xcbiAgICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTZweCk7XFxuXFxuICAgICAgICBAaW5jbHVkZSBicmVha3BvaW50KCdzbWFsbCcpIHtcXG4gICAgICAgICAgQGluY2x1ZGUgZm9udFNpemUoMjRweCk7XFxuICAgICAgICB9XFxuICAgICAgfVxcblxcbiAgICAgIHVsIHtcXG4gICAgICAgIGxpIHtcXG4gICAgICAgICAgJjpiZWZvcmUge1xcbiAgICAgICAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDEycHgpO1xcbiAgICAgICAgICB9XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICB9XFxuXFxuICAgIC5ncm91cCB7XFxuICAgICAgY3Vyc29yOiB6b29tLWluO1xcblxcbiAgICAgIC5sYWJlbCB7XFxuICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgxMnB4KTtcXG4gICAgICAgIGZpbGw6ICRibGFjaztcXG4gICAgICAgIHN0cm9rZTogJHdoaXRlO1xcbiAgICAgICAgcGFpbnQtb3JkZXI6IHN0cm9rZTtcXG4gICAgICAgIHN0cm9rZS13aWR0aDogM3B4O1xcbiAgICAgICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcXG4gICAgICAgIGZvbnQtd2VpZ2h0OiA4MDA7XFxuICAgICAgICB0cmFuc2l0aW9uOiBhbGwgMC4ycyBlYXNlLWluLW91dDtcXG5cXG4gICAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgxOHB4KTtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgLnN0YXRlIHtcXG4gICAgICAgIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2UtaW4tb3V0O1xcbiAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzVlbSkge1xcbiAgICAgICAgICBzdHJva2Utd2lkdGg6IDIgIWltcG9ydGFudDtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgLnBlcmNlbnQge1xcbiAgICAgICAgQG1lZGlhIHNjcmVlbiBhbmQgKG1heC13aWR0aDogMzVlbSkge1xcbiAgICAgICAgICBzdHJva2Utd2lkdGg6IDAgIWltcG9ydGFudDtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuXFxuICAgICAgJjpob3ZlciAuc3RhdGUge1xcbiAgICAgICAgc3Ryb2tlOiAjZWFlMTM0O1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cXG4vKj09PT09PT09PT09PT09PT09PT09PT09PT09PT1cXG49ICAgICAgICAgIExlZ2VuZCAgICAgICAgICAgID1cXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cXG5cXG4ubGVnZW5kIHtcXG4gIG1hcmdpbjogMjRweCAxMnB4IDEycHg7XFxuXFxuICBAaW5jbHVkZSBicmVha3BvaW50KCdzbWFsbCcpIHtcXG4gICAgbWFyZ2luOiAyNHB4IDAgMTJweDtcXG4gIH1cXG5cXG4gIC5sZWdlbmQtdGl0bGUge1xcbiAgICAtbXMtZmxleC1wcmVmZXJyZWQtc2l6ZTogMTAwJTtcXG4gICAgZmxleC1iYXNpczogMTAwJTtcXG4gICAgZm9udC1mYW1pbHk6ICRmb250X2luY29uc29sYXRhO1xcbiAgICBmb250LXdlaWdodDogNDAwO1xcbiAgICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgICBAaW5jbHVkZSBmb250U2l6ZSgxNHB4KTtcXG4gICAgbGV0dGVyLXNwYWNpbmc6IDEuMnB4O1xcbiAgfVxcblxcbiAgPiAuZGlyZWN0aW9uIHtcXG4gICAgLW1zLWZsZXgtcHJlZmVycmVkLXNpemU6IDEwMCU7XFxuICAgIGZsZXgtYmFzaXM6IDEwMCU7XFxuICAgIGZvbnQtc3R5bGU6IGl0YWxpYztcXG4gICAgQGluY2x1ZGUgZm9udFNpemUoMTJweCk7XFxuICAgIG1hcmdpbi10b3A6IDZweDtcXG4gIH1cXG5cXG4gIC5jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgLW1zLWZsZXgtd3JhcDogd3JhcDtcXG4gICAgZmxleC13cmFwOiB3cmFwO1xcbiAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcblxcbiAgICAubGVnZW5kLWJhciB7XFxuICAgICAgZm9udC1mYW1pbHk6ICRmb250X2luY29uc29sYXRhO1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjI7XFxuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgICAgcGFkZGluZzogNnB4O1xcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR3aGl0ZTtcXG4gICAgICAtbXMtZmxleC13cmFwOiB3cmFwO1xcbiAgICAgIGZsZXgtd3JhcDogd3JhcDtcXG4gICAgICAtbXMtZmxleC1hbGlnbjogY2VudGVyO1xcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuXFxuICAgICAgQGluY2x1ZGUgYnJlYWtwb2ludCgnc21hbGwnKSB7XFxuICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBtYXJnaW4tbGVmdDogMzZweDtcXG4gICAgICAgIHdpZHRoOiAxMDAlO1xcbiAgICAgICAgLW1zLWZsZXg6IDAgMCAyMjRweDtcXG4gICAgICAgIGZsZXg6IDAgMCAyMjRweDtcXG5cXG4gICAgICAgICY6YmVmb3JlIHtcXG4gICAgICAgICAgY29udGVudDogJyc7XFxuICAgICAgICAgIGRpc3BsYXk6IGJsb2NrO1xcbiAgICAgICAgICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICAgICAgICAgIHRvcDogMDtcXG4gICAgICAgICAgbGVmdDogLTI0cHg7XFxuICAgICAgICAgIHdpZHRoOiAxcHg7XFxuICAgICAgICAgIGhlaWdodDogMTIwJTtcXG4gICAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGJsYWNrO1xcbiAgICAgICAgfVxcbiAgICAgIH1cXG5cXG4gICAgICA+IGRpdiB7XFxuICAgICAgICBwYWRkaW5nLWxlZnQ6IDEycHg7XFxuICAgICAgICBAaW5jbHVkZSBmb250U2l6ZSgxNnB4KTtcXG5cXG4gICAgICAgIC5taW4tbWF4IHtcXG4gICAgICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTRweCk7XFxuICAgICAgICB9XFxuICAgICAgfVxcbiAgICB9XFxuXFxuICAgIC5jb3VudHJpZXMge1xcbiAgICAgIGRpc3BsYXk6IC1tcy1mbGV4Ym94O1xcbiAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgLW1zLWZsZXgtYWxpZ246IGNlbnRlcjtcXG4gICAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICAgIC1tcy1mbGV4LXdyYXA6IHdyYXA7XFxuICAgICAgZmxleC13cmFwOiB3cmFwO1xcblxcbiAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgICAgLW1zLWZsZXg6IDAgMCBjYWxjKDEwMCUgLSAzMDBweCk7XFxuICAgICAgICBmbGV4OiAwIDAgY2FsYygxMDAlIC0gMzAwcHgpO1xcbiAgICAgIH1cXG5cXG4gICAgICAubGVnZW5kLWl0ZW0ge1xcbiAgICAgICAgQGluY2x1ZGUgZm9udFNpemUoMTZweCk7XFxuICAgICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgICAgICBkaXNwbGF5OiAtbXMtZmxleGJveDtcXG4gICAgICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICAgICAgbWFyZ2luOiAwIDZweCA2cHggMDtcXG4gICAgICAgIC1tcy1mbGV4OiAxIDAgNDclO1xcbiAgICAgICAgZmxleDogMSAwIDQ3JTtcXG5cXG4gICAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgICAgICAtbXMtZmxleDogMSAwIGF1dG87XFxuICAgICAgICAgIGZsZXg6IDEgMCBhdXRvO1xcbiAgICAgICAgICBtYXJnaW46IDAgNnB4IDAgMDtcXG4gICAgICAgIH1cXG4gICAgICB9XFxuICAgIH1cXG4gIH1cXG59XFxuXCIsXCIvKj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XFxuPSAgICAgICAgICAgIFBhZ2UgTGF5b3V0ICAgICAgICAgICAgPVxcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09Ki9cXG5AdXNlICdiYXNlL21peGlucycgYXMgKjtcXG5AdXNlICdiYXNlL3ZhcmlhYmxlcycgYXMgKjtcXG5cXG5ib2R5IHtcXG4gID4gKjpub3QoLnRvb2x0aXApOm5vdCguY2hhcnQpIHtcXG4gICAgbWF4LXdpZHRoOiAkc2l6ZS1tYXgtd2lkdGg7XFxuICAgIG1hcmdpbi1sZWZ0OiAxMnB4O1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEycHg7XFxuXFxuICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xcbiAgICAgIG1hcmdpbi1yaWdodDogYXV0bztcXG4gICAgfVxcbiAgfVxcblxcbiAgLmludGVyYWN0aXZlX19oZWFkZXIge1xcbiAgICBtYXJnaW46IDFyZW0gYXV0bztcXG4gICAgcGFkZGluZy1ib3R0b206IDEuMjVyZW07XFxuICAgIGJvcmRlci1ib3R0b206IDA7XFxuXFxuICAgIC5pbnRlcmFjdGl2ZV9fdGl0bGUge1xcbiAgICAgIGZvbnQtZmFtaWx5OiAkZm9udF9zb3VyY2U7XFxuICAgICAgQGluY2x1ZGUgZm9udFNpemUoMjBweCk7XFxuICAgICAgbGluZS1oZWlnaHQ6IDEuMzY7XFxuICAgICAgbGV0dGVyLXNwYWNpbmc6IDEuNHB4O1xcbiAgICAgIGNvbG9yOiAkYmxhY2s7XFxuXFxuICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICB9XFxuXFxuICAgIHAge1xcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjc4O1xcbiAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDE2cHgpO1xcbiAgICB9XFxuICB9XFxuXFxuICAuaW50ZXJhY3RpdmVfX2ZpbHRlcnMge1xcbiAgICBtYXJnaW46IDAgYXV0byAxcmVtO1xcblxcbiAgICAuc2VhcmNoX19zdWdnZXN0aW9ucyB7XFxuICAgICAgbWFyZ2luLXRvcDogM3B4O1xcbiAgICAgIG1hcmdpbi1ib3R0b206IDA7XFxuICAgIH1cXG4gIH1cXG5cXG4gIC5pbnRlcmFjdGl2ZV9fZ3JhcGhpYyB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgbWF4LXdpZHRoOiAxMjUwcHg7XFxuICAgIG1hcmdpbjogMCBhdXRvO1xcbiAgfVxcblxcbiAgLmludGVyYWN0aXZlX19zb3VyY2Uge1xcbiAgICBtYXJnaW4tbGVmdDogYXV0bztcXG4gICAgbWFyZ2luLXJpZ2h0OiBhdXRvO1xcbiAgICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICRibGFjaztcXG5cXG4gICAgcCB7XFxuICAgICAgbWFyZ2luOiAwLjVyZW0gMCAwO1xcbiAgICAgIEBpbmNsdWRlIGZvbnRTaXplKDE0cHgpO1xcbiAgICAgIGZvbnQtZmFtaWx5OiAkZm9udC1zb3VyY2U7XFxuICAgICAgY29sb3I6ICRncmF5O1xcbiAgICB9XFxuICB9XFxuXFxuICAuaW5zdHJ1Y3Rpb25zIHtcXG4gICAgZm9udC1zdHlsZTogaXRhbGljO1xcbiAgICBmb250LXNpemU6IDAuOXJlbTtcXG4gICAgbWFyZ2luLXRvcDogNnB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgJGRpc2FibGVkLWdyYXk7XFxuICAgIHBhZGRpbmc6IDAuNXJlbSAwIDA7XFxuICAgIGNvbG9yOiAkZ3JheTtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcblxcbiAgICBzcGFuIHtcXG4gICAgICBkaXNwbGF5OiBub25lO1xcbiAgICAgIEBpbmNsdWRlIGJyZWFrcG9pbnQoJ3NtYWxsJykge1xcbiAgICAgICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICAgIH1cXG4gICAgfVxcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdGlmIChjYWNoZWRNb2R1bGUuZXJyb3IgIT09IHVuZGVmaW5lZCkgdGhyb3cgY2FjaGVkTW9kdWxlLmVycm9yO1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHR0cnkge1xuXHRcdHZhciBleGVjT3B0aW9ucyA9IHsgaWQ6IG1vZHVsZUlkLCBtb2R1bGU6IG1vZHVsZSwgZmFjdG9yeTogX193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0sIHJlcXVpcmU6IF9fd2VicGFja19yZXF1aXJlX18gfTtcblx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmkuZm9yRWFjaChmdW5jdGlvbihoYW5kbGVyKSB7IGhhbmRsZXIoZXhlY09wdGlvbnMpOyB9KTtcblx0XHRtb2R1bGUgPSBleGVjT3B0aW9ucy5tb2R1bGU7XG5cdFx0ZXhlY09wdGlvbnMuZmFjdG9yeS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBleGVjT3B0aW9ucy5yZXF1aXJlKTtcblx0fSBjYXRjaChlKSB7XG5cdFx0bW9kdWxlLmVycm9yID0gZTtcblx0XHR0aHJvdyBlO1xuXHR9XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbl9fd2VicGFja19yZXF1aXJlX18uYyA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfXztcblxuLy8gZXhwb3NlIHRoZSBtb2R1bGUgZXhlY3V0aW9uIGludGVyY2VwdG9yXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmkgPSBbXTtcblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCIvLyBUaGlzIGZ1bmN0aW9uIGFsbG93IHRvIHJlZmVyZW5jZSBhbGwgY2h1bmtzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmh1ID0gKGNodW5rSWQpID0+IHtcblx0Ly8gcmV0dXJuIHVybCBmb3IgZmlsZW5hbWVzIGJhc2VkIG9uIHRlbXBsYXRlXG5cdHJldHVybiBcIlwiICsgY2h1bmtJZCArIFwiLlwiICsgX193ZWJwYWNrX3JlcXVpcmVfXy5oKCkgKyBcIi5ob3QtdXBkYXRlLmpzXCI7XG59OyIsIi8vIFRoaXMgZnVuY3Rpb24gYWxsb3cgdG8gcmVmZXJlbmNlIGFsbCBjaHVua3Ncbl9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YgPSAoY2h1bmtJZCkgPT4ge1xuXHQvLyByZXR1cm4gdXJsIGZvciBmaWxlbmFtZXMgYmFzZWQgb24gdGVtcGxhdGVcblx0cmV0dXJuIHVuZGVmaW5lZDtcbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGID0gKCkgPT4gKFwibWFpbi5cIiArIF9fd2VicGFja19yZXF1aXJlX18uaCgpICsgXCIuaG90LXVwZGF0ZS5qc29uXCIpOyIsIl9fd2VicGFja19yZXF1aXJlX18uaCA9ICgpID0+IChcIjc5NGY0MzQyN2E2MWY2NjJmNGQzXCIpIiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwidmFyIGluUHJvZ3Jlc3MgPSB7fTtcbnZhciBkYXRhV2VicGFja1ByZWZpeCA9IFwidGFyaWZmLWltcGFjdC1zdGF0ZXM6XCI7XG4vLyBsb2FkU2NyaXB0IGZ1bmN0aW9uIHRvIGxvYWQgYSBzY3JpcHQgdmlhIHNjcmlwdCB0YWdcbl9fd2VicGFja19yZXF1aXJlX18ubCA9ICh1cmwsIGRvbmUsIGtleSwgY2h1bmtJZCkgPT4ge1xuXHRpZihpblByb2dyZXNzW3VybF0pIHsgaW5Qcm9ncmVzc1t1cmxdLnB1c2goZG9uZSk7IHJldHVybjsgfVxuXHR2YXIgc2NyaXB0LCBuZWVkQXR0YWNoO1xuXHRpZihrZXkgIT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBzY3JpcHRzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzY3JpcHRcIik7XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHNjcmlwdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBzID0gc2NyaXB0c1tpXTtcblx0XHRcdGlmKHMuZ2V0QXR0cmlidXRlKFwic3JjXCIpID09IHVybCB8fCBzLmdldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiKSA9PSBkYXRhV2VicGFja1ByZWZpeCArIGtleSkgeyBzY3JpcHQgPSBzOyBicmVhazsgfVxuXHRcdH1cblx0fVxuXHRpZighc2NyaXB0KSB7XG5cdFx0bmVlZEF0dGFjaCA9IHRydWU7XG5cdFx0c2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc2NyaXB0Jyk7XG5cblx0XHRzY3JpcHQuY2hhcnNldCA9ICd1dGYtOCc7XG5cdFx0c2NyaXB0LnRpbWVvdXQgPSAxMjA7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubmMpIHtcblx0XHRcdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJub25jZVwiLCBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jKTtcblx0XHR9XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShcImRhdGEtd2VicGFja1wiLCBkYXRhV2VicGFja1ByZWZpeCArIGtleSk7XG5cblx0XHRzY3JpcHQuc3JjID0gdXJsO1xuXHR9XG5cdGluUHJvZ3Jlc3NbdXJsXSA9IFtkb25lXTtcblx0dmFyIG9uU2NyaXB0Q29tcGxldGUgPSAocHJldiwgZXZlbnQpID0+IHtcblx0XHQvLyBhdm9pZCBtZW0gbGVha3MgaW4gSUUuXG5cdFx0c2NyaXB0Lm9uZXJyb3IgPSBzY3JpcHQub25sb2FkID0gbnVsbDtcblx0XHRjbGVhclRpbWVvdXQodGltZW91dCk7XG5cdFx0dmFyIGRvbmVGbnMgPSBpblByb2dyZXNzW3VybF07XG5cdFx0ZGVsZXRlIGluUHJvZ3Jlc3NbdXJsXTtcblx0XHRzY3JpcHQucGFyZW50Tm9kZSAmJiBzY3JpcHQucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzY3JpcHQpO1xuXHRcdGRvbmVGbnMgJiYgZG9uZUZucy5mb3JFYWNoKChmbikgPT4gKGZuKGV2ZW50KSkpO1xuXHRcdGlmKHByZXYpIHJldHVybiBwcmV2KGV2ZW50KTtcblx0fVxuXHR2YXIgdGltZW91dCA9IHNldFRpbWVvdXQob25TY3JpcHRDb21wbGV0ZS5iaW5kKG51bGwsIHVuZGVmaW5lZCwgeyB0eXBlOiAndGltZW91dCcsIHRhcmdldDogc2NyaXB0IH0pLCAxMjAwMDApO1xuXHRzY3JpcHQub25lcnJvciA9IG9uU2NyaXB0Q29tcGxldGUuYmluZChudWxsLCBzY3JpcHQub25lcnJvcik7XG5cdHNjcmlwdC5vbmxvYWQgPSBvblNjcmlwdENvbXBsZXRlLmJpbmQobnVsbCwgc2NyaXB0Lm9ubG9hZCk7XG5cdG5lZWRBdHRhY2ggJiYgZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzY3JpcHQpO1xufTsiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgY3VycmVudE1vZHVsZURhdGEgPSB7fTtcbnZhciBpbnN0YWxsZWRNb2R1bGVzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jO1xuXG4vLyBtb2R1bGUgYW5kIHJlcXVpcmUgY3JlYXRpb25cbnZhciBjdXJyZW50Q2hpbGRNb2R1bGU7XG52YXIgY3VycmVudFBhcmVudHMgPSBbXTtcblxuLy8gc3RhdHVzXG52YXIgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzID0gW107XG52YXIgY3VycmVudFN0YXR1cyA9IFwiaWRsZVwiO1xuXG4vLyB3aGlsZSBkb3dubG9hZGluZ1xudmFyIGJsb2NraW5nUHJvbWlzZXMgPSAwO1xudmFyIGJsb2NraW5nUHJvbWlzZXNXYWl0aW5nID0gW107XG5cbi8vIFRoZSB1cGRhdGUgaW5mb1xudmFyIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzO1xudmFyIHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcztcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJEID0gY3VycmVudE1vZHVsZURhdGE7XG5cbl9fd2VicGFja19yZXF1aXJlX18uaS5wdXNoKGZ1bmN0aW9uIChvcHRpb25zKSB7XG5cdHZhciBtb2R1bGUgPSBvcHRpb25zLm1vZHVsZTtcblx0dmFyIHJlcXVpcmUgPSBjcmVhdGVSZXF1aXJlKG9wdGlvbnMucmVxdWlyZSwgb3B0aW9ucy5pZCk7XG5cdG1vZHVsZS5ob3QgPSBjcmVhdGVNb2R1bGVIb3RPYmplY3Qob3B0aW9ucy5pZCwgbW9kdWxlKTtcblx0bW9kdWxlLnBhcmVudHMgPSBjdXJyZW50UGFyZW50cztcblx0bW9kdWxlLmNoaWxkcmVuID0gW107XG5cdGN1cnJlbnRQYXJlbnRzID0gW107XG5cdG9wdGlvbnMucmVxdWlyZSA9IHJlcXVpcmU7XG59KTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDID0ge307XG5fX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkgPSB7fTtcblxuZnVuY3Rpb24gY3JlYXRlUmVxdWlyZShyZXF1aXJlLCBtb2R1bGVJZCkge1xuXHR2YXIgbWUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXTtcblx0aWYgKCFtZSkgcmV0dXJuIHJlcXVpcmU7XG5cdHZhciBmbiA9IGZ1bmN0aW9uIChyZXF1ZXN0KSB7XG5cdFx0aWYgKG1lLmhvdC5hY3RpdmUpIHtcblx0XHRcdGlmIChpbnN0YWxsZWRNb2R1bGVzW3JlcXVlc3RdKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRzID0gaW5zdGFsbGVkTW9kdWxlc1tyZXF1ZXN0XS5wYXJlbnRzO1xuXHRcdFx0XHRpZiAocGFyZW50cy5pbmRleE9mKG1vZHVsZUlkKSA9PT0gLTEpIHtcblx0XHRcdFx0XHRwYXJlbnRzLnB1c2gobW9kdWxlSWQpO1xuXHRcdFx0XHR9XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRjdXJyZW50UGFyZW50cyA9IFttb2R1bGVJZF07XG5cdFx0XHRcdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHJlcXVlc3Q7XG5cdFx0XHR9XG5cdFx0XHRpZiAobWUuY2hpbGRyZW4uaW5kZXhPZihyZXF1ZXN0KSA9PT0gLTEpIHtcblx0XHRcdFx0bWUuY2hpbGRyZW4ucHVzaChyZXF1ZXN0KTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0Y29uc29sZS53YXJuKFxuXHRcdFx0XHRcIltITVJdIHVuZXhwZWN0ZWQgcmVxdWlyZShcIiArXG5cdFx0XHRcdFx0cmVxdWVzdCArXG5cdFx0XHRcdFx0XCIpIGZyb20gZGlzcG9zZWQgbW9kdWxlIFwiICtcblx0XHRcdFx0XHRtb2R1bGVJZFxuXHRcdFx0KTtcblx0XHRcdGN1cnJlbnRQYXJlbnRzID0gW107XG5cdFx0fVxuXHRcdHJldHVybiByZXF1aXJlKHJlcXVlc3QpO1xuXHR9O1xuXHR2YXIgY3JlYXRlUHJvcGVydHlEZXNjcmlwdG9yID0gZnVuY3Rpb24gKG5hbWUpIHtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Y29uZmlndXJhYmxlOiB0cnVlLFxuXHRcdFx0ZW51bWVyYWJsZTogdHJ1ZSxcblx0XHRcdGdldDogZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gcmVxdWlyZVtuYW1lXTtcblx0XHRcdH0sXG5cdFx0XHRzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuXHRcdFx0XHRyZXF1aXJlW25hbWVdID0gdmFsdWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fTtcblx0Zm9yICh2YXIgbmFtZSBpbiByZXF1aXJlKSB7XG5cdFx0aWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChyZXF1aXJlLCBuYW1lKSAmJiBuYW1lICE9PSBcImVcIikge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGZuLCBuYW1lLCBjcmVhdGVQcm9wZXJ0eURlc2NyaXB0b3IobmFtZSkpO1xuXHRcdH1cblx0fVxuXHRmbi5lID0gZnVuY3Rpb24gKGNodW5rSWQsIGZldGNoUHJpb3JpdHkpIHtcblx0XHRyZXR1cm4gdHJhY2tCbG9ja2luZ1Byb21pc2UocmVxdWlyZS5lKGNodW5rSWQsIGZldGNoUHJpb3JpdHkpKTtcblx0fTtcblx0cmV0dXJuIGZuO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVNb2R1bGVIb3RPYmplY3QobW9kdWxlSWQsIG1lKSB7XG5cdHZhciBfbWFpbiA9IGN1cnJlbnRDaGlsZE1vZHVsZSAhPT0gbW9kdWxlSWQ7XG5cdHZhciBob3QgPSB7XG5cdFx0Ly8gcHJpdmF0ZSBzdHVmZlxuXHRcdF9hY2NlcHRlZERlcGVuZGVuY2llczoge30sXG5cdFx0X2FjY2VwdGVkRXJyb3JIYW5kbGVyczoge30sXG5cdFx0X2RlY2xpbmVkRGVwZW5kZW5jaWVzOiB7fSxcblx0XHRfc2VsZkFjY2VwdGVkOiBmYWxzZSxcblx0XHRfc2VsZkRlY2xpbmVkOiBmYWxzZSxcblx0XHRfc2VsZkludmFsaWRhdGVkOiBmYWxzZSxcblx0XHRfZGlzcG9zZUhhbmRsZXJzOiBbXSxcblx0XHRfbWFpbjogX21haW4sXG5cdFx0X3JlcXVpcmVTZWxmOiBmdW5jdGlvbiAoKSB7XG5cdFx0XHRjdXJyZW50UGFyZW50cyA9IG1lLnBhcmVudHMuc2xpY2UoKTtcblx0XHRcdGN1cnJlbnRDaGlsZE1vZHVsZSA9IF9tYWluID8gdW5kZWZpbmVkIDogbW9kdWxlSWQ7XG5cdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKTtcblx0XHR9LFxuXG5cdFx0Ly8gTW9kdWxlIEFQSVxuXHRcdGFjdGl2ZTogdHJ1ZSxcblx0XHRhY2NlcHQ6IGZ1bmN0aW9uIChkZXAsIGNhbGxiYWNrLCBlcnJvckhhbmRsZXIpIHtcblx0XHRcdGlmIChkZXAgPT09IHVuZGVmaW5lZCkgaG90Ll9zZWxmQWNjZXB0ZWQgPSB0cnVlO1xuXHRcdFx0ZWxzZSBpZiAodHlwZW9mIGRlcCA9PT0gXCJmdW5jdGlvblwiKSBob3QuX3NlbGZBY2NlcHRlZCA9IGRlcDtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIgJiYgZGVwICE9PSBudWxsKSB7XG5cdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGVwLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBbaV1dID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG5cdFx0XHRcdFx0aG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwW2ldXSA9IGVycm9ySGFuZGxlcjtcblx0XHRcdFx0fVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0aG90Ll9hY2NlcHRlZERlcGVuZGVuY2llc1tkZXBdID0gY2FsbGJhY2sgfHwgZnVuY3Rpb24gKCkge307XG5cdFx0XHRcdGhvdC5fYWNjZXB0ZWRFcnJvckhhbmRsZXJzW2RlcF0gPSBlcnJvckhhbmRsZXI7XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRkZWNsaW5lOiBmdW5jdGlvbiAoZGVwKSB7XG5cdFx0XHRpZiAoZGVwID09PSB1bmRlZmluZWQpIGhvdC5fc2VsZkRlY2xpbmVkID0gdHJ1ZTtcblx0XHRcdGVsc2UgaWYgKHR5cGVvZiBkZXAgPT09IFwib2JqZWN0XCIgJiYgZGVwICE9PSBudWxsKVxuXHRcdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IGRlcC5sZW5ndGg7IGkrKylcblx0XHRcdFx0XHRob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcFtpXV0gPSB0cnVlO1xuXHRcdFx0ZWxzZSBob3QuX2RlY2xpbmVkRGVwZW5kZW5jaWVzW2RlcF0gPSB0cnVlO1xuXHRcdH0sXG5cdFx0ZGlzcG9zZTogZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG5cdFx0XHRob3QuX2Rpc3Bvc2VIYW5kbGVycy5wdXNoKGNhbGxiYWNrKTtcblx0XHR9LFxuXHRcdGFkZERpc3Bvc2VIYW5kbGVyOiBmdW5jdGlvbiAoY2FsbGJhY2spIHtcblx0XHRcdGhvdC5fZGlzcG9zZUhhbmRsZXJzLnB1c2goY2FsbGJhY2spO1xuXHRcdH0sXG5cdFx0cmVtb3ZlRGlzcG9zZUhhbmRsZXI6IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuXHRcdFx0dmFyIGlkeCA9IGhvdC5fZGlzcG9zZUhhbmRsZXJzLmluZGV4T2YoY2FsbGJhY2spO1xuXHRcdFx0aWYgKGlkeCA+PSAwKSBob3QuX2Rpc3Bvc2VIYW5kbGVycy5zcGxpY2UoaWR4LCAxKTtcblx0XHR9LFxuXHRcdGludmFsaWRhdGU6IGZ1bmN0aW9uICgpIHtcblx0XHRcdHRoaXMuX3NlbGZJbnZhbGlkYXRlZCA9IHRydWU7XG5cdFx0XHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRcdFx0Y2FzZSBcImlkbGVcIjpcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1ySSkuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRcdFx0bW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdHNldFN0YXR1cyhcInJlYWR5XCIpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdFx0XHRPYmplY3Qua2V5cyhfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckkpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdFx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5obXJJW2tleV0oXG5cdFx0XHRcdFx0XHRcdG1vZHVsZUlkLFxuXHRcdFx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcInByZXBhcmVcIjpcblx0XHRcdFx0Y2FzZSBcImNoZWNrXCI6XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlXCI6XG5cdFx0XHRcdGNhc2UgXCJhcHBseVwiOlxuXHRcdFx0XHRcdChxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgPSBxdWV1ZWRJbnZhbGlkYXRlZE1vZHVsZXMgfHwgW10pLnB1c2goXG5cdFx0XHRcdFx0XHRtb2R1bGVJZFxuXHRcdFx0XHRcdCk7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0Ly8gaWdub3JlIHJlcXVlc3RzIGluIGVycm9yIHN0YXRlc1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0fVxuXHRcdH0sXG5cblx0XHQvLyBNYW5hZ2VtZW50IEFQSVxuXHRcdGNoZWNrOiBob3RDaGVjayxcblx0XHRhcHBseTogaG90QXBwbHksXG5cdFx0c3RhdHVzOiBmdW5jdGlvbiAobCkge1xuXHRcdFx0aWYgKCFsKSByZXR1cm4gY3VycmVudFN0YXR1cztcblx0XHRcdHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuXHRcdH0sXG5cdFx0YWRkU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24gKGwpIHtcblx0XHRcdHJlZ2lzdGVyZWRTdGF0dXNIYW5kbGVycy5wdXNoKGwpO1xuXHRcdH0sXG5cdFx0cmVtb3ZlU3RhdHVzSGFuZGxlcjogZnVuY3Rpb24gKGwpIHtcblx0XHRcdHZhciBpZHggPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnMuaW5kZXhPZihsKTtcblx0XHRcdGlmIChpZHggPj0gMCkgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLnNwbGljZShpZHgsIDEpO1xuXHRcdH0sXG5cblx0XHQvLyBpbmhlcml0IGZyb20gcHJldmlvdXMgZGlzcG9zZSBjYWxsXG5cdFx0ZGF0YTogY3VycmVudE1vZHVsZURhdGFbbW9kdWxlSWRdXG5cdH07XG5cdGN1cnJlbnRDaGlsZE1vZHVsZSA9IHVuZGVmaW5lZDtcblx0cmV0dXJuIGhvdDtcbn1cblxuZnVuY3Rpb24gc2V0U3RhdHVzKG5ld1N0YXR1cykge1xuXHRjdXJyZW50U3RhdHVzID0gbmV3U3RhdHVzO1xuXHR2YXIgcmVzdWx0cyA9IFtdO1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgcmVnaXN0ZXJlZFN0YXR1c0hhbmRsZXJzLmxlbmd0aDsgaSsrKVxuXHRcdHJlc3VsdHNbaV0gPSByZWdpc3RlcmVkU3RhdHVzSGFuZGxlcnNbaV0uY2FsbChudWxsLCBuZXdTdGF0dXMpO1xuXG5cdHJldHVybiBQcm9taXNlLmFsbChyZXN1bHRzKS50aGVuKGZ1bmN0aW9uICgpIHt9KTtcbn1cblxuZnVuY3Rpb24gdW5ibG9jaygpIHtcblx0aWYgKC0tYmxvY2tpbmdQcm9taXNlcyA9PT0gMCkge1xuXHRcdHNldFN0YXR1cyhcInJlYWR5XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0aWYgKGJsb2NraW5nUHJvbWlzZXMgPT09IDApIHtcblx0XHRcdFx0dmFyIGxpc3QgPSBibG9ja2luZ1Byb21pc2VzV2FpdGluZztcblx0XHRcdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcgPSBbXTtcblx0XHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdFx0bGlzdFtpXSgpO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdHJhY2tCbG9ja2luZ1Byb21pc2UocHJvbWlzZSkge1xuXHRzd2l0Y2ggKGN1cnJlbnRTdGF0dXMpIHtcblx0XHRjYXNlIFwicmVhZHlcIjpcblx0XHRcdHNldFN0YXR1cyhcInByZXBhcmVcIik7XG5cdFx0LyogZmFsbHRocm91Z2ggKi9cblx0XHRjYXNlIFwicHJlcGFyZVwiOlxuXHRcdFx0YmxvY2tpbmdQcm9taXNlcysrO1xuXHRcdFx0cHJvbWlzZS50aGVuKHVuYmxvY2ssIHVuYmxvY2spO1xuXHRcdFx0cmV0dXJuIHByb21pc2U7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdHJldHVybiBwcm9taXNlO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHdhaXRGb3JCbG9ja2luZ1Byb21pc2VzKGZuKSB7XG5cdGlmIChibG9ja2luZ1Byb21pc2VzID09PSAwKSByZXR1cm4gZm4oKTtcblx0cmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlKSB7XG5cdFx0YmxvY2tpbmdQcm9taXNlc1dhaXRpbmcucHVzaChmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXNvbHZlKGZuKCkpO1xuXHRcdH0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gaG90Q2hlY2soYXBwbHlPblVwZGF0ZSkge1xuXHRpZiAoY3VycmVudFN0YXR1cyAhPT0gXCJpZGxlXCIpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJjaGVjaygpIGlzIG9ubHkgYWxsb3dlZCBpbiBpZGxlIHN0YXR1c1wiKTtcblx0fVxuXHRyZXR1cm4gc2V0U3RhdHVzKFwiY2hlY2tcIilcblx0XHQudGhlbihfX3dlYnBhY2tfcmVxdWlyZV9fLmhtck0pXG5cdFx0LnRoZW4oZnVuY3Rpb24gKHVwZGF0ZSkge1xuXHRcdFx0aWYgKCF1cGRhdGUpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhhcHBseUludmFsaWRhdGVkTW9kdWxlcygpID8gXCJyZWFkeVwiIDogXCJpZGxlXCIpLnRoZW4oXG5cdFx0XHRcdFx0ZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0cmV0dXJuIG51bGw7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicHJlcGFyZVwiKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0dmFyIHVwZGF0ZWRNb2R1bGVzID0gW107XG5cdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cblx0XHRcdFx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdFx0XHRcdE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uaG1yQykucmVkdWNlKGZ1bmN0aW9uIChcblx0XHRcdFx0XHRcdHByb21pc2VzLFxuXHRcdFx0XHRcdFx0a2V5XG5cdFx0XHRcdFx0KSB7XG5cdFx0XHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckNba2V5XShcblx0XHRcdFx0XHRcdFx0dXBkYXRlLmMsXG5cdFx0XHRcdFx0XHRcdHVwZGF0ZS5yLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGUubSxcblx0XHRcdFx0XHRcdFx0cHJvbWlzZXMsXG5cdFx0XHRcdFx0XHRcdGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLFxuXHRcdFx0XHRcdFx0XHR1cGRhdGVkTW9kdWxlc1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRcdHJldHVybiBwcm9taXNlcztcblx0XHRcdFx0XHR9LCBbXSlcblx0XHRcdFx0KS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdFx0XHRyZXR1cm4gd2FpdEZvckJsb2NraW5nUHJvbWlzZXMoZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdFx0aWYgKGFwcGx5T25VcGRhdGUpIHtcblx0XHRcdFx0XHRcdFx0cmV0dXJuIGludGVybmFsQXBwbHkoYXBwbHlPblVwZGF0ZSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRyZXR1cm4gc2V0U3RhdHVzKFwicmVhZHlcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0XHRcdHJldHVybiB1cGRhdGVkTW9kdWxlcztcblx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdH0pO1xuXHRcdFx0XHR9KTtcblx0XHRcdH0pO1xuXHRcdH0pO1xufVxuXG5mdW5jdGlvbiBob3RBcHBseShvcHRpb25zKSB7XG5cdGlmIChjdXJyZW50U3RhdHVzICE9PSBcInJlYWR5XCIpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCkudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHR0aHJvdyBuZXcgRXJyb3IoXG5cdFx0XHRcdFwiYXBwbHkoKSBpcyBvbmx5IGFsbG93ZWQgaW4gcmVhZHkgc3RhdHVzIChzdGF0ZTogXCIgK1xuXHRcdFx0XHRcdGN1cnJlbnRTdGF0dXMgK1xuXHRcdFx0XHRcdFwiKVwiXG5cdFx0XHQpO1xuXHRcdH0pO1xuXHR9XG5cdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpO1xufVxuXG5mdW5jdGlvbiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpIHtcblx0b3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG5cblx0YXBwbHlJbnZhbGlkYXRlZE1vZHVsZXMoKTtcblxuXHR2YXIgcmVzdWx0cyA9IGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzLm1hcChmdW5jdGlvbiAoaGFuZGxlcikge1xuXHRcdHJldHVybiBoYW5kbGVyKG9wdGlvbnMpO1xuXHR9KTtcblx0Y3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMgPSB1bmRlZmluZWQ7XG5cblx0dmFyIGVycm9ycyA9IHJlc3VsdHNcblx0XHQubWFwKGZ1bmN0aW9uIChyKSB7XG5cdFx0XHRyZXR1cm4gci5lcnJvcjtcblx0XHR9KVxuXHRcdC5maWx0ZXIoQm9vbGVhbik7XG5cblx0aWYgKGVycm9ycy5sZW5ndGggPiAwKSB7XG5cdFx0cmV0dXJuIHNldFN0YXR1cyhcImFib3J0XCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0dGhyb3cgZXJyb3JzWzBdO1xuXHRcdH0pO1xuXHR9XG5cblx0Ly8gTm93IGluIFwiZGlzcG9zZVwiIHBoYXNlXG5cdHZhciBkaXNwb3NlUHJvbWlzZSA9IHNldFN0YXR1cyhcImRpc3Bvc2VcIik7XG5cblx0cmVzdWx0cy5mb3JFYWNoKGZ1bmN0aW9uIChyZXN1bHQpIHtcblx0XHRpZiAocmVzdWx0LmRpc3Bvc2UpIHJlc3VsdC5kaXNwb3NlKCk7XG5cdH0pO1xuXG5cdC8vIE5vdyBpbiBcImFwcGx5XCIgcGhhc2Vcblx0dmFyIGFwcGx5UHJvbWlzZSA9IHNldFN0YXR1cyhcImFwcGx5XCIpO1xuXG5cdHZhciBlcnJvcjtcblx0dmFyIHJlcG9ydEVycm9yID0gZnVuY3Rpb24gKGVycikge1xuXHRcdGlmICghZXJyb3IpIGVycm9yID0gZXJyO1xuXHR9O1xuXG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblxuXHR2YXIgb25BY2NlcHRlZCA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gUHJvbWlzZS5hbGwoW2Rpc3Bvc2VQcm9taXNlLCBhcHBseVByb21pc2VdKS50aGVuKGZ1bmN0aW9uICgpIHtcblx0XHRcdC8vIGhhbmRsZSBlcnJvcnMgaW4gYWNjZXB0IGhhbmRsZXJzIGFuZCBzZWxmIGFjY2VwdGVkIG1vZHVsZSBsb2FkXG5cdFx0XHRpZiAoZXJyb3IpIHtcblx0XHRcdFx0cmV0dXJuIHNldFN0YXR1cyhcImZhaWxcIikudGhlbihmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdFx0dGhyb3cgZXJyb3I7XG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAocXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzKSB7XG5cdFx0XHRcdHJldHVybiBpbnRlcm5hbEFwcGx5KG9wdGlvbnMpLnRoZW4oZnVuY3Rpb24gKGxpc3QpIHtcblx0XHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlSWQpIHtcblx0XHRcdFx0XHRcdGlmIChsaXN0LmluZGV4T2YobW9kdWxlSWQpIDwgMCkgbGlzdC5wdXNoKG1vZHVsZUlkKTtcblx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRyZXR1cm4gbGlzdDtcblx0XHRcdFx0fSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBzZXRTdGF0dXMoXCJpZGxlXCIpLnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRyZXR1cm4gb3V0ZGF0ZWRNb2R1bGVzO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdH07XG5cblx0cmV0dXJuIFByb21pc2UuYWxsKFxuXHRcdHJlc3VsdHNcblx0XHRcdC5maWx0ZXIoZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0LmFwcGx5O1xuXHRcdFx0fSlcblx0XHRcdC5tYXAoZnVuY3Rpb24gKHJlc3VsdCkge1xuXHRcdFx0XHRyZXR1cm4gcmVzdWx0LmFwcGx5KHJlcG9ydEVycm9yKTtcblx0XHRcdH0pXG5cdClcblx0XHQudGhlbihmdW5jdGlvbiAoYXBwbHlSZXN1bHRzKSB7XG5cdFx0XHRhcHBseVJlc3VsdHMuZm9yRWFjaChmdW5jdGlvbiAobW9kdWxlcykge1xuXHRcdFx0XHRpZiAobW9kdWxlcykge1xuXHRcdFx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRcdFx0b3V0ZGF0ZWRNb2R1bGVzLnB1c2gobW9kdWxlc1tpXSk7XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9KTtcblx0XHR9KVxuXHRcdC50aGVuKG9uQWNjZXB0ZWQpO1xufVxuXG5mdW5jdGlvbiBhcHBseUludmFsaWRhdGVkTW9kdWxlcygpIHtcblx0aWYgKHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcykge1xuXHRcdGlmICghY3VycmVudFVwZGF0ZUFwcGx5SGFuZGxlcnMpIGN1cnJlbnRVcGRhdGVBcHBseUhhbmRsZXJzID0gW107XG5cdFx0T2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5obXJJKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcblx0XHRcdHF1ZXVlZEludmFsaWRhdGVkTW9kdWxlcy5mb3JFYWNoKGZ1bmN0aW9uIChtb2R1bGVJZCkge1xuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtcklba2V5XShcblx0XHRcdFx0XHRtb2R1bGVJZCxcblx0XHRcdFx0XHRjdXJyZW50VXBkYXRlQXBwbHlIYW5kbGVyc1xuXHRcdFx0XHQpO1xuXHRcdFx0fSk7XG5cdFx0fSk7XG5cdFx0cXVldWVkSW52YWxpZGF0ZWRNb2R1bGVzID0gdW5kZWZpbmVkO1xuXHRcdHJldHVybiB0cnVlO1xuXHR9XG59IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0ICYmIGRvY3VtZW50LmN1cnJlbnRTY3JpcHQudGFnTmFtZS50b1VwcGVyQ2FzZSgpID09PSAnU0NSSVBUJylcblx0XHRzY3JpcHRVcmwgPSBkb2N1bWVudC5jdXJyZW50U2NyaXB0LnNyYztcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSB7XG5cdFx0XHR2YXIgaSA9IHNjcmlwdHMubGVuZ3RoIC0gMTtcblx0XHRcdHdoaWxlIChpID4gLTEgJiYgKCFzY3JpcHRVcmwgfHwgIS9eaHR0cChzPyk6Ly50ZXN0KHNjcmlwdFVybCkpKSBzY3JpcHRVcmwgPSBzY3JpcHRzW2ktLV0uc3JjO1xuXHRcdH1cblx0fVxufVxuLy8gV2hlbiBzdXBwb3J0aW5nIGJyb3dzZXJzIHdoZXJlIGFuIGF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgeW91IG11c3Qgc3BlY2lmeSBhbiBvdXRwdXQucHVibGljUGF0aCBtYW51YWxseSB2aWEgY29uZmlndXJhdGlvblxuLy8gb3IgcGFzcyBhbiBlbXB0eSBzdHJpbmcgKFwiXCIpIGFuZCBzZXQgdGhlIF9fd2VicGFja19wdWJsaWNfcGF0aF9fIHZhcmlhYmxlIGZyb20geW91ciBjb2RlIHRvIHVzZSB5b3VyIG93biBsb2dpYy5cbmlmICghc2NyaXB0VXJsKSB0aHJvdyBuZXcgRXJyb3IoXCJBdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIGluIHRoaXMgYnJvd3NlclwiKTtcbnNjcmlwdFVybCA9IHNjcmlwdFVybC5yZXBsYWNlKC9eYmxvYjovLCBcIlwiKS5yZXBsYWNlKC8jLiokLywgXCJcIikucmVwbGFjZSgvXFw/LiokLywgXCJcIikucmVwbGFjZSgvXFwvW15cXC9dKyQvLCBcIi9cIik7XG5fX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBzY3JpcHRVcmw7IiwiaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikgcmV0dXJuO1xudmFyIGNyZWF0ZVN0eWxlc2hlZXQgPSAoY2h1bmtJZCwgZnVsbGhyZWYsIG9sZFRhZywgcmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdHZhciBsaW5rVGFnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIik7XG5cblx0bGlua1RhZy5yZWwgPSBcInN0eWxlc2hlZXRcIjtcblx0bGlua1RhZy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5uYykge1xuXHRcdGxpbmtUYWcubm9uY2UgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm5jO1xuXHR9XG5cdHZhciBvbkxpbmtDb21wbGV0ZSA9IChldmVudCkgPT4ge1xuXHRcdC8vIGF2b2lkIG1lbSBsZWFrcy5cblx0XHRsaW5rVGFnLm9uZXJyb3IgPSBsaW5rVGFnLm9ubG9hZCA9IG51bGw7XG5cdFx0aWYgKGV2ZW50LnR5cGUgPT09ICdsb2FkJykge1xuXHRcdFx0cmVzb2x2ZSgpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgZXJyb3JUeXBlID0gZXZlbnQgJiYgZXZlbnQudHlwZTtcblx0XHRcdHZhciByZWFsSHJlZiA9IGV2ZW50ICYmIGV2ZW50LnRhcmdldCAmJiBldmVudC50YXJnZXQuaHJlZiB8fCBmdWxsaHJlZjtcblx0XHRcdHZhciBlcnIgPSBuZXcgRXJyb3IoXCJMb2FkaW5nIENTUyBjaHVuayBcIiArIGNodW5rSWQgKyBcIiBmYWlsZWQuXFxuKFwiICsgZXJyb3JUeXBlICsgXCI6IFwiICsgcmVhbEhyZWYgKyBcIilcIik7XG5cdFx0XHRlcnIubmFtZSA9IFwiQ2h1bmtMb2FkRXJyb3JcIjtcblx0XHRcdGVyci5jb2RlID0gXCJDU1NfQ0hVTktfTE9BRF9GQUlMRURcIjtcblx0XHRcdGVyci50eXBlID0gZXJyb3JUeXBlO1xuXHRcdFx0ZXJyLnJlcXVlc3QgPSByZWFsSHJlZjtcblx0XHRcdGlmIChsaW5rVGFnLnBhcmVudE5vZGUpIGxpbmtUYWcucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChsaW5rVGFnKVxuXHRcdFx0cmVqZWN0KGVycik7XG5cdFx0fVxuXHR9XG5cdGxpbmtUYWcub25lcnJvciA9IGxpbmtUYWcub25sb2FkID0gb25MaW5rQ29tcGxldGU7XG5cdGxpbmtUYWcuaHJlZiA9IGZ1bGxocmVmO1xuXG5cblx0aWYgKG9sZFRhZykge1xuXHRcdG9sZFRhZy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShsaW5rVGFnLCBvbGRUYWcubmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobGlua1RhZyk7XG5cdH1cblx0cmV0dXJuIGxpbmtUYWc7XG59O1xudmFyIGZpbmRTdHlsZXNoZWV0ID0gKGhyZWYsIGZ1bGxocmVmKSA9PiB7XG5cdHZhciBleGlzdGluZ0xpbmtUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJsaW5rXCIpO1xuXHRmb3IodmFyIGkgPSAwOyBpIDwgZXhpc3RpbmdMaW5rVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciB0YWcgPSBleGlzdGluZ0xpbmtUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIikgfHwgdGFnLmdldEF0dHJpYnV0ZShcImhyZWZcIik7XG5cdFx0aWYodGFnLnJlbCA9PT0gXCJzdHlsZXNoZWV0XCIgJiYgKGRhdGFIcmVmID09PSBocmVmIHx8IGRhdGFIcmVmID09PSBmdWxsaHJlZikpIHJldHVybiB0YWc7XG5cdH1cblx0dmFyIGV4aXN0aW5nU3R5bGVUYWdzID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJzdHlsZVwiKTtcblx0Zm9yKHZhciBpID0gMDsgaSA8IGV4aXN0aW5nU3R5bGVUYWdzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIHRhZyA9IGV4aXN0aW5nU3R5bGVUYWdzW2ldO1xuXHRcdHZhciBkYXRhSHJlZiA9IHRhZy5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIik7XG5cdFx0aWYoZGF0YUhyZWYgPT09IGhyZWYgfHwgZGF0YUhyZWYgPT09IGZ1bGxocmVmKSByZXR1cm4gdGFnO1xuXHR9XG59O1xudmFyIGxvYWRTdHlsZXNoZWV0ID0gKGNodW5rSWQpID0+IHtcblx0cmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcblx0XHR2YXIgaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ubWluaUNzc0YoY2h1bmtJZCk7XG5cdFx0dmFyIGZ1bGxocmVmID0gX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgaHJlZjtcblx0XHRpZihmaW5kU3R5bGVzaGVldChocmVmLCBmdWxsaHJlZikpIHJldHVybiByZXNvbHZlKCk7XG5cdFx0Y3JlYXRlU3R5bGVzaGVldChjaHVua0lkLCBmdWxsaHJlZiwgbnVsbCwgcmVzb2x2ZSwgcmVqZWN0KTtcblx0fSk7XG59XG4vLyBubyBjaHVuayBsb2FkaW5nXG5cbnZhciBvbGRUYWdzID0gW107XG52YXIgbmV3VGFncyA9IFtdO1xudmFyIGFwcGx5SGFuZGxlciA9IChvcHRpb25zKSA9PiB7XG5cdHJldHVybiB7IGRpc3Bvc2U6ICgpID0+IHtcblx0XHRmb3IodmFyIGkgPSAwOyBpIDwgb2xkVGFncy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIG9sZFRhZyA9IG9sZFRhZ3NbaV07XG5cdFx0XHRpZihvbGRUYWcucGFyZW50Tm9kZSkgb2xkVGFnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQob2xkVGFnKTtcblx0XHR9XG5cdFx0b2xkVGFncy5sZW5ndGggPSAwO1xuXHR9LCBhcHBseTogKCkgPT4ge1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCBuZXdUYWdzLmxlbmd0aDsgaSsrKSBuZXdUYWdzW2ldLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXHRcdG5ld1RhZ3MubGVuZ3RoID0gMDtcblx0fSB9O1xufVxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJDLm1pbmlDc3MgPSAoY2h1bmtJZHMsIHJlbW92ZWRDaHVua3MsIHJlbW92ZWRNb2R1bGVzLCBwcm9taXNlcywgYXBwbHlIYW5kbGVycywgdXBkYXRlZE1vZHVsZXNMaXN0KSA9PiB7XG5cdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHRjaHVua0lkcy5mb3JFYWNoKChjaHVua0lkKSA9PiB7XG5cdFx0dmFyIGhyZWYgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLm1pbmlDc3NGKGNodW5rSWQpO1xuXHRcdHZhciBmdWxsaHJlZiA9IF9fd2VicGFja19yZXF1aXJlX18ucCArIGhyZWY7XG5cdFx0dmFyIG9sZFRhZyA9IGZpbmRTdHlsZXNoZWV0KGhyZWYsIGZ1bGxocmVmKTtcblx0XHRpZighb2xkVGFnKSByZXR1cm47XG5cdFx0cHJvbWlzZXMucHVzaChuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0XHR2YXIgdGFnID0gY3JlYXRlU3R5bGVzaGVldChjaHVua0lkLCBmdWxsaHJlZiwgb2xkVGFnLCAoKSA9PiB7XG5cdFx0XHRcdHRhZy5hcyA9IFwic3R5bGVcIjtcblx0XHRcdFx0dGFnLnJlbCA9IFwicHJlbG9hZFwiO1xuXHRcdFx0XHRyZXNvbHZlKCk7XG5cdFx0XHR9LCByZWplY3QpO1xuXHRcdFx0b2xkVGFncy5wdXNoKG9sZFRhZyk7XG5cdFx0XHRuZXdUYWdzLnB1c2godGFnKTtcblx0XHR9KSk7XG5cdH0pO1xufVxuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWQiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmIgPSBkb2N1bWVudC5iYXNlVVJJIHx8IHNlbGYubG9jYXRpb24uaHJlZjtcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wID0gX193ZWJwYWNrX3JlcXVpcmVfXy5obXJTX2pzb25wIHx8IHtcblx0NzkyOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxudmFyIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3Q7XG52YXIgd2FpdGluZ1VwZGF0ZVJlc29sdmVzID0ge307XG5mdW5jdGlvbiBsb2FkVXBkYXRlQ2h1bmsoY2h1bmtJZCwgdXBkYXRlZE1vZHVsZXNMaXN0KSB7XG5cdGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QgPSB1cGRhdGVkTW9kdWxlc0xpc3Q7XG5cdHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG5cdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gcmVzb2x2ZTtcblx0XHQvLyBzdGFydCB1cGRhdGUgY2h1bmsgbG9hZGluZ1xuXHRcdHZhciB1cmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLnAgKyBfX3dlYnBhY2tfcmVxdWlyZV9fLmh1KGNodW5rSWQpO1xuXHRcdC8vIGNyZWF0ZSBlcnJvciBiZWZvcmUgc3RhY2sgdW53b3VuZCB0byBnZXQgdXNlZnVsIHN0YWNrdHJhY2UgbGF0ZXJcblx0XHR2YXIgZXJyb3IgPSBuZXcgRXJyb3IoKTtcblx0XHR2YXIgbG9hZGluZ0VuZGVkID0gKGV2ZW50KSA9PiB7XG5cdFx0XHRpZih3YWl0aW5nVXBkYXRlUmVzb2x2ZXNbY2h1bmtJZF0pIHtcblx0XHRcdFx0d2FpdGluZ1VwZGF0ZVJlc29sdmVzW2NodW5rSWRdID0gdW5kZWZpbmVkXG5cdFx0XHRcdHZhciBlcnJvclR5cGUgPSBldmVudCAmJiAoZXZlbnQudHlwZSA9PT0gJ2xvYWQnID8gJ21pc3NpbmcnIDogZXZlbnQudHlwZSk7XG5cdFx0XHRcdHZhciByZWFsU3JjID0gZXZlbnQgJiYgZXZlbnQudGFyZ2V0ICYmIGV2ZW50LnRhcmdldC5zcmM7XG5cdFx0XHRcdGVycm9yLm1lc3NhZ2UgPSAnTG9hZGluZyBob3QgdXBkYXRlIGNodW5rICcgKyBjaHVua0lkICsgJyBmYWlsZWQuXFxuKCcgKyBlcnJvclR5cGUgKyAnOiAnICsgcmVhbFNyYyArICcpJztcblx0XHRcdFx0ZXJyb3IubmFtZSA9ICdDaHVua0xvYWRFcnJvcic7XG5cdFx0XHRcdGVycm9yLnR5cGUgPSBlcnJvclR5cGU7XG5cdFx0XHRcdGVycm9yLnJlcXVlc3QgPSByZWFsU3JjO1xuXHRcdFx0XHRyZWplY3QoZXJyb3IpO1xuXHRcdFx0fVxuXHRcdH07XG5cdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5sKHVybCwgbG9hZGluZ0VuZGVkKTtcblx0fSk7XG59XG5cbnNlbGZbXCJ3ZWJwYWNrSG90VXBkYXRldGFyaWZmX2ltcGFjdF9zdGF0ZXNcIl0gPSAoY2h1bmtJZCwgbW9yZU1vZHVsZXMsIHJ1bnRpbWUpID0+IHtcblx0Zm9yKHZhciBtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdGlmKGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QpIGN1cnJlbnRVcGRhdGVkTW9kdWxlc0xpc3QucHVzaChtb2R1bGVJZCk7XG5cdFx0fVxuXHR9XG5cdGlmKHJ1bnRpbWUpIGN1cnJlbnRVcGRhdGVSdW50aW1lLnB1c2gocnVudGltZSk7XG5cdGlmKHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSkge1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSgpO1xuXHRcdHdhaXRpbmdVcGRhdGVSZXNvbHZlc1tjaHVua0lkXSA9IHVuZGVmaW5lZDtcblx0fVxufTtcblxudmFyIGN1cnJlbnRVcGRhdGVDaHVua3M7XG52YXIgY3VycmVudFVwZGF0ZTtcbnZhciBjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcztcbnZhciBjdXJyZW50VXBkYXRlUnVudGltZTtcbmZ1bmN0aW9uIGFwcGx5SGFuZGxlcihvcHRpb25zKSB7XG5cdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmYpIGRlbGV0ZSBfX3dlYnBhY2tfcmVxdWlyZV9fLmYuanNvbnBIbXI7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB1bmRlZmluZWQ7XG5cdGZ1bmN0aW9uIGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyh1cGRhdGVNb2R1bGVJZCkge1xuXHRcdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbdXBkYXRlTW9kdWxlSWRdO1xuXHRcdHZhciBvdXRkYXRlZERlcGVuZGVuY2llcyA9IHt9O1xuXG5cdFx0dmFyIHF1ZXVlID0gb3V0ZGF0ZWRNb2R1bGVzLm1hcChmdW5jdGlvbiAoaWQpIHtcblx0XHRcdHJldHVybiB7XG5cdFx0XHRcdGNoYWluOiBbaWRdLFxuXHRcdFx0XHRpZDogaWRcblx0XHRcdH07XG5cdFx0fSk7XG5cdFx0d2hpbGUgKHF1ZXVlLmxlbmd0aCA+IDApIHtcblx0XHRcdHZhciBxdWV1ZUl0ZW0gPSBxdWV1ZS5wb3AoKTtcblx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlSXRlbS5pZDtcblx0XHRcdHZhciBjaGFpbiA9IHF1ZXVlSXRlbS5jaGFpbjtcblx0XHRcdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmNbbW9kdWxlSWRdO1xuXHRcdFx0aWYgKFxuXHRcdFx0XHQhbW9kdWxlIHx8XG5cdFx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgJiYgIW1vZHVsZS5ob3QuX3NlbGZJbnZhbGlkYXRlZClcblx0XHRcdClcblx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRpZiAobW9kdWxlLmhvdC5fc2VsZkRlY2xpbmVkKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0dHlwZTogXCJzZWxmLWRlY2xpbmVkXCIsXG5cdFx0XHRcdFx0Y2hhaW46IGNoYWluLFxuXHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZFxuXHRcdFx0XHR9O1xuXHRcdFx0fVxuXHRcdFx0aWYgKG1vZHVsZS5ob3QuX21haW4pIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHR0eXBlOiBcInVuYWNjZXB0ZWRcIixcblx0XHRcdFx0XHRjaGFpbjogY2hhaW4sXG5cdFx0XHRcdFx0bW9kdWxlSWQ6IG1vZHVsZUlkXG5cdFx0XHRcdH07XG5cdFx0XHR9XG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1vZHVsZS5wYXJlbnRzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHRcdHZhciBwYXJlbnRJZCA9IG1vZHVsZS5wYXJlbnRzW2ldO1xuXHRcdFx0XHR2YXIgcGFyZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW3BhcmVudElkXTtcblx0XHRcdFx0aWYgKCFwYXJlbnQpIGNvbnRpbnVlO1xuXHRcdFx0XHRpZiAocGFyZW50LmhvdC5fZGVjbGluZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdKSB7XG5cdFx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRcdHR5cGU6IFwiZGVjbGluZWRcIixcblx0XHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRwYXJlbnRJZDogcGFyZW50SWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmIChvdXRkYXRlZE1vZHVsZXMuaW5kZXhPZihwYXJlbnRJZCkgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0aWYgKHBhcmVudC5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSkge1xuXHRcdFx0XHRcdGlmICghb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdKVxuXHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdID0gW107XG5cdFx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdLCBbbW9kdWxlSWRdKTtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXHRcdFx0XHRkZWxldGUgb3V0ZGF0ZWREZXBlbmRlbmNpZXNbcGFyZW50SWRdO1xuXHRcdFx0XHRvdXRkYXRlZE1vZHVsZXMucHVzaChwYXJlbnRJZCk7XG5cdFx0XHRcdHF1ZXVlLnB1c2goe1xuXHRcdFx0XHRcdGNoYWluOiBjaGFpbi5jb25jYXQoW3BhcmVudElkXSksXG5cdFx0XHRcdFx0aWQ6IHBhcmVudElkXG5cdFx0XHRcdH0pO1xuXHRcdFx0fVxuXHRcdH1cblxuXHRcdHJldHVybiB7XG5cdFx0XHR0eXBlOiBcImFjY2VwdGVkXCIsXG5cdFx0XHRtb2R1bGVJZDogdXBkYXRlTW9kdWxlSWQsXG5cdFx0XHRvdXRkYXRlZE1vZHVsZXM6IG91dGRhdGVkTW9kdWxlcyxcblx0XHRcdG91dGRhdGVkRGVwZW5kZW5jaWVzOiBvdXRkYXRlZERlcGVuZGVuY2llc1xuXHRcdH07XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRBbGxUb1NldChhLCBiKSB7XG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBiLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IGJbaV07XG5cdFx0XHRpZiAoYS5pbmRleE9mKGl0ZW0pID09PSAtMSkgYS5wdXNoKGl0ZW0pO1xuXHRcdH1cblx0fVxuXG5cdC8vIGF0IGJlZ2luIGFsbCB1cGRhdGVzIG1vZHVsZXMgYXJlIG91dGRhdGVkXG5cdC8vIHRoZSBcIm91dGRhdGVkXCIgc3RhdHVzIGNhbiBwcm9wYWdhdGUgdG8gcGFyZW50cyBpZiB0aGV5IGRvbid0IGFjY2VwdCB0aGUgY2hpbGRyZW5cblx0dmFyIG91dGRhdGVkRGVwZW5kZW5jaWVzID0ge307XG5cdHZhciBvdXRkYXRlZE1vZHVsZXMgPSBbXTtcblx0dmFyIGFwcGxpZWRVcGRhdGUgPSB7fTtcblxuXHR2YXIgd2FyblVuZXhwZWN0ZWRSZXF1aXJlID0gZnVuY3Rpb24gd2FyblVuZXhwZWN0ZWRSZXF1aXJlKG1vZHVsZSkge1xuXHRcdGNvbnNvbGUud2Fybihcblx0XHRcdFwiW0hNUl0gdW5leHBlY3RlZCByZXF1aXJlKFwiICsgbW9kdWxlLmlkICsgXCIpIHRvIGRpc3Bvc2VkIG1vZHVsZVwiXG5cdFx0KTtcblx0fTtcblxuXHRmb3IgKHZhciBtb2R1bGVJZCBpbiBjdXJyZW50VXBkYXRlKSB7XG5cdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlLCBtb2R1bGVJZCkpIHtcblx0XHRcdHZhciBuZXdNb2R1bGVGYWN0b3J5ID0gY3VycmVudFVwZGF0ZVttb2R1bGVJZF07XG5cdFx0XHR2YXIgcmVzdWx0ID0gbmV3TW9kdWxlRmFjdG9yeVxuXHRcdFx0XHQ/IGdldEFmZmVjdGVkTW9kdWxlRWZmZWN0cyhtb2R1bGVJZClcblx0XHRcdFx0OiB7XG5cdFx0XHRcdFx0XHR0eXBlOiBcImRpc3Bvc2VkXCIsXG5cdFx0XHRcdFx0XHRtb2R1bGVJZDogbW9kdWxlSWRcblx0XHRcdFx0XHR9O1xuXHRcdFx0LyoqIEB0eXBlIHtFcnJvcnxmYWxzZX0gKi9cblx0XHRcdHZhciBhYm9ydEVycm9yID0gZmFsc2U7XG5cdFx0XHR2YXIgZG9BcHBseSA9IGZhbHNlO1xuXHRcdFx0dmFyIGRvRGlzcG9zZSA9IGZhbHNlO1xuXHRcdFx0dmFyIGNoYWluSW5mbyA9IFwiXCI7XG5cdFx0XHRpZiAocmVzdWx0LmNoYWluKSB7XG5cdFx0XHRcdGNoYWluSW5mbyA9IFwiXFxuVXBkYXRlIHByb3BhZ2F0aW9uOiBcIiArIHJlc3VsdC5jaGFpbi5qb2luKFwiIC0+IFwiKTtcblx0XHRcdH1cblx0XHRcdHN3aXRjaCAocmVzdWx0LnR5cGUpIHtcblx0XHRcdFx0Y2FzZSBcInNlbGYtZGVjbGluZWRcIjpcblx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkRlY2xpbmVkKSBvcHRpb25zLm9uRGVjbGluZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRGVjbGluZWQpXG5cdFx0XHRcdFx0XHRhYm9ydEVycm9yID0gbmV3IEVycm9yKFxuXHRcdFx0XHRcdFx0XHRcIkFib3J0ZWQgYmVjYXVzZSBvZiBzZWxmIGRlY2xpbmU6IFwiICtcblx0XHRcdFx0XHRcdFx0XHRyZXN1bHQubW9kdWxlSWQgK1xuXHRcdFx0XHRcdFx0XHRcdGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImRlY2xpbmVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25EZWNsaW5lZCkgb3B0aW9ucy5vbkRlY2xpbmVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0aWYgKCFvcHRpb25zLmlnbm9yZURlY2xpbmVkKVxuXHRcdFx0XHRcdFx0YWJvcnRFcnJvciA9IG5ldyBFcnJvcihcblx0XHRcdFx0XHRcdFx0XCJBYm9ydGVkIGJlY2F1c2Ugb2YgZGVjbGluZWQgZGVwZW5kZW5jeTogXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5tb2R1bGVJZCArXG5cdFx0XHRcdFx0XHRcdFx0XCIgaW4gXCIgK1xuXHRcdFx0XHRcdFx0XHRcdHJlc3VsdC5wYXJlbnRJZCArXG5cdFx0XHRcdFx0XHRcdFx0Y2hhaW5JbmZvXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdGJyZWFrO1xuXHRcdFx0XHRjYXNlIFwidW5hY2NlcHRlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uVW5hY2NlcHRlZCkgb3B0aW9ucy5vblVuYWNjZXB0ZWQocmVzdWx0KTtcblx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlVW5hY2NlcHRlZClcblx0XHRcdFx0XHRcdGFib3J0RXJyb3IgPSBuZXcgRXJyb3IoXG5cdFx0XHRcdFx0XHRcdFwiQWJvcnRlZCBiZWNhdXNlIFwiICsgbW9kdWxlSWQgKyBcIiBpcyBub3QgYWNjZXB0ZWRcIiArIGNoYWluSW5mb1xuXHRcdFx0XHRcdFx0KTtcblx0XHRcdFx0XHRicmVhaztcblx0XHRcdFx0Y2FzZSBcImFjY2VwdGVkXCI6XG5cdFx0XHRcdFx0aWYgKG9wdGlvbnMub25BY2NlcHRlZCkgb3B0aW9ucy5vbkFjY2VwdGVkKHJlc3VsdCk7XG5cdFx0XHRcdFx0ZG9BcHBseSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGNhc2UgXCJkaXNwb3NlZFwiOlxuXHRcdFx0XHRcdGlmIChvcHRpb25zLm9uRGlzcG9zZWQpIG9wdGlvbnMub25EaXNwb3NlZChyZXN1bHQpO1xuXHRcdFx0XHRcdGRvRGlzcG9zZSA9IHRydWU7XG5cdFx0XHRcdFx0YnJlYWs7XG5cdFx0XHRcdGRlZmF1bHQ6XG5cdFx0XHRcdFx0dGhyb3cgbmV3IEVycm9yKFwiVW5leGNlcHRpb24gdHlwZSBcIiArIHJlc3VsdC50eXBlKTtcblx0XHRcdH1cblx0XHRcdGlmIChhYm9ydEVycm9yKSB7XG5cdFx0XHRcdHJldHVybiB7XG5cdFx0XHRcdFx0ZXJyb3I6IGFib3J0RXJyb3Jcblx0XHRcdFx0fTtcblx0XHRcdH1cblx0XHRcdGlmIChkb0FwcGx5KSB7XG5cdFx0XHRcdGFwcGxpZWRVcGRhdGVbbW9kdWxlSWRdID0gbmV3TW9kdWxlRmFjdG9yeTtcblx0XHRcdFx0YWRkQWxsVG9TZXQob3V0ZGF0ZWRNb2R1bGVzLCByZXN1bHQub3V0ZGF0ZWRNb2R1bGVzKTtcblx0XHRcdFx0Zm9yIChtb2R1bGVJZCBpbiByZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKHJlc3VsdC5vdXRkYXRlZERlcGVuZGVuY2llcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0XHRpZiAoIW91dGRhdGVkRGVwZW5kZW5jaWVzW21vZHVsZUlkXSlcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdID0gW107XG5cdFx0XHRcdFx0XHRhZGRBbGxUb1NldChcblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdLFxuXHRcdFx0XHRcdFx0XHRyZXN1bHQub3V0ZGF0ZWREZXBlbmRlbmNpZXNbbW9kdWxlSWRdXG5cdFx0XHRcdFx0XHQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0aWYgKGRvRGlzcG9zZSkge1xuXHRcdFx0XHRhZGRBbGxUb1NldChvdXRkYXRlZE1vZHVsZXMsIFtyZXN1bHQubW9kdWxlSWRdKTtcblx0XHRcdFx0YXBwbGllZFVwZGF0ZVttb2R1bGVJZF0gPSB3YXJuVW5leHBlY3RlZFJlcXVpcmU7XG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdGN1cnJlbnRVcGRhdGUgPSB1bmRlZmluZWQ7XG5cblx0Ly8gU3RvcmUgc2VsZiBhY2NlcHRlZCBvdXRkYXRlZCBtb2R1bGVzIHRvIHJlcXVpcmUgdGhlbSBsYXRlciBieSB0aGUgbW9kdWxlIHN5c3RlbVxuXHR2YXIgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzID0gW107XG5cdGZvciAodmFyIGogPSAwOyBqIDwgb3V0ZGF0ZWRNb2R1bGVzLmxlbmd0aDsgaisrKSB7XG5cdFx0dmFyIG91dGRhdGVkTW9kdWxlSWQgPSBvdXRkYXRlZE1vZHVsZXNbal07XG5cdFx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19yZXF1aXJlX18uY1tvdXRkYXRlZE1vZHVsZUlkXTtcblx0XHRpZiAoXG5cdFx0XHRtb2R1bGUgJiZcblx0XHRcdChtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWQgfHwgbW9kdWxlLmhvdC5fbWFpbikgJiZcblx0XHRcdC8vIHJlbW92ZWQgc2VsZi1hY2NlcHRlZCBtb2R1bGVzIHNob3VsZCBub3QgYmUgcmVxdWlyZWRcblx0XHRcdGFwcGxpZWRVcGRhdGVbb3V0ZGF0ZWRNb2R1bGVJZF0gIT09IHdhcm5VbmV4cGVjdGVkUmVxdWlyZSAmJlxuXHRcdFx0Ly8gd2hlbiBjYWxsZWQgaW52YWxpZGF0ZSBzZWxmLWFjY2VwdGluZyBpcyBub3QgcG9zc2libGVcblx0XHRcdCFtb2R1bGUuaG90Ll9zZWxmSW52YWxpZGF0ZWRcblx0XHQpIHtcblx0XHRcdG91dGRhdGVkU2VsZkFjY2VwdGVkTW9kdWxlcy5wdXNoKHtcblx0XHRcdFx0bW9kdWxlOiBvdXRkYXRlZE1vZHVsZUlkLFxuXHRcdFx0XHRyZXF1aXJlOiBtb2R1bGUuaG90Ll9yZXF1aXJlU2VsZixcblx0XHRcdFx0ZXJyb3JIYW5kbGVyOiBtb2R1bGUuaG90Ll9zZWxmQWNjZXB0ZWRcblx0XHRcdH0pO1xuXHRcdH1cblx0fVxuXG5cdHZhciBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcztcblxuXHRyZXR1cm4ge1xuXHRcdGRpc3Bvc2U6IGZ1bmN0aW9uICgpIHtcblx0XHRcdGN1cnJlbnRVcGRhdGVSZW1vdmVkQ2h1bmtzLmZvckVhY2goZnVuY3Rpb24gKGNodW5rSWQpIHtcblx0XHRcdFx0ZGVsZXRlIGluc3RhbGxlZENodW5rc1tjaHVua0lkXTtcblx0XHRcdH0pO1xuXHRcdFx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSB1bmRlZmluZWQ7XG5cblx0XHRcdHZhciBpZHg7XG5cdFx0XHR2YXIgcXVldWUgPSBvdXRkYXRlZE1vZHVsZXMuc2xpY2UoKTtcblx0XHRcdHdoaWxlIChxdWV1ZS5sZW5ndGggPiAwKSB7XG5cdFx0XHRcdHZhciBtb2R1bGVJZCA9IHF1ZXVlLnBvcCgpO1xuXHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblx0XHRcdFx0aWYgKCFtb2R1bGUpIGNvbnRpbnVlO1xuXG5cdFx0XHRcdHZhciBkYXRhID0ge307XG5cblx0XHRcdFx0Ly8gQ2FsbCBkaXNwb3NlIGhhbmRsZXJzXG5cdFx0XHRcdHZhciBkaXNwb3NlSGFuZGxlcnMgPSBtb2R1bGUuaG90Ll9kaXNwb3NlSGFuZGxlcnM7XG5cdFx0XHRcdGZvciAoaiA9IDA7IGogPCBkaXNwb3NlSGFuZGxlcnMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRkaXNwb3NlSGFuZGxlcnNbal0uY2FsbChudWxsLCBkYXRhKTtcblx0XHRcdFx0fVxuXHRcdFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmhtckRbbW9kdWxlSWRdID0gZGF0YTtcblxuXHRcdFx0XHQvLyBkaXNhYmxlIG1vZHVsZSAodGhpcyBkaXNhYmxlcyByZXF1aXJlcyBmcm9tIHRoaXMgbW9kdWxlKVxuXHRcdFx0XHRtb2R1bGUuaG90LmFjdGl2ZSA9IGZhbHNlO1xuXG5cdFx0XHRcdC8vIHJlbW92ZSBtb2R1bGUgZnJvbSBjYWNoZVxuXHRcdFx0XHRkZWxldGUgX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXTtcblxuXHRcdFx0XHQvLyB3aGVuIGRpc3Bvc2luZyB0aGVyZSBpcyBubyBuZWVkIHRvIGNhbGwgZGlzcG9zZSBoYW5kbGVyXG5cdFx0XHRcdGRlbGV0ZSBvdXRkYXRlZERlcGVuZGVuY2llc1ttb2R1bGVJZF07XG5cblx0XHRcdFx0Ly8gcmVtb3ZlIFwicGFyZW50c1wiIHJlZmVyZW5jZXMgZnJvbSBhbGwgY2hpbGRyZW5cblx0XHRcdFx0Zm9yIChqID0gMDsgaiA8IG1vZHVsZS5jaGlsZHJlbi5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdHZhciBjaGlsZCA9IF9fd2VicGFja19yZXF1aXJlX18uY1ttb2R1bGUuY2hpbGRyZW5bal1dO1xuXHRcdFx0XHRcdGlmICghY2hpbGQpIGNvbnRpbnVlO1xuXHRcdFx0XHRcdGlkeCA9IGNoaWxkLnBhcmVudHMuaW5kZXhPZihtb2R1bGVJZCk7XG5cdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSB7XG5cdFx0XHRcdFx0XHRjaGlsZC5wYXJlbnRzLnNwbGljZShpZHgsIDEpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyByZW1vdmUgb3V0ZGF0ZWQgZGVwZW5kZW5jeSBmcm9tIG1vZHVsZSBjaGlsZHJlblxuXHRcdFx0dmFyIGRlcGVuZGVuY3k7XG5cdFx0XHRmb3IgKHZhciBvdXRkYXRlZE1vZHVsZUlkIGluIG91dGRhdGVkRGVwZW5kZW5jaWVzKSB7XG5cdFx0XHRcdGlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLm8ob3V0ZGF0ZWREZXBlbmRlbmNpZXMsIG91dGRhdGVkTW9kdWxlSWQpKSB7XG5cdFx0XHRcdFx0bW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHRmb3IgKGogPSAwOyBqIDwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHRpZHggPSBtb2R1bGUuY2hpbGRyZW4uaW5kZXhPZihkZXBlbmRlbmN5KTtcblx0XHRcdFx0XHRcdFx0aWYgKGlkeCA+PSAwKSBtb2R1bGUuY2hpbGRyZW4uc3BsaWNlKGlkeCwgMSk7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fSxcblx0XHRhcHBseTogZnVuY3Rpb24gKHJlcG9ydEVycm9yKSB7XG5cdFx0XHR2YXIgYWNjZXB0UHJvbWlzZXMgPSBbXTtcblx0XHRcdC8vIGluc2VydCBuZXcgY29kZVxuXHRcdFx0Zm9yICh2YXIgdXBkYXRlTW9kdWxlSWQgaW4gYXBwbGllZFVwZGF0ZSkge1xuXHRcdFx0XHRpZiAoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGFwcGxpZWRVcGRhdGUsIHVwZGF0ZU1vZHVsZUlkKSkge1xuXHRcdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVt1cGRhdGVNb2R1bGVJZF0gPSBhcHBsaWVkVXBkYXRlW3VwZGF0ZU1vZHVsZUlkXTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHQvLyBydW4gbmV3IHJ1bnRpbWUgbW9kdWxlc1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjdXJyZW50VXBkYXRlUnVudGltZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0XHRjdXJyZW50VXBkYXRlUnVudGltZVtpXShfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gY2FsbCBhY2NlcHQgaGFuZGxlcnNcblx0XHRcdGZvciAodmFyIG91dGRhdGVkTW9kdWxlSWQgaW4gb3V0ZGF0ZWREZXBlbmRlbmNpZXMpIHtcblx0XHRcdFx0aWYgKF9fd2VicGFja19yZXF1aXJlX18ubyhvdXRkYXRlZERlcGVuZGVuY2llcywgb3V0ZGF0ZWRNb2R1bGVJZCkpIHtcblx0XHRcdFx0XHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX3JlcXVpcmVfXy5jW291dGRhdGVkTW9kdWxlSWRdO1xuXHRcdFx0XHRcdGlmIChtb2R1bGUpIHtcblx0XHRcdFx0XHRcdG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzID1cblx0XHRcdFx0XHRcdFx0b3V0ZGF0ZWREZXBlbmRlbmNpZXNbb3V0ZGF0ZWRNb2R1bGVJZF07XG5cdFx0XHRcdFx0XHR2YXIgY2FsbGJhY2tzID0gW107XG5cdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVycyA9IFtdO1xuXHRcdFx0XHRcdFx0dmFyIGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrcyA9IFtdO1xuXHRcdFx0XHRcdFx0Zm9yICh2YXIgaiA9IDA7IGogPCBtb2R1bGVPdXRkYXRlZERlcGVuZGVuY2llcy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRcdFx0XHR2YXIgZGVwZW5kZW5jeSA9IG1vZHVsZU91dGRhdGVkRGVwZW5kZW5jaWVzW2pdO1xuXHRcdFx0XHRcdFx0XHR2YXIgYWNjZXB0Q2FsbGJhY2sgPVxuXHRcdFx0XHRcdFx0XHRcdG1vZHVsZS5ob3QuX2FjY2VwdGVkRGVwZW5kZW5jaWVzW2RlcGVuZGVuY3ldO1xuXHRcdFx0XHRcdFx0XHR2YXIgZXJyb3JIYW5kbGVyID1cblx0XHRcdFx0XHRcdFx0XHRtb2R1bGUuaG90Ll9hY2NlcHRlZEVycm9ySGFuZGxlcnNbZGVwZW5kZW5jeV07XG5cdFx0XHRcdFx0XHRcdGlmIChhY2NlcHRDYWxsYmFjaykge1xuXHRcdFx0XHRcdFx0XHRcdGlmIChjYWxsYmFja3MuaW5kZXhPZihhY2NlcHRDYWxsYmFjaykgIT09IC0xKSBjb250aW51ZTtcblx0XHRcdFx0XHRcdFx0XHRjYWxsYmFja3MucHVzaChhY2NlcHRDYWxsYmFjayk7XG5cdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVycy5wdXNoKGVycm9ySGFuZGxlcik7XG5cdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzLnB1c2goZGVwZW5kZW5jeSk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGZvciAodmFyIGsgPSAwOyBrIDwgY2FsbGJhY2tzLmxlbmd0aDsgaysrKSB7XG5cdFx0XHRcdFx0XHRcdHZhciByZXN1bHQ7XG5cdFx0XHRcdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0XHRcdFx0cmVzdWx0ID0gY2FsbGJhY2tzW2tdLmNhbGwobnVsbCwgbW9kdWxlT3V0ZGF0ZWREZXBlbmRlbmNpZXMpO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIpIHtcblx0XHRcdFx0XHRcdFx0XHRpZiAodHlwZW9mIGVycm9ySGFuZGxlcnNba10gPT09IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3JIYW5kbGVyc1trXShlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRkZXBlbmRlbmN5SWQ6IGRlcGVuZGVuY2llc0ZvckNhbGxiYWNrc1trXVxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH0gY2F0Y2ggKGVycjIpIHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0b3B0aW9ucy5vbkVycm9yZWQoe1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0dHlwZTogXCJhY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRtb2R1bGVJZDogb3V0ZGF0ZWRNb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHRcdGRlcGVuZGVuY3lJZDogZGVwZW5kZW5jaWVzRm9yQ2FsbGJhY2tzW2tdLFxuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0XHRvcmlnaW5hbEVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycjIpO1xuXHRcdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9wdGlvbnMub25FcnJvcmVkKHtcblx0XHRcdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcImFjY2VwdC1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0bW9kdWxlSWQ6IG91dGRhdGVkTW9kdWxlSWQsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZGVwZW5kZW5jeUlkOiBkZXBlbmRlbmNpZXNGb3JDYWxsYmFja3Nba10sXG5cdFx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRcdGlmIChyZXN1bHQgJiYgdHlwZW9mIHJlc3VsdC50aGVuID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0XHRhY2NlcHRQcm9taXNlcy5wdXNoKHJlc3VsdCk7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblxuXHRcdFx0dmFyIG9uQWNjZXB0ZWQgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRcdC8vIExvYWQgc2VsZiBhY2NlcHRlZCBtb2R1bGVzXG5cdFx0XHRcdGZvciAodmFyIG8gPSAwOyBvIDwgb3V0ZGF0ZWRTZWxmQWNjZXB0ZWRNb2R1bGVzLmxlbmd0aDsgbysrKSB7XG5cdFx0XHRcdFx0dmFyIGl0ZW0gPSBvdXRkYXRlZFNlbGZBY2NlcHRlZE1vZHVsZXNbb107XG5cdFx0XHRcdFx0dmFyIG1vZHVsZUlkID0gaXRlbS5tb2R1bGU7XG5cdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdGl0ZW0ucmVxdWlyZShtb2R1bGVJZCk7XG5cdFx0XHRcdFx0fSBjYXRjaCAoZXJyKSB7XG5cdFx0XHRcdFx0XHRpZiAodHlwZW9mIGl0ZW0uZXJyb3JIYW5kbGVyID09PSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdFx0XHRcdFx0dHJ5IHtcblx0XHRcdFx0XHRcdFx0XHRpdGVtLmVycm9ySGFuZGxlcihlcnIsIHtcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZTogX193ZWJwYWNrX3JlcXVpcmVfXy5jW21vZHVsZUlkXVxuXHRcdFx0XHRcdFx0XHRcdH0pO1xuXHRcdFx0XHRcdFx0XHR9IGNhdGNoIChlcnIxKSB7XG5cdFx0XHRcdFx0XHRcdFx0aWYgKG9wdGlvbnMub25FcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHRcdHR5cGU6IFwic2VsZi1hY2NlcHQtZXJyb3ItaGFuZGxlci1lcnJvcmVkXCIsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdFx0ZXJyb3I6IGVycjEsXG5cdFx0XHRcdFx0XHRcdFx0XHRcdG9yaWdpbmFsRXJyb3I6IGVyclxuXHRcdFx0XHRcdFx0XHRcdFx0fSk7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRcdGlmICghb3B0aW9ucy5pZ25vcmVFcnJvcmVkKSB7XG5cdFx0XHRcdFx0XHRcdFx0XHRyZXBvcnRFcnJvcihlcnIxKTtcblx0XHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0XHRpZiAob3B0aW9ucy5vbkVycm9yZWQpIHtcblx0XHRcdFx0XHRcdFx0XHRvcHRpb25zLm9uRXJyb3JlZCh7XG5cdFx0XHRcdFx0XHRcdFx0XHR0eXBlOiBcInNlbGYtYWNjZXB0LWVycm9yZWRcIixcblx0XHRcdFx0XHRcdFx0XHRcdG1vZHVsZUlkOiBtb2R1bGVJZCxcblx0XHRcdFx0XHRcdFx0XHRcdGVycm9yOiBlcnJcblx0XHRcdFx0XHRcdFx0XHR9KTtcblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0XHRpZiAoIW9wdGlvbnMuaWdub3JlRXJyb3JlZCkge1xuXHRcdFx0XHRcdFx0XHRcdHJlcG9ydEVycm9yKGVycik7XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH07XG5cblx0XHRcdHJldHVybiBQcm9taXNlLmFsbChhY2NlcHRQcm9taXNlcylcblx0XHRcdFx0LnRoZW4ob25BY2NlcHRlZClcblx0XHRcdFx0LnRoZW4oZnVuY3Rpb24gKCkge1xuXHRcdFx0XHRcdHJldHVybiBvdXRkYXRlZE1vZHVsZXM7XG5cdFx0XHRcdH0pO1xuXHRcdH1cblx0fTtcbn1cbl9fd2VicGFja19yZXF1aXJlX18uaG1ySS5qc29ucCA9IGZ1bmN0aW9uIChtb2R1bGVJZCwgYXBwbHlIYW5kbGVycykge1xuXHRpZiAoIWN1cnJlbnRVcGRhdGUpIHtcblx0XHRjdXJyZW50VXBkYXRlID0ge307XG5cdFx0Y3VycmVudFVwZGF0ZVJ1bnRpbWUgPSBbXTtcblx0XHRjdXJyZW50VXBkYXRlUmVtb3ZlZENodW5rcyA9IFtdO1xuXHRcdGFwcGx5SGFuZGxlcnMucHVzaChhcHBseUhhbmRsZXIpO1xuXHR9XG5cdGlmICghX193ZWJwYWNrX3JlcXVpcmVfXy5vKGN1cnJlbnRVcGRhdGUsIG1vZHVsZUlkKSkge1xuXHRcdGN1cnJlbnRVcGRhdGVbbW9kdWxlSWRdID0gX193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXTtcblx0fVxufTtcbl9fd2VicGFja19yZXF1aXJlX18uaG1yQy5qc29ucCA9IGZ1bmN0aW9uIChcblx0Y2h1bmtJZHMsXG5cdHJlbW92ZWRDaHVua3MsXG5cdHJlbW92ZWRNb2R1bGVzLFxuXHRwcm9taXNlcyxcblx0YXBwbHlIYW5kbGVycyxcblx0dXBkYXRlZE1vZHVsZXNMaXN0XG4pIHtcblx0YXBwbHlIYW5kbGVycy5wdXNoKGFwcGx5SGFuZGxlcik7XG5cdGN1cnJlbnRVcGRhdGVDaHVua3MgPSB7fTtcblx0Y3VycmVudFVwZGF0ZVJlbW92ZWRDaHVua3MgPSByZW1vdmVkQ2h1bmtzO1xuXHRjdXJyZW50VXBkYXRlID0gcmVtb3ZlZE1vZHVsZXMucmVkdWNlKGZ1bmN0aW9uIChvYmosIGtleSkge1xuXHRcdG9ialtrZXldID0gZmFsc2U7XG5cdFx0cmV0dXJuIG9iajtcblx0fSwge30pO1xuXHRjdXJyZW50VXBkYXRlUnVudGltZSA9IFtdO1xuXHRjaHVua0lkcy5mb3JFYWNoKGZ1bmN0aW9uIChjaHVua0lkKSB7XG5cdFx0aWYgKFxuXHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiZcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXSAhPT0gdW5kZWZpbmVkXG5cdFx0KSB7XG5cdFx0XHRwcm9taXNlcy5wdXNoKGxvYWRVcGRhdGVDaHVuayhjaHVua0lkLCB1cGRhdGVkTW9kdWxlc0xpc3QpKTtcblx0XHRcdGN1cnJlbnRVcGRhdGVDaHVua3NbY2h1bmtJZF0gPSB0cnVlO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzW2NodW5rSWRdID0gZmFsc2U7XG5cdFx0fVxuXHR9KTtcblx0aWYgKF9fd2VicGFja19yZXF1aXJlX18uZikge1xuXHRcdF9fd2VicGFja19yZXF1aXJlX18uZi5qc29ucEhtciA9IGZ1bmN0aW9uIChjaHVua0lkLCBwcm9taXNlcykge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRjdXJyZW50VXBkYXRlQ2h1bmtzICYmXG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubyhjdXJyZW50VXBkYXRlQ2h1bmtzLCBjaHVua0lkKSAmJlxuXHRcdFx0XHQhY3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXVxuXHRcdFx0KSB7XG5cdFx0XHRcdHByb21pc2VzLnB1c2gobG9hZFVwZGF0ZUNodW5rKGNodW5rSWQpKTtcblx0XHRcdFx0Y3VycmVudFVwZGF0ZUNodW5rc1tjaHVua0lkXSA9IHRydWU7XG5cdFx0XHR9XG5cdFx0fTtcblx0fVxufTtcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5obXJNID0gKCkgPT4ge1xuXHRpZiAodHlwZW9mIGZldGNoID09PSBcInVuZGVmaW5lZFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJObyBicm93c2VyIHN1cHBvcnQ6IG5lZWQgZmV0Y2ggQVBJXCIpO1xuXHRyZXR1cm4gZmV0Y2goX193ZWJwYWNrX3JlcXVpcmVfXy5wICsgX193ZWJwYWNrX3JlcXVpcmVfXy5obXJGKCkpLnRoZW4oKHJlc3BvbnNlKSA9PiB7XG5cdFx0aWYocmVzcG9uc2Uuc3RhdHVzID09PSA0MDQpIHJldHVybjsgLy8gbm8gdXBkYXRlIGF2YWlsYWJsZVxuXHRcdGlmKCFyZXNwb25zZS5vaykgdGhyb3cgbmV3IEVycm9yKFwiRmFpbGVkIHRvIGZldGNoIHVwZGF0ZSBtYW5pZmVzdCBcIiArIHJlc3BvbnNlLnN0YXR1c1RleHQpO1xuXHRcdHJldHVybiByZXNwb25zZS5qc29uKCk7XG5cdH0pO1xufTtcblxuLy8gbm8gb24gY2h1bmtzIGxvYWRlZFxuXG4vLyBubyBqc29ucCBmdW5jdGlvbiIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiIiwiLy8gbW9kdWxlIGNhY2hlIGFyZSB1c2VkIHNvIGVudHJ5IGlubGluaW5nIGlzIGRpc2FibGVkXG4vLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2NjgpO1xuIiwiIl0sIm5hbWVzIjpbInNlbGVjdCIsImV2ZW50IiwidHJhbnNpdGlvbiIsImR1cmF0aW9uIiwib24iLCJ0b29sdGlwRWwiLCJzaG93IiwiY29udGVudCIsInlQb3MiLCJwYWdlWSIsInhQb3MiLCJwYWdlWCIsImRvY3VtZW50IiwiYm9keSIsImNsaWVudFdpZHRoIiwic3R5bGUiLCJjbGFzc2VkIiwiaGlkZSIsImh0bWwiLCJmb3JtYXRDb250ZW50IiwiY29tcG9uZW50IiwiZm9yRWFjaCIsIml0ZW0iLCJpbmRleCIsImNzc0NsYXNzIiwibGFiZWwiLCJPYmplY3QiLCJrZXlzIiwiY29uY2F0Iiwic2VsZWN0QWxsIiwiZm9ybWF0Iiwic2NhbGVRdWFudGlsZSIsInNjYWxlT3JkaW5hbCIsInNjYWxlTG9nIiwiZXh0ZW50IiwidG9vbHRpcCIsImRvbGxhckZvcm1hdHRlciIsInBlcmNlbnRGb3JtYXR0ZXIiLCJjb3VudHJpZXMiLCJjb2xvcnMiLCJtYXJnaW4iLCJ0b3AiLCJyaWdodCIsImJvdHRvbSIsImxlZnQiLCJjb250YWluZXIiLCJyb3dzIiwiY29sdW1ucyIsInBhZGRpbmciLCJtb2RhbFBhZGRpbmciLCJjaGFydCIsIndpZHRoIiwiaGVpZ2h0IiwiY2VsbFNpemUiLCJhY3RpdmVTdGF0ZSIsImJvcmRlckNvbG9yU2NhbGUiLCJib3JkZXJXaWR0aFNjYWxlIiwiZmlsbFNjYWxlIiwia2V5RmlsdGVyIiwiZGlmZiIsImRyYXciLCJkYXRhIiwiZG9tYWluIiwiZCIsInRvdGFsZG9sbGFycyIsInJhbmdlIiwiZHJhd1BlcmNlbnRzIiwibWFwIiwiY29sb3IiLCJpIiwiaW5kaWNlcyIsImNvdW50cnkiLCJwdXNoIiwiaW5kZXhPZiIsImdyb3VwcyIsImVhY2giLCJnIiwiZ2kiLCJub2RlcyIsInBlcmNlbnRPYmoiLCJBcnJheSIsIk1hdGgiLCJyb3VuZCIsImZpbGwiLCJzdGF0ZSIsImNvZGUiLCJwZXJjZW50IiwiZmlsdGVyIiwiYyIsImxlbmd0aCIsInBhcmVudFgiLCJhdHRyIiwicGFyZW50WSIsInBlcmNlbnRzIiwiZXhpdCIsInJlbW92ZSIsImVudGVyIiwiYXBwZW5kIiwibWVyZ2UiLCJkaSIsInN3aXRjaEluZGV4IiwiZmluZEluZGV4IiwicCIsIl90b0NvbnN1bWFibGVBcnJheSIsInJldmVyc2UiLCJjZWlsIiwiYWJzIiwieCIsInBhcnNlSW50IiwieSIsImNvbCIsInJvdyIsInRleHQiLCJpbnRlcmFjdGlvbnMiLCJzdGF0ZXMiLCJjbGljayIsImRyYXdTdGF0ZSIsInN0YXRlRGF0YSIsImRyYXdHcmlkTWFwIiwic3RhdGVTaXplIiwic3ZnIiwiY29sdW1uMiIsInJlcGxhY2UiLCJjaGFyQXQiLCJ0b1VwcGVyQ2FzZSIsInNsaWNlIiwiam9pbiIsImdyYW5kdG90YWwiLCJjYWxjQ2VsbFNpemUiLCJncmlkRGF0YSIsImdyaWRHcmFwaCIsInN2Z05vZGVzIiwicXVlcnlTZWxlY3RvckFsbCIsImtleSIsImdyaWRNYXBOb2RlcyIsImdyaWRNYXAiLCJncm91cE5vZGVzIiwiYnJlYWtwb2ludCIsImdldENvbXB1dGVkU3R5bGUiLCJnZXRQcm9wZXJ0eVZhbHVlIiwibW91c2VvdmVyIiwibW91c2VsZWF2ZSIsInN0YXRlTm9kZSIsInF1ZXJ5U2VsZWN0b3IiLCJuY29sIiwibnJvdyIsImNlbGxzaXplIiwieHBvcyIsInlwb3MiLCJ3IiwiaCIsImdyaWRXaWR0aCIsImdyaWRIZWlnaHQiLCJjb2xXaWR0aCIsImZsb29yIiwicm93V2lkdGgiLCJhcmd1bWVudHMiLCJ1bmRlZmluZWQiLCJleGNsdWRlZCIsImNsYXNzTGlzdCIsImlzQWxsIiwiY29udGFpbnMiLCJpc0FjdGl2ZSIsImNoZWNrZWQiLCJpc0FsbFNlbGVjdGVkIiwibm9kZSIsImZpbmQiLCJhbGwiLCJ1bnNoaWZ0IiwiY2FsbCIsInNob3dUb29sdGlwIiwidG9vbHRpcENvbnRlbnQiLCJpbml0IiwiZGF0dW0iLCJyZXNpemUiLCJwYXJlbnRXaWR0aCIsIm9mZnNldFdpZHRoIiwic2l6ZSIsImQzRmV0Y2giLCJkYXRhU3JjIiwibG9hZERhdGEiLCJkYXRhUHJvbWlzZSIsImNzdiIsInJlc3VsdCIsIlByb21pc2UiLCJ0aGVuIiwicmVzIiwiX3JlcyIsIl9zbGljZWRUb0FycmF5IiwiZGF0YVJlc3BvbnNlIiwibWluTWF4IiwiaW5uZXJIVE1MIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciJdLCJzb3VyY2VSb290IjoiIn0=