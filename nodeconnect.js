const fs = require('fs');

// Set up module aliases for development environment.
const alias = require('module-alias');
if (fs.existsSync('../client-node/package.json')) {
  alias.addAliases({
    'nymph-client-node': __dirname + '/../client-node/index.js',
    'nymph-client': __dirname + '/../client/dist/NymphClient.js',
    'tilmeld-client': __dirname + '/../tilmeld-client/dist/TilmeldClient.js',
  });
}

// Nymph Node client for the win.
const { Nymph, PubSub } = require('nymph-client-node');

// Set up Nymph.
const nymphOptions = {
  restURL: 'http://localhost:8080/examples/examples/rest.php',
  pubsubURL: 'ws://localhost:8081',
};
Nymph.init(nymphOptions);

const { Todo } = require('./examples/todo/Todo');
const { User } = require('tilmeld-client');

main();
async function main() {
  let user;
  // Check if we can login.
  try {
    let data = await User.loginUser({
      username: 'user@example.com',
      password: 'password',
    });
    if (data.result) {
      user = data.user;
    } else if (data.message === 'Incorrect login/password.') {
      // Register a new user.
      user = new User();
      user.username = 'user@example.com';
      user.email = 'user@example.com';
      user.nameFirst = 'User';
      user.nameLast = 'McUserface';
      data = await user.$register({ password: 'password' });
      if (data.result) {
        if (!data.loggedin) {
          console.log(
            "\n\nThe Node user in Tilmeld, 'User McUserface', needs to be enabled.",
          );
          return;
        }
      } else {
        console.log(
          "\n\nI can't register the Node user in Tilmeld, 'User McUserface': ",
          data.message,
        );
      }
    }

    console.log('\n\nCurrent User: ', (await User.current()).toJSON());

    // Listen to Foobar entities, and show them on the console.
    Nymph.getEntities(
      { class: Todo.class },
      { type: '&', strict: ['name', 'Foobar'] },
    ).subscribe(update => {
      console.log(
        '\n\nReceived Todo Updates: ',
        Array.isArray(update) ? update.map(todo => todo.joJSON()) : update,
      );
    });

    // Make a new todo.
    const todo = new Todo();
    todo.name = 'Foobar';
    console.log('\n\ntodo: ', todo.toJSON());
    console.log('\n\nNew Todo todo.$save(): ', (await todo.$save()).toJSON());

    // Wait 5 seconds, set it to done.
    console.log('\n\nWait 5 seconds...');
    await new Promise(r => setTimeout(() => r(), 5000));
    todo.done = true;
    console.log('Set to Done todo.$save(): ', (await todo.$save()).toJSON());

    // Wait 5 seconds, archive it.
    console.log('\n\nWait 5 seconds...');
    await new Promise(r => setTimeout(() => r(), 5000));
    console.log('Archive todo.$archive(): ', await todo.$archive());

    // Wait 5 seconds, delete it.
    console.log('\n\nWait 5 seconds...');
    await new Promise(r => setTimeout(() => r(), 5000));
    console.log('Delete todo.$delete(): ', await todo.$delete());

    // Logout.
    console.log('\n\nWait 5 seconds...');
    await new Promise(r => setTimeout(() => r(), 5000));
    console.log('Logout user.$logout(): ', await user.$logout());

    // Close the PubSub connection.
    PubSub.close();
  } catch (err) {
    console.log('err: ', err);
  }

  return;
}

// This function would try to get a user, then edit it. If no one is logged in,
// it should fail.
async function userEditTest() {
  let user = await User.byUsername('user@example.com');
  user.nameFirst = 'Doofus';
  try {
    await user.$save();
  } catch (err) {
    console.log('err: ', err);
  }
  await user.$refresh();
  console.log('user: ', user.toJSON());
}
