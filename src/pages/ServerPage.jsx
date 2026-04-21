import React, { useEffect, useState } from "react";
import Sidebar from "../Components/Sidebar";
import axios from "axios";
import { useParams } from "react-router-dom";
import ServerSideBar from "../Components/ServerSideBar";

const ServerPage = ({ setUser, user }) => {
  const { serverId } = useParams();
  const [server, setServer] = useState(null);

  useEffect(() => {
    const handleLoadServer = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/server/load-server/${serverId}`,
          { withCredentials: true },
        );

        if (response.data.success) {
          setServer(response?.data.server);
        }
      } catch (error) {
        console.log(error);
      }
    };

    handleLoadServer();
  }, [serverId]);

  return (
    <>
      <Sidebar setUser={setUser} user={user} />
      <ServerSideBar server={server} />
    </>
  );
};

export default ServerPage;
