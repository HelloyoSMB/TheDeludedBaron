window.onload = function() {
    // Define audio files for each section
    var audioFiles = {
        '#title': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Fallacia-Prterita.mp3',
        '#Chap1T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Fallacia-Prterita.mp3',
        '#Chap2T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Contra Passeres.mp3',
        '#Chap3T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Veritas.mp3',
        '#Chap4T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Exeunt.mp3',
        '#Chap5T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Epilogue.mp3'
    };

    var audio = new Audio(); // Create a new audio element
    var isPaused = false; // Flag to track if audio is paused
    var previousScroll = window.scrollY || window.pageYOffset; // Previous scroll position

    // Function to play audio based on section
    function playAudio(section) {
        var audioFile = audioFiles[section];
        if (audioFile) {
            audio.src = audioFile;
            audio.play();
        }
    }

    // Function to handle scrolling and background color transitions
    function handleScroll() {
        // Get the current scroll position
        var currentScroll = window.scrollY || window.pageYOffset;

        // Pause audio if scrolling stops
        if (currentScroll === previousScroll) {
            audio.pause();
        } else {
            // Determine scroll direction
            var scrollDirection = currentScroll > previousScroll ? 'down' : 'up';

            // Adjust audio playback based on scroll direction
            if (scrollDirection === 'up') {
                // Rewind 10 seconds if scrolling up
                audio.currentTime = Math.max(0, audio.currentTime - 10);
            }

            // Find the current section
            var sections = document.querySelectorAll('section');
            var currentSectionIndex = 0;
            for (var i = sections.length - 1; i >= 0; i--) {
                if (currentScroll >= sections[i].offsetTop) {
                    currentSectionIndex = i;
                    break;
                }
            }

            // Play audio for the current section
            playAudio(sections[currentSectionIndex].id);
        }

        // Update previous scroll position
        previousScroll = currentScroll;

        // Update background color based on current section
        updateBackgroundColor();
    }

    // Function to update background color based on current section
    function updateBackgroundColor() {
        var sections = document.querySelectorAll('section');
        var currentSectionIndex = 0;
        var backgroundColor;

        // Find the current section
        for (var i = sections.length - 1; i >= 0; i--) {
            if (window.scrollY >= sections[i].offsetTop) {
                currentSectionIndex = i;
                break;
            }
        }

        // Determine background color based on current section
        switch (sections[currentSectionIndex].id) {
            case 'Chap1T':
            case 'Chap1':
                backgroundColor = '#000000'; // Black
                break;
            case 'Chap2T':
            case 'Chap2':
                backgroundColor = '#000030'; // Dark Navy Blue
                break;
            case 'Chap3T':
            case 'Chap3':
                backgroundColor = '#8f0a24'; // Crimson
                break;
            case 'Chap4T':
            case 'Chap4':
                backgroundColor = '#6f9b6f'; // Pale Sage Green
                break;
            default:
                backgroundColor = '#FFFFFF'; // White (default)
        }

        // Apply background color transition to the body
        document.body.style.transition = 'background-color 1s';
        document.body.style.backgroundColor = backgroundColor;
    }

    // Scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial call to handleScroll
    handleScroll();
};
