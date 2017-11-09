// Since the search box will populate with anything you put in it, I'm not sure why this matters, but I did it anyway.
var emote = ['angry', 'sad', 'love', 'happy', 'monkey with computer', 'loki'];


function GetEmote() {
  var emotion_name = $(this).text().toLowerCase();

  $('#emotion').empty();
  // Making a query for AJAX
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion_name + "&api_key=k6c4HJj3Kj6eL5PIOjffGv83ZHtX1xji&limit=10&rating=pg-13";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
     response.data.forEach(function(gif) {
      var still_image = gif.images.downsized_still.url;
      var animated_image = gif.images.downsized.url;
      var rating = gif.rating;

      var div = $('<div class="gif">');

      // var rating = results[i].rating;
      //   var p = $("<p>").text("Rating: " + rating);

// This sends the still images to the html.
      div.html(
        '<img src="' + still_image + '">' + 
        '<p>' + rating + '</p>'
      );

      $('#emotion').prepend(div);
      // $('#emotion').prepend(rating)


// my bodged together mouseover movement. It works, but I'm not proud of it.
      div.find('img').mouseover(function() {
        $(this).attr('src', animated_image);
      })
      .mouseleave(function() {
        $(this).attr('src', still_image);
      });
   });
  });
}


function addButton() {
  // When the addbutton function is run, this adds the new button to the end.
  // if ($("#search").val() === "")
// else
emote.push($("#search").val());
  $('#search').val('');
  listButtons();

}


function listButtons() {
  var wrap = $('#buttonArray');
  wrap.empty();
  // This makes buttons, then gets rid of them on refresh
  emote.forEach(function (title, index) {
    // Not sure what index means, but it seems vital. Title is title.
    var button = $("<button>");
    // This just passes the current information to the button
    button.text(title);
    // Tells the button where to go
    wrap.append(button);
    // Lets the buttons know when to do that crazy voodoo that they do so well.
    button.on("click", GetEmote);
  });
}

// Makes a new button when you click the submit button, then runs the listbuttons function to add it.
$("#submit").on("click", addButton);


listButtons();
