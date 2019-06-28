<?php

error_reporting(E_ALL);

date_default_timezone_set('America/Los_Angeles');

require_once file_exists(__DIR__.'/../../autoload-dev.php')
? __DIR__.'/../../autoload-dev.php'
: __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/config.php';

$NymphREST = new \Nymph\REST();

require_once 'test/Employee.php';
require_once 'todo/Todo.php';
require_once 'sudoku/Game.php';

try {
  $NymphREST->respond();
} catch (\Nymph\Exceptions\QueryFailedException $e) {
  echo $e->getMessage()."\n\n".$e->getQuery();
}
