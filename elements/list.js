var html = require('choo/html')
var css = require('sheetify')

var narrative = require('./location-narrative')

module.exports = function (state, prev, send) {
  var features = state.boundaries.match.features

  var prefix = css`
    :host {
      width: 100%;
      box-sizing: border-box;
      padding: 20px 20px;
    }

    @media (min-width: 600px) {
      :host {
        width: 80%;
        max-width: 700px;
        margin: 0px auto;
        padding: 20px 50px;
      }
    }
  `

  return html`<div class="${prefix} list-wrapper">
    <h1>${state.boundaries.address}</h1>
    ${narrative(state, send)}
  </div>`
}
