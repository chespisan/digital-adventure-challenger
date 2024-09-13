import { Routes, Route } from "react-router-dom";

import {
  AuthPage,
  HomePage,
  OnboardingPage,
  PhotoManagementPage,
} from "../pages";
import { useAuth } from "../common/hooks";

export const RouterApp = () => {
  useAuth();

  return (
    <Routes>
      <Route path="home" element={<HomePage />} />

      <Route path="auth" element={<AuthPage />} />
      <Route path="onboarding" element={<OnboardingPage />} />
      <Route path="photo" element={<PhotoManagementPage />} />
    </Routes>
  );
};
