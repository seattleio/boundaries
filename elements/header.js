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

    nav a {
      line-height: 50px;
    }
  `

  return html`<header class="site-header ${prefix}">
    <h1>
      <a href="${state.orgLink}" class="app-org-title">${state.org}</a>
      <a href="/" class="app-project-title">${state.project}</a>
      ${reset(state, prev, send)}
    </h1>
    <nav class="dt fr mw8">
      <div class="dtc v-mid tr">
        <a class="f6 fw4 hover-white no-underline white dn dib-ns ph3 hvr-border-white" href="/about">About</a>
        <a class="f6 fw4 hover-white no-underline white dn dib-ns ph3 hvr-border-white" href="/api">Developer API</a>
      </div>
    </nav>
  </header>`
}

function reset (state, prev, send) {
  function onclick (e) {
    send('boundaries:reset')
  }

  return (state.boundaries.match || state.showSearch)
    ? html`<button class="ml3" onclick=${onclick}>New search</button>`
    : ''
}
