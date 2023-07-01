// controllers/ping.controller.ts

import {Controller} from 'discord.js-mvc'
import {ChatInputCommandInteraction} from 'discord.js'
import { Context } from '../context'

export const pingController: Controller<Context<ChatInputCommandInteraction>> = async (ctx) => {
    await ctx.interaction.reply('Pong!')
}

