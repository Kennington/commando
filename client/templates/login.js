Template.loginPage.events ({
  'click .enlist': function (e, t) {
    Router.go('signUp');
  },

  'click .frontline': function (e, t) {
    Router.go('signIn');
  }
})