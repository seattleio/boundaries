var assert = require('assert')

module.exports = {
  namespace: 'boundaries',
  state: {
    address: '',
    boundaries: null,
    match: null,
    lat: null,
    long: null
  },
  reducers: {
    setMatch: function (data, state) {
      assert.ok(data || typeof data === 'object', 'map:match reducer: data object is required')
      return { address: data.address, lat: data.lat, long: data.long, match: data.match }
    },
    reset: function (data, state) {
      return { address: null, lat: null, long: null, match: null }
    }
  },
  effects: {
    match: function (data, state, send, done) {
      send('boundaries:setMatch', data, done)
    }
  }
}
