export class ITSchool {
  constructor(name, description, grupsAmount, maxAmountOfStudents) {
    this.name = name;
    this.description = description;
    this.grupsAmount = grupsAmount;
    this.maxAmountOfStudents = maxAmountOfStudents;
  }
  availableCourses = {};
  startedGroups = [];

  registerCourse(courseName, totalLessons, availableTeachersAmount) {
    if (!this.availableCourses[courseName]) {
      let course = new Course(
        courseName,
        totalLessons,
        availableTeachersAmount
      );
      this.availableCourses[courseName] = course;
    }
  }
  startLearningGroup(courseName, teacherName, amountOfStudents) {
    if (
      this.availableCourses[courseName] &&
      this.availableCourses[courseName].availableTeachersAmount !== 0
    ) {
      let learningGroup = new LearningGroup(
        courseName,
        teacherName,
        amountOfStudents
      );
      this.availableCourses[courseName].decreaseTeachersAmount();
      this.startedGroups.push(learningGroup);
    }
  }
  endLearningGroup(courseName, teacherName) {
    let foundGroup = this.startedGroups.find((element) => {
      return (
        element.courseName === courseName && element.teacherName === teacherName
      );
    });
    if (foundGroup !== undefined) {
      this.startedGroups = this.startedGroups.filter((element) => {
        return (
          element.courseName !== courseName &&
          element.teacherName !== teacherName
        );
      });
    }
  }
  getLearningGroupByCourseName(courseName) {
    return this.startedGroups.filter(
      (element) => element.courseName === courseName
    );
  }
}

class Course {
  constructor(courseName, totalLessons, availableTeachersAmount) {
    this.courseName = courseName;
    this.totalLessons = totalLessons;
    this.availableTeachersAmount = availableTeachersAmount;
  }
  decreaseTeachersAmount() {
    this.availableTeachersAmount -= 1;
  }
}
class LearningGroup {
  constructor(courseName, teacherName, amountOfStudents) {
    this.courseName = courseName;
    this.teacherName = teacherName;
    this.amountOfStudents = amountOfStudents;
  }
  passedLessons = {};
  doneLesson(title, topics) {
    if (!this.passedLessons[title]) {
      let learningLessons = new Lesson(title, topics);
      this.passedLessons[title] = learningLessons;
    }
  }
}
class Lesson {
  constructor(title, topics) {
    this.title = title;
    this.topics = topics;
  }
}
