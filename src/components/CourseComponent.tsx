import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/services.css";
import { Button, Grid, TextField } from "@mui/material";
import { CalendarToday } from "@mui/icons-material";
import { Courses } from "../interface/Courses";
import { Link } from "react-router-dom";

const CourseComponent = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [courses, setCourses] = useState<Courses[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Courses[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  const filterCoursesByCourse = (searchTerm: string) => {
    const normalizedSearchTerm = searchTerm.toLowerCase();
    const filteredCourses = courses.filter((course) => {
      const normalizedCourseName = course.course.toLowerCase();
      return normalizedCourseName.includes(normalizedSearchTerm);
    });
    setFilteredCourses(filteredCourses);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const searchedTerm = event.target.value;
    setSearchTerm(searchedTerm);
    if (!searchedTerm) {
      setFilteredCourses(courses);
    } else {
      filterCoursesByCourse(searchedTerm);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://scheduleapp-api.vercel.app/api/courses"
        );
        const data = await response.json();
        setCourses(data);
        setFilteredCourses(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSendDate = async () => {
    try {
      const isoFormattedDate = startDate.toISOString().split('T')[0];
      const url = `http://localhost:3000/api/courses/filterByDate?startDate=${encodeURIComponent(
        isoFormattedDate
      )}`;

      const response = await fetch(url);
      const data = await response.json();
      setFilteredCourses(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      <h1 className="title">Courses</h1>
      <div className="date-picker-container">
        <Grid container direction="column" alignItems="flex-start" spacing={2}>
          <Grid item>
            <span>Select start date</span>
          </Grid>
          <Grid item container direction="row" alignItems="center" spacing={2}>
            <Grid item>
              <DatePicker
                selected={startDate}
                onChange={(date: Date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="Start Date"
                customInput={
                  <TextField
                    variant="outlined"
                    fullWidth
                    InputProps={{
                      endAdornment: <CalendarToday />,
                    }}
                  />
                }
              />
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={handleSendDate}>
                Send
              </Button>
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                placeholder="Search Course"
                fullWidth
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </Grid>
          </Grid>
        </Grid>
      </div>

      <div className="services-container">
        {filteredCourses.length === 0 ? (
          <div className="error-card">
            <h2>No se encontraron cursos en esta fecha</h2>
          </div>
        ) : (
          filteredCourses?.map((course) => (
            <Link to={`/course/${course?._id}`} key={course?._id}>
              <div
                key={course._id}
                className={`card ${isHovered ? "hovered" : ""}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <img
                  style={{ height: "15rem", width: "100%" }}
                  src={course.image}
                  alt={course.title}
                />
                <div className="card-body">
                  <h2 className="card-title">{course.title}</h2>
                  <p className="card-description">{course.description}</p>
                  <p className="card-description">
                    start date: {course.startDate}
                  </p>
                  <p className="card-title">
                    <span style={{ color: "black" }}>
                      course: {course.course}
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </>
  );
};

export default CourseComponent;
