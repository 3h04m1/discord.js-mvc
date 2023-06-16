# Controllers
Controllers are the foundation of your application's business logic. 
The are responsible for handling the interaction, they are the final destination of the interaction.
___
`discord.js-mvc` doesn't provide any built-in controllers, but it provides a way to create and type your own controllers.
## Controller
A controller is a function that will be executed when the route is triggered.
It can be an anonymous function or a function that you create in a separate file.
We strongly recommend using a separate file for each controller. This way you can easily manage your controllers.
### Anonymous function
```ts
new Route<ButtonInteraction>('ping', async (interaction) => {
    await interaction.reply('pong')
})
```

### Separate file
```ts
// controllers/ping.ts
export const pingController:Controller<CommandInteraction> = async (interaction) => {
    await interaction.reply('pong')
}
```
## Controller parameters
### The function's parameters
The controller function can have 2 parameters:
- `interaction` - The interaction that triggered the route.
- `params` - The route parameters (optional). Only interactions with customId can have route parameters.

### Controller types and generics
Typeing the controller function is optional, but it is recommended.
It makes easier to work with the interaction as the default interaction type is 
`Interaction` and it can become frustrating to check the type of the interaction every time.

```ts
client.on(Events.InteractionCreate, (interaction)=>{
    if(interaction.isButton()){
        // interaction is ButtonInteraction
    }else if(interaction.isCommand()){
        // interaction is CommandInteraction
    }
    // ...
})
```
To avoid this, you can type the controller function and provide the type of the interaction 
as a generic type of the `Route` class in case of anonymous function or as a generic type of the `Controller` type in case of separate file.
```ts
// anonymous function
new Route<ButtonInteraction>('ping', async (interaction) => {
    await interaction.reply('pong')
})
// separate file
export const pingController:Controller<CommandInteraction> = async (interaction) => {
    await interaction.reply('pong')
}
```