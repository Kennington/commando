Meteor.methods ({
  'addNewPost': function (newCat, newOrd, newDesc) {
    // console.log(newCat.newCat);
    // console.log(newOrd.newOrd);
    // console.log(newDesc.newDesc);

    Posts.insert({
      category: newCat.newCat,
      appearOrder: newOrd.newOrd,
      dateCreated: new Date (),
      dateDeleted: null,
      description: newDesc.newDesc,
      visible: true
    });
  },

  'deletePost': function (postId) {
    Posts.update({_id: postId.postId}, {$set: {visible: false} });
  },

  'addNewComment': function (newMsg, commentId) {
    // console.log(newMsg.newMsg);
    // console.log(commentId.commentId);

    Comments.insert({
      comment: newMsg.newMsg,
      dateCreated: new Date (),
      postId: commentId.commentId,
      user: Meteor.user().username,
      dateDeleted: null,
      visible: true
    });
  },

  'deleteComment': function (deleteCommentId) {
    // console.log(deleteCommentId.deleteCommentId);

    Comments.update({_id: deleteCommentId.deleteCommentId}, {$set: {visible: false, dateDeleted: new Date()}  });
  },

  'changeCategory': function (selectedPost, newOrder, newCat) {
    // console.log(newCat.newCat);
    // console.log(newOrder.newOrder);
    // console.log(selectedPost.selectedPost);

    Posts.update({_id: selectedPost.selectedPost}, {$set: {appearOrder: newOrder.newOrder, category:newCat.newCat}});
  },

  'addNewMessage': function (username, messageContent) {
    // console.log( messageContent.messageContent );
    // console.log( username.username );

    Messages.insert({
      username: username.username,
      messageContent: messageContent.messageContent,
      time: new Date ()
    });
  }
});