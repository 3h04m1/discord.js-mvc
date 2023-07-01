import {
  BaseInteraction,
  Message,
} from 'discord.js'

export function hasCustomId(
  interaction: BaseInteraction
): interaction is BaseInteraction & { customId: string }{
  return 'customId' in interaction
}

export type MaybePromise<T = any> = T | Promise<T>

export type MaybeArray<T = any> = T | Array<T>

export function isMsg(
  data: Message | BaseInteraction
): data is Message {
  return 'content' in data
}

export function isInteraction(
  data: Message | BaseInteraction
): data is BaseInteraction {
  return data instanceof BaseInteraction
}
  