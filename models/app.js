var createLocation = require('sheet-router/create-location')

module.exports = function (config) {
  return {
    state: {
      org: 'seattle.io',
      orgLink: 'http://seattle.io',
      project: 'boundaries'
    },
    reducers: {
      setLocation: function (state, data) {
        state.location = createLocation(state.location, data)
        return state
      }
    },
    effects: {
      go: function (state, data, send, done) {
        window.history.pushState({}, null, data)
        document.body.scrollTop = 0
        send('setLocation', data, done)
      }
    },
    subscriptions: []
  }
}
