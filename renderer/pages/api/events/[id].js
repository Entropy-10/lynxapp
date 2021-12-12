import dbConnect from '../../../utils/dbConnect';
import eventSchema from '../../../models/event';

dbConnect();

export default async (req, res) => {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const event = await eventSchema.findById(id);

        if (!event) return res.status(400).json({ success: false })

        res.status(200).json({ success: true, data: event })
      } catch (err) { res.status(400).json({ success: false }) }
      break;

    case 'PUT':
      try {
        const event = await eventSchema.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true
        })

        if (!event) return res.status(400).json({ success: false })

        res.status(201).json({ success: true, data: event })
      } catch (err) { res.status(400).json({ success: false }) }
      break;

    case 'DELETE':
      try {
        const deletedEvent = await eventSchema.deleteOne({ _id: id });

        if (!deletedEvent) return res.status(400).json({ success: false })

        res.status(201).json({ success: true, data: [] })
      } catch (err) { res.status(400).json({ success: false }) }
      break;

    default:
      res.status(400).json({ success: false })
      break;
  }
}