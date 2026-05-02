import React, { Children, use, useEffect, useState } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import axios from "axios";

import useAuthStore from "./Stores/Auth.Store";

import RegisterPage from "./pages/Auth/RegisterPage";
import LoginPage from "./pages/Auth/LoginPage";
import VerificationPage from "./pages/Auth/VerificationPage";
import ResetPasswordPage from "./pages/Auth/ResetPasswordPage";

import DirectMessagePage from "./pages/app/DirectMessagePage";
import SettingsPage from "./pages/app/SettingsPage";
import ServerPage from "./pages/app/ServerPage";
import ChannelSettings from "./pages/app/ChannelSettings";
import ServerSettings from "./pages/app/ServerSettings";

import LoadingUi from "./Components/LoadingUi";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  if (loading) return children;
  if (!isAuthenticated || !user?.isVerified) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  if (loading) return children;

  if (isAuthenticated && user) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const ProtectedSettingsRoutes = ({ children }) => {
  const { isAuthenticated, user, loading } = useAuthStore();
  const { serverId } = useParams();
  const [server, setServer] = useState(null);

  const [checkingServer, setCheckingServer] = useState(true);

  useEffect(() => {
    const fetchdata = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/server/load-server/${serverId}`,
          { withCredentials: true },
        );

        if (response.data.success) {
          setServer(response.data.server);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setCheckingServer(false);
      }
    };

    fetchdata();
  }, [serverId]);

  if (loading || checkingServer) return null;

  if (!isAuthenticated || !user?.isVerified) {
    return <Navigate to="/login" replace />;
  }

  if (!server || server?.owner !== user?._id) {
    return <Navigate to="/" replace />;
  }

  return children;
};

const App = () => {
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <Routes>
      {/*  pages */}

      <Route
        path="/"
        element={
          <ProtectedRoutes>
            <DirectMessagePage />
          </ProtectedRoutes>
        }
      />

      {/* 

      <Route
        path="/settings"
        element={
          <ProtectedRoutes>
            <SettingsPage
              user={user}
              setUser={setUser}
              setIsAuthentication={setIsAuthentication}
            />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/server/:serverId"
        element={
          <ProtectedRoutes>
            <ServerPage user={user} setUser={setUser} />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/server/:serverId/channel/:channelId/settings"
        element={
          <ProtectedRoutes>
            <ProtectedSettingsRoutes>
              <ChannelSettings setUser={setUser} user={user} />
            </ProtectedSettingsRoutes>
          </ProtectedRoutes>
        }
      />

      <Route
        path="/server/:serverId/settings"
        element={
          <ProtectedRoutes>
            <ProtectedSettingsRoutes>
              <ServerSettings />
            </ProtectedSettingsRoutes>
          </ProtectedRoutes>
        }
      /> */}

      {/* Auth pages */}

      <Route
        path="/register"
        element={
          <RedirectAuthenticatedUser>
            <RegisterPage />
          </RedirectAuthenticatedUser>
        }
      />
      <Route
        path="/verify-email"
        element={
          <RedirectAuthenticatedUser>
            <VerificationPage />
          </RedirectAuthenticatedUser>
        }
      />

      <Route
        path="/login"
        element={
          <RedirectAuthenticatedUser>
            <LoginPage />
          </RedirectAuthenticatedUser>
        }
      />

      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
    </Routes>
  );
};

export default App;
