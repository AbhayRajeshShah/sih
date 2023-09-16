import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import "./Course.scss";
import empty from "../../../assets/images/empty.svg";

const Course = () => {
  let { course_details } = useParams();
  const cookies = new Cookies();
  const baseUrl = process.env.REACT_APP_API_URL;
  let subject_name = course_details.split("_")[0];
  let teacher_name = course_details.split("_")[1];
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(true);
  const [chapNo, setChapNo] = useState(-1);
  //   const [load, setLoad] = useState(false);
  const [subTopicNo, setSubTopicNo] = useState(-1);
  const [user, setUser] = useState({});
  const [course, setCourse] = useState({});

  useEffect(() => {
    const getCourse = async () => {
      let response = await fetch(`${baseUrl}/course-content`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ subject: subject_name, teacher: teacher_name }),
      })
        .then((data) => data.json())
        .then((data) => data);
      setCourse(response);
    };
    setUser(cookies.get("user"));
    getCourse();
  }, []);

  useEffect(() => {
    const addView = async () => {
      let response = await fetch(`${baseUrl}/course/${course._id}`)
        .then((data) => data.json())
        .then((data) => data);
    };
    if (chapNo > -1 && subTopicNo > -1) {
      addView();
    }
  }, [chapNo, subTopicNo]);

  return (
    <>
      <div id="edit">
        <div className="leftBar">
          {" "}
          {course.chapters ? (
            <>
              {course.chapters.map((chapter, i) => {
                return (
                  <Chapter
                    chapter={chapter}
                    setType={setType}
                    setModal={setModal}
                    setChapNo={setChapNo}
                    i={i}
                    setSubTopicNo={setSubTopicNo}
                  />
                );
              })}
            </>
          ) : (
            ""
          )}
        </div>
        <div className="main">
          {chapNo > -1 && subTopicNo > -1 ? (
            <>
              {course.chapters[chapNo].subtopics[subTopicNo].pdf ? (
                <iframe
                  className="pdf"
                  src={course.chapters[chapNo].subtopics[
                    subTopicNo
                  ].pdf.replace("view", "preview")}
                  title="Gdrive pdf Viewer"
                  frameborder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                ""
              )}
              {course.chapters[chapNo].subtopics[subTopicNo].video ? (
                <iframe
                  width="560"
                  height="315"
                  src={course.chapters[chapNo].subtopics[subTopicNo].video}
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share;fullscreen"
                  allowFullScreen
                ></iframe>
              ) : (
                ""
              )}
            </>
          ) : (
            <img src={empty} alt="" />
          )}
        </div>
      </div>
    </>
  );
};

const Chapter = ({
  chapter,
  o,
  setType,
  setModal,
  i,
  setChapNo,
  setSubTopicNo,
}) => {
  const [open, setOpen] = useState(o ? o : false);
  return (
    <>
      <div className="chapter">
        <div
          className="chapter-head"
          onClick={() => {
            open ? setChapNo(-1) : setChapNo(i);
            setOpen(!open);
          }}
        >
          {chapter.name}
          {open ? (
            <i className="fa-solid fa-chevron-up"></i>
          ) : (
            <i className="fa-solid fa-chevron-down"></i>
          )}
        </div>
        {open ? (
          <div className="subTopicSection">
            {chapter.subtopics.map((subTopic, j) => {
              return (
                <div
                  className="subtopic-head"
                  onClick={() => {
                    setSubTopicNo(j);
                  }}
                >
                  {subTopic.name}
                </div>
              );
            })}
            <button
              className="addSubTopic"
              onClick={() => {
                setType(false);
                setModal(true);
              }}
            >
              Add Subtopic
            </button>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default Course;
