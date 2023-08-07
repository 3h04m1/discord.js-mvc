// a functions that verifies that the cwd has a package.json file and that the file has in its dependencies the discord.js-mvc package

import { error } from "./error";
import { MESSAGES } from "../ui/messages";
import { existsSync } from "fs";
import { join } from "path";
import { readFileSync } from "fs";
import { getPackageJson } from "./package";

