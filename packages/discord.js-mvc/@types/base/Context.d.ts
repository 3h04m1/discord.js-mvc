import { Message, BaseInteraction, Interaction, Base } from 'discord.js';
type Plugin<T> = (ctx: T) => void;
declare class BaseContextCls {
    params: Record<string, any>;
    isInteraction(): this is InteractionContext;
    isMessage(): this is MessageContext;
    use(...plugins: Plugin<this>[]): this;
    setParams(routePath?: string): void;
}
declare class InteractionContext<T extends BaseInteraction = Interaction> extends BaseContextCls {
    interaction: T;
    constructor(interaction: T);
}
declare class MessageContext extends BaseContextCls {
    message: Message;
    constructor(message: Message);
}
type InteractionPlugin = Plugin<InteractionContext>;
type MessagePlugin = Plugin<MessageContext>;
declare function contextConstructor(interaction: Interaction, plugins: Array<InteractionPlugin>, routePath?: string): InteractionContext;
declare function contextConstructor(message: Message, plugins: Array<MessagePlugin>): MessageContext;
export type BaseContext<T extends Base = any> = T extends BaseInteraction ? InteractionContext<T> : MessageContext;
export { contextConstructor };
//# sourceMappingURL=Context.d.ts.map