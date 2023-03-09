import bcrypt from "bcrypt"


const db = {
    users:[
       {
            id:'123',
            name:"robin",
            email:"robin@gmail.com",
            password:"robin123",
            entrie:5,
            joined: new Date() 
        },
        {
            id:'124',
            name:"subin",
            email:"subin@gmail.com",
            password:"subin123",
            entrie:3,
            joined: new Date() 
        }
    ]
    }
 
export const getUsers=(req,res)=>{
   return res.send(db.users)



}


export const logIn =(req,res)=>{
const {id,email,password} =req.body
if (!id && !email && !password) {
    return res.status(400).json("empty req");
  }
if(email===db.users[0].email && password===db.users[0].password ){
    res.status(200).json("login success")
}else{
     res.status(200).json("input incorrect")
}
}
export const register =async(req,res)=>{
    const {name,email,password} =req.body
   const hash= await bcrypt.hash(password,10)
    if(!name &&!email&&!password){
       return res.json("rempty input")
    }
    db.users.push({  
            id:'125',
            name:name,
            email:email,
            password:hash,
            joined: new Date() ,

    })
    res.json(db.users[db.users.length-1])
    }

