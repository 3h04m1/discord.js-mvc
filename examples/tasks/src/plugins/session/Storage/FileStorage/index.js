"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileStorage = void 0;
const fs_1 = require("fs");
/**
 * Implementation of the Storage interface that stores data in a file.
 */
class FileStorage {
    /**
     * Creates an instance of FileStorage.
     * @param {string} filePath - The path to the file where the data will be stored.
     * @param {number} [writeIntervalDelay=60000] - The delay in milliseconds between writes to the file.
     */
    constructor(filePath, writeIntervalDelay = 60000) {
        this.filePath = filePath;
        this.writeIntervalDelay = writeIntervalDelay;
        this.fileHandle = null;
        this.tasks = [];
        this.cache = {};
        this.writeInterval = null;
        this.filePath = filePath;
        // Create the file if it doesn't exist and read the data from it into the cache,
        // if it does exist, create the file handle and read the data from it into the cache
        this.getCacheFromFile().catch((error) => {
            console.error('Error reading the file:', error);
        });
        this.startWriteInterval();
    }
    /**
     * Retrieves the value associated with the specified key.
     * @param {string} key - The key to retrieve the value for.
     * @returns {Promise<any>} A promise that resolves to the value associated with the key.
     */
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.cache[key];
        });
    }
    /**
     * Sets the value associated with the specified key.
     * @param {string} key - The key to set the value for.
     * @param {any} value - The value to set.
     * @returns {Promise<void>} A promise that resolves when the value has been set.
     */
    set(key, value) {
        return __awaiter(this, void 0, void 0, function* () {
            this.cache[key] = value;
            this.tasks.push({
                type: 'update',
                key,
                value,
            });
        });
    }
    /**
     * Deletes the value associated with the specified key.
     * @param {string} key - The key to delete the value for.
     * @returns {Promise<void>} A promise that resolves when the value has been deleted.
     */
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            delete this.cache[key];
            this.tasks.push({
                type: 'delete',
                key,
            });
        });
    }
    /**
     * Writes the cached data to the file.
     * @returns {Promise<void>} A promise that resolves when the data has been written to the file.
     */
    writeFileData() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open('w');
            if (this.fileHandle) {
                for (const task of this.tasks) {
                    switch (task.type) {
                        case 'update':
                            this.cache[task.key] = task.value;
                            break;
                        case 'delete':
                            delete this.cache[task.key];
                            break;
                    }
                }
                yield this.fileHandle.writeFile(JSON.stringify(this.cache));
                yield this.fileHandle.close();
                this.tasks = [];
            }
        });
    }
    /**
     * Starts the interval for periodically writing the cached data to the file.
     */
    startWriteInterval() {
        this.writeInterval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            yield this.writeFileData();
        }), this.writeIntervalDelay);
    }
    /**
     * Stops the interval for periodically writing the cached data to the file.
     */
    stopWriteInterval() {
        if (this.writeInterval) {
            clearInterval(this.writeInterval);
            this.writeInterval = null;
        }
    }
    /**
     * Reads the data from the file into the cache.
     * @returns {Promise<void>} A promise that resolves when the data has been read from the file.
     */
    getCacheFromFile() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.open('r', true);
            if (this.fileHandle) {
                const data = yield this.fileHandle.readFile();
                this.cache = JSON.parse(data.toString());
                yield this.fileHandle.close();
            }
        });
    }
    /**
     * Opens the file with the specified mode.
     * @param {number|string} [mode='r'] - The mode to open the file in. Defaults to 'r' (read mode).
     * @param {boolean} [create=false] - Whether to create the file if it doesn't exist. Defaults to false.
     * @returns {Promise<void>} A promise that resolves when the file has been opened.
     */
    open(mode = 'r', create = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (create) {
                // check if file exists
                try {
                    // Query the entry
                    yield fs_1.promises.access(this.filePath);
                }
                catch (error) {
                    // if file does not exist, create it
                    yield fs_1.promises.writeFile(this.filePath, '{}');
                }
            }
            this.fileHandle = yield fs_1.promises.open(this.filePath, mode);
        });
    }
    /**
     * Closes the file and stops the write interval.
     * @returns {Promise<void>} A promise that resolves when the file has been closed.
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            this.stopWriteInterval();
            yield this.writeFileData();
            if (this.fileHandle) {
                yield this.fileHandle.close();
            }
        });
    }
}
exports.FileStorage = FileStorage;
