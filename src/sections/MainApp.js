import React from "react";
import Vote from "./Vote";
import Splash from "./Splash";
import Donate from "./Donate";
import AppFooter from "./AppFooter";
import PageNotFound from "./PageNotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppModal from "../components/AppModal";
import ConnectWalletModal from "../components/ConnectWalletModal";
import ProjectView from "./ProjectView";

const MainApp = () => {
  return (
    <div className="mainapp_container">
      <AppModal />
      <ConnectWalletModal />

      <div className="app_pages_cover">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/vote" element={<Vote />} />
            <Route path="/donate" element={<Donate />} />
            <Route path="/preview/:id" element={<ProjectView />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </div>

      <AppFooter />
    </div>
  );
};

export default MainApp;
