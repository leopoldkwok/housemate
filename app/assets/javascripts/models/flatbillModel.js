var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.Flatbill = DS.Model.extend({
    description:    attr('string'),
    amount:         attr('number'),
    settled:        attr('boolean'),
    user_id:        attr(),
    abode_id:       attr(),
    true_user_id:   attr()
})