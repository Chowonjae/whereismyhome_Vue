<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-lg-8 col-md-10 col-sm-12">
        <b-form id="form-join">
          <div class="mb-3">
            <label for="userid" class="form-label">아이디</label>
            <b-button size="sm" pill variant="outline-primary" class="text-right" @click="idcheck"
              >중복확인</b-button
            >
            <input type="text" class="form-control" id="userid" name="userid" v-model="userid" />
            <label
              for="userid"
              id="info"
              class="form-label"
              v-if="idCheck != null"
              :class="{ 'text-success': idCheck, 'text-danger': !idCheck }"
              >{{ checkMsg }}</label
            >
          </div>
          <div class="mb-3">
            <label for="username" class="form-label">이름</label>
            <input
              type="text"
              class="form-control"
              id="username"
              name="username"
              v-model="info.userName"
            />
          </div>
          <div class="mb-3">
            <label for="userpwd" class="form-label">비밀번호</label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userpwd"
              v-model="userpwd"
            />
          </div>
          <div class="mb-3">
            <label for="reuserpwd" class="form-label">비밀번호 확인</label>
            <input
              type="password"
              class="form-control"
              id="userpwd"
              name="userpwd"
              v-model="reuserPwd"
            />
          </div>
          <label
            for="userid"
            id="info"
            class="form-label"
            v-if="pwdCheck != null"
            :class="{ 'text-success': pwdCheck, 'text-danger': !pwdCheck }"
            >{{ pwdMsg }}</label
          >
          <div class="mb-3">
            <label for="emailid" class="form-label">이메일</label>
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
          <b-container class="col-auto text-center">
            <b-button pill variant="outline-primary" @click="regist"> 회원가입 </b-button>
            <b-button pill variant="outline-danger" @click="close"> 취소 </b-button>
          </b-container>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
const memberStore = "memberStore";
export default {
  created() {
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
      userpwd: "",
      userid: "",
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
      if (this.userid === null || this.userid === "") {
        this.makeToast("아이디를 입력해 주세요!", "warning");
        return;
      }
      this.btnIdChecked = true;
      this.searchUserId(this.userid);
    },
    regist() {
      let msg = "";
      let err = true;

      if (this.userid === null || this.userid === "") {
        msg = "아이디를 입력해 주세요!";
        err = false;
      } else if (err && (this.isGood === null || this.isGood === false)) {
        msg = "아이디 중복확인을 해주세요!";
        err = false;
      } else if (err && (this.info.userName === "" || this.info.userName === null)) {
        msg = "이름을 입력해 주세요!";
        err = false;
      } else if (err && (this.pwdCheck === null || this.pwdCheck === false)) {
        msg = "비밀번호를 확인해 주세요!";
        err = false;
      } else if (err && (this.info.emailId === "" || this.info.emailDomain === null)) {
        this.checkEmail = false;
        msg = "이메일을 확인해 주세요.";
        err = false;
      } else {
        this.checkEmail = true;
      }
      if (!err) {
        this.makeToast(msg, "warning");
      } else if (this.isGood && this.pwdCheck && this.checkEmail) {
        this.info.userId = this.userid;
        this.info.userPwd = this.userpwd;
        this.registUser(this.info);
        // this.$emit("joinModal");
      }
    },
    close() {
      this.$emit("close");
    },
    makeToast(msg, st) {
      this.$bvToast.toast(msg, {
        title: "알림",
        autoHideDelay: 1000,
        appendToast: true,
        variant: st,
      });
    },
  },
  watch: {
    idCheck: function () {
      if (this.idCheck) {
        this.checkMsg = "사용 가능한 아이디입니다.";
        this.isGood = this.idCheck;
      } else {
        this.checkMsg = "해당 아이디는 이미 사용중입니다.";
        this.isGood = this.idCheck;
      }
    },
    userid: {
      handler: function (newVal, oldVal) {
        if (newVal != oldVal) {
          this.isGood = null;
        }
      },
    },
    reuserPwd: {
      handler: function (newVal) {
        if (this.userpwd === newVal) {
          this.pwdCheck = true;
          this.pwdMsg = "비밀번호가 맞습니다.";
        } else {
          this.pwdCheck = false;
          this.pwdMsg = "비밀번호가 맞지 않습니다.";
        }
      },
    },
    userpwd: {
      handler: function (newVal, oldVal) {
        if (newVal === oldVal) {
          this.pwdCheck = true;
          this.pwdMsg = "비밀번호가 맞습니다.";
        } else {
          this.pwdCheck = false;
          this.reuserPwd = null;
          this.pwdMsg = "비밀번호가 맞지 않습니다.";
        }
      },
    },
    registCheck: function () {
      if (this.registCheck) {
        this.makeToast("회원가입이 되었습니다.", "success");
        this.CLEAR_REGIST();
        // if (this.$route.path != "/") this.$router.push({ name: "home" });
        this.$router.go();
      }
    },
  },
};
</script>

<style scoped>
#info {
  font-size: x-small;
}
</style>
