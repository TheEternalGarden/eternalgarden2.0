document.addEventListener('DOMContentLoaded', () => {
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const menuItems = document.querySelector('.menu-items');
    const video = document.querySelector('video');
    const volumeToggle = document.getElementById('volumeToggle');

    // Only run video/volume code if both exist
    if (video && volumeToggle) {
        video.muted = true;
        video.volume = 1;
        volumeToggle.textContent = '🔇';
        volumeToggle.classList.add('muted');

        volumeToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            if (video.muted) {
                video.muted = false;
                video.volume = 1;
                volumeToggle.textContent = '🔊';
                volumeToggle.classList.remove('muted');
            } else {
                video.muted = true;
                volumeToggle.textContent = '🔇';
                volumeToggle.classList.add('muted');
            }
        });

        video.play().catch(error => {
            console.error('Error playing video:', error);
        });
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
