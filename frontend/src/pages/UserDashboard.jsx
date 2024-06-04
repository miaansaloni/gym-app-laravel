import axios from "axios";
import { useEffect, useState } from "react";

const UserDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserCourses = async () => {
      try {
        const response = await axios.get("/api/v1/user-dashboard");
        setCourses(response.data.courses);
      } catch (err) {
        setError(err);
        console.error("Error fetching your courses!", err);
      }
    };

    fetchUserCourses();
  }, []);

  const handleDeleteBooking = async (courseId) => {
    try {
      const response = await axios.delete(`/api/v1/delete-booking/${courseId}`);
      console.log(response.data.message);

      // Rimuove il corso dalla lista dei corsi prenotati
      setCourses(courses.filter((course) => course.id !== courseId));
    } catch (err) {
      console.error("Error deleting the booking!", err);
    }
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      {error ? (
        <p>Error fetching your courses.</p>
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
              <p>
                <strong>Status:</strong> {course.pivot.status}
              </p>
              <button onClick={() => handleDeleteBooking(course.id)}>Delete Booking</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserDashboard;
