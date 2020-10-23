interface IMongoConfig {
  host: string
  port: string
  username: string
  password: string
  database: string
  authSource: string
}

export default {
  host: process.env.MONGO_HOST || 'localhost',
  port: process.env.MONGO_PORT || '27017',
  authSource: process.env.MONGO_AUTH || 'admin',
  username: process.env.MONGO_USER,
  password: process.env.MONGO_PASS,
  database: process.env.MONGO_DB
} as IMongoConfig
