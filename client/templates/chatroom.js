Template.chatroom.helpers ({
  'hideChatroom': function () {
    if ( Session.get('openChatroom') ) {
      return "";
    }
    return "hideIt";
  },

  'messages': function () {
    return Messages.find({}, {sort: { time: -1}});
  }
});

Template.chatroom.events ({
  'click .exitButton': function (e) {
    e.preventDefault();

    Session.set('openChatroom', false);
  },

  'keydown input#messageInput': function (e) {
    if (e.which == 13) {
      if ( Meteor.user() ) {
        var username = Meteor.user().username;
      } else {
        var username = "Unknown Civilian";
      }
      // console.log( username );
      var messageContent = document.getElementById('messageInput').value;
      // console.log( messageContent );

      if ( messageContent !== "" ) {
        Meteor.call ('addNewMessage', {username: username}, {messageContent: messageContent});
      }

      document.getElementById('messageInput').value = "";
      messageContent = "";
    }
  }
});