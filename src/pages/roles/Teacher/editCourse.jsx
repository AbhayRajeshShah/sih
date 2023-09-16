import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import { useNavigate, useParams } from "react-router-dom";
import "./editCourse.scss";

const EditCourse = () => {
  const { subject } = useParams();
  const baseUrl = process.env.REACT_APP_API_URL;
  const [course, setCourse] = useState({});
  const navigate = useNavigate();
  const cookies = new Cookies();
  const [values, setValues] = useState({ material: [""] });
  const [newChap, setNewChap] = useState("");
  const [modal, setModal] = useState(false);
  const [type, setType] = useState(true);
  const [chapNo, setChapNo] = useState(-1);
  const [load, setLoad] = useState(false);
  const [subTopicNo, setSubTopicNo] = useState(-1);

  let user = cookies.get("user");

  useEffect(() => {
    console.log(subject);
    const getCourse = async () => {
      let response = await fetch(`${baseUrl}/course`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: subject, teacher: user.name }),
      })
        .then((data) => data.json())
        .then((data) => data);
      console.log(response);
      setCourse(response);
    };
    if (user.role) {
      getCourse();
    } else {
      navigate("/");
    }
  }, []);

  useEffect(() => {
    setLoad(true);
  }, [course]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { video, pdf } = e.target;
    let materials = values.material.filter((m) => m !== "");
    let response = await fetch(`${baseUrl}/subtopic/${course._id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        subTopicData: {
          video: video.value,
          pdf: pdf.value,
          materials: materials,
        },
        chapNo: chapNo,
        subTopicNo: subTopicNo,
      }),
    })
      .then((data) => {
        data.json();
      })
      .then((data) => data);
  };

  useEffect(() => {
    if (chapNo > -1 && subTopicNo > -1) {
      setValues({ ...course.chapters[chapNo].subtopics[subTopicNo] });
    }
  }, [chapNo, subTopicNo]);

  const addNewChap = async () => {
    if (type) {
      let response = await fetch(`${baseUrl}/new-course/${course._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newChap }),
      })
        .then((data) => data.json())
        .then((data) => data);
      if (response.error) {
        alert(response.error);
      }
    } else {
      let response = await fetch(`${baseUrl}/new-subtopic/${course._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newChap, chapNo: chapNo }),
      })
        .then((data) => data.json())
        .then((data) => data);
      if (response.error) {
        alert(response.error);
      }
    }
  };

  return (
    <div id="edit">
      {modal ? (
        <div className="modal">
          <div className="modal-content">
            <input
              type="text"
              placeholder={type ? "New Chapter" : "New Subtopic"}
              value={newChap}
              onChange={(e) => {
                setNewChap(e.target.value);
              }}
            />
            <button
              className="apply"
              onClick={() => {
                addNewChap();
              }}
            >
              Add Chapter
            </button>
            <div
              className="x"
              onClick={() => {
                setModal(false);
              }}
            >
              X
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      <div className="leftBar">
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
        <button
          className="addChapter"
          onClick={() => {
            setType(true);
            setModal(true);
          }}
        >
          Add Chapter
        </button>
      </div>
      {subTopicNo > -1 ? (
        <form className="editCourse" action="" onSubmit={handleSubmit}>
          <div className="vertical">
            <p>Video Url</p>
            <input
              type="text"
              value={values.video || ""}
              onChange={(e) => {
                setValues({ ...values, video: e.target.value });
              }}
              name="video"
            />
          </div>
          <div className="vertical">
            <p>Pdf Url</p>
            <input
              type="text"
              value={values.pdf || ""}
              onChange={(e) => {
                setValues({ ...values, pdf: e.target.value });
              }}
              name="pdf"
            />
          </div>
          <div className="vertical">
            <p>Material</p>
            {values.material.map((material, i) => {
              return (
                <input
                  type="text"
                  value={material}
                  onChange={(e) => {
                    let c = [...values.materials];
                    c[i] = e.target.value;
                    setValues({ ...values, materials: c });
                  }}
                />
              );
            })}
          </div>
          <div className="vertical">
            <button
              onClick={() => {
                let c = [...values.material];
                c.push("");
                setValues({ ...values, material: c });
              }}
            >
              +
            </button>
          </div>
          <div className="vertical">
            <button type="submit" className="primary-btn">
              Add Subtopic Content
            </button>
          </div>
        </form>
      ) : (
        ""
      )}
    </div>
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

export default EditCourse;
