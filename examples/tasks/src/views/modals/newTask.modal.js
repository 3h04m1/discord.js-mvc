"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTaskModal = void 0;
const discord_js_1 = require("discord.js");
const newTaskModal = (data) => {
    var _a, _b;
    const titleInput = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.TextInputBuilder()
        .setCustomId("title")
        .setStyle(discord_js_1.TextInputStyle.Short)
        .setLabel("Title")
        .setPlaceholder("Title")
        .setMinLength(3)
        .setMaxLength(100)
        .setValue(((_a = data.oldData) === null || _a === void 0 ? void 0 : _a.title) || "Task Title"));
    const descriptionInput = new discord_js_1.ActionRowBuilder()
        .addComponents(new discord_js_1.TextInputBuilder()
        .setCustomId("description")
        .setPlaceholder("Description")
        .setMinLength(10)
        .setMaxLength(4000)
        .setLabel("Description")
        .setStyle(discord_js_1.TextInputStyle.Paragraph)
        .setValue(((_b = data.oldData) === null || _b === void 0 ? void 0 : _b.description) || "Task Description"));
    const modal = new discord_js_1.ModalBuilder()
        .setTitle(data.title)
        .setCustomId(data.id)
        .addComponents(titleInput, descriptionInput);
    return modal;
};
exports.newTaskModal = newTaskModal;
