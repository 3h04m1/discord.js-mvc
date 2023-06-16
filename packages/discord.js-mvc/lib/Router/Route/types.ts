import { type Route } from '.'
import { type Middleware } from '../../Middleware/types'

/**
 * Data structure for grouping routes with a common prefix and middlewares.
 */
export interface IRouteGroupData {
  /**
   * Optional prefix to be added to the route names.
   */
  prefix?: string;
  
  /**
   * Array of middlewares to be applied to the routes.
   */
  middlewares?: Array<Middleware<any>>;
  
  /**
   * Array of routes to be grouped.
   */
  routes: Array<Route<any>>;
}
