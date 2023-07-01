import { BaseInteraction } from "discord.js";
import { Middleware, MiddlewareManager } from "../Middleware";
import { Context, ContextOptions } from "../base/Context";
import { Route } from "./Route";
export declare abstract class BaseRouter<T extends Context> {
    abstract use(...middlewares: Middleware[]): this;
    abstract add(...routes: Array<Route<any> | Array<Route<any>>>): this;
    abstract handle(interaction: BaseInteraction): Promise<void>;
    abstract getRoute(path: string): Route | undefined;
    abstract getRoutePath<T extends BaseInteraction>(interaction: T): string;
    abstract readonly _routes: Route[];
    abstract readonly _middlewareManager: MiddlewareManager;
    abstract contextBuilder: new (options: ContextOptions) => T;
}
//# sourceMappingURL=types.d.ts.map