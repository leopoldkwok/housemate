Ember.Application.initializer({
  name: 'currentUser',
  after: 'store',
  initialize: function(container, application) {
    var attributes, controller, store, user;
    application.deferReadiness();
    store = container.lookup('store:main');
    attributes = $('meta[name="current-user"]').attr('content');
    if (attributes) {
        user = JSON.parse(attributes);
        user.current = true;
        store.push('user', store.serializerFor(App.User).normalize(store.modelFor(App.User), user));
        controller = container.lookup('controller:currentUser').set('content', user);
    }
    application.advanceReadiness();
  }
});

