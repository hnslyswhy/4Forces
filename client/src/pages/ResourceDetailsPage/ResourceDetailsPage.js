import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAResource } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import ResourceDescription from "../../components/ResourceDescription/ResourceDescription";
import ResourceList from "../../components/ResourceList/ResourceList";
import ResourceComments from "../../components/ResourceComments/ResourceComments";
import ResourceAddComment from "../../components/ResourceAddComment/ResourceAddComment";
import "./ResourceDetailsPage.scss";
import Climb from "../../components/Climb/Climb";

const ResourceDetailsPage = () => {
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();

  const initiateData = async () => {
    window.scrollTo(0, 0);
    try {
      let result = await getAResource(id);
      setResource(result);
      setIsLoading(false);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initiateData();
  }, [id]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && resource && (
        <main className="resource-details-main">
          <section className="main-resource">
            {resource.type === "video" && (
              <div className="main-resource__video-container">
                <video
                  className="main-resource__video-player"
                  type="video/mp4"
                  src={resource.video}
                  poster={resource.image}
                  controls
                />
              </div>
            )}
            {resource.type === "doc" && <Climb className="climb" />}
            <ResourceDescription
              data={resource}
              updateData={initiateData}
              className="main-resource__description"
            />
            <ResourceComments resourceId={id} />
            <ResourceAddComment />
          </section>

          <ResourceList className="main-resource__aside" />
        </main>
      )}
    </>
  );
};

export default ResourceDetailsPage;
