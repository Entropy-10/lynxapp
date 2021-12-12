import dbConnect from '../../../utils/dbConnect';
import eventSchema from '../../../models/event';

dbConnect();

export default async (req, res) => {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const events = await eventSchema.find({});

        res.status(200).json({ success: true, data: events })
      } catch (err) { res.status(400).json({ success: false }) }
      break;

    case 'POST':
      try {
        const event = await eventSchema.create(req.body);

        res.status(201).json({ success: true, data: event })
      } catch (err) { res.status(400).json({ success: false }) }
      break;

    default:
      res.status(400).json({ success: false })
      break;
  }
}