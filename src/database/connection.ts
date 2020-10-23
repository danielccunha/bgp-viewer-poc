import mongoose from 'mongoose'

import config from '../config/mongo'

mongoose.connect(
  `mongodb://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}?authSource=${config.authSource}`,
  {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true
  }
)
