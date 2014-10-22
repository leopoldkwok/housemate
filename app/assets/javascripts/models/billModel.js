var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.Bill = DS.Model.extend({
    description:    attr('string'),
    amount:         attr('number'),
    settled:        attr('boolean'),
    user:           DS.belongsTo('user'),
    abode_id:       attr(),

    adjustedAmount: Ember.computed('amount', function(){
                        var val  = this.get('amount').toString();
                        if (val.charAt(val.length-2) === ".") {
                            return val + '0';
                        } else {
                            return val;
                        }
                    }),
    
    _changed:       false,
    observed:       function() {
                        this.set('_changed', true)             
                    }.observes('settled')
});

