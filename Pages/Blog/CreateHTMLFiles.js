const fs = require('fs');
const path = require('path');
const markdownIt = require('markdown-it')();

const postsDir = 'Blog posts';
const outputDir = 'Blog posts/Converted html file';

// Create the output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

fs.readdir(postsDir, (err, files) => {
    if (err) {
        console.error('Error reading posts directory:', err);
        return;
    }

    // Filter out only the Markdown files
    const markdownFiles = files.filter(file => file.endsWith('.md'));

    // Convert each Markdown file to HTML and save
    markdownFiles.forEach(markdownFile => {
        const markdownFilePath = path.join(postsDir, markdownFile);
        const htmlFileName = `${markdownFile.replace('.md', '')}.html`;
        const htmlFileName1 = `${markdownFile.replace('.md', '')}`;
        const htmlFileName2 = `${markdownFile.replace('.md', '')}.txt`;
        const htmlFilePath = path.join(outputDir, htmlFileName);
        const commentFilePath = path.join(outputDir, htmlFileName2);

        fs.readFile(markdownFilePath, 'utf8', (err, markdownContent) => {
            if (err) {
                console.error(`Error reading Markdown file ${markdownFilePath}:`, err);
                return;
            }

            const htmlContent = markdownIt.render(markdownContent);

            const modifiedHtmlContent = htmlContent.replace(/src="([^"]+)"/g, (match, group1) => {
                const imagePath = path.resolve(path.dirname(markdownFilePath), group1);
                const relativeImagePath = path.relative(outputDir, imagePath);
                return `src="${path.join("assests/", relativeImagePath)}"`;
            });

            // Create HTML content with Markdown embedded
            const finalHtmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" type="text/css" href="../../../../MainPage.css?v=1">
    <link rel="stylesheet" type="text/css" href="../../blog.css?v=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" integrity="sha384-n8MVd4RsNIU0tAv4ct0nTaAbDJwPJzDEaqSD1odI+WdtXRGWt2kTvGFasHpSy3SV" crossorigin="anonymous">

    <!-- The loading of KaTeX is deferred to speed up page rendering -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js" integrity="sha384-XjKyOOlGwcjNTAIQHIpgOno0Hl1YQqzUOEleOLALmuqehneUG+vnGctmUb0ZY0l8" crossorigin="anonymous"></script>

    <!-- To automatically render math in text elements, include the auto-render extension: -->
    <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" integrity="sha384-+VBxd3r6XgURycqtZ117nYw44OOcIax56Z4dCRWbxyPt0Koah1uHoK0o4+/RRE05" crossorigin="anonymous"
        onload="renderMathInElement(document.body);"></script>
    <title>${htmlFileName1}</title>
</head>
<body>
    <script src="PlaySound.js"></script>
    <span><a href="../../blog.html" class="TerminalLink FunkyTown" id="Wow">◄[Back]►</a></span>
    <div class="BlogDivCS">
        <div class="BlogPosts">${htmlContent}</div>
    </div>
    <!--<div id="Commen" class="CommentContainer">
    <h1>Comments</h1>
    </div>
    <input type="hidden" id="filename" value="${htmlFileName2}">
    <script src="../../CommentPrinter.js"></script>-->
    <div style="min-height:200px;"></div>
</body>
</html>
`;

            fs.writeFile(htmlFilePath, finalHtmlContent, err => {
                if (err) {
                    console.error(`Error writing HTML file ${htmlFilePath}:`, err);
                    return;
                }
                console.log(`Converted ${markdownFile} to HTML: ${htmlFilePath}`);
            });
            /*
            if(fs.existsSync(commentFilePath)) {
                console.log("File exists")
            } else {
                fs.writeFile(commentFilePath, '', err => {
                    if (err) {
                        console.error(`Error writing HTML file ${htmlFilePath}:`, err);
                        return;
                    }
                    console.log(`Converted ${markdownFile} to txt: ${commentFilePath}`);
                });
            }
            */
            
        });
    });
});
