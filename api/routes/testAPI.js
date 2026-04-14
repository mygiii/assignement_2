var express = require("express");
var router = express.Router();
const User = require("../models/user");

// TEST
router.get("/", function (req, res) {
  res.json({
    message: "API is working",
    status: "success"
  });
});

// LOGIN
router.post("/login", async (req, res) => {
  try {
    const { name, password } = req.body;

    const user = await User.findOne({ name, password });

    if (!user) {
      return res.status(401).json({
        exists: false,
        message: "Invalid username or password"
      });
    }

    res.json({
      exists: true,
      message: "User found",
      name: user.name,
      age: user.age,
      id: user._id
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// AJOUTER UN USER
router.post("/user", async (req, res) => {
  try {
    const { name, age, password } = req.body;

    const newUser = new User({
      name,
      age,
      password
    });

    await newUser.save();

    res.json({
      message: "User saved successfully",
      user: newUser
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// RECUPERER TOUS LES USERS
router.get("/user", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// GET USER BY ID
router.get("/user/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// just to clear the db sometimes
router.delete("/user/delete_all", async (req, res) => {
  try {
    const result = await User.deleteMany({});

    res.json({
      message: "All users deleted successfully",
      deletedCount: result.deletedCount
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// DELETE USER
router.delete("/user/:id", async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User deleted successfully",
      user: deletedUser
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});




// PUT USER
router.put("/user/:id", async (req, res) => {
  try {
    const { name, age, password } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, age, password },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User updated successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

// PATCH USER
router.patch("/user/:id", async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.json({
      message: "User patched successfully",
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
});

module.exports = router;