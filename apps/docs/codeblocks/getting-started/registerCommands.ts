import { registerGlobalCommands, registerGuildCommands } from "discord.js-mvc";

const {APP_ID, TOKEN, GUILD_ID} = process.env;

// check if the environment variables are set
if (!APP_ID || !TOKEN || !GUILD_ID) {
    throw new Error('Missing environment variables')
}

function registerSuccess(data: unknown): void {
    const commands = data as any[]
    console.log(`Successfully registered ${commands.length} global commands`)
}

function registerError(error: Error): void {
    console.log(error)
}

// Register global commands
registerGlobalCommands({
    app: {
        clientId: APP_ID,
        token: TOKEN
    },
    dir: '/src/views/commands',
    },
    registerSuccess,
    registerError
)

// Register guild commands
registerGuildCommands({
    app: {
        clientId: APP_ID,
        token: TOKEN,
        guildId: GUILD_ID
    },
    dir: '/src/views/commands',
    },
    registerSuccess,
    registerError
)
