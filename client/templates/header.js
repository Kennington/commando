Template.headerWrapper.events ({
  'click .signOut': function (e) {
    e.preventDefault();

    console.log('Signed Out');

    Meteor.logout();
    Router.go('loginPage');
  }
});