import { BaseContext } from "../base/Context";
export type NextFunction = () => Promise<void>;
export type Middleware<T extends BaseContext = BaseContext> = (interaction: T, next: NextFunction) => Promise<void>;
//# sourceMappingURL=types.d.ts.map