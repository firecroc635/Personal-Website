window.onload = function () {
    const markdownFilesContainer = document.getElementById('Commen');
    const filename = document.getElementById('filename').value;

    // Function to fetch and display comments from a text file
    function fetchComments(filename) {
        
        // Fetch text file containing comments
        fetch(filename)
            .then(response => {
                // Check if the response is empty
                if (response.ok && response.headers.get("Content-Length") === "0") {
                    throw new Error('The file is empty.');
                }
                return response.text();
            })
            .then(data => {
                const commentsWithNames = data.split('\n'); // Split data by newline character
                
                // Process each comment
                commentsWithNames.forEach((commentWithName, index) => {
                    // Split name and comment
                    const [name, comment] = commentWithName.split('|').map(part => part.trim());
                    
                    // Trim whitespace and format each comment
                    const commentNumber = index + 1;
                    const commentHTML = `<div class="comment"><div class="comment-number">┌#${commentNumber}</div> <div class="comment-name">├→ ${name}</div> │<div class="comment-content">└→  ${comment}</div></div>`;
                    
                    // Append comment to the container
                    markdownFilesContainer.insertAdjacentHTML('beforeend', commentHTML);
                });

                // Display comments in the container
            })
            .catch(error => {
                // Handle error, including empty file case
                errorMessage = '<p>There be no comments.</p>';
                // Append error message to the container
                markdownFilesContainer.insertAdjacentHTML('beforeend', errorMessage);
            });
            
        
    }

    // Call the function to fetch and display comments
    fetchComments(filename);
};
