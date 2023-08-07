import { Client, GatewayIntentBits } from 'discord.js'
import { registerGlobalCommands } from 'discord.js-mvc'
import { router } from './router'
import { config } from 'dotenv'
import path from 'node:path'

config()

const { CLIENT_ID, TOKEN } = process.env

if (!CLIENT_ID || !TOKEN) {
  throw new Error('Missing CLIENT_ID or TOKEN env variable')
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
})

client.on('ready', () => {
  console.log('Ready!')
})

client.on('interactionCreate', async (interaction) => {
  await router.handle(interaction)
})

registerGlobalCommands(
  {
    app: {
      clientId: CLIENT_ID,
      token: TOKEN,
    },
    dir: path.join('src', 'views', 'commands'),
  },
  (data) => {
    const commands = data as any[]
    console.log(`Registered ${commands.length} global commands`)
  }
)

client.login(TOKEN)
