import { Router, Route } from 'discord.js-mvc'
import { ChatInputCommandInteraction } from 'discord.js'
import { Context } from '.context'

export const router = new Router()
    .add(
        new Route<Context<ChatInputCommandInteraction>>('ping', async (ctx) => {
            await ctx.interaction.reply('Pong!')
        }),
        // ... more routes
    )
