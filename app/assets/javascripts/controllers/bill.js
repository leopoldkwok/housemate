App.BillController = Ember.ObjectController.extend({
    actions: {
        removeBill: function () {
            var bill = this.get('model');
            bill.deleteRecord();
            bill.save();
        }
    },
    settled:  function(key, value) {
        var bill = this.get('model');
        if (value === undefined) {
            return bill.get('settled');
        } else {
            bill.set('settled', value);
            bill.save();
            return bill.get('settled');
        }
    }.property('bill.settled')
})