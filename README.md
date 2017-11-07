# Nymph Examples - collaborative app data

[![Open Issues](https://img.shields.io/github/issues/sciactive/nymph-examples.svg?style=flat)](https://github.com/sciactive/nymph-examples/issues)

This repository contains example apps built with the [Nymph ORM](http://nymph.io). For more information, you can see the [main Nymph repository](https://github.com/sciactive/nymph).

This is also the repository that is hosted on Heroku as [the Nymph demos](http://nymph.io/#demos).

# Installation

> :information_source: In the [main Nymph repo](https://github.com/sciactive/nymph), there is a Docker setup that will do all of this for you with one command.

Set up a PHP server with MySQL on your localhost.

Set up a MySQL database called `nymph_example` and a user called `nymph_example` with the password "omgomg". Grant all permissions on \`nymph_example\` to \`localhost\`.\`nymph_example\`.

Clone this repository into your web server.

```sh
git clone https://github.com/sciactive/nymph-examples.git
```

Run the following command in the repository's directory:

```sh
composer install
```

Now start the PubSub server with:

```sh
php examples/pubsub.php
```

Now you can see the example apps (assuming your server is on port 80):

* [Todo App with Svelte](http://localhost/nymph-examples/examples/todo/svelte/)
* [Todo App with Angular 1](http://localhost/nymph-examples/examples/todo/angular1/)
* [Sudoku App](http://localhost/nymph-examples/examples/sudoku/)
* [Simple Clicker App](http://localhost/nymph-examples/examples/clicker/)

And you can run the Node example with:

```sh
node nodeconnect.js
```

## Setting up a Nymph Application

For a thorough step by step guide to setting up Nymph on your own server, visit the [Setup Guide](https://github.com/sciactive/nymph/wiki/Setup-Guide).

## API Docs

Check out the [API Docs in the wiki](https://github.com/sciactive/nymph/wiki/API-Docs).
