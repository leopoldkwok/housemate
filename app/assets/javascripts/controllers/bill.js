App.BillController = Ember.ObjectController.extend({
    actions: {
        removeBill: function () {
            var bill = this.get('model');
            bill.deleteRecord();
            bill.save();
        }
    },
    adjustedAmount: Ember.computed('bill.amount', function(){
        var bill = this.get('model');
        var val  = bill.get('amount');
        if (val.toString().charAt(val.toString().length-2) === ".") {
            return val.toString() + '0';
        } else {
            return val.toString();
        }
    }),
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