Posts = new Mongo.Collection ("posts");
Comments = new Mongo.Collection ("comments");
// Categories = new Mongo.Collection ("categories");

if (Meteor.isClient) {
  var counter = 0;












  Template.listColumn.helpers ({
    'categoryList': function () {
      // console.log ( Posts.find({}).distinct('category', true) );

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

      return categoryNames;   
    },

    'dbTitle': function () {
      if ( counter < Session.get('numOfCategories') ) {
        counter += 1;
      } else {
        counter = 0;
      }
      // console.log(counter);

      var dbTitleString = "";

      for (var i=0; i<this.length; i++) {
        dbTitleString += this[i];
      }

      return dbTitleString;
    },

    'headerTitle': function () {
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
    },

    'smClearFix': function () {
      // console.log(counter + " for smClearFix");
      if (counter % 2 === 0) {
        return true;
      }
      return false;
    },
    
    'mdClearFix': function () {
      // console.log(counter + " for mdClearFix");
      if (counter % 3 === 0) {
        return true;
      }
      return false;
    },
    
    'lgClearFix': function () {
      // console.log(counter + " for lgClearFix");
      if (counter % 4 === 0) {
        return true;
      }
      return false;
    }
  });

  Template.listItem.helpers ({
    'posts': function(){
      // console.log( this );
      var currentCategory = "";

      for (var i=0; i<this.length; i++) {
        currentCategory += this[i];
      }

      // console.log( currentCategory );
      return Posts.find({category:currentCategory});
    },

    'descriptionFinder': function () {
      // console.log ( this.description );
      if (this.description !== null) {
        return this.description;
      }
    },

    'isUpdated': function () {
      // if ( this.dateUpdated === null ) {
      //   return false;
      // }
      // return true;
    },

    'isCommented': function () {
      // console.log(this);
      var IDofCurrentPost = this._id;
      // console.log(IDofCurrentPost);
      var findCommentsByPostId = Comments.find({postId:IDofCurrentPost}).fetch();
      // console.log(findCommentsByPostId);

      if (findCommentsByPostId == null || findCommentsByPostId.length === 0) {
        return false;
      } else {
        return true;
      }
    },

    'itemClicked': function () {
      return !Session.equals('itemClicked', undefined);
    }
  });

  Template.listItem.events ({
    'click .listItem' : function (e) {
      e.preventDefault();
      // console.log(this);

      // console.log(Session.get ('itemClicked'));
      Session.set ('itemClicked', this._id);
      // console.log(Session.get ('itemClicked'));
    }
  });

  Template.cardWindow.helpers ({
    'hideIt': function () {
      if (Session.get ('itemClicked')) {
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
      if ( Session.get('itemClicked') && Posts.findOne({ _id:Session.get('itemClicked') }).description ) {
        return Posts.findOne({ _id:Session.get('itemClicked') }).description;
      }
    }
  });

  Template.cardWindow.events ({
    'click #exitButton': function (e) {
      e.preventDefault();

      Session.set('itemClicked', false);
    },

    'click #addCommentButton': function (e) {
      e.preventDefault();

      Session.set('addComment', true);
    },
  });

  Template.listComment.helpers ({
    'hasComments': function () {
      // console.log( Comments.find({postId:Session.get('itemClicked')}).fetch() );
      // console.log( Comments.find({postId:Session.get('itemClicked')}).fetch().length );

      if ( Comments.find({postId:Session.get('itemClicked')}).fetch().length === 0 ) {
        return false;
      }
      return true;
    },

    'commentsFoundById': function () {
      if ( Comments.find({postId:Session.get('itemClicked')}).fetch() ) {
        return Comments.find( {postId: Session.get('itemClicked')} );
      }
    },

    'commentUser': function () {
      // var commentUser = meteor.users.find({_id:this.userId});
      // return commentUser.username;
    },

    'commentContents': function () {
      // console.log(this);
      return this.comment;
    },

    'commentDate': function () {
      return this.dateUpdated;
    }
  });
}

if (Meteor.isServer) {
  // Comments.insert({
  //   postId: "qwFmp4JxNG3tHtamk",
  //   dateUpdated: new Date(),
  //   comment: "and it was done well"
  //   // updateUser: Meteor.userId(),
  //   // username: Meteor.user().username
  // });

  // Comments.remove({_id: "zLeCvmxxG88zqWorz"});

}
