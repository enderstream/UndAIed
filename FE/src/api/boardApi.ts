import { BoardRequest } from "../types/board";
import { apiClient } from "../api/apiClient";

export const boardApi = {
  getPosts: (category: number, page: number) =>
    apiClient.get("/api/v1/board", {
      params: { category, page: page - 1 },
    }),
  getPost: (id: number) => apiClient.get(`/api/v1/board/${id}`),
  createPost: (data: BoardRequest) => apiClient.post("/api/v1/board", data),
  updatePost: (id: number) =>
    apiClient.patch(`/api/v1/board/${id}`),
  // updatePost: (id: number, data: Partial<BoardRequest>) =>
  //   apiClient.patch(`/api/v1/board/${id}`),
  deletePost: (id: number) => apiClient.delete(`/api/v1/board/${id}`),
};

export const AdminBoardApi = {
  //공지사항
  createPost: (data: BoardRequest) =>
    apiClient.post("/api/v1/admin/board", data),
  updatePost: (id: number, data: Partial<BoardRequest>) =>
    apiClient.patch(`/api/v1/admin/board/${id}`, data),
  deletePost: (id: number) => apiClient.delete(`/api/v1/admin/board/${id}`),
};
