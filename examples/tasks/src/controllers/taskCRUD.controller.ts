import { ButtonInteraction, ModalSubmitInteraction } from "discord.js";
import { Controller } from "discord.js-mvc";
import { Task } from "../models/task.entity";
import db from "../db";
import { newTaskModal } from "../views/modals/newTask.modal";
import taskCard from "../views/messages/taskCard.message";

const taskRepository = db.getRepository(Task);

export class TaskCrud {
    
    static deleteTask: Controller<ButtonInteraction> = async (interaction, params ) => {
        const { taskId } = params;
        await interaction.deferReply();
        const task = await taskRepository.findOne({
            where: {
                id: parseInt(taskId)
            }
        });
        await taskRepository.delete({
            id: parseInt(taskId)
        });
        await interaction.editReply({
            content: `Task "${task.title}" deleted!`
        });
    };

    static editTask: Controller<ButtonInteraction> = async (interaction, params) => {
        const { taskId } = params;
        const task = await taskRepository.findOne({
            where: {
                id: parseInt(taskId)
            }
        });
        console.log(task);
        await interaction.showModal(newTaskModal({
            title: `Edit Task: ${task.title.slice(0, 20) + (task.title.length > 20 ? "..." : "")}`,
            id: `edit-task-modal/${task.id}`,
            oldData: {
                title: task.title,
                description: task.description
            }
        }))
    }

    static editTaskModal: Controller<ModalSubmitInteraction> = async (interaction, params) => {
        const { taskId } = params;
        const data = {
            title: interaction.fields.getTextInputValue("title"),
            description: interaction.fields.getTextInputValue("description")
        }
        const task = await taskRepository.findOne({
            where: {
                id: parseInt(taskId)
            }
        });
        if (!task) {
            await interaction.reply({
                content: "Task not found!",
            });
            return;
        }
        task.title = data.title;
        task.description = data.description;
        await taskRepository.save(task);
        await interaction.reply({
            content: taskCard(task, "Task updated!"),
            ephemeral: true
        });
    };

    static completeTask: Controller<ButtonInteraction> = async (interaction, params) => {
        const { taskId } = params;
        await interaction.deferReply();
        const task = await taskRepository.findOne({
            where: {
                id: parseInt(taskId)
            }
        });
        task.completed = true;
        await taskRepository.save(task);
        await interaction.editReply({
            content: `Task "${task.title}" completed!`
        });
    }
}