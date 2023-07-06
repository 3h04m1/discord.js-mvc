import {type Controller } from "discord.js-mvc"
import {ChatInputCommandInteraction} from "discord.js"
import {type Context } from "../context"

export const pingController: Controller<Context<ChatInputCommandInteraction>> = (ctx) => {
    ctx.reply('Pong!')
}