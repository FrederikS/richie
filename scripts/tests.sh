#!/bin/sh

node_modules/.bin/_mocha \
    --compilers js:node_modules/babel-register,js:./src/test/setup.js \
    --recursive \
    './src/test/**/*.spec.js'
