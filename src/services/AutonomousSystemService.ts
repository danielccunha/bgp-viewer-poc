import Announcement from '../database/entities/Announcement'
import AutonomousSystem from '../database/entities/AutonomousSystem'
import Neighbor from '../database/entities/Neighbor'

interface AutonomousSystemWrapper {
  id: string
  number: number
  peer?: string
  announcements?: number[]
  neighborhood?: number[]
}

export async function fetchAll(): Promise<AutonomousSystemWrapper[]> {
  const autonomousSystems = await AutonomousSystem.find()
  return autonomousSystems.map(as => ({
    id: as.id,
    peer: as.peer,
    number: as.number
  }))
}

export async function findById(id: string): Promise<AutonomousSystemWrapper> {
  const as = await AutonomousSystem.findById(id).lean()
  if (!as) {
    return null
  }

  const announcements = await findAnnouncements(as.number)
  const neighborhood = await findNeighborhood(as.number)

  return {
    id: as._id,
    number: as.number,
    peer: as.peer,
    announcements,
    neighborhood
  }
}

async function findAnnouncements(asn: number): Promise<number[]> {
  const announcements = await Announcement.find({ to: asn }, { from: 1 }).lean()
  const fromASNs = announcements.map(as => as.from).sort()
  return [...new Set(fromASNs)]
}

async function findNeighborhood(asn: number): Promise<number[]> {
  const fromASNs = await Neighbor.find({ from: asn }).lean()
  const toASNs = await Neighbor.find({ to: asn }).lean()
  const mappedASNs = [
    ...fromASNs.map(as => as.to),
    ...toASNs.map(as => as.from)
  ].sort()
  return [...new Set(mappedASNs)]
}
