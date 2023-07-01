// router.ts

import { Router, Route } from 'discord.js-mvc'
import { pingController } from './controllers/ping.controller'
import { ChatInputCommandInteraction, type Message } from 'discord.js'
import { Context } from './context'

export const router = new Router()
    .add(
        new Route<Context<ChatInputCommandInteraction>>('ping', pingController),
        new Route<Context<Message>>(/ping/, async (ctx) => {
            await ctx.message.reply('pong')
        })
    )