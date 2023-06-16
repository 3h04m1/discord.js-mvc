import { type Interaction, type BaseInteraction } from 'discord.js';
export type NextFunction = () => Promise<void>;
export type Middleware<T extends BaseInteraction = Interaction> = (interaction: T, next: NextFunction, params?: Record<string, any>) => Promise<void>;
//# sourceMappingURL=types.d.ts.map