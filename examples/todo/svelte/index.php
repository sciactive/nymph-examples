<?php
$clientDir = file_exists('../../../../client/package.json')
    ? '../../../../client'
    : '../../../node_modules/nymph-client';
$tilmeldDir = file_exists('../../../../tilmeld/package.json')
    ? '../../../../tilmeld'
    : '../../../node_modules/tilmeld';

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
<html>
<head>
  <title>Nymph Svelte Collab Todo App</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="text/javascript">
    (function(){
      var s = document.createElement("script"); s.setAttribute("src", "https://www.promisejs.org/polyfills/promise-5.0.0.min.js");
      (typeof Promise !== "undefined" && typeof Promise.all === "function") || document.getElementsByTagName('head')[0].appendChild(s);
    })();
    NymphOptions = {
      restURL: '../../rest.php',
      pubsubURL: '<?php echo is_secure() ? 'wss' : 'ws'; ?>://<?php echo getenv('NYMPH_PRODUCTION') ? 'nymph-pubsub-demo.herokuapp.com' : '\'+window.location.hostname+\''; ?>:<?php echo getenv('NYMPH_PRODUCTION') ? (is_secure() ? '443' : '80') : '8081'; ?>',
      rateLimit: 100
    };
  </script>
  <script src="<?php echo $clientDir; ?>/lib/Nymph.js"></script>
  <script src="<?php echo $clientDir; ?>/lib/Entity.js"></script>
  <script src="<?php echo $clientDir; ?>/lib/PubSub.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/Entities/User.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/Entities/Group.js"></script>
  <script src="../Todo.js"></script>

  <script src="lib/TodoEl.js"></script>
  <script src="lib/TodoApp.js"></script>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <div class="page-header">
      <h2 style="display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap;">
        <span>
          Collaborative Todo List
        </span>
        <small>
          <a href="../react/" target="_self">React</a> |
          <a href="../angular1/" target="_self">Angular 1</a> |
          <span>Svelte</span>
        </small>
      </h2>
    </div>
    <div id="todoApp"></div>
  </div>
  <script type="text/javascript">
    ((document, TodoApp) => {
      TodoApp = (TodoApp && TodoApp.__esModule) ? TodoApp["default"] : TodoApp;
      const todoApp = new TodoApp({
        target: document.getElementById('todoApp')
      });
    })(document, TodoApp);
  </script>
</body>
</html>
