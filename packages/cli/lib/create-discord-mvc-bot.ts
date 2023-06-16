#!/usr/bin/env node

import { createCommand } from "commander";
import newBot from "./actions/new/index.js";

const newBotCmd = createCommand("new")
    .description("Create a new Discord bot")
    .argument("<name>", "Name of the bot")
    .argument("[path]", "Path to create the bot in", ".")
    .action(newBot);

const newMiddlewareCmd = createCommand("new:middleware")
    .description("Create a new middleware")
    .argument("<name>", "Name of the middleware")
    .action((name) => {
        console.log("Creating middleware", name);
    });


const program = createCommand();
program.addCommand(newBotCmd);
program.addCommand(newMiddlewareCmd);

program.parse(process.argv);



