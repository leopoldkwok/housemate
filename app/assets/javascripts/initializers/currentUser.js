// Ember.Application.initializer({
//   name: 'currentUser',
//   initialize: function(container,application) {
//     application.deferReadiness()
//     var attributes, controller, store, user;
//     store = container.lookup('store:main');
//     attributes = $('meta[name="current-user"]').attr('content');
//     if (attributes) {
//       user = store.push('user', store.serializerFor('user').normalize(store.modelFor('user'), JSON.parse(attributes)));
//       controller = container.lookup('controller:currentUser').set('content', user);
//       return container.typeInjection('controller', 'currentUser', 'controller:currentUser');
//     }
//     application.advanceReadiness();
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