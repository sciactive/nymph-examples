import { Nymph, Entity } from 'nymph-client';

export class Game extends Entity {
  constructor(id) {
    super(id);

    this.difficulty = 1;
    this.board = [[], [], [], [], [], [], [], [], []];
    this.time = 0;
    this.done = false;

    this.$mistakes = [[], [], [], [], [], [], [], [], []];
    this.$help = 1;
  }

  $generateBoard(...args) {
    return this.$serverCall('generateBoard', args);
  }

  $makeItFun(...args) {
    return this.$serverCall('makeItFun', args);
  }

  $checkDone() {
    this.done = false;
    for (let y in this.board) {
      for (let x in this.board[y]) {
        if (this.playBoard[y][x]) {
          continue;
        } else if (!this.board[y][x]) {
          return;
        } else if (
          this.$neighborsSquare(x, y)
            .concat(this.$neighborsY(x, y))
            .concat(this.$neighborsX(x, y))
            .indexOf(this.board[y][x]) !== -1
        ) {
          return;
        }
      }
    }
    this.done = true;
  }

  $calculateErrors() {
    this.$checkDone();
    if (this.done) {
      this.$mistakes = [[], [], [], [], [], [], [], [], []];
      return;
    }
    switch (this.$help) {
      case 1:
        // Oh, we got a badass over here.
        this.$mistakes = [[], [], [], [], [], [], [], [], []];
        break;
      case 2:
        // We need to mark every spot where the user made an obvious
        // mistake.
        for (let y in this.board) {
          for (let x in this.board[y]) {
            if (this.playBoard[y][x]) {
              this.$mistakes[y][x] = false;
            } else if (
              this.board[y][x] &&
              this.$neighborsSquare(x, y)
                .concat(this.$neighborsY(x, y))
                .concat(this.$neighborsX(x, y))
                .indexOf(Number(this.board[y][x])) !== -1
            ) {
              this.$mistakes[y][x] = true;
            } else {
              this.$mistakes[y][x] = false;
            }
          }
        }
        break;
      case 3:
        // We need to mark every spot the user differs from the
        // solved board.
        for (let y in this.board) {
          for (let x in this.board[y]) {
            if (this.playBoard[y][x]) {
              this.$mistakes[y][x] = false;
            } else if (
              this.board[y][x] &&
              this.board[y][x] !== this.solvedBoard[y][x]
            ) {
              this.$mistakes[y][x] = true;
            } else {
              this.$mistakes[y][x] = false;
            }
          }
        }
        break;
    }
  }

  $neighborsY(x, y) {
    const results = [];
    for (let y2 = 0; y2 <= 8; y2++) {
      if (y == y2) {
        continue;
      }
      if (this.board[y2][x]) {
        results.push(Number(this.board[y2][x]));
      }
    }
    return results;
  }

  $neighborsX(x, y) {
    const results = [];
    for (let x2 = 0; x2 <= 8; x2++) {
      if (x == x2) {
        continue;
      }
      if (this.board[y][x2]) {
        results.push(Number(this.board[y][x2]));
      }
    }
    return results;
  }

  $neighborsSquare(x, y) {
    const results = [];
    const minX = y - (y % 3);
    const minY = x - (x % 3);
    for (let y2 = minX; y2 <= minX + 2; y2++) {
      for (let x2 = minY; x2 <= minY + 2; x2++) {
        if (y2 == y && x2 == x) {
          continue;
        }
        if (this.board[y2][x2]) {
          results.push(Number(this.board[y2][x2]));
        }
      }
    }
    return results;
  }
}

// The name of the server class
Game.class = 'Game';

Nymph.setEntityClass(Game.class, Game);

export default Game;
