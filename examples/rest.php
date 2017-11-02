<?php

error_reporting(E_ALL);

require file_exists(__DIR__.'/../../autoload-dev.php')
    ? __DIR__.'/../../autoload-dev.php'
    : __DIR__.'/../vendor/autoload.php';
require __DIR__.'/config.php';

if (getenv('NYMPH_PRODUCTION')) {
  // If we're on Heroku, the entry is the pubsub demo.
  $entry = 'wss://nymph-pubsub-demo.herokuapp.com:443/';
} elseif (getenv('PUBSUB_HOST')) {
  // If we're in Docker, the entry is provided by Docker.
  $entry = 'ws://'.getenv('PUBSUB_HOST').'/';
} else {
  // If we're not in either, it's probaby on the same host.
  $entry = 'ws://localhost:8081/';
}

\Nymph\PubSub\Server::configure(['entries' => [$entry]]);

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
