Template.registerHelper('loggedIn', function () {
  if ( Meteor.userId() ) {
    return true;
  }
  return false;
});

Template.registerHelper('RNG', function () {
  var randNumber = Math.random();

  if (randNumber < 0.5) {
    return true;
  } else {
    return false;
  }
});

Template.registerHelper('categoryList', function () {
  // console.log (Posts.find().fetch());

  categoryNames = _.uniq(Posts.find({},{
      sort: {appearOrder: 1},
      fields: {category: true}
    }).fetch().map(function(x) {
      return x.category;
    }), true);
  // console.log(typeof categoryNames);
  // console.log(categoryNames);

  // the following code turns categoryNames into an object with a key/value pair
  //
  // var objCatNames = {};
  // for (var i = 0; i < categoryNames.length; i++) {
  //   if (categoryNames[i] !== undefined) {
  //     objCatNames[i] = categoryNames[i];
  //   }
  // }
  // console.log(typeof objCatNames);
  // console.log(objCatNames);

  Session.set('numOfCategories', categoryNames.length);
  // console.log ( Session.get('numOfCategories') );

  return categoryNames;
});

Template.registerHelper('dbTitle', function () {
  // console.log(this);

  var dbTitleString = "";

  for (var i=0; i<this.length; i++) {
    dbTitleString += this[i];
  }

  return dbTitleString;
});

Template.registerHelper('headerTitle', function () {
  var titleString = "";

  for (var i=0; i<this.length; i++) {
    titleString += this[i];
  }

  if (titleString === "todos") {
    titleString = "To Do's";
  } else {
    titleString = titleString.charAt(0).toUpperCase() + titleString.slice(1);
  }
  // console.log( titleString );

  return titleString;
});
