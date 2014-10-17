App.BillsController = Ember.ArrayController.extend({
    sortAscending: false,
    sortProperties: ['amount'],
    actions: {             
        createBill: function() {
            var description = this.get('newDescription')
            var amount      = this.get('newAmount')
            if (!amount) { return false; }
            if (!description.trim()) { return false; }

            var bill = this.store.createRecord('bill', {
                description:    description,
                amount:         amount
            })
            this.set('newDescription', '');
            this.set('newAmount', '');
            bill.save()
        }   
    },
    completed: function() {
        return this.filterBy('settled', true);
    }.property('@each.settled'),
    completedAmount: Ember.computed.mapBy('completed', 'amount'),
    completedSum: Ember.computed.sum('completedAmount')
})




