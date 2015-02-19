#!/bin/bash

if [ "$1" = "demo" ]; then
	git checkout master
	git push nymph-demo
	exit 0
fi
if [ "$1" = "pubsub" ]; then
	git checkout nymph-pubsub-demo
	git merge master
	git push
	git push nymph-pubsub-demo +nymph-pubsub-demo:master
	git checkout master
	exit 0
fi

echo Options are "demo" or "pubsub".
