import React, { useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import { addAComment } from "../../utilities/api";
import AuthContext from "../../utilities/AuthContext";
import "./ResourceAddComment.scss";

const ResourceAddComment = () => {
  const authCtx = useContext(AuthContext);
  const { pathname } = useLocation();
  console.log(authCtx);
  console.log(pathname);

  const { id } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    addAComment(
      id,
      authCtx.user._id,
      authCtx.user.name.givenName,
      authCtx.user.photos[0].value,
      e.target.content.value,
      pathname
    );
    e.target.reset();
    window.location.reload(true); // how to update properly
  };

  return (
    <form onSubmit={handleSubmit} className="comment-form">
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
