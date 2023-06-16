// src/index.ts

import {Client, GatewayIntentBits, Events} from 'discord.js'
import { router } from './router'

const TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})

client.on(Events.ClientReady, (client) => {
    console.log(`Logged in as ${client.user?.tag}`)
})

client.on(Events.InteractionCreate, async (interaction) => {
    await router.handle(interaction)
})

client.login(TOKEN)