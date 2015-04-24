Template.signUp.events ({
  'click .cancelButton': function (e,t) {
    e.preventDefault;

    counter = 0;
    Router.go('loginPage');
  },

  'submit #signUpForm': function(e, t) {
    e.preventDefault();

    var trimmedUserInputName = trimInput(e.target.userName.value.toLowerCase());
    var trimmedEmail = trimInput(e.target.signUpEmail.value.toLowerCase());
    var password = e.target.signUpPassword.value;
    var passwordConfirm = e.target.signUpPasswordConfirm.value;

    if (isNotEmpty(trimmedEmail) && isNotEmpty(password) && isEmail(trimmedEmail) && areValidPasswords(password, passwordConfirm)) {

      Accounts.createUser({username: trimmedUserInputName, email: trimmedEmail, password: password}, function(err) {
        if (err) {
          if (err.message === 'Email already exists. [403]') {
            console.log('Someone\'s using that email already!');
          } else {
            console.log('This can\'t be right, something went wrong.');
          }
        } else {
          console.log('Good job Private, you\'re in!');
          counter=0;
          Router.go('listColumn');
        }
      });
    }
    return false;
  }
});