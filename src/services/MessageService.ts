export interface Message {
  asn: number
  peer: string
  path: number[]
}

export class MessageService {
  process(message: Message): void {
    console.log(`Received message:`, message)
  }
}
