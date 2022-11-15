<template>
  <b-container class="bv-example-row mt-3 text-center">
    <b-row>
      <b-col>
        <corona-search></corona-search>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="4" align="left">
        <corona-list></corona-list>
      </b-col>
      <b-col cols="8">
        <corona-map></corona-map>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import CoronaList from "@/components/corona/CoronaList.vue";
import CoronaMap from "@/components/corona/CoronaMap.vue";
import CoronaSearch from "@/components/corona/CoronaSearch.vue";
export default {
  components: { CoronaMap, CoronaSearch, CoronaList },
};
</script>

<style></style>
