import React, { useEffect } from "react";
import close from "../../assets/icons/close.svg";
import { editAComment } from "../../utilities/api";
import "./EditModal.scss";

const EditModal = (props) => {
  const handleEditComment = async (e) => {
    e.preventDefault();
    await editAComment(
      props.resourceId,
      props.commentId.current,
      e.target.content.value
    );
    e.target.reset();
    props.toggleModal(false);
    props.updateData();
  };

  const handleCloseModal = () => {
    props.toggleModal(false);
  };

  return (
    <div className="backdrop">
      <form onSubmit={handleEditComment} className="edit-form">
        <img
          className="close"
          src={close}
          alt="close page"
          onClick={handleCloseModal}
        />
        <textarea
          className="edit-form__input"
          rows="10"
          name="content"
          placeholder="Edit your comment here"
        />
        <button className="edit-form__save" type="submit">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditModal;
