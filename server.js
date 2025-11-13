import http from 'node:http'
import { serveFiles } from './utils/serveFiles.js'

const PORT = 8001
const __dirname = import.meta.dirname
console.log(typeof __dirname)

const server = http.createServer(async (req, res) => {

if( req.url === '/api') {

  res.end('hi')

} else if ( !req.url.startsWith('/api')) {

  return await serveFiles(req,res, __dirname)

}

})


server.listen(PORT, () => {
  console.log("Listening on port: ",PORT )
})

