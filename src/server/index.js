const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const Course = require("./models/Course");
const Quiz = require("./models/Quiz");
const Student = require("./models/Student");
const Teacher = require("./models/Teacher");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Started");
  });

app.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    let { email, password } = req.body;
    console.log(req.body);
    let result = await Student.findOne({ email: email, password: password });
    console.log(result);
    if (result) {
      console.log("Hi");
      return res.json(result);
    }
    result = await Teacher.findOne({ email: email, password: password });
    console.log(result);
    if (result) {
      return res.json(result);
    }
    return res.status(401).json({ error: "Invalid Credentials" });
  } catch {
    res.status(404).json({ error: "Invalid Credentials" });
  }
});

app.post("/new_course/:name", async (req, res) => {
  try {
    let name = req.params.name;
    let { subject } = req.body;
    let c = new Course({ subject: subject, teacher: name });
    console.log(c);
    let teacher = await Teacher.findOne({ name: name });
    teacher.subjects.push(subject);
    teacher.save();
    c.save();
  } catch {
    res.json({ error: "Something went wrong please try again" });
  }
});

app.post("/course", async (req, res) => {
  let { subject, teacher } = req.body;
  console.log(req.body);
  let response = await Course.findOne({ subject: subject, teacher: teacher });
  console.log(response);
  return res.status(200).json(response);
});

app.get("/teacher/:id", async (req, res) => {
  let response = await Teacher.findById(req.params.id);
  res.json(response);
});

app.post("/new-course/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { name } = req.body;
    let course = await Course.findById(id);
    course.chapters.push({ name: name });
    course.save();
    res.json({ success: "added Chapter" });
  } catch {
    res.json({ error: "Something went wrong, please try again" });
  }
});

app.post("/new-subtopic/:id", async (req, res) => {
  try {
    let id = req.params.id;
    let { name, chapNo } = req.body;
    let course = await Course.findById(id);
    course.chapters[chapNo].subtopics.push({ name: name });
    course.save();
    res.json({ success: "added Subtopic" });
  } catch {
    res.json({ error: "Something went wrong, please try again" });
  }
});

app.post("/subtopic/:id", async (req, res) => {
  try {
    let body = req.body;
    let course = await Course.findById(req.params.id);
    console.log(course);
    course.chapters[body.chapNo].subtopics[body.subTopicNo].video =
      body.subTopicData.video;
    course.chapters[body.chapNo].subtopics[body.subTopicNo].pdf =
      body.subTopicData.pdf;
    course.chapters[body.chapNo].subtopics[body.subTopicNo].material =
      body.subTopicData.materials;
    course.save();
  } catch (e) {
    console.error(e);
  }
});

app.listen(3004, () => {
  console.log("Started");
});
