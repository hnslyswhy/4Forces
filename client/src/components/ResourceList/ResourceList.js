import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getResourceList } from "../../utilities/api";
import ResourceCard from "../../components/ResourceCard/ResourceCard";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import "./ResourceList.scss";

const ResourceList = (props) => {
  const [videos, setVideos] = useState(null);
  const [docs, setDocs] = useState(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    Promise.all([getResourceList("video"), getResourceList("doc")])
      .then((results) => {
        if (id) {
          setVideos(results[0].filter((resource) => resource._id !== id));
          setDocs(results[1].filter((resource) => resource._id !== id));
        } else {
          setVideos(results[0]);
          setDocs(results[1]);
        }
        setIsLoading(false);
      })
      .catch((e) => {
        console.error(e);
        setHasError(true);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && (
        <aside className={`resource ${props.className}`}>
          <p className="resource__title">VIDEOS</p>
          <section className="resource__videos">
            {videos.map((item) => (
              <Link
                to={`/resource/${item._id}`}
                key={item._id}
                className="resource__link"
              >
                <ResourceCard data={item} className="resource__video-card" />
              </Link>
            ))}
          </section>

          <p className="resource__doc-title">Documents</p>
          <section className="resource__docs">
            {docs.map((item) => (
              <Link
                to={`/resource/${item._id}`}
                key={item._id}
                className="resource__link"
              >
                <ResourceCard data={item} className="resource__doc-card" />
              </Link>
            ))}
          </section>
        </aside>
      )}
    </>
  );
};

export default ResourceList;
