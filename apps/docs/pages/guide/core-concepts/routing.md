# Routing
For routing, `discord.js-mvc` provides 3 built-in helper-classes:
- `Router` - This class is used to create a new router.
- `Route` - This class is used to create a new route.
- `RouteManager` - This class is used to manage routes and create route groups.

Here you will find everything you need to know about routing:
[[toc]]
___
## Route
The `Route` class is used to create a new route.
By itself, it doesn't do anything, but it is used by the `Router` class to create routes.
The `Route` class has 1 generic type that represents the type of the context.
@[code{7-9}](../../../codeblocks/routing/router.ts)
It also has 2 properties:
- `name` - The name of the route.
- `controller` - The controller function of the route. This function will be executed when the route is triggered.

### Controller
The controller function is a function that will be executed when the route is triggered 
It can be an anonymous function or a function that you create in a separate file.

#### Anonymous function
As mentioned before, this method is not recommended since is not maintainable
and in the future, you will have a hard time finding the controller function of a specific route.
@[code{7-9}](../../../codeblocks/routing/router.ts)

#### Separate file
This method is recommended as it is more maintainable and you can easily 
reuse the controller function in other routes.

@[code](../../../codeblocks/getting-started/controllers/ping.controller.ts)

### Route parameters
Adding parameters to the route is the same as in [express](https://expressjs.com/en/guide/routing.html).
You can add parameters to the route by adding a colon `:` before the parameter name.
When adding parameters to the route, you have to add them to the controller function as well.
```ts
new Route<Context<ButtonInteraction>>('post/like/:id', async (ctx) => {
    const { params } = ctx // or you can use ctx.params
    await ctx.reply(`You liked post with id ${params.id}`)
})
```
#### Why do we need route parameters?
This is very useful when you have some components that are targeting some specific data.
This way you can pass the data in the route parameters and use it in the controller function.

::: warning
Keep in mind that customId of the components can't be longer than 100 characters. So you have to keep the route parameters short.
:::

### Route middleware
You can add middleware for every single route.
The middleware will be executed before the controller function.
```ts
new Route<Context<ButtonInteraction>>('ping', async (ctx) => {
    await interaction.reply('pong')
}).use(middleware1, middleware2)
```
This is useful when you want to add some middleware to a specific route. Like checking if the user is an admin or not.
For more information about middleware, check [Middleware](../getting-started/middleware.md).


## Router
The `Router` class is used to create a new router.

@[code{1-5}](../../../codeblocks/routing/router.ts)
### Adding a route
To add one or more routes to the router, you can use the `add` method.
The Router class has a generic type that represents the type of the interaction so you can use it to type the interaction of the routes.
Also for controller, you can write an anonymous function, or as shown in [Ping Pong Example](../getting-started/index.md), you can create a controller function and pass it to the `add` method.
For this example, we will use an anonymous function with the `CommandInteraction` type.
@[code](../../../codeblocks/routing/router.ts)
### Adding a route group
The route group is a group of routes that share some common properties.
Most of the time, you will share the middleware between the routes of the same group.
Also, in some cases, you can share a prefix for the routes of the same group.
(eg. For buttons, you can share the customId prefix for the routes of the same group)

```ts
const router = new Router()
    .add(
        Router.manager.group({
            middleware: [middleware1, middleware2],
            prefix: 'prefix.',
            routes: [
                new Route<Context<ButtonInteraction>>('route1', controller1),
                new Route<Context<ButtonInteraction>>('route2', controller2)
            ]
        })
    )
```
The `customId` of the routes will be `prefix.route1` and `prefix.route2`. 
This is useful when you have 3 buttons in the same action row and you want to
name them according to their function.

Also there is a chance that you will have a button with the same name in another action row, so you can use the prefix to differentiate between them.
#### Example
Let's say you have a button to play a song, a button to pause a song, and a button to stop a song.
You can create a route group for these 3 buttons and name them `play`, `pause`, and `stop` respectively.
There is a chance that you will have a button with the same name in another action row, so you can use the prefix to differentiate between them.
This way you can name the buttons `music.play`, `music.pause`, and `music.stop` respectively.

```ts
Router.manager.group({
    middleware: [middleware1, middleware2],
    prefix: 'music.',
    routes: [
        new Route<Context<ButtonInteraction>>('play', playController),
        new Route<Context<ButtonInteraction>>('pause', pauseController),
        new Route<Context<ButtonInteraction>>('stop', stopController)
    ]
})
```

### Router middleware
You can add middleware to the router using the `use` method.
The middleware will be executed before any route.
```ts
router.use(middleware1, middleware2)
```