// ====================
// CONSTANT DEFINITIONS
// ====================

// Time to display result of each round
const pause_time = 1500;
// Time between letters changing
const change_time = 3000;
// Display width of images
const img_width = "10%";
// Number of rounds to play
const total_rounds = 10;
// Objects (letters) to display
const objects = [
  ['img/letters/a.png', 'audio/letters/a.mp3', 'a'],
  ['img/letters/b.png', 'audio/letters/b.mp3', 'b'],
  ['img/letters/e.png', 'audio/letters/e.mp3', 'e'],
  ['img/letters/r.png', 'audio/letters/r.mp3', 'r'],
  ['img/letters/s.png', 'audio/letters/s.mp3', 's'],
  ['img/letters/u.png', 'audio/letters/u.mp3', 'u']
];
// Background music
const bgm_src = 'audio/ABC.mp3';
// Audio volumes. First element is starting volume and final element is max volume (applied after game finishes)
// *Must have exactly 6 elements
audio_volumes = [0.5,0.6,0.7,0.8,0.9,1];
// Time to wait between each volume increment
volume_delay = 3000;

// ===========================
// GLOBAL VARIABLE DEFINITIONS
// ===========================

// index of letter that player has to find
var n = 0;
// Letter that player has to find
var letter = '';
// index of letter currently being displayed
var this_n = -1;
// Letter currently being displayed
var this_letter = '-'; // Different from letter value so that game does not respond positively to key presses before value displayed
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
        clear_intervals();
        // If letter currently displayed is the correct one
        if (letter == this_letter){
          display_result('Correct! Nice one!', 'good');
          play_audio('audio/success.mp3');
          adjust_counters(1,-1,1)
          waiting = false;
          setTimeout(advance_game, pause_time)
        }
        // If a different letter is currently displayed
        else{
          display_result(`Oops! Too bad! That was '${this_letter}'.`, 'bad');
          play_audio('audio/failure.mp3');
          adjust_counters(1,-1,0)
          waiting = false;
          setTimeout(advance_game, pause_time)
        }
      }
    }
  }
}); // document.ready

function display_letters(){
  intervals.push(window.setInterval(function () {
    $("#main").empty();
    // Make selector array of possible values
    selector = Array.from(Array(objects.length).keys())
    // Remove the index corresponding to the currently displayed letter,
    // and add two instances of the letter to be found to increase display odds.
    num_to_remove = this_n<0 ? 0 : 1; // Do not remove any letters when displaying for first time
    selector.splice(selector.indexOf(this_n), num_to_remove, n, n);
    // Randomly select next letter to display
    this_n = selector[getRandomInt(selector.length) - 1];
    [img_src,,this_letter] = objects[this_n];
    // Display letter and wait for user input
    $("#main").append(`<img class="game-image" src=${img_src} width=${img_width}><img>`);
    waiting = true;
  }, change_time));
}

function play_round(){
  // SET LETTER AND THIS_LETTER TO DIFFERENT VALUES SO THAT PLAYER CANNOT GET POINTS BEFORE LETTER IS DISPLAYED
  letter = '';
  this_letter = '-';
  // Determine the letter to find
  n = getRandomInt(objects.length) - 1;
  [,audio_src,letter] = objects[n];
  // Display instructions
  instruction_text = `Press a key when you see '${letter}'.`
  $("#instructions").text(instruction_text)
  // Play instruction audio
  play_audio(audio_src);
  // Display random letters at regular intervals until player presses a key
  $("#main").empty();
  this_n = -1;
  display_letters()
}
