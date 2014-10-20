App.UserController = Ember.ObjectController.extend({
    actions: {
        removeBill: function (id) {
            var bill = this.store.find('bill', id).then(function(bill){
                bill.deleteRecord();
                bill.save()
            });
        }
    },
    completed: function() {
        return this.get('bills').filterBy('settled', true);
    }.property('bills','@each.settled'),
    completedAmount: Ember.computed.mapBy('completed', 'amount'),
    completedSum: Ember.computed.sum('completedAmount'),
    adjustedCompleted: (function() {
        if (this.get('completedSum').toString().charAt(this.get('completedSum').toString().length-2) === ".") {
            return this.get('completedSum').toString() + '0';
        } else {
            return this.get('completedSum').toString();
        }
    }).property('completedSum'),
    issettled:  function() {
        Ember.Logger.log(this);
        var bill = this.get('bills').filterBy('_changed', true)[0];
        Ember.Logger.log(bill);
        bill.set('_changed', false)
        bill.save();
    }.observes('bills.@each.settled')
})