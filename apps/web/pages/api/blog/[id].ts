import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, content, author, tags } = req.body;
      await adminDb.collection('blogPosts').doc(id as string).update({
        title,
        content,
        author,
        tags: tags || [],
        updatedAt: new Date().toISOString(),
      });
      res.status(200).json({ message: 'Blog post updated successfully' });
    } catch (error) {
      console.error("Error updating blog post:", error);
      res.status(500).json({ message: 'Error updating blog post' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await adminDb.collection('blogPosts').doc(id as string).delete();
      res.status(200).json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error("Error deleting blog post:", error);
      res.status(500).json({ message: 'Error deleting blog post' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
