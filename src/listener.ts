import WebSocket from 'ws'

const ws = new WebSocket('wss://ris-live.ripe.net/v1/ws/?client=js-example-1')
const params = {
  moreSpecific: true,
  host: 'rrc21',
  type: 'UPDATE',
  socketOptions: {
    includeRaw: false
  }
}
ws.onmessage = function (event) {
  const message = JSON.parse(event.data.toString())
  console.log(message.type, message.data)
}

ws.onopen = function () {
  ws.send(
    JSON.stringify({
      type: 'ris_subscribe',
      data: params
    })
  )
}
