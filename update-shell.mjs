import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { visit } from 'unist-util-visit';

const markdownText = `
# My Document

Here's the output of a command:

\`\`\`shell
ls -l --color=always
\`\`\`
`;

const processor = remark()
  .use(remarkParse)
  .use(() => (tree) => {
    visit(tree, 'code', (node, index, parent) => {
      const newString = 'Your new string here';

      if (node.lang === 'shell') {
        // Execute the command and get the output
        

        // Add new paragraph node with new string
        parent.children.push({
          type: 'paragraph',
          children: [{ type: 'text', value: newString }],
        });
      }
    });
  })
  .use(remarkStringify);

const result = processor.processSync(markdownText).toString();

console.log(result);