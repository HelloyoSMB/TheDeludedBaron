window.onload = function() {
    // Play audio file as soon as the page loads
    var audio = new Audio('path_to_your_audio_file.mp3');
    audio.play();

    // Get the arrow element
    var arrow = document.getElementById('scrollArrow');

    // Get the position of the first chapter
    var chap1Position = document.getElementById('Chap1').offsetTop;

    // Function to handle scrolling
    function handleScroll() {
        // Get the current scroll position
        var scrollPosition = window.scrollY || window.pageYOffset;

        // Calculate the opacity for the gradient based on scroll position
        var opacity = scrollPosition / chap1Position;

        // Apply gradient transition to the body background
        document.body.style.background = 'linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, ' + opacity + ') 100%)';

        // Hide or show the arrow based on scroll position
        arrow.style.opacity = 1 - opacity;

        // Autoscroll to the first chapter when reaching its position
        if (scrollPosition >= chap1Position) {
            clearInterval(scrollInterval);
            return;
        }
    }

    // Scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial call to handleScroll
    handleScroll();

    // Autoscroll to the first chapter after a delay
    var scrollInterval = setInterval(function() {
        window.scrollBy(0, 10); // Adjust the scrolling speed as needed
        handleScroll();
    }, 50); // Adjust the interval as needed
};
