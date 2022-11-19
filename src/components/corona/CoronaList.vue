<template>
  <b-container v-if="coronas && coronas.length != 0" class="bv-example-row mt-3">
    <b-list-group>
      <corona-list-item
        v-for="(corona, index) in coronas.slice((currentPage - 1) * perPage, currentPage * perPage)"
        :key="index"
        :corona="corona"
      />
    </b-list-group>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="fill"
      limit="3"
      align-self="end"
    ></b-pagination>
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
    return { perPage: 3, currentPage: 1 };
  },
  computed: {
    ...mapState(["coronas"]),
    rows() {
      return this.coronas.length;
    },
  },
};
</script>

<style></style>
