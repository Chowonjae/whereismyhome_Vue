<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <h2 class="my-3 py-3 shadow-sm bg-light text-center">
          <mark class="orange">회원가입</mark>
        </h2>
      </div>
      <div class="col-lg-8 col-md-10 col-sm-12">
        <form id="form-join" method="POST" action="">
          <div class="mb-3">
            <label for="userid" class="form-label">아이디 : </label>
            <b-button size="sm" class="text-right" @click="idcheck">중복확인</b-button>
            <input
              type="text"
              class="form-control"
              id="userid"
              name="userid"
              v-model="info.userId"
            />
            <label for="userid" class="form-label" v-if="idCheck != null">{{checkMsg}}</label>
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">이름 : </label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              v-model="info.userName"
            />
          </div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호 : </label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userpwd"
              v-model="info.userPwd"
            />
          </div>
          <div class="mb-3">
            <label for="reuserpwd" class="form-label">비밀번호 확인 : </label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userpwd"
              v-model="reuserPwd"
            />
          </div>
          <label for="userid" class="form-label" v-if="pwdCheck != null">{{pwdMsg}}</label>
          <div class="mb-3">
            <label for="emailid" class="form-label">이메일 : </label>
            <div class="input-group">
              <input
                type="text"
                class="form-control"
                id="emailid"
                name="emailid"
                v-model="info.emailId"                
              />
              <span class="input-group-text">@</span>
              <b-select
                :options="domain"
                class="form-control"
                id="emaildomain"
                name="emaildomain"
                v-model="info.emailDomain"
              />
            </div>
          </div>
          <!-- 회원가입으로 변경 111 -->
          <div class="col-auto text-center">
            <b-button pill @click="regist"> 회원가입 </b-button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  created(){
    this.CLEAR_ID_CHECK();
  },
  computed: {
    ...mapState(memberStore, ["idCheck", "registCheck"]),
  },
  data() {
    return {
      btnIdChecked: false,
      isGood: false,
      checkMsg: "",
      reuserPwd: "",
      pwdMsg: "",
      pwdCheck: null,
      checkEmail: null,
      info: {
        userId: null,
        userPwd: null,
        userName: null,
        emailId: null,
        emailDomain: null,
      },
      domain: [
        { value: null, text: "선택" },
        { value: "ssafy.com", text: "ssafy.com" },
        { value: "naver.com", text: "naver.com" },
        { value: "gmail.com", text: "gmail.com" },
      ],
    };
  },
  methods: {
    ...mapActions(memberStore, ["searchUserId", "registUser"]),
    ...mapMutations(memberStore, ["CLEAR_ID_CHECK", "CLEAR_REGIST"]),
    idcheck() {
      this.btnIdChecked = true; 
      this.searchUserId(this.info.userId);
    },
    regist() {
      if (this.isGood === null || this.isGood === false) {
        alert("아이디 중복확인을 해주세요!");
        return;
      }
      if (this.info.userName === "") {
        alert("이름을 입력해 주세요!");
        return;
      }
      if (this.pwdCheck === null || this.pwdCheck === false) {
        alert("비밀번호를 확인해 주세요!");
        return;
      }
      if (this.info.emailId === "" || this.info.emailDomain === null) {
        this.checkEmail = false;
        alert("이메일을 확인해 주세요.");
        return;
      } else {
        this.checkEmail = true;
      }
      if (this.isGood && this.pwdCheck && this.checkEmail) {
        this.registUser(this.info);
      }
    },
  },
  watch: {
    idCheck : function () {
      if (this.idCheck) {
        this.checkMsg = "사용 가능한 아이디입니다."
        this.isGood = this.idCheck;
      } else {
        this.checkMsg = "해당 아이디는 이미 사용중입니다."
        this.isGood = this.idCheck;
      }      
    },
    reuserPwd: {
      handler: function (newVal) {
        if (this.info.userPwd === newVal) {
          this.pwdCheck = true;
          this.pwdMsg = "비밀번호가 맞습니다.";
        } else {
          this.pwdCheck = false;
          this.pwdMsg = "비밀번호가 맞지 않습니다.";
        }
      }
    },
    registCheck: function () {
      if (this.registCheck) {
        alert("회원가입이 되었습니다.");
        this.CLEAR_REGIST();
        this.$router.push({ name: "home" });
      }
    }
  },
};
</script>

<style>

</style>