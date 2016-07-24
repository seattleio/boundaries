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
  features.forEach(function (item) {
    var props = item.properties
    data[props.dataset] = props
  })

  var el = html`<div class="${prefix}"></div>`

  if (data['city-council-districts']) {
    el.appendChild(html`<p>This location is in <b>city council district ${data['city-council-districts'].district}</b>.`)
  }

  return el
}
