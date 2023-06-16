import {Controller} from 'discord.js-mvc'
import {CommandInteraction} from 'discord.js'

export const pingController: Controller<CommandInteraction> = async (interaction) => {
    await interaction.reply('Pong!')
}

