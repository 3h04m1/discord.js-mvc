export const pingController = (ctx) => {
    // we need to check if the interaction is a command interaction
    // this is because the interactionCreate event is fired for all interactions
    // and not all contexts will have an interaction (e.g. messageCreate)
    if (!!ctx.interaction && ctx.interaction.isChatInputCommandInteraction())
        return
    ctx.interaction.reply('Pong!')
}