import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  addComments,
  deleteComments,
  updateComments
} from "../../../../redux/modules/commentsSlice";
import Comments from "../../Comments/components/Comments";

const CommentsContainer = ({ postId }) => {
  const dispatch = useDispatch();
  const { title, comments, content, createAt } = useSelector(
    (state) => state.commentsReducer.comments
  );

  useEffect(() => {
    dispatch(getComments(postId));
  }, [dispatch]);

  const onAddComments = (payload) => {
    dispatch(addComments(payload));
  };
  const onDeleteComments = (payload) => {
    dispatch(deleteComments(payload));
  };
  const onUpdateComments = (payload) => {
    dispatch(updateComments(payload));
  };
  const id = parseInt(postId, 10);
  return (
    <Comments
      comments={comments}
      postId={id}
      onAddComments={(payload) => {
        onAddComments(payload);
      }}
      onDeleteComments={(payload) => {
        onDeleteComments(payload);
      }}
      onUpdateComments={(payload) => {
        onUpdateComments(payload);
      }}
    />
  );
};

export default CommentsContainer;
