angular
  .module('sudokuApp', [])
  .service('Nymph', function() {
    return window['nymph-client'].Nymph;
  })
  .service('PubSub', function() {
    return window['nymph-client'].PubSub;
  })
  .service('Game', function() {
    return Game.default;
  })
  .controller('SudokuController', [
    '$scope',
    '$interval',
    'Nymph',
    'PubSub',
    'Game',
    function($scope, $interval, Nymph, PubSub, Game) {
      $scope.uiState = {
        player: '',
        difficulty: 1,
        loading: false,
        sort: 'cdate',
        games: [],
        timeDiff: '',
        userCount: null,
        gameUserCount: null,
      };
      $scope.curGame = null;
      var subscription,
        subscriptionFunction = function() {
          if (!$scope.curGame.guid) {
            if (
              confirm('Someone deleted your game! Do you want to restore it?')
            ) {
              $scope.curGame.$save();
            } else {
              $scope.clearGame();
            }
            return;
          }
          $scope.curGame.$calculateErrors();
          $scope.$apply();
        };

      $scope.calcTime = function(time) {
        var hours = Math.floor(time / 3600);
        var minutes = Math.floor((time % 3600) / 60);
        var seconds = time % 60;
        return hours
          ? hours +
              ':' +
              (minutes > 9 ? minutes : '0' + minutes) +
              ':' +
              (seconds > 9 ? seconds : '0' + seconds)
          : minutes
          ? minutes + ':' + (seconds > 9 ? seconds : '0' + seconds)
          : seconds;
      };
      $scope.printDate = function(time) {
        return new Date(time * 1000).toLocaleString();
      };

      Nymph.getEntities({ class: 'Game' }).subscribe(
        function(games) {
          PubSub.updateArray($scope.uiState.games, games);
          Nymph.sort(
            $scope.uiState.games,
            $scope.uiState.sort,
            /* caseSensitive */ false,
            /* reverse */ true,
          );
          $scope.$apply();
        },
        null,
        function(count) {
          $scope.uiState.userCount = count;
          $scope.$apply();
        },
      );

      $scope.startNewGame = function() {
        if (
          typeof $scope.uiState.player === 'undefined' ||
          $scope.uiState.player === ''
        )
          return;
        if ([1, 2, 3].indexOf($scope.uiState.difficulty) === -1) return;
        var game = new Game();
        game.name = $scope.uiState.player;
        game.difficulty = $scope.uiState.difficulty;
        $scope.uiState.loading = 'Generating a new game board...';
        game.$generateBoard().then(
          function() {
            $scope.uiState.loading = 'Applying the difficulty level...';
            $scope.$apply();
            game.$makeItFun().then(
              function() {
                $scope.uiState.loading = 'Loading the new game...';
                $scope.$apply();
                game.$save().then(
                  function(game) {
                    if (subscription) {
                      subscription.unsubscribe();
                    }
                    subscription = game.$subscribe(
                      subscriptionFunction,
                      null,
                      function(count) {
                        $scope.uiState.gameUserCount = count;
                        $scope.$apply();
                      },
                    );
                    $scope.uiState.player = '';
                    $scope.uiState.difficulty = 1;
                    $scope.curGame = game;
                    $scope.startTimer();
                    $scope.uiState.loading = false;
                    $scope.$apply();
                  },
                  function(errObj) {
                    $scope.uiState.loading = false;
                    $scope.$apply();
                    alert('Error: ' + errObj.textStatus);
                  },
                );
              },
              function(errObj) {
                $scope.uiState.loading = false;
                $scope.$apply();
                alert('Error: ' + errObj.textStatus);
              },
            );
          },
          function(errObj) {
            $scope.uiState.loading = false;
            $scope.$apply();
            alert('Error: ' + errObj.textStatus);
          },
        );
      };

      $scope.sortGames = function() {
        $scope.uiState.games = Nymph.sort(
          $scope.uiState.games,
          $scope.uiState.sort,
        );
      };

      $scope.saveState = function(showErr) {
        $scope.saving = true;
        $scope.curGame.$patch().then(
          function() {
            $scope.saving = false;
            $scope.$apply();
          },
          function(errObj) {
            $scope.saving = false;
            $scope.$apply();
            if (showErr) {
              alert('Error: ' + errObj.textStatus);
            }
          },
        );
      };

      $scope.loadGame = function(game) {
        if (subscription) {
          subscription.unsubscribe();
        }
        subscription = game.$subscribe(subscriptionFunction, null, function(
          count,
        ) {
          $scope.uiState.gameUserCount = count;
          $scope.$apply();
        });
        $scope.curGame = game;
        $scope.startTimer();
      };

      $scope.clearGame = function() {
        subscription.unsubscribe();
        subscription = null;
        if ($scope.curGame.guid) {
          $scope.saveState(true);
        }
        $scope.curGame = null;
        $scope.stopTimer();
      };

      $scope.deleteGame = function(game) {
        if (!confirm('Are you sure?')) {
          return;
        }
        var key = game.$arraySearch($scope.uiState.games);
        game.$delete().then(
          function() {
            if (key !== false) {
              $scope.uiState.games.splice(key, 1);
            }
            $scope.$apply();
          },
          function(errObj) {
            alert('Error: ' + errObj.textStatus);
          },
        );
      };

      var gameTimer;
      $scope.startTimer = function() {
        $scope.uiState.timeDiff = $scope.calcTime($scope.curGame.time);
        if (angular.isDefined(gameTimer)) {
          $interval.cancel(gameTimer);
        }
        gameTimer = $interval(function() {
          if ($scope.curGame.done) {
            $scope.stopTimer();
            return;
          }
          $scope.curGame.time = $scope.curGame.time + 1;
          $scope.uiState.timeDiff = $scope.calcTime($scope.curGame.time);
          // Don't save too often.
          if ($scope.curGame.time % 10 === 0) {
            // This causes a race condition without the count check. How do I fix it??
            $scope.curGame.$patch();
          }
        }, 1000);
      };
      $scope.stopTimer = function() {
        $interval.cancel(gameTimer);
      };
    },
  ]);
