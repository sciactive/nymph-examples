(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports", "Nymph", "NymphEntity"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports, require("Nymph"), require("NymphEntity"));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports, global.Nymph, global.NymphEntity);
    global.Game = mod.exports;
  }
})(this, function (exports, _Nymph, _NymphEntity) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.Game = undefined;

  var _Nymph2 = _interopRequireDefault(_Nymph);

  var _NymphEntity2 = _interopRequireDefault(_NymphEntity);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

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

  var Game = function (_Entity) {
    _inherits(Game, _Entity);

    // === Constructor ===

    // === Instance Properties ===

    // === Static Properties ===

    function Game(id) {
      _classCallCheck(this, Game);

      var _this = _possibleConstructorReturn(this, (Game.__proto__ || Object.getPrototypeOf(Game)).call(this, id));

      _this.mistakes = [[], [], [], [], [], [], [], [], []];
      _this.help = 1;

      _this.data.difficulty = 1;
      _this.data.board = [[], [], [], [], [], [], [], [], []];
      _this.data.time = 0;
      _this.data.done = false;
      return _this;
    }

    // === Instance Methods ===

    // The name of the server class


    _createClass(Game, [{
      key: "generateBoard",
      value: function generateBoard() {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return this.serverCall('generateBoard', args);
      }
    }, {
      key: "makeItFun",
      value: function makeItFun() {
        for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }

        return this.serverCall('makeItFun', args);
      }
    }, {
      key: "checkDone",
      value: function checkDone() {
        this.data.done = false;
        for (var y in this.data.board) {
          for (var x in this.data.board[y]) {
            if (this.data.playBoard[y][x]) continue;else if (!this.data.board[y][x]) return;else if (this.neighborsSquare(x, y).concat(this.neighborsY(x, y)).concat(this.neighborsX(x, y)).indexOf(this.data.board[y][x]) !== -1) return;
          }
        }
        this.data.done = true;
      }
    }, {
      key: "calculateErrors",
      value: function calculateErrors() {
        this.checkDone();
        if (this.data.done) {
          this.mistakes = [[], [], [], [], [], [], [], [], []];
          return;
        }
        switch (this.help) {
          case 1:
            // Oh, we got a badass over here.
            this.mistakes = [[], [], [], [], [], [], [], [], []];
            break;
          case 2:
            // We need to mark every spot where the user made an obvious
            // mistake.
            for (var y in this.data.board) {
              for (var x in this.data.board[y]) {
                if (this.data.playBoard[y][x]) this.mistakes[y][x] = false;else if (this.data.board[y][x] && this.neighborsSquare(x, y).concat(this.neighborsY(x, y)).concat(this.neighborsX(x, y)).indexOf(Number(this.data.board[y][x])) !== -1) this.mistakes[y][x] = true;else {
                  this.mistakes[y][x] = false;
                }
              }
            }
            break;
          case 3:
            // We need to mark every spot the user differs from the
            // solved board.
            for (var y in this.data.board) {
              for (var x in this.data.board[y]) {
                if (this.data.playBoard[y][x]) this.mistakes[y][x] = false;else if (this.data.board[y][x] && this.data.board[y][x] !== this.data.solvedBoard[y][x]) this.mistakes[y][x] = true;else this.mistakes[y][x] = false;
              }
            }
            break;
        }
      }
    }, {
      key: "neighborsY",
      value: function neighborsY(x, y) {
        var results = [];
        for (var y2 = 0; y2 <= 8; y2++) {
          if (y == y2) continue;
          if (this.data.board[y2][x]) results.push(Number(this.data.board[y2][x]));
        }
        return results;
      }
    }, {
      key: "neighborsX",
      value: function neighborsX(x, y) {
        var results = [];
        for (var x2 = 0; x2 <= 8; x2++) {
          if (x == x2) continue;
          if (this.data.board[y][x2]) results.push(Number(this.data.board[y][x2]));
        }
        return results;
      }
    }, {
      key: "neighborsSquare",
      value: function neighborsSquare(x, y) {
        var results = [];
        var minX = y - y % 3;
        var minY = x - x % 3;
        for (var y2 = minX; y2 <= minX + 2; y2++) {
          for (var x2 = minY; x2 <= minY + 2; x2++) {
            if (y2 == y && x2 == x) continue;
            if (this.data.board[y2][x2]) results.push(Number(this.data.board[y2][x2]));
          }
        }
        return results;
      }
    }]);

    return Game;
  }(_NymphEntity2.default);

  Game.etype = "game";
  Game.class = "Game";
  exports.default = Game;


  _Nymph2.default.setEntityClass(Game.class, Game);
  exports.Game = Game;
});
