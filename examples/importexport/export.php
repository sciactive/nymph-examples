<?php

require file_exists(__DIR__.'/../../../autoload-dev.php')
    ? __DIR__.'/../../../autoload-dev.php'
    : __DIR__.'/../../vendor/autoload.php';
require __DIR__.'/../config-tilmeld.php';

// if (!\Tilmeld\Tilmeld::gatekeeper('system/admin')) {
//   // No import/export on production.
//   header('HTTP/1.1 403 Forbidden', true, 403);
//   echo "403 Forbidden";
//   exit;
// }

require '../employee/Employee.php';
require '../sudoku/Game.php';
require '../todo/Todo.php';

\Nymph\Nymph::exportPrint();
