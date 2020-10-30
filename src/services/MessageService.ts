import Announcement from '../database/entities/Announcement'
import AutonomousSystem from '../database/entities/AutonomousSystem'
import Neighbor from '../database/entities/Neighbor'

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
    // 1. Normalize path removing AS_SET from path
    const path = this.normalizePath(message.path)

    // 2. Transform path into announcements and neighborhood
    const announcements = this.transformAnnouncements(path)
    const neighborhood = this.transformNeighborhood(path)

    // 3. Store Autonomous System
    await this.storeAutonomousSystem(message.asn, message.peer)

    // 4. Store announcements
    for (const announcement of announcements) {
      await this.storeAnnouncement(announcement)
    }

    // 5. Store neighborhood
    for (const neighbors of neighborhood) {
      await this.storeNeighbors(neighbors)
    }
  }

  private normalizePath(path: number[] = []): number[] {
    return path.filter(asn => typeof asn === 'number')
  }

  private transformNeighborhood(path: number[]): Relation[] {
    const neighborhood: Relation[] = []

    for (let index = 1; index < path.length; index++) {
      neighborhood.push({
        from: path[index - 1],
        to: path[index]
      })
    }

    return neighborhood
  }

  private transformAnnouncements(path: number[]): Relation[] {
    const announcements: Relation[] = []

    for (let fromIdx = path.length - 1; fromIdx > 0; fromIdx--) {
      const from = path[fromIdx]

      for (let toIdx = fromIdx - 1; toIdx >= 0; toIdx--) {
        announcements.push({
          from,
          to: path[toIdx]
        })
      }
    }

    return announcements
  }

  private async storeAutonomousSystem(asn: number, peer: string) {
    try {
      await AutonomousSystem.findOneAndUpdate(
        { number: asn },
        { number: asn, peer },
        { upsert: true }
      )
    } catch (error) {
      // Don't need to handle because it's a DUPLICATE KEY error. It seldom happens and it's irrelevant
    }
  }

  private async storeAnnouncement({ from, to }: Relation) {
    await Announcement.findOneAndUpdate(
      { from, to },
      { from, to, updatedAt: new Date() },
      { upsert: true }
    )
  }

  private async storeNeighbors(relation: Relation) {
    // Sort ASNs to prevent duplicate values
    const [from, to] = [relation.from, relation.to].sort()

    await Neighbor.findOneAndUpdate(
      { from, to },
      { from, to, updatedAt: new Date() },
      { upsert: true }
    )
  }
}
