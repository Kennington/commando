Template.addItem.helpers ({
  'hideIt': function () {
    if ( Session.get('addItem') ) {
      return "";
    }
    return "hideIt";
  },

  'selector': function () {
    var dbTitleString = "";

    for (var i=0; i<this.length; i++) {
      dbTitleString += this[i];
    }

    if ( Session.get('addItem') === dbTitleString) {
      return "selected";
    }
    return "";
  }
});

Template.addItem.events ({
  'click .exitButton': function (e) {
    e.preventDefault();

    Session.set('addItem', false);
  },

  'submit #addNewPost': function (e) {
    e.preventDefault();

    var newCategory = e.target.dropdownSelector.value;
    // find appear order
    var appearOrder;
    var categoryNames = _.uniq(Posts.find({},{
            sort: {appearOrder: 1},
            fields: {category: true}
          }).fetch().map(function(x) {
            return x.category;
          }), true);
    var numOfCategories = categoryNames.length;

    for (var i=0; i<numOfCategories; i++) {
      if ( categoryNames[i] === newCategory ) {
        appearOrder = i+1;
        break;
      }
    }

    var newDescription = e.target.newDescription.value;
    // dateCreated
    // visible
    // console.log(newCategory);
    // console.log(appearOrder);
    // console.log(newDescription);

    Meteor.call('addNewPost', {newCat: newCategory}, {newOrd: appearOrder}, {newDesc: newDescription});
    Session.set('addItem', false);
  }
});
