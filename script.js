$(document).ready(function(){
    $(".loading").delay(1500).fadeOut('slow');
})

$(document).ready(function(){
  $(".loading2").delay(100).fadeOut('slow');
})

AOS.init({
  offset: 50,
  duration: 300,
  delay: 0,
  easing: 'ease-in-out',
  mirror: true,
  anchorPlacement: 'top-center'
});

const tiles = [
  {
    image:
      "images/hero1.webp",
    thumb:
      "images/hero1-thumbs.webp",
    title: "Welcome To<br />The City Of Ponorogo",
    nextTitle: "Reog <br />Ponorogo"
  },
  {
    image:
      "images/hero2.webp",
    thumb:
      "images/hero2-thumbs.webp",  
    title: "Wide ,& Beautiful<br />Natural Tourism",
    nextTitle: "Cumbri <br />Hill"
  },
  {
    image:
      "images/hero3.webp",
    thumb:
      "images/hero3-thumbs.webp",
    title: "Reog is Ponorogo<br />original art",
    nextTitle: "Klono <br />Sewandono"
  }
];

let activeIndex = 0;
const nextButton = document.querySelector(".next-tile");
updateTileRatio();
populateInitialData();
nextButton.addEventListener("click", nextTile);

function populateInitialData() {
  const tileImages = document.querySelectorAll(".tile__img");
  tileImages[0].src = `${tiles[activeIndex].image}`;
  tileImages[1].src = `${tiles[getNextIndex()].image}`;

  const tileTitles = document.querySelectorAll(".title__text");
  tileTitles[0].innerHTML = tiles[activeIndex].title;
  tileTitles[1].innerHTML = tiles[getNextIndex()].title;

  const nextButtonImages = document.querySelectorAll(
    ".next-tile__preview__img"
  );
  nextButtonImages[0].src = `${tiles[getNextIndex()].thumb}`;
  nextButtonImages[1].src = `${tiles[getNextIndex(1)].thumb}`;

  const nextButtonTitles = document.querySelectorAll(".next-tile__title__text");
  nextButtonTitles[0].innerHTML = tiles[getNextIndex()].nextTitle;
  nextButtonTitles[1].innerHTML = tiles[getNextIndex(1)].nextTitle;
}

function updateTileRatio() {
  const browserWidth = document.body.clientWidth;
  const browserHeight = document.body.clientHeight;
  const browserRatio = browserWidth / browserHeight;
  const imageWidth = 960; 
  const imageHeight = 540;
  const imageRatio = imageWidth / imageHeight;
  const tileImages = document.querySelectorAll(".tile__img");

  if (browserRatio < imageRatio) {
    for (let i = 0; i < tileImages.length; i++) {
      tileImages[i].style.width = "auto";
      tileImages[i].style.height = "100%";
    }
  } else {
    for (let i = 0; i < tileImages.length; i++) {
      tileImages[i].style.width = "100%";
      tileImages[i].style.height = "auto";
    }
  }
}

window.addEventListener("resize", screenResized);

function screenResized() {
  updateTileRatio();
}

const titleAnimation = new TimelineMax({ paused: true })
  .to(
    ".title__container",
    0.8,
    { ease: Power2.easeOut, yPercent: -50 },
    "titleAnimation"
  )
  .to(".title__text--first", 0.5, { opacity: 0 }, "titleAnimation")
  .eventCallback("onComplete", () => {
    titleAnimation.progress(0).pause();

    const titles = document.querySelectorAll(".title__text");
    titles[0].innerHTML = tiles[activeIndex].title;
    titles[1].innerHTML = tiles[getNextIndex()].title;
  });

TweenMax.set(".next-tile__preview img", { top: "50%", right: "0", y: "-50%" });
TweenMax.set(".tile__img", { top: "50%", left: "50%"});
TweenMax.set(".tile__img--last", { scale: 1.2, opacity: 0.001, x: "-50%", y: "-50%"}); 
TweenMax.set(".tile__img--first, .title__img--last", {
  yPercent: -50,
  xPercent: -50
});
TweenMax.set("header .title", { y: "-50%", width: "100%" });
TweenMax.set(".title__container", { width: "100%" });

const nextTextAnimation = new TimelineMax({ paused: true })
  .to(".next-tile__title__text--first", 0.4, { opacity: 0 }, "textChange")
  .to(".next-tile__title__text--last", 0.4, { opacity: 1 }, "textChange");

