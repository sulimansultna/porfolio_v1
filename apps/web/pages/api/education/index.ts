import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const educationSnapshot = await adminDb.collection('education').orderBy('year', 'desc').get();
      const education = educationSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      res.status(200).json(education);
    } catch (error) {
      console.error("Error fetching education:", error);
      res.status(500).json({ message: 'Error fetching education' });
    }
  } else if (req.method === 'POST') {
    try {
      const { degree, institution, year, description } = req.body;
      const newEducation = {
        degree,
        institution,
        year: parseInt(year),
        description,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const docRef = await adminDb.collection('education').add(newEducation);
      res.status(201).json({ id: docRef.id, ...newEducation });
    } catch (error) {
      console.error("Error creating education:", error);
      res.status(500).json({ message: 'Error creating education' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
