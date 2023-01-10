import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";

import VideoRecord from "./views/video-record";

const Router = () => {
  return(
    <BrowserRouter basename="/sendbox">
      <Routes>
        <Route element={<VideoRecord />}  path="/video-record" />
      </Routes>
    </BrowserRouter>
  )
}

export default Router;