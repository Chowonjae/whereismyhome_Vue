import Vue from "vue";
import Vuex from "vuex";
import http from "@/api/http";
import createPersistedState from "vuex-persistedstate";

import memberStore from "@/store/module/memberStore";

import { listArticle, searchListArticle, writeArticle, getArticle, modifyArticle, deleteArticle } from "@/api/board";
import {
  listQnA,
  searchListQnA,
  writeQnA,
  getQnA,
  modifyQnA,
  deleteQnA,
  getReply,
  writeReply,
  modifyReply,
  deleteReply,
} from "@/api/qna";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidos: [{ value: null, text: "시도 선택" }],
    guguns: [{ value: null, text: "구군 선택" }],
    dongs: [{ value: null, text: "동 선택" }],
    houses: [],
    inters: [],
    house: null,
    hospitals: [],
    coronas: [],
    deals: { labels: [], datasets: [{ label: "거래금액", backgroundColor: "#f87979", data: [] }] },
    starbucks: [],
    metros: [],
    starbuck: null,
    metro: null,
    ok: false,
    error: false,

    /////////////////////Board start ///////////////////////
    articles: [],
    article: null,
    /////////////////// Board end ////////////////////////

    /////////////////////Qna start ///////////////////////
    qnas: [],
    qna: null,
    replies: [],
    /////////////////// Qna end ////////////////////////
  },
  getters: {},
  mutations: {
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
    },
    CLEAR_HOUSE(state) {
      state.house = null;
    },
    CLEAR_INTER_LIST(state) {
      state.inters = [];
    },
    CLEAR_DEAL_LIST(state) {
      state.deals = { labels: [], datasets: [{ label: "거래금액", backgroundColor: "#f87979", data: [] }] };
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
    SET_HOUSE(state, house) {
      state.house = house;
    },
    SET_DEAL_LIST(state, deals) {
      deals.forEach((d) => {
        state.deals.labels.push(d.dealYear + "." + d.dealMonth + "." + d.dealDay);
        state.deals.datasets[0].data.push(d.dealAmount.replace(",", "") * 1);
      });
      console.log(state.deals.datasets[0]);
    },
    SET_HOSPITAL_LIST(state, hospitals) {
      state.hospitals = hospitals;
    },
    SET_CORONA_LIST(state, coronas) {
      state.coronas = coronas;
    },
    SET_STARBUCKS_LIST(state, starbucks) {
      state.starbucks = starbucks;
    },
    SET_METRO_LIST(state, metros) {
      state.metros = metros;
    },
    SET_STARBUCK(state, starbuck) {
      state.starbuck = starbuck;
    },
    SET_METRO(state, metro) {
      state.metro = metro;
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

    /////////////////////////////// Board start ///////////////////////////////////
    SET_ARTICLE_LIST(state, articles) {
      state.articles = articles;
    },
    SET_ARTICLE(state, article) {
      state.article = article;
    },
    CLEAR_ARTICLE(state) {
      state.article = null;
    },
    CLEAR_ARTICLE_LIST(state) {
      state.articles = [];
    },
    ////////////////////////////// Board end ///////////////////////////////////////

    ////////////////////////////// QnA start ////////////////////////////////////
    SET_QNA_LIST(state, qnas) {
      state.qnas = qnas;
    },
    SET_QNA(state, qna) {
      state.qna = qna;
    },
    SET_REPLIES(state, replies) {
      state.replies = replies;
    },
    CLEAR_QNA(state) {
      state.qna = null;
    },
    CLEAR_QNA_LIST(state) {
      state.qnas = [];
    },
    /////////////////////////////// QnA end //////////////////////////////////////
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
    async getHouseList({ commit }, dongCode) {
      // vue cli enviroment variables 검색
      //.env.local file 생성.
      // 반드시 VUE_APP으로 시작해야 한다.
      // const params = {
      //   LAWD_CD: gugunCode,
      //   DEAL_YMD: "202207",
      //   serviceKey: decodeURIComponent(SERVICE_KEY),
      // };
      await http
        .get(`map/search/${dongCode}`)
        .then(({ data }) => {
          //  console.log(data);
          commit("SET_HOUSE_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async detailHouse({ commit }, aptCode) {
      await http
        .get(`map/search/apt/${aptCode}`)
        .then(({ data }) => {
          //  console.log(data);
          commit("SET_DEAL_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStarbucks({ commit }) {
      http
        .get(`map/coffee`)
        .then(({ data }) => {
          //  console.log(data);
          commit("SET_STARBUCKS_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMetros({ commit }) {
      http
        .get(`map/metro`)
        .then(({ data }) => {
          //  console.log(data);
          commit("SET_METRO_LIST", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getStarbuck({ commit }, param) {
      http
        .get(`map/coffee/${param.lat}/${param.lng}`)
        .then(({ data }) => {
          //  console.log(data);
          commit("SET_STARBUCK", data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    getMetro({ commit }, param) {
      http
        .get(`map/metro/${param.lat}/${param.lng}`)
        .then(({ data }) => {
          //  console.log(data);
          commit("SET_METRO", data);
        })
        .catch((error) => {
          console.log(error);
        });
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

    /////////////////////////////// Board start /////////////////////////////////////
    getArticleList({ commit }, param) {
      listArticle(
        param,
        ({ data }) => {
          commit("SET_ARTICLE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    searchArticleList({ commit }, param) {
      searchListArticle(
        param.key,
        param.word,
        ({ data }) => {
          commit("SET_ARTICLE_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    updateArticle({ commit }, param) {
      let msg = "수정이 완료되었습니다.";
      modifyArticle(
        param,
        () => {
          commit("SET_OK", true);
        },
        (error) => {
          msg = "수정 과정에 문제가 발생했습니다.";
          console.log(error);
        }
      );
      alert(msg);
    },

    addArticle({ commit }, param) {
      let msg = "등록이 완료되었습니다.";
      writeArticle(
        param,
        () => {
          commit("SET_OK", true);
        },
        (error) => {
          msg = "등록 과정에 문제가 발생했습니다.";
          console.log(error);
        }
      );
      alert(msg);
    },

    searchArticle({ commit }, articleno) {
      getArticle(
        articleno,
        ({ data }) => {
          commit("SET_ARTICLE", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    removeArticle({ commit }, articleno) {
      let msg = "공지사항이 삭제되었습니다.";
      deleteArticle(
        articleno,
        () => {
          commit("SET_OK", true);
        },
        (error) => {
          msg = "삭제 과정에 문제가 발생했습니다.";
          console.log(error);
        }
      );
      alert(msg);
    },

    //////////////////////////////////Board end//////////////////////////////////

    /////////////////////////////// QnA start /////////////////////////////////////
    getQnAList({ commit }, param) {
      listQnA(
        param,
        ({ data }) => {
          commit("SET_QNA_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    searchQnAList({ commit }, param) {
      searchListQnA(
        param.key,
        param.word,
        ({ data }) => {
          commit("SET_QNA_LIST", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    updateQnA({ commit }, param) {
      let msg = "수정이 완료되었습니다.";
      modifyQnA(
        param,
        () => {
          commit("SET_OK", true);
        },
        (error) => {
          msg = "수정 과정에 문제가 발생했습니다.";
          console.log(error);
        }
      );
      alert(msg);
    },

    addQnA({ commit }, param) {
      let msg = "등록이 완료되었습니다.";
      writeQnA(
        param,
        () => {
          commit("SET_OK", true);
        },
        (error) => {
          msg = "등록 과정에 문제가 발생했습니다.";
          console.log(error);
        }
      );
      alert(msg);
    },

    searchQnA({ commit }, QnAno) {
      getQnA(
        QnAno,
        ({ data }) => {
          commit("SET_QNA", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    removeQnA({ commit }, QnAno) {
      let msg = "QnA 게시물이 삭제되었습니다.";
      deleteQnA(
        QnAno,
        () => {
          commit("SET_OK", true);
        },
        (error) => {
          msg = "삭제 과정에 문제가 발생했습니다.";
          console.log(error);
        }
      );
      alert(msg);
    },

    searchReplies({ commit }, QnAno) {
      getReply(
        QnAno,
        ({ data }) => {
          commit("SET_REPLIES", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    addReply({ commit }, param) {
      writeReply(
        param,
        ({ data }) => {
          commit("SET_REPLIES", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },
    updateReply({ commit }, param) {
      let msg = "수정이 완료되었습니다.";
      modifyReply(
        param,
        ({ data }) => {
          commit("SET_REPLIES", data);
        },
        (error) => {
          msg = "수정 과정에 문제가 발생했습니다.";
          console.log(error);
        }
      );
      alert(msg);
    },
    removeReply({ commit }, param) {
      deleteReply(
        param,
        ({ data }) => {
          commit("SET_REPLIES", data);
        },
        (error) => {
          console.log(error);
        }
      );
    },

    //////////////////////////////////Board end//////////////////////////////////
  },
  modules: {
    memberStore,
  },
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
});
