export interface Storage {
    get(key?: string): any | Promise<any>;
    set(key: string, value: any): void | Promise<void>;
    delete(key: string): void | Promise<void>;
}

export type SessionFlavor<T> = T & {
    session: Storage;
};