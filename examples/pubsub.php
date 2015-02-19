<?php

require dirname(__DIR__).'/vendor/autoload.php';

\SciActive\RequirePHP::_('NymphConfig', [], function(){
	return include __DIR__.'/config.php';
});
\SciActive\RequirePHP::_('NymphPubSubConfig', [], function(){
	$config = include dirname(__DIR__).'/vendor/sciactive/nymph-pubsub/conf/defaults.php';
	// If we're on Heroku, bind to the given port.
	if (getenv('DATABASE_URL')) {
		$config->port['value'] = (int) getenv('PORT');
	}
	return $config;
});

\Nymph\Nymph::connect();

require 'employee/Employee.php';
require 'todo/Todo.php';
require 'sudoku/Game.php';

if (in_array('-d', $argv)) {
	function shutdown() {
		posix_kill(posix_getpid(), SIGHUP);
	}

	// Switch over to daemon mode.
	if ($pid = pcntl_fork()) {
		return;
	}

	register_shutdown_function('shutdown');
} else {
	error_reporting(E_ALL);
}

$server = new \Nymph\PubSub\Server();
$server->run();
