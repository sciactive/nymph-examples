<?php

require dirname(__DIR__).'/vendor/autoload.php';

\SciActive\R::_('NymphConfig', [], function(){
	return include __DIR__.'/config.php';
});
\SciActive\R::_('NymphPubSubConfig', [], function(){
	return include dirname(__DIR__).'/vendor/sciactive/nymph-pubsub/conf/defaults.php';
});

\Nymph\Nymph::connect();

require 'employee/Employee.php';
require 'todo/Todo.php';
require 'sudoku/Game.php';

if (in_array('-d', $argv)) {
	// Switch over to daemon mode.
	if ($pid = pcntl_fork()) {
		return;
	}
} else {
	error_reporting(E_ALL);
}

$server = new \Nymph\PubSub\Server();
$server->run();
