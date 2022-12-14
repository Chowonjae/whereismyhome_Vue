import jwtDecode from "jwt-decode";
import router from "@/router";
import {
  login,
  social_login,
  findById,
  tokenRegeneration,
  logout,
  searchId,
  registMember,
  deleteMember,
  userModify,
  findPassword,
} from "@/api/member";

const memberStore = {
  namespaced: true,
  state: {
    modalName: "",
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    isValidToken: false,
    idCheck: null,
    registCheck: null,
    modifyCheck: null,
    isReload: null,
    isPostMail: null,
  },
  mutations: {
    SET_MODAL_NAME(state, name) {
      state.modalName = name;
    },
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    CLEAR_IS_LOGIN: (state) => {
      state.isLogin = false;
    },
    CLEAR_IS_LOGIN_ERROR: (state) => {
      state.isLoginError = false;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_ID_CHECK: (state, idCheck) => {
      state.idCheck = idCheck;
    },
    CLEAR_ID_CHECK: (state) => {
      state.idCheck = null;
    },
    SET_REGIST: (state, is) => {
      state.registCheck = is;
    },
    CLEAR_REGIST: (state) => {
      state.registCheck = null;
    },
    MODIFY_USER: (state, is) => {
      state.modifyCheck = is;
    },
    IS_RELOAD: (state) => {
      state.isReload = true;
    },
    SET_POST_MAIL: (state, isPostMail) => {
      state.isPostMail = isPostMail;
    },
    CLEAR_POST_MAIL: (state) => {
      state.isPostMail = null;
    },
  },
  actions: {
    async userConfirm({ commit }, user) {
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            commit("CLEAR_IS_LOGIN");
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async socialLogin({ commit }, req_body) {
      await social_login(
        req_body,
        ({ data }) => {
            // console.log("login success token created!!!! >> ", accessToken, refreshToken);
            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
          commit("SET_IS_VALID_TOKEN", true);
          commit("SET_USER_INFO", data);
        },
        (error) => {
          console.log(error);
          commit("CLEAR_IS_LOGIN");
          commit("SET_IS_LOGIN_ERROR", true);
          commit("SET_IS_VALID_TOKEN", false);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            // console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("?????? ?????? ??????!!!!");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [?????? ???????????? ?????? ?????????.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log("?????? ????????? >> ?????? ?????? ?????? : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("????????? ?????? >> ????????? ?????? : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken ?????? ?????? >> ?????? ?????????!!!!
          if (error.response.status === 401) {
            // ?????? ????????? ??? DB??? ????????? RefreshToken ??????.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("???????????? ?????? ?????? ??????");
                } else {
                  console.log("???????????? ?????? ?????? ??????");
                }
                alert("RefreshToken ?????? ??????!!! ?????? ???????????? ?????????.");
                commit("CLEAR_IS_LOGIN");
                commit("SET_USER_INFO", null);
                commit("SET_IS_VALID_TOKEN", false);
                router.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("?????? ?????? ??????!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    socialLogout({ commit }) {
      commit("SET_IS_LOGIN", false);
      commit("SET_USER_INFO", null);
      commit("SET_IS_VALID_TOKEN", false);
    },
    async searchUserId({ commit }, userid) {
      searchId(
        userid,
        ({ data }) => {
          if (data == "ready") {
            commit("SET_ID_CHECK", true);
          } else {
            commit("SET_ID_CHECK", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async registUser({ commit }, user) {
      registMember(
        user,
        ({ data }) => {
          console.log(data);
          if (data == "success") {
            console.log("???????????? ??????");
            commit("SET_REGIST", true);
          } else {
            console.log("???????????? ??????");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async modifyMember({ commit }, user) {
      userModify(
        user,
        ({ data }) => {
          if (data == "success") {
            commit("MODIFY_USER", true);
          } else {
            commit("MODIFY_USER", false);
            console.log("?????? ??????");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async deleteUser({ commit }, userid) {
      deleteMember(
        userid,
        ({ data }) => {
          if (data.message == "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("?????? ??????");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async findPw({ commit }, user) {
      findPassword(
        user,
        ({ data }) => {
          if ("success" === data) {
            commit("SET_POST_MAIL", true);
          } else {
            commit("SET_POST_MAIL", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
  },
};

export default memberStore;
