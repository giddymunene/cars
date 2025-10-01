// routes/messages.js
import express from "express";
import Message from "../models/Message.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("📩 Incoming message:", req.body);  
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMessage = new Message({ name, email, message });
    await newMessage.save();

    res.json({ message: "Message sent successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
    try {
      const messages = await Message.find().sort({ createdAt: -1 });
      res.json(messages);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // Approve message -> becomes review
router.put("/:id/approve", async (req, res) => {
    try {
      const msg = await Message.findByIdAndUpdate(
        req.params.id,
        { status: "approved" },
        { new: true }
      );
      res.json(msg);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Reject message
  router.put("/:id/reject", async (req, res) => {
    try {
      const msg = await Message.findByIdAndUpdate(
        req.params.id,
        { status: "rejected" },
        { new: true }
      );
      res.json(msg);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Fetch only approved messages (for Contact page reviews)
  router.get("/reviews", async (req, res) => {
    try {
      const reviews = await Message.find({ status: "approved" }).sort({ createdAt: -1 });
      res.json(reviews);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;   // 👈 this is required
