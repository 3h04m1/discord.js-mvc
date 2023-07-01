import { Base } from "discord.js";
import { BaseContext } from "discord.js-mvc";

export type Context<T extends Base> = BaseContext<T>;