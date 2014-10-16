//= require jquery
//= require handlebars
//= require ember
//= require ember-data
//= require_self
//= require ./app
$(document).ready(function() {
    token = $('meta[name="csrf-token"]').attr('content');
    $.ajaxPrefilter(function(options, originalOptions, xhr) {
        xhr.setRequestHeader('X-CSRF-Token', token)
    });
});
// for more details see: http://emberjs.com/guides/application/
App = Ember.Application.create({rootElement: '#ember-app'});

//= require_tree .



