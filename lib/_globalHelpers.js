trimInput = function(value) {
  return value.replace(/^\s*|\s*$/g, '');
};

isNotEmpty = function(value) {
  if (value && value !== ''){
    return true;
  }
  console.log('Ya left somethin\' blank...');
  return false;
};

isEmail = function(value) {
  var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (filter.test(value)) {
    return true;
  }
  console.log('That ain\'t no proper email.');
  return false;
};

isValidPassword = function(password) {
  if (password.length < 6) {
    console.log('Your password is flawed, use 6+ characters.');
    return false;
  }
  return true;
};

areValidPasswords = function(password, confirm) {
  if (!isValidPassword(password)) {
    return false;
  }
  if (password !== confirm) {
    console.log('Your two passwords ain\'t the same!');
    return false;
  }
  return true;
};
