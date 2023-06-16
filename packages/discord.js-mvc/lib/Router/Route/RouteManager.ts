import { type BaseInteraction } from 'discord.js'
import { type Middleware } from '../../Middleware/types'
import { type IRouteGroupData } from './types'
import { hasCustomId } from '../../types'
import { extractParams } from '../../utils/extractParams'
import { type Route } from '.'

/**
 * Manages routes and provides utility methods for route grouping and middleware handling.
 */
export default class RouteManager {
  private readonly routes: Route<any>[] = [];

  /**
   * Creates a group of routes with a common prefix and optional middlewares.
   *
   * @param {IRouteGroupData} data - The data for route grouping.
   * @returns {Route[]} The grouped routes.
   */
  public static group(data: IRouteGroupData): Route<any>[] {
    const routes: Route[] = [];
    const prefix = data.prefix ?? '';
    const middlewares = data.middlewares ?? [];
    for (const route of data.routes) {
      route.name = prefix + route.name;
      route.use(...middlewares);
      routes.push(route);
    }
    return routes;
  }

  /**
   * Adds routes to the manager.
   *
   * @param {...Route[]} route - The routes to be added.
   * @returns {RouteManager} The current RouteManager instance.
   */
  private add(...route: Route[]): RouteManager {
    this.routes.push(...route);
    return this;
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
      route.name = prefix + route.name;
    }
    return new RouteManager().add(...routes);
  }

  /**
   * Prefixes the routes in the current RouteManager instance with a common prefix.
   *
   * @param {string} prefix - The prefix to be added to route names.
   * @returns {RouteManager} The current RouteManager instance with prefixed routes.
   */
  public prefix(prefix: string): RouteManager {
    for (const route of this.routes) {
      route.name = prefix + route.name;
    }
    return this;
  }

  /**
   * Adds a middleware to multiple routes.
   *
   * @param {Middleware<any>} middleware - The middleware to be added.
   * @param {Route[]} routes - The routes to which the middleware will be added.
   * @returns {RouteManager} A new RouteManager instance with the added middleware.
   */
  public static middleware(middleware: Middleware<any>, routes: Route[]): RouteManager {
    for (const route of routes) {
      route.use(middleware);
    }
    return new RouteManager().add(...routes);
  }

  /**
   * Extracts parameters from an interaction based on a route pattern.
   *
   * @template T - The type of the interaction.
   * @param {T} interaction - The interaction to extract parameters from.
   * @param {string} routePattern - The pattern of the route.
   * @returns {Record<string, any>} The extracted parameters.
   * @throws {Error} If the interaction type is invalid.
   */
  public static extractParams<T extends BaseInteraction>(interaction: T, routePattern: string): Record<string, any> {
    if (interaction.isCommand()) {
      const params: Record<string, any> = {};
      for (const option of interaction.options.data) {
        params[option.name] = option.value;
      }
      return params;
    } else if (hasCustomId(interaction)) {
      return extractParams(interaction.customId, routePattern);
    }
    throw new Error('Invalid interaction type');
  }

  /**
   * Adds a middleware to the routes in the current RouteManager instance.
   *
   * @param {Middleware<any>} middleware - The middleware to be added.
   * @returns {RouteManager} The current RouteManager instance with the added middleware.
   */
  public middleware(middleware: Middleware<any>): RouteManager {
    for (const route of this.routes) {
      route.use(middleware);
    }
    return this;
  }
}
