<?php
$clientDir = file_exists('../../../../client/bower.json')
    ? '../../../../client'
    : '../../../bower_components/nymph-client';
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
      pubsubURL: 'ws://<?php echo getenv('DATABASE_URL') ? htmlspecialchars('nymph-pubsub-demo.herokuapp.com') : htmlspecialchars(explode(':', $_SERVER['HTTP_HOST'])[0]); ?>:<?php echo getenv('DATABASE_URL') ? '80' : '8080'; ?>',
      rateLimit: 100
    };
  </script>
  <script src="<?php echo $clientDir; ?>/src/Nymph.js"></script>
  <script src="<?php echo $clientDir; ?>/src/Entity.js"></script>
  <script src="<?php echo $clientDir; ?>/src/NymphPubSub.js"></script>
  <script src="../Todo.js"></script>

  <script src="build/TodoEl.js"></script>
  <script src="build/TodoApp.js"></script>
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
  <div class="container">
    <div class="page-header">
      <h2>
        Collaborative Todo List
        <small class="pull-right">
          <a href="../angular1/" target="_self">Angular 1</a> |
          <span>Svelte</span>
        </small>
      </h2>
    </div>
    <div id="todoApp"></div>
  </div>
  <script type="text/javascript">
    const todoApp = new TodoApp({
      target: document.getElementById('todoApp')
    });
  </script>
</body>
</html>
