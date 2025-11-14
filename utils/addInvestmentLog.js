import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export async function addInvestmentLog(invested, goldOuncesBought, goldPrice) {
  const logsPath = path.join(__dirname, '../logs/logs.txt')
  const textLog = `(Date: ${new Date().toISOString()}), amount paid: ${invested}, price per Oz: ${goldPrice}, gold bought: ${goldOuncesBought}\n`

  try {
    await fs.appendFile(logsPath, textLog)
    console.log("Log saved")
  } catch (err) {
    console.error("Error writing log:", err)
  }
}
