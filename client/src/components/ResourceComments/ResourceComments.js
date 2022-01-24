import { getTimeDifference } from "../../utilities/timeConverter";
import { deleteComment } from "../../utilities/api";
import deleteIcon from "../../assets/icons/deleteIcon.svg";
import edit from "../../assets/icons/edit.svg";
import { useParams } from "react-router-dom";
import { getAResourceComments, editAComment } from "../../utilities/api";
import { useEffect, useState, useRef } from "react";
import "./ResourceComments.scss";
import LoadingSpinner from "../../utilities/LoadingSpinner/LoadingSpinner";
import NotFound from "../../utilities/NotFound/NotFound";
import EditModal from "../EditModal/EditModal";
import { v4 as uuidv4 } from "uuid";

function ResourceComments(props) {
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

  /*   const refresh = () => {
    console.log(typeof props.updateData);
    props.updateData();
  };
 */
  const handleDelete = (id, commentId) => {
    deleteComment(id, commentId);
    initiateComments(id);
  };

  const handleToggleModal = (commentId) => {
    setIsShowingModal(!isShowingModal);
    commentIdRef.current = commentId;
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
              /*       updateData={refresh} */
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
                        onClick={() => handleDelete(id, item._id)}
                        src={deleteIcon}
                        alt="delete"
                      />
                      <img
                        className="comments__edit"
                        onClick={() => handleToggleModal(item._id)}
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
