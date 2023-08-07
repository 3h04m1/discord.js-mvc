#! /bin/env bash

rm -rf dist discordjs-mvc-cli-v1.0.2.tgz cli.tgz
yarn global remove @discordjs-mvc/cli
yarn cache clean
yarn run build && yarn pack --filename cli.tgz
yarn global add file:/$(pwd)/cli.tgz