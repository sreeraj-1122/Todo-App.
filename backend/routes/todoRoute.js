import express from "express"
import { addTodo, deleteTodo, markTodo, updateTodo } from "../controllers/todoController.js"
import verifyToken from "../middlewares/verifyToken.js"


const todoRouter=express.Router()

todoRouter.post('/:id/todos',verifyToken,addTodo)
todoRouter.patch('/:id/todos/:todoId/status',verifyToken,markTodo)
todoRouter.put('/:id/todos/:todoId',verifyToken,updateTodo)
todoRouter.delete('/:id/todos/:todoId',verifyToken,deleteTodo)

export default todoRouter