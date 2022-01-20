import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAResource } from "../../utilities/api";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import ResourceDescription from "../../components/ResourceDescription/ResourceDescription";
import ResourceList from "../../components/ResourceList/ResourceList";
import ResourceComments from "../../components/ResourceComments/ResourceComments";
import "./ResourceDetailsPage.scss";

const ResourceDetailsPage = () => {
  const [resource, setResource] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const { id } = useParams();

  useEffect(async () => {
    try {
      let result = await getAResource(id);
      setResource(result);
      setIsLoading(false);
      console.log(resource);
    } catch (e) {
      console.error(e);
      setHasError(true);
      setIsLoading(false);
    }
  }, [id]);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {hasError && !isLoading && <NotFound />}
      {!isLoading && !hasError && resource && (
        <main className="resource-details-main">
          <section className="main-resource">
            <div className="main-resource__video-container">
              <video
                className="main-resource__video-player"
                type="video/mp4"
                src={resource.video}
                poster={resource.image}
                controls
              />
            </div>
            <ResourceDescription
              data={resource}
              className="main-resource__description"
            />
            <ResourceComments data={resource} />
          </section>

          <ResourceList className="main-resource__aside" />
        </main>
      )}
    </>
  );
};

export default ResourceDetailsPage;
