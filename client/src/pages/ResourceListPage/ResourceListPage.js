import React from "react";
import { Link } from "react-router-dom";

const ResourceListPage = () => {
  return (
    <main className="resource">
      <section>
        <p className="resource__title">VIDEOS</p>
        {/*       {videos.map((item) => (
          <Link to={`/resource/${item.id}`} key={item.id}>
            <ResourceCard video={item} />
          </Link>
        ))} */}
      </section>

      <section>
        <p className="resource__title">Documents</p>
        {/*           {videos.map((item) => (
          <Link to={`/resource/${item.id}`} key={item.id}>
            <ResourceCard video={item} />
          </Link>
        ))} */}
      </section>
    </main>
  );
};

export default ResourceListPage;
