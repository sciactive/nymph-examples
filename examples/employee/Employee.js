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
    global.Employee = mod.exports;
  }
})(this, function (exports, _nymphClient) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Employee = undefined;

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

  var Employee = exports.Employee = function (_Entity) {
    _inherits(Employee, _Entity);

    // === Constructor ===

    function Employee(id) {
      _classCallCheck(this, Employee);

      var _this = _possibleConstructorReturn(this, (Employee.__proto__ || Object.getPrototypeOf(Employee)).call(this, id));

      _this.addTag('employee');
      _this.data.current = true;
      _this.data.subordinates = [];
      return _this;
    }

    // === Static Methods ===

    _createClass(Employee, [{
      key: 'throwError',


      // === Instance Methods ===

      value: function throwError() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.serverCall('throwError', args);
      }
    }], [{
      key: 'testStatic',
      value: function testStatic(value) {
        for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
          args[_key2 - 1] = arguments[_key2];
        }

        return Employee.serverCallStatic('testStatic', [value].concat(args));
      }
    }, {
      key: 'throwErrorStatic',
      value: function throwErrorStatic() {
        for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          args[_key3] = arguments[_key3];
        }

        return Employee.serverCallStatic('throwErrorStatic', args);
      }
    }, {
      key: 'inaccessibleMethod',
      value: function inaccessibleMethod() {
        for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
          args[_key4] = arguments[_key4];
        }

        return Employee.serverCallStatic('inaccessibleMethod', args);
      }
    }]);

    return Employee;
  }(_nymphClient.Entity);

  // === Static Properties ===

  Employee.etype = "employee";
  // The name of the server class
  Employee.class = "Employee";

  _nymphClient.Nymph.setEntityClass(Employee.class, Employee);
  exports.default = Employee;
});
