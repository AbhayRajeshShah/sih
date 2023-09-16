const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  questions: [
    {
      question: { type: String },
      correctAnswer: { type: String },
      answers: [{ type: String }],
    },
  ],
  name: { type: String, required: true },
  scores: [{ name: { type: String }, score: { type: Number } }],
  course: [{ type: String }],
  subtopics: [{ type: String }],
  subject: { type: String, required: true },
  chapters: [{ type: String }],
  teacher: { type: String },
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
