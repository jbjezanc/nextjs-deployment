import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, name, message } = req.body;

    if (
      !email ||
      !email.includes('@') ||
      !name ||
      name.trim() === '' ||
      !message ||
      message.trim() === ''
    ) {
      res.status(422).json({ message: 'Invalid input.' });
      return;
    }

    // store it in a db
    const newMessage = {
      email,
      name,
      message,
    };

    let client;
    let connectionString;
    if (process.env.NODE_ENV === 'production') {
      connectionString = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_CLUSTERNAME}.23kgquy.mongodb.net/${process.env.MONGODB_DATABASE}?retryWrites=true&w=majority&appName=${process.env.MONGODB_CLUSTERNAME}`;
    } else {
      connectionString = 'mongodb://localhost:37017/blog';
    }
    try {
      client = new MongoClient(connectionString);
      await client.connect();
    } catch (error) {
      res.status(500).json({ message: 'Could not connect to database.' });
      return;
    }

    const db = client.db();

    try {
      const result = await db.collection('messages').insertOne(newMessage);
      newMessage._id = result.insertedId;
    } catch (error) {
      await client.close();
      res.status(500).json({ message: 'Storing message failed!' });
      return;
    }

    await client.close();

    res
      .status(201)
      .json({ message: 'Successfully stored message!', message: newMessage });
  }
}
