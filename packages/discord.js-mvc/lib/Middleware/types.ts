import { BaseContext } from "../base/Context";


export type NextFunction = () => Promise<void>

/**
 * Represents a middleware function used for processing interactions.
 * @template T - The type of interaction to be processed. Defaults to `Interaction`.
 * @param interaction - The interaction to be processed.
 * @param next - The next function to invoke to proceed to the next middleware or the final handler.
 * @param params - Additional parameters that can be passed to the middleware.
 * @returns A promise that resolves when the middleware processing is complete.
 */
export type Middleware<T extends BaseContext = BaseContext> = (
    interaction: T,
    next: NextFunction,
  ) => Promise<void>;
