window.onload = function() {
    var audioFiles = {
        '#title': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Fallacia-Prterita.mp3',
        '#Chap2T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Contra Passeres.mp3',
        '#Chap3T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Veritas.mp3',
        '#Chap4T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Exeunt.mp3',
        '#Chap5T': './Users/santiagobelanger/Downloads/TheDeludedBaronMP3s/Epilogue.mp3'
    };

    var currentAudio = null;

    function playAudio(sectionId) {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
        }

        var audioSrc = audioFiles[sectionId];
        if (audioSrc) {
            currentAudio = new Audio(audioSrc);
            currentAudio.play();
        }
    }

    function handleScroll() {
        var scrollPosition = window.scrollY || window.pageYOffset;

        for (var sectionId in audioFiles) {
            var sectionElement = document.querySelector(sectionId);
            if (sectionElement) {
                var sectionTop = sectionElement.offsetTop;
                var sectionBottom = sectionTop + sectionElement.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    playAudio(sectionId);

                    // Adjust background color with transition
                    document.body.style.transition = 'background-color 0.5s';
                    var backgroundColor = window.getComputedStyle(sectionElement).backgroundColor;
                    document.body.style.backgroundColor = backgroundColor;

                    break;
                }
            }
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call initially to handle any starting audio play

    // Pause audio when scrolling stops
    var isScrolling;
    window.addEventListener('scroll', function() {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(function() {
            if (currentAudio) {
                currentAudio.pause();
            }
        }, 66);
    }, false);

    // Rewind audio when scrolling quickly up
    window.addEventListener('wheel', function(e) {
        if (e.deltaY < 0 && currentAudio) {
            currentAudio.currentTime -= 10; // Rewind 10 seconds
        }
    });
};
