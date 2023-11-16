import { webFetch, webDelete, webPost, webPut } from "./webUtil";
//1
export const fetchComments = async (mapId) => {
  return await webFetch(`/api/comment/${mapId}`);
};
//2
export const handleCreateComment = async (mapId, userId, content) => {
  return await webPost("/api/comment/create", { mapId, userId, content });
};

//3
export const handleLikeComment = async (userId, mapId) => {
  return await webPut("/api/comment/like", { userId, mapId });
};
//4
export const handleDislikeComment = async (userId, mapId) => {
  return await webPut("/api/comment/dislike", { userId, mapId });
};
//5
export const handleUpdateComment = async (userId, commentId, content) => {
  return await webPut("/api/comment/update", { userId, commentId, content });
};
//6
export const handleDeleteComment = async (userId, commentId) => {
  return await webDelete("/api/comment/delete", { userId, commentId });
};
