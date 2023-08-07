"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
exports.default = new discord_js_1.SlashCommandBuilder()
    .setName("get-key")
    .setDescription("Get a key")
    .addStringOption(option => option.setName("key").setDescription("The key").setRequired(true));
