"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("set-key")
    .setDescription("Set a key")
    .addStringOption(option => option.setName("key").setDescription("The key").setRequired(true))
    .addStringOption(option => option.setName("value").setDescription("The value").setRequired(true));
