<?php

if ($_REQUEST['action'] === 'export' && !getenv('DATABASE_URL')) {
	// No import/export on Heroku.
	require dirname(__DIR__).'/../vendor/autoload.php';
	\SciActive\R::_('NymphConfig', [], function(){
		return include '../config.php';
	});

	require 'Game.php';

	\Nymph\Nymph::exportPrint();
	exit;
}

?>
<!DOCTYPE html>
<html>
	<head>
		<title>Nymph Sudoku</title>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<script type="text/javascript">
			(function(){
				var s = document.createElement("script"); s.setAttribute("src", "https://www.promisejs.org/polyfills/promise-5.0.0.min.js");
				(typeof Promise !== "undefined" && typeof Promise.all === "function") || document.getElementsByTagName('head')[0].appendChild(s);
			})();
			NymphOptions = {
				restURL: '../rest.php'
			};
			NymphOptions = {
				restURL: '../rest.php',
				pubsubURL: 'ws://<?php echo getenv('DATABASE_URL') ? htmlspecialchars('nymph-pubsub-demo.herokuapp.com') : htmlspecialchars($_SERVER['HTTP_HOST']); ?>:<?php echo getenv('DATABASE_URL') ? '80' : '8080'; ?>',
				rateLimit: 100
			};
			isHeroku = <?php echo json_encode(!!getenv('DATABASE_URL')); ?>; // No import/export on Heroku.
		</script>
		<style type="text/css">
			#userCount {
				position: fixed;
				right: 5px;
				bottom: 5px;
			}
		</style>
		<script src="../../bower_components/nymph-client/src/Nymph.js"></script>
		<script src="../../bower_components/nymph-client/src/Entity.js"></script>
		<script src="../../bower_components/nymph-client/src/NymphPubSub.js"></script>
		<script src="Game.js"></script>

		<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.3.2/angular.min.js"></script>
		<script src="sudoku.js"></script>

		<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet">
		<link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css">
		<link rel="stylesheet" href="sudoku.css">
	</head>
	<body ng-app="sudokuApp">
		<div class="container" ng-controller="SudokuController">
			<div class="page-header">
				<h1>Nymph Sudoku <small>by Hunter Perrin</small></h1>
			</div>
			<div ng-if="!curGame && !uiState.loading" class="row">
				<form class="col-sm-6" ng-submit="startNewGame($scope)">
					<div>
						<h3>Start a New Game</h3>
						<div class="controls cf">
							<label>
								<span>Who's playing?</span>
								<input class="control form-control" type="text" ng-model="uiState.player" size="30" placeholder="player name" />
							</label>
						</div>
						<div class="controls cf">
							<span>How tough are you?</span>
							<div class="control">
								<label>
									<input type="radio" name="difficulty" ng-model="uiState.difficulty" ng-value="1" /> Like a glass horse figurine.
								</label><br>
								<label>
									<input type="radio" name="difficulty" ng-model="uiState.difficulty" ng-value="2" /> I can walk on hot road with bare feet.
								</label><br>
								<label>
									<input type="radio" name="difficulty" ng-model="uiState.difficulty" ng-value="3" /> I eat cactus with the spines.
								</label>
							</div>
						</div>
						<div ng-show="uiState.player" class="controls cf">
							<div>{{uiState.player}} wants {{[0, 'an easy', 'a moderate', 'a hard'][uiState.difficulty]}} game.</div>
							<button type="submit" class="btn btn-primary btn-lg">Bring it On!</button>
						</div>
					</div>
				</form>
				<div class="col-sm-6">
					<div>
						<h3>Saved Games</h3>
						<p ng-if="!isHeroku()">
							<a href="import.php">Import Saved Games</a>
							<span ng-if="uiState.games.length">
								| <a href="?action=export">Export Saved Games</a>
							</span>
						</p>
						<p ng-if="!uiState.games.length">
							<span>There are no saved games.</span>
						</p>
						<p ng-show="uiState.games.length > 1">
							Sort: <br>
							<label style="font-weight: normal;">
								<input type="radio" ng-model="uiState.sort" ng-change="sortGames()" name="sort" value="cdate"> Started</label>
							&nbsp;&nbsp;&nbsp;
							<label style="font-weight: normal;">
								<input type="radio" ng-model="uiState.sort" ng-change="sortGames()" name="sort" value="name"> Alpha</label>
						</p>
						<div ng-if="uiState.games.length" ng-repeat="game in uiState.games" class="alert alert-{{game.data.done ? 'success' : 'info'}} cf">
							<p style="margin-bottom: 10px;">
								<span>{{game.data.name}} at {{printDate(game.cdate)}}</span>
								<span>({{calcTime(game.data.time)}} on {{[0, 'easy', 'medium', 'hard'][game.data.difficulty]}})</span>
							</p>
							<div class="cf">
								<button type="button" class="btn btn-primary pull-left" ng-click="loadGame(game)">{{game.data.done ? 'See it Again' : 'Continue'}}</button>
								<button type="button" class="btn btn-danger pull-right" ng-click="deleteGame(game)">Delete</button>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div ng-if="uiState.loading" class="loading">
				<i class="fa fa-spin fa-spinner"></i>
				<div>{{uiState.loading}}</div>
			</div>
			<div ng-if="curGame" class="row game-play">
				<div ng-show="saving" class="saving">
					<i class="fa fa-spin fa-spinner"></i> Saving
				</div>
				<div class="col-sm-6">
					<div>
						<h3>Game Player: {{curGame.data.name}}</h3>
						<div class="game-board">
							<div class="row" ng-repeat="(y, row) in curGame.data.board track by $index">
								<div class="square square-{{curGame.data.playBoard[y][x] ? 'preset' : 'open'}}" ng-repeat="(x, square) in row track by $index">
									<div class="dummy"></div>
									<div class="value" ng-if="curGame.data.playBoard[y][x]">
										{{square}}
									</div>
									<input class="value" type="number" ng-class="{mistake: curGame.mistakes[y][x]}" ng-if="!curGame.data.playBoard[y][x]" ng-model="curGame.data.board[y][x]" ng-pattern="/^[1-9]$/" ng-change="curGame.calculateErrors(); saveState()" />
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="game-options col-sm-6">
					<div>
						<h3>Options and Help</h3>
						<div class="controls cf">
							<button type="button" class="btn btn-default btn-sm" ng-click="curGame.data.board = curGame.data.playBoard; curGame.calculateErrors(); startTimer(); saveState()">Gah! Let me start over.</button>
							<!--<button type="button" class="btn btn-default btn-sm" ng-click="curGame.hint()">I could really use a hint here.</button>-->
							<button type="button" class="btn btn-default btn-sm" ng-click="curGame.data.board = curGame.data.solvedBoard; curGame.calculateErrors(); saveState()">Just solve the damn thing!</button>
						</div>
						<div class="controls cf" ng-show="!curGame.data.done">
							<span>You want some help?</span>
							<div class="control">
								<label>
									<input type="radio" name="help" ng-model="curGame.help" ng-value="1" ng-change="curGame.calculateErrors()" /> No way, I totally got this.
								</label><br>
								<label>
									<input type="radio" name="help" ng-model="curGame.help" ng-value="2" ng-change="curGame.calculateErrors()" /> Sure, just tell me if I make an obvious mistake.
								</label><br>
								<label>
									<input type="radio" name="help" ng-model="curGame.help" ng-value="3" ng-change="curGame.calculateErrors()" /> I'm so lost, tell me if I play anything that's wrong.
								</label>
							</div>
						</div>
						<div class="controls cf">
							<span>Time you've wasted on this:</span>
							<div class="control">{{uiState.timeDiff}}</div>
						</div>
						<div class="controls cf">
							<span>People playing this game (including you):</span>
							<div class="control">{{uiState.gameUserCount}}</div>
						</div>
						<div class="controls cf">
							<button type="button" class="btn btn-primary" ng-click="clearGame()">{{curGame.data.done ? 'Who\'s The Man' : 'I need a break.'}}</button>
						</div>
					</div>
				</div>
			</div>
			<div id="userCount" class="label label-default">
				Active Users: {{uiState.userCount}}
			</div>
		</div>
	</body>
</html>
