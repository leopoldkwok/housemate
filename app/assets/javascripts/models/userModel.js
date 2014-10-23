var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.User = DS.Model.extend({
    email:      attr('string'),
    abode_id:   attr(),
    bills:      DS.hasMany('bill'),
    current:    false,
    currentUserSettled: attr(),
    numberOfFlatemates: attr(),
    flatSettled:        attr(),
    averageSettled:     attr(),
    totalPositiveDelta: attr('number'),
    currentUserDelta:   attr(),
    totalBills: function() {
        return this.get('bills').getEach('amount').reduce(sum,0)
    }.property('bills.@each.amount'),
    totalSettled: function() {
        bills = this.get('bills').filterBy('settled', true);
        return bills.getEach('amount').reduce(sum,0)
    }.property('bills.@each.settled'),
    percentageSettled: function(){
        return (this.get('totalSettled') / this.get('totalBills'))
    }.property('totalSettled', 'totalBills'),
    deltaSettled: function() {
        return (this.get('totalSettled') - this.get('averageSettled'))
    }.property('totalSettled','averageSettled'),

    positiveDelta: function() {
        if (this.get('deltaSettled') > 0) {
            return this.get('deltaSettled')
        } else {
            return 0
        }
    }.property('deltaSettled'),

    negativeDelta: function() {
        if (this.get('deltaSettled') < 0) {
            return this.get('deltaSettled')
        } else {
            return 0
        }
    }.property('deltaSettled'),

    totalNegativeDelta: function() {
        return (- this.get('totalPositiveDelta'))
    }.property('totalPositiveDelta'),

    totalSettledStr: function(){
        val = this.get('totalSettled').toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('totalSettled')
})