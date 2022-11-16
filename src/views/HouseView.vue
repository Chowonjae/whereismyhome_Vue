<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <house-search></house-search>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <inter-list></inter-list>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4" align="left">
        <house-list></house-list>
      </b-col>
      <b-col cols="8">
        <house-map></house-map>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import HouseList from "@/components/house/HouseList.vue";
import InterList from "@/components/house/InterList.vue";
import HouseMap from "@/components/house/HouseMap.vue";
import HouseSearch from "@/components/house/HouseSearch.vue";
export default {
  components: { HouseMap, HouseSearch, HouseList,InterList },
};
</script>

<style></style>
