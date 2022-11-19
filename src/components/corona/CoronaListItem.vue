<template>
  <b-list-group-item>
    <b-col class="apt">
      <div class="apt-name">
        <a>{{ corona.name }}</a>
      </div>
      <div class="apt-space">주소 : {{ corona.address }}</div>
      <div class="apt-price">평일 : {{ corona.weekday }}</div>
      <div class="apt-price text-primary">토요일 : {{ corona.saterday }}</div>
      <div class="apt-price text-danger">일요일 : {{ corona.sunday }}</div>
      <div class="apt-phone">전화번호 : {{ corona.phonenumber }}</div>
    </b-col>
  </b-list-group-item>
</template>

<script>
export default {
  name: "CoronaListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    corona: Object,
  },
  methods: {
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.mouse-over-bgcolor {
  background-color: lightblue;
}
.apt-name {
  font-weight: bold;
}
.apt-space,
.apt-price,
.apt-type {
  font-size: 13px;
}
.apt-phone {
  font-size: 12px;
  color: gray;
}
</style>
