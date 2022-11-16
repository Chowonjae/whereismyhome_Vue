<template>
  <b-container v-if="hospitals && hospitals.length != 0" class="bv-example-row mt-3">
    <b-container>
    <hospital-list-item v-for="(hospital, index) in hospitals.slice((currentPage - 1) * perPage, currentPage * perPage)" :key="index" :hospital="hospital" />
    </b-container>
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      :per-page="perPage"
      align="fill"
      limit="3"
    ></b-pagination>
  </b-container>
  <b-container v-else class="bv-example-row mt-3">
    <b-row>
      <b-col><b-alert show>이 지역에 안심진료병원이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HospitalListItem from "@/components/hospital/HospitalListItem";
import { mapState } from "vuex";

export default {
  name: "HospitalList",
  components: {
    HospitalListItem,
  },
  data() {
    return {
      perPage: 4,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["hospitals"]),
    rows() {
      return this.hospitals.length;
    },
  },
};
</script>

<style></style>
