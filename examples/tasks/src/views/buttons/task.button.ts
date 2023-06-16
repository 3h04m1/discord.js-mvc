import { ButtonBuilder, ButtonStyle } from "discord.js";

export const deleteTaskButton = (id: number): ButtonBuilder => new ButtonBuilder()
    .setCustomId(`delete-task/${id}`)
    .setLabel("Delete")
    .setStyle(ButtonStyle.Danger);

export const editTaskButton = (id: number): ButtonBuilder => new ButtonBuilder()
    .setCustomId(`edit-task/${id}`)
    .setLabel("Edit")
    .setStyle(ButtonStyle.Primary);

export const completeTaskButton = (id: number): ButtonBuilder => new ButtonBuilder()
    .setCustomId(`complete-task/${id}`)
    .setLabel("Complete")
    .setStyle(ButtonStyle.Success);
