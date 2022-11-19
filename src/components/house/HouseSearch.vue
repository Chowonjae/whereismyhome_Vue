<template>
  <b-container>
    <b-row class="mt-4 mb-4 text-center">
      <b-input-group size="lg" style="justify-content: center">
        <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
        <b-form-select v-model="gugunCode" :options="guguns" @change="dongList"></b-form-select>
        <b-form-select v-model="dongCode" :options="dongs" @change="searchArea"></b-form-select>
        <b-button @click="checkInter" variant="warning">관심지역 등록</b-button>
      </b-input-group>
    </b-row>
  </b-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  name: "HouseSearch",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
      dongCode: null,
    };
  },
  computed: {
    ...mapState(["ok", "error", "sidos", "guguns", "dongs", "houses"]),
    ...mapState(memberStore, ["userInfo"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  watch: {
    ok: function () {
      console.log(this.ok);
      if (this.ok) {
        this.CLEAR_OK();
        this.$root.$bvToast.toast("관심지역으로 등록되었습니다.", {
          title: "알림",
          variant: "success",
          autoHideDelay: 3000,
          solid: true,
        });
      }
    },
    error: function () {
      if (this.error) {
        this.CLEAR_ERROR();

        this.$root.$bvToast.toast("이미 관심지역으로 등록된 지역입니다.", {
          title: "알림",
          variant: "warning",
          autoHideDelay: 3000,
          solid: true,
        });
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
          userId: this.userInfo.userId,
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
