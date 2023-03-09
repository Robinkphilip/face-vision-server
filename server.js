import express from "express"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import knex from "knex"

import userRoutes from "./routes/users.js"

const port=4000

const app=express()
app.use(express.json());
app.use(cors())




app.use("/",userRoutes)

app.use("/auth",userRoutes)


app.listen(port,()=> console.log(`app is running on ${port}`))
