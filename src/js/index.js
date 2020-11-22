import { gsap } from "gsap";
import CSSRulePlugin from "gsap/CSSRulePlugin";

import "core-js";
import "regenerator-runtime";

import "../sass/main.scss";
import fullSizeSrc from "../img/long-cover.jpg";

// Inject Date
const int = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

setInterval(() => {
  int.format(new Date());
  coverDate.textContent = int.format(new Date());
}, 1000);

// DOM Elements
const coverDate = document.querySelector(".date");
const navButton = document.querySelector(".nav__links__item");
const navOpen = document.querySelector(".nav--open");
const coverImg = document.querySelector(".cover__image");

// Swap small image to large image
coverImg.setAttribute("src", fullSizeSrc);
coverImg.addEventListener("load", function (evt) {
  evt.target.classList.remove("cover__image--blur");
});

// Selecting pseudo elements needs registing a CSSRulePlugin
gsap.registerPlugin(CSSRulePlugin);
const rule = CSSRulePlugin.getRule(".nav--closed h3::after");

// Text reveal aniamtion
gsap.to(rule, {
  // Put css properties inside `cssRule key`
  cssRule: { scaleY: 0 },
  duration: 1,
  delay: 0.75,
});

// Stagger animation nav links
gsap.from(".nav--closed li", {
  x: 75,
  opacity: 0,
  stagger: 0.1,
  duration: 0.5,
  ease: "Power2.easeOut",
  delay: 0.5,
});

// Pause when first load
// Start at reversed so we can use `toggleTimeline`
const tl = gsap.timeline({ paused: true, reversed: true });

tl.to(".cover", {
  width: "60%",
  duration: 1,
  filter: "blur(1.5px)",
  ease: "Power2.easeOut",
})
  .to(
    ".date",
    {
      y: 50,
      opacity: 0,
      ease: "Power2.easeOut",
      duration: 0.5,
    },
    "-=1"
  )
  .to(
    ".nav",
    {
      height: "100%",
      ease: "Power2.easeOut",
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
      ease: "Power2.easeOut",
      duration: 1,

      // Called after current transition complete
      onComplete() {
        navOpen.style.pointerEvents = "initial";
      },
    },
    "-=0.25"
  )
  .from(
    ".nav__clothing li",
    {
      opacity: 0,
      y: 75,
      duration: 0.5,
      ease: "Power2.easeOut",
      stagger: 0.1, // Create stagger effect on list of elements
    },
    "-=0.75"
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
