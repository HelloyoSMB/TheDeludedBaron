window.onload = function() {
    // Define audio files for each section
    var audioFiles = {
        '#titleAudio': 'Fallacia-Prterita.mp3',
        '#Chap2TAudio': 'Contra Passeres 2.mp3',
        '#Chap2Audio': 'Contra Passeres 2.mp3',
        '#Chap3TAudio': 'Veritas.mp3',
        '#Chap3Audio': 'Veritas.mp3',
        '#Chap4TAudio': 'Exeunt 2.mp3',
        '#Chap4Audio': 'Exeunt 2.mp3',
        '#Chap5TAudio': 'Epilogue.mp3',
        '#Chap5Audio': 'Epilogue.mp3'
    };

    var audio = new Audio(); // Create a new audio element
    var isPaused = false; // Flag to track if audio is paused
    var previousScroll = window.scrollY || window.pageYOffset; // Previous scroll position
    var currentAudioFile = null; // Variable to track the current audio file

    // Function to play audio for a specific section
    function playAudio(section) {
        var audioFile = audioFiles[section];
        if (audioFile) {
            audio.src = audioFile;
            audio.play()
                .catch(function(error) {
                    console.error('Failed to play audio:', error);
                });
            currentAudioFile = audioFile;
        }
    }

    // Function to handle scrolling and background color transitions
    function handleScroll() {
        // Get the current scroll position
        var currentScroll = window.scrollY || window.pageYOffset;

        // Determine scroll direction
        var scrollDirection = currentScroll > previousScroll ? 'down' : 'up';

        // Find the current section
        var sections = document.querySelectorAll('section');
        var currentSectionIndex = 0;
        for (var i = sections.length - 1; i >= 0; i--) {
            if (currentScroll >= sections[i].offsetTop) {
                currentSectionIndex = i;
                break;
            }
        }

        // Play audio for the current section when scrolling down and audio file is different
        if (scrollDirection === 'down') {
            var nextAudioFile = audioFiles['#' + sections[currentSectionIndex].id + 'Audio'];
            if (nextAudioFile && nextAudioFile !== currentAudioFile) {
                playAudio('#' + sections[currentSectionIndex].id + 'Audio');
            }
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

    // Start playing audio for the first section when the page loads
    // This function will be triggered by a user click on the document body
    document.body.addEventListener('click', function() {
        playAudio('#titleAudio');
        // Remove the click event listener after the first click to avoid multiple plays
        document.body.removeEventListener('click', arguments.callee);
    });
};
