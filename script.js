const container = document.getElementById("container");
const text = document.getElementById("text");
const start = document.getElementById("start");
const pointer = document.querySelector('.pointer-container');

const audio_bgm = document.querySelector(".bgm");
audio_bgm.loop = true;
const audio_in = document.querySelector(".breathin");
const audio_hold = document.querySelector(".hold");
const audio_out = document.querySelector(".breathout");

const duration = document.getElementById("timerDuration");
const numUsers = document.getElementById("numUsers");

const soundEffect = new Audio();

const d = new Date();
let seconds = d.getSeconds()%10;
//numUsers.innerText = "当前在线人数：".concat( Math.floor( Math.random() * 10 ) + 300 ); #Generate a randome number
numUsers.innerText = "当前在线人数：".concat( seconds + 300 );

// The 4-7-8 breathing technique: https://www.medicalnewstoday.com/articles/324417
const totalTime = 19000;
const breatheTime = 4000;
const holdTime = 7000;
pointer.style.animationPlayState = 'paused';

const play = document.querySelector(".play");
play.addEventListener("click", function() {
  start.innerText = "";
  init();
});

function countDown() {
    var duration = document.getElementById("idTimer").value*60*1000;
    //alert(duration);
    var start_time = Date.now();
    var bar = document.getElementById("idBar");
    var width = 1;

    setInterval(() => { window.location.reload(); }, duration);
    document.getElementById("idTimer").disabled=true;

    //progress bar
    var id = setInterval(frame, 1000);
    function frame() {
      if (width >= 100) {
        clearInterval(id);
      } else {
        width = ( Date.now() - start_time )/duration*100;
        bar.style.width = width + "%";
      }
    }
}

function breatheAnimation() {

  //audio_in.currentTime = 0;
  //console.log("Breach in!");
  //audio_in.muted = false;
  //audio_in.play();
  //audio_out.currentTime = 0;
  soundEffect.src = "./static/breathin.mp3";
  soundEffect.play();
  text.innerText = "吸气!";
  container.className = "container grow";

  window.setTimeout(() => {

    soundEffect.src = "./static/hold.mp3";
    soundEffect.play();
    text.innerText = "屏住呼吸";
    //audio_hold.muted = false;
    //audio_hold.play();
    //audio_in.currentTime = 0;

    window.setTimeout(() => {
      soundEffect.src = "./static/breathout.mp3";
      soundEffect.play();
      text.innerText = "呼气!";
      //audio_out.muted = false;
      //audio_out.play();
      //audio_hold.currentTime = 0;
      container.className = "container shrink";
    }, holdTime);
  }, breatheTime);
}

function init() {

    if (pointer.style.animationPlayState == "paused" ) {

      pointer.style.animationPlayState = 'running';
      play.src = "./img/pause.svg";
      audio_bgm.play();
      soundEffect.src = "./static/breathin.mp3";
      soundEffect.play(1);
      soundEffect.pause();

      countDown();

      // Init
      breatheAnimation();
      setInterval(breatheAnimation, totalTime);


    }else{
        window.location.reload(); // Refresh the entire page
        // container.style.animation = 'none';
        start.innerText = "点击下方按钮<br>开始练习";
    }

}
