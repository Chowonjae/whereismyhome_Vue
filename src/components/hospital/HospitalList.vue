<template>
  <b-container v-if="hospitals && hospitals.length != 0" class="bv-example-row mt-3">
    <hospital-list-item v-for="(hospital, index) in hospitals" :key="index" :hospital="hospital" />
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
    return {};
  },
  computed: {
    ...mapState(["hospitals"]),
  },
};
</script>

<style></style>
