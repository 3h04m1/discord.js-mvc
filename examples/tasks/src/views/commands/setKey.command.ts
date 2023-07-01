import { SlashCommandBuilder } from "discord.js";

export default new SlashCommandBuilder()
    .setName("set-key")
    .setDescription("Set a key")
    .addStringOption(option => option.setName("key").setDescription("The key").setRequired(true))
    .addStringOption(option => option.setName("value").setDescription("The value").setRequired(true))
    
    