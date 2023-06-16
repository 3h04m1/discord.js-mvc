import { Controller } from "discord.js-mvc";
import { Task } from "../models/task.entity";
import db from "../db";
import taskCard from "../views/messages/taskCard.message";
import { ActionRowBuilder, ButtonBuilder, CommandInteraction } from "discord.js";
import { completeTaskButton, deleteTaskButton, editTaskButton } from "../views/buttons/task.button";

export const listTaskController: Controller<CommandInteraction> = async (interaction) => {
    const taskRepository = db.getRepository(Task);
    const tasks = await taskRepository.find({
        where: {
            userId: interaction.user.id
        }
    });
    await interaction.deferReply();
    if (tasks.length === 0) {
        await interaction.editReply({
            content: "You don't have any tasks yet!"
        });
        return;
    }
    await interaction.editReply({
        content: "Here are your tasks:"
    });
    for (const task of tasks) {
        await interaction.followUp({
            content: taskCard(task, "Task updated!"),
            components: [
                new ActionRowBuilder<ButtonBuilder>()
                    .addComponents([
                        deleteTaskButton(task.id),
                        editTaskButton(task.id),
                        completeTaskButton(task.id)
                    ]
                    )
            ]
        });
    }
};