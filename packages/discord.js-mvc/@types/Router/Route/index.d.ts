import { MiddlewareManager } from '../../Middleware';
import { type Middleware } from '../../Middleware/types';
import RouteManager from './RouteManager';
import { type Controller } from '../../Controllers';
import { BaseContext } from '../../base/Context';
export declare class Route<T extends BaseContext = BaseContext> {
    name: string;
    controller: Controller<T>;
    middlewareManager: MiddlewareManager<T>;
    static manager: typeof RouteManager;
    constructor(name: string, controller: Controller<T>);
    use(...middlewares: Array<Middleware<T>>): Route<T>;
    run(interaction: T): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map