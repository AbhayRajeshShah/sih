import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Course = () => {
  let { course_details } = useParams();
  let subject_name = course_details.split("_")[0];
  let teacher_name = course_details.split("_")[1];
  const [course, setCourse] = useEffect(() => {}, []);
};
