import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import { execSync } from 'child_process';
// import fs and path
import fs from 'fs';
import path from 'path';

// const markdownText = `
// # My Document

// Here's the output of a command:

// \`\`\`shell
// ls -l --color=always
// \`\`\`

// \`\`\`shell
// ls -l ../ --color=always
// \`\`\`

// `;

// Get the file name from the command-line arguments
const filename = process.argv[2];

// Get basename of the file
const basename = path.basename(filename, '.md');


// Read the Markdown text from the file
const markdownText = fs.readFileSync(filename, 'utf8');

const command = "term-transcript exec"

const processor = remark()
  .use(remarkParse)
  .use(() => (tree) => {
    let counter = 0;

    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'replaceShell') {
        // Create command by joining command and node.value


        // Execute the command and render the output as SVG
        const cmd_output = execSync(`${command} '${node.value}' --pty`).toString().trim();
        // const cmd_output = execSync("ls -l").toString().trim();

        const imagesDir = '../images';
        const imageFilename = `${basename}-shell-${counter++}.svg`;
        fs.writeFileSync(path.join(imagesDir, imageFilename), cmd_output);

        // Add a child node to the parent node with the SVG image
        parent.children.splice(index+1, 0, {
          type: 'paragraph',
          children: [{
            type: 'image',
            url: path.join(imagesDir, imageFilename),
            alt: '',
          }]
        });
      }
    });
  })
  .use(remarkStringify);

const result = processor.processSync(markdownText).toString();

console.log(result);