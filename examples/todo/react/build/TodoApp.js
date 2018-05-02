(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("Todo"), require("NymphClient"), require("PropTypes"), require("React"), require("ReactDOM"), require("ReactRedux"), require("Redux"));
	else if(typeof define === 'function' && define.amd)
		define(["Todo", "NymphClient", "PropTypes", "React", "ReactDOM", "ReactRedux", "Redux"], factory);
	else if(typeof exports === 'object')
		exports["TodoApp"] = factory(require("Todo"), require("NymphClient"), require("PropTypes"), require("React"), require("ReactDOM"), require("ReactRedux"), require("Redux"));
	else
		root["TodoApp"] = factory(root["Todo"], root["NymphClient"], root["PropTypes"], root["React"], root["ReactDOM"], root["ReactRedux"], root["Redux"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_Todo__, __WEBPACK_EXTERNAL_MODULE_nymph_client__, __WEBPACK_EXTERNAL_MODULE_prop_types__, __WEBPACK_EXTERNAL_MODULE_react__, __WEBPACK_EXTERNAL_MODULE_react_dom__, __WEBPACK_EXTERNAL_MODULE_react_redux__, __WEBPACK_EXTERNAL_MODULE_redux__) {
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
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.jsx");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/actions/index.js":
/*!******************************!*\
  !*** ./src/actions/index.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n  var addTodo = exports.addTodo = function addTodo(name) {\n    return {\n      type: 'ADD_TODO',\n      name: name\n    };\n  };\n\n  var setSort = exports.setSort = function setSort(sort) {\n    return {\n      type: 'SET_SORT',\n      sort: sort\n    };\n  };\n\n  var toggleTodo = exports.toggleTodo = function toggleTodo(todo) {\n    return {\n      type: 'TOGGLE_TODO',\n      todo: todo\n    };\n  };\n\n  var changeTodo = exports.changeTodo = function changeTodo(todo, name) {\n    return {\n      type: 'CHANGE_TODO',\n      todo: todo,\n      name: name\n    };\n  };\n\n  var archiveDoneTodos = exports.archiveDoneTodos = function archiveDoneTodos() {\n    return {\n      type: 'ARCHIVE_DONE_TODOS'\n    };\n  };\n\n  var deleteTodos = exports.deleteTodos = function deleteTodos() {\n    return {\n      type: 'DELETE_TODOS'\n    };\n  };\n\n  var subscribe = exports.subscribe = function subscribe(archived) {\n    return {\n      type: 'SUBSCRIBE',\n      archived: archived\n    };\n  };\n\n  var updateUserCount = exports.updateUserCount = function updateUserCount(userCount) {\n    return {\n      type: 'UPDATE_USER_COUNT',\n      userCount: userCount\n    };\n  };\n\n  var updateTodos = exports.updateTodos = function updateTodos(todos, archived) {\n    return {\n      type: 'UPDATE_TODOS',\n      todos: todos,\n      archived: archived\n    };\n  };\n});\n\n//# sourceURL=webpack://TodoApp/./src/actions/index.js?");

/***/ }),

/***/ "./src/components/App.jsx":
/*!********************************!*\
  !*** ./src/components/App.jsx ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! ../containers/AddTodoContainer */ \"./src/containers/AddTodoContainer.jsx\"), __webpack_require__(/*! ../containers/TodoListContainer */ \"./src/containers/TodoListContainer.jsx\"), __webpack_require__(/*! ../containers/TodoActionsContainer */ \"./src/containers/TodoActionsContainer.jsx\"), __webpack_require__(/*! ../containers/FooterContainer */ \"./src/containers/FooterContainer.jsx\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _react, _AddTodoContainer, _TodoListContainer, _TodoActionsContainer, _FooterContainer) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _react2 = _interopRequireDefault(_react);\n\n  var _AddTodoContainer2 = _interopRequireDefault(_AddTodoContainer);\n\n  var _TodoListContainer2 = _interopRequireDefault(_TodoListContainer);\n\n  var _TodoActionsContainer2 = _interopRequireDefault(_TodoActionsContainer);\n\n  var _FooterContainer2 = _interopRequireDefault(_FooterContainer);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var App = function App() {\n    return _react2.default.createElement(\n      'div',\n      null,\n      _react2.default.createElement(\n        'div',\n        { className: 'row' },\n        _react2.default.createElement(\n          'div',\n          { className: 'col-sm-8' },\n          _react2.default.createElement(_TodoListContainer2.default, null)\n        ),\n        _react2.default.createElement(\n          'div',\n          { className: 'col-sm-4', style: { textAlign: 'center', marginBottom: '1em' } },\n          _react2.default.createElement(_TodoActionsContainer2.default, null)\n        )\n      ),\n      _react2.default.createElement(_AddTodoContainer2.default, null),\n      _react2.default.createElement(_FooterContainer2.default, null)\n    );\n  };\n\n  exports.default = App;\n});\n\n//# sourceURL=webpack://TodoApp/./src/components/App.jsx?");

