<template>
  <b-row class="mt-4 mb-4 text-center">
    <b-input-group size="lg" style="justify-content: center">
      <b-form-select
        v-model="sidoCode"
        :options="sidos"
        @change="gugunList"
        ref="sido"
      ></b-form-select>
      <b-form-select v-model="gugunCode" :options="guguns" ref="gugun"></b-form-select>
      <b-button @click="searchNews">검색</b-button>
    </b-input-group>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "NewsSearch",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
    };
  },
  computed: {
    ...mapState(["sidos", "guguns", "news"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_NEWS_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getNewsList"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_NEWS_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchNews() {
      let err = true;
      let msg = "";
      !this.sidoCode && ((msg = "시도를 선택해주세요"), (err = false), this.$refs.sido.focus());
      err &&
        !this.gugunCode &&
        ((msg = "구군을 선택해주세요"), (err = false), this.$refs.gugun.focus());

      if (!err) {
        this.$root.$bvToast.toast(msg, {
          title: "알림",
          variant: "warning",
          autoHideDelay: 1000,
          solid: true,
        });
      } else this.getNewsList(this.gugunCode);
    },
  },
};
</script>

<style></style>
