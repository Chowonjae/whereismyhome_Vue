<template>
  <b-row
    class="m-2"
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
    align-v="stretch"
    align-self="stretch"
    style="height: 80px"
  >
    <b-col>
      <div class="apt-name">
        <a>{{ house.apartmentName }}</a>
      </div>
      <div>
        <span v-if="house.coffee != null" style="font-size: 12px" class="text-success">
          <b-img :src="coffeeImg" width="20" height="20" class="icon"></b-img
          >{{ house.coffee.name }} {{ house.coffee.dist }}m
        </span>
        <span v-else style="font-size: 12px" class="text-success">
          <b-img :src="coffeeImg" width="20" height="20" class="icon"></b-img> 1km 이내에 없음
        </span>
        <span v-if="house.metro != null" style="font-size: 12px">
          <b-img :src="metroImg" width="20" height="20" class="icon"></b-img>
          {{ house.metro.name }} {{ house.metro.dist }}m
        </span>
        <span v-else style="font-size: 12px"
          ><b-img :src="metroImg" width="20" height="20" class="icon"></b-img> 1km 이내에 없음</span
        >
      </div>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: "HouseListItem",
  data() {
    return {
      isColor: false,
      coffeeImg: require("@/assets/coffee.png"),
      metroImg: require("@/assets/metro.png"),
    };
  },
  props: {
    house: Object,
  },
  methods: {
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
b-row {
  height: 200px;
}
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
.apt-name {
  font-weight: bold;
}
.apt-space,
.apt-price,
.apt-type {
  font-size: 14px;
}
.apt-date {
  font-size: 14px;
  color: gray;
}
</style>
