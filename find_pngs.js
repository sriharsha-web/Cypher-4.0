import fs from 'fs';

const html = fs.readFileSync('C:\\Users\\rohan\\.gemini\\antigravity-ide\\brain\\99e5645e-0141-43da-90cd-486a7a3e313a\\.system_generated\\steps\\63\\content.md', 'utf8');

const matches = html.match(/[\w-]+\.(?:png|svg|jpg|jpeg|webp|gif)/g);
console.log([...new Set(matches)]);
