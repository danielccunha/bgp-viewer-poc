import cron from 'node-cron'
import dayjs from 'dayjs'
import Announcement from '../database/entities/Announcement'
import Neighbor from '../database/entities/Neighbor'

const ttl = parseInt(process.env.SCHEDULER_TTL)
if (isNaN(ttl)) {
  throw new Error('Invalid TTL.')
}

function calculateBaseDate(): Date {
  return dayjs().add(-ttl, 'second').toDate()
}

async function removeAnnouncements(baseDate: Date) {
  await Announcement.deleteMany({ updatedAt: { $lt: baseDate } })
}

async function removeNeighborhood(baseDate: Date) {
  await Neighbor.deleteMany({ updatedAt: { $lt: baseDate } })
}

cron.schedule('* * * * *', async () => {
  const baseDate = calculateBaseDate()
  await removeAnnouncements(baseDate)
  await removeNeighborhood(baseDate)
})
