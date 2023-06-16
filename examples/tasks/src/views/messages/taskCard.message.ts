import dedent from "dedent-js";
import { Task } from "../../models/task.entity";

export default (task: Task, title:string) => dedent`
    **${title}**
    ____________________
    **Title:** ${task.title}
    **Description:** ${task.description}
    **Status:** ${task.completed ? "✔️ Completed" : "❌ Incomplete"}
    **Created At:** ${task.createdAt.toLocaleString()}
    **User:** <@${task.userId}>
    `