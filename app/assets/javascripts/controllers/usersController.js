App.UsersController = Ember.ArrayController.extend({
    needs: ['currentUser'],
    currentUserId: Ember.computed.alias('controllers.currentUser.id'),
    actions: {      
        createBill: function() {
            var description = this.get('newDescription');
            var amount      = this.get('newAmount');
            if (!amount) { return false; };
            if (!description.trim()) { return false; };
            var id = this.get('currentUserId').toString();
            this.model.store.find('user', id).then(function(user){
                user.get('bills').addObject(user.store.createRecord('bill', {
                    description:    description,
                    amount:         amount,
                    settled:        false,
                    user:           user
                }))
            });
            this.set('newDescription', '');
            this.set('newAmount', '');
        } 
    }
})
