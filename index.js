//DOM elements
let videoContainers = document.getElementsByClassName("video-container");
let videos = document.getElementsByClassName("video");
let background = document.getElementById("background");
let backgroundVideo = document.getElementById("background-video");
let darkBackground = document.getElementById("dark-background");
let darkBackgroundVideo = document.getElementById("dark-background-video");
let spiralBackground = document.getElementById("spiral");
let spiralBackgroundVideo = document.getElementById("spiral-video");

//sounds
let static = new Audio("/vid/strip2_audio2.mp3");
let swish = new Audio("/vid/swish.mp3");
let voice1 = new Audio("/vid/voice_1_final.mp3");
let voice2a = new Audio("/vid/voice_2a_final.mp3");
let voice2b = new Audio("/vid/voice_2b_final.mp3");
let voice3a = new Audio("/vid/voice_3a_final.mp3");
let voice3b = new Audio("/vid/voice_3b_final.mp3");

//text elements
let virago = document.getElementById("virago");

//FOR RECTANGLES (strips)
const speed1 = 2000; //need better names for these things
const speed2 = 10000;
const speed3 = 13000;
const frameRate = 50;
let timer = 0;

function updateWidths() {
  timer += frameRate;
  for (i = 0; i < videos.length; i++) {
    const speed = i == 0 ? speed1 : i == 1 ? speed2 : speed3;
    const subtractor = (100 / speed) * (timer / frameRate);
    videoContainers[i].style.width = `${100 - subtractor}vw`;
    videos[i].style.width = `${100 - subtractor}vw`;
  }

  if (timer >= speed3 * frameRate) clearInterval(intervalId);
}

//ACTUAL CODE STARTS HERE
//prevent default behavior from HTML
backgroundVideo.pause();
videos[2].pause();

window.addEventListener("click", () => {
  backgroundVideo.play();
  voice1.play();
  const intervalId = setInterval(updateWidths, frameRate);
});

//for after part 1
let b = false;
backgroundVideo.onended = () => {
  pt2();
  if (!b) {
    const play2a = setTimeout(() => voice2a.play(), 7000);
    b = true;
  } else {
    voice2b.play();
  }
  // backgroundVideo.source = "vid/teal_spiral.webm";
};

voice2a.onended = () => {
  pt3();
};

voice2b.onended = () => {
  pt4();
};

voice3a.onended = () => {
  pt5();
};

voice3b.onended = () => {
  pt6();
};

// transitionIndex = 0;
// const transitions = [pt2, pt3, pt4, pt5, pt6];
const pt2Sources = [
  [""],
  ["/vid/strip2.webm"],
  ["/vid/framed_sunflower_drive.webm"],
];

let oldWidths = [];
function pt2() {
  static.play();
  backgroundVideo.style.display = "none";
  darkBackgroundVideo.style.display = "block";
  darkBackgroundVideo.play();

  for (i = 0; i < videos.length; i++) {
    videoContainers[i].style.backgroundColor = "black";
    videos[i].style.display = "block";
    videos[i].style.width = oldWidths[i];
    videos[i].src = pt2Sources[i];
  }
}

function pt3() {
  for (i = 0; i < videos.length - 1; i++) {
    oldWidths[i] = videoContainers[i].style.width;
    videoContainers[i].style.backgroundColor = "white";
    videos[i].style.display = "none";
  }
  backgroundVideo.src = "/vid/new_jazz.webm";
  backgroundVideo.muted = false;
  backgroundVideo.style.display = "block";
  background.style.mixBlendMode = "difference";
  backgroundVideo.play();
}

function pt4() {
  backgroundVideo.style.display = "none";
  darkBackgroundVideo.src = "/vid/basketball_compressed.webm";
  darkBackgroundVideo.style.display = "block";
  darkBackground.style.animation = "basketball 1s forwards";
  darkBackgroundVideo.muted = true;
  darkBackgroundVideo.play();
  voice3a.play();
}

function pt5() {
  // spiralBackgroundVideo.style.opacity = "1";
  // spiralBackground.style.mixBlendMode = "hue";
  // spiralBackgroundVideo.play();
  voice3b.play();
  darkBackgroundVideo.muted = false;
}

function pt6() {
  // spiralBackgroundVideo.style.opacity = "0";
  darkBackgroundVideo.style.display = "none";
  // backgroundVideo.style.display = "none";
  darkBackgroundVideo.muted = true;
  virago.style.opacity = "1";
  swish.play();
}
