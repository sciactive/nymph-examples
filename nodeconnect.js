// Do aliases to get around Node modules.
const alias = require('module-alias');
alias.addAliases({
  'Nymph': __dirname + '/../client/lib-cjs/Nymph',
  'NymphEntity': __dirname + '/../client/lib-cjs/Entity',
  'NymphPubSub': __dirname + '/../client/lib-cjs/PubSub',
  'Entity': __dirname + '/../client/lib-cjs/Entity',
  'PubSub': __dirname + '/../client/lib-cjs/PubSub',
  'Todo': __dirname + '/examples/todo/Todo.cjs',
});

// Set up some shit that Nymph needs.
global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
global.WebSocket = require('websocket').w3cwebsocket;

// Set up Nymph.
const nymphOptions = {
  restURL: 'http://nymph-demo.herokuapp.com/examples/rest.php',
  pubsubURL: 'ws://nymph-pubsub-demo.herokuapp.com:80',
  rateLimit: 100
};
const Nymph = require('Nymph').Nymph;
Nymph.init(nymphOptions);
const PubSub = require('NymphPubSub').PubSub;
PubSub.init(nymphOptions);
const Todo = require('Todo').Todo;


// Make a new todo, wait 2 seconds, set it to done.
main();
async function main() {
  const todo = new Todo();
  todo.set("name", "I am a new todo from Node.");
  console.log("await todo.save(): ", await todo.save());

  await new Promise((r) => setTimeout(() => r(), 2000));

  todo.set("done", true);
  console.log("await todo.save(): ", await todo.save());

  Nymph.getEntities({'class': Todo.class}, {'type': '&', 'strict': ['name', 'Foobar']}).subscribe((todos) => {
    console.log("\n\nNew Todo Updates: ", todos);
  });

  return;
}
