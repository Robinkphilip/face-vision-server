import express from "express"
import cors from "cors"
import bcrypt from "bcrypt-nodejs"
import knex from "knex"

import userRoutes from "./routes/users.js"

const port=4000

const app=express()
app.use(express.json());
app.use(cors())

const db =knex({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      port : 5433,
      user : 'robinkphilip',
      password : '',
      database : 'facevision'
    }
  });

  db.select('*').from('users')
  .then(rows => {
    console.log(rows);
  })
  .catch(error => {
    console.error(error);
  })
  .finally(() => {
    db.destroy();
  });

app.use("/",userRoutes)

app.use("/auth",userRoutes)


app.listen(port,()=> console.log(`app is running on ${port}`))
