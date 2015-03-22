<?php

error_reporting(E_ALL);

require file_exists(dirname(dirname(__DIR__)).'/autoload-dev.php') ? dirname(dirname(__DIR__)).'/autoload-dev.php' : dirname(__DIR__).'/vendor/autoload.php';

\SciActive\RequirePHP::_('NymphConfig', [], function(){
	return include __DIR__.'/config.php';
});
\SciActive\RequirePHP::_('NymphPubSubConfig', [], function(){
	$config = include file_exists(dirname(dirname(__DIR__)).'/pubsub/conf/defaults.php') ? dirname(dirname(__DIR__)).'/pubsub/conf/defaults.php' : dirname(__DIR__).'/vendor/sciactive/nymph-pubsub/conf/defaults.php';
	// If we're on Heroku, the entry is the pubsub demo.
	if (getenv('DATABASE_URL')) {
		$config->entries['value'] = ['ws://nymph-pubsub-demo.herokuapp.com:80/'];
	}
	return $config;
});

$NymphREST = new \Nymph\REST();

require 'employee/Employee.php';
require 'todo/Todo.php';
require 'sudoku/Game.php';

try {
	if (in_array($_SERVER['REQUEST_METHOD'], ['PUT', 'DELETE'])) {
		parse_str(file_get_contents("php://input"), $args);
		$NymphREST->run($_SERVER['REQUEST_METHOD'], $args['action'], $args['data']);
	} else {
		$NymphREST->run($_SERVER['REQUEST_METHOD'], $_REQUEST['action'], $_REQUEST['data']);
	}
} catch (\Nymph\Exceptions\QueryFailedException $e) {
	echo $e->getMessage()."\n\n".$e->getQuery();
}