import { type Middleware } from '../../Middleware/types'
import { type IRouteGroupData } from './types'
import { Route } from '.'
import { MaybeArray } from '../../types'

/**
 * Manages routes and provides utility methods for route grouping and middleware handling.
 */
export default class RouteManager {
  private readonly routes: Route<any>[] = []

  /**
   * Creates a group of routes with a common prefix and optional middlewares.
   *
   * @param {IRouteGroupData} data - The data for route grouping.
   * @returns {Route[]} The grouped routes.
   */
  public static group(data: IRouteGroupData<any>): Route<any>[] {
    const routes: Route<any>[] = []
    const prefix = data.prefix ?? ''
    const middlewares = data.middlewares ?? []
    for (const route of this.flatten(data.routes)) {
      route.name = prefix + route.name
      route.use(...middlewares)
      routes.push(route)
    }

    return routes
  }

  public static flatten(routes: MaybeArray<Route<any>[]>): Route<any>[] {
    const flattened: Route<any>[] = []
    for (const route of routes) {
      if (Array.isArray(route)) {
        flattened.push(...route)
      } else {
        flattened.push(route)
      }
    }
    return flattened
  }

  /**
   * Adds routes to the manager.
   *
   * @param {...Route[]} route - The routes to be added.
   * @returns {RouteManager} The current RouteManager instance.
   */
  private add(...route: Route[]): RouteManager {
    this.routes.push(...route)
    return this
  }

  /**
   * Creates a new RouteManager instance with routes prefixed with a common prefix.
   *
   * @param {string} prefix - The prefix to be added to route names.
   * @param {Route[]} routes - The routes to be prefixed.
   * @returns {RouteManager} A new RouteManager instance with prefixed routes.
   */
  public static prefix(prefix: string, routes: Route[]): RouteManager {
    for (const route of routes) {
      route.name = prefix + route.name
    }
    return new RouteManager().add(...routes)
  }

  /**
   * Prefixes the routes in the current RouteManager instance with a common prefix.
   *
   * @param {string} prefix - The prefix to be added to route names.
   * @returns {RouteManager} The current RouteManager instance with prefixed routes.
   */
  public prefix(prefix: string): RouteManager {
    for (const route of this.routes) {
      route.name = prefix + route.name
    }
    return this
  }

  /**
   * Adds a middleware to multiple routes.
   *
   * @param {Middleware<any>} middleware - The middleware to be added.
   * @param {Route[]} routes - The routes to which the middleware will be added.
   * @returns {RouteManager} A new RouteManager instance with the added middleware.
   */
  public static middleware(
    middleware: Middleware<any>,
    routes: Route[]
  ): RouteManager {
    for (const route of routes) {
      route.use(middleware)
    }
    return new RouteManager().add(...routes)
  }

  /**
   * Adds a middleware to the routes in the current RouteManager instance.
   *
   * @param {Middleware<any>} middleware - The middleware to be added.
   * @returns {RouteManager} The current RouteManager instance with the added middleware.
   */
  public middleware(middleware: Middleware<any>): RouteManager {
    for (const route of this.routes) {
      route.use(middleware)
    }
    return this
  }
}
