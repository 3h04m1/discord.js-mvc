"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.completeTaskButton = exports.editTaskButton = exports.deleteTaskButton = void 0;
const discord_js_1 = require("discord.js");
const deleteTaskButton = (id) => new discord_js_1.ButtonBuilder()
    .setCustomId(`delete-task/${id}`)
    .setLabel("Delete")
    .setStyle(discord_js_1.ButtonStyle.Danger);
exports.deleteTaskButton = deleteTaskButton;
const editTaskButton = (id) => new discord_js_1.ButtonBuilder()
    .setCustomId(`edit-task/${id}`)
    .setLabel("Edit")
    .setStyle(discord_js_1.ButtonStyle.Primary);
exports.editTaskButton = editTaskButton;
const completeTaskButton = (id) => new discord_js_1.ButtonBuilder()
    .setCustomId(`complete-task/${id}`)
    .setLabel("Complete")
    .setStyle(discord_js_1.ButtonStyle.Success);
exports.completeTaskButton = completeTaskButton;
