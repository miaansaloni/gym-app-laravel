import React, { useEffect, useState } from "react";
import axios from "axios";

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get("/api/user-profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUser(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : "An error occurred");
      }
    };

    fetchUserProfile();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>User Profile</h1>
      <img
        className="me-2"
        src={user.profile_image}
        alt=""
        style={{ height: "50px", width: "50px", borderRadius: "50%" }}
      />{" "}
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>Gender:</strong> {user.gender}
      </p>
      <p>
        <strong>Phone Number:</strong> {user.telephone}
      </p>
    </div>
  );
};

export default ProfileComponent;
