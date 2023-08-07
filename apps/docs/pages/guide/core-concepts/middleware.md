# Middleware
The middleware is a function that will be executed before a specific route or before all routes.
Middlewares can be used to do some checks before executing the route or to do some actions that are common between routes
(eg. Logging the interaction).

You can add create a middleware in 2 ways:
1. Manually create a middleware function and pass it to the `use` method.
2. Use the `generate` command to generate a middleware file and then export the middleware function from it.

```bash
djs-mvc generate middleware middleware1
# or
djs-mvc g m middleware1
```

## Creating a middleware
To create a middleware, you need to create a function that takes 2 parameters: `interaction` and `next`.
The `interaction` parameter is the interaction that will be executed after the middleware.
The `next` parameter is a function that will execute the next middleware or the route controller function.
```ts
const middleware: Middleware = async (ctx, next) => {
    // Do something
    await next()
}
```
To execute the next middleware or the route controller function, you need to call the `next` function.
If you don't call the `next` function, the route controller function will not be executed.
This is useful when you want to do some checks before executing the route controller function and you want to stop the execution if the checks fail.
For example, you can check if the user is an admin or not and if the user is not an admin, you can stop the execution.
```ts

// This is an example, you should have a better way to check if the user is an admin or not
function isAdmin(user) {
    return user.permissions.has('ADMINISTRATOR')
}

const middleware: Middleware = async (ctx, next) => {
    let user = ctx.isInteraction() ? ctx.interaction.user : ctx.message.author
    isAdmin(user) ? await next() : await ctx.reply('You are not an admin')
}
```
This way, if the user is not an admin, the route controller function will not be executed
and you only need to write the check once instead of writing it in every route controller function.
Then you can add the middleware to specific route, a group of routes, or to the entire router.

::: warning
Keep in mind that the middleware does not know the type of context so will have to check it yourself
using the `isInteraction` or `isMessage` methods.
:::
## Typing the middleware
You can type the middleware by adding a generic to the `Middleware` type.
This can be usefull when you are creating a middleware that will be used for a specific interaction type.
```ts
const middleware: Middleware<Context<ButtonInteraction>> = async (ctx, next) => {
    console.log(ctx.interaction.customId)
    await next()
}
```
::: warning
You should use a typed middleware only if you are sure that the middleware will 
be used only for a specific context type like in Route Groups.
:::
You can add the general Interaction type to the generic to make the middleware work with all interaction types.
```ts
const middleware: Middleware<Context<Interaction>> = async (ctx, next) => {
    const { interaction } = ctx
    if (interaction.isButton()) {
        console.log(interaction.customId)
    }
    else if (interaction.isCommand()) {
        console.log(interaction.commandName)
    }
    else {
        console.log('The interaction is not a button or a command')
    }
}
```
## Adding a middleware
To add a middleware to a route, you can use the `use` method.
```ts
new Route<ButtonInteraction>('ping', async (interaction) => {
    await interaction.reply('pong')
}).use(middleware1, middleware2)
```
You can also add a middleware to a group of routes.
```ts
Router.manager.group({
    middleware: [middleware1, middleware2],
    routes: [
        new Route<ButtonInteraction>('route1', controller1),
        new Route<ButtonInteraction>('route2', controller2),
        new Route<ButtonInteraction>('route3', controller3)
    ]
})
```

## Middleware order
The order of the middleware is important.
The middleware will be executed in the order they are added to the route or the group.
```ts
new Route<ButtonInteraction>('ping', async (interaction) => {
    await interaction.reply('pong')
}).use(middleware1, middleware2)
```
In this example, the `middleware1` will be executed before the `middleware2`.
If you want to execute the `middleware2` before the `middleware1`, you need to change the order.
```ts
new Route<ButtonInteraction>('ping', async (interaction) => {
    await interaction.reply('pong')
}).use(middleware2, middleware1)
```

## Middleware execution
You can choose to execute the middleware before or after the route controller function.
Just call the `next` function before or after your code.

For example, let's say you want to log the execution time of the route controller function.
You can do it like this:
```ts
const middleware: Middleware = async (ctx, next) => {
    const start = Date.now()
    await next()
    const end = Date.now()
    console.log(`The route took ${end - start}ms to execute`)
}
```

## Use cases
Middlewares are powerful and can be used in many ways.
Here are some examples of what you can do with middlewares:
- Limit the access to a route to a specific user or a group of users
- Log the interactions, messages, errors, etc...
- Create guards to check if the user has the permission to execute a certain action
- Check if the user is a bot or not
- Make an anti-spam system
- etc...

::: tip
If you have an implementation of a middleware that you think can be useful for other people, feel free to open a PR to add it to the 
[middlewares list](#) 

