import { Message, BaseInteraction } from 'discord.js';
type Plugin<T> = (ctx: T) => void;
declare class InteractionContext<T extends BaseInteraction = BaseInteraction> {
    interaction: T;
    constructor(interaction: T);
    use(...plugins: Plugin<this>[]): this;
}
declare class MessageContext {
    message: Message;
    constructor(message: Message);
    use(...plugins: Plugin<this>[]): this;
}
declare function contextConstructor<T extends BaseInteraction>(interaction: T): InteractionContext<T>;
declare function contextConstructor(message: Message): MessageContext;
export type BaseContext = InteractionContext | MessageContext;
export { contextConstructor };
//# sourceMappingURL=context.d.ts.map