$( document ).ready(function() {

  // When the song form is submitted, create a new list item in the 
  // "Song Queue" list, containing the song string. ALSO, clear the 
  // text field contents.

  $('#song-form').submit(function(e) {
    $('#song-queue').append( '<li>' + $('#song-form input[type="text"]').val() + '</li>' );
    $('#song-form input[type="text"]').val('');
    e.preventDefault();
  });

  // 2. When the "Play" button is clicked:
  //   - Start playing the top song in the queue.
  //   - Remove the top song in the queue.
  //   - When the song is finished playing, repeat with the next top 
  //     song until there are no songs left to play.

  $('#play-button').on('click', function() {
    var playSongQueue = function() {
      if ($('#song-queue li:first-child').length > 0) {
        var nextSong = $('#song-queue li:first-child').detach().text();
        return playSong(parseSong(nextSong), 500, playSongQueue);
      }
    };
    playSongQueue();
  });

});