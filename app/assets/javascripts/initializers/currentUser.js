Ember.Application.initializer({
  name: 'currentUser',
  initialize: function(container) {
    var attributes, controller, store, user;
    store = container.lookup('store:main');
    attributes = $('meta[name="current-user"]').attr('content');
    if (attributes) {
      user = store.push('user', store.serializerFor(App.User).normalize(App.User, JSON.parse(attributes)));
      controller = container.lookup('controller:currentUser').set('content', user);
      return container.typeInjection('controller', 'currentUser', 'controller:currentUser');
    }
  }
});
