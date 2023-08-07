import { Router, Route } from "discord.js-mvc";
import { pingController } from "./controllers/ping.controller"


/**
 * The router that will handle all interactions and messages
 * here you can add your routes, middlewares and error handlers
 * @method add - add a route to the router
 * @method use - add a middleware to the router
 * @method plugin - add a plugin to the router
 */
export const router = new Router()
    .add(
        new Route('ping', pingController),
    )