var html = require('choo/html')
var css = require('sheetify')
var xtend = require('xtend')

var header = require('../elements/header')

module.exports = function (state, prev, send) {  
  var prefix = css`
    :host {
      height: 100%;
    }
  `

  state = xtend(state, { showSearch: true })

  return html`<div class="about h-100">
    ${header(state, prev, send)}

    <div class="w-70-ns pa4 m-auto bg-white h-100 mt5">
      <h1 class="f-headline f2 mt0">Developer API</h1>
      <p>This web app is powered by an open API that you can use in your Seattle-focused applications.</p>

      <p>The boundaries are compiled in the <a href="https://npmjs.com/seattle-boundaries">seattle-boundaries</a> package on <a href="https://npmjs.com">npm</a>. You can find the source for that package <a href="https://github.com/openseattle/seattle-boundaries">on GitHub in the Open Seattle organization</a>.</p>

      <h2>Using the API</h2>

      <p>To learn about using the API, visit the <a href="https://github.com/seattleio/boundaries-api">GitHub repository for the boundaries API server</a></p>
      
      <h2>Learn more about the Seattle.io Boundaries project</h2>
      
      <p><a href="/about">Learn about the project and about getting involved</a></p>
    </div>
  </div>`
}
