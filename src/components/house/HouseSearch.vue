<template>
  <b-container>
    <b-row class="mt-4 mb-4 text-center">
      <b-input-group size="lg" style="justify-content:center;">
        <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
        <b-form-select v-model="gugunCode" :options="guguns" @change="dongList"></b-form-select>
        <b-form-select v-model="dongCode" :options="dongs" @change="searchArea"></b-form-select>
        <b-button @click="checkInter" variant="warning">관심지역 등록</b-button>
      </b-input-group>
    </b-row>
    <b-row>
      <b-alert
        variant="warning"
        :show="dismissCountDown1"
        @dismissed="dismissCountDown1 = 0"
        @dismiss-count-down="countDownChanged1"
        >이미 관심지역으로 등록된 지역입니다.</b-alert
      >
      <b-alert
        variant="success"
        :show="dismissCountDown2"
        @dismissed="dismissCountDown2 = 0"
        @dismiss-count-down="countDownChanged2"
        >관심지역으로 등록되었습니다.</b-alert
      >
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "HouseSearch",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
      dismissSecs: 3,
      dismissCountDown1: 0,
      dismissCountDown2: 0,
    };
  },
  computed: {
    ...mapState(["ok", "error", "userinfo", "sidos", "guguns", "dongs", "houses"]),

    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  watch: {
    ok: function () {
      console.log(this.ok);
      if (this.ok) {
        this.showAlert2();
        this.CLEAR_OK();
      }
    },
    error: function () {
      console.log(this.error + "1111111111111111111111111111111111");
      if (this.error) {
        this.showAlert1();
        this.CLEAR_ERROR();
      }
    },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_DONG_LIST();
    this.CLEAR_HOUSE_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getDong", "getHouseList", "interDupCheck"]),
    ...mapMutations([
      "CLEAR_OK",
      "CLEAR_ERROR",
      "CLEAR_SIDO_LIST",
      "CLEAR_GUGUN_LIST",
      "CLEAR_DONG_LIST",
      "CLEAR_HOUSE_LIST",
    ]),
    // sidoList() {
    //   this.getSido();
    // },
    countDownChanged1(dismissCountDown1) {
      this.dismissCountDown1 = dismissCountDown1;
    },
    countDownChanged2(dismissCountDown2) {
      this.dismissCountDown2 = dismissCountDown2;
    },
    showAlert1() {
      this.dismissCountDown1 = this.dismissSecs;
    },
    showAlert2() {
      this.dismissCountDown2 = this.dismissSecs;
    },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    dongList() {
      // console.log(this.sidoCode);
      this.CLEAR_DONG_LIST();
      this.dongCode = null;
      if (this.gugunCode) this.getDong(this.gugunCode);
    },
    searchArea() {
      if (this.dongCode) this.getHouseList(this.dongCode);
    },
    checkInter() {
      if (this.dongCode != null) {
        let query = {
          userId: this.userinfo.userId,
          dongCode: this.dongCode,
        };
        this.interDupCheck(query);
      }
    },
  },
};
</script>

<style>
.visible {
  display: none;
}
</style>
