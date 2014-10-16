App.BillController = Ember.ObjectController.extend({
    actions: {
        removeBill: function () {
            var bill = this.get('model');
            bill.deleteRecord();
            bill.save();
        }
    }
})