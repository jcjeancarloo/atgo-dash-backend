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

export const SRC_PATH: string = path.join(__dirname, '..', '..')

const isDist = __dirname.includes('dist')
export const DEV_PATH: string = path.join(__dirname, '..', `${isDist ? '../../src' : '..'}`)
export const ROOT_DIR = path.resolve(__dirname, '..', '..')

export const IUGU_AUTH_TOKEN = process.env.IUGU_AUTH_TOKEN ?? ''
export const IUGU_BASE_URL = process.env.IUGU_BASE_URL ?? ''
