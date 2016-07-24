var config = {
  development: {
    url: 'http://boundaries.seattle.io',
    port: 80
  },
  production: {
    url: 'http://boundaries.seattle.io',
    port: process.env.PORT
  }
}

module.exports = config[process.env.NODE_ENV || 'development']
