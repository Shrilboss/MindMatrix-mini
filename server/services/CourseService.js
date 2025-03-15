
const CourseManager = require('../managers/CourseManager');

class CourseService {
  async getAllCourses() {
    return await CourseManager.getAllCourses();
  }

  async getCourseById(id) {
    return await CourseManager.getCourseById(id);
  }

  async createCourse(courseData) {
    return await CourseManager.createCourse(courseData);
  }

  async updateCourse(id, courseData) {
    return await CourseManager.updateCourse(id, courseData);
  }

  async deleteCourse(id) {
    return await CourseManager.deleteCourse(id);
  }
}

module.exports = new CourseService();
