<?php

error_reporting(E_ALL);

date_default_timezone_set('America/Los_Angeles');

require file_exists(__DIR__.'/../../../autoload-dev.php')
    ? __DIR__.'/../../../autoload-dev.php'
    : __DIR__.'/../../vendor/autoload.php';
require __DIR__.'/../config-tilmeld.php';

//
// This is how you enter the setup app.
//

$tilmeldURL = file_exists('../../../tilmeld/package.json')
    ? '../../../tilmeld/'
    : '../../node_modules/tilmeld/'; // This is the URL of the Tilmeld root.
$sciactiveBaseURL = '../../node_modules/'; // This is the URL of the SciActive libraries.
$restEndpoint = '../rest-tilmeld.php'; // This is the URL of the Nymph endpoint.
include file_exists('../../../tilmeld/package.json')
    ? '../../../tilmeld/setup/setup.php'
    : '../../vendor/sciactive/tilmeld/setup/setup.php'; // And this will load the Tilmeld setup app.
