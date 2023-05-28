const container = document.getElementById("container");
const text = document.getElementById("text");
const pointer = document.querySelector('.pointer-container');

const audio_bgm = document.querySelector(".bgm");
const audio_in = document.querySelector(".breathin");
const audio_out = document.querySelector(".breathout");
const audio_hold = document.querySelector(".hold");
audio_bgm.loop = true;

// The 4-7-8 breathing technique: https://www.medicalnewstoday.com/articles/324417
const totalTime = 19000;
const breatheTime = 4000;
const holdTime = 7000;
pointer.style.animationPlayState = 'paused';

const play = document.querySelector(".play");
play.addEventListener("click", function() {
  init();
});

function breatheAnimation() {
  text.innerText = "吸气!";
  container.className = "container grow";
  audio_hold.play();

  setTimeout(() => {
    text.innerText = "屏住呼吸";
    audio_hold.play();
    //audio_in.currentTime = 0;

    setTimeout(() => {

      text.innerText = "呼气!";
      audio_out.play();

      container.className = "container shrink";

    }, holdTime);

  }, breatheTime);

}



function init() {

    if (pointer.style.animationPlayState == "paused" ) {

      sessionID = setInterval(breatheAnimation, totalTime);
      // Init
      breatheAnimation();
      pointer.style.animationPlayState = 'running';
      play.src = "./img/pause.svg";
      audio_bgm.play();


    }else{
        clearInterval(sessionID);
        window.location.reload(); // Refresh the entire page
        // container.style.animation = 'none';
        // text.innerText = "";
        // pointer.style.animationPlayState = 'paused';
    }

}
