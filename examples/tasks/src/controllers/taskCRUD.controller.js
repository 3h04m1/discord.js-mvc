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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskCrud = void 0;
const task_entity_1 = require("../models/task.entity");
const db_1 = __importDefault(require("../db"));
const newTask_modal_1 = require("../views/modals/newTask.modal");
const taskCard_message_1 = __importDefault(require("../views/messages/taskCard.message"));
const taskRepository = db_1.default.getRepository(task_entity_1.Task);
class TaskCrud {
}
exports.TaskCrud = TaskCrud;
_a = TaskCrud;
TaskCrud.deleteTask = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = ctx.params;
    const { interaction } = ctx;
    yield interaction.deferReply();
    const task = yield taskRepository.findOne({
        where: {
            id: parseInt(taskId)
        }
    });
    yield taskRepository.delete({
        id: parseInt(taskId)
    });
    yield interaction.editReply({
        content: `Task "${task.title}" deleted!`
    });
});
TaskCrud.editTask = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = ctx.params;
    const { interaction } = ctx;
    const task = yield taskRepository.findOne({
        where: {
            id: parseInt(taskId)
        }
    });
    console.log(task);
    yield interaction.showModal((0, newTask_modal_1.newTaskModal)({
        title: `Edit Task: ${task.title.slice(0, 20) + (task.title.length > 20 ? "..." : "")}`,
        id: `edit-task-modal/${task.id}`,
        oldData: {
            title: task.title,
            description: task.description
        }
    }));
});
TaskCrud.editTaskModal = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = ctx.params;
    const { interaction } = ctx;
    const data = {
        title: interaction.fields.getTextInputValue("title"),
        description: interaction.fields.getTextInputValue("description")
    };
    const task = yield taskRepository.findOne({
        where: {
            id: parseInt(taskId)
        }
    });
    if (!task) {
        yield interaction.reply({
            content: "Task not found!",
        });
        return;
    }
    task.title = data.title;
    task.description = data.description;
    yield taskRepository.save(task);
    yield interaction.reply({
        content: (0, taskCard_message_1.default)(task, "Task updated!"),
        ephemeral: true
    });
});
TaskCrud.completeTask = (ctx) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = ctx.params;
    const { interaction } = ctx;
    yield interaction.deferReply();
    const task = yield taskRepository.findOne({
        where: {
            id: parseInt(taskId)
        }
    });
    task.completed = true;
    yield taskRepository.save(task);
    yield interaction.editReply({
        content: `Task "${task.title}" completed!`
    });
});
