import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar";

const Homepage = ({ user, setUser, setIsAuthentication }) => {
  const userDOB = new Date(user?.DOB);
  const createdAt = new Date(user?.createdAt);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/logout",
        {},
        { withCredentials: true },
      );

      if (response.data.success) {
        setUser(null);
        setIsAuthentication(false);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Sidebar user={user} />
    </div>
  );
};

export default Homepage;
