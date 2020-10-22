interface ListenerConfig {
  host?: string
}

export default {
  host: process.env.LISTENER_HOST
} as ListenerConfig
