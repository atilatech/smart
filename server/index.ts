import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { NFTContract } from './src/models/NFTContract';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8009;


app.post('/api/v1/contract',
async (req: Request, res: Response) => {

  const { name, symbol } = (req.body.contract as NFTContract);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});