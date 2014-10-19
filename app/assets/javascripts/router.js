App.Router.reopen({
  location: 'history',
  rootURL: '/'
})

App.Router.map(function() {
    // this.resource('bills', { path: '/'})    
    this.resource('users', { path: '/'})
})

