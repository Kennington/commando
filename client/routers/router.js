// Iron Router > Configuration
Router.configure ({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

// BEFORE HOOKS
var BeforeHooks = {
  loggedIn: function (pause) {
    if ( !Meteor.userId() ) {
      Router.go('loginPage');
    }
    this.next();
  }
}

// GLOBAL HOOKS
Router.onBeforeAction(BeforeHooks.loggedIn, {except: ['signUp', 'signIn']});
// Router.onAfterAction(BeforeHooks.loggedIn, {except: ['signUp', 'signIn']});

// Iron Router > Helpers
Router.route('/', {
  name: 'home'
  ,
  action: function () {
    if ( Meteor.userId() ) {
      Router.go('listColumn');
    }
    Router.go('loginPage');
  }
});

Router.route('/signUp', {name: 'signUp'});
Router.route('/signIn', {name: 'signIn'});
Router.route('/login', {name: 'loginPage', 
  action: function () {
    this.render('loginPage');
  }
});

Router.route('/mainDisplay', {name: 'listColumn', 
  action: function () {
    this.render('listColumn');
  }
});
