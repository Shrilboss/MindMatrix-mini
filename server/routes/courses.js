
const express = require('express');
const router = express.Router();
const CourseService = require('../services/CourseService');

// Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await CourseService.getAllCourses();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await CourseService.getCourseById(req.params.id);
    res.status(200).json(course);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

// Create a new course
router.post('/', async (req, res) => {
  try {
    const course = await CourseService.createCourse(req.body);
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a course
router.put('/:id', async (req, res) => {
  try {
    const course = await CourseService.updateCourse(req.params.id, req.body);
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a course
router.delete('/:id', async (req, res) => {
  try {
    const result = await CourseService.deleteCourse(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
