# Session Plugin for [DiscordJs Mvc](https://discordjs-mvc.js.org/)

## Installation

```bash
npm install @discordjs-mvc/session
# or
yarn add @discordjs-mvc/session
```

## Usage
You need to extend your `Context` type with the `SessionFlavor` type from the plugin.

```ts
import { Base } from 'discord.js';
import { SessionFlavor } from '@discordjs-mvc/session';
import { BaseContext } from 'discord.js-mvc';

export type Context<T extends Base> = BaseContext<T> & SessionFlavor;
```

### Registering the plugin
```ts
import { SessionPlugin, InMemoryStorage } from '@discordjs-mvc/session';
import { Router } from 'discord.js-mvc';

export const router = new Router()
    .plugin(
        SessionPlugin(
            // Pass the session store here, this is required
            new InMemoryStore(),
            // You can pass initial data to the session store here, this is optional
            { foo: 'bar' }
        )
    )
    .middleware(
        // Your Middleware
    )
    .routes(
        // Your Routes
    );
```

### Using the session
```ts
// controllers/ping.controller.ts
import {ChatInputCommandInteraction} from 'discord.js';
import { Context } from './context';
import { Controller } from 'discord.js-mvc';

export const pingController: Controller<Context<ChatInputCommandInteraction>> = async (ctx) => {
    // check if user already used the command
    const used = await ctx.session.get('ponged');
    if (used) {
        return await ctx.reply('You already used this command');
    }
    // if not, set the session value to true
    await ctx.session.set('ponged', true);
    // reply with pong
    return await ctx.reply('pong');
};
```

## Session Storage
The plugin comes with two session storage implementations, `InMemoryStorage` and `FileStorage`.
Both storages are not recommended for production use : the `InMemoryStorage` is not persistent 
and the `FileStorage` is not optimized as it store the whole session data in a single file.

### InMemoryStore
The `InMemoryStorage` is the easiest to use, it stores the session data in memory,
but it is not persistent, so the session data will be lost when the bot restarts.
The implementation is described in the [previous section](#using-the-session).

DO NOT USE THIS IN PRODUCTION

### FileStorage
The `FileStorage` stores the session data in a file, it is persistent but not optimized.
It's the same implementation as the `InMemoryStorage` but it uses the `fs` module
to store the data in a file so it is persistent.

The `FileStorage` constructor takes a `path` to the file as first argument and an optional
`writeIntervalDelay`, this is the delay between each write to the file, by default it is set to `60 000` (1 minute).

```ts
import { SessionPlugin, FileStorage } from '@discordjs-mvc/session';
import { Router } from 'discord.js-mvc';

export const router = new Router()
    .plugin(
        SessionPlugin(
            // Pass the session store here, this is required
            new FileStorage('./session.json', 60_000),
            // You can pass initial data to the session store here, this is optional
            { foo: 'bar' }
        )
    )
    .middleware(
        // Your Middleware
    )
    .routes(
        // Your Routes
    );
```

### Create your own storage
You can create your own storage by implementing the `Storage` interface.
```ts
interface Storage {
    get(key?: string): any | Promise<any>;
    set(key: string, value: any): void | Promise<void>;
    delete(key: string): void | Promise<void>;
}
```

So you can create a storage that uses a database or a cache system. 
All you need is to create a class that has the `get`, `set` and `delete` methods.

```ts
import { Storage } from '@discordjs-mvc/session';

export class MyStorage implements Storage {
    
    public async get(key?: string): Promise<any> {
        // get the value from the database
    }

    public async set(key: string, value: any): Promise<void> {
        // set the value in the database
    }

    public async delete(key: string): Promise<void> {
        // delete the value from the database
    }
}
```




