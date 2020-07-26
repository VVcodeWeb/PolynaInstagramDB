var textWrapper = document.querySelector('.title')
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>")
var wrapper = document.querySelector('.wrapper')
var footer = document.querySelector('.footer')
var login_form = document.querySelector('.login_form')
var right_side = document.querySelector('.rightSide')


anime({
    targets: '.right_side',
    translateX: [0, 100],
    opacity: [0,1],
    direction: 'normal',
    easing: "linear",
    duration: 750
})

anime({
    targets: '.wrapper',
    translateX: [-500, 0],
    opacity:[0,1],
    direction: 'normal',
    easing: "linear",
    duration: 750,
})
anime({
    targets: '.title .letter',
    scale:[6,1],
    opacity:[0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 750,
    delay:(el, i) => 70*i
})

    

