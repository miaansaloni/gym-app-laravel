import axios from "axios";
import { useEffect, useState } from "react";

const AdminDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAdminDashboard = async () => {
      try {
        const response = await axios.get("/api/v1/admin-dashboard");
        setCourses(response.data);
      } catch (err) {
        setError(err);
        console.error("There was an error fetching the admin dashboard data!", err);
      }
    };

    fetchAdminDashboard();
  }, []);

  const handleAcceptBooking = async (courseId, userId) => {
    try {
      const response = await axios.patch(`/api/v1/update-booking-status/${courseId}/${userId}`);
      console.log(response.data.message);

      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course.id === courseId) {
            return {
              ...course,
              users: course.users.map((user) =>
                user.id === userId ? { ...user, pivot: { ...user.pivot, status: "accepted" } } : user
              ),
            };
          }
          return course;
        })
      );
    } catch (err) {
      console.error("There was an error updating the booking status!", err);
    }
  };

  const handleRejectBooking = async (courseId, userId) => {
    try {
      const response = await axios.patch(`/api/v1/update-booking-status/${courseId}/${userId}`, {
        status: "rejected",
      });
      console.log(response.data.message);

      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course.id === courseId) {
            return {
              ...course,
              users: course.users.map((user) =>
                user.id === userId ? { ...user, pivot: { ...user.pivot, status: "rejected" } } : user
              ),
            };
          }
          return course;
        })
      );
    } catch (err) {
      console.error("There was an error updating the booking status!", err);
    }
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {error ? (
        <p>There was an error fetching the admin dashboard data.</p>
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
              <ul>
                {course.users.map((user) => (
                  <li key={user.id}>
                    <p>
                      <strong>User Name:</strong> {user.name}
                    </p>
                    <p>
                      <strong>Status:</strong> {user.pivot.status}
                    </p>
                    <button onClick={() => handleAcceptBooking(course.id, user.id)}>Accept Booking</button>
                    <button onClick={() => handleRejectBooking(course.id, user.id)}>Reject Booking</button>{" "}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminDashboard;
