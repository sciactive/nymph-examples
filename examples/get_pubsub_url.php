<?php

function is_secure() {
  // Always assume secure on production.
  if (getenv('NYMPH_PRODUCTION')) {
    return true;
  }
  if (isset($_SERVER['HTTPS'])) {
    return (strtolower($_SERVER['HTTPS']) == 'on' || $_SERVER['HTTPS'] == '1');
  }
  return (isset($_SERVER['SERVER_PORT']) && $_SERVER['SERVER_PORT'] == '443');
}

function get_pubsub_url () {
  return (is_secure() ? 'wss' : 'ws') .
          '://' .
          (getenv('NYMPH_PRODUCTION') ? 'nymph-pubsub-demo.herokuapp.com' : '127.0.0.1') .
          ':' .
          (getenv('NYMPH_PRODUCTION') ? (is_secure() ? '443' : '80') : '8081');
}
