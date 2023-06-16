import {
  type BaseInteraction,
} from 'discord.js'

export function hasCustomId(
  interaction: BaseInteraction
): interaction is BaseInteraction & { customId: string }{
  return 'customId' in interaction
}
