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

    amountCurrentUserOwesFlatmate: function() {
        if (this.get('currentUserDelta') < 0) {
            return - this.get('currentUserDelta') * this.get('positiveDelta') / this.get('totalPositiveDelta')
        } else {
            return 0
        }
    }.property('currentUserDelta', 'positiveDelta', 'totalPositiveDelta'),

    amountFlatmateOwesCurrentUser: function() {
        if (this.get('currentUserDelta') > 0) {
            return this.get('currentUserDelta') * this.get('negativeDelta') / this.get('totalNegativeDelta')
        } else {
            return 0
        }
    }.property('currentUserDelta', 'negativeDelta', 'totalNegativeDelta'),

    paymentDisplayAmount: function() {
        var amount = this.get('amountCurrentUserOwesFlatmate') + this.get('amountFlatmateOwesCurrentUser')
        if (amount > 0){
            return Math.round(amount*100)/100
        }
    }.property('amountCurrentUserOwesFlatmate', 'amountFlatmateOwesCurrentUser'),

    paymentMessage: function() {
        if (this.get('amountCurrentUserOwesFlatmate') > 0) {
            return "Pay " + this.get('email') + " £"
        } else if (this.get('amountFlatmateOwesCurrentUser') > 0) {
            return this.get('email') + " owes you £"
        }
    }.property('amountCurrentUserOwesFlatmate', 'amountFlatmateOwesCurrentUser', 'email')

})


