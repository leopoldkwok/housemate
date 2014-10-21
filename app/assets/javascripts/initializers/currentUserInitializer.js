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

// Ember.Application.initializer({
//   name: "fetchUsers",
//   after: "store",

//   initialize: function(container, application) {
//     var store, user, proxy;
//     application.deferReadiness();
//     store = container.lookup('store:main');
//     proxy = App.CurrentUserObjectProxy.extend();
//     container.register('user:current', proxy, {singleton: true});
//     proxy = container.lookup('user:current');
//     store.find('user').then( function(users) {
//       user = users.findBy('isCurrent', true);
//       proxy.set('content', user);
//       application.inject('controller', 'currentUser', 'user:current');
//       application.advanceReadiness();
//     });
//   }
// });


// container.lookup('store:main').find('user', 'current').then( function(user) {
//         // Register the `user:current` namespace
//         container.register('user:current', user, {instantiate: false, singleton: true});
 
//         // Inject the namespace into controllers and routes
//         container.injection('route', 'currentUser', 'user:current');
//         container.injection('controller', 'currentUser', 'user:current');
 
//         // Continue the Application boot process, allowing other Initializers to run
//         application.advanceReadiness();
//       });