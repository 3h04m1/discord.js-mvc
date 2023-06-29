import { MiddlewareManager } from '../Middleware';
import { type Route } from './Route';
import { type Middleware } from '../Middleware/types';
import { type Interaction, Message } from 'discord.js';
import { MaybeArray } from '../types';
import { BaseContext } from '../base/Context';
export declare class Router<T extends BaseContext = BaseContext> {
    readonly _routes: Route[];
    readonly _middlewareManager: MiddlewareManager;
    use(...middlewares: Middleware[]): this;
    add(...routes: Array<MaybeArray<Route<any>>>): this;
    getRoute(path: string): Route | undefined;
    getRoutePath(interaction: Interaction): string;
    handle(message: Message): Promise<void>;
    handle(Interaction: Interaction): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map