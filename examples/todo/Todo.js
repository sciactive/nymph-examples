(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['exports', 'nymph-client'], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require('nymph-client'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.nymphClient);
    global.Todo = mod.exports;
  }
})(this, function (exports, _nymphClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Todo = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var Todo = exports.Todo = function (_Entity) {
    _inherits(Todo, _Entity);

    // === Constructor ===

    function Todo(id) {
      _classCallCheck(this, Todo);

      var _this = _possibleConstructorReturn(this, (Todo.__proto__ || Object.getPrototypeOf(Todo)).call(this, id));

      _this.data.done = false;
      return _this;
    }

    // === Instance Methods ===

    _createClass(Todo, [{
      key: 'archive',
      value: function archive() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.serverCall('archive', args);
      }
    }]);

    return Todo;
  }(_nymphClient.Entity);

  // === Static Properties ===

  Todo.etype = 'todo';
  // The name of the server class
  Todo.class = 'Todo';

  _nymphClient.Nymph.setEntityClass(Todo.class, Todo);

  exports.default = Todo;
});