/***/ }),

/***/ "./src/components/Footer.jsx":
/*!***********************************!*\
  !*** ./src/components/Footer.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! prop-types */ \"prop-types\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _react, _propTypes) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _react2 = _interopRequireDefault(_react);\n\n  var _propTypes2 = _interopRequireDefault(_propTypes);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var Footer = function Footer(_ref) {\n    var userCount = _ref.userCount;\n    return _react2.default.createElement(\n      'div',\n      { className: 'label label-default', style: { position: 'fixed', right: '5px', bottom: '5px' } },\n      'Active Users: ',\n      userCount\n    );\n  };\n\n  Footer.propTypes = {\n    userCount: _propTypes2.default.number.isRequired\n  };\n\n  exports.default = Footer;\n});\n\n//# sourceURL=webpack://TodoApp/./src/components/Footer.jsx?");

/***/ }),

/***/ "./src/components/TodoActions.jsx":
/*!****************************************!*\
  !*** ./src/components/TodoActions.jsx ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! prop-types */ \"prop-types\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _react, _propTypes) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _react2 = _interopRequireDefault(_react);\n\n  var _propTypes2 = _interopRequireDefault(_propTypes);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var TodoActions = function TodoActions(_ref) {\n    var archived = _ref.archived,\n        todosLength = _ref.todosLength,\n        remaining = _ref.remaining,\n        sort = _ref.sort,\n        onArchiveClick = _ref.onArchiveClick,\n        onDeleteClick = _ref.onDeleteClick,\n        onToggleArchivedClick = _ref.onToggleArchivedClick,\n        onSortClick = _ref.onSortClick;\n\n    return _react2.default.createElement(\n      'div',\n      null,\n      _react2.default.createElement(\n        'small',\n        { className: 'alert alert-info', style: { display: 'block' } },\n        archived ? _react2.default.createElement(\n          'span',\n          null,\n          todosLength,\n          ' archived todos'\n        ) : _react2.default.createElement(\n          'span',\n          null,\n          todosLength === 0 ? _react2.default.createElement(\n            'span',\n            null,\n            '0 todos'\n          ) : _react2.default.createElement(\n            'span',\n            null,\n            remaining,\n            ' of ',\n            todosLength,\n            ' remaining'\n          )\n        ),\n        todosLength > 0 && _react2.default.createElement(\n          'span',\n          null,\n          '\\xA0 [',\n          archived ? _react2.default.createElement(\n            'a',\n            { href: 'javascript:void(0)', onClick: onDeleteClick },\n            'delete'\n          ) : _react2.default.createElement(\n            'a',\n            { href: 'javascript:void(0)', onClick: onArchiveClick },\n            'archive done'\n          ),\n          ']'\n        ),\n        _react2.default.createElement('br', null),\n        _react2.default.createElement(\n          'a',\n          { href: 'javascript:void(0)', onClick: function onClick(e) {\n              return onToggleArchivedClick(!archived);\n            } },\n          'show ',\n          archived ? 'current' : 'archived'\n        )\n      ),\n      todosLength > 1 && _react2.default.createElement(\n        'div',\n        { style: { textAlign: 'left' } },\n        'Sort: ',\n        _react2.default.createElement('br', null),\n        _react2.default.createElement(\n          'label',\n          { style: { fontWeight: 'normal' } },\n          _react2.default.createElement('input', { type: 'radio', checked: sort === 'name', onChange: function onChange(e) {\n              return onSortClick(e.target.value);\n            }, name: 'sort', value: 'name' }),\n          ' Alpha'\n        ),\n        '\\xA0\\xA0\\xA0',\n        _react2.default.createElement(\n          'label',\n          { style: { fontWeight: 'normal' } },\n          _react2.default.createElement('input', { type: 'radio', checked: sort === 'cdate', onChange: function onChange(e) {\n              return onSortClick(e.target.value);\n            }, name: 'sort', value: 'cdate' }),\n          ' Created'\n        )\n      )\n    );\n  };\n\n  TodoActions.propTypes = {\n    archived: _propTypes2.default.bool.isRequired,\n    todosLength: _propTypes2.default.number.isRequired,\n    remaining: _propTypes2.default.number.isRequired,\n    sort: _propTypes2.default.string.isRequired,\n    onArchiveClick: _propTypes2.default.func.isRequired,\n    onDeleteClick: _propTypes2.default.func.isRequired,\n    onToggleArchivedClick: _propTypes2.default.func.isRequired,\n    onSortClick: _propTypes2.default.func.isRequired\n  };\n\n  exports.default = TodoActions;\n});\n\n//# sourceURL=webpack://TodoApp/./src/components/TodoActions.jsx?");

