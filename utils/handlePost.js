import { sendResponse } from './sendResponse.js'
import { parsedBody } from  './parsedBody.js'
import { addInvestmentLog } from './addInvestmentLog.js'

export async function handlePost(req,res) {

  try {

    const body = await parsedBody(req)
    const { investment, goldOuncesBought, goldPrice } = body
    await addInvestmentLog(investment, goldOuncesBought, goldPrice)
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({ success: true }))

  } catch (err) {

    sendResponse(res, 400, 'text/html', JSON.stringify({error: err}))

  }
}