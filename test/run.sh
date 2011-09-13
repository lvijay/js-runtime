#!/bin/bash

DIR=$PWD

## hack but it works
if ! echo $PWD | grep -E 'test$'; then
    cd test
fi

java -jar ../js.jar -strict -e " \
    load('../runtime.js'); \
    load('../lib.js'); \
    load('example.js');"
