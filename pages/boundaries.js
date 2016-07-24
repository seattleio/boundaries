var html = require('choo/html')
var css = require('sheetify')

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
  `

  return html`<div class="${prefix}">
    ${header(state, prev, send)}
    ${map(state, prev, send)}
    ${list(state, prev, send)}
  </div>`
}
