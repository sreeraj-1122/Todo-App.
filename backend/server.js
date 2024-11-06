import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connectDB } from './config/db.js'
import cookieParser from 'cookie-parser'

import errorMiddleware from './middlewares/errorMiddleware.js'
import projectRouter from './routes/projectRoute.js'
import todoRouter from './routes/todoRoute.js'
import userRouter from './routes/userRoute.js'

//app config
const app = express()
const PORT=4000

//middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', 
    credentials: true, 
  }));
app.use(cookieParser());

//db connection
connectDB();

//API endpoints

app.use('/api/user',userRouter)
app.use('/api', projectRouter);
app.use('/api/projects', todoRouter);




app.get('/',(req,res)=>{
    res.send("API working")
})

// Use the error-handling middleware 
app.use(errorMiddleware);

app.listen(PORT,()=>console.log(`Server is started on ${PORT}`))