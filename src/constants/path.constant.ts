import { homedir } from 'os'
import { join } from 'path'
import { isDev } from '../global/env.global'
const appName = 'nx-space'
export const HOME = homedir()
export const DATA_DIR = isDev
  ? join(process.cwd(), './tmp')
  : join(HOME, `.${appName}`)

export const LOG_DIR = join(DATA_DIR, 'log')