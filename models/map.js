var assert = require('assert')

module.exports = {
  namespace: 'map',
  state: {
    tiles: 'mapbox.streets',
    setView: true,
    center: [47.606,-122.332],
    zoom: 11
  },
  reducers: {
    center: function (data, state) {
      assert.ok(data || data.length || data.length === 2, 'map:center reducer: [lat, long] is required as data')
      return { center: data }
    }
  }
}
