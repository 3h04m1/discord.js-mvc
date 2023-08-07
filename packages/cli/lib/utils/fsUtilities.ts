import {existsSync, mkdirSync} from "node:fs"

export function existsOrMakeDir(dir: string) {
    if (existsSync(dir)) {
      return dir
    }
    mkdirSync(dir, {
      recursive: true,
    })
    return dir
  }