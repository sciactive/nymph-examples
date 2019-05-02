<?php
$clientDir = file_exists('../../../../client/package.json')
    ? '../../../../client'
    : '../../../node_modules/nymph-client';

include('../../get_pubsub_url.php');

?><!DOCTYPE html>
<html>
<head>
  <title>Nymph React Collab Todo App</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <script type="text/javascript">
    (function(){
      var s = document.createElement("script"); s.setAttribute("src", "https://www.promisejs.org/polyfills/promise-5.0.0.min.js");
      (typeof Promise !== "undefined" && typeof Promise.all === "function") || document.getElementsByTagName('head')[0].appendChild(s);
    })();
    NymphOptions = {
      restURL: '../../rest.php',
      pubsubURL: <?php echo json_encode(get_pubsub_url()); ?>
    };
  </script>
  <script src="<?php echo $clientDir; ?>/dist/NymphClient.js"></script>

  <script src="//unpkg.com/prop-types@15.6.1/prop-types.js"></script>
  <script src="//unpkg.com/react@16.3.2/umd/react.development.js"></script>
  <script src="//unpkg.com/react-dom@16.3.2/umd/react-dom.development.js"></script>
  <script src="//unpkg.com/redux@4.0.0/dist/redux.js"></script>
  <script src="//unpkg.com/react-redux@5.0.7/dist/react-redux.js"></script>

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
          <span>React</span> |
          <a href="../angular1/" target="_self">Angular 1</a> |
          <a href="../svelte/" target="_self">Svelte</a>
        </small>
      </h2>
    </div>
    <div id="todoApp"></div>
  </div>
  <script src="dist/TodoApp.js"></script>
</body>
</html>
