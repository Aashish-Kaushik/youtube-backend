import { Comment } from "../models/comment.model.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getVideoComments = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  if (!videoId) {
    throw new apiError(400, " videoId id id required ");
  }
  const { page = 1, limit = 10 } = req.query;
  try {
    const commentPagination = await Comment.aggregate();
    commentPagination.paginateExec(
      { videoId },
      { page, limit },
      (err, result) => {
        if (err) {
          res.status(400).json(new apiError(400, err.message));
        } else {
          new apiResponse(200, result, "all comment data ");
        }
      }
    );
  } catch (error) {
    throw new apiError(400, error.message);
  }
});

const addComment = asyncHandler(async (req, res) => {
  // TODO: add a comment to a video
  const { content, videoId } = req.params;
  if (!comment && !videoId) {
    throw new apiError(400, "please provide required params");
  }

  const comment = await Comment.create({
    content: content,
    video: videoId,
    owner: req.user._id,
  });
  res
    .status(200)
    .json(new apiResponse(200, comment._id, "comment submit successfully "));
});

const updateComment = asyncHandler(async (req, res) => {
  // TODO: update a comment
  const { commentId, content } = req.body;
  if (!commentId && !content) {
    throw new apiError(400, "provide required field ");
  }
  const comment = await Comment.findOneAndUpdate(
    { _id: commentId, owner: req.user._id },
    { content }
  );
  if (!comment) {
    throw new apiError(400, "no existing Content for update operation ");
  }
  res
    .status(205)
    .json(new apiResponse(205, comment, " content update successfully"));
});

const deleteComment = asyncHandler(async (req, res) => {
  // TODO: delete a comment
  const { commentId } = req.params;
  if (!commentId) {
    throw new apiError(400, "provide required field ");
  }

  await Comment.deleteOne({ _id: commentId, owner: req.user._id });

  res
    .status(200)
    .json(new apiResponse(200, [], "content delete successfully "));
});

export { addComment, deleteComment, getVideoComments, updateComment };
