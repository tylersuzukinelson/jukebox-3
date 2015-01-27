$( document ).ready(function() {

  // 1. When the song form is submitted, create a new list item in 
  // the "Song Queue" list, containing the song string. ALSO, clear 
  // the text field contents.
  // 2. When the "Enqueue Song" button is clicked, add the song's 
  // name to the list item you create. Now the queue should include 
  // song names AND the song notes themselves.
  // 1. Only show the song's title in the queue. When you move your 
  // mouse over a particular song in the queue, however, fade in the 
  // song's notes. When your mouse leaves that song, fade the song's 
  // notes back out.

  $('#song-form').submit(function(e) {
    e.preventDefault();
    $('#song-queue').append( '<li><strong>' + $('#song-form input[name="songName"]').val() + '</strong><br /><em style="display:none;">' + $('#song-form input[name="song"]').val() + '</em></li>' );
    $('#song-form input[type="text"]').val('');

    $('#song-queue li').on('mouseenter', function() {
      console.log(this);
      $(this).find('em').fadeIn();
    });

    $('#song-queue li').on('mouseleave', function() {
      $(this).find('em').fadeOut();
    });

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

  var playSongQueue = function() {
    $('#play-button').slideUp();
    if ($('#song-queue li:first-child').length > 0) {
      var nextSongData = $('#song-queue li:first-child').detach();
      var nextSongTitle = $(nextSongData).find('strong').text();
      var nextSong = $(nextSongData).find('em').text();
      $('#now-playing').text('Now Playing ' + nextSongTitle);
      return playSong(parseSong(nextSong), 500, playSongQueue);
    } else {
      $('#now-playing').text('Enter a song to play.');
      $('#play-button').slideDown();
    }
  };

  $('#play-button').on('click', function() {
    playSongQueue();
  });

  // 2. Start playing songs as above when you press "spacebar". 
  // However, make sure you can still enter songs properly in the form 
  // (the songs shouldn't start playing if you enter a space while 
  // writing the song's notes).
  $(document).on('keypress', function(event) {
    if (event.which == 32 && !$(event.target).is('input')) {
      playSongQueue();
    }
  });

});