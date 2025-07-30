import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, description, image, tech, github, demo } = req.body;
      await adminDb.collection('projects').doc(id as string).update({
        title,
        description,
        image: image || '/placeholder.svg',
        tech: tech || [],
        github,
        demo,
        updatedAt: new Date().toISOString(),
      });
      res.status(200).json({ message: 'Project updated successfully' });
    } catch (error) {
      console.error("Error updating project:", error);
      res.status(500).json({ message: 'Error updating project' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await adminDb.collection('projects').doc(id as string).delete();
      res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      console.error("Error deleting project:", error);
      res.status(500).json({ message: 'Error deleting project' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
