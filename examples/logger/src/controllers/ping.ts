import { CommandInteraction } from "discord.js";
import { Controller } from "discord.js-mvc";

export const pingController: Controller<CommandInteraction> = async (ctx) => {
    await ctx.reply("Pong!");
};