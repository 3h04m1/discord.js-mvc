// router.ts

import { Router, Route } from 'discord.js-mvc'
import { pingController } from './controllers/ping.controller'
import { ChatInputCommandInteraction } from 'discord.js'
import { Context } from './context'

export const router = new Router()
    .add(
        new Route<Context<ChatInputCommandInteraction>>('ping', pingController)
    )