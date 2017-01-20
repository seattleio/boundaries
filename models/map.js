var assert = require('assert')

module.exports = function () {
  return {
    namespace: 'map',
    state: {
      tiles: 'mapbox.streets',
      setView: true,
      center: [47.606,-122.332],
      zoom: 11,
      scrollWheelZoom: false
    },
    reducers: {
      center: function (state, data) {
        assert.ok(data || data.length || data.length === 2, 'map:center reducer: [lat, long] is required as data')
        return { center: data }
      }
    }
  }
}
