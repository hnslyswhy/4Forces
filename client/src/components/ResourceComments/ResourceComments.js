import { getTimeDifference } from "../../utilities/timeConverter";
import { deleteComment } from "../../utilities/api";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useParams } from "react-router-dom";
import "./ResourceComments.scss";

function ResourceComments({ data }) {
  const { id } = useParams();

  const handleDelete = (id, commentId) => {
    console.log(id, commentId);
    deleteComment(id, commentId);
    window.location.reload(true); // how to update properly
  };
  return (
    <div className="comments">
      {data.comments.map((item) => {
        return (
          <article className="comments__card" key={item.username}>
            <div className="comments__top">
              <div className="comments__box">
                <img
                  className="comments__avatar"
                  src={
                    item.avatar
                      ? item.avatar
                      : "https://via.placeholder.com/150"
                  }
                  alt="avatar"
                />
              </div>
              <p className="comments__author">{item.username}</p>
              <div className="comments__tools">
                <p className="comments__date">
                  {getTimeDifference(item.timeStamp)}
                </p>
                <img
                  className="comments__delete"
                  onClick={() => handleDelete(id, item.id)}
                  src={deleteIcon}
                  alt="delete"
                />
              </div>
            </div>
            <p className="comments__text">{item.content}</p>
          </article>
        );
      })}
    </div>
  );
}
export default ResourceComments;
