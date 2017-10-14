// Nymph Node client for the win.
const Nymph = require('nymph-client-node');
// Set up Nymph.
const nymphOptions = {
  restURL: 'http://nymph-demo.herokuapp.com/examples/rest.php',
  pubsubURL: 'ws://nymph-pubsub-demo.herokuapp.com:80',
  rateLimit: 100
};
Nymph.init(nymphOptions);
const Todo = require('./examples/todo/Todo.cjs').Todo;


main();
async function main() {
  // Listen to Foobar entities, and show them on the console.
  Nymph.getEntities({'class': Todo.class}, {'type': '&', 'strict': ['name', 'Foobar']}).subscribe((todos) => {
    console.log("\n\nReceived Todo Updates: ", todos);
  });

  // Make a new todo.
  const todo = new Todo();
  todo.set("name", "Foobar");
  console.log("\n\nawait todo.save(): ", await todo.save());

  // Wait 2 seconds, set it to done.
  await new Promise((r) => setTimeout(() => r(), 2000));
  todo.set("done", true);
  console.log("\n\nawait todo.save(): ", await todo.save());

  // Wait 2 seconds, archive it.
  await new Promise((r) => setTimeout(() => r(), 2000));
  console.log("\n\nawait todo.archive(): ", await todo.archive());

  // Wait 2 seconds, delete it.
  await new Promise((r) => setTimeout(() => r(), 2000));
  console.log("\n\nawait todo.delete(): ", await todo.delete());

  return;
}
