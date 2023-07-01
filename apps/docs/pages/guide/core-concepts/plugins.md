# Plugins
Plugins are a way to extend the functionality of DiscordJs MVC. You can create your own plugins or use the ones created by the community.
The plugins are accessible from the `Context` object and can be used in the controller or in the middleware or other plugins.

## Creating a plugin
A plugin is a basic function that takes a `Context` object as a parameter and return nothing. The plugin can be asynchronous or not.
DiscordJs MVC provides a `PLugin` type to help you create your own plugins.

```ts
import { Plugin } from 'discordjs-mvc';
import { Context } from './context';

export const myPlugin: Plugin<Context> = (context) => {
    // Do something with the context
    ctx.sayHello = () => {
        console.log('Hello');
    };
};
```

## Type the context
Now you have created your plugin, you can use it in your controller or in another plugin. But you may want to type the context to have access to the properties you have added in your plugin.
To do that, you can create a new type that extends the `Context` type and add your properties.

```ts
// context.ts
import { Base } from 'discord.js';
import { BaseContext } from 'discordjs-mvc';

export type Context<T extends Base> = BaseContext<T> & {
    sayHello: () => void;
};
```
Or you can create a context flavor that extends the `BaseContext` type and add your properties.
This is better if you want to publish your plugin and let the user extend the context.

```ts
import { BaseContext } from 'discordjs-mvc';
export type HelloFlavor = {
    sayHello: () => void;
};

// now you can use it like that
import { Base } from 'discord.js';
import { HelloFlavor } from './myPlugin';
import { Context } from './context';

export type Context<T extends Base> = BaseContext<T> & HelloFlavor;
```

This way, you can use the types of other plugins and extend them.

```ts
import { Base } from 'discord.js';
import { HelloFlavor } from './myPlugin';
import {OtherPluginFlavor} from './otherPlugin';

export type Context<T extends Base> = BaseContext<T> & HelloFlavor & OtherPluginFlavor;
```

## Using a plugin
To use a plugin, you have to add it as a parameter of the router's plugin method.

```ts
import { myPlugin } from './myPlugin';
import { otherPlugin } from './otherPlugin';
import { Router } from 'discordjs-mvc';

export const router = new Router()
    .plugin(
        myPlugin, 
        otherPlugin
    );
```

### Using a plugin in a controller
To use a plugin in a controller, you just need to get the plugin from the context.

```ts
import { Controller } from 'discordjs-mvc';
import { Context } from './context';

export const myController = new Controller<Context>('myController', (ctx) => {
    ctx.sayHello();
});
```
::: info
The plugin can be used everywhere where you have access to the context.
:::

## Share your plugin
If you have a useful plugin that you want to share with the community, you can submit a pull request to add it to the [plugins list](/plugins/).
Or you can publish it on npm and add it to the community plugins list.


