<?php

if (getenv('DATABASE_URL')) {
  // No import/export on Heroku.
  header('HTTP/1.1 403 Forbidden', true, 403);
  echo "403 Forbidden";
  exit;
}

require file_exists(__DIR__.'/../../../autoload-dev.php') ? __DIR__.'/../../../autoload-dev.php' : __DIR__.'/../../vendor/autoload.php';
require __DIR__.'/../config.php';

require '../employee/Employee.php';
require '../sudoku/Game.php';
require '../todo/Todo.php';

\Nymph\Nymph::exportPrint();