const titles = document.querySelectorAll(".next-tile__title__text");
const tileImages = document.querySelectorAll(".tile__img");
const previewImages = document.querySelectorAll(".next-tile__preview__img");
const nextButtonAnimation = new TimelineMax({ paused: true })
  .to(".next-tile__details", 0.6, { ease: Power1.easeOut, xPercent: 80 })
  .to(".tile__img--last", 0.6, { ease: Sine.easeOut, opacity: 1, scale: 1 }, 0)
  .to(".next-tile__preview__img--first", 0, { opacity: 0 }, "sliderClosed")
  .to(
    ".next-tile__preview__img--last",
    0.6,
    { ease: Sine.easeOut, opacity: 1, scale: 1 },
    "sliderClosed"
  )
  .to(
    ".next-tile__details",
    0.5,
    { ease: Sine.easeOut, xPercent: 0 },
    "sliderClosed+=0.15"
  )
  .add(() => nextTextAnimation.play(), "-=0.5")
  .eventCallback("onComplete", () => {
    nextButtonAnimation.progress(0).pause();
    nextTextAnimation.progress(0).pause();

    tileImages[0].src = `${tiles[activeIndex].image}`;
    tileImages[1].src = `${tiles[getNextIndex()].image}`;

    previewImages[0].src = `${tiles[getNextIndex()].thumb}`;
    previewImages[1].src = `${tiles[getNextIndex(1)].thumb}`;

    titles[0].innerHTML = tiles[getNextIndex()].nextTitle;
    titles[1].innerHTML = tiles[getNextIndex(1)].nextTitle;
  });

function getNextIndex(skipSteps = 0) {
  let newIndex = activeIndex;
  incrementIndex();

  for (let i = 0; i < skipSteps; i++) {
    incrementIndex();
  }

  function incrementIndex() {
    if (newIndex >= tiles.length - 1) {
      newIndex = 0;
    } else {
      newIndex = newIndex + 1;
    }
  }

  return newIndex;
}

function nextTile() {
  if (
    !titleAnimation.isActive() &&
    !nextButtonAnimation.isActive() &&
    !nextTextAnimation.isActive()
  ) {
    activeIndex = getNextIndex();
    titleAnimation.play();
    nextButtonAnimation.play();
  }
}

titleAnimation.progress(1).progress(0);
nextButtonAnimation.progress(1).progress(0);
nextTextAnimation.progress(1).progress(0);

var modal = document.getElementsByClassName("about-the-maker")[0];
function showmodal() {
    modal.style.bottom = "20px";
    modal.style.opacity = "1";
}
function hidemodal() {
    modal.style.bottom = "-300px";
    modal.style.opacity = "0";
}

var headertitle = document.querySelector("header .title");
window.addEventListener('scroll' , function(){
    let value = 1 + window.scrollY/-500;
    headertitle.style.opacity = value;
});

window.addEventListener('scroll', function(){
    var scroll = this.document.querySelector('.back-to-up');
    scroll.classList.toggle("scrolll" , window.scrollY > 500)
})

$(document).ready(function(){
  $(window).scroll(function(){
    if(this.scrollY > 20) 
      $(".headerpage").addClass("hide");
    else
      $(".headerpage").removeClass("hide");
  });
});

$(document).ready(function(){
  $(window).scroll(function(){
    if(this.scrollY > 20) 
      $(".navbar").addClass("sticky");
    else
      $(".navbar").removeClass("sticky");
  });

  $('.menu-toggler').click(function(){
    $(this).toggleClass("active");
    $(".navbar-menu").toggleClass("active");
  });
});

function backTop(){
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
}

$(document).ready(function(){
    $("header .scroll-now a").on('click', function(event) {
      if (this.hash !== "") {
        event.preventDefault();
        var hash = this.hash;
        $('html, body').animate({
          scrollTop: $(hash).offset().top
        }, 800, function(){
          window.location.hash = hash;
        });
      }
    });
});
  
$("#whats-hot .whats-hot.owl-carousel").owlCarousel({
    loop: true,
    dots: false,
    responsive:{
        0:{
            margin: 5,
            items: 1.3
        },
        470:{
            margin: 5,
            items: 2.3
        },
        702:{
            margin: 10,
            items: 3.5
        },
    }
});

$('.mini-info.owl-carousel').owlCarousel({
    loop: true,
    dots: false,
    autoplay: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive:{
      0:{
          items: 3
      },
      400:{
          items: 4
      },
      702:{
          items: 8
      },
  }
});

$(document).ready(function() {
  $('.mini-info').magnificPopup({
    type:'image',
    delegate: 'a',
    gallery: {
			enabled: true,
			navigateByImgClick: true,
			preload: [0,1]
		},
  });
});

gsap.from('header .headerpage', {duration: 1, delay:2.3, y: -50})
gsap.from('header .logo', {opacity: 0, duration: 1, delay:2, y: 30})
gsap.from('header .navbar-menu a', {opacity: 0, duration: 1, delay: 2.1, stagger: 0.2})
gsap.from('header .menu-toggler span', {duration: 1, delay:2.1, width: 0, stagger: 0.2})
gsap.from('header .title', {opacity: 0, duration: 1, delay:1.6, top: 0})
gsap.from('header .next-tile__details', {opacity: 0, duration: 1, delay:2.1, width: 0})