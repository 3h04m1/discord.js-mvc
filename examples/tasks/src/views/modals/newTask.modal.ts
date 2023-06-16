import { ModalBuilder, TextInputBuilder, ActionRowBuilder, TextInputStyle } from "discord.js";

interface TaskModalProps {
    title: string;
    id: string;
    oldData?: TaskData;
}

interface TaskData {
    title: string;
    description: string;
}


export const newTaskModal = (data: TaskModalProps) => {
    const titleInput = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
            new TextInputBuilder()
                .setCustomId("title")
                .setStyle(TextInputStyle.Short)
                .setLabel("Title")
                .setPlaceholder("Title")
                .setMinLength(3)
                .setMaxLength(100)
                .setValue(data.oldData?.title || "Task Title")
                

        )

    const descriptionInput = new ActionRowBuilder<TextInputBuilder>()
        .addComponents(
            new TextInputBuilder()
                .setCustomId("description")
                .setPlaceholder("Description")
                .setMinLength(10)
                .setMaxLength(4000)
                .setLabel("Description")
                .setStyle(TextInputStyle.Paragraph)
                .setValue(data.oldData?.description || "Task Description")
        )

    


    const modal = new ModalBuilder()
        .setTitle(data.title)
        .setCustomId(data.id)
        .addComponents(titleInput, descriptionInput)
    return modal;
}