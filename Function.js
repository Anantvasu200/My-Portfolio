feather.replace()
document.addEventListener('DOMContentLoaded', function() {
    // Wait for the DOM to be fully loaded before executing JavaScript
    const speedInsightsBtn = document.getElementById('speedInsightsBtn');

    // Add a click event listener to the button
    speedInsightsBtn.addEventListener('click', function() {
        // Call the injectSpeedInsights function
        injectSpeedInsights();
    });
});
