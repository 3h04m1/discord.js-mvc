import { SlashCommandBuilder } from "discord.js";

export default new SlashCommandBuilder()
    .setName("get-key")
    .setDescription("Get a key")
    .addStringOption(option => option.setName("key").setDescription("The key").setRequired(true))