/**
 * user 
 * problem
 * doubt
 * teacher
 * 
 */

import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

// import db
import connectDB from './config/db.config.js';

// import routes
import user_route from './routes/user.route.js';
import problem_route from './routes/problem.route.js';
import doubt_route from './routes/doubt.route.js';
import ai_route from './routes/ai.route.js';
// import teacher_route from './routes/teacher.route.js';

// config 
connectDB();


// create an express app
const app = express();
const __dirname = path.resolve();
const views_dir = path.join(__dirname, 'src' , 'views');

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json({ limit: '50mb' })); // middleware to parse json data

// set view 


// user routes
// app.user("/api/login");
// app.user("/api/register");

app.use("/api/users" , user_route)
app.use("/api/problems" , problem_route)
app.use("/api/doubts" , doubt_route)
app.use("/api/ai" , ai_route)
// app.use("/api/teachers" , teacher_route)


app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}/`);
});


