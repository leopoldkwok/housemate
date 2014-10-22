var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

var sum = function(s1, s2) { return s1 + s2; };

App.User = DS.Model.extend({
    email:      attr('string'),
    abode_id:   attr(),
    bills:      DS.hasMany('bill'),
    flatbills:  DS.hasMany('flatbill'),
    current:    false,
    totalSettled: function() {
        bills = this.get('bills').filterBy('settled', true);
        return bills.getEach('amount').reduce(sum,0)
    }.property('bills.@each.settled'),

    totalSettledStr: function(){
        val = this.get('totalSettled').toString();
        if (val.charAt(val.length-2) === ".") {
            return val + '0';
        } else {
            return val;
        }
    }.property('totalSettled')
})