export const <%=camelize(name)%>Middleware = async (ctx, next) => {
    if (ctx.isMessage()) {
        // write you middleware for message
    }
    // write you middleware for interaction
    await next()
}