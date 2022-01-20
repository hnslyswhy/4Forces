import React from "react";
import ResourceList from "../../components/ResourceList/ResourceList";
import "./ResourceListPage.scss";

const ResourceListPage = () => {
  return (
    <main className="resource-main">
      <ResourceList className="resource-main__list" />
    </main>
  );
};

export default ResourceListPage;
