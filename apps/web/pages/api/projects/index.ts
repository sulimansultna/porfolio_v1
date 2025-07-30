import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const projectsSnapshot = await adminDb.collection('projects').orderBy('createdAt', 'desc').get();
      const projects = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ message: 'Error fetching projects' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, description, image, tech, github, demo } = req.body;
      const newProject = {
        title,
        description,
        image: image || '/placeholder.svg',
        tech: tech || [],
        github,
        demo,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const docRef = await adminDb.collection('projects').add(newProject);
      res.status(201).json({ id: docRef.id, ...newProject });
    } catch (error) {
      console.error("Error creating project:", error);
      res.status(500).json({ message: 'Error creating project' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
