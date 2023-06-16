// src/index.ts

import {Client, GatewayIntentBits, Events} from 'discord.js'

const TOKEN = process.env.DISCORD_TOKEN

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages]
})

client.on(Events.ClientReady, (client) => {
    console.log(`Logged in as ${client.user?.tag}`)
})

client.login(TOKEN)