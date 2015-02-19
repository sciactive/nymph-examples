<?php

if (getenv('DATABASE_URL')) {
	// No import/export on Heroku.
	header('HTTP/1.1 403 Forbidden', true, 403);
	echo "403 Forbidden";
	exit;
}

require dirname(__DIR__).'/../vendor/autoload.php';
\SciActive\RequirePHP::_('NymphConfig', [], function(){
	return include '../config.php';
});

require '../employee/Employee.php';
require '../sudoku/Game.php';
require '../todo/Todo.php';

\Nymph\Nymph::exportPrint();
