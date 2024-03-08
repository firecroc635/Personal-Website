window.onload = function () {
    const postsDir = 'Blog posts';
    const markdownFilesContainer = document.getElementById('markdownFilesContainer');

    // Function to fetch and display markdown files
    function fetchMarkdownFiles() {
        // Fetch Markdown files list
        fetch(postsDir)
            .then(response => response.text())
            .then(data => {
                const parser = new DOMParser();
                const html = parser.parseFromString(data, 'text/html');

                // Extract Markdown file links
                const links = Array.from(html.querySelectorAll('a'))
                    .filter(a => a.href.endsWith('.md'))
                    .map(a => {
                        const fileName = a.href.split('/').pop();
                        const htmlFileName = fileName.replace('.md', '.html');
                        const htmlFileName2 = fileName.replace('.md', '');
                        const htmlFilePath = `${postsDir}/Converted html file/${htmlFileName}`;
                        return fetch(`${postsDir}/${fileName}`)
                            .then(response => response.text())
                            .then(content => {
                                const firstLine = content.split('\n')[0]; // Extracting the first line
                                const cleanFirstLine = firstLine.replace(/#/g, ''); // Remove hashtags
                                return fetch(`${postsDir}/${fileName}`)
                                    .then(response => response.headers.get('last-modified'))
                                    .then(lastModified => {
                                        // Format last modified date
                                        const lastModifiedDate = new Date(lastModified);
                                        const formattedDate = lastModifiedDate.toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        });

                                        return `<div class="markdownFilesContainer"><a class="TerminalLinkBlog" href="${htmlFilePath}" id="Yos">${cleanFirstLine}<span class="DateBlog"> - ${formattedDate}</span></a></div>`;
                                    });
                            });
                    });

                // Concatenate Markdown file names into a single string
                Promise.all(links)
                    .then(fileNamesHTML => {
                        // Display Markdown file names in the container
                        markdownFilesContainer.innerHTML = fileNamesHTML.join('');
                    });
            })
            .catch(error => console.error('Error fetching Markdown files:', error));
    }

    // Call the function to fetch and display Markdown files
    fetchMarkdownFiles();
};
