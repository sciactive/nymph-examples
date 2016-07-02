<?php

error_reporting(E_ALL);

require file_exists(__DIR__.'/../../autoload-dev.php') ? __DIR__.'/../../autoload-dev.php' : __DIR__.'/../vendor/autoload.php';
require __DIR__.'/config.php';

// If we're on Heroku, the entry is the pubsub demo.
if (getenv('DATABASE_URL')) {
  \Nymph\PubSub\Server::configure(['entries' => ['ws://nymph-pubsub-demo.herokuapp.com:80/']]);
}

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