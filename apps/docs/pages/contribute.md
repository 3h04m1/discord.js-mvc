# Contributing
This library is open source and is licensed under the MIT license. If you want to contribute to this library, you can do so by creating a pull request or by creating an issue. All contributions are welcome!

## Table of Contents
[[toc]]

## General Guidelines
- All code must be written in TypeScript.
- All code must be formatted using Prettier.
- All code must be tested.
- All code must be documented.
- All code must be linted using ESLint.

## Repository Structure
This repository is a monorepo managed using [Lerna](https://lerna.js.org/). The repository is split into the following packages:
- `packages/discord.js-mvc` - This package contains the main library code.
- `packages/docs` - This package contains the documentation for the library.
- `examples/**` - This folder contains all the examples for the library.

## Getting Started
To get started with contributing to this library, you will need to clone the repository and install all dependencies. You can do so by running the following commands:
```sh
git clone https://repo-url
cd discord.js-mvc
npm install
```

### Building
To build the library, you can run the following command:
```sh
npm run build
```

## Contributing to the Documentation
The documentation is build using [VuePress V2](https://v2.vuepress.vuejs.org/). To contribute to the documentation, you will need to install all dependencies and then run the development server. You can do so by running the following commands:
```
npm install
npm run docs:dev
```


