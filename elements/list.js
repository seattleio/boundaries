var html = require('choo/html')
var css = require('sheetify')

module.exports = function (state, prev, send) {
  var features = state.boundaries.match.features

  var prefix = css`
    :host {
      width: 40%;
      height: calc(100% - 50px);
      float: right;
      overflow-y: auto;
      border-left: 1px solid #ccc;
      background-color: #f3f3f1;
      position: absolute;
      top: 50px;
      right: 0;
      box-sizing: border-box;
      padding: 20px 50px;
    }
  `

  function eachFeature (feature) {
    return item(feature, send)
  }

  return html`<div class="${prefix} list-wrapper">
    <h1>${state.boundaries.address}</h1>
    <p>${state.boundaries.lat}, ${state.boundaries.long}</p>
    <h2>Matching boundaries:</h2>
    ${features.map(eachFeature)}
  </div>`
}

function item (feature, send) {
  var props = feature.properties
  var keys = Object.keys(props)
  function eachPropKey (key) {
    if (key !== 'dataset')
    return html`<p class="item-metadata-field">${key}: ${props[key]}</p>`
  }
  return html`<div class="item-metadata">
    <h3>${props.dataset}</h3>
    ${keys.map(eachPropKey)}
  </div>`
}
