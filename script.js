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
    var scrollCount = 0; // Variable to track the number of scrolls
    var lingeringComplete = false; // Variable to track if the lingering effect is complete
  
    // Function to play audio for a specific section
    function playAudio(section) {
      var audioFile = audioFiles[section];
      if (audioFile) {
        audio.src = audioFile;
        audio.play().catch(function(error) {
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
  
      // Increment scroll count if scrolling down
      if (scrollDirection === 'down') {
        scrollCount++;
      }
  
      // Check if user is within the parallax container
        // Inside the handleScroll function

        // Check if user is within the parallax container
        var parallaxContainer = document.getElementById('parallax-container');
        var parallaxContainerRect = parallaxContainer.getBoundingClientRect();
        var isWithinParallax = parallaxContainerRect.top >= 0 && parallaxContainerRect.bottom <= window.innerHeight;

        // Show image only when within parallax-container and hide after 400rem scroll
        var images = document.querySelectorAll('#i2B, #i2M, #i2F');
        if (images) {
            if (isWithinParallax && scrollCount < 1000) {
                console.log('Within parallax and scroll count below threshold');
                images.forEach(function(image) {
                    console.log('Setting opacity to 1 for', image.id);
                    image.style.opacity = 1;
                });
            }
        else {
            images.forEach(function(image) {
            image.style.opacity = 1;
            });
        }
        }

  
      // Proceed with lingering effect after four full scrolls within parallax-container
      if (scrollCount >= 4 && !lingeringComplete && isWithinParallax) {
        console.log('Lingering effect triggered after four full scrolls within the parallax container.');
  
        // Add your lingering effect code here (e.g., animations, sound effects)
  
        // Update lingering effect flag
        lingeringComplete = true;
      }
  
      // Fade away the effect after four full scrolls outside parallax-container
      if (scrollCount >= 8 && lingeringComplete) {
        console.log('Fading away the lingering effect.');
        lingeringComplete = false;
        scrollCount = 0;
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

    // Set the images to a fixed position when parallax-container is in view
    var images = document.querySelectorAll('#i2B, #i2M, #i2F');
    if (images) {
        images.forEach(function(image) {
            image.style.position = 'fixed';
        });
    }
};
