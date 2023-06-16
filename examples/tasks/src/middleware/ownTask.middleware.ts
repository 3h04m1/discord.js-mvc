import { ButtonInteraction } from "discord.js";
import { Middleware } from "discord.js-mvc";
import { Task } from "../models/task.entity";
import db from "../db";

interface OwnTaskMiddlewareParams {
    taskId: string;
}

export const ownTaskMiddleware: Middleware<ButtonInteraction> = async (interaction, next, params: OwnTaskMiddlewareParams) => {
    const { taskId } = params;
    const taskRepository = db.getRepository(Task);
    const task = await taskRepository.findOne({
        where: {
            id: parseInt(taskId)
        }
    });

    if (task.userId !== interaction.user.id) {
        await interaction.reply({
            content: "You can't do that!",
            ephemeral: true
        });
        return;
    }
    next();
};