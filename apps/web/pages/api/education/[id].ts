import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { degree, institution, year, description } = req.body;
      await adminDb.collection('education').doc(id as string).update({
        degree,
        institution,
        year: parseInt(year),
        description,
        updatedAt: new Date().toISOString(),
      });
      res.status(200).json({ message: 'Education updated successfully' });
    } catch (error) {
      console.error("Error updating education:", error);
      res.status(500).json({ message: 'Error updating education' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await adminDb.collection('education').doc(id as string).delete();
      res.status(200).json({ message: 'Education deleted successfully' });
    } catch (error) {
      console.error("Error deleting education:", error);
      res.status(500).json({ message: 'Error deleting education' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
