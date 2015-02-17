<?php

error_reporting(E_ALL);

require dirname(__DIR__).'/vendor/autoload.php';

\SciActive\R::_('NymphConfig', [], function(){
	return include __DIR__.'/config.php';
});
\SciActive\R::_('NymphPubSubConfig', [], function(){
	return include dirname(__DIR__).'/vendor/sciactive/nymph-pubsub/conf/defaults.php';
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