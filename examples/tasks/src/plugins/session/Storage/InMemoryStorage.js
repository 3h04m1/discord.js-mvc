"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InMemoryStorage = void 0;
/**
 * Implementation of the Storage interface that stores data in memory using a Map.
 */
class InMemoryStorage {
    constructor() {
        this.storage = new Map();
    }
    /**
     * Retrieves the value associated with the specified key from the in-memory storage.
     * @param {string} key - The key to retrieve the value for.
     * @returns {any} The value associated with the key, or undefined if the key is not found.
     */
    get(key) {
        return this.storage.get(key);
    }
    /**
     * Sets the value associated with the specified key in the in-memory storage.
     * @param {string} key - The key to set the value for.
     * @param {any} value - The value to set.
     * @returns {void}
     */
    set(key, value) {
        this.storage.set(key, value);
    }
    /**
     * Deletes the value associated with the specified key from the in-memory storage.
     * @param {string} key - The key to delete the value for.
     * @returns {void}
     */
    delete(key) {
        this.storage.delete(key);
    }
}
exports.InMemoryStorage = InMemoryStorage;
