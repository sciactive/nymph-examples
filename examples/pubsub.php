<?php

error_reporting(E_ALL);

require file_exists(__DIR__.'/../../autoload-dev.php') ? __DIR__.'/../../autoload-dev.php' : __DIR__.'/../vendor/autoload.php';
require __DIR__.'/config.php';

date_default_timezone_set('America/Los_Angeles');

$config = [];
// If we're on Heroku, bind to the given port.
if (getenv('DATABASE_URL') && getenv('PORT')) {
	$config['port'] = (int) getenv('PORT');
}
$opts = getopt('p:e:r:');
// This lets us load multiple nymph-pubsub servers.
if (isset($opts['p'])) {
	$config['port'] = (int) $opts['p'];
}
if (isset($opts['e'])) {
	$config['entries'] = [];
	foreach (explode(',', $opts['e']) as $port) {
		$config['entries'][] = "ws://127.0.0.1:{$port}/";
	}
}
if (isset($opts['r'])) {
	$config['relays'] = [];
	foreach (explode(',', $opts['r']) as $port) {
		$config['relays'][] = "ws://127.0.0.1:{$port}/";
	}
}

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

$server = new \Nymph\PubSub\Server($config);
$server->run();