/***/ }),

/***/ "./src/components/TodoEl.jsx":
/*!***********************************!*\
  !*** ./src/components/TodoEl.jsx ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! prop-types */ \"prop-types\"), __webpack_require__(/*! Todo */ \"Todo\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _react, _propTypes, _Todo) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _react2 = _interopRequireDefault(_react);\n\n  var _propTypes2 = _interopRequireDefault(_propTypes);\n\n  var _Todo2 = _interopRequireDefault(_Todo);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var TodoEl = function TodoEl(_ref) {\n    var onClick = _ref.onClick,\n        onChange = _ref.onChange,\n        todo = _ref.todo,\n        archived = _ref.archived;\n\n\n    var todoStyle = {\n      display: 'inline',\n      backgroundColor: 'transparent',\n      border: 0,\n      flexGrow: 1\n    };\n\n    var todoStyleDone = Object.assign({}, todoStyle, {\n      textDecoration: 'line-through',\n      color: 'grey'\n    });\n\n    return _react2.default.createElement(\n      'label',\n      { className: 'list-group-item list-group-item-' + (todo.data.done ? 'success' : 'warning'), style: { fontWeight: 'normal', cursor: 'pointer' } },\n      _react2.default.createElement(\n        'span',\n        { style: { display: 'flex', justifyContent: 'space-between' } },\n        _react2.default.createElement(\n          'span',\n          { style: { display: 'flex', flexGrow: 1 } },\n          !archived && _react2.default.createElement('input', { type: 'checkbox', checked: todo.data.done, onChange: onClick, style: { marginRight: '5px' } }),\n          _react2.default.createElement('input', { type: 'text', style: todo.data.done ? todoStyleDone : todoStyle, defaultValue: todo.data.name, onKeyDown: function onKeyDown(e) {\n              return e.keyCode === 13 && onChange(e.target.value);\n            }, onBlur: function onBlur(e) {\n              return onChange(e.target.value);\n            } })\n        ),\n        _react2.default.createElement(\n          'span',\n          { style: { display: 'flex', marginLeft: '5px', flexShrink: 1 } },\n          function () {\n            var date = new Date(todo.cdate * 1000);\n            return date.getFullYear() + '-' + (date.getMonth + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ' + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());\n          }()\n        )\n      )\n    );\n  };\n\n  TodoEl.propTypes = {\n    onClick: _propTypes2.default.func.isRequired,\n    onChange: _propTypes2.default.func.isRequired,\n    todo: _propTypes2.default.instanceOf(_Todo2.default).isRequired,\n    archived: _propTypes2.default.bool.isRequired\n  };\n\n  exports.default = TodoEl;\n});\n\n//# sourceURL=webpack://TodoApp/./src/components/TodoEl.jsx?");

/***/ }),

