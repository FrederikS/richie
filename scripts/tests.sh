#!/bin/sh

node_modules/.bin/mocha \
    --compilers js:node_modules/babel-register,js:./src/test/setup.js \
    --recursive \
    './src/test/**/*.spec.js'
