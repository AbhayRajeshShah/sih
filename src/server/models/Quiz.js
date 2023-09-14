const mongoose = require("mongoose");

const QuizSchema = new mongoose.Schema({
  questions: [
    {
      question: { type: String },
      correctAnswer: { type: String },
      answers: [{ type: String }],
    },
  ],
  scores: [{ name: { type: String }, score: { type: Number } }],
  course: [{ type: String }],
  subtopics: [{ type: String }],
});

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = Quiz;
