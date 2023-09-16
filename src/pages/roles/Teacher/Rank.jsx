import { useState, useEffect } from "react";
import Leaderboard from "../../../components/leaderboard";
import "./Rank.scss";

const Rank = () => {
  const [subject, setSubject] = useState("DSA");
  const baseUrl = process.env.REACT_APP_API_URL;
  const subjects = ["DSA", "Java", "ADS", "Web Programming"];
  const [courses, setCourses] = useState([]);

  const getCourses = async () => {
    let response = await fetch(`${baseUrl}/getCourses/${subject}`)
      .then((data) => data.json())
      .then((data) => data);
    setCourses(response.sort((a, b) => b.creds - a.creds));
  };

  useEffect(() => {
    getCourses();
  }, [subject]);

  return (
    <div className="l">
      <select
        name="subject"
        value={subject}
        onChange={(e) => {
          setSubject(e.target.value);
        }}
        id=""
      >
        {subjects.map((sub) => {
          return <option value={sub}>{sub}</option>;
        })}
      </select>
      <Leaderboard users={courses} />
    </div>
  );
};

export default Rank;
