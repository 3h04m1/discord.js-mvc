import { Storage } from '../types';

/**
 * Implementation of the Storage interface that stores data in memory using a Map.
 */
export class InMemoryStorage implements Storage {
  private storage: Map<string, any> = new Map();

  /**
   * Retrieves the value associated with the specified key from the in-memory storage.
   * @param {string} key - The key to retrieve the value for.
   * @returns {any} The value associated with the key, or undefined if the key is not found.
   */
  get(key: string): any {
    return this.storage.get(key);
  }

  /**
   * Sets the value associated with the specified key in the in-memory storage.
   * @param {string} key - The key to set the value for.
   * @param {any} value - The value to set.
   * @returns {void}
   */
  set(key: string, value: any): void {
    this.storage.set(key, value);
  }

  /**
   * Deletes the value associated with the specified key from the in-memory storage.
   * @param {string} key - The key to delete the value for.
   * @returns {void}
   */
  delete(key: string): void {
    this.storage.delete(key);
  }
}
