var choo = require('choo')
var css = require('sheetify')

var api = require('./api-client')()

var app = choo({
  onAction: function (data, state, name, trace, createSend) {
    console.log(name)
  }
})

app.model(require('./models/app'))
app.model(require('./models/boundaries'))
app.model(require('./models/location'))
app.model(require('./models/map'))

app.router(function (route) {
  return [
    route('/', require('./pages/main'))
  ]
})

css('./style.css', { global: true })

var tree = app.start()
document.body.appendChild(tree)
