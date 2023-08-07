# Apps
When your codebase grows bigger and bigger it's starts to become painful to have a single router and to store all your controllers in the same directory, that's why `discord.js-mvc` comes with the concept of apps, an app is a directory that contains a grouped set of controllers, middlewares, and plugins, based on logic, for example, you can have an app for the moderation commands, and another app for the music commands, and another app for the fun commands, and so on.

## Creating an app
You can manually create an app by creating an apps directory in the root of your project and then create a directory for your app inside the apps directory, then you can create a `Route.manager.group` file inside the app directory and export it.
```bash
mkdir apps
mkdir apps/moderation
touch apps/moderation/index.ts
```

or you can use the `generate` command to generate the app directory and the `Route.manager.group` file.
```bash
djs-mvc generate app moderation
# or
djs-mvc g a moderation
```

This will generate the following files:
```
apps
└── moderation
    ├── controllers
    │   └── moderation.controller.ts
    ├── index.ts
    └── middlewares
        └── moderation.middleware.ts

```

In your `apps/moderation/index.ts` file, you can create a router and export it.
```ts
import { Route } from 'discordjs-mvc';
import { Context } from '../../context';

export default Route.manager.group({
    // add here a prefix for your routes
    // so in a big project you can have
    // multiple apps with the same routes
    prefix: 'mod'
    middleware: [
        // you can add your middlewares here
        // for this group of routes
    ],
    routes: [
        // here you can add your routes
        new Route<Context<ButtonInteraction>>('ban', banController),
    ]
});
```

::: tip
For more information about the `Route.manager.group` method see the [routing docs](/guide/core-concepts/routing.html#adding-a-route-group)
:::

## Using an app
Now you have created your app, you can use it in your main router.
```ts
import moderationApp from './apps/moderation';

const router = new Router()
    .add(
        // your other routes
        moderationApp
    )
```

::: tip
When your project grows, you can create a directory for each app in the `apps` directory and then create a `index.ts` file in the `apps` directory and export all your apps from it. Also you can stop creating controllers in your main router and switch to using apps only.
:::

## Sharing is caring
You can share your apps with the community by publishing them to NPM, this way other people can use your apps in their projects.

::: note
If you want to publish your app, you should specify the plugins and middlewares that your app uses, or install them as peer dependencies.
:::