window.onload = function() {
    var audioFiles = {
        '#title': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Fallacia-Prterita.mp3',
        '#Chap1T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Chap1.mp3',
        '#Chap2T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Chap2.mp3',
        '#Chap3T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Chap3.mp3',
        '#Chap4T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Chap4.mp3',
        '#Chap5T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Chap5.mp3'
    };

    var audio = new Audio(); // Create a new audio element

    // Function to play audio based on section
    function playAudio(section) {
        var audioFile = audioFiles[section];
        if (audioFile) {
            audio.src = audioFile;
            audio.play();
        }
    }

    // Get the arrow element
    var arrow = document.getElementById('scrollArrow');

    // Get the positions of each section
    var sections = document.querySelectorAll('section');
    var sectionPositions = [];
    sections.forEach(function(section) {
        sectionPositions.push(section.offsetTop);
    });

    // Initialize current section index
    var currentSectionIndex = 0;

    // Transition offset for background color change
    var transitionOffset = 1000; // Adjust as needed

    // Function to handle scrolling and background color transitions
    function handleScroll() {
        // Get the current scroll position
        var scrollPosition = window.scrollY || window.pageYOffset;

        // Find the current section
        for (var i = sectionPositions.length - 1; i >= 0; i--) {
            if (scrollPosition + transitionOffset >= sectionPositions[i]) {
                if (currentSectionIndex !== i) {
                    currentSectionIndex = i;
                    // Play audio for the current section
                    playAudio(sections[i].id);
                }
                break;
            }
        }

        // Hide or show the arrow based on scroll position
        arrow.style.opacity = scrollPosition / sectionPositions[currentSectionIndex];

        // Set background color based on current section
        var backgroundColor;
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

    // Hide the arrow initially
    arrow.style.display = 'none';

    // Display the arrow after a delay
    setTimeout(function() {
        arrow.style.display = 'block';
    }, 1); // Adjust the delay time as needed

    // Pause button click event listener
    pauseButton.addEventListener('click', function() {
        isPaused = !isPaused;
        if (isPaused) {
            // Pause auto scroll and audio
            pauseButton.textContent = 'Play';
            audio.pause();
        } else {
            // Resume auto scroll and audio
            pauseButton.textContent = 'Pause';
            audio.play();
            // Resume scrolling from the current position
            handleScroll(window.scrollY || window.pageYOffset);
        }
    });

    // Initial call to handleScroll
    handleScroll();
};
