App.UsersRoute = Ember.Route.extend({
    // actions: {
    //     sessionChanged: function() {
    //         this.refresh();
    //     },
    // },
    model: function() { return this.store.find('user')},

});

// App.UsersRoute = Ember.Route.extend({
//     model: function() { 
//         var store = this.store;
//         return store.find('user').then(function(users){
//             return {
//                 users: users,
//                 bills: store.find('bill')
//             }
//         });
//     }
// });