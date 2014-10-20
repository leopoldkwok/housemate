var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.Bill = DS.Model.extend({
    description:    attr('string'),
    amount:         attr('number'),
    settled:        attr('boolean'),
    adjustedAmount: Ember.computed('amount', function(){
                        var val  = this.get('amount');
                        if (val.toString().charAt(val.toString().length-2) === ".") {
                            return val.toString() + '0';
                        } else {
                            return val.toString();
                        }
    }),
    user:           DS.belongsTo('user'),
    _changed:       false,
    observed:       function() {
                        this.set('_changed', true)             
                    }.observes('settled')

});

