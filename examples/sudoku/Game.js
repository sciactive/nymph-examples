(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("nymph-client"));
	else if(typeof define === 'function' && define.amd)
		define(["nymph-client"], factory);
	else if(typeof exports === 'object')
		exports["Game"] = factory(require("nymph-client"));
	else
		root["Game"] = factory(root["nymph-client"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_nymph_client__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./Game.src.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./Game.src.js":
/*!*********************!*\
  !*** ./Game.src.js ***!
  \*********************/
/*! exports provided: Game, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Game\", function() { return Game; });\n/* harmony import */ var nymph_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! nymph-client */ \"nymph-client\");\n/* harmony import */ var nymph_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(nymph_client__WEBPACK_IMPORTED_MODULE_0__);\nfunction _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\n\nvar Game =\n/*#__PURE__*/\nfunction (_Entity) {\n  _inherits(Game, _Entity);\n\n  function Game(id) {\n    var _this;\n\n    _classCallCheck(this, Game);\n\n    _this = _possibleConstructorReturn(this, _getPrototypeOf(Game).call(this, id));\n    _this.difficulty = 1;\n    _this.board = [[], [], [], [], [], [], [], [], []];\n    _this.time = 0;\n    _this.done = false;\n    _this.$mistakes = [[], [], [], [], [], [], [], [], []];\n    _this.$help = 1;\n    return _this;\n  }\n\n  _createClass(Game, [{\n    key: \"$generateBoard\",\n    value: function $generateBoard() {\n      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n        args[_key] = arguments[_key];\n      }\n\n      return this.$serverCall('generateBoard', args);\n    }\n  }, {\n    key: \"$makeItFun\",\n    value: function $makeItFun() {\n      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {\n        args[_key2] = arguments[_key2];\n      }\n\n      return this.$serverCall('makeItFun', args);\n    }\n  }, {\n    key: \"$checkDone\",\n    value: function $checkDone() {\n      this.done = false;\n\n      for (var y in this.board) {\n        for (var x in this.board[y]) {\n          if (this.playBoard[y][x]) {\n            continue;\n          } else if (!this.board[y][x]) {\n            return;\n          } else if (this.$neighborsSquare(x, y).concat(this.$neighborsY(x, y)).concat(this.$neighborsX(x, y)).indexOf(this.board[y][x]) !== -1) {\n            return;\n          }\n        }\n      }\n\n      this.done = true;\n    }\n  }, {\n    key: \"$calculateErrors\",\n    value: function $calculateErrors() {\n      this.$checkDone();\n\n      if (this.done) {\n        this.$mistakes = [[], [], [], [], [], [], [], [], []];\n        return;\n      }\n\n      switch (this.$help) {\n        case 1:\n          // Oh, we got a badass over here.\n          this.$mistakes = [[], [], [], [], [], [], [], [], []];\n          break;\n\n        case 2:\n          // We need to mark every spot where the user made an obvious\n          // mistake.\n          for (var y in this.board) {\n            for (var x in this.board[y]) {\n              if (this.playBoard[y][x]) {\n                this.$mistakes[y][x] = false;\n              } else if (this.board[y][x] && this.$neighborsSquare(x, y).concat(this.$neighborsY(x, y)).concat(this.$neighborsX(x, y)).indexOf(Number(this.board[y][x])) !== -1) {\n                this.$mistakes[y][x] = true;\n              } else {\n                this.$mistakes[y][x] = false;\n              }\n            }\n          }\n\n          break;\n\n        case 3:\n          // We need to mark every spot the user differs from the\n          // solved board.\n          for (var _y in this.board) {\n            for (var _x in this.board[_y]) {\n              if (this.playBoard[_y][_x]) {\n                this.$mistakes[_y][_x] = false;\n              } else if (this.board[_y][_x] && this.board[_y][_x] !== this.solvedBoard[_y][_x]) {\n                this.$mistakes[_y][_x] = true;\n              } else {\n                this.$mistakes[_y][_x] = false;\n              }\n            }\n          }\n\n          break;\n      }\n    }\n  }, {\n    key: \"$neighborsY\",\n    value: function $neighborsY(x, y) {\n      var results = [];\n\n      for (var y2 = 0; y2 <= 8; y2++) {\n        if (y == y2) {\n          continue;\n        }\n\n        if (this.board[y2][x]) {\n          results.push(Number(this.board[y2][x]));\n        }\n      }\n\n      return results;\n    }\n  }, {\n    key: \"$neighborsX\",\n    value: function $neighborsX(x, y) {\n      var results = [];\n\n      for (var x2 = 0; x2 <= 8; x2++) {\n        if (x == x2) {\n          continue;\n        }\n\n        if (this.board[y][x2]) {\n          results.push(Number(this.board[y][x2]));\n        }\n      }\n\n      return results;\n    }\n  }, {\n    key: \"$neighborsSquare\",\n    value: function $neighborsSquare(x, y) {\n      var results = [];\n      var minX = y - y % 3;\n      var minY = x - x % 3;\n\n      for (var y2 = minX; y2 <= minX + 2; y2++) {\n        for (var x2 = minY; x2 <= minY + 2; x2++) {\n          if (y2 == y && x2 == x) {\n            continue;\n          }\n\n          if (this.board[y2][x2]) {\n            results.push(Number(this.board[y2][x2]));\n          }\n        }\n      }\n\n      return results;\n    }\n  }]);\n\n  return Game;\n}(nymph_client__WEBPACK_IMPORTED_MODULE_0__[\"Entity\"]); // The name of the server class\n\nGame[\"class\"] = 'Game';\nnymph_client__WEBPACK_IMPORTED_MODULE_0__[\"Nymph\"].setEntityClass(Game[\"class\"], Game);\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n//# sourceURL=webpack://%5Bname%5D/./Game.src.js?");

/***/ }),

/***/ "nymph-client":
/*!*******************************!*\
  !*** external "nymph-client" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_nymph_client__;\n\n//# sourceURL=webpack://%5Bname%5D/external_%22nymph-client%22?");

/***/ })

/******/ });
});