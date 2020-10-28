import Announcement from '../database/entities/Announcement'
import AutonomousSystem from '../database/entities/AutonomousSystem'

interface SimplifiedAS {
  id: string
  peer: string
  number: number
}

interface CompleteAS extends SimplifiedAS {
  announcements: number[]
}

export async function fetchAll(): Promise<SimplifiedAS[]> {
  const autonomousSystems = await AutonomousSystem.find()
  return autonomousSystems.map(as => ({
    id: as._id,
    peer: as.peer,
    number: as.number
  }))
}

export async function findOne(id: string): Promise<CompleteAS> {
  const autonomousSystem = await AutonomousSystem.findById(id)
  if (!autonomousSystem) return null

  const announcements = await Announcement.find(
    { to: autonomousSystem.number },
    { from: 1 }
  ).lean()

  return {
    id: autonomousSystem._id,
    peer: autonomousSystem.peer,
    number: autonomousSystem.number,
    announcements: [...new Set(announcements.map(as => as.from))]
  }
}
