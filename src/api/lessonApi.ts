import axios from 'axios';

/**
 * @typedef {Object} LessonRequest
 * @property {string} grade
 * @property {string} subject
 * @property {string} topic
 * @property {number} duration
 * @property {string} difficulty
 * @property {string} curriculum
 */

const API_BASE_URL = process.env.VITE_API_BASE_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Generates a lesson plan by calling the backend API.
 * @param {LessonRequest} data 
 * @returns {Promise<any>}
 */
export const generateLesson = async (data) => {
  try {
    const response = await api.post('/generate-lesson', data);
    return response.data;
  } catch (error) {
    console.error('Error generating lesson:', error);
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.detail || 'Failed to generate lesson plan. Please try again.');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check if the backend is running.');
    } else {
      // Something happened in setting up the request that triggered an Error
      throw new Error(error.message || 'An unexpected error occurred.');
    }
  }
};
