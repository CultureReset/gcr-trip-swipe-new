import { get, put, del } from '@vercel/blob';

export default async function handler(req, res) {
  const { slug } = req.query;
  if (!slug) return res.status(400).json({ error: 'slug required' });

  const filename = `menus/${slug}.json`;

  if (req.method === 'GET') {
    try {
      const blob = await get(filename);
      const data = JSON.parse(blob.toString());
      return res.status(200).json(data);
    } catch (err) {
      if (err.code === 'BLOB_NOT_FOUND') {
        return res.status(404).json({ error: 'not found' });
      }
      return res.status(500).json({ error: err.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const { restaurant, sections, items, gallery, pin } = req.body;
      const data = { restaurant, sections, items, gallery, pin };
      await put(filename, JSON.stringify(data), { access: 'public' });
      return res.status(200).json({ ok: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  res.status(405).end();
}
