var express = require("express");
var router = express.Router();
const User = require("../models/user");



router.get("/", function (req, res) {
  res.json({
    message: "API is working",
    status: "success"
  });
});


//-----------POST user information-----------
router.post("/user", async (req, res) => {
  try {
    const { name } = req.body;
    const {age} = req.body;
    const {password} = req.body;

    const newUser = new User({ name , age , password});
    await newUser.save();

    res.json({
      message: "User saved successfully",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//-----------GET user information-----------
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//----------Delete user information-----------
router.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


//----------Put / update user information----------
router.put("/user/:id", async(req,res)=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {name : req.body.name, 
        age : req.body.age, 
        password : req.body.password},
      {new : true, runValidators : true});

      if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message : "User updated succefully",
      user : updatedUser
    });
  } catch (error){
    res.status(500).json({error : error.message});

  }}
  
  )
  

router.patch("/user/:id", async(req,res)=>{
  try{
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {name : req.body.name ,
      age : req.body.age,
      password : req.body.password},
      {new : true, runValidators : true});

      if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message : "User updated succefully",
      user : updatedUser
    });
  } catch (error){
    res.status(500).json({error : error.message});

  } }
  )



module.exports = router;