App.Router.reopen({
  location: 'auto',
  rootURL: '/'
})

App.Router.map(function() {
    this.resource('bills', { path: '/'}, function() {
        this.route('bills/index');
    })
})

