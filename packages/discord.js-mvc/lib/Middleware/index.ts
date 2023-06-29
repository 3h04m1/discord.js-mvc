import {
  type Controller 
} from '../Controllers'
import { type Middleware } from './types'
import { BaseContext } from '../base/Context'
export { type Middleware } from './types'


/**
 * Manages the execution of middlewares for processing ctxs.
 * @template T - The type of ctx to be processed. Defaults to `ctx`.
 */
export class MiddlewareManager<T extends BaseContext = BaseContext> {
  private readonly middlewares: Array<Middleware<T>> = [];

  /**
   * Adds middlewares to the manager.
   * @param middlewares - The middlewares to be added.
   */
  public add(...middlewares: Array<Middleware<T>>): void {
    this.middlewares.push(...middlewares);
  }

  /**
   * Applies the registered middlewares to process the ctx.
   * @param ctx - The Context to be processed.
   * @param controller - The controller function to be invoked after middleware processing.
   * @param routeName - Optional route name to extract params for route-specific middleware processing.
   * @returns A promise that resolves when the middleware processing is complete.
   */
  public async apply(
    ctx: T,
    controller: Controller<T>,
  ): Promise<void> {
    const middlewareStack = [...this.middlewares];
    const runner = async (): Promise<void> => {
      const middleware = middlewareStack.shift();
      if (middleware != null) {
        await middleware(ctx, runner);
      } else {
        await controller(ctx);
      }
    };
    await runner();
  }

  /**
   * Checks if the middleware manager is empty.
   * @returns `true` if the middleware manager is empty, `false` otherwise.
   */
  public get isEmpty(): boolean {
    return this.middlewares.length === 0;
  }
}
