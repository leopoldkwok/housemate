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
//   name: 'currentUser',
//   after: 'store',
//   initialize: function(container, application) {
//     var attributes, controller, store, user;
//     application.deferReadiness();
//     store = container.lookup('store:main');
//     $.ajax({
//       type: 'GET',
//       url: '/users/current',
//         success: function(payload) {
//           Ember.Logger.log(payload.user)
//         // var userReference = store.load('user', payload.user);
//         // store.push('user', store.serializerFor(App.User).normalize(store.modelFor(App.User), user));
//         // controller = container.lookup('controller:currentUser').set('content', user);
//       }.bind(this)
//     });
//     application.advanceReadiness();
//   }
// });


// $.ajax({
//     type: 'GET',
//     url: '/users/current',
//     success: function(payload) {
//         var store = this.store;
//         var userReference = store.load(App.User, payload.user);
//         App.set('currentUser', store.recordForReference(userReference));
//     }.bind(this)
// });
