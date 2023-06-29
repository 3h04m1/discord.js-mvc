import { type BaseInteraction } from 'discord.js';
export declare function hasCustomId(interaction: BaseInteraction): interaction is BaseInteraction & {
    customId: string;
};
export type MaybePromise<T = any> = T | Promise<T>;
export type MaybeArray<T = any> = T | Array<T>;
//# sourceMappingURL=index.d.ts.map