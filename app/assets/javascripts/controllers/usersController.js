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
        var id = this.get('currentUserId').toString();
        if(this.find('id',id)) {
            this.set('current', true)
        };
        return this.get('current')  
    }.property('current', 'id', 'currentUserId'),

    currentUserSettled: function(){
        var id = this.get('currentUserId').toString();
        var number =  this.model.store.all('user').filterBy('id',id)[0].get('totalSettled')
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserSettled', number)
        })
        return number
    }.property('currentUserId', 'totalSettled', 'currentUserSettled'),

    currentUserDelta: function(){
        var number = (this.get('currentUserSettled') - this.get('averageSettled'));
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserDelta', number)
        })
        return number
    }.property('@each', 'currentUserSettled', 'averageSettled', '@each.currentUserDelta'),

    flatSettled: function() {
        var number = this.model.store.all('user').getEach('totalSettled').reduce(sum,0);
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'flatSettled', number)
        })
        return number
    }.property('@each.totalSettled'),

    numberOfFlatmates: function(){
        var number = this.model.store.all('user').content.length;
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'numberOfFlatmates', number)
        })
        return number;
    }.property('@each', 'numberOfFlatmates'),

    totalPositiveDelta: function() {
        var number = this.model.store.all('user').getEach('positiveDelta').reduce(sum,0);
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'totalPositiveDelta', number)
        })
        return number
    }.property('@each.positiveDelta', 'totalPositiveDelta'),

    averageSettled: function() {
        var number = this.get('flatSettled') / this.get('numberOfFlatmates')
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'averageSettled', number)
        })
        return number
    }.property('flatSettled', '@each.averageSettled'),

    _getPositives: function(value) {
        if (value > 0) {
            return value
        }
    },

    netOwed: function(){
        currentUserSettled = this.get('currentUserSettled')
        amounts = this.get('flatSettled')
        flatmates   = this.get('numberOfFlatmates')
        return Math.round((amounts/flatmates - currentUserSettled)*100)/100
    }.property('@each.totalSettled','flatSettled','currentUserSettled', 'currentUserId','numberOfFlatmates'),

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
    }.property('newOwed','@each.totalSettled')
})
