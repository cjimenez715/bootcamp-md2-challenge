import express from 'express';
import gradesbal from '../business/gradesbal.js';

const router = express.Router();

router.get('/get-all', async (_, res, next) => {
  try {
    const data = await gradesbal.getGradesData();
    res.send(data);
  } catch (err) {
    next(err);
  }
});

router.get('/get-by-id/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const grade = await gradesbal.getGradeById(id);
    res.send(grade);
  } catch (err) {
    next(err);
  }
});

router.post('/', async (req, res, next) => {
  try {
    let grade = req.body;
    const gradeSaved = await gradesbal.insertGrade(grade);
    res.send(gradeSaved);
  } catch (err) {
    next(err);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const grade = req.body;
    const gradeUpdated = await gradesbal.updateGrade(id, grade);
    res.send(gradeUpdated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    await gradesbal.deleteGradeById(id);
    res.end();
  } catch (err) {
    next(err);
  }
});

//QueryParameters
router.get('/get-total-by-student-subject', async (req, res, next) => {
  try {
    const { student, subject } = req.query;
    const totalResult = await gradesbal.getTotalScoreByStudentAndSubject(student, subject);
    res.send(totalResult.toString());
  } catch (err) {
    next(err);
  }
});

router.get('/get-avg-by-subject-type', async (req, res, next) => {
  try {
    const { subject, type } = req.query;
    const avgResult = await gradesbal.getAvgBySubjectAndType(subject, type);
    res.send(avgResult.toString());
  } catch (err) {
    next(err);
  }
});

router.get('/get-top-3-grades-by-subject-type', async (req, res, next) => {
  try {
    const { subject, type } = req.query;
    const top3gradesResult = await gradesbal.getTop3GradesBySubjectAndType(subject, type);
    res.send(top3gradesResult);
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, _) => {
  console.log(`${req.method} - ${req.baseUrl} - ${err.message}`);
  res.status(400).send({ error: err.message });
})

export default router;