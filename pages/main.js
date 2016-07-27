var html = require('choo/html')
var css = require('sheetify')

var header = require('../elements/header')
var map = require('../elements/map-bg')({
  initialState: require('../models/map').state
})
var list = require('../elements/list')

module.exports = function (state, prev, send) {  
  var prefix = css`
    :host {
      height: 100%;
    }

    .landing-search {
      width: 90%;
      height: 350px;
      background-color: #fff;
      box-shadow: 0px 1px 5px 0px rgba(0,0,0,0.5);
      position: fixed;
      top: 20%;
      padding: 30px;
      box-sizing: border-box;
      margin-left: 5%;
    }

    .landing-search-title {
      text-align: center;
      font-weight: 500;
    }

    .landing-search-description {
      font-size: 90%;
      margin-bottom: 20px;
    }

    .landing-search-input {
      text-align: center;
    }

    .landing-search-input label {
      font-size: 18px;
      font-weight: 500;
    }

    @media (min-width: 600px) {
      .landing-search {
        width: 500px;
        height: 300px;
        position: fixed;
        top: calc(50% - 150px);
        left: calc(50% - 250px);
        padding: 30px 50px;
        margin-left: 0px;
      }
    }
  `

  var address = state.boundaries.address
  function oninput (e) {
    address = e.target.value
  }

  function onclick (e) {
    if (address) {
      send('boundaries:match', address)
    }
  }

  function onkeypress (e) {
    if (address && e.keyCode === 13) {
      send('boundaries:match', address)
    }
  }

  if (state.boundaries.match) {
    return html`<div class="${prefix}">
      ${header(state, prev, send)}
      ${list(state, prev, send)}
    </div>`
  } else {
    return html`<div class="${prefix} app-main">
      ${header(state, prev, send)}
      ${map(state, prev, send)}
      <div class="landing-search">
        <h2 class="landing-search-title">Find the Seattle boundaries you're in!</h2>
        <p class="landing-search-description">Seattle has a lot of boundaries: city council districts, school districts, police beats, & a lot more. This tool makes it easy to know which boundaries you're in so you can better understand how city services & policies affect you.</p>
        <div class="landing-search-input">
          <label>Search with an address:<br>
          <input
            type="text" 
            autofocus="true"
            placeholder="Address"
            value="${state.boundaries.address || ''}"
            oninput=${oninput}
            onkeypress=${onkeypress}
          >
          </label>
          <button onclick=${onclick}>Find boundaries</button>
        </div>
      </div>
    </div>`
  }
}
