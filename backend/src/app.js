import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './db/index.js';
import UserRoutes from './routes/user.routes.js';
import cors from 'cors';
import { authenticate } from './middlewares/authenticate.js';
import ChatRoutes from './routes/chats.routes.js';
import ForumRoutes from './routes/forums.router.js';
dotenv.config();

//connect to database
connectDB();

//initialize express
const app = express();

//use middleware
app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true
}));
app.use(cookieParser())
app.use(express.urlencoded({extended:true}));
app.use(express.json());

//use routes
app.use('/api/user',UserRoutes);
app.use('/api/chats',authenticate,ChatRoutes);
app.use('/api/forum',authenticate,ForumRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

export {app};