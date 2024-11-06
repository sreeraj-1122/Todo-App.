import express from "express"
import { createProject, deleteProjects, getProjects, listProjects, updateProjects } from "../controllers/projectController.js"
import verifyToken from './../middlewares/verifyToken.js';


const projectRouter=express.Router()

projectRouter.post('/projects',verifyToken,createProject)
projectRouter.get('/projects',verifyToken,listProjects)
projectRouter.get('/projects/:id',verifyToken,getProjects)
projectRouter.put('/projects/:id',verifyToken,updateProjects)
projectRouter.delete('/projects/:id',verifyToken,deleteProjects)

export default projectRouter