/***/ "./src/components/TodoList.jsx":
/*!*************************************!*\
  !*** ./src/components/TodoList.jsx ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! prop-types */ \"prop-types\"), __webpack_require__(/*! ./TodoEl */ \"./src/components/TodoEl.jsx\"), __webpack_require__(/*! Todo */ \"Todo\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _react, _propTypes, _TodoEl, _Todo) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _react2 = _interopRequireDefault(_react);\n\n  var _propTypes2 = _interopRequireDefault(_propTypes);\n\n  var _TodoEl2 = _interopRequireDefault(_TodoEl);\n\n  var _Todo2 = _interopRequireDefault(_Todo);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var TodoList = function TodoList(_ref) {\n    var todos = _ref.todos,\n        archived = _ref.archived,\n        onTodoClick = _ref.onTodoClick,\n        onTodoChange = _ref.onTodoChange;\n    return _react2.default.createElement(\n      'div',\n      { className: 'list-group', style: { clear: 'both' } },\n      !todos.length && _react2.default.createElement(\n        'div',\n        { className: 'well' },\n        'You have no todos yet.'\n      ),\n      todos.map(function (todo) {\n        return _react2.default.createElement(_TodoEl2.default, { key: todo.guid, todo: todo, archived: archived, onClick: function onClick() {\n            return onTodoClick(todo);\n          }, onChange: function onChange(name) {\n            return onTodoChange(todo, name);\n          } });\n      })\n    );\n  };\n\n  TodoList.propTypes = {\n    todos: _propTypes2.default.arrayOf(_propTypes2.default.instanceOf(_Todo2.default).isRequired).isRequired,\n    onTodoClick: _propTypes2.default.func.isRequired\n  };\n\n  exports.default = TodoList;\n});\n\n//# sourceURL=webpack://TodoApp/./src/components/TodoList.jsx?");

/***/ }),

/***/ "./src/containers/AddTodoContainer.jsx":
/*!*********************************************!*\
  !*** ./src/containers/AddTodoContainer.jsx ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! react-redux */ \"react-redux\"), __webpack_require__(/*! prop-types */ \"prop-types\"), __webpack_require__(/*! ../actions */ \"./src/actions/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _react, _reactRedux, _propTypes, _actions) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _react2 = _interopRequireDefault(_react);\n\n  var _propTypes2 = _interopRequireDefault(_propTypes);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var mapStateToProps = function mapStateToProps(state) {\n    return {\n      nextNumber: state.todos.todos.length + 1\n    };\n  };\n\n  var AddTodo = function AddTodo(_ref) {\n    var nextNumber = _ref.nextNumber,\n        dispatch = _ref.dispatch;\n\n    var input = void 0;\n\n    return _react2.default.createElement(\n      'div',\n      null,\n      _react2.default.createElement(\n        'form',\n        {\n          style: { display: 'flex', marginBottom: '20px' },\n          onSubmit: function onSubmit(e) {\n            e.preventDefault();\n            var trimmedInput = input.value.trim();\n            if (!trimmedInput) {\n              return;\n            }\n            dispatch((0, _actions.addTodo)(trimmedInput));\n            input.value = '';\n          }\n        },\n        _react2.default.createElement('input', {\n          className: 'form-control',\n          style: { flexGrow: 1, marginRight: '5px' },\n          type: 'text',\n          placeholder: 'add new todo here',\n          ref: function ref(node) {\n            input = node;\n          }\n        }),\n        _react2.default.createElement(\n          'button',\n          {\n            className: 'btn btn-default',\n            type: 'submit'\n          },\n          'add #',\n          nextNumber\n        )\n      )\n    );\n  };\n\n  AddTodo.propTypes = {\n    nextNumber: _propTypes2.default.number.isRequired,\n    dispatch: _propTypes2.default.func.isRequired\n  };\n\n  var AddTodoContainer = (0, _reactRedux.connect)(mapStateToProps)(AddTodo);\n\n  exports.default = AddTodoContainer;\n});\n\n//# sourceURL=webpack://TodoApp/./src/containers/AddTodoContainer.jsx?");

/***/ }),

/***/ "./src/containers/FooterContainer.jsx":
/*!********************************************!*\
  !*** ./src/containers/FooterContainer.jsx ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react-redux */ \"react-redux\"), __webpack_require__(/*! ../components/Footer */ \"./src/components/Footer.jsx\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _reactRedux, _Footer) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _Footer2 = _interopRequireDefault(_Footer);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var mapStateToProps = function mapStateToProps(state) {\n    return {\n      userCount: state.subscription.userCount\n    };\n  };\n\n  var FooterContainer = (0, _reactRedux.connect)(mapStateToProps)(_Footer2.default);\n\n  exports.default = FooterContainer;\n});\n\n//# sourceURL=webpack://TodoApp/./src/containers/FooterContainer.jsx?");

