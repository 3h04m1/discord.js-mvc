import { type Plugin } from "discord.js-mvc"

// import your type of interaction that you want to use, 
// also you can import the message type if you want to use it
// check if the import is correct
import { type Context } from "../context"


export const <%=camelize(name)%>Plugin : Middleware<Context<any>> = async (ctx) => {
    // write you plugin
    ctx.<%=camelize(name)%> = "<%=camelize(name)%>"
}