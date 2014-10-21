App.UserController = Ember.ObjectController.extend({
    needs: ['currentUser'],
    currentUserId: Ember.computed.alias('controllers.currentUser.id'),
    actions: {
        removeBill: function (id) {
            var bill = this.store.find('bill', id).then(function(bill){
                bill.destroyRecord();
            });
        }
    }, 
    isCurrentUser: function() {
        if(this.get('id') === this.get('currentUserId').toString()) {
            this.set('current', true)
        };
        return this.get('current')  
    }.property('current', 'id'),
    
    _isSettled: function() {
        var bill = this.get('bills').filterBy('_changed', true)[0];
        if (bill) {
            bill.set('_changed', false)
            bill.save();
        }
    }.observes('bills.@each.settled'),

    totalSettled: function() {
        var bills = this.get('bills').filterBy('settled', true);
        var sum = function(s1, s2) { return s1 + s2; };
        var val = bills.getEach('amount').reduce(sum,0).toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('bills.@each.settled')
})