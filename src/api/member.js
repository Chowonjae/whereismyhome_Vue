import { localServer } from "./http.js";

const api = localServer();

async function login(user, success, fail) {
  await api.post(`/rmember/login`, JSON.stringify(user)).then(success).catch(fail);
}
// 회원 인증
async function findById(userid, success, fail) {
  api.defaults.headers["access-token"] = sessionStorage.getItem("access-token");
  await api.get(`/rmember/info/${userid}`).then(success).catch(fail);
}

async function tokenRegeneration(user, success, fail) {
  api.defaults.headers["refresh-token"] = sessionStorage.getItem("refresh-token"); //axios header에 refresh-token 셋팅
  await api.post(`/rmember/refresh`, user).then(success).catch(fail);
}

async function logout(userid, success, fail) {
  await api.get(`/rmember/logout/${userid}`).then(success).catch(fail);
}

function registMember(user, success, fail) {
    api.post(`/rmember`, JSON.stringify(user)).then(success).catch(fail);
}

function findPassword(user, success, fail) {
    api.post(`/rmember/findpw`, JSON.stringify(user)).then(success).catch(fail);
}

function searchId(userid, success, fail) {
    api.get(`/rmember/${userid}`).then(success).catch(fail);
}

function deleteMember(userid, success, fail) {
    api.get(`/rmember/${userid}`).then(success).catch(fail);
}

export { login, findById, tokenRegeneration, logout, registMember, findPassword, searchId, deleteMember };