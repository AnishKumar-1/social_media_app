const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const app = express();


//connection..
mongoose.set('strictQuery', true);
mongoose.connect('mongodb://0.0.0.0:27017/myprojectdata').then(() => {
    console.log("connected to database...")
}).catch(() => {
    console.log("error..")
});

//user schema...
const usersSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

//user model 

const userModel = mongoose.model('users', usersSchema);
// use app ...
app.use(cors());
app.use(express.json());



//registration api

app.post('/registration', async (req, res) => {
    const { username, email, password } = req.body;
    userModel.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({message:"User already register"});
        }
        else {
            const data = new userModel({ username, email, password })
            data.save((err) => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "Succefully register thank you!." })
                }
            })
        }
    })
})

//login api ..

app.post('/login', async (req, res) => {
    const { email, password } = req.body;
          userModel.findOne({ email:email }, (err, user) => {
            if(user){
                if(user.password===password)
                {
                    res.send({message:"Login successfully",user:user});
                }
                else{
                    res.send({message:"Password incorrect"});
                }
            }
            else{
                res.send({message:"User not regitered"})
            }

})
})


//update password ...

app.post('/updatepassword',(req,res)=>{

    userModel.findOne({email:req.body.email},(err,user)=>{
        if(user)
        {
            userModel.updateOne({password:user.password},{$set:{password:req.body.confirmpassword}},()=>{
                res.send({message:"password updated successfully..."})
            })
        }
        else{
            res.send({message:"User not registered"})
        }
    })
})


//postSchema

const postSchema=new mongoose.Schema({
    title:String,
    location:String,
    userdes:String,
    username:String
});

// postModel

const postModel=mongoose.model("userpost",postSchema);

//user post api...

app.post('/userpost',async(req,res)=>{
    const data=new postModel(req.body);
    await data.save();
    res.send({message:"post save successfully.."});
})

//get api of post model..

app.get('/get_user_data',async(req,res)=>{
    const data=await postModel.find();
    res.send(data);
})

//get data by id 

app.post('/get_data_by_id/:id',async(req,res)=>{
         postModel.findOne({_id:req.params.id},(err,result)=>{
        res.send(result);
    });
    
})


//update data...
app.post('/update_data_by_id/:id',async(req,res)=>{
    postModel.findOneAndUpdate({_id:req.params.id},
     {$set:{title:req.body.title,location:req.body.location,userdes:req.body.userdes}}   
   ,(err,result)=>{
        res.send({message:"data updated"})
    })
})

//delete api 

app.post('/delete_data_by_id/:id',(req,res)=>{
    postModel.findOneAndDelete({_id:req.params.id},(err,result)=>{
        res.send({message:"record deleted.."})
    });
})

//port
app.listen(5000);




