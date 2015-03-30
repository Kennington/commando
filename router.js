Router.configure({
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  // waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {
  name: 'home'
  ,
  action: function () {
    if ( Meteor.user() ) {
      this.render('mainDisplay');
    } else {
      this.render('loginPage');
    }
  }
});
