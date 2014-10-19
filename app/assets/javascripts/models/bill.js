var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.Bill = DS.Model.extend({
    description:    attr('string'),
    amount:         attr('number'),
    settled:      attr('boolean'),
    user_id:        attr('number')
    , user:         belongsTo('user')
})

