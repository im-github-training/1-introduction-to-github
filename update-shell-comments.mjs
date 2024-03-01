import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';
import { execSync } from 'child_process';
// import fs and path
import fs from 'fs';
import path from 'path';


// Get the file name from the command-line arguments
const filename = process.argv[2];
const workingDir = process.argv[3];
const offset = process.argv[4];

// Create working directory if it doesn't exist
if (!fs.existsSync(workingDir)) {
  fs.mkdirSync(workingDir);
}

const options = {
  cwd: workingDir
};

// Get basename of the file
const basename = path.basename(filename, '.md');

// Read the Markdown text from the file
const markdownText = fs.readFileSync(filename, 'utf8');

const processor = remark()
  .use(remarkParse)
  .use(() => (tree) => {
    let counter = offset;

    // Remove all existing image nodes from the tree
    // The below code removes all the images except the very last image. how do i fix this?
    visit(tree, 'image', (node, index, parent) => {
      if (node.url.startsWith('/images/1-step')) {
        console.log("removing image: " + node.url)
        parent.children.splice(index, Infinity);
      }
    });

    visit(tree, 'html', (node, index, parent) => {
      if (node.value.startsWith('<!--') && node.value.endsWith('-->')) {
        // Extract the comment content
        const commentContent = node.value.slice(4, -3).trim();

        const foo = remark().parse(commentContent);
        for (const f of foo.children) {
          if (f.lang === 'shellSession') {
            const commands = f.value.split('\n')
              // Filter out lines starting with $
              .filter(line => line.startsWith('$'))
              // Escape each line
              .map(line => line.replace(/'/g, "'\\''"))
              // Remove the $ at the beginning of each line
              .map(line => `${line.slice(2)}`)


            let nodes = [];
            // For each command, create a new SVG file
            for (const command of commands) {

              console.log(command)

              // term-script outputs raw SVG data to stdout
              const cmd_output = execSync(`unbuffer ${command} | term-transcript capture '${command}'`, options).toString().trim();

              const imageFilename = `${basename}-shell-${counter++}.svg`;

              // Write the captured output to an SVG file
              fs.writeFileSync(path.join('images', imageFilename), cmd_output);

              nodes.push({
                type: 'image',
                url: path.join('/images', imageFilename),
                alt: `'${command}'`,
              })
            }

            // Insert the image node(s) after the current code node
            parent.children.splice(index + 1, 0, {
              type: 'paragraph',
              children: nodes
            });
          }
        }
      }
    });
  })
  .use(remarkStringify);

const result = processor.processSync(markdownText).toString();

// Write result to file
const outputPath = path.join('.github', 'steps', `${basename}.md`);
fs.writeFileSync(outputPath, result);