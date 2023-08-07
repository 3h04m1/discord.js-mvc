"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const discord_js_mvc_1 = require("discord.js-mvc");
const newTask_controller_1 = require("./controllers/newTask.controller");
const createTask_controller_1 = require("./controllers/createTask.controller");
const listTask_controller_1 = require("./controllers/listTask.controller");
const ownTask_middleware_1 = require("./middleware/ownTask.middleware");
const taskCRUD_controller_1 = require("./controllers/taskCRUD.controller");
const session_1 = require("./plugins/session");
exports.router = new discord_js_mvc_1.Router()
    .plugin((0, session_1.SessionPlugin)(new session_1.FileStorage(process.cwd() + '/session.json'), {}))
    .add(new discord_js_mvc_1.Route('list-tasks', listTask_controller_1.listTaskController), new discord_js_mvc_1.Route('new-task', newTask_controller_1.newTaskController), new discord_js_mvc_1.Route('new-task-modal', createTask_controller_1.createTaskController), discord_js_mvc_1.Route.manager.group({
    middlewares: [ownTask_middleware_1.ownTaskMiddleware],
    routes: [
        new discord_js_mvc_1.Route('edit-task/:taskId', taskCRUD_controller_1.TaskCrud.editTask),
        new discord_js_mvc_1.Route('delete-task/:taskId', taskCRUD_controller_1.TaskCrud.deleteTask),
        new discord_js_mvc_1.Route('complete-task/:taskId', taskCRUD_controller_1.TaskCrud.completeTask),
        new discord_js_mvc_1.Route('edit-task-modal/:taskId', taskCRUD_controller_1.TaskCrud.editTaskModal),
    ],
}), discord_js_mvc_1.Route.manager.group({
    routes: [
        new discord_js_mvc_1.Route('get-key', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const { interaction } = ctx;
            const key = interaction.options.getString('key');
            const res = yield ctx.session.get(key);
            ctx.interaction.reply({
                content: `The value of ${key} is ${res}`,
                ephemeral: true,
            });
        })),
        new discord_js_mvc_1.Route('set-key', (ctx) => __awaiter(void 0, void 0, void 0, function* () {
            const { interaction } = ctx;
            const key = interaction.options.getString('key');
            const value = interaction.options.getString('value');
            yield ctx.session.set(key, value);
            ctx.interaction.reply({
                content: `The value of ${key} is now ${value}`,
                ephemeral: true,
            });
        })),
    ],
}));
