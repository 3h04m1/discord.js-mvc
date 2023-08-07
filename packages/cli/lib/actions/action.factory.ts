import { AbstractAction } from './abstract.action'
import { NewAction } from './new.action'
import { Actions } from './actions'
import { Input } from '../commands/command.input'

export function actionFactory<T extends Actions | string>(
  action: T,
  inputs: Input[],
  options?: Input[]
): AbstractAction {
  switch (action) {
    case Actions.NEW:
      return new NewAction(inputs, options)
    default:
      throw new Error(`Action ${action} not found`)
  }
}
