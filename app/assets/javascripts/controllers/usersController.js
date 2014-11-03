var sum = function(s1, s2) { return s1 + s2; };

App.UsersController = Ember.ArrayController.extend({
    needs: ['currentUser'],
    currentUserId: Ember.computed.alias('controllers.currentUser.id'),
    actions: {      
        createBill: function() {
            description = this.get('newDescription');
            amount      = this.get('newAmount');
            if (!amount) { return false };
            if (!description.trim()) { return false };
            id = this.get('currentUserId').toString();
            this.model.store.find('user', id).then(function(user){
                abode_id = user.get('abode_id');
                user.get('bills').addObject(user.store.createRecord('bill', {
                    description:    description,
                    amount:         amount,
                    settled:        false,
                    abode_id:       abode_id,
                    user:           user
                }));
            });
            this.set('newDescription', '');
            this.set('newAmount', '');
        }
    },

    isCurrentUser: function() {
        var id = this.get('currentUserId').toString();
        if(this.find('id',id)) {
            this.set('current', true);
        }
        return this.get('current');
    }.property('current', 'id', 'currentUserId'),

    currentUserBills: function(){
        var id = this.get('currentUserId').toString();
        var number =  this.model.store.all('user').filterBy('id',id)[0].get('totalBills');
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserSettled', number);
        })
        return number;
    }.property('currentUserId', '@each.totalBills', '@each.currentUserSettled'),

    currentUserBillsNoBind: function() {
        var id = this.get('currentUserId').toString();
        return  this.model.store.all('user').filterBy('id',id).getEach('totalBills').reduce(sum,0)
    }.property('currentUserId', '@each.totalBills'),

    currentUserSettled: function(){
        var id = this.get('currentUserId').toString();
        var number =  this.model.store.all('user').filterBy('id',id)[0].get('totalSettled');
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserSettled', number);
        });
        return number;
    }.property('currentUserId', '@each.totalSettled', '@each.currentUserSettled'),

    currentUserSettledNoBind: function() {
        var id = this.get('currentUserId').toString();
        return this.model.store.all('user').filterBy('id',id).getEach('totalSettled').reduce(sum,0)
    }.property('currentUserId', '@each.totalSettled'),

    currentUserSettledStr: function(){
        var val = (Math.round(this.get('currentUserSettledNoBind')*100)/100).toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('currentUserSettledNoBind'),

    currentUserBillsStr: function() {
        var val = (Math.round(this.get('currentUserBillsNoBind')*100)/100).toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('currentUserBills'),

    currentUserPaidText: function() {
        var settled = this.get('currentUserSettledNoBind');
        var bills   = this.get('currentUserBillsNoBind');
        if(settled === bills) {
            return "You are a bill paying star"
        } else if(settled) {
            return "You've paid £" + this.get('currentUserSettledStr') + " of £" + this.get('currentUserBillsStr')
        } else {
            return "You haven't paid for anything. Nothing."
        }
    }.property('currentUserSettledStr', 'currentUserBillsStr','currentUserSettledNoBind','currentUserBillsNoBind'),

    currentUserPercentageSettled: function(){
        var id = this.get('currentUserId').toString();
        return this.model.store.all('user').filterBy('id',id)[0].get('percentageSettled');
    }.property('currentUserId', '@each.totalSettled', '@each.currentUserSettled'),

    currentUserPercentageText: function() {
        return "width: " + (parseInt(this.get('currentUserPercentageSettled')*100)).toString() + "%;";
    }.property('currentUserPercentageSettled'),

    currentUserDelta: function(){
        var number = (this.get('currentUserSettled') - this.get('averageSettled'));
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'currentUserDelta', number);
        });
        return number;
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
        var settled = this.get('flatSettled');
        var bills   = this.get('flatBills')
        if(settled === bills) {
            return "This is the house that love built"
        } else if(settled) {
            return "The house has paid £" + this.get('flatSettledStr') + " of £" + this.get('flatBillsStr')
        } else {
            return "Your house hasn't paid a thing"
        }
    }.property('flatSettled', 'flatBills','flatBillsStr', 'flatSettledStr'),

    flatPercentageSettled: function() {
        return  this.get('flatSettled') / this.get('flatBills');
    }.property('flatBills', 'flatSettled'),

    flatPercentageText: function() {
        return "width: " + (parseInt(this.get('flatPercentageSettled')*100)).toString() + "%;";
    }.property('flatPercentageSettled'),

    numberOfFlatmates: function(){
        var number = this.model.store.all('user').content.length;
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'numberOfFlatmates', number);
        });
        return number;
    }.property('@each', 'numberOfFlatmates'),

    totalPositiveDelta: function() {
        var number = this.model.store.all('user').getEach('positiveDelta').reduce(sum,0);
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'totalPositiveDelta', number);
        });
        return number;
    }.property('@each.positiveDelta', 'totalPositiveDelta'),

    averageSettled: function() {
        var number = this.get('flatSettled') / this.get('numberOfFlatmates');
        this.model.store.all('user').forEach(function(item, index, enumerable) {
            Ember.set(item, 'averageSettled', number);
        });
        return number;
    }.property('flatSettled', '@each.averageSettled'),

    _getPositives: function(value) {
        if (value > 0) {
            return value;
        }
    },

    netOwed: function(){
        currentUserSettled = this.get('currentUserSettled');
        amounts = this.get('flatSettled');
        flatmates   = this.get('numberOfFlatmates');
        return Math.round((amounts/flatmates - currentUserSettled)*100)/100;
    }.property('@each.totalSettled','flatSettled','currentUserSettled', 'currentUserId','numberOfFlatmates'),

    netOwedStr: function(){
        val = Math.abs(this.get('netOwed')).toString();
        if (val === "0") {
            return null;
        } else if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('netOwed'),

    balanceMessage: function(){
        balance = this.get('netOwed');
        if(balance > 0) {
            return "You owe £";
        } else if (balance < 0) {
            return "You are owed £";
        } else {
            return "We're square";
        }
    }.property('newOwed','@each.totalSettled')
});
