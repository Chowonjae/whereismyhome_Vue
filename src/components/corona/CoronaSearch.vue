<template>
  <b-row class="mt-4 mb-4 text-center">
    <!-- <b-col class="sm-3">
      <b-form-input
        v-model.trim="dongCode"
        placeholder="동코드 입력...(예 : 11110)"
        @keypress.enter="sendKeyword"
      ></b-form-input>
    </b-col>
    <b-col class="sm-3" align="left">
      <b-button variant="outline-primary" @click="sendKeyword">검색</b-button>
    </b-col> -->
      <b-input-group size="lg" style="justify-content:center;">
      <b-form-select v-model="query.sidoCode" :options="sidos" @change="gugunList" ref="sido"></b-form-select>
      <b-form-select v-model="query.gugunCode" :options="guguns" ref="gugun"></b-form-select>
      <b-form-select v-model="query.day"  ref="day">
        <option value=null>요일선택</option>
        <option value="WKD">평일</option>
        <option value="SAT">토요일</option>
        <option value="SUN">일요일</option>
      </b-form-select>
      <b-form-select v-model="query.night"  ref="night">
        <option value="AM">오전</option>
        <option value="PM">오후</option>
      </b-form-select>
      <b-form-select v-model="query.hour"  ref="hour">
        <option value=null>시간선택</option>
        <option value="1">01</option>
        <option value="2">02</option>
        <option value="3">03</option>
        <option value="4">04</option>
        <option value="5">05</option>
        <option value="6">06</option>
        <option value="7">07</option>
        <option value="8">08</option>
        <option value="9">09</option>
        <option value="10">10</option>
        <option value="11">11</option>
        <option value="12">12</option>
      </b-form-select>
      <b-form-select v-model="query.min"  @change="checkValue"  ref="min">
        <option value=null>분선택</option>
        <option value="0">00</option>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="40">40</option>
        <option value="50">50</option>
      </b-form-select>
      </b-input-group>
  </b-row>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "CoronaSearch",
  data() {
    return {
      query:{
        sidoCode: null,
        gugunCode: null,
        day: null,
        night: "AM",
        hour: null,
        min: null,
      }
    };
  },
  computed: {
    ...mapState(["sidos", "guguns", "coronas"]),
    // sidos() {
    //   return this.$store.state.sidos;
    // },
  },
  created() {
    // this.$store.dispatch("getSido");
    // this.sidoList();
    this.CLEAR_SIDO_LIST();
    this.CLEAR_GUGUN_LIST();
    this.CLEAR_CORONA_LIST();
    this.getSido();
  },
  methods: {
    ...mapActions(["getSido", "getGugun", "getCoronaList"]),
    ...mapMutations(["CLEAR_SIDO_LIST", "CLEAR_GUGUN_LIST", "CLEAR_CORONA_LIST"]),
    // sidoList() {
    //   this.getSido();
    // },
    gugunList() {
      // console.log(this.sidoCode);
      this.CLEAR_GUGUN_LIST();
      this.query.gugunCode = null;
      if (this.query.sidoCode) this.getGugun(this.query.sidoCode);
    },
    checkValue(){
      // 사용자 입력값 체크하기
      let err=true;
      let msg="";
      !this.query.sidoCode && ((msg="시도를 선택해주세요"), (err=false), this.$refs.sido.focus());
      err && !this.query.gugunCode && ((msg="구군을 선택해주세요"), (err=false), this.$refs.gugun.focus());
      err && !this.query.day && ((msg="요일을 선택해주세요"), (err=false), this.$refs.day.focus());
      err && !this.query.night && ((msg="오전/오후를 선택해주세요"), (err=false), this.$refs.night.focus());
      err && !this.query.hour && ((msg="시간을 선택해주세요"), (err=false), this.$refs.hour.focus());
      err && !this.query.min && ((msg="분을 선택해주세요"), (err=false), this.$refs.min.focus());

      if (!err) { // 에러발생
        alert(msg);
      } else { // 모두 입력 완료
        this.searchCorona();
      }  
    },
    searchCorona() {
      if (this.query.gugunCode) this.getCoronaList(this.query);
    },
  },
};
</script>

<style>
</style>
