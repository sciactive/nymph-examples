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
  <style type="text/css">
    #userCount {
      position: fixed;
      right: 5px;
      bottom: 5px;
    }
    label.list-group-item {
      font-weight: normal;
      cursor: pointer;
    }
    label.list-group-item > .row {
      display: block;
    }
    .todo-input {
      display: inline;
      background-color: transparent;
      border: 0;
      width: 90%;
    }
    .todo-input.done-true {
      text-decoration: line-through;
      color: grey;
    }
    .date-col {
      text-align: right;
    }
  </style>
  <script src="<?php echo $clientDir; ?>/src/Nymph.js"></script>
  <script src="<?php echo $clientDir; ?>/src/Entity.js"></script>
  <script src="<?php echo $clientDir; ?>/src/NymphPubSub.js"></script>
  <script src="../Todo.js"></script>

  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
</head>
<body>
  <p>
    It's not ready yet.
  </p>
</body>
</html>
