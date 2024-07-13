const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient, ObjectId } = require('mongodb');

const app = express();
const PORT = 5000;

// Replace the following with your MongoDB Atlas connection string
const uri = 'mongodb+srv://2021pcecsranawat133:sX1ti9AXXKhhKwMY@cluster0.c1ynlgg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Client
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log('Connected to MongoDB Atlas');
  } catch (error) {
    console.error('Error connecting to MongoDB Atlas:', error);
    process.exit(1);
  }
}

connectToDatabase();

// Routes

// Check if server is running
app.get('/', (req, res) => {
  res.send('Backend server is running.');
});

// Create a new booking
app.post('/api/bookings', async (req, res) => {
  try {
    const booking = req.body;
    const database = client.db('carRentalDB');
    const bookingsCollection = database.collection('bookings');
    const result = await bookingsCollection.insertOne(booking);
    res.status(201).json({ message: 'Booking created', bookingId: result.insertedId });
  } catch (error) {
    res.status(500).json({ message: 'Error creating booking', error: error.message });
  }
});

// Get all bookings
app.get('/api/bookings', async (req, res) => {
  try {
    const database = client.db('carRentalDB');
    const bookingsCollection = database.collection('bookings');
    const bookings = await bookingsCollection.find({}).toArray();
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bookings', error: error.message });
  }
});

// Get a booking by ID
app.get('/api/bookings/:id', async (req, res) => {
  try {
    const bookingId = new ObjectId(req.params.id);
    const database = client.db('carRentalDB');
    const bookingsCollection = database.collection('bookings');
    const booking = await bookingsCollection.findOne({ _id: bookingId });
    if (booking) {
      res.status(200).json(booking);
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching booking', error: error.message });
  }
});

// Update a booking by ID
app.put('/api/bookings/:id', async (req, res) => {
  try {
    const bookingId = new ObjectId(req.params.id);
    const updateData = req.body;
    const database = client.db('carRentalDB');
    const bookingsCollection = database.collection('bookings');
    const result = await bookingsCollection.updateOne({ _id: bookingId }, { $set: updateData });
    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Booking updated' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating booking', error: error.message });
  }
});

// Delete a booking by ID
app.delete('/api/bookings/:id', async (req, res) => {
  try {
    const bookingId = new ObjectId(req.params.id);
    const database = client.db('carRentalDB');
    const bookingsCollection = database.collection('bookings');
    const result = await bookingsCollection.deleteOne({ _id: bookingId });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Booking deleted' });
    } else {
      res.status(404).json({ message: 'Booking not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting booking', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
