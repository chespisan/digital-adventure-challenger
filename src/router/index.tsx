import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

import {
  AuthPage,
  HomePage,
  OnboardingPage,
  PhotoManagementPage,
  UploadPage,
} from "../pages";
import { useAuth } from "../common/hooks";
import { MenuBarComponent, ModalComponent } from "../common/components";
import { useModalStore } from "../common/context/hooks";

export const RouterApp = () => {
  useAuth();
  const isShow = useModalStore((state) => state.isShow);

  return (
    <>
      <Toaster richColors={true} position="top-center" />
      {!location.pathname.includes("/onboarding") &&
        !location.pathname.includes("/auth") &&
        !location.pathname.includes("/photo") && <MenuBarComponent />}
      {isShow && <ModalComponent />}
      <Routes>
        <Route path="home" element={<HomePage />} />
        <Route path="upload" element={<UploadPage />} />

        <Route path="auth" element={<AuthPage />} />
        <Route path="onboarding" element={<OnboardingPage />} />
        <Route path="photo" element={<PhotoManagementPage />} />
      </Routes>
    </>
  );
};
