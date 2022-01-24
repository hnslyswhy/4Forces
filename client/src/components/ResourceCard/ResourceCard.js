import React from "react";
import "./ResourceCard.scss";

const ResourceCard = (props) => {
  const { image, title, username, avatar } = props.data;
  return (
    <article className={`resource-card ${props.className}`}>
      <div className="resource-card__image-container">
        <img
          className="resource-card__image"
          src={image}
          alt="resource image"
        />
      </div>
      <div className="resource-card__info">
        <div className="resource-card__avatar-container">
          <img src={avatar} alt="avatar" className="resource-card__avatar" />
        </div>
        <div className="resource-card__intro">
          <p className="resource-card__title">{title}</p>
          <p className="resource-card__channel">
            {" "}
            by <span className="resource-card__strong">{username}</span>
          </p>
        </div>
      </div>
    </article>
  );
};

export default ResourceCard;
