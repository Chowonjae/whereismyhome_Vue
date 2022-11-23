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
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("RefreshToken 기간 만료!!! 다시 로그인해 주세요.");
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
            console.log("유저 정보 없음!!!!");
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
            console.log("회원가입 성공");
            commit("SET_REGIST", true);
          } else {
            console.log("회원가입 실패");
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
            console.log("수정 실패");
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
            console.log("삭제 실패");
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
