import { BaseContext } from "../base/Context";
import { MaybePromise } from "../types";
export type Controller<T extends BaseContext = BaseContext> = (ctx: T) => MaybePromise<void>;
//# sourceMappingURL=index.d.ts.map