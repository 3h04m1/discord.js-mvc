// src/views/commands/ping.ts

import {SlashCommandBuilder} from 'discord.js'

export default new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Replies with pong!')