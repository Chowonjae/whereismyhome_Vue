<template>
  <b-row class="mt-4 mb-4 text-center">
    <b-input-group size="lg" style="justify-content:center;">
      <b-form-select v-model="sidoCode" :options="sidos" @change="gugunList"></b-form-select>
      <b-form-select v-model="gugunCode" :options="guguns"></b-form-select>
      <b-button @click="searchHospital">검색</b-button>
    </b-input-group>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "HospitalSearch",
  data() {
    return {
      sidoCode: null,
      gugunCode: null,
    };
  },
  computed: {
    ...mapState(["sidos", "guguns", "hospitals"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_HOSPITAL_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getHospitalList"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_HOSPITAL_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.gugunCode = null;
      if (this.sidoCode) this.getGugun(this.sidoCode);
    },
    searchHospital() {
      if (this.gugunCode) this.getHospitalList(this.gugunCode);
    },
  },
};
</script>

<style></style>
