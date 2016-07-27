var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

var boundaryMap = require('./map-boundary')
var initialState = require('../models/map').state

module.exports = function (state, send) {
  var prefix = css`
    :host {}

    h2 {
      margin: 20px 0px 5px 0px;
      padding-top: 50px;
      border-top: 5px solid #fff;
    }
  `
  var features = state.boundaries.match.features
  var address = state.boundaries.address
  var lat = state.boundaries.lat
  var long = state.boundaries.long

  var data = {}
  var count = features.length
  features.forEach(function (item) {
    var props = item.properties
    data[props.dataset] = props
    data[props.dataset].feature = item
  })

  var el = html`<div class="${prefix}"></div>`
  append(html`<p>This location is inside <b>${count}</b> Seattle-related boundaries.`)
  append(html`<p>latitude/longitude: ${state.boundaries.lat}, ${state.boundaries.long}</p>`)
  var mapstate = { map: state.map, lat: lat, long: long }

  function createMap (dataset, mapstate) {
    var map = boundaryMap({ initialState: initialState })
    return map(xtend(mapstate, { dataset: dataset, geojson: data[dataset].feature }))
  }

  if (data['city-council-districts']) {
    append(html`<div class="list-item">
      <h2>City council district</h2>
      <p>This location is in <b>city council district ${data['city-council-districts'].district}</b>.</p>
      ${createMap('city-council-districts', mapstate)}
    </div>`)
  }

  if (data['neighborhoods']) {
    append(html`<div class="list-item">
      <h2>Neighborhood</h2>
      <p>${data['neighborhoods'].name}</p>
      ${createMap('neighborhoods', mapstate)}
    </div>`)
  }

  if (data['parks']) {
    append(html`<div class="list-item">
      <h2>Park</h2>
      <p>${data.parks.name}</p>
      ${createMap('parks', mapstate)}
    </div>`)
  }

  append(html`<h2>Schools</h2>`)
  if (!data['sps-es'] && !data['sps-ms'] && !data['sps-hs']) {
    append(html`<p>This location is not inside any school districts.`)
  }
  if (data['sps-es']) {
    append(html`<div class="list-item">
      <h3>Elementary school</h3>
      <p>${data['sps-es']['ES_ZONE']}</p>
      ${createMap('sps-es', mapstate)}
    </div>`)
  }
  if (data['sps-ms']) {
    append(html`<div class="list-item">
      <h3>Middle school</h3>
      <p>${data['sps-ms']['MS_ZONE']}</p>
      ${createMap('sps-ms', mapstate)}
    </div>`)
  }
  if (data['sps-hs']) {
    append(html`<div class="list-item">
      <h3>High school</h3>
      <p>${data['sps-hs']['HS_ZONE']}</p>
      ${createMap('sps-hs', mapstate)}
    </div>`)
  }

  append(html`<h2>Police</h2>`)
  if (data['spd-beats']) {
    append(html`<div class="list-item">
      <h3>Beat</h3>
      <p>Police beat ${data['spd-beats'].name}
      ${createMap('spd-beats', mapstate)}
    </div>`)
  }
  if (data['spd-precincts']) {
    append(html`<div class="list-item">
      <h3>Precinct</h3>
      <p>Precinct ${data['spd-precincts'].name}
      ${createMap('spd-precincts', mapstate)}
    </div>`)
  }
  if (data['spd-mcpp-areas']) {
    append(html`<div class="list-item">
      <h3>Micro-community policing plan area</h3>
      <p>${data['spd-mcpp-areas'].NAME} in precinct ${data['spd-mcpp-areas'].PRECINCT}
      ${createMap('spd-mcpp-areas', mapstate)}
    </div>`)
  }

  if (data['wa-legislature']) {
    append(html`<div class="list-item">
      <h2>Washington legislature</h2>
      <p>${data['wa-legislature']['NAMELSAD10']}</p>
      ${createMap('wa-legislature', mapstate)}
    </div>`)
  }

  if (data['congress']) {
    append(html`<div class="list-item">
      <h2>Congressional district</h2>
      <p>WA district ${data['congress']['CD114FP']}</p>
      ${createMap('congress', mapstate)}
    </div>`)
  }

  if (data['zoning']) {
    append(html`<div class="list-item">
      <h2>Zoning</h2>
      <p>${data.zoning.CLASS_DESC}</p>
      ${createMap('zoning', mapstate)}
    </div>`)
  }

  if (data['zip-codes']) {
    append(html`<div class="list-item">
      <h2>Zip code</h2>
      <p>WA district ${data['zip-codes']['GEOID10']}</p>
      ${createMap('zip-codes', mapstate)}
    </div>`)
    
  }

  if (data['census-tracts']) {
    append(html`<div class="list-item">
      <h2>Census</h2>
      <h3>Tract</h3>
      <p>${data['census-tracts'].name}</p>
      ${createMap('census-tracts', mapstate)}
    </div>`)
  }

  // there's something messed up about the city limits dataset
  // append(html`<h2>City limits</h2>`)
  // if (data['city-limits']) {
  //   append(html`<p>This location is inside Seattle city limits.</p>`)
  //   append(createMap('city-limits', mapstate))
  // } else {
  //   append(html`<p>This location isn't inside city limits.</p>`)
  // }

  function append (child) { el.appendChild(child) }
  return el
}
