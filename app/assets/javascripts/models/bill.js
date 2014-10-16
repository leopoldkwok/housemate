var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTO;

App.Bill = DS.Model.extend({
    description:    attr('string'),
    amount:         attr('number'),
    settled:      attr('boolean')
})

