const container = document.getElementById('container');
const pointer = document.querySelector('.pointer-container');

const text = document.getElementById('text');
const song = document.querySelector(".song");
const audio_start = document.querySelector(".audio_start");
const audio_in = document.querySelector(".audio_in");
const audio_hold = document.querySelector(".audio_hold");
const audio_out = document.querySelector(".audio_out");

const play = document.querySelector(".play");

let totalTime = 19000;
let breatheInTime = 4000;
let holdTime = 7000;
let breatheOutTime = 8000;

let intervalID;

//song.pause();  // Initial status
song.loop = "True";
song.pause();
pointer.style.animationPlayState = 'paused';


//breathAnimation();

play.addEventListener("click", function() {
  checkPlaying(song);
});

const checkPlaying = song => {
  if (song.paused) {
    intervalID = setInterval( breathAnimation, 19000 );
    console.log("Inside play function");
    console.log(intervalID);
    song.play();
    pointer.style.animationPlayState = 'running';
    play.src = "./img/pause.svg";
    //container.play();

  } else {
    song.pause();
    pointer.style.animationPlayState = 'paused';
    container.style.animationPlayState = 'paused';
    play.src = "./img/play.svg";
    //container.classList.remove("pause")
    //container.pause();
    console.log("Inside pause function");
    console.log(intervalID);
    clearInterval(intervalID);
  }
};


function breathAnimation() {
  audio_out.currentTime = 0;
  audio_out.pause();

  audio_in.play();

  console.log("Breathing in...");
  text.innerText = 'Breathe In!';
  container.className = 'container grow';

  setTimeout(() => {

    audio_in.currentTime = 0;
    audio_hold.play();
    audio_in.pause();

    console.log("Holding...");
    text.innerText = 'Hold';


    setTimeout(() => {

      audio_hold.currentTime = 0;
      audio_hold.pause();
      console.log("Breathing out...");

      audio_out.play();
      text.innerText = 'Breathe Out!';
      container.className = 'container shrink';

    }, holdTime);

  }, breatheInTime);
}


//audio_start.play();
