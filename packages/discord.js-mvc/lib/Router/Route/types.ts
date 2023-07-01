import { BaseContext } from '../../base/Context';
import { Middleware } from '../../Middleware/types';
import { Route } from '.';

// RouteName can be a string or a RegExp or a string describing a RegExp
export type RouteName = string | RegExp | string;

/**
 * Data structure for grouping routes with a common prefix and middlewares.
 */
export interface IRouteGroupData<T extends BaseContext = BaseContext> {
  /**
   * Optional prefix to be added to the route names.
   */
  prefix?: string;

  /**
   * Array of middlewares to be applied to the routes.
   */
  middlewares?: Array<Middleware<T>>;

  /**
   * Array of routes to be grouped.
   */
  routes: Array<Route<T>>;
}
