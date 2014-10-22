var sum = function(s1, s2) { return s1 + s2; };

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

    currentUserSettled: function(){
        id = this.get('currentUserId');
        Ember.Logger.log(id)
        Ember.Logger.log(this.get('flatbills').filterBy('true_user_id', id))
        return this.get('flatbills').filterBy('true_user_id',id).filterBy('settled').mapBy('amount').reduce(sum,0)
    }.property('currentUserId', 'totalSettled', 'flatbills.@each.true_user_id','flatbills.@each.settled', 'bills.@each.settled')


})