import { CommandInteraction } from "discord.js";
import { Controller } from "discord.js-mvc";

import { newTaskModal } from "../views/modals/newTask.modal";
import { Context } from "../types";

export const newTaskController: Controller<Context<CommandInteraction>> = async (ctx) => {
    const { interaction } = ctx;
    await interaction.showModal(newTaskModal({
        title: "New Task",
        id: "new-task-modal"
    }))
};