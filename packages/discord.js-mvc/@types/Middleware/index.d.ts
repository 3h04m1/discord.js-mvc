import { type Controller } from '../Controllers';
import { type Middleware } from './types';
import { BaseContext } from '../base/Context';
export { type Middleware } from './types';
export declare class MiddlewareManager<T extends BaseContext = BaseContext> {
    private readonly middlewares;
    add(...middlewares: Array<Middleware<T>>): void;
    apply(ctx: T, controller: Controller<T>): Promise<void>;
    get isEmpty(): boolean;
}
//# sourceMappingURL=index.d.ts.map