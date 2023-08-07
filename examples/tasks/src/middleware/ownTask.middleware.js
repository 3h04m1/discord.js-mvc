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
exports.ownTaskMiddleware = void 0;
const task_entity_1 = require("../models/task.entity");
const db_1 = __importDefault(require("../db"));
const ownTaskMiddleware = (ctx, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { interaction } = ctx;
    const { taskId } = ctx.params;
    const taskRepository = db_1.default.getRepository(task_entity_1.Task);
    const task = yield taskRepository.findOne({
        where: {
            id: parseInt(taskId)
        }
    });
    if (task.userId !== interaction.user.id) {
        yield interaction.reply({
            content: "You can't do that!",
            ephemeral: true
        });
        return;
    }
    next();
});
exports.ownTaskMiddleware = ownTaskMiddleware;
