import { BaseInteraction, Message } from 'discord.js';
export declare function hasCustomId(interaction: BaseInteraction): interaction is BaseInteraction & {
    customId: string;
};
export type MaybePromise<T = any> = T | Promise<T>;
export type MaybeArray<T = any> = T | Array<T>;
export declare function isMsg(data: Message | BaseInteraction): data is Message;
export declare function isInteraction(data: Message | BaseInteraction): data is BaseInteraction;
//# sourceMappingURL=index.d.ts.map