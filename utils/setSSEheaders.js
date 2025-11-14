export function setSSEheaders (res) {
  res.statusCode = 200
  res.setHeader("Content-type" ,'text/event-stream')
  res.setHeader("Cache", "no-cache")
  res.setHeader("Connection", "keep-alive")
}