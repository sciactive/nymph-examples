#!/bin/bash

cd examples

  cd test
    npm install
  cd ..

  cd sudoku
    npm install
  cd ..

  cd todo
    npm install
    cd react
      npm install
    cd ..
    cd svelte
      npm install
    cd ..
  cd ..

cd ..

npm install
