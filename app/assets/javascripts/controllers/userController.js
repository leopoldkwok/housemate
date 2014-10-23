// var sum = function(s1, s2) { return s1 + s2; };

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

    _getDelta: function(settledAmount) {
       return (settledAmount - this.get('averageSettled'))
    }.property('averageSettled'),

    amountCurrentUserOwesFlatmate: function() {
       return this.get('currentUserDelta') * this.get('positiveDelta') / this.get('totalPositiveDelta')
    }.property('currentUserDelta', 'positiveDelta', 'totalPositiveDelta'),

    amountFlatmateOwesCurrentUser: function() {
       return this.get('currentUserDelta') * this.get('negativeDelta') / this.get('totalNegativeDelta')
    }.property('currentUserDelta', 'negativeDelta', 'totalNegativeDelta'),

    paymentDisplayAmount: function() {
        var amount = this.get('amountCurrentUserOwesFlatmate') + this.get('amountFlatmateOwesCurrentUser')
        if (amount > 0){
            return amount
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


