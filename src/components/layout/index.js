import React, { Fragment } from "react"
import { Link } from "react-router-dom";

export default function Layout({ children }){
  return (
    <Fragment>
      <header className="page-header d-flex align-items-center">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-auto">
              <Link to={"/"} className="page-title">sandbox</Link>
            </div>
          </div>
        </div>
      </header>

      <div className="wrapper">
        {children}
      </div>
    </Fragment>
  );
}
