Meteor.startup (function () {
  if (Meteor.isClient) {
    Session.set ('counter', 0);
    Session.set('openChat', false);
    Session.set('runOnce', true);
    Session.set('makeNewCat', false);
    Session.set('openChatroom', false);
    
    Meteor.subscribe("posts");
    Meteor.subscribe("comments");
    Meteor.subscribe("messages");
  }

  if (Meteor.isServer) {
    Meteor.publish("posts", function () {
      return Posts.find();
    });

    Meteor.publish ("comments", function () {
      return Comments.find();
    });

    Meteor.publish ("messages", function () {
      return Messages.find();
    });

    if ( Posts.find().fetch().length === 0 ) {
      Meteor.call ('addNewPost', {newCat: "ideas"}, {newOrd: 1}, {newDesc: "<currently empty>"});
      Meteor.call ('addNewPost', {newCat: "todos"}, {newOrd: 2}, {newDesc: "<currently empty>"});
      Meteor.call ('addNewPost', {newCat: "doing"}, {newOrd: 3}, {newDesc: "<currently empty>"});
      Meteor.call ('addNewPost', {newCat: "done"}, {newOrd: 4}, {newDesc: "<currently empty>"});
    }

    if ( Messages.find().fetch().length === 0 ) {
      Meteor.call ('addNewMessage', {username: "System HQ"}, {messageContent: "Feel free to discuss battle plans here."});
    }
  }
});