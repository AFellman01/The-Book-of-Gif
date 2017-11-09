// Default array declared
var emote = ['angry', 'sad', 'love', 'happy', 'monkey'];


function GetEmote() {
  var emotion_name = $(this).text().toLowerCase();

  $('#emotion').empty();
  // Constructing a queryURL from custom API key
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + emotion_name + "&api_key=k6c4HJj3Kj6eL5PIOjffGv83ZHtX1xji&limit=5";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
   response.data.forEach(function(gif) {
      var still_image = gif.images.downsized_still.url;
      var animated_image = gif.images.downsized.url;

      var div = $('<div class="gif">');

      div.html(
        '<img src="' + still_image + '">'
      );

      $('#emotion').prepend(div);

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
  // Pushes the new search term to the end of the array
  emote.push($("#search").val());
  $('#search').val('');
  listButtons();
}


function listButtons() {
  var wrap = $('#buttonArray');
  wrap.empty();
  // For loop to populate search term buttons and add their functionality
  emote.forEach(function (title, index) {
    // Creating a button for the current array string
    var button = $("<button>");
    // Setting the button's name to the current string
    button.text(title);

    // Appending the button to the selected location
    wrap.append(button);
    // Creating an event listener for each button
    button.on("click", GetEmote);
  });
}

// Function to add a search term.
$("#submit").on("click", addButton);
listButtons();
