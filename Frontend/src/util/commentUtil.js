import { webFetch, webDelete, webPost, webPut } from "./webUtil";
//1
export const fetchComments = async (mapId, page = 1, limit = 20) => {
  const comments = await webFetch(
    `/comment/${mapId}?page=${page}&limit=${limit}`
  );
  return comments;
};

//2
export const handleCreateComment = async (mapId, userId, content) => {
  return await webPost("/comment/create", {
    mapId: mapId,
    userId: userId,
    content: content,
  });
};

//3
export const handleLikeComment = async (userId, mapId) => {
  return await webPut("/comment/like", { userId, mapId });
};
//4
export const handleDislikeComment = async (userId, mapId) => {
  return await webPut("/comment/dislike", { userId, mapId });
};
//5
export const handleUpdateComment = async (userId, commentId, content) => {
  return await webPut("/comment/update", { userId, commentId, content });
};
//6
export const handleDeleteComment = async (userId, commentId) => {
  return await webDelete("/comment/delete", { userId, commentId });
};
