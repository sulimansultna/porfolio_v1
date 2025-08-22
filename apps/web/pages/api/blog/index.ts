import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const blogPostsSnapshot = await adminDb.collection('blogPosts').orderBy('createdAt', 'desc').get();
      const blogPosts = blogPostsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json(blogPosts);
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      res.status(500).json({ message: 'Error fetching blog posts' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, content, author, tags } = req.body;
      const newPost = {
        title,
        content,
        author,
        tags: tags || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const docRef = await adminDb.collection('blogPosts').add(newPost);
      res.status(201).json({ id: docRef.id, ...newPost });
    } catch (error) {
      console.error("Error creating blog post:", error);
      res.status(500).json({ message: 'Error creating blog post' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
