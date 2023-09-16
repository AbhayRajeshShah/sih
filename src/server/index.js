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

app.post("/course-content", async (req, res) => {
  let course = await Course.findOne(req.body);
  res.json(course);
});

app.get("/quizzes/:subject", async (req, res) => {
  try {
    let quizzes = await Quiz.find(
      { subject: req.params.subject },
      { _id: 0, name: 1 }
    );
    return res.json(quizzes);
  } catch {}
});

app.post("/new-quiz", async (req, res) => {
  try {
    let quiz = new Quiz(req.body);
    quiz.save();
    res.json({ success: "Success" });
  } catch {
    res.json({ error: "Could not add Quiz" });
  }
});

app.post("/course/:id", async (req, res) => {
  let { chapNo, subTopicNo, name } = req.body;
  let course = await Course.findById(req.params.id);
  let views = course.chapters[chapNo].subtopics[subTopicNo].views;
  let alreadyViewed = false;
  views.forEach((view) => {
    if (view === name) {
      alreadyViewed = true;
    }
  });
  if (!alreadyViewed) {
    course.creds += 5;
    course.chapters[chapNo].subtopics[subTopicNo].views.push(name);
  }
  course.save();
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
    course.creds += 50;
    course.chapters[chapNo].subtopics.push({ name: name });
    course.save();
    res.json({ success: "added Subtopic" });
  } catch {
    res.json({ error: "Something went wrong, please try again" });
  }
});

app.get("/getCourses/:subject", async (req, res) => {
  let courses = await Course.find({ subject: req.params.subject });
  console.log(req.params.subject);
  res.json(courses);
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

app.get("/:subject", async (req, res) => {
  try {
    const courses = await Course.find(
      { subject: req.params.subject },
      { _id: 0, teacher: 1 }
    );
    res.json(courses);
  } catch (e) {
    console.error(e);
  }
});

app.listen(3004, () => {
  console.log("Started");
});
