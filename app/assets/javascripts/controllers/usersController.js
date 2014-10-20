App.UsersController = Ember.ArrayController.extend({
    actions: {
        removeBill: function (id) {
            var bill = this.store.find('bill', id).then(function(bill){
                bill.deleteRecord();
                bill.save()
            });
        }
    },
    // observeSession: function() {
    //     this.send("sessionChanged");
    // }.observes("session.isAuthenticated")
})
