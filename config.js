var config = {
  development: {
    host: 'https://boundaries-api.seattle.io'
  },
  production: {
    host: 'https://boundaries-api.seattle.io'
  }
}

module.exports = config[process.env.NODE_ENV || 'development']
