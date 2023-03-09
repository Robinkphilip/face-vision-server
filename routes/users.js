import express from "express";
import {logIn,register,getUsers} from '../controllers/users.js'


const router = express.Router();

router.get("/",getUsers)
router.post('/login',logIn)
router.post('/register',register)

export default router;