import { localServer } from "./http.js";

const api = localServer();

// QnaList
function listArticle(param, success, fail) {
  api.get(`/qna`, { params: param }).then(success).catch(fail);
}
// QnaListSearch
function searchListArticle(key, word, success, fail) {
  api.get(`/qna/${key}/${word}`).then(success).catch(fail);
}
// QnaView
function getArticle(articleno, success, fail) {
  api.get(`/qna/${articleno}`).then(success).catch(fail);
}
// QnaReplyView
function getReply(articleno, success, fail) {
  api.get(`/qna/repl/${articleno}`).then(success).catch(fail);
}
// QnaReplyWrite
function writeReply(replyParam, success, fail) {
  api.post(`/qna/repl`, JSON.stringify(replyParam)).then(success).catch(fail);
}
// QnaReplyDelete
// function deleteReply() {}
// QnaInputItem-write
function writeArticle(articleParam, success, fail) {
  api.post(`/qna`, JSON.stringify(articleParam)).then(success).catch(fail);
}
// QnaInputItem-modify
function modifyArticle(articleParam, success, fail) {
  api.put(`/qna`, JSON.stringify(articleParam)).then(success).catch(fail);
}
// QnaDelete
function deleteArticle(articleno, success, fail) {
  api.delete(`/qna/${articleno}`).then(success).catch(fail);
}
export {
  listArticle,
  getReply,
  writeReply,
  //deleteReply,
  searchListArticle,
  writeArticle,
  getArticle,
  modifyArticle,
  deleteArticle,
};
