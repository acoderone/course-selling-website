const express = require('express'); //lets you create http server
const app = express();
const jwt = require('jsonwebtoken');//helps you encrypt or decrypt object or strings
const cors = require('cors');
const mongoose=require('mongoose'); //help to connect to mongodb
app.use(express.json());
app.use(cors());

let ADMINS = [];
let USERS = [];
let COURSES = [];
let cnt = 0;

const secretKey = "MYSe3cr4t5k3y";


const userSchema=new mongoose.Schema({
  username:String,
  password:String,
  purchasedCourses:[{type:mongoose.Schema.Types.ObjectId, ref:'Course'}]
})

const adminSchema=new mongoose.Schema({
  username:String,
  password:String
});

const courseSchema=new mongoose.Schema({
  title:String,
  price:Number,
  description:String,
  imageLink:String,
  published:Boolean
  
 
});

//Define Mongoose model
const User=mongoose.model("User",userSchema);
const Admin=mongoose.model("Admins",adminSchema);
const Course=mongoose.model("Course",courseSchema);




const userAuth = (req, res, next) => {
  if (req.user && req.user.role === 'user') {
    next(); // User is authenticated
  } else {
    return res.sendStatus(403); // Forbidden for non-users
  }
};

const adminAuth = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next(); // Admin is authenticated
  } else {
    return res.sendStatus(403); // Forbidden for non-admins
  }
};


const auth = (req, res, next) => {
  const jwtKey = req.headers.authorization;
  if (jwtKey) {
    const token = jwtKey.split(' ')[1];
    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Unauthorized
      }
      req.user = user;
      next();
    });
  } else {
    return res.sendStatus(401); // Forbidden
  }
};




//Connect to the mongodb
mongoose.connect('mongodb+srv://avi5200786:Ashish%40123@cluster0.aopn06v.mongodb.net/courses', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
// Admin routes
app.post('/admin/signup',async (req, res) => {
  const {username,password} = req.body;
 const admin=await Admin.findOne({username});
 if(admin){
  res.status(403).json({message:'Admin already Exists'});

 }else{
  const obj={username:username, password:password};
  const newAdmin=new Admin(obj);
  await newAdmin.save();
  const token=jwt.sign({username,role:'admin'},secretKey,{expiresIn:'1h'});
  res.json({message:'Admin created successfuly',token})
 }
});

app.post('/admin/login', async(req, res) => {
  const { username, password} = req.body;
  const admin=await Admin.findOne({username,password});
  if(admin){
    const token=jwt.sign({username,role:'admin'},secretKey,{expiresIn:'1h'});
    res.json({message:"Logged in successfuly",token})
  }
  else{
    res.status(403).json({message:"Wrong Credentials"});
  }
});


app.post('/admin/courses', auth,adminAuth, async(req, res) => {
  // Ensure that only authenticated users can reach this point
  const course=new Course(req.body);
  await course.save();
 
  res.json({message:"Course created successfuly",courseId:course.id})
});

app.put('/admin/courses/:courseId', auth,adminAuth, async(req, res) => {
const course=await Course.findByIdAndUpdate(req.params.courseId,req.body,{new:true});
if(course){
  res.json({message:'Course updated successfuly'});
}
else{
  res.status(404).json({message:"Course not found"});
}
});

app.get('/admin/courses/:courseId', auth,adminAuth, async (req, res) => {
  try {
    const course = await Course.findOne({ _id: req.params.courseId });

    if (course) {
      res.json({ course });
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  } catch (error) {
    // Handle any potential errors here, e.g., database connection error
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.get('/admin/courses', auth,adminAuth, async(req, res) => {
  const courses=await Course.find({});
  res.json({courses});
});

// User routes
app.post('/users/signup', async(req, res) => {
  const {username,password} = req.body;
 const user=await(User.findOne({username}));
 if(user){
  res.status(403).json({message:'User Already Exists'});
 }
 else{
  const newUser=new User({username,password});
  await newUser.save();
  const token=jwt.sign({username,role:'user'},secretKey,{expiresIn:'1h'});
  res.json({message:'User Created successfuly',token});
 }
});

app.post('/users/login', async(req, res) => {
  const { username, password } = req.body;
  const user=await User.findOne({username,password});
 if(user){
  const token=jwt.sign({username,role:'user'},secretKey,{expiresIn:'1h'});
  res.json({message:"Loggined Sucessfully",token});
 }
 else{
  res.status(403).json({message:"Invalid Username or password"});
 }
});

app.get('/users/courses', auth,userAuth, async(req, res) => {
   const courses=await Course.find({published:true});
   res.json({courses});
});

app.post('/users/courses/:courseId', auth,userAuth, async(req, res) => {
 const course=await Course.findById(req.params.courseId);
 if(course){
  const user=await User.findOne({username:req.user.username})
  if(user){
    user.purchasedCourses.push(course._id);
    await user.save();
    res.status(200).json({message:"Course purchased successfuly"});
  }
  else{
    res.status(403).json({message:"User not found"});
  }
 }
 else{
  res.json({message:"Course not found"});
 }
});

app.get('/users/purchasedCourses', auth,userAuth, async(req, res) => {
const user=await User.findOne({username:req.user.username}).populate('purchasedCourses');
if(user){
res.json({purchasedCourses:user.purchasedCourses || []});

}

else{
res.status(403).json({message:"User not found"});
}
});

app.listen(8000, () => {
  console.log('Server is listening on port 8000');
});
