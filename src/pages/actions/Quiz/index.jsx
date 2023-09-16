import { useState, useEffect } from "react";
import { useParams } from "react-router";
import "./index.scss";
const Quiz = () => {
  const baseUrl = process.env.REACT_APP_API_URL;

  const { subject } = useParams();
  const [quizzes, setQuizzes] = useState([]);
  const [values, setValues] = useState({
    questions: [{ correctAnswer: "", options: [""], question: "" }],
  });
  const subjects = ["DSA", "Java", "ADS", "Web Programming"];

  const change = (e, param) => {
    setValues({ ...values, [param]: e.target.value });
  };

  useEffect(() => {
    const getQuizNames = async () => {
      let response = await fetch(`${baseUrl}/quizzes/${subject}`)
        .then((data) => data.json())
        .then((data) => data);
      setQuizzes(response);
    };
    getQuizNames();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let v = { ...values };
    v.questions.forEach((q) => {
      q.options.push(q.correctAnswer);
    });
    v.subject = subject;
    let response = await fetch(`${baseUrl}/new-quiz`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(v),
    })
      .then((data) => data.json())
      .then((data) => data);
  };

  const questionInput = (i, e, param) => {
    let q = values.questions;
    q[i][param] = e.target.value;
    setValues({ ...values, questions: q });
  };

  return (
    <>
      <div id="edit">
        <div className="leftBar">
          {quizzes.map((quiz) => {
            return (
              <div className="chapter">
                <div className="chapter-head">{quiz.name}</div>
              </div>
            );
          })}
        </div>
        <div className="main">
          <form action="" id="form-new" onSubmit={handleSubmit}>
            <div className="line">
              <p>Quiz Name</p>
              <input
                required
                type="text"
                name="name"
                value={values.name || ""}
                onChange={(e) => {
                  change(e, "name");
                }}
              />
            </div>
            <div className="line">
              <p>Subject</p>
              <select name="subject" value={values.subject} required id="">
                {subjects.map((sub) => {
                  return <option value={sub}>{sub}</option>;
                })}
              </select>
            </div>
            {values.questions.map((q, i) => {
              return (
                <>
                  <div className="line">
                    <input
                      required
                      placeholder="Question"
                      type="text"
                      value={q.question || ""}
                      onChange={(e) => {
                        questionInput(i, e, "question");
                      }}
                    />
                    <input
                      type="text"
                      required
                      placeholder="Correct Answer"
                      value={q.correctAnswer || ""}
                      onChange={(e) => {
                        questionInput(i, e, "correctAnswer");
                      }}
                    />
                  </div>
                  {q.options.map((o, j) => {
                    return (
                      <div className="line">
                        <input
                          required
                          placeholder="Other Options"
                          type="text"
                          value={o || ""}
                          onChange={(e) => {
                            let ques = values.questions;
                            ques[i].options[j] = e.target.value;
                            setValues({ ...values, questions: ques });
                          }}
                        />
                      </div>
                    );
                  })}
                  <button
                    onClick={() => {
                      let ques = values.questions;
                      ques[i].options.push("");
                      setValues({ ...values, questions: ques });
                    }}
                  >
                    Add Option
                  </button>
                </>
              );
            })}
            <button
              onClick={() => {
                let ques = values.questions;
                ques.push({ correctAnswer: "", options: [""], question: "" });
                setValues({ ...values, questions: ques });
              }}
            >
              Add Question
            </button>
            <button className="apply" type="submit">
              Create Quiz
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Quiz;
