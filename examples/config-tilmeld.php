<?php

require_once __DIR__.'/config.php';

$site = 'http://localhost:8080';
if (getenv('NYMPH_PRODUCTION')) {
  $site = 'https://nymph-demo.herokuapp.com';
}

// uMailPHP's configuration.
\uMailPHP\Mail::configure([
  'site_name' => 'Tilmeld Example Site',
  'site_link' => "$site/examples/examples/tilmeld/components.php",
  'master_address' => 'noreply@example.com',
  'testing_mode' => true,
  'testing_email' => 'hperrin@localhost',
]);


// Tilmeld's configuration.
$tilmeldConfig = [
  'app_url' => "$site/",
  'setup_url' => "$site/examples/examples/tilmeld/setup.php",
  'email_usernames' => true,
  'verify_redirect' => "$site/examples/examples/tilmeld/components.php",
];
if (getenv('TILMELD_SECRET_FILE')) {
  $tilmeldConfig['jwt_secret'] = base64_decode(
      file_get_contents(getenv('TILMELD_SECRET_FILE'))
  );
} else {
  $tilmeldConfig['jwt_secret'] = str_repeat('a', 256);
}
\Tilmeld\Tilmeld::configure($tilmeldConfig);
