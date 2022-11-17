import { localServer } from "./http.js";

const api = localServer();

// BoardList
function listArticle(param, success, fail) {
  api.get(`/board`, { params: param }).then(success).catch(fail);
}
// BoardListSearch
function searchListArticle(key, word, success, fail) {
  api.get(`/board/${key}/${word}`).then(success).catch(fail);
}
// BoardView
function getArticle(articleno, success, fail) {
  api.get(`/board/${articleno}`).then(success).catch(fail);
}
// BoardInputItem-write
function writeArticle(articleParam, success, fail) {
  api.post(`/board`, JSON.stringify(articleParam)).then(success).catch(fail);
}
// BoardInputItem-modify
function modifyArticle(articleParam, success, fail) {
  api.put(`/board`, JSON.stringify(articleParam)).then(success).catch(fail);
}
// BoardDelete
function deleteArticle(articleno, success, fail) {
  api.delete(`/board/${articleno}`).then(success).catch(fail);
}
export { listArticle, searchListArticle, writeArticle, getArticle, modifyArticle, deleteArticle };
