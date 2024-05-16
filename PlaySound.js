const links = document.querySelectorAll('a');
const audio = new Audio('/Sounds/WebsiteStart.mp3');
const audio2 = new Audio('/Sounds/click.mp3');
audio2.volume = 0.2;


function handleLinkClick(event) {
    // Get the closest ancestor <a> element
    const link = event.target.closest('a');

    if (link) {
        // Play the click sound
        audio.play();
        event.preventDefault();

        // Log a message indicating that a link was clicked
        console.log('Link clicked:', link.href);
        
        // Add a delay before navigating to the link
        setTimeout(() => {
            // Navigate to the link after a delay
            window.location.href = link.href;
        }, 500); // Adjust as needed
    }
}


// Add click event listener to each link
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', handleLinkClick);
});

// Function to handle non-link click event
function handleNonLinkClick(event) {
    // Play the click sound
    audio2.play();
}

document.body.addEventListener('click', function(event) {
    if (event.target.tagName === 'A') {
        handleLinkClick(event);
    }
});


// Add click event listener to document body to handle non-link click
document.body.addEventListener('click', handleNonLinkClick);

var audiomanic = document.getElementById("Ambient-Andy");
audiomanic.volume = 0.03;