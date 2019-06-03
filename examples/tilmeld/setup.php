<?php

error_reporting(E_ALL);

date_default_timezone_set('America/Los_Angeles');

require file_exists(__DIR__.'/../../../autoload-dev.php')
    ? __DIR__.'/../../../autoload-dev.php'
    : __DIR__.'/../../vendor/autoload.php';
require __DIR__.'/../config.php';

//
// This is how you enter the setup app.
//

$tilmeld = file_exists('../../../tilmeld-server/composer.json')
    ? '../../../tilmeld-server/'
    : '../../vendor/sciactive/tilmeld-server/'; // Where Tilmeld server is located.
if (file_exists('../../../client/package.json')) {
  $sciactiveDevClientURL = '../../../client/'; // Load the dev files when in dev.
}
$nodeModulesURL = '../../node_modules/'; // This is the URL of the SciActive libraries.
$restEndpoint = '../rest.php'; // This is the URL of the Nymph endpoint.
require $tilmeld.'setup/setup.php'; // And this will load the Tilmeld setup app.
