#!/usr/bin/env bash
yarn
zip -r function index.js secrets.js node_modules/
aws lambda update-function-code --function-name over4k-main --zip-file fileb://function.zip --publish
