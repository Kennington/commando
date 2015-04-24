Template.signIn.events ({
  'click .cancelButton': function (e,t) {
    e.preventDefault;

    Router.go('loginPage');
  },

  'submit #signInForm': function(e, t) {
    e.preventDefault();

    var email = trimInput(e.target.signInEmail.value.toLowerCase());
    var password = e.target.signInPassword.value;

    if (isNotEmpty(email) && isEmail(email) && isNotEmpty(password) && isValidPassword(password)) {

      Meteor.loginWithPassword(email, password, function(err) {
        if (err) {
          console.log('Your credentials are not valid.');
          e.target.signInPassword.value="";
        } else {
          console.log('Welcome back Maggot!');
          counter = 0;
          Router.go('listColumn');
        }
      });
    }
    return false;
  }
});