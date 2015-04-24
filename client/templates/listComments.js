Template.listComment.helpers ({
  'hasComments': function () {
    var allCommentsArray = [];
    allCommentsArray = Comments.find({postId:Session.get('itemClicked')}).fetch();

    if (allCommentsArray == null || allCommentsArray.length === 0) {
      return false;
    }
    var numOfNotVisible = 0;
    for (var i=0; i<allCommentsArray.length; i++) {
      if (allCommentsArray[i].visible === false) {
        numOfNotVisible++;
      }
    }
    if (numOfNotVisible === allCommentsArray.length) {
      return false;
    }
    return true;
  },

  'commentsFoundById': function () {
    if ( Comments.find({postId:Session.get('itemClicked')}).fetch() ) {
      return Comments.find({postId: Session.get('itemClicked'), visible: true});
    }
  },

  'commentUser': function () {
    var commentedBy = Comments.findOne({_id: this._id});

    // console.log(commentedBy.user);
    return commentedBy.user;
  },

  'commentContents': function () {
    // console.log(this);
    return this.comment;
  },

  'commentDate': function () {
    return this.dateCreated;
  },

  'sameUser': function () {
    if ( Meteor.user().username === this.user) {
      return true;
    }
  }
});

Template.listComment.events ({
  'click .deleteButton': function (e) {
    // delete comment
    e.preventDefault();

    // console.log(this._id);
    Meteor.call('deleteComment', {deleteCommentId: this._id});
  }
});