import { SlashCommandBuilder } from "discord.js";

export default new SlashCommandBuilder()
    .setName("list-tasks")
    .setDescription("List all tasks");