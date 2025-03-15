
const Course = require('../models/Course');

class CourseManager {
  async getAllCourses() {
    try {
      return await Course.find().sort({ createdAt: -1 });
    } catch (error) {
      throw new Error(`Error fetching courses: ${error.message}`);
    }
  }

  async getCourseById(id) {
    try {
      const course = await Course.findById(id);
      if (!course) {
        throw new Error('Course not found');
      }
      return course;
    } catch (error) {
      throw new Error(`Error fetching course: ${error.message}`);
    }
  }

  async createCourse(courseData) {
    try {
      const newCourse = new Course(courseData);
      return await newCourse.save();
    } catch (error) {
      throw new Error(`Error creating course: ${error.message}`);
    }
  }

  async updateCourse(id, courseData) {
    try {
      const course = await Course.findByIdAndUpdate(
        id, 
        { ...courseData, updatedAt: Date.now() }, 
        { new: true, runValidators: true }
      );
      
      if (!course) {
        throw new Error('Course not found');
      }
      
      return course;
    } catch (error) {
      throw new Error(`Error updating course: ${error.message}`);
    }
  }

  async deleteCourse(id) {
    try {
      const course = await Course.findByIdAndDelete(id);
      
      if (!course) {
        throw new Error('Course not found');
      }
      
      return { message: 'Course deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting course: ${error.message}`);
    }
  }
}

module.exports = new CourseManager();
