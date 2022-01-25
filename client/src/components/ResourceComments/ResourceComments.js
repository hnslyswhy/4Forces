import { getTimeDifference } from "../../utilities/timeConverter";
import { deleteComment } from "../../utilities/api";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import edit from "../../assets/icons/edit.svg";
import { useParams } from "react-router-dom";
import { getAResourceComments, editAComment } from "../../utilities/api";
import { useEffect, useState, useRef, useContext } from "react";
import AuthContext from "../../utilities/AuthContext";
import "./ResourceComments.scss";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import EditModal from "../EditModal/EditModal";

function ResourceComments(props) {
  const authCtx = useContext(AuthContext);
  const { id } = useParams();
  const [comments, setComments] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [isShowingModal, setIsShowingModal] = useState(false);
  //const [commentETag, setCommentETag] = useState(null);
  const commentIdRef = useRef(null);

  const initiateComments = async (id) => {
    try {
      let res = await getAResourceComments(id);
      setComments(res);
      setIsLoading(false);
    } catch (e) {
      setHasError(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    initiateComments(id);
  }, [props.id, props.eTag]);

  const handleDelete = (id, commentId, userId) => {
    if (userId === authCtx.user._id) {
      deleteComment(id, commentId);
      props.updateData();
    }
  };

  const handleToggleModal = (commentId, userId) => {
    if (userId === authCtx.user._id) {
      setIsShowingModal(!isShowingModal);
      commentIdRef.current = commentId;
    }
  };
  return (
    <>
      {isLoading && <LoadingSpinner />}
      {!isLoading && hasError && <NotFound />}
      {!isLoading && !hasError && comments.length !== 0 && (
        <>
          {isShowingModal && (
            <EditModal
              resourceId={id}
              commentId={commentIdRef}
              toggleModal={setIsShowingModal}
              updateData={props.updateData}
            />
          )}
          <div className="comments">
            {comments.map((item) => {
              return (
                <article className="comments__card" key={item._id}>
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
                        onClick={() => handleDelete(id, item._id, item.userId)}
                        src={deleteIcon}
                        alt="delete"
                      />
                      <img
                        className="comments__edit"
                        onClick={() => handleToggleModal(item._id, item.userId)}
                        src={edit}
                        alt="edit"
                      />
                    </div>
                  </div>
                  <p className="comments__text">{item.content}</p>
                </article>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
export default ResourceComments;
