Template.commentSection.helpers ({
  'showOrHide': function () {
    if ( Session.get ('itemClicked') ) {
      return "";
    }
    return "hideIt";
  },

  'cardHeader': function () {
    var clickedPost = Posts.findOne({ _id: Session.get ('itemClicked') });
    // console.log(clickedPost);

    if (clickedPost !== undefined) {
      var cardTitle = clickedPost.category;

      if (cardTitle === "todos") {
        cardTitle = "To Do's";
      } else {
        cardTitle = cardTitle.charAt(0).toUpperCase() + cardTitle.slice(1);
      }
      // console.log( cardTitle );
      return cardTitle;
    }
  },

  'cardDescription': function () {
    if ( Session.get('itemClicked') && Posts.findOne({ _id:Session.get('itemClicked') }).description !== undefined ) {
      return Posts.findOne({ _id:Session.get('itemClicked') }).description;
    }
  },

  'selector': function () {
    var dbTitleString = "";

    for (var i=0; i<this.length; i++) {
      dbTitleString += this[i];
    }

    if ( Session.get('itemClicked') ) {
      if ( Posts.findOne({_id: Session.get('itemClicked') }).category === dbTitleString) {
        return "selected";
      }
    }
    return "";
  },

  'showTextInput': function () {
    // console.log( Session.get('makeNewCat') );

    if ( Session.get('makeNewCat') ) {
      return true;
    } else {
      return false;
    }
  }
});

Template.commentSection.events ({
  'click .exitButton': function (e) {
    e.preventDefault();

    Session.set('itemClicked', false);
    $('#commentSection').addClass('hideIt');
  },

  'change #updateTaskDropdown': function (e) {
    e.preventDefault();

    // console.log(e.target.selectedIndex);
    if ( e.target.selectedIndex === Session.get('numOfCategories') ) {
      Session.set('makeNewCat', true);
    }
  },

  'submit #updateTask': function (e) {
    e.preventDefault();

    if ( e.target.updateTaskDropdown.selectedIndex === Session.get('numOfCategories') ) {
      if ( e.target.changeCategory.value !== "" ) {
        if ( e.target.changeCategory.value === "to dos" || e.target.changeCategory.value === "to do" ) {
          var newCategory = "todos";
        } else {
          var newCategory = e.target.changeCategory.value;
        }
        Session.set('makeNewCat', false);
      }
    } else {
      var newCategory = e.target.updateTaskDropdown.value;
    }
    // console.log(newCategory);
    var currentId = Session.get('itemClicked');
    // console.log(currentId);

    var appearOrder;
    var categoryNames = _.uniq(Posts.find({},{
            sort: {appearOrder: 1},
            fields: {category: true}
          }).fetch().map(function(x) {
            return x.category;
          }), true);
    var numOfCategories = Session.get('numOfCategories') ;
    // console.log(categoryNames);
    // console.log(numOfCategories);

    var checkExists = false;
    for (var i=0; i<numOfCategories; i++) {
      if ( categoryNames[i] === newCategory ) {
        checkExists = true;
      }
    }

    if (checkExists) {
      for (var i=0; i<numOfCategories; i++) {
        if ( categoryNames[i] === newCategory ) {
          appearOrder = i+1;
          break;
        }
      }
    } else {
      appearOrder = Session.get('numOfCategories') + 1;
      Session.get('numOfCategories', appearOrder);
    }

    Meteor.call('changeCategory', {selectedPost: currentId}, {newOrder: appearOrder}, {newCat: newCategory});
    Session.set('makeNewCat', false);
  },

  'submit #addComment': function (e) {
    e.preventDefault();

    var commentMessage = e.target.commentText.value;
    // console.log(commentMessage);
    var commentId = Session.get('itemClicked');
    // console.log(commentId);

    if (commentMessage !== "") {
      Meteor.call('addNewComment', {newMsg: commentMessage}, {commentId: commentId});
    }

    e.target.commentText.value="";
  }
});