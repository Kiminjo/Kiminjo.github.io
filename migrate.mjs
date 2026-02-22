import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const OLD_BLOG = '../old-blog-backup';
const NEW_CONTENT = './content';
const CATEGORIES = ['_posts', '_llm', '_mlops', '_myprojects', '_others'];

// Ensure target dir
const archiveDir = path.join(NEW_CONTENT, 'Archive');
if (!fs.existsSync(archiveDir)) {
  fs.mkdirSync(archiveDir, { recursive: true });
}

for (const category of CATEGORIES) {
  const catPath = path.join(OLD_BLOG, category);
  if (!fs.existsSync(catPath)) continue;

  const files = fs.readdirSync(catPath);
  for (const file of files) {
    if (!file.endsWith('.md') && !file.endsWith('.markdown')) continue;

    const filePath = path.join(catPath, file);
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(fileContent);

    let newFilename = file;
    let dateStr = parsed.data.date || null;
    let title = parsed.data.title || null;

    // Check for Jekyll style date prefix
    const jekyllDateMatch = file.match(/^(\d{4}-\d{2}-\d{2})-(.+)$/);
    if (jekyllDateMatch) {
      if (!dateStr) dateStr = jekyllDateMatch[1];
      newFilename = jekyllDateMatch[2];
      if (!title) {
        // Humanize the title slightly if it wasn't there
        title = newFilename
          .replace(/\.md$/, '')
          .replace(/\.markdown$/, '')
          .replace(/-/g, ' ');
      }
    }

    if (!title) {
      title = newFilename.replace(/\.md$/, '').replace(/\.markdown$/, '');
    }

    if (!dateStr) {
      // Fallback
      dateStr = new Date().toISOString().split('T')[0];
    }

    parsed.data.title = title;
    // ensure date is valid format, if standard jekyll it would be string
    parsed.data.date = new Date(dateStr).toISOString();

    const newCatDir = path.join(archiveDir, category.replace(/^_/, ''));
    if (!fs.existsSync(newCatDir)) {
      fs.mkdirSync(newCatDir, { recursive: true });
    }

    const newFilePath = path.join(newCatDir, newFilename);
    const newContentStr = matter.stringify(parsed.content, parsed.data);
    fs.writeFileSync(newFilePath, newContentStr);
    console.log(`Migrated ${file} -> ${newFilePath}`);
  }
}
console.log('Migration complete.');
