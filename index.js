var gradientReds = document.querySelectorAll(".gradientRed");
var sliderContainers = document.querySelectorAll('.slider-container');
var centeredImages =  document.querySelectorAll(".centeredImage");


const checkInViewPort = () => {
  var overviewAreas = document.querySelectorAll(".overview-area");

  for (var i = 0; i < overviewAreas.length; i++) {
    var windowHeight = window.innerHeight;
    var elementTop = overviewAreas[i].getBoundingClientRect().top;
    var elementVisible = 200;

    if (elementTop < windowHeight - elementVisible) {
      overviewAreas[i].classList.add("active");
    } else {
      overviewAreas[i].classList.remove("active");
    }
  }
  sliderContainers.forEach((sliderContainer)=>{
    if(sliderContainer.classList.contains("active")){
      setTimeout(() => {
        centeredImages.forEach((centeredImage)=>{
          centeredImage.classList.add("image-fade-right")
        })
        
      }, 600);
    }else{
      centeredImages.forEach((centeredImage)=>{
        centeredImage.classList.remove("image-fade-right")
      })
    }
  })

};
window.addEventListener("scroll", checkInViewPort);

let moveRandom = setInterval(() => {
  moveRandomly();
}, 2000);

const moveRandomly = () => {
  const containers = document.querySelectorAll(".container");
  containers.forEach((container) => {
    let gradientGreen = document.createElement("div");
    gradientGreen.className='gradientGreen';
  var gradientGreens = document.querySelectorAll(".gradientGreen");
    gradientGreens.forEach((item) => {
      item.style.top =
        Math.round(Math.random() * container.clientHeight - item.clientHeight) +
        "px";
      item.style.left =
        Math.round(Math.random() * container.clientWidth - item.clientWidth) +
        "px";
    });

    gradientReds.forEach((item) => {
      setTimeout(() => {
        item.style.top =
          Math.round(
            Math.random() * container.clientHeight - item.clientHeight
          ) + "px";
        item.style.left =
          Math.round(Math.random() * container.clientWidth - item.clientWidth) +
          "px";
      }, 500);
    });
  });
};


const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

const slideWidth = slides[0].offsetWidth;
let currentIndex = 0;

prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSliderPosition();
});

nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % slides.length;
  updateSliderPosition();
});

let isDragging = false;
let startPosX = 0;
let currentTranslate = 0;
let prevTranslate = 0;

slider.addEventListener('mousedown', (e) => {
  isDragging = true;
  startPosX = e.clientX;
  slider.style.cursor = 'grabbing';
});

slider.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  const deltaX = e.clientX - startPosX;
  currentTranslate = prevTranslate + deltaX;
  slider.style.transform = `translateX(${currentTranslate}px)`;
});

slider.addEventListener('mouseup', () => {
  isDragging = false;
  prevTranslate = currentTranslate;
  slider.style.cursor = 'grab';
});

slider.addEventListener('mouseleave', () => {
  isDragging = false;
  slider.style.cursor = 'grab';
});

function updateSliderPosition() {
  slider.style.transition = 'transform 0.3s ease-in-out';
  slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

  slides.forEach((slide) => slide.classList.remove('image-fade-right'));

  // Add active class to the current slide
  slides[currentIndex].classList.remove('image-fade-right');
  setTimeout(() => {
    slides[currentIndex].classList.add('image-fade-right'); 
  }, 100)
}
