# Ping Pong Bot

This guide is a step-by-step tutorial on how to create a simple ping pong bot using `discord.js-mvc`.
The guide will walk you through the entire process of creating a bot from scratch.

The guide will cover the following topics:
[[toc]]

---

For beginning, you need to create a new file called `index.js` in the root of your project. This file will be the entry point of your bot.

@[code](../../codeblocks/getting-started/index.ts)

## Create the router

To create the router, we will create a new file called `router.ts` in the root of our project.
Inside this file, we will import 2 classes from `discord.js-mvc`:

- `Router` - This class is used to create a new router.
- `Route` - This class is used to create a new route.
  Also, we will import the `pingController` from the `controllers` folder.

@[code{1-8}](../../codeblocks/getting-started/router.ts)

## Add the router to the bot

Now that we have our router, we can add it to the bot. To do so, we will import
the `router` from the `router.ts` file and then we will add it in the main `index.ts`
file to handle all the interactions and messages.

@[code ts{16-18,20-22}](../../codeblocks/getting-started/indexWithRouter.ts)

## Create a Slash Command

We will create a slash command called `ping`. This command will respond with `Pong!` when executed.
To store all the commands, we will create a new folder called `views` in the root of our project. Inside this folder, we will create a new folder called `commands` and inside this folder, we will create a new file called `ping.ts`.

@[code](../../codeblocks/getting-started/views/commands/ping.command.ts)

## Create the Context type

Since we are using TypeScript, we need to create a new type called `Context`
so we can use intelisense and type checking.

For this, we will create a new file called `context.ts` in the root of our project.

@[code](../../codeblocks/getting-started/context.ts)

Later, based on what plugins you are using, you can extend the `Context` type to add more properties.

::: warning
Don't forget to use the generic type when creating the Context type, this way you can set the type of Context as
MessageContext or InteractionContext by passing the type as a generic.
Example: `Context<Message>` or `Context<Interaction>`
Also for the better experience, for InteractionContext, you can use the type of interaction as a generic - `Context<ChatInputCommandInteraction>` or `Context<ButtonInteraction>` etc.
:::

## Create a Controller

To create a controller, we will create a new folder called `controllers` in the root of our project. Inside this folder, we will create a new file called `ping.ts`.
As you can see, we are importing the `Context` type from the `context.ts` file 
and we are using it as a generic type so the `ctx` parameter will have the type of `Context<ChatInputCommandInteraction>`
and the `ctx.interaction` will have the type of `ChatInputCommandInteraction`.

@[code](../../codeblocks/getting-started/controllers/ping.controller.ts)

## Create a Route
Even though we have a controller, we still need to create a route that will handle the slash command.
To create and add a route to the router, we will use the `router`'s `add` method and we will pass the `Route` as a parameter.

@[code ts{4-5,9-10}](../../codeblocks/getting-started/router.ts)

## Create a Message Route (Optional)
Message commands are not supported by Discord anymore, but if you want to support them, you can create a new route for them.
We will use the same Route class as for the slash commands, but we will pass the `Message` as a generic type.
The first parameter of the `Route` class is the name of the route, in the Message Routes, the name is the message content
and always will be a `RegExp`.

Using the Message as a generic type, the `ctx` parameter will have the type of `Context<Message>` and the `ctx.message` will have the type of `Message`.

@[code ts{5,11-12}](../../codeblocks/getting-started/routerMessage.ts)

::: tip
You can pass the an anonymous function as a second parameter to the `add` 
method to handle the route, but it's recommended to use a controller since 
it's easier to maintain in a large project.
:::


## Register the commands
For the commands to work, we need to register them.

You can register the commands following the [official guide](https://discordjs.guide/creating-your-bot/command-deployment.html).
or `discord.js-mvc` provides a built-in to register guild and global commands.

@[code ts{20-29,32-42}](../../codeblocks/getting-started/registerCommands.ts)

::: tip
Since you need to specify the path from the root of your profect, you can set a production environment to make it easier to register the commands.

```.env
PRODUCTION=true
```

```ts
const { PRODUCTION } = process.env

const commandsDir = PRODUCTION ? 'dist/views/commands' : 'src/views/commands'

await registerGlobalCommands({
  dir: commandsDir,
  // ...
})
```
