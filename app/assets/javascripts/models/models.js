var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTO;

App.Bill = DS.Model.extend({
    description:    attr(),
    amount:         attr(),
    summary: function() {
    return this.get('description') + ' £' + this.get('amount')
}.property('description', 'amount')
})

