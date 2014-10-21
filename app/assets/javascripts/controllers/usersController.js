var sum = function(s1, s2) { return s1 + s2; };

App.UsersController = Ember.ArrayController.extend({
    needs: ['currentUser'],
    currentUserId: Ember.computed.alias('controllers.currentUser.id'),
    actions: {      
        createBill: function() {
            description = this.get('newDescription');
            amount      = this.get('newAmount');
            if (!amount) { return false; };
            if (!description.trim()) { return false; };
            id = this.get('currentUserId').toString();
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
    },
    netOwed: function(){
        id = this.get('currentUserId').toString();
        userSettled = this.model.store.all('user').filterBy('id',id)[0].get('totalSettled')
        amounts = this.model.store.all('user').getEach('totalSettled').reduce(sum,0);
        flatmates   = this.model.store.all('user').content.length;
        return amounts/flatmates - userSettled
    }.property('@each.totalSettled','currentUserId'),

    netOwedStr: function(){
        val = this.get('netOwed').toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('netOwed')

})
