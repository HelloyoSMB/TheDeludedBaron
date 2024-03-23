<script>
    window.onload = function() {
        // Get the elements for each section
        var titleSection = document.getElementById('title');
        var chap2Section = document.getElementById('Chap2T');
        var chap3Section = document.getElementById('Chap3T');
        var chap4Section = document.getElementById('Chap4T');
        var chap5Section = document.getElementById('Chap5T');

        // Define the corresponding audio files for each section
        var audioFiles = {
            'title': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Fallacia-Prterita.mp3',
            'Chap2T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Contra Passeres.mp3',
            'Chap3T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Veritas.mp3',
            'Chap4T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Exeunt.mp3',
            'Chap5T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Epilogue.mp3'
        };

        // Variable to hold the current audio object
        var currentAudio = null;

        // Function to handle playing audio for each section
        function handleAudio() {
            // Get the current scroll position
            var scrollPosition = window.scrollY || window.pageYOffset;

            // Function to check if the given section is in view
            function isInView(section) {
                var rect = section.getBoundingClientRect();
                return (
                    rect.top >= 0 &&
                    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
                );
            }

            // Check which section is in view and play the corresponding audio
            if (isInView(titleSection)) {
                playAudio(audioFiles['title']);
            } else if (isInView(chap2Section)) {
                playAudio(audioFiles['Chap2T']);
            } else if (isInView(chap3Section)) {
                playAudio(audioFiles['Chap3T']);
            } else if (isInView(chap4Section)) {
                playAudio(audioFiles['Chap4T']);
            } else if (isInView(chap5Section)) {
                playAudio(audioFiles['Chap5T']);
            } else {
                // No section in view, pause the current audio
                pauseAudio();
            }
        }

        // Function to play audio
        function playAudio(audioFile) {
            if (currentAudio) {
                currentAudio.pause();
            }
            currentAudio = new Audio(audioFile);
            currentAudio.play();
        }

        // Function to pause audio
        function pauseAudio() {
            if (currentAudio) {
                currentAudio.pause();
            }
        }

        // Scroll event listener
        window.addEventListener('scroll', function() {
            handleAudio();
        });

        // Initial call to handleAudio
        handleAudio();

        // Pause audio when scrolling stops
        var isScrolling;
        window.addEventListener('scroll', function(event) {
            window.clearTimeout(isScrolling);
            isScrolling = setTimeout(function() {
                pauseAudio();
            }, 66); // Adjust this value as needed
        }, false);

        // Rewind audio when scrolling up
        var previousScrollPosition = window.scrollY || window.pageYOffset;
        window.addEventListener('scroll', function() {
            var currentScrollPosition = window.scrollY || window.pageYOffset;
            if (currentScrollPosition < previousScrollPosition) {
                // Scroll up detected, rewind audio by 10 seconds
                if (currentAudio) {
                    currentAudio.currentTime -= 10;
                }
            }
            previousScrollPosition = currentScrollPosition;
        });
    };
</script>
