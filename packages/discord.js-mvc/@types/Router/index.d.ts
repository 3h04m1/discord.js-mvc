import { type Route } from './Route';
import { type Middleware } from '../Middleware/types';
import { type Interaction } from 'discord.js';
export declare class Router {
    private readonly _routes;
    private readonly _middlewareManager;
    use(...middlewares: Middleware[]): Router;
    add(...routes: Array<Route<any> | Array<Route<any>>>): Router;
    private getRoute;
    private getRoutePath;
    handle(interaction: Interaction): Promise<void>;
}
//# sourceMappingURL=index.d.ts.map