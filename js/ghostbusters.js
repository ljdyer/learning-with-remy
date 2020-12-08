// ====================
// CONSTANT DEFINITIONS
// ====================

// Time to display result of each round
const pause_time = 1500;
// Time to wait for player response
const wait_time = 30000;
// Maximum number of objects to display
const max_num = 9;
// Display width of images
const img_width = "8%";
// Number of rounds to play
const total_rounds = 10;
// Objects (images) to display
const objects = [
  ['img/ghostbusters/ghostbuster1.png', 'audio/ghostbusters/ghostbuster.mp3', 'Ghostbuster'],
  ['img/ghostbusters/ghostbuster2.png', 'audio/ghostbusters/ghostbuster.mp3', 'Ghostbuster'],
  ['img/ghostbusters/ghostbuster3.png', 'audio/ghostbusters/ghostbuster.mp3', 'Ghostbuster'],
  ['img/ghostbusters/ghostbuster4.png', 'audio/ghostbusters/ghostbuster.mp3', 'Ghostbuster'],
  ['img/ghostbusters/staypuft.png', 'audio/ghostbusters/staypuft.mp3', 'Stay Puft'],
  ['img/ghostbusters/slimer.png', 'audio/ghostbusters/slimer.mp3', 'Slimer'],
  ['img/ghostbusters/zuul.png', 'audio/ghostbusters/zuul.mp3', 'Zuul']
];
// Background music
const bgm_src = 'audio/ghostbusters_theme.mp3';
// Audio volumes. First element is starting volume and final element is max volume (applied after game finishes)
// *Must have exactly 6 elements
audio_volumes = [0.2,0.3,0.4,0.5,0.6,0.7];
// Time to wait between each volume increment
volume_delay = 3000;

// ===========================
// GLOBAL VARIABLE DEFINITIONS
// ===========================

// Number of object displayed
var num = 0;
var game_pending = true; // Game has yet to start
var waiting = false; // Waiting for player input
// Array to store all timeout intervals
var intervals = [];

$( document ).ready(function() {
  // Preload images and audio
  preloadImgAndAudio();
  // Set listener for player input
  document.onkeydown = function (event) {
    // Start game on any key press
    if (game_pending == true){
      game_pending = false;
      play_game()
    }
    else{
      // If currently waiting for player input
      if (waiting == true){
        // Get key pressed
        input_num = num_pressed(event.which)
        // If a number key was pressed
        if (input_num > 0){
          clear_intervals();
          // If player pressed the correct number
          if (input_num == num){
            display_result('Correct! Nice one!', 'good');
            play_audio('audio/success.mp3');
            adjust_counters(1,-1,1)
            waiting = false;
            setTimeout(advance_game, pause_time)
          }
          // If player pressed an incorrect number
          else{
            display_result(`Oops! Too bad! The correct answer was ${num}`, 'bad');
            play_audio('audio/failure.mp3');
            adjust_counters(1,-1,0)
            waiting = false;
            setTimeout(advance_game, pause_time)
          }
        }
      }
    }
  }
}); // document.ready

function play_round(){
  // Determine object to display
  n = getRandomInt(objects.length) - 1;
  [img_src,audio_src,object] = objects[n];
  // Determine number of object to display
  num = getRandomInt(max_num);
  // Display instructions
  instruction_text = `How many ${object}s are there?`
  $("#instructions").text(instruction_text)
  // Play instruction audio
  play_audio(audio_src);

  // Display objects
  $("#main").empty();
  for (i=0;i<num;i++){
    $("#main").append(`<img class="game-image" src=${img_src} width=${img_width}><img>`);
  }
  // Wait for user input
  waiting = true;
  // Set timeout for end of round
  intervals.push(window.setInterval(function () {
    display_result(`Out of time!`, 'bad');
    adjust_counters(1,-1,0)
    play_audio('audio/failure.mp3');
    waiting = false;
    setTimeout(advance_game, pause_time)
  }, wait_time));

}
