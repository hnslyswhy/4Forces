import { getTimeDifference } from "../../utilities/timeConverter";
import { deleteComment } from "../../utilities/api";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import "./ResourceComments.scss";

function ResourceComments({ data }) {
  /*   const handleDelete = (videoId, commentId) => {
    deleteComment(videoId, commentId)
      .then(() => setVideos())
      .catch((e) => console.log(e.message));
  }; */
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
                  {getTimeDifference(item.timestamp)}
                </p>
                <img
                  className="comments__delete"
                  /*    onClick={() => handleDelete(video._id, item.id)} */
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
