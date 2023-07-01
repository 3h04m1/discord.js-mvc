import { BaseContext } from '../../base/Context';
import { Middleware } from '../../Middleware/types';
import { Route } from '.';
export type RouteName = string | RegExp | string;
export interface IRouteGroupData<T extends BaseContext = BaseContext> {
    prefix?: string;
    middlewares?: Array<Middleware<T>>;
    routes: Array<Route<T>>;
}
//# sourceMappingURL=types.d.ts.map