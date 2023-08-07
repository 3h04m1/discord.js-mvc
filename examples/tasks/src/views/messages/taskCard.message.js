"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dedent_js_1 = __importDefault(require("dedent-js"));
exports.default = (task, title) => (0, dedent_js_1.default) `
    **${title}**
    ____________________
    **Title:** ${task.title}
    **Description:** ${task.description}
    **Status:** ${task.completed ? "✔️ Completed" : "❌ Incomplete"}
    **Created At:** ${task.createdAt.toLocaleString()}
    **User:** <@${task.userId}>
    `;
