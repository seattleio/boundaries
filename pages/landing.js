var html = require('choo/html')
var css = require('sheetify')

var config = require('../config')
var api = require('../api-client')(config)

var header = require('../elements/header')
var map = require('../elements/map')({
  initialState: require('../models/map').state
})
var list = require('../elements/list')

module.exports = function (state, prev, send) {  
  var prefix = css`
    :host {
      height: 100%;
    }

    .landing-search {
      width: 500px;
      height: 300px;
      background-color: #fff;
      box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
      position: fixed;
      top: calc(50% - 150px);
      left: calc(50% - 250px);
      padding: 30px 50px;
      box-sizing: border-box;
    }

    .landing-search-title {
      text-align: center;
      font-weight: 500;
    }

    .landing-search-description {
      font-size: 90%;
    }
  `

  var address = state.boundaries.address
  function oninput (e) {
    address = e.target.value
  }

  function onclick (e) {
    if (address) {
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
            })
          })
        }
      })
    }
  }

  if (state.boundaries.match) {
    return html`<div class="${prefix}">
      ${header(state, prev, send)}
      ${map(state, prev, send)}
      ${list(state, prev, send)}
    </div>`
  } else {
    return html`<div class="${prefix} app-main">
      ${header(state, prev, send)}
      ${map(state, prev, send)}
      <div class="landing-search">
        <h2 class="landing-search-title">Find the Seattle boundaries you're in!</h2>
        <p class="landing-search-description">Seattle has a lot of boundaries: city council districts, school districts, police beats, & a lot more. This tool makes it easy to know which boundaries you're in so you can better understand how city services & policies affect you.</p>
        <label>Enter an address:
        <input
          type="text" 
          autofocus="true"
          placeholder="Address"
          value="${state.boundaries.address || ''}"
          oninput=${oninput}>
        </input>
        </label>
        <button onclick=${onclick}>Find boundaries</button>
      </div>
    </div>`
  }
}
