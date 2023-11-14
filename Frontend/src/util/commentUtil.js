import { webFetch, webDelete, webPost, webPut } from "./webUtil";
//1
const fetchComments = async (mapId) => {
  return await webFetch(`/api/comment/${mapId}`);
};
//2
const handleCreateComment = async (mapId, userId, content) => {
  return await webPost("/api/comment/create", { mapId, userId, content });
};

//3
const handleLikeComment = async (userId, mapId) => {
  return await webPut("/api/comment/like", { userId, mapId });
};
//4
const handleDislikeComment = async (userId, mapId) => {
  return await webPut("/api/comment/dislike", { userId, mapId });
};
//5
const handleUpdateComment = async (userId, commentId, content) => {
  return await webPut("/api/comment/update", { userId, commentId, content });
};
//6
const handleDeleteComment = async (userId, commentId) => {
  return await webDelete("/api/comment/delete", { userId, commentId });
};
