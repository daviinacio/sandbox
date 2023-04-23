import React from "react";
import { Link } from "react-router-dom";

export default function Home({ projects, teste }){
  return (
    <div className="container mt-3">
      <SectionList title={"Projetos"} list={projects} />
    </div>
  )
}

function SectionList({ title, list }) {
  return Array.isArray(list) && (
    <section>
      <h3>{title}</h3>
      <ul>
        {list.map((item, index) => (
          <li key={item.element.key}>
            <Link to={item.path}>{item.name}</Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
