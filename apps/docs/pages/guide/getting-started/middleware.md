# Middleware
The middleware is a function that will be executed before a specific route or before all routes.
Middlewares can be used to do some checks before executing the route or to do some actions that are common between routes
(eg. Logging the interaction).
## Creating a middleware
To create a middleware, you need to create a function that takes 2 parameters: `interaction` and `next`.
The `interaction` parameter is the interaction that will be executed after the middleware.
The `next` parameter is a function that will execute the next middleware or the route controller function.
```ts
const middleware: Middleware = async (interaction, next) => {
    // Do something
    await next()
}
```
To execute the next middleware or the route controller function, you need to call the `next` function.
If you don't call the `next` function, the route controller function will not be executed.
This is useful when you want to do some checks before executing the route controller function and you want to stop the execution if the checks fail.
For example, you can check if the user is an admin or not and if the user is not an admin, you can stop the execution.
```ts
const middleware: Middleware = async (interaction, next) => {
    if (interaction.member.permissions.has('ADMINISTRATOR')) {
        await next()
    }
    else {
        await interaction.reply('You are not an admin')
    }
}
```
This way, if the user is not an admin, the route controller function will not be executed
and you only need to write the check once instead of writing it in every route controller function.
Then you can add the middleware to specific route, a group of routes, or to the entire router.

## Typing the middleware
You can type the middleware by adding a generic to the `Middleware` type.
This can be usefull when you are creating a middleware that will be used for a specific interaction type.
```ts
const middleware: Middleware<ButtonInteraction> = async (interaction, next) => {
    console.log(interaction.customId)
    await next()
}
```
You can add the general Interaction type to the generic to use the middleware for all interaction types.
```ts
const middleware: Middleware<Interaction> = async (interaction, next) => {
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

