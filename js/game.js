// Begin a new game
function play_game(){
  // Create & append audio element
  var audioElement = document.createElement('audio');
  audioElement.setAttribute('id', 'gameaudio');
  audioElement.setAttribute('src', bgm_src);
  document.body.appendChild(audioElement);
  // Play audio when ready
  audioElement.addEventListener('canplay', function() {
    this.play();
    this.volume = audio_volumes[0];
  }, false);
  // Initialize game counters
  set_counters(0,total_rounds,0);
  // Begin first round
  advance_game();
}

// Begin a new round
function advance_game(){
  clear_intervals()
  // If there are rounds remaining, begin the next round
  if (parseInt($('#remain').text()) > 0){
    play_round()
  }
  // If that was the last round, end the game
  else{
    display_result(`Game complete! You got ${$('#score').text()} correct!`, 'complete');
    play_audio("audio/cheer.mp3");
    // Gradually increase bgm volume
    var audio = document.getElementById('gameaudio');
    this_delay = volume_delay;
    setTimeout(function(){audio.volume = audio_volumes[1];}, volume_delay);
    setTimeout(function(){audio.volume = audio_volumes[2];}, volume_delay*2);
    setTimeout(function(){audio.volume = audio_volumes[3];}, volume_delay*3);
    setTimeout(function(){audio.volume = audio_volumes[4];}, volume_delay*4);
    setTimeout(function(){audio.volume = audio_volumes[5];}, volume_delay*5);
  }
}
