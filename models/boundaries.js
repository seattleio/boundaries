var assert = require('assert')

var config = require('../config')
var api = require('../api-client')(config)

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
    match: function (address, state, send, done) {
      var geocoder = L.mapbox.geocoder('mapbox.places')
      geocoder.query(address, function (err, data) {
        if (err || !data.latlng) {
          console.log('location not found')
        } else {
          var latitude = data.latlng[0];
          var longitude = data.latlng[1];
          api.boundaries({ lat: latitude, long: longitude }, function (err, res, body) {
            send('boundaries:setMatch', {
              address: address,
              lat: latitude,
              long: longitude,
              match: JSON.parse(body)
            }, done)
          })
        }
      })
    }
  }
}
