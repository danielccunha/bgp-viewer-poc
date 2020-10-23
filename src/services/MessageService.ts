import AutonomousSystem, {
  IAutonomousSystem
} from '../database/entities/AutonomousSystem'

export interface Message {
  asn: number
  peer: string
  path: number[]
}

interface Relation {
  from: number
  to: number
}

export class MessageService {
  async process(message: Message): Promise<void> {
    // 1. Transform path into announcements and neighborhood
    const announcements = this.transformAnnouncements(message)
    const neighborhood = this.transformNeighborhood(message)

    // 2. Store Autonomous System
    const as = await this.storeAutonomousSystem(message.asn, message.peer)
  }

  private transformNeighborhood({ path = [] }: Message): Relation[] {
    const neighborhood: Relation[] = []

    for (let index = 1; index < path.length; index++) {
      neighborhood.push({
        from: path[index - 1],
        to: path[index]
      })
    }

    return neighborhood
  }

  private transformAnnouncements({ path = [] }: Message): Relation[] {
    const announcements: Relation[] = []
    const reversedPath = [...path].reverse()

    for (let fromIdx = 0; fromIdx < path.length - 1; fromIdx++) {
      const from = reversedPath[fromIdx]

      for (let toIdx = fromIdx + 1; toIdx < path.length; toIdx++) {
        announcements.push({
          from,
          to: reversedPath[toIdx]
        })
      }
    }

    return announcements
  }

  private async storeAutonomousSystem(
    asn: number,
    peer: string
  ): Promise<IAutonomousSystem> {
    return await AutonomousSystem.findOneAndUpdate(
      { number: asn },
      { number: asn, peer },
      { upsert: true, new: true }
    )
  }
}
