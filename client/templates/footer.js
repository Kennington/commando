Template.footer.helpers ({

});

Template.footer.events ({
  'click #chatroomOpenClose': function (e) {
    e.preventDefault();

    ( Session.get('openChatroom') ) ? Session.set('openChatroom', false) : Session.set('openChatroom', true);
  }
});