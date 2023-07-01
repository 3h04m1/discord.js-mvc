import { Storage } from "./types";

export class Session implements Storage {

    constructor(private storage: Storage, public initialValue: Record<string, any>={}, public userID: string) {
        Object.keys(initialValue).forEach(key => {
            this.set(key, initialValue[key]);
        });
    }
    
    async get(key: string): Promise<any> {
        const data = await this.storage.get(this.userID);
        return data[key];
    }

    async set(key: string, value: any): Promise<void> {
        this.storage.set(this.userID, {
            ...await this.storage.get(this.userID),
            [key]: value
        });
    }

    async delete(key: string): Promise<void> {
        const data = this.storage.get(this.userID);
        delete data[key];
        this.storage.set(this.userID, data);
    }
}