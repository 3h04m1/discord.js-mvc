import { Route } from "discord.js-mvc"

export default Route.manager.group({
    middlewares: [],
    routes: [],
    prefix: "<%=camelize(name)%>."
})

// import this in your router
// Example:
// const <%=camelize(name)%> = require("./apps/<%=camelize(name)%>")
// router.add(<%=camelize(name)%>)