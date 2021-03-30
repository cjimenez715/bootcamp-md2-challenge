import { promises as fs } from 'fs';
const { readFile, writeFile } = fs;
const dataFilePath = `./data/grades.json`;

const writeGradesData = async (grades) => {
  try {
    await writeFile(dataFilePath, JSON.stringify(grades));
  } catch (error) {
    throw new Error(`File ${dataFilePath} could not wrote.`);
  }
}

const getGradesData = async () => {
  try {
    return JSON.parse(await readFile(dataFilePath, 'utf-8'));
  } catch (error) {
    throw new Error(`File ${dataFilePath} could not be loaded.`);
  }
}

const getGradeById = async (id) => {
  const gradeData = await getGradesData();
  const grade = gradeData.grades.find(grade => grade.id === id);
  if (!grade) {
    throw new Error(`Grade ${id} was not found.`)
  }
  return grade;
}

const insertGrade = async (grade) => {
  try {
    const gradeData = await getGradesData();

    validateGradeData(grade);
    const gradeSaved = { id: gradeData.nextId++, ...fillGradeData(grade) };
    gradeData.grades = [...gradeData.grades, gradeSaved];

    await writeGradesData(gradeData);

    return gradeSaved;
  } catch (err) {
    throw new Error(err);
  }
}

const updateGrade = async (id, grade) => {
  try {
    const oldGrade = await getGradeById(id);
    const gradeData = await getGradesData();

    validateGradeData(grade);

    const gradeUpdated = { id, ...fillGradeData(grade) };

    const index = gradeData.grades.findIndex(grade => grade.id === oldGrade.id);

    gradeData.grades[index].student = gradeUpdated.student;
    gradeData.grades[index].subject = gradeUpdated.subject;
    gradeData.grades[index].type = gradeUpdated.type;
    gradeData.grades[index].value = gradeUpdated.value;

    writeGradesData(gradeData);
    return gradeUpdated;
  } catch (err) {
    throw new Error(err);
  }
}

const deleteGradeById = async (id) => {
  try {
    const gradeForDelete = await getGradeById(id);
    const gradeData = await getGradesData();
    gradeData.grades = gradeData.grades.filter(grade => grade.id !== gradeForDelete.id);
    writeGradesData(gradeData);
  } catch (err) {
    throw new Error(err);
  }
}

const getTotalScoreByStudentAndSubject = async (student, subject) => {
  try {
    const gradeData = await getGradesData();
    const sumTotal = gradeData.grades.filter(grade => grade.student === student
      && grade.subject === subject)
      .reduce((acc, item) => acc + item.value, 0);
    return sumTotal;
  } catch (err) {
    throw new Error(err);
  }
}

const getAvgBySubjectAndType = async (subject, type) => {
  try {
    const gradeData = await getGradesData();
    const avgResult = gradeData.grades.filter(grade => grade.subject === subject
      && grade.type === type)
      .reduce((acc, item, _, grades) => {
        acc += (item.value / grades.length);
        return acc;
      }, 0);
    return avgResult;
  } catch (err) {
    throw new Error(err);
  }
}

const getTop3GradesBySubjectAndType = async (subject, type) => {
  try {
    const gradeData = await getGradesData();
    const top3grades = gradeData.grades.filter(grade => grade.subject === subject
      && grade.type === type)
      .sort((a, b) => b.value - a.value)
      .slice(0, 3)
      .map(({ id, student, value }) => {
        return {
          id,
          student,
          value
        };
      });
    return top3grades;
  } catch (err) {
    throw new Error(err);
  }
}

const fillGradeData = ({ student, subject, type, value }) => {
  return {
    student,
    subject,
    type,
    value: Number(value),
    timestamp: new Date()
  };
}

const validateGradeData = (grade) => {
  if (grade.student == null) {
    throw new Error(`Field 'student' is required.`);
  }
  if (grade.subject == null) {
    throw new Error(`Field 'subject' is required.`);
  }
  if (grade.type == null) {
    throw new Error(`Field 'type' is required.`);
  }
  if (!grade.value) {
    throw new Error(`Field 'value' is required.`);
  }
  if (!!isNaN(grade.value)) {
    throw new Error(`Field 'value' must be a number.`);
  }
}

export default {
  getGradesData,
  getGradeById,
  insertGrade,
  updateGrade,
  deleteGradeById,
  getTotalScoreByStudentAndSubject,
  getAvgBySubjectAndType,
  getTop3GradesBySubjectAndType
};