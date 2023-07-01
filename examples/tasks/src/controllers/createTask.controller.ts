import { Controller } from "discord.js-mvc";
import {ModalSubmitInteraction} from "discord.js"
import { Task } from "../models/task.entity";
import db from "../db";
import taskCard from "../views/messages/taskCard.message";
import { Context } from "../types";

export const createTaskController: Controller<Context<ModalSubmitInteraction>> = async (ctx) => {
    const { interaction } = ctx;
    const data = {
        title: interaction.fields.getTextInputValue("title"),
        description: interaction.fields.getTextInputValue("description")
    }
    const task = new Task();
    task.title = data.title;
    task.description = data.description;
    task.userId = interaction.user.id;
    const createdTask = await db.manager.save(task);
    
    await interaction.reply({
        content: taskCard(createdTask, "Task created!"),
        ephemeral: true
    })
};