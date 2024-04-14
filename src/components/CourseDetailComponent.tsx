import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Courses } from "../interface/Courses";
import Navbar from "./Navbar";
import { Button } from "@mui/material";

const CourseDetailComponent = ({}) => {
  const { courseId } = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Courses | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(
          `https://scheduleapp-api.vercel.app/api/course/${courseId}`
        );
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar></Navbar>
      <div className="course-details">
        <img
          style={{ width: "100%", height: "20em" }}
          src={course.image}
          alt={course.title}
        />
        <h1 style={{ display: "flex", justifyContent: "center" }}>
          {course.title}
        </h1>
        <h2>{course.description}</h2>
        <h3>Start date: {course.startDate}</h3>
        <h4>Course: {course.course}</h4>
        <h4>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          accusamus atque dolorem corporis maxime corrupti recusandae placeat
          quaerat. Optio laboriosam a molestiae est? Necessitatibus, nam
          laudantium ipsa in labore eos.
        </h4>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="contained">Subscribe !</Button>
        </div>
      </div>
    </>
  );
};

export default CourseDetailComponent;
