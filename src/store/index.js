import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/http";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    userinfo: {
      userName: "가나다",
      userId: "ssafy",
    },
    sidos: [{ value: null, text: "시도 선택" }],
    guguns: [{ value: null, text: "구군 선택" }],
    dongs: [{ value: null, text: "동 선택" }],
    houses: [],
    inters: [],
    house: null,
    hospitals: [],
    coronas: [],
    deals: [],
    ok: false,
    error: false,
  },
  getters: {},
  mutations: {
    SET_USER_INFO(state, userinfo) {
      state.userinfo = userinfo;
    },
    /////////////////////////////// House start /////////////////////////////////////
    SET_INTER_LIST(state, inters) {
      state.inters = inters;
    },
    SET_SIDO_LIST(state, sidos) {
      sidos.forEach((sido) => {
        state.sidos.push({ value: sido.sidoCode, text: sido.sidoName });
      });
    },
    SET_GUGUN_LIST(state, guguns) {
      guguns.forEach((gugun) => {
        state.guguns.push({ value: gugun.gugunCode, text: gugun.gugunName });
      });
    },
    SET_DONG_LIST(state, dongs) {
      // console.log(dongs);
      dongs.forEach((dong) => {
        state.dongs.push({ value: dong.dongCode, text: dong.dongName });
      });
    },
    CLEAR_SIDO_LIST(state) {
      state.sidos = [{ value: null, text: "시도 선택" }];
    },
    CLEAR_HOUSE_LIST(state) {
      state.houses = [];
      state.house = null;
    },
    CLEAR_INTER_LIST(state) {
      state.inters = [];
    },
    CLEAR_DEAL_LIST(state) {
      state.deals = [];
    },
    CLEAR_HOSPITAL_LIST(state) {
      state.hospitals = [];
    },
    CLEAR_CORONA_LIST(state) {
      state.coronas = [];
    },
    CLEAR_GUGUN_LIST(state) {
      state.guguns = [{ value: null, text: "구군 선택" }];
    },
    CLEAR_DONG_LIST(state) {
      state.dongs = [{ value: null, text: "동 선택" }];
    },
    SET_HOUSE_LIST(state, houses) {
      state.houses = houses;
    },
    SET_DEAL_LIST(state, deals) {
      state.deals = deals;
    },
    SET_HOSPITAL_LIST(state, hospitals) {
      state.hospitals = hospitals;
    },
    SET_CORONA_LIST(state, coronas) {
      state.coronas = coronas;
    },

    SET_DETAIL_HOUSE(state, house) {
      // console.log("Mutations", house);
      state.house = house;
    },
    SET_OK(state, ok) {
      state.ok = ok;
    },
    SET_ERROR(state, error) {
      console.log("error set");
      state.error = error;
    },
    CLEAR_OK(state) {
      state.ok = null;
    },
    CLEAR_ERROR(state) {
      state.error = null;
    },
    /////////////////////////////// House end /////////////////////////////////////
  },
  actions: {
    /////////////////////////////// House start /////////////////////////////////////
    addInter({ commit }, params) {
      http
        .post(`/map/inter/`, params)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_INTER_LIST", data);
        })
        .then(() => {
          commit("SET_OK", true);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getInter({ commit }, userId) {
      http
        .get(`/map/inter/${userId}`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_INTER_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    interDupCheck({ commit, dispatch }, params) {
      console.log(params);
      http
        .get(`/map/inter/${params.userId}/${params.dongCode}`)
        .then((data) => {
          console.log(data);
          dispatch("addInter", params);
        })
        .catch(() => {
          console.log("here");
          commit("SET_ERROR", true);
        });
    },
    delInter({ commit }, query) {
      http
        .delete(`/map/inter/${query.userId}/${query.dongCode}`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_INTER_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    getSido({ commit }) {
      http
        .get(`/map/sido`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_SIDO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getGugun({ commit }, sidoCode) {
      const params = { sido: sidoCode };
      http
        .get(`/map/gugun`, { params })
        .then(({ data }) => {
          // console.log(commit, response);
          commit("SET_GUGUN_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getDong({ commit }, gugunCode) {
      const params = { gugun: gugunCode };
      http
        .get(`/map/dong`, { params })
        .then(({ data }) => {
          // console.log(commit, response);
          commit("SET_DONG_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getHouseList({ commit }, dongCode) {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      // const params = {
      //   LAWD_CD: gugunCode,
      //   DEAL_YMD: "202207",
      //   serviceKey: decodeURIComponent(SERVICE_KEY),
      // };
      http
        .get(`map/search/${dongCode}`)
        .then(({ data }) => {
          //  console.log(data);
          commit("SET_HOUSE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    detailHouse({ commit }, house) {
      // 나중에 house.일련번호를 이용하여 API 호출
      // console.log(commit, house);
      commit("SET_DETAIL_HOUSE", house);
    },
    /////////////////////////////// House end /////////////////////////////////////

    /////////////////////////////// Hospital start /////////////////////////////////////
    getHospitalList({ commit }, gugunCode) {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      http
        .get(`/map/hospital/${gugunCode}`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_HOSPITAL_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /////////////////////////////// Hospital end /////////////////////////////////////

    /////////////////////////////// Corona start /////////////////////////////////////
    getCoronaList({ commit }, query) {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      http
        .get(`/map/corona/${query.sidoCode}/${query.gugunCode}/${query.day}/${query.night}/${query.hour}/${query.min}`)
        .then(({ data }) => {
          // console.log(data);
          commit("SET_CORONA_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    /////////////////////////////// Corona end /////////////////////////////////////
  },
  modules: {},
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});