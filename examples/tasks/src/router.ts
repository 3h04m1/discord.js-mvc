import {Router, Route} from 'discord.js-mvc'
import { newTaskController } from './controllers/newTask.controller'
import { ButtonInteraction, ChatInputCommandInteraction, Message, ModalSubmitInteraction } from 'discord.js'
import { createTaskController } from './controllers/createTask.controller'
import { listTaskController } from './controllers/listTask.controller'
import { ownTaskMiddleware } from './middleware/ownTask.middleware'
import { TaskCrud } from './controllers/taskCRUD.controller'
import { Context } from './types'
import { FileStorage, InMemoryStorage, SessionPlugin } from './plugins/session'


export const router = new Router()
    .plugin(SessionPlugin(new FileStorage(
        process.cwd() + '/session.json'
    ), {}))
    .add(
        new Route<Context<ChatInputCommandInteraction>>('list-tasks', listTaskController),
        new Route<Context<ChatInputCommandInteraction>>('new-task', newTaskController),
        new Route<Context<ModalSubmitInteraction>>('new-task-modal', createTaskController),
        Route.manager.group({
            middlewares: [
             ownTaskMiddleware
            ],
            routes: [
                new Route<Context<ButtonInteraction>>('edit-task/:taskId', TaskCrud.editTask),
                new Route<Context<ButtonInteraction>>('delete-task/:taskId', TaskCrud.deleteTask),
                new Route<Context<ButtonInteraction>>('complete-task/:taskId', TaskCrud.completeTask),
                new Route<Context<ModalSubmitInteraction>>('edit-task-modal/:taskId', TaskCrud.editTaskModal)
            ]
        }),
        new Route<Context<Message>>(/test target/, (ctx) => {
            ctx.message.reply({
                content: 'test',
                target: ctx.message.author
            })
        }),
        Route.manager.group({
            routes: [
                new Route<Context<ChatInputCommandInteraction>>('get-key', async (ctx) => {
                    const {interaction} = ctx;
                    const key = interaction.options.getString('key');
                    const res = await ctx.session.get(key);
                    ctx.interaction.reply({
                        content: `The value of ${key} is ${res}`,
                        ephemeral: true
                    })
                }),
                new Route<Context<ChatInputCommandInteraction>>('set-key', async (ctx) => {
                    const {interaction} = ctx;
                    const key = interaction.options.getString('key')!;
                    const value = interaction.options.getString('value')!;
                    await ctx.session.set(key, value);
                    ctx.interaction.reply({
                        content: `The value of ${key} is now ${value}`,
                        ephemeral: true
                    })
                }),
                new Route<Context<Message>>(/set-me/, async (ctx) => {
                    const me = ctx.message.author.toJSON();
                    ctx.session.set(ctx.message.author.id, me)
                    await ctx.message.reply({
                        content: `I have set you to ${'```json\n'}${JSON.stringify(me)}\n${'```'}`,
                    })
                })
            ]
        })
    )