import { type Interaction, type BaseInteraction } from 'discord.js';
export type Controller<T extends BaseInteraction = Interaction> = (req: T, params: Record<string, any>) => Promise<void>;
//# sourceMappingURL=index.d.ts.map