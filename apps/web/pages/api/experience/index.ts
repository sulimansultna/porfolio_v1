import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const experienceSnapshot = await adminDb.collection('experience').orderBy('startDate', 'desc').get();
      const experience = experienceSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json(experience);
    } catch (error) {
      console.error("Error fetching experience:", error);
      res.status(500).json({ message: 'Error fetching experience' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, company, startDate, endDate, description, responsibilities } = req.body;
      const newExperience = {
        title,
        company,
        startDate,
        endDate,
        description,
        responsibilities: responsibilities || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const docRef = await adminDb.collection('experience').add(newExperience);
      res.status(201).json({ id: docRef.id, ...newExperience });
    } catch (error) {
      console.error("Error creating experience:", error);
      res.status(500).json({ message: 'Error creating experience' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
