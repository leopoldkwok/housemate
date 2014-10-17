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
    completedSum: Ember.computed.sum('completedAmount'),
    adjustedCompleted: (function() {
        if (this.get('completedSum').toString().charAt(this.get('completedSum').toString().length-2) === ".") {
            return this.get('completedSum').toString() + '0';
        } else {
            return this.get('completedSum').toString();
        }
    }).property('completedSum')
})




