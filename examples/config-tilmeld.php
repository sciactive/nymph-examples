<?php

require __DIR__.'/config.php';

// uMailPHP's configuration.
\uMailPHP\Mail::configure([
  'site_name' => 'Tilmeld Example Site',
  'site_link' => 'http://localhost/tilmeld/',
  'master_address' => 'someone@example.com',
  'testing_mode' => true,
  'testing_email' => 'hperrin@localhost',
]);


// Tilmeld's configuration.
\Tilmeld\Tilmeld::configure([
  'email_usernames' => true
]);
