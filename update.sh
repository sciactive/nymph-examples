#!/bin/bash

cd examples

  cd test
    ncu -u
  cd ..

  cd sudoku
    ncu -u
  cd ..

  cd todo
    ncu -u
    cd react
      ncu -u
    cd ..
    cd svelte
      ncu -u
    cd ..
  cd ..

cd ..

ncu -u
