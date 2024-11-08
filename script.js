console.log('Script file connected!');

document.addEventListener('DOMContentLoaded', () => {
    initSnow();
    initAudioPlayer();
});

function initSnow() {
    let snowContainer = document.querySelector('.snow-container');
    if (!snowContainer) {
        snowContainer = document.createElement('div');
        snowContainer.className = 'snow-container';
        document.body.prepend(snowContainer);
    }

    // Create snowflakes
    const numberOfSnowflakes = 100;
    for (let i = 0; i < numberOfSnowflakes; i++) {
        createSnowflake(snowContainer);
    }
}

function createSnowflake(container) {
    const snowflake = document.createElement('div');
    snowflake.className = 'snowflake';
    container.appendChild(snowflake);

    const startX = Math.random() * window.innerWidth;
    
    // Increased size range
    gsap.set(snowflake, {
        x: startX,
        y: -20,
        width: gsap.utils.random(6, 15),
        height: gsap.utils.random(6, 15),
        opacity: gsap.utils.random(0.4, 0.8)
    });

    function animateSnowflake() {
        gsap.to(snowflake, {
            y: window.innerHeight + 20,
            x: startX + gsap.utils.random(-150, 150),
            duration: gsap.utils.random(3, 6),
            ease: 'none',
            onComplete: () => {
                gsap.set(snowflake, {
                    y: -20,
                    x: Math.random() * window.innerWidth
                });
                animateSnowflake();
            }
        });
    }

    animateSnowflake();
}

function initAudioPlayer() {
    const audio = document.getElementById('myAudio');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const progress = document.querySelector('.progress');
    const progressBar = document.querySelector('.progress-bar');
    const timeDisplay = document.querySelector('.time');

    playPauseBtn.addEventListener('click', togglePlay);
    audio.addEventListener('timeupdate', updateProgress);
    progressBar.addEventListener('click', seek);
    audio.addEventListener('ended', resetPlayer);

    function resetPlayer() {
        audio.currentTime = 0;
        progress.style.width = '0%';
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        timeDisplay.textContent = '0:00';
    }

    function togglePlay() {
        if (audio.paused) {
            audio.play();
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    }

    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percent + '%';
        
        // Update time display
        const minutes = Math.floor(audio.currentTime / 60);
        const seconds = Math.floor(audio.currentTime % 60);
        timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    function seek(e) {
        const percent = e.offsetX / progressBar.offsetWidth;
        audio.currentTime = percent * audio.duration;
    }
}
