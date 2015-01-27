$( document ).ready(function() {

  // 1. When the song form is submitted, create a new list item in 
  // the "Song Queue" list, containing the song string. ALSO, clear 
  // the text field contents.
  // 2. When the "Enqueue Song" button is clicked, add the song's 
  // name to the list item you create. Now the queue should include 
  // song names AND the song notes themselves.

  $('#song-form').submit(function(e) {
    e.preventDefault();
    $('#song-queue').append( '<li><strong>' + $('#song-form input[name="songName"]').val() + '</strong><br /><em>' + $('#song-form input[name="song"]').val() + '</em></li>' );
    $('#song-form input[type="text"]').val('');
  });

  // 2. When the "Play" button is clicked:
  //   - Start playing the top song in the queue.
  //   - Remove the top song in the queue.
  //   - When the song is finished playing, repeat with the next top 
  //     song until there are no songs left to play.
  // 3. When the "Play" button is clicked, slide it up. When the last 
  // song is finished playing, slide the "Play" button back down.
  // 3. When the Jukebox is playing a song, a message should show on 
  // the page saying "Now Playing [Song Name]". When there is no song 
  // playing, the message should say "Enter a song to play.".

  $('#play-button').on('click', function() {
    var flag = true;
    var playSongQueue = function() {
      $('#play-button').slideUp();
      if ($('#song-queue li:first-child').length > 0) {
        var nextSongData = $('#song-queue li:first-child').detach();
        var nextSongTitle = $(nextSongData).find('strong').text();
        var nextSong = $(nextSongData).find('em').text();
        $('#now-playing').text('Now Playing' + nextSongTitle);
        return playSong(parseSong(nextSong), 500, playSongQueue);
      } else {
        $('#now-playing').text('Enter a song to play.');
        $('#play-button').slideDown();
      }
    };
    playSongQueue();
  });

});