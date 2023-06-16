import { type BaseInteraction } from 'discord.js';
import { MiddlewareManager } from '../../Middleware';
import { type Middleware } from '../../Middleware/types';
import RouteManager from './RouteManager';
import { type Controller } from '../../Controllers';
export declare class Route<T extends BaseInteraction = BaseInteraction> {
    name: string;
    controller: Controller<T>;
    middlewareManager: MiddlewareManager<T>;
    static manager: typeof RouteManager;
    constructor(name: string, controller: Controller<T>);
    use(...middlewares: Array<Middleware<T>>): Route<T>;
    run(interaction: T): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map