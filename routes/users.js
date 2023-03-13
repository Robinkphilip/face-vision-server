import express from "express";

import {logIn,register,handleImages} from '../controllers/users.js'



const router = express.Router();

router.post('/login',logIn)
router.post('/register',register)
router.put("/image",handleImages)

export default router;