// Nymph Node client for the win.
const Nymph = require('nymph-client-node');
// Set up Nymph.
const nymphOptions = {
  restURL: 'http://localhost/nymph-examples/examples/rest.php',
  pubsubURL: 'ws://localhost:8080',
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
