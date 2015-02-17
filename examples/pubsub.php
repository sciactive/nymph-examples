<?php

error_reporting(E_ALL);

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

include dirname(__DIR__).'/vendor/sciactive/nymph-pubsub/src/run.php';