/***/ }),

/***/ "./src/containers/TodoActionsContainer.jsx":
/*!*************************************************!*\
  !*** ./src/containers/TodoActionsContainer.jsx ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react-redux */ \"react-redux\"), __webpack_require__(/*! ../actions */ \"./src/actions/index.js\"), __webpack_require__(/*! ../components/TodoActions */ \"./src/components/TodoActions.jsx\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _reactRedux, _actions, _TodoActions) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _TodoActions2 = _interopRequireDefault(_TodoActions);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var getRemainingTodos = function getRemainingTodos(todos) {\n    return todos.filter(function (todo) {\n      return !todo.data.done;\n    });\n  };\n\n  var mapStateToProps = function mapStateToProps(state) {\n    return {\n      archived: state.todos.archived,\n      todosLength: state.todos.todos.length,\n      remaining: getRemainingTodos(state.todos.todos).length,\n      sort: state.todos.sort\n    };\n  };\n\n  var mapDispatchToProps = function mapDispatchToProps(dispatch) {\n    return {\n      onArchiveClick: function onArchiveClick() {\n        dispatch((0, _actions.archiveDoneTodos)());\n      },\n      onDeleteClick: function onDeleteClick() {\n        dispatch((0, _actions.deleteTodos)());\n      },\n      onToggleArchivedClick: function onToggleArchivedClick(archived) {\n        dispatch((0, _actions.subscribe)(archived));\n      },\n      onSortClick: function onSortClick(sort) {\n        dispatch((0, _actions.setSort)(sort));\n      }\n    };\n  };\n\n  var TodoActionsContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_TodoActions2.default);\n\n  exports.default = TodoActionsContainer;\n});\n\n//# sourceURL=webpack://TodoApp/./src/containers/TodoActionsContainer.jsx?");

/***/ }),

/***/ "./src/containers/TodoListContainer.jsx":
/*!**********************************************!*\
  !*** ./src/containers/TodoListContainer.jsx ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! react-redux */ \"react-redux\"), __webpack_require__(/*! ../actions */ \"./src/actions/index.js\"), __webpack_require__(/*! ../components/TodoList */ \"./src/components/TodoList.jsx\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _reactRedux, _actions, _TodoList) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _TodoList2 = _interopRequireDefault(_TodoList);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var mapStateToProps = function mapStateToProps(state) {\n    return {\n      todos: state.todos.todos,\n      archived: state.todos.archived\n    };\n  };\n\n  var mapDispatchToProps = function mapDispatchToProps(dispatch) {\n    return {\n      onTodoClick: function onTodoClick(todo) {\n        dispatch((0, _actions.toggleTodo)(todo));\n      },\n      onTodoChange: function onTodoChange(todo, name) {\n        dispatch((0, _actions.changeTodo)(todo, name));\n      }\n    };\n  };\n\n  var TodoListContainer = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(_TodoList2.default);\n\n  exports.default = TodoListContainer;\n});\n\n//# sourceURL=webpack://TodoApp/./src/containers/TodoListContainer.jsx?");

/***/ }),

/***/ "./src/index.jsx":
/*!***********************!*\
  !*** ./src/index.jsx ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(/*! react */ \"react\"), __webpack_require__(/*! react-dom */ \"react-dom\"), __webpack_require__(/*! react-redux */ \"react-redux\"), __webpack_require__(/*! redux */ \"redux\"), __webpack_require__(/*! ./reducers */ \"./src/reducers/index.js\"), __webpack_require__(/*! ./middleware/AsyncDispatch */ \"./src/middleware/AsyncDispatch.js\"), __webpack_require__(/*! ./actions */ \"./src/actions/index.js\"), __webpack_require__(/*! ./components/App */ \"./src/components/App.jsx\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (_react, _reactDom, _reactRedux, _redux, _reducers, _AsyncDispatch, _actions, _App) {\n  'use strict';\n\n  var _react2 = _interopRequireDefault(_react);\n\n  var _reducers2 = _interopRequireDefault(_reducers);\n\n  var _AsyncDispatch2 = _interopRequireDefault(_AsyncDispatch);\n\n  var _App2 = _interopRequireDefault(_App);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var store = (0, _redux.createStore)(_reducers2.default, (0, _redux.applyMiddleware)(_AsyncDispatch2.default));\n\n  store.dispatch((0, _actions.subscribe)(false));\n\n  (0, _reactDom.render)(_react2.default.createElement(\n    _reactRedux.Provider,\n    { store: store },\n    _react2.default.createElement(_App2.default, null)\n  ), document.getElementById('todoApp'));\n});\n\n//# sourceURL=webpack://TodoApp/./src/index.jsx?");

