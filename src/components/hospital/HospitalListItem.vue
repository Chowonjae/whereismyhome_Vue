
<template>
  <b-row
    class="m-2 "
    @mouseover="colorChange(true)"
    @mouseout="colorChange(false)"
    :class="{ 'mouse-over-bgcolor': isColor }"
  >
    <b-col>
<div class="apt-name">
								<div>{{hospital.name }}</div>
							</div>
							<div class="apt-space">주소 : {{hospital.address }}</div>
							<div class="apt-type" v-if="hospital.type=='A'">
                유형 : 외래진료 
              </div>
							<div class="apt-type" v-else>
                유형 : 외래진료 및 입원 
              </div>
							<div class="apt-tel">전화번호: {{hospital.phonenumber }}</div>

    </b-col>
  </b-row>  
</template>

<script>
export default {
  name: "HospitalListItem",
  data() {
    return {
      isColor: false,
    };
  },
  props: {
    hospital: Object,
  },
  methods: {
    colorChange(flag) {
      this.isColor = flag;
    },
  },
};
</script>

<style scoped>
.apt {
  width: 50px;
}
.mouse-over-bgcolor {
  background-color: lightblue;
}
.apt-name{
  font-weight: bold;
}
.apt-space, .apt-price, .apt-type{
  font-size: 14px;
}
.apt-date{
  font-size: 14px;
  color: gray;
}
</style>
