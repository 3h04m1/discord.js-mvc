import { MiddlewareManager } from '../Middleware';
import { type Route } from './Route';
import { type Middleware } from '../Middleware/types';
import { type Interaction, Message } from 'discord.js';
import { MaybeArray } from '../types';
import { InteractionContext, MessageContext, type Plugin } from '../base/Context';
export declare class Router {
    readonly _routes: Route[];
    readonly _plugins: Plugin[];
    readonly _middlewareManager: MiddlewareManager;
    use(...middlewares: Middleware[]): this;
    plugin(...plugins: Plugin[]): this;
    get messageRoutes(): Route<MessageContext>[];
    add(...routes: Array<MaybeArray<Route<any>>>): this;
    getRoute(path: string): Route<InteractionContext> | undefined;
    getRoutePath(interaction: Interaction): string;
    private executeRoute;
    handle(message: Message): Promise<void>;
    handle(Interaction: Interaction): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map