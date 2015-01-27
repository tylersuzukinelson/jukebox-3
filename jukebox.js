$( document ).ready(function() {

  // When the song form is submitted, create a new list item in the 
  // "Song Queue" list, containing the song string. ALSO, clear the 
  // text field contents.

  $('#song-form').submit(function(e) {
    $('#song-queue').html( $('#song-queue').html() + '<li>' + $('#song-form input[type="text"]').val() + '</li>' );
    $('#song-form input[type="text"]').val('');
    e.preventDefault();
  });

});