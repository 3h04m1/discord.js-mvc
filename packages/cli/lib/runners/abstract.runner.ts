import chalk from 'chalk'
import { ChildProcess, spawn, SpawnOptions } from 'child_process'
import { MESSAGES } from '../ui'
import { error } from '../utils'

export class AbstractRunner {
  constructor(protected binary: string, protected args: string[] = []) {}

  public async run(
    command: string,
    collect = false,
    cwd: string = process.cwd()
  ): Promise<null | string> {
    const args: string[] = [command]
    const options: SpawnOptions = {
      cwd,
      stdio: 'pipe',
      shell: true,
    }
    return new Promise<null | string>((resolve, reject) => {
      const child: ChildProcess = spawn(
        `${this.binary}`,
        [...this.args, ...args],
        options
      )
      if (collect) {
        child.stderr?.on('data', (data) => {
          console.error(data.toString().replace(/\r\n|\n/, ''))
        })
        child.stdout?.on('data', (data) => {
          console.log(data.toString().replace(/\r\n|\n/, ''))
        })
      }
      child.on('close', (code) => {
        if (code === 0) {
          resolve(null)
        } else {
          error(MESSAGES.COMMAND_ERROR(this.rawFullCommand(command)))
          // reject('Child process exited with code ' + code)
        }
      })
      child.on('error', (err) => {
        console.error(MESSAGES.COMMAND_ERROR(this.rawFullCommand(command)))
        reject(err)
      })
    })
  }

  /**
   * @param command
   * @returns The entire command that will be ran when calling `run(command)`.
   */
  public rawFullCommand(command: string): string {
    const commandArgs: string[] = [...this.args, command]
    return `${this.binary} ${commandArgs.join(' ')}`
  }
}
