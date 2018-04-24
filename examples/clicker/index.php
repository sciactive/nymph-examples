<?php
$clientDir = file_exists('../../../client/package.json')
    ? '../../../client'
    : '../../node_modules/nymph-client';
$tilmeldDir = file_exists('../../../tilmeld-client/package.json')
    ? '../../../tilmeld-client'
    : '../../node_modules/tilmeld-client';

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
?><!DOCTYPE html>
<html ng-app="clickerApp">
  <head>
    <title>Nymph Clicker</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript">
      (function(){
        var s = document.createElement("script"); s.setAttribute("src", "https://www.promisejs.org/polyfills/promise-5.0.0.min.js");
        (typeof Promise !== "undefined" && typeof Promise.all === "function") || document.getElementsByTagName('head')[0].appendChild(s);
      })();
      NymphOptions = {
        restURL: '../rest.php',
        pubsubURL: '<?php echo is_secure() ? 'wss' : 'ws'; ?>://<?php echo getenv('NYMPH_PRODUCTION') ? 'nymph-pubsub-demo.herokuapp.com' : '\'+window.location.hostname+\''; ?>:<?php echo getenv('NYMPH_PRODUCTION') ? (is_secure() ? '443' : '80') : '8081'; ?>',
        rateLimit: 100
      };
    </script>
    <style type="text/css">
      #userCount {
        position: fixed;
        right: 5px;
        bottom: 5px;
      }
    </style>
    <script src="<?php echo $clientDir; ?>/lib/Nymph.js"></script>
    <script src="<?php echo $clientDir; ?>/lib/Entity.js"></script>
    <script src="<?php echo $clientDir; ?>/lib/PubSub.js"></script>
    <script src="<?php echo $clientDir; ?>/lib/nymph-client.js"></script>
    <script src="<?php echo $tilmeldDir; ?>/lib/umd/Entities/User.js"></script>
    <script src="<?php echo $tilmeldDir; ?>/lib/umd/Entities/Group.js"></script>

    <script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.5.7/angular.min.js"></script>
    <script src="clickerApp.js"></script>
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
    <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
  </head>
  <body>
    <div class="container" ng-controller="ClickerController">
      <div class="row">
        <div class="col-lg-12">
          <div class="page-header">
            <h2>
              Nymph Collaborative Clicker <small>try it with your friends</small>
            </h2>
          </div>
          <div class="jumbotron">
            <h1>Click the Button</h1>
            <p ng-show="uiState.clicks !== 0">
              The button has been clicked
              <span ng-show="uiState.clicks === null"><i class="fa fa-circle-o-notch fa-spin"></i></span>
              <span ng-show="uiState.clicks > 0">{{uiState.clicks}}</span>
              time{{uiState.clicks === 1 ? '' : 's'}}.
            </p>
            <p ng-show="uiState.clicks === 0">No one has clicked the button yet.</p>
            <p>
              <button class="btn btn-primary btn-lg" ng-click="click()" ng-disabled="uiState.clicks === null">Button</button>
              <button class="btn btn-link btn-lg" ng-click="reset()" ng-disabled="uiState.clicks === null">Unclick the Button</button>
            </p>
          </div>
        </div>
      </div>
      <div id="userCount" class="label label-default">
        Active Users: {{uiState.userCount}}
      </div>
    </div>
  </body>
</html>
