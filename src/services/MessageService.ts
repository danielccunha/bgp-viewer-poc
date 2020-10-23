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
  process(message: Message): void {
    const transformed = {
      ...message,
      announcements: this.transformAnnouncements(message),
      neighborhood: this.transformNeighborhood(message)
    }

    // TODO: Store values
    console.log(transformed)
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
}
