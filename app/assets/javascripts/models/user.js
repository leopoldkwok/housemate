var attr = DS.attr,
    hasMany = DS.hasMany,
    belongsTo = DS.belongsTo;

App.User = DS.Model.extend({
    email:             attr('string'),
    abode_id:          attr('number'), 
    bills:             DS.hasMany('bill')
})