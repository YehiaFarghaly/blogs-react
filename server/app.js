import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import router from './routes/blogRoute.js';
import cors from 'cors';
import bodyParser from 'body-parser';

dotenv.config();
const app = express();
connectDB();
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('/api', router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
