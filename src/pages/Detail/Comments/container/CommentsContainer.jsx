import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getComments,
  addComments,
  deleteComments,
  updateComments,
} from "../../../../redux/modules/commentsSlice";
import Comments from "../components/Comments";

const CommentsContainer = ({ postId }) => {
  const dispatch = useDispatch();
  const { comments } = useSelector((state) => state.commentsReducer.comments);

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

  return (
    <Comments
      comments={comments}
      postId={postId}
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
