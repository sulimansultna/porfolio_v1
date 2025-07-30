import type { NextApiRequest, NextApiResponse } from 'next';
import { IncomingForm } from 'formidable';
import { storage } from '@/lib/firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const config = {
  api: {
    bodyParser: false, // Disable Next.js's body parser
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const form = new IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form data:", err);
        return res.status(500).json({ message: 'Error uploading file' });
      }

      const file = files.resume?.[0];

      if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      if (file.mimetype !== 'application/pdf') {
        return res.status(400).json({ message: 'Only PDF files are allowed' });
      }

      try {
        const fileName = `resumes/${Date.now()}_${file.originalFilename}`;
        const storageRef = ref(storage, fileName);

        // Read the file into a buffer
        const fileBuffer = require('fs').readFileSync(file.filepath);

        const snapshot = await uploadBytes(storageRef, fileBuffer, { contentType: file.mimetype });
        const downloadURL = await getDownloadURL(snapshot.ref);

        // In a real application, you might save this URL to Firestore
        // For now, we'll just return it.
        res.status(200).json({ message: 'Resume uploaded successfully', url: downloadURL });
      } catch (error) {
        console.error("Error uploading to Firebase Storage:", error);
        res.status(500).json({ message: 'Error uploading file to storage' });
      }
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
