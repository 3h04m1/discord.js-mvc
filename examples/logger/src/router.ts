import { Router, Route } from "discord.js-mvc";
import { loggerMiddleware } from "./middleware/logger";
import { pingController} from "./controllers/ping";

export const router = new Router()
    .use(loggerMiddleware())
    .add(
        new Route('ping', pingController)
    )