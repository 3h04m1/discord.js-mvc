import { type RESTOptions } from 'discord.js';
interface AppOptions {
    token: string;
    clientId: string;
}
interface AppGuildOptions extends AppOptions {
    guildId: string;
}
interface BaseRegisterCommandsOptions {
    dir: string;
    app: AppOptions | AppGuildOptions;
    rest?: Partial<RESTOptions>;
}
interface RegisterGuildCommandsOptions extends BaseRegisterCommandsOptions {
    app: AppGuildOptions;
}
interface RegisterGlobalCommandsOptions extends BaseRegisterCommandsOptions {
    app: AppOptions;
}
export declare const registerGuildCommands: (options: RegisterGuildCommandsOptions, onSuccess?: ((data: unknown) => Promise<void> | void) | undefined, onError?: ((error: any) => Promise<void> | void) | undefined) => Promise<void>;
export declare const registerGlobalCommands: (options: RegisterGlobalCommandsOptions, onSuccess?: ((data: unknown) => Promise<void> | void) | undefined, onError?: ((error: any) => Promise<void> | void) | undefined) => Promise<void>;
export {};
//# sourceMappingURL=registerCommands.d.ts.map