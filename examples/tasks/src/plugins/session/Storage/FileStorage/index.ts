import { promises as fsPromises } from 'fs'
import { Storage } from '../../types'
import { StorageTask } from './types'

/**
 * Implementation of the Storage interface that stores data in a file.
 */
export class FileStorage implements Storage {
  private fileHandle: fsPromises.FileHandle | null = null
  private tasks: StorageTask[] = []
  private cache: any = {}
  private writeInterval: NodeJS.Timeout | null = null

  /**
   * Creates an instance of FileStorage.
   * @param {string} filePath - The path to the file where the data will be stored.
   * @param {number} [writeIntervalDelay=60000] - The delay in milliseconds between writes to the file.
   */
  constructor(private filePath: string, private writeIntervalDelay: number = 60000) {
    this.filePath = filePath
    // Create the file if it doesn't exist and read the data from it into the cache,
    // if it does exist, create the file handle and read the data from it into the cache
    this.getCacheFromFile().catch((error) => {
      console.error('Error reading the file:', error)
    })

    this.startWriteInterval()
  }

  /**
   * Retrieves the value associated with the specified key.
   * @param {string} key - The key to retrieve the value for.
   * @returns {Promise<any>} A promise that resolves to the value associated with the key.
   */
  async get(key: string): Promise<any> {
    return this.cache[key]
  }

  /**
   * Sets the value associated with the specified key.
   * @param {string} key - The key to set the value for.
   * @param {any} value - The value to set.
   * @returns {Promise<void>} A promise that resolves when the value has been set.
   */
  async set(key: string, value: any): Promise<void> {
    this.cache[key] = value
    this.tasks.push({
      type: 'update',
      key,
      value,
    })
  }

  /**
   * Deletes the value associated with the specified key.
   * @param {string} key - The key to delete the value for.
   * @returns {Promise<void>} A promise that resolves when the value has been deleted.
   */
  async delete(key: string): Promise<void> {
    delete this.cache[key]
    this.tasks.push({
      type: 'delete',
      key,
    })
  }

  /**
   * Writes the cached data to the file.
   * @returns {Promise<void>} A promise that resolves when the data has been written to the file.
   */
  private async writeFileData(): Promise<void> {
    await this.open('w')
    if (this.fileHandle) {
      for (const task of this.tasks) {
        switch (task.type) {
          case 'update':
            this.cache[task.key] = task.value
            break
          case 'delete':
            delete this.cache[task.key]
            break
        }
      }
      await this.fileHandle.writeFile(JSON.stringify(this.cache))
      await this.fileHandle.close()
      this.tasks = []
    }
  }

  /**
   * Starts the interval for periodically writing the cached data to the file.
   */
  private startWriteInterval() {
    this.writeInterval = setInterval(async () => {
      await this.writeFileData()
    }, this.writeIntervalDelay)
  }

  /**
   * Stops the interval for periodically writing the cached data to the file.
   */
  private stopWriteInterval() {
    if (this.writeInterval) {
      clearInterval(this.writeInterval)
      this.writeInterval = null
    }
  }

  /**
   * Reads the data from the file into the cache.
   * @returns {Promise<void>} A promise that resolves when the data has been read from the file.
   */
  private async getCacheFromFile(): Promise<void> {
    await this.open('r', true)
    if (this.fileHandle) {
      const data = await this.fileHandle.readFile()
      this.cache = JSON.parse(data.toString())
      await this.fileHandle.close()
    }
  }

  /**
   * Opens the file with the specified mode.
   * @param {number|string} [mode='r'] - The mode to open the file in. Defaults to 'r' (read mode).
   * @param {boolean} [create=false] - Whether to create the file if it doesn't exist. Defaults to false.
   * @returns {Promise<void>} A promise that resolves when the file has been opened.
   */
  async open(
    mode: number | string = 'r',
    create: boolean = false
  ): Promise<void> {
    if (create) {
      // check if file exists
      try {
        // Query the entry
        await fsPromises.access(this.filePath);
      } catch (error) {
        // if file does not exist, create it
        await fsPromises.writeFile(this.filePath, '{}');
      }
    }
    this.fileHandle = await fsPromises.open(this.filePath, mode);
  }

  /**
   * Closes the file and stops the write interval.
   * @returns {Promise<void>} A promise that resolves when the file has been closed.
   */
  async close(): Promise<void> {
    this.stopWriteInterval()
    await this.writeFileData()
    if (this.fileHandle) {
      await this.fileHandle.close()
    }
  }
}
