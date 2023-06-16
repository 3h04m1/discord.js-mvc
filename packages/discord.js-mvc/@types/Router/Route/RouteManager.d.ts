import { type BaseInteraction } from 'discord.js';
import { type Middleware } from '../../Middleware/types';
import { type IRouteGroupData } from './types';
import { type Route } from '.';
export default class RouteManager {
    private readonly routes;
    static group(data: IRouteGroupData): Route<any>[];
    private add;
    static prefix(prefix: string, routes: Route[]): RouteManager;
    prefix(prefix: string): RouteManager;
    static middleware(middleware: Middleware<any>, routes: Route[]): RouteManager;
    static extractParams<T extends BaseInteraction>(interaction: T, routePattern: string): Record<string, any>;
    middleware(middleware: Middleware<any>): RouteManager;
}
//# sourceMappingURL=RouteManager.d.ts.map