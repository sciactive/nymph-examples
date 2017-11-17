<?php

require_once __DIR__.'/config.php';

// uMailPHP's configuration.
\uMailPHP\Mail::configure([
  'site_name' => 'Tilmeld Example Site',
  'site_link' => 'http://localhost:8080/examples/examples/tilmeld/components.php',
  'master_address' => 'noreply@example.com',
  'testing_mode' => true,
  'testing_email' => 'hperrin@localhost',
]);


// Tilmeld's configuration.
\Tilmeld\Tilmeld::configure([
  'setup_url' => 'http://localhost:8080/examples/examples/tilmeld/setup.php',
  'email_usernames' => true,
  'verify_redirect' => 'http://localhost:8080/examples/examples/tilmeld/components.php',
]);
