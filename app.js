const video = document.getElementById('videoPlayer')
const seekBar = document.getElementById('seekBar')
const currentTimeDisplay = document.getElementById('currentTimeDisplay')
const durationTimeDisplay = document.getElementById('durationTimeDisplay')
const playPauseBtn = document.getElementById('playPauseBtn')
const muteBtn = document.getElementById('muteBtn')
const fullscreenBtn = document.getElementById('fullscreenBtn')
const pipBtn = document.getElementById('pipBtn')
const speedControl = document.getElementById('speedControl')


const formatTime = (time) => {
    const minutes = Math.floor(time/ 60)
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
}
const updateTimeDisplay = ()=> {
    const currentTime = formatTime(video.currentTime)
    const duration = formatTime(video.duration || 0)
    currentTimeDisplay.textContent = `${currentTime}`
    durationTimeDisplay.textContent = `${duration}`
}
video.addEventListener('timeupdate', ()=> {
    seekBar.value = (video.currentTime / video.duration) * 100 || 0
    updateTimeDisplay()
})
video.addEventListener('loadedmetadata', updateTimeDisplay)

seekBar.addEventListener('input', ()=> {
    video.currentTime = (seekBar.value / 100) * video.duration
})


playPauseBtn.addEventListener('click', ()=> {
    if(video.paused || video.ended) {
        video.play()
        playPauseBtn.textContent = 'Pause'
    } else {
        video.pause()
        playPauseBtn.textContent = 'Play'
    }
})

muteBtn.addEventListener('click', ()=> {
    video.muted = !video.muted
    muteBtn.textContent = video.muted ? "Unmute" : "Mute"
})

fullscreenBtn.addEventListener('click', ()=> 
    video.requestFullscreen()
)

pipBtn.addEventListener('click', async()=> {
    try {
        if(video!== document.pictureInPictureElement) {
            await video.requestPictureInPicture()
        } else {
            await document.exitPictureInPicture()
        }
    } catch(error) {
        console.error('Picture in Picture failed:', error)
    }
})

speedControl.addEventListener('change', ()=> {
    video.playbackRate = parseFloat(speedControl.value)
})