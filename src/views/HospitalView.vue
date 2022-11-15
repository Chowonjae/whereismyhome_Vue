<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <hospital-search></hospital-search>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4" align="left">
        <hospital-list></hospital-list>
      </b-col>
      <b-col cols="8">
        <hospital-map></hospital-map>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HospitalList from "@/components/hospital/HospitalList.vue";
import HospitalMap from "@/components/hospital/HospitalMap.vue";
import HospitalSearch from "@/components/hospital/HospitalSearch.vue";
export default {
  components: { HospitalMap, HospitalSearch, HospitalList },
};
</script>

<style></style>
