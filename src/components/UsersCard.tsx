import { useState, useEffect } from "react";
import { Users } from "../interface/Users";

const UsersCard = () => {
  const [user, setUsers] = useState<Users[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://scheduleapp-api.vercel.app/api/users"
        );
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="users-list">
        <h1>User List</h1>
        <div className="cards-container">
          {user.map((user) => (
            <div key={user?._id} className="user-card">
              <h2>
                {user.name} {user.lastname}
              </h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.cellphone}</p>
            </div>
          ))}
        </div>
      </div>{" "}
    </>
    
  );
};

export default UsersCard;
