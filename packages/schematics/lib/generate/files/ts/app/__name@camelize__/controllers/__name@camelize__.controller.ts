import { type Controller } from "discord.js-mvc"

// import your type of interaction that you want to use, 
// also you can import the message type if you want to use it
import { type Interaction } from "discord.js"
// check if the import is correct
import { type Context } from "../context"


export const <%=camelize(name)%>Controller : Controller<Context<Interaction>> = async (ctx) => {
    const { interaction } = ctx
    if (
        interaction.isAutocomplete() 
    ) return
    await interaction.reply({
        content: "<%=camelize(name)%>",
        ephemeral: true
    })
}