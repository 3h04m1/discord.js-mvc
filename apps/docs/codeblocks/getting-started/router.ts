import {Router, Route } from 'discord.js-mvc'
import { pingController } from './controllers/pingController'
import { CommandInteraction } from 'discord.js'

export const router = new Router()
    .add(
        new Route<CommandInteraction>('ping', pingController)
    )