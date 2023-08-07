// preetier-ignore

import chalk from "chalk";
import { DOCS_LINK } from "./link";
import {getVersion} from "../utils"
const heart = chalk.red("♥");

export const BANNER = `
________            ___  ________           _____ ______   ___      ___ ________     
|\\   ___ \\          |\\  \\|\\   ____\\         |\\   _ \\  _   \\|\\  \\    /  /|\\   ____\\    
\\ \\  \\_|\\ \\         \\ \\  \\ \\  \\___|_        \\ \\  \\\\\\__\\ \\  \\ \\  \\  /  / | \\  \\___|    
 \\ \\  \\ \\\\ \\      __ \\ \\  \\ \\_____  \\        \\ \\  \\\\|__| \\  \\ \\  \\/  / / \\ \\  \\       
  \\ \\  \\_\\\\ \\ ___|\\  \\\\_\\  \\|____|\\  \\        \\ \\  \\    \\ \\  \\ \\    / /   \\ \\  \\____  
   \\ \\_______\\\\__\\ \\________\\____\\_\\  \\        \\ \\__\\    \\ \\__\\ \\__/ /     \\ \\_______\\
    \\|_______\\|__|\\|________|\\_________\\        \\|__|     \\|__|\\|__|/       \\|_______|
                            \\|_________|                                                                                                                               
                                                        ${chalk.italic.grey('Made with '+ heart + ' by max.vojtkov')}
                                                        ${chalk.italic.grey('Version: '+ getVersion())}

${chalk.greenBright('For help, visit the '+ DOCS_LINK('Discord.js MVC documentation'))}
                            `;