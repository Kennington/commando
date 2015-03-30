Posts = new Mongo.Collection ("posts");

if (Meteor.isClient) {
  Template.listItem.helpers ({
    'posts': function(){
      return Posts.find({category:"ideas"});
    }
  });

  Template.listItem.events ({
    'click .listItem' : function (e) {
      e.preventDefault();
      console.log("HEY I MADE IT, I'M THE WORLD'S GREATEST");
    }
  });
}

if (Meteor.isServer) {

}
