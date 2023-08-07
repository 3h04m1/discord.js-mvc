export const <%=camelize(name)%> = async(ctx) => {
    if (ctx.isMessage()) {
        return
    }
    const { interaction } = ctx
    if (
        interaction.isAutocomplete()
    ) return
    await interaction.reply({
        content: "<%=camelize(name)%>",
        ephemeral: true
    })
}