Template.listItem.helpers ({
  'posts': function(){
    // console.log( this );
    var currentCategory = "";

    for (var i=0; i<this.length; i++) {
      currentCategory += this[i];
    }

    // console.log( currentCategory );
    return Posts.find({category:currentCategory, visible: true});
  },

  'descriptionFinder': function () {
    // console.log ( this.description );
    if (this.description !== null) {
      return this.description;
    }
  },

  'isCommented': function () {
    // console.log(this);
    var IDofCurrentPost = this._id;
    // console.log(IDofCurrentPost);
    var findCommentsByPostId = Comments.find({postId:IDofCurrentPost}).fetch();
    // console.log(findCommentsByPostId);

    if (findCommentsByPostId == null || findCommentsByPostId.length === 0) {
      return false;
    }

    var notVisibleComments = 0;
    for (var i=0; i<findCommentsByPostId.length; i++) {
      if (findCommentsByPostId[i].visible === false) {
        notVisibleComments++;
      }
    }
    if (notVisibleComments === findCommentsByPostId.length) {
      return false;
    }
    return true;
  },

  'deleteListItem': function () {
    if (this.category === "done") {
      return true;
    }
    return false;
  }
});

Template.listItem.events ({
  'click .listItem' : function (e) {
    e.preventDefault();
    // console.log(this);

    // console.log(Session.get ('itemClicked'));
    Session.set ('itemClicked', this._id);
    // console.log(Session.get ('itemClicked'));
  },

  'click .deleteButton': function (e) {
    e.preventDefault();
    e.stopPropagation();    // link inside clickable area...stops parent element from doing their clicky

    Meteor.call('deletePost', {postId: this._id});
  }
});