import { Client, Events } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config();

const {
    TOKEN,
    CLIENT_ID,
} = process.env;

function validateEnv(...args: string[]) {
    args.forEach((arg) => {
        if (!arg) {
            throw new Error(`Missing env variable ${arg}`);
        }
    });
}

validateEnv(TOKEN, CLIENT_ID);

const client = new Client({
    intents: [

    ],
});

client.on('ready', () => {
    console.log('Ready!');
});

client.on(Events.MessageCreate, (message) => {
    if (message.author.bot) return;
});

client.on(Events.InteractionCreate, (interaction) => {
});

client.login(TOKEN);
