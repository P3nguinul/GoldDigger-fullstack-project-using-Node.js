import http from 'node:http'
import { serveFiles } from './utils/serveFiles.js'
import { getGoldPrice } from './utils/getGoldPrice.js'
import { setSSEheaders } from './utils/setSSEheaders.js'
import { handlePost } from './utils/handlePost.js'

const PORT = 8001
const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

if ( req.url === '/sse') {
  setSSEheaders(res)
  setInterval(() => {
    const  goldPrice = getGoldPrice()    

    res.write(`data:${JSON.stringify({event: 'update-price', price: goldPrice})}\n\n`)
    
  }, 3000)

} else  if (req.url === '/log' && req.method === 'POST') {

    handlePost(req,res)    

  } else {

  return await serveFiles(req,res, __dirname)

  }

})


server.listen(PORT, () => {
  console.log("Listening on port: ",PORT )
})

