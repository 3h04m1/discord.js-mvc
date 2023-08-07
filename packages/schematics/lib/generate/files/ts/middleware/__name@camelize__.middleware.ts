import { type Middleware } from "discord.js-mvc"

// import your type of interaction that you want to use, 
// also you can import the message type if you want to use it
// check if the import is correct
import { type Context } from "../context"


export const <%=camelize(name)%>Middleware : Middleware<Contex<any>> = async (ctx, next) => {
    if (ctx.isMessage()) {
        // write you middleware for message
    }
    // write you middleware for interaction
    await next()
}