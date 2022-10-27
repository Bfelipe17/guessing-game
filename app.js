var arr = ['Bee', 'Butterfly', 'Cat', 'Cow', 'Dog', 'Duck', 'Elephant', 'Frog', 'Kangaroo', 'Lion', 'Monkey', 'Penguin', 'Rooster', 'Snake'];
var animals = ['Bee', 'Butterfly', 'Cat', 'Cow', 'Dog', 'Duck', 'Elephant', 'Frog', 'Kangaroo', 'Lion', 'Monkey', 'Penguin', 'Rooster', 'Snake'];
var audioError = new Audio('./sound/error.mp3');
var audioCorrect = new Audio('./sound/correct.mp3');
audioError.volume = 0.1;
audioCorrect.volume = 0.1; // const animals = ['Bee'];

var images = document.querySelectorAll('.item img');
var mp4 = document.querySelector('.mp4');
var webm = document.querySelector('.webm');
var start = document.querySelector('#screen_one');
var startButton = document.querySelector('.button_start');
var game = document.querySelector('#screen_two');
var end = document.querySelector('.end_game');
var playAgain = document.getElementById('play-again-button');
var playAgainScene = document.querySelector('.play-again');
var imageBorder = document.querySelector('.image-border');
var poster;
var isPlaying = false;
var videoBorder;
var videoItself;

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var _ref = [array[j], array[i]];
    array[i] = _ref[0];
    array[j] = _ref[1];
  }
}

shuffleArray(arr);
shuffleArray(animals);

function setWidthAndHeight() {
  videoItself.style.width = videoBorder.width + 'px';
  videoItself.style.height = (videoBorder.height - 5) + 'px';
  videoJs.style.width = videoBorder.width + 'px';
  videoJs.style.height = (videoBorder.height - 5) + 'px';
  videoItself.style.borderRadius = '50px';
  videoJs.style.borderRadius = '50px';
}



function startGame() {
  startButton.addEventListener('click', function () {
    poster = document.querySelector('.vjs-poster');
  
    videoBorder = document.querySelector('.video-border').querySelector('.image-border');
    videoItself = document.querySelector('.video-itself').querySelector('video');
    videoJs = document.querySelector('.video-itself').querySelector('.video-js')
  
    setTimeout(function() {
      console.log(videoBorder.width, videoBorder.height);
      setWidthAndHeight();
    }, 1000)
  
    setTimeout(function() {
      console.log(videoBorder.width, videoBorder.height);
      setWidthAndHeight();
    }, 1100)
  
    setTimeout(function() {
      console.log(videoBorder.width, videoBorder.height);
      setWidthAndHeight();
    }, 1200)
  
    setTimeout(function() {
      console.log(videoBorder.width, videoBorder.height);
      setWidthAndHeight();
    }, 1300)
  
    anime({
      targets: '.button_start',
      translateX: '500%',
      easing: 'easeInOutElastic(1, .6)'
    });
    var animation = anime({
      targets: '.whats',
      translateX: '150%',
      easing: 'easeInOutElastic(1, .6)',
      complete: function complete(anim) {
        setTimeout(setAnimation(), 1000);
      }
    });
    playGame()
  });
}

function playGame() {
  setVideo(animals[0]);
  images.forEach(function (image) {
    image.addEventListener('click', function () {
      audioError.pause();
      audioCorrect.pause();
      audioError.currentTime = 0;
      audioCorrect.currentTime = 0;
      checkAnimal(animals[0], image);
      if (animals.length == 0) {
        game.style.display = 'none';
        end.style.display = 'block';
        setTimeout(function () {
          playAgainScene.style.opacity = '1';
        }, 2500);
      }
    });
  });
}



function endGame() {
  playAgain.addEventListener('click', function () {
    window.location.reload();
    return false;
  });
}


startGame()

endGame()




function playVideo() {
  if (videoItself.paused) {
    videoItself.play();
    isPlaying = false;
  } else {
    videoItself.pause();
    isPlaying = true;
  }
}

function setVideo(animal) {
  if (animal == 'Bee' || animal == 'Cat' || animal == 'Cow' || animal == 'Dog' || animal == 'Duck' || animal == 'Frog' || animal == 'Lion' || animal == 'Rooster') {
    videoItself.poster = "images/Botoes/Audio.png";
    videoJs.style.height = "".concat(imageBorder.height, "px");
  } else {
    videoItself.poster = "images/Botoes/Video-Audio.png";
    videoJs.style.height = "initial";
  }

  videoItself.src = "images/Dicas/".concat(animal, ".mp4");
  mp4.src = "images/Dicas/".concat(animal, ".mp4");
  webm.src = "images/Dicas/".concat(animal, ".webm");
}


function setAnimation() {
  start.style.display = 'none';
  game.style.display = 'block';
}

images.forEach(function (image, index) {
  image.src = "images/Animais/".concat(arr[index], ".png");
  image.dataset.animal = "".concat(arr[index]);
  rand = Math.random() * (60 - -60) + -60;
  image.style.transform = "rotate(".concat(rand, "deg)");
});

function checkAnimal(animal, image) {
  var dataset = image.dataset.animal;
  
  if (animal == dataset) {
    audioCorrect.play();
    animals.shift()
    image.parentNode.style.transform += 'scale(0.5)';
    image.style.animation = 'none';
    image.style.transform = 'rotate(0deg)';
    setVideo(animals[0])
  } else {
    audioError.play();
  }


}