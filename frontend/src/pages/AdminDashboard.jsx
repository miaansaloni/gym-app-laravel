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
      const response = await axios.patch(`/api/v1/update-booking-status/${courseId}/${userId}`, {
        status: "accepted",
      });
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
      {error ? (
        <h1>Error: unauthorized</h1>
      ) : (
        <>
          <h1>Admin Dashboard</h1>
          <table>
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Slot</th>
                <th>User Name</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) =>
                course.users.map((user) => (
                  <tr key={`${course.id}-${user.id}`}>
                    <td>{course.activity.name}</td>
                    <td>
                      {course.slot.day} {course.slot.start_hour}
                    </td>
                    <td>{user.name}</td>
                    <td>{user.pivot.status}</td>
                    <td>
                      {user.pivot.status === "pending" ? (
                        <>
                          <button onClick={() => handleAcceptBooking(course.id, user.id)}>Accept Booking</button>
                          <button onClick={() => handleRejectBooking(course.id, user.id)}>Reject Booking</button>
                        </>
                      ) : (
                        " "
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
