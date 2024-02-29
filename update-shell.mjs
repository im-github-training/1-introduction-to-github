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

const svg_tool = "term-transcript exec"

const processor = remark()
  .use(remarkParse)
  .use(() => (tree) => {
    let counter = 0;

    visit(tree, 'code', (node, index, parent) => {
      if (node.lang === 'shellSession') {
        const commands = node.value.split('\n')
                                   // Filter out lines starting with $
                                   .filter(line => line.startsWith('$'))
                                   // Escape each line
                                   .map(line => line.replace(/'/g, "'\\''"))
                                   // Add single quotes around each line
                                   .map(line => `'${line.slice(2)}'`)
                                   .join(' ')


        console.log(commands)
        console.log(`${svg_tool} ${commands} --pty`)

        // Execute the command and render the output as SVG
        const cmd_output = execSync(`${svg_tool} ${commands} -I 500ms --pty`).toString().trim();

        const imagesDir = '../images';
        const imageFilename = `${basename}-shell-${counter++}.svg`;
        fs.writeFileSync(path.join(imagesDir, imageFilename), cmd_output);

        // Replace the code node with the rendered image
        parent.children.splice(index, 1, {
          type: 'paragraph',
          children: [{
            type: 'image',
            url: path.join('images', imageFilename),
            alt: commands,
          }]
        });
      }
    });
  })
  .use(remarkStringify);

const result = processor.processSync(markdownText).toString();

// Write result to file
const outputPath = path.join('../', '.github', 'steps', `${basename}-shell.md`);
fs.writeFileSync(outputPath, result);