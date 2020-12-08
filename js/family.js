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
// Total number of images to display in each round
const total_images = 10;
// Number of images to display on first line in each round
const first_line = 5;
// Objects (images) to display
const objects = [
  ['img/family/granpaulo.png', 'audio/family/granpaulo.mp3', 'Gran Paulo'],
  ['img/family/granny.png', 'audio/family/granny.mp3', 'Granny Nicky'],
  ['img/family/george.png', 'audio/family/george.mp3', 'Uncle George'],
  ['img/family/loz.png', 'audio/family/loz.mp3', 'Uncle Loz'],
  ['img/family/daddy.png', 'audio/family/daddy.mp3', 'Daddy'],
  ['img/family/ninny.png', 'audio/family/ninny.mp3', 'Ninny'],
  ['img/family/brian.png', 'audio/family/brian.mp3', 'Grandpa Brian']
]
// Background music
const bgm_src = 'audio/family_affair.mp3';
// Audio volumes. First element is starting volume and final element is max volume (applied after game finishes)
// *Must have exactly 6 elements
audio_volumes = [0.5,0.6,0.7,0.8,0.9,1];
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
  // Set variables
  n = getRandomInt(objects.length) - 1;
  [img_src,audio_src,object] = objects[n];
  // Determine number of main object to display
  num = getRandomInt(max_num);
  // Set images to display
  img_srcs = []
  // Insert required number of counter image
  for (i=0;i<num;i++){
    img_srcs.push(img_src)
  }
  // Insert filler images at random positions to fill rest of grid
  for (i=0;i<total_images-num;i++){
    n2 = n
    // Get a random object that is not the main object displayed
    while (n2 == n){
      n2 = getRandomInt(objects.length) - 1;
    }
    filler_img_src = objects[n2][0]
    // Insert into random position in grid
    position = getRandomInt(img_srcs.length) - 1;
    img_srcs.splice(position, 0, filler_img_src)
  }

  // Display instructions
  instruction_text = `How many times do you see ${object}?`
  $("#instructions").text(instruction_text)
  // Play instruction audio
  play_audio(audio_src);
  // Display images
  $("#main").empty();
  for (i=0;i<img_srcs.length;i++){
    $("#main").append(`<img class="game-image" src=${img_srcs[i]} width=${img_width}><img>`);
    if (i==first_line-1){
      $("#main").append(`<br></br>`);
    }
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
