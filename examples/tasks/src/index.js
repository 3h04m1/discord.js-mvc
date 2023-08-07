"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const discord_js_mvc_1 = require("discord.js-mvc");
const router_1 = require("./router");
const dotenv_1 = require("dotenv");
const node_path_1 = __importDefault(require("node:path"));
(0, dotenv_1.config)();
const { CLIENT_ID, TOKEN } = process.env;
if (!CLIENT_ID || !TOKEN) {
    throw new Error('Missing CLIENT_ID or TOKEN env variable');
}
const client = new discord_js_1.Client({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.MessageContent,
    ],
});
client.on('ready', () => {
    console.log('Ready!');
});
client.on('interactionCreate', (interaction) => __awaiter(void 0, void 0, void 0, function* () {
    yield router_1.router.handle(interaction);
}));
(0, discord_js_mvc_1.registerGlobalCommands)({
    app: {
        clientId: CLIENT_ID,
        token: TOKEN,
    },
    dir: node_path_1.default.join('src', 'views', 'commands'),
}, (data) => {
    const commands = data;
    console.log(`Registered ${commands.length} global commands`);
});
client.login(TOKEN);
