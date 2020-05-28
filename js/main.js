// Add Global Variables
var trigger = document.getElementById("trigger")

function init(){
   TweenMax.set(".container, #bear, #clip1, #trigger, #inner-face1, #pattern1, #outer-face1", {xPercent: -50, yPercent: -50})
   TweenMax.set(".container, #bear, #clip1", {xPercent: -50, yPercent: -50})
   TweenMax.set("#ears1", {xPercent: -50, opacity: 0, y: 30, transformOrigin: "center center"})
   TweenMax.set("#eyes1", {y: 20, opacity: 0})
   TweenMax.set("#clip1", { y: 30 })
   TweenMax.set("#mouth1", {y: 100, opacity: 0})
   TweenMax.set("#outer-face1", {transformOrigin: "center center", opacity: 0})
   TweenMax.set("#pattern1", {transformOrigin: "center center", opacity: 0})
   // animate()
   addEventListeners()
}

function addEventListeners(){
   trigger.addEventListener("mouseenter", onMouseEnter)
   trigger.addEventListener("mouseleave", onMouseLeave)
   trigger.addEventListener("click", handleClick)
}

function removeEventListeners(){
   trigger.removeEventListener("mouseenter", onMouseEnter, false)
   trigger.removeEventListener("mouseleave", onMouseLeave, false)
   trigger.removeEventListener("click", handleClick, false)
}

function onMouseEnter(){
   TweenMax.to(trigger, .5, { scale: 1.1, ease: Back.easeInOut.config(3) })
}

function onMouseLeave(){
   TweenMax.to(trigger, .5, { scale: 1, ease: Power2.easeInOut })
}

function handleClick(){
   TweenMax.to(trigger, .5, { borderRadius: "50%", height: "150px", backgroundColor: "white", ease: Back.easeInOut.config(2) })
   TweenMax.to(trigger, .25, { scale: .6, delay: .25})
   TweenMax.to(trigger, .25, { y: 15, delay: .25 })
   removeEventListeners()
   setBear()
}

function setBear(){
   TweenMax.set("#bear, #inner-face1", {visibility: "visible", opacity: 1})
   TweenMax.set("#outer-face1, #inner-face1, #pattern1", {opacity: 0, onComplete: animateBear})
}

function animateBear(){
   var tl = new TimelineMax({delay: .1})
   tl
      .fromTo("#inner-face1", 1, {opacity: 1, scale: .3}, {opacity: 1, scale: 1, y: 10, ease: Back.easeInOut, transformOrigin: "center 100px"}, "sync")
      .to("#mouth1", 1, { y: 0, opacity: 1, ease: Back.easeInOut }, "sync1-=.3")
      .to("#eyes1", 1, { y: 0, opacity: 1, ease: Back.easeInOut }, "sync1-=.3")
      .to(trigger, .5, { autoAlpha: 0}, "sync1-=.3")
      
   
   var tl2 = new TimelineMax({delay: 1})
   tl2
      .fromTo("#outer-face1", .5, {opacity: 0, scale: .7}, {opacity: 1, scale: 1, ease: Back.easeInOut})
      .to("#pattern1", .5, {opacity: 1})
      .fromTo("#ears1", .5, { opacity: 0, scale: .8, y: 40, width: 300 }, { opacity: 1, scale: 1, width: 350, y: 30, ease: Back.easeInOut.config(3)}, "sync2")
      .to("#eyes1", .4, { y: -5, ease: Back.easeInOut }, "sync2")
      .to("#mouth1", .4, { y: -15, ease: Back.easeInOut }, "sync2")
      .to("#eyes1", .5, {y: 0, ease: Back.easeInOut}, "sync3-=.1")
      .to("#mouth1", .5, { y: 0, ease: Back.easeInOut }, "sync3-=.1")
      // .to("#ears1", .2, {y:40, yoyo: true, repeat: 1, ease: Back.easeInOut}, "-=.2")
   
   TweenMax.to("#pattern1", 3, {rotation: 180, ease: Power3.easeInOut})
}



init()