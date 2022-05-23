//Get elements
const player = document.querySelector('.player')
const video = player.querySelector('.viewer')
const progress = player.querySelector('.progress')
const progressBar = player.querySelector('.progress__filled')
const toggle = player.querySelector('.toggle')
const skipButtons = player.querySelectorAll('[data-skip]')
const ranges = player.querySelectorAll('.player__slider')
const fullScreenBtn = player.querySelector('#fullscreen')

//Build functions

//If paused, play. If playing, pause
function togglePlay() {
    if(video.paused) {
        video.play()
    } else {
        video.pause()
    }
}

//Change the play/pause icon depending upon state
function updateButton() {
    const icon = this.paused ? '►' : '❚ ❚';
    toggle.textContent = icon
}

function skip() {
    video.currentTime += parseFloat(this.dataset.skip)
}

function handleRangeUpdate () {
    const slider = this.name
    video[slider] = this.value
}

function handleProgress() {
    const percent = (video.currentTime / video.duration) * 100
    progressBar.style.flexBasis = `${percent}%`
}

//Scrub on click
function scrub(e) {
    const scrubTime = (e.layerX / progress.offsetWidth) * video.duration
    console.log(e, scrubTime)
    video.currentTime = scrubTime
}

//Make full screen
function fullscreenToggle() {
    const fullscreenStyle = '100vw'
    const letterboxStyle =  '750px'
    if (fullscreen === false) {
        console.log("Full screen", fullscreen)
        player.style.setProperty('width', fullscreenStyle)
    } else {
        console.log("Full screen", fullscreen)
        player.style.setProperty('width', letterboxStyle)
    }

    // if (player.maxWidth == '750px') {
    //     console.log("Going fullscreen")
    //     player.style.maxWidth = '100vw'
    // } else {
    //     console.log("Going back to normal size")
    //     player.style.maxWidth= '750px'
    //}
}

//Hook up event listeners

//Play/pause on video
video.addEventListener('click', togglePlay)
video.addEventListener('play', updateButton)
video.addEventListener('pause', updateButton)

//Play/pause on the button
toggle.addEventListener('click', togglePlay)

//Listen for click on skip forward/back
skipButtons.forEach(button => button.addEventListener('click', skip))

//Listen for changes to volume and playback rate
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate))

//Update progress slider
video.addEventListener('timeupdate', handleProgress)

//Scrub bar
progress.addEventListener('click', scrub)
let mousedown = false
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mouseup', () => mousedown = false)
progress.addEventListener('mousemove', (e) =>mousedown && scrub(e))

//Fullscreen
let fullscreen = false
fullScreenBtn.addEventListener('click', fullscreenToggle)
fullScreenBtn.addEventListener('click', () => fullscreen = !fullscreen)