App.BillsController = Ember.ArrayController.extend({
    needs: ['flashMessage'],
    sortAscending: false,
    sortProperties: ['amount'],
    actions: {             
        createBill: function() {
            var flashMessage = this.get('controllers.flashMessage')
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
    } 

})


