# Logger plugin for [Discordjs MVC](https://discordjs-mvc.js.org)

This plugin adds a logger to your bot. The logger is based on [winston](https://www.npmjs.com/package/winston).
The `loggerConstructor` function returns a plugin, a middleware function and the logger object itself. 
The plugin adds the logger to the context object and the middleware automatically logs all interactions.
For using the logger in your own code, you can use the logger object.

## Installation

```bash
npm i @discordjs-mvc/logger
# or
yarn add @discordjs-mvc/logger
```

## Usage
It's recommended to create a separate file for the logger, for example `logger.ts`:
```ts
// logger.ts
import { loggerConstructor } from '@discordjs-mvc/logger'

const allLoggers = loggerConstructor({
  // Winston options
})

export default {
  loggerPlugin: allLoggers.plugin,
  loggerMiddleware: allLoggers.middleware,
  logger: allLoggers.logger
}
```

Now you can import the logger in your router file:


```ts
// router.ts
import { Router } from 'discordjs-mvc'
import { loggerPlugin, loggerMiddleware } from './logger'

const router = new Router()
  .plugin(loggerPlugin) // adds the plugin to the context object
  .use(loggerMiddleware) // automatically logs all interactions
```

For using the logger in your own code, you can import the logger object from the `logger.ts` file:
```ts
// myFile.ts
import { logger } from './logger'

logger.info('Hello World!')
```

## Extend your context with the logger flavor
To safely extend your context with the logger flavor, you can use the following code:
```ts
import { BaseContext } from 'discordjs-mvc'
import { LoggerFlavor } from '@discordjs-mvc/logger'

export type Context = BaseContext & LoggerFlavor
```