/***/ }),

/***/ "./src/middleware/AsyncDispatch.js":
/*!*****************************************!*\
  !*** ./src/middleware/AsyncDispatch.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports) {\n  \"use strict\";\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  exports.default = function (store) {\n    return function (next) {\n      return function (action) {\n        var syncActivityFinished = false;\n        var actionQueue = [];\n\n        function flushQueue() {\n          actionQueue.forEach(function (a) {\n            return store.dispatch(a);\n          }); // flush queue\n          actionQueue = [];\n        }\n\n        function asyncDispatch(asyncAction) {\n          actionQueue = actionQueue.concat([asyncAction]);\n\n          if (syncActivityFinished) {\n            flushQueue();\n          }\n        }\n\n        var actionWithAsyncDispatch = Object.assign({}, action, { asyncDispatch: asyncDispatch });\n\n        next(actionWithAsyncDispatch);\n        syncActivityFinished = true;\n        flushQueue();\n      };\n    };\n  };\n});\n\n//# sourceURL=webpack://TodoApp/./src/middleware/AsyncDispatch.js?");

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! redux */ \"redux\"), __webpack_require__(/*! ./todos */ \"./src/reducers/todos.js\"), __webpack_require__(/*! ./subscription */ \"./src/reducers/subscription.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _redux, _todos, _subscription) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _todos2 = _interopRequireDefault(_todos);\n\n  var _subscription2 = _interopRequireDefault(_subscription);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var todoApp = (0, _redux.combineReducers)({\n    todos: _todos2.default,\n    subscription: _subscription2.default\n  });\n\n  exports.default = todoApp;\n});\n\n//# sourceURL=webpack://TodoApp/./src/reducers/index.js?");

/***/ }),

/***/ "./src/reducers/subscription.js":
/*!**************************************!*\
  !*** ./src/reducers/subscription.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! nymph-client */ \"nymph-client\"), __webpack_require__(/*! Todo */ \"Todo\"), __webpack_require__(/*! ../actions */ \"./src/actions/index.js\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _nymphClient, _Todo, _actions) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _Todo2 = _interopRequireDefault(_Todo);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  var todos = function todos() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { subscription: null, userCount: null };\n    var action = arguments[1];\n\n    switch (action.type) {\n      case 'SUBSCRIBE':\n        {\n          if (state.subscription) {\n            state.subscription.unsubscribe();\n          }\n          var archived = action.archived;\n          var subscription = _nymphClient.Nymph.getEntities({ 'class': _Todo2.default.class }, { 'type': archived ? '&' : '!&', 'tag': 'archived' }).subscribe(function (newTodos) {\n            action.asyncDispatch((0, _actions.updateTodos)(newTodos, archived));\n          }, null, function (count) {\n            action.asyncDispatch((0, _actions.updateUserCount)(count));\n          });\n          return _extends({}, state, { subscription: subscription });\n        }\n      case 'UPDATE_USER_COUNT':\n        return _extends({}, state, { userCount: action.userCount });\n      default:\n        return state;\n    }\n  };\n\n  exports.default = todos;\n});\n\n//# sourceURL=webpack://TodoApp/./src/reducers/subscription.js?");

/***/ }),

