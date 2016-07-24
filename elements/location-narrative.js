var html = require('choo/html')
var css = require('sheetify')

module.exports = function (state, send) {
  var prefix = css`
    :host {}
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
  })

  var el = html`<div class="${prefix}"></div>`
  append(html`<p>This location is inside <b>${count}</b> Seattle-related boundaries.`)

  if (data['city-council-districts']) {
    append(html`<h2>City council district</h2>`)
    append(html`<p>This location is in <b>city council district ${data['city-council-districts'].district}</b>.`)
  }

  if (data['neighborhoods']) {
    append(html`<h2>Neighborhood</h2>`)
    append(html`<p>${data['neighborhoods'].name}</p>`)
  }

  if (data['parks']) {
    append(html`<h2>Park</h2>`)
    append(html`<p>${data.parks.name}</p>`)
  }

  append(html`<h2>Schools</h2>`)
  if (!data['sps-es'] && !data['sps-ms'] && !data['sps-hs']) {
    append(html`<p>This location is not inside any school districts.`)
  }
  if (data['sps-es']) {
    append(html`<h3>Elementary school</h3>`)
    append(html`<p>${data['sps-es']['ES_ZONE']}</p>`)
  }
  if (data['sps-ms']) {
    append(html`<h3>Middle school</h3>`)
    append(html`<p>${data['sps-ms']['MS_ZONE']}</p>`)
  }
  if (data['sps-hs']) {
    append(html`<h3>High school</h3>`)
    append(html`<p>${data['sps-hs']['HS_ZONE']}</p>`)
  }

  append(html`<h2>Police</h2>`)
  if (data['spd-beats']) {
    append(html`<h3>Beat</h3>`)
    append(html`<p>Police beat ${data['spd-beats'].name}`)
  }
  if (data['spd-precincts']) {
    append(html`<h3>Precinct</h3>`)
    append(html`<p>Precinct ${data['spd-precincts'].name}`)
  }
  if (data['spd-mcpp-areas']) {
    append(html`<h3>Micro-community policing plan area</h3>`)
    append(html`<p>${data['spd-mcpp-areas'].NAME} in precinct ${data['spd-mcpp-areas'].PRECINCT}`)
  }

  if (data['wa-legislature']) {
    append(html`<h2>Washington legislature</h2>`)
    append(html`<p>${data['wa-legislature']['NAMELSAD10']}</p>`)
  }

  if (data['congress']) {
    append(html`<h2>Congressional district</h2>`)
    append(html`<p>WA district ${data['congress']['CD114FP']}</p>`)
  }

  if (data['zoning']) {
    append(html`<h2>Zoning</h2>`)
    append(html`<p>${data.zoning.CLASS_DESC}</p>`)
  }

  if (data['zip-codes']) {
    append(html`<h2>Zip code</h2>`)
    append(html`<p>WA district ${data['zip-codes']['GEOID10']}</p>`)
  }

  if (data['census-tracts']) {
    append(html`<h2>Census</h2>`)
    append(html`<h3>Tract</h3>`)
    append(html`<p>${data['census-tracts'].name}</p>`)
  }

  append(html`<h2>City limits</h2>`)
  if (data['city-limits']) {
    append(html`<p>This location is inside Seattle city limits.</p>`)
  } else {
    append(html`<p>This location isn't inside city limits.</p>`)
  }

  function append (child) { el.appendChild(child) }
  return el
}
