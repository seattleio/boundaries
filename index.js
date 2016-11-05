var choo = require('choo')
var css = require('sheetify')

var app = choo({
  onAction: function (data, state, name, trace, createSend) {
    console.log(name)
  }
})

app.model(require('./models/app')())
app.model(require('./models/boundaries')())
app.model(require('./models/map')())

app.router([
  ['/', require('./pages/main')],
  ['/about', require('./pages/about')],
  ['/api', require('./pages/api')]
])

css('./style.css', { global: true })

var tree = app.start()
document.body.appendChild(tree)
