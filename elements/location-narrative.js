var html = require('choo/html')
var css = require('sheetify')

module.exports = function (state, prev, send) {
  var prefix = css`
    :host {}
  `

  return html`<div class="${prefix}">
    
  </div>`
}
