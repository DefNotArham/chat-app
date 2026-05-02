import axios from "axios";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../Components/Sidebar";
import DirectMessageSidebar from "../../Components/DirectMessageSidebar";

const DirectMessagePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <DirectMessageSidebar />
    </div>
  );
};

export default DirectMessagePage;
