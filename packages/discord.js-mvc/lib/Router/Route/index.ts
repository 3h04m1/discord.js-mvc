import { type BaseInteraction } from 'discord.js';
import { MiddlewareManager } from '../../Middleware';
import { type Middleware } from '../../Middleware/types';
import RouteManager from './RouteManager';
import { type Controller } from '../../Controllers';

/**
 * Represents a route in the application.
 *
 * @template T - The type of the interaction for this route (defaults to BaseInteraction).
 */
export class Route<T extends BaseInteraction = BaseInteraction> {
  /**
   * The manager for handling middlewares associated with this route.
   */
  public middlewareManager = new MiddlewareManager<T>();

  /**
   * The manager responsible for operations on routes.
   */
  public static manager = RouteManager;

  /**
   * Creates a new Route instance.
   *
   * @param {string} name - The name of the route.
   * @param {Controller<T>} controller - The controller associated with the route.
   */
  constructor(public name: string, public controller: Controller<T>) {}

  /**
   * Adds middlewares to be executed for this route.
   *
   * @param {...Array<Middleware<T>>} middlewares - The middlewares to be added.
   * @returns {Route<T>} The current Route instance.
   */
  public use(...middlewares: Array<Middleware<T>>): Route<T> {
    this.middlewareManager.add(...middlewares);
    return this;
  }

  /**
   * Executes the route by running the associated middlewares and controller.
   *
   * @param {T} interaction - The interaction triggering the route.
   * @returns {Promise<void>} A Promise that resolves when the route execution is completed.
   */
  public async run(interaction: T): Promise<void> {
    await this.middlewareManager.apply(interaction, this.controller, this.name);
  }
}