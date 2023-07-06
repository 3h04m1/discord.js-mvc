import { Input } from '../commands/command.input';
import { AbstractAction } from './abstract.action'

export class NewAction extends AbstractAction {
  public async handle(inputs: Input[]): Promise<void> {
    console.log('NewAction')
    console.log(inputs)
  }
}
