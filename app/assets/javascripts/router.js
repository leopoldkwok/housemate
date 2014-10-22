App.Router.reopen({
  location: 'history',
  rootURL: '/'
})

App.Router.map(function() {   
    this.resource('users', { path: '/'})
})

