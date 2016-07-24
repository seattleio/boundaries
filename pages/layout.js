var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')
var map = require('../elements/map')({
  initialState: require('../models/map').state
})

module.exports = function (childElement) {
  return function (state, prev, send) {
    return html`<div>
      ${header(state, prev, send)}
      ${map(state, prev, send)}
      ${childElement(state, prev, send)}
    </div>`
  }
}
