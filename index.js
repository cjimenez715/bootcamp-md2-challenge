import gradesRouter from './routes/grades.js';
import express from 'express';
import swaggerUI from 'swagger-ui-express';
import { swaggerDocumentConfig } from './swagger/doc.js';

const app = express();

//Express can accept json format.
app.use(express.json());
app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocumentConfig));
app.use('/grades', gradesRouter);

app.listen(3000, async () => {
  try {
    console.log('grades-control-api is Working!');
  } catch (err) {
    console.log(`An error Ocurred \n ${err.message}`);
  }
});