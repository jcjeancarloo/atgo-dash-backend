import * as dotenv from 'dotenv'
import path from 'path'
const { version } = require('../../../package.json')
dotenv.config()

const numericHandler = (defaultNumber: number, value?: any): number => {
  const parsed = Number(value)
  if (Number.isNaN(parsed)) return defaultNumber
  return parsed
}

export const PACKAGE_VERSION: string = version

export const PORT: number = numericHandler(3000, process.env.PORT)

export const HASHER_SALT: number = 12

export const JWT_SECRET: string = process.env.JWT_SECRET ?? 'fake-secret'

export const JWT_EXPIRE_MS: number = numericHandler(3600, process.env.JWT_EXPIRE_MS)

export const SRC_PATH: string = path.join(__dirname, '..', '..')

const isDist = __dirname.includes('dist')
export const DEV_PATH: string = path.join(__dirname, '..', `${isDist ? '../../src' : '..'}`)
export const ROOT_DIR = path.resolve(__dirname, '..', '..')
