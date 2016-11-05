var assert = require('assert')

var config = require('../config')
var api = require('../api-client')(config)

module.exports = function () {
  return {
    namespace: 'boundaries',
    state: {
      address: '',
      boundaries: null,
      match: null,
      lat: null,
      long: null
    },
    reducers: {
      setMatch: function (state, data) {
        assert.ok(data || typeof data === 'object', 'map:match reducer: data object is required')
        return { address: data.address, lat: data.lat, long: data.long, match: data.match }
      },
      resetSearch: function (state, data) {
        return { address: null, lat: null, long: null, match: null }
      }
    },
    effects: {
      reset: function (state, address, send, done) {
        send('go', '/', function () {
          send('boundaries:resetSearch', done)
        })
      },
      match: function (state, address, send, done) {
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

}