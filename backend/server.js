import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/generate-lesson", async (req, res) => {
  try {
    const { grade, subject, topic, duration, difficulty, curriculum } = req.body;

    const prompt = `
Create a ${duration}-minute lesson plan.

Grade: ${grade}
Subject: ${subject}
Topic: ${topic}
Difficulty: ${difficulty}
Curriculum: ${curriculum}

Include:
- Learning Objectives
- Introduction
- Teaching Activities
- Assessment
- Homework
`;

    const response = await axios.post(
      "https://api-inference.huggingface.co/models/google/flan-t5-large",
      {
        inputs: prompt
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HF_API_KEY}`
        }
      }
    );

    res.json({ lesson: response.data[0]?.generated_text });

  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ detail: "Failed to generate lesson plan" });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});