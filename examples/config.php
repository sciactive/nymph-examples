<?php

// Nymph's configuration.

$nymphConfig = [];

// Check for Heroku postgres var.
if (getenv('DATABASE_URL')) {
  $dbopts = parse_url(getenv('DATABASE_URL'));
  $nymphConfig['driver'] = 'PostgreSQL';
  $nymphConfig['PostgreSQL'] = [
    'database' => ltrim($dbopts["path"], '/'),
    'host' => $dbopts["host"],
    'port' => $dbopts["port"],
    'user' => $dbopts["user"],
    'password' => $dbopts["pass"]
  ];
} else {
  if (true) {
    $nymphConfig['MySQL'] = [
      'host' => '127.0.0.1',
      'database' => 'nymph_example',
      'user' => 'nymph_example',
      'password' => 'omgomg'
    ];
  } else {
    $nymphConfig['driver'] = 'PostgreSQL';
    $nymphConfig['PostgreSQL'] = [
      'host' => '127.0.0.1',
      'database' => 'nymph_example',
      'user' => 'nymph_example',
      'password' => 'omgomg'
    ];
  }
}

\Nymph\Nymph::configure($nymphConfig);