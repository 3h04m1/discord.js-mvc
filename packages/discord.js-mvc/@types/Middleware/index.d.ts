import { type Controller } from '../Controllers';
import { type Interaction, type BaseInteraction } from 'discord.js';
import { type Middleware } from './types';
export { type Middleware } from './types';
export declare class MiddlewareManager<T extends BaseInteraction = Interaction> {
    private readonly middlewares;
    add(...middlewares: Array<Middleware<T>>): void;
    apply(interaction: T, controller: Controller<T>, routeName?: string): Promise<void>;
    get isEmpty(): boolean;
}
//# sourceMappingURL=index.d.ts.map