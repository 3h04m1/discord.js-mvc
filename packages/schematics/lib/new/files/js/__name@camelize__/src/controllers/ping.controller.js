export const pingController = (ctx) => {
    if (!ctx.interaction &&
        !ctx.interaction.isChatInputCommandInteraction()) return
    ctx.interaction.reply('Pong!')
}