// views/commands/ping.command.ts

import {SlashCommandBuilder} from 'discord.js'

export default new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')