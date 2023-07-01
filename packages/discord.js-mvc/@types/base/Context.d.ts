import { Message, BaseInteraction, Interaction, Base } from 'discord.js';
export declare function isMsg(data: Message | BaseInteraction): data is Message;
export declare function isInteraction(data: Message | BaseInteraction): data is BaseInteraction;
export type Plugin<T extends BaseContextCls = BaseContext> = (ctx: T) => void;
declare class BaseContextCls {
    interaction?: BaseInteraction;
    message?: Message;
    params: Record<string, any>;
    isInteraction(): this is InteractionContext;
    isMessage(): this is MessageContext;
    use(...plugins: Plugin<this>[]): this;
    setParams(routePath?: string): void;
}
export declare class InteractionContext<T extends BaseInteraction = BaseInteraction> extends BaseContextCls {
    interaction: T;
    message: never;
    constructor(interaction: T);
}
export declare class MessageContext extends BaseContextCls {
    message: Message;
    interaction: never;
    constructor(message: Message);
}
type InteractionPlugin = Plugin<InteractionContext>;
type MessagePlugin = Plugin<MessageContext>;
declare function contextConstructor(interaction: Interaction, plugins: Array<InteractionPlugin>, routePath?: string): InteractionContext;
declare function contextConstructor(message: Message, plugins: Array<MessagePlugin>): MessageContext;
export type BaseContext<T extends Base = any> = T extends BaseInteraction ? InteractionContext<T> : MessageContext;
export { contextConstructor };
//# sourceMappingURL=Context.d.ts.map