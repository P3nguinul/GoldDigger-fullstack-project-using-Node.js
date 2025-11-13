export function sendResponse(res, statusCode, contentType, content) {

  res.statusCode = 200
  res.setHeader('Content-Type', contentType)
  res.end(content)
  
}