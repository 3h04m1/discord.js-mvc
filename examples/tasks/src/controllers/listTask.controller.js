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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTaskController = void 0;
const task_entity_1 = require("../models/task.entity");
const db_1 = __importDefault(require("../db"));
const taskCard_message_1 = __importDefault(require("../views/messages/taskCard.message"));
const discord_js_1 = require("discord.js");
const task_button_1 = require("../views/buttons/task.button");
const listTaskController = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { interaction } = ctx;
    const taskRepository = db_1.default.getRepository(task_entity_1.Task);
    const tasks = yield taskRepository.find({
        where: {
            userId: interaction.user.id
        }
    });
    yield interaction.deferReply();
    if (tasks.length === 0) {
        yield interaction.editReply({
            content: "You don't have any tasks yet!"
        });
        return;
    }
    yield interaction.editReply({
        content: "Here are your tasks:"
    });
    for (const task of tasks) {
        yield interaction.followUp({
            content: (0, taskCard_message_1.default)(task, "Task updated!"),
            components: [
                new discord_js_1.ActionRowBuilder()
                    .addComponents([
                    (0, task_button_1.deleteTaskButton)(task.id),
                    (0, task_button_1.editTaskButton)(task.id),
                    (0, task_button_1.completeTaskButton)(task.id)
                ])
            ]
        });
    }
});
exports.listTaskController = listTaskController;
