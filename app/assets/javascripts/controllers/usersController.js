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
                abode_id = user.get('abode_id');
                user.get('bills').addObject(user.store.createRecord('bill', {
                    description:    description,
                    amount:         amount,
                    settled:        false,
                    abode_id:       abode_id,
                    user:           user
                }))
            });
            this.set('newDescription', '');
            this.set('newAmount', '');
        }
    },

    isCurrentUser: function() {
        id = this.get('currentUserId').toString();
        Ember.Logger.log(id)
        if(this.find('id',id)) {
            this.set('current', true)
        };
        return this.get('current')  
    }.property('current', 'id', 'currentUserId'),

    currentUserSettled: function(){
        id = this.get('currentUserId').toString();
        return this.model.store.all('user').filterBy('id',id)[0].get('totalSettled')
    }.property('currentUserId', 'totalSettled'),

    flatSettled: function() {
        return this.model.store.all('user').getEach('totalSettled').reduce(sum,0);
    }.property('@each.totalSettled'),

    numberOfFlatmates: function(){
        return this.model.store.all('user').content.length;
    }.property('@each'),

    netOwed: function(){
        currentUserSettled = this.get('currentUserSettled')
        amounts = this.get('flatSettled')
        flatmates   = this.get('numberOfFlatmates')
        return Math.round((amounts/flatmates - currentUserSettled)*100)/100
    }.property('@each.totalSettled','flatSettled','currentUserSettled', 'currentUserId','numberOfFlatmates'),

    owedTo: function(user) {
        user = this.model.store.all('user').filterBy('id',user.id)[0]
            // totalOwedToUser     = user.get('totalSettled');
            // flatSettled         = this.get('flatSettled');
            // currentUserSettled  = this.get('currentUserSettled')
            // return Math.round((totalOwedToUser/flatSettled * currentUserSettled)*100)/100
    }.property('totalSettled','flatSettled','currentUserSettled'),

    netOwedStr: function(){
        val = Math.abs(this.get('netOwed')).toString();
        if (val === "0") {
            return null
        } else if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('netOwed'),

    balanceMessage: function(){
        balance = this.get('netOwed')
        if(balance > 0) {
            return "You owe £"
        } else if (balance < 0) {
            return "You are owed £"
        } else {
            return "We're square"
        }
    }.property('newOwed','@each.totalSettled'),
})
