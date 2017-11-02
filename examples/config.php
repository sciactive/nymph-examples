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
