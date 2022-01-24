import { getTimeDifference } from "../../utilities/timeConverter";
import { deleteComment } from "../../utilities/api";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import { useParams } from "react-router-dom";
import { getAResourceComments } from "../../utilities/api";
import { useEffect, useState } from "react";
import "./ResourceComments.scss";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";

function ResourceComments(props) {
  const { id } = useParams();
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(async () => {
    try {
      let res = await getAResourceComments(id);
      console.log(res);
      setComments(res);
      setIsLoading(false);
    } catch (e) {
      setHasError(true);
      setIsLoading(false);
    }
  }, [props.id]);

  const handleDelete = (id, commentId) => {
    deleteComment(id, commentId);
    window.location.reload(true); // how to update properly
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && hasError && <NotFound />}
      {!isLoading && !hasError && comments.length !== 0 && (
        <div className="comments">
          {comments.map((item) => {
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
                      onClick={() => handleDelete(id, item._id)}
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
      )}
    </>
  );
}
export default ResourceComments;
