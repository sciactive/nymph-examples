<?php
$clientDir = file_exists('../../../../client/package.json')
    ? '../../../../client'
    : '../../../node_modules/nymph-client';
$tilmeldDir = file_exists('../../../../tilmeld-client/package.json')
    ? '../../../../tilmeld-client'
    : '../../../node_modules/tilmeld-client';

include('../../get_pubsub_url.php');

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
      restURL: '../../rest-tilmeld.php',
      pubsubURL: <?php echo json_encode(get_pubsub_url()); ?>,
      rateLimit: 100
    };
  </script>
  <script src="<?php echo $clientDir; ?>/lib/Nymph.js"></script>
  <script src="<?php echo $clientDir; ?>/lib/Entity.js"></script>
  <script src="<?php echo $clientDir; ?>/lib/PubSub.js"></script>
  <script src="<?php echo $clientDir; ?>/lib/NymphClient.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/umd/Entities/User.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/umd/Entities/Group.js"></script>
  <script src="../Todo.js"></script>

  <script src="lib/TodoEl.js"></script>
  <script src="lib/TodoApp.js"></script>
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
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
