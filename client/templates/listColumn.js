Template.listColumn.helpers ({
  'smClearFix': function () {

  },

  'mdClearFix': function () {

  },

  'lgClearFix': function () {
    
  },

  'showAddMoreButton': function () {
    // console.log(this);

    var dbTitleString = "";

    for (var i=0; i<this.length; i++) {
      dbTitleString += this[i];
    }

    if (dbTitleString === "done") {
      return false;
    }
    return true;
  }
});

Template.listColumn.events ({
  'click .oneMoreButton': function (e) {
    e.preventDefault;

    var currentCategory = "";

    for (var i=0; i<this.length; i++) {
      currentCategory += this[i];
    }

    // console.log( currentCategory );
    Session.set ('addItem', currentCategory);
  }
});