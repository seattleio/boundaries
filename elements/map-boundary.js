var html = require('choo/html')
var css = require('sheetify')
var inline = require('dom-css')
var L = require('mapbox.js')
L.mapbox.accessToken = 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'

module.exports = function createBoundaryMap (options) {
  var initialState = options.initialState

  var prefix = css`
    :host {
      height: 200px;
    }
  `

  function onload (node) {
    map.invalidateSize()
  }

  var el = html`<div id="map-${prefix}" style="height:100%"></div>`  
  var map = window.lmap = L.mapbox.map(el, initialState.tiles, initialState)
  var featureLayer = L.mapbox.featureLayer().addTo(map)

  return function renderBoundaryMap (state, prev, send) {
    // state.lat
    // state.long
    // state.geojson
    // state.map.zoom
    // state.map.center
    var wrapper = html`<div class="map-wrapper ${prefix}" onload=${onload}>${el}</div>`

    L.marker([state.lat, state.long], {
      icon: L.mapbox.marker.icon({
        'marker-color': '#f86767'
      })
    }).addTo(map)

    if (state.geojson) {
      featureLayer.setGeoJSON(state.geojson)
    }

    map.setView([state.lat, state.long])
    
    return wrapper
  }
}
