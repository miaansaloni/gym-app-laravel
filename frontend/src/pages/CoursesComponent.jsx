import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CoursesComponent = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("/api/v1/courses");
        setCourses(response.data);
      } catch (err) {
        setError(err);
        console.error("There was an error fetching the courses!", err);
      }
    };

    fetchCourses();
  }, []);

  const handleBookCourse = async (courseId) => {
    try {
      const response = await axios.post("/api/v1//book-course/{courseId}", {
        course_id: courseId,
        user_id: user.id,
      });
      console.log(response.data.message);
    } catch (err) {
      console.error("There was an error booking the course!", err);
    }
  };

  return (
    <div>
      <h1>Courses List</h1>
      {error ? (
        <p>There was an error fetching the courses.</p>
      ) : (
        <ul>
          {courses.map((course) => (
            <li key={course.id}>
              <h2>{course.activity.name}</h2>
              <p>
                <strong>Description:</strong> {course.activity.description}
              </p>
              <p>
                <strong>Room:</strong> {course.location}
              </p>
              <p>
                <strong>Day:</strong> {course.slot.day}
              </p>
              <p>
                <strong>Starts at:</strong> {course.slot.start_hour}
              </p>
              {user?.role === "user" && <button onClick={() => handleBookCourse(course.id)}>Book Course</button>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CoursesComponent;
