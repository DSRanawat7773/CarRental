import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export const getBookings = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/bookings`);
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
};

export const createBooking = async (booking) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/bookings`, booking);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Add other API methods as needed, such as updateBooking, deleteBooking, etc.
