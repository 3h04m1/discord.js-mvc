# Ping Pong Bot
In this short guide, we will create a simple ping pong bot using `discord.js-mvc`.
___


For beginning, you need to create a new file called `index.js` in the root of your project. This file will be the entry point of your bot.

@[code](../../../codeblocks/getting-started/index.ts)

## Create a Slash Command
We will create a slash command called `ping`. This command will respond with `Pong!` when executed.
To store all the commands, we will create a new folder called `views` in the root of our project. Inside this folder, we will create a new folder called `commands` and inside this folder, we will create a new file called `ping.ts`.

@[code](../../../codeblocks/getting-started/views/commands/ping.ts)

## Create a Controller
To create a controller, we will create a new folder called `controllers` in the root of our project. Inside this folder, we will create a new file called `ping.ts`.

@[code](../../../codeblocks/getting-started/controllers/pingController.ts)

## Create the router
To create the router, we will create a new file called `router.ts` in the root of our project.
Inside this file, we will import 2 classes from `discord.js-mvc`:
- `Router` - This class is used to create a new router.
- `Route` - This class is used to create a new route.
Also, we will import the `pingController` from the `controllers` folder.

@[code](../../../codeblocks/getting-started/router.ts)

## Add the router to the bot
Now that we have our router, we can add it to the bot. To do so, we will import 
the `router` from the `router.ts` file and then we will add it in the main `index.ts` 
file to handle all the interactions.

@[code ts{16-18}](../../../codeblocks/getting-started/indexWithRouter.ts)

## Register the commands
You can register the commands following the [official guide](https://discordjs.guide/creating-your-bot/command-deployment.html).
or `discord.js-mvc` provides a built-in to register guild and global commands.

@[code ts{20-29,32-42}](../../../codeblocks/getting-started/registerCommands.ts)

::: tip
Since you need to specify the path from the root of your profect, you can set a production environment to make it easier to register the commands.
```.env
PRODUCTION=true
```

```ts
const {PRODUCTION} = process.env;

const commandsDir = PRODUCTION ? 'dist/views/commands' : 'src/views/commands';

await registerGlobalCommands({
    dir: commandsDir,
    // ...
})
```





