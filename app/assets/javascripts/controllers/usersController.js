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

    currentUserBills: function(){
        var id = this.get('currentUserId').toString();
        var number =  this.model.store.all('user').filterBy('id',id)[0].get('totalBills')
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserSettled', number)
        })
        return number
    }.property('currentUserId', '@each.totalBills', '@each.currentUserSettled'),

    currentUserSettled: function(){
        var id = this.get('currentUserId').toString();
        var number =  this.model.store.all('user').filterBy('id',id)[0].get('totalSettled')
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserSettled', number)
        })
        return number
    }.property('currentUserId', '@each.totalSettled', '@each.currentUserSettled'),

    currentUserSettledStr: function(){
        var val = (Math.round(this.get('currentUserSettled')*100)/100).toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('currentUserSettled'),

    currentUserBillsStr: function() {
        var val = (Math.round(this.get('currentUserBills')*100)/100).toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('currentUserBills'),

    currentUserPaidText: function() {
        // if(this.get('currentUserSettled') === this.get('currentUserBills')) {
        //     return "You are a bill paying star"
        // } else if(this.get('currentUserSettled')) {
            return "You've paid £" + this.get('currentUserSettledStr') + " of £" + this.get('currentUserBillsStr')
        // } else {
        //     return "Be a team player and pay something"
        // }
    }.property('currentUserBillsStr', 'currentUserSettledStr'),

    currentUserPercentageSettled: function(){
        var id = this.get('currentUserId').toString();
        return this.model.store.all('user').filterBy('id',id)[0].get('percentageSettled')
    }.property('currentUserId', '@each.totalSettled', '@each.currentUserSettled'),

    currentUserPercentageText: function() {
        return "width: " + (parseInt(this.get('currentUserPercentageSettled')*100)).toString() + "%;"
    }.property('currentUserPercentageSettled'),

    currentUserDelta: function(){
        var number = (this.get('currentUserSettled') - this.get('averageSettled'));
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserDelta', number)
        })
        return number
    }.property('@each', 'currentUserSettled', 'averageSettled', '@each.currentUserDelta'),

    flatBills: function() {
        return this.model.store.all('user').getEach('totalBills').reduce(sum,0);    
    }.property('@each.totalBills'),

    flatBillsStr: function() {
    var val = (Math.round(this.get('flatBills')*100)/100).toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('flatBills'),

    flatSettled: function() {
        var number = this.model.store.all('user').getEach('totalSettled').reduce(sum,0);
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'flatSettled', number)
        })
        return number
    }.property('@each.totalSettled', 'flatSettled'),

    flatSettledStr: function() {
    var val = (Math.round(this.get('flatSettled')*100)/100).toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('flatSettled'),

    flatPaidText: function() {
        // if(this.get('flatSettled') === this.get('flatBills')) {
        //     return "This is the house that love built"
        // } else if(this.get('flatSettled')) {
            return "House: £" + this.get('flatSettledStr') + " of £" + this.get('flatBillsStr')
        // } else {
        //     return "Your flat has not paid a thing"
        // }
    }.property('flatBillsStr', 'flatSettledStr'),

    flatPercentageSettled: function() {
        return  this.get('flatSettled') / this.get('flatBills')
    }.property('flatBills', 'flatSettled'),

    flatPercentageText: function() {
        return "width: " + (parseInt(this.get('flatPercentageSettled')*100)).toString() + "%;"
    }.property('flatPercentageSettled'),

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
