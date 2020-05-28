// Add Global Variables
var trigger = document.getElementById("inner-face1")
var triggerMorph = document.getElementById("trigger-morph")

function init(){
   TweenMax.set(".container, #eyes, #clip1, #trigger, #inner-face1, #outer-face1, #pattern1", {xPercent: -50, yPercent: -50})
   TweenMax.set(".container, #eyes, #clip1", {xPercent: -50, yPercent: -50})
   TweenMax.set("#ears1", {xPercent: -50, opacity: 0, y: 30, transformOrigin: "center center"})
   TweenMax.set("#eyes1", {y: 20, opacity: 0})
   TweenMax.set("#clip1", { y: 30 })
   TweenMax.set("#mouth1", {y: 100, opacity: 0})
   TweenMax.set("#inner-face1", {scale: .75})
   TweenMax.set("#outer-face1", {transformOrigin: "center center", opacity: 0})
   TweenMax.set("#pattern1", {transformOrigin: "center center", opacity: 0})

   TweenMax.set("#morph-to", {visibility: "hidden"})
   addEventListeners()
}

// Adds event listeners to the trigger such as the hover and click listeners
function addEventListeners(){
   console.log("listeners added")
   trigger.addEventListener("mouseenter", onMouseEnter)
   trigger.addEventListener("mouseleave", onMouseLeave)
   trigger.addEventListener("click", handleClick)
}

// Removes event listeners
function removeEventListeners(){
   trigger.removeEventListener("mouseenter", onMouseEnter, false)
   trigger.removeEventListener("mouseleave", onMouseLeave, false)
   trigger.removeEventListener("click", handleClick, false)
}

// Hover animation when hovering over trigger button
function onMouseEnter(){
   TweenMax.to(trigger, .5, { scale: .65, ease: Back.easeInOut.config(3) })
   console.log("hovered")
}

// Animation when user leaves the hover
function onMouseLeave(){
   TweenMax.to(trigger, .5, { scale: .75, ease: Power2.easeInOut })
   console.log("leave")
}

// Triggers the morph animation and removes pre existing event listeners
function handleClick(){
   TweenMax.to(triggerMorph, .5, {morphSVG: "#morph-to", ease: Back.easeInOut})
   TweenMax.to(trigger, .25, {scale: 1, y: 10})
  
   removeEventListeners()
   setBear()
}

// Sets the positioning of the facial features of the bear
function setBear(){
   var tl = new TimelineMax({ onComplete: animateBear})
   tl
      .set("#eyes", {visibility: "visible", opacity: 0})
      .set("#outer-face1, #pattern1", { opacity: 0})
      .set("#clip1, #eyes", { zIndex: 20})
}

// Bear animation sequence starts here
function animateBear(){
   var tl = new TimelineMax({delay: .1})
   tl
      .to("#mouth1", .75, { y: 0, opacity: 1, ease: Back.easeInOut.config(2) }, "sync1-=.3")
      .to("#eyes", .75, { opacity: 1, ease: Back.easeInOut }, "sync1-=.3")
      .fromTo("#eyes1", .75, {y: 20, opacity: 0}, {y: 0, opacity: 1, ease:Back.easeInOut.config(2)}, "-=.75")
   
   var tl2 = new TimelineMax({delay: .1})
   tl2
      .fromTo("#outer-face1", .5, {opacity: 0, scale: .7}, {opacity: 1, scale: 1, ease: Back.easeInOut})
      .to("#pattern1", .5, {opacity: 1})
      .fromTo("#ears1", .5, { opacity: 0, scale: .8, y: 40, width: 300 }, { opacity: 1, scale: 1, width: 350, y: 30, ease: Back.easeInOut.config(1)}, "sync2")
      .to("#eyes1", .4, { y: -5, ease: Power2.easeInOut }, "sync2")
      .to("#mouth1", .4, { y: -15, ease: Power2.easeInOut }, "sync2")
      .to("#eyes1", .3, {y: 0, ease: Back.easeOut.config(5)}, "sync3-=.1")
      .to("#mouth1", .3, { y: 0, ease: Back.easeOut.config(5) }, "sync3-=.1")
      .to("#ears1", .15, {y:40, yoyo: true, repeat: 1, ease: Power3.easeInOut}, "-=.3")
   
   TweenMax.to("#pattern1", 3, {rotation: 180, ease: Power3.easeInOut})
}


init()