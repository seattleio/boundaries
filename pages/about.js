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
      <h1 class="f-headline f2 mt0">About</h1>
      <p>Seattle.io Boundaries is a tool for determining what boundaries surround a point in Seattle.</p>
      <p>This is useful for figuring out school district boundaries, police beats, city council districts, and others.</p>

      <h2>Get involved</h2>
      <p>Interested in collaborating on the Seattle.io Boundaries project? All our code is hosted on GitHub and contributions are welcome!</p>

      <h3>API server</h3>
      <p>The API server code is on GitHub: <a href="https://github.com/seattleio/boundaries-api">seattleio/boundaries-api</a></p>

      <h3>The web app</h3>

      <p>The web app code is also on GitHub: <a href="https://github.com/seattleio/boundaries">seattleio/boundaries</a></p>

      <h3>Data</h3>
      <p>This project uses <a href="https://github.com/openseattle/seattle-boundaries">seattle-boundaries</a>, a collection of GeoJSON boundaries for the city of Seattle.

      
    </div>
  </div>`
}
