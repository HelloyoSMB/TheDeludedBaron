window.addEventListener('scroll', function() {
    let scrollTop = window.scrollY;
    let sections = document.querySelectorAll('section');

    sections.forEach((section, index) => {
        let offset = section.offsetTop;
        let height = section.offsetHeight;

        let startColor = section.getAttribute('data-start-color');
        let endColor = section.getAttribute('data-end-color');

        if (scrollTop >= offset && scrollTop < offset + height) {
            let percentage = (scrollTop - offset) / height;
            let newColor = interpolateColor(startColor, endColor, percentage);
            section.style.backgroundColor = newColor;
        }
    });

    // Auto-scroll functionality
    let windowHeight = window.innerHeight;
    let lastSectionOffset = sections[sections.length - 1].offsetTop;
    if (scrollTop + windowHeight >= lastSectionOffset) {
        scrollToNextSection();
    }
});

function interpolateColor(startColor, endColor, percentage) {
    let start = hexToRgb(startColor);
    let end = hexToRgb(endColor);

    let r = Math.floor(start.r + (end.r - start.r) * percentage);
    let g = Math.floor(start.g + (end.g - start.g) * percentage);
    let b = Math.floor(start.b + (end.b - start.b) * percentage);

    return rgbToHex(r, g, b);
}

function hexToRgb(hex) {
    let r = parseInt(hex.substring(0, 2), 16);
    let g = parseInt(hex.substring(2, 4), 16);
    let b = parseInt(hex.substring(4, 6), 16);
    return { r, g, b };
}

function rgbToHex(r, g, b) {
    return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
    let hex = c.toString(16);
    return hex.length == 1 ? '0' + hex : hex;
}

function scrollToNextSection() {
    let sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let windowHeight = window.innerHeight;
    sections.forEach((section, index) => {
        if (window.scrollY + windowHeight >= section.offsetTop) {
            currentSectionIndex = index;
        }
    });
    if (currentSectionIndex < sections.length - 1) {
        currentSectionIndex++;
        let nextSectionOffset = sections[currentSectionIndex].offsetTop;
        window.scrollTo({
            top: nextSectionOffset,
            behavior: 'smooth'
        });
    }
}
