import Nymph from "Nymph";
import Entity from "NymphEntity";

export default class Game extends Entity {

  // === Static Properties ===

  static etype = "game";
  // The name of the server class
  static class = "Game";

  // === Instance Properties ===

  mistakes = [
    [], [], [], [], [], [], [], [], []
  ];
  help = 1;

  // === Constructor ===

  constructor(id) {
    super(id);
    this.data.difficulty = 1;
    this.data.board = [
      [], [], [], [], [], [], [], [], []
    ];
    this.data.time = 0;
    this.data.done = false;
  }

  // === Instance Methods ===

  generateBoard(...args) {
    return this.serverCall('generateBoard', args);
  }

  makeItFun(...args) {
    return this.serverCall('makeItFun', args);
  }

  checkDone() {
    this.data.done = false;
    for (var y in this.data.board) {
      for (var x in this.data.board[y]) {
        if (this.data.playBoard[y][x])
          continue;
        else if (!this.data.board[y][x])
          return;
        else if (this.neighborsSquare(x, y).concat(this.neighborsY(x, y)).concat(this.neighborsX(x, y)).indexOf(this.data.board[y][x]) !== -1)
          return;
      }
    }
    this.data.done = true;
  }

  calculateErrors() {
    this.checkDone();
    if (this.data.done) {
      this.mistakes = [
        [], [], [], [], [], [], [], [], []
      ];
      return;
    }
    switch (this.help) {
      case 1:
        // Oh, we got a badass over here.
        this.mistakes = [
          [], [], [], [], [], [], [], [], []
        ];
        break;
      case 2:
        // We need to mark every spot where the user made an obvious
        // mistake.
        for (var y in this.data.board) {
          for (var x in this.data.board[y]) {
            if (this.data.playBoard[y][x])
              this.mistakes[y][x] = false;
            else if (this.data.board[y][x] && this.neighborsSquare(x, y).concat(this.neighborsY(x, y)).concat(this.neighborsX(x, y)).indexOf(Number(this.data.board[y][x])) !== -1)
              this.mistakes[y][x] = true;
            else {
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
            if (this.data.playBoard[y][x])
              this.mistakes[y][x] = false;
            else if (this.data.board[y][x] && this.data.board[y][x] !== this.data.solvedBoard[y][x])
              this.mistakes[y][x] = true;
            else
              this.mistakes[y][x] = false;
          }
        }
        break;
    }
  }

  neighborsY(x, y) {
    var results = [];
    for (var y2 = 0; y2 <= 8; y2++) {
      if (y == y2)
        continue;
      if (this.data.board[y2][x])
        results.push(Number(this.data.board[y2][x]));
    }
    return results;
  }

  neighborsX(x, y) {
    var results = [];
    for (var x2 = 0; x2 <= 8; x2++) {
      if (x == x2)
        continue;
      if (this.data.board[y][x2])
        results.push(Number(this.data.board[y][x2]));
    }
    return results;
  }

  neighborsSquare(x, y) {
    var results = [];
    var minX = y - (y % 3);
    var minY = x - (x % 3);
    for (var y2 = minX; y2 <= minX+2; y2++) {
      for (var x2 = minY; x2 <= minY+2; x2++) {
        if (y2 == y && x2 == x)
          continue;
        if (this.data.board[y2][x2])
          results.push(Number(this.data.board[y2][x2]));
      }
    }
    return results;
  }
}

Nymph.setEntityClass(Game.class, Game);
export {Game};
