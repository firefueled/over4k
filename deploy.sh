#!/usr/bin/env bash
yarn build
cd build
aws s3 sync . s3://aws-website-itsover-x3qay/
