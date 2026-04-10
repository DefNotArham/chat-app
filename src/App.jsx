import React from "react";
import { Routes, Route } from "react-router-dom";

import RegisterPage from "./pages/RegisterPage";

const App = () => {
  return (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default App;
