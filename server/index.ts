import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { createSmartContract } from './src/create-smart-contract';

dotenv.config();

const app: Express = express();
app.use(express.json());
const port = process.env.PORT || 8008;


app.post('/api/v1/contract',
async (req: Request, res: Response) => {

  try {
    const response = await createSmartContract(req.body.contract);
    res.json(response);
  } catch (error) {
    res.status(400).json(error);
  }

});

app.get('/', (req: Request, res: Response) => {
  res.send("Welcome to the Smart API");
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});