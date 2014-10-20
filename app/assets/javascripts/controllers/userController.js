App.UserController = Ember.ObjectController.extend({
    completed: function() {
        Ember.Logger.log(this)
        return this.get('bills').filterBy('settled', true);
    }.property('bills','@each.settled'),
    completedAmount: Ember.computed.mapBy('completed', 'amount'),
    completedSum: Ember.computed.sum('completedAmount'),
    adjustedCompleted: (function() {
        if (this.get('completedSum').toString().charAt(this.get('completedSum').toString().length-2) === ".") {
            return this.get('completedSum').toString() + '0';
        } else {
            return this.get('completedSum').toString();
        }
    }).property('completedSum')
})