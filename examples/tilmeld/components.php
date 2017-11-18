<?php
$clientDir = file_exists('../../../client/package.json')
    ? '../../../client'
    : '../../node_modules/nymph-client';
$tilmeldDir = file_exists('../../../tilmeld/package.json')
    ? '../../../tilmeld'
    : '../../node_modules/tilmeld';

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
  <title>Tilmeld Component Example</title>
  <meta charset="utf-8">
  <script type="text/javascript">
    (function(){
      var s = document.createElement("script"); s.setAttribute("src", "https://www.promisejs.org/polyfills/promise-5.0.0.min.js");
      (typeof Promise !== "undefined" && typeof Promise.all === "function") || document.getElementsByTagName('head')[0].appendChild(s);
    })();
    NymphOptions = {
      restURL: '../rest-tilmeld.php',
      pubsubURL: '<?php echo is_secure() ? 'wss' : 'ws'; ?>://<?php echo getenv('NYMPH_PRODUCTION') ? 'nymph-pubsub-demo.herokuapp.com' : '\'+window.location.hostname+\''; ?>:<?php echo getenv('NYMPH_PRODUCTION') ? (is_secure() ? '443' : '80') : '8081'; ?>',
      rateLimit: 100
    };
  </script>
  <script src="<?php echo $clientDir; ?>/lib/Nymph.js"></script>
  <script src="<?php echo $clientDir; ?>/lib/Entity.js"></script>
  <script src="<?php echo $clientDir; ?>/lib/PubSub.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/Entities/User.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/Entities/Group.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/Components/TilmeldRecover.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/Components/TilmeldLogin.js"></script>
  <script src="<?php echo $tilmeldDir; ?>/lib/Components/TilmeldChangePassword.js"></script>

  <link rel="stylesheet" href="../../node_modules/pform/css/pform.css">
  <link rel="stylesheet" href="../../node_modules/pform/css/pform-bootstrap.css">
  <link rel="stylesheet" href="//maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css">
</head>
<body>
  <header>
    <h1>Tilmeld Component Examples</h1>
  </header>
  <section class="page-container">
    <div style="display: flex; flex-direction: row;">
      <div style="width: 50%; padding-right: 1em; box-sizing: border-box;">
        Currently logged in user: <button class="btn btn-secondary" onclick="logout()">Logout</button>
        <div class="currentuser" style="margin-top: 1em;"></div>
      </div>
      <div style="width: 50%; padding-left: 1em; box-sizing: border-box;">
        <div>
          Register event: <div class="registerevent"></div>
        </div>
        <div>
          Login event: <div class="loginevent"></div>
        </div>
      </div>
    </div>
    <div class="login-row">
      <div class="login-container">
        <h2>Login (Normal Layout)</h2>
        <login data-layout="normal" data-show-existing-user-checkbox="true" data-existing-user="true" data-compact-text="Log in/Sign up"></login>
      </div>
      <div class="login-container">
        <h2>Login (Small Layout)</h2>
        <login data-layout="small" data-show-existing-user-checkbox="true" data-existing-user="true" data-compact-text="Log in/Sign up"></login>
      </div>
    </div>
    <div class="login-row">
      <div class="login-container">
        <h2>Login (Compact Layout)</h2>
        <login data-layout="compact" data-show-existing-user-checkbox="true" data-existing-user="true" data-compact-text="Log in/Sign up"></login>
      </div>
      <div class="login-container">
        <h2>Login (Compact Layout, Only Login)</h2>
        <login data-layout="compact" data-show-existing-user-checkbox="false" data-existing-user="true" data-compact-text="Log in"></login>
      </div>
      <div class="login-container">
        <h2>Login (Compact Layout, Only Register)</h2>
        <login data-layout="compact" data-show-existing-user-checkbox="false" data-existing-user="false" data-compact-text="Sign up"></login>
      </div>
    </div>
    <div class="change-password-row">
      <div class="change-password-container">
        <h2>Change Password (Normal Layout)</h2>
        <change-password data-layout="normal"></change-password>
      </div>
      <div class="change-password-container">
        <h2>Change Password (Small Layout)</h2>
        <change-password data-layout="small"></change-password>
      </div>
      <div class="change-password-container">
        <h2>Change Password (Compact Layout)</h2>
        <change-password data-layout="compact"></change-password>
      </div>
    </div>
  </div>

  <script>
    ((global, User, TilmeldLogin, TilmeldChangePassword) => {
      let currentUser = null;
      const currentUserEl = document.querySelector('.currentuser');
      const logins = document.getElementsByTagName('login');
      const changePasswords = document.getElementsByTagName('change-password');
      User = (User && User.__esModule) ? User["default"] : User;
      TilmeldLogin = (TilmeldLogin && TilmeldLogin.__esModule) ? TilmeldLogin["default"] : TilmeldLogin;
      TilmeldChangePassword = (TilmeldChangePassword && TilmeldChangePassword.__esModule) ? TilmeldChangePassword["default"] : TilmeldChangePassword;

      for (const login of logins) {
        const component = new TilmeldLogin({
          target: login,
          data: {
            autofocus: false,
            compactText: login.dataset.compactText,
            existingUser: login.dataset.existingUser === "true",
            showExistingUserCheckbox: login.dataset.showExistingUserCheckbox === "true",
            layout: login.dataset.layout,
            classCheckbox: '',
            classInput: 'form-control',
            classRadio: '',
            classSelect: 'form-control',
            classTextarea: 'form-control',
            classSubmit: 'btn btn-primary',
            classButton: 'btn btn-secondary'
          }
        });

        component.on('register', e => {
          const el = document.querySelector('.registerevent');
          el.innerText = 'Fired: '+JSON.stringify(e);
        });

        component.on('login', e => {
          const el = document.querySelector('.loginevent');
          el.innerText = 'Fired: '+JSON.stringify(e);
        });
      }
      for (const changePassword of changePasswords) {
        const component = new TilmeldChangePassword({
          target: changePassword,
          data: {
            layout: changePassword.dataset.layout,
            classInput: 'form-control',
            classSubmit: 'btn btn-primary',
            classButton: 'btn btn-secondary'
          }
        });
      }

      User.current().then(user => {
        if (user) {
          currentUser = user;
          currentUserEl.innerText = JSON.stringify(user);
        } else {
          currentUserEl.innerText = 'none';
        }
      });

      User.on('login', user => {
        currentUser = user;
        currentUserEl.innerText = JSON.stringify(user);
      });
      User.on('logout', () => {
        currentUser = null;
        currentUserEl.innerText = 'none';
      });

      global.logout = () => {
        if (currentUser) {
          currentUser.logout();
        }
      }
    })(this, User, TilmeldLogin, TilmeldChangePassword);
  </script>

  <style>
    .page-container {
      width: 100%;
      padding: 20px;
      box-sizing: border-box;
    }

    .login-row, .change-password-row {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
    }

    .login-container, .change-password-container {
      flex-grow: 1;
      padding: 20px;
    }

    login, change-password {
      display: flex;
      padding-bottom: 1em;
    }

    .currentuser, .registerevent, .loginevent {
      padding: 1em;
      background: #eee;
      border: 1px solid #333;
      font-family: monospace;
      max-width: 100%;
      overflow: auto;
      word-break: break-word;
      word-wrap: break-word;
    }
  </style>
</body>
</html>
