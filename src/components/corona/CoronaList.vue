<template>
  <b-container v-if="coronas && coronas.length != 0" class="bv-example-row mt-3">
    <corona-list-item v-for="(corona, index) in coronas" :key="index" :corona="corona" />
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>이 지역에 선별진료소가 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import CoronaListItem from "@/components/corona/CoronaListItem";
import { mapState } from "vuex";

export default {
  name: "CoronaList",
  components: {
    CoronaListItem,
  },
  data() {
    return {};
  },
  computed: {
    ...mapState(["coronas"]),
  },
};
</script>

<style></style>
