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
          console.log(videos);
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

  const handleSortByTime = () => {
    let temp = [...videos];
    temp.sort((a, b) => a.timestamp - b.timestamp);
    setVideos(temp);
  };

  const handleSortByLikes = () => {
    let temp = [...videos];
    temp.sort((a, b) => b.likes - a.likes);
    setVideos(temp);
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && (
        <aside className={`resource ${props.className}`}>
          <p className="resource__title">VIDEOS</p>
          <div className="resource__sort">
            <span className="resource__order" onClick={handleSortByLikes}>
              Hottest
            </span>
            <span className="resource__order" onClick={handleSortByTime}>
              Latest
            </span>
          </div>
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
