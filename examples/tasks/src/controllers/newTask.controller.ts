import { CommandInteraction } from "discord.js";
import { Controller } from "discord.js-mvc";

import { newTaskModal } from "../views/modals/newTask.modal";

export const newTaskController: Controller<CommandInteraction> = async (interaction) => {
    await interaction.showModal(newTaskModal({
        title: "New Task",
        id: "new-task-modal"
    }))
};