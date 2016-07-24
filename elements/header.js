var html = require('choo/html')
var css = require('sheetify')

module.exports = function header (state, prev, send) {
  var prefix = css`
    :host {
      width: 100%;
      background-color: #535351;
      height: 50px;
    }

    h1 {
      font-size: 18px;
      line-height: 1;
      margin: 0px 0px 0px 0px;
      display: inline-block;
      font-weight: 500;
    }

    h1 a {
      text-decoration: none;
      color: #f3f3f1;
    }

    .app-org-title {
      display: block;
      float: left;
      padding: 0px 10px;
      height: 50px;
      line-height: 50px;
      background-color: rgb(243, 73, 83);
      color: #eee;
    }

    .app-project-title {
      display: block;
      float: left;
      padding: 0px 10px;
      height: 50px;
      line-height: 50px;
      text-transform: uppercase;
      font-size: 14px;
      letter-spacing: 1px;
    }
  `

  return html`<header class="${prefix}">
    <h1>
      <a href="${state.app.orgLink}" class="app-org-title">${state.app.org}</a>
      <a href="/" class="app-project-title">${state.app.project}</a>
      ${reset(state, prev, send)}
    </h1>
  </header>`
}

function reset (state, prev, send) {
  var prefix = css`
    :host {
      border: 1px solid transparent;
      background-color: transparent;
      color: #fff;
      float: right;
      height: 30px;
      margin: 10px 0px;
      cursor: pointer;
    }

    :host:hover {
      border: 1px solid #fff;
    }
  `

  function onclick (e) {
    console.log('reset')
    send('boundaries:reset')
  }

  return state.boundaries.match
    ? html`<button class="${prefix}" onclick=${onclick}>New search</button>`
    : ''
}
