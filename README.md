| [*Makers Academy*](http://www.makersacademy.com) | Final Project |
| ------------------------------------------------ | ------ |


##Housemate: Makers Academy Final Project

###Introduction

Housemate is a bill sharing app for flatmates. It keeps you up to day on who's supposed to pay what. And once they've paid, it tells you how much you owe them - or how much you're owed. You can then settle with them directly through our integrated Paypal connection. 

We're taking caring of those awkward "please pay me" conversations so you don't have to.

Check out the live app [here](http://myhousemate.herokuapp.com/)

###Background

[James](https://github.com/Jrmcneil)'s flatmate is one of those super organised types who keeps a spreadsheet of their bills with a tab for each month. Very practical, kind of ugly, bit of a hassle to keep track of. Plus at the end of the day you have to transfer money via direct debit anyways. We figured that a more intuitive, persistent, web-enabled solution with integrated payments would be something a lot of people would find useful.

###Team

This project was a labor of love from 5 members of the Makers Academy August 2014 cohort: [Nick](https://github.com/Nickrhys), [Leo](https://github.com/leopoldkwok), [James](https://github.com/Jrmcneil), [Andy](https://github.com/Andy010) and [Chris](https://github.com/flickoid)

###Design overview

Simplicity has been the main design objective for Housemate. For this reason we have designed it as a mobile-first, one-page app with minimum refreshing. Users can login with their Housemate account or through Facebook. They can then create a flat or be invited to join someone else's. Once they have logged in, all users return to the homepage. There they can:
+ interact with their bills
+ Mark their bills as settled
+ View the status of their flatmates' bills
+ View their totals and the abode's
+ Pay out to the flatmates who are owed money

All of these features are accessed via the root with no need to refresh. Once a user clicks to pay a flatmate, they are prompted to log into their Paypal account, and pay the stated amount to the account of the other user (who's PayPal account is id'ed by their email).

####Housemate in action:

![](https://github.com/Jrmcneil/housemate/blob/master/public/screenshots/Screenshot%202014-11-04%2017.45.51.png) | ![](https://github.com/Jrmcneil/housemate/blob/master/public/screenshots/Screenshot%202014-11-04%2017.45.40.png) 

####Classes

#####Bills
Bills are simply ledger items, with a description and an amount. Bills can be settled. [In future iterations bills will also be markable as paid]. A bill belongs to one user and one flat

#####Users
Users have many bills and belong to one flat. The flat also belongs to the user who created it.

#####Abodes
Abodes have many users and many bills. An abode belongs to the user who created it

###Technologies used

* Development
  * Ember.js
  * Ruby
  * Rails
  * JQuery
  * HTML5
  * CSS3
  * Bootstrap
  * Paypal SDK/ Paypal adaptive
  * Postgresql
  
* Testing
  * Rspec
  * Cpaybara
  * Cucumber
  * Polergeist
  * Selenium
  * Database cleaner


####Postscript: Ember

We chose to use the Ember.js javascript framework to achieve our objective of a one page app. This posed a number of challenges. First, Ember can be challenging to learn, particularly in the given timeframe. 

Debugging is particularly difficult, as error messages are often not very detailed (or they're non-existent). We highly (highly) recommend using [Ember Inspector](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi?hl=en), the Ember chrome plugin. Using the {{debugger}} helper as a break in your code will save you time and again. 

Keeping track of scope in a client-side framework is hard. Understanding what 'this' is at any given time is probably the single biggest challenge we faced on this project. Gaining a firm grasp of what Ember functions return is key. For instance,  this.store.all('objectName').filterBy etc... will return whatever object(s) Ember finds cached in the data store, while this.store.find('objectName', id) will send a network request to the database and return a promise object which won't resolve to the actual object you're looking for until you do something with it (i.e. you need to add .then(*something*))

We chose to build our app on Rails in order to easily integrate Devise and a Postgresql database. But when you build an MVC on top of an MVC, you can get some unexpected consequences. Ember data has to be in JSON so anything that passes to the front end has to be parsed by an [Active Model Serializer](http://api.rubyonrails.org/classes/ActiveModel/Serializers/JSON.html). The serializer makes some cavalier assumptions about naming conventions. So if you have an attribute in your database called 'myAttribute', it will get passed to your front end as is, but when you persist data back to the server, the serializer will assume you want to convert Javascript to Ruby conventions and change 'myAttribute' to 'my_attribute'. This won't throw an error, so be careful to check the server log if data isn't saving. 

Finally, Ember development is moving very quickly, and a lot of the information available online is outdated a couple months after it was written. We found Vic Ramon's Ember [tutorial](http://ember.vicramon.com/) to be the most helpful resource out there right now. The Ember [documentation](http://emberjs.com/guides/) is also fairly complete, although you need to know what you're looking for.



> Coming soon:
> * Automatic updates when your flatmates pay their bills (using Web Sockets)
> * Email invites for people who haven't yet created a Housemate account to join your flat (using Mailgun)
> * Text message reminders that payday is coming up (using Twilio)
> * Integrating month-to-month interface



