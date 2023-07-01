# Logger plugin for [Discordjs MVC](https://discordjs-mvc.js.org)

This plugin adds a logger to your bot. The logger is based on [winston](https://www.npmjs.com/package/winston).

## Installation

```bash
npm i @discordjs-mvc/logger
```

## Usage

```ts
import { Router } from 'discordjs-mvc'
import { logger } from '@discordjs-mvc/logger'

const loggerPlugin =
  logger()
  // winston logger options

const router = new Router()
  .plugin(logger.plugin) // adds the plugin to the context object
  .use(logger.middleware) // automatically logs all interactions
```

## Extend your context with the logger flavor
To safely extend your context with the logger flavor, you can use the following code:
```ts
import { BaseContext } from 'discordjs-mvc'
import { LoggerFlavor } from '@discordjs-mvc/logger'

export type Context = BaseContext & LoggerFlavor
```
