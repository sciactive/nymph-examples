#!/bin/bash

if [ "$1" = "demo" ]; then
  git checkout nymph-demo
  git merge master
  git push origin nymph-demo
  git checkout master
  exit 0
fi
if [ "$1" = "pubsub" ]; then
  git checkout nymph-pubsub-demo
  git merge master
  git push origin nymph-pubsub-demo
  git checkout master
  exit 0
fi

echo Options are "demo" or "pubsub".
