import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import "./index.scss";
const Teacher = () => {
  const subjects = ["DSA", "Java", "ADS", "Web Programming"];
  const cookies = new Cookies();
  const [teacher, setTeacher] = useState({});
  const [drawer, setDrawer] = useState(false);
  const [drawerVals, setDrawerVals] = useState({});
  const baseUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  useEffect(() => {
    let teacher = cookies.get("user");
    if (teacher) {
      if (!teacher.role) {
        navigate("/student");
      }
    } else {
      navigate("/signin");
    }
    const getTeacherData = async () => {
      let response = await fetch(`${baseUrl}/teacher/${teacher._id}`)
        .then((data) => data.json())
        .then((data) => data);
      setTeacher(response);
    };
    getTeacherData();
  }, []);

  const change = (val, param) => {
    setDrawerVals({ ...drawerVals, [param]: val });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let { subject } = e.target;
    let response = await fetch(`${baseUrl}/new_course/${teacher.name}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: subject.value }),
    })
      .then((data) => data.json())
      .then((data) => data);
    if (response.error) {
      alert(response.error);
    }
  };

  return (
    <>
      <div id="teacherHome">
        <div className="subjectCards">
          {teacher.role ? (
            <>
              {teacher.subjects.map((sub) => {
                return (
                  <div className="subjectCard">
                    <p className="head">{sub}</p>
                    <div className="buttons">
                      <button
                        className="view"
                        onClick={() => {
                          navigate(`/teacher/${sub}`);
                        }}
                      >
                        View
                      </button>
                      <button className="edit">Edit</button>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            ""
          )}
          <div
            className="addNewSub"
            onClick={() => {
              setDrawer(true);
            }}
          >
            <p>+</p>
            <p className="desc">Add New Course</p>
          </div>
        </div>
      </div>
      {drawer ? (
        <div className="rightDrawer">
          <div
            className="x"
            onClick={() => {
              setDrawer(false);
            }}
          >
            X
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div className="vertical">
              <p>Select Subject</p>
              <select
                name="subject"
                value={drawerVals.subject || subjects[0]}
                onChange={(e) => {
                  change(e.target.value, "subject");
                }}
                id=""
              >
                {subjects.map((sub) => {
                  if (!teacher.subjects.includes(sub)) {
                    return <option value={sub}>{sub}</option>;
                  }
                })}
              </select>
            </div>
            <div className="vertical">
              <p>Teacher Name</p>
              <input type="text" disabled value={teacher.name} />
            </div>
            <button className="add" type="submit">
              Create Course
            </button>
          </form>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Teacher;
