import {
  type BaseInteraction,
} from 'discord.js'

export function hasCustomId(
  interaction: BaseInteraction
): interaction is BaseInteraction & { customId: string }{
  return 'customId' in interaction
}

export type MaybePromise<T = any> = T | Promise<T>

export type MaybeArray<T = any> = T | Array<T>
  