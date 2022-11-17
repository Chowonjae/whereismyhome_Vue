import { localServer } from "./http.js";

const api = localServer();

// QnaList
function listQnA(param, success, fail) {
  api.get(`/qna`, { params: param }).then(success).catch(fail);
}
// QnaListSearch
function searchListQnA(key, word, success, fail) {
  api.get(`/qna/${key}/${word}`).then(success).catch(fail);
}
// QnaView
function getQnA(QnAno, success, fail) {
  api.get(`/qna/${QnAno}`).then(success).catch(fail);
}
// QnaReplyView
function getReply(QnAno, success, fail) {
  api.get(`/qna/repl/${QnAno}`).then(success).catch(fail);
}
// QnaReplyWrite
function writeReply(replyParam, success, fail) {
  api.post(`/qna/repl`, JSON.stringify(replyParam)).then(success).catch(fail);
}
// QnaReplyDelete
// function deleteReply() {}
// QnaInputItem-write
function writeQnA(QnAParam, success, fail) {
  api.post(`/qna`, JSON.stringify(QnAParam)).then(success).catch(fail);
}
// QnaInputItem-modify
function modifyQnA(QnAParam, success, fail) {
  api.put(`/qna`, JSON.stringify(QnAParam)).then(success).catch(fail);
}
// QnaDelete
function deleteQnA(QnAno, success, fail) {
  api.delete(`/qna/${QnAno}`).then(success).catch(fail);
}
export {
  listQnA,
  getReply,
  writeReply,
  searchListQnA,
  writeQnA,
  getQnA,
  modifyQnA,
  //deleteReply,
  deleteQnA,
};
