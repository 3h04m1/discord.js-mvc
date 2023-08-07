export const <%=camelize(name)%> = async(ctx) => {
    const { interaction } = ctx
    if (
        interaction.isAutocomplete()
    ) return
    await interaction.reply({
        content: "<%=camelize(name)%>",
        ephemeral: true
    })
}