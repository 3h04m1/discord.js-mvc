import {Router, Route} from 'discord.js-mvc'
import { newTaskController } from './controllers/newTask.controller'
import { ButtonInteraction, ModalSubmitInteraction } from 'discord.js'
import { createTaskController } from './controllers/createTask.controller'
import { listTaskController } from './controllers/listTask.controller'
import { ownTaskMiddleware } from './middleware/ownTask.middleware'
import { TaskCrud } from './controllers/taskCRUD.controller'

export const router = new Router()
    .add(
        new Route('new-task', newTaskController),
        new Route<ModalSubmitInteraction>('new-task-modal', createTaskController),
        new Route('list-tasks', listTaskController),
        Route.manager.group({
            middlewares: [
             ownTaskMiddleware
            ],
            routes: [
                new Route<ButtonInteraction>('edit-task/:taskId', TaskCrud.editTask),
                new Route<ButtonInteraction>('delete-task/:taskId', TaskCrud.deleteTask),
                new Route<ButtonInteraction>('complete-task/:taskId', TaskCrud.completeTask),
                new Route<ModalSubmitInteraction>('edit-task-modal/:taskId', TaskCrud.editTaskModal)
            ]
        })
    )