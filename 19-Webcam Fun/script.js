const video = document.querySelector('.player')
const canvas = document.querySelector('.photo')
const ctx = canvas.getContext('2d')
const strip = document.querySelector('.strip')
const snap = document.querySelector('.snap')

function getVideo() {
    navigator.mediaDevices.getUserMedia({video: true, audio: false})
        .then(localMediaStream => {
            console.log(localMediaStream)
            video.srcObject = localMediaStream
            video.play()
        })
        .catch(err => {
            console.error("There's a problem", err)
        })
}

function paintToCanvas() {
    const width = video.videoWidth
    const height = video.videoHeight
    console.log(width, height)
    canvas.width = width
    canvas.height = height

    return setInterval(() => {
        ctx.drawImage(video, 0, 0, width, height)
        // take out pixels
        let pixels = ctx.getImageData(0, 0, height, width)
        // jack them up
        // pixels = redEffect(pixels)
        // pixels = rgbSplit(pixels)
        // ctx.globalAlpha = 0.1
        pixels = greenScreen(pixels)
        // put them back
        ctx.putImageData(pixels, 0, 0)
    }, 50)
}

function takePhoto() {
    snap.currentTime = 0
    snap.play()
    const data = canvas.toDataURL('image/jpeg') //creates base64 encoded JPEG
    console.log(data)
    const link = document.createElement('a')
    link.href = data
    link.setAttribute('download', 'handsome')
    link.innerHTML = `<img src="${data}" alt="Handsome dude" />`
    strip.insertBefore(link, strip.firstChild)
}

function redEffect (pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i] = pixels.data[i + 0] + 150 // red
        pixels.data[i + 1] = pixels.data[i + 1] - 75 // green
        pixels.data[i + 2] = pixels.data[i + 2] * .56 // blue
    }
    return pixels
}

function rgbSplit(pixels) {
    for(let i = 0; i < pixels.data.length; i += 4) {
        pixels.data[i - 150] = pixels.data[i + 0] // red
        pixels.data[i + 300] = pixels.data[i + 1] // green
        pixels.data[i - 350] = pixels.data[i + 2] // blue
    }
    return pixels
}

function greenScreen(pixels) {
    levels = {}

    // Get values from sliders
    document.querySelectorAll('.rgb input').forEach((input) => {
        levels[input.name] = input.value
    })

    for (i = 0; i <pixels.data.length; i = i + 4) {
        red = pixels.data[i + 0]
        green = pixels.data[i + 1]
        blue = pixels.data[i + 2]
        alpha = pixels.data[i + 3]

        if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        &&red <= levels.rmax
        &&green <= levels.gmax
        &&blue <= levels.bmax) {
            pixels.data[i + 3] = 0
        }
    }

    return pixels
}

getVideo()
video.addEventListener('canplay', paintToCanvas)
