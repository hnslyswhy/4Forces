import React from "react";
import { useParams } from "react-router-dom";
import { addAComment } from "../../utilities/api";
import "./ResourceAddComment.scss";

const ResourceAddComment = () => {
  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    addAComment(id, e.target.username.value, e.target.content.value);
    e.target.reset();
    window.location.reload(true); // how to update properly
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <input
        className="comment-form__username"
        type="text"
        name="username"
        placeholder="username"
        required
      ></input>
      <textarea
        className="comment-form__content"
        name="content"
        placeholder="Write Your Comment"
        rows="10"
        required
      ></textarea>
      <button className="comment-form__add" type="submit">
        Add
      </button>
    </form>
  );
};

export default ResourceAddComment;
