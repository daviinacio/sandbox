import React from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Layout from "./components/layout";

import Home from "./views/home";
import VideoRecord from "./views/video-record";

const projects = [
  { element: <VideoRecord />, path: "/video-record", name: "Video Record" }
]

export default class Router extends React.Component {
  render(){
    return(
      <BrowserRouter basename="/sandbox">
        <Layout>
          <Routes>
            {projects.map(project => (
              <Route
                key={project.element.key}
                element={project.element}
                path={project.path}
              />
            ))}
    
            <Route element={<Home projects={projects}  />} path="/" />
          </Routes>
        </Layout>
      </BrowserRouter>
    )
  }
}
