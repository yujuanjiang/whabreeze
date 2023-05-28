const container = document.getElementById("container");
const text = document.getElementById("text");
const pointer = document.querySelector('.pointer-container');

const audio_bgm = document.querySelector(".bgm");
audio_bgm.loop = true;

const soundEffect = new Audio();
soundEffect.src = "./static/breathin.mp3";

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

  //audio_in.currentTime = 0;
  //console.log("Breach in!");
  //audio_in.play();
  soundEffect.play();
  text.innerText = "吸气!";
  container.className = "container grow";

  window.setTimeout(() => {

    soundEffect.src = "./static/hold.mp3";
    soundEffect.play();
    text.innerText = "屏住呼吸";
    //audio_hold.play();

    window.setTimeout(() => {

      soundEffect.src = "./static/breathout.mp3";
      soundEffect.play();
      text.innerText = "呼气!";
      //audio_out.play();
      container.className = "container shrink";

    }, holdTime);

  }, breatheTime);

}



function init() {

    if (pointer.style.animationPlayState == "paused" ) {
      // Init
      breatheAnimation();
      setInterval(breatheAnimation, totalTime);
      pointer.style.animationPlayState = 'running';
      play.src = "./img/pause.svg";
      audio_bgm.play();

    }else{

        window.location.reload(); // Refresh the entire page
        // container.style.animation = 'none';
    }

}
