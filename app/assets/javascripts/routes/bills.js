App.BillsRoute = Ember.Route.extend({
    model: function() { return this.store.find('bill')}
})