import WebSocket from 'ws'

import listenerConfig from './config/listener'
import { MessageService, Message } from './services/MessageService'

const ws = new WebSocket('wss://ris-live.ripe.net/v1/ws/?client=bgp-viewer-poc')
const service = new MessageService()

const transformMessage = (data: WebSocket.Data): Message => {
  const { data: message } = JSON.parse(data.toString())

  return {
    asn: parseInt(message.peer_asn),
    peer: message.peer,
    path: message.path
  }
}

ws.onmessage = ({ data }) => {
  const message = transformMessage(data)
  service.process(message)
}

ws.onopen = () => {
  const connectionParams = {
    ...listenerConfig,
    type: 'UPDATE'
  }

  ws.send(
    JSON.stringify({
      type: 'ris_subscribe',
      data: connectionParams
    })
  )
}
