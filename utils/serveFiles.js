import fs from 'node:fs/promises'
import path from 'node:path'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'


export async  function serveFiles(req, res, dirname) {

  const publicPath = path.join(dirname, 'public')
  const filePath = path.join(publicPath, req.url === '/' ? 'index.html' : req.url)
  console.log(filePath)
  const fileExtension = path.extname(filePath)
  console.log(fileExtension)
  const extension = getContentType(fileExtension)
  console.log(extension)
  
  try {
  const content = await fs.readFile(filePath)
  sendResponse(res, 200, extension , content)
  } catch (err) {
    sendResponse(res,400, 'index.html', err)
  }

}