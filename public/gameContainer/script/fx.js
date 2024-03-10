const filterToggle = document.getElementById('filter-toggle');
filterToggle.addEventListener('click', function() {
    var svgFilter = document.getElementById('svg-filter');
    var displayStyle = window.getComputedStyle(svgFilter).display;
    if (displayStyle === 'none') {
        filterToggle.src = "./static/perf.png";
        svgFilter.style.display = 'block';
    } else {
        filterToggle.src = "./static/perfRed.png";
        svgFilter.style.display = 'none';
    }
});