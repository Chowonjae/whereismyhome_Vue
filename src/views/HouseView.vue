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
      <b-col>
        <house-map @houseDetail="houseDetail"></house-map>
        <b-sidebar v-model="isShow">
          <house-info></house-info>
        </b-sidebar>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseInfo from "@/components/house/HouseInfo.vue";
import InterList from "@/components/house/InterList.vue";
import HouseMap from "@/components/house/HouseMap.vue";
import HouseSearch from "@/components/house/HouseSearch.vue";
import { mapMutations, mapState, mapActions } from "vuex";
export default {
  components: { HouseMap, HouseSearch, InterList, HouseInfo },
  created() {
    this.CLEAR_HOUSE();
    this.isShow = false;
  },
  computed: {
    ...mapState(["house"]),
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ...mapMutations(["SET_HOUSE", "CLEAR_HOUSE", "CLEAR_DEAL_LIST"]),
    ...mapActions(["detailHouse", "getStarbuck", "getMetro"]),
    houseDetail(h) {
      console.log(this.house);
      console.log(h);
      if (this.house != null && this.house.aptCode === h.aptCode) {
        this.isShow = false;
        this.CLEAR_HOUSE();
        this.CLEAR_DEAL_LIST();
      } else {
        this.SET_HOUSE(h);
        let param = {
          lat: this.house.lat,
          lng: this.house.lng,
        };
        this.detailHouse(this.house.aptCode);
        this.getStarbuck(param);
        this.getMetro(param);

        this.isShow = true;
      }
    },
  },
};
</script>

<style></style>
