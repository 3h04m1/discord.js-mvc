import { Plugin } from 'discord.js-mvc'
import { Session } from './Session'
import { Storage } from './types'

export function SessionPlugin(
  storage: Storage,
  initialData: Record<string, string>
): Plugin {
  return (ctx) => {
    const userID = ctx.interaction.user.id
    ;(ctx as any).session = new Session(storage, initialData, userID)
  }
}
