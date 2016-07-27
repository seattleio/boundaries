var html = require('choo/html')
var css = require('sheetify')
var inline = require('dom-css')
var L = require('mapbox.js')
L.mapbox.accessToken = 'pk.eyJ1Ijoic2V0aHZpbmNlbnQiLCJhIjoiSXZZXzZnUSJ9.Nr_zKa-4Ztcmc1Ypl0k5nw'

module.exports = function createMapView (options) {
  var initialState = options.initialState

  var prefix = css`
    :host {
      height: calc(100% - 50px);
      overflow: hidden;
      float: left;
    }

    #map {
      height: 100%;
    }
  `

  function onload (node) {
    map.invalidateSize()
  }

  var el = html`<div id="map"></div>`  
  var map = window.lmap = L.mapbox.map(el, initialState.tiles, initialState)
  var featureLayer = L.mapbox.featureLayer().addTo(map)

  return function mapView (state, prev, send) {
    // state.features
    // state.map.zoom
    // state.map.center
    var wrapper = html`<div class="map-wrapper ${prefix}" onload=${onload}>${el}</div>`

    if (state.features) {
      inline(wrapper, { width: '60%' })
      inline(el, { width: '100%' })
    } else {
      inline(wrapper, { width: '100%' })
    }

    map.setZoom(state.map.zoom)
    map.panTo(state.map.center)

    if (state.features) {
      featureLayer.setGeoJSON(state.features)
    }

    return wrapper
  }
}
