import { put } from '@vercel/blob';
import formidable from 'formidable';
import fs from 'fs';

export const config = {
  api: { bodyParser: false }
};

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  try {
    const form = formidable({ maxFileSize: 10 * 1024 * 1024 });
    const [, files] = await form.parse(req);
    const file = Array.isArray(files.file) ? files.file[0] : files.file;

    if (!file) return res.status(400).json({ error: 'No file' });

    const buffer = fs.readFileSync(file.filepath);
    const ext = file.originalFilename?.split('.').pop() || 'jpg';
    const filename = `${slug}/${Date.now()}.${ext}`;

    const blob = await put(filename, buffer, {
      access: 'public',
      contentType: file.mimetype
    });

    res.status(200).json({ url: blob.url, name: file.originalFilename });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
