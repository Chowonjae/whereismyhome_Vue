<template>
  <b-container v-if="houses && houses.length != 0" class="bv-example-row mt-3">
    <b-container>
      <house-list-item
        v-for="(house, index) in houses.slice((currentPage - 1) * perPage, currentPage * perPage)"
        :key="index"
        :house="house"
      />
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
      <b-col ><b-alert show>이 지역의 거래내역이 없습니다.</b-alert></b-col>
    </b-row>
  </b-container>
</template>

<script>
import HouseListItem from "@/components/house/HouseListItem";
import { mapState } from "vuex";

export default {
  name: "HouseList",
  components: {
    HouseListItem,
  },
  data() {
    return {
      perPage: 4,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState(["houses"]),
    rows() {
      return this.houses.length;
    },
  },
  // watch: {
  //   houses: function () {
  //     this.rows = this.houses.length;
  //   },
  // },
};
</script>

<style></style>
