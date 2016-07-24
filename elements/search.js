var html = require('choo/html')
var css = require('sheetify')
var mapbox = require('mapbox')
var api = require('../api-client')()

module.exports = function search (state, prev, send) {
  var navbar = css`
    input[type=search] {
      text-align: center;
      width: 100%;
      cursor: auto;
      text-shadow: none;
      font-size: 20px;
      padding: 5px;
      border: 0px;
    }
  `

  function callback(err, data) {
    if (data.latlng) {
      var latitude = data.latlng[0];
      var longitude = data.latlng[1];
      api.boundaries({ lat: latitude, long: longitude }, function (err, res, body) {
        send('search', { address: addrpattern, lat: latitude, long: longitude });
        send('boundaries:match', { matchingBoundaries: JSON.parse(body) })
      })
    }
  }

  var address
  function oninput (e) {
    console.log('value', e.target.value)
    address = e.target.value
  }

  function onclick (e) {
    if (address) {
      var geocoder = L.mapbox.geocoder('mapbox.places')
      geocoder.query(address, function (err, a, b, c) {
        console.log(err, a, b, c)
      })
    }
  }

  return html`<nav class="${navbar}">
    <input
      type="text" 
      autofocus="true"
      placeholder="Address"
      value="${state.address}"
      oninput=${oninput}>
    </input>
    <button onclick=${onclick}>Find boundaries</button>
  </nav>`
}
