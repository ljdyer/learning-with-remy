// Preload images and audio
function preloadImgAndAudio() {
  var images = [];
  var audio = [];
  for (var i=0; i<objects.length; i++) {
    console.log(`Preloading ${objects[i][0]}`)
    console.log(`Preloading ${objects[i][1]}`)
    images[i] = new Image();
    images[i].src = objects[i][0];
    audio[i] = new Audio();
    audio[i].src = objects[i][1];
  }
}

// Set counters
function set_counters(played, remain, score){
  $('#played').text(played.toString())
  $('#remain').text(remain.toString())
  $('#score').text(score.toString())
}

// Adjust counters
function adjust_counters(played, remain, score){
  $('#played').text((parseInt($('#played').text()) + played).toString())
  $('#remain').text((parseInt($('#remain').text()) + remain).toString())
  $('#score').text((parseInt($('#score').text()) + score).toString())
}

// Display result on screen
function display_result(text, the_class){
  $("#main").empty();
  $("#main").append(`<h1 class='${the_class}'>${text}</h1>`);
}

// Play audio file
function play_audio(filename){
  var audio = new Audio(filename);
  audio.play();
}

// Get a random integer between 1 and max
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max)) + 1;
}

// Clear all intervals
function clear_intervals(){
  intervals.map((a) => {
    clearInterval(a);
  })
  intervals = [];
}

// Get number pressed from keycode
function num_pressed(keycode){
  switch (event.which){
    case 49: case 97: return 1; break;
    case 50: case 98: return 2; break;
    case 51: case 99: return 3; break;
    case 52: case 100: return 4; break;
    case 53: case 101: return 5; break;
    case 54: case 102: return 6; break;
    case 55: case 103: return 7; break;
    case 56: case 104: return 8; break;
    case 57: case 105: return 9; break;
    // Return 0 if not a number key
    default: return 0;
  }
}
