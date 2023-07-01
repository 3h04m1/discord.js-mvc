import { Plugin } from "discord.js-mvc/@types/base/Context";
import { Session } from "./Session";
import { Storage } from "./types";
export * from './Storage';

export function SessionPlugin(storage: Storage, initialData: Record<string,string>): Plugin{
    return (ctx) => {
        if (ctx.isInteraction()){
            
            const userID = ctx.interaction.user.id;
            const session = new Session(storage, initialData, userID);
            (ctx as any).session = new Session(storage, initialData, userID);
        }
        else if (ctx.isMessage()){
            const userID = ctx.message.author.id;
            (ctx as any).session = new Session(storage, initialData, userID);
        }
    }
}