const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const cors = require('cors');
const User=require('./models/user')



dotenv.config();
const app = express();

app.use(cors());

app.use(express.json());

app.post('/api/signup', async (req, res) => {
  const { username, password } = req.body;
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();
    const token = jwt.sign({ username: user.username }, 'secret');
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).send('Error signing up user');
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
 
  try {
    const user = await User.findOne({ username });
  
    if (!user) {
      return res.status(401).send('Invalid username or password');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send('Invalid username or password');
    }
    const token = jwt.sign({ username: user.username }, 'secret');
    console.log(user)
    res.json({ 
      token,
      username});
   
  } catch (error) {
    console.log(error);
    res.status(500).send('Error logging in user');
  }
});

/* MONGOOSE SETUP */
const PORT =process.env.PORT || 6001;
mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    app.listen(PORT,()=> console.log(`server port : ${PORT}`));

}).catch((error)=> console.log(`${error} did not connect`));