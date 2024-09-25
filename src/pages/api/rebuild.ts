import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }
  if (req.method === 'POST') {
    try {
      await res.revalidate('/');
      return res.json({ revalidated: true });
    } catch (err) {
      return res.status(500).json({ message: 'Error revalidating' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
