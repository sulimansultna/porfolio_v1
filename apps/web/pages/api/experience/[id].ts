import type { NextApiRequest, NextApiResponse } from 'next';
import { adminDb } from '@/lib/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'PUT') {
    try {
      const { title, company, startDate, endDate, description, responsibilities } = req.body;
      await adminDb.collection('experience').doc(id as string).update({
        title,
        company,
        startDate,
        endDate,
        description,
        responsibilities: responsibilities || [],
        updatedAt: new Date().toISOString(),
      });
      res.status(200).json({ message: 'Experience updated successfully' });
    } catch (error) {
      console.error("Error updating experience:", error);
      res.status(500).json({ message: 'Error updating experience' });
    }
  } else if (req.method === 'DELETE') {
    try {
      await adminDb.collection('experience').doc(id as string).delete();
      res.status(200).json({ message: 'Experience deleted successfully' });
    } catch (error) {
      console.error("Error deleting experience:", error);
      res.status(500).json({ message: 'Error deleting experience' });
    }
  } else {
    res.setHeader('Allow', ['PUT', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
