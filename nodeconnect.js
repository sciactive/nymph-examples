const fs = require('fs');

// Nymph Node client for the win.
const NymphNode = fs.existsSync('../client-node/package.json')
    ? require('../client-node/index.js')
    : require('nymph-client-node');
// Tilmeld requires cookies.
NymphNode.enableCookies();
const Nymph = NymphNode.Nymph;

// Set up Nymph.
const nymphOptions = {
  restURL: 'http://localhost:8080/examples/examples/rest-tilmeld.php',
  pubsubURL: 'ws://localhost:8081',
  rateLimit: 100
};
Nymph.init(nymphOptions);

const Todo = require('./examples/todo/Todo').Todo;
const User = fs.existsSync('../tilmeld-client/package.json')
    ? require('../tilmeld-client/lib/Entities/User.js').User
    : require('tilmeld').User;
const Group = fs.existsSync('../tilmeld-client/package.json')
    ? require('../tilmeld-client/lib/Entities/Group.js').User
    : require('tilmeld').Group;

main();
async function main() {
  let user;
  // Check if we can login.
  try {
    let data = await User.loginUser({username: 'user@example.com', password: 'password'});
    if (data.result) {
      user = data.user;
    } else if (data.message === "Incorrect login/password.") {
      // Register a new user.
      user = new User();
      user.set({
        'username': 'user@example.com',
        'email': 'user@example.com',
        'nameFirst': 'User',
        'nameLast': 'McUserface'
      });
      data = await user.register({'password': 'password'});
      if (data.result) {
        if (!data.loggedin) {
          console.log("\n\nThe Node user in Tilmeld, 'User McUserface', needs to be enabled.");
        }
      } else {
        console.log("\n\nI can't register the Node user in Tilmeld, 'User McUserface': ", data.message);
      }
    }
  } catch (err) {
    console.log("err: ", err);
  }

  console.log("\n\nCurrent User: ", await User.current());

  // Listen to Foobar entities, and show them on the console.
  Nymph.getEntities({'class': Todo.class}, {'type': '&', 'strict': ['name', 'Foobar']}).subscribe((todos) => {
    console.log("\n\nReceived Todo Updates: ", todos);
  });

  // Make a new todo.
  const todo = new Todo();
  todo.set("name", "Foobar");
  console.log("\n\ntodo: ", todo);
  console.log("\n\nNew Todo todo.save(): ", await todo.save());

  // Wait 5 seconds, set it to done.
  console.log("\n\nWait 5 seconds...");
  await new Promise((r) => setTimeout(() => r(), 5000));
  todo.set("done", true);
  console.log("Set to Done todo.save(): ", await todo.save());

  // Wait 5 seconds, archive it.
  console.log("\n\nWait 5 seconds...");
  await new Promise((r) => setTimeout(() => r(), 5000));
  console.log("Archive todo.archive(): ", await todo.archive());

  // Wait 5 seconds, delete it.
  console.log("\n\nWait 5 seconds...");
  await new Promise((r) => setTimeout(() => r(), 5000));
  console.log("Delete todo.delete(): ", await todo.delete());

  return;
}

// This function would try to get a user, then edit it. If no one is logged in,
// it should fail.
async function userEditTest() {
  let user = await User.byUsername('user@example.com');
  user.set('nameFirst', 'Doofus');
  try {
    await user.save();
  } catch (err) {
    console.log('err: ', err);
  }
  await user.refresh();
  console.log("user: ", user);
}
