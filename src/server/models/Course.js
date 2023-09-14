const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  subject: { type: String, required: true },
  teacher: { type: String, required: true },
  chapters: [
    {
      name: { type: String, required: true },
      review: { type: Number },
      subtopics: [
        {
          name: { type: String, required: true },
          discussion: [
            {
              chat_title: {
                type: String,
                required: true,
              },
              chats: [{ chat: { type: String }, role: { type: Number } }],
            },
          ],
          pdf: { type: String },
          views: [{ type: String }],
          video: { type: String, required: false },
          material: [{ type: String }],
        },
      ],
    },
  ],
  creds: { type: Number, default: 0 },
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
