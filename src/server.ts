import 'dotenv/config'

import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import cors from 'cors'
import 'express-async-errors'

import routes from './routes'
import handleError from './middleware/handleError'

const app = express()
const port = process.env.PORT || 3333

app.use(helmet())
app.use(cors())
app.use(morgan('dev'))
app.use(express.json())
app.use('/api', routes)
app.use(handleError)

app.listen(port, () => {
  console.log(`Successfully started server on port \x1b[32m${port}\x1b[0m`)
})
