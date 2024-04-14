import React, { useState, useEffect } from "react";
import axios from "axios";
import { Users } from "../interface/Users";
import "../styles/Admin.css";
import moment from "moment";

const Admin: React.FC = () => {
  const [users, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<Users[]>(
          "https://scheduleapp-api.vercel.app/api/users"
        );
        const formattedUsers = response.data.map(user => ({
            ...user,
            start_date: moment(user.start_date).format("DD/MM/YYYY")
          }));
        setUsers(formattedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <h1>Control Panel</h1>
      </nav>

      {/* User Dashboard */}
      <div className="user-dashboard">
        <h2>Users list</h2>
        <div className="user-cards">
          {users.map((user) => (
            <div key={user._id} className="user-card">
              <h3>{`${user.name} ${user.lastname}`}</h3>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Cellphone:</strong> {user.cellphone}
              </p>
              <p>
                <strong>Country:</strong> {user.country}
              </p>
              <p>
                <strong>Current Country:</strong> {user.current_country}
              </p>
              <p>
                <strong>Start Date:</strong> {user.start_date}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Admin;
