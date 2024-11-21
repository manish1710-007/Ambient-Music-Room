// Store references to all buttons and their states
let audioStates = {};

// Function to initialize audio elements
function initializeAudioElements() {
    const tracks = document.querySelectorAll('audio');
    tracks.forEach(track => {
        audioStates[track.id] = {
            isPlaying: false,
            element: track
        };
        track.volume = 0; // Start muted
    });
}

// Function to play/pause audio
function togglePlay(audioId) {
    const audio = document.getElementById(audioId);
    const button = document.querySelector(`button[onclick="togglePlay('${audioId}')"]`);
    
    if (!audio) {
        console.error('Audio element not found:', audioId);
        return;
    }

    try {
        if (audio.paused) {
            // Play audio
            audio.play()
                .then(() => {
                    button.textContent = 'Pause';
                    audioStates[audioId].isPlaying = true;
                })
                .catch(error => {
                    console.error('Error playing audio:', error);
                });
        } else {
            // Pause audio
            audio.pause();
            button.textContent = 'Play';
            audioStates[audioId].isPlaying = false;
        }
    } catch (error) {
        console.error('Error toggling audio:', error);
    }
}

// Function to adjust volume
function adjustVolume(audioId, volume) {
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.volume = parseFloat(volume);
    }
}

// Function to stop all audio
function stopAllAudio() {
    Object.keys(audioStates).forEach(audioId => {
        const audio = audioStates[audioId].element;
        const button = document.querySelector(`button[onclick="togglePlay('${audioId}')"]`);
        
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
        
        if (button) {
            button.textContent = 'Play';
        }
        
        audioStates[audioId].isPlaying = false;
    });
}

// Initialize when the document is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeAudioElements();
    
    // Add error handling for audio loading
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        audio.addEventListener('error', (e) => {
            console.error(`Error loading audio file ${audio.id}:`, e);
        });
    });
});

// Optional: Add keyboard controls
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scroll
        stopAllAudio();
    }
});