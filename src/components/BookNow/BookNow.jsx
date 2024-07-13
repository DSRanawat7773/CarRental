import React, { useState } from 'react';
import axios from 'axios';

const BookNow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    carModel: '',
    pickupDate: '',
    returnDate: ''
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [confirmation, setConfirmation] = useState(null);

  const carModels = [
    { model: 'Scorpio s11', price: 3000 },
    { model: 'Kwid', price: 800 },
    { model: 'Swift', price: 1200 },
    { model: 'Dzire', price: 1400 },
    { model: 'Thar', price: 3500 },
    { model: 'i20', price: 1500 },
    { model: 'Baleno', price: 1500 }
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleCarModelChange = (e) => {
    setFormData({
      ...formData,
      carModel: e.target.value
    });
  };

  const handlePickupDateChange = (e) => {
    setFormData({
      ...formData,
      pickupDate: e.target.value
    });
  };

  const handleReturnDateChange = (e) => {
    setFormData({
      ...formData,
      returnDate: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.pickupDate || !formData.returnDate) {
      alert('Please select pickup and return dates.');
      return;
    }

    const pickupDate = new Date(formData.pickupDate);
    const returnDate = new Date(formData.returnDate);

    if (pickupDate >= returnDate) {
      alert('Return date must be after pickup date.');
      return;
    }

    const oneDay = 24 * 60 * 60 * 1000;
    const diffDays = Math.round(Math.abs((pickupDate - returnDate) / oneDay));

    const selectedCar = carModels.find(car => car.model === formData.carModel);
    if (!selectedCar) {
      alert('Please select a car model.');
      return;
    }

    const totalPrice = selectedCar.price * diffDays;
    setTotalAmount(totalPrice);

    const booking = {
      ...formData,
      totalAmount: totalPrice
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', booking);
      setConfirmation(response.data);
      setFormData({
        name: '',
        email: '',
        carModel: '',
        pickupDate: '',
        returnDate: ''
      });
      setTotalAmount(0);
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('There was an error creating your booking. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center dark:text-white">Book Now</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="carModel" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Car Model:</label>
            <select
              id="carModel"
              name="carModel"
              value={formData.carModel}
              onChange={handleCarModelChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="">Select a car model</option>
              {carModels.map((car, index) => (
                <option key={index} value={car.model}>
                  {car.model} - ${car.price}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pickupDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Pickup Date:</label>
            <input
              type="date"
              id="pickupDate"
              name="pickupDate"
              value={formData.pickupDate}
              onChange={handlePickupDateChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Return Date:</label>
            <input
              type="date"
              id="returnDate"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleReturnDateChange}
              className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Amount:</span>
            <span className="text-lg font-bold text-blue-600">Rs.{totalAmount}</span>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Confirm
          </button>
        </form>
        {confirmation && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded-md">
            Booking confirmed! Check your email for details.
          </div>
        )}
      </div>
    </div>
  );
};

export default BookNow;
