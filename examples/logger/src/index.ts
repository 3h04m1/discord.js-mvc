import { Client, Events, GatewayIntentBits} from "discord.js";
import { router } from "./router";

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});

client.on(Events.ClientReady, () => {
    console.log("Ready!");
});

client.on(Events.InteractionCreate, async (ctx) => {
    await router.handle(ctx);
});

client.login("token");