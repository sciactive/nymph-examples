<?php

// Nymph's configuration.
$nymphConfig = [];
// Check for production postgres var.
if (getenv('NYMPH_PRODUCTION')) {
  $dbopts = parse_url(getenv('DATABASE_URL'));
  $nymphConfig['driver'] = 'PostgreSQL';
  $nymphConfig['PostgreSQL'] = [
    'database' => ltrim($dbopts["path"], '/'),
    'host' => $dbopts["host"],
    'port' => $dbopts["port"],
    'user' => $dbopts["user"],
    'password' => $dbopts["pass"]
  ];
} elseif (getenv('MYSQL_HOST')) {
  $nymphConfig['MySQL'] = [
    'host' => getenv('MYSQL_HOST'),
    'database' => getenv('MYSQL_DATABASE'),
    'user' => getenv('MYSQL_USER'),
    'password' => getenv('MYSQL_PASSWORD')
  ];
} elseif (getenv('PGSQL_HOST')) {
  $nymphConfig['driver'] = 'PostgreSQL';
  $nymphConfig['PostgreSQL'] = [
    'host' => getenv('PGSQL_HOST'),
    'port' => getenv('PGSQL_PORT'),
    'database' => getenv('PGSQL_DATABASE'),
    'user' => getenv('PGSQL_USER'),
    'password' => getenv('PGSQL_PASSWORD')
  ];
} else {
  if (getenv('DB') === 'pgsql') {
    $nymphConfig['driver'] = 'PostgreSQL';
    $nymphConfig['PostgreSQL'] = [
      'host' => '127.0.0.1',
      'database' => 'nymph_example',
      'user' => 'nymph_example',
      'password' => 'omgomg'
    ];
  } else {
    $nymphConfig['MySQL'] = [
      'host' => '127.0.0.1',
      'database' => 'nymph_example',
      'user' => 'nymph_example',
      'password' => 'omgomg'
    ];
  }
}
\Nymph\Nymph::configure($nymphConfig);


// Nymph PubSub's configuration.
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

$appUrl = 'http://localhost:8080';
if (getenv('NYMPH_PRODUCTION')) {
  $appUrl = 'https://nymph-demo.herokuapp.com';
}

// uMailPHP's configuration.
\uMailPHP\Mail::configure([
  'site_name' => 'Tilmeld Example Site',
  'site_link' => "$appUrl/examples/examples/tilmeld/components.php",
  'master_address' => 'noreply@example.com',
  'testing_mode' => true,
  'testing_email' => 'hperrin@localhost',
]);


// Tilmeld's configuration.
$tilmeldConfig = [
  'app_url' => "$appUrl/",
  'setup_url' => "$appUrl/examples/examples/tilmeld/setup.php",
  'email_usernames' => true,
  'verify_redirect' => "$appUrl/examples/examples/tilmeld/components.php",
];
if (getenv('TILMELD_SECRET')) {
  $tilmeldConfig['jwt_secret'] = base64_decode(getenv('TILMELD_SECRET'));
} elseif (getenv('TILMELD_SECRET_FILE')) {
  $tilmeldConfig['jwt_secret'] = base64_decode(
      file_get_contents(getenv('TILMELD_SECRET_FILE'))
  );
} else {
  $tilmeldConfig['jwt_secret'] = str_repeat('a', 256);
}
\Tilmeld\Tilmeld::configure($tilmeldConfig);
