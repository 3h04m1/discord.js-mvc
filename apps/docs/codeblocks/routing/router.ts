import { Router, Route} from 'discord.js-mvc'
import {CommandInteraction} from 'discord.js'

export const router: Router = new Router()
    .add(
        new Route<CommandInteraction>('ping', async(interaction) => {
            await interaction.reply('Pong!')
        })
        // ... more routes
    )