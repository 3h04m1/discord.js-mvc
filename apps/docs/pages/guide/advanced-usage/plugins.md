# Make use of plugins
Another way to make your code more modular is to use plugins. All the plugins should be used in the whole project, so you can use them in any app. This will allow you to extend the functionality of your bot without having to modify the core code. Also this you can use the plugins feature to make use of singletons to avoid code duplication.

## Example Plugin Singleton
Let's say you have a plugin that handles the database connection, you can use the plugin to create a singleton that can be used across all your apps.
For this example we will use the [Prisma ORM](https://www.prisma.io/)

First, let's create in the plugins folder a directory called `database` and inside of it a file called `db.ts` where we will initialize the database connection.

```ts
// plugins/database/db.ts
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default prisma
```

Now we have one instance of the database connection that can be used across all our code.

### Extend the context with the prisma instance
Now we can create a plugin that will include the prisma instance in the context.

First, let's create the context flavor for the plugin, in the `plugins/database` directory create a file called `context.ts` and add the following code:

```ts
// plugins/database/context.ts
export interface DatabaseContext {
  prisma: PrismaClient
}
```

And use this context flavor in your main context file `context.ts`:

```ts
// context.ts
import { Base } from 'discord.js'
import { BaseContext } from 'discord.js-mvc'
import { DatabaseContext } from './plugins/database/context'

export type Context<T extends Base> = BaseContext<T> & DatabaseContext
```

Now we will have access to the prisma instance in the context.

### Create a plugin to initialize the prisma instance
Now we can create a plugin that will initialize the prisma instance and add it to the context.

In the `plugins/database` directory create a file called `index.ts` and add the following code:

```ts
// plugins/database/index.ts
import { Plugin } from 'discord.js-mvc'
import prisma from './db'

export const PrismaPlugin: Plugin<Context<any>> = (ctx) => {
    // Add the prisma instance to the context
    ctx.prisma = prisma
}
```

Remember to add the plugin to the main `router.ts` file:

```ts
// router.ts
import { Router, Route } from 'discord.js-mvc'
import { PrismaPlugin } from './plugins/database'

export const router = new Router()
    .plugin(PrismaPlugin)
    ...
```

::: info
Remember that `ctx.prisma` will be available in all your controllers and middlewares.
If you want to use the prisma instance in other code that is not related to `discord.js-mvc` you can import the `db.ts` file.

```ts
// other code
import prisma from './plugins/database/db'

// use prisma
prisma.user.findMany()
```
:::