import { Base } from "discord.js";
import { BaseContext } from "discord.js-mvc";
import { SessionFlavor } from "./plugins/session/types";

export type Context<T extends Base> = SessionFlavor<BaseContext<T>>;