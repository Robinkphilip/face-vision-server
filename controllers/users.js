import bcrypt from "bcrypt"


import knex from "knex"

const db =knex({
    client: 'pg',
    version: '7.2',
    connection: {
        host : '127.0.0.1',
        port : 5433,
        user : 'robinkphilip',
        password : '',
        database : 'robinkphilip'
    }
});
 


export const logIn =(req,res)=>{
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json("incorrect input");
    }
    db.select("email", "hash")
      .from("login")
      .where("email", "=", email)
      .then((data) => {
        const isValid = bcrypt.compareSync(password, data[0].hash);
        if (isValid) {
          return db
            .select("*")
            .from("users")
            .where("email", "=", email)
            .then((user) => {
              res.json(user[0]);
            })
            .catch((err) => res.status(400).json("unable to get user"));
        } else {
          res.status(400).json("This is due towrong credentials");
        }
      })
      .catch((err) => res.status(400).json("wrong credentials"));
    }

export const register =async(req,res)=>{
    const {name,email,password} =req.body
    const hash= await bcrypt.hash(password,10)
    if(!name &&!email &&!password){
        return res.json("rempty input")
    }

    db.transaction(trx=>{
        trx.insert({
            hash:hash,
            email:email
        })
    .into('login')
    .returning('email')
    .then(loginEmail=>{
         trx("users")
        .returning("*")
        .insert({
            email:loginEmail[0].email,
            name:name,
            joined: new Date()
        }).then(user=>{
            res.json(user[0])
        })
    }).then(trx.commit)
    .catch(trx.rollback)
}).catch(err=>{
    res.status(400).json("errror")
})
}

export const handleImages =(req,res)=>{
    const { id } = req.body;
    db("users")
      .where("id", "=", id)
      .increment("entries", 1)
      .returning("entries")
      .then((entries) => res.json(entries[0].entries))
      .catch((err) => res.status(400).json(err));
}
