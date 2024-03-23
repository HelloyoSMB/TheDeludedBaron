<script>
    window.onload = function() {
    // Play audio file as soon as the page loads
    var audio = new Audio('./Users/santiagobelanger/Downloads/nbfap-9znqj.mp3');
    audio.play();

    // Get the arrow element
    var arrow = document.getElementById('scrollArrow');

    // Get the position of the first chapter
    var chap1Position = document.getElementById('Chap1').offsetTop;

    // Flag to indicate if scrolling should be activated
    var scrollingEnabled = false;

    // Function to handle scrolling
    function handleScroll() {
    // Get the current scroll position
    var scrollPosition = window.scrollY || window.pageYOffset;

    // Calculate the opacity for the gradient based on scroll position
    var opacity = scrollPosition / chap1Position;

    // Apply gradient transition to the body background
    document.body.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, ' + opacity + ') 100%)';

    // Hide or show the arrow based on scroll position
    arrow.style.opacity = 0.5 - opacity;


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
    handleScroll(0);
    };
</script>
