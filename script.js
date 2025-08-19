document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuItems = document.querySelector('.menu-items');
    const video = document.querySelector('video');
    const volumeToggle = document.getElementById('volumeToggle');

    // Only run video/volume code if both exist
    if (video && volumeToggle) {
        console.log('Video and volume toggle found, initializing...');
        
        // Start with muted to ensure autoplay works
        video.volume = 0.5;
        video.muted = true;
        volumeToggle.textContent = '🔇';
        volumeToggle.classList.add('muted');
        
        console.log('Video initialized - muted:', video.muted, 'volume:', video.volume);

        volumeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Volume toggle clicked, current muted state:', video.muted);
            
            if (video.muted) {
                video.muted = false;
                video.volume = 0.5;
                volumeToggle.textContent = '🔊';
                volumeToggle.classList.remove('muted');
                console.log('Unmuted video');
            } else {
                video.muted = true;
                volumeToggle.textContent = '🔇';
                volumeToggle.classList.add('muted');
                console.log('Muted video');
            }
        });

        // Handle autoplay restrictions
        const playVideo = async () => {
            try {
                await video.play();
                console.log('Video started playing successfully (muted)');
            } catch (error) {
                console.error('Error playing video:', error);
            }
        };

        // Try to play the video (muted first)
        playVideo();
        
        // Try to unmute on first user interaction
        const unmuteOnInteraction = () => {
            if (video.muted) {
                video.muted = false;
                video.volume = 0.5;
                volumeToggle.textContent = '🔊';
                volumeToggle.classList.remove('muted');
                console.log('Unmuted video on user interaction');
            }
            // Remove the event listeners after first interaction
            document.removeEventListener('click', unmuteOnInteraction);
            document.removeEventListener('keydown', unmuteOnInteraction);
        };
        
        // Listen for user interaction to unmute
        document.addEventListener('click', unmuteOnInteraction);
        document.addEventListener('keydown', unmuteOnInteraction);
    }

    // Hamburger menu functionality
    hamburgerIcon.addEventListener('click', () => {
        console.log('Hamburger icon clicked');
        menuItems.classList.toggle('active');
        hamburgerIcon.classList.toggle('active');
        
        // Start typewriter effect when menu opens
        if (menuItems.classList.contains('active')) {
            setTimeout(() => {
                startTypewriterEffect();
            }, 100);
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburgerIcon.contains(e.target) && !menuItems.contains(e.target)) {
            menuItems.classList.remove('active');
            hamburgerIcon.classList.remove('active');
        }
    });

    // Typewriter effect function
    function startTypewriterEffect() {
        console.log('Starting typewriter effect...');
        const zero1Link = document.querySelector('a[href="zero1.html"]');
        const darksideLink = document.querySelector('a[href="darkside.html"]');
        const kindredLink = document.querySelector('a[href="kindred.html"]');

        console.log('Found elements:', { zero1Link, darksideLink, kindredLink });

        if (zero1Link) {
            console.log('Starting ZERO1 typewriter...');
            typeWriter(zero1Link, 'ZERO1', 100);
        }
        
        setTimeout(() => {
            if (darksideLink) {
                console.log('Starting DARKSIDE typewriter...');
                typeWriter(darksideLink, 'DARKSIDE', 100);
            }
        }, 1000);
        
        setTimeout(() => {
            if (kindredLink) {
                console.log('Starting KINDRED typewriter...');
                typeWriter(kindredLink, 'KINDRED', 100);
            }
        }, 2000);
    }

    function typeWriter(element, text, speed) {
        let i = 0;
        element.innerHTML = '';
        
        function typing() {
            if (i < text.length) {
                element.innerHTML = text.substring(0, i + 1) + '<span class="typewriter-cursor">|</span>';
                i++;
                setTimeout(typing, speed);
            } else {
                element.innerHTML = text + '<span class="typewriter-cursor">|</span>';
            }
        }
        typing();
    }
});