/***/ "./src/reducers/todos.js":
/*!*******************************!*\
  !*** ./src/reducers/todos.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {\n  if (true) {\n    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports, __webpack_require__(/*! nymph-client */ \"nymph-client\"), __webpack_require__(/*! Todo */ \"Todo\")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?\n\t\t\t\t(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),\n\t\t\t\t__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));\n  } else { var mod; }\n})(this, function (exports, _nymphClient, _Todo) {\n  'use strict';\n\n  Object.defineProperty(exports, \"__esModule\", {\n    value: true\n  });\n\n  var _Todo2 = _interopRequireDefault(_Todo);\n\n  function _interopRequireDefault(obj) {\n    return obj && obj.__esModule ? obj : {\n      default: obj\n    };\n  }\n\n  var _extends = Object.assign || function (target) {\n    for (var i = 1; i < arguments.length; i++) {\n      var source = arguments[i];\n\n      for (var key in source) {\n        if (Object.prototype.hasOwnProperty.call(source, key)) {\n          target[key] = source[key];\n        }\n      }\n    }\n\n    return target;\n  };\n\n  var todos = function todos() {\n    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { todos: [], archived: false, sort: 'name' };\n    var action = arguments[1];\n\n    switch (action.type) {\n      case 'UPDATE_TODOS':\n        {\n          if (action.todos === undefined) {\n            return state;\n          }\n          var _todos = state.todos.slice();\n          var archived = action.archived;\n          _nymphClient.Nymph.updateArray(_todos, action.todos);\n          _nymphClient.Nymph.sort(_todos, state.sort);\n          return _extends({}, state, { todos: _todos, archived: archived });\n        }\n      case 'SET_SORT':\n        {\n          var _todos2 = state.todos.slice();\n          var sort = action.sort;\n          _nymphClient.Nymph.sort(_todos2, action.sort);\n          return _extends({}, state, { todos: _todos2, sort: sort });\n        }\n      case 'ADD_TODO':\n        {\n          var todo = new _Todo2.default();\n          todo.set('name', action.name);\n          todo.save();\n          return state;\n        }\n      case 'TOGGLE_TODO':\n        {\n          action.todo.set('done', !action.todo.get().done);\n          action.todo.save();\n\n          var _todos3 = state.todos.slice();\n          _todos3.splice(action.todo.arraySearch(_todos3), 1, action.todo);\n          return _extends({}, state, { todos: _todos3 });\n        }\n      case 'CHANGE_TODO':\n        {\n          action.todo.set('name', action.name);\n          action.todo.save();\n\n          var _todos4 = state.todos.slice();\n          _todos4.splice(action.todo.arraySearch(_todos4), 1, action.todo);\n          return _extends({}, state, { todos: _todos4 });\n        }\n      case 'ARCHIVE_DONE_TODOS':\n        {\n          var _loop = function _loop(i) {\n            var todo = state.todos[i];\n            if (todo.get().done) {\n              todo.archive().then(function (success) {\n                if (!success) {\n                  alert(\"Couldn't save changes to \" + todo.get().name);\n                }\n              }, function (errObj) {\n                alert(\"Error: \" + errObj.textStatus + \"\\nCouldn't archive \" + todo.get().name);\n              });\n            }\n          };\n\n          for (var i = 0; i < state.todos.length; i++) {\n            _loop(i);\n          }\n          return state;\n        }\n      case 'DELETE_TODOS':\n        {\n          _nymphClient.Nymph.deleteEntities(state.todos);\n          return state;\n        }\n      default:\n        return state;\n    }\n  };\n\n  exports.default = todos;\n});\n\n//# sourceURL=webpack://TodoApp/./src/reducers/todos.js?");

/***/ }),

/***/ "Todo":
/*!***********************!*\
  !*** external "Todo" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_Todo__;\n\n//# sourceURL=webpack://TodoApp/external_%22Todo%22?");

/***/ }),

/***/ "nymph-client":
/*!******************************!*\
  !*** external "NymphClient" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_nymph_client__;\n\n//# sourceURL=webpack://TodoApp/external_%22NymphClient%22?");

/***/ }),

/***/ "prop-types":
/*!****************************!*\
  !*** external "PropTypes" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_prop_types__;\n\n//# sourceURL=webpack://TodoApp/external_%22PropTypes%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react__;\n\n//# sourceURL=webpack://TodoApp/external_%22React%22?");

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react_dom__;\n\n//# sourceURL=webpack://TodoApp/external_%22ReactDOM%22?");

/***/ }),

/***/ "react-redux":
/*!*****************************!*\
  !*** external "ReactRedux" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_react_redux__;\n\n//# sourceURL=webpack://TodoApp/external_%22ReactRedux%22?");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "Redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = __WEBPACK_EXTERNAL_MODULE_redux__;\n\n//# sourceURL=webpack://TodoApp/external_%22Redux%22?");

/***/ })

/******/ });
});