Router.configure({
layoutTemplate: 'layout'
});


Router.route('/', {
  name: 'home'
  ,
  action: function () {
    if (Meteor.userId()) {
      this.render('home');
    } else {
      this.render('loginPage');
    }
  }
});

