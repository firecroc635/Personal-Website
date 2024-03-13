const links = document.querySelectorAll('a');
const binks = document.getElementById('Yos');
const audio = new Audio('/Sounds/WebsiteStart.mp3');
const audio2 = new Audio('/Sounds/click.mp3');
audio2.volume = 0.2;



// Function to handle link click event
function handleLinkClick(event) {
    console.log("Link clicked:", event.target.href);
    // Prevent the default link behavior (e.g., navigating to a new page) immediately
    event.preventDefault();
    
    // Play the click sound
    audio.play();
    
    // Log a message indicating that a link was clicked
    console.log('Link clicked:', event.target.href);
    
    // Add a delay before navigating to the link
    setTimeout(() => {
        // Navigate to the link after a delay
        window.location.href = event.target.href;
    }, 500); // 1000 milliseconds = 1 second, adjust as needed
}



// Add click event listener to each link
links.forEach(link => {
    console.log("Link:", link); // Check if this logs each link element
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
audiomanic.volume = 0.5;