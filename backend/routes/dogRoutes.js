const express = require("express");
const Dog = require("../models/dog");
const router = express.Router();
router.post("/", async (req, res) => {
    try {
      console.log("Received Data:", req.body); // Debugging Log
      const newDog = new Dog(req.body);
      await newDog.save();
      res.status(201).json(newDog);
    } catch (err) {
      console.error("Error Saving Dog:", err); // Debugging Error Log
      res.status(500).json({ error: err.message });
    }
  });
  
// Create a new dog
router.post("/", async (req, res) => {
  try {
    const newDog = new Dog(req.body);
    await newDog.save();
    res.status(201).json(newDog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all dogs
router.get("/", async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.json(dogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a dog's details
router.put("/:id", async (req, res) => {
  try {
    const updatedDog = await Dog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedDog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a dog
router.delete("/:id", async (req, res) => {
  try {
    await Dog.findByIdAndDelete(req.params.id);
    res.json({ message: "Dog deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

