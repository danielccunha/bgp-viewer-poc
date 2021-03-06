import 'dotenv/config'
import WebSocket from 'ws'

import './database/connection'
import './config/scheduler'
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
  if (!isNaN(message.asn)) {
    service.process(message)
  }
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

  console.log('Successfully started \x1b[33mlistener\x1b[0m‎‎ ')
}
