#!/usr/bin/env bash

# Exit script as soon as a command fails.
set -o errexit

cd zkp-utils && rm -rf node_modules && npm ci && \
cd ../account-utils && rm -rf node_modules && npm ci && \
cd ../zkp && rm -rf node_modules && npm ci && \
npm run setup-all && cd ../
