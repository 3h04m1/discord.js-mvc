import { type Route } from '.';
import { type Middleware } from '../../Middleware/types';
export interface IRouteGroupData {
    prefix?: string;
    middlewares?: Array<Middleware<any>>;
    routes: Array<Route<any>>;
}
//# sourceMappingURL=types.d.ts.map