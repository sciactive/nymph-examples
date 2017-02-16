<?php

if (getenv('DATABASE_URL')) {
  // No import/export on Heroku.
  header('HTTP/1.1 403 Forbidden', true, 403);
  echo "403 Forbidden";
  exit;
}

if ($_FILES) {
  if ($_FILES['nex']['error'] === 0) {
    error_reporting(E_ALL);

    require file_exists(__DIR__.'/../../../autoload-dev.php')
        ? __DIR__.'/../../../autoload-dev.php'
        : __DIR__.'/../../vendor/autoload.php';
    require __DIR__.'/../config.php';

    require '../employee/Employee.php';
    require '../sudoku/Game.php';
    require '../todo/Todo.php';

    try {
      $result = \Nymph\Nymph::import($_FILES['nex']['tmp_name']);
    } catch (\Nymph\Exceptions\QueryFailedException $e) {
      echo $e->getMessage()."\n\n".$e->getQuery();
    }
  } else {
    $result = false;
  }
}
?>
<html>
  <head><title>Import Entities</title></head>
  <body>
    <?php if ($_FILES) { ?>
    <p>It looks like the import <?php echo $result ? 'succeeded' : 'failed' ?>.</p>
    <?php } ?>
    <p>
      Upload a NEX file to import:
      <form method="POST" action="" enctype="multipart/form-data">
        <input type="file" name="nex">&nbsp;&nbsp;&nbsp;<input type="submit" value="Submit">
      </form>
    </p>
  </body>
</html>
