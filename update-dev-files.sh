#!/bin/bash

cd $(dirname $0)

cp -af ../nymph-client/* ./bower_components/nymph-client/
cp -af ../nymph-server/* ./vendor/sciactive/nymph-server/
cp -af ../nymph-pubsub/* ./vendor/sciactive/nymph-pubsub/

echo Done.