import { gsap, Power2 } from "gsap";
import "core-js";
import "regenerator-runtime";

import "../sass/main.scss";
import fullSizeSrc from "../img/long-cover.jpg";

const int = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

// Inject Date
setInterval(() => {
  int.format(new Date());
  coverDate.textContent = int.format(new Date());
}, 1000);

// DOM Elements
const coverDate = document.querySelector(".date");
const navButton = document.querySelector(".nav__links__item");
const navOpen = document.querySelector(".nav--open");
const coverImg = document.querySelector(".cover__image");
const navImages = document.querySelectorAll(".nav__images > img");

// Swap small image to large image
coverImg.setAttribute("src", fullSizeSrc);
coverImg.addEventListener("load", function (evt) {
  console.log(evt.target.getAttribute("src"));
  evt.target.classList.remove("cover__image--blur");
});

// Pause when first load
// Start at reversed so we can use `toggleTimeline`
const tl = gsap.timeline({ paused: true, reversed: true });

tl.to(".cover", {
  width: "60%",
  duration: 1,
  filter: "blur(1.5px)",
  ease: Power2.easeOut,
})
  .to(
    ".date",
    {
      y: 50,
      opacity: 0,
      ease: Power2.easeOut,
      duration: 0.5,
    },
    "-=1"
  )
  .to(
    ".nav",
    {
      height: "100%",
      ease: Power2.easeOut,
      duration: 1,
    },
    "-=0.5" // Timing offset
  )

  .fromTo(
    ".nav--open",
    {
      opacity: 0,
      x: 50,
    },
    {
      opacity: 1,
      x: 0,
      ease: Power2.easeOut,
      duration: 1,

      // Called after current transition complete
      onComplete() {
        navOpen.style.pointerEvents = "initial";
      },
    },
    "-=0.25"
  );

navButton.addEventListener("click", function () {
  // If currently playing the timeline, don't play again
  if (tl.isActive()) return;

  // Play animation
  toggleTimeline(tl);
});

// Play animation in order / reversed order
function toggleTimeline(tl) {
  tl.reversed() ? tl.play() : tl.reverse();
}
